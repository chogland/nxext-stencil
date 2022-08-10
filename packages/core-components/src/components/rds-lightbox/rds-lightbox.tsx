import { Component, State, h, Element, Prop, Method, Listen } from '@stencil/core';
import { RdsFocusableElement, isRdsFocusable, focusElement } from '../../utils/utils';
import { isFocusable, isHidden } from '@a11y/focus-trap/focusable';
import { queryShadowRoot } from '@a11y/focus-trap/shadow';
import { getKey } from '../../utils/keys';

const isFocusableExtended = (el: RdsFocusableElement): boolean => {
  return isRdsFocusable(el) || isFocusable(el);
};

const getFocusableElements = (el: HTMLElement | ShadowRoot): HTMLElement[] => {
  return queryShadowRoot(el, isHidden, isFocusableExtended);
};

@Component({
  tag: 'rds-lightbox',
  styleUrl: 'rds-lightbox.scss',
  shadow: true,
})
export class RdsLightbox {
  @Element() el: HTMLRdsLightboxElement;

  /**
   * The source url(s) of the image(s)
   */
  @Prop() src: Array<any>;

  /**
   * State for showing the lightbox
   */
  @State() active: boolean;

  /**
   * The list of images inside of the lightbox
   */
  @State() images: Array<any>;

  /**
   * URL of the image that is selected for display in the lightbox.
   */
  @State() currentImageUrl: string;

  /**
   * Caption of the image that is selected for display in the lightbox.
   */
  @State() currentImageCaption: string;

  /**
   * Alt of the image that is selected for display in the lightbox.
   */
  @State() currentImageAlt: string;

  /**
   * Title of the image that is selected for display in the lightbox.
   */
  @State() currentImageTitle: string;

  /**
   * Detail of the image that is selected for display in the lightbox.
   */
  @State() currentImageDetail: string;

  /**
   * Detail of the image that is selected for display in the lightbox.
   */
  @State() currentImageShowHeadline: string;

  /**
   * Thumbnail setting for rdsimage.
   */
  @State() currentImageThumbnail: string;

  /**
   * Thumbnail setting for rdsimage.
   */
  @State() currentImageSize: string;
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

  closeButtonEl: HTMLButtonElement;

  previousActiveElement: HTMLElement;

  containerElement: HTMLElement;

  currentIndex: number;

  lightboxOpen(event, index) {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.currentImageUrl = event.target.src;
    this.currentImageCaption = event.target.caption;
    this.currentImageAlt = event.target.alt;
    this.currentImageTitle = event.target.headline;
    this.currentImageDetail = event.target.detail;
    this.currentImageShowHeadline = event.target.showHeadline;
    this.currentImageThumbnail = event.target.thumbnail;
    this.currentImageSize = event.target.size;
    this.active = true;
    this.currentIndex = index;
    this.setFocus();
    document.querySelector('body').setAttribute('style', 'overflow: hidden;');
  }

  lightboxClose() {
    this.currentImageUrl = null;
    this.currentImageCaption = null;
    this.currentImageAlt = null;
    this.currentImageTitle = null;
    this.currentImageDetail = null;
    this.currentImageShowHeadline = null;
    this.currentImageThumbnail = null;
    this.currentImageSize = null;
    this.active = false;
    focusElement(this.previousActiveElement);
    document.querySelector('body').setAttribute('style', 'overflow: auto;');
  }

  next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
    if (this.src) {
      this.currentImageUrl = this.images[this.currentIndex];
    } else {
      this.currentImageUrl = this.images[this.currentIndex].src;
      this.currentImageCaption = this.images[this.currentIndex].caption;
      this.currentImageAlt = this.images[this.currentIndex].alt;
      this.currentImageTitle = this.images[this.currentIndex].headline;
      this.currentImageDetail = this.images[this.currentIndex].detail;
      this.currentImageShowHeadline = this.images[this.currentIndex].showHeadline;
      this.currentImageThumbnail = this.images[this.currentIndex].thumbnail;
      this.currentImageSize = this.images[this.currentIndex].size;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }

