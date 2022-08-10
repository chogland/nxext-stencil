import { Component, ComponentInterface, Host, Prop, Listen, State, h } from '@stencil/core';

import { panelController } from '../../utils/panel-controller/panel-controller';
import { getKey } from '../../utils/keys';
import { updateVisibility } from './panel-toggle-util';

/**
 * @slot - Used to add a button / other element to be engaged as a panel's toggle.
 */
@Component({
  tag: 'rds-panel-toggle',
  styleUrl: 'rds-panel-toggle.scss',
  shadow: true,
})
export class RdsPanelToggle implements ComponentInterface {
  @State() visible: boolean = false;

  /**
   * Optional property that maps to a Panel's `panelId` prop.
   * Can also be `start` or `end` for the panel side.
   * This is used to find the correct panel to toggle.
   *
   * If this property is not used, `rds-panel-toggle` will toggle the
   * first panel that is active.
   */
  @Prop() panel?: string;

  /**
   * Automatically hides the content when the corresponding panel is not active.
   *
   * By default, it's `true`. Change it to `false` in order to
   * keep `rds-panel-toggle` always visible regardless the state of the panel.
   */
  @Prop() autoHide: boolean = true;

  connectedCallback() {
    this.visibilityChanged();
  }

  @Listen('rdsPanelChange', { target: 'body' })
  async visibilityChanged() {
    this.visible = await updateVisibility(this.panel);
  }

  @Listen('keyup', { target: 'body' })
  handleEscape(e: KeyboardEvent): void {
    if (getKey(e.key) === 'Escape') {
      panelController.enable(false, this.panel);
    }
  }

  private onClick = () => {
    return panelController.toggle(this.panel);
  };

  render() {
    const hidden = this.autoHide && !this.visible;

    return (
      <Host
        onClick={this.onClick}
        aria-hidden={hidden ? 'true' : null}
        class={{
          'panel-toggle-hidden': hidden,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}
