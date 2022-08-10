import { newSpecPage } from '@stencil/core/testing';
import { RdsPagination } from '../rds-pagination';

describe('rds-pagination', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsPagination],
      html: `<rds-pagination start=1 total=100 items=10></rds-pagination>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-pagination start=1 total=100 items=10>
        <mock:shadow-root>
        <rds-button appearance="tertiary" aria-label="Previous" class="disabled previous" disabled="">
          Previous
        </rds-button>
        <div class="page-count">
          <div class="page">
            1-10
          </div>
          <div class="page">
            of&nbsp;100
          </div>
        </div>
        <rds-button appearance="tertiary" aria-label="Next" class="next">
          Next
        </rds-button>
        </mock:shadow-root>
      </rds-pagination>
    `);
  });

  it('it will goto previious page on click of next button', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsPaginationChange', eventHandler);
    let element = page.root.shadowRoot.querySelector('.next');
    element.click();
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
    expect(page.root.shadowRoot.querySelector('.page').innerText).toBe('11-20');
    expect(page.root.shadowRoot.querySelector('.previous').getAttribute('class')).toBe('previous');
  });

  it('it will goto previious page on click of previous button', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsPaginationChange', eventHandler);
    let element = page.root.shadowRoot.querySelector('.next');
    element.click();
    element = page.root.shadowRoot.querySelector('.previous');
    element.click();
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
    expect(page.root.shadowRoot.querySelector('.page').innerText).toBe('1-10');
    expect(page.root.shadowRoot.querySelector('.previous').getAttribute('class')).toBe('previous disabled');
  });
});
