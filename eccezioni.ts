function arrayManage(a: number[]) {
    try {
        console.log("Inizio a gestire l'array")
        if (a[2])
            console.log(a[2])
        else {
            console.log("Impossibile accedere ad a[2]")
            throw "Impossibile continuare"
        }
    }
    finally {
        console.log("Questa istruzione è indispensabile, quindi deve essere eseguita in ogni caso")
    }
}

function test() {
    try {
        arrayManage([1, 2, 3])
        console.log("Se vedi questo messaggio tutto è andato bene")
    }
    catch (e) {
        console.log("Secondo me questo messaggio non viene visualizzato")
    }
    try {
        arrayManage([1, 2])
        console.log("Se vedi questo messaggio tutto è andato bene")
    } catch (e) {
        console.log("Cerco di porre rimedio all'errore seguente")
        console.log(e)
    }
    finally {
        
    }
}

test()