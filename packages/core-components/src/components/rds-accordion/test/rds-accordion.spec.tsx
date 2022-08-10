import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { RdsAccordionItem } from '../../rds-accordion-item/rds-accordion-item';
import { RdsAccordion } from '../rds-accordion';

describe('rds-accordion', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsAccordion],
      html: `<rds-accordion></rds-accordion>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-accordion selectionmode="multi">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rds-accordion>
    `);
  });
});

describe('rds-accordion', () => {
  let page;
  it('renders with rdsAccordionItem', async () => {
    page = await newSpecPage({
      components: [RdsAccordion, RdsAccordionItem],
      template: () => (
        <rds-accordion>
          <rds-accordion-item></rds-accordion-item>
        </rds-accordion>
      ),
    });
    expect(page.root).toEqualHtml(`
      <rds-accordion selectionmode="multi">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
            <rds-accordion-item aria-expanded="false" tabindex="0">
            <mock:shadow-root>
              <div>
                <div class="accordion-item-header">
                  <div class="accordion-item-header-text">
                    <span class="accordion-item-title"></span>
                  </div>
                  <rds-hero-icon  class="accordion-item-expand-icon" name="chevron-down" size="lg"></rds-hero-icon>
                </div>
                <div class="accordion-item-content padded">
                  <slot></slot>
                </div>
              </div>
            </mock:shadow-root>
          </rds-accordion-item>
      </rds-accordion>
    `);
  });

  it('will emit rdsAccordionChange on call of rdsAccordionItemSelect event', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsAccordionChange', eventHandler);
    await page.root.dispatchEvent(
      new CustomEvent('rdsAccordionItemSelect', {
        detail: {
          requestedAccordionItem: '',
        },
      }),
    );
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});
