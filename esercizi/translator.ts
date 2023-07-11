// sia dato un contesto in cui si riceve in input un numero
// si scriva un algoritmo che "traduca" il numero in lettere.
// esempio:
// INPUT: 1234 -> OUTPUT: milleduecentotrentaquattro

for (let i = 1; i <= 10000; i = i + 1) console.log(translate(i))

function translate(n: number): string {

    if (n < 20) return t20(n)
    if (n < 100) return t100(n)
    if (n < 1000) return t1000(n)
    if (n < 1000000) return t(n)
    return "overflow"

    function t(n: number): string {
        let h = Math.trunc(n / 1000)
        let t = n % 1000
        let r = h == 1 ? "mille" : `${t1000(h)}mila`
        return `${r}${t1000(t)}`
    }
    function t1000(n: number): string {
        if (n < 100) return t100(n)
        let t = Math.trunc(n / 100)
        let d = n % 100
        let r = (t == 1) ? "cento" : `${t20(t)}cento`
        return `${r}${t100(d)}`
    }
    function t100(n: number): string {
        if (n < 20) return t20(n)
        let d = Math.trunc(n / 10)
        let u = n % 10
        let r = ""
        switch (d) {
            case 2: r = "venti"
                break;
            case 3: r = "trenta"
                break;
            case 4: r = "quaranta"
                break;
            case 5: r = "cinquanta"
                break;
            case 6: r = "sessanta"
                break;
            case 7: r = "settanta"
                break;
            case 8: r = "ottanta"
                break;
            case 9: r = "novanta"
                break;
        }
        return `${r}${t20(u)}`
    }
    function t20(n: number): string {
        /*       switch (n) {
                   case 1: return "uno"
                   case 2: return "due"
                   case 3: return "tre"
                   case 4: return "quattro"
                   case 5: return "cinque"
                   case 6: return "sei"
                   case 7: return "sette"
                   case 8: return "otto"
                   case 9: return "nove"
                   case 10: return "dieci"
                   case 11: return "undici"
                   case 12: return "dodici"
                   case 13: return "tredici"
                   case 14: return "quattordici"
                   case 15: return "quindici"
                   case 16: return "sedici"
                   case 17: return "diciassette"
                   case 18: return "diciotto"
                   case 19: return "diciannove"
               }
               */
        let u: string[] = ["uno", "due", "tre", "quattro", "cinque", "sei", "sette",
            "otto", "nove", "dieci", "undici", "dodici", "tredici", "quattordici",
            "quindici", "sedici", "diciassette", "diciotto", "diciannove"]
        if (n > 0 && n < 20)
            return u[n - 1]
        return ""
    }
}