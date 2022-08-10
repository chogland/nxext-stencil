import { Component, Element, Event, Listen, Prop, EventEmitter, Method, Watch, h } from '@stencil/core';
import { StepperType } from '../interfaces';

/**
 * @slot - Used to add stepper items to the stepper.
 */
@Component({
  tag: 'rds-stepper',
  styleUrl: 'rds-stepper.scss',
  shadow: true,
})
export class RdsStepper {
  @Element() el: HTMLRdsStepperElement;

  /** @internal */
  @Prop({ mutable: true }) requestedContent: HTMLElement[] | NodeListOf<any>;

  /**
   * Sets the type of the stepper.
   */
  @Prop({ reflect: true, mutable: true }) type: StepperType = 'simple';

  /**
   * For complex, bullet, and circle steppers. If true, will display stepper vertically and with the stepper item text.
   */
  @Prop() vertical: boolean;

  // Amount of stepper items
  stepperItems: number = 0;

  /** Watches for removal of disabled to register step */
  @Watch('requestedContent')
  contentWatcher() {
    if (!this.stepperContentContainer && this.requestedContent) {
      this.addContentContainer();
    }
    this.updateContent(this.requestedContent);
  }

  /**
   * This event fires when the active stepper item has changed.
   * @internal
   */
  @Event() rdsStepperItemChange: EventEmitter;

  @Listen('rdsStepperItemRegister')
  registerItem(event: CustomEvent) {
    const item = {
      item: event.target as HTMLRdsStepperItemElement,
      position: event.detail.position,
      content: event.detail.content,
    };
    if (item.content && item.item.active) {
      this.requestedContent = item.content;
    }
    if (!this.items.includes(item)) {
      this.items.push(item);
    }
  }

  @Listen('rdsStepperItemSelect')
  updateItem(event: CustomEvent) {
    if (event.detail.content) {
      this.requestedContent = event.detail.content;
    }
    this.currentPosition = event.detail.position;
    this.rdsStepperItemChange.emit({
      position: this.currentPosition,
    });
  }

  /** Sets the next step as active. */
  @Method()
  async nextStep(): Promise<void> {
    this.currentPosition = this.currentPosition + 1 < this.items.length ? this.currentPosition + 1 : this.currentPosition;
    this.emitChangedItem();
  }

  /** Sets the previous step as active. */
  @Method()
  async prevStep(): Promise<void> {
    this.currentPosition = this.currentPosition - 1 >= 0 ? this.currentPosition - 1 : this.currentPosition;
    this.emitChangedItem();
  }

  /** Sets the requested step as active. */
  @Method()
  async goToStep(num: number): Promise<void> {
    this.currentPosition = num - 1;
    this.emitChangedItem();
  }

  /** Sets the first step as active. */
  @Method()
  async startStep(): Promise<void> {
    this.currentPosition = 0;
    this.emitChangedItem();
  }

  /** Sets the last step as active. */
  @Method()
  async endStep(): Promise<void> {
    this.currentPosition = this.items.length - 1;
    this.emitChangedItem();
  }

  /** Creates list of stepper items. */
  private items = [];

  /** Keeps track of the currently active item position. */
  private currentPosition: number = null;

  /** Container where we place horizontal layout step content. */
  private stepperContentContainer: HTMLDivElement;

  private addContentContainer() {
    this.stepperContentContainer = document.createElement('div') as HTMLDivElement;
    this.stepperContentContainer.classList.add('rds-stepper-content');
    this.el.shadowRoot.getElementById('stepper-container').insertAdjacentElement('afterend', this.stepperContentContainer);
  }

  private emitChangedItem() {
    this.rdsStepperItemChange.emit({
      position: this.currentPosition,
    });
  }

  private updateContent(content) {
    this.stepperContentContainer.innerHTML = '';
    this.stepperContentContainer.append(...content);
  }

  componentWillLoad() {
    // If no stepper items are set as active, default to the first one.
    if (!this.currentPosition) {
      this.rdsStepperItemChange.emit({
        position: 0,
      });
    }

    this.el.childNodes.forEach(element => {
      // Passes the `type` and `vertical` props to the children elements.
      element['type'] = this.type;
      element['vertical'] = this.vertical;

      // Get total amount of stepper items
      if (element.nodeName === 'RDS-STEPPER-ITEM') {
        this.stepperItems++;
      }
    });
  }

  componentDidUpdate() {
    // Circle stepper: adds a class to the stepper item if the connector should appear purple/filled in
    if (this.type === 'circle') {
      const stepperItems = this.el.getElementsByTagName('rds-stepper-item');
      for (let i = 0; i < stepperItems.length; i++) {
        stepperItems[i].classList.remove('connector-active');
      }
      for (let i = 0; i < stepperItems.length; i++) {
        if (stepperItems[i].id === 'active') {
          for (let j = 0; j <= i; j++) {
            stepperItems[j].classList.add('connector-active');
          }
        }
      }
    }
  }

  render() {
    return (
      <div id="stepper-container" class={`${this.vertical ? 'vertical' : ''}`}>
        {this.type === 'bullet' && !this.vertical ? (
          <rds-text class="stepper-progress" weight="medium" size="sm" spacing="none">
            Step {this.currentPosition !== null ? this.currentPosition + 1 : 0} of {this.stepperItems}
          </rds-text>
        ) : null}
        <slot />
      </div>
    );
  }
}
