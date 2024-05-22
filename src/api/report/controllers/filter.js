'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::report.report', ({ strapi }) => ({
    // Method 2: Wrapping a core service (leaves core logic in place)
    async getFilters(ctx) {
        const results = {};
        const countries = await strapi.db.query('api::country.country').findMany({ orderBy: { CountryName: 'ASC' } });
        const years = await strapi.db.query('api::year.year').findMany({ orderBy: { Year: 'ASC' } });
        const generationSources = await strapi.db.query('api::generation-source.generation-source').findMany({ orderBy: { GenerationSource: 'ASC' } });
        const publishingOrganization = await strapi.db.query('api::publishing-organization.publishing-organization').findMany({ orderBy: { PublishingOrganization: 'ASC' } });
        const region = await strapi.db.query('api::region.region').findMany({ orderBy: { RegionName: 'ASC' } });
        const segment = await strapi.db.query('api::segment.segment').findMany({ orderBy: { SegmentName: 'ASC' } });
        const documentType = await strapi.db.query('api::document-type.document-type').findMany({ orderBy: { DocumentType: 'ASC' } });
        const coAuthor = await strapi.db.query('api::co-author.co-author').findMany({ orderBy: { AuthorName: 'ASC' } });
        const fuel = await strapi.db.query('api::fuel.fuel').findMany({ orderBy: { Fuel: 'ASC' } });
        const sector = await strapi.db.query('api::sector.sector').findMany({ orderBy: { Sector: 'ASC' } });
        const powerSupply = await strapi.db.query('api::power-supply.power-supply').findMany({ orderBy: { PowerSupply: 'ASC' } });
        const technologySolution = await strapi.db.query('api::technology-solution.technology-solution').findMany({ orderBy: { TechnologySolution: 'ASC' } });

        results.countries = countries;
        results.year = years;
        results.generationSources = generationSources;
        results.publishingOrganization = publishingOrganization;
        results.segment = segment;
        results.documentType = documentType;
        results.coAuthor = coAuthor;
        results.region = region;
        results.fuel = fuel;
        results.sector = sector;
        results.powerSupply = powerSupply;
        results.technologySolution = technologySolution;
        return { results }
    }

}));