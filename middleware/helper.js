// responseHelper.js

// Success Response
const successResponse = (data) => {
    return {
        "STATUS": "SUCCESSFUL",
        "Db_Data": data,
    };
};

// Error Response
const errorResponse = (code, description, filter = "") => {
    return {
        "STATUS": "ERROR",
        "ERROR_CODE": code,
        "ERROR_DESCRIPTION": description,
        "ERROR_FILTER": filter,
    };
};

module.exports = {
    successResponse,
    errorResponse,
};
