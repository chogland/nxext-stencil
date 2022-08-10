## rds-file-list Readme

<!-- Auto Generated Below -->


### Properties

| Property    | Attribute   | Description                                                                                                                   | Type      | Default |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `clickable` | `clickable` | The clickable property controls whether or not hover events occur on filelist. If true, the file list's hover state is shown. | `boolean` | `false` |


### Slots

| Slot             | Description                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| `"detail"`       | To provide additional detail like time, user, or even a component for action.                          |
| `"hover-action"` | Optionally place a component here to show that action on hover. Recommended to use RdsButton here.     |
| `"icon"`         | Place an `RdsHeroIcon` of size="xl" here to indicate what type of file it is.                          |
| `"name"`         | Place an `RdsText` here for the file name. Ensure the type is set to "inline" to get expected results. |
| `"subtitle"`     | Additional details can be added to this slot. We recommend another `RdsText`.                          |


----------------------------------------------

_Built for Resilience Design System @ FM Global_
