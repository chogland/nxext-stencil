import { Component, h, Host, Prop, Element } from '@stencil/core';
import { getElementProp } from '../../utils/dom';

/**
 * @slot - Used to add content to the table cell.
 */
@Component({
  tag: 'rds-table-cell',
  styleUrl: 'rds-table-cell.scss',
  shadow: true,
})
export class RdsTableCell {
  @Element() el: HTMLRdsTableCellElement;

  /**
   * Type of the cell.
   * Options are: `"data"` (default) and `"head"`.
   */
  @Prop({ reflect: true }) type: string = 'data';

  /**
   * Hides the column in mobile view when sets to true and cell prop
   * type is head.
   */
  @Prop({ reflect: true }) mobileHide: boolean = false;

  /**
   * Text alignment for the cell.
   * Options are: `"left"` (default), `"center"` and `"right"`.
   */
  @Prop({ reflect: true }) align: string = 'left';

  /** @internal Parent Table Component */
  @Prop({ mutable: true }) compact: boolean;

  /** @internal Parent Table Component */
  @Prop({ mutable: true }) verticalLines: boolean;

  /**
   * If visible is set to `"true"` columns will stack in mobile view .
   */
  @Prop({ reflect: true }) visible: boolean = false;

  /** @internal Parent Table Component */
  @Prop({ mutable: true }) mobileStacked: boolean = false;

  /**
   * @internal
   */
  private parentTableEl: HTMLRdsTableElement;

  private parentTableRowEl: HTMLRdsTableRowElement;

  componentWillLoad() {
    if (this.el) {
      this.parentTableEl = this.el.closest('rds-table');
      this.parentTableRowEl = this.el.closest('rds-table-row');
    }
    if (this.parentTableRowEl) {
      if (this.parentTableRowEl['group']) {
        this.parentTableRowEl.firstElementChild.classList.add('emptyRow');
      }
    }
    if (this.parentTableEl) {
      let columnsToHide: number[] = [];
      this.compact = getElementProp(this.parentTableEl, 'compact', this.compact);
      this.verticalLines = this.parentTableEl['verticalLines'];
      this.mobileStacked = getElementProp(this.parentTableEl, 'columnStack', this.mobileStacked);
      this.parentTableEl.firstChild.childNodes.forEach((element, index) => {
        if (element['type'] == 'head' && element['mobileHide']) {
          columnsToHide.push(index);
        }
      });
      if (columnsToHide.length > 0) {
        this.parentTableEl.childNodes.forEach(tableRow => {
          tableRow.childNodes.forEach((tableCell, index) => {
            if (columnsToHide.includes(index)) {
              (tableCell as HTMLRdsTableCellElement).classList.add('mobile-hide');
            }
          });
        });
      }
    }
  }

  render() {
    const isCompact = this.compact ? 'compact' : '';
    const isVerticalBorder = this.verticalLines ? 'verticalLines' : '';
    const isNotStacked = this.mobileStacked ? '' : this.visible ? 'hideRow' : '';
    const isStacked = this.mobileStacked ? 'columnStack ' : '';
    const isVisible = this.mobileStacked && this.visible ? 'visible' : '';
    const classes = `${isCompact}  ${isVerticalBorder} ${isStacked} ${isVisible} ${isNotStacked}`;

    return (
      <Host role={this.type == 'head' ? 'columnheader' : 'cell'} class={classes}>
        <slot></slot>
      </Host>
    );
  }
}
