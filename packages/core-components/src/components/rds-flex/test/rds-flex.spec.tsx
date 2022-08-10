import { newSpecPage } from '@stencil/core/testing';
import { RdsFlex } from '../rds-flex';

describe('rds-flex', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsFlex],
      html: `<rds-flex></rds-flex>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-flex style="height: auto;">
        <mock:shadow-root>
          <div id="breakpoint"></div>
          <slot></slot>
        </mock:shadow-root>
      </rds-flex>
    `);
  });

  it('renders with alignContent', async () => {
    const page = await newSpecPage({
      components: [RdsFlex],
      html: `<rds-flex alignContent="center"></rds-flex>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-flex alignContent="center" style="height: auto;">
        <mock:shadow-root>
          <div id="breakpoint"></div>
          <slot></slot>
        </mock:shadow-root>
      </rds-flex>
    `);
  });

  it('renders with justifyContent', async () => {
    const page = await newSpecPage({
      components: [RdsFlex],
      html: `<rds-flex justifyContent="center"></rds-flex>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-flex justifyContent="center" style="height: auto;">
        <mock:shadow-root>
          <div id="breakpoint"></div>
          <slot></slot>
        </mock:shadow-root>
      </rds-flex>
    `);
  });
});
