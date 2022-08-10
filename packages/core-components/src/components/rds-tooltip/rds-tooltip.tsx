import { Component, Element, Host, Method, Prop, State, Listen, Watch, h, Event, EventEmitter } from '@stencil/core';
import { StrictModifiers, Instance as Popper } from '@popperjs/core';
import { TooltipSize } from '../interfaces';
import { guid } from '../../utils/utils';
import { PopperPlacement, defaultOffsetDistance, createPopper, updatePopper, OverlayPositioning } from '../../utils/popper';
import { queryElementRoots } from '../../utils/dom';

/**
 * @slot - Used to add content to the tooltip.
 */
@Component({
  tag: 'rds-tooltip',
  styleUrl: 'rds-tooltip.scss',
  shadow: true,
})
export class RdsTooltip {
  /** Accessible name for the component */
  @Prop() label!: string;

  /**
   * Size sets the max-width of the tooltip container.
   * The available options are sm, md and lg.
   * @deprecated
   */
  @Prop() size: TooltipSize = 'md';

  /**
   * Tooltip Text.
   * Text can be displayed by simply placing the text inside of the Tooltip.
   * @deprecated
   */
  @Prop({ reflect: true }) text: string;

  /**
   * Offset the position of the popover away from the reference element.
   * @default 6
   */
  @Prop({ reflect: true }) offsetDistance = defaultOffsetDistance;

  /**
   * Emitted when the Tooltip has focus.
   */
  @Event() rdsTooltipOnFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the Tooltip loses focus.
   */
  @Event() rdsTooltipOnBlur!: EventEmitter<FocusEvent>;

  @Watch('offsetDistance')
  offsetDistanceOffsetHandler(): void {
    this.reposition();
  }

  /**
   * Offset the position of the popover along the reference element.
   */
  @Prop({ reflect: true }) offsetSkidding = 0;

  @Watch('offsetSkidding')
  offsetSkiddingHandler(): void {
    this.reposition();
  }

  /**
   * Display and position the component.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch('open')
  openHandler(): void {
    this.reposition();
  }

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = 'absolute';

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   */
  @Prop({ reflect: true }) position: PopperPlacement = 'auto';

  @Watch('position')
  placementHandler(): void {
    this.reposition();
  }

  /**
   * Reference HTMLElement used to position this component according to the placement property. As a convenience, a string ID of the reference element can be used. However, setting this property to use an HTMLElement is preferred so that the component does not need to query the DOM for the referenceElement.
   */
  @Prop() referenceElement: HTMLElement | string;

  @Watch('referenceElement')
  referenceElementHandler(): void {
    this.setUpReferenceElement();
  }

  @Element() el: HTMLRdsTooltipElement;

  @State() effectiveReferenceElement: HTMLElement;

  arrowEl: HTMLDivElement;

  popper: Popper;

  guid = `rds-tooltip-${guid()}`;

  componentWillLoad(): void {
    this.setUpReferenceElement();
  }

  componentDidLoad(): void {
    this.reposition();
  }

  disconnectedCallback(): void {
    this.removeReferences();
    this.destroyPopper();
  }

  @Listen('focus', { capture: true })
  focusShow(): void {
    this.rdsTooltipOnFocus.emit();
    this.show();
  }

  @Listen('blur', { capture: true })
  blurHide(): void {
    this.rdsTooltipOnBlur.emit();
    this.hide();
  }

  @Method()
  async reposition(): Promise<void> {
    const { popper, position } = this;
    const modifiers = this.getModifiers();

    popper
      ? updatePopper({
          modifiers,
          placement: position,
          popper,
        })
      : this.createPopper();
  }

  setUpReferenceElement = (): void => {
    this.removeReferences();
    this.effectiveReferenceElement = this.getReferenceElement();

    const { el, referenceElement, effectiveReferenceElement } = this;
    if (referenceElement && !effectiveReferenceElement) {
      console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
        el,
      });
    }

    this.addReferences();
    this.createPopper();
  };

  getId = (): string => {
    return this.el.id || this.guid;
  };

  addReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    const id = this.getId();

    effectiveReferenceElement.setAttribute('data-rds-tooltip-reference', id);
    effectiveReferenceElement.setAttribute('aria-describedby', id);
  };

  removeReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    effectiveReferenceElement.removeAttribute('data-rds-tooltip-reference');
    effectiveReferenceElement.removeAttribute('aria-describedby');
  };

  show = (): void => {
    this.open = true;
  };

  hide = (): void => {
    this.open = false;
  };

  getReferenceElement(): HTMLElement {
    const { referenceElement, el } = this;

    return (typeof referenceElement === 'string' ? queryElementRoots(el, `#${referenceElement}`) : referenceElement) || null;
  }

  getModifiers(): Partial<StrictModifiers>[] {
    const { arrowEl, offsetDistance, offsetSkidding } = this;

    const arrowModifier: Partial<StrictModifiers> = {
      name: 'arrow',
      enabled: true,
      options: {
        element: arrowEl,
      },
    };

    const offsetModifier: Partial<StrictModifiers> = {
      name: 'offset',
      enabled: true,
      options: {
        offset: [offsetSkidding, offsetDistance],
      },
    };

    return [arrowModifier, offsetModifier];
  }

  createPopper(): void {
    this.destroyPopper();

    const { el, position, effectiveReferenceElement: referenceEl, overlayPositioning } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el,
      modifiers,
      placement: position,
      overlayPositioning,
      referenceEl,
    });
  }

  destroyPopper(): void {
    const { popper } = this;

    if (popper) {
      popper.destroy();
    }

    this.popper = null;
  }

  render() {
    const { effectiveReferenceElement, label, open, text } = this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;

    return (
      <Host aria-hidden={hidden.toString()} aria-label={label} rds-hydrated-hidden={hidden} id={this.getId()} tabindex="0" role="tooltip">
        <div
          class={{
            'rds-popper-anim': true,
            'rds-popper-anim--active': displayed,
          }}
        >
          <div class="arrow" ref={arrowEl => (this.arrowEl = arrowEl)} />
          <div class="container">{text ? text : <slot />}</div>
        </div>
      </Host>
    );
  }
}
