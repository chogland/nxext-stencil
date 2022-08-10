import { newSpecPage } from '@stencil/core/testing';
import { RdsSpinner } from '../rds-spinner';

describe('rds-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsSpinner],
      html: `<rds-spinner></rds-spinner>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-spinner role="status" size="md">
        <mock:shadow-root>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="sr-only">
          Loading...
          </span>
        </mock:shadow-root>
      </rds-spinner>
    `);
  });
});
