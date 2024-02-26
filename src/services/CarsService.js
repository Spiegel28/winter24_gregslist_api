import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class CarsService {


  async getCars() {
    // NOTE dbContext allows us to communicate with our database. Cars is the collection in our database we are accessing. find is the mongoose method to query and retrieve data from our collection. If you don't pass an argument to find, it returns all "documents" from the database. find also returns an array
    const cars = await dbContext.Cars.find()
    return cars
  }
  async createCar(carData) {
    // NOTE create will add a document to our database using a javascript object. in this case, we pass through the request body and mongoose uses our schema for validation. create returns the newly created piece of data with additional properties (_id, createdAt, __v, etc)
    const car = await dbContext.Cars.create(carData)
    return car
  }

  async getCarById(carId) {
    // NOTE findById is the mongoose method that will find a document by it's _id and return it. If it does not find a document by that id, it returns null
    const car = await dbContext.Cars.findById(carId)

    // NOTE if car is null, the client supplied a bad id
    if (!car) {
      throw new BadRequest(`No car found with id of ${carId}`)
    }

    return car
  }

  async updateCar(carId, carData) {
    // const car = await dbContext.Cars.findByIdAndUpdate(carId, carData)

    // const carToUpdate = dbContext.Cars.findById(carId)

    // NOTE we call the method already set up in our service, which has the benefit of also null checking the car before returning it
    const carToUpdate = await this.getCarById(carId)

    // carToUpdate.make = carData.make


    // NOTE if the request body does not have a value for imgUrl, we default to value already stored in the database
    carToUpdate.imgUrl = carData.imgUrl || carToUpdate.imgUrl

    // NOTE we check to see if price is undefined and run a ternary, otherwise the price cannot be set to 0
    carToUpdate.price = carData.price == undefined ?
      carToUpdate.price
      :
      carData.price

    // NOTE we check to see if hasSalvagedTitle is undefined here, otherwise the property cannot be set to false
    carToUpdate.hasSalvagedTitle = carData.hasSalvagedTitle == undefined ?
      carToUpdate.hasSalvagedTitle
      :
      carData.hasSalvagedTitle

    // NOTE method to update the value stored in the database
    await carToUpdate.save()

    return carToUpdate
  }

  async destroyCar(carId) {
    // await dbContext.Cars.findByIdAndDelete(carId)
    const carToDestroy = await this.getCarById(carId)

    // NOTE method to remove the value from the database
    await carToDestroy.deleteOne()

    return `${carToDestroy.make} ${carToDestroy.model} has been destroyed!`
  }

}

export const carsService = new CarsService()