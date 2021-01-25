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

  const updateNews = useCallback(
    (newsId, cb) => {
      const updatedNews = JSON.parse(JSON.stringify(news))
      const updatedArticle = updatedNews.find(
        (article) => article.id === newsId
      )
      cb(updatedArticle)
      setNews(updatedNews)
    },
    [news]
  )

  const submitComment = useCallback(
    async (newsId: number) => {
      const { data } = await postComment(newsId, commentText, userInfo.id)

      try {
        updateNews(newsId, (article) => {
          article.comments.push(data)
        })
      } catch (error) {
        console.log(`There is trouble updating comment list: ${error}`)
        console.log('Fetch correct news list from API...')
        getNews()
      }
    },
    [commentText, userInfo, updateNews]
  )

  const likeArticle = useCallback(
    async (newsId: number, likeType: string) => {
      const { data } = await postLike(newsId, likeType, userInfo.id)

      try {
        updateNews(newsId, (article) => {
          // при попытке сохранить имеющийся лайк (лайк с таким же типом, newsId и userId) сервер отвечает 204
          if (data) {
            article.likes.push(data)
          } else {
            const removedLikeIndex = article.likes.findIndex(
              (like) => like.type === likeType && like.userId === userInfo.id
            )
            article.likes.splice(removedLikeIndex, 1)
          }
        })
      } catch (error) {
        console.log(`There is trouble updating likes: ${error}`)
        console.log('Fetch correct news list from API...')
        getNews()
      }
    },
    [userInfo, updateNews]
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
