import FormField from '@materialr/form-field';
import { shallow } from 'enzyme';
import React from 'react';

import Wrapper from './wrapper';

test('Renders a \'FormField\' component when a label is present', () => {
  const wrapper = shallow(
    <Wrapper htmlFor="htmlFor" label="label" />,
    { disableLifecycleMethods: true },
  );
  const expected = true;

  const actual = wrapper.find(FormField).exists();

  expect(actual).toBe(expected);
});

test('Does not renders a \'FormField\' component when a label is missing', () => {
  const wrapper = shallow(<Wrapper />, { disableLifecycleMethods: true });
  const expected = false;

  const actual = wrapper.find(FormField).exists();

  expect(actual).toBe(expected);
});

test('Passes all props through to \'FormField\'', () => {
  const ALIGN_END = true;
  const CHILDREN = 'CHILDREN';
  const CLASS_NAME = 'CLASS_NAME';
  const HTML_FOR = 'HTML_FOR';
  const LABEL = 'LABEL';
  const RIPPLE_ACTIVATE = () => 'RIPPLE_ACTIVATE';
  const RIPPLE_DEACTIVATE = () => 'RIPPLE_DEACTIVATE';
  const wrapper = shallow(
    <Wrapper
      alignEnd={ALIGN_END}
      className={CLASS_NAME}
      htmlFor={HTML_FOR}
      label={LABEL}
      rippleActivate={RIPPLE_ACTIVATE}
      rippleDeactivate={RIPPLE_DEACTIVATE}
    >
      {CHILDREN}
    </Wrapper>,
    { disableLifecycleMethods: true },
  );
  const props = wrapper.props();
  const expectedAlignEnd = ALIGN_END;
  const expectedChildren = CHILDREN;
  const expectedClassName = CLASS_NAME;
  const expectedHtmlFor = HTML_FOR;
  const expectedLabel = LABEL;
  const expectedRippleActivate = RIPPLE_ACTIVATE;
  const expectedRippleDeactivate = RIPPLE_DEACTIVATE;

  const actualAlignEnd = props.alignEnd;
  const actualChildren = props.children;
  const actualClassName = props.className;
  const actualHtmlFor = props.htmlFor;
  const actualLabel = props.label;
  const actualRippleActivate = props.rippleActivate;
  const actualRippleDeactivate = props.rippleDeactivate;

  expect(actualAlignEnd).toBe(expectedAlignEnd);
  expect(actualChildren).toBe(expectedChildren);
  expect(actualClassName).toBe(expectedClassName);
  expect(actualHtmlFor).toBe(expectedHtmlFor);
  expect(actualLabel).toBe(expectedLabel);
  expect(actualRippleActivate).toBe(expectedRippleActivate);
  expect(actualRippleDeactivate).toBe(expectedRippleDeactivate);
});
