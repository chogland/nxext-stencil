jest.mock('../../../utils/utils', () => ({
  guid: () => '626cb44f-2733-8667-b803-9f58cfd27bbd',
}));

import { newSpecPage } from '@stencil/core/testing';
import { RdsToggle } from '../rds-toggle';

describe('rds-toggle', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsToggle],
      html: `<rds-toggle></rds-toggle>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
    <rds-toggle aria-checked="false" role="switch" tabindex="0">
      <mock:shadow-root>
        <div class="toggle-wrapper">
          <div class="toggle-switch">
            <div class="toggle-icon">
              <rds-hero-icon name="x" type="solid"></rds-hero-icon>
            </div>
          </div>
        </div>
      </mock:shadow-root>
      <input id="rds-toggle-626cb44f-2733-8667-b803-9f58cfd27bbd-input" name="undefined" type="checkbox">
      </rds-toggle>
    `);
  });

  it('should emit rdsSwitchChange event on click', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();

    page.root.addEventListener('rdsSwitchChange', eventHandler);
    page.root.dispatchEvent(new Event('click'));
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
    expect(page.root.shadowRoot.querySelector('rds-hero-icon').getAttribute('name')).toBe('check');
  });
  it('should emit rdsSwitchChange event on keydown', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();

    page.root.addEventListener('keydown', eventHandler);
    page.root.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
    expect(page.root.shadowRoot.querySelector('rds-hero-icon').getAttribute('name')).toBe('check');
  });
});
