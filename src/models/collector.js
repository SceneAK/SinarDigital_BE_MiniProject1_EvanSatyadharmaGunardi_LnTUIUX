import Common from '../common.js'

var collectorDb = [];
var globalIdCount = 0;

class Collector 
{
    constructor({coins, fumos, userId})
    {
        this.userId = userId;
        this.coins = coins;
        this.fumos = fumos;
    }

    clone()
    {
        return Object.assign(new Collector(this), this);
    }

    prepareSerialize()
    {
        delete this.id;
        delete this.userId;
    }

    updateCoins()
    {
        for (const fumo in this.fumos)
            this.coins += fumo.yieldCoins();
    }

    static dbCreate(userId)
    {
        var entry = new Collector({coins: 0, fumos: [], userId});
        entry.id = globalIdCount++;

        collectorDb.push(entry);
        return entry.clone();
    }

    static dbFetchById(id)
    {
        return Common.arrayGet(collectorDb, c => c.id == id).clone();
    }

    static dbFetchByUserId(userId)
    {
        console.log(JSON.stringify(collectorDb) + " trying to find " + userId);
        return Common.arrayGet(collectorDb, c => c.userId == userId).clone();
    }

    static dbUpdate(id, data) 
    {
        Object.assign(Common.arrayGet(collectorDb, c => c.id == id), data);
    }

    static dbDelete(id)
    {
        Common.arrayDelete(collectorDb, c => c.id == id);
    }
}

export default Collector;
