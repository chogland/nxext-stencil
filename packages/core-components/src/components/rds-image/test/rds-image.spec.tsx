import { newSpecPage } from '@stencil/core/testing';
import { RdsImage } from '../rds-image';

describe('rds-image', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsImage],
      html: `<rds-image thumbnail src="test" ></rds-image>`,
    });
  });
  it('renders with src, thumbnail headline and showHeadline props', async () => {
    expect(page.root).toEqualHtml(`
      <rds-image size="md" src="test" thumbnail="">
        <mock:shadow-root>
          <style>
            .thumbnail {
            background-image: url(test)
          }
          </style>
          <div class="thumbnail"></div>
        </mock:shadow-root>
      </rds-image>
    `);
  });
  it('will emit rdsImageSelect event on click', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsImageSelect', eventHandler);
    await page.root.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});

describe('rds-image', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsImage],
      html: `<rds-image></rds-image>`,
    });
  });
  it('renders without any props', async () => {
    expect(page.root).toEqualHtml(`
      <rds-image size="md">
        <mock:shadow-root>
        <img part="image" tabIndex=-1 />
        </mock:shadow-root>
      </rds-image>
    `);
  });
});
