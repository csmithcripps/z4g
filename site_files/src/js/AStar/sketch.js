N = 20;
grid = [];
var Actor;
grid2d = new Array(N);
frontier = [];
var prevCell;
randomised=false;
nRandom=((N*N)/5);

function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent("p5Canvas")
  frameRate(100);
  w = width / N;
  for (i = 0; i < N; i++) {
    grid2d[i] = new Array(N);
    for (j = 0; j < N; j++) {
      cell = new Cell(i, j, w);
      grid.push(cell);
      grid2d[i][j] = cell;
    }
  }
  Actor = new AStarActor(w);
  Actor.w = w;
  // cell = new Cell(1, 1, w);
  // grid.push(cell);
  // activeCell = random(grid);
  activeCell = grid[0];
  frontier.push(activeCell);
  activeCell.active = true;
}

function draw() {
  clear();
  background(0);
  for (i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  Actor.show();

  if (frontier.length > 0) updateMaze();
  else {
    frameRate(10)
    if (!Actor.complete) Actor.update();
    // if (!randomised) randomiseMap();
  }
//   if (frameCount % 20) {
//     saveCanvas('Img', 'png');
    
//   }
}




function randomiseMap(){
  for (i=0;i<nRandom;i++){
    chosenCell=random(grid)
    if (chosenCell.i == 0 || chosenCell.i == N-1 || chosenCell.j == 0 || chosenCell.j == N-1 ) continue
    grid2d[chosenCell.i-1][chosenCell.j].walls[0]=0
    grid2d[chosenCell.i+1][chosenCell.j].walls[2]=0
    grid2d[chosenCell.i][chosenCell.j-1].walls[1]=0
    grid2d[chosenCell.i][chosenCell.j+1].walls[3]=0
    chosenCell.walls=[0,0,0,0]
  }
  randomised=true
}

function updateMaze() {
  activeCell = frontier.pop();
  activeCell.visited = true;
  activeCell.active = false;

  neighbours = getNeighbours(activeCell.i, activeCell.j);
  activeNeighbours = [];
  for (i = 0; i < neighbours.length; i++) {
    if (!neighbours[i].visited) activeNeighbours.push(neighbours[i]);
  }

  if (activeNeighbours.length > 0) {
    frontier.push(activeCell);
    chosenNeighbour = random(activeNeighbours);
    chosenNeighbour.active = true;
    //Remove wall between cells
    removeWall(activeCell, chosenNeighbour);

    frontier.push(chosenNeighbour);
  } else {
    activeCell.completed = true;
  }
}

function getNeighbours(i, j) {
  neighbours = [];

  for (dx = -1; dx <= 1; dx++) {
    for (dy = -1; dy <= 1; dy++) {
      if (dx == 0 && dy == 0) continue;
      if (abs(dx) == abs(dy)) continue;
      i_idx = i + dx;
      j_idx = j + dy;
      if (i_idx < 0 || i_idx >= N || j_idx < 0 || j_idx >= N) continue;
      neighbours.push(grid2d[i_idx][j_idx]);
    }
  }
  return neighbours;
}

function removeWall(cell1, cell2) {
  dx = cell1.i - cell2.i;
  dy = cell1.j - cell2.j;
  if (dx == -1) {
    cell1.walls[0] = 0;
    cell2.walls[2] = 0;
  }
  if (dx == 1) {
    cell1.walls[2] = 0;
    cell2.walls[0] = 0;
  }
  if (dy == -1) {
    cell1.walls[1] = 0;
    cell2.walls[3] = 0;
  }
  if (dy == 1) {
    cell1.walls[3] = 0;
    cell2.walls[1] = 0;
  }
}
