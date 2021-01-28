import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { deleteComment } from 'app/api/Api'

import { CommentInterface } from 'app/interfaces'
import { StoreState } from 'app/reducers'

import style from './style.css'

interface IProps {
  comment: CommentInterface
  handleRemoveComment(id: number): void
}

export const Comment: FC<IProps> = ({
  comment: { id, text, user },
  handleRemoveComment
}) => {
  const userInfo = useSelector((state: StoreState) => state.userInfo)

  const removeComment = useCallback(
    async (commentId: number) => {
      await deleteComment(commentId)
      handleRemoveComment(commentId)
    },
    [handleRemoveComment]
  )

  const getUserAvatar = useCallback(
    (url: string | null) =>
      url ? `https://ya-praktikum.tech/${url}` : '/images/avatar.png',
    []
  )

  return (
    <div className={style.comment} key={id}>
      {userInfo.id === user.id && (
        <button
          type="button"
          className={style.commentDelete}
          onClick={() => {
            removeComment(id)
          }}
        >
          Delete comment
        </button>
      )}
      <div className={style.commentAvatar}>
        <img
          src={getUserAvatar(user.avatar)}
          alt={user.login || 'User avatar'}
        />
      </div>
      <div className={style.commentMain}>
        <div className={style.commentText}>
          {
            // unescape sanitized comments
            new DOMParser().parseFromString(text, 'text/html').documentElement
              .textContent
          }
        </div>
        <div className={style.commentMeta}>
          <div className={style.commentAuthor}>{user.login}</div>
          <div className={style.commentDate}>
            {new Date(user.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}
