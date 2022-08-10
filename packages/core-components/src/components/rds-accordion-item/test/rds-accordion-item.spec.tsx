import { newSpecPage } from '@stencil/core/testing';
import { RdsAccordionItem } from '../rds-accordion-item';

describe('rds-accordion-item testing life-cycle', () => {
  it('should build', async () => {
    expect(new RdsAccordionItem()).toBeTruthy();
  });
});

describe('rds-accordion-item', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsAccordionItem],
      html: `<rds-accordion-item></rds-accordion-item>`,
    });
  });

  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-accordion-item aria-expanded="false" tabindex="0">
        <mock:shadow-root>
          <div>
            <div class="accordion-item-header">
              <div class="accordion-item-header-text">
                <span class="accordion-item-title"></span>
              </div>
              <rds-hero-icon class="accordion-item-expand-icon" name="chevron-down" size="lg"></rds-hero-icon>
            </div>
            <div class="accordion-item-content padded">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </rds-accordion-item>
    `);
  });

  it('Will able to listen the rdsAccordionItemSelect', async () => {
    await page.waitForChanges();
    let accordionItem = page.root.shadowRoot.querySelector('.accordion-item-header');
    let rdsAccordionItemSelectfn = jest.fn();

    page.root.addEventListener('rdsAccordionItemSelect', rdsAccordionItemSelectfn);

    await accordionItem.dispatchEvent(new Event('click'));
    await page.waitForChanges();

    expect(rdsAccordionItemSelectfn).toHaveBeenCalled();
  });

  it('Will able to listen the rdsAccordionChange', async () => {
    await page.waitForChanges();
    let rdsAccordionChangeFn = jest.fn();

    page.body.addEventListener('rdsAccordionChange', rdsAccordionChangeFn);

    await page.body.dispatchEvent(
      new CustomEvent('rdsAccordionChange', {
        detail: {
          requestedAccordionItem: new RdsAccordionItem(),
        },
      }),
    );
    await page.waitForChanges();

    expect(rdsAccordionChangeFn).toHaveBeenCalled();
  });

  it('Will able to listen the keydown event', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();

    page.root.addEventListener('rdsAccordionItemSelect', eventHandler);

    page.root.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });

  it('Will able to listen the keydown event with home/end and emit rdsAccordionItemKeyEvent', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();

    page.root.addEventListener('rdsAccordionItemKeyEvent', eventHandler);

    page.root.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Home',
      }),
    );
    await page.waitForChanges();

    expect(eventHandler).toHaveBeenCalled();
  });
});
