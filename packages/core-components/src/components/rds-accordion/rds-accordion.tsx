import { Component, Host, Prop, Event, EventEmitter, Element, Listen, h } from '@stencil/core';

/**
 * @slot - Used for adding accordion items to your accordion.
 */
@Component({
  tag: 'rds-accordion',
  styleUrl: 'rds-accordion.scss',
  shadow: true,
})
export class RdsAccordion {
  @Element() el: HTMLRdsAccordionElement;

  /** This determines the selection mode for the accordion item.
   * If single, it will close other accordionitems when one is clicked.
   */
  @Prop({ reflect: true, attribute: 'selectionmode', mutable: true }) selectionMode: string = 'multi';

  /**
   * @internal
   */
  @Event() rdsAccordionChange: EventEmitter;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  @Listen('rdsAccordionItemRegister') registerRdsAccordionItem(e: CustomEvent): void {
    const item = {
      item: e.target as HTMLRdsAccordionItemElement,
      parent: e.detail.parent as HTMLRdsAccordionElement,
      position: e.detail.position as number,
    };
    if (this.el === item.parent) {
      this.items.push(item);
    }
  }

  @Listen('rdsAccordionItemSelect') updateActiveItemOnChange(event: CustomEvent): void {
    this.requestedAccordionItem = event.detail.requestedAccordionItem;
    this.rdsAccordionChange.emit({
      requestedAccordionItem: this.requestedAccordionItem,
    });
  }

  /** created list of Accordion items */
  private items = [];

  /** keep track of the requested item for multi mode */
  private requestedAccordionItem: HTMLRdsAccordionItemElement;
}
