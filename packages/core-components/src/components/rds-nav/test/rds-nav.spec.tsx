import { newSpecPage } from '@stencil/core/testing';
import { RdsAction } from '../../rds-action/rds-action';
import { RdsNav } from '../rds-nav';
import { h } from '@stencil/core';

describe('rds-nav', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsNav],
      html: `<rds-nav></rds-nav>`,
    });
    expect(page.root).toEqualHtml(`
      <rds-nav collapsible="" expanded="">
        <mock:shadow-root>
          <nav aria-label="FM Global">
            <slot></slot>
            <div></div>
          </nav>
        </mock:shadow-root>
      </rds-nav>
    `);
  });
});

describe('rds-nav', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsNav, RdsAction],
      template: () => <rds-nav collapsible={true} type="base" expanded={true}></rds-nav>,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-nav collapsible="" expanded="" type='base'>
        <mock:shadow-root>
          <nav aria-label="FM Global" class="expanded">
            <div>
              <ul>
                <slot />
              </ul>
              <slot name="tools"></slot>
              <div class="user-menu">
                <slot name="user-menu"></slot>
              </div>
            </div>
            <rds-action class="collapse-btn" text-enabled="">
              <mock:shadow-root>
                <button aria-disabled="false" aria-label="Collapse" class="action-button">
                    <div aria-hidden="true" title="Collapse">
                      <rds-hero-icon name="chevron-double-left"></rds-hero-icon>
                      <div>
                        <slot></slot>
                      </div>
                    </div>
                    <div class="text-container text-container--visible">
                      Collapse
                    </div>
                </button>
              </mock:shadow-root>
            </rds-action>
          </nav>
        </mock:shadow-root>
      </rds-nav>
    `);
  });

  it('should rdsNavToggle emit events', async () => {
    await page.waitForChanges();
    let element = page.root.shadowRoot.querySelector('rds-action');
    let eventHandler = jest.fn();

    page.root.addEventListener('rdsNavToggle', eventHandler);
    element.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
  it('should listen openNav events', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();

    page.body.addEventListener('openNav', eventHandler);
    page.body.dispatchEvent(new CustomEvent('openNav'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });

  it('should listen closeNav events', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();

    page.body.addEventListener('closeNav', eventHandler);
    page.body.dispatchEvent(new CustomEvent('closeNav'));
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});
