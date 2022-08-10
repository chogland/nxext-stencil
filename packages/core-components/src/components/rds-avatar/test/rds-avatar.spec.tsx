import { newSpecPage } from '@stencil/core/testing';
import { RdsAvatar } from '../rds-avatar';

describe('rds-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsAvatar],
      html: `<rds-avatar text="CH"></rds-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-avatar text="CH">
        <mock:shadow-root>
        <div avatar-wrapper="" size="lg" title="CH">
          <span>CH</span>
          <div class="indicator">
            <slot name="indicator"></slot>
          </div>
        </div>
        </mock:shadow-root>
      </rds-avatar>
    `);
  });
});
