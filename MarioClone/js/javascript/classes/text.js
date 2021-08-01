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

function drawMenu(xpos, ypos, id, cursor=true) {
	if (menu_defs[id].type == "popup") {
		canvas.globalAlpha = 0.5
		canvas.fillStyle = 'rgb(0, 0, 0)';
		canvas.fillRect(xpos-menu_defs[id].padding, ypos-menu_defs[id].padding, menu_defs[id].width+menu_defs[id].padding*2, menu_defs[id].height+menu_defs[id].padding*2)
		canvas.globalAlpha = 1
	}
	if (menu_defs[id].type == "overlay") {
		canvas.globalAlpha = 0.75
		canvas.fillStyle = 'rgb(0, 0, 0)';
		canvas.fillRect(0, 0, 256, 240)
		canvas.globalAlpha = 1
		canvas.fillRect(xpos-menu_defs[id].padding, ypos-menu_defs[id].padding, menu_defs[id].width+menu_defs[id].padding*2, menu_defs[id].height+menu_defs[id].padding*2)
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

function handleMenu(id) {
	if (keyboard.S || keyboard.D) menuOption += 1
	if (keyboard.W || keyboard.A) menuOption -= 1
	if (keyboard.Space || keyboard.Enter) {
		if (menu_defs[id].options[menuOption][2] == "layer") {
			g_layer[menu_defs[id].options[menuOption][3]]()
		}
		if (menu_defs[id].options[menuOption][2] == "url") {
			window.open(menu_defs[id].options[menuOption][3])
		}
		if (menu_defs[id].options[menuOption][2] == "menu") {
			keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false}
			addMenu(menu_defs[id].options[menuOption][3], menu_defs[id].options[menuOption][4], menu_defs[id].options[menuOption][5], menu_defs[id].options[menuOption][6])
		}
		if (menu_defs[id].options[menuOption][2] == "close") {
			keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false}
			quitMenu()
		}
	}
	if (menuOption > menu_defs[id].options.length-1) menuOption = menu_defs[id].options.length-1
	if (menuOption < 0) menuOption = 0
	keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
	keyboard_onpress = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
}

function handleClickMenu(id) {
	keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
	keyboard_onpress = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
}