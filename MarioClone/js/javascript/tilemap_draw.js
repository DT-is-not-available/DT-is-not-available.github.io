function drawTileSet() {
  //drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
	for (let i = 0; i < 272; i++) {
		this.tilex = (i*16)-Math.trunc(i/17)*272
		this.tiley = Math.trunc(i/17)*16
		if (typeof(level.tiles[(Math.trunc(camera_x/16)+this.tilex/16)+","+(Math.trunc(camera_y/16)+this.tiley/16)]) !== 'undefined') {
			if (typeof(tile_defs[level.tiles[(Math.trunc(camera_x/16)+this.tilex/16)+","+(Math.trunc(camera_y/16)+this.tiley/16)]]) !== 'undefined') {
				if (tile_defs[level.tiles[(Math.trunc(camera_x/16)+this.tilex/16)+","+(Math.trunc(camera_y/16)+this.tiley/16)]].animation === false) {
					canvas.drawImage(img_tileset, tile_defs[level.tiles[(Math.trunc(camera_x/16)+this.tilex/16)+","+(Math.trunc(camera_y/16)+this.tiley/16)]].tileX*16, tile_defs[level.tiles[(Math.trunc(camera_x/16)+this.tilex/16)+","+(Math.trunc(camera_y/16)+this.tiley/16)]].tileY*16, 16, 16, -(camera_x-Math.trunc(camera_x/16)*16)+this.tilex, -(camera_y-Math.trunc(camera_y/16)*16)+this.tiley, 16, 16)
				} else {
					canvas.drawImage(img_tileAnimation, tile_defs[level.tiles[(Math.trunc(camera_x/16)+this.tilex/16)+","+(Math.trunc(camera_y/16)+this.tiley/16)]].animation[mod(Math.trunc(tileanim_timer), tile_defs[level.tiles[(Math.trunc(camera_x/16)+this.tilex/16)+","+(Math.trunc(camera_y/16)+this.tiley/16)]].animation.length)].frameX, tile_defs[level.tiles[(Math.trunc(camera_x/16)+this.tilex/16)+","+(Math.trunc(camera_y/16)+this.tiley/16)]].animation[mod(Math.trunc(tileanim_timer), tile_defs[level.tiles[(Math.trunc(camera_x/16)+this.tilex/16)+","+(Math.trunc(camera_y/16)+this.tiley/16)]].animation.length)].frameY, 16, 16, -(camera_x-Math.trunc(camera_x/16)*16)+this.tilex, -(camera_y-Math.trunc(camera_y/16)*16)+this.tiley, 16, 16)
				}
			}
		}
	}
};