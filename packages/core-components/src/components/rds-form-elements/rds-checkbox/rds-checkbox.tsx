import { Component, Element, Event, EventEmitter, State, Method, Prop, Watch, Host, h, Listen } from '@stencil/core';
import { CheckboxChangeEventDetail, CheckboxType } from '../../interfaces';
import { getKey } from '../../../utils/keys';
import { getSlotted } from '../../../utils/dom';

/**
 * @slot sub-label - Use this slot to add a sub-label component to your checkbox.
 * @slot card-content - Use this slot to add additional content below the label of your card checkbox.
 */
@Component({
  tag: 'rds-checkbox',
  styleUrl: 'rds-checkbox.scss',
  shadow: true,
})
export class RdsCheckbox {
  private inputId = `rds-checkBox-${checkboxIds++}`;
  private cardLabelId = `card-label-${checkboxIds++}`;
  private focusEl?: HTMLInputElement;

  @Element() el!: HTMLElement;

  /**
   * Sets custom validator and/or contraint validator state.
   */
  @State() isValid: boolean = true;

  /**
   * If `true`, checkbox is inside a checkbox-group component.
   * @internal
   */
  @Prop() group: boolean = false;

  /**
   * If `true`, checkbox will be in error/invalid mode.
   */
  @Prop() error: boolean = false;

  /**
   * If `true`, the checkbox will be validated against the constraint validators that are set.
   */
  @Prop() validate: boolean = false;

  /**
   * Whether or not the checkbox is required.
   */
  @Prop() required: boolean = false;

  /**
   * Set the default checked value to false.
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * Set the appearance type of checkbox.
   */
  @Prop({ reflect: true }) type: CheckboxType = 'default';

  /**
   * Set the disabled state to false.
   */
  @Prop() disabled: boolean = false;

  /**
   * Set the label string value.
   */
  @Prop() label: string;

  /**
   * The id of the element.
   */
  @Prop() name: string = this.inputId;

  /**
   * The value of the checkbox input.
   */
  @Prop() value?: any;

  /**
   * Emitted when the checked property has changed.
   */
  @Event({ bubbles: true }) rdsOnChange!: EventEmitter<CheckboxChangeEventDetail>;

  /**
   * Emitted when the checkbox has focus.
   */
  @Event() rdsOnFocus!: EventEmitter<void>;

  /**
   * Emitted when the checkbox loses focus.
   */
  @Event() rdsOnBlur!: EventEmitter<void>;

  @Watch('checked')
  checkedChanged(isRdsChecked: boolean) {
    this.rdsOnChange.emit({
      checked: isRdsChecked,
    });
  }

  @Listen('keydown') keyDownHandler(e: KeyboardEvent): void {
    if (e.target === this.el) {
      switch (getKey(e.key)) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          this.checked = !this.checked;
          break;
      }
    }
  }

  /**
   * Validates the checkbox's `input` element.
   */
  @Method()
  async validateConstraint() {
    if (this.focusEl.checkValidity()) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  private setFocus() {
    if (this.focusEl) {
      this.focusEl.focus();
    }
  }

  private onClick = (e: any) => {
    e.preventDefault();
    this.setFocus();
    this.checked = !this.checked;
  };

  private onFocus = () => {
    this.rdsOnFocus.emit();
  };

  private onBlur = () => {
    this.rdsOnBlur.emit();
    if (this.validate) {
      this.validateConstraint();
    }
  };

  componentWillRender() {
    hasSubLabel = getSlotted(this.el, 'sub-label');
    hasCardContent = getSlotted(this.el, 'card-content');
  }

  render() {
    return (
      <Host
        role={!this.group && (this.error || !this.isValid) ? 'alert' : 'checkbox'}
        onClick={this.onClick}
        aria-checked={!this.disabled && this.checked ? 'true' : 'false'}
        aria-hidden={this.disabled ? 'false' : null}
        aria-disabled={this.disabled ? 'true' : null}
        class={this.disabled ? 'disabled' : null}
        sub-label={hasSubLabel ? 'true' : null}
      >
        {this.type === 'default' || this.type === 'description-list' ? (
          <div>
            <rds-label class="rds-label" for={this.inputId}>
              <input
                type="checkbox"
                ref={focusEl => (this.focusEl = focusEl)}
                disabled={this.disabled}
                checked={this.checked}
                required={this.required}
                name={this.name}
                id={this.inputId}
                onFocus={() => this.onFocus()}
                onBlur={() => this.onBlur()}
                value={this.value}
              />
              <div>
                {this.label}
                <slot name="sub-label"></slot>
              </div>
            </rds-label>
          </div>
        ) : this.type === 'small-card' || this.type === 'card' ? (
          <rds-label class="rds-label" for={this.inputId}>
            <input
              type="checkbox"
              ref={focusEl => (this.focusEl = focusEl)}
              disabled={this.disabled}
              checked={this.checked}
              required={this.required}
              name={this.name}
              id={this.inputId}
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
              value={this.value}
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

let checkboxIds = 0;
let hasSubLabel = null;
let hasCardContent = null;
