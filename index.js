function render(context, state){

	// clear canvas
	context.clearRect(
		state.table.x,
		state.table.y,
		state.table.width,
		state.table.height
	);

	// table
	context.fillStyle = config.tableBackgroundColor;
	context.fillRect(
		state.table.x,
		state.table.y,
		state.table.width,
		state.table.height
	);

	context.fillStyle = "#fff";

	context.fillRect(
		state.ball.x,
		state.ball.y,
		state.ball.width,
		state.ball.height
	);

	for (var key in state.paddles) {
		var paddle = state.paddles[key];
		context.fillRect(
			paddle.x,
			paddle.y,
			paddle.width,
			paddle.height
		);
	}

	// center line
	context.fillRect(
		state.table.width / 2 ,
		state.table.y,
		1,
		state.table.height
	);

	scoreLeft.innerText = state.paddles[0].score;
	scoreRight.innerText = state.paddles[1].score;

}

var defaultBallPosition = {
	x: 500,
	y: 100
};

function doBoxesIntersect(a, b) {
  return (Math.abs(a.x - b.x) * 2 < (a.width + b.width))
			&& (Math.abs(a.y - b.y) * 2 < (a.height + b.height));
}

function update(){
	state.ball.x += state.ball.direction * state.ball.speed;

	for (var key in state.paddles) {
		if(doBoxesIntersect(state.paddles[key], state.ball)){
			state.ball.direction = -state.ball.direction;
			window.requestAnimationFrame(update);
			return;
		}
	}

	if(state.ball.x < 0){
		state.paddles[1].score++;
		state.ball = Object.assign({}, state.ball, defaultBallPosition);
		state.ball.direction = -state.ball.direction;
		window.requestAnimationFrame(update);
		return;
	}

	if(state.ball.x + state.ball.width > state.table.width){
		state.paddles[0].score++;
		state.ball = Object.assign({}, state.ball, defaultBallPosition);
		state.ball.direction = -state.ball.direction;
		window.requestAnimationFrame(update);
		return;
	}

	render(context, state);
	window.requestAnimationFrame(update);
}

var config = {
	tableWidth: 800,
	tableHeightRatio: 0.5,
	paddlePaddingRatio: 0.01,
	tableBackgroundColor: "#000",
	ballSizeRatio: 0.01
};

var scoreLeft = document.querySelector(".score-left");
var scoreRight = document.querySelector(".score-right");

var state = {
	table: {
		x: 0,
		y: 0,
		width: config.tableWidth,
		height: config.tableWidth * config.tableHeightRatio
	},
	ball: {
		x: 500,
		y: 100,
		width: config.tableWidth * config.ballSizeRatio,
		height: config.tableWidth * config.ballSizeRatio,
		direction: 1,
		speed: 6
	},
	paddles: {
		0: {
			x: 100,
			y: 100,
			width: config.tableWidth * 0.01,
			height: config.tableWidth * 0.1,
			score: 0
		},
		1: {
			x: 500,
			y: 300,
			width: config.tableWidth * 0.01,
			height: config.tableWidth * 0.1,
			score: 0
		}
	}
};

var canvas = document.querySelector(".pong-table");

canvas.width = state.table.width;
canvas.height = state.table.height;

var context = canvas.getContext("2d");

window.requestAnimationFrame(update);