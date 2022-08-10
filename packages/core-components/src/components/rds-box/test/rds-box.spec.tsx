import { newSpecPage } from '@stencil/core/testing';
import { RdsBox } from '../rds-box';

describe('rds-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsBox],
      html: `<rds-box></rds-box>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-box display="block" id="box-custom-styled">
        <mock:shadow-root>
          <div id="box-styled">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </rds-box>
    `);
  });
});
