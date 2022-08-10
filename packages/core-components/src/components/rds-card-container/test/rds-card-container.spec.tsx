import { newSpecPage } from '@stencil/core/testing';
import { RdsCardContainer } from '../rds-card-container';

describe('rds-card-container', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsCardContainer],
      html: `<rds-card-container></rds-card-container>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-card-container rounded="" shadow="">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rds-card-container>
    `);
  });
});
