import { Component, Element, Event, EventEmitter, Method, Listen, Prop, State, h, Host, Watch } from '@stencil/core';
import { InputChangeEventDetail, AutocompleteTypes } from '../../interfaces';
import { getKey } from '../../../utils/keys';
import { getSlotted } from '../../../utils/dom';

/**
 * @slot help-text - Sets and adds optional helper text to your select.
 * @slot error-text - Use this slot to set error text for your select.
 */

@Component({
  tag: 'rds-select',
  styleUrl: 'rds-select.scss',
  shadow: true,
})
export class RdsSelect {
  private selectId = `rds-select-${selectIds++}`;
  private didInit = false;
  private nativeSelect?: HTMLSelectElement;

  /** Counter for custom select accessible keydown toggling */
  currentSelected = 0;

  /** Sets index of custom select's selected option */
  customSelectedIndex = 0;

  @State() value: string;
  @State() selected: boolean;

  /**
   * Sets custom validator and/or contraint validator state.
   */
  @State() isValid: boolean = true;

  @Element() el!: HTMLElement;

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: AutocompleteTypes = 'off';

  /**
   * The name attribute of the select element.
   */
  @Prop() name: string = this.selectId;

  /**
   * @internal
   * The selected list item of the custom select
   */
  @Prop({ mutable: true }) customSelected: any;

  /**
   * If `true` select is using native HTML for select. Otherwise, will be a custom element.
   */
  @Prop() native: boolean = true;

  /**
   * If `true`, select is set to disabled mode.
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * If `true`, select will be in error/invalid mode.
   */
  @Prop() error: boolean = false;

  /**
   * @deprecated
   * If `true`, and slot contents are fulfilled, help text will appear below select component.
   */
  @Prop() helptext: boolean = false;

  /**
   * Label to be displayed in relation to its `RdsSelect` component.
   */
  @Prop() label: string = '';

  /**
   * if `true` multi-select mode will be enabled.
   */
  @Prop() multiple: boolean = false;

  /**
   * Whether or not the select component is required.
   */
  @Prop() required: boolean = false;

  /**
   * If `true`, the select will be validated against the constraint validators that are set.
   */
  @Prop() validate?: boolean = false;

  /**
   * @deprecated
   * The width of the select component.
   */
  @Prop() width: string = 'full';

  /**
   * Emitted when the selects's value has changed.
   */
  @Event() rdsOnChange!: EventEmitter<InputChangeEventDetail>;

  /**
   * Emitted when the select has focus.
   */
  @Event() rdsOnFocus!: EventEmitter<void>;

  /**
   * Emitted when the select loses focus.
   */
  @Event({ bubbles: true }) rdsOnBlur!: EventEmitter<void>;

  @Method()
  async validateConstraint() {
    if (this.validate) {
      if (this.nativeSelect.checkValidity()) {
        this.isValid = true;
        return true;
      } else {
        this.isValid = false;
        return false;
      }
    }
  }

  @Listen('click', { capture: true })
  /** Toggles the `show-list` class on the custom select */
  toggleList() {
    if (!this.native) {
      if (this.el.shadowRoot.getElementById('list').classList.contains('show-list')) {
        this.el.shadowRoot.getElementById('list').classList.remove('show-list');
      } else {
        this.el.shadowRoot.getElementById('list').classList.add('show-list');
      }
    }
  }

  @Listen('focusout', { capture: true })
  /** Removes the `show-list` class on the custom select */
  hideList() {
    if (!this.native) {
      this.el.shadowRoot.getElementById('list').classList.remove('show-list');
    }
  }

