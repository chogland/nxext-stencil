import { newSpecPage } from '@stencil/core/testing';
import { RdsMeta } from '../rds-meta';

describe('rds-meta', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsMeta],
      html: `<rds-meta></rds-meta>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-meta>
        <mock:shadow-root>
          <rds-hero-icon size="md"></rds-hero-icon>
          <slot></slot>
        </mock:shadow-root>
      </rds-meta>
    `);
  });
});
