import { Component, Host, h } from '@stencil/core';

/**
 * @slot avatar - Used to add an avatar to the profile pattern.
 * @slot name - Used to add the name to the profile pattern.
 * @slot icon - Used to add an icon to the profile pattern.
 */
@Component({
  tag: 'rds-profile',
  styleUrl: 'rds-profile.scss',
  shadow: true,
})
export class RdsProfile {
  render() {
    return (
      <Host>
        <button>
          <slot name="avatar"></slot>
          <slot name="name"></slot>
          <span class="sr-only">Profile</span>
          <slot name="icon"></slot>
        </button>
      </Host>
    );
  }
}
