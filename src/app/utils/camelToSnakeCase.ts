export const camelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, '_$&').toLowerCase()
