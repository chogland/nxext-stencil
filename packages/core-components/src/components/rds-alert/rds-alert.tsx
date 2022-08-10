import { Component, Element, Event, EventEmitter, Host, h, Listen, Method, Prop } from '@stencil/core';
import { getSlotted } from '../../utils/dom';
import { getKey } from '../../utils/keys';
import { AlertAppearance } from '../interfaces';

/**
 * @slot title - The title text of the alert. Place a span with slot="title" for best results.
 * @slot message - The message that is displayed below the title in alert. Place a span with slot="message" for best results.
 * @slot action-text - This is the text displayed as the primary action button in the alert. Place a span with slot="action-text" for best results.
 */
@Component({
  tag: 'rds-alert',
  styleUrl: 'rds-alert.scss',
  shadow: true,
})
export class RdsAlert {
  @Element() el: HTMLRdsAlertElement;

  /**
   * The appearance of the Alert.
   * Options are: `"info"`, `"error"`, `"warning"`, and `"success"`.
   */
  @Prop({ reflect: true, mutable: true }) appearance: AlertAppearance = 'info';

  /**
   * If set to `false`, the alert will be hidden.
   */
  @Prop({ reflect: true, mutable: true }) visible: boolean = false;

  /**
   * If set to `true`, the alert has a dismiss button and is dismissible.
   */
  @Prop() dismissible: boolean = true;

  /**
   * This is for an accessible label on the primary action.
   */
  @Prop({ reflect: true }) label: string = 'Alert primary action';

  /**
   * Emitted when the alert has been dismissed.
   */
  @Event() rdsAlertDismiss: EventEmitter;

  /**
   * Emitted when the action has been clicked.
   */
  @Event() rdsActionClick: EventEmitter;

  @Listen('keydown') keyDownHandler(e: KeyboardEvent): void {
    if (e.target === this.dismissEl) {
      switch (getKey(e.key)) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          this.visible = false;
          break;
      }
    }
  }

  @Method()
  async dismiss() {
    this.visible = false;
  }

  rdsActionClickHandler = (): void => {
    this.rdsActionClick.emit();
  };

  private icon: string = 'information-circle';

  actionEl: HTMLButtonElement;

  dismissEl: HTMLButtonElement;

  @Method()
  async setFocus(): Promise<void> {
    this.dismissEl.focus();
  }

  componentWillLoad() {
    if (this.appearance === 'error') {
      this.icon = 'x-circle';
    } else if (this.appearance === 'success') {
      this.icon = 'check-circle';
    } else if (this.appearance === 'warning') {
      this.icon = 'exclamation';
    }
  }

  render() {
    const hasActions = getSlotted(this.el, 'action-text');

    return (
      <Host role="alert" aria-live={this.appearance === 'error' || this.appearance === 'success' ? 'assertive' : 'polite'}>
        <rds-hero-icon class="icon" name={this.icon} size="lg"></rds-hero-icon>
        <div class="alert-text">
          <slot name="title"></slot>
          <div class="alert-message">
            <slot name="message"></slot>
          </div>
        </div>
        <div class="break" />
        <div class="alert-actions">
          {hasActions ? (
            <button
              ref={(dismissEl): HTMLButtonElement => (this.dismissEl = dismissEl)}
              class="action-primary action"
              aria-label={this.label}
              onClick={() => {
                this.rdsActionClickHandler();
              }}
            >
              <slot name="action-text" />
            </button>
          ) : null}
          {this.dismissible ? (
            <button
              ref={(actionEl): HTMLButtonElement => (this.actionEl = actionEl)}
              class="action-dismiss action"
              aria-label="dismiss"
              onClick={() => {
                this.dismiss();
              }}
            >
              Dismiss
            </button>
          ) : null}
        </div>
      </Host>
    );
  }
}
