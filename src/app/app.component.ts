import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  circlesDrawed: any[] = [];
  circlesDeleted: any[] = [];

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  reDrawCircles() {
    for (let i = 0; i < this.circlesDrawed.length; i++) {
      const element = this.circlesDrawed[i];
      let x = element[0];
      let y = element[1];
      this.drawCircle(x, y);
    }
  }

  clearCanvas(): void {
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
  }
  undo(): void {
    let lastElement = this.circlesDrawed.pop();
    if (typeof lastElement === undefined) return;
    this.circlesDeleted.push(lastElement);
    this.clearCanvas();
    this.reDrawCircles();
  }

  redo(): void {
    let lastElement = this.circlesDeleted.pop();
    if (typeof lastElement === undefined) return;
    this.circlesDrawed.push(lastElement);
    for (let i = 0; i < this.circlesDrawed.length; i++) {
      const element = this.circlesDrawed[i];
      let x = element[0];
      let y = element[1];
      this.drawCircle(x, y);
    }
  }

  mouseClick(event) {
    let x = event.clientX;
    let y = event.clientY;
    let newCircle = [x, y];
    this.circlesDrawed.push(newCircle);
    this.drawCircle(x, y);
  }

  drawCircle(x, y): void {
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2, true);
    ctx.fillStyle = 'blue';
    ctx.closePath();
    ctx.fill();
  }
}
