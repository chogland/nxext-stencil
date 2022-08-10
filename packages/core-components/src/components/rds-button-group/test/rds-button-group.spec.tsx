import { newSpecPage } from '@stencil/core/testing';
import { RdsButton } from '../../rds-button/rds-button';
import { RdsButtonGroup } from '../rds-button-group';
import { h } from '@stencil/core';

describe('rds-button-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsButtonGroup],
      html: `<rds-button-group />`,
    });
    expect(page.root).toEqualHtml(`
    <rds-button-group>
      <mock:shadow-root>
        <slot></slot>
      </mock:shadow-root>
    </rds-button-group>
    `);
  });
});

describe('rds-button-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsButtonGroup, RdsButton],
      template: () => (
        <rds-button-group>
          <rds-button active appearance="tertiary" group>
            First
          </rds-button>
          <rds-button appearance="tertiary" group>
            Middle
          </rds-button>
          <rds-button appearance="tertiary" group>
            Last
          </rds-button>
        </rds-button-group>
      ),
    });
    await page.waitForChanges();
    let button = page.root.querySelectorAll('rds-button');
    expect(button.length).toBe(3);

    expect(button[0].getAttribute('class')).toBe('group-btn-first');
    expect(button[1].getAttribute('class')).toBe('group-btn-next');
    expect(button[2].getAttribute('class')).toBe('group-btn-last');
  });
});
