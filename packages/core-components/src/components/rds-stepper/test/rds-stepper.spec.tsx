import { newSpecPage } from '@stencil/core/testing';
import { RdsStepper } from '../rds-stepper';

describe('rds-stepper', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [RdsStepper],
      html: `<rds-stepper></rds-stepper>`,
    });
  });
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <rds-stepper type="simple">
        <mock:shadow-root>
          <div id="stepper-container">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </rds-stepper>
    `);
  });

  it('will listen rdsStepperItemRegister event', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsStepperItemRegister', eventHandler);

    page.root.dispatchEvent(
      new CustomEvent('rdsStepperItemRegister', {
        detail: {
          position: '',
          content: '',
        },
      }),
    );
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });

  it('will listen rdsStepperItemSelect event', async () => {
    await page.waitForChanges();
    let eventHandler = jest.fn();
    page.root.addEventListener('rdsStepperItemSelect', eventHandler);

    page.root.dispatchEvent(
      new CustomEvent('rdsStepperItemSelect', {
        detail: {
          position: 2,
          content: '',
        },
      }),
    );
    await page.waitForChanges();
    expect(eventHandler).toHaveBeenCalled();
  });
});

describe('rds-stepper methods', () => {
  let page;
  beforeEach(async () => {
    page = new RdsStepper();
    page.items = [1, 2, 3, 4, 5];
  });

  it('startStep method', async () => {
    page.currentPosition = 2;
    page.startStep();

    expect(page.currentPosition).toBe(0);
  });
  it('nextStep method', async () => {
    page.currentPosition = 2;
    page.nextStep();

    expect(page.currentPosition).toBe(3);
  });

  it('prevStep method', async () => {
    page.currentPosition = 2;
    page.prevStep();

    expect(page.currentPosition).toBe(1);
  });

  it('goToStep method', async () => {
    page.currentPosition = 5;
    page.goToStep(4);

    expect(page.currentPosition).toBe(3);
  });
  it('endStep method', async () => {
    page.currentPosition = 2;

    page.endStep(4);

    expect(page.currentPosition).toBe(4);
  });
});

// describe('rds-stepper with items', () => {
//   let page;
//   beforeEach(async()=> {
//     page = await newSpecPage({
//       components: [RdsStepper, RdsStepperItem],
//       template:()=>(
//         <rds-stepper type="simple">
//           <rds-stepper-item active text="First">
//             Text1
//           </rds-stepper-item>
//           <rds-stepper-item  text="Second">
//             Text 2
//           </rds-stepper-item>
//         </rds-stepper>
//       )
//     });
//   })
//   it('will rdsStepperItemSelect event update the item', async()=> {
//     await page.waitForChanges();
//     let eventHandler = jest.fn();
//     page.root.addEventListener('rdsStepperItemSelect', eventHandler);

//     page.root.dispatchEvent(new CustomEvent('rdsStepperItemSelect', {
//       'detail':{
//         position:2,
//         content:2
//       }
//     }));
//     await page.waitForChanges();
//     expect(eventHandler).toHaveBeenCalled();

//   });

// });
