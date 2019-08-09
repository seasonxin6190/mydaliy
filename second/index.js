
(
	function() {
		const context = document.getElementById('content').getContext('2d');
		const img = new Image();
		const heroImg = new Image();
		var Hero = window.Hero;
		var constructCell = window.constructCell
		var Monster = window.Monster;

		const imgTask = (img, src) => {
			return new Promise((resolve, reject) => {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};


		Promise.all([imgTask(img, './all.jpg'), imgTask(heroImg, './hero.png')])
		.then(() => {

			var cellManager = window.constructCell(context, img);
			var hero = new Hero({x: 0, y: 0}, context, heroImg);
			var monster = new Monster({ x: 80, y: 40 }, context, img);
			var wizard = new Wizard({ x: 120, y: 120 }, context, img);
			const mapManager = new MapManager(cellManager, [monster, hero, wizard]);
			mapManager.flush();

			document.onkeyup = function (params) {
				var keyMap = {
					37: { x: -1, y: 0 },
					38: { x: 0, y: -1 },
					39: { x: 1, y: 0 },
					40: { x: 0, y: 1 },
				};
				if (keyMap[event.keyCode]) {
					hero.walk(keyMap[event.keyCode], function shouldElemetWalk(desirePos) {
						const element = mapManager.getElement(desirePos);
						if (element && element.attackAble) {
							function fight() {
								hero.attack(element);
								element.attack(hero);
								mapManager.flush();
								if (hero.alive && element.alive) {
									setTimeout(() => {
										fight();
									}, 500);
								}
								else {
									hero.win();
									mapManager.removeElement(element);
								}
							}
							fight();
							return false;
						}
						return cellManager.judgeIn(desirePos);
					});
				}
				mapManager.flush();
			}

		})

})()