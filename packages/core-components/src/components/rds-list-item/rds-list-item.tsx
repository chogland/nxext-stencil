import { Component, Prop, Event, Element, Listen, EventEmitter, h, Watch } from '@stencil/core';
import { ListItemType } from '../interfaces';
import { getSlotted } from '../../utils/dom';

/**
 * @slot description-title - Use this slot to set the description list item's title.
 * @slot description-text - Use this slot to set the description list item's text.
 * @slot stacked-column - Use this slot to add one or more columns to your stacked list item.
 * @slot - Used to add content to a list item.
 */

@Component({
  tag: 'rds-list-item',
  styleUrl: 'rds-list-item.scss',
  shadow: true,
})
export class RdsListItem {
  @Element() el: HTMLRdsListItemElement;

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  @Prop() href: string = null;

  /**
   * @deprecated
   * Set the target of the link of the list item. Set to "_blank" to open link in a new window.
   */
  @Prop() target: string;

  /** @internal */
  @Prop({ reflect: true, mutable: true }) striped: boolean;

  /** @internal */
  @Prop({ reflect: true, mutable: true }) divided: boolean;

  /**
   * Sets the type of the list item.
   */
  @Prop({ reflect: true }) type: ListItemType = 'unordered';

  /**
   * If true, the list item will be split into two columns. This prop is created for description and stacked list items.
   */
  @Prop() columns: boolean = false;

  /**
   * @deprecated
   * Shows icon for main nav items only if true. If set to false, the chevron is hidden. Default
   * This is useful for main nav items that don't have sub-nav items.
   */
  @Prop() icon: boolean = true;

  /**
   * @deprecated
   * Determines the state of the list item for navigation purposes
   */
  @Prop({ mutable: true }) active: boolean = false;

  /**
   * @deprecated
   * Determines the state of the list item for navigation purposes
   */
  @Prop() spacingX?: string = 'none';

  /**
   * @deprecated
   * Determines the state of the list item for navigation purposes
   */
  @Prop() spacingY?: string = 'none';

  /**
   * @deprecated
   */
  @Listen('click', { capture: true })
  handleClick() {
    this.active = true;

    if (this.type == 'sub') {
      const subElems = document.querySelectorAll("rds-list-item[type='sub'].active");
      if (subElems != null) {
        [].forEach.call(subElems, function (el) {
          el.classList.remove('active');
          el.active = false;
        });
      }
      if (this.el != null) {
        this.el.classList.add('active');
        this.active = true;
      }
    } else if (this.type == 'main') {
      const mainElems = document.querySelectorAll("rds-list-item[type='main'].active");
      if (mainElems != null) {
        [].forEach.call(mainElems, function (el) {
          el.classList.remove('active');
          el.active = false;
        });
      }
      if (this.el != null) {
        this.el.classList.add('active');
        this.active = true;
      }
    }
  }

  /**
   * @deprecated
   */
  @Watch('active')
  watchPropHandler(newValue: boolean) {
    if (newValue) {
      this.openSubNav.emit(newValue);
    } else {
      this.closeSubNav.emit(newValue);
    }
  }

  /**
   * @deprecated
   * Event emitted nav item is clicked and needs to expand Sub Nav
   */
  @Event({ bubbles: true }) openSubNav: EventEmitter<boolean>;

  /**
   * @deprecated
   * Event emitted nav item is clicked and needs to collapse Sub Nav
   */
  @Event({ bubbles: true }) closeSubNav: EventEmitter<boolean>;

  render() {
    const listItemTarget = this.target ? { target: this.target } : null;
    const hasStackedColumn = getSlotted(this.el, 'stacked-column');

    return (
      <li
        class={{
          'list': this.type == 'main',
          'sub': this.type == 'sub',
          'active': this.active == true,
          'has-link': this.href !== null,
          'has-stacked-column': hasStackedColumn !== null,
        }}
        role="listitem"
      >
        {this.type === 'main' || this.type === 'sub' ? (
          // Navigational list items
          <a href={this.href} {...listItemTarget}>
            <slot />
          </a>
        ) : null}
        {this.href !== null && this.type !== 'main' && this.type !== 'sub' ? (
          // Non-navigational list items
          // With link
          <a class="link" href={this.href}>
            <slot name="description-title" />
            <slot name="description-text" />
            <slot name="stacked-column" />
            <slot />
            {this.href ? <rds-hero-icon class="link-chevron" name="chevron-right" size="lg" /> : null}
          </a>
        ) : (
          // Without link
          <div class="no-link">
            <slot name="description-title" />
            <slot name="description-text" />
            <slot name="stacked-column" />
            <slot />
          </div>
        )}
        {this.icon && this.type === 'main' ? <rds-icon icon={this.active ? 'rds-chevron-up' : 'rds-chevron-down'}></rds-icon> : null}
      </li>
    );
  }
}
