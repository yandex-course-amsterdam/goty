import React from 'react'
import { renderToString } from 'react-dom/server'
import { Request, Response } from 'express'
import { StaticRouter } from 'react-router-dom'
import { StaticRouterContext } from 'react-router'

const getResponse = (jsx: JSX.Element): string => {
  return `<!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <meta http-equiv="X-UA-Compatible" content="ie=edge" />
     <title>Goty</title>
   </head>
   <body>
     <div id="root">${renderToString(jsx)}</div>
   </body>
 </html>`
}

export const serverRenderMiddleware = (req: Request, res: Response): void => {
  const location = req.url
  const context: StaticRouterContext = {}
  const jsx = (
    <StaticRouter context={context} location={location}>
      <div>Hello world!</div>
    </StaticRouter>
  )

  res.send(getResponse(jsx))
}
