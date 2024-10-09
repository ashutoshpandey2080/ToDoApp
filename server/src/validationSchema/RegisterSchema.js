import { check } from "express-validator";  // Import the 'check' function from express-validator to validate request fields

// express-validator provides middleware to validate and sanitize incoming request data using a set of validator methods
// check() is used to specify the field to validate and apply validation rules

/*
Key Points:
- Array Syntax: Validators for the fields are organized in an array, which is used as middleware.
- Chaining: Validation methods are chained for each field, applying multiple checks on the same input.
*/

export const RegisterSchema = [
    // Validating the "name" field
    check("name")
        .exists().withMessage("Name is Mandatory")  // Ensures the field exists in the request
        .trim()  // Removes leading/trailing spaces
        .isAlpha().withMessage("Name must be alphabetic."),  // Ensures the name contains only alphabetic characters

    // Validating the "username" field
    check("username", "username is mandatory")
        .exists()  // Ensures the username field exists
        .isAlphanumeric().withMessage("Username must be alphanumeric only.")  // Ensures it only contains letters and numbers
        .trim()  // Removes extra spaces
        .isLength({min: 6, max: 32}).withMessage("Username must be between 6 to 32 characters."),  // Checks length of username

    // Validating the "password" field
    check("password", "password is mandatory")
        .exists()  // Ensures the password field exists
        .isLength({min: 8, max: 32}).withMessage("Password must be between 8 to 32 characters.")  // Checks the length of password
        .isStrongPassword().withMessage("Password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character and must be 8 characters long.")  // Ensures password strength
        .trim(),  // Removes leading/trailing spaces

    // Validating the "email" field
    check("email", "email is mandatory")
        .exists()  // Ensures the email field exists
        .isEmail().withMessage("Email must be valid.")  // Validates the email format
];
