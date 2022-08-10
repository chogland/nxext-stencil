import { newSpecPage } from '@stencil/core/testing';
import { RdsCardLocations } from '../rds-card-locations';

describe('rds-card-locations', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsCardLocations],
      html: `<rds-card-locations></rds-card-locations>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-card-locations>
        <mock:shadow-root>
        <rds-card-container>
          <rds-card-body>
            <div class="text">
              <slot name="title"></slot>
            </div>
            <div class="wrapper">
              <div class="recommendations">
                <div class="recommendations-number">
                <div class="more-info">
                  <slot name="recommendations-info"></slot>
                </div>
                  <slot name="recommendations"></slot>
                </div>
                <slot name="recommendations-label"></slot>
              </div>
            </div>
          </rds-card-body>
          <rds-divider spacing="none"></rds-divider>
          <rds-card-footer>
              <slot name="description"></slot>
            </rds-card-footer>
        </rds-card-container>
        </mock:shadow-root>
      </rds-card-locations>
    `);
  });
  it('renders with error', async () => {
    const page = await newSpecPage({
      components: [RdsCardLocations],
      html: `<rds-card-locations error="true"></rds-card-locations>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-card-locations error="">
        <mock:shadow-root>
            <rds-card-body>
            <div class="text">
              <slot name="title"></slot>
            </div>
            <div class="error-outer">
              <rds-text weight="bold">Something went wrong.</rds-text>
              <rds-text>Check your connection and try reloading.</rds-text>
              <slot name="error-action"></slot>
            </div>
          </rds-card-body>
        </mock:shadow-root>
      </rds-card-locations>
    `);
  });

  it('renders with loading', async () => {
    const page = await newSpecPage({
      components: [RdsCardLocations],
      html: `<rds-card-locations loading="true"></rds-card-locations>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-card-locations loading="">
        <mock:shadow-root>
          <rds-skeleton height="200px" variant="rect" />
        </mock:shadow-root>
      </rds-card-locations>
    `);
  });
});
