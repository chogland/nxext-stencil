import { newSpecPage } from '@stencil/core/testing';
import { RdsDatePicker } from '../rds-date-picker';

describe('rds-date-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsDatePicker],
      html: `<rds-date-picker></rds-date-picker>`,
    });
    expect(page.root).toEqualHtml(`
    <rds-date-picker role="application">
      <mock:shadow-root>
      </mock:shadow-root>
    </rds-date-picker>
   `);
  });
});
