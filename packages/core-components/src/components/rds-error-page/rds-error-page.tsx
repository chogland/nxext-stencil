import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @slot primary - used to add a primary action button or any other element.
 * @slot secondary - used to add a secondary action button or any other element.
 */

@Component({
  tag: 'rds-error-page',
  styleUrl: 'rds-error-page.scss',
  shadow: true,
})
export class RdsErrorPage {
  /** Renders the content of error page based on the error code also defaults to 404. */
  @Prop() errorCode: number = 404;

  render() {
    return (
      <Host>
        {this.errorCode === 404 ? (
          <div class="error-page">
            <div class="error-view">
              <main class="error-main">
                <p class="error-code">404</p>
                <div class="error-content">
                  <div class="error-text">
                    <h1 class="error-text-primary">Page not found</h1>
                    <p class="error-text-secondary">Please check the URL in the address bar and try again.</p>
                  </div>
                  <div class="error-nav">
                    <slot name="primary" />
                    <slot name="secondary" />
                  </div>
                </div>
              </main>
            </div>
          </div>
        ) : (
          ''
        )}
      </Host>
    );
  }
}
