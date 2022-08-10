import { newSpecPage } from '@stencil/core/testing';
import { RdsInputDatePicker } from '../rds-input-date-picker';

describe('rds-input-date-picker', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsInputDatePicker],
      html: `<rds-input-date-picker></rds-input-date-picker>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
    <rds-input-date-picker layout="horizontal" role="application">
      <mock:shadow-root>
        <div aria-expanded="false" class="input-container" dir="ltr" role="application">
          <div class="input-wrapper">
            <rds-input class="input" placeholder="DD/MM/YYYY" type="text" value="">
              <rds-hero-icon name="calendar" slot="icon-start"></rds-hero-icon>
            </rds-input>
          </div>
          <div aria-hidden="true" class="menu-container" style="position: absolute; left: 0; top: 0; margin: 0;">
            <div class="calendar-picker-wrapper">
              <rds-date-picker activerange="start" intlnextmonth="Next month" intlprevmonth="Previous month" locale="en-GB"></rds-date-picker>
            </div>
          </div>
        </div>
      </mock:shadow-root>
    </rds-input-date-picker>
   `);
  });
});
