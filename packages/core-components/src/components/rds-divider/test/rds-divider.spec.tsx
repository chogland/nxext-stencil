import { newSpecPage } from '@stencil/core/testing';
import { RdsDivider } from '../rds-divider';

describe('rds-divider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsDivider],
      html: `<rds-divider></rds-divider>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-divider class="md" type="horizontal">
        <mock:shadow-root></mock:shadow-root>
      </rds-divider>
    `);
  });
});
