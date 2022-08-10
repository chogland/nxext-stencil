import { Component, Element, Event, EventEmitter, Method, Host, h, Prop } from '@stencil/core';
import { SizesAll, Target, ButtonAppearance, ButtonType } from '../interfaces';
import { setRingOffsetUtil } from '../../utils/utils';

/**
 * @slot start - Used to add leading icon. (optional)
 * @slot end - Used to add trailing icon. (optional)
 * @slot - Used to add text to your button.
 */

@Component({
  tag: 'rds-button',
  styleUrl: 'rds-button.scss',
  shadow: true,
})
export class RdsButton {
  private buttonId = `rds-button-${buttonIds++}`;

  @Element() el: HTMLRdsButtonElement;

  /**
   * @deprecated
   */
  @Event({ bubbles: true, composed: true }) filterToggleEvent: EventEmitter<string>;

  /**
   * @deprecated
   * Old way of setting button text. You can now type within the button tags set the button text.
   */
  @Prop() text?: string;

  /**
   * Accessible label for button.
   */
  @Prop() label?: string;

  /**
   * Active state for button. To be used within a button group or as part of a menu (secondary & tertiary appearances only).
   * When true, button will appear active.
   */
  @Prop() active: boolean = false;

  /**
   * The type of the button.
   */
  @Prop() type: ButtonType = 'button';

  /**
   * The appearance of the button.
   * The options are different depending on the button `type`.
   * _Note: Appearance types have been updated as part of the Phase 2 experience._
   */
  @Prop() appearance: ButtonAppearance = 'primary';

  /**
   * This property handles the disabled state of the button.
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * The button size.
   * _Note: The `"lg"` property is no longer full-width. See `"xl"` for full-width._
   */
  @Prop({ reflect: true }) size?: SizesAll;

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  @Prop({ reflect: true }) href?: string | undefined;

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target?: Target | undefined;

  /**
   * Adds extra padding on the button if an icon is the only contents.
   */
  @Prop({ reflect: true, attribute: 'icononly' }) iconOnly: boolean = false;

  /**
   * @deprecated
   * Custom attribute that can be used when `rds-filter` is needed. It applies a customEvent to trigger `rds-filter`.
   */
  @Prop({ reflect: true, attribute: 'isfilter' }) isFilter: boolean = false;

  /**
   * Adds button group specific styles.
   * @private
   */
  @Prop({ reflect: true }) group?: boolean = false;

  /**
   * If `true`, button is set to selected mode.
   * Adds styles to the button to indicate a menu item is selected.
   * Set up to inherit from the parent `RdsMenu` component.
   * @internal
   */
  @Prop({ reflect: true }) selected: boolean = false;

  /**
   * If `true`, button is set to open mode.
   * Adds styles to the button to indicate the menu is open.
   * Set up to inherit from the parent `RdsMenu` component.
   * @internal
   */
  @Prop({ reflect: true }) open: boolean = false;

  /**
   * Checks a form's elements with constraint validations.
   * Button's `type` must equal 'submit' and must exist inside of a `<form>` container.
   */
  @Method()
  async isFormValid() {
    const form = this.el.closest('form');
    const toValidate = form.querySelectorAll('[validate="true"]');
    let isValid: boolean = true;
    for (let i = 0; i < toValidate.length; i++) {
      if ((await (toValidate[i] as HTMLRdsInputElement).validateConstraint()) == false) {
        isValid = false;
      }
    }
    return isValid;
  }

  private emitFilterToggle = () => {
    this.filterToggleEvent.emit('toggle rds-filter').preventDefault();
  };

  componentWillLoad() {
    // Inject size in slotted icon elements elements
    this.el.childNodes.forEach(element => {
      if (element['size']) {
        if (!this.iconOnly) {
          // Set size of icon for leading and trailing icon buttons
          element['size'] = this.size == 'lg' || this.size == 'xl' ? 'lg' : 'md';
        } else {
          // Set size of icon for icon only buttons
          element['size'] = this.size == 'sm' ? 'md' : 'lg';
        }
      }
    });
  }

  componentDidLoad() {
    // Set ring offset util based on parent's background color
    setRingOffsetUtil(this.el, this.el.shadowRoot.getElementById(this.buttonId));
  }

  render() {
    const { appearance, disabled, target, href, text, size, iconOnly, label, isFilter, emitFilterToggle, group } = this;
    const TagType = href === undefined ? 'button' : ('a' as any);
    const attrs =
      TagType === 'button'
        ? {}
        : {
            href,
            target,
          };

    return (
      <Host style={{ pointerEvents: disabled ? 'none' : undefined }}>
        <TagType
          {...attrs}
          class={{ [appearance]: true, 'group-button': group }}
          size={size}
          disabled={disabled}
          icononly={iconOnly}
          aria-label={text ? text : label}
          isfilter={isFilter}
          onClick={isFilter ? emitFilterToggle.bind(this) : null}
          active={this.active ? 'true' : null}
          aria-disabled={disabled ? 'true' : null}
          style={{ pointerEvents: disabled ? 'none' : undefined }}
          id={this.buttonId}
          type={this.type}
        >
          <span class="button-inner">
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
let buttonIds = 0;
