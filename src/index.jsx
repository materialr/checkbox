import { MDCCheckbox } from '@material/checkbox';
import { MDCFormField } from '@material/form-field';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import uuidv1 from 'uuid/v1';

import '@material/checkbox/mdc-checkbox.scss';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.elementCheckbox = undefined;
    this.elementFormField = undefined;
    this.checkbox = undefined;
    this.formField = undefined;
    this.state = { id: uuidv1() };
    this.getClassNames = this.getClassNames.bind(this);
    this.getId = this.getId.bind(this);
  }
  componentDidMount() {
    this.formField = new MDCFormField(this.elementFormField);
    this.checkbox = new MDCCheckbox(this.elementCheckbox);
  }
  componentWillUnmount() {
    this.formField.destroy();
    this.checkbox.destroy();
  }
  getClassNames() {
    const { className } = this.props;
    return classnames({
      'mdc-checkbox': true,
      [className]: !!className,
    });
  }
  getId() {
    return this.props.id || this.state.id;
  }
  render() {
    const {
      getClassNames,
      getId,
      props: {
        checked,
        className,
        disabled,
        id,
        label,
        name,
        onBlur,
        onChange,
        onDragStart,
        onDrop,
        onFocus,
        ...props
      },
    } = this;
    return (
      <div
        className="mdc-form-field"
        ref={(elementFormField) => { this.elementFormField = elementFormField; }}
        {...props}
      >
        <div
          className={getClassNames()}
          ref={(elementCheckbox) => { this.elementCheckbox = elementCheckbox; }}
        >
          <input
            checked={checked}
            className="mdc-checkbox__native-control"
            disabled={disabled}
            id={getId()}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onFocus={onFocus}
            type="checkbox"
          />
          <div className="mdc-checkbox__background">
            <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
              <path
                className="mdc-checkbox__checkmark-path"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"
                fill="none"
                stroke="white"
              />
            </svg>
            <div className="mdc-checkbox__mixedmark" />
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor={getId()}>{label}</label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: undefined,
  className: undefined,
  disabled: false,
  id: undefined,
  name: undefined,
  onBlur: undefined,
  onChange: undefined,
  onDragStart: undefined,
  onDrop: undefined,
  onFocus: undefined,
};

export default Checkbox;
