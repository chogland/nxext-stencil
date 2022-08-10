import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @slot - Used to add text to the label.
 */
@Component({
  tag: 'rds-label',
  styleUrl: 'rds-label.scss',
  shadow: true,
})
export class RdsLabel {
  /**
   * What the label is for; connects label to corresponding form element
   */
  @Prop() for: string = '';

  /**
   * If `true`, label is set to disabled mode.
   * Set up to inherit from the parent `RdsInput` component.
   * @internal
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * If `true`, input is set to readonly mode.
   *    * Set up to inherit from the parent `RdsInput` component.
   * @internal
   */
  @Prop({ reflect: true }) readonly: boolean = false;

  render() {
    return (
      <Host>
        <label htmlFor={`${this.for}`}>
          <slot></slot>
        </label>
      </Host>
    );
  }
}
