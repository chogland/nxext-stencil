import { newSpecPage } from '@stencil/core/testing';
import { RdsProgressCircle } from '../rds-progress-circle';

describe('rds-progress-circle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsProgressCircle],
      html: `<rds-progress-circle></rds-progress-circle>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-progress-circle aria-label="Progress Circle" role="progressbar" size="md" style="background: conic-gradient(#2ecc71 0%, 0, #ecf0f1 100%);">
        <mock:shadow-root>
          <div class="progress-circle">
            <span>
            0%
            </span>
          </div>
        </mock:shadow-root>
      </rds-progress-circle>
    `);
  });
});
