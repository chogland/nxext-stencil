import { Component, Host, Prop, Element, h } from '@stencil/core';
import { CardMediaSize } from '../interfaces';

@Component({
  tag: 'rds-card-media',
  styleUrl: 'rds-card-media.scss',
  shadow: true,
})
export class RdsCardMedia {
  @Element() el: HTMLDivElement;

  /**
   * Set the source url of the image.
   */
  @Prop({ reflect: true }) src: string;

  /**
   * Set the tag text of the image.
   */
  @Prop({ reflect: true }) tag?: string;

  /**
   * Set the height of the media element.
   */
  @Prop({ reflect: true }) size: CardMediaSize = 'md';

  render() {
    return (
      <Host size={this.size}>
        {this.tag ? <div class="tag">{this.tag}</div> : null}
        <div
          class="image"
          style={{
            backgroundImage: 'url(' + this.src + ')',
          }}
        ></div>
      </Host>
    );
  }
}
