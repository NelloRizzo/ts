import express from "express";
import { FileShoppingService } from './fileshoppingservice.js'
import { IShoppingService } from './shoppingservice.js'
import mustache from "mustache-express"
import bodyParser from "body-parser"

const app = express()
const port = 88
const useFile = undefined

app.set('useFile', true)

// view engine configration
app.set('view engine', 'mustache')
app.engine('mustache', mustache())
// end view engine configuration

const serviceFactory = (): IShoppingService => {
    if (useFile || app.get('useFile'))
        return new FileShoppingService('./list.json')
    throw "No service specification"
}

const service = serviceFactory()

const formatDate = (fmt: string, dt: string): string => {
    const date = new Date(dt)
    const d = date.getDate()
    const m = date.getMonth()
    const y = date.getFullYear()
    return `<time datetime='${date.toISOString()}'>` + fmt
        .replaceAll("$d", `${d}`)
        .replaceAll("$D", `${("0" + d).slice(-2)}`)
        .replaceAll("$m", `${m}`)
        .replaceAll("$M", `${("0" + m).slice(-2)}`)
        .replaceAll("$y", `${y.toString().slice(-2)}`)
        .replaceAll("$Y", `${y}`)
        + "</time>"
}

app.use(express.json())
    .use(bodyParser.urlencoded({ extended: true }))

    .get('/additem', async (req, res) => {
        const total = (await service.get()).length
        res.render('additem', { total: total, })
    })
    .get('/', async (req, res) => {
        const bag = await service.get()
        res.render('listitems',
            {
                bag: bag,
                format: () => (t: Date, r: any) => formatDate("$D/$M/$y", r(t))
            })
    })
    .post('/api/', async (req, res) => {
        res.send(await service.add(req.body))
    })
    .get('/api/', async (req, res) => {
        res.send(await service.get())
    })

    .listen(port, () => console.log(`Listening on port ${port}`))