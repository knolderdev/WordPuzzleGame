export class Square {
  private color = 'red';
  x = 0;
  y = 0;
  z = 30;

  constructor(private ctx: CanvasRenderingContext2D) {}

  moveRight() {
    this.x++;
    // this.draw();
  }

  draw(x: number, y: number, z: number) {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(z * x, z * y, z, z);
  }
}
