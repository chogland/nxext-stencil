import { Component, Prop, State, Method, h, Watch, Host } from '@stencil/core';

@Component({
  tag: 'rds-progress-bar',
  styleUrl: 'rds-progress-bar.scss',
  shadow: true,
})
export class RdsProgressBar {
  /**
   * The initial progress value.
   */
  @Prop({ reflect: true, mutable: true }) value: number = 0;

  /**
   * The maximum value of the component. The progress prop cannot exceed this.
   */
  @Prop() maximumValue: number = 100;

  /**
   * Sets the label for the progress bar.
   */
  @Prop() label: string = 'Progress Bar';

  /**
   * Initial Progress Bar value
   */
  @State() private currentPercentage: number = 0;

  /**
   * Updates the progress of the component and triggers an animation.
   *
   * Functionality is same as changing the property.
   *
   * @param newProgress The new progress is set
   */
  @Method()
  public async updateProgress(newProgress: number, needsReflect = true) {
    let setProgress = newProgress;

    if (newProgress > this.maximumValue) {
      setProgress = this.maximumValue;
    }

    if (needsReflect) {
      this.value = setProgress;
    }

    this.currentPercentage = setProgress;
  }

  /**
   * Watch the progress value and update progress bar
   */
  @Watch('value')
  protected async progressUpdated(newVal: number, oldVal: number) {
    if (newVal !== oldVal && newVal) {
      this.updateProgress(newVal, false);
    }
  }

  /**
   * Update the progress bar on component load
   */
  public componentWillLoad() {
    this.updateProgress(this.value, false);
  }

  /**
   * Set the width of progessbar in percentage
   */
  public setPercentageWidth() {
    return {
      width: `${this.currentPercentage}%`,
    };
  }

  public render() {
    return (
      <Host role="progressbar" aria-label={this.label} aria-valuenow={this.value}>
        <div style={this.setPercentageWidth()}></div>
      </Host>
    );
  }
}
