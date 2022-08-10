## rds-filter Readme

<!-- Auto Generated Below -->


### Properties

| Property        | Attribute       | Description                                                                                                          | Type      | Default    |
| --------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- | --------- | ---------- |
| `filterResults` | `filterresults` | <span style="color:red">**[DEPRECATED]**</span> Apply filter search results for mobile breakpoints<br/><br/>         | `number`  | `0`        |
| `isToggled`     | `istoggled`     | <span style="color:red">**[DEPRECATED]**</span> Sets the toggle property of the filter component container<br/><br/> | `boolean` | `false`    |
| `label`         | `label`         | <span style="color:red">**[DEPRECATED]**</span> Accessible label for filter.<br/><br/>                               | `string`  | `'filter'` |


### Slots

| Slot               | Description                        |
| ------------------ | ---------------------------------- |
| `"clear-filter"`   | Used to add a clear button.        |
| `"filter-list"`    | Used to add a group of checkboxes. |
| `"filter-results"` | Used to add filter results.        |
| `"submit-filter"`  | Used to add a submit button.       |


### Dependencies

#### Depends on

- [rds-button](../rds-button)
- [rds-icon](../rds-icon)

#### Graph
```mermaid
graph TD;
  rds-filter --> rds-button
  rds-filter --> rds-icon
  style rds-filter fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

_Built for Resilience Design System @ FM Global_
