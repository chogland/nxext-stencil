import { Component, Host, Prop, Element, Event, EventEmitter, Method, Watch, State, h } from '@stencil/core';
import { SearchChangeEventDetail, AutocompleteTypes } from '../interfaces';
import { debounceEvent } from '../../utils/helpers';
import { getKey } from '../../utils/keys';

@Component({
  tag: 'rds-search',
  styleUrl: 'rds-search.scss',
  shadow: true,
})
export class RdsSearch {
  @Element() el!: HTMLRdsSearchElement;

  @State() focused: boolean = false;

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: AutocompleteTypes = 'off';

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() disabled: boolean = false;

  /**
   * Sets the input's placeholder text.
   */
  @Prop() placeholder: string = 'Search';

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `rdsChange` event after each keystroke.
   */
  @Prop() debounce: number = 250;

  /**
   * The value of the search input.
   */
  @Prop({ mutable: true }) value?: string | null = '';

  @Watch('debounce')
  protected debounceChanged() {
    this.rdsChange = debounceEvent(this.rdsChange, this.debounce);
  }

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() rdsInput!: EventEmitter<KeyboardEvent>;

  /**
   * Emitted when the value has changed.
   */
  @Event() rdsChange!: EventEmitter<SearchChangeEventDetail>;

  /**
   * Emitted when the cancel button is clicked.
   */
  @Event() rdsCancel!: EventEmitter<void>;

  /**
   * Emitted when the clear input button is clicked.
   */
  @Event() rdsClear!: EventEmitter<void>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() rdsBlur!: EventEmitter<void>;

  /**
   * Emitted when the input has focus.
   */
  @Event() rdsFocus!: EventEmitter<void>;

  @Watch('value')
  protected valueChanged() {
    const inputEl = this.nativeInput;
    const value = this.getValue();
    if (inputEl && inputEl.value !== value) {
      inputEl.value = value;
    }
    this.rdsChange.emit({ value });
  }

  /**
   * Sets focus on the specified `rds-search`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  componentDidLoad() {
    this.debounceChanged();
  }

  render() {
    return (
      <Host
        role="search"
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'search-disabled': this.disabled,
          'search-has-value': this.hasValue(),
        }}
      >
        <div class="search-input-container">
          <rds-hero-icon name="search" class="search-icon"></rds-hero-icon>
          <input
            aria-label="Search"
            disabled={this.disabled}
            ref={el => (this.nativeInput = el)}
            class="search-input"
            onInput={this.onInput}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            placeholder={this.placeholder}
            type="search"
            value={this.getValue()}
            autoComplete={this.autocomplete}
          />
          <button
            aria-label="reset"
            type="button"
            no-blur
            class="search-clear-button"
            onClick={ev => this.onClearInput(ev, true)}
            onKeyDown={ev => this.handleKeyDownClearInput(ev)}
          >
            <rds-hero-icon name="x" class="clear-icon"></rds-hero-icon>
          </button>
        </div>
      </Host>
    );
  }

  private nativeInput?: HTMLInputElement;

  /**
   * Handles whether onClearInput should be called on a keyDown event
   */
  private handleKeyDownClearInput = (ev?: KeyboardEvent) => {
    if (getKey(ev.key) === 'Enter') {
      this.onClearInput(ev, true);
    }
  };

  /**
   * Clears the input field and triggers the control change.
   */
  private onClearInput = (ev?: Event, shouldFocus?: boolean) => {
    this.rdsClear.emit();

    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }

    // wait for 4 frames
    setTimeout(() => {
      const value = this.getValue();
      if (value !== '') {
        this.value = '';
        this.rdsInput.emit();

        /**
         * When tapping clear button
         * ensure input is focused after
         * clearing input so users
         * can quickly start typing.
         */
        if (shouldFocus && !this.focused) {
          this.setFocus();
        }
      }
    }, 16 * 4);
  };

  private getValue() {
    return this.value || '';
  }

  private hasValue(): boolean {
    return this.getValue() !== '';
  }

  /**
   * Update the Search input value when the input changes
   */
  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value;
    }
    this.rdsInput.emit(ev as KeyboardEvent);
  };

  /**
   * Sets the Search input to not focused
   */
  private onBlur = () => {
    this.focused = false;
    this.rdsBlur.emit();
  };

  /**
   * Sets the Search input to focused and active on input focus.
   */
  private onFocus = () => {
    this.focused = true;
    this.rdsFocus.emit();
  };
}
