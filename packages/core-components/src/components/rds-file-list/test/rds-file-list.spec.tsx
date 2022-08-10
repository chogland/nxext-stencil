import { newSpecPage } from '@stencil/core/testing';
import { RdsFileList } from '../rds-file-list';

describe('rds-file-list', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsFileList],
      html: `<rds-file-list clickable="true"></rds-file-list>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-file-list clickable="true">
        <mock:shadow-root>
        <div class="icon">
          <div class="icon-main">
            <slot name="icon"></slot>
          </div>
        </div>
        <div class="file-name">
          <slot name="name"></slot>
          <slot name="subtitle"></slot>
        </div>
        <div class="detail">

          <slot name="detail"></slot>
        </div>
        <div class="hide hover-action">
          <slot name="hover-action"></slot>
        </div>
        </mock:shadow-root>
      </rds-file-list>
    `);
  });

  it('it will show action on hover', async () => {
    await page.waitForChanges();
    let hoverIcon = page.root.shadowRoot.querySelector('.hover-action');
    expect(page.root.clickable).toBeTruthy();

    page.root.dispatchEvent(new MouseEvent('mouseover'));

    await page.waitForChanges();

    expect(hoverIcon.getAttribute('class')).toBe('hover-action');
  });
  it('it will hide mouse out', async () => {
    await page.waitForChanges();
    let hoverIcon = page.root.shadowRoot.querySelector('.hover-action');
    page.doc.dispatchEvent(new MouseEvent('mouseout'));
    await page.waitForChanges();
    expect(hoverIcon.getAttribute('class')).toBe('hover-action hide');
  });
});
