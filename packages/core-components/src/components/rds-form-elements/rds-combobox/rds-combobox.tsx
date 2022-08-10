import { Component, h, Prop, State, Listen, Event, EventEmitter, Element, VNode, Method, Watch, Host } from '@stencil/core';
import { filter } from '../../../utils/filter';
import { debounce } from 'lodash-es';
import { createPopper, updatePopper, OverlayPositioning, defaultMenuPlacement } from '../../../utils/popper';
import { StrictModifiers, Instance as Popper } from '@popperjs/core';
import { guid } from '../../../utils/utils';
import { createObserver } from '../../../utils/observers';
import { updateHostInteraction } from '../../../utils/interactive';
interface ItemData {
  label: string;
  value: string;
}

const itemUidPrefix = 'combobox-item-';
const labelUidPrefix = 'combobox-label-';
const listboxUidPrefix = 'combobox-listbox-';
const inputUidPrefix = 'combobox-input-';

/**
 * @slot - A slot for adding `combobox-item`s.
 * @slot help-text - Sets and adds optional helper text to your combobox's input. Use plain text only to this slot.
 * @slot error-text - Use this slot to set custom error text for your combobox's input.
 */
@Component({
  tag: 'rds-combobox',
  styleUrl: 'rds-combobox.scss',
  shadow: true,
})
export class RdsCombobox {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLRdsComboboxElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Opens or closes the combobox */
  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  @Watch('active')
  activeHandler(): void {
    if (this.disabled) {
      this.active = false;
      return;
    }

    this.reposition();
  }

  /** Disable combobox input */
  @Prop({ reflect: true }) disabled: boolean = false;

  @Watch('disabled')
  handleDisabledChange(value: boolean): void {
    if (!value) {
      this.active = false;
    }
  }

  /** Aria label for combobox (required) */
  @Prop() label!: string;

  /** Placeholder text for input */
  @Prop() placeholder?: string;

  /** Specify the maximum number of combobox items (including nested children) to display before showing the scroller */
  @Prop() maxItems: number = 0;

  @Watch('maxItems')
  maxItemsHandler(): void {
    this.setMaxScrollerHeight();
  }

  /** The name of the switch input */
  @Prop({ reflect: true }) name: string;

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = 'absolute';

  /**
   * When true, the combobox is required.
   *
   */
  @Prop() required: boolean = false;

  /** The value(s) of the selectedItem(s) */
  @Prop({ mutable: true }) value: string = null;

  @Watch('value')
  valueHandler(value: string | string[]): void {
    if (!this.internalValueChangeFlag) {
      const items = this.getItems();
      if (Array.isArray(value)) {
        items.forEach(item => (item.selected = value.includes(item.value)));
      } else if (value) {
        items.forEach(item => (item.selected = value === item.value));
      } else {
        items.forEach(item => (item.selected = false));
      }
      this.updateItems();
    }
  }

  /**
   * If `true`, the combobox will be validated against the constraint validators that are set.
   */
  @Prop() validate?: boolean = false;

  /**
   * When true, API is not returning the data.
   *
   */
  @Prop() noResult: boolean = false;

  /**
   * When true, API is fetching data.
   *
   */
  @Prop() loading: boolean = false;

  /**
   * When true, there is an error in fetch.
   *
   */
  @Prop() error: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen('click', { target: 'document' })
  documentClickHandler(event: Event): void {
    this.setInactiveIfNotContained(event);
  }

  @Listen('rdsComboboxItemChange')
  rdsComboboxItemChangeHandler(event: CustomEvent<HTMLRdsComboboxItemElement>): void {
    if (this.ignoreSelectedEventsFlag) {
      return;
    }

    const target = event.target as HTMLRdsComboboxItemElement;
    this.toggleSelection(target, target.selected);
  }

