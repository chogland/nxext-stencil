import { newSpecPage } from '@stencil/core/testing';
import { RdsGridCol } from '../rds-grid-col';

describe('rds-grid-col', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsGridCol],
      html: `<rds-grid-col></rds-grid-col>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-grid-col>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rds-grid-col>
    `);
  });
});
