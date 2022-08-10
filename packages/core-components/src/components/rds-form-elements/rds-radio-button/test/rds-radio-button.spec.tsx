jest.mock('../../../../utils/utils', () => ({
  guid: () => 'f56f0809-fd65-383c-173c-9fdf9d07b3cf',
}));

import { newSpecPage } from '@stencil/core/testing';
import { RdsRadioButton } from '../rds-radio-button';
import { RdsLabel } from '../../rds-label/rds-label';

describe('rds-radio-button', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsRadioButton, RdsLabel],
      html: `<rds-radio-button></rds-radio-button>`,
    });
    Object.defineProperty(global, 'document', {});
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
    <rds-radio-button tabindex="0" type="default">
      <mock:shadow-root>
        <div>
        <rds-label class="label rds-label">
        <mock:shadow-root>
        <label htmlfor="rds-radio-button-f56f0809-fd65-383c-173c-9fdf9d07b3cf">
        <slot></slot>
        </label>
        </mock:shadow-root>
        <input id="rds-radio-button-f56f0809-fd65-383c-173c-9fdf9d07b3cf" tabindex="-1" type="radio">
        <div>
          <slot name="sub-label"></slot>
          </div>
          </rds-label>
        </div>
      </mock:shadow-root>
    </rds-radio-button>
    `);
  });

  it('will emit on blur', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsOnBlur', eventHandler);

    page.root.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });

  it('will emit rdsOnFocus event on focus', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsOnFocus', eventHandler);

    page.root.dispatchEvent(new Event('focus'));
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });

  it('should emit rdsRadioButtonChange event on input checked status ', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('input');
    let eventHandler = jest.fn();
    page.doc.addEventListener('rdsRadioButtonChange', eventHandler);

    inputEle.click();
    page.root.checked = true;
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });

  it('should emit rdsRadioButtonChange event on click', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsRadioButtonChange', eventHandler);

    page.root.dispatchEvent(new Event('click'));
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });

  it('should emit rdsRadioButtonChange event on keyDown', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsRadioButtonChange', eventHandler);

    page.root.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });

  it('should emit rdsOnFocus event focused property updated', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsOnFocus', eventHandler);
    page.root.dispatchEvent(new Event('focus'));
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });

  it('should emit rdsOnBlur event focused property updated', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsOnBlur', eventHandler);
    page.root.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });

  it('should set input required as required property updated', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('input');

    page.root.required = true;
    await page.waitForChanges();

    expect(inputEle.getAttribute('required')).toBe('');
  });
});
