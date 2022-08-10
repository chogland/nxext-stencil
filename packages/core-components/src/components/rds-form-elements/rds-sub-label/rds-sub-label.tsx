import { Component, Host, h, Prop, Element } from '@stencil/core';
import { SubLabelType } from '../../interfaces';

/**
 * @slot - Used to add text to the sub-label.
 */
@Component({
  tag: 'rds-sub-label',
  styleUrl: 'rds-sub-label.scss',
  shadow: true,
})
export class RdsSubLabel {
  @Element() el: HTMLRdsSubLabelElement;

  /**
   *  If type is 'headline', the sub-label's color will be gray-500.
   */
  @Prop() type: SubLabelType;

  /**
   * @internal
   * If `true`, a new font color will be applied to the sub-label.
   */
  @Prop({ reflect: true }) groupChecked: boolean;

  /**
   *  Sets up the input id if the string is passed.
   */
  @Prop({ mutable: true }) for: string = '';

  private parentLabelEl: HTMLRdsLabelElement;

  componentWillLoad() {
    if (this.el) {
      this.parentLabelEl = this.el.closest('rds-label');
    }
    if (this.parentLabelEl) {
      this.for = this.parentLabelEl['for'];
    }
  }

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
