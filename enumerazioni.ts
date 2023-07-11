enum Gender { Male = 'm', Female = 'f' }
enum Days { Monday = 1, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday = 0 }
enum Months { Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec }
enum Semaphore { Red, Orange, Yellow, Green }
enum Colors { Red = 0xff0000, Green = 0x00ff00, Blue = 0x0000ff }

let male = Gender.Male
let female = Gender.Female

let day = Days.Friday

console.log(male, female, day)

// let c: Colors = Semaphore.Red // Colors e Semaphore sono tipi diversi!
let c: Colors = Colors.Red // Colors e Semaphore sono tipi diversi!
console.log(c)

let yellow = Colors.Green * .2 + Colors.Blue * .4
console.log(yellow)
console.log(yellow & Colors.Blue) // AND BIT A BIT | ~ >>  <<
console.log((yellow & Colors.Green) >> 8) // AND BIT A BIT

const RED = 0

let color: number = RED
let semaphore: number = RED

console.log(2 << 1)