import { Component, Host, Prop, Event, EventEmitter, Element, Listen, Watch, VNode, h } from '@stencil/core';
import { HeadlineLevel, StepperType } from '../interfaces';
import { getSlotted } from '../../utils/dom';

/**
 * @slot description - Use this slot to add a descrition to your stepper item. This slot is valid for **complex** and **vertical circle** steppers.
 * @slot action - Use this slot to add an action to your stepper item. This slot is valid for **vertical circle** steppers only and displays to the right of the component's content.
 */
@Component({
  tag: 'rds-stepper-item',
  styleUrl: 'rds-stepper-item.scss',
  shadow: true,
})
export class RdsStepperItem {
  @Element() el: HTMLRdsStepperItemElement;

  /** Determines if this stepper item is disabled and not engageable by the user. */
  @Prop() disabled = false;

  /** If `true`, the step is active. */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** If `true`, the step been completed. */
  @Prop({ reflect: true, mutable: true }) complete = false;

  /** Sets the stepper item's title text. */
  @Prop() text?: string;

  /**
   * @deprecated
   * Sets a complex stepper item's description text. Note: This will only apply to stepper's with `type='complex'`
   */
  @Prop() description?: string;

  /**
   * For complex, circle, and bullet steppers only. If true, will display stepper vertically and with the stepper item text.
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) vertical?: boolean;

  /**
   * Sets the simple stepper's headline level.
   */
  @Prop() level: HeadlineLevel = 4;

  /**
   * Sets the type of stepper item to display.
   * @internal
   */
  @Prop({ reflect: true }) type: StepperType = 'simple';

  /**
   * Pass the name of the hero icon you'd like displayed. Note: This will only apply to stepper's with the default `type` of _simple_.
   */
  @Prop() icon: string = 'check';

  // Watches for removal of disabled to register step.
  @Watch('disabled') disabledWatcher() {
    this.registerStepperItem();
  }

  /**
   * Event is emitted when a stepper item is selected.
   */
  @Event() rdsStepperItemSelect: EventEmitter;

  /**
   * @internal
   */
  @Event() rdsStepperItemRegister: EventEmitter;

  @Listen('rdsStepperItemChange', { target: 'body' })
  updateActiveItemOnChange(event: CustomEvent) {
    if (event.target === this.parentStepperEl) {
      this.activePosition = event.detail.position;
      this.determineActiveItem();
    }
  }

  componentWillLoad() {
    this.parentStepperEl = this.el.parentElement as HTMLRdsStepperElement;
  }

  componentDidLoad() {
    this.itemPosition = this.getItemPosition();
    this.itemContent = this.getItemContent();
    this.registerStepperItem();
    if (this.active) {
      this.emitRequestedItem();
    }
  }

  componentDidUpdate() {
    if (this.active) {
      this.emitRequestedItem();
    }
  }

  renderSimpleItem() {
    return (
      <Host tabindex={this.disabled ? null : 0} class={{ active: this.active, complete: this.complete }}>
        <div class="stepper-main" onClick={() => this.emitRequestedItem()}>
          <div class="stepper-item-header">
            {this.getItemPosition() == 0 ? null : (
              <div class="stepper-connector-wrapper">
                <span class="stepper-connector"></span>
              </div>
            )}
            <div class="stepper-item-number">{!this.complete ? this.getItemPosition() + 1 : this.renderIcon()}</div>
            <div class="stepper-item-header-text">
              <span class="stepper-item-title">{this.text}</span>
            </div>
          </div>
          <div class="stepper-item-header-mobile-only">
            {this.active ? (
              <rds-headline level={this.level} class="text-inherit" spacing="sm">
                {this.text}
              </rds-headline>
            ) : null}
          </div>
          <div class="stepper-item-counter-mobile-only">
            {this.getItemPosition() + 1} / {this.getTotalItems()}
          </div>
        </div>
        <div class="stepper-item-content">
          <slot />
        </div>
      </Host>
    );
  }

  renderComplexItem() {
    return (
      <Host tabindex={this.disabled ? null : 0} class={{ active: this.active, complete: this.complete, vertical: this.vertical }}>
        <div class="stepper-container" onClick={() => this.emitRequestedItem()}>
          <div class="stepper-item">
            {this.type !== 'bullet' ? (
              <div class="stepper-item-icon">
                <rds-hero-icon type={this.active && !this.complete ? 'outline' : 'solid'} name={this.icon} />
              </div>
            ) : null}
            <div class="stepper-item-header">
              <div class="stepper-item-number">Step {this.getItemPosition() + 1}</div>
              <div class="stepper-item-header-text">{this.text}</div>
            </div>
            <div class="stepper-item-description">
              {this.description}
              <slot name="description"></slot>
            </div>
          </div>
        </div>
        <div class="stepper-item-content">
          <slot />
        </div>
      </Host>
    );
  }

