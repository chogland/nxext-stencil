import { Component, Host, Prop, Element, Event, Listen, EventEmitter, VNode, h } from '@stencil/core';

@Component({
  tag: 'rds-image',
  styleUrl: 'rds-image.scss',
  shadow: true,
})
export class RdsImage {
  @Element() el: HTMLRdsImageElement;

  /**
   * Set the alternative text of the image
   */
  @Prop({ reflect: true }) alt: string;

  /**
   * Set the source url of the image
   */
  @Prop({ reflect: true }) src: string;

  /**
   * Set the caption text that is displayed under the image
   */
  @Prop() caption: string;

  /**
   * Set the detail text that is displayed under the title text in a lightbox
   */
  @Prop() detail: string;

  /**
   * Set the title text that is displayed above image in a lightbox
   */
  @Prop() headline: string;

  /**
   * Set tabindex when inside a lightbox
   */
  @Prop() interactive: boolean = false;

  /**
   * Size options for thumbnail: 'sm', 'md', 'lg' and 'full'
   */
  @Prop({ reflect: true }) size: string = 'md';

  /**
   * Size options for small thumb, medium thumb, and large
   */
  @Prop() thumbnail: boolean = false;

  /**
   * Display headline next to image?
   */
  @Prop({ reflect: true }) showHeadline: boolean = false;

  /**
   * @internal
   */
  @Event() rdsImageSelect: EventEmitter;

  renderStyle(): VNode {
    return (
      <style>
        {`
          .thumbnail {
            background-image: url(${this.src})
          }
        `}
      </style>
    );
  }

  render() {
    return (
      <Host headline={this.headline} detail={this.detail}>
        {this.thumbnail ? this.renderStyle() : null}
        {this.thumbnail ? <div class="thumbnail"></div> : <img part="image" src={this.src} alt={this.alt} tabIndex={this.interactive ? 0 : -1} />}
        {this.headline != undefined && this.showHeadline ? <div class="headline">{this.headline}</div> : null}
      </Host>
    );
  }

  @Listen('click') onClick(): void {
    this.rdsImageSelect.emit({
      requestedImage: this.src,
    });
  }
}
