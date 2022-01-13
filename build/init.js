"use strict";

require("dotenv/config");

require("regenerator-runtime");

require("./db");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 4000;

_app.default.listen(PORT, () => {
  console.log("listening on port http://localhost:".concat(PORT));
});

module.exports = _app.default;