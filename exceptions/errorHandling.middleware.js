const MissingDataException = require('../exceptions/missingData.exception');
const InvalidParamException = require('../exceptions/invalidParam.exception');
const NotsufficientDataException = require('../exceptions/notSufficientData.exception');
const MissingParamException = require('../exceptions/missingParam.exception');
const InvalidPartnerException = require('../exceptions/invalidPartner.exception');
const InvalidCreds = require('../exceptions/invalidCreds.exception');

exports.errorHandlingMiddleware = (error, request, response, next) => {
  try {
    if (
      error instanceof InvalidParamException ||
      error instanceof NotsufficientDataException ||
      error instanceof InvalidPartnerException ||
      error instanceof MissingParamException
    ) {
      return response.status(400).json({
        error: {
          code: error.code,
          message: error.message,
        },
        success: false,
      });
    }
    console.log("error instanceof InvalidCreds",error)
    if(error instanceof InvalidCreds){
        return response.status(401).json({
            error: {
              code: error.code,
              message: error.message,
            },
            success: false,
          });
    }
    if(error instanceof MissingDataException){
      return response.status(404).json({
        error: {
          code: error.code,
          message: error.message,
        },
        success: false,
      });
    }
        // elif instance of NotFound
    return response.status(500).json({
      error: {
        code: 'INT_SERVER_CODE',
        message: 'Oops! Something went wrong',
      },
      success: false,
    });
  } catch (ex) {
    console.log(`error handling middleware catch block error ${JSON.stringify(ex)}`);
    return response.status(500).json({
      error: {
        code: 'INT_SERVER_CODE',
        message: 'Oops! Something went wrong',
      },
      success: false,
    });
  }
};
