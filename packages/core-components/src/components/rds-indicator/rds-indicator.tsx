import { Component, Host, h, Prop } from '@stencil/core';
import { IndicatorAppearance } from '../interfaces';

@Component({
  tag: 'rds-indicator',
  styleUrl: 'rds-indicator.scss',
  shadow: true,
})
export class RdsIndicator {
  /**
   * Color to set the indicator.
   * Options are 'success' (green), 'warning' (yellow), 'alert' (red), 'primary' (purple), 'secondary' (blue), 'tertiary' (gray), 'primary-alt (purple-ring) and tertiary-alt (white).
   */
  @Prop() appearance: IndicatorAppearance = 'success';

  render() {
    return <Host appearance={this.appearance} />;
  }
}
