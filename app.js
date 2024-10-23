const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
const {
  addNewVisitor,
  createVisitorsTable,
  viewLastVisitor,
} = require("./src/script");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use("/new_visitor", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000,
    },
  })
);

app.post("/submit", async (req, res) => {
  try {
    let { name, assistant, age, date, time, comments } = req.body;
    age = parseInt(age);

    await createVisitorsTable();
    await addNewVisitor({ name, assistant, age, date, time, comments });
    const lastVisitor = await viewLastVisitor();

    req.session.visitorId = lastVisitor.id;
    req.session.name = encodeURIComponent(name);
    req.session.assistant = encodeURIComponent(assistant);
    req.session.age = age;
    req.session.date = date.split("-").reverse().join("-");
    req.session.time = time;
    req.session.comments = encodeURIComponent(comments || "N/A");

    res.redirect("/thank-you");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/thank-you", async (req, res) => {
  if (!req.session.visitorId) {
    return res.status(400).json({ error: "No visitor data found in session." });
  }

  res.status(200).render("index", {
    title: "Thank You",
    visitor: {
      id: req.session.visitorId,
      name: decodeURIComponent(req.session.name),
      assistant: decodeURIComponent(req.session.assistant),
      age: req.session.age,
      date: req.session.date,
      time: req.session.time,
      comments: decodeURIComponent(req.session.comments || "N/A"),
    },
  });
});

const expressPort = process.env.EXPRESS_PORT || 5001;
app.listen(expressPort, () => {
  console.log(`Server is listening on port ${expressPort}.....`);
  console.log(
    `Server is running at http://localhost:${expressPort}/new_visitor/`
  );
});
