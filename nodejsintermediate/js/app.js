import express from 'express';
import mustache from 'mustache-express';
import bodyParser from 'body-parser';
import { FileSystemContactService } from './services/fs/filesystemcontactservice.js';
console.log("App starting...");
const port = 88;
const app = express();
const contactService = new FileSystemContactService('./assets/contacts.json');
app
    .set('view engine', 'mustache')
    .engine('mustache', mustache())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .get('/', async (req, res) => res.render('home', {
    contacts: await contactService.findList()
}))
    .get('/api/contacts', async (req, res) => {
    if (!req.query.page)
        res.send(await contactService.findList());
    else {
        const page = parseInt(req.query.page.toString());
        const pageSize = parseInt(req.query.pageSize?.toString() ?? "50");
        res.send(await contactService.findPage(page, pageSize));
    }
})
    .post('/api/contacts', async (req, res) => {
    res.send(await contactService.create(req.body));
})
    .delete('/api/contacts/:id', async (req, res) => {
    res.send(await contactService.delete(parseInt(req.params.id)));
})
    .put('/api/contacts/:id', async (req, res) => {
    res.send(await contactService.update(parseInt(req.params.id), req.body));
})
    .listen(port, () => console.log(`App listening on port ${port}...`));
