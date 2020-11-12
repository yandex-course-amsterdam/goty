import { Player } from './Player'
import { Projectile } from './Projectile'
import { Enemy } from './Enemy'
import { Particle } from './Particle'

export class State {
  private score = 0
  private credits = 0
  private player: Player | null = null
  private projectiles: Projectile[] = []
  private enemies: Enemy[] = []
  private particles: Particle[] = []

  getScore(): number {
    return this.score
  }

  addScore(value: number): void {
    this.score += value
  }

  getCredits(): number {
    return this.credits
  }

  addCredits(value: number): void {
    this.credits += value
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
    this.projectiles.push(projectile)
  }

  removeProjectile(i: number): void {
    this.projectiles.splice(i, 1)
  }

  getEnemies(): Enemy[] {
    return this.enemies
  }

  addEnemy(enemy: Enemy): void {
    this.enemies.push(enemy)
  }

  removeEnemy(i: number): void {
    this.enemies.splice(i, 1)
  }

  getParticles(): Particle[] {
    return this.particles
  }

  addParticle(particle: Particle): void {
    this.particles.push(particle)
  }

  removeParticle(i: number): void {
    this.particles.splice(i, 1)
  }

  resetState(): void {
    this.score = 0
    this.player = null
    this.projectiles = []
    this.enemies = []
    this.particles = []
  }

  storeResult(): void {
    // sotring here
  }

  endGame(): void {
    this.storeResult()
  }
}
