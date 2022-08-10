import { Component, h, Prop, Element, Listen, Watch } from '@stencil/core';
import { getSlotted } from '../../utils/dom';

/**
 * @slot icon - Use this slot to add an icon to your nav item.
 * @slot child - Use this slot to add as many children / sub-nav items as you would like.
 * @slot - Used to add text to your nav item.
 */
@Component({
  tag: 'rds-nav-item',
  styleUrl: 'rds-nav-item.scss',
  shadow: true,
})
export class RdsNavItem {
  @Element() el: HTMLRdsNavItemElement;
  hasSubNav: boolean;

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  @Prop() href: string;

  /**
   * Set the target of the link of the list item. Set to "_blank" to open link in a new window.
   */
  @Prop() target: string;

  /**
   * To show a nav item in an active state, this can be set to true.
   */
  @Prop() active: boolean = false;

  /**
   * If `true`, nav item will expand/collapse with the nav container.
   * Set up to inherit from the parent `RdsNav` component.
   * @internal
   */
  @Prop({ reflect: true }) collapsible: boolean = false;

  /**
   * If `true`, nav item will expand/collapse with the nav container.
   * Set up to inherit from the parent `RdsNav` component.
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) expanded: boolean = false;

  /**
   * If `true`, nav item is a child of another nav item.
   * @internal
   */
  @Prop({ reflect: true }) child: boolean = false;

  /**
   * If `true`, nav item is open and its slotted children are revealed.
   */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  @Listen('click')
  handleClick() {
    if ((this.hasSubNav && this.collapsible && this.expanded) || !this.collapsible) {
      this.open = !this.open;
    }
  }

  @Watch('active')
  openSubNavIfExists() {
    if (this.active && this.hasSubNav) {
      this.open = true;
    }
  }

  @Watch('expanded')
  closeSubNavIfExists() {
    if (this.collapsible && !this.expanded) {
      this.open = false;
    }
  }

  componentWillRender() {
    this.hasSubNav = getSlotted(this.el, 'child') ? true : false;
    this.openSubNavIfExists();
    // Passes the collapsible and expanded props to any child/sub nav-items for proper styling
    const parent = this.el.parentElement as HTMLRdsNavElement;
    this.expanded = parent.expanded;
  }

  render() {
    const listItemTarget = this.target ? { target: this.target } : null;

    return (
      <li
        class={{
          parent: this.hasSubNav,
          collapsed: !this.expanded,
          expanded: this.expanded,
        }}
      >
        <a href={this.href} {...listItemTarget} tabindex="0" aria-current={this.active ? 'page' : null}>
          <slot name="icon" />
          <div class="nav-item-text">
            <slot />
          </div>
          {this.hasSubNav ? (
            <div class="chevron">
              <rds-hero-icon size="lg" name="chevron-right" />
            </div>
          ) : null}
        </a>
        <div class={this.hasSubNav ? 'children' : null}>
          <slot name="child" />
        </div>
      </li>
    );
  }
}
