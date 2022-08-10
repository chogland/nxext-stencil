import { Placement, Instance as Popper, createPopper as setupPopper, StrictModifiers, PositioningStrategy } from '@popperjs/core';

type RdsPlacement = 'auto' | 'top' | 'right' | 'bottom' | 'left';

export type PopperPlacement = RdsPlacement;

export type OverlayPositioning = PositioningStrategy;

export type MenuPlacement = Extract<
  PopperPlacement,
  'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'top-leading' | 'top-trailing' | 'bottom-leading' | 'bottom-trailing'
>;

const visiblePointerSize = 4;

export const defaultOffsetDistance = Math.ceil(hypotenuse(visiblePointerSize, visiblePointerSize));

export const defaultMenuPlacement: MenuPlacement = 'bottom';

export function updatePopper({ modifiers, placement: PopperPlacement, popper }: { modifiers: Partial<StrictModifiers>[]; popper: Popper; placement: PopperPlacement }): void {
  const placement = getPlacement(PopperPlacement);

  popper.setOptions({
    modifiers,
    placement,
  });
}

export function hypotenuse(sideA: number, sideB: number): number {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

export function getPlacement(placement: PopperPlacement): Placement {
  const placements = ['left', 'right'];
  const variations = ['start', 'end'];

  return placement
    .replace(/-leading/gi, `-${variations[0]}`)
    .replace(/-trailing/gi, `-${variations[1]}`)
    .replace(/leading/gi, placements[0])
    .replace(/trailing/gi, placements[1]) as Placement;
}

export function createPopper({
  referenceEl,
  el,
  placement,
  overlayPositioning = 'absolute',
  modifiers,
}: {
  el: HTMLElement;
  modifiers: Partial<StrictModifiers>[];
  overlayPositioning: PositioningStrategy;
  placement: PopperPlacement;
  referenceEl: HTMLElement;
}): Popper | null {
  if (!referenceEl) {
    return null;
  }

  return setupPopper(referenceEl, el, {
    strategy: overlayPositioning,
    placement: getPlacement(placement),
    modifiers,
  });
}
