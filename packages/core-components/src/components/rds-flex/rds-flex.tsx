import { Element, Component, Host, Prop, h, Listen, Watch } from '@stencil/core';
import { FlexHeight, FlexWrap, FlexInline, FlexGap, FlexAlignContent, FlexJustifyContent, FlexAlignItems, FlexDirection } from '../interfaces';
import { getBreakpoint } from '../../utils/dom';

/**
 * @slot - Used for adding flex items or other elements/components as flex children.
 */
@Component({
  tag: 'rds-flex',
  styleUrl: 'rds-flex.scss',
  shadow: true,
})
export class RdsFlex {
  @Element() el!: HTMLElement;
  hasRendered: boolean = false;

  /**
   * Manages the responsive rendering of the component props.
   * @internal
   */
  breakpoint: string = null;

  breakpointMap = new Object();

  // Maps layout values to their CSS lengths
  layoutMap = new Object();

  getSpacing(s) {
    return this.layoutMap[s];
  }

  /**
   * Space between and around flex items along the main-axis of the container, when the flex items span multiple lines. This only takes effect when `wrap` is set to true.
   */
  @Prop({ mutable: true }) alignContent?: FlexAlignContent;

  /**
   * Space between and around flex items along the cross-axis of the container.
   */
  @Prop({ mutable: true }) alignItems?: FlexAlignItems;
  /**
   * Space between and around flex items along the main axis of the container.
   */
  @Prop({ mutable: true }) justifyContent?: FlexJustifyContent;

  /**
   * The direction of the main axis.
   */
  @Prop({ mutable: true }) direction?: FlexDirection;

  /**
   * Whether or not the flex items should wrap to a new line when necessary.
   */
  @Prop({ mutable: true }) wrap?: FlexWrap;

  /**
   * If true, the flex container is displayed at inline level rather than block level.
   */
  @Prop({ mutable: true }) inline?: FlexInline;

  /**
   * Explicitly controls the space between flex items. It applies that spacing only between items not on the outer edges. It can be one value for row & column gap, or two values to set row & column gaps differently. Accepts an RDS layout value or a valid CSS length value.
   */
  @Prop({ mutable: true }) gap?: FlexGap;

  /**
   * Explicitly controls the height of the flex component. This can be pixel, em, rem, calc(), or % values.
   */
  @Prop({ mutable: true }) height?: FlexHeight = 'auto';

  handleBreakpoint() {
    this.handleGap();
    this.handleHeight();
    this.handleDirection();
    this.handleWrap();
    this.handleInline();
    this.handleAlignContent();
    this.handleAlignItems();
    this.handleJustifyContent();
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    if (this.hasRendered) {
      let oldBreakpoint = this.breakpoint;
      this.breakpoint = getBreakpoint(this.el);
      if (this.breakpoint !== oldBreakpoint) {
        this.handleBreakpoint();
      }
    }
  }

