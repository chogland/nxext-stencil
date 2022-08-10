import { newSpecPage } from '@stencil/core/testing';
import { RdsText } from '../rds-text';

describe('rds-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsText],
      html: `<rds-text></rds-text>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-text align="inherit" size="base" spacing="md" weight="normal">
        <mock:shadow-root>
          <p id="text">
            <slot></slot>
          </p>
        </mock:shadow-root>
      </rds-text>
    `);
  });
});
