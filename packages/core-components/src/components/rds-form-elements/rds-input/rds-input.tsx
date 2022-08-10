import { Component, Element, Event, EventEmitter, Watch, Method, Prop, State, Host, h } from '@stencil/core';
import { InputType, InputChangeEventDetail, AutocompleteTypes } from '../../interfaces';
import { Validator, defaultValidator, ValidatorEntry, getValidator } from '../../../utils/validator';
import { getSlotted } from '../../../utils/dom';

/**
 * @slot icon-start - Use this slot to add a leading icon to your input.
 * @slot icon-end - Use this slot to add a trailing icon to your input.
 * @slot select-end - Use this slot to add a trailing select to your input.
 * @slot addon-start - Use this slot to add a leading addon to your input.
 * @slot addon-end - Use this slot to add a trailing addon to your input.
 * @slot help-text - Sets and adds optional helper text to your input. Use plain text only to this slot.
 * @slot error-text - Use this slot to set custom error text for your input.
 */

@Component({
  tag: 'rds-input',
  styleUrl: 'rds-input.scss',
  shadow: true,
})
export class RdsInput {
  private nativeInput?: HTMLInputElement;
  private inputId = `rds-input-${inputIds++}`;
  private hasSelectEnd;
  private hasAddonStart;
  private hasAddonEnd;
  _validator: Validator<string> = defaultValidator;
  hasBlurred: boolean = false;

  /**
   * Sets custom validator and/or contraint validator state.
   */
  @State() isValid: boolean = true;

  @Element() el!: HTMLRdsInputElement;

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: AutocompleteTypes = 'off';

  /**
   * The name attribute of the input element.
   */
  @Prop() name: string = this.inputId;

  /**
   * The type attribute of the input element.
   */
  @Prop() type: InputType = 'text';

  /**
   * Whether or not the input component is required.
   */
  @Prop() required: boolean = false;

  /**
   * The value of the input element.
   */
  @Prop({ mutable: true, reflect: true }) value?: string | number | null = '';

  /**
   * Placeholder text to be displayed inside the `<input>` component
   */
  @Prop() placeholder?: string | null;

  /**
   * If `true`, input is set to disabled mode.
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * If `true`, input is set to readonly mode.
   */
  @Prop({ reflect: true }) readonly: boolean;

  /**
   * If `true`, input will be in error/invalid mode.
   */
  @Prop() error: boolean = false;

  /**
   * @deprecated
   * If `true`, and slot contents are fulfilled, help text will appear below input component
   */
  @Prop() helptext: boolean = false;

  /**
   * @deprecated
   * If `true`, icon will be displayed on start of input component that will be on left side
   */
  @Prop() iconstart: boolean = false;

  /**
   * @deprecated
   * If `true`, icon will be displayed at the end of input component that will be on the right side
   */
  @Prop() iconend: boolean = false;

  /**
   * Label to be displayed in relation to its `RdsInput` component
   */
  @Prop() label: string = '';

  /**
   * If `true`, the input will be validated against the constraint validators that are set.
   */
  @Prop() validate?: boolean = false;

  /**
   * Defines minimum value allowed in number input and text input for min/max date.
   */
  @Prop() min?: string;

  /**
   * Defines maximum value allowed in number input and text input for min/max date..
   */
  @Prop() max?: string;

  /**
   * Specifies the interval between legal numbers in number input and text input for min/max date.
   */
  @Prop() step?: string;

  /**
   * Defines minimum number of character allowed.
   */
  @Prop() minlength?: number;

  /**
   * Defines maximum number of character allowed.
   */
  @Prop() maxlength?: number;

  /**
   * Defines regex pattern that input's value must match.
   */
  @Prop() pattern?: string;

  /**
   * Defines the custom validation of the input.
   * You must pass the array and object(s) as defined in the custom validation docs as a string so it can be parsed properly in all instances.
   * Ex: '[{"name":"length", "options": {"min": 1, "max": 5}}]'
   */
  @Prop() validator?: string;

  /**
   * @internal
   * Defines the custom validation of the input.
   */
  @Prop({ mutable: true }) customValidator?: Array<string | ValidatorEntry | Validator<string>>;

  /**
   * Whether or not the leading addon to your input is inline.
   */
  @Prop() inlineLeading: boolean = true;

  /**
   * Whether or not the leading addon to your input is inline.
   */
  @Prop() inlineTrailing: boolean = true;

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() rdsOnInput!: EventEmitter;

  /**
   * Emitted when the input's value has changed.
   */
  @Event() rdsOnChange!: EventEmitter<InputChangeEventDetail>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() rdsOnBlur!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input has focus.
   */
  @Event() rdsOnFocus!: EventEmitter<FocusEvent>;

