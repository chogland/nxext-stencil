import { Component, ComponentInterface, Element, Event, EventEmitter, Host, h, Method, Prop, Watch, Listen, VNode } from '@stencil/core';
import { HeadlineLevel, PanelPosition, PanelChangeEventDetail, PanelI } from '../interfaces';
import { getSlotted } from '../../utils/dom';
import { panelController } from '../../utils/panel-controller/panel-controller';

/**
 * @slot action-text - Use this slot to add text to describe the actions in your panel. Panel actions remain fixed to the top part of panel, underneath the headline's slot (if provided).
 * @slot action-primary - Use this slot to add a primary action to your panel. Panel actions remain fixed to the top part of panel, underneath the headline's slot (if provided).
 * @slot action-secondary - Use this slot to add a secondary action to your panel. Panel actions remain fixed to the top part of panel, underneath the headline's slot (if provided).
 * @slot headline - Use this slot to add a custom headline and/or header components to the top of your panel.
 * @slot panel-details - Use this slot to add content to the body of your panel. You may create multiple slots using the name 'panel-details' to keep your content organized.
 * @slot panel-footer - The panel-footer slot is a fixed region for additional panel details that shouldn't scroll with panel contents.
 * @part action - The container for `action-text`, `action-primary` and `action-secondary`.
 * @part container - The container for `panel-details`.
 */

@Component({
  tag: 'rds-panel',
  styleUrl: 'rds-panel.scss',
  shadow: true,
})
export class RdsPanel implements ComponentInterface, PanelI {
  _isOpen = false;

  panelInnerEl?: HTMLElement;
  contentEl?: HTMLElement;
  hasHeader = document.getElementsByTagName('rds-header')[0] as HTMLRdsHeaderElement;

  @Element() el!: HTMLRdsPanelElement;

  /**
   * Sets the ID of the panel.
   */
  @Prop() panelId?: string;

  /**
   * Sets the panel's title.
   */
  @Prop({ reflect: true }) panelTitle?: string;

  /**
   * Removes padding inside the panel.
   */
  @Prop() noPadding?: boolean = false;

  /**
   * When position is set to fixed, the panel will overlay content.
   * Set position to 'push' to set display to inline-block;
   */
  @Prop({ reflect: true }) position: PanelPosition = 'fixed';

  /**
   * If `true`, the panel will display a close button in the top right corner.
   */
  @Prop({ reflect: true }) closeButton: boolean = true;

  /**
   * If `true`, the panel is disabled.
   */
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;

  /**
   * If `true`, a fixed panel will disable the body scrollbar when open.
   */
  @Prop() disableBodyScroll: boolean = true;

  /**
   * Sets the panel's headline level.
   */
  @Prop() level: HeadlineLevel = 5;

  /**
   * If `true`, the panel to span 1/2 width of screen.
   */
  @Prop() wide: boolean = false;

