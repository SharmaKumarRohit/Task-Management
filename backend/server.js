const app = require("./src/app");
require("dotenv").config();
const dbConnection = require("./src/config/db");

dbConnection();

app.get("/", (req, res) => {
  res.send("Our full stack todo application");
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server is listing on http://localhost:${PORT}`)
);
