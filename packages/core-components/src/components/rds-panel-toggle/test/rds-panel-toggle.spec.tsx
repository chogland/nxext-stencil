import { newSpecPage } from '@stencil/core/testing';
import { RdsPanelToggle } from '../rds-panel-toggle';

describe('rds-panel-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsPanelToggle],
      html: `<rds-panel-toggle></rds-panel-toggle>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-panel-toggle aria-hidden="true" class="panel-toggle-hidden">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rds-panel-toggle>
    `);
  });
});
