export function closestElementCrossShadowBoundary<T extends Element = Element>(element: Element, selector: string): T | null {
  // based on https://stackoverflow.com/q/54520554/194216
  function closestFrom<T extends Element = Element>(el: Element): T | null {
    return el ? el.closest(selector) || closestFrom(getHost(getRootNode(el))) : null;
  }

  return closestFrom(element);
}

export async function focusElement(el: RdsFocusableElement): Promise<void> {
  if (!el) {
    return;
  }

  return isRdsFocusable(el) ? el.setFocus() : el.focus();
}

interface GetSlottedOptions {
  all?: boolean;
  direct?: boolean;
  selector?: string;
}

export function getSlotted<T extends Element = Element>(element: Element, slotName: string, options: GetSlottedOptions & { all: true }): T[];
export function getSlotted<T extends Element = Element>(element: Element, slotName: string, options?: GetSlottedOptions): T | null;
export function getSlotted<T extends Element = Element>(element: Element, slotName: string, options?: GetSlottedOptions): (T | null) | T[] {
  const slotSelector = `[slot="${slotName}"]`;

  if (options?.all) {
    return queryMultiple<T>(element, slotSelector, options);
  }

  return querySingle<T>(element, slotSelector, options);
}

export function getElementProp(el: Element, prop: string, fallbackValue: any): any {
  const selector = `[${prop}]`;
  const closest = el.closest(selector);
  return closest ? closest.getAttribute(prop) : fallbackValue;
}

export interface RdsFocusableElement extends HTMLElement {
  setFocus?: () => Promise<void>;
}

export function isRdsFocusable(el: RdsFocusableElement): boolean {
  return typeof el?.setFocus === 'function';
}

export function getBreakpoint(el) {
  if (el.shadowRoot) {
    if (window.getComputedStyle(el.shadowRoot.getElementById('breakpoint'), '::before').content === undefined) {
      return null;
    } else {
      return window.getComputedStyle(el.shadowRoot.getElementById('breakpoint'), '::before').content.replace(/\"/g, '');
    }
  }
}

export type Direction = 'ltr' | 'rtl';

export function getElementDir(el: HTMLElement): Direction {
  const prop = 'dir';
  const selector = `[${prop}]`;
  const closest = closestElementCrossShadowBoundary(el, selector);
  return closest ? (closest.getAttribute(prop) as Direction) : 'ltr';
}

export function getRootNode(el: Element): HTMLDocument | ShadowRoot {
  return el.getRootNode() as HTMLDocument | ShadowRoot;
}

export function getHost(root: HTMLDocument | ShadowRoot): Element | null {
  return (root as ShadowRoot).host || null;
}

function queryMultiple<T extends Element = Element>(element: Element, slotSelector: string, options?: GetSlottedOptions): T[] {
  let matches = Array.from(element.querySelectorAll<T>(slotSelector));
  matches = options && options.direct === false ? matches : matches.filter(el => el.parentElement === element);

  const selector = options?.selector;
  return selector
    ? matches
        .map(item => Array.from(item.querySelectorAll<T>(selector)))
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
        .filter(match => !!match)
    : matches;
}

function querySingle<T extends Element = Element>(element: Element, slotSelector: string, options?: GetSlottedOptions): T | null {
  let match = element.querySelector<T>(slotSelector);
  match = options && options.direct === false ? match : match?.parentElement === element ? match : null;

  const selector = options?.selector;
  return selector ? match.querySelector<T>(selector) : match;
}

// Queries an element's rootNode and any ancestor rootNodes.
// based on https://stackoverflow.com/q/54520554/194216
export function queryElementsRoots<T extends Element = Element>(element: Element, selector: string): T[] {
  // Gets the rootNode and any ancestor rootNodes (shadowRoot or document) of an element and queries them for a selector.
  function queryFromAll<T extends Element = Element>(el: Element, allResults: T[]): T[] {
    if (!el) {
      return allResults;
    }

    if ((el as Slottable).assignedSlot) {
      el = (el as Slottable).assignedSlot;
    }

    const rootNode = getRootNode(el);

    const results = Array.from(rootNode.querySelectorAll(selector)) as T[];

    const uniqueResults = results.filter(result => !allResults.includes(result));

    allResults = [...allResults, ...uniqueResults];

    const host = getHost(rootNode);

    return host ? queryFromAll(host, allResults) : allResults;
  }

  return queryFromAll(element, []);
}

// Queries an element's rootNode and any ancestor rootNodes.
// based on https://stackoverflow.com/q/54520554/194216
export function queryElementRoots<T extends Element = Element>(element: Element, selector: string): T | null {
  // Gets the rootNode and any ancestor rootNodes (shadowRoot or document) of an element and queries them for a selector.
  function queryFrom<T extends Element = Element>(el: Element): T | null {
    if (!el) {
      return null;
    }

    if ((el as Slottable).assignedSlot) {
      el = (el as Slottable).assignedSlot;
    }

    const rootNode = getRootNode(el);

    const found = rootNode.querySelector(selector) as T;

    const host = getHost(rootNode);

    return found ? found : host ? queryFrom(host) : null;
  }

  return queryFrom(element);
}

export function nodeListToArray<T extends Element>(nodeList: HTMLCollectionOf<T> | NodeListOf<T> | T[]): T[] {
  return Array.isArray(nodeList) ? nodeList : Array.from(nodeList);
}
