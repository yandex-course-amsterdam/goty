import React from 'react'

import { Description, Title } from 'app/components'

import { DATA } from './data'

import style from './style.css'

interface IState {
  hasError: boolean
}

interface IProps {
  children: React.ReactNode
}

const { mainTitle, mainDescriptionSubtitle, mainDescriptionTitle } = DATA

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(): void {
    this.setState({ hasError: true })
  }

  render(): React.ReactNode {
    const {
      state: { hasError },
      props: { children }
    } = this
    if (hasError) {
      return (
        <div className={style.container}>
          <Title className={style.title} title={mainTitle} />
          <div className={style.overflow}>
            <Description
              className={style.description}
              title={mainDescriptionTitle}
              subtitle={mainDescriptionSubtitle}
            />
          </div>
        </div>
      )
    }

    return children
  }
}
