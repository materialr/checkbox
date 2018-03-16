import FormField from '@materialr/form-field';
import PropTypes from 'prop-types';
import React from 'react';

const Wrapper = ({
  alignEnd,
  children,
  className,
  htmlFor,
  label,
  rippleActivate,
  rippleDeactivate,
}) => (
  label ?
    <FormField
      alignEnd={alignEnd}
      className={className}
      htmlFor={htmlFor}
      label={label}
      rippleActivate={rippleActivate}
      rippleDeactivate={rippleDeactivate}
    >
      {children}
    </FormField> :
    <React.Fragment>{children}</React.Fragment>
);

Wrapper.propTypes = {
  alignEnd: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  rippleActivate: PropTypes.func,
  rippleDeactivate: PropTypes.func,
};

Wrapper.defaultProps = {
  alignEnd: false,
  children: undefined,
  className: undefined,
  htmlFor: undefined,
  label: undefined,
  rippleActivate: undefined,
  rippleDeactivate: undefined,
};

export default Wrapper;
