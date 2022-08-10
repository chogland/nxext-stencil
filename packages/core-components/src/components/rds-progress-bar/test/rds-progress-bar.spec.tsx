import { newSpecPage } from '@stencil/core/testing';
import { RdsProgressBar } from '../rds-progress-bar';

describe('rds-progress-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsProgressBar],
      html: `<rds-progress-bar></rds-progress-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-progress-bar aria-label="Progress Bar" aria-valuenow="0" role="progressbar" value="0">
        <mock:shadow-root>
          <div style="width: 0%;"></div>
        </mock:shadow-root>
      </rds-progress-bar>
   `);
  });
});
