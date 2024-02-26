import { houseService } from "../services/HouseService.js";
import BaseController from "../utils/BaseController.js";

export class HouseController extends BaseController {
constructor () {
    super('api/houses')
    this.router
    .get('', this.getHouses)
    .post('', this.createHouse)

}

/** STUB
   * Sends all values back to the client
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
async getHouses(request, response, next) {
    try {
        const houses = await houseService.getHouses()
        response.send(houses)
    } catch (error) {
        next(error)
    }
}

   /** STUB
* Sends all values back to the client
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
async createHouse(request, response, next) {
    try {
        const data = request.body
        const house = await houseService.createCar(data)
        response.send(house)
    } catch (error) {
        next(error)
    }
}
}