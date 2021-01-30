import { ThemeFormattedShallow, ThemeFormatted } from 'shared'

import { Theme } from 'server/models'

const themeProps = [
  'base_color',
  'second_color',
  'field_color',
  'accent_color',
  'text_color',
  'article_bg_color',
  'sub_text_color'
]

const format = (theme: Record<string, any>) => {
  const themeFormatted: ThemeFormattedShallow = { attributes: {} }

  Object.keys(theme.dataValues).forEach((key) => {
    if (themeProps.includes(key)) {
      themeFormatted.attributes[key] = theme[key]
    } else {
      themeFormatted[key] = theme[key]
    }
  })

  return themeFormatted as ThemeFormatted
}

export const formatter = (
  data: Theme[] | Theme
): ThemeFormatted[] | ThemeFormatted => {
  if (Array.isArray(data)) {
    return data.map(format)
  }

  return format(data)
}
