import React, { ReactElement } from 'react'

type UserIconProps = {
  className?: string
}

export const UserIcon = ({ className }: UserIconProps): ReactElement => (
  <svg className={className} width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M25.143 26.286V24a4.57 4.57 0 00-4.572-4.571H11.43A4.571 4.571 0 006.857 24v2.286M16 14.857a4.571 4.571 0 100-9.143 4.571 4.571 0 000 9.143z"
      stroke="#787885"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
