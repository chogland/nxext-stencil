import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot - Used to add content to the grid col.
 */
@Component({
  tag: 'rds-grid-col',
  styleUrl: 'rds-grid-col.scss',
  shadow: true,
})
export class RdsGridCol {
  /**
   * The number of columns this column spans from the smallest breakpoint and above.
   */
  @Prop() colspan?: string;

  /**
   * The number of columns this column spans from the medium breakpoint and above.
   */
  @Prop() colspanMd?: string;

  /**
   * The number of columns this column spans from the large breakpoint and above.
   */
  @Prop() colspanLg?: string;

  /**
   * The number of columns this column spans from the extra large breakpoint and above.
   */
  @Prop() colspanXl?: string;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
