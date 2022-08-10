import { newSpecPage } from '@stencil/core/testing';
import { RdsCardTitle } from '../rds-card-title';

describe('rds-card-title', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsCardTitle],
      html: `<rds-card-title></rds-card-title>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-card-title>
        <mock:shadow-root>
        <rds-headline class="card-title text-inherit" level="4" spacing="none">
         <slot></slot>
        </rds-headline>
        </mock:shadow-root>
      </rds-card-title>
    `);
  });
});
