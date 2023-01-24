"use strict";

const { createCoreController, } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::user-journey.user-journey",
  ({ strapi }) => ({
    /// Function for sending CSV on email
    //async GetJourney(ctx) {
      // const finalReports = await strapi.db
      //   .query("api::user-journey.user-journey")
      //   .findMany({ populate: { user_info: true } });

      // const grouped = finalReports?.reduce(function (rv, x) {
      //   (rv[x.UserInfoId] = rv[x.UserInfoId] || []).push(x);
      //   return rv;
      // }, {});
      // const allReports = Object.values(grouped);
      // const reportsWithInfo = allReports?.map((report) => ({
      //   journey: report,
      //   userInfo: report[0].user_info,
      // }));
      // return { finalReports: reportsWithInfo };
  //   const rawBuilder = strapi.db.connection.context.raw("select * from user_journeys LEFT JOIN user_infos ON user_journeys.user_info_id = user_infos.id" );
  //   const resp = await rawBuilder.then();
  //  const grouped = resp.rows?.reduce(function (rv, x) {
  //       (rv[x.user_info_id] = rv[x.user_info_id] || []).push(x);
  //       return rv;
  //     }, {});

  //       const allReports = Object.values(grouped);

  //       const reports = allReports.map((item) => ({
  //         journey: item?.map((i) => i?.journey),
  //         user_info: item?.[0]
  //     }))
 
  //     return { finalReports: reports };
   // },

    async AddJourney(ctx) {
      const UserJourneyCheck = await strapi.db.query('api::user-journey.user-journey').findOne({where: { Email: ctx.request.body.data.Email },})
      if(!UserJourneyCheck)
      {
        const newEntry = await strapi.db.query('api::user-journey.user-journey').create(ctx.request.body);
        return { data:newEntry};
      }
      else{
        UserJourneyCheck.userExist=true;
        return {data:UserJourneyCheck}
      }
    }
  })
);
