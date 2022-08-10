import { newSpecPage } from '@stencil/core/testing';
import { RdsAlert } from '../rds-alert';
import { h } from '@stencil/core';

describe('rds-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsAlert],
      html: `<rds-alert></rds-alert>`,
    });
    expect(page.root).toEqualHtml(`
        <rds-alert appearance="info" aria-live="polite" label="Alert primary action" role="alert">
        <mock:shadow-root>
          <rds-hero-icon class="icon" name="information-circle" size="lg"></rds-hero-icon>
          <div class="alert-text">
            <slot name="title"></slot>
            <div class="alert-message">
              <slot name="message"></slot>
            </div>
          </div>
          <div class="break"></div>
          <div class="alert-actions">
            <button aria-label="dismiss" class="action action-dismiss">
              Dismiss
            </button>
          </div>
        </mock:shadow-root>
      </rds-alert>
    `);
  });
  describe('render with button', () => {
    let page, shadowRoot;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [RdsAlert],
        template: () => (
          <rds-alert appearance="warning" visible>
            <span slot="title">Attention needed</span>
            <span slot="message">Test Message</span>
            <span slot="action-text">View Status</span>
          </rds-alert>
        ),
      });
      shadowRoot = page.root.shadowRoot;
    });

    it('will emit an rdsActionClick on click of  action text', async () => {
      await page.waitForChanges();
      let acitonBtn = shadowRoot.querySelector('.action-primary');
      let onClickFn = jest.fn();
      page.doc.addEventListener('rdsActionClick', onClickFn);

      await acitonBtn.click();
      await page.waitForChanges();

      expect(onClickFn).toHaveBeenCalled();
    });

    it('will emit an rdsAlertDismiss on click of  dismiss text', async () => {
      await page.waitForChanges();
      let acitonBtn = shadowRoot.querySelector('.action-dismiss');
      let onClickFn = jest.fn();
      page.doc.addEventListener('rdsAlertDismiss', onClickFn);

      await acitonBtn.click();
      await page.waitForChanges();

      expect(page.root.visible).toBeFalsy();
    });
  });
});
