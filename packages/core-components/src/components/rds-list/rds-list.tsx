import { Component, Prop, Listen, Element, h } from '@stencil/core';
import { ListType } from '../interfaces';

/**
 * @slot - Used to add list items to the list.
 */
@Component({
  tag: 'rds-list',
  styleUrl: 'rds-list.scss',
  shadow: true,
})
export class RdsList {
  @Element() el: HTMLRdsListElement;

  /**
   * Sets the type of the list.
   */
  @Prop() type: ListType = 'unordered';

  /**
   * If true, will zebra-stripe alternating description list items. List type must be `description` for this prop to take effect.
   */
  @Prop() striped: boolean;

  /**
   * If true, will place a horizontal border between description list items.
   */
  @Prop() divided: boolean;

  /**
   * Sets the width of the list item. If true, will not expand past its contents. If false, will reach full width possible.
   */
  @Prop() narrow: boolean = false;

  /**
   * @deprecated
   * Determines the visibility of a list.
   */
  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /**
   * @deprecated
   * Listen for openSubNav event click
   */
  @Listen('openSubNav')
  openSubNav() {
    this.toggleActive();
  }

  /**
   * @deprecated
   * Listen for closeSubNav event click
   */
  @Listen('closeSubNav')
  closeSubNav() {
    this.active = false;
  }

  @Listen('click', { capture: true })
  toggleActive() {
    if (this.type == 'navigation') {
      const elems = this.el.querySelector("rds-list[type='sub']");
      const main = document.querySelectorAll("rds-list[type='navigation'].active");
      const subElems = document.querySelectorAll("rds-list[type='sub'].active");
      if (subElems != null && main != null) {
        [].forEach.call(subElems, function (el) {
          el.classList.remove('active');
          el.active = false;
        });
        [].forEach.call(main, function (el) {
          el.classList.remove('active');
          el.active = false;
        });
      }
      if (elems != null) {
        elems.classList.add('active');
        this.active = true;
      }
    }
  }

  componentWillUpdate() {
    this.el.childNodes.forEach(element => {
      if (this.type === 'description') {
        element['type'] = this.type;
        element['striped'] = this.striped;
        element['divided'] = this.divided;
      }
      if (this.type === 'stacked') {
        element['type'] = this.type;
        element['divided'] = true;
      }
    });
  }

  componentWillLoad() {
    this.el.childNodes.forEach(element => {
      if (this.type === 'description') {
        element['type'] = this.type;
        element['striped'] = this.striped;
        element['divided'] = this.divided;
      }
      if (this.type === 'stacked') {
        element['type'] = this.type;
        element['divided'] = true;
      }
    });
  }

  render() {
    const { type } = this;
    const TagType = type === 'ordered' && !undefined ? 'ol' : 'ul';

    return (
      <TagType class={{ active: this.active, sub: this.type == 'sub' }} role="list">
        <slot></slot>
      </TagType>
    );
  }
}
