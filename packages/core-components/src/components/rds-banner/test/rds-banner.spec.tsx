import { newSpecPage } from '@stencil/core/testing';
import { RdsBanner } from '../rds-banner';

describe('rds-banner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsBanner],
      html: `<rds-banner></rds-banner>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-banner appearance="non-rounded" role="alert">
        <mock:shadow-root>
          <div class="banner-wrapper">
            <slot name="content-left"></slot>
            <slot name="content-right"></slot>
            <rds-button iconOnly size="sm">
              <span>Dismiss</span>
              <rds-hero-icon name="x" />
            </rds-button>
          </div>
        </mock:shadow-root>
      </rds-banner>
    `);
  });
});
