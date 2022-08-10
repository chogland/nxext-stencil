import { newSpecPage } from '@stencil/core/testing';
import { RdsBadge } from '../rds-badge';

describe('rds-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsBadge],
      html: `<rds-badge></rds-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-badge>
        <mock:shadow-root>
          <div></div>
        </mock:shadow-root>
      </rds-badge>
    `);
  });
});
