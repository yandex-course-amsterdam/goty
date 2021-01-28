import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { postLike } from 'app/api/Api'

import { LikeType } from 'shared'
import { ArticleInterface, LikeInterface } from 'app/interfaces'
import { StoreState } from 'app/reducers'

import style from './style.css'

interface IProps {
  article: ArticleInterface
  cb(id: number, article: (prop: ArticleInterface) => ArticleInterface): void
}

const mapEmoji = {
  like: '👍',
  laugh: '🤣',
  cry: '😿',
  love: '💘'
}

export const Likes: FC<IProps> = ({ article, cb }): JSX.Element => {
  const userInfo = useSelector((state: StoreState) => state.userInfo)

  const likeArticle = useCallback(
    async (likeType: string) => {
      const { data } = await postLike(
        article.id,
        likeType,
        userInfo.id as number
      )

      cb(
        article.id,
        (articleCopy: ArticleInterface): ArticleInterface => {
          // при попытке сохранить имеющийся лайк (лайк с таким же типом, newsId и userId) сервер отвечает 204
          if (data) {
            articleCopy.likes.push(data)
          } else {
            const removedLikeIndex = articleCopy.likes.findIndex(
              (like) => like.type === likeType && like.userId === userInfo.id
            )
            articleCopy.likes.splice(removedLikeIndex, 1)
          }

          return articleCopy
        }
      )
    },
    [article, cb, userInfo]
  )

  const processLikes = useCallback((): JSX.Element => {
    const { likes } = article

    const count: Record<LikeType, number> = {
      like: 0,
      laugh: 0,
      cry: 0,
      love: 0
    }
    const userLikes: Record<LikeType, boolean> = {
      like: false,
      laugh: false,
      cry: false,
      love: false
    }

    likes.forEach((like: LikeInterface) => {
      const isUserLike = like.userId === userInfo.id
      const likeType = like.type

      count[likeType] += 1

      if (isUserLike && !userLikes[likeType]) {
        userLikes[likeType] = true
      }
    })

    const processedLikes = Object.keys(count).map((like: string) => {
      const castedLike = like as LikeType
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
              !like.count && style.likeTransparent
            )}
            onClick={() => {
              likeArticle(like.type)
            }}
            key={like.type}
          >
            <span role="img" aria-label={like.type} className={style.emoji}>
              {mapEmoji[like.type]}
            </span>
            <span className={style.count}>{like.count}</span>
          </button>
        ))}
      </div>
    )
  }, [article, userInfo, likeArticle])

  return processLikes()
}
