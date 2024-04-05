import { setSelectedSide, getTransientState, convertToUSD } from "./transientState.js"

const handleVeggChoiceChange = (changeEvent) => {
    if (changeEvent.target.name === "sideChoice") {
        const convertedINT = parseInt(changeEvent.target.value)
        setSelectedSide(convertedINT)
    }
}

export const sides = async () => {
    const sides = await fetch("http://localhost:8088/sides")
    const sidesArray = await sides.json()
    const transientState = getTransientState()

    let html = "<ol class='options'>"
    for (const side of sidesArray){
        (side.id == transientState.selectedSideId) ?
            (html += `<div><input checked type='radio' name='sideChoice' value='${side.id}' /> ${side.name} : ${convertToUSD(side.price)}</div>`) :
            (html += `<div><input type='radio' name='sideChoice' value='${side.id}' /> ${side.name} : ${convertToUSD(side.price)}</div>`)
    }
    html += "</ol>"
    document.addEventListener("change", handleVeggChoiceChange)
    return html
}