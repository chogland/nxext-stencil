import { Component, Host, Prop, Listen, Method, State, h, Element } from '@stencil/core';
import { RadioType, RadioGroupDirection } from '../../interfaces';
import { getSlotted } from '../../../utils/dom';

/**
 * @slot - Used to add radio buttons to the radio button group.
 * @slot group-sub-label - Use this slot to add a group-sub-label component to your radio button group.
 */
@Component({
  tag: 'rds-radio-button-group',
  styleUrl: 'rds-radio-button-group.scss',
  shadow: true,
})
export class RdsRadioButtonGroup {
  @Element() el!: HTMLRdsRadioButtonGroupElement;

  /**
   * Sets constraint validator state.
   */
  @State() isValid: boolean = true;

  /**
   * If `true`, the radio button group will be validated against the constraint validators that are set.
   */
  @Prop() validate?: boolean = false;

  /**
   * Sets the label for the entire radio button group
   */
  @Prop() label: string;

  /**
   * Sets the name property of all slotted radio buttons
   */
  @Prop() name: string;

  /**
   * Sets the type property of all slotted radio buttons
   */
  @Prop({ reflect: true }) type: RadioType = 'description-list';

  /**
   * Sets the required property of all slotted checkboxes
   */
  @Prop() required: boolean = false;

  /**
   * Sets the disabled property of all slotted radio buttons
   */
  @Prop() disabled: boolean = false;

  /**
   * Sets the direction of the individual radio buttons
   */
  @Prop() direction: RadioGroupDirection = 'vertical';

  // Validates the component
  @Listen('rdsOnChange')
  rdsOnChangeHandler() {
    this.validateConstraint();
  }

  @Method()
  async validateConstraint(): Promise<boolean> {
    if (this.validate) {
      let children = this.el.children;
      let isChecked: boolean[] = [];
      let validity: boolean = false;
      for (let i = 0; i < children.length; i++) {
        isChecked[i] = (children[i] as HTMLRdsRadioButtonElement).checked;
      }

      for (let j = 0; j < isChecked.length; j++) {
        if (isChecked[j]) {
          validity = true;
        }
      }
      if (validity) {
        this.isValid = true;
        return true;
      } else {
        this.isValid = false;
        return false;
      }
    }
  }

  componentWillLoad() {
    // Adding attribute to assist with associating radio buttons within the group
    this.el.childNodes.forEach(element => {
      if (this.name) {
        element['name'] = this.name;
      }
      if (this.type) {
        element['type'] = this.type;
      }
      if (this.disabled) {
        element['disabled'] = this.disabled;
      }
      if (this.required) {
        element['required'] = this.required;
      }
      if (this.validate) {
        element['validate'] = this.validate;
      }
      element['group'] = true;
    });
  }

  componentWillRender() {
    hasGroupSubLabel = getSlotted(this.el, 'group-sub-label') ? true : false;
  }

  render() {
    return (
      <Host aria-label={this.label} role={!this.isValid ? 'alert' : null}>
        <rds-flex align-items="flex-start" justify-content="space-between">
          {this.label ? (
            <rds-label>
              {this.label}
              {hasGroupSubLabel ? <slot name="group-sub-label"></slot> : null}
            </rds-label>
          ) : null}
          {!this.isValid ? (
            // Error icon indicator
            <div class="error-icon-container">
              <rds-hero-icon color="red-500" name="exclamation-circle" />
            </div>
          ) : null}
        </rds-flex>{' '}
        <div class={this.direction}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}

let hasGroupSubLabel = null;
