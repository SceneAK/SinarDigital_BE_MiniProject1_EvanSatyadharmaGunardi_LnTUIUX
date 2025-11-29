import express from 'express'
import http from 'http'
import fumoRoute from './routes/fumoRoute.js'
import collectorRoute from './routes/collectorRoute.js'

const app = express();

app.use('/fumo',  fumoRoute);
app.use('/collector',  collectorRoute);
app.use('/market',  collectorRoute);

const PORT = 3000

console.log("Listening on port " + PORT);
app.listen(PORT);
