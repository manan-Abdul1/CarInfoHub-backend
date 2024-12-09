const { addCar, deleteCarById, fetchCarsByUserId } = require("../services/carService");

const createCar = async (req, res) => {
    try {
        const carData = req.body;

        const newCar = await addCar(carData);

        res.status(201).json({
            ok: true,
            message: "Car entry created successfully",
            car: newCar,
        });
    } catch (error) {
        console.error(`Error in createCar: ${error.message}`);
        res.status(500).json({
            ok: false,
            message: error.message || "Internal server error",
        });
    }
};

const getCarsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const cars = await fetchCarsByUserId(userId);

        res.status(200).json({
            ok: true,
            cars,
        });
    } catch (error) {
        console.error(`Error in getCarsByUserId: ${error.message}`);
        res.status(500).json({
            ok: false,
            message: error.message || "Internal server error",
        });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { carId } = req.params;

        const result = await deleteCarById(carId);

        res.status(200).json({
            message: result.message,
            ok: true,
        });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: error.message || "Internal server error", ok: false });
    }
};

module.exports = { createCar, getCarsByUserId, deleteCar };
