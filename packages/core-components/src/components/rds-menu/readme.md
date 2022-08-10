## rds-menu Readme

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

| Property             | Attribute             | Description                                                                                    | Type                                                      | Default      |
| -------------------- | --------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------ |
| `disableClose`       | `disable-close`       | Disables the automatic closing on menu item click.                                             | `boolean`                                                 | `false`      |
| `disabled`           | `disabled`            | Sets the menu trigger to disabled                                                              | `boolean`                                                 | `false`      |
| `hover`              | `hover`               | Sets the behavior of the menu trigger as hover instead of click.                               | `boolean`                                                 | `false`      |
| `isOpen`             | `is-open`             | The open state of the menu.                                                                    | `boolean`                                                 | `false`      |
| `offsetDistance`     | `offset-distance`     | Offset the position of the popover away from the reference element.                            | `number`                                                  | `16`         |
| `offsetSkidding`     | `offset-skidding`     | Offset the position of the popover along the reference element.                                | `number`                                                  | `0`          |
| `overlayPositioning` | `overlay-positioning` | Describes the type of positioning to use for the overlaid content.                             | `"absolute" , "fixed"`                                   | `'absolute'` |
| `position`           | `position`            | Sets the position of the menu.                                                                 | `"auto" , "bottom" , "left" , "right" , "top"`        | `'bottom'`   |
| `scrolling`          | `scrolling`           | Sets the scrolling of the panel on the menu.                                                   | `boolean`                                                 | `false`      |
| `shadow`             | `shadow`              | <span style="color:red">**[DEPRECATED]**</span> <br/><br/>Toggles the dropshadow on the panel. | `boolean`                                                 | `false`      |
| `width`              | `width`               | <span style="color:red">**[DEPRECATED]**</span> <br/><br/>Sets the width of the panel.         | `"auto" , "lg" , "md" , "sm" , "xl" , "xlg" , "xs"` | `'auto'`     |


### Events

| Event           | Description                                               | Type               |
| --------------- | --------------------------------------------------------- | ------------------ |
| `rdsMenuSelect` | Fires when a menu item has been selected or deselected. * | `CustomEvent<any>` |


### Methods

#### `closeMenu() => Promise<void>`

Closes the menu.

##### Returns

Type: `Promise<void>`



#### `openMenu() => Promise<void>`

Opens the menu.

##### Returns

Type: `Promise<void>`



#### `reposition() => Promise<void>`



##### Returns

Type: `Promise<void>`



#### `toggleMenu() => Promise<void>`

Toggles the menu.

##### Returns

Type: `Promise<void>`




### Slots

| Slot               | Description                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `"custom-trigger"` | Use this slot to add a custom menu trigger to your component. You must control the toggling of the menu yourself when using this slot. |
| `"menu-content"`   | Use this slot to add as many menu content items as needed. Please use the `RdsMenuItem` component in this slot.                        |
| `"menu-footer"`    | Use this slot to add a footer to your menu panel, which would appear below your menu-content slot items.                               |
| `"menu-header"`    | Use this slot to add a header to your menu panel, which would appear before your menu-content slot items.                              |
| `"menu-trigger"`   | Use this slot to add a menu trigger to your component. Please use a `RdsButton` or `RdsLink` as the trigger in this slot.              |


----------------------------------------------

 
