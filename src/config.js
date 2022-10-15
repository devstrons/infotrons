require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "",
    prefix: process.env.PREFIX || "!",
    color: process.env.COLOR || "RED",
    google_KEY: process.env.GOOGLE_KEY || "",
    engine_id: process.env.ENGINE_ID || ""
}
