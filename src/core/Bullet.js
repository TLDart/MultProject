class Bullet extends Animator {
    constructor(scene,texture,weaponId,entity) {
        super(scene,entity.x,entity.y,texture,CONSTANTS.SCENE.INGAME.BULLET.SCALE);
        this.weaponId = weaponId;
        this.damage = CONSTANTS.SCENE.INGAME.BULLET.DAMAGE;
        this.criticalHit = CONSTANTS.SCENE.INGAME.BULLET.CRITICAL;
    }

    doDamage(starShip){
        /*Debug*/ //console.log(starShip.vulnerability + " "+ this.weaponId);
        if (starShip.vulnerability === this.weaponId){
            starShip.lifePoints -= this.criticalHit;
        } else {
            starShip.lifePoints -= this.damage;
        }
        this.destroy();
    }

    update(){
        if(this.y < 0){
            this.destroy();
        }
    }
}