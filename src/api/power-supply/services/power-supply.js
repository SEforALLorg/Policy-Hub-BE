'use strict';

/**
 * power-supply service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::power-supply.power-supply');
