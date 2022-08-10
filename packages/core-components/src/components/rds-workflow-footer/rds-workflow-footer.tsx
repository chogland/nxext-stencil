import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot action-start - Use this slot for an action item, such as a button, to appear on the left side of the workflow footer.
 * @slot narration - Use this slot for narration text within the workflow footer.
 * @slot action-end - Use this slot for an action item, such as a button, to appear on the right side of the workflow footer.
 */

@Component({
  tag: 'rds-workflow-footer',
  styleUrl: 'rds-workflow-footer.scss',
  shadow: true,
})
export class RdsWorkflowFooter {
  /**
   * If `true`, workflow footer will be fixed to the bottom of the user's screen.
   */
  @Prop() sticky: boolean = false;

  render() {
    return (
      <Host>
        <div>
          <slot name="action-start"></slot>
        </div>
        <div>
          <slot name="narration"></slot>
        </div>
        <div>
          <slot name="action-end"></slot>
        </div>
      </Host>
    );
  }
}
