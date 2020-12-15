export interface GameObjectInterface {
  x: number
  y: number
  radius: number
  color: string
  context: CanvasRenderingContext2D
  velocity: Record<'x' | 'y', number>
}
