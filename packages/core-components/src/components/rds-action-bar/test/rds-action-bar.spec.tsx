import { newSpecPage } from '@stencil/core/testing';
import { RdsActionBar } from '../rds-action-bar';

describe('rds-action-bar', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsActionBar],
      html: `<rds-action-bar></rds-action-bar>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-action-bar collapsible="">
        <mock:shadow-root>
          <div class="top-group">
            <slot></slot>
          </div>
          <div class="bottom-group">
            <slot name="bottom-action"></slot>
            <rds-divider spacing="none"></rds-divider>
            <rds-action icon="chevron-left" label="Collapse" text="Collapse" textenabled=""></rds-action>
          </div>
        </mock:shadow-root>
      </rds-action-bar>
    `);
  });

  it('will toggle expanded onclick', async () => {
    await page.waitForChanges();
    let actionButton = page.root.shadowRoot.querySelector('rds-action');
    let onClickFn = jest.fn();

    page.doc.addEventListener('rdsActionBarToggle', onClickFn);

    await actionButton.click();
    await page.waitForChanges();

    expect(onClickFn).toHaveBeenCalled();
  });
});
