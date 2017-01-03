module.exports = (function () {
    app.get('/'      , require("./express.routes.js")["/"      ]);
    app.get('/info'  , require("./express.routes.js")["/info"  ]);
    app.get('/report'  , require("./express.routes.js")["/report"  ]);
    
    app.get('/js'    , require("./express.routes.js")["/js"    ]);
    app.get('/min-js', require("./express.routes.js")["/min-js"]);
})();

