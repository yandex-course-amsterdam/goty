import React, { FC } from 'react'

interface IProps {
  className?: string
}

export const ScoreIcon: FC<IProps> = ({ className }): JSX.Element => (
  <svg
    className={className}
    width="32"
    height="32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 19.429a8 8 0 100-16 8 8 0 000 16z"
      stroke="#787885"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.668 18.16L10.287 28.57 16 25.143l5.714 3.428-1.383-10.423"
      stroke="#787885"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
