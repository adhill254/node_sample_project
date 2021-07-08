const responseCodes = require('./responseCodes');

const buildErrorResponse = (err) => {
    return {
        name: err.name || 'Internal Server Error',
        statusCode: err.statusCode || responseCodes.INTERNAL_SERVER_ERROR,
        message: err.message || '',
        ...err.data,
    };
}

const success = (res, data) => {
    res
        .status(responseCodes.SUCCESS)
        .send(data);
};

const error = (res, err) => {
    const errResponse = buildErrorResponse(err);
    res
        .status(err.statusCode)
        .send(errResponse);
};

const internalFunctions = {
    success,
    buildErrorResponse,
};

const sendResponse = (res, serviceOutput) => {
    if (serviceOutput.error) {
        // Send an error response
        error(res, serviceOutput.error);
        return false;
    }
    // Send successful response with data
    success(res, serviceOutput.data);
    return true;
};

module.exports = {
    ...internalFunctions,
    error,
    sendResponse,
};