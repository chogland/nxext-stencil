import { Component, Prop, Host, Event, EventEmitter, Element, Listen, h } from '@stencil/core';
import { getSlotted } from '../../utils/dom';
import { getKey } from '../../utils/keys';

/**
 * @slot - Used to add content to your menu item.
 * @slot selection - Used to add a checkbox to your menu item in the case of a selection.
 */
@Component({
  tag: 'rds-menu-item',
  styleUrl: 'rds-menu-item.scss',
  shadow: true,
})
export class RdsMenuItem {
  @Element() el: HTMLRdsMenuItemElement;
  /**
   * Set the disabled state of a menu item.
   */
  @Prop() disabled?: boolean = false;

  /**
   * Adds a divider to a menu item.
   */
  @Prop() divider?: boolean = false;

  /**
   * The value of the menu item.
   */
  @Prop({ mutable: true }) value?: string = '';

  @Event() rdsMenuItemSelect: EventEmitter;

  /**
   * Event emitted from menuitem to bubble up to the menu component
   * @internal
   */
  @Event({ bubbles: true }) selectedEvent: EventEmitter<boolean>;

  @Listen('click') onClick(): void {
    this.emitRequestedItem();
    let hasChecked = false;
    this.el.childNodes.forEach(element => {
      if (element['checked']) {
        hasChecked = true;
        this.selectedEvent.emit(true);
      }
    });
    if (!hasChecked) {
      this.selectedEvent.emit(false);
    }
  }

  /** Emits the requested menu item when Enter is pressed on that menu item */
  @Listen('keydown')
  keyDownHandler(e: KeyboardEvent) {
    switch (getKey(e.key)) {
      case 'Enter':
        this.emitRequestedItem();
        break;
    }
  }

  render() {
    const hasSelection = getSlotted(this.el, 'selection');
    const divider = this.divider ? 'divider ' : '';
    const disabled = this.disabled ? 'disabled ' : '';
    const classes = disabled + divider;

    return (
      <Host style={{ pointerEvents: this.disabled ? 'none' : undefined }} value={this.value} selection={hasSelection ? true : null} tabIndex="1">
        <li class={classes} role="menuitem">
          <slot></slot>
          {hasSelection ? <slot name="selection"></slot> : null}
        </li>
      </Host>
    );
  }

  private emitRequestedItem(): void {
    this.rdsMenuItemSelect.emit({
      requestedMenuItem: this.el,
    });
  }
}
