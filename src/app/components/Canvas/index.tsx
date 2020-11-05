import React, { useState, useRef, useEffect, ReactElement } from 'react'
import { Player } from './entities'
import { GameStateEnum } from '../../interfaces/index'
import { GameState } from './entities/GameState'
import { drawInitial, drawPick, drawPlay, drawEnd } from './helpers'

import style from './style.css'

type CanvasProps = { players: string[] }

export const Canvas = ({ players }: CanvasProps): ReactElement => {
  const [gameState] = useState<GameState>(new GameState())
  const boardRef = useRef<HTMLCanvasElement>(null)

  const animate = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    requestAnimationFrame(() => animate(ctx))

    switch (gameState.state) {
      case GameStateEnum.INITIAL:
        drawInitial(gameState, ctx)
        break
      case GameStateEnum.PICK:
        drawPick(gameState, ctx)
        break
      case GameStateEnum.PLAY:
        drawPlay(gameState, ctx)
        break
      case GameStateEnum.END:
        drawEnd(gameState, ctx)
        break
      default:
        break
    }
  }

  const init = (ctx: CanvasRenderingContext2D): void => {
    players.slice(0, 2).forEach((player) => {
      gameState.addPlayer(new Player(player, ctx))
    })

    animate(ctx)
  }

  const handleClick = (): void => {
    // Just for quick test
    gameState.endGame()
    gameState.startGame()
    gameState.startPick()
  }

  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    const ctx = boardRef.current.getContext('2d')

    if (ctx) {
      const canvasParent: HTMLElement = boardRef.current.parentElement as HTMLElement
      const canvasParentRect: DOMRect = canvasParent.getBoundingClientRect()
      const canvasWidth = canvasParentRect.width
      const canvasHeight = canvasParentRect.height
      boardRef.current.width = canvasWidth
      boardRef.current.height = canvasHeight

      init(ctx)
    }
  })

  return (
    <div className={style.canvasWrapper}>
      <canvas id="board" ref={boardRef} onClick={handleClick} />
    </div>
  )
}
