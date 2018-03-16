const PASSIVE_EVENT_LISTENERS = ['touchstart'];

export default () => {
  let classNames = [];

  return {
    addClass: updateClassNames => (className) => {
      classNames = [...classNames, className];
      updateClassNames(classNames);
    },
    deregisterInteractionHandler: (element, type) => handler =>
      element.removeEventListener(type, handler),
    forceLayout: () => () => {},
    getNativeControl: elementInput => () => elementInput,
    isAttachedToDOM: () => () => true,
    registerInteractionHandler: (element, type) => handler =>
      element.addEventListener(
        type,
        handler,
        PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
      ),
    removeClass: updateClassNames => (className) => {
      classNames = classNames.filter(currentClassName => currentClassName !== className);
      updateClassNames(classNames);
    },
  };
};
