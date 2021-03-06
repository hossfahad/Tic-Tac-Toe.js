var boardWalk;
const humanPlayer = '0';
const aiPlayer = 'X';
const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none"
	boardWalk = Array.from(Array(9).keys());
	for (var i=0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);

	}
}

function turnClick(square) {
	if (typeof boardWalk[square.target.id] == 'number') {
	turn(square.target.id, humanPlayer)
	if (!checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	boardWalk[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(boardWalk, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i): a, [])
	let gameWon = null;
	for (let [index, win] of winningCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winningCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor = 
		gameWon.player == humanPlayer ? "#A8DADC" : "#EA5D67";
	}
	for (var i = 0; i <cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == humanPlayer ? "You win!" : "You lose!");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display= "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return boardWalk.filter(s => typeof s === 'number')
}
function bestSpot() {
	return emptySquares()[0];
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return True;
	}
	return false;
	}