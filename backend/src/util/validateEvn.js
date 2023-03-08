"use strict";
exports.__esModule = true;
var envalid_1 = require("envalid");
var env = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_URI: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)()
});
exports["default"] = env;
