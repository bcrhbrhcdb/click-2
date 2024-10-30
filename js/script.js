import { stats } from "./stats.js";
import { makeBuildingsAppear, updateBuildingDisplay } from "./buildings.js";

const clicker = document.getElementById("clicker");
const clicksDisplay = document.getElementById("clicks");
const clicksPerSecondDisplay = document.getElementById("clicksPerSecond");

const TICKS_PER_SECOND = 20;
const TICK_INTERVAL = 1000 / TICKS_PER_SECOND;
let lastTickTime = 0;

const updateDisplay = () => {
    clicksDisplay.textContent = stats.clicks.toFixed(2);
    clicksPerSecondDisplay.textContent = stats.clicksPerSecond.toFixed(2);
}

const updateGame = (currentTime) => {
    if (currentTime - lastTickTime >= TICK_INTERVAL) {
        // Perform tick update
        const ticksPassed = Math.floor((currentTime - lastTickTime) / TICK_INTERVAL);
        
        // Add clicks from per-second sources
        const clicksToAdd = (stats.clicksPerSecond / TICKS_PER_SECOND) * ticksPassed;
        stats.clicks += clicksToAdd;
        stats.totalClicks += clicksToAdd;

        updateDisplay();
        updateBuildingDisplay();
        makeBuildingsAppear();

        lastTickTime = currentTime;
    }

    requestAnimationFrame(updateGame);
}

const addClicks = () => {
    stats.clicks += stats.amountPerClick;
    stats.totalClicks += stats.amountPerClick;
    updateDisplay();
    makeBuildingsAppear(); // Check for new buildings immediately after a click
}

clicker.addEventListener("click", addClicks);

// Start the game loop
requestAnimationFrame(updateGame);

export { updateDisplay, clicksDisplay, clicksPerSecondDisplay, updateGame };