'use strict';

module.exports = {
    "routes": [
        {
            "method": "GET",
            "path": "/get-journey",
            "handler": "journey.GetJourney",
            "config": {
                "policies": []
            }
        },
        // {
        //     "method": "POST",
        //     "path": "/v1/download-csv",
        //     "handler": "mailchimp.downloadCsv",
        //     "config": {
        //         "policies": []
        //     }
        // },
    ]
}