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

	// ball
	context.fillStyle = "#fff";
	context.fillRect(
		state.ballX,
		state.ballY,
		state.ballSize,
		state.ballSize
	);

	// left paddle
	context.fillRect(
		state.paddlePadding,
		state.paddlePadding,
		state.paddleWidth,
		state.paddleHeight
	);

	// right paddle
	context.fillRect(
		state.tableWidth - state.paddleWidth - state.paddlePadding,
		state.paddlePadding,
		state.paddleWidth,
		state.paddleHeight
	);

	// center line
	context.fillRect(
		state.tableWidth / 2 ,
		0,
		1,
		state.tableHeight
	);
}

function update(){
	state = Object.assign({}, state, {ballX: state.ballX + 1});
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
	ballSize: config.tableWidth * config.ballSizeRatio,
	paddlePadding: config.tableWidth * config.paddlePaddingRatio,
	paddleWidth: config.tableWidth * 0.01,
	paddleHeight: config.tableWidth * 0.1,
	ballX: 100,
	ballY: 100
};

var canvas = document.querySelector("#pong-table");

canvas.width = state.tableWidth;
canvas.height = state.tableHeight;

var context = canvas.getContext("2d");

window.requestAnimationFrame(update);