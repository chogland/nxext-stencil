import { Component, Host, h, Prop, Event, EventEmitter, Method, Element, Watch, Listen, State } from '@stencil/core';
import { getKey } from '../../utils/keys';
import { RdsFocusableElement, isRdsFocusable, focusElement } from '../../utils/utils';
import { isFocusable, isHidden } from '@a11y/focus-trap/focusable';
import { queryShadowRoot } from '@a11y/focus-trap/shadow';
import { getSlotted } from '../../utils/dom';

const isFocusableExtended = (el: RdsFocusableElement): boolean => {
  return isRdsFocusable(el) || isFocusable(el);
};

const getFocusableElements = (el: HTMLElement | ShadowRoot): HTMLElement[] => {
  return queryShadowRoot(el, isHidden, isFocusableExtended);
};

/**
 * @slot icon - A slot for a `RdsHeroIcon` to be placed.
 * @slot primary - A slot for the primary action, recommend using an `RdsButton` or `RdsLink` here.
 * @slot secondary - A slot for the secondary action, recommend using an `RdsButton` or `RdsLink` here.
 * @slot headline - A slot for the modal title. This allows for custom headlines using HTML.
 */

@Component({
  tag: 'rds-modal',
  styleUrl: 'rds-modal.scss',
  shadow: true,
})
export class RdsModal {
  @Element() el: HTMLRdsModalElement;
  /**
   * The text displayed as the headline of the modal.
   * You can optionally pass in HTML for headline by using the headline slot.
   */
  @Prop() headline: string;

  /** Disables the closing of the Modal when clicking the overlay. */
  @Prop({ attribute: 'disableoverlayclose' }) disableOverlayClose?: boolean;

  /** Hides the close button in the top right of the modal to focus user to the action buttons. */
  @Prop({ reflect: true, mutable: true, attribute: 'closebutton' }) closeButton?: boolean = true;

  /** Used to disable the default close on escape press. */
  @Prop({ attribute: 'disableescape' }) disableEscape?: boolean;

  /**
   * This sets the visiblity of the modal.
   */
  @Prop({ mutable: true, reflect: true }) visible: boolean = false;

  /**
   * If true, the modal is in fullscreen mode.
   */
  @Prop() fullScreen: boolean = false;

  /**
   * Accessible label for Modal to use in the aria-label.
   */
  @Prop() label?: string;

  /** Optionally pass a function to run before close */
  @Prop() beforeClose: (el: HTMLElement) => Promise<void> = () => Promise.resolve();

  @State() hasFooter = true;

  closeButtonEl: HTMLButtonElement;

  previousActiveElement: HTMLElement;

  /**
   * Event emitted when modal is closed.
   */
  @Event() modalClosed: EventEmitter;

  /**
   * Event emitted when modal is opened.
   */
  @Event() modalOpened: EventEmitter;

  @Listen('keyup', { target: 'window' })
  handleEscape(e: KeyboardEvent): void {
    if (this.visible && !this.disableEscape && getKey(e.key) === 'Escape') {
      this.close();
    }
  }

  /**
   * Focus first interactive element
   */
  @Method()
  async focusElement(el?: HTMLElement): Promise<void> {
    if (el) {
      el.focus();
    }

    return this.setFocus();
  }

  /**
   * Sets focus on the component.
   *
   * By default, will try to focus on any focusable content. If there is none, it will focus on the close button.
   * If you want to focus on the close button, you can use the `close-button` focus ID.
   */
  @Method()
  async setFocus(focusId?: 'close-button'): Promise<void> {
    const closeButton = this.closeButtonEl;
    return focusElement(focusId === 'close-button' ? closeButton : getFocusableElements(this.el)[0] || closeButton);
  }

  private open() {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.el.classList.add('active');
    this.visible = true;
    this.modalOpened.emit();
    this.setFocus();
    document.documentElement.style.overflow = 'hidden';
  }

  @Method()
  async openModal(): Promise<any> {
    this.open();
  }

  @Method()
  async closeModal(): Promise<any> {
    this.close();
  }

  /** Close the modal, first running the `beforeClose` method */
  close = (): Promise<void> => {
    return this.beforeClose(this.el).then(() => {
      this.el.classList.remove('active');
      setTimeout(() => {
        this.el.classList.add('hide');
      }, 300);
      this.visible = false;
      this.modalClosed.emit('closed');
      focusElement(this.previousActiveElement);
      this.removeOverflowHiddenClass();
    });
  };

  @Watch('visible')
  watchVisibleHandler(isVisible: boolean) {
    if (isVisible) {
      this.openModal();
    } else {
      this.close();
    }
  }

  focusFirstElement = (): void => {
    const focusableElements = getFocusableElements(this.el).filter(el => !el.getAttribute('data-focus-fence'));
    if (focusableElements.length > 0) {
      focusElement(focusableElements[focusableElements.length - 1]);
    } else {
      focusElement(this.closeButtonEl);
    }
  };

  focusLastElement = (): void => {
    const focusableElements = getFocusableElements(this.el).filter(el => !el.getAttribute('data-focus-fence'));
    if (focusableElements.length > 0) {
      focusElement(focusableElements[focusableElements.length - 1]);
    } else {
      focusElement(this.closeButtonEl);
    }
  };

  connectedCallback(): void {
    this.updateFooterVisibility();
  }

  disconnectedCallback(): void {
    this.removeOverflowHiddenClass();
  }

  handleOverlayClose = (): void => {
    if (this.disableOverlayClose) {
      return;
    } else {
      this.close();
    }
  };

  render() {
    return (
      <Host
        class={{
          active: this.visible,
          hide: !this.visible,
          fullscreen: this.fullScreen,
        }}
        aria-label={this.label}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        data-focus-fence
        //onFocus={this.closeButton ? this.setFocus('close-button') : this.focusFirstElement}
      >
        <div class="modal-inner">
          <div class="modal-overlay" tabindex="-1" onClick={() => this.handleOverlayClose()} aria-hidden="true"></div>
          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span class="modal-center-trick" aria-hidden="true">
            &#8203;
          </span>
          <div class="modal-panel">
            <div class="modal-panel-inner">
              {this.renderIcon()}
              <div class="modal-content-outer">
                <div class="modal-title">
                  <h3 id="modal-title">{this.headline ? this.headline : <slot name="headline"></slot>}</h3>
                  {this.renderCloseButton()}
                </div>
                <div class="modal-content">
                  <slot />
                </div>
              </div>
            </div>
            {this.renderFooter()}
          </div>
        </div>
      </Host>
    );
  }

  renderCloseButton() {
    return this.closeButton ? (
      <button ref={el => (this.closeButtonEl = el)} tabindex={this.visible ? 0 : -1} class="modal-close" id="close-button" aria-label="Close modal" onClick={() => this.close()}>
        <rds-hero-icon name="x" size="md"></rds-hero-icon>
      </button>
    ) : null;
  }

  renderFooter() {
    return this.hasFooter ? (
      <div class="modal-actions">
        <div class="primary">
          <slot name="primary" />
        </div>
        <div class="secondary">
          <slot name="secondary" />
        </div>
      </div>
    ) : null;
  }

  renderIcon() {
    const hasIcon = getSlotted(this.el, 'icon');

    return hasIcon ? (
      <div class="modal-icon">
        <slot name="icon" />
      </div>
    ) : null;
  }

  private updateFooterVisibility = (): void => {
    this.hasFooter = !!this.el.querySelector('[slot=secondary], [slot=primary]');
  };

  private removeOverflowHiddenClass(): void {
    document.documentElement.style.overflow = 'auto';
  }
}
