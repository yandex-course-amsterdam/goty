const replacer = (match: string): string => match.slice(1).toUpperCase()

export const snakeToCamelCase = (str: string): string =>
  str.replace(/_\w/g, replacer)
