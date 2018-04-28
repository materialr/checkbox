import * as checkbox from '@material/checkbox';
import * as formField from '@material/form-field';
import { mount, shallow } from 'enzyme';
import React from 'react';

import Checkbox from './index';

const LABEL = 'LABEL';

test('Renders the default classNames', () => {
  const wrapper = shallow(<Checkbox label={LABEL} />, { disableLifecycleMethods: true });
  const expected = 'mdc-checkbox';

  const actual = wrapper.find('div').at(1).props().className;

  expect(actual).toBe(expected);
});

test('Renders additional classNames from the \'className\' prop', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <Checkbox className={CLASS_NAME} label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-checkbox ${CLASS_NAME}`;

  const actual = wrapper.find('div').at(1).props().className;

  expect(actual).toBe(expected);
});

test('Passes the id to the input and the label', () => {
  const ID = 'ID';
  const wrapper = shallow(<Checkbox id={ID} label={LABEL} />, { disableLifecycleMethods: true });
  const expectedInput = ID;
  const expectedLabel = ID;

  const actualInput = wrapper.find('input').props().id;
  const actualLabel = wrapper.find('label').props().htmlFor;

  expect(actualInput).toBe(expectedInput);
  expect(actualLabel).toBe(expectedLabel);
});

test('Generates a unique id per instance if none is given', () => {
  const wrapperOne = shallow(<Checkbox label={LABEL} />, { disableLifecycleMethods: true });
  const wrapperTwo = shallow(<Checkbox label={LABEL} />, { disableLifecycleMethods: true });

  const actualOne = wrapperOne.find('input').props().id;
  const actualTwo = wrapperTwo.find('input').props().id;

  expect(actualOne).not.toBe(actualTwo);
});

test('Passes through the correct props', () => {
  const DISABLED = true;
  const NAME = 'NAME';
  const ON_BLUR = () => 'ON_BLUR';
  const ON_CHANGE = () => 'ON_CHANGE';
  const ON_DRAG_START = () => 'ON_DRAG_START';
  const ON_DROP = () => 'ON_DROP';
  const ON_FOCUS = () => 'ON_FOCUS';
  const wrapper = shallow(
    <Checkbox
      disabled={DISABLED}
      label={LABEL}
      name={NAME}
      onBlur={ON_BLUR}
      onChange={ON_CHANGE}
      onDragStart={ON_DRAG_START}
      onDrop={ON_DROP}
      onFocus={ON_FOCUS}
    />,
    { disableLifecycleMethods: true },
  );
  const expectedDisabled = DISABLED;
  const expectedLabel = LABEL;
  const expectedName = NAME;
  const expectedOnBlur = ON_BLUR;
  const expectedOnChange = ON_CHANGE;
  const expectedOnDragStart = ON_DRAG_START;
  const expectedOnDrop = ON_DROP;
  const expectedOnFocus = ON_FOCUS;

  const inputProps = wrapper.find('input').props();
  const actualDisabled = inputProps.disabled;
  const actualLabel = wrapper.find('label').props().children;
  const actualName = inputProps.name;
  const actualOnBlur = inputProps.onBlur;
  const actualOnChange = inputProps.onChange;
  const actualOnDragStart = inputProps.onDragStart;
  const actualOnDrop = inputProps.onDrop;
  const actualOnFocus = inputProps.onFocus;

  expect(actualDisabled).toBe(expectedDisabled);
  expect(actualLabel).toBe(expectedLabel);
  expect(actualName).toBe(expectedName);
  expect(actualOnBlur).toBe(expectedOnBlur);
  expect(actualOnChange).toBe(expectedOnChange);
  expect(actualOnDragStart).toBe(expectedOnDragStart);
  expect(actualOnDrop).toBe(expectedOnDrop);
  expect(actualOnFocus).toBe(expectedOnFocus);
});

test('Creates the MDCFormField and MDCCheckbox component on mount', () => {
  const MDCCheckbox = jest.fn();
  const MDCFormField = jest.fn();
  checkbox.MDCCheckbox = MDCCheckbox;
  formField.MDCFormField = MDCFormField;
  const wrapper = mount(<Checkbox label={LABEL} />);
  const instance = wrapper.instance();
  const expectedCheckbox = instance.elementCheckbox;
  const expectedFormField = instance.elementFormField;

  const actualCheckbox = MDCCheckbox.mock.calls[0][0];
  const actualFormField = MDCFormField.mock.calls[0][0];

  expect(actualCheckbox).toBe(expectedCheckbox);
  expect(actualFormField).toBe(expectedFormField);
});

test('Destroys the MDCFormField component on unmount', () => {
  const destroyCheckbox = jest.fn();
  const destroyFormField = jest.fn();
  const wrapper = mount(<Checkbox label={LABEL} />);
  const instance = wrapper.instance();
  const expectedCheckbox = 1;
  const expectedFormField = 1;
  instance.checkbox.destroy = destroyCheckbox;
  instance.formField.destroy = destroyFormField;

  wrapper.unmount();
  const actualCheckbox = destroyCheckbox.mock.calls.length;
  const actualFormField = destroyFormField.mock.calls.length;

  expect(actualCheckbox).toBe(expectedCheckbox);
  expect(actualFormField).toBe(expectedFormField);
});
