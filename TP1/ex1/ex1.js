mots = prompt("Entrez quelque chose: ")
document.getElementById("elm").innerHTML = mots

const element = document.createElement("p")
element.innerText= mots
document.body.appendChild(element)