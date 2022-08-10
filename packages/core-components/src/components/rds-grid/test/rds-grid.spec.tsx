import { newSpecPage } from '@stencil/core/testing';
import { RdsGrid } from '../rds-grid';

describe('rds-grid', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsGrid],
      html: `<rds-grid></rds-grid>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-grid type="grid">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rds-grid>
    `);
  });
});