  /**
   * @internal
   */
  @Event() rdsInternalInputBlur: EventEmitter;

  /**
   * Fires each time a new value is typed.
   * @internal
   */
  @Event({ cancelable: true }) rdsInputInput: EventEmitter;

  @Watch('validator')
  validatorHandler(newValidator) {
    this.customValidator = JSON.parse(newValidator);
  }

  /**
   * Sets focus on the `<input>` for `RdsInput`. Use this method instead of
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  /**
   * Sets blur on the `<input>` for `RdsInput`. Use this method instead of
   * `input.blur()`.
   */
  @Method()
  async setBlur() {
    if (this.nativeInput) {
      this.nativeInput.blur();
    }
  }

  /**
   * Returns the `<input>` element.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!);
  }

  /**
   * Validates the `<input>` element.
   */
  @Method()
  async validateCustom() {
    this.isValid = this._validator.validate(this.getValue());
  }

  /**
   * Validates the `<input>` element.
   */
  @Method()
  async validateConstraint() {
    if (this.nativeInput.checkValidity()) {
      this.isValid = true;
      return true;
    } else {
      this.isValid = false;
      return false;
    }
  }

  private getValue(): string {
    return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
  }

  /**
   * Called when input value is changed.
   */
  private onInput = e => {
    const input = e.target as HTMLInputElement;
    if (input) {
      this.value = input.value || '';
    }
    this.rdsOnInput.emit(e as Event);
    this.rdsInputInput.emit({
      element: HTMLInputElement,
      value: this.value,
    });
  };

  /**
   * Called when input is blurred.
   */
  private onBlur = (e: FocusEvent) => {
    // Checks validations
    if (this.validate) {
      this.validateConstraint();
    }

    if (this.customValidator) {
      this._validator = getValidator<string>(this.customValidator);
      this.validateCustom();
    }

    // Sets boolean for validating if the input has blurred and the length > 0
    if (this.getValue().length > 0) {
      this.hasBlurred = true;
    } else {
      this.hasBlurred = false;
    }

    this.rdsInternalInputBlur.emit({
      element: HTMLInputElement,
      value: this.value,
    });
    this.rdsOnBlur.emit(e);
  };

  /**
   * Called when input value is focused.
   */
  private onFocus = (e: FocusEvent) => {
    this.rdsOnFocus.emit(e);
  };

  /**
   * Called when input value is changed.
   */
  private onChange = (e: Event) => {
    const input = e.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.rdsOnChange.emit(this.value as any);
  };

  /**
   * Get the closest `RdsLabel` sibling to the `RdsInput` component.
   */
  getItemLabel = (componentEl: HTMLElement): HTMLRdsLabelElement | null => {
    const itemEl = componentEl.closest('rds-input');
    if (itemEl) {
      return itemEl.querySelector('rds-label');
    }
    return null;
  };

  componentWillLoad() {
    if (this.validator) {
      this.validatorHandler(this.validator);
    }
  }

  componentWillUpdate() {
    // If component has already been blurred & is invalid, validate the component during the update
    if (this.hasBlurred && !this.isValid) {
      if (this.validate) {
        if (this.nativeInput.checkValidity()) {
          this.isValid = true;
        } else {
          this.isValid = false;
        }
      }

      if (this.customValidator) {
        this._validator = getValidator<string>(this.customValidator);
        this.validateCustom();
      }
    }
  }

  componentDidLoad() {
    // Passes the disabled and readonly attributes to the label component
    this.el.childNodes.forEach(element => {
      if (element['disabled']) {
        element['disabled'] = this.disabled;
      }
      if (element['readonly']) {
        element['readonly'] = this.readonly;
      }
    });

    // Logic for setting width for addon leading/trailing
    if (this.hasAddonStart && this.hasAddonEnd) {
      if (this.inlineLeading === false && this.inlineTrailing === false) {
        const addonStartWidth = (this.hasAddonStart as HTMLElement).offsetWidth;
        const addonEndWidth = (this.hasAddonEnd as HTMLElement).offsetWidth;
        this.el.shadowRoot.getElementById(this.inputId).style.paddingLeft = (addonStartWidth + 36).toString() + 'px';
        this.el.shadowRoot.getElementById(this.inputId).style.paddingRight = (addonEndWidth + 38).toString() + 'px';
      }
    }

    // Logic for setting width for addon leading
    if (this.hasAddonStart) {
      const addonStartWidth = (this.hasAddonStart as HTMLElement).offsetWidth;
      if (this.inlineLeading === true) {
        this.el.shadowRoot.getElementById(this.inputId).style.paddingLeft = (addonStartWidth + 16).toString() + 'px';
      } else {
        if (this.inlineTrailing === true) {
          this.el.shadowRoot.getElementById(this.inputId).style.paddingLeft = (addonStartWidth + 36).toString() + 'px';
        }
      }
    }

    // Logic for setting width for addon trailing
    if (this.hasAddonEnd) {
      const addonEndWidth = (this.hasAddonEnd as HTMLElement).offsetWidth;
      if (this.inlineTrailing === true) {
        this.el.shadowRoot.getElementById(this.inputId).style.paddingRight = (addonEndWidth + 16).toString() + 'px';
      } else if (this.inlineTrailing === false && this.inlineLeading === true) {
        this.el.shadowRoot.getElementById(this.inputId).style.paddingRight = (addonEndWidth + 38).toString() + 'px';
      }
    }
  }

