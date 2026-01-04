const prix = prompt("Entrer le prix HT :")
const prixFinal = Number(prix) * 1.2

document.body.innerHTML = `<p>${prixFinal}</p>`
