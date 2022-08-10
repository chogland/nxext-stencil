import { Component, Element, Prop, Event, h, EventEmitter, VNode, State, Watch, Fragment } from '@stencil/core';
import { getElementDir } from '../../../utils/dom';
import { dateFromRange, nextMonth, prevMonth, localizeNumber, parseNumber, getOrder } from '../../../utils/date';
import { getKey } from '../../../utils/keys';
import { DateLocaleData } from '../rds-date-picker/interfaces';
import { HeadlineLevel } from '../../interfaces';

@Component({
  tag: 'rds-date-picker-month-header',
  styleUrl: 'rds-date-picker-month-header.scss',
  shadow: true,
})
export class RdsDatePickerMonthHeader {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLRdsDatePickerMonthHeaderElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Already selected date. */
  @Prop() selectedDate: Date;

  /** Focused date with indicator (will become selected date if user proceeds) */
  @Prop() activeDate: Date;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadlineLevel = 2;

  /** Minimum date of the calendar below which is disabled. */
  @Prop() min: Date;

  /** Maximum date of the calendar above which is disabled. */
  @Prop() max: Date;

  /** User's language and region as BCP 47 formatted string. */
  @Prop() locale: string;

  /** Localized string for previous month. */
  @Prop() intlPrevMonth: string;

  /** Localized string for next month. */
  @Prop() intlNextMonth: string;

  /** Localized string for year. */
  @Prop() intlYear: string;

  /** CLDR locale data for translated calendar info */
  @Prop() localeData: DateLocaleData;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   *  Changes to active date
   */
  @Event() rdsDatePickerSelect: EventEmitter<Date>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.setNextPrevMonthDates();
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <div class="header" dir={dir}>
        {this.renderContent()}
      </div>
    );
  }

  renderContent(): VNode {
    if (!this.activeDate || !this.localeData) {
      return null;
    }

    const activeMonth = this.activeDate.getMonth();
    const { months, unitOrder } = this.localeData;
    const localizedMonth = (months.wide || months.narrow || months.abbreviated)[activeMonth];
    const localizedYear = localizeNumber(this.activeDate.getFullYear(), this.localeData);
    const order = getOrder(unitOrder);
    const reverse = order.indexOf('y') < order.indexOf('m');
    const suffix = this.localeData.year?.suffix;

    return (
      <Fragment>
        <rds-button
          aria-disabled={(this.prevMonthDate.getMonth() === activeMonth).toString()}
          aria-label={this.intlPrevMonth}
          appearance="tertiary"
          iconOnly
          size="sm"
          label={this.intlPrevMonth}
          href="#"
          onClick={this.prevMonthClick}
          onKeyDown={this.prevMonthKeydown}
          role="button"
          tabindex={this.prevMonthDate.getMonth() === activeMonth ? -1 : null}
        >
          <rds-hero-icon name="arrow-left" />
        </rds-button>
        <div class={{ 'text': true, 'text--reverse': reverse }}>
          <div class="month">{localizedMonth}</div>
          <span class="year-wrap">
            <input
              aria-label={this.intlYear}
              class={{
                'year': true,
                'year--suffix': !!suffix,
              }}
              inputmode="numeric"
              maxlength="4"
              minlength="1"
              onChange={this.yearChanged}
              onKeyDown={this.onYearKey}
              pattern="\d*"
              ref={el => (this.yearInput = el)}
              type="text"
              value={localizedYear}
            />
            {suffix && (
              <span class="suffix">
                <span aria-hidden="true" class="suffix__invisible">
                  {localizedYear}
                </span>
                {' ' + suffix}
              </span>
            )}
          </span>
        </div>
        <rds-button
          aria-disabled={(this.nextMonthDate.getMonth() === activeMonth).toString()}
          aria-label={this.intlNextMonth}
          appearance="tertiary"
          iconOnly
          label={this.intlNextMonth}
          size="sm"
          href="#"
          onClick={this.nextMonthClick}
          onKeyDown={this.nextMonthKeydown}
          role="button"
          tabindex={this.nextMonthDate.getMonth() === activeMonth ? -1 : null}
        >
          <rds-hero-icon name="arrow-right" />
        </rds-button>
      </Fragment>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private yearInput: HTMLInputElement;

  @State() nextMonthDate: Date;

  @State() prevMonthDate: Date;

  @Watch('min')
  @Watch('max')
  @Watch('activeDate')
  setNextPrevMonthDates(): void {
    if (!this.activeDate) {
      return;
    }

    this.nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
    this.prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Increment year on UP/DOWN keys
   */
  private onYearKey = (e: KeyboardEvent): void => {
    const year = (e.target as HTMLInputElement).value;
    switch (getKey(e.key)) {
      case 'ArrowDown':
        e.preventDefault();
        this.setYear(year, -1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.setYear(year, 1);
        break;
    }
  };

  private yearChanged = (event: Event): void => {
    this.setYear((event.target as HTMLInputElement).value);
  };

  private prevMonthClick = (e: Event): void => {
    this.handleArrowClick(e, this.prevMonthDate);
  };

  private prevMonthKeydown = (e: KeyboardEvent): void => {
    const key = getKey(e.key);
    if (key === ' ' || key === 'Enter') {
      this.prevMonthClick(e);
    }
  };

  private nextMonthClick = (e: Event): void => {
    this.handleArrowClick(e, this.nextMonthDate);
  };

  private nextMonthKeydown = (e: KeyboardEvent): void => {
    const key = getKey(e.key);
    if (key === ' ' || key === 'Enter') {
      this.nextMonthClick(e);
    }
  };

  /*
   * Update active month on clicks of left/right arrows
   */
  private handleArrowClick = (e: Event, date: Date): void => {
    e?.preventDefault();
    e.stopPropagation();
    this.rdsDatePickerSelect.emit(date);
  };

  /**
   * Parse localized year string from input,
   * set to active if in range
   */
  private setYear(localizedYear: string, increment = 0) {
    const { min, max, activeDate, localeData, yearInput } = this;
    const parsedYear = parseNumber(localizedYear, localeData);
    const length = parsedYear.toString().length;
    const year = isNaN(parsedYear) ? false : parsedYear + increment;
    const inRange = year && (!min || min.getFullYear() <= year) && (!max || max.getFullYear() >= year);
    // if you've supplied a year and it's in range, update active date
    if (year && inRange && length === localizedYear.length) {
      const nextDate = new Date(activeDate);
      nextDate.setFullYear(year as number);
      const inRangeDate = dateFromRange(nextDate, min, max);
      this.rdsDatePickerSelect.emit(inRangeDate);
      yearInput.value = localizeNumber(inRangeDate.getFullYear(), localeData);
    } else {
      // leave the current active date and clean up garbage input
      yearInput.value = localizeNumber(activeDate.getFullYear(), localeData);
    }
  }
}
