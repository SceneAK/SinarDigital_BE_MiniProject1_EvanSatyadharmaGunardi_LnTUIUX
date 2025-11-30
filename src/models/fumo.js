import Common from '../common.js'

var fumoDb = [];
var globalIdCount = 0;

class Fumo
{
    constructor(typeId, name, imgSrc, level)
    {
        // Static Attribs. Duplicated per instance to consume more ram
        this.typeId = typeId;
        this.name   = name;
        this.imgSrc = imgSrc;

        this.level  = level;
    }

    yieldCoins() { return 0; }

    toPublicObj() 
    {
        const { ...rest } = this;
        delete rest.id;
        delete rest.collectorId;
        return rest;
    }

    static dbInsert(collectorId, fumo)
    {
        fumo.id = globalIdCount++;
        fumo.collectorId = collectorId;
        fumoDb.push(fumo);
        return fumo;
    }

    static dbFetchById(id)
    {
        return Common.arrayGet(fumoDb, f => f.id == id);
    }

    static dbFetchByOwner(collectorId)
    {
        return fumoDb.filter( f => f.collectorId == collectorId );
    }

    static dbDelete(id)
    {
        Common.arrayDelete(fumoDb, f => f.id == id);
    }
};

class ReimuFumo extends Fumo 
{
    constructor(level)
    {
        super("reimu_fumo", 
              "Reimu", 
              "https://images-cdn.ubuy.ee/63f4bb63b1da2c149e3aeea7-new-touhou-project-fumo-fumo-plush.jpg", 
              level);

        this.lastYieldMs = Date.now();
        this.msPerCoin   = 2000 - 1500*(this.level/10);
    }

    toPublicObj() 
    {
        const { lastYieldMs, ...rest } = this;
        delete rest.id;
        delete rest.collectorId;
        return rest;
    }

    yieldCoins()
    {
        let delta = Date.now() - this.lastYieldMs;
        this.lastYieldMs = Date.now() - delta % this.msPerCoin;
        return Math.floor(delta / this.msPerCoin);
    }
}

class CirnoFumo extends Fumo 
{
    constructor(level)
    {
        super("cirno_fumo", 
              "Cirno", 
              "https://i.ebayimg.com/images/g/IEYAAOSwEAdkHBGW/s-l1200.jpg", 
              level);

        this.lastYieldMs = Date.now();
        this.coinBurst   = 9;
        this.msPerCoin   = 10000 - 9850*(this.level/10);
    }

    toPublicObj() 
    {
        const { lastYieldMs, ...rest } = super.toPublicObj();
        return rest;
    }

    yieldCoins()
    {
        let delta = Date.now() - this.lastYieldMs;
        this.lastYieldMs = Date.now() - delta % this.msPerCoin;
        return Math.floor(delta / this.msPerCoin) & this.coinBurst;
    }
}

class NeuroFumo extends Fumo
{
    constructor(level)
    {
        super("neuro_fumo", 
              "Neuro", 
              "https://cdn.shopify.com/s/files/1/0125/8261/7145/files/fEGtfMXVGaNb3e1To1TiWGgPIhsy6S3QhbpcYPPn2Yw_1000x.png.webp?v=1685035414",
              level);

        this.lastYieldMs = Date.now();
        this.coinBurst   = 9;
        this.msPerCoin   = 10000 - 9850*(this.level/10);
    }

    toPublicObj() 
    {
        const { lastYieldMs, ...rest } = super.toPublicObj();
        return rest;
    }

    yieldCoins()
    {
        let delta = Date.now() - this.lastYieldMs;
        this.lastYieldMs = Date.now() - delta % this.msPerCoin;
        return Math.floor(delta / this.msPerCoin) & this.coinBurst;
    }
    
}

function createRandomFumo()
{
    var level = 1 + Math.floor(Math.random() * 10);
    switch (Math.floor(Math.random() * 2))
    {
        case 1:
            return new CirnoFumo(level);
        default:
            return new ReimuFumo(level);
    }
}

export { 
    createRandomFumo,
    Fumo,
    ReimuFumo,
};
