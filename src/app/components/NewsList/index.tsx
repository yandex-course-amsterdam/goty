import React, { FC, useState, useEffect } from 'react'

import { getAllNews } from 'app/api/Api'

import style from './style.css'

export const NewsList: FC = (): JSX.Element => {
  const [news, setNews] = useState([])

  const getNews = async () => {
    const res = await getAllNews()
    setNews(res.data)
  }

  const renderNews = (): JSX.Element[] =>
    // @ts-ignore
    news.map((article) => <li className={style.news}>{article.title}</li>)

  useEffect(() => {
    getNews()
  }, [])

  return <ul>{renderNews()}</ul>
}
