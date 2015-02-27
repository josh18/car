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
	
	// ~~ Car object
	function car(x, y, direction, velocity, turning) {
		
		// Starting position
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.velocity = 0;
		this.turning = 0;
		
		// Forward movement
		this.maxVelocity = 15;
		this.acceleration = 4;
		
		// Reverse movement
		this.reverseMaxVelocity = 5;
		this.reverseAcceleration = 2;
		
		// Other movment
		this.deacceleration = 10;
		this.brakeRate = 15;
		this.turningSpeed = 270;
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
	
	car.prototype.update = function(dt) {
		
		this.input(dt);
		
		// Max velocity
		if (this.velocity > this.maxVelocity) {
			this.velocity = this.maxVelocity;
		}
		
		// Max reverse velocity
		if (this.velocity < -this.reverseMaxVelocity) {
			this.velocity = -this.reverseMaxVelocity;
		}
		
		this.direction = this.direction + this.turning;
		this.rad = this.direction * Math.PI / 180;
		this.x += Math.cos(this.rad)*this.velocity;
		this.y -= Math.sin(this.rad)*this.velocity;
	};
	
	car.prototype.input = function(dt) {
		
		// Brake
		if (keys.up && keys.down || keys.down && this.velocity > 0) {
			this.velocity = this.velocity - this.brakeRate * dt;
		}
		// Reverse
		else if (keys.down && this.velocity <= 0) {
			this.velocity = this.velocity - this.reverseAcceleration * dt;
		}
		// Accelerate
		else if (keys.up) {
			this.velocity = this.velocity + this.acceleration * dt;
		}
		// Deaccelerate
		else if (this.velocity > 0) {
			this.velocity = this.velocity - this.deacceleration * dt;
			if (this.velocity < 0) {
				this.velocity = 0;
			}
		}
		// Deaccelerate
		else if (this.velocity < 0) {
			this.velocity = this.velocity + this.deacceleration * dt;
			if (this.velocity > 0) {
				this.velocity = 0;
			}
		}
		
		// Direction
		if (keys.left && keys.right || !keys.left && !keys.right) {
			this.turning = 0;
		} else if (keys.left) {
			this.turning = this.turningSpeed * dt;
		} else if (keys.right) {
			this.turning = -this.turningSpeed * dt;
		}
	}
	
	car.prototype.test = function() {
		return this.x;
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
	function update(dt) {
		speedy.update(dt);
	}
	
	// Render world
	function render() {
		context.fillStyle = "#ccc"; // Canvas background color
		context.fillRect(0, 0, width, height); // Fill in canvas background
		speedy.draw();
	}
	
	// Loop
	var lastFrame = performance.now();
	function loop(now) {
		
		requestAnimationFrame(loop);
		
		// Calculate delta time
		var dt = now - lastFrame;
		
		// Prevent dt spikes
		if (dt < 160) {
			update(dt / 1000);
			render();
		}
		lastFrame = now;
	};
	
	// Inititate
	loop(performance.now());
	
	document.getElementById(target).appendChild(canvas);
}