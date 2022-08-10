import { Component, Host, h, Prop, State, Element, Method, Listen, Event, EventEmitter, Watch } from '@stencil/core';
import { StrictModifiers, Instance as Popper } from '@popperjs/core';
import { PopperPlacement, createPopper, updatePopper, OverlayPositioning } from '../../utils/popper';
import { MenuWidth } from '../interfaces';
import { guid } from '../../utils/utils';
import { getKey } from '../../utils/keys';
import { getSlotted } from '../../utils/dom';

/**
 * @slot menu-trigger - Use this slot to add a menu trigger to your component. Please use a `RdsButton` or `RdsLink` as the trigger in this slot.
 * @slot custom-trigger - Use this slot to add a custom menu trigger to your component. You must control the toggling of the menu yourself when using this slot.
 * @slot menu-content - Use this slot to add as many menu content items as needed. Please use the `RdsMenuItem` component in this slot.
 * @slot menu-header - Use this slot to add a header to your menu panel, which would appear before your menu-content slot items.
 * @slot menu-footer - Use this slot to add a footer to your menu panel, which would appear below your menu-content slot items.
 */

@Component({
  tag: 'rds-menu',
  styleUrl: 'rds-menu.scss',
  shadow: true,
})
export class RdsMenu {
  popper: Popper;
  menuGuid: string = `rds-menu-${guid()}`;
  hoverOffsetDistance: number;

  /** Counter for menu accessible keydown toggling */
  currentSelected = 0;

  @Element() el: HTMLRdsMenuElement;

  @State() selected: boolean = false;

  /**
   * Sets the behavior of the menu trigger as hover instead of click.
   */
  @Prop() hover: boolean = false;

  /**
   * Sets the position of the menu.
   */
  @Prop() position: PopperPlacement = 'bottom';

  /**
   * Toggles the dropshadow on the panel.
   * @deprecated
   */
  @Prop() shadow: boolean = false;

  /**
   * Sets the menu trigger to disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Sets the scrolling of the panel on the menu.
   */
  @Prop() scrolling: boolean = false;

  /**
   * Sets the width of the panel.
   * @deprecated
   */
  @Prop() width: MenuWidth = 'auto';

  /**
   * The open state of the menu.
   */
  @Prop({ mutable: true }) isOpen = false;

  /**
   * Offset the position of the popover away from the reference element.
   */
  @Prop({ mutable: true }) offsetDistance = 16;

  /**
   * Offset the position of the popover along the reference element.
   */
  @Prop() offsetSkidding = 0;

  /**
   * Disables the automatic closing on menu item click.
   */
  @Prop() disableClose: boolean = false;

  /** Describes the type of positioning to use for the overlaid content. */
  @Prop() overlayPositioning: OverlayPositioning = 'absolute';

  @State() effectiveReferenceElement: HTMLElement;

  /**
   * This is set based on if RdsSearch exists in the menu.
   * This prevents the panel from resizing as results change.
   */
  search: boolean = false;

  /** Toggles the menu. */
  @Method()
  async toggleMenu() {
    if (!this.hover) {
      this.isOpen = !this.isOpen;
    }
  }

  /** Opens the menu. */
  @Method()
  async openMenu() {
    this.isOpen = true;
  }

  /** Closes the menu. */
  @Method()
  async closeMenu() {
    this.isOpen = false;
  }

  mouseEnter() {
    if (this.hover) {
      this.openMenu();
    }
  }

  mouseLeave() {
    if (this.hover) {
      this.closeMenu();
    }
  }

  /** Fires when a menu item has been selected or deselected. **/
  @Event() rdsMenuSelect: EventEmitter;

  @Listen('rdsMenuItemSelect')
  handleItemSelect(event) {
    this.rdsMenuSelect.emit(event as HTMLInputElement);
    if (!this.disableClose) {
      this.closeMenu();
    }
    if (!this.selected) {
      this.selectedEventHandler(event);
      this.selected = !this.selected;
    }
    for (let i = 0; i < this.el.getElementsByTagName('rds-menu-item').length; i++) {
      this.el.getElementsByTagName('rds-menu-item')[i].classList.remove('selected');
    }
    for (let j = 0; j < this.el.getElementsByTagName('rds-menu-item').length; j++) {
      if (event.target == this.el.getElementsByTagName('rds-menu-item')[j]) {
        this.el.getElementsByTagName('rds-menu-item')[j].classList.add('selected');
      }
    }
  }

  /** Handles the keydown accessibility of the menu */
  @Listen('keydown')
  keyDownHandler(e: KeyboardEvent) {
    switch (getKey(e.key)) {
      // For escape
      case 'Escape':
        e.preventDefault();
        this.closeMenu();
        break;
      case 'Enter':
        e.preventDefault();
        this.isOpen = !this.isOpen;
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this.currentSelected > 0) {
          this.currentSelected--;
          (this.el.getElementsByTagName('rds-menu-item')[this.currentSelected - 1] as HTMLElement).focus();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (this.currentSelected < this.el.getElementsByTagName('rds-menu-item').length) {
          this.currentSelected++;
          (this.el.getElementsByTagName('rds-menu-item')[this.currentSelected - 1] as HTMLElement).focus();
        }
        break;
    }
  }

