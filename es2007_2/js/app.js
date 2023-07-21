"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileshoppingservice_js_1 = require("./fileshoppingservice.js");
const mustache_express_1 = __importDefault(require("mustache-express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 88;
const useFile = undefined;
app.set('useFile', true);
// view engine configration
app.set('view engine', 'mustache');
app.engine('mustache', (0, mustache_express_1.default)());
// end view engine configuration
const serviceFactory = () => {
    if (useFile || app.get('useFile'))
        return new fileshoppingservice_js_1.FileShoppingService('./list.json');
    throw "No service specification";
};
const service = serviceFactory();
const formatDate = (fmt, dt) => {
    const date = new Date(dt);
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    return `<time datetime='${date.toISOString()}'>` + fmt
        .replaceAll("$d", `${d}`)
        .replaceAll("$D", `${("0" + d).slice(-2)}`)
        .replaceAll("$m", `${m}`)
        .replaceAll("$M", `${("0" + m).slice(-2)}`)
        .replaceAll("$y", `${y.toString().slice(-2)}`)
        .replaceAll("$Y", `${y}`)
        + "</time>";
};
app.use(express_1.default.json())
    .use(body_parser_1.default.urlencoded({ extended: true }))
    .get('/additem', async (req, res) => {
    const total = (await service.get()).length;
    res.render('additem', { total: total, });
})
    .get('/', async (req, res) => {
    const bag = await service.get();
    res.render('listitems', {
        bag: bag,
        format: () => (t, r) => formatDate("$D/$M/$y", r(t))
    });
})
    .post('/api/', async (req, res) => {
    res.send(await service.add(req.body));
})
    .get('/api/', async (req, res) => {
    res.send(await service.get());
})
    .listen(port, () => console.log(`Listening on port ${port}`));
