import { Component, Element, Host, h, Listen, State, Prop } from '@stencil/core';
import { getSlotted } from '../../utils/dom';

/**
 @slot icon - Place an `RdsHeroIcon` of size="xl" here to indicate what type of file it is.
 @slot hover-action - Optionally place a component here to show that action on hover. Recommended to use RdsButton here.
 @slot name - Place an `RdsText` here for the file name. Ensure the type is set to "inline" to get expected results.
 @slot subtitle - Additional details can be added to this slot. We recommend another `RdsText`.
 @slot detail - To provide additional detail like time, user, or even a component for action.
*/

@Component({
  tag: 'rds-file-list',
  styleUrl: 'rds-file-list.scss',
  shadow: true,
})
export class RdsFileList {
  @Element() el!: HTMLRdsFileListElement;

  @State() hovering: boolean;

  /**
   * @internal
   * This state controls whether or not a hover icon should show on hover.
   * If a hover icon isn't provided in the hover-icon slot, this remains false.
   */
  @State() hoverIcon: boolean = false;

  /**
   * The clickable property controls whether or not hover events occur on filelist.
   * If true, the file list's hover state is shown.
   */
  @Prop() clickable: boolean = false;

  /**
   * On mouseover, show hover-icon slot.
   */
  @Listen('mouseover')
  showHoverIcon() {
    const hasIconSlot = getSlotted(this.el, 'hover-action');

    if (this.clickable) {
      this.hovering = true;
      if (hasIconSlot) {
        this.hoverIcon = true;
      }
    }
  }

  /**
   * On mouseout, show icon slot.
   */
  @Listen('mouseout')
  showDefaultIcon() {
    this.hovering = false;
  }

  render() {
    return (
      <Host class={{ hover: this.clickable && this.hovering }}>
        <div class="icon">
          <div class="icon-main">
            <slot name="icon"></slot>
          </div>
        </div>
        <div class="file-name">
          <slot name="name"></slot>
          <slot name="subtitle"></slot>
        </div>
        <div class={{ detail: true, hide: this.hovering && this.clickable && this.hoverIcon }}>
          <slot name="detail"></slot>
        </div>
        <div class={{ 'hover-action': true, 'hide': !this.hovering }}>
          <slot name="hover-action"></slot>
        </div>
      </Host>
    );
  }
}
