import Common from '../common.js'

var collectorDb = [];
var globalIdCount = 0;

class Collector 
{
    constructor({coins, userId})
    {
        this.userId = userId;
        this.coins = coins;
    }

    clone()
    {
        return Object.assign(new Collector(this), this);
    }

    toPublicObj()
    {
        const { id, userId, ...data } = this;
        return data;
    }

    addCoins(amount)
    {
        this.coins += amount;
    }

    static dbCreate(userId)
    {
        var entry = new Collector({coins: 0, userId});
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
        return Common.arrayGet(collectorDb, c => c.userId == userId).clone();
    }

    static dbUpdate(updated) 
    {
        Object.assign(Common.arrayGet(collectorDb, c => c.id == updated.id), updated);
    }

    static dbDelete(id)
    {
        Common.arrayDelete(collectorDb, c => c.id == id);
    }
}

export default Collector;
