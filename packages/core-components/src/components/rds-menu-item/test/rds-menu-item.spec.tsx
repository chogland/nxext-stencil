import { newSpecPage } from '@stencil/core/testing';
import { RdsMenuItem } from '../rds-menu-item';

describe('rds-menu-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsMenuItem],
      html: `<rds-menu-item></rds-menu-item>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-menu-item tabIndex="1" value="">
        <mock:shadow-root>
          <li role="menuitem">
            <slot></slot>
          </li>
        </mock:shadow-root>
      </rds-menu-item>
    `);
  });
  it('should emit rdsMenuItemSelect event on click', async () => {
    const page = await newSpecPage({
      components: [RdsMenuItem],
      html: `<rds-menu-item></rds-menu-item>`,
    });
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsMenuItemSelect', eventHandler);
    page.root.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});
