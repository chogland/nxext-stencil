import { newSpecPage } from '@stencil/core/testing';
import { RdsAction } from '../rds-action';
import { h } from '@stencil/core';

describe('rds-action', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsAction],
      html: `<rds-action></rds-action>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-action text-enabled="">
        <mock:shadow-root>
          <button aria-disabled="false" class="action-button"></button>
        </mock:shadow-root>
      </rds-action>
    `);
  });
  it('renders with Text', async () => {
    const page = await newSpecPage({
      components: [RdsAction],
      template: () => <rds-action text="text1"></rds-action>,
    });
    expect(page.root).toEqualHtml(`
      <rds-action text-enabled="">
        <mock:shadow-root>
          <button aria-disabled="false" aria-label="text1" class="action-button">
              <div class="text-container text-container--visible">text1</div>
          </button>
        </mock:shadow-root>
      </rds-action>
    `);
  });

  it('renders with icon', async () => {
    const page = await newSpecPage({
      components: [RdsAction],
      template: () => <rds-action text="text1" icon="view-grid"></rds-action>,
    });
    expect(page.root).toEqualHtml(`
      <rds-action text-enabled="">
        <mock:shadow-root>
          <button aria-disabled="false" aria-label="text1" class="action-button">
            <div aria-hidden="true" title="text1">
              <rds-hero-icon name="view-grid"></rds-hero-icon>
              <div>
                <slot></slot>
               </div>
            </div>          
            <div class="text-container text-container--visible">text1</div>
          </button>
        </mock:shadow-root>
      </rds-action>
    `);
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsAction],
      html: `<rds-action></rds-action>`,
    });
    await page.waitForChanges();
    let clickEle = page.root;
    let onClickFn = jest.fn();

    page.doc.addEventListener('rdsActionClick', onClickFn);

    await clickEle.click();
    await page.waitForChanges();

    expect(onClickFn).toHaveBeenCalled();
  });
});
