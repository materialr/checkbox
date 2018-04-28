# MaterialR Checkbox

**@materialr/checkbox**

[![Build Status](https://travis-ci.org/materialr/checkbox.svg?branch=master)](https://travis-ci.org/materialr/checkbox)
[![Coverage Status](https://coveralls.io/repos/github/materialr/checkbox/badge.svg?branch=master)](https://coveralls.io/github/materialr/checkbox?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/materialr/projects/31e86c18-b2d9-4071-b304-abe1ef7957d8/badge)](https://nodesecurity.io/orgs/materialr/projects/31e86c18-b2d9-4071-b304-abe1ef7957d8)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Material checkbox implementation for React

## Installation

```sh
$ npm install --save @materialr/checkbox
```

## Demo

A full demo is available on the [MaterialR website](https://materialr.github.io/components/checkbox)
showcasing all variants.

## Components

### Default export

```js
import Checkbox from '@materialr/checkbox';
```

**Props**

| Prop          | Type    | Required | Default    | Description                             |
| ------------- | ------- | -------- | ---------- | --------------------------------------- |
| `className`   | string  | No       | undefined  | Additional classNames to add            |
| `disabled`    | bool    | No       | false      | Whether the checkbox is disabled        |
| `id`          | string  | No       | `uuidv1()` | The id to add to the label and checkbox |
| `label`       | string  | Yes      | N/A        | The label for the checkbox              |
| `name`        | string  | No       | undefined  | The checkbox element's name attribute   |
| `onBlur`      | func    | No       | undefined  | The `blur` event handler                |
| `onChange`    | func    | No       | undefined  | The `change` event handler              |
| `onDragStart` | func    | No       | undefined  | The `dragstart` event handler           |
| `onDrop`      | func    | No       | undefined  | The `drop` event handler                |
| `onFocus`     | func    | No       | undefined  | The `focus` event handler               |
