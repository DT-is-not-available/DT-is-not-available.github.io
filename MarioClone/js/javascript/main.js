class GameLayer_Class {
	game_update() {
		
		//mario
		Mario.game();
		
		if (!Mario.dead){
			
			//enemies
			
			if (!enemies.length == 0) for (let i = 0; i < enemies.length; i++) {
				enemies[i].game();
				if (!enemies[i].dead && overlap(Mario.entity.hitbox, Mario.entity.x, Mario.entity.y, enemies[i].entity.hitbox, enemies[i].entity.x, enemies[i].entity.y)) {
					if ((Mario.entity.y < enemies[i].entity.y || Mario.entity.yv > Mario.entity.gravity)&& enemies[i].canStomp) {
						Mario.entity.yv = -20
						if (level.settings.enemy_high_jump) Mario.jumptimer = 90
						enemies[i].dead = true
						if (!enemies[i].deathAnimation) {
							enemies[i].flip = true
							enemies[i].entity.yv = -10
							enemies[i].entity.gravity = 0.5
						}
					} else {
						if (enemies[i].kills) Mario.dead = true
					}
				}
				for (let i2 = 0; i2 < enemies.length; i2++) {
					if (!enemies[i].dead && !enemies[i2].dead && overlap(enemies[i].entity.hitbox, enemies[i].entity.x, enemies[i].entity.y, enemies[i2].entity.hitbox, enemies[i2].entity.x, enemies[i2].entity.y)) {
						
					}
				}
				if (enemies[i].delete) {
					enemies.splice(i,1)
				}
			}
		
			tileanim_timer += 0.035
			
			if (Mario.entity.xv > 0 && (Mario.entity.x-64) > camera_x)
				camera_x += Mario.entity.xv/32
			if ((Mario.entity.x-128) > camera_x)
				camera_x = Mario.entity.x-128
			if ((Mario.entity.y-128-48) > camera_y)
				camera_y = Mario.entity.y-128-48
			if ((Mario.entity.y-128+48) < camera_y)
				camera_y = Mario.entity.y-128+48
			if (camera_y > 0)
				camera_y = 0
			
		}
		
		debug[0].innerHTML = "X: "+Math.round(Mario.entity.x*100)/100
		debug[1].innerHTML = "Y: "+Math.round(Mario.entity.y*100)/100
		debug[2].innerHTML = "XV: "+Math.round(Mario.entity.xv*100)/100
		debug[3].innerHTML = "YV: "+Math.round(Mario.entity.yv*100)/100
		debug[4].innerHTML = "JT: "+Math.round(Mario.jumptimer)
		debug[5].innerHTML = "F: "+Mario.entity.onfloor
		
		//confirms that game loop works
		
		//console.log("game loop complete");
	}
	game_draw() {
		
		canvas.fillStyle = 'rgb(92, 148, 252)';
		canvas.fillRect(0, 0, 256, 240);
		
		drawTileSet();
		
		//enemies
		if (!enemies.length == 0) for (let i = 0; i < enemies.length; i++) {
			enemies[i].draw();
		}
		
		//mario
		
		Mario.draw();
		
		//confirms that render loop works
		
		//console.log("render loop complete");
	}
	game() {
		gameLayer = "game"
		startGame()
	}
	menu_update() {
		camera_x = 0
		camera_y = 0
		if (keyboard.Space) gameLayer = "game"
		window.title_y += window.title_yv/50
		window.title_yv += -(Math.abs(window.title_y)/window.title_y)*0.01
	}
	menu_draw() {
		
		canvas.fillStyle = 'rgb(92, 148, 252)';
		canvas.fillRect(0, 0, 256, 240);
		//canvas.drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
		canvas.drawImage(img_title, 1, 91, 184, 88, 36, 28+Math.round(window.title_y), 184, 88);
		drawText(36, 28+89+Math.round(window.title_y), "JAVASCRIPT EDITION");
		drawText(50, 160, "PRESS SPACE TO PLAY");
		drawText(50, 176, "PRESS ENTER TO EDIT");
		
	}
	menu() {
		gameLayer = "menu"
		startGame()
	}
	global_update() {}
	global_draw() {}
}

function startGame() {
	camera_x = 0;
	camera_y = 0;
	title_yv = 2;
	title_y = 0;
	tileanim_timer = 0;
	Mario = undefined
	delete(Mario)
	Mario = new Mario_Class(level.marioX,level.marioY)
	enemies = []
	if (!level.enemies.length == 0) for (let i = 0; i < level.enemies.length; i++) {
		if (typeof(enemy_defs[level.enemies[i][0]]) == 'undefined') {
			console.warn("Invalid enemy id \""+level.enemies[i][0]+"\" ignored at ("+level.enemies[i][1]+", "+level.enemies[i][2]+").")
			console.warn("You may be loading this level in an older version of the game, or it may be corrupt.")
		} else {
			enemies.push(new Baddie_Class(level.enemies[i][1], level.enemies[i][2], level.enemies[i][0]))
		}
	}
	if (!loopStarted) {
		g_layer = new GameLayer_Class
		gameLayer = "menu" //g_layer.menu();
		gameloop();
		renderloop();
		console.log("Game Starting")
	}
	console.log("\""+gameLayer+"\" Layer Starting")
	loopStarted = true
}

function gameloop() {
	window.setTimeout(gameloop, 1000/(240*timemod));
	g_layer[gameLayer+"_update"]();
	g_layer.global_update();
}

function renderloop() {
	window.setTimeout(renderloop, 1000/fps);
	g_layer[gameLayer+"_draw"]();
	g_layer.global_draw();
}