import { Component, Prop, State, Event, EventEmitter, Watch, h, Method } from '@stencil/core';

let fileCount = 1;

/**
 * @slot hint - File uploader hint text / components.
 */

@Component({
  tag: 'rds-file-uploader',
  styleUrl: 'rds-file-uploader.scss',
  shadow: true,
})
export class RdsFileUploader {
  /**
   * File uploader text.
   */
  @Prop({ mutable: true }) text: string = 'Upload a file';

  /**
   * File uploader description.
   */
  @Prop({ mutable: true }) description: string = 'or drag and drop';

  /**
   * Comma separated string; tells us what file formats file uploader should accept.
   */
  @Prop() accept: string = '';

  /**
   * Maximum file size the file uploader must accept.
   */
  @Prop() maxFileSize: number = 0;

  /**
   * Error message to display when format is invalid.
   */
  @Prop({ mutable: true }) acceptError: string = 'File format not accepted';

  /**
   * Error message to display when file size exceeds limit.
   */
  @Prop({ mutable: true }) maxFileSizeError: string = 'Exceeding maximum file size';

  /**
   * Error message when going beyond files limit.
   */
  @Prop({ mutable: true }) maxFilesLimitError: string = 'Exceeding maximum files limit';

  /**
   * Error message when a file upload fails.
   */
  @Prop({ mutable: true }) fileUploadError: string = 'File upload failed';

  /**
   * URL to make server call.
   */
  @Prop() actionURL: string = '';

  /**
   * Additional information to send to server other than the file.
   */
  @Prop() actionParams: any = {};

  /**
   * If multiple files are allowed.
   */
  @Prop() multiple: boolean = false;

  /**
   * Max files allowed to upload.
   */
  @Prop() filesLimit: number = 10;

  /**
   * Passes modifications to the xhr request.
   */
  @Prop() modifyRequest: (xhr: any) => any = xhr => xhr;

  /**
   * Different stages in file uploader.
   */
  @State() stage: 'dropzone' | 'files' | 'progress' = 'dropzone';

  /**
   * Files collection.
   */
  @State() files: any = [];

  /**
   * Errors collection.
   */
  @State() errors: any = [];

  /**
   * Event that gets emitted when files get uploaded
   */
  @Event() rdsFilesUploaded: EventEmitter;

  /**
   * Event that gets emitted when file is reuploaded
   */
  @Event() rdsFileReuploaded: EventEmitter;

  /**
   * Event that gets emitted when component stage changes
   */
  @Event() rdsStageChanged: EventEmitter;

  fileInputElement: HTMLElement = null;
  isFileUploadInProgress = false;
  fileUploadPromises: any = [];
  formDataCollection: any = {};

  @Watch('stage')
  stageChange(newStage) {
    switch (newStage) {
      case 'dropzone':
        this.formDataCollection = {};
        this.fileUploadPromises = [];
        this.errors = [];
        this.files = [];
        break;
      default:
        break;
    }
    this.rdsStageChanged.emit({ stage: newStage });
  }

  /**
   * Upload the files locally and add it to form for sending to server
   */
  uploadFileLocally(file) {
    const formData = new FormData();
    formData.append('file', file);
    this.formDataCollection[fileCount] = formData;
    this.files.push({
      id: fileCount,
      name: file.name,
      progress: 0,
      error: '',
    });
    fileCount = fileCount + 1;
  }

