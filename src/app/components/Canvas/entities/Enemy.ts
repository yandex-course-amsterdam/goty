import { ENEMY_TYPE, ENEMY_ROSTER } from 'app/constants'
import { GameObjectInterface } from 'app/interfaces'

import { Player } from './Player'

interface EnemyInterface extends GameObjectInterface {
  type: keyof typeof ENEMY_TYPE
  velocityMultiplier: number
  globalVelocityMultiplier: number
  target: Player
  chaseMode: boolean
}

export class Enemy implements EnemyInterface {
  type
  x = 0
  y = 0
  hitReward
  killReward
  radius
  color
  context
  velocity = { x: 0, y: 0 }
  velocityMultiplier
  globalVelocityMultiplier = 1
  target
  chaseMode

  constructor(
    type: keyof typeof ENEMY_TYPE,
    context: CanvasRenderingContext2D,
    player: Player,
    chaseMode: boolean
  ) {
    const {
      hitReward,
      killReward,
      radius,
      color,
      velocityMultiplier
    } = ENEMY_ROSTER[type]
    this.type = type
    this.hitReward = hitReward
    this.killReward = killReward
    this.radius = radius
    this.color = color
    this.velocityMultiplier = velocityMultiplier

    this.context = context

    this.target = player

    this.chaseMode = chaseMode

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

    if (this.chaseMode) {
      const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x)
      this.velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      }
    }

    this.x +=
      this.velocity.x * this.velocityMultiplier * this.globalVelocityMultiplier
    this.y +=
      this.velocity.y * this.velocityMultiplier * this.globalVelocityMultiplier
  }

  updateGlobalVelocityMultiplier(value: number): void {
    this.globalVelocityMultiplier = value
  }

  handleHit(): boolean {
    this.radius -= 15
    this.velocityMultiplier += 1
    return this.radius - 30 < 0
  }

  spawn(): void {
    const { canvas } = this.context

    if (Math.random() < 0.5) {
      this.x =
        Math.random() < 0.5 ? 0 - this.radius : canvas.width + this.radius
      this.y = Math.random() * canvas.height
    } else {
      this.x = Math.random() * canvas.width
      this.y =
        Math.random() < 0.5 ? 0 - this.radius : canvas.height + this.radius
    }

    const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x)
    this.velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
  }
}
