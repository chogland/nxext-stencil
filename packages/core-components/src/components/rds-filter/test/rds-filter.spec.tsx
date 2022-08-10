import { newSpecPage } from '@stencil/core/testing';
import { RdsFilter } from '../rds-filter';

describe('rds-filter', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsFilter],
      html: `<rds-filter label="filter"></rds-filter>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
    <rds-filter aria-label="filter" label="filter" role="search" style="display: none;">
       <mock:shadow-root>
         <div class="filter-mobile-close-container">
           <span>
             Filters
           </span>
           <rds-button appearance="tertiary" label="Close Filters">
             <rds-icon icon="rds-close"></rds-icon>
           </rds-button>
         </div>
         <div class="filter-list-container">
           <slot name="filter-list"></slot>
         </div>
         <div class="filter-mobile-footer-container">
           <div class="filter-mobile-results"></div>
           <div class="filter-mobile-buttons">
             <slot name="clear-filter"></slot>
             <slot name="submit-filter"></slot>
           </div>
         </div>
        </mock:shadow-root>
      </rds-filter>
    `);
  });
  it('it will show action on hover', async () => {
    await page.waitForChanges();
    let button = page.root.shadowRoot.querySelector('rds-button');

    button.dispatchEvent(new Event('click'));
    await page.waitForChanges();

    expect(page.root.getAttribute('style')).toBe('display: block;');
  });
});
