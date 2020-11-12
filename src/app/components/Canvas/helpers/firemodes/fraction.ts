import { State } from '../../entities'
import { fire } from './fire'

export function fireFraction(state: State, angle: number, context: CanvasRenderingContext2D): void {
  const deviations = [-20, -10, 0, 10, 20]

  for (let i = 0; i < 5; i += 1) {
    const angleInDegrees = (angle * 180) / Math.PI
    const angleDeviatedInDegrees = angleInDegrees + deviations[i]
    const angleDeviated = (angleDeviatedInDegrees / 180) * Math.PI
    const velocity = {
      x: Math.cos(angleDeviated) * 15,
      y: Math.sin(angleDeviated) * 15
    }
    fire(state, velocity, context)
  }
}
