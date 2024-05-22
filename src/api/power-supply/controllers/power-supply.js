'use strict';

/**
 * power-supply controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::power-supply.power-supply');
