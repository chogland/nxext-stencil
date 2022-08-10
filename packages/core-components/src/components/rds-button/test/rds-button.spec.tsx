import { newSpecPage } from '@stencil/core/testing';
import { RdsButton } from '../rds-button';

describe('rds-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsButton],
      html: `<rds-button
      appearance="primary"
      size="md"
      text="Default"
    />`,
    });
    expect(page.root).toEqualHtml(`
    <rds-button appearance="primary" size="md" text="Default">
      <mock:shadow-root>
      <button aria-label="Default" id="rds-button-0" class="primary" size="md" type="button">
        <span class="button-inner">
          <slot name="start"></slot>
          <slot>Default</slot>
          <slot name="end"></slot>
        </span>
      </button>
      </mock:shadow-root>
    </rds-button>
    `);
  });
});
