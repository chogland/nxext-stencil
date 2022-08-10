import { newSpecPage } from '@stencil/core/testing';
import { RdsLink } from '../rds-link';

describe('rds-link', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsLink],
      html: `<rds-link
      appearance="secondary"
      size="sm"
      text="Default"
    />`,
    });
    expect(page.root).toEqualHtml(`
    <rds-link appearance="secondary" size="sm" text="Default">
      <mock:shadow-root>
      <button aria-label="Default" id="rds-link-0" class="secondary" size="sm">
        <span class="link-inner">
          <slot name="start"></slot>
          <slot>
            Default
          </slot>
          <slot name="end"></slot>
        </span>
      </button>
      </mock:shadow-root>
    </rds-link>
    `);
  });
});
