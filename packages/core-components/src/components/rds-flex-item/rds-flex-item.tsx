import { Element, Component, Host, Prop, Watch, Listen, h } from '@stencil/core';
import { FlexItemAlignSelf, FlexItemBasis, FlexItemGrow, FlexItemOrder, FlexItemShrink } from '../interfaces';
import { getBreakpoint } from '../../utils/dom';

/**
 * @slot - Used to add components/elements into a flex child element.
 */
@Component({
  tag: 'rds-flex-item',
  styleUrl: 'rds-flex-item.scss',
  shadow: true,
})
export class RdsFlexItem {
  @Element() el!: HTMLRdsFlexItemElement;
  hasRendered: boolean = false;

  /**
   * Manages the responsive rendering of the component props.
   * @internal
   */
  breakpoint: string = null;

  breakpointMap = new Object();

  /**
   * Overrides a flex item's alignItems value on the cross-axis.
   */
  @Prop({ mutable: true }) alignSelf?: FlexItemAlignSelf;

  /**
   * Sets the initial main size of a flex item. Can be a pixel value or percentage.
   */
  @Prop({ mutable: true }) flexBasis?: FlexItemBasis;

  /**
   * Sets the flex grow factor of a flex item's main size.
   */
  @Prop({ mutable: true }) flexGrow?: FlexItemGrow;

  /**
   * Sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to this prop.
   */
  @Prop({ mutable: true }) flexShrink?: FlexItemShrink;

  /**
   * Sets the order to lay out an item in a flex or grid container. Items in a flex component are sorted by ascending order value and then by their source code order.
   */
  @Prop({ mutable: true }) order?: FlexItemOrder;

  handleBreakpoint() {
    this.handleOrder();
    this.handleFlexShrink();
    this.handleFlexGrow();
    this.handleFlexBasis();
    this.handleAlignSelf();
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

  @Watch('order')
  handleOrder() {
    if (this.order) {
      if (!Array.isArray(this.order) && this.order.includes(',')) {
        this.order = this.order.split(',');
      }
      if (Array.isArray(this.order)) {
        if (this.order[this.breakpointMap[this.breakpoint]]) {
          this.el.style.order = this.order[this.breakpointMap[this.breakpoint]].toString();
        } else {
          for (let i = this.order.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.order[i]) {
                this.el.style.order = this.order[i].toString();
                break;
              }
            }
          }
        }
      } else {
        this.el.style.order = this.order.toString();
      }
    }
  }

  @Watch('flexShrink')
  handleFlexShrink() {
    if (this.flexShrink) {
      if (!Array.isArray(this.flexShrink) && this.flexShrink.includes(',')) {
        this.flexShrink = this.flexShrink.split(',');
      }
      if (Array.isArray(this.flexShrink)) {
        if (this.flexShrink[this.breakpointMap[this.breakpoint]]) {
          this.el.style.flexShrink = this.flexShrink[this.breakpointMap[this.breakpoint]].toString();
        } else {
          for (let i = this.flexShrink.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.flexShrink[i]) {
                this.el.style.flexShrink = this.flexShrink[i].toString();
                break;
              }
            }
          }
        }
      } else {
        this.el.style.flexShrink = this.flexShrink.toString();
      }
    }
  }

  @Watch('flexGrow')
  handleFlexGrow() {
    if (this.flexGrow) {
      if (!Array.isArray(this.flexGrow) && this.flexGrow.includes(',')) {
        this.flexGrow = this.flexGrow.split(',');
      }
      if (Array.isArray(this.flexGrow)) {
        if (this.flexGrow[this.breakpointMap[this.breakpoint]]) {
          this.el.style.flexGrow = this.flexGrow[this.breakpointMap[this.breakpoint]].toString();
        } else {
          for (let i = this.flexGrow.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.flexGrow[i]) {
                this.el.style.flexGrow = this.flexGrow[i].toString();
                break;
              }
            }
          }
        }
      } else {
        this.el.style.flexGrow = this.flexGrow.toString();
      }
    }
  }

  @Watch('flexBasis')
  handleFlexBasis() {
    if (this.flexBasis) {
      if (!Array.isArray(this.flexBasis) && this.flexBasis.includes(',')) {
        this.flexBasis = this.flexBasis.split(',');
      }
      if (Array.isArray(this.flexBasis)) {
        if (this.flexBasis[this.breakpointMap[this.breakpoint]]) {
          this.el.style.flexBasis = this.flexBasis[this.breakpointMap[this.breakpoint]];
        } else {
          for (let i = this.flexBasis.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.flexBasis[i]) {
                this.el.style.flexBasis = this.flexBasis[i];
                break;
              }
            }
          }
        }
      } else {
        this.el.style.flexBasis = this.flexBasis;
      }
    }
  }

  @Watch('alignSelf')
  handleAlignSelf() {
    if (this.alignSelf) {
      // Remove classes that already exist
      for (let i = 0; i < this.el.classList.length; i++) {
        if (this.el.classList[i].includes('align-self--')) {
          this.el.classList.remove(this.el.classList[i]);
        }
      }
      if (!Array.isArray(this.alignSelf) && this.alignSelf.includes(',')) {
        this.alignSelf = this.alignSelf.split(',');
      }
      if (Array.isArray(this.alignSelf)) {
        if (this.alignSelf[this.breakpointMap[this.breakpoint]]) {
          this.el.classList.add('align-self--' + this.alignSelf[this.breakpointMap[this.breakpoint]]);
        } else {
          for (let i = this.alignSelf.length; i >= 0; i--) {
            if (i <= this.breakpointMap[this.breakpoint]) {
              if (this.alignSelf[i]) {
                this.el.classList.add('align-self--' + this.alignSelf[i]);
                break;
              }
            }
          }
        }
      } else {
        this.el.classList.add('align-self--' + this.alignSelf);
      }
    }
  }

  populateMap() {
    this.breakpointMap['xs'] = 0;
    this.breakpointMap['sm'] = 1;
    this.breakpointMap['md'] = 2;
    this.breakpointMap['lg'] = 3;
    this.breakpointMap['xl'] = 4;
    this.breakpointMap['2xl'] = 5;
  }

  componentDidRender() {
    // Sets the values of the breakpoint map
    this.populateMap();
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
