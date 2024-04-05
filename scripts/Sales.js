import {convertToUSD} from "./transientState.js"

export const sales = async () => {

    // ADD EXPAND FUNCTIONALITY
    const sales = await fetch("http://localhost:8088/sales?_expand=entrees&_expand=vegetables&_expand=sides")
    const salesArray = await sales.json()
    
    let salesHTML = "<ol>";

    let stringHTML = salesArray.map((x) => `<div>Receipt ID: ${x.id} : ${convertToUSD(x.price)} : ${x.entrees.name}, ${x.vegetables.name}, ${x.sides.name}</div>`);
    
    salesHTML += stringHTML.join('');
    
    salesHTML += "</ol>";

    return salesHTML
}