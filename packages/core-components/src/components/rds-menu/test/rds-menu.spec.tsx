jest.mock('../../../utils/utils', () => ({
  guid: () => 'c59cab23-ba4b-337a-c295-c0a3f3233ac6',
}));

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { RdsMenu } from '../rds-menu';

describe('rds-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsMenu],
      html: `<rds-menu></rds-menu>`,
    });
    expect(page.root).toEqualHtml(`
    <rds-menu>
      <mock:shadow-root>
        <ul aria-labelledby="menu-manager" class="menu-panel" hidden="" id="rds-menu-c59cab23-ba4b-337a-c295-c0a3f3233ac6" position="bottom" reference-element="menu-manager" role="menu" style="position: absolute; left: 0; top: 0; margin: 0;">
          <div id="menu-panel-child">
            <slot name="menu-header"></slot>
            <slot name="menu-content"></slot>
            <slot name="menu-footer"></slot>
          </div>
        </ul>
      </mock:shadow-root>
    </rds-menu>
    `);
  });
});

describe('rds-menu', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsMenu],
      template: () => <rds-menu scrolling={true} hover={true}></rds-menu>,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-menu class="hover">
        <mock:shadow-root>
          <ul aria-labelledby="menu-manager" class="menu-panel" hidden="" id="rds-menu-c59cab23-ba4b-337a-c295-c0a3f3233ac6" position="bottom" reference-element="menu-manager" role="menu" style="position: absolute; left: 0; top: 0; margin: 0;">
            <div id="menu-panel-child" style="margin: 16px;">
              <slot name="menu-header"></slot>
              <div class="menu-scroll-wrapper">
                <slot name="menu-content"></slot>
              </div>
              <slot name="menu-footer"></slot>
            </div>
          </ul>
        </div>
      </mock:shadow-root>
    </rds-menu>
    `);
  });
});
