require("dotenv").config();

module.exports = {
    Bot_Token: process.env.Bot_Token || "",
    Bot_Prefix: process.env.Bot_Prefix || "!",
    Bot_embedColor: process.env.Bot_embedColor || "RED",
    Bot_owenerID: process.env.Bot_owenerID || ""
}
