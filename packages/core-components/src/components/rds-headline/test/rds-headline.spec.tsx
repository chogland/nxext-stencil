import { newSpecPage } from '@stencil/core/testing';
import { RdsHeadline } from '../rds-headline';

describe('rds-headline', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsHeadline],
      html: `<rds-headline></rds-headline>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-headline spacing="md" weight="semibold">
        <mock:shadow-root>
        <h1 id="headline">
          <slot></slot>
        </h1>
        </mock:shadow-root>
      </rds-headline>
    `);
  });
});
