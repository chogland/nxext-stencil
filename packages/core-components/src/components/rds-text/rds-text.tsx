import { Component, Host, Prop, h, Watch, Element } from '@stencil/core';
import { TextSize, TextWeight, Spacing, TextAlign, TextType, TailwindColors } from '../interfaces';
import { getColor } from '../../utils/utils';

/**
 * @slot - Used to add text to the component.
 */
@Component({
  tag: 'rds-text',
  styleUrl: 'rds-text.scss',
  shadow: true,
})
export class RdsText {
  @Element() el!: HTMLRdsTextElement;

  /**
   * The tag type of the text.
   * `inline` returns a span tag.
   * `p` renders a p tag.
   */
  @Prop() type: TextType = 'p';

  /** The weight for the text. */
  @Prop({ reflect: true }) weight: TextWeight = 'normal';

  /** The spacing of the text. Spacing controls the top and bottom margin on the headline tags. */
  @Prop({ reflect: true }) spacing: Spacing = 'md';

  /** The size of the text. Reflects as a font-size CSS property. */
  @Prop({ reflect: true }) size: TextSize = 'base';

  /** The alignment of the text. Reflects as a text-align CSS property. */
  @Prop({ reflect: true }) align: TextAlign = 'inherit';

  /**
   * Controls the text color.
   */
  @Prop() color?: TailwindColors;

  @Watch('color')
  colorHandler() {
    if (this.color) {
      this.el.shadowRoot.getElementById('text').style.color = getColor(this.color);
    } else {
      this.el.shadowRoot.getElementById('text').style.color = null;
    }
  }

  componentDidLoad() {
    this.colorHandler();
  }

  render() {
    const TagType = this.type === 'inline' ? 'span' : 'p';

    return (
      <Host>
        <TagType id="text">
          <slot></slot>
        </TagType>
      </Host>
    );
  }
}
