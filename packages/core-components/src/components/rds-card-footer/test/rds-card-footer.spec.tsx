import { newSpecPage } from '@stencil/core/testing';
import { RdsCardFooter } from '../rds-card-footer';

describe('rds-card-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsCardFooter],
      html: `<rds-card-footer></rds-card-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-card-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rds-card-footer>
    `);
  });
});
