function render(context, state){
	// clear canvas
	context.clearRect(0, 0, state.tableWidth, state.tableHeight);

	// table
	context.fillStyle = config.tableBackgroundColor;
	context.fillRect(
		0,
		0,
		state.tableWidth,
		state.tableHeight
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
		state.tableWidth / 2 ,
		0,
		1,
		state.tableHeight
	);
}

function doBoxesIntersect(a, b) {
  return (Math.abs(a.x - b.x) * 2 < (a.width + b.width))
			&& (Math.abs(a.y - b.y) * 2 < (a.height + b.height));
}

function update(){
	state.ball.x += state.ball.direction * state.ball.speed;

	for (var key in state.paddles) {
		if(doBoxesIntersect(state.paddles[key], state.ball)){
			state.ball.direction = -(state.ball.direction);
			window.requestAnimationFrame(update);
			return;
		}
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

var state = {
	time: 0,
	tableWidth: config.tableWidth,
	tableHeight: config.tableWidth * config.tableHeightRatio,
	ball: {
		x: 200,
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
			height: config.tableWidth * 0.1
		},
		1: {
			x: 500,
			y: 100,
			width: config.tableWidth * 0.01,
			height: config.tableWidth * 0.1
		}
	}
};

var canvas = document.querySelector("#pong-table");

canvas.width = state.tableWidth;
canvas.height = state.tableHeight;

var context = canvas.getContext("2d");

window.requestAnimationFrame(update);