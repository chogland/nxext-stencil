import { newSpecPage } from '@stencil/core/testing';
import { RdsWorkflowHeader } from '../rds-workflow-header';

describe('rds-workflow-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsWorkflowHeader],
      html: `<rds-workflow-header></rds-workflow-header>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-workflow-header>
        <mock:shadow-root>
        <div class="header-text-wrapper">
          <div>
            <slot name="title"></slot>
          </div>
          <div>
            <slot name="description"></slot>
          </div>
        </div>
        <div class="actions">
          <slot name="action"></slot>
        </div>
        </mock:shadow-root>
      </rds-workflow-header>
    `);
  });
});
