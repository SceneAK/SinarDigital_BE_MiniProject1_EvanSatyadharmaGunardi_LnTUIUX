import express from 'express'
import User from '../models/user.js'
import Collector from '../models/collector.js'
import { Fumo, ReimuFumo } from '../models/fumo.js'

function signup(name, email, password)
{
    const user = User.dbCreate(name, email, password);
    const collector = Collector.dbCreate(user.id);
    const starterFumo = Fumo.dbInsert(collector.id, new ReimuFumo(1));

    return { user, collector };
}

function signin(email, password)
{
    const user = User.dbFetchByEmail(email);
    if (!user.comparePassword(password))
        throw new Error("Invalid email or password");

    return user;
}


const router = express.Router();

router.post('/signup', (req, res) => {
    try 
    {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password)
            return res.status(400).send("Bad Request");

        let { user } = signup(name, email, password);
        req.session.user = { id: user.id };
        res.send("Sign Up success");
    } catch(err) 
    {
        res.status(400).send(err.message);
    }
});

router.post('/signin', (req, res) => {
    try 
    {
        const { email, password } = req.body || {};

        if (!email || !password)
            return res.status(400).send("Bad Request");

        const user = signin(email, password);

        req.session.user = { id: user.id };
        res.send("Sign in success");
    } catch(err) 
    {
        res.status(400).send(err.message);
    }
});


signup("EvanKue", "evan.gunardi@binus.ac.id", "abcdefgh");
export default router;
