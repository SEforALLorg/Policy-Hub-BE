'use strict';

module.exports = {
    "routes": [
        // {
        //     "method": "GET",
        //     "path": "/get-journey",
        //     "handler": "journey.GetJourney",
        //     "config": {
        //         "policies": []
        //     }
        // },
        {
            "method": "POST",
            "path": "/add-journey",
            "handler": "journey.AddJourney",
            "config": {
                "policies": []
            }
        },
    ]
}