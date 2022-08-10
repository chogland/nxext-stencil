import { Component, Element, Host, Prop, h } from '@stencil/core';
import { getSlotted } from '../../utils/dom';

/**
 * @slot title - Used to add a title to the card header.
 * @slot description - Used to add a description underneath the title in the card header.
 * @slot icon - Used to add a hero icon to the left side of the card header.
 * @slot actions - Used to add an action (link, button, clickable hero icon) to the top right side of the card header.
 * @slot content - Used to add content to the card header.
 * @slot auxiliary-text - Used to add text to the top right side of the card header.
 */
@Component({
  tag: 'rds-card-header',
  styleUrl: 'rds-card-header.scss',
  shadow: true,
})
export class RdsCardHeader {
  @Element() el: HTMLRdsCardHeaderElement;
  /**
   * If `true`, a 1rem (16px) padding will appear on left and right.
   */
  @Prop() padded: boolean = true;
  /**
   * If `true`, a bottom border will appear.
   */
  @Prop() rule: boolean = false;

  render() {
    const hasIcon = getSlotted(this.el, 'icon');
    const hasActions = getSlotted(this.el, 'actions');
    const hasTitle = getSlotted(this.el, 'title');
    const hasContent = getSlotted(this.el, 'content');
    const { padded, rule } = this;

    return (
      <Host
        class={{
          rule: rule,
          padded: padded,
        }}
      >
        <div class="header-wrapper">
          {hasIcon ? (
            <div class="icon">
              <slot name="icon" />
            </div>
          ) : null}
          <div class="title-desc-wrapper">
            {hasTitle ? (
              <slot name="title" />
            ) : (
              <div class="titleDep">
                <slot></slot>
              </div>
            )}
            <slot name="description" />
            {hasContent ? (
              <div class="content">
                <slot name="content"></slot>
              </div>
            ) : null}
          </div>
          {hasActions ? (
            <div class="actions">
              <slot name="actions"></slot>
            </div>
          ) : null}
          <slot name="auxiliary-text" />
        </div>
      </Host>
    );
  }
}
