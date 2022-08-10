import { newSpecPage } from '@stencil/core/testing';
import { RdsTableRow } from '../rds-table-row';

describe('rds-table-row', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsTableRow],
      html: `<rds-table-row></rds-table-row>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-table-row role="row">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rds-table-row>
    `);
  });
});
