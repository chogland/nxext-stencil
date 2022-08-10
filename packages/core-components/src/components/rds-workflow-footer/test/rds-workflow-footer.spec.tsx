import { newSpecPage } from '@stencil/core/testing';
import { RdsWorkflowFooter } from '../rds-workflow-footer';

describe('rds-workflow-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsWorkflowFooter],
      html: `<rds-workflow-footer></rds-workflow-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-workflow-footer>
        <mock:shadow-root>
        <div>
          <slot name="action-start"></slot>
        </div>
        <div>
          <slot name="narration"></slot>
        </div>
        <div>
          <slot name="action-end"></slot>
        </div>
        </mock:shadow-root>
      </rds-workflow-footer>
    `);
  });
});
