import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'rds-progress-circle',
  styleUrl: 'rds-progress-circle.scss',
  shadow: true,
})
export class RdsProgressCircle {
  /**
   * Sets the percentage value to be displayed
   * as well as the amount of the circle to be filled.
   */
  @Prop() value: string = '0';

  /**
   * Sets the label for the progress circle.
   */
  @Prop() label: string = 'Progress Circle';

  /**
   * Set the size of the progress circle, default is md.
   * Available Options are: sm, md and lg
   */
  @Prop() size?: string = 'md';

  render() {
    return (
      <Host
        style={{
          background: `conic-gradient(#2ecc71 ${this.value}%, 0, #ecf0f1 ${(100 - parseInt(this.value)).toString()}%)`,
        }}
        size={this.size}
        role="progressbar"
        aria-label={this.label}
      >
        <div class="progress-circle">
          <span>{this.value}%</span>
        </div>
      </Host>
    );
  }
}
