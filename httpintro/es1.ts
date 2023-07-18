export class Name {
    public constructor(
        public title: string,
        public first: string,
        public last: string
    ) { }
}
export class Street {
    public constructor(
        public number: number,
        public name: string
    ) { }
}
export class Coordinates {
    public constructor(
        public latitude: string,
        public longitude: string
    ) { }
}
export class TimeZone {
    public constructor(
        public offset: string,
        public description: string
    ) { }
}
export class Location {
    public constructor(
        public street: Street,
        public city: string,
        public state: string,
        public country: string,
        public postcode: number,
        public coordinates: Coordinates,
        public timezone: TimeZone
    ) { }
}
export class DateOfBirth {
    public constructor(
        public date: Date,
        public age: number
    ) { }
}
export class Data {
    public constructor(
        public gender: string,
        public name: Name,
        public location: Location,
        public email: string,
        public dob: DateOfBirth
    ) { }
}
export class Results {
    public constructor(public results: Array<Data>) { }
}

export interface IDataService {
    getData(requestCount: number): Promise<Results>
}

export class DataService implements IDataService {
    public constructor(private url: string) { }

    public getData = async (requestCount: number): Promise<Results> => {
        return (await fetch(`${this.url}?results=${requestCount}`)).json()
    }
}

export const calculateGenderStatistics = async (service: IDataService) => {
    const data = (await service.getData(1000)).results
    const size = data.length
    const males = data.filter(d => d.gender == "male").length
    const females = size - males
    const mp = (males / size) * 100
    const fp = (females / size) * 100
    console.log("Totale utenti generati:", size)
    console.log("Totale uomini:", males, `${mp.toFixed(2)}%`)
    console.log("Totale donne:", females, `${fp.toFixed(2)}%`)
}

export const calculateMexicoStatistics = async (service: IDataService) => {
    const data = (await service.getData(1000)).results
    const size = data.length
    const mex = data.filter(d => d.location.country.toLowerCase() == "mexico").length
    const mp = (mex / size) * 100
    console.log("Totale utenti generati:", size)
    console.log("Totale messicani:", mex, `${mp.toFixed(2)}%`)
}

const service = new DataService('https://randomuser.me/api')
//calculateGenderStatistics(service)
calculateMexicoStatistics(service)