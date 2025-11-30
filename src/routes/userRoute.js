import express from 'express'
import User from '../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.user)
        return res.status(402).send("Not logged in");

    try 
    {
        var user = User.dbFetchById(req.session.user.id);
        res.json(user.toPublicObj())
    } catch(err) 
    {
        res.status(400).send(err.message);
    }
});


router.delete('/', (req, res) => {
    res.send("Hello World");
});

export default router;
