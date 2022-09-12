const express = require("express");
const path = require("path");
const db = require("./models");
const user = require("./routes/users");

const app = express();

app.use(express.json());

app.use("/users", user);

(async () => {
  await db.sequelize.sync();
})();

app.get("/", [
  (req, res, next) => {
    res.status(200).send("This is the home page!");
  },
]);

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.status(404).send("Page Not found");
});
app.post("*", function (req, res) {
  res.status(404).send("Page Not found");
});
app.put("*", function (req, res) {
  res.status(404).send("Page Not found");
});


module.exports = app;

//PORT
const PORT = 1234;
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}....`);
});
