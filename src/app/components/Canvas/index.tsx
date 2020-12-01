import React, { useState, useRef, useCallback, useEffect } from 'react'

import { ENEMY_TYPE } from 'app/constants'

import { State, Player, Enemy, Particle } from './entities'
import {
  handleFire,
  handleMoveStart,
  handleMoveStop,
  handleBoostChoice
} from './helpers/listeners'

import style from './style.css'

export const Canvas: React.FC = (): JSX.Element => {
  const [state] = useState<State>(new State())
  const [score, setScore] = useState(0)
  const [enemiesSpawnInterval, setEnemiesSpawnInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null)
  const [showEndGamePopup, setShowEndGamePopup] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  const animationFrameId = React.useRef(0)
  const boardRef = useRef<HTMLCanvasElement>(null)

  const spawnEnemies = (): void => {
    const interval = setInterval(() => {
      const player = state.getPlayer() as Player
      const enemy = new Enemy(
        ENEMY_TYPE.SMALL,
        ctx as CanvasRenderingContext2D,
        player
      )
      state.addEnemy(enemy)
    }, 750)

    // TODO: подумать про вложенные таймауты. Плюсы — более точные промежутки, чем при интервалах. Минусы — надо придумать как очищать таймаут
    setEnemiesSpawnInterval(interval)
  }

  const createPopup = () =>
    showEndGamePopup && <div className={style.score}>We end {score}</div>

  const endGame = () => {
    setShowEndGamePopup(true)
    createPopup()

    clearInterval(enemiesSpawnInterval as ReturnType<typeof setInterval>)
    cancelAnimationFrame(animationFrameId.current)

    state.endGame()
  }

  const attachKeyboardListeners = (): void => {
    window.addEventListener('keydown', (evt) => {
      handleMoveStart(evt, state)
    })
    window.addEventListener('keyup', (evt) => {
      handleMoveStop(evt, state)
    })

    window.addEventListener('keydown', (evt) => {
      handleBoostChoice(evt, state, ctx as CanvasRenderingContext2D)
    })
  }

  const animate = (): void => {
    const { canvas } = ctx as CanvasRenderingContext2D
    const player = state.getPlayer() as Player
    const projectiles = state.getProjectiles()
    const enemies = state.getEnemies()
    const particles = state.getParticles()

    const [gamepad] = navigator.getGamepads()
    if (gamepad?.buttons[7].pressed) {
      handleTriggerPush(gamepad)
      // TODO: сделать это красиво
    }

    animationFrameId.current = requestAnimationFrame(animate)

    ctx!.fillStyle = 'white'
    ctx!.fillRect(0, 0, canvas.width, canvas.height)

    player.update()

    projectiles.forEach((projectile, i) => {
      projectile.update()

      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
      ) {
        state.removeProjectile(i)
      }
    })

    enemies.forEach((enemy, enemyIndex) => {
      enemy.update()

      const enemyPlayerDistance = Math.hypot(
        enemy.x - player.x,
        enemy.y - player.y
      )

      if (enemyPlayerDistance - player.radius - enemy.radius < 1) {
        endGame()
      }

      projectiles.forEach((projectile, projectileIndex) => {
        const enemyProjectileDistance = Math.hypot(
          enemy.x - projectile.x,
          enemy.y - projectile.y
        )

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

          state.removeProjectile(projectileIndex)

          if (isDead) {
            state.addScore(100)
            setScore(state.getScore())
            // state.addCredits(5)

            state.removeEnemy(enemyIndex)
          }
        }
      })
    })

    particles.forEach((particle, i) => {
      if (particle.alpha <= 0) {
        state.removeParticle(i)
      } else {
        particle.update()
      }
    })
  }

  const init = (): void => {
    const { canvas } = ctx as CanvasRenderingContext2D
    const player = new Player(
      canvas.width / 2,
      canvas.height / 2,
      10,
      'black',
      ctx as CanvasRenderingContext2D
    )
    state.registerPlayer(player)

    attachKeyboardListeners()
    animate()
    spawnEnemies()
  }

  const handleClick = useCallback(
    (evt: React.MouseEvent<HTMLCanvasElement>): void => {
      const { clientX, clientY } = evt
      const player = state.getPlayer() as Player

      const { canvas } = ctx as CanvasRenderingContext2D
      const canvasRect = canvas.getBoundingClientRect()

      const pos = {
        x: clientX - canvasRect.x,
        y: clientY - canvasRect.y
      }

      const angle = Math.atan2(pos.y - player.y, pos.x - player.x)

      handleFire(angle, state, ctx as CanvasRenderingContext2D)
    },
    [state, ctx]
  )

  const handleTriggerPush = useCallback(
    (gamepad: Gamepad) => {
      const { axes } = gamepad

      const angle = Math.atan2(axes[3], axes[2])

      // TODO: добавить ограничение на один выстрел в n миллисекунд

      handleFire(angle, state, ctx as CanvasRenderingContext2D)
    },
    [state, ctx]
  )

  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    setCtx(boardRef.current.getContext('2d'))

    if (ctx) {
      const canvasParent: HTMLElement = boardRef.current
        .parentElement as HTMLElement
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
      <canvas
        id="board"
        ref={boardRef}
        onClick={handleClick}
        className={style.canvas}
      />
    </div>
  )
}
