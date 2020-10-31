
export class GameWorld extends Phaser.Scene {
    constructor() {
        super('GameWorld');
    }

    preload () {
        this.load.image('logo', 'https://raw.githubusercontent.com/photonstorm/phaser3-typescript-project-template/master/dist/assets/phaser3-logo.png');
        this.load.image('libs', 'https://raw.githubusercontent.com/photonstorm/phaser3-typescript-project-template/master/dist/assets/libs.png');
    }

    create () {
        this.add.shader('RGB Shift Field', 0, 0, 800, 600).setOrigin(0);
        this.add.shader('Plasma', 0, 412, 800, 172).setOrigin(0);
        this.add.image(400, 300, 'libs');

        const logo = this.add.image(400, 70, 'logo');

        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })
    }
}