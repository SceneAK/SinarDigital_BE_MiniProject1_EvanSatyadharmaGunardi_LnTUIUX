import Collector from '../models/collector.js'
import express from 'express'

function checkCollector(userId)
{
    let collector = Collector.dbFetchByUserId(userId);
    collector.updateCoins();
    Collector.dbUpdate(collector.id, collector);
    collector.prepareSerialize();
    return collector;
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
