import { newSpecPage } from '@stencil/core/testing';
import { RdsRadioButton } from '../../rds-radio-button/rds-radio-button';
import { RdsRadioButtonGroup } from '../rds-radio-button-group';

describe('rds-radio-button-group', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsRadioButtonGroup],
      html: `<rds-radio-button-group></rds-radio-button-group>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-radio-button-group type="description-list">
        <mock:shadow-root>
          <rds-flex align-items="flex-start" justify-content="space-between"></rds-flex>
          <div class="vertical">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </rds-radio-button-group>
    `);
  });
});

describe('rds-radio-button-group', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsRadioButtonGroup, RdsRadioButton],
      html: `<rds-radio-button-group>
        <rds-radio-button checked></rds-radio-button>
        <rds-radio-button></rds-radio-button>
        </rds-radio-button-group>`,
    });
  });
  it('checked on click', async () => {
    await page.waitForChanges();
    page.root.dispatchEvent(new CustomEvent('rdsRadioButtonChange'));
    await page.waitForChanges();
    expect(page.root.childNodes[0]['group-checked']).toBeFalsy();
  });
});
