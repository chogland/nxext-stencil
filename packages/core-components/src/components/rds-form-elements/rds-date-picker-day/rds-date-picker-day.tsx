import { Component, Element, Prop, Host, Event, EventEmitter, Listen, h, VNode } from '@stencil/core';
import { getKey } from '../../../utils/keys';
import { getElementDir } from '../../../utils/dom';
import { DateLocaleData } from '../rds-date-picker/interfaces';

@Component({
  tag: 'rds-date-picker-day',
  styleUrl: 'rds-date-picker-day.scss',
  shadow: true,
})
export class RdsDatePickerDay {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLRdsDatePickerDayElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Day of the month to be shown. */
  @Prop() day: number;

  /** Date is outside of range and can't be selected */
  @Prop({ reflect: true }) disabled = false;

  /** Date is in the current month. */
  @Prop({ reflect: true }) currentMonth = false;

  /** Date is the current selected date of the picker */
  @Prop({ reflect: true }) selected = false;

  /** Date is currently highlighted as part of the range */
  @Prop({ reflect: true }) highlighted = false;

  /** Showing date range */
  @Prop({ reflect: true }) range = false;

  /** Date is the start of date range */
  @Prop({ reflect: true }) startOfRange = false;

  /** Date is the end of date range */
  @Prop({ reflect: true }) endOfRange = false;

  @Prop({ reflect: true }) rangeHover = false;

  /** Date is actively in focus for keyboard navigation */
  @Prop({ reflect: true }) active = false;

  /** CLDR data for current locale */
  /* @internal */
  @Prop() localeData: DateLocaleData;

  /** Date value for the day. */
  @Prop() value: Date;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  onClick = (): void => {
    !this.disabled && this.rdsDaySelect.emit();
  };

  keyDownHandler = (e: KeyboardEvent): void => {
    const key = getKey(e.key);
    if (key === ' ' || key === 'Enter') {
      !this.disabled && this.rdsDaySelect.emit();
    }
  };

  @Listen('mouseover')
  mouseoverHandler(): void {
    this.rdsDayHover.emit({
      disabled: this.disabled,
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when user selects day
   */
  @Event() rdsDaySelect: EventEmitter;

  /**
   * Emitted when user hovers over a day
   * @internal
   */
  @Event() rdsDayHover: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render(): VNode {
    const formattedDay = String(this.day)
      .split('')
      .map(i => this.localeData.numerals[i])
      .join('');
    const dir = getElementDir(this.el);
    return (
      <Host onClick={this.onClick} onKeyDown={this.keyDownHandler} role="gridcell" tabindex={this.active ? 0 : -1}>
        <div class={{ 'day-v-wrapper': true, ['rds--rtl']: dir === 'rtl' }}>
          <div class="day-wrapper">
            <span class="day">
              <span class="text">{formattedDay}</span>
            </span>
          </div>
        </div>
      </Host>
    );
  }
}
