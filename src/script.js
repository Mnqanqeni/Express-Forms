const {pool}=require("./config");

const createVisitorsTable = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS Visitors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        assistant VARCHAR(100) NOT NULL,
        comments TEXT
      );
    `;
    await pool.query(query);
  return "table created";
};

// validate all the inputs, for date make sure that you usd the date format YYYY-MM-DD method
// comments must be more that one letter
// the rest is normal validation.

const addNewVisitor = async (visitor) => {
    const { name, age, date, time, assistant, comments } = visitor;
    const query = `
      INSERT INTO Visitors (name, age, date, time, assistant, comments)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [name, age, date, time, assistant, comments];
    const result = await pool.query(query, values);
    return result.rows[0].id;

};


const listAllVisitors = async () => {
    const query = `
      SELECT id, name FROM Visitors;
    `;
    const result = await pool.query(query);
    return result.rows;
 
};

const deleteVisitor = async (visitorId) => {
    const query = `
      DELETE FROM Visitors
      WHERE id = $1;
    `;
    const result = await pool.query(query, [visitorId]);
    return "visitor deleted";
};

const updateVisitor = async (visitorId, columnKey, newValue) => {
    const query = `
      UPDATE Visitors
      SET ${columnKey} = $1 WHERE id = $2
    `;
    const values = [newValue, visitorId];
    const result = await pool.query(query, values);
    return "visitor updated";
  
};


const viewOneVisitor = async (visitorId) => {
    const query = `
      SELECT * FROM Visitors
      WHERE id = $1;
    `;
    const result = await pool.query(query, [visitorId]);
    result.rows[0].date = result.rows[0].date.toISOString().split("T")[0];
    return result.rows[0];
};

const deleteAllVisitors = async () => {
    const query = `
      DELETE FROM Visitors;
    `;
    const result = await pool.query(query);
    return "all visitors deleted";
};

const viewLastVisitor = async () => {
    const query = `
      SELECT id FROM Visitors
      ORDER BY id DESC
      LIMIT 1;
    `;
    const result = await pool.query(query);
    return result.rows;
};
// addNewVisitor({
//   name: "Siya Seya",
//   age: 25,
//   date: "2022-01-01",
//   time: "12:00:00",
//   assistant: "Jane Doe",
//   comments: "This is a comment",})

deleteAllVisitors().then((data) => console.log(data));
module.exports = {
  createVisitorsTable,
  addNewVisitor,
  listAllVisitors,
  deleteVisitor,
  updateVisitor,
  viewOneVisitor,
  deleteAllVisitors,
  viewLastVisitor
};
