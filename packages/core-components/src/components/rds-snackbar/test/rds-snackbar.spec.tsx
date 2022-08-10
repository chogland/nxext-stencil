import { newSpecPage } from '@stencil/core/testing';
import { RdsSnackbar } from '../rds-snackbar';

describe('rds-snackbar', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsSnackbar],
      html: `<rds-snackbar></rds-snackbar>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
    <rds-snackbar appearance="info" aria-live="assertive" role="alert">
      <mock:shadow-root>
        <rds-hero-icon class="icon" name="information-circle" size="lg"></rds-hero-icon>
        <div class="message">
          <slot></slot>
        </div>
        <button aria-label="close" class="action">
          <rds-hero-icon class="icon" name="x" size="md"></rds-hero-icon>
        </button>
        </mock:shadow-root>
      </rds-snackbar>
    `);
  });

  it('will make visible false on keydownEvent', async () => {
    await page.waitForChanges();
    await page.root.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );
    await page.waitForChanges();
    expect(page.root.visible).toBeFalsy();
  });

  it('will make visible false on click', async () => {
    await page.waitForChanges();
    let btnEle = page.root.shadowRoot.querySelector('.action');
    await btnEle.click();
    await page.waitForChanges();
    expect(page.root.visible).toBeFalsy();
  });
});
