import { Component, Host, h, Prop } from '@stencil/core';
/**
 * @slot - Used to add description for your Hero Icon
 */
@Component({
  tag: 'rds-meta',
  styleUrl: 'rds-meta.scss',
  shadow: true,
})
export class RdsMeta {
  /**
   * The name of the icon to display. The value of this property must match the icon name from RDS Hero Icons
   */
  @Prop() icon?: string;

  render() {
    return (
      <Host>
        <rds-hero-icon name={this.icon} size="md" />
        <slot />
      </Host>
    );
  }
}
