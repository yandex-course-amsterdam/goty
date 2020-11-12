import { State } from '../../entities'
import { fire } from './fire'

export function fireBurst(state: State, angle: number, context: CanvasRenderingContext2D): void {
  const velocity = {
    x: Math.cos(angle) * 20,
    y: Math.sin(angle) * 20
  }

  fire(state, velocity, context)

  let i = 0
  const burstInterval = setInterval(() => {
    fire(state, velocity, context)
    i += 1
    if (i === 2) {
      clearInterval(burstInterval)
    }
  }, 50)
}
