import { dbContext } from "../db/DbContext.js"

class HouseService {

    async getHouses() {
        const houses = await dbContext.Houses.find()
        return houses
    }

    async createHouse(data) {
        const house = await dbContext.Houses.create(data)
        return house
}
}

export const houseService = new HouseService()