import { Component, Host, h, Prop } from '@stencil/core';
import { DividerAppearance, DividerDirection, Spacing } from '../interfaces';
@Component({
  tag: 'rds-divider',
  styleUrl: 'rds-divider.scss',
  shadow: true,
})
export class RdsDivider {
  /**
   * @deprecated
   * Sets the appearance/color of the divider.
   */
  @Prop() appearance: DividerAppearance = 'dark';

  /**
   * Sets which direction the divider is oriented.
   */
  @Prop() type: DividerDirection = 'horizontal';

  /**
   * This determines the spacing around the divider.
   * It will add margin to top/bottom for horizonal dividers.
   * It will add margin to left/right for vertical dividers.
   */
  @Prop() spacing: Spacing = 'md';

  render() {
    return (
      <Host
        type={this.type}
        class={{
          'v-sm': this.spacing == 'sm' && this.type == 'vertical',
          'v-md': this.spacing == 'md' && this.type == 'vertical',
          'v-lg': this.spacing == 'lg' && this.type == 'vertical',
          'sm': this.spacing == 'sm' && this.type == 'horizontal',
          'md': this.spacing == 'md' && this.type == 'horizontal',
          'lg': this.spacing == 'lg' && this.type == 'horizontal',
        }}
      />
    );
  }
}
