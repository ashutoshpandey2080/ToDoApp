import { validationResult } from "express-validator";  // Import function to handle validation results from express-validator
import { jsonGenerate } from "../utils/helper.js";  // Import utility function for generating JSON responses
import { statusCodes } from "../utils/constants.js";  // Import status codes for consistent response codes
import bcrypt from "bcrypt";  // Import bcrypt to hash passwords
import User from "../models/user.js";  // Import User model to interact with the users collection in MongoDB
import JWT from "jsonwebtoken";  // Import JSON Web Token for generating authentication tokens

// Controller for handling user registration
const Register = async (req, res) => {

    // Validate request data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If validation fails, send a 400 Bad Request with the validation errors
        return res.send(jsonGenerate(statusCodes.BAD_REQUEST, "Validation Error", errors.array()));
    }

    // Destructure fields from the request body
    const { username, email, password, name } = req.body;

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if a user with the same username or email already exists
    const userExists = await User.findOne({ $or: [
        { username: username },
        { email: email }
    ]});
    if (userExists) {
        // If the user or email already exists, send a 400 Bad Request response
        return res.send(jsonGenerate(statusCodes.BAD_REQUEST, "User or Email Already Exists", null));
    }

    try {
        // Save the new user to the database
        const user = await new User({
            username: username,
            email: email,
            password: hashedPassword,  // Store the hashed password, not the plain one
            name: name
        });
        await user.save();

        // Generate a JWT token for authentication
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Return a successful registration response with the user data and token
        return res.send({
            status: statusCodes.OK,
            message: "User Registered Successfully",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                password: user.password
            },
            token,
        });
    } catch (err) {
        // Handle errors and return a 500 Internal Server Error response
        console.log(err);
        return res.send(jsonGenerate(statusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error", err));
    }
};

export default Register;  // Export the Register controller