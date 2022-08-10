## rds-app-layout Readme
<!-- Auto Generated Below -->


### Properties

| Property          | Attribute          | Description                                                                                                                                                                     | Type                                    | Default     |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------- |
| `backgroundColor` | `background-color` | <span style="color:red">**[DEPRECATED]**</span> Sets whether the background of the content region is FM Gray or FM White on Default/Phase 1 and Workflow App Layouts.<br/><br/> | `string`                                | `'gray'`    |
| `headerWidth`     | `header-width`     | This property can change the width of the header from auto to full-screen.                                                                                                      | `"full"`                                | `undefined` |
| `panel`           | `panel`            | <span style="color:red">**[DEPRECATED]**</span> Sets the display of the flyout slot for slide out content<br/><br/>                                                             | `boolean`                               | `true`      |
| `sidebar`         | `sidebar`          | Sets whether the sidebars are displayed Options are: left, right, both, none                                                                                                    | `"both" , "left" , "none" , "right"` | `'left'`    |
| `type`            | `type`             | <span style="color:red">**[DEPRECATED]**</span> Determines the layout based on the journey. 'base' for latest design; undefined for phase 1 design.<br/><br/>                   | `"base"`                                | `undefined` |


### Slots

| Slot                 | Description                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `"app-content"`      | Use this slot to add main body content. This slot exists for the base app layout only.                                              |
| `"app-content-full"` | Use this slot to add main body content entire width and height. This slot exists for the base app layout only.                      |
| `"app-footer"`       | Use this slot to add a footer.                                                                                                      |
| `"app-header"`       | Use this slot to add a header.                                                                                                      |
| `"app-hero"`         | Use this slot to add a full-width hero below the header and above the main body content. This slot exists for base app layout only. |
| `"app-logo"`         | Use this slot to add a logo to the left sidebar. This slot exists for base app layout only.                                         |
| `"app-nav"`          | Use this slot to add a navigation to the left sidebar. This slot exists for base app layout only.                                   |
| `"app-right"`        | Use this slot to add a right sidebar. This slot exists for the base app layout only.                                                |
| `"app-title"`        | Use this slot to add a title text next to the left sidebar's logo. This slot exists for base app layout only.                       |


----------------------------------------------

_Built for Resilience Design System @ FM Global_
