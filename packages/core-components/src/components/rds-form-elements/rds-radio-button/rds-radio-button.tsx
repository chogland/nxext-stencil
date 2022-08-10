import { Component, Element, Event, EventEmitter, Prop, Method, State, Host, Listen, h, Watch } from '@stencil/core';
import { guid } from '../../../utils/utils';
import { getKey } from '../../../utils/keys';
import { getSlotted } from '../../../utils/dom';
import { RadioType } from '../../interfaces';

/**
 * @slot sub-label - Use this slot to add a sub-label component to your radio button.
 * @slot card-content - Use this slot to add additional content below the label of your card radio button.
 */
@Component({
  tag: 'rds-radio-button',
  styleUrl: 'rds-radio-button.scss',
  shadow: true,
})
export class RdsRadioButton {
  private inputEl: HTMLInputElement;
  private cardLabelId = `card-label-${radioIds++}`;

  @Element() el!: HTMLRdsRadioButtonElement;

  /**
   * Sets custom validator and/or constraint validator state.
   */
  @State() isValid: boolean = true;

  /**
   * If `true`, radio is inside a radio-button-group component.
   * @internal
   */
  @Prop() group: boolean = false;

  /**
   * If `true`, radio will be in error/invalid mode.
   */
  @Prop() error: boolean = false;

  /**
   * If `true`, the radio will be validated against the constraint validators that are set.
   */
  @Prop() validate: boolean = false;

  /**
   * Whether or not the radio is required.
   */
  @Prop({ reflect: true }) required: boolean = false;

  /**
   * Set the appearance type of the radio.
   */
  @Prop({ reflect: true }) type: RadioType = 'default';

  /**
   * This property directly maps to the checked attribute on the native input.
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /**
   * This property directly maps to the disabled attribute of the native input.
   */
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;

  /**
   *  An accessible label to be given to the input.
   */
  @Prop() label?: string;

  /**
   * This property maps to the name attribute of the native input to ensure a single value to be selected with the same name.
   */
  @Prop({ reflect: true, mutable: true }) name: string;

  /** The id attribute of the radio button.  When omitted, a globally unique identifier is used. */
  @Prop({ mutable: true }) guid: string;

  /**
   * The value of the radio element
   */
  @Prop() value!: any;

  /**
   * The focused state of the radio button.
   * @private
   */
  @Prop({ mutable: true, reflect: true }) focused = false;

  @Watch('focused')
  focusedChanged(focused: boolean): void {
    if (!this.inputEl) {
      return;
    }
    if (focused && !this.el.hasAttribute('hidden')) {
      this.inputEl.focus();
    } else {
      this.inputEl.blur();
    }
  }

  @Watch('name')
  nameChanged(newName: string): void {
    if (this.name === newName) {
      return;
    }
    if (this.inputEl) {
      this.inputEl.name = newName;
    }
  }

  @Watch('checked')
  checkedChanged(newChecked: boolean): void {
    if (this.inputEl) {
      // Uncheck other radios with the same name
      if (newChecked == true && document) {
        const radios = document.getElementsByName(this.name) as NodeListOf<HTMLRdsRadioButtonElement>;
        for (const radio of radios) {
          if (radio && radio.tagName === 'RDS-RADIO-BUTTON' && radio.guid !== this.guid) {
            radio.checked = !newChecked;
          }
        }
      }
      this.inputEl.checked = newChecked;
      this.rdsRadioButtonChange.emit(newChecked);
    }
  }

  /**
   * Emitted when the radio button has focus.
   */
  @Event({ bubbles: true }) rdsOnFocus!: EventEmitter<void>;

  /**
   * Emitted when the radio button loses focus.
   */
  @Event() rdsOnBlur!: EventEmitter<void>;

  /**
   * Fires only when the radio button is checked.
   */
  @Event({ bubbles: true }) rdsRadioButtonChange: EventEmitter;

  /**
   * Get the value of radio button input
   */
  @Method()
  public async getValue(): Promise<string> {
    return this.value;
  }

  /**
   * Validates the radio button's `input` element.
   */
  @Method()
  async validateConstraint() {
    if (this.inputEl.checkValidity()) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  /**
   * @internal
   */
  @Method()
  async setFocus(e: any) {
    e.stopPropagation();
    e.preventDefault();

    this.el.focus();
  }

  /** @internal */
  @Method()
  async emitCheckedChange(): Promise<void> {
    this.rdsRadioButtonChange.emit();
  }

  /**
   * Called when input is blurred.
   */
  private onBlur = () => {
    this.rdsOnBlur.emit();
    if (this.validate) {
      this.validateConstraint();
    }
  };

  /**
   * Called when input value is focused.
   */
  private onFocus = () => {
    this.rdsOnFocus.emit();
  };

  private setInputEl = (el): void => {
    this.inputEl = el;
  };

  @Listen('click', { capture: true })
  check() {
    if (!this.disabled) {
      this.checked = true;
      this.rdsRadioButtonChange.emit();
    }
  }

  @Listen('keydown') keyDownHandler(e: KeyboardEvent): void {
    if (e.target === this.el) {
      switch (getKey(e.key)) {
        case ' ':
        case 'Enter':
          if (!this.disabled) {
            this.checked = true;
            this.rdsRadioButtonChange.emit();
          }
          break;
      }
    }
  }

  connectedCallback(): void {
    this.guid = this.el.id || `rds-radio-button-${guid()}`;
  }

  componentWillRender() {
    hasSubLabel = getSlotted(this.el, 'sub-label') ? true : false;
    hasCardContent = getSlotted(this.el, 'card-content');
  }

  componentDidLoad() {
    if (this.focused) {
      this.inputEl.focus();
    }
  }

  render() {
    return (
      <Host
        role={!this.group && (this.error || !this.isValid) ? 'alert' : null}
        sub-label={hasSubLabel ? 'true' : null}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        class={this.checked ? 'checked' : null}
        tabindex="0"
      >
        {this.type === 'default' || this.type === 'description-list' ? (
          <div>
            <rds-label for={`${this.guid}`} disabled={this.disabled ? this.disabled : null} class="rds-label label">
              <input
                checked={this.checked}
                disabled={this.disabled}
                id={`${this.guid}`}
                name={this.name}
                ref={this.setInputEl}
                required={this.required}
                type="radio"
                value={this.value}
                tabindex="-1"
              />
              <div>
                {this.label}
                <slot name="sub-label"></slot>
              </div>
            </rds-label>
          </div>
        ) : this.type === 'small-card' || this.type === 'card' ? (
          <rds-label for={`${this.guid}`} disabled={this.disabled ? this.disabled : null} class="label">
            <input
              checked={this.checked}
              disabled={this.disabled}
              id={`${this.guid}`}
              name={this.name}
              ref={this.setInputEl}
              required={this.required}
              type="radio"
              value={this.value}
              tabindex="-1"
              class="sr-only"
              aria-labelledby={this.cardLabelId}
              aria-describedby={this.type === 'card' && hasCardContent ? 'card-content' : null}
            />
            <p id={this.cardLabelId} class="card-label">
              {this.label}
            </p>
            {this.type === 'card' && hasCardContent ? (
              <div id="card-content">
                <slot name="card-content" />
              </div>
            ) : null}
            {this.type === 'card' ? <rds-hero-icon class="card-icon" name="check-circle" color="purple-600" /> : null}
          </rds-label>
        ) : null}
      </Host>
    );
  }
}

let hasSubLabel = null;
let hasCardContent = null;
let radioIds = 0;
