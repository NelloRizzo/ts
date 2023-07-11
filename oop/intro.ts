class Person {
    constructor(public name: string, 
        public surname: string) { }
}

function handlePerson(person: Person): void {
    person.name = person.name.toUpperCase()
    console.log("handlePerson", person)
}

let p = new Person("Archimede", "Pitagorico")
let pp = new Person("Pico", "De' Paperis")
console.log(p)
console.log(p.name)
console.log(pp.name)
handlePerson(p)
console.log(p)

let p1: Person = {'name': 'Paperon', surname: "De' Paperoni"}
handlePerson(p1)

