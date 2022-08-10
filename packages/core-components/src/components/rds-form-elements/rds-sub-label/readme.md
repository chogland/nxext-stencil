## rds-sub-label Readme

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

| Property | Attribute | Description                                                    | Type         | Default     |
| -------- | --------- | -------------------------------------------------------------- | ------------ | ----------- |
| `for`    | `for`     | Sets up the input id if the string is passed.                  | `string`     | `''`        |
| `type`   | `type`    | If type is 'headline', the sub-label's color will be gray-500. | `"headline"` | `undefined` |


### Slots

| Slot | Description                        |
| ---- | ---------------------------------- |
|      | Used to add text to the sub-label. |


----------------------------------------------

_Built for Resilience Design System @ FM Global_
