import { newSpecPage } from '@stencil/core/testing';
import { RdsFlexItem } from '../rds-flex-item';

describe('rds-flex-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsFlexItem],
      html: `<rds-flex-item></rds-flex-item>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-flex-item>
        <mock:shadow-root>
          <div id="breakpoint"></div>
          <slot></slot>
        </mock:shadow-root>
      </rds-flex-item>
    `);
  });
});
