import { Component, Element, Host, Watch, Prop, h } from '@stencil/core';
import iconNames, { getIconIndex } from './icons';
import { HeroIconBackground, HeroIconSize, HeroIconType, HeroIconShape, TailwindColors } from '../interfaces';
import { getColor } from '../../utils/utils';

@Component({
  tag: 'rds-hero-icon',
  styleUrl: 'rds-hero-icon.scss',
  shadow: true,
})
export class RdsHeroIcon {
  @Element() el: HTMLRdsHeroIconElement;

  /**
   * Set the name of the icon to implement.
   */
  @Prop({ reflect: true }) name: string = 'user';

  /**
   * Set the size of the icon.
   *
   * Values:
   * md (16x16),
   * lg (24x24),
   * xl (32x32)
   */
  @Prop() size: HeroIconSize = 'md';

  /**
   * Set the type of the icon.
   */
  @Prop() type: HeroIconType = 'solid';

  /**
   * Set the background color of the icon.
   */
  @Prop() bg: HeroIconBackground;

  /**
   * Set the shape around the icon. This is important if using the `bg` prop.
   */
  @Prop() shape: HeroIconShape = 'rounded';

  /**
   * Controls the text color.
   */
  @Prop() color?: TailwindColors;

  @Watch('color')
  colorHandler() {
    if (this.color) {
      this.el.shadowRoot.getElementById('icon').style.color = getColor(this.color);
    } else {
      this.el.shadowRoot.getElementById('icon').style.color = null;
    }
  }

  getIcon() {
    const svgIndex = getIconIndex(this.name, iconNames);

    if (svgIndex > -1) {
      const svg = this.type == 'outline' ? iconNames[svgIndex].outlinePath : iconNames[svgIndex].solidPath;

      // Apply the text response to the shadow root's icon ID
      this.el.shadowRoot.getElementById('icon').innerHTML = svg;
    }
  }

  componentDidLoad() {
    this.getIcon();
    this.colorHandler();
  }

  componentWillUpdate() {
    this.getIcon();
  }

  render() {
    const size = this.size ? { size: `${this.size}` } : null;
    const bg = this.bg ? { bg: `${this.bg}` } : null;
    const shape = this.shape ? { shape: `${this.shape}` } : null;

    return (
      <Host>
        <span id="icon" class={this.type == 'solid' ? 'icon' : 'icon outline'} role="img" aria-hidden="true" {...size} {...bg} {...shape}></span>
      </Host>
    );
  }
}
