function resetkeys() {
	keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false}
}

function onscreen(hitbox_1, x_p, y_p) {
	return overlap(hitbox_1, x_p, y_p, {X_pos: 256, X_neg: 0, Y_pos: 240, Y_neg: 0}, Math.round(camera_x), Math.round(camera_y))
}

function mod(x, y) {return x - y * Math.floor(x / y)}

function overlap(r1, x1, y1, r2, x2, y2) {
	left1 = x1-r1.X_neg
	right1 = x1+r1.X_pos
	top1 = y1-r1.Y_neg
	bottom1 = y1+r1.Y_pos
	left2 = x2-r2.X_neg
	right2 = x2+r2.X_pos
	top2 = y2-r2.Y_neg
	bottom2 = y2+r2.Y_pos
  return !(left2 >= right1 || 
           right2 <= left1 || 
           top2 >= bottom1 ||
           bottom2 <= top1);
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