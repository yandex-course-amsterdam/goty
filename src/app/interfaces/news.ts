import { UserInfo } from 'app/actions'

export enum LikeType {
  Like = 'like',
  Laugh = 'laugh',
  Cry = 'cry',
  Love = 'love'
}

export type LikeInterface = {
  id: number
  type: keyof typeof LikeType
  userId: number
}

export type UserInterface = UserInfo & {
  createdAt: string
}

export type CommentInterface = {
  id: number
  text: string
  createdAt: string
  user: UserInterface
}

export type ArticleInterface = {
  id: number
  title: string
  description: string
  likes: LikeInterface[]
  comments: CommentInterface[]
}
