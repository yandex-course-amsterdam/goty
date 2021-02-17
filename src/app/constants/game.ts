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
