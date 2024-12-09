const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const createUser = async (userData) => {
    try {
        const { firstName, lastName, email, password } = userData;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return newUser;
    } catch (error) {
        throw new Error(error.message || "Error creating user");
    }
};

const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User does not exist!");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Enter the correct password");
        }

        return user;
    } catch (error) {
        throw new Error(error.message || "Error authenticating user");
    }
};

module.exports = { createUser, authenticateUser };
