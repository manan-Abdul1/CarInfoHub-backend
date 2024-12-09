const Car = require("../models/carSchema");

const addCar = async (carData) => {
    try {
        const car = new Car(carData);
        const savedCar = await car.save();
        return savedCar;
    } catch (error) {
        throw new Error(`Failed to create car entry: ${error.message}`);
    }
};

const fetchCarsByUserId = async (userId) => {
    try {
        const cars = await Car.find({ userId });
        return cars;
    } catch (error) {
        throw new Error(`Failed to fetch cars by user ID: ${error.message}`);
    }
};

const deleteCarById = async (carId) => {
    try {
        const car = await Car.findById(carId);
        if (!car) {
            throw new Error("Car not found");
        }

        await Car.findByIdAndDelete(carId);

        return { message: "Car deleted successfully" };
    } catch (error) {
        throw new Error(error.message || "Failed to delete car");
    }
};

module.exports = { addCar, fetchCarsByUserId, deleteCarById };
