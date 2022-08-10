## rds-file-uploader-file Readme



<!-- Auto Generated Below -->


### Properties

| Property | Attribute | Description        | Type     | Default |
| -------- | --------- | ------------------ | -------- | ------- |
| `fileId` | `file-id` | Sets the file id   | `number` | `null`  |
| `name`   | `name`    | Sets the file name | `string` | `''`    |


### Events

| Event            | Description                               | Type               |
| ---------------- | ----------------------------------------- | ------------------ |
| `rdsRemovedFile` | Event that gets triggered on file removal | `CustomEvent<any>` |


### Dependencies

#### Used by

 - [rds-file-uploader](..)

#### Depends on

- [rds-hero-icon](../../../rds-hero-icon)

#### Graph
```mermaid
graph TD;
  rds-file-uploader-file --> rds-hero-icon
  rds-file-uploader --> rds-file-uploader-file
  style rds-file-uploader-file fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

_Built for Resilience Design System @ FM Global_
