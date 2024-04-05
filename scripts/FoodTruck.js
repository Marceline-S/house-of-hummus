import { entrees } from "./Entrees.js"
import { sales } from "./Sales.js"
import { sides } from "./SideDishes.js"
import { veggies } from "./Vegetables.js"
import { convertToUSD, getTransientState } from "./transientState.js"
import {purchaseButton} from "./purchaseButton.js"

export const FoodTruck = async () => {
    const salesHTML = await sales()
    const entreeMenuHTML = await entrees()
    const veggMenuHTML = await veggies()
    const sideMenuHTML = await sides()
    const transientState = getTransientState()
    const purchaseButtonHTML = purchaseButton()

    return `
        <header class="header">
            <img src="./images/hummus.png" class="logo" />
            <h1 class="title">Laura Kathryn's House of Hummus</h1>
        </header>
        <div>${entreeMenuHTML}</div>
        <div>${veggMenuHTML}</div>
        <div>${sideMenuHTML}</div>

        <div class ="cost">Selected combo cost : ${convertToUSD(transientState.comboPrice)} </div>
        <article>
            ${purchaseButtonHTML}
        </article>

        <article class="customerOrders">
            <h2>Monthly Sales</h2>
            ${salesHTML}
        </article>

    `
}
