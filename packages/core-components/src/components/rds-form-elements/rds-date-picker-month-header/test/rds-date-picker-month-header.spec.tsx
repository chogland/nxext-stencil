import { newSpecPage } from '@stencil/core/testing';
import { RdsDatePickerMonthHeader } from '../rds-date-picker-month-header';

describe('rds-date-picker-month', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsDatePickerMonthHeader],
      html: `<rds-date-picker-month-header></rds-date-picker-month-header>`,
    });
    expect(page.root).toEqualHtml(`
    <rds-date-picker-month-header>
      <mock:shadow-root>
        <div class="header" dir="ltr"></div>
      </mock:shadow-root>
    </rds-date-picker-month-header>
   `);
  });
});
