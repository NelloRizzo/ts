import { City } from "../cityservice/cityservice";

class PersonalData {
    constructor(
        public firstName: string,
        public lastName: string,
        public dob: Date,
        public isMale: boolean,
        public birthCadastral: string,
        public fiscalCode?: string
    ) { }
}

interface IFiscalCodeService {
    get(data: PersonalData): PersonalData
}


class ConsonantsVowels {
    public consonants: string = ""
    public vowels: string = ""

    public constructor(text: string) {
        text = text.toUpperCase()
        for (let i = 0; i < text.length; ++i) {
            let ch = text.charAt(i)
            if (ch >= 'A' && ch <= 'Z') {
                if ("AEIUO".indexOf(ch) < 0)
                    this.consonants += ch
                else
                    this.vowels += ch
            }
        }
    }
}

function handleLastName(l: string): string {
    let cv = new ConsonantsVowels(l)
    let [c, v] = [cv.consonants, cv.vowels]
    return `${c}${v}XXX`.substring(0, 3)
}
function handleFirstName(f: string): string {
    let cv = new ConsonantsVowels(f)
    let [c, v] = [cv.consonants, cv.vowels]
    if (c.length > 3) c = c[0] + c.substring(2)
    return `${c}${v}XXX`.substring(0, 3)
}
function handleBirthday(bd: Date, male: boolean): string {
    let [y, m, d] = [bd.getFullYear(), bd.getMonth(), `00${bd.getDate() + (male ? 0 : 40)}`.slice(-2)]
    return `${y % 100}${"ABCDEHLMPRST"[m]}${d}`
}
function calculateCheckCode(fc: string): string {
    const ODDS = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23]
    const ZERO = '0'.charCodeAt(0)
    const A = 'A'.charCodeAt(0)
    let sum: number = 0
    for (let i = 0; i < 15; ++i) {
        let ch = fc.charAt(i)
        let depl = ch.charCodeAt(0) - (ch >= '0' && ch <= '9' ? ZERO : A)
        sum += i % 2 == 0 ? ODDS[depl] : depl
    }
    return String.fromCharCode(sum % 26 + A)
}
class FiscalCodeService implements IFiscalCodeService {
    get = (data: PersonalData): PersonalData => {
        const fc = handleLastName(data.lastName) +
            handleFirstName(data.firstName) +
            handleBirthday(data.dob, data.isMale) +
            data.birthCadastral
        data.fiscalCode = `${fc}${calculateCheckCode(fc)}`
        return data
    }
}

const serviceFactory = () => new FiscalCodeService()

export { PersonalData, IFiscalCodeService, serviceFactory }