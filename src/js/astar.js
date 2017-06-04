// javascript-astar
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a binary heap.

var astar = {
    init: function(grid) {
        for(var x = 0, xl = grid.length; x < xl; x++) {
            for(var y = 0, yl = grid[x].length; y < yl; y++) {
                var node = grid[x][y];
                node.f = 0;
                node.g = 0;
                node.h = 0;
                node.cost = node.type;
                node.visited = false;
                node.closed = false;
                node.parent = null;
            }
        }
    },
    heap: function() {
        return new BinaryHeap(function(node) { 
            return node.f; 
        });
    },
    search: function(grid, start, end, diagonal, heuristic) {
        astar.init(grid);
        heuristic = heuristic || astar.manhattan;
        diagonal = !!diagonal;

        var openHeap = astar.heap();

        openHeap.push(start);

        while(openHeap.size() > 0) {
            // Pega o menor f (x) para processar seguinte. Heap mantém essa classificados para nós. 
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentNode = openHeap.pop();
            // Fim de caso - resultado foi encontrado, devolver o traçado
            // End case -- result has been found, return the traced path.
            if (currentNode === end) {
                var curr = currentNode;
                var ret = [];
                while (curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return ret.reverse();
            }
            // Case Normal - CurrentNode movimento de aberto para fechado, processar cada um de seus vizinhos. 
            // Normal case -- move currentNode from open to closed, process each of its neighbors.
            currentNode.closed = true;
            // Encontrar todos os vizinhos para o nó atual. Opcionalmente encontrar vizinhos na diagonal (false por padrão). 
            // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
            var neighbors = astar.neighbors(grid, currentNode, diagonal);

            for(var i=0, il = neighbors.length; i < il; i++) {
                var neighbor = neighbors[i];

                if (neighbor.closed || neighbor.isWall()) {
                    // Não um nó válido para processar, pule para o vizinho. 
                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }
                // A pontuação g é a menor distância do início ao nó atual. 
                // Precisamos verificar se o caminho chegamos a este vizinho é a mais curta vimos ainda.
                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                var gScore = currentNode.g + neighbor.cost;
                var beenVisited = neighbor.visited;

                if(!beenVisited || gScore < neighbor.g) {
                    // Encontrado um caminho (até agora) ideal para este nó. Tome nota para nó para ver como é bom
                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = neighbor.h || heuristic(neighbor.pos, end.pos);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;

                    if (!beenVisited) {
                        // Empurrando a pilha vai colocá-lo no lugar apropriado com base no valor do 'f'. 
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighbor);
                    }
                    else {
                        // Já vi o nó, mas desde que foi rescored precisamos reordenar que no heap 
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(neighbor);
                    }
                }
            }
        }
        // Nenhum resultado foi encontrado - matriz vazia significa fracasso para encontrar o caminho. 
        // No result was found - empty array signifies failure to find path.
        return [];
    },
    manhattan: function(pos0, pos1) {
        // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

        var d1 = Math.abs (pos1.x - pos0.x);
        var d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
    },
    neighbors: function(grid, node, diagonals) {
        var ret = [];
        var x = node.x;
        var y = node.y;

        // West Oeste
        if(grid[x-1] && grid[x-1][y]) {
            ret.push(grid[x-1][y]);
        }

        // East Leste
        if(grid[x+1] && grid[x+1][y]) {
            ret.push(grid[x+1][y]);
        }

        // South Sul
        if(grid[x] && grid[x][y-1]) {
            ret.push(grid[x][y-1]);
        }

        // North Norte 
        if(grid[x] && grid[x][y+1]) {
            ret.push(grid[x][y+1]);
        }

        if (diagonals) {

            // Southwest Sudoeste 
            if(grid[x-1] && grid[x-1][y-1]) {
                ret.push(grid[x-1][y-1]);
            }

            // Southeast Sudeste 
            if(grid[x+1] && grid[x+1][y-1]) {
                ret.push(grid[x+1][y-1]);
            }

            // Northwest Noroeste 
            if(grid[x-1] && grid[x-1][y+1]) {
                ret.push(grid[x-1][y+1]);
            }

            // Northeast Nordeste 
            if(grid[x+1] && grid[x+1][y+1]) {
                ret.push(grid[x+1][y+1]);
            }

        }

        return ret;
    }
};


