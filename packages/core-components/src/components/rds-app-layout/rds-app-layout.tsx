import { Component, h, Prop, Listen, Host, State, Element } from '@stencil/core';
import { getSlotted } from '../../utils/dom';
import { AppLayoutType, AppLayoutSidebar, AppLayoutHeaderWidth } from '../interfaces';

/**
 * @slot app-logo - Use this slot to add a logo to the left sidebar. This slot exists for base app layout only.
 * @slot app-title - Use this slot to add a title text next to the left sidebar's logo. This slot exists for base app layout only.
 * @slot app-nav - Use this slot to add a navigation to the left sidebar. This slot exists for base app layout only.
 * @slot app-right - Use this slot to add a right sidebar. This slot exists for the base app layout only.
 * @slot app-header - Use this slot to add a header.
 * @slot app-hero - Use this slot to add a full-width hero below the header and above the main body content. This slot exists for base app layout only.
 * @slot app-content - Use this slot to add main body content. This slot exists for the base app layout only.
 * @slot app-content-full - Use this slot to add main body content entire width and height. This slot exists for the base app layout only.
 * @slot app-footer - Use this slot to add a footer.
 */

@Component({
  tag: 'rds-app-layout',
  styleUrl: 'rds-app-layout.scss',
  shadow: true,
})
export class RdsAppLayout {
  hasRendered: boolean = false;

  @Element() el!: HTMLRdsAppLayoutElement;

  /**
   * @deprecated
   * Determines the layout based on the journey.
   * 'base' for latest design; undefined for phase 1 design.
   */
  @Prop({ reflect: true }) type?: AppLayoutType;

  /**
   * Sets whether the sidebars are displayed
   * Options are: left, right, both, none
   */
  @Prop({ reflect: true, mutable: true }) sidebar: AppLayoutSidebar = 'left';

  /**
   * This property can change the width of the header from auto to full-screen.
   */
  @Prop() headerWidth?: AppLayoutHeaderWidth;

  /**
   * @deprecated
   * Sets the display of the flyout slot for slide out content
   */
  @Prop({ mutable: true }) panel: boolean = true;

  /**
   * @deprecated
   * Sets whether the background of the content region is FM Gray or FM White on Default/Phase 1 and Workflow App Layouts.
   */
  @Prop({ mutable: true }) backgroundColor: string = 'gray';

  /**
   * @internal
   * Prevents scroll when true, expecting the nav to open.
   */
  @Prop({ mutable: true }) preventScroll: boolean = false;

  /**
   * Whether the mobile nav is open.
   */
  @State() mobileNavOpen: boolean = false;

  /**
   * Whether the desktop nav is open.
   */
  @State() desktopNavOpen: boolean = true;

  rightSidebar = getSlotted(this.el, 'app-right') as HTMLElement;
  hasPanel = getSlotted(this.el, 'app-panel');
  hasHeader = getSlotted(this.el, 'app-header') as HTMLRdsHeaderElement;
  appContentFull = getSlotted(this.el, 'app-content');
  hasAppContentFull = getSlotted(this.el, 'app-content-full');

  @Listen('resize', { target: 'window' })
  handleResize() {
    if (this.hasRendered) {
      this.handleRightSidebar();
    }
  }

  /**
   * Listen for close nav event click
   */
  @Listen('closeNav', {
    target: 'body',
  })
  closeNav() {
    this.preventScroll = false;
    this.mobileNavOpen = false;
  }

  /**
   * Listen for backdrop close event click
   */
  @Listen('backdropCloseNav', {
    target: 'body',
  })
  backdropCloseNav() {
    this.preventScroll = false;
  }

  /**
   * Listen for open nav event click
   */
  @Listen('openNav', {
    target: 'body',
  })
  openSideBar() {
    this.preventScroll = true;
    this.mobileNavOpen = true;
  }

  @Listen('rdsNavToggle', {
    target: 'body',
  })
  navToggleHandler(event: CustomEvent<boolean>) {
    if (event.detail) {
      this.desktopNavOpen = true;
    } else {
      this.desktopNavOpen = false;
    }
  }

  /**
   * Listen for open nav event click
   */
  @Listen('rdsNavExpanded', {
    target: 'body',
  })
  setExpanded() {
    this.desktopNavOpen = true;
  }

  /**
   * Listen for open nav event click
   */
  @Listen('rdsNavCollapsed', {
    target: 'body',
  })
  setCollapsed() {
    this.desktopNavOpen = false;
  }

