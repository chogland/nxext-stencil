import { Component, Host, h } from '@stencil/core';

/**
 * @slot indicator - Used to place an indicator which reflects the current status of process.
 * @slot - Used to add text to the pill.
 */
@Component({
  tag: 'rds-pill',
  styleUrl: 'rds-pill.scss',
  shadow: true,
})
export class RdsPill {
  render() {
    return (
      <Host>
        <slot name="indicator"></slot>
        <slot></slot>
      </Host>
    );
  }
}
