import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot - Used to add grid cols or other elements/components as a grid column.
 */
@Component({
  tag: 'rds-grid',
  styleUrl: 'rds-grid.scss',
  shadow: true,
})
export class RdsGrid {
  /**
   * If true will remove padding/gaps within columns.
   */
  @Prop() collapseGaps?: boolean;

  /**
   * If true will remove padding/gaps within columns.
   */
  @Prop() collapseMargins?: boolean;

  /**
   * Adds the justify-content: "space-between" style property when type="flex".
   * This adds space between each item in the flex box.
   */
  @Prop() justifybetween?: boolean;

  /**
   * Adds the justify-content: "flex-end" style property when type="flex".
   * This will pack flex items from the end or the right of the flex box.
   */
  @Prop() justifyend?: boolean;

  /**
   * Adds the "items-center" style property for flex grids.
   * This will align flex items to the middle of the flex container.
   */
  @Prop() itemscenter?: boolean;

  /**
   * Adds the align-items: "items-base" style property for flex grids.
   * All flex items are aligned such that their flex container baselines align.
   */
  @Prop() itemsbase?: boolean;

  /**
   * Type is used to set the grid component to 'flex' or 'grid'
   */
  @Prop() type?: string = 'grid';

  render() {
    return (
      <Host type={this.type}>
        <slot></slot>
      </Host>
    );
  }
}
