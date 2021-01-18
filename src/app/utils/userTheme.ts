import { ThemeFormatted } from 'shared'

import { camelToCssVar } from './camelToCssVar'

const parseUserTheme = (): ThemeFormatted | null => {
  const userThemeStringified = localStorage.getItem('userTheme')
  return userThemeStringified ? JSON.parse(userThemeStringified) : null
}

export const getUserTheme = (): ThemeFormatted | null => parseUserTheme()

export const setUserTheme = (theme = parseUserTheme()): void => {
  if (theme) {
    const { attributes } = theme
    Object.keys(attributes).forEach((key) => {
      const keyParsed = camelToCssVar(key)
      document.documentElement.style.setProperty(keyParsed, attributes[key])
    })
  }
}

export const storeUserTheme = (theme: ThemeFormatted): void => {
  const { id, attributes } = theme
  localStorage.setItem('userTheme', JSON.stringify({ id, attributes }))
}