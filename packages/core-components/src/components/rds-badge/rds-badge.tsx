import { Component, Element, Host, h, Prop } from '@stencil/core';
import { getSlotted } from '../../utils/dom';
import { BadgeColor } from '../interfaces';

/**
 * @slot icon - Used to place an icon in front of the badge value.
 */
@Component({
  tag: 'rds-badge',
  styleUrl: 'rds-badge.scss',
  shadow: true,
})
export class RdsBadge {
  @Element() el!: HTMLRdsBadgeElement;

  /**
   * Determines the badge color.
   * Options: 'gray', 'red', 'yellow', 'green', 'orange', 'blue' and 'purple'.
   */
  @Prop({ reflect: true }) color?: BadgeColor;

  /**
   * Set the number displayed in the badge.
   */
  @Prop() value?: number;

  /**
   * A string value can be used instead of value if needed.
   */
  @Prop() text?: string;

  render() {
    const hasIcon = getSlotted(this.el, 'icon');

    return (
      <Host>
        {hasIcon ? (
          <div class="icon-wrapper">
            <slot name="icon"></slot>
          </div>
        ) : null}
        {this.text}
        {this.value > 99 ? '99+' : <div>{this.value}</div>}
      </Host>
    );
  }
}
