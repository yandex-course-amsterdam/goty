import React from 'react'
import { renderToString } from 'react-dom/server'
import { Request, Response } from 'express'
import { StaticRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouterContext } from 'react-router'

import { App } from 'app/components'
import { configureStore } from 'app/store'
import { StoreState } from 'app/reducers'
import { verifyToken } from './utils'

const getResponse = (jsx: JSX.Element, state: StoreState): string => {
  return `<!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <meta http-equiv="X-UA-Compatible" content="ie=edge" />
     <title>Goty</title>
     <link rel="stylesheet" href="/css/app.min.css" />
   </head>
   <body>
     <div id="root">${renderToString(jsx)}</div>
     <script>
       window.__INITIAL_STATE__ = ${JSON.stringify(state)}
     </script>
     <script src="/app.js"></script>
   </body>
 </html>`
}

export const serverRenderMiddleware = (req: Request, res: Response): void => {
  const tokenCookie = req.cookies.userToken
  let isTokenVerified = false

  try {
    verifyToken(tokenCookie)
    isTokenVerified = true
  } catch (error) {
    console.log(error)
  }

  const store = configureStore({ loginStatus: { status: isTokenVerified } })
  const state = store.getState()

  const location = isTokenVerified ? req.url : '/sign-in'

  const context: StaticRouterContext = {}
  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter context={context} location={location}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  )

  res.send(getResponse(jsx, state))
}
