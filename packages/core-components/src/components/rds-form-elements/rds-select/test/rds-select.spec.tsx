import { newSpecPage } from '@stencil/core/testing';
import { RdsSelect } from '../rds-select';
import { h } from '@stencil/core';

describe('rds-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsSelect],
      html: `<rds-select></rds-select>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-select>
        <mock:shadow-root>
          <div class="select-container">
            <div>
              <select id="rds-select-0" name="rds-select-0"></select>
              <div class="icon-container">
              <rds-hero-icon name="chevron-down"></rds-hero-icon>
             </div>
            </div>
          </div>
        </mock:shadow-root>
      </rds-select>
   `);
  });
  it('renders with multiple and native', async () => {
    const page = await newSpecPage({
      components: [RdsSelect],
      html: `<rds-select multiple native></rds-select>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-select multiple="" native="">
        <mock:shadow-root>
          <div class="select-container">
            <div class="multiple-container">
             <select autocomplete="off" id="rds-select-1" multiple="" name="rds-select-1"></select>
            </div>
          </div>
        </mock:shadow-root>
      </rds-select>
   `);
  });

  it('renders with multiple', async () => {
    const page = await newSpecPage({
      components: [RdsSelect],
      html: `<rds-select multiple></rds-select>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-select multiple="">
        <mock:shadow-root>
          <div class="select-container">
            <div class="multiple-container">
             <select autocomplete="off" id="rds-select-2" multiple name="rds-select-2"></select>
            </div>
          </div>
        </mock:shadow-root>
      </rds-select>
   `);
  });
});

describe('rds-select for events with native select element ', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsSelect],
      template: () => (
        <rds-select label="Assigned to">
          <option value="ca">Canada</option>
          <option value="nyc">New York</option>
          <option value="sfo">SFO</option>
          <option value="verylongname">Verylongname goes here</option>
          <span slot="help-text">Help text here</span>
        </rds-select>
      ),
    });
  });

  it('emit on change of value', async () => {
    await page.waitForChanges();
    let opEle = page.root.shadowRoot.querySelector('select');
    let changeHandler = jest.fn();
    page.doc.addEventListener('rdsOnChange', changeHandler);
    opEle.dispatchEvent(new MouseEvent('change'));
    await page.waitForChanges();
    expect(changeHandler).toHaveBeenCalled();
  });

  it('emit on blur event on blur', async () => {
    await page.waitForChanges();
    let opEle = page.root.shadowRoot.querySelector('select');
    let eventHandler = jest.fn();
    page.doc.addEventListener('rdsOnBlur', eventHandler);

    opEle.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });

  it('emit on rdsOnFocus event on focus', async () => {
    await page.waitForChanges();
    let opEle = page.root.shadowRoot.querySelector('select');
    let eventHandler = jest.fn();
    page.doc.addEventListener('rdsOnFocus', eventHandler);
    opEle.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});

describe('rds-select for events without native select element ', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsSelect],
      template: () => (
        <rds-select label="Assigned to" native={false}>
          <option value="ca">Canada</option>
          <option value="nyc">New York</option>
          <option value="sfo">SFO</option>
          <option value="abc">ABCD</option>
        </rds-select>
      ),
    });
  });

  xit('emit on rdsOnChange on selection on the custom select by click', async () => {
    await page.waitForChanges();
    let selectEle = page.root.shadowRoot.getElementById('listbox-option-1');
    let options = page.root.shadowRoot.querySelectorAll('li');
    let valueEle = page.root.shadowRoot.querySelector('.custom-selected');

    expect(valueEle.innerText).toBe(options[0].innerText);
    expect(options[0].getAttribute('class')).toBe('selected custom-list-item');

    let changeHandler = jest.fn();
    page.doc.addEventListener('rdsOnChange', changeHandler);
    selectEle.click();

    await page.waitForChanges();

    expect(options[1].getAttribute('class')).toBe('custom-list-item selected');
    expect(options[0].getAttribute('class')).toBe('custom-list-item');
    expect(valueEle.innerText).toBe(selectEle.innerText);
    expect(changeHandler).toHaveBeenCalled();
  });

  xit('emit on rdsOnChange on selection on the custom select by keypress', async () => {
    await page.waitForChanges();
    let options = page.root.shadowRoot.querySelectorAll('li');
    let list = page.root.shadowRoot.getElementById('list');
    let valueEle = page.root.shadowRoot.querySelector('.custom-selected');
    expect(valueEle.innerText).toBe(options[0].innerText);
    expect(options[0].getAttribute('class')).toBe('selected custom-list-item');

    let changeHandler = jest.fn();
    page.doc.addEventListener('rdsOnChange', changeHandler);
    page.root.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowDown',
      }),
    );

    await page.waitForChanges();
    expect(options[1].getAttribute('class')).toBe('custom-list-item selected');
    expect(options[0].getAttribute('class')).toBe('custom-list-item');
    expect(list.getAttribute('aria-activedescendant')).toBe('listbox-option-1');
    expect(valueEle.innerText).toBe(options[1].innerText);
    expect(changeHandler).toHaveBeenCalled();
  });

  it('emit on blur event on blur', async () => {
    await page.waitForChanges();
    let opEle = page.root.shadowRoot.querySelector('select');
    let eventHandler = jest.fn();
    page.doc.addEventListener('rdsOnBlur', eventHandler);
    opEle.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });

  it('emit on rdsOnFocus event on focus', async () => {
    await page.waitForChanges();
    let opEle = page.root.shadowRoot.querySelector('select');
    let eventHandler = jest.fn();
    page.doc.addEventListener('rdsOnFocus', eventHandler);
    opEle.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});
