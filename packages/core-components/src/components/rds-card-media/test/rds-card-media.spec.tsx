import { newSpecPage } from '@stencil/core/testing';
import { RdsCardMedia } from '../rds-card-media';

describe('rds-card-media', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsCardMedia],
      html: `<rds-card-media></rds-card-media>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-card-media size="md">
        <mock:shadow-root>
          <div class="image" style="background-image: url(undefined);"></div>
        </mock:shadow-root>
      </rds-card-media>
    `);
  });
});
