import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { postLike } from 'app/api/Api'

import { UserInfo } from 'app/actions'
import { StoreState } from 'app/reducers'

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

interface IProps {
  article: Article
  // eslint-disable-next-line
  cb: Function
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
        (articleCopy: Article): Article => {
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
              likeArticle(like.type)
            }}
            key={like.type}
          >
            <span role="img" aria-label={like.type} className={style.emoji}>
              {LikeEmoji[like.type]}
            </span>{' '}
            <span className={style.count}>{like.count}</span>
          </button>
        ))}
      </div>
    )
  }, [article, userInfo, likeArticle])

  return <>{processLikes()}</>
}
