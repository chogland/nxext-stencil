import { Component, Element, Host, Prop, h } from '@stencil/core';
import { getSlotted } from '../../utils/dom';

/**
 * @slot - Used to add content to the entire card footer.
 * @slot start - Used to add content to the left side of the card footer.
 * @slot end - Used to add content to the right side of the card footer.
 */
@Component({
  tag: 'rds-card-footer',
  styleUrl: 'rds-card-footer.scss',
  shadow: true,
})
export class RdsCardFooter {
  @Element() el: HTMLRdsCardFooterElement;

  /**
   * If `true`, a 1rem (16px) padding will appear on left, right and bottom.
   */
  @Prop() padded: boolean = true;

  /**
   * If `true`, a top border will appear on the footer.
   */
  @Prop({ reflect: true }) rule: boolean = false;

  render() {
    const hasStartSlot = getSlotted(this.el, 'start');
    const hasEndSlot = getSlotted(this.el, 'end');

    return (
      <Host>
        {hasStartSlot ? <slot name="start"></slot> : null}
        {hasEndSlot ? <slot name="end"></slot> : null}
        {!hasEndSlot && !hasStartSlot ? <slot /> : null}
      </Host>
    );
  }
}
