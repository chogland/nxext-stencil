import { newSpecPage } from '@stencil/core/testing';
import { RdsFileUploader } from '../rds-file-uploader';

describe('rds-file-uploader', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RdsFileUploader],
      html: `<rds-file-uploader></rds-file-uploader>`,
    });
    expect(page.root).toEqualHtml(`
    <rds-file-uploader>
      <mock:shadow-root>
        <div class="file-uploader-container">
          <div>
            <div class="dropzone" role="button" tabindex="0">
              <div class="dropzone-center">
                <div class="drop-clickable">
                  <div class="drop-clickable-icon">
                    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                  </div>
                  <div class="drop-clickable-container">
                    <div class="drop-clickable-text">
                      <input hidden="" type="file" style="display: none;">
                       Upload a file
                    </div>
                    <div class="drop-clickable-hint">
                       <span>
                          or drag and drop
                        </span>
                    </div>
                  </div>
                </div>
                  <div class="dropzone-hint">
                    <slot name="hint"></slot>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </mock:shadow-root>
    </rds-file-uploader>
   `);
  });
});
