function resetkeys() {
	keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false}
}

function onscreen(hitbox_1, x_p, y_p) {
	if (x_p+hitbox_1.X_pos >= camera_x && x_p-hitbox_1.X_neg <= camera_x+256 && y_p+hitbox_1.Y_pos >= camera_y && y_p-hitbox_1.Y_neg <= camera_y+240) {
		return true
	}else{
		return false
	}
}

function overlap(hitbox_1, x_1, y_1, hitbox_2, x_2, y_2) {
	if (x_p+hitbox_1.X_pos >= camera_x && x_p-hitbox_1.X_neg <= camera_x+256 && y_p+hitbox_1.Y_pos >= camera_y && y_p-hitbox_1.Y_neg <= camera_y+240) {
		return true
	}else{
		return false
	}
}

function setScale(amount) {
	canvas.resetTransform();
	canvas.canvas.width  = 256*amount;
	canvas.canvas.height = 240*amount;
	canvas.scale(amount, amount);
	document.getElementById('canvas').style = "padding: 0; margin: auto; display: block; width: "+256*amount+"px; height: "+240*amount+"px; position: absolute; top: 0; bottom: 0; left: 0; right: 0;";
	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
	canvas.imageSmoothingEnabled = false;
}

function setScaleAuto() {
	if (window.innerHeight >= 256*4) {
		setScale(4);
	}else if (window.innerHeight >= 256*3) {
		setScale(3);
	}else if (window.innerHeight >= 256*2) {
		setScale(2);
	}else{
		setScale(1);
	}
}

function setScaleFit() {
	setScale((window.innerHeight)/256);
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 87) {
        //console.log('W was pressed');
		keyboard.W = true
    }
    else if(event.keyCode == 83) {
        //console.log('S was pressed');
		keyboard.S = true
    }
    else if(event.keyCode == 65) {
        //console.log('A was pressed');
		keyboard.A = true
    }
    else if(event.keyCode == 68) {
        //console.log('D was pressed');
		keyboard.D = true
    }
    else if(event.keyCode == 16) {
        //console.log('Shift was pressed');
		keyboard.Shift = true
    }
    else if(event.keyCode == 32) {
        //console.log('Space was pressed');
		keyboard.Space = true
    }
    else if(event.keyCode == 13) {
        //console.log('Enter was pressed');
		keyboard.Enter = true
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 87) {
        //console.log('W was released');
		keyboard.W = false
    }
    else if(event.keyCode == 83) {
        //console.log('S was released');
		keyboard.S = false
    }
    else if(event.keyCode == 65) {
        //console.log('A was released');
		keyboard.A = false
    }
    else if(event.keyCode == 68) {
        //console.log('D was released');
		keyboard.D = false
    }
    else if(event.keyCode == 16) {
        //console.log('Shift was released');
		keyboard.Shift = false
    }
    else if(event.keyCode == 32) {
        //console.log('Space was released');
		keyboard.Space = false
    }
    else if(event.keyCode == 13) {
        //console.log('Enter was released');
		keyboard.Enter = false
    }
});