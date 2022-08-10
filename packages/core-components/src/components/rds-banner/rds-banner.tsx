import { Component, Host, h, Prop, Method, Event, EventEmitter } from '@stencil/core';
import { BannerAppearance } from '../interfaces';

/**
 * @slot content-left - The left section for banner content. Place a div with slot="content-left" for best results.
 * @slot content-right - The right section for banner content. Place a div with slot="content-right" for best results.
 */

@Component({
  tag: 'rds-banner',
  styleUrl: 'rds-banner.scss',
  shadow: true,
})
export class RdsBanner {
  /**
   * The appearance of the banner.
   */
  @Prop({ reflect: true, mutable: true }) appearance: BannerAppearance = 'non-rounded';

  /**
   * @internal
   * If set to `true`, the banner will be hidden.
   */
  @Prop({ mutable: true }) dismissed: boolean = false;

  /**
   * If set to `true`, the banner will be dismissable.
   */
  @Prop({ mutable: true }) dismissible: boolean = true;

  /**
   * Emitted when the banner has been dismissed.
   */
  @Event() rdsBannerDismissed: EventEmitter;

  @Method()
  async dismiss() {
    this.dismissed = true;
    this.rdsBannerDismissed.emit();
  }

  render() {
    return (
      <Host role="alert" class={{ dismissed: this.dismissed }}>
        <div class="banner-wrapper">
          <slot name="content-left"></slot>
          <slot name="content-right"></slot>
          {this.dismissible ? (
            <rds-button
              iconOnly
              size="sm"
              onClick={() => {
                this.dismiss();
              }}
            >
              <span>Dismiss</span>
              <rds-hero-icon name="x" />
            </rds-button>
          ) : null}
        </div>
      </Host>
    );
  }
}
