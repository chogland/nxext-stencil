## rds-combobox-item Readme



<!-- Auto Generated Below -->


### Properties

| Property                 | Attribute    | Description                                                                        | Type      | Default     |
| ------------------------ | ------------ | ---------------------------------------------------------------------------------- | --------- | ----------- |
| `active`                 | `active`     | True when item is highlighted either from keyboard or mouse hover                  | `boolean` | `false`     |
| `disabled`               | `disabled`   | When true, the item cannot be clicked and is visually muted.                       | `boolean` | `false`     |
| `guid`                   | `guid`       | Unique identifier, used for accessibility                                          | `string`  | `guid()`    |
| `selected`               | `selected`   | Set this to true to pre-select an item. Toggles when an item is checked/unchecked. | `boolean` | `false`     |
| `textLabel` _(required)_ | `text-label` | The main label for this item.                                                      | `string`  | `undefined` |
| `value` _(required)_     | `value`      | The item's associated value                                                        | `any`     | `undefined` |


### Events

| Event                   | Description                                          | Type               |
| ----------------------- | ---------------------------------------------------- | ------------------ |
| `rdsComboboxItemChange` | Emitted whenever the item is selected or unselected. | `CustomEvent<any>` |


### Methods

#### `toggleSelected(coerce?: boolean) => Promise<void>`

Used to toggle the selection state. By default this won't trigger an event.
The first argument allows the value to be coerced, rather than swapping values.

##### Returns

Type: `Promise<void>`




### Dependencies

#### Depends on

- [rds-hero-icon](../../rds-hero-icon)

#### Graph
```mermaid
graph TD;
  rds-combobox-item --> rds-hero-icon
  style rds-combobox-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

_Built for Resilience Design System @ FM Global_
