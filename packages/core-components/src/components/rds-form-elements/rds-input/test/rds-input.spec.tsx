import { newSpecPage } from '@stencil/core/testing';
import { RdsInput } from '../rds-input';

describe('rds-input', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsInput],
      html: `<rds-input></rds-input>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
    <rds-input value="">
      <mock:shadow-root>
        <div class="input-container">
          <input autocomplete="off" id="rds-input-0" name="rds-input-0" placeholder="" type="text" value="">
        </div>
      </mock:shadow-root>
    </rds-input>
   `);
  });

  it('should emit on input blur', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('input');
    let onBlurFn = jest.fn();

    page.doc.addEventListener('rdsOnBlur', onBlurFn);

    await inputEle.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(onBlurFn).toHaveBeenCalled();
  });

  it('should emit on input focus', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('input');
    let onFocusFn = jest.fn();

    page.doc.addEventListener('rdsOnFocus', onFocusFn);

    await inputEle.dispatchEvent(new Event('focus'));
    await page.waitForChanges();

    expect(onFocusFn).toHaveBeenCalled();
  });

  it('should emit on input An rdsInputEvent', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('input');
    let onInputFn = jest.fn();
    // let onChangeFn = jest.fn();

    page.doc.addEventListener('rdsOnInput', onInputFn);
    // page.doc.addEventListener('rdsChange', onChangeFn);

    inputEle.value = 'T';
    await inputEle.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(onInputFn).toHaveBeenCalled();
  });

  it('should emit on change An rdsChangeEvent', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('input');
    let onChangeFn = jest.fn();

    page.doc.addEventListener('rdsOnChange', onChangeFn);

    inputEle.value = 'T';
    await inputEle.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(onChangeFn).toHaveBeenCalled();
  });
});
