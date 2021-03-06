import React, { FC } from 'react'

interface IProps {
  className?: string
}

export const ExitIcon: FC<IProps> = ({ className }): JSX.Element => (
  <svg
    className={className}
    width="56"
    height="56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="56" height="56" rx="28" fill="var(--field-color)" />
    <path
      d="M27.5 22.929L21.93 28.5l5.571 5.572M33.072 28.5H21.929"
      stroke="#787885"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
