export const camelToCssVar = (str: string): string =>
  `--${str.replace(/[A-Z]/g, '-$&').toLowerCase()}`
