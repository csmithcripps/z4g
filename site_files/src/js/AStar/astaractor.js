goal = [N - 1, N - 1];

class AStarActor {
  constructor(w) {
    this.i = 0;
    this.j = 0;
    this.w = w;
    this.complete = false;
    this.failed = false;
    this.openSet = [];
    this.openSet.push(grid2d[this.i][this.j]);
    this.cameFrom = [];
    this.gScore = new Array(N * N).fill(sq(N));
    this.gScore[0] = 0;
    this.fScore = new Array(N * N).fill(N);
    this.fScore[0] = this.h(i, j);
    let goalCell=random(grid)
    goal = [goalCell.i, goalCell.j]
  }

  show() {
    if (this.failed) fill(255, 0, 0, 100);
    else if (this.complete) fill(0, 255, 0, 100);
    else fill(0, 100, 255, 100);
    circle((this.i + 0.5) * this.w, (this.j + 0.5) * this.w, this.w / 2);

    for (i = 0; i < grid.length; i++) {
      if (this.gScore[i] == sq(N)) continue;
      fill(
        floor((this.fScore[i] / max(this.fScore)) * 200),
        floor(((max(this.fScore) - this.fScore[i]) / max(this.fScore)) * 200),
        0,
        255
      );

      stroke(255, 255, 255);
      circle(
        (grid[i].i + 0.5) * this.w,
        (grid[i].j + 0.5) * this.w,
        this.w / 2
      );
    }
    let currentIdx = this.i * N + this.j;
    let iterations = 0;
    while (currentIdx != 0 && iterations < sq(N)) {
      let nextIdx = this.cameFrom[currentIdx];
      stroke(255);
      line(
        (grid[currentIdx].i + 0.5) * w,
        (grid[currentIdx].j + 0.5) * w,
        (grid[nextIdx].i + 0.5) * w,
        (grid[nextIdx].j + 0.5) * w
      );
      currentIdx = nextIdx;
      iterations++;
    }
    stroke(0, 100, 200, 0);
    fill(100, 155, 0, 255);
    circle((goal[0] + 0.5) * this.w, (goal[1] + 0.5) * this.w, this.w / 2);
  }

  update() {
    if (this.openSet.length <= 0) {
      this.complete = true;
      this.failed = true;
      return;
    }

    let current = this.openSet.shift();
    this.i = current.i;
    this.j = current.j;

    if (current.i == goal[0] && current.j == goal[1]) {
      this.complete = true;
      return;
    }
    let neighbours = this.getOptions(current);
    let prevDirection = atan((this.j - neighbours[0].j)/(this.i - neighbours[0].i))
    for (i = 0; i < neighbours.length; i++) {
      let tentative_gScore = this.gScore[current.idx] + 1;
      
      let direction = atan((this.j - neighbours[i].j)/(this.i - neighbours[i].i))
      // if (direction != prevDirection) tentative_gScore += 1
      
      if (tentative_gScore < this.gScore[neighbours[i].idx]) {
        this.cameFrom[neighbours[i].idx] = current.idx;
        this.gScore[neighbours[i].idx] = tentative_gScore;
        this.fScore[neighbours[i].idx] =
          tentative_gScore + this.h(neighbours[i].i, neighbours[i].j);
        this.insertWeighted(neighbours[i], this.openSet);
      }
    }
  }

  insertWeighted(item, array) {
    let i = 0;
    let inserted = false;
    while (i < array.length && !inserted) {
      if (this.fScore[item.idx] <= this.fScore[array[i].idx]) {
        array.splice(i, 0, item);
        inserted = true;
      }
      i++;
    }
    if (!inserted) array.push(item);
  }

  getOptions(active) {
    let chosenNeighbours = [];
    if (!active.walls[0]) chosenNeighbours.push(grid2d[active.i + 1][active.j]);
    if (!active.walls[1]) chosenNeighbours.push(grid2d[active.i][active.j + 1]);
    if (!active.walls[2]) chosenNeighbours.push(grid2d[active.i - 1][active.j]);
    if (!active.walls[3]) chosenNeighbours.push(grid2d[active.i][active.j - 1]);
    for (i = 0; i < neighbours.length; i++) {
      fill(250, 255, 255, 100);
      stroke(255, 255, 255);
      circle(
        (neighbours[i].i + 0.5) * this.w,
        (neighbours[i].j + 0.5) * this.w,
        this.w / 2
      );
    }
    return chosenNeighbours;
  }

  h(i, j) {
    return 0.5 * sq(goal[0] - i) + sq(goal[1] - j);
  }
}
