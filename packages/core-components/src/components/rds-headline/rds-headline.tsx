import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
import { HeadlineLevel, TextWeight, Spacing, TailwindColors } from '../interfaces';
import { getColor } from '../../utils/utils';

/**
 * @slot - Used to add text to the headline.
 */
@Component({
  tag: 'rds-headline',
  styleUrl: 'rds-headline.scss',
  shadow: true,
})
export class RdsHeadline {
  @Element() el!: HTMLRdsHeadlineElement;

  /** The heading level is set to determine the heading tag to be applied */
  @Prop() level: HeadlineLevel = 1;

  /** The weight for the headline. */
  @Prop({ reflect: true }) weight: TextWeight = 'semibold';

  /** The color of the headline. */
  @Prop() color?: TailwindColors | 'green' = undefined;

  /** Spacing controls the top and bottom margin on the headline tags. */
  @Prop({ reflect: true }) spacing: Spacing = 'md';

  @Watch('color')
  colorHandler() {
    if (this.color) {
      this.el.shadowRoot.getElementById('headline').style.color = getColor(this.color);
    } else {
      this.el.shadowRoot.getElementById('headline').style.color = null;
    }
  }

  componentDidLoad() {
    this.colorHandler();
  }

  render() {
    const TagType = this.level === undefined ? 'h1' : 'h' + this.level;
    return (
      <Host>
        <TagType id="headline">
          <slot></slot>
        </TagType>
      </Host>
    );
  }
}
