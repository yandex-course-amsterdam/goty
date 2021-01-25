import React, { FC, useState, useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { VALIDATION_SCHEMA } from 'app/constants'

import { getAllNews, postComment, deleteComment, postLike } from 'app/api/Api'

import { UserInfo } from 'app/actions'
import { StoreState } from 'app/reducers'
import { Input, Button } from 'app/components'
import { sanitize } from 'app/utils'

import style from './style.css'

type User = UserInfo & {
  createdAt: string
}

enum LikeType {
  like = 'like',
  laugh = 'laugh',
  cry = 'cry',
  love = 'love'
}

type Like = {
  id: number
  type: keyof typeof LikeType
  userId: number
}

type Comment = {
  id: number
  text: string
  createdAt: string
  user: User
}

type Article = {
  id: number
  title: string
  description: string
  likes: Like[]
  comments: Comment[]
}

enum LikeEmoji {
  like = '👍',
  laugh = '🤣',
  cry = '😿',
  love = '💘'
}

export const NewsList: FC = (): JSX.Element => {
  const [news, setNews] = useState<Article[]>([])
  const userInfo = useSelector((state: StoreState) => state.userInfo)

  const { comment: commentText } = VALIDATION_SCHEMA

  const validationSchema = Yup.object({
    commentText
  })

  const initialValues = useMemo(
    () => ({
      commentText: ''
    }),
    []
  )

  const getNews = useCallback(async () => {
    const res = await getAllNews()
    setNews(res.data)
  }, [])

  const handleLocalUpdateError = useCallback(
    (type: string, error: Error): void => {
      console.log(`There is trouble updating ${type}: ${error}`)
      console.log('Fetch correct news list from API...')
      getNews()
    },
    [getNews]
  )

  const updateNews = useCallback(
    (newsId, cb) => {
      const updatedNews = JSON.parse(JSON.stringify(news))
      const updatedArticle = updatedNews.find(
        (article: Article) => article.id === newsId
      )
      cb(updatedArticle)
      setNews(updatedNews)
    },
    [news]
  )

  const likeArticle = useCallback(
    async (newsId: number, likeType: string) => {
      const { data } = await postLike(newsId, likeType, userInfo.id as number)

      try {
        updateNews(newsId, (article: Article) => {
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
        handleLocalUpdateError('likes', error)
      }
    },
    [userInfo, updateNews, handleLocalUpdateError]
  )

  const submitComment = useCallback(
    async (newsId: number, formData: FormikValues) => {
      const { commentText: comment } = formData
      const { data } = await postComment(
        newsId,
        sanitize(comment),
        userInfo.id as number
      )

      try {
        updateNews(newsId, (article: Article) => {
          article.comments.push(data)
        })
      } catch (error) {
        handleLocalUpdateError('comment list', error)
      }
    },
    [userInfo, updateNews, handleLocalUpdateError]
  )

  const removeComment = useCallback(
    async (newsId: number, commentId: number) => {
      await deleteComment(commentId)

      try {
        updateNews(newsId, (article: Article) => {
          const removedCommentIndex = article.comments.findIndex(
            (comment) => comment.id === commentId
          )
          article.comments.splice(removedCommentIndex, 1)
        })
      } catch (error) {
        handleLocalUpdateError('comment list', error)
      }
    },
    [updateNews, handleLocalUpdateError]
  )

  const renderLikes = useCallback(
    (article): JSX.Element => {
      const { likes } = article

      const count: Record<keyof typeof LikeType, number> = {
        like: 0,
        laugh: 0,
        cry: 0,
        love: 0
      }
      const userLikes: Record<keyof typeof LikeType, boolean> = {
        like: false,
        laugh: false,
        cry: false,
        love: false
      }

      likes.forEach((like: Like) => {
        const isUserLike = like.userId === userInfo.id
        const likeType = like.type

        count[likeType] += 1

        if (isUserLike && !userLikes[likeType]) {
          userLikes[likeType] = true
        }
      })

      const processedLikes = Object.keys(count).map((like: string) => {
        const castedLike = like as keyof typeof LikeType
        return {
          type: castedLike,
          count: count[castedLike],
          userLiked: userLikes[castedLike]
        }
      })

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
    (article): JSX.Element => (
      <div className={style.comments}>
        {article.comments.map((comment: Comment) => (
          <div className={style.comment}>
            {userInfo.id === comment.user.id && (
              <button
                type="button"
                className={style.commentDelete}
                onClick={() => {
                  removeComment(article.id, comment.id)
                }}
              >
                Delete comment
              </button>
            )}
            <div className={style.commentAvatar}>
              <img
                src={
                  comment.user.avatar
                    ? `https://ya-praktikum.tech/${comment.user.avatar}`
                    : '/images/avatar.png'
                }
                alt={comment.user.login || 'User avatar'}
              />
            </div>
            <div className={style.commentMain}>
              <div className={style.commentText}>
                {
                  new DOMParser().parseFromString(comment.text, 'text/html')
                    .documentElement.textContent
                }
              </div>
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
    [userInfo, removeComment]
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
              submitComment(article.id, data)
            }}
          >
            {({ values }) => (
              <Form className={style.commentForm}>
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
                    disabled={!values.commentText}
                    buttonText="🚀"
                  />
                </div>
              </Form>
            )}
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
