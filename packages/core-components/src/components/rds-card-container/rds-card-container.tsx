import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @slot - Used to add content, or other card components to the card container.
 */
@Component({
  tag: 'rds-card-container',
  styleUrl: 'rds-card-container.scss',
  shadow: true,
})
export class RdsCardContainer {
  /**
   * If `true`, a shadow will be visible around the card container.
   */
  @Prop() shadow: boolean = true;

  /**
   * If `true`, round corners will be enabled for the card container.
   */
  @Prop() rounded: boolean = true;

  /**
   * If `true`, the card container will inherit styles that allow it to stand on its own, without any other card parts.
   */
  @Prop() simple: boolean = false;

  render() {
    return (
      <Host shadow={this.shadow ? this.shadow : null} rounded={this.rounded ? this.rounded : null}>
        <slot></slot>
      </Host>
    );
  }
}
