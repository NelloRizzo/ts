import { publicDecrypt } from 'crypto'
import fs from 'fs'

class City {
    constructor(
        public id: number,
        public name: string,
        public province: Province,
        public isCapital: boolean,
        public cadastral: string
    ) { }
}
class Province {
    constructor(public name: string, public acronym: string, public region: Region) { }
}
class Region {
    constructor(public id: number, public name: string, public area: Area) { }
}
class Area {
    constructor(public id: number, public name: string) { }
}
interface ICityService {
    findAll(): Promise<Array<City>>
    findAllByProvince(acronym: string): Promise<Array<City>>
    findAllProvinces(): Promise<Array<Province>>
}

class CsvCityService implements ICityService {
    private _cities?: City[]

    private async cities(): Promise<City[]> {
        if (!this._cities)
            await this.loadCities()
        return this._cities!
    }

    constructor(private fileName: string) { }

    private async loadCities() {
        if (fs.existsSync(this.fileName))
            try {
                const data = await fs.promises.readFile(this.fileName, 'latin1')
                this._cities = data.split('\n')
                    .slice(3)
                    .map((i, _) => {
                        let p = i.split(';')
                        return new City(parseInt(p[15]),
                            p[6],
                            new Province(
                                p[11],
                                p[14],
                                new Region(parseInt(p[0]), p[10],
                                    new Area(parseInt(p[8]), p[9]))
                            ),
                            p[13]!.at(0) == '1',
                            p[19])
                    })
                    .filter(c => c.id)
            }
            catch (e) {
                console.log("loadCities", e)
                return []
            }
    }

    private citiesSorter = (a: City, b: City): number => {
        let ps = this.provincesSorter(a.province, b.province)
        if (ps == 0)
            return a.name < b.name ? -1 : a.name == b.name ? 0 : 1
        return ps
    }
    private provincesSorter(a: Province, b: Province): number {
        return a.acronym < b.acronym ? -1 : a.acronym == b.acronym ? 0 : 1
    }

    findAll = async (): Promise<Array<City>> => (await this.cities()).sort(this.citiesSorter)

    findAllByProvince = async (acronym: string): Promise<Array<City>> =>
        (await this.cities())
            .filter(c => c.province.acronym == acronym)
            .sort(this.citiesSorter)

    findAllProvinces = async (): Promise<Array<Province>> => {
        const set = new Map<string, Province>();
        (await this.cities())
            .map(c => c.province)
            .forEach(p => set.set(p.acronym, p))
        return [...set.values()]
    }
}

export { ICityService, CsvCityService, City, Province, Region, Area }