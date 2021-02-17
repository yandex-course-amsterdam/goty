type FireType = 'BURST' | 'FRACTION' | 'SPREE'
interface BoostType {
  price: number
  icon: string
  keyboardControlIcon: string
  gamepadControlIcon: string
}
type Boost = Record<FireType, BoostType>
export enum BOOST_TYPE {
  BURST = 'BURST',
  FRACTION = 'FRACTION',
  SPREE = 'SPREE'
}
export const BOOST: Boost = {
  [BOOST_TYPE.BURST]: {
    price: 5,
    icon: '../../images/burst.png',
    keyboardControlIcon: '../../images/key-1.png',
    gamepadControlIcon: '../../images/gamepad-a.png'
  },
  [BOOST_TYPE.FRACTION]: {
    price: 10,
    icon: '../../images/fraction.png',
    keyboardControlIcon: '../../images/key-2.png',
    gamepadControlIcon: '../../images/gamepad-x.png'
  },
  [BOOST_TYPE.SPREE]: {
    price: 25,
    icon: '../../images/spree.png',
    keyboardControlIcon: '../../images/key-3.png',
    gamepadControlIcon: '../../images/gamepad-y.png'
  }
}
export const PROJECTILE_RADIUS = 5
export const BURST_LENGTH = 3
export const FRACTION_LENGTH = 5
export const SPREE_ROUND_COUNT = 3

export enum ENEMY_TYPE {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  BIG = 'BIG',
  ULTIMATE = 'ULTIMATE'
}
interface EnemyType {
  type: keyof typeof ENEMY_TYPE
  hitReward: number
  killReward: number
  radius: number
  color: string
  velocityMultiplier: number
  maxCount: number
}
export const ENEMY_ROSTER: Record<keyof typeof ENEMY_TYPE, EnemyType> = {
  [ENEMY_TYPE.SMALL]: {
    type: ENEMY_TYPE.SMALL,
    hitReward: 100,
    killReward: 1,
    radius: 30,
    color: 'red',
    velocityMultiplier: 5,
    maxCount: 999
  },
  [ENEMY_TYPE.MEDIUM]: {
    type: ENEMY_TYPE.MEDIUM,
    hitReward: 100,
    killReward: 2,
    radius: 45,
    color: 'red',
    velocityMultiplier: 3,
    maxCount: 10
  },
  [ENEMY_TYPE.BIG]: {
    type: ENEMY_TYPE.BIG,
    hitReward: 100,
    killReward: 3,
    radius: 60,
    color: 'red',
    velocityMultiplier: 2,
    maxCount: 5
  },
  [ENEMY_TYPE.ULTIMATE]: {
    type: ENEMY_TYPE.ULTIMATE,
    hitReward: 100,
    killReward: 6,
    radius: 120,
    color: 'red',
    velocityMultiplier: 1,
    maxCount: 1
  }
}

enum GAME_DIFFICULTY {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  IMPOSSIBLE = 'IMPOSSIBLE'
}
export interface GameDifficulty {
  stars: number
  levelCap: number | null
  spawnTimeout: number
  difficultyCap: number
  enemyTypes: EnemyType[]
  chaseMode: boolean
  velocityMultiplier: number
  next?: keyof typeof GAME_DIFFICULTY
}
type GameLevel = Record<keyof typeof GAME_DIFFICULTY, GameDifficulty>
export const GAME_LEVEL: GameLevel = {
  [GAME_DIFFICULTY.EASY]: {
    stars: 1,
    levelCap: 1000,
    spawnTimeout: 1000,
    difficultyCap: 5,
    enemyTypes: [ENEMY_ROSTER.SMALL],
    chaseMode: false,
    velocityMultiplier: 1,
    next: GAME_DIFFICULTY.MEDIUM
  },
  [GAME_DIFFICULTY.MEDIUM]: {
    stars: 2,
    levelCap: 5000,
    spawnTimeout: 750,
    difficultyCap: 10,
    enemyTypes: [ENEMY_ROSTER.SMALL, ENEMY_ROSTER.MEDIUM],
    chaseMode: false,
    velocityMultiplier: 1.5,
    next: GAME_DIFFICULTY.HARD
  },
  [GAME_DIFFICULTY.HARD]: {
    stars: 3,
    levelCap: 15000,
    spawnTimeout: 750,
    difficultyCap: 20,
    enemyTypes: [ENEMY_ROSTER.SMALL, ENEMY_ROSTER.MEDIUM, ENEMY_ROSTER.BIG],
    chaseMode: true,
    velocityMultiplier: 2,
    next: GAME_DIFFICULTY.IMPOSSIBLE
  },
  [GAME_DIFFICULTY.IMPOSSIBLE]: {
    stars: 4,
    levelCap: null,
    spawnTimeout: 500,
    difficultyCap: 30,
    enemyTypes: [
      ENEMY_ROSTER.SMALL,
      ENEMY_ROSTER.MEDIUM,
      ENEMY_ROSTER.BIG,
      ENEMY_ROSTER.ULTIMATE
    ],
    chaseMode: true,
    velocityMultiplier: 3
  }
}

type KeyboardBoostMap = Record<string, keyof typeof BOOST_TYPE>
type GamepadBoostMap = Record<number, keyof typeof BOOST_TYPE>
export const GAMEPAD_BUTTON = {
  A: 0,
  B: 1,
  X: 2,
  Y: 3,
  RT: 7
}
export const KEYBOARD_MAP_BOOST_TYPE: KeyboardBoostMap = {
  Digit1: BOOST_TYPE.BURST,
  Digit2: BOOST_TYPE.FRACTION,
  Digit3: BOOST_TYPE.SPREE
}
export const GAMEPAD_MAP_BOOST_TYPE: GamepadBoostMap = {
  [GAMEPAD_BUTTON.A]: BOOST_TYPE.BURST,
  [GAMEPAD_BUTTON.X]: BOOST_TYPE.FRACTION,
  [GAMEPAD_BUTTON.Y]: BOOST_TYPE.SPREE
}
