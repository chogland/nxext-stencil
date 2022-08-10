import { newSpecPage } from '@stencil/core/testing';
import { RdsProfile } from '../rds-profile';

describe('rds-profile', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsProfile],
      html: `<rds-profile></rds-profile>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-profile>
        <mock:shadow-root>
          <button>
            <slot name="avatar"></slot>
            <slot name="name"></slot>
            <span class="sr-only">
              Profile
            </span>
            <slot name="icon"></slot>
          </button>
        </mock:shadow-root>
      </rds-profile>
    `);
  });
});
