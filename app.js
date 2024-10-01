const express = require("express");
const bodyParser = require("body-parser");
const {
  addNewVisitor,
  createVisitorsTable,
  viewLastVisitor,
} = require("./src/script");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/new_visitor", express.static("public"));

app.post("/submit", async (req, res) => {
  try {
    let { name, assistant, age, date, time, comments } = req.body;
    age = parseInt(age);

    await createVisitorsTable();
    await addNewVisitor({ name, assistant, age, date, time, comments });
    const lastVisitor = await viewLastVisitor();
    console.log(typeof date);
    res.redirect(
      `/thank-you?id=${lastVisitor.id}&name=${encodeURIComponent(
        name
      )}&assistant=${encodeURIComponent(assistant)}&age=${age}&date=${date
        .split("-")
        .reverse()
        .join("-")}&time=${time}&comments=${encodeURIComponent(comments)}`
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

app.get("/thank-you", async (req, res) => {
  res.status(201).render("index", {
    title: "Thank You",
    visitor: req.query,
  });
});

const expressPort = process.env.EXPRESS_PORT || 5001;
app.listen(expressPort, () => {
  console.log(`Server is listening on port ${expressPort}.....`);
});
