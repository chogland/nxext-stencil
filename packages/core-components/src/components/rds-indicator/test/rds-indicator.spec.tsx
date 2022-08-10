import { newSpecPage } from '@stencil/core/testing';
import { RdsIndicator } from '../rds-indicator';

describe('rds-indicator', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsIndicator],
      html: `<rds-indicator appearance="success"></rds-indicator>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-indicator appearance="success">
        <mock:shadow-root>
        </mock:shadow-root>
      </rds-indicator>
    `);
  });
});
