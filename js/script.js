import { stats } from "./stats.js";
import { makeBuildingsAppear } from "./buildings.js";
const clicker = document.getElementById("clicker");
const clicksDisplay = document.getElementById("clicks");
const clicksPerSecondDisplay = document.getElementById("clicksPerSecond")
const updateDisplay = () => {
    clicksDisplay.textContent = stats.clicks.toFixed(2);
    clicksPerSecondDisplay.textContent = stats.clicksPerSecond.toFixed(2);
    makeBuildingsAppear()

}

const addClicks = () => {
    stats.clicks += stats.amountPerClick;
    stats.totalClicks += stats.amountPerClick;
    updateDisplay();
}
let clicksPerSecondInterval = 1000;

const addClicksPerSecond = () => {
    if (clicksPerSecondInterval === 1000) {
        clicksPerSecondInterval = setInterval(() => {
            stats.clicks += stats.clicksPerSecond;
            stats.totalClicks += stats.clicksPerSecond;
            updateDisplay();
        }, 1000)
    }
}
clicker.addEventListener("click", addClicks);
updateDisplay()

export {updateDisplay, clicksDisplay, clicksPerSecondDisplay, addClicksPerSecond}