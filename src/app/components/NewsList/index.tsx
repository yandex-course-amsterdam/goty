import React, { FC, useState, useCallback, useEffect } from 'react'

import { getAllNews } from 'app/api/Api'

import { ArticleInterface } from 'app/interfaces'
import { Comments, Likes } from 'app/components'

import style from './style.css'

export const NewsList: FC = (): JSX.Element => {
  const [news, setNews] = useState<ArticleInterface[]>([])

  const getNews = useCallback(async () => {
    const {
      data: { payload }
    } = await getAllNews()
    setNews(payload)
  }, [])

  const handleLocalUpdateError = useCallback(
    (error: Error): void => {
      console.log(`There is trouble updating news: ${error}`)
      console.log('Fetch correct news list from API...')
      getNews()
    },
    [getNews]
  )

  const updateNews = useCallback(
    (newsId: number, cb) => {
      try {
        const newsCopy = JSON.parse(JSON.stringify(news))
        const articleIndex = newsCopy.findIndex(
          (article: ArticleInterface) => article.id === newsId
        )
        newsCopy[articleIndex] = cb(
          JSON.parse(JSON.stringify(newsCopy[articleIndex]))
        )
        setNews(newsCopy)
      } catch (error) {
        handleLocalUpdateError(error)
      }
    },
    [news, handleLocalUpdateError]
  )

  const renderNews = useCallback(
    (): JSX.Element[] =>
      news.map((article) => (
        <div className={style.article} key={article.id}>
          <h3 className={style.title}>{article.title}</h3>
          <p className={style.description}>{article.description}</p>

          <Likes article={article} cb={updateNews} />

          <Comments article={article} cb={updateNews} />
        </div>
      )),
    [news, updateNews]
  )

  useEffect(() => {
    getNews()
  }, [getNews])

  return <div className={style.articles}>{renderNews()}</div>
}
