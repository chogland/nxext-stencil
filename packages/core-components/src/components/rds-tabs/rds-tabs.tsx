import { Component, Host, h, Element, State, Prop, Method, Event, EventEmitter, Listen } from '@stencil/core';
import { TabAppearance, TabClickEventDetail } from '../interfaces';

/**
 * @slot - Used to add individual tab components to the parent 'tabs' component.
 */
@Component({
  tag: 'rds-tabs',
  styleUrl: 'rds-tabs.scss',
  shadow: true,
})
export class RdsTabs {
  private leavingTab?: HTMLRdsTabElement;

  @Element() el!: HTMLRdsTabsElement;

  @State() selectedTab?: HTMLRdsTabElement;

  @State() displayMode: 'mobile' | 'desktop';

  /**
   * Sets the appearance type of the tabs container
   */
  @Prop() appearance?: TabAppearance = 'primary';

  /**
   * An accessible label of the tab section.
   */
  @Prop() label: string = 'Tabs';

  /**
   * Emitted when the navigation is about to transition to a new component.
   */
  @Event({ bubbles: false }) rdsTabsWillChange!: EventEmitter<{ tab: string }>;

  /**
   * Emitted when the navigation has finished transitioning to a new component.
   */
  @Event({ bubbles: false }) rdsTabsDidChange!: EventEmitter<{ tab: string }>;

  /**
   * Select a tab by the value of its `tab` property or an element reference.
   *
   * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
   */
  @Method()
  async select(tab: string | HTMLRdsTabElement): Promise<boolean> {
    const selectedTab = getTab(this.tabs, tab);

    if (!this.shouldSwitch(selectedTab)) {
      return false;
    }
    await this.setActive(selectedTab);
    this.tabSwitch();

    return true;
  }

  /**
   * Get a specific tab by the value of its `tab` property or an element reference.
   *
   * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
   */
  @Method()
  async getTab(tab: string | HTMLRdsTabElement): Promise<HTMLRdsTabElement | undefined> {
    return getTab(this.tabs, tab);
  }

  /**
   * Get the currently selected tab.
   */
  @Method()
  getSelected(): Promise<string | undefined> {
    return Promise.resolve(this.selectedTab ? this.selectedTab.tab : undefined);
  }

  /**
   * Listen for the on change of the mobile select, to update the desktop tabs
   */
  @Listen('rdsOnBlur')
  rdsOnBlurHandler(_e: CustomEvent<string>) {
    setTimeout(() => {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].href) {
          window.open(this.tabs[i].href, this.tabs[i].target);
        }
        this.select(this.tabs[i]);
      }
    }, 100);
  }

  @Listen('resize', { target: 'window' })
  handleResize(ev) {
    const mode = ev.target.innerWidth <= 768 ? 'mobile' : 'desktop';
    this.displayMode = mode;
  }

  private setActive(selectedTab: HTMLRdsTabElement): Promise<void> {
    this.leavingTab = this.selectedTab;
    this.selectedTab = selectedTab;
    this.rdsTabsWillChange.emit({ tab: selectedTab.tab });

    selectedTab.active = true;

    return Promise.resolve();
  }

  private tabSwitch() {
    const selectedTab = this.selectedTab;
    const leavingTab = this.leavingTab;

    if (!selectedTab) {
      return;
    }

    if (leavingTab !== selectedTab) {
      if (leavingTab) {
        leavingTab.active = false;
      }
      this.rdsTabsDidChange.emit({ tab: selectedTab.tab });
    }
  }

  private shouldSwitch(selectedTab: HTMLRdsTabElement | undefined): selectedTab is HTMLRdsTabElement {
    const leavingTab = this.selectedTab;
    return selectedTab !== undefined && selectedTab !== leavingTab;
  }

  private get tabs() {
    return Array.from(this.el.querySelectorAll('rds-tab'));
  }

  private onTabClicked = (ev: CustomEvent<TabClickEventDetail>) => {
    const { href, tab, target } = ev.detail;
    if (href !== undefined) {
      window.open(href, target);
    } else {
      this.select(tab);
    }
  };

  onMobileTabClicked(e) {
    const tab = e.target.value;
    this.select(tab);
  }

  componentWillLoad() {
    const activeTab = this.tabs.find(x => x.active) as HTMLRdsTabElement;
    this.select(activeTab);
  }

  componentDidLoad() {
    // Inject appearance in all Slotted elements
    this.el.childNodes.forEach(element => {
      element['appearance'] = this.appearance;
    });
  }

  render() {
    // Contructs classes to be added to Host element
    const classes = `${this.appearance}`;

    return (
      <Host class={classes} onRdsTabButtonClick={this.onTabClicked}>
        <div class="container" id="breakpoint">
          {this.displayMode === 'mobile' && this.tabs?.length > 2 ? (
            <div class="mobile">
              <div class="select">
                {/* Mobile Select */}
                <select id="tabs-select" aria-label="Mobile Tabs" onChange={e => this.onMobileTabClicked(e)}>
                  {this.tabs
                    ? this.tabs.map(function (tab, i) {
                        return (
                          <option key={i} id={tab.tab} value={tab.tab} selected={tab.active}>
                            {tab.innerText}
                          </option>
                        );
                      })
                    : null}
                </select>
                <div class="icon-container">
                  <rds-hero-icon name="chevron-down" />
                </div>
              </div>
            </div>
          ) : (
            <div class="desktop">
              <div class="tabs">
                <nav aria-label={this.tabs}>
                  <slot></slot>
                </nav>
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}

const getTab = (tabs: HTMLRdsTabElement[], tab: string | HTMLRdsTabElement): HTMLRdsTabElement | undefined => {
  const tabEl = typeof tab === 'string' ? tabs.find(t => t.tab === tab) : tab;
  if (!tabEl) {
    const sanitizedData = sanitizeInput(tabEl);
    console.error(`tab with id: "${sanitizedData}" does not exist`);
  }
  return tabEl;
};

const sanitizeInput = (data: any) => {
  const div = document.createElement('div');
  div.textContent = data;
  return div.innerHTML;
};
