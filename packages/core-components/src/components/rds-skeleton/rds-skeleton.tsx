import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'rds-skeleton',
  styleUrl: 'rds-skeleton.scss',
  shadow: true,
})
export class RdsSkeleton {
  /**
   * Number of rows of current skeleton type
   */
  @Prop() count: number = 1;

  /**
   * Variant of the skeleton
   * 'circle' | 'rect' | 'text'
   */
  @Prop() variant: string = 'text';

  /**
   * Width of the skeleton. Include px like '100px'.
   */
  @Prop() width: string = null;

  /**
   * Height of the skeleton. Include px like '100px'.
   */
  @Prop() height: string = null;

  /**
   * Optional bottom margin of the skeleton ex. 10px, 0 etc.
   */
  @Prop() marginBottom: string = null;

  items: number[] = [];

  componentWillLoad() {
    this.init();
  }

  componentWillUpdate() {
    this.init();
  }

  init() {
    this.items.length = this.count;
    this.items.fill(1);
  }

  get style() {
    let dimenssionsStyles: {
      width?: string;
      height?: string;
      marginBottom?: string;
    } = {
      width: null,
      height: null,
      marginBottom: null,
    };

    if (this.width) {
      dimenssionsStyles.width = this.width;
    }

    if (this.height) {
      dimenssionsStyles.height = this.height;
    }

    if (this.marginBottom) {
      dimenssionsStyles.marginBottom = this.marginBottom;
    }

    return { ...dimenssionsStyles };
  }

  render() {
    return this.items.map((_, index) => {
      return (
        <span
          key={index}
          class={{
            circle: this.variant === 'circle',
            rect: this.variant === 'rect',
            skeleton: true,
          }}
          aria-busy="true"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuetext="Loading..."
          aria-label="Loading"
          role="progressbar"
          tabindex="0"
          style={this.style}
        ></span>
      );
    });
  }
}
