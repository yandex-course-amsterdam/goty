import React, { useRef, useEffect, MutableRefObject, ReactElement } from 'react'

enum CardType {
  BASE,
  ADD,
  SUBSTRACT,
  FLIP
}

type Slot = {
  left: number
  top: number
}

type Card = {
  type: CardType
  power: number
}

const drawCard = (ctx: CanvasRenderingContext2D, slot: Slot, card: Card): void => {
  const { left, top } = slot
  const { power } = card

  ctx.fillStyle = '#95856B'
  ctx.fillRect(left, top, 80, 100)

  const gradient = ctx.createLinearGradient(left + 15, 0, left + 65, 0)
  gradient.addColorStop(0, '#06330B')
  gradient.addColorStop(0.5, '#197726')
  gradient.addColorStop(1, '#06330B')
  ctx.fillStyle = gradient
  ctx.fillRect(left + 10, top + 10, 60, 80)

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '12px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(`${power}`, left + 40, 50)
}

const drawBoard = (ctx: CanvasRenderingContext2D): void => {
  ctx.fillRect(0, 0, 300, 300)
  drawCard(ctx, { left: 10, top: 10 }, { type: CardType.SUBSTRACT, power: 1 })
}

export const Canvas = (): ReactElement => {
  const boardRef = useRef() as MutableRefObject<HTMLCanvasElement>

  useEffect(() => {
    if (!boardRef.current) return
    const ctx = boardRef.current.getContext('2d')
    if (ctx) drawBoard(ctx)
  }, [])

  return (
    <section>
      <canvas id="board" ref={boardRef} width="300" height="300" />
    </section>
  )
}
