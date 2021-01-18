type ThemeValue = Record<string, string> | string | number | boolean

export type ThemeFormattedShallow = {
  attributes: Record<string, string>
} & {
  [fieldName: string]: ThemeValue
}

export type ThemeFormatted = ThemeFormattedShallow & {
  id: number
}
