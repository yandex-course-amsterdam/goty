type ThemeValue = Record<string, string> | string | number | boolean

export interface IThemeFormatted {
  [index: string]: ThemeValue
  id: number
  attributes: Record<string, string>
}
