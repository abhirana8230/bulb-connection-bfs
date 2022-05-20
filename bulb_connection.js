//solution by BFS method in javascript

function isConnectedToSource() {
  var adjacencyMatrix = [
    ["RD", "RL", "RP", "LD", "UR"],
    ["RU", "RLD", "LP", "UD", "UD"],
    ["RP", "LRU", "RD", "RLU", "RL"],
    ["LP", "RU", "LUD", "RP", "LP"],
    ["LD", "RLS", "RLU", "LR", "DP"],
  ]; //adjacencyMatrix created with diagram available

  var numRow = 5; //number of rows available from graph
  var numCol = 5; //number of column available from graph
  var strtRowPosn = 4;
  var strtColPosn = 1;
  var rowQueue = [];
  var colQueue = [];

  var nodesLeftInLayer = 1;
  var nodesInNextLayer = 0;
  var destinationLight = false;

  var visited = []; //visited nodes
  for (let row = 0; row < numRow; row++) {
    visited.push(new Array(numCol).fill(0));
  } //initializing visited matrix with 0

  var dirRow = [0, 0, 1, -1]; //direction of movement along rows
  var dirCol = [-1, 1, 0, 0]; //direction of movement along column

  function Solution() {
    let moveCount = 0;
    rowQueue.push(strtRowPosn);
    colQueue.push(strtColPosn);
    visited[strtRowPosn][strtColPosn] = 1;

    while (rowQueue.length) {
      var r = rowQueue.shift();
      var c = colQueue.shift();
      if (String(adjacencyMatrix[r][c]).includes("P")) {
        visited[r][c] = 1;
        destinationLight = true;
        break;
      }

      neighbours(r, c);
      nodesLeftInLayer -= 1;
      if (nodesLeftInLayer == 0) {
        nodesLeftInLayer = nodesInNextLayer;
        nodesInNextLayer = 0;
      }
    }
    if (destinationLight) {
      return destinationLight;
    }
    return destinationLight;
  }

  function neighbours(r, c) {
    for (let i = 0; i < 4; i++) {
      var rr = r + dirRow[i]; //movement along rows
      var cc = c + dirCol[i]; //movement along column

      if (rr < 0 || cc < 0) {
        continue;
      }
      if (rr >= numRow || cc >= numCol) {
        continue;
      }
      if (visited[rr][cc]) {
        continue;
      }
      if (
        rr === r &&
        cc === c + 1 &&
        String(adjacencyMatrix[rr][cc]).includes("L") &&
        String(adjacencyMatrix[r][c]).includes("R")
      ) {
        rowQueue.push(rr);
        colQueue.push(cc);
        visited[rr][cc] = 1;
        nodesInNextLayer += 1;
      }
      if (
        rr === r &&
        cc === c - 1 &&
        String(adjacencyMatrix[rr][cc]).includes("R") &&
        String(adjacencyMatrix[r][c]).includes("L")
      ) {
        rowQueue.push(rr);
        colQueue.push(cc);
        visited[rr][cc] = 1;
        nodesInNextLayer += 1;
      }

      if (
        rr === r + 1 &&
        cc === c &&
        String(adjacencyMatrix[rr][cc]).includes("U") &&
        String(adjacencyMatrix[r][c]).includes("D")
      ) {
        rowQueue.push(rr);
        colQueue.push(cc);
        visited[rr][cc] = 1;
        nodesInNextLayer += 1;
      }
      if (
        rr === r - 1 &&
        cc === c &&
        String(adjacencyMatrix[rr][cc]).includes("D") &&
        String(adjacencyMatrix[r][c]).includes("U")
      ) {
        rowQueue.push(rr);
        colQueue.push(cc);
        visited[rr][cc] = 1;
        nodesInNextLayer += 1;
      } else {
        continue;
      }
    }
  }
  return Solution();
}

isConnectedToSource();
