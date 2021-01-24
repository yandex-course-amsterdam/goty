// @ts-nocheck
import React, { FC, useState, useEffect } from 'react'

import { getAllNews, postComment } from 'app/api/Api'

import style from './style.css'

export const NewsList: FC = (): JSX.Element => {
  const [news, setNews] = useState([])
  const [commentText, setCommentText] = useState([])

  const getNews = async () => {
    const res = await getAllNews()
    setNews(res.data)
  }

  const submitComment = async () => {
    // const res = await postComment()
  }

  const renderNews = (): JSX.Element[] =>
    news.map((article) => (
      <li className={style.news}>
        <div>{article.title}</div>
        <div>{article.text}</div>
        <input
          type="text"
          value={commentText}
          onChange={(evt) => setCommentText(evt.target.value)}
        />
        <button ></button>
      </li>
    ))

  useEffect(() => {
    getNews()
  }, [])

  return <ul>{renderNews()}</ul>
}
