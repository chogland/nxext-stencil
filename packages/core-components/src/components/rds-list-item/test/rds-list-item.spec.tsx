import { newSpecPage } from '@stencil/core/testing';
import { RdsListItem } from '../rds-list-item';

describe('rds-list-item', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsListItem],
      html: `<rds-list-item ></rds-list-item>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-list-item type="unordered">
        <mock:shadow-root>
          <li role="listitem">
            <div class="no-link">
              <slot name="description-title"></slot>
              <slot name="description-text"></slot>
              <slot name="stacked-column"></slot>
              <slot></slot>
            </div>
          </li>
        </mock:shadow-root>
      </rds-list-item>
    `);
  });
});
