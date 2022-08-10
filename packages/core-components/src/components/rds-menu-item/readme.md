## rds-menu-item Readme

<rds-alert appearance="info" visible>
  <span slot="title">
    React Integration Notes
  </span>
  <span class="text-sm" slot="message">
    Component events can be used two ways: <br /><br />
    Events will commonly be used as a React prop, in which case, they will be prefixed with 'on' and use camel case. Example: The React prop for the event `rdsOnChange` is `onRdsOnChange`. <br /><br />
    Alternatively, you can attach an event listener to the component, in which case the event name remains the same.
  </span>
</rds-alert>

<!-- Auto Generated Below -->


### Properties

| Property   | Attribute  | Description                            | Type      | Default |
| ---------- | ---------- | -------------------------------------- | --------- | ------- |
| `disabled` | `disabled` | Set the disabled state of a menu item. | `boolean` | `false` |
| `divider`  | `divider`  | Adds a divider to a menu item.         | `boolean` | `false` |
| `value`    | `value`    | The value of the menu item.            | `string`  | `''`    |


### Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `rdsMenuItemSelect` |             | `CustomEvent<any>` |


### Slots

| Slot          | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
|               | Used to add content to your menu item.                               |
| `"selection"` | Used to add a checkbox to your menu item in the case of a selection. |


----------------------------------------------

_Built for Resilience Design System @ FM Global_
