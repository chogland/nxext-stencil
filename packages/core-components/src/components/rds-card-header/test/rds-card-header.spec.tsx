import { newSpecPage } from '@stencil/core/testing';
import { RdsCardHeader } from '../rds-card-header';

describe('rds-card-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsCardHeader],
      html: `<rds-card-header></rds-card-header>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-card-header class="padded">
        <mock:shadow-root>
        <div class="header-wrapper">
          <div class="title-desc-wrapper">
            <div class="titleDep">
              <slot></slot>
            </div>
            <slot name="description"></slot>
          </div>
          <slot name="auxiliary-text"></slot>
        </div>
        </mock:shadow-root>
      </rds-card-header>
    `);
  });
});
