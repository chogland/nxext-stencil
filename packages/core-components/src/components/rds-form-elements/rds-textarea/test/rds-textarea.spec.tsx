import { newSpecPage } from '@stencil/core/testing';
import { RdsTextarea } from '../rds-textarea';

describe('rds-textarea', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsTextarea],
      html: `<rds-textarea></textarea>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
    <rds-textarea resize="off">
      <mock:shadow-root>
      <div class="textarea-container"><textarea id="rds-textarea-0" name="rds-textarea-0" placeholder="" value=""></textarea></div>
      </mock:shadow-root>
    </rds-textarea>
   `);
  });
  it('should emit rdsOnChange event on input update', async () => {
    await page.waitForChanges();
    let ele = page.root.shadowRoot.querySelector('textarea');
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsOnInput', eventHandler);
    ele.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
  it('should emit rdsOnChange event on input update and blur', async () => {
    await page.waitForChanges();
    let ele = page.root.shadowRoot.querySelector('textarea');
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsOnChange', eventHandler);
    ele.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
  it('should emit rdsOnBlur event on input blur', async () => {
    await page.waitForChanges();
    let ele = page.root.shadowRoot.querySelector('textarea');
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsOnBlur', eventHandler);
    ele.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
  it('should emit rdsOnFocus event on input focus', async () => {
    await page.waitForChanges();
    let ele = page.root.shadowRoot.querySelector('textarea');
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsOnFocus', eventHandler);
    ele.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});
