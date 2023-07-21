import express from "express";
import mustache from "mustache-express";
import bodyParser from "body-parser";
import { configuration } from "./services/configurationservice/configurationservice.js";
import { CsvCityService } from "./services/cityservice/cityservice.js";
import { PersonalData } from "./services/fiscalcodeservice/fiscalcodeservice.js";
import { serviceFactory } from "./services/fiscalcodeservice/fiscalcodeservice.js";
class PersonalDataModel {
    firstName;
    lastName;
    dob;
    isMale;
    birthCity;
    fiscalCode;
    constructor(firstName, lastName, dob, isMale, birthCity, fiscalCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.isMale = isMale;
        this.birthCity = birthCity;
        this.fiscalCode = fiscalCode;
    }
}
const citiesServiceFactory = async () => {
    if (opt.serviceKey == 'csv')
        return new CsvCityService(opt.citiesCsv);
    throw "No provided service for ICityService";
};
const opt = await configuration();
const port = opt.serverPort ?? 88;
const api = {
    getCities: '/api/cities',
    getCitiesByProvince: '/api/cities/:acronym',
    getProvinces: '/api/provinces'
};
const cityService = await citiesServiceFactory();
const fiscalCodeService = serviceFactory();
const testCity = (await cityService.findAll()).filter(c => c.name.startsWith("Vallo della")).pop();
const testData = new PersonalDataModel("aniello", "rizzo", "1968-06-06", true, testCity);
const app = express();
app
    .set('view engine', 'mustache')
    .engine('mustache', mustache())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/', (req, res) => {
    res.render('layout', testData);
})
    .post('/', async (req, res) => {
    const data = fiscalCodeService.get(new PersonalData(req.body.firstName, req.body.lastName, new Date(req.body.birthday), req.body.gender, req.body.birthCity));
    res.render('layout', new PersonalDataModel(data.firstName, data.lastName, data.dob.toISOString(), data.isMale, (await cityService.findAll()).filter(c => c.cadastral == data.birthCadastral).pop(), data.fiscalCode));
})
    .get(api.getCities, async (req, res) => res.send(await cityService.findAll()))
    .get(api.getCitiesByProvince, async (req, res) => res.send(await cityService.findAllByProvince(req.params.acronym)))
    .get(api.getProvinces, async (req, res) => res.send(await cityService.findAllProvinces()))
    .listen(port, () => console.log(`Server listening on port ${port}`));
