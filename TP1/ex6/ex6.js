const prix = prompt("Entrer le prix HT :")
const TVA = prompt("Entrer le pourcentage TVA :")
const prixFinal = Number(prix) * (Number(TVA) / 100 + 1)

if (prixFinal < 100) {
  document.body.innerHTML = `<p style="color:green">${prixFinal}</p>`
} else {
  document.body.innerHTML = `<p style="color:red">${prixFinal}</p>`
}