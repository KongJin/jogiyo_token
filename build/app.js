"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _oAuthRouter = _interopRequireDefault(require("./router/oAuthRouter"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const logger = (0, _morgan.default)("dev");
app.use((0, _cookieParser.default)());
app.use(_express.default.json());
app.use((0, _cors.default)({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));
app.use(logger);
app.use("/oauth", _oAuthRouter.default);
var _default = app;
exports.default = _default;