  /** Handles the keydown accessibility of the custom select list */
  @Listen('keydown') keyDownHandler(e: KeyboardEvent) {
    if (e.target === this.el && !this.native) {
      switch (getKey(e.key)) {
        case ' ':
          e.preventDefault();
          this.showList();
          this.updateValueKeydown(this.el.shadowRoot.getElementById('list').children[this.currentSelected]);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (this.currentSelected > 0) {
            this.currentSelected--;
            this.updateValueKeydown(this.el.shadowRoot.getElementById('list').children[this.currentSelected]);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (this.currentSelected < this.el.shadowRoot.getElementById('list').children.length - 1) {
            this.currentSelected++;
            this.updateValueKeydown(this.el.shadowRoot.getElementById('list').children[this.currentSelected]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          this.hideList();
          this.updateValueKeydown(this.el.shadowRoot.getElementById('list').children[this.currentSelected]);
          break;
        case 'Enter':
          e.preventDefault();
          this.toggleList();
          this.updateValueKeydown(this.el.shadowRoot.getElementById('list').children[this.currentSelected]);
          break;
      }
    }
  }

  @Watch('value')
  valueChanged() {
    if (this.didInit) {
      this.rdsOnChange.emit({
        value: this.value,
      });
    }
  }

  /**
   * FOR CLICK
   * Adds a `selected` class to the custom list item, and updates the hidden native select/custom select with the correct value.
   */
  updateValueClicked = e => {
    let initialOptions = this.el.querySelectorAll('option');
    let customSelect = this.el.shadowRoot.getElementById('list');
    let customOptions = customSelect.children;
    for (let i = 0; i < customOptions.length; i++) {
      customOptions[i].classList.remove('selected');
      e.target.classList.add('selected');
      this.value = e.target.getAttribute('data-value');
      for (let j = 0; j < initialOptions.length; j++) {
        if (initialOptions[j].value == e.target.getAttribute('data-value')) {
          this.customSelected = initialOptions[j];
          customSelect.setAttribute('aria-activedescendant', customOptions[i].getAttribute('id'));
          initialOptions[j].selected = true;
          let select: any = this.el.shadowRoot.getElementById(this.selectId);
          select.value = e.target.getAttribute('data-value');
        }
      }
    }
  };

  /**
   * FOR KEYDOWN
   * Adds a `selected` class to the custom list item, and updates the hidden native select/custom select with the correct value.
   */
  updateValueKeydown(listItem) {
    let initialOptions = this.el.querySelectorAll('option');
    let customSelect = this.el.shadowRoot.getElementById('list');
    let customOptions = customSelect.children;
    this.value = listItem.getAttribute('data-value');
    for (let i = 0; i < customOptions.length; i++) {
      customOptions[i].classList.remove('selected');
      listItem.classList.add('selected');
      for (let j = 0; j < initialOptions.length; j++) {
        if (initialOptions[j].value == listItem.getAttribute('data-value')) {
          this.customSelected = initialOptions[j];
          customSelect.setAttribute('aria-activedescendant', customOptions[i].getAttribute('id'));
          initialOptions[j].selected = true;
          let select: any = this.el.shadowRoot.getElementById(this.selectId);
          select.value = listItem.getAttribute('data-value');
        }
      }
    }
  }

  private onInput = e => {
    this.selected = e.target.value;
  };

  private onFocus = () => {
    this.rdsOnFocus.emit();
  };

  private onBlur = () => {
    this.validateConstraint();
    this.rdsOnBlur.emit();
  };

  private onChange = e => {
    this.rdsOnChange.emit({
      value: e.target.value,
    });
  };

  /**
   * Adds `show-list` class to the custom select list
   */
  private showList() {
    if (!this.native) {
      this.el.shadowRoot.getElementById('list').classList.add('show-list');
    }
  }

  /**
   * Gets all select option items.
   */
  private getInitialOptions() {
    return Array.from(this.el.querySelectorAll('option'));
  }

  /**
   * Get the closest `RdsLabel` sibling to the `RdsSelect` component.
   */
  getItemLabel = (componentEl: HTMLElement): HTMLRdsLabelElement | null => {
    const itemEl = componentEl.closest('rds-select');
    if (itemEl) {
      return itemEl.querySelector('rds-label');
    }
    return null;
  };

  componentWillLoad() {
    // Sets the initial custom select value
    if (!this.native) {
      const options = this.el.querySelectorAll('option');
      let foundSelected;
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          foundSelected = options[i];
          this.customSelectedIndex = i;
        }
      }
      if (foundSelected) {
        this.customSelected = foundSelected;
      } else {
        this.customSelected = this.el.querySelectorAll('option')[0];
      }
    }
  }

  componentDidLoad() {
    // Passes the disabled attribute to the label component
    this.el.childNodes.forEach(element => {
      if (element['disabled']) {
        element['disabled'] = this.disabled;
      }
    });

    this.didInit = true;
  }

  render() {
    const hasHelpText = getSlotted(this.el, 'help-text');
    const hasErrorText = getSlotted(this.el, 'error-text');

    return (
      <Host aria-disabled={this.disabled ? 'true' : null} role={this.error || !this.isValid ? 'alert' : null}>
        {/* Native & Custom Label */}
        {this.label ? (
          <div class="label-container" id="label">
            <rds-label for={this.selectId} id={!this.native ? 'listbox-label' : null} class="label">
              {this.label ? this.label : null}
            </rds-label>
            {!this.required ? <div class="optional">Optional</div> : ''}
          </div>
        ) : null}
        <div class="select-container">
          {/* Native Multi-select */}
          {this.multiple && this.native ? (
            <div class="multiple-container">
              <select
                multiple
                autoComplete={this.autocomplete}
                name={this.name}
                id={this.selectId}
                disabled={this.disabled ? true : null}
                required={this.required}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onInput={this.onInput}
                onChange={this.onChange}
                ref={select => (this.nativeSelect = select)}
              >
                {this.getInitialOptions().map(formItem => (
                  <option value={formItem.value} disabled={formItem.disabled}>
                    {formItem.innerText}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {/* Custom Select Items */}
          {!this.multiple && !this.native ? (
            <div>
              {/* Custom Select 'list' - Used to display items with more styling options */}
              <ul
                class="custom-list"
                id="list"
                tabindex="-1"
                role="listbox"
                aria-label="List of options"
                aria-labelledby="listbox-label"
                aria-activedescendant={`listbox-option-` + this.customSelectedIndex}
                onBlur={this.onBlur}
              >
                {this.getInitialOptions().map((formItem, i) => (
                  <li
                    class={formItem.selected ? 'selected custom-list-item' : 'custom-list-item'}
                    data-value={formItem.value}
                    aria-disabled={formItem.disabled}
                    id={'listbox-option-' + i}
                    role="option"
                    onClick={this.updateValueClicked}
                  >
                    <span class="custom-list-item--text" title={formItem.innerText}>
                      {formItem.innerText}
                    </span>
                    <span class="custom-check">
                      <rds-hero-icon name="check" />
                    </span>
                  </li>
                ))}
              </ul>
              {/* Native Select Exists - But Is Hidden */}
              <select
                class="hidden"
                name={this.name}
                id={this.selectId}
                disabled={this.disabled ? true : null}
                required={this.required}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onInput={this.onInput}
                onChange={this.onChange}
                ref={select => (this.nativeSelect = select)}
              >
                {this.getInitialOptions().map(formItem => (
                  <option selected={formItem.selected} value={formItem.value} disabled={formItem.disabled}>
                    {formItem.innerText}
                  </option>
                ))}
              </select>
              {/* Custom Select 'button' - Used to trigger list item */}
              <button
                class="custom-button"
                id="custom-button"
                disabled={this.disabled ? true : null}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onInput={this.onInput}
                onChange={this.onChange}
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                tabindex="0"
              >
                <span class="custom-selected">{this.customSelected.innerText}</span>
                <span>
                  <rds-hero-icon name="chevron-down" />
                </span>
              </button>
            </div>
          ) : null}
          {/* Native Select Items */}
          {!this.multiple && this.native ? (
            <div>
              <select
                name={this.name}
                id={this.selectId}
                disabled={this.disabled ? true : null}
                required={this.required}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onInput={this.onInput}
                onChange={this.onChange}
                aria-describedby={this.label ? 'help-text' : null}
                aria-labelledby={this.label ? 'label' : null}
                ref={select => (this.nativeSelect = select)}
              >
                {this.getInitialOptions().map(formItem => (
                  <option selected={formItem.selected} value={formItem.value} disabled={formItem.disabled}>
                    {formItem.innerText}
                  </option>
                ))}
              </select>
              <div class="icon-container">
                <rds-hero-icon name="chevron-down" />
              </div>
            </div>
          ) : null}
        </div>
        {this.isValid && hasHelpText ? (
          <div id="help-text">
            <slot name="help-text" />
          </div>
        ) : null}
        {this.error || !this.isValid ? <div id="error-text">{(this.error || !this.isValid) && hasErrorText ? <slot name="error-text" /> : null}</div> : null}
      </Host>
    );
  }
}

// Variable used to set name & relationship of label/select
let selectIds = 0;
