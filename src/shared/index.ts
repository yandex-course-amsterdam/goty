type ThemeValue = Record<string, string> | string | number | boolean

export type ThemeFormattedShallow = {
  attributes: Record<string, string>
  [fieldName: string]: ThemeValue
}

export type ThemeFormatted = ThemeFormattedShallow & {
  id: number
}

export enum LikeType {
  Like = 'like',
  Laugh = 'laugh',
  Cry = 'cry',
  Love = 'love'
}

type JSONResponse = {
  status: 'success' | 'fail' | 'error'
}

export type JSONReponseTheme = JSONResponse & {
  payload: ThemeFormatted
}

export type JSONReponseThemeArr = JSONResponse & {
  payload: ThemeFormatted[]
}
