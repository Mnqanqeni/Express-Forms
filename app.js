const express = require("express");
const bodyParser = require('body-parser');
const {addNewVisitor,createVisitorsTable} = require("./src/script");

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/new_visitor",express.static("public"));

app.get("/submit", async (req, res) => {
    try {
        let { name, assistant, age, date, time, comments } = req.query;
        console.log(req.query)
        age = parseInt(age);

    
        const result = await createVisitorsTable();
        console.log(result)
        const results = await addNewVisitor({ name, assistant, age, date, time, comments });
        console.log(results)
        res.status(201).json({ message: "Visitor added successfully", results });
    } catch (error) {

        console.error(error);
        res.status(400).json({ error: error.message });
    }
});


app.listen(5001,()=>{
    console.log("Server is listening on port 5001.....");
})