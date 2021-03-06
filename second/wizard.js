function Wizard({ x, y }, context, img) {
    this.entityWidth = 40;
    this.position = {
        x,
        y,
        width: this.entityWidth,
        height: this.entityWidth
    };
    this.attackAble = true;
    this.context = context;
    this.img = img;
    this.bloodVolume = 1000;
    this.attackVolume = 100;
    this.defenseVolume = 50;
    this.alive = true;
    this.imgPos = {
        x: 925,
        y: 265,
        width: 30,
        height: 30
    };
}
Wizard.prototype = {

    getPosition: function () {
        return this.position;
    },

    attack: function (body) {
        body.bloodVolume -= this.attackVolume - body.defenseVolume;
        body.checkAlive();
    },

    checkAlive: function () {
        if (this.bloodVolume <= 0) {
            this.alive = false;
        }
        return this.alive;
    },

    draw: function () {

        if (!this.checkAlive()) {
            return;
        }

        this.context.font = '16px "微软雅黑"';
        this.context.fillStyle = 'red';
        this.context.fillText('血量：' + this.bloodVolume,
            this.position.x - 5,
            this.position.y - 5, 50, 3);

        this.context
            .drawImage(
                this.img, this.imgPos.x, this.imgPos.y,
                this.imgPos.width, this.imgPos.height,
                this.position.x, this.position.y, this.position.width, this.position.height
            );
    }
};
window.Wizard = Wizard;