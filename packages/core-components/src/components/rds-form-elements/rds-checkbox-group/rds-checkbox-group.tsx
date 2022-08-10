import { Component, Host, Element, Event, EventEmitter, Method, State, Listen, Prop, h } from '@stencil/core';
import { CheckboxType, CheckboxGroupDirection, CheckboxChangeEventDetail } from '../../interfaces';
import { getSlotted } from '../../../utils/dom';

/**
 * @slot - Used to add checkboxes into the checkbox group.
 * @slot group-sub-label - Use this slot to add a group-sub-label component to your checkbox group.
 */
@Component({
  tag: 'rds-checkbox-group',
  styleUrl: 'rds-checkbox-group.scss',
  shadow: true,
})
export class RdsCheckboxGroup {
  @Element() el!: HTMLRdsCheckboxGroupElement;

  /**
   * Sets constraint validator state.
   */
  @State() isValid: boolean = true;

  /**
   * If `true`, the checkbox group will be validated against the constraint validators that are set.
   */
  @Prop() validate?: boolean = false;

  /**
   * Sets the label for the entire checkbox group
   */
  @Prop() label: string;

  /**
   * Sets the name property of all slotted checkboxes.
   */
  @Prop() name: string;

  /**
   * Sets the type property of all slotted checkboxes.
   */
  @Prop({ reflect: true }) type: CheckboxType = 'description-list';

  /**
   * Sets the disabled property of all slotted checkboxes.
   */
  @Prop() disabled: boolean = false;

  /**
   * Sets the required property of all slotted checkboxes
   */
  @Prop() required: boolean = false;

  /**
   * Sets the direction of the individual checkboxes
   */
  @Prop() direction: CheckboxGroupDirection = 'vertical';

  @Method()
  async validateConstraint() {
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

  @Listen('rdsOnChange')
  rdsOnChangeHandler(event: CustomEvent<CheckboxChangeEventDetail>): void {
    this.validateConstraint();
    this.rdsGroupOnChange.emit(event.detail);
  }

  /**
   * Emits when a checkbox within the group is selected/unselected.
   */
  @Event() rdsGroupOnChange!: EventEmitter<CheckboxChangeEventDetail>;

  componentWillLoad() {
    // Adding attribute to assist with associating checkboxes within the group.
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
        </rds-flex>
        <div class={this.direction}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}

let hasGroupSubLabel = null;
