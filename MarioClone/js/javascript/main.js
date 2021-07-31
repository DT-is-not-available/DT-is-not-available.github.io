class GameLayer_Class {
	game() {
		gameLayer = "game"
		startGame()
	}
	game_update() {
		
		//mario
		Mario.game();
		
		if (!Mario.freezeWorld){
			
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
						if (enemies[i].kills) Mario.damage()
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
			if (camera_y < 0)
				camera_y = 0
			if (camera_y > level.settings.height*16)
				camera_y = level.settings.height*16
			if (camera_x < 0)
				camera_x = 0
			if (camera_x > level.settings.width*16)
				camera_x = level.settings.width*16
			
		}
		
		debug[0].innerHTML = "X: "+Math.round(Mario.entity.x*100)/100
		debug[1].innerHTML = "Y: "+Math.round(Mario.entity.y*100)/100
		debug[2].innerHTML = "XV: "+Math.round(Mario.entity.xv*100)/100
		debug[3].innerHTML = "YV: "+Math.round(Mario.entity.yv*100)/100
		debug[4].innerHTML = "JT: "+Math.round(Mario.jumptimer)
		debug[5].innerHTML = "F: "+Mario.entity.onfloor
		
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
		
	}
	menu() {
		gameLayer = "menu"
		startGame()
	}
	menu_update() {
		camera_x = 0
		camera_y = 0
		if (keyboard_onpress.Space) gameLayer = "game"
		if (keyboard_onpress.Enter) gameLayer = "edit"
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
	edit() {
		gameLayer = "edit"
		startGame()
	}
	edit_update() {
		enemies = []
		this.cameraspeed = 0.5
		if (keyboard.Shift) this.cameraspeed += 1.5
		if (keyboard.Space) this.cameraspeed += 3
		if (keyboard.W) Mario.entity.y -= this.cameraspeed
		if (keyboard.S) Mario.entity.y += this.cameraspeed
		if (keyboard.A) {Mario.entity.x -= this.cameraspeed; Mario.mirror = true}
		if (keyboard.D) {Mario.entity.x += this.cameraspeed; Mario.mirror = false}
		if (!keyboard.W && !keyboard.S && !keyboard.A && !keyboard.D) {
			Mario.entity.y = Math.round(Mario.entity.y/8)*8
			Mario.entity.x = Math.round(Mario.entity.x/8)*8
		}
		Mario.entity.rx = Math.round(Mario.entity.x)
		Mario.entity.ry = Math.round(Mario.entity.y)
		camera_x = Mario.entity.x-128
		camera_y = Mario.entity.y-128
			if (camera_y < 0)
				camera_y = 0
			if (camera_y > level.settings.height*16)
				camera_y = level.settings.height*16
			if (camera_x < 0)
				camera_x = 0
			if (camera_x > level.settings.width*16)
				camera_x = level.settings.width*16
		Mario.frame = 0
		Mario.freezeWorld = false
		Mario.entity.xv = 0
		Mario.entity.yv = 0
		Mario.jumptimer = 0
		Mario.deathtimer = 0
		Mario.powerup = 0
		Mario.iframes = 0
		Mario.dead = false
		if (keyboard_onpress.Enter) {
			gameLayer = "game_test"
			Mario.iframes = 240
			loadEnemies();
		}
		tileanim_timer += 0.035
		if (mouseButtons[0]) {
			level.tiles[Math.trunc((mouse[0]+camera_x)/16)+","+Math.trunc((mouse[1]+camera_y)/16)] = tileBrush
		}
		if (mouseButtons[2]) {
			delete(level.tiles[Math.trunc((mouse[0]+camera_x)/16)+","+Math.trunc((mouse[1]+camera_y)/16)])
		}
	}
	edit_draw() {
		
		canvas.fillStyle = 'rgb(92, 148, 252)';
		canvas.fillRect(0, 0, 256, 240);
		
		//grid
		
		canvas.drawImage(img_grid, mod(-Math.round(camera_x), 16)-16, mod(-Math.round(camera_y), 16)-16);
		
		drawTileSet();
		
		canvas.globalAlpha = 0.5
		//enemies
		if (!level.enemies.length == 0) for (let i = 0; i < level.enemies.length; i++) {
			//drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
			if (!(typeof(enemy_defs[level.enemies[i][0]]) == 'undefined')) {
				if (!(typeof(enemy_defs[level.enemies[i][0]].animation) == 'undefined')) {
					canvas.drawImage(img_sprites, enemy_defs[level.enemies[i][0]].animation[0].frameX, enemy_defs[level.enemies[i][0]].animation[0].frameY, 16, 16, level.enemies[i][1]-8-camera_x, level.enemies[i][2]-15-camera_y, 16, 16)
				} else {
					canvas.drawImage(img_sprites, enemy_defs["inherit"].animation[0].frameX, enemy_defs["inherit"].animation[0].frameY, 16, 16, level.enemies[i][1]-8-camera_x, level.enemies[i][2]-15-camera_y, 16, 16)
				}
			} else {
				canvas.drawImage(img_error, level.enemies[i][1]-8-camera_x, level.enemies[i][2]-15-camera_y, 16, 16)
			}
		}
		canvas.globalAlpha = 1
		//mario
		
		Mario.draw();
		
		//text
		
		drawTextShadow(0, 224, "X:"+Math.round(Mario.entity.x)+" Y:"+Math.round(Mario.entity.y))
		drawTextShadow(0, 232, "X:"+Math.trunc((mouse[0]+camera_x)/16)+" Y:"+Math.trunc((mouse[1]+camera_y)/16))
	}
	game_test() {
		gameLayer = "game_test"
		startGame()
	}
	game_test_update() {
		g_layer.game_update()
		if (keyboard_onpress.Enter || Mario.deathtimer > 240) {
			gameLayer = "edit"
		}
	}
	game_test_draw() {
		g_layer.game_draw()
		canvas.globalAlpha = 0.5
		drawText(8, 2, "TEST MODE: PRESS ENTER TO EDIT")
		canvas.globalAlpha = 1
	}
	global_update() {
		keyboard_onpress = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false}
	}
	global_draw() {}
}

function startGame() {
	tileBrush = 0;
	title_yv = 2;
	title_y = 0;
	Mario = new Mario_Class(level.marioX,level.marioY)
	loadEnemies()
	camera_x = 0;
	camera_y = 0;
	tileanim_timer = 0;
	keyboard_onpress = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false} 
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

function loadEnemies() {
	enemies = []
	if (!level.enemies.length == 0) for (let i = 0; i < level.enemies.length; i++) {
		if (typeof(enemy_defs[level.enemies[i][0]]) == 'undefined') {
			console.warn("This level may be corrupt, or it is being loaded in the wrong version of the game.")
		} else {
			enemies.push(new Baddie_Class(level.enemies[i][1], level.enemies[i][2], level.enemies[i][0]))
		}
	}
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