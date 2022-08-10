import { Component, Element, Host, h, Prop } from '@stencil/core';
import { getSlotted } from '../../utils/dom';

/**
 * @slot head - Used to add table rows to the table's head.
 * @slot body - Used to add table rows to the table's body.
 */
@Component({
  tag: 'rds-table',
  styleUrl: 'rds-table.scss',
  shadow: true,
})
export class RdsTable {
  @Element() el!: HTMLRdsTableElement;

  /**
   * Sets caption text for table component. This is for accessibility purposes.
   * Text is visually hidden but accessible to screen readers.
   */
  @Prop() caption: string = 'Table Caption';

  /**
   * Sets the table cell's padding to 'compact' mode.
   */
  @Prop() compact: boolean = false;

  /**
   * Sets the table row's background color to 'striped' mode.
   */
  @Prop() striped: boolean = false;
  /**
   * Adds `vertical lines` between table columns.
   */
  @Prop() verticalLines: boolean = false;

  /**
   * Sets the table top column to 'stacked' mode and turn into a card view on mobile.
   */
  @Prop() mobileStacked: boolean = false;

  /**
   * Sets the table row's to 'group' mode.
   */
  @Prop() groupedRows: boolean = false;

  render() {
    const hasHead = getSlotted(this.el, 'head');
    const hasBody = getSlotted(this.el, 'body');

    return (
      <Host>
        <div
          class={{
            'table-wrapper': true,
            'striped': this.striped,
          }}
        >
          <div class="table-outer">
            <div class="table-inner">
              <table>
                <caption class="sr-only">{this.caption}</caption>
                {hasHead ? (
                  <thead>
                    <slot name="head" />
                  </thead>
                ) : null}
                {hasBody ? (
                  <tbody>
                    <slot name="body" />
                  </tbody>
                ) : null}
              </table>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
