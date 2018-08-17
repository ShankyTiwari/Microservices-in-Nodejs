/*
* Building Micro Services in Nodejs
* @author Shashank Tiwari
*/
'use strict';

/* Validation related  constants starts*/
module.exports.PRODUCTID_NOT_FOUND = `Product Id can't be empty.`;
module.exports.USERID_NOT_FOUND = `User Id can't be empty.`;
/* Validation related  constants ends*/

/* General Errors  constants start */
module.exports.ROUTE_NOT_FOUND = `You are at wrong place. Shhoooo...`;
module.exports.SERVER_ERROR_MESSAGE = `Something bad happend. It's not you, it's me.`;

/* HTTP status code constant starts */
module.exports.SERVER_ERROR_HTTP_CODE = 412;
module.exports.SERVER_NOT_ALLOWED_HTTP_CODE = 503;
module.exports.SERVER_OK_HTTP_CODE = 200;
module.exports.SERVER_NOT_FOUND_HTTP_CODE = 404;
module.exports.SERVER_INTERNAL_ERROR_HTTP_CODE = 500;
/* HTTP status codeconstant ends */

/* Route related constants starts*/
module.exports.ORDER_DETAIL_FAILED = `No order found.`;
/* Route related constants ends*/
