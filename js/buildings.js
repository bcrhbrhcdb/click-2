import { stats } from "./stats.js";
import { updateDisplay, clicksPerSecondDisplay, addClicksPerSecond } from "./script.js";

const buildingArea = document.getElementById("buildings");

const buildingTypes = {
    PASSIVE: (building) => {
        stats.clicksPerSecond += building.gives;
        addClicksPerSecond(); // This will start the interval if it's not already running
        updateDisplay();
    }
}

export const buildings = [
    {
        id: "1",
        name: "Auto Clicker",
        cost: 20,
        increaseCost: 1.15,
        gives: 0.25,
        description: `Gives 0.25 clicks per second.`,
        type: buildingTypes.PASSIVE,
    }
]

// Make buildings appear
const makeBuildingsAppear = () => {
    buildings.forEach((building) => {
        if (stats.totalClicks >= building.baseCost && !document.getElementById(building.id)) {
            const buildingButton = document.createElement("button");
            buildingButton.className = "building";
            buildingButton.id = building.id;
            buildingButton.innerHTML = `
                ${building.name}
                Cost: ${building.cost}
                Gives: ${building.gives}
                ${building.description}
            `;
            buildingButton.addEventListener('click', () => {
                if (stats.clicks >= building.cost) {
                    stats.clicks -= building.cost;
                    building.cost *= building.increaseCost;
                    building.type(building);
                    updateBuildingDisplay();
                    updateDisplay();
                }
            });
            buildingArea.appendChild(buildingButton);
        }
    });
    updateDisplay();
}

const updateBuildingDisplay = () => {
    buildings.forEach((building) => {
        const button = document.getElementById(building.id);
        if (button) {
            button.innerHTML = `
                ${building.name}
                Cost: ${building.cost}
                Gives: ${building.gives}
                ${building.description}
            `;
        }
    });
}

export { makeBuildingsAppear }