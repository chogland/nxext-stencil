import { newSpecPage } from '@stencil/core/testing';
import { RdsAppLayout } from '../rds-app-layout';

describe('rds-app-leyout', () => {
  it('renders default Type layout', async () => {
    const page = await newSpecPage({
      components: [RdsAppLayout],
      html: `<rds-app-layout></rds-app-layout>`,
    });
    expect(page.root).toEqualHtml(`
        <rds-app-layout sidebar="left">
        <mock:shadow-root>
          <slot name="app-header"></slot>
          <slot name="app-stepper"></slot>
          <div app-content="">
            <slot name="app-sidebar-left"></slot>
            <slot name="app-main"></slot>
            <slot name="app-fixed"></slot>
          </div>
          <slot name="app-footer"></slot>
          <div app-panel="">
          </div>
        </mock:shadow-root>
      </rds-app-layout>
    `);
  });

  it('renders default Type layout', async () => {
    const page = await newSpecPage({
      components: [RdsAppLayout],
      html: `<rds-app-layout type="base"><div slot="app-content"></div></rds-app-layout>`,
    });
    expect(page.root).toEqualHtml(`
        <rds-app-layout sidebar="left" type="base">
        <mock:shadow-root>
        <div class="app-layout-wrapper">
        <div class="app-layout-content-wrapper">
          <div class="app-left-sidebar-outer desktop-nav-closed mobile-nav-closed">
            <div class="app-left-sidebar-inner">
              <div class="app-sidebar-logo show-nav-logo">
                <slot name="app-logo"></slot>
                <div class="app-title">
                  <slot name="app-title"></slot>
                </div>
              </div>
              <div class="nav-outer">
                <slot name="app-nav"></slot>
              </div>
            </div>
          </div>
          <div class="app-content" id="app-content">
            <slot name="app-hero"></slot>
            <main>
              <slot name="app-content"></slot>
            </main>
            <slot name="app-footer"></slot>
          </div>
        </div>
        </div>
        </mock:shadow-root>
        <div slot="app-content"></div>
      </rds-app-layout>
    `);
  });

  it('will close nav', async () => {
    let cmp = new RdsAppLayout();
    cmp.closeNav();
    expect(cmp.preventScroll).toBeFalsy();
    expect(cmp.mobileNavOpen).toBeFalsy();
  });

  it('will close nav backdrop', async () => {
    let cmp = new RdsAppLayout();
    cmp.backdropCloseNav();
    expect(cmp.preventScroll).toBeFalsy();
  });

  it('will open nav', async () => {
    let cmp = new RdsAppLayout();
    cmp.openSideBar();
    expect(cmp.preventScroll).toBeTruthy();
    expect(cmp.mobileNavOpen).toBeTruthy();
  });

  it('renders default Type layout with App Content Full', async () => {
    const page = await newSpecPage({
      components: [RdsAppLayout],
      html: `<rds-app-layout type="base"><div slot="app-content-full"></div></rds-app-layout>`,
    });
    expect(page.root).toEqualHtml(`
    <rds-app-layout sidebar="left" type="base">
    <mock:shadow-root>
    <div class="app-layout-wrapper">
    <div class="app-layout-content-wrapper">
      <div class="app-left-sidebar-outer desktop-nav-closed mobile-nav-closed">
        <div class="app-left-sidebar-inner">
          <div class="app-sidebar-logo show-nav-logo">
            <slot name="app-logo"></slot>
            <div class="app-title">
              <slot name="app-title"></slot>
            </div>
          </div>
          <div class="nav-outer">
            <slot name="app-nav"></slot>
          </div>
        </div>
      </div>
      <div class="app-content app-content-full" id="app-content">
        <slot name="app-hero"></slot>
        <main>
          <slot name="app-content-full"></slot>
        </main>
        <slot name="app-footer"></slot>
      </div>
    </div>
    </div>
    </mock:shadow-root>
    <div slot="app-content-full"></div>
  </rds-app-layout>
`);
  });
  it('renders default Type layout with Existing App Content to ensure its not affecting by the changes of app content full', async () => {
    const page = await newSpecPage({
      components: [RdsAppLayout],
      html: `<rds-app-layout type="base"><div slot="app-content"></div></rds-app-layout>`,
    });
    expect(page.root).toEqualHtml(`
    <rds-app-layout sidebar="left" type="base">
    <mock:shadow-root>
    <div class="app-layout-wrapper">
    <div class="app-layout-content-wrapper">
      <div class="app-left-sidebar-outer desktop-nav-closed mobile-nav-closed">
        <div class="app-left-sidebar-inner">
          <div class="app-sidebar-logo show-nav-logo">
            <slot name="app-logo"></slot>
            <div class="app-title">
              <slot name="app-title"></slot>
            </div>
          </div>
          <div class="nav-outer">
            <slot name="app-nav"></slot>
          </div>
        </div>
      </div>
      <div class="app-content" id="app-content">
        <slot name="app-hero"></slot>
        <main>
          <slot name="app-content"></slot>
        </main>
        <slot name="app-footer"></slot>
      </div>
    </div>
    </div>
    </mock:shadow-root>
    <div slot="app-content"></div>
  </rds-app-layout>
`);
  });
});
