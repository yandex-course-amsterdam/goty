import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { VALIDATION_SCHEMA } from 'app/constants'

import { postComment } from 'app/api/Api'

import { ArticleInterface, CommentInterface } from 'app/interfaces'
import { StoreState } from 'app/reducers'
import { Input, Button, Comment } from 'app/components'
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
      const {
        data: { payload }
      } = await postComment(
        article.id,
        sanitize(comment),
        userInfo.id as number
      )

      cb(
        article.id,
        (articleCopy: ArticleInterface): ArticleInterface => {
          articleCopy.comments.push(payload)
          return articleCopy
        }
      )
    },
    [article, cb, userInfo]
  )

  const handleRemoveComment = useCallback(
    async (commentId: number) => {
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

  return (
    <>
      <div className={style.comments}>
        {article.comments.map((comment: CommentInterface) => (
          <Comment
            comment={comment}
            handleRemoveComment={handleRemoveComment}
            key={comment.id}
          />
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
