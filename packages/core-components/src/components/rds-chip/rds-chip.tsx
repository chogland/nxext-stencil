import { Component, Prop, Element, Event, Host, EventEmitter, Method, Listen, h } from '@stencil/core';
import { guid } from '../../utils/utils';
import { getKey } from '../../utils/keys';

@Component({
  tag: 'rds-chip',
  styleUrl: 'rds-chip.scss',
  shadow: true,
})
export class RdsChip {
  @Element() el: HTMLRdsChipElement;

  /** Optionally pass an icon to display
   * @deprecated - a dot is provided for active Chips. Icons are no longer accepted inside the Chip.
   */
  @Prop({ reflect: true }) icon?: string;

  /** Optionally set active to display in active state */
  @Prop({ reflect: true }) active?: boolean;

  /** Optionally show a button the user can click to dismiss the chip */
  @Prop({ reflect: true }) dismissible?: boolean = false;

  /** Optionally make the Chip clickable  */
  @Prop({ reflect: true }) clickable?: boolean = false;

  /** Text displayed inside of the Chip */
  @Prop({ reflect: true }) text: string;

  /**
   * If `true`, the user cannot interact with the chip.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Value to provide the Chip.
   */
  @Prop() value!: any;

  /** Emitted when the dismiss button is clicked */
  @Event() rdsChipDismiss: EventEmitter;

  /** Emitted when the dismiss button is clicked */
  @Event() rdsChipClick: EventEmitter;

  @Listen('keydown') keyDownHandler(e: KeyboardEvent): void {
    if (e.target === this.el) {
      switch (getKey(e.key)) {
        case ' ':
        case 'Enter':
          if (this.dismissible) {
            this.rdsChipDismiss.emit(this.el);
          } else if (this.clickable) {
            this.rdsChipClick.emit(this.el);
          }
          e.preventDefault();
          break;
      }
    }
  }

  @Method()
  async setFocus(): Promise<void> {
    this.closeButton?.focus();
  }

  private guid: string = guid();

  private closeButton: HTMLButtonElement;

  clickHandler = (event: MouseEvent): void => {
    event.preventDefault();
    if (this.dismissible) {
      this.rdsChipDismiss.emit(this.el);
    } else if (this.clickable) {
      this.rdsChipClick.emit(this.el);
    }
  };

  render() {
    const closeButton = (
      <button aria-describedby={this.guid} aria-label="Close" tabindex="-1" class="close" ref={el => (this.closeButton = el)}>
        <rds-hero-icon name="x" size="md" />
      </button>
    );

    return (
      <Host onClick={this.clickHandler} tabindex={this.dismissible || this.clickable ? '0' : '-1'} value={this.value}>
        {this.active ? (
          <svg class="dot" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
        ) : null}
        <span class="title" id={this.guid}>
          {this.text}
        </span>
        {this.dismissible ? closeButton : null}
      </Host>
    );
  }
}
