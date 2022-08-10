import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, Watch } from '@stencil/core';
import { guid } from '../../utils/utils';
import { getKey } from '../../utils/keys';

@Component({
  tag: 'rds-toggle',
  styleUrl: 'rds-toggle.scss',
  shadow: true,
})
export class RdsToggle {
  @Element() el: HTMLRdsToggleElement;

  @State() guid: string;

  @State() tabindex: number;

  /**
   * Label to be displayed next to RdsToggle
   */
  @Prop() label: string = null;

  /** When true, the user cannot engage with the toggle */
  @Prop({ reflect: true }) disabled?: boolean = false;

  @Watch('disabled')
  disabledHandler(newDisabled: boolean): void {
    this.inputEl.disabled = newDisabled;
    this.tabindex = newDisabled ? -1 : 0;
  }

  /** The name of the input for the toggle */
  @Prop({ reflect: true }) name?: string;

  @Watch('name')
  nameChanged(newName: string): void {
    this.inputEl.name = newName;
  }

  /** When true, the toggle will display as switched. */
  @Prop({ reflect: true, mutable: true }) switched = false;

  @Watch('switched')
  switchedWatcher(newSwitched: boolean): void {
    this.inputEl.checked = newSwitched;
  }

  /** The value of the input for the toggle */
  @Prop({ reflect: true }) value?: any;

  private inputEl: HTMLInputElement = document.createElement('input');

  @Listen('click')
  onClick(e: MouseEvent): void {
    if (!this.disabled && e.target === this.el) {
      this.toggle();
    }
  }

  @Listen('keydown')
  keyDownHandler(e: KeyboardEvent): void {
    const key = getKey(e.key);
    if (!this.disabled && (key === ' ' || key === 'Enter')) {
      e.preventDefault();
      this.toggle();
    }
  }

  /**
   * Fires when the switched value has changed.
   */
  @Event() rdsSwitchChange: EventEmitter;

  componentWillLoad(): void {
    this.guid = this.el.id || `rds-toggle-${guid()}`;
    this.tabindex = this.el.getAttribute('tabindex') || this.disabled ? -1 : 0;
    this.setupInput();
  }

  private setupInput(): void {
    this.switched && this.inputEl.setAttribute('checked', '');
    this.inputEl.disabled = this.disabled;
    this.inputEl.id = `${this.guid}-input`;
    this.inputEl.name = this.name;
    this.inputEl.type = 'checkbox';
    if (this.value) {
      this.inputEl.value = this.value != null ? this.value.toString() : '';
    }
    this.disabledHandler(this.disabled);
    this.el.appendChild(this.inputEl);
  }

  private toggle(): void {
    this.switched = !this.switched;
    this.rdsSwitchChange.emit({
      switched: this.switched,
    });
  }

  render() {
    return (
      <Host
        role="switch"
        tabindex={this.tabindex}
        aria-checked={this.switched.toString()}
        class={{
          switched: this.switched,
          disabled: this.disabled,
        }}
      >
        <div class="toggle-wrapper">
          <div class="toggle-switch">
            <div class="toggle-icon">{this.switched ? <rds-hero-icon type="solid" name="check" /> : <rds-hero-icon type="solid" name="x" />}</div>
          </div>
        </div>
        {this.label ? (
          <div class="label-container">
            <rds-label for={`${this.guid}-input`} class="label">
              {this.label}
            </rds-label>
          </div>
        ) : null}
      </Host>
    );
  }
}
