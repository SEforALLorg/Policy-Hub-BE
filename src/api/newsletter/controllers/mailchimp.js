'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const nodemailer = require("nodemailer");
const { convertArrayToCSV } = require('convert-array-to-csv');
const fs = require('fs');
const fetch = require('node-fetch')

module.exports = createCoreController('api::newsletter.newsletter', ({ strapi }) => ({
    /// Function for sending CSV on email
    async sendCsv(ctx) {

        const filterIds = ctx.request.body.data.filters;
        const reportIds = ctx.request.body.data.reports;
        const searchQuery = ctx.request.body.data.searchTerm;
        const filtersKey = Object.keys(filterIds);
        const filtersQuery = {};
        filtersKey.map((item) => {
            if (filterIds[item].length) {
                filtersQuery[item] = {
                    id: {
                        $in: filterIds[item]
                    },
                }
            }
        });

        let reportIdsQuery = {}

        if (reportIds.length) {
            reportIdsQuery = {
                id: {
                    $in: reportIds,
                },
            }
        }

        const finalReports = await strapi.db.query('api::report.report').findMany({
            where: {
                AddFilters: filtersQuery,
                ReportName: {
                    $containsi: searchQuery
                },
                ...reportIdsQuery
            },

            populate: {
                AddFilters: {
                    populate: {
                        countries: true,
                        publishing_organizations: true,
                        years: true
                    }
                }
            }
        });

        const data = finalReports.map((item) => {
            const countries = item?.AddFilters?.countries[0]?.CountryName;
            const publishing_organizations = item?.AddFilters?.publishing_organizations[0]?.PublishingOrganization;
            const years = item?.AddFilters?.years[0]?.Year;
            return {
                'Report Name': item?.ReportName,
                "Source": item?.URL,
                "Countries": countries || "-",
                'Publishing Organization(s)': publishing_organizations || "-",
                "Year": years || "-",
            };
        });


        const htmlTemplate = fs.readFileSync(__dirname + '/KnowledgeHub.html', 'utf-8');

        const csvData = convertArrayToCSV(data);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: { name: 'SEforALL Knowledge Hub', address: process.env.EMAIL_FROM },
            to: ctx.request.body.data.Email,
            subject: 'Your resource list from SEforALL Knowledge Hub',
            html: htmlTemplate,
            attachments: [
                {
                    filename: "reports.csv",
                    content: csvData,
                },
            ],
        };
        let mailResponse = await transporter.sendMail(mailOptions);
        const result = { "msg": "Email sent successfully", response: mailResponse }

        return { result }
    },



    /////// //////// Download CSV Function ///////////////////////////

    async downloadCsv(ctx) {

        const filterIds = ctx.request.body.data.filters;
        const reportIds = ctx.request.body.data.reports;
        const searchQuery = ctx.request.body.data.searchTerm;
        const filtersKey = Object.keys(filterIds);
        const filtersQuery = {};
        filtersKey.map((item) => {
            if (filterIds[item].length) {
                filtersQuery[item] = {
                    id: {
                        $in: filterIds[item]
                    },
                }
            }
        });

        let reportIdsQuery = {}
        if (reportIds.length) {
            reportIdsQuery = {
                id: {
                    $in: reportIds,
                },
            }
        }

        const finalReports = await strapi.db.query('api::report.report').findMany({
            where: {
                AddFilters: filtersQuery,
                ReportName: {
                    $containsi: searchQuery
                },
                ...reportIdsQuery
            },
            limit: 2000,
            populate: {
                AddFilters: {
                    populate: {
                        countries: true,
                        publishing_organizations: true,
                        years: true
                    }
                }
            }
        });

        // const formattedData = (item, response, countries, publishing_organizations, years) => {
        //     return {
        //         'Report Name': item?.ReportName?.replace(/,/g, "") || "",
        //         "Source": item?.URL?.replace(/,/g, "") || "",
        //         "Valid URL": response.ok ? 'Yes' : 'No',
        //         "Countries": countries?.replace(/,/g, "") || "",
        //         'Publishing Organization(s)': publishing_organizations?.replace(/,/g, "") || "",
        //         "Year": years?.replace(/,/g, "") || "",
        //     }
        // }

        // const data = await Promise.all(finalReports?.map(async (item) => {
        //     const countries = item?.AddFilters?.countries[0]?.CountryName;
        //     const publishing_organizations = item?.AddFilters?.publishing_organizations[0]?.PublishingOrganization;
        //     const years = item?.AddFilters?.years[0]?.Year;
        //     const isUrl = item?.URL?.includes("https:") || item?.URL?.includes("http:") || item?.URL !== null
        //     if (isUrl) {
        //         try {
        //             const response = await fetch(item?.URL, {
        //                method: 'HEAD'
        //            })
        //        return formattedData(item, response, countries, publishing_organizations, years);
        //        } catch (error) {
        //            return formattedData(item, {response: {ok: false}}, countries, publishing_organizations, years)
        //        }
        //     } else {
        //         return formattedData(item, {response: {ok: false}}, countries, publishing_organizations, years)
        //     }
            
        // })).then((values) => values)

        const data = finalReports.map((item) => {
            const countries = item?.AddFilters?.countries[0]?.CountryName;
            const publishing_organizations = item?.AddFilters?.publishing_organizations[0]?.PublishingOrganization;
            const years = item?.AddFilters?.years[0]?.Year;
      
            return {
                    'Report Name': item?.ReportName?.replace(/,/g, "") || "",
                    "Source": item?.URL?.replace(/,/g, "") || "",
                    "Countries": countries?.replace(/,/g, "") || "",
                    'Publishing Organization(s)': publishing_organizations?.replace(/,/g, "") || "",
                    "Year": years?.replace(/,/g, "") || "",
                 }
        });
    
        const csvData = convertArrayToCSV(data);
        const result = {
            status: "success",
            csv: csvData
        }
        return { result }

    },

}));