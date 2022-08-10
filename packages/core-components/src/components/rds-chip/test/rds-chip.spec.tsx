jest.mock('../../../utils/utils', () => ({
  guid: () => 'f56f0809-fd65-383c-173c-9fdf9d07b3cf',
}));

import { newSpecPage } from '@stencil/core/testing';
import { RdsChip } from '../rds-chip';

describe('rds-chip', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsChip],
      html: `<rds-chip clickable></rds-chip>`,
    });
  });
  it('renders with clickable property', async () => {
    expect(page.root).toEqualHtml(`
      <rds-chip tabindex="0" clickable="">
        <mock:shadow-root>
        <span class="title" id="f56f0809-fd65-383c-173c-9fdf9d07b3cf"></span>
        </mock:shadow-root>
      </rds-chip>
    `);
  });

  it('will emit rdsChipClick event when clickable property set', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsChipClick', eventHandler);

    await page.root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });

  it('will emit rdsChipClick event on click', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsChipClick', eventHandler);

    await page.root.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});

describe('rds-chip', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsChip],
      html: `<rds-chip dismissible></rds-chip>`,
    });
  });
  it('renders with dismissible property', async () => {
    expect(page.root).toEqualHtml(`
      <rds-chip tabindex="0" dismissible="">
        <mock:shadow-root>
        <span class="title" id="f56f0809-fd65-383c-173c-9fdf9d07b3cf"></span>
        <button aria-describedby="f56f0809-fd65-383c-173c-9fdf9d07b3cf" aria-label="Close" class="close" tabindex="-1">
               <rds-hero-icon name="x" size="md"></rds-hero-icon>
         </button>
        </mock:shadow-root>
      </rds-chip>
    `);
  });

  it('will emit rdsChipDismiss event on keydown event', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsChipDismiss', eventHandler);

    await page.root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });

  it('will emit rdsChipDismiss event on click', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsChipDismiss', eventHandler);

    await page.root.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});
