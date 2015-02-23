function car(target) {

	// ~~ Variables
	
	// Canvas
	var canvas = document.createElement("canvas");
	var width = 800;
	var height = 800;
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');
	
	// Speedy
	var speedyStart = {
		x: 100,
		y: 200,
		direction: 0
	};
	var speedy = new car(speedyStart.x, speedyStart.y, speedyStart.direction);
	
	// ~~ Car Object
	function car(x, y, direction, velocity, turning) {
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.velocity = 0;
		this.maxVelocity = 4;
		this.acceleration = 0.2;
		this.deacceleration = 0.05;
		this.turningSpeed = 3;
		
		this.turning = 0;
	};
	
	car.prototype.draw = function () {
		
		context.beginPath();
		
		context.translate(this.x, this.y);
		context.rotate(-this.rad);
		
		context.rect(-15, -5, 30, 10);
		context.fillStyle = "#000000";
		context.fill();
		
		context.rotate(this.rad);
		context.translate(-this.x, -this.y);
	};
	
	car.prototype.update = function () {
		
		this.input();
		
		// Max velocity
		if (this.velocity > this.maxVelocity) {
			this.velocity = this.maxVelocity;
		}
		
		// Min Velocity
		if (this.velocity < 0) {
			this.velocity = 0;
		}
		
		this.direction = this.direction + this.turning;
		this.rad = this.direction * Math.PI / 180;
		this.x += Math.cos(this.rad)*this.velocity;
		this.y -= Math.sin(this.rad)*this.velocity;
	
		/*// Bounce of left / right sides
		if (this.x - 5 < 0) {
			this.x = 5;
			this.x_speed = -this.x_speed;
		} else if (this.x + 5 > width) {
			this.x = width - 5;
			this.x_speed = -this.x_speed;
		}
		
		// Bounce of top
		if (this.y - 5 < 0) {
			this.y = 5;
			this.y_speed = -this.y_speed;
		}
		
		
		// Reset if goes off edge
		if (this.y > height) {
			this.x = speedyStart.x;
			this.y = speedyStart.y;
			this.x_speed = speedyStart.x_speed;
			this.y_speed = speedyStart.y_speed;
		}*/
	};
	
	car.prototype.input = function () {
		
		// Acceleration
		if (keys.up && keys.down) {
			
		} else if (keys.up) {
			this.velocity = this.velocity + this.acceleration;
		} else if (keys.down) {
			
		} else {
			this.velocity = this.velocity - this.deacceleration;
		}
		
		// Direction
		if (keys.left && keys.right || !keys.left && !keys.right) {
			this.turning = 0;
		} else if (keys.left) {
			this.turning = this.turningSpeed;
		} else if (keys.right) {
			this.turning = -this.turningSpeed;
		}
	}
	
	// ~~ Input
	
	// Keys
	var keys = new keyDetect();
	
	function keyDetect() {
		
		this.keyList = [
			{
				key: 'up',
				code: 38
			},
			{
				key: 'right',
				code: 39
			},
			{
				key: 'down',
				code: 40
			},
			{
				key: 'left',
				code: 37
			},
			{
				key: 'space',
				code: 32
			}
		];
		
		for (var i = 0; i < this.keyList.length; i++) {
			this[this.keyList[i]['key']] = false;
		}
	};
	
	
	// Key down state
	keyDetect.prototype.keyDown = function(e) {
		for (var i = 0; i < this.keyList.length; i++) {
			if (e.keyCode === this.keyList[i]['code']) {
				this[this.keyList[i]['key']] = true;
			}
		}
	};
	
	// Key up state
	keyDetect.prototype.keyUp = function(e) {
		for (var i = 0; i < this.keyList.length; i++) {
			if (e.keyCode === this.keyList[i]['code']) {
				this[this.keyList[i]['key']] = false;
			}
		}
	}
	
	// Key down event
	window.onkeydown = function(e) {
		keys.keyDown(e);
	}
	
	// Key up event
	window.onkeyup = function(e) {
		keys.keyUp(e);
	}
	
	// ~~ Controllers
	
	// Update world
	function update() {
		speedy.update();
		
		setTimeout(update, 10);
	}
	
	// Render world
	function render() {
		context.fillStyle = "#ccc"; // Canvas background color
		context.fillRect(0, 0, width, height); // Fill in canvas background
		speedy.draw();
		
		requestAnimationFrame(render, 10);
	};
	
	// Inititate
	update();
	render();
	
	document.getElementById(target).appendChild(canvas);
}