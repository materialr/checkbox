import { MDCCheckboxFoundation } from '@material/checkbox';

import adapterUtilities from './adapter-utilities';

export default ({ elementInput, elementRoot, updateClassNames }) => {
  const {
    addClass,
    deregisterInteractionHandler,
    forceLayout,
    getNativeControl,
    isAttachedToDOM,
    registerInteractionHandler,
    removeClass,
  } = adapterUtilities();

  return new MDCCheckboxFoundation({
    addClass: addClass(updateClassNames),
    deregisterAnimationEndHandler: deregisterInteractionHandler(elementRoot, 'animationend'),
    deregisterChangeHandler: deregisterInteractionHandler(elementInput, 'change'),
    forceLayout: forceLayout(),
    getNativeControl: getNativeControl(elementInput),
    isAttachedToDOM: isAttachedToDOM(),
    registerAnimationEndHandler: registerInteractionHandler(elementRoot, 'animationend'),
    registerChangeHandler: registerInteractionHandler(elementInput, 'change'),
    removeClass: removeClass(updateClassNames),
  });
};
