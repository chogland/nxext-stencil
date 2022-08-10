import { Component, Host, Prop, Element, Event, EventEmitter, Listen, h } from '@stencil/core';
import { getElementProp } from '../../utils/utils';
import { getKey } from '../../utils/keys';
import { getSlotted } from '../../utils/dom';

/**
 * @slot item-title - Use this slot to add a title contents to your accordion item. You may add RDS components, such as RdsHeroIcon, alongside plain text, for example.
 * @slot - Used for adding content to your accordion item.
 */
@Component({
  tag: 'rds-accordion-item',
  styleUrl: 'rds-accordion-item.scss',
  shadow: true,
})
export class RdsAccordionItem {
  @Element() el: HTMLRdsAccordionItemElement;

  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /**
   * @internal
   */
  @Prop({ mutable: true }) padding: boolean = true;

  /**
   * The text displayed for the accordion item title. You may use this prop instead of the slot if you are only adding plain text as the title.
   */
  @Prop() itemTitle?: string;

  /**
   * @internal
   */
  @Event() rdsAccordionItemKeyEvent: EventEmitter;

  /**
   * @internal
   */
  @Event() rdsAccordionItemSelect: EventEmitter;

  /**
   * @internal
   */
  @Event() rdsAccordionItemClose: EventEmitter;

  /**
   * @internal
   */
  @Event() rdsAccordionItemRegister: EventEmitter;

  connectedCallback(): void {
    this.parent = this.el.parentElement as HTMLRdsAccordionElement;
    this.selectionMode = getElementProp(this.el, 'selectionmode', 'multi');
  }

  componentDidLoad(): void {
    this.itemPosition = this.getItemPosition();
    this.rdsAccordionItemRegister.emit({
      parent: this.parent,
      position: this.itemPosition,
    });
  }

  render() {
    const hasSlot = getSlotted(this.el, 'item-title');

    return (
      <Host aria-expanded={this.active.toString()} tabindex="0">
        <div>
          <div class={{ 'accordion-item-header': true }} onClick={this.itemHeaderClickHandler}>
            <div class="accordion-item-header-text">
              <span class="accordion-item-title">{hasSlot ? <slot name="item-title" /> : this.itemTitle}</span>
            </div>
            <rds-hero-icon class="accordion-item-expand-icon" size="lg" name="chevron-down" />
          </div>
          <div class={{ 'accordion-item-content': true, 'padded': this.padding }}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  @Listen('keydown') keyDownHandler(e: KeyboardEvent): void {
    if (e.target === this.el) {
      switch (getKey(e.key)) {
        case ' ':
        case 'Enter':
          this.emitRequestedItem();
          e.preventDefault();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Home':
        case 'End':
          this.rdsAccordionItemKeyEvent.emit({
            parent: this.parent,
            item: e,
          });
          e.preventDefault();
          break;
      }
    }
  }

  @Listen('rdsAccordionChange', { target: 'body' })
  updateActiveItemOnChange(event: CustomEvent): void {
    this.requestedAccordionItem = event.detail.requestedAccordionItem as HTMLRdsAccordionItemElement;
    this.determineActiveItem();
  }

  /** the containing accordion element */
  private parent: HTMLRdsAccordionElement;

  /** position within parent */
  private itemPosition: number;

  /** the latest requested item */
  private requestedAccordionItem: HTMLRdsAccordionItemElement;

  /** what selection mode is the parent accordion in */
  private selectionMode: string;

  /** handle clicks on item header */
  private itemHeaderClickHandler = (): void => this.emitRequestedItem();

  private determineActiveItem(): void {
    switch (this.selectionMode) {
      case 'multi':
        if (this.el === this.requestedAccordionItem) {
          this.active = !this.active;
        }
        break;

      case 'single':
        if (this.el === this.requestedAccordionItem) {
          this.active = !this.active;
        } else {
          this.active = false;
        }
        break;
    }
  }

  private emitRequestedItem(): void {
    this.rdsAccordionItemSelect.emit({
      requestedAccordionItem: this.el as HTMLRdsAccordionItemElement,
    });
  }

  private getItemPosition(): number {
    return Array.prototype.indexOf.call(this.parent.querySelectorAll('rds-accordion-item'), this.el);
  }
}
