import { stats } from "./stats.js";
import { updateDisplay } from "./script.js";

const buildingArea = document.getElementById("buildings");

const buildingTypes = {
    PASSIVE: (building) => {
        stats.clicksPerSecond += building.gives;
        building.totalClicksGiving += building.gives;
        updateDisplay();
    },
    SCALE: (building) => {
        const effectedBuilding = buildings.find(b => b.id === building.effectedBuilding);
        if (effectedBuilding) {
            const amountOfBuildingOwned = effectedBuilding.owned || 0;
            const scaleFactor = Math.pow(building.increaseInterval, amountOfBuildingOwned);
            const newGives = building.gives * scaleFactor;
            const increase = newGives - building.totalClicksGiving;
            building.totalClicksGiving += increase;
            stats.clicksPerSecond += increase;
            building.gives = newGives; // Update the 'gives' value
        } else {
            building.totalClicksGiving += building.gives;
            stats.clicksPerSecond += building.gives;
        }
        updateDisplay();
    }
};

export const buildings = [
    {
        id: 1,
        name: "Auto Clicker",
        owned: 0,
        cost: 10,
        baseCost: 10,
        gives: 0.15,
        totalClicksGiving: 0,
        increaseCost: 1.20,
        description: `Gives 0.15 clicks per second.`,
        type: buildingTypes.PASSIVE,
    },
    {
        id: 2,
        name: "Noobling",
        owned: 0,
        cost: 75,
        baseCost: 75,
        gives: 1,
        totalClicksGiving: 0,
        increaseCost: 1.17,
        description: "Gives 1 clicks per second.",
        type: buildingTypes.PASSIVE,
    },
    {
        id: 3,
        name: "Supervisor",
        owned: 0,
        cost: 10,
        baseCost: 10,
        gives: 0.2,
        totalClicksGiving: 0,
        increaseInterval: 1.15,
        increaseCost: 1.35,
        effectedBuilding: 1,
        description: "How much this building gives scales with how many Auto Clickers you have. Starts at 0.1",
        type: buildingTypes.SCALE
    }
];

const makeBuildingsAppear = () => {
    buildings.forEach((building) => {
        if (stats.totalClicks >= building.baseCost && !document.getElementById(building.id)) {
            const buildingButton = document.createElement("button");
            buildingButton.className = "building";
            buildingButton.id = building.id;
            updateBuildingButton(building, buildingButton);
            buildingButton.addEventListener('click', () => {
                if (stats.clicks >= building.cost) {
                    stats.clicks -= building.cost;
                    building.cost *= building.increaseCost;
                    building.owned += 1;
                    building.type(building);
                    updateScaledBuildings();
                    updateBuildingDisplay();
                }
            });
            buildingArea.appendChild(buildingButton);
        }
    });
};

const updateScaledBuildings = () => {
    buildings.forEach(building => {
        if (building.type === buildingTypes.SCALE) {
            building.type(building);
        }
    });
};

const updateBuildingButton = (building, button) => {
    button.innerHTML = `
        (${building.owned})<br>
        ${building.name}<br>
        Cost: ${building.cost.toFixed(2)}<br>
        Gives: ${building.gives.toFixed(2)}<br>
        Giving: ${building.totalClicksGiving.toFixed(2)}/s <br>
        ${building.description}<br>
    `;
};

const updateBuildingDisplay = () => {
    buildings.forEach((building) => {
        const button = document.getElementById(building.id);
        if (button) {
            updateBuildingButton(building, button);
        }
    });
};

export { makeBuildingsAppear, updateBuildingDisplay };