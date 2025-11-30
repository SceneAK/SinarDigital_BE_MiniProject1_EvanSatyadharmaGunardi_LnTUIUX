import express from 'express'
import Collector from '../models/collector.js'
import { Fumo } from '../models/fumo.js'

function checkCollector(userId)
{
    let collector = Collector.dbFetchByUserId(userId);

    const fumos = Fumo.dbFetchByOwner(collector.id);
    fumos.forEach( f => collector.addCoins(f.yieldCoins()));

    Collector.dbUpdate(collector);
    return collector.toPublicObj();
}

const router = express.Router();

router.post('/check', (req, res) => {
    try
    {
        if (!req.session?.user)
            return res.status(402).send("Not Logged In");

        res.json(checkCollector(req.session.user.id));
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
});

export default router;
