class Cell {
    constructor(i, j, w) {
      this.state = 0;
      this.i = i;
      this.j = j;
      this.idx=i*N + j
      this.walls = [1, 1, 1, 1];
      this.w = w;
      this.complete = false;
      this.visited = false;
      this.active = false;
      this.neighbours = [];
      if (i > 0) this.neighbours.push([i - 1, j]);
      if (j > 0) this.neighbours.push([i, j - 1]);
      if (i < N - 1) this.neighbours.push([i + 1, j]);
      if (j < N - 1) this.neighbours.push([i, j + 1]);
    }
  
    show() {
      if (this.active) stroke(255, 0, 0, 100);
      else if (this.completed) stroke(200, 0, 255, 255);
      else if (this.visited) stroke(255, 255, 0, 100);
      else stroke(255, 255, 255, 100);
      if (this.walls[0])
        line(
          (this.i + 1) * this.w,
          this.j * this.w,
          (this.i + 1) * this.w,
          (this.j + 1) * this.w
        );
      if (this.walls[1])
        line(
          this.i * this.w,
          (this.j + 1) * this.w,
          (this.i + 1) * this.w,
          (this.j + 1) * this.w
        );
      if (this.walls[2])
        line(
          this.i * this.w,
          this.j * this.w,
          this.i * this.w,
          (this.j + 1) * this.w
        );
      if (this.walls[3])
        line(
          this.i * this.w,
          this.j * this.w,
          (this.i + 1) * this.w,
          this.j * this.w
        );
    }
  }
  