import { Component, Host, Prop, h } from '@stencil/core';
import { HeadlineLevel } from '../interfaces';

/**
 * @slot - Use this slot to add title text/components.
 */
@Component({
  tag: 'rds-card-title',
  styleUrl: 'rds-card-title.scss',
  shadow: true,
})
export class RdsCardTitle {
  /**
   * Sets the headline level.
   */
  @Prop() level: HeadlineLevel = 4;

  render() {
    return (
      <Host>
        <rds-headline level={this.level} spacing="none" class="card-title text-inherit">
          <slot></slot>
        </rds-headline>
      </Host>
    );
  }
}
