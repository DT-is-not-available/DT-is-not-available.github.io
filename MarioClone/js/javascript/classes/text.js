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