  @Listen('rdsComboboxFilterChange')
  rdsComboboxFilterHanlder(event: CustomEvent): void {
    if (event.detail && event.detail.visibleItems.length == 0) {
      this.noActiveItems = true;
    } else if (event.detail.visibleItems.length > 0) {
      this.noActiveItems = false;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Updates the position of the component. */
  @Method()
  async reposition(): Promise<void> {
    const { popper } = this;
    const modifiers = this.getModifiers();
    popper
      ? await updatePopper({
          //el: menuEl,
          modifiers,
          placement: defaultMenuPlacement,
          popper,
        })
      : this.createPopper();
  }

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.textInput?.focus();
    this.activeItemIndex = -1;
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Called when the selected item(s) changes.
   */
  @Event() rdsComboboxChange: EventEmitter<{ selectedItem: HTMLRdsComboboxItemElement }>;

  /** Called when the user has entered text to filter the options list */
  @Event() rdsComboboxFilterChange: EventEmitter<{
    visibleItems: HTMLRdsComboboxItemElement[];
    text: string;
  }>;

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() rdsOnInput!: EventEmitter;

  /**
   * Fired when the combobox is opened
   * @internal
   */
  @Event() rdsComboboxOpen: EventEmitter;

  /**
   *  Fired when the combobox is closed
   * @internal
   */
  @Event() rdsComboboxClose: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.internalValueChangeFlag = true;
    this.value = this.getValue();
    this.internalValueChangeFlag = false;
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.createPopper();
  }

  componentWillLoad(): void {
    this.updateItems();
  }

  componentDidRender(): void {
    if (this.el.offsetHeight !== this.inputHeight) {
      this.reposition();
      this.inputHeight = this.el.offsetHeight;
    }

    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.destroyPopper();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  internalValueChangeFlag: boolean = false;

  noActiveItems: boolean = false;

  labelEl: HTMLRdsLabelElement;

  formEl: HTMLFormElement;

  defaultValue: RdsCombobox['value'];

  @State() items: HTMLRdsComboboxItemElement[] = [];

  @State() selectedItem: HTMLRdsComboboxItemElement;

  @Watch('selectedItem')
  selectedItemHandler(): void {
    this.internalValueChangeFlag = true;
    this.value = this.getValue();
    this.internalValueChangeFlag = false;
  }

  @State() visibleItems: HTMLRdsComboboxItemElement[] = [];

  @State() activeItemIndex = -1;

  @State() activeDescendant = '';

  @State() text = '';

  /** When search text is cleared, reset active  */
  @Watch('text')
  textHandler(): void {
    this.updateActiveItemIndex(-1);
  }

  textInput: HTMLRdsInputElement = null;

  data: ItemData[];

  mutationObserver = createObserver('mutation', () => this.updateItems());

  resizeObserver = createObserver('resize', () => this.setMaxScrollerHeight());

  private guid = guid();

  private inputHeight = 0;

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private listContainerEl: HTMLDivElement;

  private ignoreSelectedEventsFlag = false;

  private activeTransitionProp = 'opacity';

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  getValue = (): any => {
    if (this.selectedItem) {
      const item = this.selectedItem.value.toString();
      return item;
    }
  };

  onLabelClick = (): void => {
    this.setFocus();
  };

  private comboboxInViewport(): boolean {
    const bounding = this.el.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  keydownHandler = (event: KeyboardEvent): void => {
    const { key } = event;

    switch (key) {
      case 'Tab':
        this.activeItemIndex = -1;
        if (this.active) {
          this.active = false;
          event.preventDefault();
        }
        break;
      case 'ArrowUp':
        this.shiftActiveItemIndex(-1);
        if (!this.comboboxInViewport()) {
          this.el.scrollIntoView();
        }
        break;
      case 'ArrowDown':
        if (!this.active) {
          event.preventDefault();
          this.active = true;
        }
        this.shiftActiveItemIndex(1);
        if (!this.comboboxInViewport()) {
          this.el.scrollIntoView();
        }
        break;
      case ' ':
        if (!this.textInput.value) {
          event.preventDefault();
          this.active = true;
          this.shiftActiveItemIndex(1);
        }
        break;
      case 'Home':
        this.updateActiveItemIndex(0);
        this.scrollToActiveItem();
        if (!this.comboboxInViewport()) {
          this.el.scrollIntoView();
        }
        break;
      case 'End':
        if (this.active) {
          event.preventDefault();
        }
        this.updateActiveItemIndex(this.visibleItems.length - 1);
        this.scrollToActiveItem();
        if (!this.comboboxInViewport()) {
          this.el.scrollIntoView();
        }
        break;
      case 'Escape':
        this.active = false;
        break;
      case 'Enter':
        if (this.activeItemIndex > -1) {
          this.toggleSelection(this.visibleItems[this.activeItemIndex]);
          this.validateHandler;
        }
        break;
      case 'Delete':
      case 'Backspace':
        break;
    }
  };

  private toggleCloseEnd = (): void => {
    this.active = false;
    this.el.removeEventListener('rdsComboboxClose', this.toggleCloseEnd);
  };

  private toggleOpenEnd = (): void => {
    this.active = true;
    this.el.removeEventListener('rdsComboboxOpen', this.toggleOpenEnd);
  };

  transitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp) {
      this.active ? this.rdsComboboxOpen.emit() : this.rdsComboboxClose.emit();
    }
  };

  setMaxScrollerHeight = (): void => {
    const { active, listContainerEl } = this;

    if (!listContainerEl || !active) {
      return;
    }

    this.reposition();
    const maxScrollerHeight = this.getMaxScrollerHeight();
    listContainerEl.style.maxHeight = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : '';
    this.reposition();
  };

  clickHandler = (): void => {
    this.active = !this.active;
    this.updateActiveItemIndex(0);
    this.setFocus();
  };

  setInactiveIfNotContained = (event: Event): void => {
    const composedPath = event.composedPath();
    if (!this.active || composedPath.includes(this.el) || composedPath.includes(this.referenceEl)) {
      return;
    }
    if (this.textInput) {
      this.textInput.value = '';
    }
    this.text = '';
    this.filterItems('');
    this.updateActiveItemIndex(-1);
    this.active = false;
  };

  setMenuEl = (el: HTMLDivElement): void => {
    this.menuEl = el;
  };

  setListContainerEl = (el: HTMLDivElement): void => {
    this.resizeObserver.observe(el);
    this.listContainerEl = el;
  };

  setReferenceEl = (el: HTMLDivElement): void => {
    this.referenceEl = el;
  };

  getModifiers(): Partial<StrictModifiers>[] {
    const eventListenerModifier: Partial<StrictModifiers> = {
      name: 'eventListeners',
      enabled: this.active,
    };

    return [eventListenerModifier];
  }

  createPopper(): void {
    this.destroyPopper();
    const { menuEl, referenceEl, overlayPositioning } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement: defaultMenuPlacement,
      referenceEl,
    });
  }

  destroyPopper(): void {
    const { popper } = this;

    if (popper) {
      popper.destroy();
    }

    this.popper = null;
  }

  private getMaxScrollerHeight(): number {
    const items = this.getCombinedItems().filter(item => !item.hidden);

    const { maxItems } = this;

    let itemsToProcess = 0;
    let maxScrollerHeight = 0;

    if (items.length > maxItems) {
      items.forEach(item => {
        if (itemsToProcess < maxItems && maxItems > 0) {
          const height = this.singleItemHeight(item);
          if (height > 0) {
            maxScrollerHeight += height;
            itemsToProcess++;
          }
        }
      });
    }

    return maxScrollerHeight;
  }

  inputHandler = (event: Event): void => {
    const value = (event.target as HTMLInputElement).value;
    this.rdsOnInput.emit(value);
    this.text = value;
    this.filterItems(value);
    this.active = true;
  };

  validateHandler = (): void => {
    if (this.validate) {
      this.textInput.validateConstraint();
      if (this.value && this.textInput.hasAttribute('role')) {
        this.textInput.removeAttribute('role');
        this.textInput.shadowRoot.querySelector('.error-icon-container').remove();
      }
    }
  };

  getCombinedItems(): HTMLRdsComboboxItemElement[] {
    return [...this.items];
  }

  filterItems = (() => {
    const find = (item: HTMLRdsComboboxItemElement, filteredData: ItemData[]) =>
      item &&
      filteredData.some(({ label, value }) => {
        return value === item.textLabel || value === item.value || label === item.textLabel || label === item.value;
      });

    return debounce((text: string): void => {
      const filteredData = filter(this.data, text);
      const items = this.getCombinedItems();
      items.forEach(item => {
        const hidden = !find(item, filteredData);
        item.hidden = hidden;
      });

      this.visibleItems = this.getVisibleItems();
      this.rdsComboboxFilterChange.emit({ visibleItems: [...this.visibleItems], text: text });
    }, 100);
  })();

  internalComboboxChangeEvent = (): void => {
    const { selectedItem } = this;
    this.rdsComboboxChange.emit({ selectedItem });
  };

  emitComboboxChange = debounce(this.internalComboboxChangeEvent, 0);

  toggleSelection(item: HTMLRdsComboboxItemElement, value = !item.selected): void {
    if (!item) {
      return;
    }
    this.ignoreSelectedEventsFlag = true;
    this.items.forEach(el => (el.selected = el === item ? value : false));
    this.ignoreSelectedEventsFlag = false;
    this.selectedItem = this.getSelectedItem();
    this.emitComboboxChange();
    if (this.textInput) {
      this.textInput.value = item.textLabel;
    }
    this.active = false;
    this.updateActiveItemIndex(-1);
    this.resetText();
    this.filterItems('');
  }

  getVisibleItems(): HTMLRdsComboboxItemElement[] {
    return this.items.filter(item => !item.hidden);
  }

  getSelectedItem(): HTMLRdsComboboxItemElement {
    const match = this.items.find(({ selected }) => selected);
    return match ? match : null;
  }

  updateItems = (): void => {
    this.items = this.getItems();
    this.data = this.getData();
    this.selectedItem = this.getSelectedItem();
    this.visibleItems = this.getVisibleItems();
    this.setMaxScrollerHeight();
  };

  getData(): ItemData[] {
    return this.items.map(item => ({
      value: item.value,
      label: item.textLabel,
      guid: item.guid,
    }));
  }

  resetText(): void {
    if (this.textInput) {
      this.textInput.value = '';
    }
    this.text = '';
  }

  getItems(): HTMLRdsComboboxItemElement[] {
    const items: HTMLRdsComboboxItemElement[] = Array.from(this.el.querySelectorAll('RDS-COMBOBOX-ITEM'));
    return items.filter(item => !item.disabled);
  }

  private singleItemHeight(item: HTMLRdsComboboxItemElement): number {
    let height = item.offsetHeight;
    return height;
  }

  private scrollToActiveItem = (): void => {
    const activeItem = this.visibleItems[this.activeItemIndex];
    const height = this.singleItemHeight(activeItem);
    const { offsetHeight, scrollTop } = this.listContainerEl;
    if (offsetHeight + scrollTop < activeItem.offsetTop + height) {
      this.listContainerEl.scrollTop = activeItem.offsetTop - offsetHeight + height;
    } else if (activeItem.offsetTop < scrollTop) {
      this.listContainerEl.scrollTop = activeItem.offsetTop;
    }
  };

  shiftActiveItemIndex(delta: number): void {
    const { length } = this.visibleItems;
    const newIndex = (this.activeItemIndex + length + delta) % length;
    this.updateActiveItemIndex(newIndex);
    this.scrollToActiveItem();
  }

  updateActiveItemIndex(index: number): void {
    this.activeItemIndex = index;
    let activeDescendant: string = null;
    this.visibleItems.forEach((el, i) => {
      if (i === index) {
        el.active = true;
        activeDescendant = el.guid;
      } else {
        el.active = false;
      }
    });
    this.activeDescendant = activeDescendant;
    if (this.activeItemIndex > -1) {
      this.textInput?.focus();
    }
  }

  comboboxFocusHandler = (): void => {
    this.textInput?.focus();
  };

  comboboxBlurHandler = (event: CustomEvent<FocusEvent>): void => {
    this.setInactiveIfNotContained(event);
    this.validateHandler();
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderInput(): VNode {
    const { guid } = this;
    return (
      <span class="input-wrap">
        <div class="label-container">
          <rds-label for={`${inputUidPrefix}${guid}`}>{this.label}</rds-label>
          {!this.required ? <span class="optional">Optional</span> : null}
        </div>
        <rds-input
          aria-activedescendant={this.activeDescendant}
          aria-autocomplete="list"
          aria-controls={`${listboxUidPrefix}${guid}`}
          aria-label={this.label}
          disabled={this.disabled}
          id={`${inputUidPrefix}${guid}`}
          onRdsOnBlur={this.comboboxBlurHandler}
          onRdsOnFocus={this.comboboxFocusHandler}
          onRdsOnInput={this.inputHandler}
          placeholder={this.placeholder}
          value={this.selectedItem ? this.selectedItem.textLabel : null}
          required={this.required}
          ref={el => (this.textInput = el as HTMLRdsInputElement)}
          type="text"
          key="input"
        >
          <rds-hero-icon slot="icon-end" name="selector" color="gray-400" />
          <div slot="help-text">
            <slot name="help-text" />
          </div>
          <div slot="error-text">
            <slot name="error-text" />
          </div>
        </rds-input>
      </span>
    );
  }

  renderListBoxOptions(): VNode[] {
    return this.visibleItems.map(item => (
      <li aria-selected={(!!item.selected).toString()} id={item.guid ? `${itemUidPrefix}${item.guid}` : null} role="option" tabindex="-1">
        {item.textLabel}
      </li>
    ));
  }

  renderPopperContainer(): VNode {
    const { active, setMenuEl, setListContainerEl } = this;
    return (
      <div aria-hidden="true" class={{ 'popper-container': true, 'popper-container--active': active }} ref={setMenuEl}>
        <div
          class="list-container"
          onTransitionEnd={this.transitionEnd}
          onClick={this.validateHandler}
          ref={setListContainerEl}
          style={{ display: this.data?.length > 0 || this.loading || this.error || this.noResult || this.noActiveItems ? 'block' : 'none' }}
        >
          <ul class={{ 'list': true, 'list--hide': !active }}>
            <slot />
            {this.loading ? (
              <rds-flex justify-content="center">
                <rds-spinner size="sm" />
              </rds-flex>
            ) : null}
            {this.error ? (
              <li class="no-items" tabindex="-1">
                An error occured. Please try again.
              </li>
            ) : null}
            {this.noResult ? (
              <li class="no-items" tabindex="-1">
                No results found.
              </li>
            ) : null}
            {this.noActiveItems && !this.noResult && !this.loading && !this.error ? (
              <li class="no-items" tabindex="-1">
                No options match your search.
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }

  render(): VNode {
    const { active, guid } = this;

    return (
      <Host onKeyDown={this.keydownHandler}>
        <div
          aria-autocomplete="list"
          aria-expanded={active.toString()}
          aria-haspopup="listbox"
          aria-labelledby={`${labelUidPrefix}${guid}`}
          aria-owns={`${listboxUidPrefix}${guid}`}
          class={{
            'wrapper': true,
            'wrapper--active': active,
          }}
          onClick={this.clickHandler}
          ref={this.setReferenceEl}
          role="combobox"
        >
          <div class="grid-input">{this.renderInput()}</div>
        </div>
        <ul aria-labelledby={`${labelUidPrefix}${guid}`} class="sr-only" id={`${listboxUidPrefix}${guid}`} role="listbox" tabIndex={-1}>
          {this.renderListBoxOptions()}
        </ul>
        {this.renderPopperContainer()}
      </Host>
    );
  }
}
