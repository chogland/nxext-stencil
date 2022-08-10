import { Component, Element, Prop, h, Host } from '@stencil/core';
import svgSprite from '../../assets/icons/symbol-defs.svg';
@Component({
  tag: 'rds-icon',
  styleUrl: 'rds-icon.scss',
  shadow: true,
})
export class RdsIcon {
  @Element() el: HTMLRdsIconElement;

  /**
   * @deprecated
   * Set the alternative text of the icon
   */
  @Prop() alt: string;

  /**
   * @deprecated
   * Set the name of the icon to implement
   */
  @Prop() icon: string;

  /**
   * @deprecated
   * Set the size of the icon. Values:
   * md (16x16),
   * lg (24x24),
   * xlg (32x32)
   */
  @Prop() size: string = 'md';

  /**
   * @deprecated
   * Sets the color of the icon. Setting no color will inherit from its parent.
   */
  @Prop() color: string;

  render() {
    const size = this.size ? { size: `${this.size}` } : null;

    return (
      <Host class={'text-' + this.color}>
        <div id="icon-sprite" class="svgLoad" innerHTML={svgSprite}></div>
        <svg class="icon" {...size}>
          <use xlinkHref={`#${this.icon}`} />
          <title>{null || this.alt}</title>
        </svg>
      </Host>
    );
  }
}
