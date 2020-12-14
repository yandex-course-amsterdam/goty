import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { ENEMY_TYPE } from 'app/constants'
import { ITEM_NAME, storeScore } from 'app/utils'
import { StoreState } from 'app/reducers'
import { postResult } from 'app/api/Api'

import { State, Player, Enemy, Particle } from './entities'
import { handleFire, handleBoostChoice } from './helpers/listeners'

import style from './style.css'

enum GAME_STATE {
  INITIAL = 'INITIAL',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}

enum MOVE_DIRECTION_HORIZONTAL {
  RIGHT = 1,
  LEFT = -1
}

enum MOVE_DIRECTION_VERTICAL {
  TOP = -1,
  BOTTOM = 1
}

enum SET_ACTION {
  ADD = 'add',
  DELETE = 'delete'
}

const selectUserName = (state: StoreState) =>
  state.userInfo.display_name || state.userInfo.first_name

export const Canvas: React.FC = (): JSX.Element => {
  const [state] = useState<State>(new State())
  const [score, setScore] = useState(0)
  const [credits, setCredits] = useState(0)
  const [enemiesSpawnInterval, setEnemiesSpawnInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null)
  const [gameState, setGameState] = useState<keyof typeof GAME_STATE>(
    GAME_STATE.INITIAL
  )
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  // Сеты выбраны для удобства, которое предлагают методы add() и delete()
  const [verticalMoveDirection, setVerticalMoveDirection] = useState<
    Set<number>
  >(new Set())
  const [horizontalMoveDirection, setHorizontalMoveDirection] = useState<
    Set<number>
  >(new Set())

  const animationFrameId = useRef(0)
  const boardRef = useRef<HTMLCanvasElement>(null)

  const userName = useSelector(selectUserName)

  // Идея в том, чтобы проверять нажатую клавишу на каждый кадр анимации вместо того, чтобы мутировать state из внешних обработчиков
  // Также это удобно для ситуаций с перекрёстными нажатиями — теперь любая из WASD клавиш будет корректно триггерить движение в нужную сторону
  const handleMoveCallback = useCallback(
    (code: string, action: 'add' | 'delete'): void => {
      let tmp

      switch (code) {
        case 'KeyW':
          tmp = verticalMoveDirection
          tmp[action](MOVE_DIRECTION_VERTICAL.TOP)
          setVerticalMoveDirection(tmp)
          break
        case 'KeyD':
          tmp = horizontalMoveDirection
          tmp[action](MOVE_DIRECTION_HORIZONTAL.RIGHT)
          setHorizontalMoveDirection(tmp)
          break
        case 'KeyS':
          tmp = verticalMoveDirection
          tmp[action](MOVE_DIRECTION_VERTICAL.BOTTOM)
          setVerticalMoveDirection(tmp)
          break
        case 'KeyA':
          tmp = horizontalMoveDirection
          tmp[action](MOVE_DIRECTION_HORIZONTAL.LEFT)
          setHorizontalMoveDirection(tmp)
          break
        default:
          break
      }
    },
    [horizontalMoveDirection, verticalMoveDirection]
  )

  const handleMoveStartCallback = useCallback(
    (evt: KeyboardEvent) => {
      const { code } = evt
      handleMoveCallback(code, SET_ACTION.ADD)
    },
    [handleMoveCallback]
  )

  const handleMoveStopCallback = useCallback(
    (evt: KeyboardEvent) => {
      const { code } = evt
      handleMoveCallback(code, SET_ACTION.DELETE)
    },
    [handleMoveCallback]
  )

  const handleBoostChoiceCallback = useCallback(
    (evt: KeyboardEvent) => {
      handleBoostChoice(evt, state, ctx as CanvasRenderingContext2D)
    },
    [state, ctx]
  )

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

  const attachKeyboardListeners = (): void => {
    window.addEventListener('keydown', handleMoveStartCallback)
    window.addEventListener('keyup', handleMoveStopCallback)
    window.addEventListener('keydown', handleBoostChoiceCallback)
  }

  const detachKeyboardListeners = (): void => {
    window.removeEventListener('keydown', handleMoveStartCallback)
    window.removeEventListener('keyup', handleMoveStopCallback)
    window.removeEventListener('keydown', handleBoostChoiceCallback)
  }

  const storeResult = (): void => {
    const result = {
      data: {
        name: userName,
        [ITEM_NAME]: state.getScore()
      },
      ratingFieldName: ITEM_NAME
    }

    postResult(result).catch((err) => {
      console.warn(
        `There is an network error so we store this result to send it later. Here is the error: ${err}`
      )
      storeScore(result)
    })
  }

  const endGame = (): void => {
    setGameState(GAME_STATE.GAME_OVER)

    setHorizontalMoveDirection(new Set())
    setVerticalMoveDirection(new Set())

    clearInterval(enemiesSpawnInterval as ReturnType<typeof setInterval>)
    cancelAnimationFrame(animationFrameId.current)

    detachKeyboardListeners()

    storeResult()
  }

  const clearCanvas = (ctx: CanvasRenderingContext2D): void => {
    const {
      canvas: { width: canvasWidth, height: canvasHeight }
    } = ctx
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  const animate = (): void => {
    const { canvas } = ctx as CanvasRenderingContext2D
    const player = state.getPlayer() as Player
    const projectiles = state.getProjectiles()
    const enemies = state.getEnemies()
    const particles = state.getParticles()

    let playerHorizontalVelocity = 0
    let playerVerticalVelocity = 0

    if (horizontalMoveDirection?.size) {
      playerHorizontalVelocity = Array.from(
        horizontalMoveDirection
      ).pop() as number
    }

    if (verticalMoveDirection?.size) {
      playerVerticalVelocity = Array.from(verticalMoveDirection).pop() as number
    }

    player.setHorizontalVelocity(playerHorizontalVelocity)
    player.setVerticalVelocity(playerVerticalVelocity)

    const [gamepad] = navigator.getGamepads()
    if (gamepad?.buttons[7].pressed) {
      handleTriggerPush(gamepad)
      // TODO: сделать это красиво
    }

    animationFrameId.current = requestAnimationFrame(animate)

    if (ctx) {
      clearCanvas(ctx)
    }

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

          state.addScore(100)
          setScore(state.getScore())

          if (isDead) {
            state.addCredits(1)
            setCredits(state.getCredits())

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

  const startGame = (): void => {
    state.resetState()

    setScore(0)
    setCredits(0)

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

    setGameState(GAME_STATE.PLAYING)

    animate()
    spawnEnemies()
  }

  const createInitialPopup = (): JSX.Element => (
    <div className={style.popup}>
      I do not know what went wrong but they are here again
      <br />
      They will hunt you down
      <br />
      Fight for your life
      <div className={style.popupText}>
        <button onClick={startGame} type="button" className={style.popupButton}>
          Try your best
        </button>
      </div>
    </div>
  )

  const createGameOverPopup = (): JSX.Element => (
    <div className={cn(style.popup, style.gameOver)}>
      They got you. You managed to save {score} tokens
      <div>
        <button onClick={startGame} type="button" className={style.popupButton}>
          Try again
        </button>
      </div>
    </div>
  )

  const createScoreWidget = (): JSX.Element => (
    <div className={style.score}>
      <div>Tokens: {score}</div>
      <div>Credits: {credits}</div>
    </div>
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
      clearCanvas(ctx)
    }
  }, [ctx])

  return (
    <div className={style.canvasWrapper}>
      {gameState === GAME_STATE.INITIAL && createInitialPopup()}
      {gameState === GAME_STATE.GAME_OVER && createGameOverPopup()}
      {gameState !== GAME_STATE.INITIAL && createScoreWidget()}
      <canvas
        id="board"
        ref={boardRef}
        onClick={handleClick}
        className={style.canvas}
      />
    </div>
  )
}
