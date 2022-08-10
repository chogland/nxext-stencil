import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rds-file-uploader-file',
  styleUrl: 'rds-file-uploader-file.scss',
  shadow: true,
})
export class FileUploaderFile {
  /**
   * Sets the file id
   */
  @Prop() fileId: number = null;

  /**
   * Sets the file name
   */
  @Prop() name: string = '';

  /**
   * Event that gets triggered on file removal
   */
  @Event() rdsRemovedFile: EventEmitter;

  remove() {
    this.rdsRemovedFile.emit({
      fileId: this.fileId,
    });
  }

  render() {
    return (
      <div class="files-content">
        <div class="files-content-icon">
          <rds-hero-icon name="check-circle" color="purple-600"></rds-hero-icon>
        </div>
        <div class="files-content-file">
          <span class="files-content-file-name">{this.name}</span>
          <button class="files-content-file-remove" onClick={() => this.remove()}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}
