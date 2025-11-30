const fumoDb = [];

class Fumo 
{
    constructor({name, level, lastYield, others})
    {
        this.name = name;
        this.level = level || 0;
        this.lastYield = lastYield || Date.now();
        this.others = others;
    }
    yieldCoins()
    {
        this.lastYield = Date.now();
        return 0;
    }
};
class ReimuFumo extends Fumo 
{
    constructor({level})
    {
        super({name: "reimu_fumo", level});
    }
    yieldCoins()
    {
    }
}

export default Fumo;
