import { GameDifficulty, GAME_LEVEL, ENEMY_TYPE } from 'app/constants'

import { Player } from './Player'
import { Projectile } from './Projectile'
import { Enemy } from './Enemy'
import { Particle } from './Particle'

type EnemyMap = Record<keyof typeof ENEMY_TYPE, number>

export class State {
  private difficulty = 0
  private level = GAME_LEVEL.EASY
  private score = 0
  private credits = 0
  private player: Player | null = null
  private projectiles: Projectile[] = []
  private enemies: Enemy[] = []
  private particles: Particle[] = []
  private enemyMap: EnemyMap = {
    [ENEMY_TYPE.SMALL]: 0,
    [ENEMY_TYPE.MEDIUM]: 0,
    [ENEMY_TYPE.BIG]: 0,
    [ENEMY_TYPE.ULTIMATE]: 0
  }
  private fireCooldown = false

  getDifficulty(): number {
    return this.difficulty
  }

  setDifficulty(value: number): void {
    this.difficulty = value
  }

  getLevel(): GameDifficulty {
    return this.level
  }

  setLevel(value: GameDifficulty): void {
    this.level = value
  }

  getScore(): number {
    return this.score
  }

  addScore(value: number): number {
    this.score += value
    if (
      this.level.levelCap &&
      this.score >= this.level.levelCap &&
      this.level.next
    ) {
      this.level = GAME_LEVEL[this.level.next]
    }
    return this.score
  }

  getCredits(): number {
    return this.credits
  }

  addCredits(value: number): void {
    this.credits += value
  }

  spendCredits(value: number): void {
    this.credits -= value
  }

  getPlayer(): Player | null {
    return this.player
  }

  registerPlayer(player: Player): void {
    this.player = player
  }

  getProjectiles(): Projectile[] {
    return this.projectiles
  }

  addProjectile(projectile: Projectile): void {
    this.projectiles = this.projectiles.concat(projectile)
  }

  removeProjectile(i: number): void {
    this.projectiles = this.projectiles
      .slice(0, i)
      .concat(this.projectiles.slice(i + 1))
  }

  getEnemies(): Enemy[] {
    return this.enemies
  }

  addEnemy(enemy: Enemy): void {
    this.enemies = this.enemies.concat(enemy)
    this.difficulty += enemy.killReward
    this.enemyMap[enemy.type] += 1
  }

  removeEnemy(i: number): void {
    const enemy = this.enemies[i]
    this.enemies = this.enemies.slice(0, i).concat(this.enemies.slice(i + 1))
    this.difficulty -= enemy.killReward
    this.enemyMap[enemy.type] -= 1
  }

  getParticles(): Particle[] {
    return this.particles
  }

  addParticle(particle: Particle): void {
    this.particles = this.particles.concat(particle)
  }

  removeParticle(i: number): void {
    this.particles = this.particles
      .slice(0, i)
      .concat(this.particles.slice(i + 1))
  }

  getEnemyMap(): EnemyMap {
    return this.enemyMap
  }

  getFireCooldown(): boolean {
    return this.fireCooldown
  }

  holdFire(cooldown?: number): void {
    this.fireCooldown = true

    if (cooldown) {
      setTimeout(() => {
        this.fireCooldown = false
      }, cooldown)
    }
  }

  openFire(): void {
    this.fireCooldown = false
  }

  resetState(): void {
    this.difficulty = 0
    this.level = GAME_LEVEL.EASY
    this.score = 0
    this.credits = 0
    this.player = null
    this.projectiles = []
    this.enemies = []
    this.particles = []
    this.enemyMap = {
      [ENEMY_TYPE.SMALL]: 0,
      [ENEMY_TYPE.MEDIUM]: 0,
      [ENEMY_TYPE.BIG]: 0,
      [ENEMY_TYPE.ULTIMATE]: 0
    }
    this.fireCooldown = false
  }
}
