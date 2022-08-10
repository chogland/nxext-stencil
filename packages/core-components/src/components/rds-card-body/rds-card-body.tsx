import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot - Used to add content to the card body.
 */
@Component({
  tag: 'rds-card-body',
  styleUrl: 'rds-card-body.scss',
  shadow: true,
})
export class RdsCardBody {
  /**
   * If `true`, a 1rem (16px) padding will appear.
   */
  @Prop({ reflect: true }) padded: boolean = true;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
