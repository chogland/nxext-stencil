import { newSpecPage } from '@stencil/core/testing';
import { RdsCardBody } from '../rds-card-body';

describe('rds-card-body', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsCardBody],
      html: `<rds-card-body></rds-card-body>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-card-body padded="">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rds-card-body>
    `);
  });
});
