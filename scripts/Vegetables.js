import { setSelectedVegg, getTransientState, convertToUSD } from "./transientState.js"

const handleVeggChoiceChange = (changeEvent) => {
    if (changeEvent.target.name === "veggChoice") {
        const convertedINT = parseInt(changeEvent.target.value)
        setSelectedVegg(convertedINT)
    }
}

export const veggies = async () => {
    const veggies = await fetch("http://localhost:8088/vegetables")
    const veggArray = await veggies.json()
    const transientState = getTransientState()

    let html = "<ol class='options'>"
    for (const veggie of veggArray){
        (veggie.id == transientState.selectedVeggId) ?
            (html += `<div><input checked type='radio' name='veggChoice' value='${veggie.id}' /> ${veggie.name} : ${convertToUSD(veggie.price)}</div>`) :
            (html += `<div><input type='radio' name='veggChoice' value='${veggie.id}' /> ${veggie.name} : ${convertToUSD(veggie.price)}</div>`)
    }
    html += "</ol>"
    document.addEventListener("change", handleVeggChoiceChange)
    return html
}