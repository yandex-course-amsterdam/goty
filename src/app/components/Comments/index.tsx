import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { VALIDATION_SCHEMA } from 'app/constants'

import { postComment, deleteComment } from 'app/api/Api'

import { ArticleInterface, CommentInterface } from 'app/interfaces'
import { StoreState } from 'app/reducers'
import { Input, Button } from 'app/components'
import { sanitize } from 'app/utils'

import style from './style.css'

interface IProps {
  article: ArticleInterface
  cb(id: number, article: (prop: ArticleInterface) => ArticleInterface): void
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
        (articleCopy: ArticleInterface): ArticleInterface => {
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
        (articleCopy: ArticleInterface): ArticleInterface => {
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

  const getUserAvatar = useCallback(
    (url: string | null) =>
      url ? `https://ya-praktikum.tech/${url}` : '/images/avatar.png',
    []
  )

  return (
    <>
      <div className={style.comments}>
        {article.comments.map((comment: CommentInterface) => (
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
                src={getUserAvatar(comment.user.avatar)}
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
