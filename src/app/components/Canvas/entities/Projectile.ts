import { GameObjectInterface } from 'app/interfaces'

export class Projectile implements GameObjectInterface {
  x
  y
  radius
  color
  context
  velocity
  globalVelocityMultiplier = 1

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    velocity: Record<'x' | 'y', number>,
    context: CanvasRenderingContext2D
  ) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.context = context
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
    this.x += this.velocity.x * this.globalVelocityMultiplier
    this.y += this.velocity.y * this.globalVelocityMultiplier
  }

  updateGlobalVelocityMultiplier(value: number): void {
    this.globalVelocityMultiplier = value
  }
}
