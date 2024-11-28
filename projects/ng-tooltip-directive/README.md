# Getting started with ng-tooltip-directive

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [CSS Configuration](#css-configuration)
- [Demo](#demo)
- [Version](#version)
- [License](#license)
- [Author](#author)

# Overview

#### ng-tooltip-directive is a versatile and customizable tooltip library designed for Angular and Ionic/Angular applications

# Features

- **Dynamic positioning**: Automatically adjusts when overflowing screen boundaries.
- **Customizable styles**: Modify tooltip styles using CSS variables or custom classes.
- **Seamless integration**: Easily integrates with Angular and Ionic frameworks (angular).

# Installation

**To install the library, run the following command:**

```bash
npm install @duyvu-fsdev/ng-tooltip-directive
```

### _If you encounter a dependency conflict with the required version, you can resolve it by:_

#### _using the --legacy-peer-deps flag:_

```bash
npm install @duyvu-fsdev/ng-tooltip-directive --legacy-peer-deps
```

# Usage

**1. Import the module**

##### Add TooltipModule to your module:

```typescript
/* *.module.ts */

import { TooltipModule } from '@duyvu-fsdev/ng-tooltip-directive';

@NgModule({
  imports: [..., TooltipModule],
})

export class YourModule {}
```

**2. Add the tooltip to your template**

##### Template Example:

```html
/* *.html */

<host-element tooltip [tooltipOption]="tooltipOption">
  <!-- content -->
</host-element>
```

##### TypeScript Example:

```typescript
// *.ts

import { Option } from '@duyvu-fsdev/ng-tooltip-directive';
...

export class YourComponent {
 ...
 tooltipOption: Option = {
  position: 'bottom',
  text: 'Hello, this is a tooltip!',
  class: 'custom-tooltip'
 };
}
```

##### Option Interface

| Property   | Type                                                 |  Default   | Description                                  | Example                  |
| ---------- | ---------------------------------------------------- | :--------: | -------------------------------------------- | ------------------------ |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'\| undefined` | `'bottom'` | Position of the tooltip relative to the host | `'bottom'`               |
| `text`     | `string`                                             |    `''`    | Tooltip text content                         | `'Tooltip text content'` |
| `class`    | `string`                                             |    `''`    | CSS class for custom styling                 | `'custom-tooltip'`       |

# CSS Configuration

#### 1. Customize the variables to apply to all tooltips in the application

```scss
/* global.scss */

.app-tooltip {
  --tooltip-background: #fff;
  --tooltip-color: #000;
  --tooltip-border-radius: 4px;
  --tooltip-padding: 8px;
  --tooltip-max-width: 200px;
  --tooltip-height: auto;
}
```

#### 2. Customize for an individual tooltip using a custom class - e.g., "custom-tooltip"

```typescript
tooltipOption: Option = {
 ...
 class: 'custom-tooltip' /* Custom class for styling */
};
```

```scss
/* global.scss */

.app-tooltip.custom-tooltip {
  --tooltip-background: #fff;
  --tooltip-color: #000;
  --tooltip-border-radius: 4px;
  --tooltip-padding: 8px;
  --tooltip-max-width: 200px;
  --tooltip-height: auto;
}
```

##### You can also apply other custom styles using a custom class

```scss
/* global.scss */

.custom-tooltip {
  background: #f00 !important;
  color: #fff !important;
  padding: 10px !important;
  border-radius: 8px !important;
}
```

##### Additionally, to avoid cases where the tooltip may not display correctly for elements like span, h1, etc., you should set box-sizing for the host-element.

```scss
.host-element-css {
  box-sizing: border-box;
}
```

Or set box-sizing for all elements in your project (recommended):

```scss
/* global.scss */

* {
  box-sizing: border-box;
}
```

# Demo

**Demo on stackblitz**

[![Demo](https://github.com/user-attachments/assets/ad4a39e7-c062-43ef-b76f-55242a809f82)](https://stackblitz.com/~/github.com/duyvu-fsdev/ng-tooltip-directive-demo)

# Version

[2.0.0](https://www.npmjs.com/package/@duyvu-fsdev/ng-tooltip-directive/v/2.0.0) - (Big Update) Clean code, fix styles, remove init tooltip.

[1.1.3](https://www.npmjs.com/package/@duyvu-fsdev/ng-tooltip-directive/v/1.1.3) - Update Repository - Homepage

[1.1.1](https://www.npmjs.com/package/@duyvu-fsdev/ng-tooltip-directive/v/1.1.1)
[1.1.2](https://www.npmjs.com/package/@duyvu-fsdev/ng-tooltip-directive/v/1.1.2) - Update demo

[1.1.0](https://www.npmjs.com/package/@duyvu-fsdev/ng-tooltip-directive/v/1.1.0) - Fix styles, Update Usage

[1.0.1](https://www.npmjs.com/package/@duyvu-fsdev/ng-tooltip-directive/v/1.0.1) - Update Usage

# License

[MIT](https://choosealicense.com/licenses/mit/)

# Author

##### Developed and maintained by [duyvu-fsdev](https://github.com/duyvu-fsdev)
