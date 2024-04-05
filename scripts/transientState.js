




const transientState = {
    "selectedEntreeId": 0,
    "selectedSideId": 0,
    "selectedVeggId": 0,
    "comboPrice": 0.00
}

export const getTransientState = () => {
    return transientState
}

export const setSelectedEntree = (entreeId) => {
    transientState.selectedEntreeId = entreeId
    setComboPrice()
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setSelectedSide = (sideId) => {
    transientState.selectedSideId = sideId
    setComboPrice()
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setSelectedVegg = (veggId) => {
    transientState.selectedVeggId = veggId
    setComboPrice()
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const convertToUSD = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(price);
}

export const setComboPrice = async () => {
    const entrees = await fetch("http://localhost:8088/entrees")
    const entreeArray = await entrees.json()

    const vegetables = await fetch("http://localhost:8088/vegetables")
    const veggArray = await vegetables.json()

    const sides = await fetch("http://localhost:8088/sides")
    const sidesArray = await sides.json()
    
    let total = 0

    if (transientState.selectedEntreeId != 0){
        total += entreeArray[transientState.selectedEntreeId-1].price
    }

    if (transientState.selectedVeggId != 0){
        total += veggArray[transientState.selectedVeggId-1].price
    }

    if (transientState.selectedSideId != 0){
        total += sidesArray[transientState.selectedSideId-1].price
    }
    
    
    transientState.comboPrice = parseFloat(total.toFixed(2))
}

export const setComboPriceOverride = (price) => {
    transientState.comboPrice=price
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getSelectedEntree = () => {
    return transientState.selectedEntreeId
}

export const getSelectedSide = () => {
    return transientState.selectedSideId
}

export const getSelectedVegg = () => {
    return transientState.selectedVeggId
}

export const getPrice = () => {
    return transientState.comboPrice
}

