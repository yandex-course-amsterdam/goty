// @ts-nocheck
import React, { FC, useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { getAllNews, postComment, postLike } from 'app/api/Api'

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

  const likeArticle = useCallback(
    async (newsId: number, likeType: string) => {
      await postLike(newsId, likeType, userInfo.id)
    },
    [userInfo]
  )

  const renderLikes = useCallback(
    (likes): JSX.Element[] => {
      const count = {
        like: 0,
        laugh: 0,
        cry: 0,
        love: 0
      }
      const userLikes = {
        like: false,
        laugh: false,
        cry: false,
        love: false
      }

      likes.forEach((like) => {
        const isUserLike = like.userId === userInfo.id
        const likeType = like.type

        count[likeType] += 1

        if (isUserLike && !userLikes[likeType]) {
          userLikes[likeType] = true
        }
      })

      const filteredLikes = Object.keys(count)
        .filter((like) => count[like])
        .map((like) => ({
          type: like,
          count: count[like],
          userLiked: userLikes[like]
        }))

      console.log(filteredLikes)

      return filteredLikes.map((like) => (
        <div
          className={cn(
            style.like,
            like.userLiked === true && style.likeActive
          )}
        >
          {like.type}: {like.count}
        </div>
      ))
    },
    [userInfo]
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

          {renderLikes(article.likes)}

          {renderComments(article.comments)}

          <button
            type="button"
            onClick={() => {
              likeArticle(article.id, 'love')
            }}
          >
            Like article
            <span role="img" aria-label="like">
              👍
            </span>
          </button>

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
    [commentText, news, renderComments, renderLikes, submitComment, likeArticle]
  )

  useEffect(() => {
    getNews()
  }, [])

  return <ul>{renderNews()}</ul>
}