  @Watch('disabled')
  disabledChanged() {
    this.updateState();
    this.rdsPanelChange.emit({
      disabled: this.disabled,
      open: this._isOpen,
    });
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      this.updateState();
    }
  }

  /**
   * Emitted when the panel is about to be opened.
   */
  @Event() rdsWillOpen!: EventEmitter<void>;

  /**
   * Emitted when the panel is about to be closed.
   */
  @Event() rdsWillClose!: EventEmitter<void>;

  /**
   * Emitted when the panel is open.
   */
  @Event() rdsDidOpen!: EventEmitter<void>;

  /**
   * Emitted when the panel is closed.
   */
  @Event() rdsDidClose!: EventEmitter<void>;

  /**
   * Emitted when the panel state is changed.
   */
  @Event() protected rdsPanelChange!: EventEmitter<PanelChangeEventDetail>;

  connectedCallback() {
    // Registers this panel with the app's panel controller
    panelController._register(this);
    this.handlePanel();
  }

  componentWillLoad() {
    if (this.wide == true && this.position == 'push') this.position = 'fixed';
    this.rdsPanelChange.emit({ disabled: this.disabled, open: this._isOpen });
    this.updateState();
  }

  disconnectedCallback() {
    this.close();
    // Unregisters this panel with the app's panel controller
    panelController._unregister(this);
    this.contentEl = this.panelInnerEl = undefined;
  }

  /**
   * Returns `true` if the panel is open.
   */
  @Method()
  isOpen(): Promise<boolean> {
    return panelController.isOpen(this.panelId);
  }

  /**
   * Returns `true` if the panel is active.
   */
  @Method()
  isActive(): Promise<boolean> {
    return Promise.resolve(this._isActive());
  }

  /**
   * Opens the panel.
   */
  @Method()
  open(): Promise<boolean> {
    return this.setOpen(true);
  }

  /**
   * Closes the panel.
   */
  @Method()
  close(): Promise<boolean> {
    return this.setOpen(false);
  }

  /**
   * Toggles the panel. If the panel is already open, it will try to close, otherwise it will try to open it.
   * If the operation can't be completed successfully, it returns `false`.
   */
  @Method()
  toggle(): Promise<boolean> {
    this._isOpen = !this._isOpen;
    this.disabled = !this.disabled;
    return this.setOpen(this._isOpen);
  }

  /**
   * Opens or closes the panel.
   * If the operation can't be completed successfully, it returns `false`.
   */
  @Method()
  setOpen(shouldOpen: boolean): Promise<boolean> {
    return panelController._setOpen(this, shouldOpen);
  }

  handlePanel() {
    // Handles the fixed positioning of the panel depending on layout & header type
    if (this.hasHeader !== undefined) {
      setTimeout(() => {
        const headerHeight = this.hasHeader.offsetHeight;
        let cssText: any = 'height: calc(100vh - ' + headerHeight.toString() + 'px); top: ' + headerHeight + 'px; ' + 'opacity: 1;';
        this.el.style.cssText = cssText;
      }, 500);
    } else {
      let cssText: any = 'height: 100vh; top: 0px; opacity: 1;';
      this.el.style.cssText = cssText;
    }
  }

  async _setOpen(shouldOpen: boolean) {
    if (!this._isActive() || shouldOpen === this._isOpen) {
      this.rdsWillClose.emit();
      return false;
    }
    this.rdsWillOpen.emit();
    return true;
  }

  private _isActive() {
    return !this.disabled;
  }

  private updateState() {
    const isActive = this._isActive();
    if (isActive && !this.disabled) {
      panelController._setActivePanel(this);
      this._isOpen = true;
      this.rdsDidOpen.emit();
      // Hides body scrollbar if position is fixed
      if (this.position === 'fixed' && this.disableBodyScroll) {
        document.documentElement.style.overflow = 'hidden';
      }
    } else {
      // Closes if this menu is already open
      this.disabled = true;
      this._isOpen = false;
      this.rdsDidClose.emit();
      // Unhides body scrollbar if position is fixed
      if (this.position === 'fixed' && this.disableBodyScroll) {
        document.documentElement.style.overflow = 'auto';
      }
    }
  }

  renderActionArea(): VNode {
    const { el } = this;

    const hasActions = getSlotted(el, 'action-text' || 'action-secondary' || 'action-primary');

    return hasActions ? (
      <div part="action" class="action">
        <slot name="action-text"></slot>
        <slot name="action-secondary"></slot>
        <slot name="action-primary"></slot>
      </div>
    ) : null;
  }

  render() {
    const { disabled, noPadding, wide } = this;
    return (
      <Host
        class={{
          'panel-enabled': !disabled,
          'no-padding': noPadding,
          'wide': wide,
        }}
        tabindex={disabled ? '-1' : null}
      >
        <div class="header">
          {this.panelTitle != undefined ? (
            <rds-headline level={this.level} class="headline text-inherit">
              {this.panelTitle}
            </rds-headline>
          ) : (
            <slot name="headline" />
          )}

          {this.closeButton ? (
            <rds-panel-toggle auto-hide="false" class="close-button">
              <rds-button appearance="tertiary" label="Close Panel">
                <rds-icon icon="rds-close"></rds-icon>
              </rds-button>
            </rds-panel-toggle>
          ) : null}
        </div>
        {this.renderActionArea()}
        <div part="container" class="inner-wrapper" ref={el => (this.panelInnerEl = el)}>
          <slot name="panel-details"></slot>
          <slot></slot>
        </div>
        <div class="panel-footer">
          <slot name="panel-footer" />
        </div>
      </Host>
    );
  }
}
