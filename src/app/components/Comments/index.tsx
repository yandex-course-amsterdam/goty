import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { VALIDATION_SCHEMA } from 'app/constants'

import { postComment, deleteComment } from 'app/api/Api'

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

interface IProps {
  article: Article
  // eslint-disable-next-line
  cb: Function
}

const { comment: commentText } = VALIDATION_SCHEMA

const validationSchema = Yup.object({
  commentText
})

const initialValues = {
  commentText: ''
}

export const Comments: FC<IProps> = ({ article, cb }): JSX.Element => {
  const userInfo = useSelector((state: StoreState) => state.userInfo)

  const submitComment = useCallback(
    async (formData: FormikValues) => {
      const { commentText: comment } = formData
      const { data } = await postComment(
        article.id,
        sanitize(comment),
        userInfo.id as number
      )

      cb(
        article.id,
        (articleCopy: Article): Article => {
          articleCopy.comments.push(data)
          return articleCopy
        }
      )
    },
    [article, cb, userInfo]
  )

  const removeComment = useCallback(
    async (commentId: number) => {
      await deleteComment(commentId)

      cb(
        article.id,
        (articleCopy: Article): Article => {
          const removedCommentIndex = articleCopy.comments.findIndex(
            (comment) => comment.id === commentId
          )
          articleCopy.comments.splice(removedCommentIndex, 1)
          return articleCopy
        }
      )
    },
    [article, cb]
  )

  return (
    <>
      <div className={style.comments}>
        {article.comments.map((comment: Comment) => (
          <div className={style.comment} key={comment.id}>
            {userInfo.id === comment.user.id && (
              <button
                type="button"
                className={style.commentDelete}
                onClick={() => {
                  removeComment(comment.id)
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
                  // unescape sanitized comments
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
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          submitComment(data)
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
    </>
  )
}
