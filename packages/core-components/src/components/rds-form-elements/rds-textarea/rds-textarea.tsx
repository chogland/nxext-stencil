import { Component, Element, Event, EventEmitter, Method, Prop, State, Host, h } from '@stencil/core';
import { InputChangeEventDetail, TextareaResize } from '../../interfaces';
import { getSlotted } from '../../../utils/dom';

/**
 * @slot help-text - Sets and adds optional helper text to your input.
 * @slot error-text - Use this slot to set error text for your input.
 */

@Component({
  tag: 'rds-textarea',
  styleUrl: 'rds-textarea.scss',
  shadow: true,
})
export class RdsTextarea {
  private nativeTextarea?: HTMLTextAreaElement;
  private textareaId = `rds-textarea-${textareaIds++}`;
  hasBlurred: boolean = false;

  @Prop() triggerFocusEvents = true;

  /**
   * @deprecated
   */
  @State() hasFocus = false;

  @Element() el!: HTMLElement;

  /**
   * Sets custom validator and/or contraint validator state.
   */
  @State() isValid: boolean = true;

  /**
   * If `true`, textarea is set to disabled mode.
   */
  @Prop() disabled: boolean = false;

  /**
   * If `true`, textarea will be in error/invalid mode.
   */
  @Prop() error: boolean = false;

  /**
   * @deprecated
   * If `true`, and slot contents are fulfilled, help text will appear below input component
   */
  @Prop() helptext: boolean = false;

  /**
   * Label to be displayed in relation to its `RdsTextarea` component
   */
  @Prop() label: string = '';

  /**
   * Defines minimum number of character allowed.
   */
  @Prop() minlength?: number;

  /**
   * Defines maximum number of character allowed.
   */
  @Prop() maxlength?: number;

  /**
   * The name attribute of the textarea element.
   */
  @Prop() name: string = this.textareaId;

  /**
   * Placeholder text to be displayed inside the `<textarea>` component
   */
  @Prop() placeholder?: string | null;

  /**
   * If `true`, textarea is set to readonly mode.
   */
  @Prop() readonly: boolean = false;

  /**
   * Whether or not the textarea component is required.
   */
  @Prop() required: boolean = false;

  /**
   * Whether resize is to be enabled on the textarea component.
   */
  @Prop({ reflect: true }) resize: TextareaResize = 'off';

  /**
   * The value of the textarea element
   */
  @Prop({ mutable: true }) value?: string | null = '';

  /**
   * If `true`, the textarea will be validated against the constraint validators that are set.
   */
  @Prop() validate?: boolean = false;

  /**
   * @deprecated
   * Specifies the visible number of lines in a text area
   */
  @Prop() rows: number = 5;

  /**
   * @deprecated
   * Specifies the visible number of cols in a text area
   */
  @Prop() cols: number;

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() rdsOnInput!: EventEmitter<KeyboardEvent>;

  /**
   * Emitted when the value has changed.
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
   * Sets focus on the `<textarea>` for `rds-textarea`. Use this method instead of
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeTextarea) {
      this.nativeTextarea.focus();
    }
  }

  /**
   * Sets blur on the `<textarea>` for `rds-textarea`. Use this method instead of
   * `input.blur()`.
   */
  @Method()
  async setBlur() {
    if (this.nativeTextarea) {
      this.nativeTextarea.blur();
    }
  }

  /**
   * Returns the `<textarea>` element.
   */
  @Method()
  getInputElement(): Promise<HTMLTextAreaElement> {
    return Promise.resolve(this.nativeTextarea!);
  }

  @Method()
  async validateConstraint() {
    if (this.validate) {
      if (this.nativeTextarea.checkValidity()) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    }
  }

  /**
   * Called when textarea value is changed.
   */
  private onInput = (e: Event) => {
    const input = e.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.rdsOnInput.emit(e as KeyboardEvent);
  };

  /**
   * Called when textarea value is changed.
   */
  private onChange = (e: Event) => {
    const input = e.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.rdsOnChange.emit(this.value as any);
  };
  /**
   * Called when textarea is blurred.
   */
  private onBlur = (e: FocusEvent) => {
    this.validateConstraint();

    // Sets boolean for validating if the input has blurred and the length > 0
    if (this.value.length > 0) {
      this.hasBlurred = true;
    } else {
      this.hasBlurred = false;
    }

    if (this.triggerFocusEvents) {
      this.rdsOnBlur.emit(e);
    }
  };

  /**
   * Called when textarea value is focused.
   */
  private onFocus = (e: FocusEvent) => {
    if (this.triggerFocusEvents) {
      this.rdsOnFocus.emit(e);
    }
  };

  /**
   * Get the closest `RdsLabel` sibling to the `RdsTextarea` component.
   */
  getItemLabel = (componentEl: HTMLElement): HTMLRdsLabelElement | null => {
    const itemEl = componentEl.closest('rds-textarea');
    if (itemEl) {
      return itemEl.querySelector('rds-label');
    }
    return null;
  };

  componentWillUpdate() {
    // If component has already been blurred & is invalid, validate the component during the update
    if (this.hasBlurred && !this.isValid) {
      this.validateConstraint();
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
  }

  render() {
    const hasHelpText = getSlotted(this.el, 'help-text');
    const hasErrorText = getSlotted(this.el, 'error-text');
    const isDisabled = this.disabled ? { disabled: `${this.disabled}` } : null;
    const labelId = this.textareaId + '-lbl';
    const label = this.getItemLabel(this.el);

    if (label) {
      label.id = labelId;
    }

    return (
      <Host {...isDisabled} role={this.error || !this.isValid ? 'alert' : null}>
        {this.label ? (
          <div class="label-container" id="label">
            <rds-label for={this.textareaId} class="label">
              {this.label ? this.label : null}
            </rds-label>
            <div class="helper-text-container">
              {this.maxlength ? (
                <div>
                  {this?.nativeTextarea?.textLength || 0}/{this.maxlength}
                </div>
              ) : (
                ''
              )}
              <div class="optional">{!this.required ? <div class="optional">Optional</div> : ''}</div>
            </div>
          </div>
        ) : null}
        <div class="textarea-container">
          <textarea
            aria-describedby={this.label ? 'helptext' : null}
            aria-labelledby={this.label ? 'label' : null}
            ref={el => (this.nativeTextarea = el)}
            placeholder={this.placeholder || ''}
            minlength={this.minlength}
            maxlength={this.maxlength}
            name={this.name}
            id={this.textareaId}
            value={this.value}
            disabled={this.disabled ? true : null}
            readOnly={this.readonly ? true : null}
            required={this.required}
            onInput={this.onInput}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onChange={this.onChange}
          />
        </div>
        {this.isValid && hasHelpText ? (
          <div id="help-text">
            <slot name="help-text" />
          </div>
        ) : null}
        {this.error || !this.isValid ? <div id="error-text">{(this.error || !this.isValid) && hasErrorText ? <slot name="error-text" /> : null}</div> : null}
      </Host>
    );
  }
}

// Variable used to set name & relationship of label/textarea
let textareaIds = 0;
