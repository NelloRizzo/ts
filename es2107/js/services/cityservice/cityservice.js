import fs from 'fs';
class City {
    id;
    name;
    province;
    isCapital;
    cadastral;
    constructor(id, name, province, isCapital, cadastral) {
        this.id = id;
        this.name = name;
        this.province = province;
        this.isCapital = isCapital;
        this.cadastral = cadastral;
    }
}
class Province {
    name;
    acronym;
    region;
    constructor(name, acronym, region) {
        this.name = name;
        this.acronym = acronym;
        this.region = region;
    }
}
class Region {
    id;
    name;
    area;
    constructor(id, name, area) {
        this.id = id;
        this.name = name;
        this.area = area;
    }
}
class Area {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class CsvCityService {
    fileName;
    _cities;
    async cities() {
        if (!this._cities)
            await this.loadCities();
        return this._cities;
    }
    constructor(fileName) {
        this.fileName = fileName;
    }
    async loadCities() {
        if (fs.existsSync(this.fileName))
            try {
                const data = await fs.promises.readFile(this.fileName, 'latin1');
                this._cities = data.split('\n')
                    .slice(3)
                    .map((i, _) => {
                    let p = i.split(';');
                    return new City(parseInt(p[15]), p[6], new Province(p[11], p[14], new Region(parseInt(p[0]), p[10], new Area(parseInt(p[8]), p[9]))), p[13].at(0) == '1', p[19]);
                })
                    .filter(c => c.id);
            }
            catch (e) {
                console.log("loadCities", e);
                return [];
            }
    }
    citiesSorter = (a, b) => {
        let ps = this.provincesSorter(a.province, b.province);
        if (ps == 0)
            return a.name < b.name ? -1 : a.name == b.name ? 0 : 1;
        return ps;
    };
    provincesSorter(a, b) {
        return a.acronym < b.acronym ? -1 : a.acronym == b.acronym ? 0 : 1;
    }
    findAll = async () => (await this.cities()).sort(this.citiesSorter);
    findAllByProvince = async (acronym) => (await this.cities())
        .filter(c => c.province.acronym == acronym)
        .sort(this.citiesSorter);
    findAllProvinces = async () => {
        const set = new Map();
        (await this.cities())
            .map(c => c.province)
            .forEach(p => set.set(p.acronym, p));
        return [...set.values()];
    };
}
export { CsvCityService, City, Province, Region, Area };
