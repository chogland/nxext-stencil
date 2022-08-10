import { newSpecPage } from '@stencil/core/testing';
import { RdsCheckbox } from '../rds-checkbox';

describe('rds-checkbox', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsCheckbox],
      html: `<rds-checkbox></rds-checkbox>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`

      <rds-checkbox aria-checked="false" role="checkbox" type="default">
        <mock:shadow-root>
        <div>
        <rds-label class="rds-label" for="rds-checkBox-0">
            <input id="rds-checkBox-0" name="rds-checkBox-0" type="checkbox"/>
           <div>
            <slot name="sub-label"></slot>
            </div>
            </rds-label>
            </div>
        </mock:shadow-root></rds-checkbox>
   `);
  });

  it('should emit rdsOnFocus on focus', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('input');
    let onFocusFn = jest.fn();

    page.doc.addEventListener('rdsOnFocus', onFocusFn);

    await inputEle.dispatchEvent(new Event('focus'));
    await page.waitForChanges();

    expect(onFocusFn).toHaveBeenCalled();
  });

  it('should emit rdsOnBlur on blur', async () => {
    await page.waitForChanges();
    let inputEle = page.root.shadowRoot.querySelector('input');
    let rdsOnBlurFn = jest.fn();

    page.doc.addEventListener('rdsOnBlur', rdsOnBlurFn);

    await inputEle.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(rdsOnBlurFn).toHaveBeenCalled();
  });

  it('should toggle chekced on keydown', async () => {
    await page.waitForChanges();
    await page.root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();
    expect(page.root.checked).toBeTruthy();
  });
});
