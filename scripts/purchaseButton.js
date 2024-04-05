import { getTransientState } from "./transientState.js"



const handleComboPurchase = async (clickEvent) => {
    if (clickEvent.target.id === "purchase") {
        postComboPurchase()
    }
}

export const purchaseButton = () => {
    document.addEventListener("click", handleComboPurchase)
    return `<button id="purchase">Purchase Combo</button>`
}

const postComboPurchase = async () => {
    const transientState = getTransientState();
    if ((transientState.selectedEntreeId != 0) &&
        (transientState.selectedSideId != 0) &&
        (transientState.selectedVeggId != 0)) {
        const transientState = getTransientState()
        let constructedOrder = {"entreesId":transientState.selectedEntreeId, 
                                "vegetablesId":transientState.selectedVeggId, 
                                "sidesId":transientState.selectedSideId, 
                                "price":transientState.comboPrice}


        await fetch("http://localhost:8088/sales/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(constructedOrder)
            })
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }
}