  @Listen('click', { target: 'window' }) handleBodyClick(event) {
    if (!this.isOpen) {
      return;
    }

    // This determines if the event happens in itself, if it did, do nothing.
    for (let t = event.target; !!t; t = t.parentElement) {
      if (t === this.el) {
        return;
      }
    }

    // When you click outside this will close the element
    this.isOpen = false;
  }

  /**
   * Listener and handler for selectedEvent from RdsMenuItem
   */
  @Listen('selectedEvent')
  selectedEventHandler(event: CustomEvent<boolean>) {
    let shouldBeSelected = false;

    // If emitted false
    if (!event.detail) {
      this.el.childNodes.forEach(element => {
        element['selected'] = false;
      });

      this.el.childNodes.forEach(child => {
        child.childNodes.forEach(grandchild => {
          if (grandchild['checked']) {
            shouldBeSelected = true;
          }
        });
      });
    }

    // If emitted true, or if a grandchild has the 'checked' attribute
    if (shouldBeSelected || event.detail) {
      this.el.childNodes.forEach(element => {
        element['selected'] = true;
      });
    }
  }

  @Watch('isOpen')
  isOpenChanged(newIsOpen: boolean) {
    // Passes the menu state to the button component
    this.el.childNodes.forEach(element => {
      element['open'] = newIsOpen;
    });
  }

  @Watch('offsetDistance')
  offsetDistanceOffsetHandler() {
    this.reposition();
  }

  @Watch('offsetSkidding')
  offsetSkiddingHandler() {
    this.reposition();
  }

  @Watch('position')
  placementHandler() {
    this.reposition();
  }

  componentWillLoad() {
    if (this.hover) {
      this.hoverOffsetDistance = this.offsetDistance;
      this.offsetDistance = 0;
    }
  }

  componentDidLoad() {
    // Passes the disabled attributes to the child components
    if (this.disabled) {
      this.el.childNodes.forEach(element => {
        element['disabled'] = this.disabled;
      });
    }
  }

  componentDidRender() {
    this.createPopper();

    // Adds margin to panel's child instead of panel if hover == true
    if (this.hover) {
      this.el.shadowRoot.getElementById('menu-panel-child').style.margin = this.hoverOffsetDistance.toString() + 'px';
    }
  }

  disconnectedCallback() {
    this.destroyPopper();
  }

  connectedCallback() {
    const search = this.el.querySelectorAll('rds-search');
    if (search.length > 0) {
      this.search = true;
    }
  }

  @Method()
  async reposition(): Promise<void> {
    const { popper, position } = this;
    const modifiers = this.getModifiers();

    popper
      ? updatePopper({
          modifiers,
          placement: position,
          popper,
        })
      : this.createPopper();
  }

  getModifiers(): Partial<StrictModifiers>[] {
    const { offsetDistance, offsetSkidding } = this;

    const offsetModifier: Partial<StrictModifiers> = {
      name: 'offset',
      enabled: true,
      options: {
        offset: [offsetSkidding, offsetDistance],
      },
    };

    return [offsetModifier];
  }

  createPopper() {
    this.destroyPopper();
    const { position, overlayPositioning } = this;
    const modifiers = this.getModifiers();
    const referenceEl = this.el.shadowRoot.getElementById('menu-manager');
    const el = this.el.shadowRoot.getElementById(this.menuGuid);

    this.popper = createPopper({
      el: el,
      modifiers: modifiers,
      placement: position,
      overlayPositioning: overlayPositioning,
      referenceEl: referenceEl,
    });
  }

  destroyPopper() {
    const { popper } = this;

    if (popper) {
      popper.destroy();
    }

    this.popper = null;
  }

  render() {
    const position = this.position ? { position: this.position } : null;
    const disabled = this.disabled ? 'disabled' : null;
    const hover = this.hover ? 'hover' : null;
    const classes = disabled ? disabled : hover ? ' ' + hover : null;
    const hasTrigger = getSlotted(this.el, 'menu-trigger');
    const hasCustomTrigger = getSlotted(this.el, 'custom-trigger');

    return (
      <Host aria-expanded={this.isOpen} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} class={classes}>
        {hasTrigger ? (
          <div id="menu-manager">
            <div onClick={this.toggleMenu.bind(this)}>
              <slot name="menu-trigger" aria-haspopup="menu" aria-describedby={this.menuGuid} />
            </div>
          </div>
        ) : null}
        {hasCustomTrigger ? (
          <div id="menu-manager">
            <slot name="custom-trigger" aria-describedby={this.menuGuid} aria-haspopup="menu" />
          </div>
        ) : null}
        <ul
          class={{
            'menu-panel': true,
            'hasSearch': this.search,
          }}
          role="menu"
          reference-element="menu-manager"
          aria-labelledby="menu-manager"
          id={this.menuGuid}
          hidden={!this.isOpen ? true : null}
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            margin: '0',
          }}
          {...position}
        >
          <div id="menu-panel-child">
            <slot name="menu-header"></slot>
            {this.scrolling ? (
              <div class="menu-scroll-wrapper">
                <slot name="menu-content"></slot>
              </div>
            ) : (
              <slot name="menu-content"></slot>
            )}
            <slot name="menu-footer"></slot>
          </div>
        </ul>
      </Host>
    );
  }
}
