import { Component, Listen, Prop, State, Host, h } from '@stencil/core';

/**
 * @slot filter-list - Used to add a group of checkboxes.
 * @slot filter-results - Used to add filter results.
 * @slot clear-filter - Used to add a clear button.
 * @slot submit-filter - Used to add a submit button.
 */
@Component({
  tag: 'rds-filter',
  styleUrl: 'rds-filter.scss',
  shadow: true,
})
export class RdsFilter {
  /**
   * @deprecated
   * Apply filter search results for mobile breakpoints
   */
  @Prop({ attribute: 'filterResults' }) filterResults?: number = 0;

  /**
   * @deprecated
   * Sets the toggle property of the filter component container
   */
  @Prop({ attribute: 'istoggled', mutable: true }) isToggled?: boolean = false;

  /**
   * @deprecated
   * Accessible label for filter.
   */
  @Prop({ reflect: true }) label?: string = 'filter';

  /**
   * The internal state of the filter component container visibility
   */
  @State() toggleState: boolean = false;

  public toggleFilter(): void {
    this.isToggled = !this.isToggled;
    this.toggleState = !this.toggleState;
  }

  /**
   * Listen for the filter button emit and toggle the filter container
   */
  @Listen('filterToggleEvent', { target: 'body' })
  filterToggleEventHandler(_e: CustomEvent<string>) {
    this.isToggled = !this.isToggled;
    this.toggleState = !this.toggleState;
  }

  public render() {
    return (
      <Host aria-label={this.label ? this.label : 'Filter'} role="search" isToggled={this.isToggled} style={{ display: this.isToggled ? 'block' : 'none' }}>
        <div class="filter-mobile-close-container">
          <span>Filters</span>
          <rds-button appearance="tertiary" label="Close Filters" onClick={this.toggleFilter.bind(this)}>
            <rds-icon icon="rds-close"></rds-icon>
          </rds-button>
        </div>

        <div class="filter-list-container">
          <slot name="filter-list" />
        </div>

        <div class="filter-mobile-footer-container">
          <div class="filter-mobile-results">
            {this.filterResults > 0 ? (
              <span>
                <slot name="filter-results">{this.filterResults}</slot>&nbsp;Results
              </span>
            ) : (
              ''
            )}
          </div>
          <div class="filter-mobile-buttons">
            <slot name="clear-filter" />
            <slot name="submit-filter" />
          </div>
        </div>
      </Host>
    );
  }
}
