import { newSpecPage } from '@stencil/core/testing';
import { RdsTableCell } from '../rds-table-cell';

describe('rds-table-cell', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsTableCell],
      html: `<rds-table-cell></rds-table-cell>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-table-cell align="left" role="cell" type="data">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rds-table-cell>
    `);
  });
});
