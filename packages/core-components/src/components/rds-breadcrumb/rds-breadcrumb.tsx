import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import { BreadCrumbsType } from '../interfaces';
import { getBreakpoint } from '../../utils/dom';

/**
 * @slot - A unnamed slot for adding the recommended `RdsLink` component, or another component of your choosing, to your breadcrumb.
 */
@Component({
  tag: 'rds-breadcrumb',
  styleUrl: 'rds-breadcrumb.scss',
  shadow: true,
})
export class RdsBreadcrumb {
  @Element() el: HTMLRdsBreadcrumbElement;
  hasRendered: boolean = false;

  /**
   * Manages the responsive rendering of the component props.
   * @internal
   */
  @Prop() breakpoint: string = null;

  /**
   * If true, displays the caret in all breakpoints.
   * If false, hides the caret on breakpoints 'md' and above.
   * This is dynamically handled by the parent RdsBreadcrumbs component.
   * It will be set to false for the first slotted RdsBreadcrumb.
   * @internal
   */
  @Prop({ mutable: true }) caret: boolean = true;
  /**
   * If true, displays the slash in all breakpoints.
   * If false, hides the slash on breakpoints 'md' and above.
   * This is dynamically handled by the parent RdsBreadcrumbs component.
   * It will be set to false for the first slotted RdsBreadcrumb.
   * @internal
   */
  @Prop({ mutable: true }) slash: boolean = true;
  /**
   * The separator of the Bread Crumbs.
   * Options are: `"chevron"` and `"slash"`.
   */
  @Prop({ mutable: true, reflect: true }) separator: BreadCrumbsType = 'chevron';

  @Listen('resize', { target: 'window' })
  handleResize() {
    if (this.hasRendered) {
      this.breakpoint = getBreakpoint(this.el);
    }
  }

  componentDidLoad() {
    // Sets the values of the breakpoint map
    this.breakpoint = getBreakpoint(this.el);
    this.hasRendered = true;
  }

  render() {
    return (
      <Host>
        <li>
          <div id="breakpoint"></div>
          {this.separator === 'chevron' ? <rds-hero-icon class={this.caret == false ? 'first-caret' : ''} name="chevron-right"></rds-hero-icon> : null}
          {this.separator === 'slash' && (this.slash === false || this.breakpoint === 'xs' || this.breakpoint === 'sm') ? (
            <rds-hero-icon id="slash" class="first-caret" name="chevron-right"></rds-hero-icon>
          ) : null}
          {this.separator === 'slash' && this.slash === true && this.breakpoint !== 'xs' && this.breakpoint !== 'sm' ? (
            <rds-hero-icon id="slash" type="outline" name="slash-front"></rds-hero-icon>
          ) : null}
          <slot></slot>
        </li>
      </Host>
    );
  }
}
