import React, { FC, useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ThemeFormatted } from 'shared'

import { setTheme, getAllThemes } from 'app/api/Api'

import { StoreState } from 'app/reducers'

import { getUserTheme, storeUserTheme, setUserTheme } from 'app/utils'

import { Button } from 'app/components'

import style from './style.css'

export const Theme: FC = () => {
  const [currentThemeId, setCurrentThemeId] = useState<number | null>(null)
  const [themes, setThemes] = useState<ThemeFormatted[]>([])

  const userInfo = useSelector((state: StoreState) => state.userInfo)

  const getThemes = useCallback(async () => {
    try {
      const {
        data: { payload }
      } = await getAllThemes()
      const userTheme = getUserTheme()

      if (userTheme) {
        setCurrentThemeId(userTheme.id)
      }

      setThemes(payload)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const applyTheme = useCallback(
    async (themeId: number) => {
      const themeApplied = themes.find((theme) => theme.id === themeId)

      if (themeApplied) {
        setUserTheme(themeApplied)
        storeUserTheme(themeApplied)
        setCurrentThemeId(themeId)
        await setTheme(userInfo.id as number, themeId)
      }
    },
    [userInfo, themes]
  )

  const renderThemes = useCallback(() => {
    return (
      <div className={style.themeWrapper}>
        {themes.map((theme) => {
          const isSelected = theme.id === currentThemeId
          const buttonText = `Apply ${theme.name} theme`
          const buttonClassName = `${style.themeButton} ${
            isSelected ? style.themeButtonSelected : ''
          }`.trim()
          return (
            <Button
              key={theme.id}
              buttonText={buttonText}
              className={buttonClassName}
              handleClick={() => applyTheme(theme.id as number)}
            />
          )
        })}
      </div>
    )
  }, [currentThemeId, themes, applyTheme])

  useEffect(() => {
    getThemes()
  }, [])

  return <div>{renderThemes()}</div>
}
