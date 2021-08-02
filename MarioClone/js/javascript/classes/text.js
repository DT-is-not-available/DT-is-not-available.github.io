class Text_Obj_Class {
	constructor(xpos, ypos, p_text) {
		this.x = xpos
		this.y = ypos
		this.text = p_text
	}
	draw() {
		drawText(this.x, this.y, this.text, true)
	}
}

function drawText(xpos, ypos, p_text, world=false) {
	text_length = p_text.length
	for (let i = 0; i < text_length; i++) {
		//canvas.drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
		if (!world) canvas.drawImage(img_text, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, xpos+i*8, ypos, 8, 8)
		if (world) canvas.drawImage(img_text, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, -Math.round(camera_x)+xpos+i*8, -Math.round(camera_y)+ypos, 8, 8)
	}
}

function drawTextShadow(xpos, ypos, p_text, world=false) {
	text_length = p_text.length
	for (let i = 0; i < text_length; i++) {
		//canvas.drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
		if (!world) canvas.drawImage(img_text_shadow, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, xpos+1+i*8, ypos+1, 8, 8)
		if (world) canvas.drawImage(img_text_shadow, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, -Math.round(camera_x)+xpos+1+i*8, -Math.round(camera_y)+ypos+1, 8, 8)
		if (!world) canvas.drawImage(img_text, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, xpos+i*8, ypos, 8, 8)
		if (world) canvas.drawImage(img_text, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, -Math.round(camera_x)+xpos+i*8, -Math.round(camera_y)+ypos, 8, 8)
	}
}

function drawMenu(xpos, ypos, id, cursor=true, custom_draw=function(){}) {
	if (menu_defs[id].type == "popup") {
		canvas.globalAlpha = 0.75
		canvas.fillStyle = 'rgb(0, 0, 0)';
		canvas.fillRect(xpos-menu_defs[id].padding, ypos-menu_defs[id].padding, menu_defs[id].width+menu_defs[id].padding*2, menu_defs[id].height+menu_defs[id].padding*2)
		canvas.globalAlpha = 1
	}
	if (menu_defs[id].type == "overlay") {
		canvas.globalAlpha = 0.75
		canvas.fillStyle = 'rgb(0, 0, 0)';
		canvas.fillRect(0, 0, 256, 240)
		canvas.globalAlpha = 1
		canvas.fillStyle = 'rgb(255, 255, 255)';
		canvas.fillRect(xpos-menu_defs[id].padding-1, ypos-menu_defs[id].padding-1, menu_defs[id].width+menu_defs[id].padding*2+2, menu_defs[id].height+menu_defs[id].padding*2+2)
		canvas.fillStyle = 'rgb(0, 0, 0)';
		canvas.fillRect(xpos-menu_defs[id].padding, ypos-menu_defs[id].padding, menu_defs[id].width+menu_defs[id].padding*2, menu_defs[id].height+menu_defs[id].padding*2)
	}
	
	//custom draw function
	custom_draw()
	
	//click options
	if (menu_defs[id].click_options && menu_defs[id].click_options.length > 0) for (let i = 0; i < menu_defs[id].click_options.length; i++) {
		if (menu_defs[id].click_options[i][0] == "button" && !menu_defs[id].click_options[i][1][3]) {
			canvas.fillStyle = 'rgb(255, 255, 255)';
			canvas.fillRect(
				xpos+menu_defs[id].click_options[i][2], 
				ypos+menu_defs[id].click_options[i][3], 
				menu_defs[id].click_options[i][1][1], 
				menu_defs[id].click_options[i][1][2]
			)
			canvas.fillStyle = 'rgb(0, 0, 0)';
			if (overlap({X_neg: 0, X_pos: 0, Y_neg: 0, Y_pos: 0}, mouse[0], mouse[1], {X_neg: 0, X_pos: menu_defs[id].click_options[i][1][1], Y_neg: 0, Y_pos: menu_defs[id].click_options[i][1][2]}, xpos+menu_defs[id].click_options[i][2], ypos+menu_defs[id].click_options[i][3])) canvas.fillStyle = 'rgb(69, 69, 69)';
			canvas.fillRect(
				xpos+menu_defs[id].click_options[i][2]+1, 
				ypos+menu_defs[id].click_options[i][3]+1, 
				menu_defs[id].click_options[i][1][1]-2, 
				menu_defs[id].click_options[i][1][2]-2
			)
			drawText(xpos+menu_defs[id].click_options[i][2]+menu_defs[id].click_options[i][1][1]/2-menu_defs[id].click_options[i][1][0].length*4, ypos+menu_defs[id].click_options[i][3]+menu_defs[id].click_options[i][1][2]/2-4, menu_defs[id].click_options[i][1][0])
		}
	}
	
	//custom text and images
	
	if (menu_defs[id].img && menu_defs[id].img.length > 0) for (let i = 0; i < menu_defs[id].img.length; i++) {
		canvas.drawImage(
			window[menu_defs[id].img[i][0]],	 
			menu_defs[id].img[i][1],			//img x
			menu_defs[id].img[i][2],			//img y
			menu_defs[id].img[i][3],			//width
			menu_defs[id].img[i][4],			//height
			xpos+menu_defs[id].img[i][5],		//ui x
			ypos+menu_defs[id].img[i][6],		//ui y
			menu_defs[id].img[i][3],			//width
			menu_defs[id].img[i][4]				//height
		)
	}
	if (!(menu_defs[id].text.length == 0)) for (let i = 0; i < menu_defs[id].text.length; i++) {
		canvas.globalAlpha = menu_defs[id].text[i][3]
		drawText(xpos+menu_defs[id].text[i][1], ypos+menu_defs[id].text[i][2], menu_defs[id].text[i][0])
		canvas.globalAlpha = 1
	}
	if (!(menu_defs[id].text_shadowed.length == 0)) for (let i = 0; i < menu_defs[id].text_shadowed.length; i++) {
		drawTextShadow(xpos+menu_defs[id].text_shadowed[i][1], ypos+menu_defs[id].text_shadowed[i][2], menu_defs[id].text_shadowed[i][0])
	}
	if (cursor) canvas.drawImage(img_text, 120, 8, 8, 8, xpos+menu_defs[id].options[menuOption][0], ypos+menu_defs[id].options[menuOption][1], 8, 8)
	
}

