import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import {
  ENEMY_TYPE,
  GAMEPAD_BUTTON,
  KEYBOARD_MAP_BOOST_TYPE,
  GAMEPAD_MAP_BOOST_TYPE,
  BOOST,
  BOOST_TYPE,
  GAME_LEVEL
} from 'app/constants'
import { ITEM_NAME, storeScore, isServer } from 'app/utils'
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

enum INPUT_DEVICE {
  KEYBOARD = 'KEYBOARD',
  GAMEPAD = 'GAMEPAD'
}

const selectUserName = (state: StoreState) =>
  state.userInfo.displayName || state.userInfo.firstName

export const Canvas: React.FC = (): JSX.Element => {
  const [state] = useState<State>(new State())
  const [score, setScore] = useState(0)
  const [credits, setCredits] = useState(0)
  const [boost, setBoost] = useState<keyof typeof BOOST_TYPE | null>(null)
  const [inputDevice, setInputDevice] = useState<keyof typeof INPUT_DEVICE>(
    INPUT_DEVICE.KEYBOARD
  )
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
  const level = useRef(GAME_LEVEL.EASY)
  const enemiesSpawnInterval = useRef<ReturnType<typeof setInterval> | null>(
    null
  )

  const userName = useSelector(selectUserName)

  // Идея в том, чтобы проверять нажатую клавишу на каждый кадр анимации вместо того, чтобы мутировать state из внешних обработчиков
  // Также это удобно для ситуаций с перекрёстными нажатиями — теперь любая из WASD клавиш будет корректно триггерить движение в нужную сторону
  const handleMoveCallback = useCallback(
    (code: string, action: SET_ACTION): void => {
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
      // «живая» реакция на смену устройства ввода
      setInputDevice(INPUT_DEVICE.KEYBOARD)
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
      // «живая» реакция на смену устройства ввода
      setInputDevice(INPUT_DEVICE.KEYBOARD)
      // проверяем, что нажатая клавиша назначена на буст
      if (KEYBOARD_MAP_BOOST_TYPE[evt.code]) {
        handleBoostChoice(
          KEYBOARD_MAP_BOOST_TYPE[evt.code],
          state,
          ctx as CanvasRenderingContext2D
        )
      }
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
      handleFire(angle, state, ctx as CanvasRenderingContext2D)
    },
    [state, ctx]
  )

  const chooseEnemy = (): keyof typeof ENEMY_TYPE | null => {
    const difficulty = state.getDifficulty()
    const enemyMap = state.getEnemyMap()
    const availableEnemyTypes = level.current.enemyTypes

    for (let i = availableEnemyTypes.length - 1; i >= 0; i -= 1) {
      const enemy = availableEnemyTypes[i]
      if (
        enemyMap[enemy.type] < enemy.maxCount &&
        difficulty + enemy.killReward <= level.current.difficultyCap
      ) {
        return enemy.type
      }
    }

    return null
  }

  const spawnEnemies = (): void => {
    const interval = setInterval(() => {
      const player = state.getPlayer() as Player
      const enemyType = chooseEnemy()
      if (enemyType) {
        const enemy = new Enemy(
          enemyType,
          ctx as CanvasRenderingContext2D,
          player,
          level.current.chaseMode
        )
        state.addEnemy(enemy)
      }
    }, 1000)

    enemiesSpawnInterval.current = interval
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

    postResult(result).catch((err: Error) => {
      if (err.message === 'Network Error') {
        console.warn(
          `There is an network error so we store this result to send it later. Here is the error: ${err}`
        )
        storeScore(result)
      }
    })
  }

  const endGame = (): void => {
    setGameState(GAME_STATE.GAME_OVER)

    setHorizontalMoveDirection(new Set())
    setVerticalMoveDirection(new Set())

    clearInterval(
      enemiesSpawnInterval.current as ReturnType<typeof setInterval>
    )
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

    // обновляем кредиты и текущий буст каждый кадр
    setCredits(state.getCredits())
    setBoost(player.getBoost())

    let playerHorizontalVelocity = 0
    let playerVerticalVelocity = 0

    if (!isServer) {
      const [gamepad] = navigator.getGamepads()

      if (gamepad) {
        const { axes, buttons } = gamepad
        const [
          horizontalLAxis,
          verticalLAxis,
          horizontalRAxis,
          verticalRAxis
        ] = axes

        playerHorizontalVelocity = horizontalLAxis
        playerVerticalVelocity = verticalLAxis

        // исключаем небольшой люфт по осям
        const deadZone = 0.1
        const isAxisUsed =
          horizontalLAxis > deadZone ||
          verticalLAxis > deadZone ||
          horizontalRAxis > deadZone ||
          verticalRAxis > deadZone
        const isKeyPressed = buttons.some((button) => button.pressed)

        // «живая» реакция на смену устройства ввода
        if (isAxisUsed || isKeyPressed) {
          setInputDevice(INPUT_DEVICE.GAMEPAD)
        }

        if (buttons[GAMEPAD_BUTTON.A].pressed) {
          handleBoostChoice(
            GAMEPAD_MAP_BOOST_TYPE[GAMEPAD_BUTTON.A],
            state,
            ctx as CanvasRenderingContext2D
          )
        }

        if (buttons[GAMEPAD_BUTTON.X].pressed) {
          handleBoostChoice(
            GAMEPAD_MAP_BOOST_TYPE[GAMEPAD_BUTTON.X],
            state,
            ctx as CanvasRenderingContext2D
          )
        }

        if (buttons[GAMEPAD_BUTTON.Y].pressed) {
          handleBoostChoice(
            GAMEPAD_MAP_BOOST_TYPE[GAMEPAD_BUTTON.Y],
            state,
            ctx as CanvasRenderingContext2D
          )
        }

        if (buttons[GAMEPAD_BUTTON.RT].pressed) {
          handleTriggerPush(gamepad)
        }
      }
    }

    // в коде выше мы устанавливаем значения playerVelocity на основе отклонения осей геймпада
    // в коде ниже мы проверяем стек нажатий WASD
    // такой порядок позволит перезаписать значения playerVelocity с клавиатуры при необходимости
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

    animationFrameId.current = requestAnimationFrame(animate)

    if (ctx) {
      clearCanvas(ctx)
    }

    player.update()

    projectiles.forEach((projectile, i) => {
      projectile.updateGlobalVelocityMultiplier(
        level.current.velocityMultiplier
      )
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
      enemy.updateGlobalVelocityMultiplier(level.current.velocityMultiplier)
      enemy.update()

      const isOutOfBoard =
        enemy.x < 0 - enemy.radius - 50 ||
        enemy.x > boardRef.current!.width + enemy.radius + 50 ||
        enemy.y < 0 - enemy.radius - 50 ||
        enemy.y > boardRef.current!.height + enemy.radius + 50

      if (isOutOfBoard) {
        state.removeEnemy(enemyIndex)
        return
      }

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

          setScore(state.addScore(enemy.hitReward))
          level.current = state.getLevel()
          player.updateGlobalVelocityMultiplier(
            level.current.velocityMultiplier
          )

          if (isDead) {
            state.addCredits(enemy.killReward)
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
    level.current = GAME_LEVEL.EASY

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
    <div className={cn(style.widget, style.score)}>
      <div>Tokens: {score}</div>
      <div>Credits: {credits}</div>
      <div className={style.stars}>
        Wanted:
        {new Array(level.current.stars).fill(null).map(() => (
          <img src="../../../images/level-star.png" alt="Star" />
        ))}
      </div>
    </div>
  )

  const createBoostWidget = (): JSX.Element => (
    <div className={cn(style.widget, style.boost)}>
      {Object.keys(BOOST).map((key) => (
        <div
          className={cn({
            [style.boostItem]: true,
            [style.boostItemActive]:
              credits >= BOOST[key as keyof typeof BOOST_TYPE].price
          })}
        >
          <img
            width="30"
            src={
              inputDevice === INPUT_DEVICE.KEYBOARD
                ? BOOST[key as keyof typeof BOOST_TYPE].keyboardControlIcon
                : BOOST[key as keyof typeof BOOST_TYPE].gamepadControlIcon
            }
            alt={key}
          />
          <img
            className={style.boostIcon}
            src={BOOST[key as keyof typeof BOOST_TYPE].icon}
            alt={key}
          />
        </div>
      ))}
    </div>
  )

  const createBoostBar = (): JSX.Element => (
    <div className={style.boostTime}>
      <img
        className={cn(style.boostIcon, style.boostIconBig)}
        src={BOOST[boost!].icon}
        alt={boost!}
      />
      <div className={style.boostProgressBar} />
    </div>
  )

  const handleVisibilityChange = useCallback(() => {
    if (gameState !== GAME_STATE.PLAYING) {
      return
    }

    if (document.visibilityState === 'hidden') {
      clearInterval(
        enemiesSpawnInterval.current as ReturnType<typeof setInterval>
      )
    } else {
      spawnEnemies()
    }
  }, [enemiesSpawnInterval, gameState])

  useEffect(() => {
    window.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  })

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
      {gameState !== GAME_STATE.INITIAL && createBoostWidget()}

      {boost && createBoostBar()}
      <canvas
        id="board"
        ref={boardRef}
        onClick={handleClick}
        className={style.canvas}
      />
    </div>
  )
}
