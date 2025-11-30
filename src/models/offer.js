import Common from '../common.js'
var offerDb = [];
var globalIdCount = 0;

class Offer 
{
    constructor(fumo, price)
    {
        this.fumo = fumo;
        this.price = price;
    }

    toPublicObj()
    {
        const { fumo, ...rest } = this;
        const { name, level } = fumo;

        const obj = { ...rest, fumo: { name, level } };
        return obj;
    }

    static dbInsert(offer)
    {
        offer.id = globalIdCount++;

        offerDb.push(offer);

        return offer;
    }

    static dbFetchById(id)
    {
        return Common.arrayGet(offerDb, o => o.id == id).toPublicObj();
    }

    static dbFetchAll()
    {
        return offerDb.map( o => o.toPublicObj() );
    }

    static dbTakeBack(id)
    {
        console.log(JSON.stringify(offerDb));
        return Common.arrayDelete(offerDb, o => o.id == id);
    }
}

class MysteryOffer extends Offer
{
    constructor(fumo, price, rarityLabel)
    {
        super(fumo, price);
        this.rarityLabel = rarityLabel;
    }

    toPublicObj()
    {
        const {fumo, ...rest} = super.toPublicObj();
        return rest;
    }
};

export { Offer, MysteryOffer };
