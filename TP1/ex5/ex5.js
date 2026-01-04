const prix = prompt("Entrer le prix HT :")
const TVA = prompt("Entrer le pourcentage TVA :")
const prixFinal = Number(prix) * (Number(TVA) / 100 + 1)

document.body.innerHTML = `<p>${prixFinal}</p>`
