import { Player } from './Player'

interface EnemyInterface {
  x: number
  y: number
  radius: number
  color: string
  velocity: Record<'x' | 'y', number>
  velocityMultiplier: number
  context: CanvasRenderingContext2D
  target: Player
}

type EnemyType = {
  type: string
  killReward: number
  radius: number
  color: string
  velocityMultiplier: number
}

export class Enemy implements EnemyInterface {
  x = 0
  y = 0
  radius
  color
  velocity = { x: 0, y: 0 }
  velocityMultiplier
  context
  target

  constructor(type: EnemyType, context: CanvasRenderingContext2D, player: Player) {
    this.radius = type.radius
    this.color = type.color
    this.velocityMultiplier = type.velocityMultiplier

    this.context = context

    this.target = player

    this.spawn()
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

    // const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x)
    // this.velocity = {
    //   x: Math.cos(angle) * this.velocityMultiplier,
    //   y: Math.sin(angle) * this.velocityMultiplier,
    // }

    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  handleHit(): boolean {
    this.radius -= 15
    return this.radius - 30 < 0
  }

  spawn(): void {
    const { canvas } = this.context

    if (Math.random() < 0.5) {
      this.x = Math.random() < 0.5 ? 0 - this.radius : canvas.width + this.radius
      this.y = Math.random() * canvas.height
    } else {
      this.x = Math.random() * canvas.width
      this.y = Math.random() < 0.5 ? 0 - this.radius : canvas.height + this.radius
    }

    const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x)
    this.velocity = {
      x: Math.cos(angle) * this.velocityMultiplier,
      y: Math.sin(angle) * this.velocityMultiplier
    }
  }
}
