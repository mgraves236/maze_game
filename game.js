let _touchStartX = 0;
let _touchEndX = 0;
let _touchStartY = 0;
let _touchEndY = 0;

let _player;

let _playButton = {
    x: 300,
    y: 360,
    width: 200,
    height: 80
};

function drawButton() {
    _ctx.fillStyle = "rgb(255,20,147)";
    _ctx.fillRect(_playButton.x, _playButton.y, _playButton.width, _playButton.height);
    _ctx.fillStyle = "#ffffff";
    _ctx.font = "60px Arial";
    _ctx.fillText("PLAY", _playButton.x + 25, _playButton.y + 60);
}

function clickBtn(e) {
    let mousePos = getMousePos(e);
    if (isInside(mousePos, _playButton)) {
        startGame();
    }
}

function setUp() {
    _canvas.addEventListener('click', clickBtn);
    drawButton();
}

let loaded = false;
function startGame() {

    _ctx.font = "25px Arial";
    _ctx.fillText("Wait for the maze to generate...", _playButton.x - 60, _playButton.y + 120);
    setTimeout(()=> {
        let promise = new Promise(function(resolve, reject) {
            generateMaze();
            resolve(); // when successful
            reject();  // when error
        });

        promise.then(
            function(value) {
                loaded = true;
                _player = new Player(grid[0]);
                },
            function(error) { loaded = false; }
        );
    }, 0);

    _canvas.removeEventListener('click', clickBtn);
    window.requestAnimationFrame(mainGame);
}

let lastRenderTime = 0;
function mainGame(currentTime) {
    window.requestAnimationFrame(mainGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 50) return;
    lastRenderTime = currentTime;


    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    if (loaded === false) {
        _ctx.font = "25px Arial";
        _ctx.fillText("Wait for the maze to generate...", _playButton.x - 60, _playButton.y + 60);
    } else {
        drawMaze();
        _player.draw();
    }



    if (_player.endGame()) {
        console.log('end game')
        // _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
        // drawBoard();
        // _canvas.addEventListener('click', clickBtn);
        // drawButton();
        // return;
    }
    // _snake.eat();
    // _snake.update();
    // _snake.show();
}

window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' ) {
        _player.move(0,-1);
    } else if (e.key === 'ArrowDown') {
        _player.move(0,1);
    } else if (e.key === 'ArrowLeft') {
        _player.move(-1,0);
    } else if (e.key === 'ArrowRight') {
        _player.move(1,0);
    }
}, false);

window.addEventListener('touchstart', function (e) {
    _touchStartX = e.changedTouches[0].screenX;
    _touchStartY = e.changedTouches[0].screenY;
});

window.addEventListener('touchend', function (e) {
    _touchEndX = e.changedTouches[0].screenX;
    _touchEndY = e.changedTouches[0].screenY;
    handleMove();
});

function getMousePos(event) {
    let rect = _canvas.getBoundingClientRect();
    let scaleX = _canvas.width / rect.width;
    let scaleY = _canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function isInside(pos, button) {
    return pos.x > button.x && pos.x < button.x + button.width
        && pos.y < button.y + button.height && pos.y > button.y;
}

function handleMove() {
    if (abs(_touchEndX - _touchStartX) > 50) {
        if (_touchEndX < _touchStartX) {

        } else {

        }
    }
    if (abs(_touchEndY - _touchStartY) > 50) {
        if (_touchEndY < _touchStartY) {

        } else {

        }
    }
}

function abs(number) {
    if (number < 0) {
        return -number;
    } else {
        return number;
    }
}

setUp();