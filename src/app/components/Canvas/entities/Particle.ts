export class Particle {
  x
  y
  color
  alpha
  friction
  radius
  velocity = {
    x: (Math.random() - 0.5) * (Math.random() * 15),
    y: (Math.random() - 0.5) * (Math.random() * 15)
  }
  context

  constructor(x: number, y: number, color: string, radius: number, context: CanvasRenderingContext2D) {
    this.x = x
    this.y = y
    this.color = color
    this.alpha = 1
    this.friction = 0.975

    this.radius = Math.random() * (radius / 10)

    this.context = context
  }

  draw(): void {
    const { context } = this
    context.save()
    context.globalAlpha = this.alpha
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color
    context.fill()
    context.closePath()
    context.restore()
  }

  update(): void {
    this.draw()
    this.velocity.x *= this.friction
    this.velocity.y *= this.friction
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.alpha -= 0.005
  }
}
