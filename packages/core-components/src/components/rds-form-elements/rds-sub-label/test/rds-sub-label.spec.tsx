import { newSpecPage } from '@stencil/core/testing';
import { RdsSubLabel } from '../rds-sub-label';

describe('rds-sub-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsSubLabel],
      html: `<rds-sub-label></rds-sub-label>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-sub-label>
         <mock:shadow-root>
           <label htmlFor="">
             <slot></slot>
           </label>
         </mock:shadow-root>
      </rds-sub-label>
    `);
  });
});
