import { Element, Component, Host, Prop, Watch, h } from '@stencil/core';
import { BoxSpacing, BoxDisplay, TailwindColors } from '../interfaces';
import { getColor, getSpacing } from '../../utils/utils';
/**
 * @slot - Used for adding any RDS components that you wish to be styled by your box.
 */
@Component({
  tag: 'rds-box',
  styleUrl: 'rds-box.scss',
  shadow: true,
})
export class RdsBox {
  @Element() el!: HTMLRdsBoxElement;

  div: HTMLElement;
  customDiv: HTMLElement;

  /**
   * Controls the text color of all slotted contents.
   */
  @Prop() color?: TailwindColors;

  /**
   * Controls the background color of the component and its boundaries.
   */
  @Prop() bg?: TailwindColors;

  /**
   * Explicitly controls the margin around the component. This can be set using an RDS spacing value or a valid CSS length value.
   */
  @Prop() margin?: BoxSpacing;

  /**
   * Explicitly controls the padding around the component. This can be set using an RDS spacing value or a valid CSS length value.
   */
  @Prop() padding?: BoxSpacing;

  /**
   * Sets the display type of the component.
   */
  @Prop({ reflect: true }) display?: BoxDisplay = 'block';

  @Prop() styles?: string;

  @Watch('bg')
  bgHandler() {
    if (this.bg) {
      this.div.style.backgroundColor = getColor(this.bg);
    } else {
      this.div.style.backgroundColor = null;
    }
  }

  @Watch('color')
  colorHandler() {
    if (this.color) {
      this.div.style.color = getColor(this.color);
    } else {
      this.div.style.color = null;
    }
  }

  @Watch('styles')
  styleHandler() {
    if (this.styles) {
      this.customDiv.setAttribute('style', this.styles);
    }
  }

  @Watch('margin')
  marginHandler() {
    if (this.margin) {
      this.marginAndPaddingHandler('margin');
    }
  }

  @Watch('padding')
  paddingHandler() {
    if (this.padding) {
      this.marginAndPaddingHandler('padding');
    }
  }

  spacingHandler(type: string, utility: string) {
    let utilities = utility.split(' ');
    for (let i = 0; i < utilities.length; i++) {
      if (utilities[i].includes('px') || utilities[i].includes('em') || utilities[i].includes('calc') || utilities[i].includes('%')) {
        if (type === 'padding') {
          this.div.style.padding = utility;
        } else {
          this.div.style.margin = utility;
        }
      } else {
        if (type === 'padding') {
          this.div.style.padding = null;
        } else {
          this.div.style.margin = null;
        }
      }
    }
  }

  rdsSpacingHandler(type: string, utility: string) {
    let utilities = utility.split(' ');
    for (let i = 0; i < utilities.length; i++) {
      if (i == 0) {
        if (utilities.length == 1) {
          // is all
          if (type === 'padding') {
            this.div.style.padding = getSpacing(utilities[i]);
          } else {
            this.div.style.margin = getSpacing(utilities[i]);
          }
        } else if (utilities.length == 2) {
          // is y axis
          if (type === 'padding') {
            this.div.style.paddingTop = getSpacing(utilities[i]);
            this.div.style.paddingBottom = getSpacing(utilities[i]);
          } else {
            this.div.style.marginTop = getSpacing(utilities[i]);
            this.div.style.marginBottom = getSpacing(utilities[i]);
          }
        } else if (utilities.length == 3 || utilities.length == 4) {
          // is top value
          if (type === 'padding') {
            this.div.style.paddingTop = getSpacing(utilities[i]);
          } else {
            this.div.style.marginTop = getSpacing(utilities[i]);
          }
        }
      } else if (i == 1) {
        if (utilities.length == 2 || utilities.length == 3) {
          // is x axis
          if (type === 'padding') {
            this.div.style.paddingLeft = getSpacing(utilities[i]);
            this.div.style.paddingRight = getSpacing(utilities[i]);
          } else {
            this.div.style.marginLeft = getSpacing(utilities[i]);
            this.div.style.marginRight = getSpacing(utilities[i]);
          }
        } else if (utilities.length == 4) {
          // is right value
          if (type === 'padding') {
            this.div.style.paddingRight = getSpacing(utilities[i]);
          } else {
            this.div.style.marginRight = getSpacing(utilities[i]);
          }
        }
      } else if (i == 2) {
        if (utilities.length == 3 || utilities.length == 4) {
          // is bottom value
          if (type === 'padding') {
            this.div.style.paddingBottom = getSpacing(utilities[i]);
          } else {
            this.div.style.marginBottom = getSpacing(utilities[i]);
          }
        }
      } else if (i == 3) {
        if (utilities.length == 4) {
          // is left value
          if (type === 'padding') {
            this.div.style.paddingLeft = getSpacing(utilities[i]);
          } else {
            this.div.style.marginLeft = getSpacing(utilities[i]);
          }
        }
      }
    }
  }

  marginAndPaddingHandler(type: string) {
    let utility: string;

    if (type === 'padding') {
      utility = this.padding;
    } else if (type === 'margin') {
      utility = this.margin;
    }

    // Reset if already exists
    if (type === 'padding') {
      this.div.style.padding = null;
    } else {
      this.div.style.margin = null;
    }

    if (!utility.includes('0') && !utility.includes('auto') && !utility.includes('sm') && !utility.includes('md') && !utility.includes('lg') && !utility.includes('xl')) {
      this.spacingHandler(type, utility);
    } else {
      // Component is using RDS spacing values
      this.rdsSpacingHandler(type, utility);
    }
  }

  componentDidLoad() {
    // Gain access the divs that will be styled
    this.div = this.el.shadowRoot.getElementById('box-styled');
    this.customDiv = this.el;

    // Apply the styles
    this.bgHandler();
    this.colorHandler();
    this.marginHandler();
    this.paddingHandler();
    this.styleHandler();
  }

  render() {
    return (
      <Host id="box-custom-styled">
        <div id="box-styled">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
