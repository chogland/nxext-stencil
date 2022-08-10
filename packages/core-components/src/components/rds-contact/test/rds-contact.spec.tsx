import { newSpecPage } from '@stencil/core/testing';
import { RdsContact } from '../rds-contact';

describe('rds-contact', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsContact],
      html: `<rds-contact></rds-contact>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-contact>
        <mock:shadow-root>
          <rds-avatar size="md"></rds-avatar>
          <div class="contact-wrapper">
            <div class="name"></div>
            <div class="role"></div>
            <div class="detail"></div>
          </div>
          <div class="actions">
            <slot name="action"></slot>
          </div>
        </mock:shadow-root>
      </rds-contact>
    `);
  });
});
