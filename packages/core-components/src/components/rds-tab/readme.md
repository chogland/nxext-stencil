## rds-tab Readme

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

| Property           | Attribute  | Description                                                                                                                                         | Type      | Default     |
| ------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `active`           | `active`   | If `true`, the tab appears in an active state.                                                                                                      | `boolean` | `false`     |
| `disabled`         | `disabled` | If `true`, the user cannot interact with the tab.                                                                                                   | `boolean` | `false`     |
| `href`             | `href`     | Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered.                             | `string`  | `undefined` |
| `selected`         | `selected` | <span style="color:red">**[DEPRECATED]**</span> <br/><br/>The selected tab component                                                                | `boolean` | `false`     |
| `tab` _(required)_ | `tab`      | A tab id must be provided for each `rds-tab`. It's used internally to reference the selected tab to switch between them.                            | `string`  | `undefined` |
| `target`           | `target`   | Specifies where to display the linked URL. Only applies when an `href` is provided. Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`. | `string`  | `undefined` |


### Events

| Event               | Description                            | Type                               |
| ------------------- | -------------------------------------- | ---------------------------------- |
| `rdsTabButtonClick` | Emitted when the tab button is clicked | `CustomEvent<TabClickEventDetail>` |


### Methods

#### `getTabIndex() => Promise<number>`

Return the index of this tab within the tab array

##### Returns

Type: `Promise<number>`



#### `setActive() => Promise<void>`

Set the active component for the tab

##### Returns

Type: `Promise<void>`




### Slots

| Slot      | Description                                                   |
| --------- | ------------------------------------------------------------- |
|           | Use this slot to add text to the tab.                         |
| `"start"` | Use this slot for adding a leading `RdsHeroIcon` to your tab. |


----------------------------------------------

_Built for Resilience Design System @ FM Global_
