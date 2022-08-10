import { Component, Host, h } from '@stencil/core';

/**
 * @slot title - Use this slot to add a title to the left side of your workflow header.
 * @slot description - Use this slot to add additional description or components to the center of the workflow header.
 * @slot action - Use this slot to add action(s) to the right side of your workflow header.
 */

@Component({
  tag: 'rds-workflow-header',
  styleUrl: 'rds-workflow-header.scss',
  shadow: true,
})
export class RdsWorkflowHeader {
  render() {
    return (
      <Host>
        <div class="header-text-wrapper">
          <div>
            <slot name="title"></slot>
          </div>
          <div>
            <slot name="description"></slot>
          </div>
        </div>
        <div class="actions">
          <slot name="action"></slot>
        </div>
      </Host>
    );
  }
}
