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
  private fireCooldown = false

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
  }

  removeEnemy(i: number): void {
    this.enemies = this.enemies.slice(0, i).concat(this.enemies.slice(i + 1))
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
    this.score = 0
    this.player = null
    this.projectiles = []
    this.enemies = []
    this.particles = []
  }
}
