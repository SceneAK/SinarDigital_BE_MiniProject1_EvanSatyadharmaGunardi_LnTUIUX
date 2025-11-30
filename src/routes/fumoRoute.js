import { Fumo } from '../models/fumo.js'
import Collector from '../models/collector.js'
import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    try
    {
        if (!req.session?.user)
            throw new Error("Not Logged In");

        const collector = Collector.dbFetchByUserId(req.session.user.id);
        res.json(Fumo.dbFetchByOwner(collector.id).map( f => f.toPublicObj() ));
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
});

export default router;
