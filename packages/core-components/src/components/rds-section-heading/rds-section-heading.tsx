import { Component, Host, Prop, h } from '@stencil/core';
import { HeadlineLevel } from '../interfaces';

/**
 * @slot content - This slot is used to place RDS components inside below the headline.
 * @slot action-primary - This slot can be used to place one or more RdsButtons or other primary actions.
 * @slot action-secondary - This slot can be used to place one or more RdsButtons or other secondary actions.
 */

@Component({
  tag: 'rds-section-heading',
  styleUrl: 'rds-section-heading.scss',
  shadow: true,
})
export class RdsSectionHeading {
  /**
   * Text that is displayed as the page heading.
   */
  @Prop() text: string;

  /**
   * Sets the section's headline level.
   */
  @Prop() level: HeadlineLevel = 3;

  render() {
    return (
      <Host>
        <div>
          <div class="section-heading-text">
            <rds-headline level={this.level} class="text-inherit">
              {this.text}
            </rds-headline>
          </div>
          <div class="section-heading-content">
            <slot name="content" />
          </div>
        </div>
        <div class="section-heading-actions">
          <slot name="action-secondary" />
          <slot name="action-primary" />
        </div>
      </Host>
    );
  }
}
