// @ts-nocheck
import React, { FC, useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAllNews, postComment } from 'app/api/Api'

import style from './style.css'

export const NewsList: FC = (): JSX.Element => {
  const [news, setNews] = useState([])
  const [commentText, setCommentText] = useState([])
  const userInfo = useSelector((state: StoreState) => state.userInfo)

  const getNews = async () => {
    const res = await getAllNews()
    setNews(res.data)
  }

  const submitComment = useCallback(
    async (newsId: number) => {
      console.log(userInfo)
      const { data } = await postComment(newsId, commentText, userInfo.id)

      try {
        const updatedNews = JSON.parse(JSON.stringify(news))
        const updatedArticle = updatedNews.find(
          (article) => article.id === newsId
        )
        updatedArticle.comments.push(data)
        setNews(updatedNews)
      } catch (error) {
        console.log(`There is trouble updating comment list: ${error}`)
        console.log('Fetch correct news list from API...')
        getNews()
      }
    },
    [commentText, news, userInfo]
  )

  const renderComments = useCallback(
    (comments): JSX.Element[] =>
      comments.map((comment) => <div>{comment.text}</div>),
    []
  )

  const renderNews = useCallback(
    (): JSX.Element[] =>
      news.map((article) => (
        <li className={style.news}>
          <div>{article.title}</div>
          <div>{article.text}</div>

          {renderComments(article.comments)}

          <input
            type="text"
            value={commentText}
            onChange={(evt) => setCommentText(evt.target.value)}
          />
          <button onClick={() => submitComment(article.id)} type="button">
            Submit comment
          </button>
        </li>
      )),
    [commentText, news, renderComments, submitComment]
  )

  useEffect(() => {
    getNews()
  }, [])

  return <ul>{renderNews()}</ul>
}
