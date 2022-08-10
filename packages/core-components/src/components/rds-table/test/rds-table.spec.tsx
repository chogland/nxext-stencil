import { newSpecPage } from '@stencil/core/testing';
import { RdsTable } from '../rds-table';

describe('rds-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsTable],
      html: `<rds-table></rds-table>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-table>
        <mock:shadow-root>
          <div class="table-wrapper">
            <div class="table-outer">
              <div class="table-inner">
                <table>
                  <caption class="sr-only">Table Caption</caption>
                </table>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </rds-table>
    `);
  });
});
