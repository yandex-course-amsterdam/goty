import React, { ReactElement } from 'react'

type GameIconProps = {
  className?: string
}

export const GameIcon = ({ className }: GameIconProps): ReactElement => (
  <svg className={className} width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 27.428c6.312 0 11.428-5.116 11.428-11.428C27.428 9.688 22.312 4.57 16 4.57 9.688 4.571 4.57 9.688 4.57 16S9.688 27.428 16 27.428z"
      stroke="#787885"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 20.572a4.571 4.571 0 100-9.143 4.571 4.571 0 000 9.143zM7.92 7.92l4.846 4.846M19.234 19.234l4.846 4.846M19.234 12.766L24.08 7.92M19.234 12.766L23.27 8.73M7.92 24.08l4.846-4.846"
      stroke="#787885"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
