import { Component, Element, Event, EventEmitter, Host, h, Listen, Method, Prop } from '@stencil/core';
import { getKey } from '../../utils/keys';
import { SnackbarAppearance } from '../interfaces';

/**
 * @slot - Used to add a message to the snackbar.
 */
@Component({
  tag: 'rds-snackbar',
  styleUrl: 'rds-snackbar.scss',
  shadow: true,
})
export class RdsSnackbar {
  @Element() el: HTMLRdsSnackbarElement;

  /**
   * The appearance of the Snackbar.
   * Options are: `"info"`, `"error"`, and `"success"`.
   */
  @Prop({ reflect: true, mutable: true }) appearance: SnackbarAppearance = 'info';

  /**
   * The appearance of the Snackbar.
   * Options are: `"info"`, `"error"`, and `"success"`.
   * @deprecated - please use 'appearance' prop instead.
   */
  @Prop({ mutable: true }) severity: SnackbarAppearance = 'info';

  /**
   * If set to `false`, the snackbar will be hidden.
   */
  @Prop({ reflect: true, mutable: true }) visible: boolean = false;

  /**
   * If set to `false`, the snackbar will not hide unless dismissed by the user
   */
  @Prop() autoHide: boolean = true;

  /**
   * When autoHide is true, this determines the length of time (in milliseconds) the snackbar is displayed.
   */
  @Prop() autoHideDuration: number = 8000;

  @Event() autoclose: EventEmitter;

  @Listen('keydown') keyDownHandler(e: KeyboardEvent): void {
    if (e.target === this.el) {
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
  async close() {
    this.visible = false;
  }

  private icon: string = 'information-circle';

  componentDidLoad() {
    if (this.autoHideDuration !== undefined && this.visible && this.autoHide)
      setTimeout(() => {
        this.autoclose.emit();
        this.close();
      }, this.autoHideDuration);
  }

  componentWillLoad() {
    if (this.appearance === 'error' || this.severity === 'error') {
      this.icon = 'x-circle';
    } else if (this.appearance === 'success' || this.severity === 'success') {
      this.icon = 'check-circle';
    } else {
      this.icon = 'information-circle';
    }
  }

  componentWillUpdate() {
    if (this.appearance === 'error' || this.severity === 'error') {
      this.icon = 'x-circle';
    } else if (this.appearance === 'success' || this.severity === 'success') {
      this.icon = 'check-circle';
    } else {
      this.icon = 'information-circle';
    }
  }

  render() {
    return (
      <Host role="alert" aria-live={this.severity || this.appearance === 'error' || this.severity || this.appearance === 'success' ? 'assertive' : 'polite'}>
        <rds-hero-icon class="icon" name={this.icon} size="lg"></rds-hero-icon>
        <div class="message">
          <slot></slot>
        </div>
        <button
          class="action"
          aria-label="close"
          onClick={() => {
            this.close();
          }}
        >
          <rds-hero-icon class="icon" name="x" size="md"></rds-hero-icon>
        </button>
      </Host>
    );
  }
}
