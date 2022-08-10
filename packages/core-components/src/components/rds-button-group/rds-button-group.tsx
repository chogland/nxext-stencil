import { Component, Element, Host, h, Prop } from '@stencil/core';

/**
 * @slot - You can place one or more RdsButtons to form a group. *The button group is only designed to work with Tertiary button appearance*.
 */

@Component({
  tag: 'rds-button-group',
  styleUrl: 'rds-button-group.scss',
  shadow: true,
})
export class RdsButtonGroup {
  @Element() el: HTMLRdsButtonGroupElement;

  /**
   * If true, buttons are full-width and equally spaced on mobile screens.
   */
  @Prop() mobileFullWidth: boolean = false;

  btnEl: HTMLRdsButtonElement;

  componentWillLoad() {
    let first = true;
    const list = this.el.children;
    for (let item of list) {
      if (first) {
        item.classList.add('group-btn-first');
      } else if (!item.nextSibling) {
        item.classList.add('group-btn-last');
      } else {
        item.classList.add('group-btn-next');
      }
      if (this.mobileFullWidth === true) {
        item.classList.add('mobile-full-width-btn');
      }
      first = false;
    }
  }

  render() {
    return (
      <Host class={{ 'mobile-full-width-btn-group': this.mobileFullWidth }}>
        <slot />
      </Host>
    );
  }
}
