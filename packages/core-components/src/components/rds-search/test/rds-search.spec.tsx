import { newSpecPage } from '@stencil/core/testing';
import { RdsSearch } from '../rds-search';

describe('rds-search', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsSearch],
      html: `<rds-search></rds-search>`,
    });
  });

  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-search role="search">
        <mock:shadow-root>
        <div class="search-input-container">
          <rds-hero-icon class="search-icon" name="search"></rds-hero-icon>
          <input aria-label="Search" autocomplete="off" class="search-input" placeholder="Search" type="search" value="">
          <button aria-label="reset" class="search-clear-button" no-blur="" type="button">
            <rds-hero-icon class="clear-icon" name="x"></rds-hero-icon>
          </button>
        </div>
        </mock:shadow-root>
      </rds-search>
    `);
  });

  it('should emit on input blur', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('.search-input');
    let onBlurFn = jest.fn();

    page.doc.addEventListener('rdsBlur', onBlurFn);

    await inputEle.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(onBlurFn).toHaveBeenCalled();
  });

  it('should emit on input focus', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('.search-input');
    let onFocusFn = jest.fn();

    page.doc.addEventListener('rdsFocus', onFocusFn);

    await inputEle.dispatchEvent(new Event('focus'));
    await page.waitForChanges();

    expect(onFocusFn).toHaveBeenCalled();
  });

  it('should emit on input An rdsInputEvent', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('.search-input');
    let onInputFn = jest.fn();
    // let onChangeFn = jest.fn();

    page.doc.addEventListener('rdsInput', onInputFn);
    // page.doc.addEventListener('rdsChange', onChangeFn);

    inputEle.value = 'T';
    await inputEle.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(onInputFn).toHaveBeenCalled();
  });

  it('should emit on change An rdsChangeEvent', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('.search-input');
    let onChangeFn = jest.fn();
    jest.useFakeTimers();
    page.doc.addEventListener('rdsChange', onChangeFn);

    inputEle.value = 'T';
    await inputEle.dispatchEvent(new Event('input'));
    jest.runOnlyPendingTimers();
    await page.waitForChanges();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[onChangeFn.mock.calls.length - 1][0].detail).toEqual({ value: 'T' });
    jest.useRealTimers();
  });

  it('should clear search onclick of cancel button and emit rdsClear event', async () => {
    await page.waitForChanges();
    let buttonEle = page.root.shadowRoot.querySelector('.search-clear-button');
    let inputEle = page.root.shadowRoot.querySelector('.search-input');
    let onClearFn = jest.fn();
    jest.useFakeTimers();
    page.doc.addEventListener('rdsClear', onClearFn);
    inputEle.value = 'T';
    await inputEle.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(inputEle.value).toEqual('T');
    buttonEle.click();
    jest.setTimeout(16 * 4);
    await page.waitForChanges();
    expect(onClearFn).toHaveBeenCalled();
  });
});
