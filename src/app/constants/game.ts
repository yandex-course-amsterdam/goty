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
export const GAMEPAD_BUTTON = {
  A: 0,
  B: 1,
  X: 2,
  Y: 3,
  RT: 7
}
export enum BOOST_TYPE {
  BURST = 'BURST',
  FRACTION = 'FRACTION',
  SPREE = 'SPREE'
}
export const KEYBOARD_MAP_BOOST_TYPE: Record<
  string,
  keyof typeof BOOST_TYPE
> = {
  Digit1: BOOST_TYPE.BURST,
  Digit2: BOOST_TYPE.FRACTION,
  Digit3: BOOST_TYPE.SPREE
}
export const GAMEPAD_MAP_BOOST_TYPE: Record<number, keyof typeof BOOST_TYPE> = {
  [GAMEPAD_BUTTON.A]: BOOST_TYPE.BURST,
  [GAMEPAD_BUTTON.X]: BOOST_TYPE.FRACTION,
  [GAMEPAD_BUTTON.Y]: BOOST_TYPE.SPREE
}
