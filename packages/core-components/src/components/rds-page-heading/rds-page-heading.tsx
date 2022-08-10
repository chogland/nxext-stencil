import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @slot breadcrumbs - This slot is used to place RdsBreadcrumb/RdsBreadcrumbs here.
 * @slot meta - This slot is used to place RdsMeta here.
 * @slot action-primary - This slot can be used to place one or more RdsButtons or other primary actions.
 * @slot action-secondary - This slot can be used to place one or more RdsButtons or other secondary actions.
 */
@Component({
  tag: 'rds-page-heading',
  styleUrl: 'rds-page-heading.scss',
  shadow: true,
})
export class RdsPageHeading {
  /**
   * Text that is displayed as the page heading.
   */
  @Prop() text: string;

  render() {
    return (
      <Host>
        <div class="page-heading-breadcrumbs">
          <slot name="breadcrumbs" />
        </div>
        <div class="page-heading-outer">
          <div class="page-heading-text-outer">
            <h2>{this.text}</h2>
            <div class="page-heading-meta">
              <slot name="meta" />
            </div>
          </div>
          <div class="page-heading-actions">
            <slot name="action-secondary" />
            <slot name="action-primary" />
          </div>
        </div>
      </Host>
    );
  }
}
