import React, { ReactElement } from 'react'

type CorrectIconProps = {
  className?: string
}

export const CorrectIcon = ({ className }: CorrectIconProps): ReactElement => (
  <svg className={className} width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M25.143 9.143L12.57 21.714 6.857 16"
      stroke="#A9D3AB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
