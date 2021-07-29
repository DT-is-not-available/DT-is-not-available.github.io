class Generic_entity_class {
	constructor(xpos, ypos, hitbox) {
		this.x = xpos
		this.y = ypos
		this.rx = xpos
		this.ry = ypos
		this.xv = 0
		this.yv = 0
		this.hitbox = hitbox
		this.onfloor = false
		this.onceil = false
	}
	game() {
		if (this.yv < 0) this.yv += 0.25
		this.yv += 0.5
		if (this.yv > 28) {
			this.yv = 28
		}
		this.onfloor = false
		this.y += this.yv/16
		this.x += this.xv/16
		if ((this.yv >= 0 && typeof(level.tiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)]) != 'undefined' && tile_defs[level.tiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)]].collision.floor && level.tiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)] === level.tiles[Math.round((this.x-12)/16)+","+Math.round((this.y+4)/16)]) || (this.yv >= 0 && typeof(level.tiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)]) != 'undefined' && tile_defs[level.tiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)]].collision.floor && level.tiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)] == level.tiles[Math.round((this.x-4)/16)+","+Math.round((this.y+4)/16)])) {
			this.yv = -0.5
			this.y = Math.round((this.y-8)/16)*16
			this.onfloor = true
		}
		if (!this.onfloor && this.yv < 0 && typeof(level.tiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24)/16)]) != 'undefined' && tile_defs[level.tiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24)/16)]].collision.ceiling) {
			this.yv = 0.5
			this.y = Math.round((this.y+8)/16)*16-2
			this.onceil = true
		}
		if ((this.xv < 0 && typeof(level.tiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22)/16)]) != 'undefined' && tile_defs[level.tiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22)/16)]].collision.left) || (this.xv < 0 && typeof(level.tiles[Math.round((this.x-14)/16)+","+Math.round((this.y-10)/16)]) != 'undefined' && tile_defs[level.tiles[Math.round((this.x-14)/16)+","+Math.round((this.y-10)/16)]].collision.left)) {
			this.x = Math.round((this.x-14)/16+1)*16+6
			this.xv = 0
		}
		if ((this.xv > 0 && typeof(level.tiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22)/16)]) != 'undefined' && tile_defs[level.tiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22)/16)]].collision.right) || (this.xv > 0 && typeof(level.tiles[Math.round((this.x-2)/16)+","+Math.round((this.y-10)/16)]) != 'undefined' && tile_defs[level.tiles[Math.round((this.x-2)/16)+","+Math.round((this.y-10)/16)]].collision.right)) {
			this.x = Math.round((this.x-14)/16)*16+10
			this.xv = 0
		}
		if (!this.onceil && !this.onfloor && (typeof(level.tiles[Math.round((this.x-13)/16)+","+Math.round((this.y-16)/16)]) != 'undefined' && tile_defs[level.tiles[Math.round((this.x-13)/16)+","+Math.round((this.y-16)/16)]].collision.left)) {
			this.x += 1
		}
		if (!this.onceil && !this.onfloor && (typeof(level.tiles[Math.round((this.x-3)/16)+","+Math.round((this.y-16)/16)]) != 'undefined' && tile_defs[level.tiles[Math.round((this.x-3)/16)+","+Math.round((this.y-16)/16)]].collision.right)) {
			this.x -= 1
		}
		this.rx = Math.round(this.x)
		this.ry = Math.round(this.y)
	}
}