import { Component, Element, Method, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { focusElement } from '../../utils/utils';
import { SizesSmMdLg } from '../interfaces';

@Component({
  tag: 'rds-fab',
  styleUrl: 'rds-fab.scss',
  shadow: true,
})
export class RdsFab {
  @Element() el: HTMLRdsFabElement;

  /**
   * Sets the FAB button size.
   */
  @Prop({ reflect: true }) size?: SizesSmMdLg = 'md';

  /**
   * When true, disabled prevents interaction. This state will not emit the rdsFabClicked event when set to true.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * What icon to be displayed. Icons can be found in our `RdsHeroIcon` component.
   * @default 'plus'
   */
  @Prop() icon?: string = 'plus';

  /**
   * Text that displays in the tooltip on FAB hover
   */
  @Prop({ reflect: true }) text: string;

  /**
   * Accessible label for button. If text is provided, text is used.
   * Otherwise it will default to this label if text isn't provided.
   */
  @Prop({ reflect: true }) label?: string;

  /**
   * This property can be used to disable the tooltip on hover.
   * Default shows tooltip with text or label.
   */
  @Prop() tooltip?: boolean = true;

  /**
   * Emitted when fab has been clicked.
   */
  @Event() rdsFabClicked: EventEmitter;

  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.buttonEl);
  }

  private buttonEl: HTMLElement;

  private onClick = () => {
    if (!this.disabled) {
      this.rdsFabClicked.emit();
    }
  };

  renderTooltip() {
    const { text, label } = this;

    return (
      <rds-tooltip label={label} position="left" reference-element="fab-tooltip">
        {text ? text : label}
      </rds-tooltip>
    );
  }

  render() {
    const { text, icon, label } = this;

    return (
      <Host>
        {this.tooltip ? this.renderTooltip() : null}
        <rds-tooltip-manager>
          <rds-button
            class="fab"
            id="fab-tooltip"
            iconOnly
            label={text ? text : label}
            onClick={this.onClick}
            disabled={this.disabled}
            ref={(buttonEl): void => {
              this.buttonEl = buttonEl;
            }}
            size={this.size}
          >
            <rds-hero-icon name={icon} size="lg"></rds-hero-icon>
          </rds-button>
        </rds-tooltip-manager>
      </Host>
    );
  }
}
