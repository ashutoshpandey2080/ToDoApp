// Utility function to generate a standardized JSON response
export const jsonGenerate = (statusCode, message, data) => {
    return {
        statusCode,  // The HTTP status code for the response
        message,     // A descriptive message for the response
        data         // The data being returned (could be user info, error details, etc.)
    };
};