    if (this.src) {
      this.currentImageUrl = this.images[this.currentIndex];
    } else {
      this.currentImageUrl = this.images[this.currentIndex].src;
      this.currentImageCaption = this.images[this.currentIndex].caption;
      this.currentImageAlt = this.images[this.currentIndex].alt;
      this.currentImageTitle = this.images[this.currentIndex].headline;
      this.currentImageDetail = this.images[this.currentIndex].detail;
      this.currentImageShowHeadline = this.images[this.currentIndex].showHeadline;
      this.currentImageThumbnail = this.images[this.currentIndex].thumbnail;
      this.currentImageSize = this.images[this.currentIndex].size;
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

  componentWillLoad() {
    if (this.src) {
      this.images = this.src;
    } else {
      let rdsLightbox = this.el;
      this.images = [].slice.call(rdsLightbox.getElementsByTagName('rds-image'));
      this.currentIndex = 0;
    }
  }

  @Listen('keydown') lightboxKeyHandler(event: KeyboardEvent): void {
    if (event.target === this.el) {
      switch (getKey(event.key)) {
        case 'ArrowLeft':
        case 'Home':
          this.previous();
          event.preventDefault();
          break;
        case 'End':
        case 'ArrowRight':
          this.next();
          event.preventDefault();
          break;
        case 'Escape':
          this.lightboxClose();
          event.preventDefault();
          break;
      }
    }
  }

  keyDownHandler(event: KeyboardEvent, index: any): void {
    switch (getKey(event.key)) {
      case ' ':
      case 'Enter':
        this.lightboxOpen(event, index);
        event.preventDefault();
        break;
    }
  }

  renderLightboxContainer() {
    return (
      <div>
        {this.active ? (
          <div id="lightbox-container">
            <div data-focus-fence onFocus={this.focusFirstElement} tabindex="0" />
            <div class="lightbox-header">
              <div
                class="close"
                id="close-button"
                onClick={() => {
                  this.lightboxClose();
                }}
              >
                <rds-icon icon="rds-close"></rds-icon>
              </div>
              <div class="title">
                {this.currentImageTitle}
                <div class="subtitle">{this.currentImageDetail}</div>
              </div>
            </div>
            <div class="lightbox-body">
              {this.images.length > 1 ? (
                <div
                  class="previous"
                  onClick={() => {
                    this.previous();
                  }}
                >
                  <rds-icon icon="rds-chevron-left"></rds-icon>
                </div>
              ) : null}

              {this.images.length > 1 ? (
                <div
                  class="next"
                  onClick={() => {
                    this.next();
                  }}
                >
                  <rds-icon icon="rds-chevron-right"></rds-icon>
                </div>
              ) : null}
              <rds-image src={this.currentImageUrl} alt={this.currentImageAlt} detail={this.currentImageDetail} headline={this.currentImageTitle} class="rds-image" />
              <div class="caption">{this.currentImageCaption}</div>
            </div>
            <div data-focus-fence onFocus={this.focusLastElement} tabindex="0" />
          </div>
        ) : null}
      </div>
    );
  }

  render() {
    return [
      <div class="lightbox-images-wrapper">
        {!this.src && !this.images ? (
          <div />
        ) : (
          <div id="images" style={{ overflow: 'auto' }}>
            {this.images.map((image, index) => (
              <rds-image
                tabindex="0"
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                headline={image.headline}
                detail={image.detail}
                showHeadline={image.showHeadline}
                thumbnail={image.thumbnail}
                size={image.size}
                interactive
                class="rds-image"
                onKeyPress={event => {
                  this.keyDownHandler(event, index);
                }}
                onClick={event => {
                  this.lightboxOpen(event, index);
                }}
              />
            ))}
          </div>
        )}
      </div>,
      this.renderLightboxContainer(),
    ];
  }
}
