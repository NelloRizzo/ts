/*

https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json

Scrivere un servizio che converta valuta da e verso euro.
Il servizio riceve in input la sigla di una moneta da cui convertire
o verso cui convertire, legge la conversione corrente e
restituisce il valore ottenuto.

*/

export class Currency {
    public constructor(public name: string, public change: number) { }
}
class ApiResponse {
    public constructor(public date: string, public eur: Currency) { }
}

export interface IEuroConverter {
    convertFrom(currency: string, amount: number): Promise<number>
    convertTo(currency: string, amount: number): Promise<number>
}

export class EuroConverter implements IEuroConverter {
    public constructor(private url: string) { }

    private currentData?: ApiResponse

    private getRate = async (currency: string): Promise<number> => {
        const now = new Date().getTime()
        const currentDate = new Date(this.currentData?.date || 0)
        if (currentDate.getTime() < now) {
            this.currentData = await (await fetch(this.url)).json()
        }
        let key = currency as keyof Currency
        if (this.currentData && this.currentData.eur[key])
            return this.currentData.eur[key] as number
        throw `Currency "${key}" not found`
    }
    public convertFrom = async (currency: string, amount: number): Promise<number> => {
        const rate = await this.getRate(currency)
        return amount / rate
    }
    public convertTo = async (currency: string, amount: number): Promise<number> => {
        const rate = await this.getRate(currency)
        return amount * rate
    }
}

async function convert(from: string, to: string, amount: number) {
    const service = new EuroConverter("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json")
    const old = amount
    if (from != 'eur')
        amount = await service.convertFrom(from, amount)

    console.log(`${old} "${from}" to "${to}" =`, await service.convertTo(to, amount))
}

convert('usd', 'eur', 1)
convert('eur', 'usd', 1)
