import React, { useState, useRef, useEffect, ReactElement } from 'react'
import { State, Player, Enemy, Particle } from './entities'
import { fire } from './helpers/firemodes'

import style from './style.css'

export const Canvas = (): ReactElement => {
  const [state] = useState<State>(new State())
  const [score, setScore] = useState(0)
  const [enemiesSpawnInterval, setEnemiesSpawnInterval] = useState<ReturnType<typeof setInterval> | null>(null)
  const [showEndGamePopup, setShowEndGamePopup] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  const animationFrameId = React.useRef(0)
  const boardRef = useRef<HTMLCanvasElement>(null)

  const spawnEnemies = (): void => {
    const interval = setInterval(() => {
      const player = state.getPlayer() as Player
      const enemy = new Enemy(
        { type: 'SMALL', killReward: 1, radius: 30, color: 'red', velocityMultiplier: 5 },
        ctx as CanvasRenderingContext2D,
        player
      )
      state.addEnemy(enemy)
    }, 750)

    setEnemiesSpawnInterval(interval)
  }

  const createPopup = () => {
    if (showEndGamePopup) return <div className={style.score}>We end {score}</div>
    return
  }

  const endGame = () => {
    setShowEndGamePopup(true)
    createPopup()

    clearInterval(enemiesSpawnInterval as ReturnType<typeof setInterval>)
    cancelAnimationFrame(animationFrameId.current)

    state.endGame()
  }

  const animate = (): void => {
    const { canvas } = ctx as CanvasRenderingContext2D
    const player = state.getPlayer() as Player
    const projectiles = state.getProjectiles()
    const enemies = state.getEnemies()
    const particles = state.getParticles()

    animationFrameId.current = requestAnimationFrame(animate)

    ctx!.fillStyle = 'white'
    ctx!.fillRect(0, 0, canvas.width, canvas.height)

    player.draw()

    projectiles.forEach((projectile, i) => {
      projectile.update()

      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
      ) {
        setTimeout(() => {
          state.removeProjectile(i)
        })
      }
    })

    enemies.forEach((enemy, enemyIndex) => {
      enemy.update()

      const enemyPlayerDistance = Math.hypot(enemy.x - player.x, enemy.y - player.y)

      // end game
      if (enemyPlayerDistance - player.radius - enemy.radius < 1) {
        endGame()
      }

      projectiles.forEach((projectile, projectileIndex) => {
        const enemyProjectileDistance = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y)

        // projectile hit an enemy
        if (enemyProjectileDistance - projectile.radius - enemy.radius < 1) {
          for (let i = 0; i < enemy.radius * 0.5; i += 1) {
            const particle = new Particle(
              projectile.x,
              projectile.y,
              enemy.color,
              enemy.radius,
              ctx as CanvasRenderingContext2D
            )
            state.addParticle(particle)
          }

          const isDead = enemy.handleHit()

          setTimeout(() => {
            state.removeProjectile(projectileIndex)
          }, 0)

          if (isDead) {
            state.addScore(100)
            setScore(state.getScore())
            // state.addCredits(5)

            setTimeout(() => {
              state.removeEnemy(enemyIndex)
            }, 0)
          }
        }
      })
    })

    particles.forEach((particle, i) => {
      if (particle.alpha <= 0) {
        setTimeout(() => {
          state.removeParticle(i)
        }, 0)
      } else {
        particle.update()
      }
    })
  }

  const init = (): void => {
    const { canvas } = ctx as CanvasRenderingContext2D
    const player = new Player(canvas.width / 2, canvas.height / 2, 10, 'black', ctx as CanvasRenderingContext2D)
    state.registerPlayer(player)

    animate()
    spawnEnemies()
  }

  const handleClick = (evt: React.MouseEvent<HTMLCanvasElement>): void => {
    const player = state.getPlayer() as Player
    const angle = Math.atan2(evt.clientY - player.y, evt.clientX - player.x)

    const velocity = {
      x: Math.cos(angle) * 10,
      y: Math.sin(angle) * 10
    }

    fire(state, velocity, ctx as CanvasRenderingContext2D)
  }

  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    setCtx(boardRef.current.getContext('2d'))

    if (ctx) {
      const canvasParent: HTMLElement = boardRef.current.parentElement as HTMLElement
      const canvasParentRect: DOMRect = canvasParent.getBoundingClientRect()
      const canvasWidth = canvasParentRect.width
      const canvasHeight = canvasParentRect.height
      boardRef.current.width = canvasWidth
      boardRef.current.height = canvasHeight

      init()
    }
  }, [ctx])

  return (
    <div className={style.canvasWrapper}>
      {createPopup()}
      <div className={style.score}>Score: {score}</div>
      <canvas id="board" ref={boardRef} onClick={handleClick} />
    </div>
  )
}
