import { newSpecPage } from '@stencil/core/testing';
import { RdsCheckboxGroup } from '../rds-checkbox-group';

describe('rds-checkbox-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsCheckboxGroup],
      html: `<rds-checkbox-group></rds-checkbox-group>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-checkbox-group type="description-list">
        <mock:shadow-root>
          <rds-flex align-items="flex-start" justify-content="space-between"></rds-flex>
          <div class="vertical">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </rds-checkbox-group>
    `);
  });
});
