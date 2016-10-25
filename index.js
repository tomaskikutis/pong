function render(context, state){

	// clear canvas
	context.clearRect(
		state.table.x,
		state.table.y,
		state.table.width,
		state.table.height
	);

	// table
	context.fillStyle = "#000";
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

function doBoxesIntersect(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width
		&& rect1.x + rect1.width > rect2.x
		&& rect1.y < rect2.y + rect2.height
		&& rect1.height + rect1.y > rect2.y;
}

function update(){
	state.ball.x += state.ball.directionX * state.ball.speed;
	state.ball.y += state.ball.directionY * state.ball.speed;

	// evil bot
	state.paddles[1].y = state.ball.y;

	for (var key in state.paddles) {
		if(doBoxesIntersect(state.paddles[key], state.ball)){
			state.ball.directionX = -state.ball.directionX;
			window.requestAnimationFrame(update);
			return;
		}
	}

	if(state.ball.x < 0){
		state.paddles[1].score++;
		state.ball = Object.assign({}, state.ball, defaultBallPosition);
		state.ball.directionX = -state.ball.directionX;
		window.requestAnimationFrame(update);
		return;
	}

	if(state.ball.x + state.ball.width > state.table.width){
		state.paddles[0].score++;
		state.ball = Object.assign({}, state.ball, defaultBallPosition);
		state.ball.directionX = -state.ball.directionX;
		window.requestAnimationFrame(update);
		return;
	}

	if(state.ball.y < 0){
		state.ball.directionY = -state.ball.directionY;
		window.requestAnimationFrame(update);
		return;
	}

	if(state.ball.y + state.ball.height > state.table.height){
		state.ball.directionY = -state.ball.directionY;
		window.requestAnimationFrame(update);
		return;
	}

	render(context, state);
	window.requestAnimationFrame(update);
}

function getInitialState(){

	var tableWidth = 800;
	var tableHeight = tableWidth * 0.5;
	var ballSize = tableWidth * 0.01;
	var paddleWidth = ballSize;
	var paddleHeight = tableHeight * 0.1;

	return {
		table: {
			x: 0,
			y: 0,
			width: tableWidth,
			height: tableHeight
		},
		ball: {
			x: 500,
			y: 100,
			width: ballSize,
			height: ballSize,
			directionX: 1,
			directionY: 1,
			speed: 6
		},
		paddles: {
			0: {
				x: paddleWidth,
				y: 100,
				width: paddleWidth,
				height: paddleHeight,
				score: 0
			},
			1: {
				x: tableWidth - paddleWidth * 2,
				y: 100,
				width: paddleWidth,
				height: paddleHeight,
				score: 0
			}
		}
	};
}

var scoreLeft = document.querySelector(".score-left");
var scoreRight = document.querySelector(".score-right");

var state = getInitialState();

var canvas = document.querySelector(".pong-table");

canvas.width = state.table.width;
canvas.height = state.table.height;

var context = canvas.getContext("2d");

window.requestAnimationFrame(update);

var canvasPosition = canvas.getBoundingClientRect();

// allow player to control paddle with mouse
document.addEventListener("mousemove", function(event){
	state.paddles[0].y = Math.max(
		Math.min(
			event.pageY - canvasPosition.top, state.table.height - state.paddles[0].height
		),
		state.table.y
	);
});