// @ts-nocheck
import React, { FC, useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { VALIDATION_SCHEMA } from 'app/constants'

import { getAllNews, postComment, postLike } from 'app/api/Api'

import { Input, Button } from 'app/components'

import style from './style.css'

enum LikeEmoji {
  like = '👍',
  laugh = '🤣',
  cry = '😿',
  love = '💘'
}

export const NewsList: FC = (): JSX.Element => {
  const [news, setNews] = useState([])
  const userInfo = useSelector((state: StoreState) => state.userInfo)

  const { commentText } = VALIDATION_SCHEMA

  const validationSchema = Yup.object({
    commentText
  })

  const initialValues = {
    commentText: ''
  }

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
    async (formData: FormikValues, newsId: number) => {
      const { commentText: comment } = formData
      const { data } = await postComment(newsId, comment, userInfo.id)

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
    [userInfo, updateNews]
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
    (article): JSX.Element[] => {
      const { likes } = article

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

      const processedLikes = Object.keys(count).map((like) => ({
        type: like,
        count: count[like],
        userLiked: userLikes[like]
      }))

      return (
        <div className={style.likes}>
          {processedLikes.map((like) => (
            <button
              type="button"
              className={cn(
                style.like,
                like.userLiked === true && style.likeActive,
                !like.count && style.likeDim
              )}
              onClick={() => {
                likeArticle(article.id, like.type)
              }}
            >
              <span role="img" aria-label={like.type} className={style.emoji}>
                {LikeEmoji[like.type]}
              </span>{' '}
              <span className={style.count}>{like.count}</span>
            </button>
          ))}
        </div>
      )
    },
    [userInfo, likeArticle]
  )

  const renderComments = useCallback(
    (article): JSX.Element[] => (
      <div className={style.comments}>
        {article.comments.map((comment) => (
          <div className={style.comment}>
            <div className={style.commentAvatar}>
              <img
                src={
                  comment.user.avatar
                    ? `https://ya-praktikum.tech/${comment.user.avatar}`
                    : '/images/avatar.png'
                }
                alt={comment.user.login}
              />
            </div>
            <div className={style.commentMain}>
              <div className={style.commentText}>{comment.text}</div>
              <div className={style.commentMeta}>
                <div className={style.commentAuthor}>{comment.user.login}</div>
                <div className={style.commentDate}>
                  {new Date(comment.user.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    []
  )

  const renderNews = useCallback(
    (): JSX.Element[] =>
      news.map((article) => (
        <div className={style.article}>
          <h3 className={style.title}>{article.title}</h3>
          <p className={style.description}>{article.description}</p>

          {renderLikes(article)}

          {renderComments(article)}

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              submitComment(data, article.id)
            }}
          >
            <Form>
              <Input
                label="Comment"
                name="commentText"
                type="text"
                placeholder="Enter your comment"
              />
              <div className={style.wrapper}>
                <Button
                  className={style.button}
                  type="submit"
                  buttonText="Submit comment"
                />
              </div>
            </Form>
          </Formik>
        </div>
      )),
    [
      news,
      renderComments,
      renderLikes,
      validationSchema,
      initialValues,
      submitComment
    ]
  )

  useEffect(() => {
    getNews()
  }, [])

  return <div className={style.articles}>{renderNews()}</div>
}
