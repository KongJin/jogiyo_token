"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseAutoIncrement = _interopRequireDefault(require("mongoose-auto-increment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = _mongoose.default.connection;

_mongooseAutoIncrement.default.initialize(db);

const handleOpen = () => console.log("✅ Connected to DB");

const handleError = error => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);