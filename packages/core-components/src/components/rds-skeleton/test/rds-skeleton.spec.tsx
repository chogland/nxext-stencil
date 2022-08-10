import { newSpecPage } from '@stencil/core/testing';
import { RdsSkeleton } from '../rds-skeleton';

describe('rds-skeleton', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsSkeleton],
      html: `<rds-skeleton></rds-skeleton>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-skeleton>
        <mock:shadow-root>
         <span aria-busy="true" aria-label="Loading" aria-valuemax="100" aria-valuemin="0" aria-valuetext="Loading..." class="skeleton" role="progressbar" tabindex="0"></span>
        </mock:shadow-root>
      </rds-skeleton>
    `);
  });
});
