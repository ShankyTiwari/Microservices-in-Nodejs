/* eslint-disable class-methods-use-this */
const helper = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');

class RouteHandler {
  async getProductDetailHandler(request, response) {
    const { productId } = request.params;
    if (productId === '') {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PRODUCTID_NOT_FOUND,
      });
    } else {
      try {
        const productDetails = await helper.getProductDetail(productId.trim());
        if (productDetails === undefined) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            details: CONSTANTS.PRODUCT_DETAIL_FAILED,
          });
        } else {
          response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            details: productDetails,
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

  async getProductsRouteHandler(request, response) {
    try {
      const productDetails = await helper.getProducts();
      if (productDetails === undefined) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          details: CONSTANTS.PRODUCT_DETAIL_FAILED,
        });
      } else {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
          error: false,
          details: productDetails,
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
