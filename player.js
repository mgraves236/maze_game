class Player {

    constructor(cell) {
        this.position = {
            i: cell.i,
            j: cell.j
        }
    }

    move(i, j) {
        console.log(this.isMove(i,j))
        if (this.isMove(i,j)) {
            this.position.i = this.position.i + i;
            this.position.j = this.position.j + j;
        }
    }

    isMove(i, j) {
        for (let k = 0; k < grid.length; k++) {
            if (this.position.i === grid[k].i && this.position.j === grid[k].j) {
                if (i === 1 && grid[k].walls[1] === true) {
                    return false;
                }
                if (i === -1 && grid[k].walls[3] === true) {
                    return false;
                }
                if (j === 1 && grid[k].walls[2] === true) {
                    return false;
                }
                if (j === -1 && grid[k].walls[0] === true) {
                    return false;
                }

            }
        }
        return true;
    }

    endGame() {
        return (this.position.i === grid[grid.length - 1].i && this.position.j === grid[grid.length - 1].j)
    }

    draw() {
        _ctx.save();
        let x = this.position.i * w;
        let y = this.position.j * w;
        _ctx.save();
        _ctx.fillStyle = '#dba8ec';
        _ctx.fillRect(x, y, w, w);
        _ctx.restore();
    }
}