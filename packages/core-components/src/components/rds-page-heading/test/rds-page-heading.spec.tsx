import { newSpecPage } from '@stencil/core/testing';
import { RdsPageHeading } from '../rds-page-heading';

describe('rds-page-heading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsPageHeading],
      html: `<rds-page-heading></rds-page-heading>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-page-heading>
        <mock:shadow-root>
        <div class="page-heading-breadcrumbs">
          <slot name="breadcrumbs"></slot>
        </div>
        <div class="page-heading-outer">
          <div class="page-heading-text-outer">
            <h2></h2>
            <div class="page-heading-meta">
              <slot name="meta"></slot>
            </div>
          </div>
          <div class="page-heading-actions">
            <slot name="action-secondary"></slot>
            <slot name="action-primary"></slot>
          </div>
        </div>
        </mock:shadow-root>
      </rds-page-heading>
    `);
  });
});
