import { newSpecPage } from '@stencil/core/testing';
import { RdsBreadcrumb } from '../rds-breadcrumb';

describe('rds-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsBreadcrumb],
      html: `<rds-breadcrumb separator="chevron"></rds-breadcrumb>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-breadcrumb separator="chevron">
        <mock:shadow-root>
            <li>
                <div id="breakpoint"></div>
                <rds-hero-icon name="chevron-right"></rds-hero-icon>
                <slot></slot>
            </li>
        </mock:shadow-root>
      </rds-breadcrumb>
    `);
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsBreadcrumb],
      html: `<rds-breadcrumb separator="slash"></rds-breadcrumb>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-breadcrumb separator="slash">
        <mock:shadow-root>
            <li>
              <div id="breakpoint"></div>
              <rds-hero-icon id="slash" name="slash-front" type="outline"></rds-hero-icon>
              <slot></slot>
            </li>
        </mock:shadow-root>
      </rds-breadcrumb>
    `);
  });
});
