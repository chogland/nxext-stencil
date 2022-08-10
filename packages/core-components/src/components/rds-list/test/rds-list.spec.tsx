import { newSpecPage } from '@stencil/core/testing';
import { RdsList } from '../rds-list';

describe('rds-list', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsList],
      html: `<rds-list type="navigation" active="true"></rds-list>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-list type="navigation" active="">
        <mock:shadow-root>
          <ul class="active" role="list">
            <slot></slot>
          </ul>
        </mock:shadow-root> 
      </rds-list>
    `);
  });

  it('will listen openSubNav event ', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('openSubNav', eventHandler);
    page.root.dispatchEvent(new Event('openSubNav'));
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });

  it('will listen closeSubNav event ', async () => {
    await page.waitForChanges();

    page.root.dispatchEvent(new Event('closeSubNav'));
    await page.waitForChanges();

    expect(page.root.active).toBeFalsy();
  });
});
