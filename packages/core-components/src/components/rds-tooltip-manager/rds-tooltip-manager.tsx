import { Component, h, Listen, Prop, Element } from '@stencil/core';
import { TOOLTIP_DELAY_MS } from '../interfaces';
import { queryElementRoots } from '../../utils/dom';
import { getKey } from '../../utils/keys';

/**
 * @slot - A slot for adding elements that reference an 'rds-tooltip' by the 'selector' property.
 */
@Component({
  tag: 'rds-tooltip-manager',
  styleUrl: 'rds-tooltip-manager.scss',
  shadow: true,
})
export class RdsTooltipManager {
  @Element() el: HTMLRdsTooltipManagerElement;

  tooltipEl: HTMLRdsTooltipElement;

  hoverTimeouts: WeakMap<HTMLRdsTooltipElement, number> = new WeakMap();

  clickedTooltip: HTMLRdsTooltipElement;

  /**
   * CSS Selector to match reference elements for tooltips. Reference elements will be identified by this selector in order to open their associated tooltip.
   * @default `[data-rds-tooltip-reference]`
   */
  @Prop() selector = `[data-rds-tooltip-reference]`;

  /**
   * @internal
   * sets to true/false when tooltip has or loses focus
   */
  @Prop({ mutable: true, reflect: true }) focused: boolean = false;

  queryTooltip = (element: HTMLElement): HTMLRdsTooltipElement => {
    const { selector, el } = this;
    const id = element.closest(selector)?.getAttribute('data-rds-tooltip-reference');

    return queryElementRoots(el, `#${id}`) as HTMLRdsTooltipElement;
  };

  clearHoverTimeout = (tooltip: HTMLRdsTooltipElement): void => {
    const { hoverTimeouts } = this;

    if (hoverTimeouts.has(tooltip)) {
      window.clearTimeout(hoverTimeouts.get(tooltip));
      hoverTimeouts.delete(tooltip);
    }
  };

  closeExistingTooltip = (): void => {
    const { tooltipEl } = this;

    if (tooltipEl) {
      this.toggleTooltip(tooltipEl, false);
    }
  };

  focusTooltip = ({ tooltip, value }: { tooltip: HTMLRdsTooltipElement; value: boolean }): void => {
    this.closeExistingTooltip();

    if (value) {
      this.clearHoverTimeout(tooltip);
    }

    this.toggleTooltip(tooltip, value);
  };

  toggleTooltip = (tooltip: HTMLRdsTooltipElement, value: boolean): void => {
    tooltip.open = value;

    if (value) {
      this.tooltipEl = tooltip;
    }
  };

  hoverToggle = ({ tooltip, value }: { tooltip: HTMLRdsTooltipElement; value: boolean }): void => {
    const { hoverTimeouts } = this;

    hoverTimeouts.delete(tooltip);

    if (value) {
      this.closeExistingTooltip();
    }

    this.toggleTooltip(tooltip, value);
  };

  hoverTooltip = ({ tooltip, value }: { tooltip: HTMLRdsTooltipElement; value: boolean }): void => {
    this.clearHoverTimeout(tooltip);

    const { hoverTimeouts } = this;

    const timeoutId = window.setTimeout(() => this.hoverToggle({ tooltip, value }), TOOLTIP_DELAY_MS || 0);

    hoverTimeouts.set(tooltip, timeoutId);
  };

  activeTooltipHover = (event: MouseEvent): void => {
    const { tooltipEl, hoverTimeouts } = this;

    if (!tooltipEl) {
      return;
    }

    if (event.composedPath().includes(tooltipEl)) {
      this.clearHoverTimeout(tooltipEl);
    } else if (!hoverTimeouts.has(tooltipEl)) {
      this.hoverTooltip({ tooltip: tooltipEl, value: false });
    }
  };

  hoverEvent = (event: MouseEvent, value: boolean): void => {
    const tooltip = this.queryTooltip(event.target as HTMLElement);

    this.activeTooltipHover(event);

    if (!tooltip) {
      return;
    }

    this.hoverTooltip({ tooltip, value });
  };

  focusEvent = (event: FocusEvent, value: boolean): void => {
    const tooltip = this.queryTooltip(event.target as HTMLElement);

    if (!tooltip || tooltip === this.clickedTooltip) {
      this.clickedTooltip = null;
      return;
    }
    this.focusTooltip({ tooltip, value });
  };

  render() {
    return (
      <button>
        <slot />
      </button>
    );
  }

  @Listen('keyup', { target: 'document' })
  keyUpHandler(event: KeyboardEvent): void {
    if (getKey(event.key) === 'Escape') {
      const { tooltipEl } = this;

      if (tooltipEl) {
        this.focused = false;
        this.clearHoverTimeout(tooltipEl);
        this.toggleTooltip(tooltipEl, false);
      }
    }
  }

  @Listen('mouseover', { capture: true })
  mouseEnterShow(event: MouseEvent): void {
    this.hoverEvent(event, true);
  }

  @Listen('mouseout', { capture: true })
  mouseLeaveHide(event: MouseEvent): void {
    this.hoverEvent(event, false);
  }

  @Listen('click', { capture: true })
  clickHandler(event: MouseEvent): void {
    const clickedTooltip = this.queryTooltip(event.target as HTMLElement);

    this.clickedTooltip = clickedTooltip;

    if (clickedTooltip) {
      this.toggleTooltip(clickedTooltip, false);
    }
  }

  @Listen('rdsTooltipOnFocus', { target: 'window' })
  focusShow(event: FocusEvent): void {
    this.focused = true;
    this.focusEvent(event, true);
  }

  @Listen('rdsTooltipOnBlur', { target: 'window' })
  blurHide(event: FocusEvent): void {
    this.focused = false;
    this.focusEvent(event, false);
  }
}
