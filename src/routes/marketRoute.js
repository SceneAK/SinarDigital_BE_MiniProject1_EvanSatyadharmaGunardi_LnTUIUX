import { Offer, MysteryOffer } from '../models/offer.js'
import { Fumo, createRandomFumo } from '../models/fumo.js'
import Collector from '../models/collector.js'
import express from 'express'


var priceMin = 1;
var priceMax = 30;

restock();
restock();
restock();

function restock()
{
    priceMin *= 2;
    priceMax *= 2;
    const price = Math.floor(priceMin) + Math.floor(Math.random() * priceMax);
    if (Math.random() < 0.6) {
        Offer.dbInsert(new Offer(createRandomFumo(), price));
    } else {
        let fumo = createRandomFumo();
        Offer.dbInsert(new MysteryOffer(fumo, price, Math.floor(fumo.level*3/10)));
    }
}

function takeOffer(offerId, userId)
{
    const price = Offer.dbFetchById(offerId).price;
    const collector = Collector.dbFetchByUserId(userId);

    if (collector.coins < price)
        throw new Error("Not enough coins");

    const offer = Offer.dbTakeBack(offerId);
    offer.fumo.yieldCoins();
    Fumo.dbInsert(collector.id, offer.fumo);

    collector.coins -= price;
    Collector.dbUpdate(collector);

    restock();
}

const router = express.Router();

router.get('/', (req, res) => {
    try
    {
        if (!req.session)
            throw new Error("Not Logged In");

        res.json(Offer.dbFetchAll());
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
});

router.post('/:offerId', (req, res) => {
    try
    {
        if (!req.session?.user)
            throw new Error("Not Logged In");

        takeOffer(req.params.offerId, req.session.user.id);
        res.send("bought");
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
});

export default router;
