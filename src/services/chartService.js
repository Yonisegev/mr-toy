import { toyService } from "./toyService";
export const chartService = {
    getAvgPriceData 
};

async function getAvgPriceData() {
    try {
        const toys = await toyService.query()
        const toyTypePriceSumMap = toys.reduce((acc, toy) => {
            if (!acc[toy.type]) acc[toy.type] = 0
            acc[toy.type] += toy.price
            return acc
        }, {})

        const toyTypeCountMap = toys.reduce((acc, toy) => {
            if (!acc[toy.type]) acc[toy.type] = 0
            acc[toy.type]++
            return acc
        }, {})

        for (let type in toyTypePriceSumMap) {
            toyTypePriceSumMap[type] = +((toyTypePriceSumMap[type] / toyTypeCountMap[type]).toFixed(0))
        }

        return toyTypePriceSumMap

    } catch (err) {
        console.log('Can not get data for charts');
    }
};


