import rippleFoundation from '@materialr/ripple';
import { mount, shallow } from 'enzyme';
import React from 'react';

import checkboxFoundation from './foundation';
import Checkbox from './index';

const NAME = 'NAME';

test('Renders only default className', () => {
  const wrapper = shallow(<Checkbox name={NAME} />, { disableLifecycleMethods: true });
  const expected = 'mdc-checkbox';

  const actual = wrapper.find('div').at(0).props().className;

  expect(actual).toBe(expected);
});

test('Renders extra classNames that are passed in', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <Checkbox className={CLASS_NAME} name={NAME} />,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-checkbox ${CLASS_NAME}`;

  const actual = wrapper.find('div').at(0).props().className;

  expect(actual).toBe(expected);
});

test('<Checkbox /> > Generates a unique id for each component', () => {
  const wrapperFirst = mount(<Checkbox name={NAME} />);
  const wrapperSecond = mount(<Checkbox name={NAME} />);

  const actualIdFirst = wrapperFirst.find('.mdc-checkbox__native-control').props().id;
  const actualIdsecond = wrapperSecond.find('.mdc-checkbox__native-control').props().id;

  expect(actualIdFirst).not.toBe(actualIdsecond);
});

test('Does not add a ripple when it is disabled', () => {
  const wrapper = mount(<Checkbox name={NAME} />, { disableLifecycleMethods: true });
  const expected = undefined;

  const actual = wrapper.instance().rippleFoundation;

  expect(actual).toBe(expected);
});

test('Adds the default foundation', () => {
  const wrapper = mount(<Checkbox name={NAME} rippleEnabled />);
  const instance = wrapper.instance();
  const { elementInput, elementRoot, updateClassNames } = instance;
  const expected = checkboxFoundation({
    elementInput,
    elementRoot,
    updateClassNames,
  });
  expected.init();

  const actual = instance.checkboxFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Destroys the default foundation when the component unmounts', () => {
  const wrapper = mount(<Checkbox name={NAME} />);
  const instance = wrapper.instance();
  instance.checkboxDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.checkboxDestroy).toHaveBeenCalledTimes(1);
});

test('Adds a ripple when it is enabled', () => {
  const wrapper = mount(<Checkbox name={NAME} rippleEnabled />);
  const { disabled } = wrapper.props();
  const instance = wrapper.instance();
  const { elementRoot, updateClassNames, updateCssVariables } = instance;
  const expected = rippleFoundation({
    centered: true,
    disabled,
    element: elementRoot,
    self: instance,
    updateClassNames,
    updateCssVariables,
  });

  const actual = instance.rippleFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Adds the ripple if the prop changes', () => {
  const wrapper = mount(<Checkbox name={NAME} />);
  const instance = wrapper.instance();
  instance.rippleCreate = jest.fn();

  wrapper.setProps({ rippleEnabled: true });

  expect(instance.rippleCreate).toHaveBeenCalledTimes(1);
});

test('Removes the ripple if the prop changes', () => {
  const wrapper = mount(<Checkbox name={NAME} rippleEnabled />);
  const instance = wrapper.instance();
  const expected = undefined;

  wrapper.setProps({ rippleEnabled: false });
  const actual = instance.rippleFoundation;

  expect(actual).toBe(expected);
});

test('Updates classNames in state when \'updateClassNames()\' is called', () => {
  const CLASS_NAMES = ['CLASS_NAME'];
  const wrapper = mount(<Checkbox name={NAME} />);
  const instance = wrapper.instance();
  const expected = CLASS_NAMES;

  instance.updateClassNames(CLASS_NAMES);
  const actual = instance.state.classNames;

  expect(actual).toEqual(expected);
});

test('Updates classNamesRipple in state when \'updateClassNamesRipple()\' is called', () => {
  const CLASS_NAMES_RIPPLE = ['CLASS_NAME_RIPPLE'];
  const wrapper = mount(<Checkbox name={NAME} />);
  const instance = wrapper.instance();
  const expected = CLASS_NAMES_RIPPLE;

  instance.updateClassNamesRipple(CLASS_NAMES_RIPPLE);
  const actual = instance.state.classNamesRipple;

  expect(actual).toEqual(expected);
});

test('Does not update classNames in state when \'updateClassNames()\' is called on an unmounted component', () => {
  const CLASS_NAMES = ['CLASS_NAME'];
  const wrapper = shallow(<Checkbox name={NAME} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  instance.setState = jest.fn();

  instance.componentIsMounted = false;
  instance.updateClassNames(CLASS_NAMES);

  expect(instance.setState).toHaveBeenCalledTimes(0);
});

test('Does not update classNamesRipple in state when \'updateClassNamesRipple()\' is called on an unmounted component', () => {
  const CLASS_NAMES_RIPPLE = ['CLASS_NAME_RIPPLE'];
  const wrapper = shallow(<Checkbox name={NAME} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  instance.setState = jest.fn();

  instance.componentIsMounted = false;
  instance.updateClassNamesRipple(CLASS_NAMES_RIPPLE);

  expect(instance.setState).toHaveBeenCalledTimes(0);
});

test('Updates cssVariables in state when \'updateCssVariables()\' is called', () => {
  const CSS_VARIABLES = ['CSS_VARIABLE'];
  const wrapper = mount(<Checkbox name={NAME} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = CSS_VARIABLES;

  instance.updateCssVariables(CSS_VARIABLES);
  const actual = instance.state.cssVariables;

  expect(actual).toEqual(expected);
});

test('Does not update cssVariables in state when \'updateCssVariables()\' is called on an unmounted component', () => {
  const CSS_VARIABLES = ['CSS_VARIABLE'];
  const wrapper = mount(<Checkbox name={NAME} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  instance.setState = jest.fn();

  instance.componentIsMounted = false;
  instance.updateCssVariables(CSS_VARIABLES);

  expect(instance.setState).toHaveBeenCalledTimes(0);
});

test('Destroys the ripple when the component unmounts', () => {
  const wrapper = mount(<Checkbox name={NAME} rippleEnabled />);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(1);
});

test('Does not detroy the ripple when the component unmounts without a ripple', () => {
  const wrapper = mount(<Checkbox name={NAME} />);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(0);
});

test('Activates the ripple if it is enabled', () => {
  const activate = jest.fn();
  const wrapper = mount(<Checkbox name={NAME} rippleEnabled />);
  const instance = wrapper.instance();
  const expected = 1;
  instance.rippleFoundation = { activate };

  instance.rippleActivate();
  const actual = activate.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Does not activate the ripple if it is disabled', () => {
  const activate = jest.fn();
  const wrapper = mount(<Checkbox name={NAME} />);
  const instance = wrapper.instance();
  const expected = 0;
  instance.rippleFoundation = { activate };

  instance.rippleActivate();
  const actual = activate.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Deactivates the ripple if it is enabled', () => {
  const deactivate = jest.fn();
  const wrapper = mount(<Checkbox name={NAME} rippleEnabled />);
  const instance = wrapper.instance();
  const expected = 1;
  instance.rippleFoundation = { deactivate };

  instance.rippleDeactivate();
  const actual = deactivate.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Does not deactivate the ripple if it is disabled', () => {
  const deactivate = jest.fn();
  const wrapper = mount(<Checkbox name={NAME} />);
  const instance = wrapper.instance();
  const expected = 0;
  instance.rippleFoundation = { deactivate };

  instance.rippleDeactivate();
  const actual = deactivate.mock.calls.length;

  expect(actual).toBe(expected);
});
