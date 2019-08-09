
(
	function() {
		// a视角
		function prepare() {
			const context = document.getElementById('content').getContext('2d');
			const heroImg = new Image();
			const allSpriteImg = new Image();

			const imgTask = (img, src) => {
				return new Promise(function (resolve, reject) {
					img.src = src;
					img.onload = resolve;
					img.onerror = reject;
				});
			};

			const allResouceTask = Promise.all([
				imgTask(heroImg, './hero.png'),
				imgTask(allSpriteImg, './all.jpg')
			]);

			return {
				getResource(cb) {
					allResouceTask.then(function() {
						cb && cb(context, heroImg, allSpriteImg)
					})
				}
			}
	}

	// b视角

	function drawHero(context, heroImg, allSpriteImg) {
		var draw = function() {
			this.context.drawImage(
				this.img,
				this.imgPos.x,
				this.imgPos.y,
				this.imgPos.width,
				this.imgPos.height,
				this.rect.x,
				this.rect.y,
				this.rect.width,
				this.rect.height
			);
		}

		var clear = function(imgPos, rect) {
			this.context.clearRect(
				imgPos.x,
				imgPos.y,
				rect.x,
				rect.y
			)
		}
		
		 let hero = {
		 	img: heroImg,
		 	context: context,
		 	imgPos: {
		 		x: 0,
		 		y: 0,
		 		width: 32,
		 		height: 32,
		 	},
		 	rect: {
		 		x: 0,
		 		y: 0,
		 		width: 32,
		 		height: 32
		 	},
		 	draw: draw,
		 	clear: clear
		 	// move: move
		 }

		 const monster = {
		 	img: allSpriteImg,
		 	context: context,
		 	imgPos: {
		 		x: 858,
		 		y: 529,
		 		width: 32,
		 		height: 32
		 	},
		 	rect: {
		 		x: 40,
		 		y: 80,
		 		width: 32,
		 		height: 32
		 	},
		 	draw: draw
		 }
		const heroSpace = 40;

		const width = 500; // 活动范围宽度
		const height = 300; // 活动范围高度
		window.addEventListener('keyup', function(e) {
			if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				const img = {
					x: hero.rect.x,
					y: hero.rect.y
				};
				const rect = {
					x: hero.rect.width,
					y: hero.rect.height
				};
				hero.clear(img, rect);
			}
			if (e.keyCode === 37) { // 向左移动
				const leftX = hero.rect.x;
				hero.rect.x =(leftX - heroSpace > 0) ? (leftX - heroSpace) : 0;
				if ((hero.rect.y === monster.rect.y) && ((monster.rect.x <= hero.rect.x) && (monster.rect.x >= hero.rect.x))) { 
					// 高度一样，要画的x轴为英雄+40 在怪物的区间内【32， 72】就不能重写
					hero.rect.x = leftX;
				}
			}
			if (e.keyCode === 39) { // 向右移动
				let rightX = hero.rect.x;
				hero.rect.x = (rightX + heroSpace + hero.rect.width > width) ? (width - heroSpace) : rightX + heroSpace;
				if ((hero.rect.y === monster.rect.y) && ((monster.rect.x <= hero.rect.x) && (monster.rect.x >= hero.rect.x))) { 
					// 高度一样，英雄要画的x轴为+40 在怪物的区间内【32， 72】就不能重写
					hero.rect.x = rightX;
				}
			}
			if (e.keyCode === 38) { // 向上移动
				let Yup = hero.rect.y;
				hero.rect.y = (Yup - heroSpace > 0) ?  (hero.rect.y - heroSpace) : 0;
				if ((hero.rect.x === monster.rect.x) && (monster.rect.y >= (hero.rect.y)) && (hero.rect.y >= monster.rect.y)) {
					// 高度一样，英雄要画的y轴为+40 在怪物的区间内【32， 72】就不能重写
					hero.rect.y = Yup;
				}
			}
			if (e.keyCode === 40) { // 向下移动
				let Ydown = hero.rect.y;
				hero.rect.y = ((Ydown + heroSpace + hero.rect.height) > height) ? (height - heroSpace) : hero.rect.y + heroSpace;
				if ((hero.rect.x === monster.rect.x) && (monster.rect.y >= (hero.rect.y)) && (hero.rect.y >= monster.rect.y)) { 
					// 高度一样，英雄要画的y轴为+40 在怪物的区间内【32， 72】就不能重写
					hero.rect.y = Ydown;
				}
			}
			hero.draw();
		});
		hero.draw();
		monster.draw();
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
		});

})()