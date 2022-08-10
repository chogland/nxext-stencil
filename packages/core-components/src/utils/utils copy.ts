export function setRingOffsetUtil(rootEl: Element, shadowRootEl: HTMLElement): any {
  let bgColor: string = 'white';
  let closest: Element = rootEl.closest('*').parentElement;

  if (closest) {
    // Get background color from element
    bgColor = window.getComputedStyle(closest).getPropertyValue('background-color');

    if (bgColor !== 'rgba(0, 0, 0, 0)') {
      // Element has a background color, set it as ring offset color
      shadowRootEl.style.setProperty('--tw-ring-offset-color', bgColor);
      return;
    } else {
      if (closest.shadowRoot && closest.shadowRoot.children) {
        // Element has shadowroot; recursion
        for (let i = 0; i < closest.shadowRoot.children.length; i++) {
          bgColor = window.getComputedStyle(closest.shadowRoot.children[i]).getPropertyValue('background-color');
          if (bgColor !== 'rgba(0, 0, 0, 0)') {
            shadowRootEl.style.setProperty('--tw-ring-offset-color', bgColor);
            return;
          }
        }
      }

      if (closest.closest('*').parentElement) {
        // Check element's parent for background color
        setRingOffsetUtil(closest, shadowRootEl);
      } else {
        // Element's parent does not exist
        if (bgColor === 'rgba(0, 0, 0, 0)') {
          // Set ring offset to white
          shadowRootEl.style.setProperty('--tw-ring-offset-color', 'white');
          return;
        }
      }
    }
  }
}

export const colorMap: Object = {
  'black': '#000',
  'white': '#fff',
  'gray-900': '#111827',
  'gray-800': '#1f2937',
  'gray-700': '#374151',
  'gray-600': '#4b5563',
  'gray-500': '#6b7280',
  'gray-400': '#9ca3af',
  'gray-300': '#d1d5db',
  'gray-200': '#e5e7eb',
  'gray-100': '#f3f4f6',
  'gray-50': '#f9fafb',
  'purple-900': '#4c1d95',
  'purple-800': '#5b21b6',
  'purple-700': '#6d28d9',
  'purple-600': '#7c3aed',
  'purple-500': '#8b5cf6',
  'purple-400': '#a78bfa',
  'purple-300': '#c4b5fd',
  'purple-200': '#ddd6fe',
  'purple-100': '#ede9fe',
  'purple-50': '#f5f3ff',
  'blue-900': '#1e3a8a',
  'blue-800': '#1e40af',
  'blue-700': '#1d4ed8',
  'blue-600': '#2563eb',
  'blue-500': '#3b82f6',
  'blue-400': '#60a5fa',
  'blue-300': '#93c5fd',
  'blue-200': '#bfdbfe',
  'blue-100': '#dbeafe',
  'blue-50': '#eff6ff',
  'green-900': '#064e3b',
  'green-800': '#065f46',
  'green-700': '#047857',
  'green-600': '#059669',
  'green-500': '#10b981',
  'green-400': '#34d399',
  'green-300': '#6ee7b7',
  'green-200': '#a7f3d0',
  'green-100': '#d1fae5',
  'green-50': '#ecfdf5',
  'yellow-900': '#78350f',
  'yellow-800': '#92400e',
  'yellow-700': '#b45309',
  'yellow-600': '#d97706',
  'yellow-500': '#f59e0b',
  'yellow-400': '#fbbf24',
  'yellow-300': '#fcd34d',
  'yellow-200': '#fde68a',
  'yellow-100': '#fef3c7',
  'yellow-50': '#fffbeb',
  'red-900': '#7f1d1d',
  'red-800': '#991b1b',
  'red-700': '#b91c1c',
  'red-600': '#dc2626',
  'red-500': '#ef4444',
  'red-400': '#f87171',
  'red-300': '#fca5a5',
  'red-200': '#fecaca',
  'red-100': '#fee2e2',
  'red-50': '#fef2f2',
};

export function getColor(c: string) {
  return colorMap[c];
}

export const spacingMap: Object = {
  'sm': '0.125rem',
  'md': '0.25rem',
  'lg': '0.5rem',
  'xl': '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  '4xl': '2.5rem',
  '5xl': '3rem',
  'auto': 'auto',
  '0': '0',
};

export function getSpacing(s: string) {
  return spacingMap[s];
}

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function getElementProp(el: Element, prop: string, fallbackValue: any): any {
  const selector = `[${prop}]`;
  const closest = el.closest(selector);
  return closest ? closest.getAttribute(prop) : fallbackValue;
}

export const hostContext = (selector: string, el: HTMLElement): boolean => {
  return el.closest(selector) !== null;
};
export interface RdsFocusableElement extends HTMLElement {
  setFocus?: () => Promise<void>;
}

export function isRdsFocusable(el: RdsFocusableElement): boolean {
  return typeof el?.setFocus === 'function';
}

export async function focusElement(el: RdsFocusableElement): Promise<void> {
  if (!el) {
    return;
  }

  return isRdsFocusable(el) ? el.setFocus() : el.focus();
}

function gen(counts: number[]): string {
  return counts
    .map(count => {
      let out = '';
      for (let i = 0; i < count; i++) {
        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return out;
    })
    .join('-');
}

export const guid = (): string => gen([2, 1, 1, 1, 3]);
