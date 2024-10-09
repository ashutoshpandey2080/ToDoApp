// Define common HTTP status codes for consistent use throughout the application
export const statusCodes = {
    OK: 200,  // Request was successful
    CREATED: 201,  // Resource was successfully created
    BAD_REQUEST: 400,  // The request was invalid or cannot be processed
    NOT_FOUND: 404,  // The requested resource could not be found
    INTERNAL_SERVER_ERROR: 500,  // An error occurred on the server
    UNAUTHORIZED: 401  // Authentication is required or has failed
};
