import { newSpecPage } from '@stencil/core/testing';
import { RdsNavItem } from '../rds-nav-item';

describe('rds-nav-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsNavItem],
      html: `<rds-nav-item></rds-nav-item>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-nav-item>
        <mock:shadow-root>
        <li class="collapsed">
          <a tabindex="0">
            <slot name="icon"></slot>
            <div class="nav-item-text">
              <slot></slot>
            </div>
          </a>
          <div>
            <slot name="child"></slot>
          </div>
        </li>
        </mock:shadow-root>
      </rds-nav-item>
    `);
  });
});
