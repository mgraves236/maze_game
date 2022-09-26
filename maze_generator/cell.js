class Cell {
    constructor(i, j) {
        // row and column numbers
        this.i = i; // column
        this.j = j; // row
        this.walls = [true, true, true, true]; // top, right, bottom, left
        this.visited = false;
    }

    show() {
        let x = this.i * w;
        let y = this.j * w;
        _ctx.save();
        _ctx.lineWidth = '1';
        _ctx.strokeStyle = 'white';
        // top
        if (this.walls[0]) {
            _ctx.beginPath();
            _ctx.moveTo(x, y);
            _ctx.lineTo(x + w, y);
            _ctx.stroke();
            _ctx.closePath();
        }
        // right
        if (this.walls[1]) {
            _ctx.beginPath();
            _ctx.moveTo(x + w, y);
            _ctx.lineTo(x + w, y + w);
            _ctx.stroke();
            _ctx.closePath();
        }
        // bottom
        if (this.walls[2]) {
            _ctx.beginPath();
            _ctx.moveTo(x + w, y + w);
            _ctx.lineTo(x, y + w);
            _ctx.stroke();
            _ctx.closePath();
        }
        // left
        if (this.walls[3]) {
            _ctx.beginPath();
            _ctx.moveTo(x, y + w);
            _ctx.lineTo(x, y);
            _ctx.stroke();
            _ctx.closePath();
        }
        if (this.visited) {
            _ctx.fillStyle = '#ac50bd';
            _ctx.fillRect(x, y, w, w);
        }
        _ctx.restore();
    }

    index(i, j) {
        if (i < 0 || j < 0 || i > _cols - 1 || j > _rows - 1) {
            return -1;
        }
        return i + j * _cols;
    }

    checkNeighbors() {
        let neighbors = [];
        let top = grid[this.index(this.i, this.j - 1)];
        let right = grid[this.index(this.i + 1, this.j)];
        let bottom = grid[this.index(this.i, this.j + 1)];
        let left = grid[this.index(this.i - 1, this.j)];

        if (top && !top.visited) {
            neighbors.push(top)
        }
        if (right && !right.visited) {
            neighbors.push(right)
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom)
        }
        if (left && !left.visited) {
            neighbors.push(left)
        }
        // find a random unvisited neighbor
        if (neighbors.length > 0) {
            let r = Math.floor(Math.random() * neighbors.length)
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    highlight() {
        _ctx.save();
        let x = this.i * w;
        let y = this.j * w;
        _ctx.save();
        _ctx.fillStyle = '#dba8ec';
        _ctx.fillRect(x, y, w, w);
        _ctx.restore();
    }
}
