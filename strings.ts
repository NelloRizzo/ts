let text = "Questo è un testo di esempio"

text.match(/\su/)?.forEach((i, v, x) => console.log(i, v, x))

console.log(text.replace(/\su/, '-U'))