  @Watch('gap')
  handleGap() {
    if (this.gap) {
      if (!Array.isArray(this.gap) && this.gap.includes(',')) {
        this.gap = this.gap.split(',');
      }
      if (Array.isArray(this.gap)) {
        if (this.gap[this.breakpointMap[this.breakpoint]]) {
          if (this.getSpacing(this.gap[this.breakpointMap[this.breakpoint]])) {
            // Is a set spacing value
            this.el.style.gap = this.getSpacing(this.gap[this.breakpointMap[this.breakpoint]]);
          } else {
            this.el.style.gap = this.gap[this.breakpointMap[this.breakpoint]];
          }
        } else {
          for (let i = this.gap.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.gap[i]) {
                if (this.getSpacing(this.gap[i])) {
                  // Is a set spacing value
                  this.el.style.gap = this.getSpacing(this.gap[i]);
                } else {
                  this.el.style.gap = this.gap[i];
                }
                break;
              }
            }
          }
        }
      } else {
        if (this.getSpacing(this.gap)) {
          this.el.style.gap = this.getSpacing(this.gap);
        } else {
          this.el.style.gap = this.gap;
        }
      }
    }
  }

  @Watch('height')
  handleHeight() {
    if (this.height) {
      if (!Array.isArray(this.height) && this.height.includes(',')) {
        this.height = this.height.split(',');
      }
      if (Array.isArray(this.height)) {
        if (this.height[this.breakpointMap[this.breakpoint]]) {
          this.el.style.height = this.height[this.breakpointMap[this.breakpoint]];
        } else {
          for (let i = this.height.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.height[i]) {
                this.el.style.height = this.height[i];
                break;
              }
            }
          }
        }
      } else {
        this.el.style.height = this.height;
      }
    }
  }

  @Watch('direction')
  handleDirection() {
    if (this.direction) {
      // Remove classes that already exist
      for (let i = 0; i < this.el.classList.length; i++) {
        if (this.el.classList[i].includes('direction--')) {
          this.el.classList.remove(this.el.classList[i]);
        }
      }
      if (!Array.isArray(this.direction) && this.direction.includes(',')) {
        this.direction = this.direction.split(',');
      }
      if (Array.isArray(this.direction)) {
        if (this.direction[this.breakpointMap[this.breakpoint]]) {
          this.el.classList.add('direction--' + this.direction[this.breakpointMap[this.breakpoint]]);
        } else {
          for (let i = this.direction.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.direction[i]) {
                this.el.classList.add('direction--' + this.direction[i]);
                break;
              }
            }
          }
        }
      } else {
        this.el.classList.add('direction--' + this.direction);
      }
    }
  }

  @Watch('wrap')
  handleWrap() {
    if (this.wrap) {
      // Remove classes that already exist
      for (let i = 0; i < this.el.classList.length; i++) {
        if (this.el.classList[i].includes('wrap--')) {
          this.el.classList.remove(this.el.classList[i]);
        }
      }
      if (!Array.isArray(this.wrap) && this.wrap.toString().includes(',')) {
        this.wrap = this.wrap.toString().split(',');
      }
      if (Array.isArray(this.wrap)) {
        if (this.wrap[this.breakpointMap[this.breakpoint]]) {
          this.el.classList.add('wrap--' + (this.wrap[this.breakpointMap[this.breakpoint]] === 'true' ? 'wrap' : 'no-wrap'));
        } else {
          for (let i = this.wrap.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.wrap[i]) {
                this.el.classList.add('wrap--' + (this.wrap[i] === 'true' ? 'wrap' : 'no-wrap'));
                break;
              }
            }
          }
        }
      } else {
        this.el.classList.add('wrap--' + (this.wrap ? 'wrap' : 'no-wrap'));
      }
    }
  }

  @Watch('inline')
  handleInline() {
    if (this.inline) {
      // Remove classes that already exist
      for (let i = 0; i < this.el.classList.length; i++) {
        if (this.el.classList[i].includes('inline--')) {
          this.el.classList.remove(this.el.classList[i]);
        }
      }
      if (!Array.isArray(this.inline) && this.inline.toString().includes(',')) {
        this.inline = this.inline.toString().split(',');
      }
      if (Array.isArray(this.inline)) {
        if (this.inline[this.breakpointMap[this.breakpoint]]) {
          this.el.classList.add('inline--' + (this.inline[this.breakpointMap[this.breakpoint]] === 'true' ? 'inline' : 'no-inline'));
        } else {
          for (let i = this.inline.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.inline[i]) {
                this.el.classList.add('inline--' + (this.inline[i] === 'true' ? 'inline' : 'no-inline'));
                break;
              }
            }
          }
        }
      } else {
        this.el.classList.add('inline--' + (this.inline ? 'inline' : 'no-inline'));
      }
    }
  }

  @Watch('alignContent')
  handleAlignContent() {
    if (this.alignContent) {
      // Remove classes that already exist
      for (let i = 0; i < this.el.classList.length; i++) {
        if (this.el.classList[i].includes('align-content--')) {
          this.el.classList.remove(this.el.classList[i]);
        }
      }
      if (!Array.isArray(this.alignContent) && this.alignContent.includes(',')) {
        this.alignContent = this.alignContent.split(',');
      }
      if (Array.isArray(this.alignContent)) {
        if (this.alignContent[this.breakpointMap[this.breakpoint]]) {
          this.el.classList.add('align-content--' + this.alignContent[this.breakpointMap[this.breakpoint]]);
        } else {
          for (let i = this.alignContent.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.alignContent[i]) {
                this.el.classList.add('align-content--' + this.alignContent[i]);
                break;
              }
            }
          }
        }
      } else {
        this.el.classList.add('align-content--' + this.alignContent);
      }
    }
  }

  @Watch('alignItems')
  handleAlignItems() {
    if (this.alignItems) {
      // Remove classes that already exist
      for (let i = 0; i < this.el.classList.length; i++) {
        if (this.el.classList[i].includes('align-items--')) {
          this.el.classList.remove(this.el.classList[i]);
        }
      }
      if (!Array.isArray(this.alignItems) && this.alignItems.includes(',')) {
        this.alignItems = this.alignItems.split(',');
      }
      if (Array.isArray(this.alignItems)) {
        if (this.alignItems[this.breakpointMap[this.breakpoint]]) {
          this.el.classList.add('align-items--' + this.alignItems[this.breakpointMap[this.breakpoint]]);
        } else {
          for (let i = this.alignItems.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.alignItems[i]) {
                this.el.classList.add('align-items--' + this.alignItems[i]);
                break;
              }
            }
          }
        }
      } else {
        this.el.classList.add('align-items--' + this.alignItems);
      }
    }
  }

  @Watch('justifyContent')
  handleJustifyContent() {
    if (this.justifyContent) {
      // Remove classes that already exist
      for (let i = 0; i < this.el.classList.length; i++) {
        if (this.el.classList[i].includes('justify-content--')) {
          this.el.classList.remove(this.el.classList[i]);
        }
      }
      if (!Array.isArray(this.justifyContent) && this.justifyContent.includes(',')) {
        this.justifyContent = this.justifyContent.split(',');
      }
      if (Array.isArray(this.justifyContent)) {
        if (this.justifyContent[this.breakpointMap[this.breakpoint]]) {
          this.el.classList.add('justify-content--' + this.justifyContent[this.breakpointMap[this.breakpoint]]);
        } else {
          for (let i = this.justifyContent.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.justifyContent[i]) {
                this.el.classList.add('justify-content--' + this.justifyContent[i]);
                break;
              }
            }
          }
        }
      } else {
        this.el.classList.add('justify-content--' + this.justifyContent);
      }
    }
  }

  populateMaps() {
    this.breakpointMap['xs'] = 0;
    this.breakpointMap['sm'] = 1;
    this.breakpointMap['md'] = 2;
    this.breakpointMap['lg'] = 3;
    this.breakpointMap['xl'] = 4;
    this.breakpointMap['2xl'] = 5;
    this.layoutMap['sm'] = '1rem';
    this.layoutMap['sm md'] = '1rem 1.5rem';
    this.layoutMap['sm lg'] = '1rem 2rem';
    this.layoutMap['sm xl'] = '1rem 3rem';
    this.layoutMap['sm 2xl'] = '1rem 4rem';
    this.layoutMap['sm 3xl'] = '1rem 6rem';
    this.layoutMap['sm 4xl'] = '1rem 8rem';
    this.layoutMap['md'] = '1.5rem';
    this.layoutMap['md sm'] = '1.5rem 1rem';
    this.layoutMap['md lg'] = '1.5rem 2rem';
    this.layoutMap['md xl'] = '1.5rem 3rem';
    this.layoutMap['md 2xl'] = '1.5rem 4rem';
    this.layoutMap['md 3xl'] = '1.5rem 6rem';
    this.layoutMap['md 4xl'] = '1.5rem 8rem';
    this.layoutMap['lg'] = '2rem';
    this.layoutMap['lg sm'] = '2rem 1rem';
    this.layoutMap['lg md'] = '2rem 1.5rem';
    this.layoutMap['lg xl'] = '2rem 3rem';
    this.layoutMap['lg 2xl'] = '2rem 4rem';
    this.layoutMap['lg 3xl'] = '2rem 6rem';
    this.layoutMap['lg 4xl'] = '2rem 8rem';
    this.layoutMap['xl'] = '3rem';
    this.layoutMap['xl sm'] = '3rem 1rem';
    this.layoutMap['xl md'] = '3rem 1.5rem';
    this.layoutMap['xl 2xl'] = '3rem 4rem';
    this.layoutMap['xl 3xl'] = '3rem 6rem';
    this.layoutMap['xl 4xl'] = '3rem 8rem';
    this.layoutMap['2xl'] = '4rem';
    this.layoutMap['2xl sm'] = '4rem 1rem';
    this.layoutMap['2xl md'] = '4rem 1.5rem';
    this.layoutMap['2xl lg'] = '4rem 2rem';
    this.layoutMap['2xl xl'] = '4rem 3rem';
    this.layoutMap['2xl 3xl'] = '4rem 6rem';
    this.layoutMap['2xl 4xl'] = '4rem 8rem';
    this.layoutMap['3xl'] = '6rem';
    this.layoutMap['3xl sm'] = '6rem 1rem';
    this.layoutMap['3xl md'] = '6rem 1.5rem';
    this.layoutMap['3xl lg'] = '6rem 2rem';
    this.layoutMap['3xl xl'] = '6rem 3rem';
    this.layoutMap['3xl 2xl'] = '6rem 4rem';
    this.layoutMap['3xl 4xl'] = '6rem 8rem';
    this.layoutMap['4xl'] = '8rem';
    this.layoutMap['4xl sm'] = '8rem 1rem';
    this.layoutMap['4xl md'] = '8rem 1.5rem';
    this.layoutMap['4xl lg'] = '8rem 2rem';
    this.layoutMap['4xl xl'] = '8rem 3rem';
    this.layoutMap['4xl 2xl'] = '8rem 4rem';
    this.layoutMap['4xl'] = '8rem 6rem';
  }

  componentDidLoad() {
    // Sets the values of the breakpoint and layout maps
    this.populateMaps();
    this.breakpoint = getBreakpoint(this.el);
    this.handleBreakpoint();
    this.hasRendered = true;
  }

  render() {
    return (
      <Host>
        <div id="breakpoint"></div>
        <slot></slot>
      </Host>
    );
  }
}
