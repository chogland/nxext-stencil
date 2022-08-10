import { newSpecPage } from '@stencil/core/testing';
import { RdsSectionHeading } from '../rds-section-heading';

describe('rds-section-heading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsSectionHeading],
      html: `<rds-section-heading></rds-section-heading>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-section-heading>
        <mock:shadow-root>
            <div>
                <div class="section-heading-text">
                    <rds-headline class="text-inherit" level="3"></rds-headline>
                </div>
                <div class="section-heading-content">
                    <slot name="content"></slot>
                </div>
            </div>
            <div class="section-heading-actions">
                <slot name="action-secondary"></slot>
                <slot name="action-primary"></slot>
            </div>
        </mock:shadow-root>
      </rds-section-heading>
    `);
  });
});
