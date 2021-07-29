class Mario_Class {
	constructor(xpos, ypos) {
		this.entity = new Generic_entity_class(xpos, ypos, {X_neg: 6, X_pos: 6, Y_neg: 14, Y_pos: 0})
		this.mirror = false
		this.powerup = 0
		this.frame = 0
		this.jumptimer = 0
		this.img_hitbox = {X_neg: 16, X_pos: 16, Y_neg: 32, Y_pos: 0}
		this.speedcap = 12
		this.walkanim = 0
	}
	game() {
		this.entity.game()
		if (this.entity.onfloor && !Math.round(this.entity.xv) == 0) {
			this.walkanim = mod(this.walkanim+(this.entity.xv/150), 3)
			this.frame = 2+Math.trunc(this.walkanim)
		}
		if (keyboard.Space && this.jumptimer > 0) {
			if (this.jumptimer > 0) {this.entity.yv = -4}
			if (this.jumptimer > 15) {this.entity.yv = -12}
			if (this.jumptimer > 30) {this.entity.yv = -20}
			this.jumptimer -= 1
		}
		if (keyboard.D) {
			this.entity.xv += 0.12
			if (keyboard.Shift && this.entity.onfloor) this.entity.xv += 0.03
			if (this.entity.onfloor && !keyboard.A && this.entity.xv < 0) {
				this.entity.xv += 0.03
				this.frame = 5
			}
		}
		if (keyboard.A) {
			this.entity.xv -= 0.12
			if (keyboard.Shift && this.entity.onfloor) this.entity.xv -= 0.03
			if (this.entity.onfloor && !keyboard.D && this.entity.xv > 0) {
				this.entity.xv -= 0.03
				this.frame = 5
			}
		}
		if (((!keyboard.A && !keyboard.D) || (keyboard.A && keyboard.D)) && Math.round(this.entity.xv) == 0) {
			this.entity.xv = 0
		}
		if (((!keyboard.A && !keyboard.D) || (keyboard.A && keyboard.D)) && this.entity.onfloor && Math.round(this.entity.xv) != 0) {
			this.entity.xv -= (Math.abs(this.entity.xv)/this.entity.xv)*0.15
		}
		if (this.entity.xv > this.speedcap)
			this.entity.xv = this.speedcap
		if (this.entity.xv < -this.speedcap)
			this.entity.xv = -this.speedcap
		if (!this.entity.onfloor && this.entity.yv < 0) {
			this.frame = 6
			if (!keyboard.Space) {
				this.jumptimer = 0
			}
		}
		if (!this.entity.onfloor && !keyboard.Space)
			this.jumptimer = 0
		if (keyboard.Shift && this.entity.onfloor) {this.speedcap = 16};
		if (!keyboard.Shift) {this.speedcap = 12};
		if (this.entity.onceil) {
			this.entity.onceil = false
			this.jumptimer = 0
		}
		if (this.entity.onfloor && Math.round(this.entity.xv) == 0) {
			this.frame = 0
		}
		if (this.entity.onfloor && !keyboard.Space) {
			this.jumptimer = 79 + Math.abs(this.entity.xv)/2.5
		}
		if (this.entity.onfloor && keyboard.D && !keyboard.A) {
			this.mirror = false
		}else if (this.entity.onfloor && keyboard.A && !keyboard.D) {
			this.mirror = true
		}
		if (this.entity.x < camera_x+6) {
			this.entity.x = camera_x+6
			this.entity.xv = 0
		}
		if (this.entity.x > camera_x+250) {
			this.entity.x = camera_x+250
			this.entity.xv = 0
		}
	}
	draw() {
		if (onscreen(this.img_hitbox, this.entity.rx, this.entity.ry)) {
			if (this.mirror) {
				canvas.scale(-1, 1);
				canvas.drawImage(img_mario, 32+this.frame*32, this.powerup*32, 32, 32, camera_x-this.entity.rx-16, -camera_y+this.entity.ry-31, 32, 32);
				canvas.scale(-1, 1);
			}else{
				canvas.drawImage(img_mario, 32+this.frame*32, this.powerup*32, 32, 32, -camera_x+this.entity.rx-16, -camera_y+this.entity.ry-31, 32, 32);
			}
		}
	}
}