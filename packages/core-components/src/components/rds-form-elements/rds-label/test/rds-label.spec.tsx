import { newSpecPage } from '@stencil/core/testing';
import { RdsLabel } from '../rds-label';

describe('rds-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsLabel],
      html: `<rds-label></rds-label>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-label>
        <mock:shadow-root>
          <label htmlfor="">
            <slot></slot>
          </label>
        </mock:shadow-root>
      </rds-label>
    `);
  });
});
