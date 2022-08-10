import { Component, h, Prop, Element, Host, State, Listen, Watch, VNode, Method, Event, EventEmitter } from '@stencil/core';
import { getLocaleData } from '../rds-date-picker/utils';
import { DateLocaleData } from '../rds-date-picker/interfaces';
import { getElementDir } from '../../../utils/dom';
import { dateFromRange, inRange, dateFromISO, dateToISO, parseDateString, sameDate } from '../../../utils/date';
import { getKey } from '../../../utils/keys';
import { TEXT } from '../rds-date-picker/rds-date-picker-resources';
import { createPopper, updatePopper, OverlayPositioning } from '../../../utils/popper';
import { StrictModifiers, Instance as Popper } from '@popperjs/core';
import { DateRangeChange } from '../../interfaces';

const DEFAULT_PLACEMENT = 'bottom';

@Component({
  tag: 'rds-input-date-picker',
  styleUrl: 'rds-input-date-picker.scss',
  shadow: true,
})
export class RdsInputDatePicker {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLRdsInputDatePickerElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** Selected date */
  @Prop() value?: string | string[];

  /**
   * If `true`, the date picker will be validated against the constraint validators that are set.
   */
  @Prop() validate?: boolean = false;

  /**
   * Whether or not the date picker is required.
   */
  @Prop() required?: boolean = false;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: number = 2;

  /** Selected date as full date object*/
  @Prop({ mutable: true }) valueAsDate?: Date | Date[];

  /**
   * @deprecated - Use valueByDate instead
   * Selected start date as full date object
   */
  @Prop({ mutable: true }) startAsDate?: Date;

  /**
   * @deprecated - Use valueByDate instead
   * Selected end date as full date object
   */
  @Prop({ mutable: true }) endAsDate?: Date;

  /** Earliest allowed date as full date object */
  @Prop({ mutable: true }) minAsDate?: Date;

  /** Latest allowed date as full date object */
  @Prop({ mutable: true }) maxAsDate?: Date;

  /** Earliest allowed date ("yyyy-mm-dd") */
  @Prop() min?: string;

  /** Latest allowed date ("yyyy-mm-dd") */
  @Prop() max?: string;

  /** Expand or collapse when calendar does not have input */
  @Prop({ mutable: true, reflect: true }) active = false;

  @Watch('active')
  activeHandler(): void {
    this.reposition();
  }

  /** Localized string for "previous month" (used for aria label)
   * @default "Previous month"
   */
  @Prop() intlPrevMonth?: string = TEXT.prevMonth;

  /** Localized string for "next month" (used for aria label)
   * @default "Next month"
   */
  @Prop() intlNextMonth?: string = TEXT.nextMonth;

  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = 'en-GB'; // Currently not looking to user's locale - document.documentElement.lang || 'en';

  /** Range mode activation */
  @Prop({ reflect: true }) range?: boolean = false;

  /** Selected start date */
  @Prop() start?: string;

  /** Selected end date */
  @Prop() end?: string;

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = 'absolute';

  /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
  @Prop() proximitySelectionDisabled?: boolean = false;

  /**
   * Layout
   * @internal
   */
  @Prop({ reflect: true }) layout: 'horizontal' | 'vertical' = 'horizontal';

  /** Place the calendar icon in either leading or trailing position by setting the values as true/false respectively. Default value is true */
  @Prop() iconStart?: boolean = true;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen('rdsDaySelect')
  rdsDaySelectHandler(): void {
    if (this.shouldFocusRangeEnd()) {
      return;
    }

    this.active = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   * Trigger rds date change when a user changes the date.
   */
  @Event() rdsDatePickerChange: EventEmitter<Date>;

  /**
   * Trigger rds date change when a user changes the date range.
   * @see [DateRangeChange](https://dev.azure.com/fmglobal/DCE/_git/rds-core?path=/rds-components/src/components/rds-form-elements/rds-date-picker/interfaces.ts#L100)
   */
  @Event() rdsDatePickerRangeChange: EventEmitter<DateRangeChange>;

  /**
   * @internal
   */
  @Event() rdsInputDatePickerOpen: EventEmitter;

  /**
   * @internal
   */
  @Event() rdsInputDatePickerClose: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async reposition(): Promise<void> {
    const { popper } = this;
    const modifiers = this.getModifiers();

    popper
      ? updatePopper({
          modifiers,
          placement: DEFAULT_PLACEMENT,
          popper,
        })
      : this.createPopper();
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback(): void {
    this.loadLocaleData();

    if (Array.isArray(this.value)) {
      this.valueAsDate = this.value.map(v => dateFromISO(v));
      this.start = this.value[0];
      this.end = this.value[1];
    } else if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
      this.start = '';
      this.end = '';
    }

    if (this.start) {
      this.setStartAsDate(dateFromISO(this.start));
    }

    if (this.end) {
      this.setEndAsDate(dateFromISO(this.end));
    }

    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }

    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }

