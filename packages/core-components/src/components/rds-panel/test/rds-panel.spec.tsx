import { newSpecPage } from '@stencil/core/testing';
import { RdsPanel } from '../rds-panel';

describe('rds-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsPanel],
      html: `<rds-panel></rds-panel>`,
    });
    const instance = page.rootInstance;
    expect(page.root).toEqualHtml(`
      <rds-panel class="panel-enabled" close-button="" position="fixed" style="height: 100vh; top: 0px; opacity: 1;">
        <mock:shadow-root>
          <div class="header">
          <slot name="headline"></slot>
          <rds-panel-toggle auto-hide="false" class="close-button">
             <rds-button appearance="tertiary" label="Close Panel">
               <rds-icon icon="rds-close"></rds-icon>
             </rds-button>
           </rds-panel-toggle>
         </div>
         <div class="inner-wrapper" part="container">
           <slot name="panel-details"></slot>
            <slot></slot>
          </div>
          <div class="panel-footer">
            <slot name="panel-footer"></slot>
          </div>
        </mock:shadow-root>
      </rds-panel>
    `);
    //initialize state
    instance.updateState();
    //check open state
    instance.isOpen(open => {
      expect(open).toBe(true);
    });
    //check active state
    instance.isActive(active => {
      expect(active).toBe(true);
    });
    //toggle open and active state
    page.rootInstance.toggle();
    //verify open state to be toggled
    instance.isOpen(open => {
      expect(open).toBe(false);
    });
    //verify active state to be toggled
    instance.isActive(active => {
      expect(active).toBe(false);
    });
    //validate close returns false
    instance.close(open => {
      expect(open).toBe(false);
    });
    //validate open returns true
    instance.open(open => {
      expect(open).toBe(true);
    });
    //toggle open and active state
    page.rootInstance.toggle();
    //press escape
    instance.handleKeyDown({ key: 'Escape' });
    //disconnect and unregister component
    instance.disconnectedCallback();
    //validate component has been unloaded
    expect(instance.contentEl).toBe(undefined);
    expect(instance.panelInnerEl).toBe(undefined);
  });
});
