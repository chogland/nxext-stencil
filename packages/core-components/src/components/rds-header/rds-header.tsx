import { Component, Host, Element, Event, EventEmitter, Listen, State, Prop, h } from '@stencil/core';
import { getSlotted } from '../../utils/dom';

/**
 * @slot search - Used to place a search component inside the header.
 * @slot profile - Used to add a profile pattern on the right side of the header.
 * @slot logo - Used to add the FM Global logo on the left side of the header.
 * @slot account-selector - Used to add an account selector on the left side of the header, just right of the logo if it exists.
 * @slot - Used to add content to the header without any formatting included.
 */
@Component({
  tag: 'rds-header',
  styleUrl: 'rds-header.scss',
  shadow: true,
})
export class RdsHeader {
  @Element() el: HTMLRdsChipElement;
  /**
   * @deprecated
   * Determines the header type.
   * Options are: 'base' for latest, leave blank for default layout.
   */
  @Prop({ reflect: true }) type?: string;

  /**
   * This property removes the mobile navigation bars from mobile when a navigation component doesn't exist.
   */
  @Prop({ reflect: true }) nav: boolean = true;

  /**
   * @internal
   * Inherited from app layout.
   */
  @Prop({ reflect: true }) sidebar: string = 'left';

  @State() open: boolean = false;

  /**
   * Event emitted when nav is opened by click
   */
  @Event() openNav: EventEmitter;

  /**
   * Event emitted when nav is closed by click
   */
  @Event() closeNav: EventEmitter;

  toggleNavBar() {
    this.open = !this.open;
    if (this.open) {
      this.openNav.emit();
      window.scrollTo(0, 0);
    } else {
      this.closeNav.emit();
    }
  }

  /**
   * Listen for close nav event click
   */
  @Listen('backdropCloseNav', {
    target: 'body',
  })
  backdropCloseNav() {
    this.open = false;
  }

  renderBaseLayout() {
    const hasSearch = getSlotted(this.el, 'search');
    return (
      <Host class={{ 'nav-open': this.open }}>
        {this.nav ? (
          <button type="button" class={{ 'open-sidebar': true, 'open': this.open }} onClick={this.toggleNavBar.bind(this)}>
            <span class="sr-only">{this.open ? 'Close' : 'Open'} sidebar</span>
            <rds-hero-icon name={this.open ? 'x' : 'menu'} size="lg" />
          </button>
        ) : null}
        <div class="header-inner">
          <slot />
          {hasSearch ? (
            <div class="header-search">
              <slot name="search" />
            </div>
          ) : null}
          <div class="header-profile-outer">
            <div class="header-profile-inner">
              <slot name="profile"></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
  /**
   * @deprecated
   * Deprecate this method to support only base.
   */
  renderDefaultLayout() {
    return (
      <Host>
        {this.nav ? (
          <div class={{ 'menu-activate': true, 'open': this.open }} onClick={this.toggleNavBar.bind(this)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <div />
        )}
        <div class="logo-wrapper">
          <slot name="logo"></slot>
        </div>
        <div class="profile">
          <slot name="profile"></slot>
        </div>
        <div class="account-selector">
          <slot name="account-selector"></slot>
        </div>
      </Host>
    );
  }

  render() {
    return this.type === 'base' ? this.renderBaseLayout() : this.renderDefaultLayout();
  }
}
