class PlayScene extends Phaser.Scene {
    logo;
    background;
    historyButton;
    arcadeButton;
    backButton;
    btnSound;

    init(data) {
        this.cookies = data;
    }

    constructor() {
        super(CONSTANTS.SCENE.MENUPLAY.NAME); // DO NOT FORGET TO ADD SCENE TO MAIN
    }

    preload() {
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME, "assets/Sprites/UI/MenuHistoryBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAMESELECTED, "assets/Sprites/UI/MenuHistoryPink.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAME, "assets/Sprites/UI/MenuArcadeBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAMESELECTED, "assets/Sprites/UI/MenuArcadePink.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAME, "assets/Sprites/UI/backArrowBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAMESELECTED, "assets/Sprites/UI/backArrowPink.png");
        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
        this.load.bitmapFont(CONSTANTS.SCENE.MENUPLAY.TEXT.NAME, "assets/Fonts/joystix/joystix_white.png", "assets/Fonts/joystix/joystix_white.fnt");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LOGO.SCALE);
        this.historyButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING, CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME).setInteractive();
        this.arcadeButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 2, CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAME).setInteractive();
        this.backButton = this.add.sprite(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING + CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAME).setInteractive();
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);
        this.highStext = this.add.bitmapText(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 2 + 64, CONSTANTS.SCENE.MENUPLAY.TEXT.NAME,"HighScore :" + this.cookies.highscore, CONSTANTS.SCENE.MENUPLAY.TEXT.FONTSIZE).setOrigin(0.5,0.5).setVisible(false);


        this.changemenu = function () {
            this.changelevel(CONSTANTS.SCENE.MENU.NAME);
        }
        this.changelevels = function () {
            this.changelevel(CONSTANTS.SCENE.CUT.NAME);
        }

        this.historyButton.on('pointerover', this.changehistoryon, this);
        this.historyButton.on('pointerout', this.changehistoryoff, this);
        this.historyButton.on('pointerdown', this.changelevels, this);
        this.arcadeButton.on('pointerover', this.changearcadeon, this);
        this.arcadeButton.on('pointerout', this.changearcadeoff, this);
        this.arcadeButton.on('pointerdown', this.changeinfinitegame, this);
        this.backButton.on('pointerout', this.changebackoff, this);
        this.backButton.on('pointerover', this.changebackon, this);
        this.backButton.on('pointerdown', this.changemenu, this);


    }



    changehistoryon(pointer) {
        this.historyButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAMESELECTED);
        this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG);
    }

    changehistoryoff(pointer) {
        this.historyButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME);
    }

    changearcadeon(pointer) {
        this.arcadeButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAMESELECTED);
        this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)
        this.highStext.setVisible(true);
    }

    changearcadeoff(pointer) {
        this.arcadeButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAME);
        this.highStext.setVisible(false);
    }

    changebackon(pointer) {
        this.backButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAMESELECTED);
        this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)
    }

    changebackoff(pointer) {
        this.backButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAME);
    }

    changelevel(levelName) {
        var config = {
            target: levelName,
            duration: CONSTANTS.SCENE.SPEED.MENUTRANSITION,
            moveBelow: true,
            data: {cookies: this.cookies}
        };
        this.scene.transition(config);
    }

    changeinfinitegame() {
        var config = {
            target: CONSTANTS.SCENE.INGAME.NAME,
            duration: CONSTANTS.SCENE.SPEED.MENUTRANSITION,
            moveBelow: true,
            data: {difficulty: -1, cookies: this.cookies},
        };
        this.scene.transition(config);
    }


    update() {
        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;
    }


}