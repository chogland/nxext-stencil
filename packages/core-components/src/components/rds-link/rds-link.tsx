import { Component, Host, Element, h, Prop } from '@stencil/core';
import { setRingOffsetUtil } from '../../utils/utils';
/**
 * @slot start - Used to add a leading icon to your link.
 * @slot end - Used to add a trailing icon to your link.
 * @slot - Used to add link text.
 */

@Component({
  tag: 'rds-link',
  styleUrl: 'rds-link.scss',
  shadow: true,
})
export class RdsLink {
  private linkId = `rds-link-${linkIds++}`;

  @Element() el: HTMLRdsLinkElement;

  /**
   * @deprecated
   * You can now type within the link tags set the link text.
   */
  @Prop() text?: string;

  /**
   * Accessible label for link.
   */
  @Prop() label: string;

  /**
   * The type of the link.
   * Current options are: `"primary"`, `"secondary"`.
   */
  @Prop() appearance: string = 'primary';

  /**
   * Determines the padding on the link if an icon is the only contents.
   */
  @Prop({ reflect: true, attribute: 'icononly' }) iconOnly: boolean = false;

  /**
   * This property handles the disabled state of the link.
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * The link size.
   * Options are: `"sm"` and `"base"`
   */
  @Prop({ reflect: true }) size?: string = 'base';

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  @Prop({ reflect: true }) href: string | undefined;

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
   */
  @Prop() target: string | undefined;

  componentDidLoad() {
    // Set ring offset util based on parent's background color
    setRingOffsetUtil(this.el, this.el.shadowRoot.getElementById(this.linkId));
  }

  render() {
    const { appearance, disabled, target, href, text, size, label } = this;
    const TagType = href === undefined ? 'button' : ('a' as any);
    const attrs =
      TagType === 'button'
        ? {}
        : {
            href,
            target,
          };
    return (
      <Host>
        <TagType
          {...attrs}
          class={appearance}
          size={size}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : null}
          style={{ pointerEvents: disabled ? 'none' : undefined }}
          aria-label={text ? text : label}
          id={this.linkId}
        >
          <span class="link-inner">
            <slot name="start"></slot>
            <slot>{text}</slot>
            <slot name="end"></slot>
          </span>
        </TagType>
      </Host>
    );
  }
}

// Variable used to set unique button ID
let linkIds = 0;
