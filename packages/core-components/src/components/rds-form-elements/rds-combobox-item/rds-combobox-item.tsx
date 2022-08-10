import { Component, Element, Event, EventEmitter, Host, Method, Prop, h, Watch, VNode } from '@stencil/core';
import { guid } from '../../../utils/utils';
import { connectConditionalSlotComponent, disconnectConditionalSlotComponent } from '../../../utils/conditionalSlot';
import { updateHostInteraction } from '../../../utils/interactive';

@Component({
  tag: 'rds-combobox-item',
  styleUrl: 'rds-combobox-item.scss',
  shadow: true,
})
export class RdsComboboxItem {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** When true, the item cannot be clicked and is visually muted. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
  @Prop({ reflect: true, mutable: true }) selected: boolean = false;

  /** True when item is highlighted either from keyboard or mouse hover */
  @Prop() active: boolean = false;

  /** Unique identifier, used for accessibility */
  @Prop() guid: string = guid();

  @Watch('selected')
  selectedWatchHandler(): void {
    this.rdsComboboxItemChange.emit(this.el);
  }

  /** The main label for this item. */
  @Prop({ reflect: true }) textLabel!: string;

  /** The item's associated value */
  @Prop() value!: any;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLRdsComboboxItemElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted whenever the item is selected or unselected.
   */
  @Event() rdsComboboxItemChange: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Used to toggle the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   */
  @Method()
  async toggleSelected(coerce?: boolean): Promise<void> {
    if (this.disabled) {
      return;
    }
    this.selected = typeof coerce === 'boolean' ? coerce : !this.selected;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  itemClickHandler = (event: MouseEvent): void => {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    this.selected = !this.selected;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host aria-hidden="true" class={{ selected: this.selected, active: this.active }} onClick={this.itemClickHandler}>
        <li id={this.guid}>
          <span>{this.textLabel}</span>
          {this.selected ? <rds-hero-icon name="check" /> : null}
        </li>
      </Host>
    );
  }
}
