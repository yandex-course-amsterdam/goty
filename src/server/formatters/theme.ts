import { IThemeFormatted } from 'shared'

import { Theme } from 'server/models'

const themeProps = [
  'baseColor',
  'secondColor',
  'fieldColor',
  'accentColor',
  'textColor',
  'subTextColor'
]

const format = (theme: Record<string, any>) => {
  const themeFormatted: IThemeFormatted = { attributes: {} }

  Object.keys(theme.dataValues).forEach((key) => {
    if (themeProps.includes(key)) {
      themeFormatted.attributes[key] = theme[key]
    } else {
      themeFormatted[key] = theme[key]
    }
  })

  return themeFormatted
}

export const formatter = (
  data: Theme[] | Theme
): IThemeFormatted[] | IThemeFormatted => {
  if (Array.isArray(data)) {
    return data.map(format)
  }

  return format(data)
}
