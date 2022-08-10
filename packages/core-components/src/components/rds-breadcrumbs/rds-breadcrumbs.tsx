import { Component, Host, Element, h, Prop } from '@stencil/core';
import { BreadCrumbsType } from '../interfaces';
import { setRingOffsetUtil } from '../../utils/utils';

/**
 * @slot - Used for adding one or more `RdsBreadcrumb`(s) to your `RdsBreadcrumbs` component
 */

@Component({
  tag: 'rds-breadcrumbs',
  styleUrl: 'rds-breadcrumbs.scss',
  shadow: true,
})
export class RdsBreadcrumbs {
  @Element() el: HTMLRdsBreadcrumbsElement;
  /**
   * The separator of the Bread Crumbs.
   * Options are: `"chevron"` and `"slash"`.
   */
  @Prop({ reflect: true }) separator: BreadCrumbsType = 'chevron';

  componentWillLoad() {
    this.el.childNodes.forEach(element => {
      element['separator'] = this.separator;
    });
  }

  componentDidLoad() {
    // Set ring offset util based on parent's background color
    setRingOffsetUtil(this.el, this.el.shadowRoot.getElementById('breadcrumb-nav'));

    // Changes the mutable @Prop `type = true` to `type = false` for the first breadcrumb
    if (this.el.childNodes[0]['caret'] !== undefined) {
      this.el.childNodes[0]['caret'] = false;
    }
    if (this.el.childNodes[0]['slash'] !== undefined) {
      this.el.childNodes[0]['slash'] = false;
    }
  }

  render() {
    return (
      <Host>
        <nav id="breadcrumb-nav" aria-label="Breadcrumbs">
          <ol role="list">
            <slot></slot>
          </ol>
        </nav>
      </Host>
    );
  }
}
