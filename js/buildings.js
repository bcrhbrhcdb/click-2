import { stats } from "./stats.js"
import { updateDisplay } from "./script.js";
const buildingTypes = {
    PASSIVE: (building)=>{
        setTimeout(()=>{
            stats.clicks += building.gives;
            
        })
    }
}


export const buildings = [
    {
        name: "Auto Clicker",
        cost: 20,
        baseCost: 20,
        gives: 0.2,
        type: buildingTypes.PASSIVE,

    }
]