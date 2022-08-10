import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @slot indicator - Used for adding indicator to your avatar.
 */
@Component({
  tag: 'rds-avatar',
  styleUrl: 'rds-avatar.scss',
  shadow: true,
})
export class RdsAvatar {
  /**
   * @deprecated
   * Set the drop shadow of the avatar for the deprecated phase 1 avatar.
   */
  @Prop() shadow: boolean = false;

  /**
   * Set the size of the avatar, default is lg.
   * Options are: sm, md, lg and xl
   */
  @Prop({ mutable: true }) size?: string = 'lg';

  /**
   * Set the image src for the image used as the avatar
   */
  @Prop() src: string;

  /**
   * Set the fallback initials when no image is present.
   */
  @Prop() text?: string;

  render() {
    const avatarSizes = this.size ? { size: `${this.size}` } : null;
    const avatarTitle = this.text.slice(0, 2);

    return (
      <Host>
        <div avatar-wrapper title={this.text} {...avatarSizes}>
          {this.src ? <img src={this.src} alt={this.text} /> : <span>{this.text ? avatarTitle : null}</span>}
          <div class="indicator">
            <slot name="indicator"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
