export const assert = (value, condition, error) => {
  if (
    (
      typeof condition === 'undefined' &&
      (
        value === null ||
        typeof value === 'undefined' ||
        (typeof value === 'string' && value === '')
      )
    ) ||
    condition === false ||
    (typeof condition === 'function' && !condition(value))
  ) {
    throw error || new Error('missing_parameter');
  }

  return value;
};
