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
    icon: 'https://static.thenounproject.com/png/319760-200.png',
    keyboardControlIcon: '',
    gamepadControlIcon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Xbox_button_A.svg/1200px-Xbox_button_A.svg.png'
  },
  [BOOST_TYPE.FRACTION]: {
    price: 10,
    icon: 'https://static.thenounproject.com/png/172003-200.png',
    keyboardControlIcon: '',
    gamepadControlIcon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Xbox_button_X.svg/120px-Xbox_button_X.svg.png'
  },
  [BOOST_TYPE.SPREE]: {
    price: 25,
    icon: 'http://kf-wiki.com/images/4/43/UI_PerkIcon_Gunslinger_black.png',
    keyboardControlIcon: '',
    gamepadControlIcon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Xbox_button_Y.svg/120px-Xbox_button_Y.svg.png'
  }
}
export const PROJECTILE_RADIUS = 5
export const BURST_LENGTH = 3
export const FRACTION_LENGTH = 5
export const SPREE_ROUND_COUNT = 3

export const ENEMY_TYPE = {
  SMALL: {
    type: 'SMALL',
    killReward: 1,
    radius: 30,
    color: 'red',
    velocityMultiplier: 5
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
