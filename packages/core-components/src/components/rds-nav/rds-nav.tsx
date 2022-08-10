import { Component, State, Listen, Element, Event, EventEmitter, Method, Watch, Host, Prop, h } from '@stencil/core';
import { getSlotted } from '../../utils/dom';
import { focusElement } from '../../utils/dom';

/**
 * @slot - It is recommended to place RdsNavItems inside of RdsNav, this slot will be used for those sub-components.
 * @slot user-menu - This slot is used to place the alternative mobile profile menu to replace the profile menu located in the header.
 * @slot tools - This slot can be used for secondary navitems to be placed under the Tools section.
 */
@Component({
  tag: 'rds-nav',
  styleUrl: 'rds-nav.scss',
  shadow: true,
})
export class RdsNav {
  @Element() el!: HTMLRdsNavElement;

  /**
   * @deprecated
   * Determines the layout based on the journey.
   * Options are: 'base' for latest, leave blank for Phase 1 layout.
   */
  @Prop({ reflect: true }) type?: string;

  /**
   * Indicates whether nav is expanded. If false, the nav is collapsed.
   * Note: For 'base' nav only.
   */
  @Prop({ reflect: true, mutable: true }) expanded: boolean = true;

  /**
   * When set to true, the user can toggle the state of the navigation component.
   */
  @Prop({ reflect: true, mutable: true }) collapsible: boolean = true;

  /**
   * This is for an accessible label on the nav element.
   * Please omit the use of the term "navigation".
   */
  @Prop() label: string = 'FM Global';

  /**
   * State when nav is open.
   */
  @State() open = false;

  @Watch('expanded')
  expandedHandler() {
    this.rdsNavToggle.emit(this.expanded);
  }

  /**
   * Emitted when expanded has been toggled.
   */
  @Event({ bubbles: true }) rdsNavToggle: EventEmitter;

  expandToggleEl: HTMLRdsNavElement;

  /**
   * @param focusId
   * @returns
   * Sets focus to the nav.
   */
  @Method()
  async setFocus(focusId?: 'expand-toggle'): Promise<void> {
    if (focusId === 'expand-toggle') {
      await focusElement(this.expandToggleEl);
      return;
    }

    this.el.focus();
  }

  toggleExpand = (): void => {
    this.expanded = !this.expanded;
  };

  setExpandToggleRef = (el: HTMLRdsNavElement): void => {
    this.expandToggleEl = el;
  };

  /**
   * Listen for open nav event click
   */
  @Listen('openNav', {
    target: 'body',
  })
  openSideBar() {
    this.open = true;
  }

  /**
   * Listens for close nav event click.
   */
  @Listen('closeNav', {
    target: 'body',
  })
  closeNav() {
    this.open = false;
    this.backdropCloseNav.emit();
  }

  /**
   * Event emitted when nav is closed by click
   */
  @Event() backdropCloseNav: EventEmitter;
  /**
   * @deprecated
   * Deprecate this method to support only base.
   */
  renderDefaultLayout() {
    return (
      <nav class={{ open: this.open }} aria-label={this.label}>
        <slot />
        <div class={{ backdrop: this.open }} onClick={this.closeNav.bind(this)}></div>
      </nav>
    );
  }

  renderBaseLayout() {
    const hasTools = getSlotted(this.el, 'tools');
    return (
      <nav aria-label={this.label} class={this.expanded ? 'expanded' : 'collapsed'}>
        <div>
          {/* Div creates flex layout that is justified 'between' */}
          <ul>
            <slot />
          </ul>
          {hasTools ? <div class="tools-heading">TOOLS</div> : null}
          <slot name="tools" />
          {(this.collapsible && this.expanded) || !this.collapsible ? (
            <div class="user-menu">
              <slot name="user-menu" />
            </div>
          ) : null}
        </div>
        {this.collapsible ? (
          <rds-action
            icon={this.expanded ? 'chevron-double-left' : 'chevron-double-right'}
            onClick={this.toggleExpand}
            text={this.expanded ? 'Collapse' : 'Expand'}
            textEnabled={this.expanded}
            label={this.expanded ? 'Collapse' : 'Expand'}
            class="collapse-btn"
          />
        ) : null}
      </nav>
    );
  }

  componentWillLoad() {
    this.el.childNodes.forEach(element => {
      element['expanded'] = this.expanded;
    });
  }

  @Watch('expanded')
  watchStateHandler(expanded: boolean) {
    // Passes the expanded attributes to the nav item components
    this.el.childNodes.forEach(element => {
      element['expanded'] = expanded;
    });
  }

  render() {
    return <Host>{this.type == 'base' ? this.renderBaseLayout() : this.renderDefaultLayout()}</Host>;
  }
}
