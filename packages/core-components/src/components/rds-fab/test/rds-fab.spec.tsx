import { newSpecPage } from '@stencil/core/testing';
import { RdsFab } from '../rds-fab';

describe('rds-fab', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsFab],
      html: `<rds-fab></rds-fab>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-fab size="md">
        <mock:shadow-root>
          <rds-tooltip position="left" reference-element="fab-tooltip"></rds-tooltip>
          <rds-tooltip-manager>
            <rds-button class="fab" icononly="" id="fab-tooltip" size="md">
                <rds-hero-icon name="plus" size="lg"></rds-hero-icon>
            </rds-button>
          </rds-tooltip-manager>
        </mock:shadow-root>
      </rds-fab>
    `);
  });
});
