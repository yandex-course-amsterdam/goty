import { BOOST_TYPE } from 'app/constants'
import { GameObjectInterface } from 'app/interfaces'

interface PlayerInterface extends GameObjectInterface {
  velocityMultiplier: number
  boost: string | null
}

export class Player implements PlayerInterface {
  x
  y
  radius
  color
  context
  velocity = {
    x: 0,
    y: 0
  }
  velocityMultiplier = 1
  boost: keyof typeof BOOST_TYPE | null = null
  boostCallback: React.Dispatch<
    React.SetStateAction<keyof typeof BOOST_TYPE | null>
  > | null = null

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    context: CanvasRenderingContext2D,
    boostCallback: React.Dispatch<
      React.SetStateAction<keyof typeof BOOST_TYPE | null>
    >
  ) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.context = context
    this.boostCallback = boostCallback
  }

  draw(): void {
    const { context } = this
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color
    context.fill()
    context.closePath()
  }

  update(): void {
    this.draw()
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  setHorizontalVelocity(dx: number): void {
    this.velocity.x = dx * this.velocityMultiplier
  }

  setVerticalVelocity(dy: number): void {
    this.velocity.y = dy * this.velocityMultiplier
  }

  setVelocityMultiplier(multiplier: number): void {
    this.velocityMultiplier = multiplier
  }

  hasBoost(): boolean {
    return !!this.boost
  }

  useBoost(boost: keyof typeof BOOST_TYPE): void {
    this.boost = boost
    this.boostCallback!(boost)

    setTimeout(() => {
      this.boost = null
      this.boostCallback!(null)
    }, 3000)
  }
}
