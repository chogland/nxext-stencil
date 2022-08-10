import { Component, Host, Prop, Element, Event, EventEmitter, VNode, Method, h } from '@stencil/core';
@Component({
  tag: 'rds-action',
  styleUrl: 'rds-action.scss',
  shadow: true,
})
export class RdsAction {
  @Element() el: HTMLRdsActionElement;

  /**
   * The name of the icon to display. The value of this property must match the icon name from RDS Icons
   */
  @Prop() icon?: string;

  /**
   * Indicates whether the action is highlighted.
   */
  @Prop({ reflect: true }) active = false;

  /**
   * When true, disabled prevents interaction. This state shows actions grayed out.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The label of the action.
   */
  @Prop() label?: string;

  /**
   * Text that accompanies the action icon.
   */
  @Prop() text!: string;

  /**
   * Indicates whether the text is displayed.
   */
  @Prop({ reflect: true }) textEnabled = true;

  /**
   * Emitted when the action has been clicked.
   */
  @Event() rdsActionClick: EventEmitter;

  buttonEl: HTMLButtonElement;

  @Method()
  async setFocus(): Promise<void> {
    this.buttonEl.focus();
  }

  renderTextContainer(): VNode {
    const { text, textEnabled } = this;

    const textContainerClasses = {
      'text-container': true,
      'text-container--visible': textEnabled,
    };

    return text ? (
      <div class={textContainerClasses} key="text-container">
        {text}
      </div>
    ) : null;
  }

  renderIconContainer(): VNode {
    const { icon, el } = this;
    const rdsIconNode = icon ? <rds-hero-icon name={icon} /> : null;
    const hasIconToDisplay = rdsIconNode || el.children?.length;

    const slotContainerNode = (
      <div>
        <slot />
      </div>
    );

    return hasIconToDisplay ? (
      <div aria-hidden="true" key="icon-container" title={this.text}>
        {rdsIconNode}
        {slotContainerNode}
      </div>
    ) : null;
  }
  render(): VNode {
    const { disabled, label, text } = this;

    const ariaLabel = label || text;
    return (
      <Host onClick={this.rdsActionClickHandler}>
        <button
          aria-disabled={disabled.toString()}
          aria-label={ariaLabel}
          class={{
            'action-button': true,
          }}
          disabled={disabled}
          ref={(buttonEl): HTMLButtonElement => (this.buttonEl = buttonEl)}
        >
          {this.renderIconContainer()}
          {this.renderTextContainer()}
        </button>
      </Host>
    );
  }

  rdsActionClickHandler = (): void => {
    if (!this.disabled) {
      this.rdsActionClick.emit();
    }
  };
}
