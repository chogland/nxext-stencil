# calcite-date-day

<!-- Auto Generated Below -->


### Properties

| Property       | Attribute        | Description                                        | Type             | Default     |
| -------------- | ---------------- | -------------------------------------------------- | ---------------- | ----------- |
| `active`       | `active`         | Date is actively in focus for keyboard navigation  | `boolean`        | `false`     |
| `currentMonth` | `current-month`  | Date is in the current month.                      | `boolean`        | `false`     |
| `day`          | `day`            | Day of the month to be shown.                      | `number`         | `undefined` |
| `disabled`     | `disabled`       | Date is outside of range and can't be selected     | `boolean`        | `false`     |
| `endOfRange`   | `end-of-range`   | Date is the end of date range                      | `boolean`        | `false`     |
| `highlighted`  | `highlighted`    | Date is currently highlighted as part of the range | `boolean`        | `false`     |
| `localeData`   | --               | CLDR data for current locale                       | `DateLocaleData` | `undefined` |
| `range`        | `range`          | Showing date range                                 | `boolean`        | `false`     |
| `rangeHover`   | `range-hover`    |                                                    | `boolean`        | `false`     |
| `selected`     | `selected`       | Date is the current selected date of the picker    | `boolean`        | `false`     |
| `startOfRange` | `start-of-range` | Date is the start of date range                    | `boolean`        | `false`     |
| `value`        | --               | Date value for the day.                            | `Date`           | `undefined` |


### Events

| Event          | Description                   | Type               |
| -------------- | ----------------------------- | ------------------ |
| `rdsDaySelect` | Emitted when user selects day | `CustomEvent<any>` |


### Dependencies

#### Used by

 - [rds-date-picker-month](../rds-date-picker-month)

#### Graph
```mermaid
graph TD;
  rds-date-picker-month --> rds-date-picker-day
  style rds-date-picker-day fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

_Built for Resilience Design System @ FM Global_
