/* eslint-disable class-methods-use-this */
const helper = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');

class RouteHandler {
  async getUserDetailsHandler(request, response) {
    const userid = request.params.userId;
    if (userid === '') {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERID_NOT_FOUND,
      });
    } else {
      try {
        const userDetails = await helper.getUserDetails(userid.trim());
        if (userDetails === undefined) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            details: CONSTANTS.USERNAME_DETAIL_FAILED,
          });
        } else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            details: userDetails,
          });
        }
      } catch (error) {
        response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.SERVER_ERROR_MESSAGE,
        });
      }
    }
  }

  async loginRouteHandler(request, response) {
    const data = {
      name: request.body.name === '' || request.body.name === undefined ? null : (request.body.name).trim(),
      password: request.body.password === '' || request.body.password === undefined ? null : request.body.password.trim(),
    };
    if (data.name === '' || data.name === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERNAME_NOT_FOUND,
      });
    } else if (data.password === '' || data.password === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PASSWORD_NOT_FOUND,
      });
    } else {
      try {
        const result = await helper.login(data);
        if (result === null || result === undefined) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_LOGIN_FAILED,
          });
        } else {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: false,
            userId: result,
            message: CONSTANTS.USER_LOGIN_OK,
          });
        }
      } catch (error) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
      }
    }
  }

  async registerRouteHandler(request, response) {
    const data = {
      name: request.body.name === '' || request.body.name === undefined ? null : (request.body.name).trim(),
      lastname: request.body.lastname === '' || request.body.lastname === undefined ? null : request.body.lastname.trim(),
      email: request.body.email === '' || request.body.email === undefined ? null : request.body.email.trim(),
      gender: request.body.gender === '' || request.body.gender === undefined ? null : request.body.gender.trim(),
      password: request.body.password === '' || request.body.password === undefined ? null : request.body.password.trim(),
    };
    if (data.name === '' || data.name === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERNAME_NOT_FOUND,
      });
    } else if (data.lastname === '' || data.lastname === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERLASTNAME_NOT_FOUND,
      });
    } else if (data.email === '' || data.email === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.EMAIL_NOT_FOUND,
      });
    } else if (data.gender === '' || data.gender === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PASSWORD_NOT_FOUND,
      });
    } else if (data.password === '' || data.password === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PASSWORD_NOT_FOUND,
      });
    } else {
      try {
        data.online = 'Y';
        const result = await helper.registerUser(data);
        if (result === null || result === undefined) {
          response.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({
            error: false,
            message: CONSTANTS.USER_REGISTRATION_FAILED,
          });
        } else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            userId: result.insertedId,
            message: CONSTANTS.USER_REGISTRATION_OK,
          });
        }
      } catch (error) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.SERVER_ERROR_MESSAGE,
        });
      }
    }
  }

  routeNotFoundHandler(request, response) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: CONSTANTS.ROUTE_NOT_FOUND,
    });
  }
}

module.exports = new RouteHandler();