    this.createPopper();
  }

  disconnectedCallback(): void {
    this.destroyPopper();
  }

  render(): VNode {
    const dir = getElementDir(this.el);

    const date = dateFromRange(this.range ? this.startAsDate : this.valueAsDate, this.minAsDate, this.maxAsDate);
    const endDate = this.range ? dateFromRange(this.endAsDate, this.minAsDate, this.maxAsDate) : null;
    const formattedEndDate = endDate ? endDate.toLocaleDateString(this.locale) : '';
    const formattedDate = date ? date.toLocaleDateString(this.locale) : '';

    return (
      <Host onBlur={this.deactivate} onKeyUp={this.keyUpHandler} validate={this.validate} role="application">
        {this.localeData && (
          <div aria-expanded={this.active.toString()} class="input-container" dir={dir} role="application">
            {
              <div class="input-wrapper" ref={this.setStartWrapper}>
                <rds-input
                  class={`input ${this.layout === 'vertical' && this.range ? `no-bottom-border` : ``}`}
                  type="text"
                  ref={input => (this.nativeInput = input)}
                  onRdsOnFocus={this.startInputFocus}
                  onRdsInputInput={this.inputInput}
                  onRdsInternalInputBlur={this.inputBlur}
                  placeholder={this.localeData?.placeholder}
                  required={this.required}
                  min={this.min}
                  max={this.max}
                  value={formattedDate}
                  onKeyDown={e => {
                    return this.numericOnly(e);
                  }}
                >
                  {this.iconStart === true ? <rds-hero-icon name="calendar" slot="icon-start" /> : <rds-hero-icon name="calendar" slot="icon-end" />}
                </rds-input>
              </div>
            }

            <div aria-hidden={(!this.active).toString()} class="menu-container" ref={this.setMenuEl}>
              <div
                class={{
                  ['calendar-picker-wrapper']: true,
                  ['calendar-picker-wrapper--end']: this.focusedInput === 'end',
                }}
                onTransitionEnd={this.transitionEnd}
              >
                <rds-date-picker
                  activeRange={this.focusedInput}
                  endAsDate={this.endAsDate}
                  intlNextMonth={this.intlNextMonth}
                  intlPrevMonth={this.intlPrevMonth}
                  locale={this.locale}
                  max={this.max}
                  maxAsDate={this.maxAsDate}
                  min={this.min}
                  minAsDate={this.minAsDate}
                  onRdsDatePickerChange={this.handleDateChange}
                  onRdsDatePickerRangeChange={this.handleDateRangeChange}
                  proximitySelectionDisabled={this.proximitySelectionDisabled}
                  range={this.range}
                  startAsDate={this.startAsDate}
                  valueAsDate={this.valueAsDate}
                />
              </div>
            </div>

            {this.range && this.layout === 'horizontal' && <div class="horizontal-arrow-container">to</div>}
            {this.range && this.layout === 'vertical' && <div class="vertical-arrow-container">to</div>}
            {this.range && (
              <div class="input-wrapper" ref={this.setEndWrapper}>
                <rds-input
                  class={{
                    'input': true,
                    'border-t-color-1': this.layout === 'vertical' && this.range,
                  }}
                  onRdsInputInput={this.inputInput}
                  onRdsInternalInputBlur={this.inputBlur}
                  onRdsOnFocus={this.endInputFocus}
                  placeholder={this.localeData?.placeholder}
                  ref={this.setEndInput}
                  type="text"
                  min={this.min}
                  max={this.max}
                  value={formattedEndDate}
                  validate={this.validate}
                  required={this.required}
                  onKeyDown={e => {
                    return this.numericOnly(e);
                  }}
                >
                  {this.iconStart === true ? <rds-hero-icon name="calendar" slot="icon-start" /> : <rds-hero-icon name="calendar" slot="icon-end" />}
                  <span slot="error-text">Enter a valid date{this.min && this.max ? ` between ${this.min} and ${this.max}.` : '.'}</span>
                </rds-input>
              </div>
            )}
          </div>
        )}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @State() focusedInput: 'start' | 'end' = 'start';

  @State() private localeData: DateLocaleData;

  private nativeInput: HTMLRdsInputElement;

  private nativeEndInput: HTMLRdsInputElement;

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private startWrapper: HTMLDivElement;

  private endWrapper: HTMLDivElement;

  private activeTransitionProp = 'opacity';

  @Watch('layout')
  @Watch('focusedInput')
  setReferenceEl(): void {
    const { focusedInput, layout, endWrapper, startWrapper } = this;

    this.referenceEl = focusedInput === 'end' || layout === 'vertical' ? endWrapper || startWrapper : startWrapper || endWrapper;

    this.createPopper();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  numericOnly = (event: KeyboardEvent) => {
    let key = event.key;
    const regex = /^[0-9\.\-\/\b ]+$/;
    if (key !== 'Backspace' && key !== 'Escape' && key !== 'Delete' && key !== 'Enter' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'ArrowDown' && key !== 'ArrowUp') {
      if (!regex.test(key)) {
        event.preventDefault();
      }
    }
  };

  transitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp) {
      this.active ? this.rdsInputDatePickerOpen.emit() : this.rdsInputDatePickerClose.emit();
    }
  };

  setEndInput = (el: HTMLRdsInputElement): void => {
    this.nativeEndInput = el;
  };

  deactivate = (): void => {
    this.active = false;
    if (this.validate) {
      this.nativeInput.validateConstraint();
      if (this.range) {
        this.nativeEndInput.validateConstraint();
      }
    }
  };

  keyUpHandler = (e: KeyboardEvent): void => {
    if (getKey(e.key) === 'Escape') {
      this.active = false;
    } else if (getKey(e.key) === 'Enter') {
      this.active = !this.active;
    }
  };

  inputBlur = (e: CustomEvent<any>): void => {
    this.blur(e.detail);
  };

  startInputFocus = (): void => {
    this.active = true;
    this.focusedInput = 'start';
  };

  endInputFocus = (): void => {
    this.active = true;
    this.focusedInput = 'end';
  };

  inputInput = (e: CustomEvent<any>): void => {
    this.input(e.detail.value);
  };

  setMenuEl = (el: HTMLDivElement): void => {
    if (el) {
      this.menuEl = el;
      this.createPopper();
    }
  };

  setStartWrapper = (el: HTMLDivElement): void => {
    this.startWrapper = el;
    this.setReferenceEl();
  };

  setEndWrapper = (el: HTMLDivElement): void => {
    this.endWrapper = el;
    this.setReferenceEl();
  };

  getModifiers(): Partial<StrictModifiers>[] {
    const flipModifier: Partial<StrictModifiers> = {
      name: 'flip',
      enabled: true,
    };

    flipModifier.options = {
      fallbackPlacements: ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'],
    };

    return [flipModifier];
  }

  createPopper(): void {
    this.destroyPopper();
    const { menuEl, referenceEl, overlayPositioning } = this;

    if (!menuEl || !referenceEl) {
      return;
    }

    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement: DEFAULT_PLACEMENT,
      referenceEl,
    });
  }

  destroyPopper(): void {
    const { popper } = this;

    if (popper) {
      popper.destroy();
    }

    this.popper = null;
  }

  @Watch('value')
  valueHandler(value: string | string[]): void {
    if (Array.isArray(value)) {
      this.valueAsDate = value.map(v => dateFromISO(v));
      this.start = value[0];
      this.end = value[1];
    } else if (value) {
      this.valueAsDate = dateFromISO(value);
      this.start = '';
      this.end = '';
    } else {
      this.valueAsDate = undefined;
      this.start = undefined;
      this.end = undefined;
    }
  }

  @Watch('start')
  startWatcher(start: string): void {
    this.setStartAsDate(dateFromISO(start));
  }

  @Watch('end')
  endWatcher(end: string): void {
    this.setEndAsDate(dateFromISO(end));
  }

  @Watch('locale')
  private async loadLocaleData(): Promise<void> {
    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }

  /**
   * Update date instance of start if valid
   */
  private setStartAsDate(startDate: Date): void {
    this.startAsDate = startDate;
  }

  /**
   * Update date instance of end if valid
   */
  private setEndAsDate(endDate: Date): void {
    this.endAsDate = endDate;
  }

  /**
   * If inputted string is a valid date, update value/active
   *
   * @param value
   */
  private input(value: string): void {
    const date = this.getDateFromInput(value);

    if (!date) {
      this.clearCurrentValue();
      return;
    }

    if (!this.range) {
      this.value = dateToISO(date);
      this.rdsDatePickerChange.emit(date);
      return;
    }

    const { focusedInput } = this;

    if (focusedInput === 'start') {
      if (!this.startAsDate || !sameDate(date, this.startAsDate)) {
        const startDateISO = dateToISO(date);
        this.value = Array.isArray(this.value) ? [startDateISO, this.value[1] || ''] : [startDateISO];
        this.start = startDateISO;
        this.rdsDatePickerRangeChange.emit({
          startDate: date,
          endDate: this.endAsDate,
        });
      }
    } else if (focusedInput === 'end') {
      if (!this.endAsDate || !sameDate(date, this.endAsDate)) {
        const endDateISO = dateToISO(date);
        this.value = Array.isArray(this.value) ? [this.value[0] || '', endDateISO] : ['', endDateISO];
        this.end = endDateISO;
        this.rdsDatePickerRangeChange.emit({
          startDate: this.startAsDate,
          endDate: date,
        });
      }
    }
  }

  /**
   * Clean up invalid date from input on blur
   */
  private blur(target: HTMLRdsInputElement): void {
    const { locale, focusedInput, endAsDate, range, startAsDate, valueAsDate } = this;
    const date = this.getDateFromInput(target.value);
    if (!date) {
      if (!range && valueAsDate) {
        target.value = Array.isArray(valueAsDate) ? valueAsDate[focusedInput === 'end' ? 1 : 0].toLocaleDateString(locale) : valueAsDate.toLocaleDateString(locale);
      } else if (focusedInput === 'start' && startAsDate) {
        target.value = startAsDate.toLocaleDateString(locale);
      } else if (focusedInput === 'end' && endAsDate) {
        target.value = endAsDate.toLocaleDateString(locale);
      }
    }
  }

  /**
   * Event handler for when the selected date changes
   */
  handleDateChange = (event: CustomEvent<Date>): void => {
    if (this.range) {
      return;
    }

    this.valueAsDate = event.detail;
    this.value = dateToISO(event.detail);
  };

  private focusInputEnd = (): void => {
    this.nativeEndInput?.setFocus();
    this.el.removeEventListener('rdsInputDatePickerOpen', this.focusInputEnd);
  };

  private focusInputStart = (): void => {
    this.nativeInput?.setFocus();
    this.el.removeEventListener('rdsInputDatePickerOpen', this.focusInputStart);
  };

  private shouldFocusRangeEnd(): boolean {
    return !!(this.startAsDate && !this.endAsDate && this.focusedInput === 'start' && this.nativeEndInput);
  }

  private shouldFocusRangeStart(): boolean {
    return !!(this.endAsDate && !this.startAsDate && this.focusedInput === 'end' && this.nativeInput);
  }

  private handleDateRangeChange = (event: CustomEvent<DateRangeChange>): void => {
    if (!this.range || !event.detail) {
      return;
    }

    const { startDate, endDate } = event.detail;

    this.start = dateToISO(startDate);
    this.end = dateToISO(endDate);
    this.value = [this.start, this.end];

    if (this.shouldFocusRangeEnd()) {
      this.nativeEndInput?.setFocus();
    } else if (this.shouldFocusRangeStart()) {
      this.nativeInput?.setFocus();
    }
  };
  private clearCurrentValue(): void {
    if (!this.range) {
      if (typeof this.value === 'string' && this.value) {
        this.rdsDatePickerChange.emit();
      }
      this.value = '';
      return;
    }
  }

  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
   */
  private getDateFromInput(value: string | number): Date | false {
    if (typeof value !== 'number' && value !== undefined) {
      if (!this.localeData) {
        return false;
      }
      const { separator } = this.localeData;
      const { day, month, year } = parseDateString(value, this.localeData);
      const validDay = day > 0;
      const validMonth = month > -1;
      const date = new Date(year, month, day);
      date.setFullYear(year);
      const validDate = !isNaN(date.getTime());
      const validLength = value.split(separator).filter(c => c).length > 2;
      const validYear = year.toString().length > 0;
      if (validDay && validMonth && validDate && validLength && validYear && inRange(date, this.min, this.max)) {
        return date;
      }
    }
    return false;
  }
}
