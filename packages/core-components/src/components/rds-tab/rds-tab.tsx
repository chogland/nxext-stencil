import { Component, Host, h, Element, Prop, Event, EventEmitter, Method, Listen } from '@stencil/core';
import { Appearance, TabClickEventDetail, TabChangedEventDetail } from '../interfaces';
import { nodeListToArray } from '../../utils/dom';

/**
 * @slot start - Use this slot for adding a leading `RdsHeroIcon` to your tab.
 * @slot - Use this slot to add text to the tab.
 */
@Component({
  tag: 'rds-tab',
  styleUrl: 'rds-tab.scss',
  shadow: true,
})
export class RdsTab {
  @Element() el!: HTMLRdsTabElement;

  /**
   * Sets the appearance type of the individual tab.
   * Set up to inherit from the parent `RdsTabs` component.
   * @internal
   */
  @Prop({ reflect: true }) appearance?: Appearance = 'primary';

  /**
   * If `true`, the tab appears in an active state.
   */
  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /**
   * If `true`, the user cannot interact with the tab.
   */
  @Prop({ mutable: true }) disabled: boolean = false;

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  @Prop() href: string | undefined;

  /**
   * The selected tab component
   * @deprecated
   */
  @Prop({ mutable: true }) selected: boolean = false;

  /**
   * A tab id must be provided for each `rds-tab`. It's used internally to reference
   * the selected tab to switch between them.
   */
  @Prop() tab!: string;

  /**
   * A value for the mobile selected tab.
   * @internal
   */
  @Prop() value!: string;

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
   */
  @Prop() target: string | undefined;

  async componentWillLoad() {
    if (this.active) {
      await this.setActive();
    }
  }

  /** Set the active component for the tab */
  @Method()
  async setActive(): Promise<void> {
    this.active = true;
  }

  /**
   * Return the index of this tab within the tab array
   */
  @Method()
  async getTabIndex(): Promise<number> {
    return Array.prototype.indexOf.call(
      nodeListToArray(this.el.parentElement.children).filter(e => e.matches('rds-tab')),
      this.el,
    );
  }

  /**
   * Emitted when the tab button is clicked
   */
  @Event() rdsTabButtonClick!: EventEmitter<TabClickEventDetail>;

  @Listen('rdsTabsDidChange', { target: 'body' })
  tabChangeHandler(event: CustomEvent<TabChangedEventDetail>): void {
    if ((event.target as HTMLElement).closest('rds-tabs') !== this.el.closest('rds-tabs')) {
      return;
    }
    if (this.tab) {
      this.active = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then(index => {
        this.active = index === event.detail.tab;
      });
    }
  }

  private selectTab(ev: Event | KeyboardEvent) {
    if (this.tab !== undefined) {
      if (!this.disabled) {
        this.rdsTabButtonClick.emit({
          tab: this.tab,
          href: this.href,
          active: this.active,
          target: this.target,
        });
      }
      ev.preventDefault();
    }
  }

  private get tabIndex() {
    if (this.disabled) {
      return -1;
    }

    const hasTabIndex = this.el.hasAttribute('tabindex');

    if (hasTabIndex) {
      return this.el.getAttribute('tabindex');
    }

    return 0;
  }

  private onKeyUp = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      this.selectTab(ev);
    }
  };

  private onClick = (ev: Event) => {
    this.selectTab(ev);
  };

  render() {
    const { disabled, href, target, tab, active, tabIndex, appearance } = this;
    const attrs = {
      href,
      target,
    };
    // Contructs classes to be added to Host element
    const isDisabled = disabled ? 'tab-disabled' : '';
    const isActive = active ? 'tab-active' : '';
    const classes = `${appearance} ${isDisabled} ${isActive}`;

    return (
      <Host
        tabindex={tabIndex}
        onClick={this.onClick}
        onKeyup={this.onKeyUp}
        id={tab !== undefined ? `tab-button-${tab}` : null}
        {...active}
        aria-current={this.active}
        class={classes}
      >
        <a tabIndex={-1} {...attrs}>
          <slot name="start"></slot>
          <slot></slot>
        </a>
      </Host>
    );
  }
}
