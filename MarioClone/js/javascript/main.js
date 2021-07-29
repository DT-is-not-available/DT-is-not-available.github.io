function startGame() {
	camera_x = 0;
	camera_y = 0;
	Mario = undefined
	delete(Mario)
	Mario = new Mario_Class(24,0)
	gameloop();
	renderloop();
}

function gameloop() {
	window.setTimeout(gameloop, 1000/(240*timemod));
	update();
}

function renderloop() {
	window.setTimeout(renderloop, 1000/fps);
	render();
}

function update() {
	
	//game logic
	Mario.game();
	
	if (camera_x < 0)
		camera_x = 0
	if (camera_y < 8)
		camera_y = 8
	if (camera_y > 8)
		camera_y = 8
	
	debug[0].innerHTML = "X: "+Math.round(Mario.entity.x*100)/100
	debug[1].innerHTML = "Y: "+Math.round(Mario.entity.y*100)/100
	debug[2].innerHTML = "XV: "+Math.round(Mario.entity.xv*100)/100
	debug[3].innerHTML = "YV: "+Math.round(Mario.entity.yv*100)/100
	debug[4].innerHTML = "JT: "+Math.round(Mario.jumptimer)
	debug[5].innerHTML = "F: "+Mario.entity.onfloor
	
	//confirms that game loop works
	
	//console.log("game loop complete");
}

function render() {
	
	canvas.fillStyle = 'rgb(92, 148, 252)';
	canvas.fillRect(0, 0, 256, 240);
	
	drawTileSet();
	
	Mario.draw();
	
	//confirms that render loop works
	
	//console.log("render loop complete");
}