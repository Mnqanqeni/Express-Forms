const { pool } = require("./config");
const { validateName, validateAge, validateDate, validateTime, validateAssistant, validateComments, validateId } = require("./script_helper");

const {queries} = require("./query_script");
const { errorMessages, status } = require("./script_objects");
const createVisitorsTable = async () => {
    await pool.query(queries.createVisitorsTable);
    return status.tableCreated;
};

const addNewVisitor = async (visitor) => {
    const { name, age, date, time, assistant, comments } = visitor;
    
    validateName(name);
    validateAge(age);
    validateDate(date);
    validateTime(time);
    validateAssistant(assistant);
    validateComments(comments);
    
    const values = [name, age, date, time, assistant, comments];
    const result = await pool.query(queries.addNewVisitor, values);
    return result.rows[0].id;
};

const listAllVisitors = async () => {
    const result = await pool.query(queries.listAllVisitors);
    return result.rows;
};

const deleteVisitor = async (visitorId) => {
    validateId(visitorId);

    const result = await pool.query(queries.deleteVisitor, [visitorId]);
    return "visitor deleted";
};

const updateVisitor = async (visitorId, columnKey, newValue) => {
    validateId(visitorId);
    
    switch (columnKey) {
        case "name": validateName(newValue); break;
        case "age": validateAge(newValue); break;
        case "date": validateDate(newValue); break;
        case "time": validateTime(newValue); break;
        case "assistant": validateAssistant(newValue); break;
        case "comments": validateComments(newValue); break;
        default: throw new Error("Invalid column key");
    }
    const query = queries.updateVisitor.replace('$1', columnKey);
    const values = [newValue, visitorId];
    const result = await pool.query(query, values);
    return "visitor updated";
};

const viewOneVisitor = async (visitorId) => {
    validateId(visitorId);

    const result = await pool.query(queries.viewOneVisitor, [visitorId]);
    result.rows[0].date = result.rows[0].date.toISOString().split("T")[0];
    return result.rows[0];
};

const deleteAllVisitors = async () => {
    const result = await pool.query(queries.deleteAllVisitors);
    return "all visitors deleted";
};

const viewLastVisitor = async () => {
    const result = await pool.query(queries.viewLastVisitor);
    return result.rows[0];
};
//creating a table
createVisitorsTable().then((data) => console.log(data));

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