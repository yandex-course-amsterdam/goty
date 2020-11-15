import React from 'react'

import { Main, Description, Title } from 'app/components'

import { DATA } from './data'

import style from './style.css'

type Props = {
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  constructor(props: Props) {
    super(props)
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    const { mainTitle, mainDescriptionSubtitle, mainDescriptionTitle } = DATA
    if (this.state.hasError) {
      return (
        <Main>
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
        </Main>
      )
    }

    return this.props.children
  }
}
