import { Component, VNode, Prop, Host, Element, Event, EventEmitter, Method, h } from '@stencil/core';
import { RdsPaginationDetail } from './rds-pagination-interface';

@Component({
  tag: 'rds-pagination',
  styleUrl: 'rds-pagination.scss',
  shadow: true,
})
export class RdsPagination {
  @Element() el: HTMLRdsPaginationElement;

  /** number of items per page */
  @Prop() items = 10;

  /** index of item that should begin the page */
  @Prop({ mutable: true }) start = 1;

  /** total number of items */
  @Prop() total = 0;

  /**
   * Emitted whenever the selected page changes.
   */
  @Event() rdsPaginationUpdate: EventEmitter<RdsPaginationDetail>;

  /**
   * Emitted whenever the selected page changes.
   */
  @Event() rdsPaginationChange: EventEmitter<RdsPaginationDetail>;

  /** Go to the next page of results */
  @Method() async nextPage(): Promise<void> {
    this.start = Math.min(this.getLastStart(), this.start + this.items);
  }

  /** Go to the previous page of results */
  @Method() async previousPage(): Promise<void> {
    this.start = Math.max(1, this.start - this.items);
  }

  private getLastStart(): number {
    const { total, items } = this;
    const lastStart = total % items === 0 ? total - items : Math.floor(total / items) * items;
    return lastStart + 1;
  }

  private previousClicked = (): void => {
    this.previousPage().then();
    this.emitUpdate();
  };

  private nextClicked = (): void => {
    this.nextPage();
    this.emitUpdate();
  };

  private emitUpdate() {
    const changePayload = {
      start: this.start,
      total: this.total,
      items: this.items,
    };

    this.rdsPaginationChange.emit(changePayload);
    this.rdsPaginationUpdate.emit(changePayload);
  }

  renderPage(start: number): VNode {
    const items = Math.floor(start + this.items - 1);
    return (
      <div class="page">
        {start}-{items}
      </div>
    );
  }

  render(): VNode {
    const { total, items, start } = this;
    const prevDisabled = items === 1 ? start <= items : start < items;
    const nextDisabled = items === 1 ? start + items > total : start + items > total;
    return (
      <Host>
        <rds-button
          appearance="tertiary"
          aria-label="Previous"
          class={{
            previous: true,
            disabled: prevDisabled,
          }}
          disabled={prevDisabled}
          onClick={this.previousClicked}
        >
          Previous
        </rds-button>
        <div class="page-count">
          {total >= items ? this.renderPage(start) : null}
          <div class="page">&nbsp;of&nbsp;{this.total}</div>
        </div>
        <rds-button
          appearance="tertiary"
          aria-label="Next"
          class={{
            next: true,
            disabled: nextDisabled,
          }}
          disabled={nextDisabled}
          onClick={this.nextClicked}
        >
          Next
        </rds-button>
      </Host>
    );
  }
}
