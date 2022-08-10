import { Component, Element, h, Prop, Host } from '@stencil/core';
import { getElementProp } from '../../utils/dom';

/**
 * @slot - Used to add table cell's to the row.
 */
@Component({
  tag: 'rds-table-row',
  styleUrl: 'rds-table-row.scss',
  shadow: true,
})
export class RdsTableRow {
  @Element() el: HTMLRdsTableRowElement;

  /** @internal Parent Table Component */
  @Prop({ mutable: true }) striped: boolean;

  /**
   * If group is set to `"true"` cell will take its own full space to cover all the table row.
   */
  @Prop({ reflect: true }) group: boolean = false;

  /** @internal Parent Table Component */
  @Prop({ reflect: true, mutable: true }) groupedRows: boolean;

  /**
   * @internal
   */
  private parentTableEl: HTMLRdsTableElement;

  private TableCellEl: HTMLRdsTableCellElement;

  connectedCallback() {
    this.parentTableEl = this.el.closest('rds-table');
  }

  componentWillLoad() {
    if (this.parentTableEl) {
      this.groupedRows = this.parentTableEl['groupedRows'];
    }
    if (this.groupedRows && this.group) {
      if (this.el['group']) {
        this.TableCellEl = document.createElement('rds-table-cell') as HTMLRdsTableCellElement;
        this.el.appendChild(this.TableCellEl);
      }
    }
  }

  componentWillUpdate() {
    // Get striped prop from parent table
    this.striped = getElementProp(this.parentTableEl, 'striped', this.striped);
  }

  render() {
    const isStriped = this.striped ? 'striped' : '';
    const isGroupRows = this.groupedRows && this.group ? 'show' : !this.groupedRows && this.group ? 'hide' : '';
    const classes = `${isStriped} ${isGroupRows}`;

    return (
      <Host role="row" class={classes}>
        <slot></slot>
      </Host>
    );
  }
}
