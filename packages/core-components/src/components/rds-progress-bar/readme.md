## rds-progress-bar Readme

<!-- Auto Generated Below -->


### Properties

| Property       | Attribute       | Description                                                               | Type     | Default          |
| -------------- | --------------- | ------------------------------------------------------------------------- | -------- | ---------------- |
| `label`        | `label`         | Sets the label for the progress bar.                                      | `string` | `'Progress Bar'` |
| `maximumValue` | `maximum-value` | The maximum value of the component. The progress prop cannot exceed this. | `number` | `100`            |
| `value`        | `value`         | The initial progress value.                                               | `number` | `0`              |


### Methods

#### `updateProgress(newProgress: number, needsReflect?: boolean) => Promise<void>`

Updates the progress of the component and triggers an animation.

Functionality is same as changing the property.

##### Returns

Type: `Promise<void>`




----------------------------------------------

_Built for Resilience Design System @ FM Global_
