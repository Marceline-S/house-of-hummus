import { setSelectedEntree, getTransientState, convertToUSD, setComboPrice } from "./transientState.js"

const handleEntreeChoiceChange = (changeEvent) => {
    if (changeEvent.target.name === "entreeChoice") {
        const convertedINT = parseInt(changeEvent.target.value)
        setSelectedEntree(convertedINT)
    }
}

export const entrees = async () => {
    const entrees = await fetch("http://localhost:8088/entrees")
    const entreeArray = await entrees.json()
    const transientState = getTransientState()

    let html = "<ol class='options'>"
    for (const entree of entreeArray){
        (entree.id == transientState.selectedEntreeId) ?
            (html += `<div><input checked type='radio' name='entreeChoice' value='${entree.id}' /> ${entree.name} : ${convertToUSD(entree.price)}</div>`) :
            (html += `<div><input type='radio' name='entreeChoice' value='${entree.id}' /> ${entree.name} : ${convertToUSD(entree.price)}</div>`)
    }
    html += "</ol>"
    document.addEventListener("change", handleEntreeChoiceChange)
    return html
}