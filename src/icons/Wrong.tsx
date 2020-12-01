import React, { FC } from 'react'

interface IProps {
  className?: string
}

export const WrongIcon: FC<IProps> = ({ className }): JSX.Element => (
  <svg
    className={className}
    width="32"
    height="32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.857 9.143L9.143 22.857M9.143 9.143l13.714 13.714"
      stroke="#EB5757"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