  // https://github.com/ionic-team/stencil/issues/2072
  connectedCallback() {
    // Add custom font to page DOM since font-face doesn't work within Shadow DOM.
    const fontCssUrl = 'https://rsms.me/inter/inter.css';
    let element = document.querySelector(`link[href="${fontCssUrl}"]`);

    // Only inject the element if it's not yet present
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', 'stylesheet');
      element.setAttribute('href', fontCssUrl);
      document.head.appendChild(element);
    }
  }

  componentWillLoad() {
    // Pass sidebar prop to the header component to hide the mobile menu if necessary
    this.el.childNodes.forEach(element => {
      if (element['sidebar']) {
        element['sidebar'] = this.sidebar;
      }
    });

    this.handleNav();
  }

  componentDidRender() {
    // Positions the right sidebar slot
    this.handleRightSidebar();
    this.hasRendered = true;
  }

  handleNav() {
    const nav = this.el.querySelector('rds-nav');
    if (nav && nav.expanded) {
      this.desktopNavOpen = true;
    } else {
      this.desktopNavOpen = false;
    }
  }

  handleRightSidebar() {
    if (this.rightSidebar) {
      const width = this.rightSidebar.offsetWidth;
      this.el.shadowRoot.getElementById('app-content').style.paddingRight = width.toString() + 'px';
      const panel = this.el.getElementsByTagName('rds-panel');

      if (window.innerWidth >= 1024) {
        for (let i = 0; i < panel.length; i++) {
          let p = panel[i] as HTMLRdsPanelElement;
          let leftVal: any;

          if (p.getAttribute('wide')) {
            leftVal = width + 672;
          } else {
            leftVal = width + 480;
          }
          leftVal = leftVal.toString() + 'px';
          p.classList.add('panel-app-right');
          p.style.left += `calc(100% - ${leftVal})`;
        }
      }
    }
  }

  renderBaseLayout() {
    return (
      <div class="app-layout-wrapper">
        {this.hasHeader && this.headerWidth == 'full' ? (
          <div class="app-header">
            <div class="header-inner">
              <div class="header-start">
                <slot name="app-header"></slot>
              </div>
            </div>
          </div>
        ) : null}
        <div class="app-layout-content-wrapper">
          {this.sidebar !== 'none' && this.sidebar !== 'right' ? (
            <div
              class={{
                'app-left-sidebar-outer': true,
                'mobile-nav-closed': !this.mobileNavOpen,
                'mobile-nav-open': this.mobileNavOpen,
                'desktop-nav-closed': !this.desktopNavOpen,
                'desktop-nav-open': this.desktopNavOpen,
              }}
            >
              <div class="app-left-sidebar-inner">
                <div class={{ 'app-sidebar-logo': true, 'show-nav-logo': this.headerWidth != 'full' }}>
                  <slot name="app-logo"></slot>
                  <div class="app-title">
                    <slot name="app-title"></slot>
                  </div>
                </div>
                <div class="nav-outer">
                  <slot name="app-nav"></slot>
                </div>
              </div>
            </div>
          ) : null}
          <div id="app-content" class={this.hasAppContentFull ? 'app-content app-content-full' : 'app-content'}>
            {this.hasHeader && this.headerWidth != 'full' ? (
              <div class="app-header">
                <div class="header-inner">
                  <div class="header-start">
                    <slot name="app-header"></slot>
                  </div>
                </div>
              </div>
            ) : null}
            <slot name="app-hero"></slot>
            <main>
              {this.appContentFull ? <slot name="app-content"></slot> : null}
              {this.hasAppContentFull ? <slot name="app-content-full"></slot> : null}
            </main>
            <slot name="app-footer"></slot>
          </div>
          {this.sidebar !== 'none' && this.sidebar !== 'left' ? (
            <div
              class={{
                'app-right-sidebar-outer': true,
              }}
            >
              <slot name="app-right" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  /**
   * @deprecated
   * Deprecate this method to support only base app layout.
   */
  renderDefaultLayout() {
    return [
      <slot name="app-header"></slot>,
      <slot name="app-stepper"></slot>,
      <div app-content class={this.preventScroll ? 'prevent-scroll' : null}>
        {this.sidebar === 'left' || this.sidebar === 'both' ? <slot name="app-sidebar-left"></slot> : null}
        <slot name="app-main"></slot>
        {this.sidebar === 'right' || this.sidebar === 'both' ? (
          <div class="sidebar">
            <slot name="app-sidebar-right"></slot>
          </div>
        ) : null}
        <slot name="app-fixed"></slot>
      </div>,
      <slot name="app-footer"></slot>,
      <div app-panel>{this.hasPanel ? <slot name="app-panel"></slot> : null}</div>,
    ];
  }

  render() {
    return <Host>{this.type === 'base' ? this.renderBaseLayout() : this.renderDefaultLayout()}</Host>;
  }
}
