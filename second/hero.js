function Hero({ x, y }, context, img) {

    this.bloodVolume = 5000;
    this.attackVolume = 200;
    this.defenseVolume = 50;

    this.entityWidth = 40;
    this.position = {
        x,
        y,
        width: this.entityWidth,
        height: this.entityWidth
    };
    this.context = context;
    this.img = img;
    this.imgPos = {
        x: 0,
        y: 0,
        width: 33,
        height: 33
    };
    this.alive = true;
}

Hero.prototype = {
    attack: function (body) {
        body.bloodVolume -= this.attackVolume - body.defenseVolume;
        body.checkAlive();
        this.status = 'fighting';
    },

    win: function () {
        this.status = 'normal';
    },

    checkAlive: function () {
        if (this.bloodVolume <= 0) {
            this.alive = false;
        }
        return this.alive;
    },

    desire: function ({ x, y }) {
        return {
            x: this.position.x + x * this.entityWidth,
            y: this.position.y + y * this.entityWidth,
        };
    },

    walk: function (step, judge) {

        if (this.status === 'fighting') {
            return false;
        }

        const newPos = this.desire(step);

        if (typeof judge === 'function') {
            if (!judge(newPos)) {
                return false;
            }
        }

        Object.assign(this.position, newPos);
        return true;
    },
    getPosition: function () {
        return this.position;
    },

    draw: function () {
        if (!this.checkAlive()) {
            return;
        }

        this.context.font = '16px "微软雅黑"';
        this.context.fillStyle = 'red';
        this.context.fillText('血量：' + this.bloodVolume,
            this.position.x + this.position.height - 40,
            this.position.y + this.position.width + 10, 50, 3);

        this.context
            .drawImage(
                this.img, this.imgPos.x, this.imgPos.y,
                this.imgPos.width, this.imgPos.height,
                this.position.x, this.position.y, this.position.width, this.position.height
            );
    }
}
window.Hero = Hero;