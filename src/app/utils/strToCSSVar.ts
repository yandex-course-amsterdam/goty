export const strToCSSVar = (str: string): string =>
  `--${str.replace(/[A-Z]/g, '-$&').toLowerCase()}`
