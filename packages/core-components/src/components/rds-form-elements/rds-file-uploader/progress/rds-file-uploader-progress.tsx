import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rds-file-uploader-progress',
  styleUrl: 'rds-file-uploader-progress.scss',
  shadow: true,
})
export class FileUploaderProgress {
  /**
   * Sets the file id
   */
  @Prop() fileId!: number;

  /**
   * Sets the file name
   */
  @Prop() fileName: string = '';

  /**
   * File upload progress
   */
  @Prop() progress: number = 0;

  /**
   * Error text for the file upload
   */
  @Prop() error: string = '';

  /**
   * Event to emit in case of a retry
   */
  @Event() rdsRetriedUpload: EventEmitter;

  retryFileUpload(fileId) {
    this.rdsRetriedUpload.emit({ fileId });
  }

  render() {
    const hasError = this.error.trim() !== '' ? true : false;
    return (
      <div class="progress-content">
        <div class="progress-content-icon">
          <rds-hero-icon type="outline" name="document" color="gray-400" />
        </div>
        <div class="progress-content-file">
          <div class="progress-content-file-name">{this.fileName}</div>
          <div class="progress-content-file-percentage">
            {hasError ? <rds-hero-icon name="refresh" color="purple-600" onClick={() => this.retryFileUpload(this.fileId)}></rds-hero-icon> : this.progress + '%'}
          </div>
          <div class="progress-content-progress-bar">
            <div
              class="progress-content-progress-bar-fill"
              style={{
                width: hasError ? '0%' : this.progress + '%',
              }}
            ></div>
          </div>
          {hasError && <div class="progress-content-error">{this.error}</div>}
        </div>
      </div>
    );
  }
}
