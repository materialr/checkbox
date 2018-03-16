import rippleFoundation from '@materialr/ripple';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/checkbox/mdc-checkbox.scss';

import checkboxFoundation from './foundation';
import Wrapper from './wrapper';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.checkboxFoundation = undefined;
    this.componentIsMounted = false;
    this.elementInput = undefined;
    this.elementRoot = undefined;
    this.rippleFoundation = undefined;
    this.state = { classNames: [], classNamesRipple: [], cssVariables: {} };
    this.checkboxCreate = this.checkboxCreate.bind(this);
    this.checkboxDestroy = this.checkboxDestroy.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAsString = this.getClassNamesAsString.bind(this);
    this.getClassNamesFromProps = this.getClassNamesFromProps.bind(this);
    this.rippleActivate = this.rippleActivate.bind(this);
    this.rippleCreate = this.rippleCreate.bind(this);
    this.rippleDeactivate = this.rippleDeactivate.bind(this);
    this.rippleDestroy = this.rippleDestroy.bind(this);
    this.updateClassNames = this.updateClassNames.bind(this);
    this.updateClassNamesRipple = this.updateClassNamesRipple.bind(this);
    this.updateCssVariables = this.updateCssVariables.bind(this);
  }
  componentDidMount() {
    this.componentIsMounted = true;
    if (this.props.rippleEnabled) {
      this.rippleCreate();
    }
    this.checkboxCreate();
  }
  componentDidUpdate({ rippleEnabled: wasRippleEnabled }) {
    const { rippleEnabled } = this.props;
    if (wasRippleEnabled && !rippleEnabled) {
      this.rippleDestroy();
    }
    if (!wasRippleEnabled && rippleEnabled) {
      this.rippleCreate();
    }
  }
  componentWillUnmount() {
    this.componentIsMounted = false;
    if (this.props.rippleEnabled && this.rippleFoundation) {
      this.rippleDestroy();
    }
    this.checkboxDestroy();
  }
  getClassNames() {
    const { classNames, classNamesRipple } = this.state;
    return [...classNames, ...classNamesRipple].join(' ');
  }
  getClassNamesAsString() {
    return `${this.getClassNamesFromProps()} ${this.getClassNames()}`.trim();
  }
  getClassNamesFromProps() {
    const { className } = this.props;
    return classnames({
      'mdc-checkbox': true,
      [className]: !!className,
    });
  }
  checkboxCreate() {
    this.checkboxFoundation = checkboxFoundation({
      elementInput: this.elementInput,
      elementRoot: this.elementRoot,
      updateClassNames: this.updateClassNames,
    });
    this.checkboxFoundation.init();
  }
  checkboxDestroy() {
    this.checkboxFoundation.destroy();
    this.checkboxFoundation = undefined;
  }
  rippleActivate() {
    if (this.props.rippleEnabled) {
      this.rippleFoundation.activate();
    }
  }
  rippleCreate() {
    this.rippleFoundation = rippleFoundation({
      centered: true,
      disabled: this.props.disabled,
      element: this.elementRoot,
      self: this,
      updateClassNames: this.updateClassNamesRipple,
      updateCssVariables: this.updateCssVariables,
    });
    this.rippleFoundation.init();
  }
  rippleDeactivate() {
    if (this.props.rippleEnabled) {
      this.rippleFoundation.deactivate();
    }
  }
  rippleDestroy() {
    this.rippleFoundation.destroy();
    this.rippleFoundation = undefined;
  }
  updateClassNames(classNames) {
    if (this.componentIsMounted) {
      this.setState({ classNames });
    }
  }
  updateClassNamesRipple(classNamesRipple) {
    if (this.componentIsMounted) {
      this.setState({ classNamesRipple });
    }
  }
  updateCssVariables(cssVariables) {
    if (this.componentIsMounted) {
      this.setState({ cssVariables });
    }
  }
  render() {
    const {
      getClassNamesAsString,
      props: { alignEnd, classNameFormField, disabled, label, name, onChange },
      rippleActivate,
      rippleDeactivate,
    } = this;
    const id = new Date().getTime().toString();
    return (
      <Wrapper
        alignEnd={alignEnd}
        className={classNameFormField}
        htmlFor={id}
        label={label}
        rippleActivate={rippleActivate}
        rippleDeactivate={rippleDeactivate}
      >
        <div
          className={getClassNamesAsString()}
          ref={(elementRoot) => { this.elementRoot = elementRoot; }}
          style={this.state.cssVariables}
        >
          <input
            className="mdc-checkbox__native-control"
            disabled={disabled}
            id={id}
            name={name}
            onChange={onChange}
            ref={(elementInput) => { this.elementInput = elementInput; }}
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
      </Wrapper>
    );
  }
}

Checkbox.propTypes = {
  alignEnd: PropTypes.bool,
  className: PropTypes.string,
  classNameFormField: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  rippleEnabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  alignEnd: false,
  className: undefined,
  classNameFormField: undefined,
  disabled: false,
  label: undefined,
  rippleEnabled: false,
  onChange: undefined,
};

export default Checkbox;
