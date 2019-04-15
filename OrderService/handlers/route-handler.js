/* eslint-disable class-methods-use-this */
const helper = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');

class RouteHandler {
  async createOrderRouteHandler(request, response) {
    const { productId } = request.body;
    const { userId } = request.body;
    if (productId === '') {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PRODUCTID_NOT_FOUND,
      });
    } else if (userId === '') {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERID_NOT_FOUND,
      });
    } else {
      try {
        const orderId = await helper.createOrder(userId.trim(), productId.trim());
        if (orderId === undefined || orderId === null) {
          response.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({
            error: true,
            details: CONSTANTS.SERVER_ERROR_MESSAGE,
          });
        } else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            orderId,
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

  async getOrdersRouteHandler(request, response) {
    try {
      const orders = await helper.getOrders();
      if (orders === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          details: CONSTANTS.ORDER_DETAIL_FAILED,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          details: orders,
        });
      }
    } catch (error) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.SERVER_ERROR_MESSAGE,
      });
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
