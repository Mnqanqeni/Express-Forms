const { Pool } = require("pg");
const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "shop",
  password: "pass",
  port: 5432
});

const addNewVisitor = async (visitor) => {
  try {
    const { visitor_name, visitor_age, date_of_visit, time_of_visit, assistant_name, comments } = visitor;
    const query = `
      INSERT INTO Visitors (visitor_name, visitor_age, date_of_visit, time_of_visit, assistant_name, comments)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [visitor_name, visitor_age, date_of_visit, time_of_visit, assistant_name, comments];
    const result = await pool.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
};


const listAllVisitors = async () => {
  try {
    const query = `
      SELECT id, visitor_name FROM Visitors;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const deleteVisitor = async (visitorId) => {
  try {
    const query = `
      DELETE FROM Visitors
      WHERE id = $1;
    `;
    const result = await pool.query(query, [visitorId]);
    return result.rowCount;
  } catch (error) {
    throw error;
  }
};

const updateVisitor = async (visitorId, updatedInfo) => {
  try {
    const { visitor_name, visitor_age, date_of_visit, time_of_visit, assistant_name, comments } = updatedInfo;
    const query = `
      UPDATE Visitors
      SET visitor_name = $1, visitor_age = $2, date_of_visit = $3, time_of_visit = $4, assistant_name = $5, comments = $6
      WHERE id = $7;
    `;
    const values = [visitor_name, visitor_age, date_of_visit, time_of_visit, assistant_name, comments, visitorId];
    const result = await pool.query(query, values);
    return result.rowCount;
  } catch (error) {
    throw error;
  }
};


const viewOneVisitor = async (visitorId) => {
  try {
    const query = `
      SELECT * FROM Visitors
      WHERE id = $1;
    `;
    const result = await pool.query(query, [visitorId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }finally{
    pool.release()
  }
};

const deleteAllVisitors = async () => {
  try {
    const query = `
      DELETE FROM Visitors;
    `;
    const result = await pool.query(query);
    return result.rowCount;
  } catch (error) {
    throw error;
  }
};

const viewLastVisitor = async () => {
  try {
    const query = `
      SELECT id FROM Visitors
      ORDER BY id DESC
      LIMIT 1;
    `;
    const result = await pool.query(query);
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
};

addNewVisitor("Mbali",22, "mydate","18:30","Ndiya","it was nice")

module.exports = {
  addNewVisitor,
  listAllVisitors,
  deleteVisitor,
  updateVisitor,
  viewOneVisitor,
  deleteAllVisitors,
  viewLastVisitor
};
