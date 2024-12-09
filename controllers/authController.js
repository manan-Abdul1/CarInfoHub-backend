const { createUser, authenticateUser } = require("../services/userService");

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const userData = { firstName, lastName, email, password };

        const newUser = await createUser(userData);
        res.status(201).json({
            message: "User registered successfully",
            ok: true,
            user: {
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            },
        });
    } catch (error) {
        console.error(`Error in signup controller: ${error.message}`);
        res.status(500).json({
            message: error.message || "An error occurred during user signup.",
            ok: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authenticateUser(email, password);

        res.status(200).json({
            ok: true,
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (error) {
        console.error(`Error in login controller: ${error.message}`);
        res.status(401).json({
            message: error.message || "An error occurred during login.",
            ok: false,
        });
    }
};

module.exports = { signup, login };