  /**
   * Uploads the file to the server
   */
  uploadFile(fileId) {
    const formData = this.formDataCollection[fileId];
    // Adding extra information to formData before uploading
    for (const key in this.actionParams) {
      if (Object.prototype.hasOwnProperty.call(this.actionParams, key)) {
        formData.append(key, this.actionParams[key]);
      }
    }
    // Creating and sending xhr requests
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', this.progressHandler.bind(this, fileId), false);
    const fileUploadPromise = new Promise((resolve: any, reject: any) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Upload okay
            resolve({ uploadStatus: xhr.status, response: xhr.response });
          } else {
            // Upload Error
            this.setFile(fileId, { error: this.fileUploadError });
            reject({ uploadStatus: xhr.status, response: xhr.response });
          }
        }
      };
    });
    xhr.open('POST', this.actionURL);
    const modifiedRequest = this.modifyRequest(xhr);
    modifiedRequest.send(formData);
    return fileUploadPromise;
  }

  /**
   * Retry a file upload
   */
  retryFileUpload(fileId) {
    this.setFile(fileId, { error: '' });
    const uploadPromise = this.uploadFile(fileId);
    this.fileUploadPromises = [uploadPromise];
    Promise.allSettled(this.fileUploadPromises).then((responses: any) => {
      this.rdsFileReuploaded.emit(responses[0].value);
    });
  }

  /**
   * Uploads the files to the server; emits an after file is uploaded
   */
  @Method()
  async uploadFiles() {
    if (this.files.length && !this.isFileUploadInProgress) {
      this.stage = 'progress';
      this.isFileUploadInProgress = true;
      for (const fileId in this.formDataCollection) {
        if (Object.prototype.hasOwnProperty.call(this.formDataCollection, fileId)) {
          const uploadPromise = this.uploadFile(parseInt(fileId));
          this.fileUploadPromises.push(uploadPromise);
        }
      }
      Promise.allSettled(this.fileUploadPromises).then((responses: any) => {
        const responseValues = responses.map((response: any) => response.value);
        const responseValue = this.multiple ? responseValues : responseValues[0];
        this.rdsFilesUploaded.emit(responseValue);
        this.isFileUploadInProgress = false;
      });
    }
  }

  /**
   * Remove a file from the form and files collection
   */
  removeFile(fileId) {
    const fileIndex = this.files.findIndex(file => file.id === fileId);
    if (fileIndex >= 0) {
      const beforeFiles = this.files.slice(0, fileIndex);
      const afterFiles = this.files.slice(fileIndex + 1, this.files.length + 1);
      this.files = [...beforeFiles, ...afterFiles];
      delete this.formDataCollection[fileId];
      if (!this.files.length) {
        this.stage = 'dropzone';
      }
    }
  }

  /**
   * Validates a file for upload
   */
  fileValidation(file) {
    let isPassed = true;
    const fileExtension = file.name;
    const fileSize = file.size;
    const errors: any = [];
    if (this.accept) {
      isPassed = this.accept
        .split(',')
        .filter(fileType => fileType !== '')
        .some(fileType => fileExtension.includes(fileType.trim()));
      if (!isPassed) {
        errors.push(this.acceptError);
      }
    }
    if (this.maxFileSize !== 0) {
      if (fileSize > this.maxFileSize * 1024 * 1024) {
        isPassed = false;
        errors.push(this.maxFileSizeError);
      }
    }
    this.errors = [...this.errors, ...errors];
    return isPassed;
  }

  /**
   * Update the file object in files collection
   */
  setFile(fileId: number, errorObject: any) {
    let change: boolean;
    const fileIndex = this.files.findIndex(file => file.id === fileId);
    if (fileIndex >= 0) {
      this.files = [...this.files.slice(0, fileIndex), Object.assign(this.files[fileIndex], errorObject), ...this.files.slice(fileIndex + 1, this.files.length)];
      change = true;
    } else {
      change = false;
    }
    return change;
  }

  /**
   * Drag and drop handler
   */
  dropHandler(event) {
    event.preventDefault();
    this.fileHandler(event);
  }

  /**
   * Handler for both drop and input change
   */
  fileHandler(event) {
    let passed = true;
    const tempFiles = event.target.files || event.dataTransfer.files;
    const files = this.multiple ? tempFiles : [tempFiles[0]];
    this.errors = [];
    if (files.length <= this.filesLimit) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        passed = this.fileValidation(file);
        if (!passed) {
          break;
        }
      }
    } else {
      this.errors = [this.maxFilesLimitError];
      passed = false;
    }
    if (passed) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        this.uploadFileLocally(file);
        this.stage = 'files';
      }
    }
  }

  /**
   * Updates the progress on files
   */
  progressHandler(fileId, event) {
    const fileIndex = this.files.findIndex(file => fileId === file.id);
    if (fileIndex >= 0) {
      const progressPercentage = (event.loaded / event.total) * 100;
      const file = { ...this.files[fileIndex], progress: progressPercentage };
      const beforeFiles = this.files.slice(0, fileIndex);
      const afterFiles = this.files.slice(fileIndex + 1, this.files.length + 1);
      this.files = [...beforeFiles, file, ...afterFiles];
    }
  }

  renderFileUploader() {
    let template = null;
    switch (this.stage) {
      case 'dropzone':
        template = this.renderDropzone();
        break;
      case 'progress':
        template = this.renderProgress();
        break;
      case 'files':
        template = this.renderFiles();
        break;
      default:
        break;
    }
    return template;
  }

  renderDropzone() {
    const multipleFiles = this.multiple ? { multiple: true } : {};
    return (
      <div>
        <div
          class="dropzone"
          key="dropzone"
          tabIndex={0}
          onDrop={event => this.dropHandler(event)}
          onDragOver={event => event.preventDefault()}
          onClick={() => this.fileInputElement.click()}
          onKeyUp={event => {
            if (event.key === 'Enter' || event.key === 'Space') {
              this.fileInputElement.click();
            }
          }}
          role="button"
        >
          <div class="dropzone-center">
            <div class="drop-clickable">
              <div class="drop-clickable-icon">
                <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="drop-clickable-container">
                <div class="drop-clickable-text">
                  <input type="file" hidden {...multipleFiles} style={{ display: 'none' }} onChange={ev => this.fileHandler(ev)} ref={el => (this.fileInputElement = el)}></input>
                  {this.text}
                </div>
                <div class="drop-clickable-hint">
                  <span>{this.description}</span>
                </div>
              </div>
            </div>
            {this.errors.length ? (
              <div class="dropzone-error">
                {this.errors.map((message: string) => (
                  <span>{message}</span>
                ))}
              </div>
            ) : (
              <div class="dropzone-hint">
                <slot name="hint" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  renderProgress() {
    return (
      <div class="progress" key="progress">
        <div class="progress-center">
          <div class="progress-title">Uploading</div>
          {this.files.map(file => (
            <rds-file-uploader-progress
              fileId={file.id}
              fileName={file.name}
              progress={file.progress}
              error={file.error}
              onRdsRetriedUpload={event => this.retryFileUpload(event.detail.fileId)}
            ></rds-file-uploader-progress>
          ))}
        </div>
      </div>
    );
  }

  renderFiles() {
    return (
      <div class="files" key="files">
        <div class="files-center">
          <div class="files-title">Selected Files</div>
          {this.files.map(file => (
            <rds-file-uploader-file
              fileId={file.id}
              name={file.name}
              onRdsRemovedFile={event => {
                event.stopPropagation();
                this.removeFile(event.detail.fileId);
              }}
            ></rds-file-uploader-file>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return <div class="file-uploader-container">{this.renderFileUploader()}</div>;
  }
}