  componentDidRender() {
    this.hasSelectEnd = getSlotted(this.el, 'select-end');
    this.hasAddonStart = getSlotted(this.el, 'addon-start');
    this.hasAddonEnd = getSlotted(this.el, 'addon-end');
    // Adds class to the slotted select's host element for styling purposes
    // Adjusts padding right of the input based on the select's width
    if (this.hasSelectEnd) {
      this.hasSelectEnd.classList.add('select-end');
      const width = (this.hasSelectEnd as HTMLElement).offsetWidth;
      this.el.shadowRoot.getElementById(this.inputId).style.paddingRight = (width + 8).toString() + 'px';
    }
  }

  render() {
    const hasHelpText = getSlotted(this.el, 'help-text');
    const hasErrorText = getSlotted(this.el, 'error-text');
    const hasIconStart = getSlotted(this.el, 'icon-start');
    const hasIconEnd = getSlotted(this.el, 'icon-end');
    this.hasAddonStart = getSlotted(this.el, 'addon-start');
    this.hasAddonEnd = getSlotted(this.el, 'addon-end');
    this.hasSelectEnd = getSlotted(this.el, 'select-end');
    const value = this.getValue();
    const labelId = this.inputId + '-lbl';
    const label = this.getItemLabel(this.el);

    if (label) {
      label.id = labelId;
    }

    return (
      <Host
        // Alert role
        role={this.error || !this.isValid ? 'alert' : null}
        // Disabled aria - wraps around entire component
        aria-disabled={this.disabled ? 'true' : null}
      >
        {this.label ? (
          // Label & optional indicator
          <div class="label-container" id="label">
            <rds-label for={this.inputId} class="label">
              {this.label}
            </rds-label>
            {!this.required ? <div class="optional">Optional</div> : null}
          </div>
        ) : null}
        <div class="input-container">
          {hasIconStart ? (
            // Slotted start icon
            <span class="icon-start">
              <slot name="icon-start" />
            </span>
          ) : null}
          {this.hasAddonStart ? (
            <span class="addon-start" id="addon">
              <slot name="addon-start" />
            </span>
          ) : null}
          {hasIconEnd ? (
            // Slotted end icon
            <span class="icon-end">
              <slot name="icon-end" />
            </span>
          ) : null}
          {this.hasAddonEnd ? (
            <span class="addon-end">
              <slot name="addon-end" />
            </span>
          ) : null}
          <input
            ref={input => (this.nativeInput = input)}
            aria-labelledby={this.label ? 'label' : null}
            aria-describedby={hasHelpText ? 'help-text' : null}
            autoComplete={this.autocomplete}
            type={this.type}
            placeholder={this.placeholder || ''}
            min={this.min}
            max={this.max}
            step={this.step}
            minlength={this.minlength}
            maxlength={this.maxlength}
            pattern={this.pattern}
            name={this.name}
            id={this.inputId}
            value={value}
            disabled={this.disabled ? true : null}
            readonly={this.readonly ? 'readonly' : false}
            required={this.required}
            onBlur={this.onBlur}
            onInput={this.onInput}
            onFocus={this.onFocus}
            onChange={this.onChange}
          />
          {this.hasSelectEnd ? (
            // Slotted select component
            <div class="select-end">
              <slot name="select-end"></slot>
            </div>
          ) : null}
          {this.error || !this.isValid ? (
            // Error icon indicator
            <div class="error-icon-container">
              <rds-hero-icon name="exclamation-circle" />
            </div>
          ) : null}
        </div>
        {this.isValid && hasHelpText ? (
          // Slotted help text
          <div id="help-text">
            <slot name="help-text" />
          </div>
        ) : null}
        {this.error || !this.isValid ? (
          // Slotted or failed validation's error text
          <div id="error-text">
            {(this.error || !this.isValid) && hasErrorText ? <slot name="error-text" /> : null}
            {!this.isValid && this._validator.errorMessage ? <span class="validation-error-text">{this._validator.errorMessage}</span> : null}
          </div>
        ) : null}
      </Host>
    );
  }
}

// Variable used to set name & relationship of label/input
let inputIds = 0;
