jest.mock('../../../utils/utils', () => ({
  guid: () => 'c59cab23-ba4b-337a-c295-c0a3f3233ac6',
}));

import { newSpecPage } from '@stencil/core/testing';
import { RdsTooltip } from '../rds-tooltip';

describe('rds-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsTooltip],
      html: `<rds-tooltip text="Lorem Ipsum"></rds-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
    <rds-tooltip aria-hidden="true" id="rds-tooltip-c59cab23-ba4b-337a-c295-c0a3f3233ac6" offset-distance="6" offset-skidding="0" position="auto" rds-hydrated-hidden="" role="tooltip" tabindex="0" text="Lorem Ipsum">
       <mock:shadow-root>
         <div class="rds-popper-anim">
           <div class="arrow"></div>
           <div class="container">
             Lorem Ipsum
           </div>
         </div>
      </mock:shadow-root>
    </rds-tooltip>
    `);
  });
});
