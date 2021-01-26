import { UserInfo } from 'app/actions'

export enum LikeType {
  like = 'like',
  laugh = 'laugh',
  cry = 'cry',
  love = 'love'
}

export type Like = {
  id: number
  type: keyof typeof LikeType
  userId: number
}

export type User = UserInfo & {
  createdAt: string
}

export type Comment = {
  id: number
  text: string
  createdAt: string
  user: User
}

export type Article = {
  id: number
  title: string
  description: string
  likes: Like[]
  comments: Comment[]
}
