const moment = require("moment");

const validateName = (name) => {
    return typeof name === 'string' && name.trim().length > 0;
};

const validateAge = (age) => {
    return Number.isInteger(age) && age > 0;
};

const validateDate = (date) => {
    return moment(date, 'YYYY-MM-DD', true).isValid();
};

const validateTime = (time) => {
    return moment(time, 'HH:mm', true).isValid();
};

const validateAssistant = (assistant) => {
    return typeof assistant === 'string' && assistant.trim().length > 0;
};

const validateComments = (comments) => {
    return typeof comments === 'string' && comments.trim().length > 1;
};

const validateVisitor = (visitor) => {
    const { name, age, date, time, assistant, comments } = visitor;
    return (
        validateName(name) &&
        validateAge(age) &&
        validateDate(date) &&
        validateTime(time) &&
        validateAssistant(assistant) &&
        validateComments(comments)
    );
};

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

const addNewVisitor = async (visitor) => {
    if (!validateVisitor(visitor)) {
        throw new Error("Invalid visitor data");
    }
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
    if (columnKey === 'name' && !validateName(newValue)) {
        throw new Error("Invalid name");
    }
    if (columnKey === 'age' && !validateAge(newValue)) {
        throw new Error("Invalid age");
    }
    if (columnKey === 'date' && !validateDate(newValue)) {
        throw new Error("Invalid date");
    }
    if (columnKey === 'time' && !validateTime(newValue)) {
        throw new Error("Invalid time");
    }
    if (columnKey === 'assistant' && !validateAssistant(newValue)) {
        throw new Error("Invalid assistant");
    }
    if (columnKey === 'comments' && !validateComments(newValue)) {
        throw new Error("Invalid comments");
    }

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
    if (result.rows.length > 0) {
        result.rows[0].date = moment(result.rows[0].date).format('YYYY-MM-DD');
    }
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

// Example usage
// addNewVisitor({
//   name: "Siya Seya",
//   age: 25,
//   date: "2022-01-01",
//   time: "12:00:00",
//   assistant: "Jane Doe",
//   comments: "This is a comment",
// }).then((id) => console.log(`New visitor added with ID: ${id}`));

deleteAllVisitors().then((data) => console.log(data));

module.exports = {
    createVisitorsTable,
    addNewVisitor,
    listAllVisitors,
    deleteVisitor,
    updateVisitor,
    viewOneVisitor,
    deleteAllVisitors,
    viewLastVisitor,
};
