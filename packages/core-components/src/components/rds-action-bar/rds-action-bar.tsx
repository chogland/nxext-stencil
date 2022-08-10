import { Component, Element, EventEmitter, Event, Method, Host, h, Prop, Watch, State } from '@stencil/core';
import { focusElement, getSlotted } from '../../utils/dom';

/**
 * @slot bottom-action - Use this slot to set an action on the collapsed action bar. This will be shown when the `collapsible` prop is set to true.
 * @slot - Used for adding action items to your action bar.
 */
@Component({
  tag: 'rds-action-bar',
  styleUrl: 'rds-action-bar.scss',
  shadow: true,
})
export class RdsActionBar {
  @Element() el: HTMLRdsActionBarElement;

  /**
   * Indicates whether widget is expanded.
   */
  @State() expanded: boolean = true;

  /**
   * If `true`, action bar will stay in collapsed/non expandable state.
   */
  @Prop({ reflect: true }) collapsible: boolean = true;

  @Watch('expanded')
  expandedHandler(expanded: boolean): void {
    this.rdsActionBarToggle.emit(expanded);
  }

  /**
   * Emitted when expanded has been toggled.
   */
  @Event() rdsActionBarToggle: EventEmitter;

  expandToggleEl: HTMLRdsActionElement;

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
    const { el, expanded } = this;
    this.toggleChildActionText({ parent: el, expanded });
  };

  setExpandToggleRef = (el: HTMLRdsActionElement): void => {
    this.expandToggleEl = el;
  };

  toggleChildActionText({ parent, expanded }: { parent: HTMLElement; expanded: boolean }): void {
    Array.from(parent.querySelectorAll('rds-action')).forEach(action => (action.textEnabled = expanded));
  }

  componentWillLoad() {
    if (!this.collapsible) {
      this.toggleChildActionText({ parent: this.el, expanded: false });
    }
  }

  render() {
    const hasBottomAction = getSlotted(this.el, 'bottom-action');
    return (
      <Host>
        <div class="top-group">
          <slot />
        </div>
        <div class="bottom-group">
          {hasBottomAction ? <rds-divider spacing="none" /> : null}
          <slot name="bottom-action" />
          {this.collapsible ? <rds-divider spacing="none" /> : null}
          {this.collapsible ? (
            <rds-action
              icon={this.expanded ? 'chevron-left' : 'chevron-right'}
              onClick={this.toggleExpand}
              text={this.expanded ? 'Collapse' : 'Expand'}
              textEnabled={this.expanded}
              label={this.expanded ? 'Collapse' : 'Expand'}
            />
          ) : null}
        </div>
      </Host>
    );
  }
}
