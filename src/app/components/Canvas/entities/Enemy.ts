import { ENEMY_TYPE } from 'app/constants'
import { GameObjectInterface } from 'app/interfaces'

import { Player } from './Player'

interface EnemyInterface extends GameObjectInterface {
  velocityMultiplier: number
  target: Player
}

interface EnemyType {
  hitReward: number
  killReward: number
  radius: number
  color: string
  velocityMultiplier: number
}

const EnemyMap: Record<keyof typeof ENEMY_TYPE, EnemyType> = {
  [ENEMY_TYPE.SMALL]: {
    hitReward: 100,
    killReward: 1,
    radius: 30,
    color: 'red',
    velocityMultiplier: 5
  },
  [ENEMY_TYPE.MEDIUM]: {
    hitReward: 100,
    killReward: 2,
    radius: 45,
    color: 'red',
    velocityMultiplier: 3
  },
  [ENEMY_TYPE.BIG]: {
    hitReward: 100,
    killReward: 3,
    radius: 60,
    color: 'red',
    velocityMultiplier: 2
  },
  [ENEMY_TYPE.ULTIMATE]: {
    hitReward: 100,
    killReward: 5,
    radius: 90,
    color: 'red',
    velocityMultiplier: 1
  }
}

export class Enemy implements EnemyInterface {
  x = 0
  y = 0
  hitReward
  killReward
  radius
  color
  context
  velocity = { x: 0, y: 0 }
  velocityMultiplier
  target

  constructor(
    type: keyof typeof ENEMY_TYPE,
    context: CanvasRenderingContext2D,
    player: Player
  ) {
    const {
      hitReward,
      killReward,
      radius,
      color,
      velocityMultiplier
    } = EnemyMap[type]
    this.hitReward = hitReward
    this.killReward = killReward
    this.radius = radius
    this.color = color
    this.velocityMultiplier = velocityMultiplier

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
      x: Math.cos(angle) * this.velocityMultiplier,
      y: Math.sin(angle) * this.velocityMultiplier
    }
  }
}
