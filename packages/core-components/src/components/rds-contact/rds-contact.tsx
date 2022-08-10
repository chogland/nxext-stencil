import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @slot action - This slot can be used to place one or more actions like a 'RdsButton'.
 */
@Component({
  tag: 'rds-contact',
  styleUrl: 'rds-contact.scss',
  shadow: true,
})
export class RdsContact {
  /**
   * This will set the url for the image in Avatar, if needed.
   */
  @Prop() avatarUrl?: string;

  /**
   * Initials shown when no image url provided.
   */
  @Prop({ reflect: true }) avatarText: string;

  /**
   * Name to be displayed.
   */
  @Prop() name?: string;

  /**
   * Role or other details to be shown below the name.
   */
  @Prop() role?: string;

  /**
   * A third line of detail for additional information about the contact person.
   */
  @Prop() detail?: string;

  render() {
    return (
      <Host>
        <rds-avatar text={this.avatarText} src={this.avatarUrl} size="md"></rds-avatar>
        <div class="contact-wrapper">
          <div class="name">{this.name}</div>
          <div class="role">{this.role}</div>
          <div class="detail">{this.detail}</div>
        </div>
        <div class="actions">
          <slot name="action" />
        </div>
      </Host>
    );
  }
}
