import { LikeType } from 'shared'
import { UserInfo } from 'app/actions'

export type LikeInterface = {
  id: number
  type: LikeType
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
