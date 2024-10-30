import { stats } from "./stats.js";

const clicker = document.getElementById("clicker");
const buildingArea = document.getElementById("buildings");
const clicksDisplay = document.getElementById("clicks");
export const clicksPerSecondDisplay = document.getElementById("clicksPerSecond")
const updateDisplay = () => {
    clicksDisplay.textContent = stats.clicks.toFixed(2);
}

const addClicks = () => {
    stats.clicks += stats.amountPerClick;
    stats.totalClicks += stats.amountPerClick;
    updateDisplay();
}
const addClicksPerSecond =()=>{
    setTimeout(()=>{
        stats.clicks += stats.clicksPerSecond;
        updateDisplay()
    }, 1000)
}
clicker.addEventListener("click", addClicks);
updateDisplay()

export {updateDisplay}