  renderBulletItem() {
    return (
      <Host tabindex={this.disabled ? null : 0} class={{ active: this.active, complete: this.complete, disabled: this.disabled, vertical: this.vertical }}>
        <div class="stepper-container" onClick={() => this.emitRequestedItem()}>
          <div class="stepper-item">
            <div class="stepper-item-header">
              <div class="stepper-item-bullet">
                <rds-hero-icon size="lg" name="check-circle" />
              </div>
              <div class="stepper-item-number sr-only">Step {this.getItemPosition() + 1}</div>
              {this.vertical && this.text ? <div class="stepper-item-header-text">{this.text}</div> : null}
            </div>
          </div>
        </div>
        <div class="stepper-item-content">
          <slot />
        </div>
      </Host>
    );
  }

  renderCircleItem() {
    const hasAction = getSlotted(this.el, 'action');
    const hasDescription = getSlotted(this.el, 'description');

    return (
      <Host
        tabindex={this.disabled ? null : 0}
        id={this.active ? 'active' : null}
        class={{ active: this.active, complete: this.complete, disabled: this.disabled, vertical: this.vertical }}
      >
        <div class="stepper-container" onClick={() => this.emitRequestedItem()}>
          {this.getItemPosition() > 0 ? (
            <div part="circle-step-connector" class={this.complete ? 'complete stepper-item-connector' : 'stepper-item-connector'} aria-hidden="true" />
          ) : null}
          <div class="stepper-item">
            <div class={hasDescription ? 'stepper-item-header has-description' : 'stepper-item-header'}>
              <div class="stepper-item-circle">{this.complete ? <rds-hero-icon name="check" color="white" /> : <div class="stepper-item-small-circle" />}</div>
              <div class="stepper-item-number sr-only">Step {this.getItemPosition() + 1}</div>
              {this.vertical && (this.text || this.description || hasDescription) ? (
                <div class="header-description-container">
                  {this.text ? <div class="stepper-item-header-text">{this.text}</div> : null}
                  {this.description ? <div class="stepper-item-description">{this.description}</div> : null}
                  {hasDescription ? (
                    <div class="stepper-item-description">
                      <slot name="description" />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            {this.vertical && hasAction ? <slot name="action" /> : null}
          </div>
        </div>
        <div class="stepper-item-content">
          <slot />
        </div>
      </Host>
    );
  }

  render() {
    return this.type === 'simple'
      ? this.renderSimpleItem()
      : this.type === 'complex'
      ? this.renderComplexItem()
      : this.type === 'bullet'
      ? this.renderBulletItem()
      : this.renderCircleItem();
  }

  /** The parent stepper component. */
  private parentStepperEl: HTMLRdsStepperElement;

  /** Position within the parent. */
  private itemPosition: number;

  /** The latest requested item position. */
  private activePosition: number;

  /** The slotted item's content. */
  private itemContent: HTMLElement[] | NodeListOf<any>;

  /** Renders the correct icon for each simple stepper item. */
  private renderIcon(): VNode {
    return <rds-hero-icon class="stepper-item-icon" name="check" />;
  }

  /** Determines if a stepper item is active. */
  private determineActiveItem() {
    this.active = !this.disabled && this.itemPosition === this.activePosition;
  }

  /** Registers the stepper item. */
  private registerStepperItem() {
    this.rdsStepperItemRegister.emit({
      position: this.itemPosition,
      content: this.itemContent,
    });
  }

  /** Emit's requested item. */
  private emitRequestedItem() {
    if (!this.disabled) {
      this.rdsStepperItemSelect.emit({
        position: this.itemPosition,
        content: this.itemContent,
      });
    }
  }

  /** Getter for stepper item's content. */
  private getItemContent(): HTMLElement[] | NodeListOf<any> {
    return this.el.shadowRoot?.querySelector('slot')
      ? ((this.el.shadowRoot.querySelector('slot:not(slot[name])') as HTMLSlotElement).assignedNodes({ flatten: true }) as HTMLElement[])
      : this.el.querySelector('.stepper-item-content')
      ? (this.el.querySelector('.stepper-item-content').childNodes as NodeListOf<any>)
      : null;
  }

  /** Getter for stepper item's position. */
  private getItemPosition(): number {
    return Array.prototype.indexOf.call(this.parentStepperEl.querySelectorAll('rds-stepper-item'), this.el);
  }

  /** Getter for length of stepper. */
  private getTotalItems(): number {
    return this.parentStepperEl.querySelectorAll('rds-stepper-item').length;
  }
}