function handleMenu(id, xpos=0, ypos=0) {
	//keyMenu
	if (keyboard.S || keyboard.D) menuOption += 1
	if (keyboard.W || keyboard.A) menuOption -= 1
	if (keyboard.Space || keyboard.Enter) {
		handleMenuAction(menu_defs[id].options[menuOption], 2)
	}
	if (menuOption > menu_defs[id].options.length-1) menuOption = menu_defs[id].options.length-1
	if (menuOption < 0) menuOption = 0
	if (keyboard.Escape && menu_defs[id].esc_close) quitMenu()
	keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
	keyboard_onpress = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
	//clickMenu
	if (menu_defs[id].click_options && menu_defs[id].click_options.length > 0) for (let i = 0; i < menu_defs[id].click_options.length; i++) {
		if (menu_defs[id].click_options[i][0] == "button" && mouseButtons[0] && overlap({X_neg: 0, X_pos: 0, Y_neg: 0, Y_pos: 0}, mouse[0], mouse[1], {X_neg: 0, X_pos: menu_defs[id].click_options[i][1][1], Y_neg: 0, Y_pos: menu_defs[id].click_options[i][1][2]}, xpos+menu_defs[id].click_options[i][2], ypos+menu_defs[id].click_options[i][3])) {
			handleMenuAction(menu_defs[id].click_options[i], 4)
		}
	}
	
	mouseButtons = [false, false, false]
	mouseButtons_onpress = [false, false, false]
}

function handleMenuAction(action, offset=2){
	if (action[offset] == "layer") {
		g_layer[action[offset+1]]()
	}
	if (action[offset] == "url") {
		window.open(action[offset+1])
	}
	if (action[offset] == "menu") {
		addMenu(action[offset+1], action[offset+2], action[offset+3], action[offset+4])
	}
	if (action[offset] == "close") {
		quitMenu()
	}
	if (action[offset] == "variable") {
		window[action[offset+1]] = action[offset+2]
	}
	if (action[offset] == "quick_layer") {
		gameLayer = action[offset+1]
		menus = []
	}
}