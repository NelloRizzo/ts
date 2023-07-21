import express from "express";
import { FileShoppingService } from './fileshoppingservice.js';
const app = express();
const port = 88;
const useFile = true;
const serviceFactory = () => {
    if (useFile)
        return new FileShoppingService('./list.json');
    throw "No service specification";
};
const service = serviceFactory();
app.use(express.json());
app.post('/', async (req, res) => {
    res.send(await service.add(req.body));
});
app.get('/', async (req, res) => {
    res.send(await service.get());
});
app.listen(port, () => console.log(`Listening on port ${port}`));
