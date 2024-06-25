const { pool } = require("./config");
const { validateName, validateAge, validateDate, validateTime, validateAssistant, validateComments, validateId } = require("./script_helper");

const {queries} = require("./query_script");
const { status } = require("./script_objects");
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
    await pool.query(queries.addNewVisitor, values);
    return status.visitorAdded(name);
};

const viewAllVisitors = async () => {
    const result = await pool.query(queries.viewAllVisitors);
    return result.rows;
}
const listAllVisitors = async () => {
    const result = await pool.query(queries.listAllVisitors);
    return result.rows;
};

const deleteVisitor = async (visitorId) => {
    validateId(visitorId);

    await pool.query(queries.deleteVisitor, [visitorId]);
    return status.visitorDeleted(visitorId);
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
    const query = queries.generateUpdateQuery(columnKey);
    const result = await pool.query(query,[newValue, visitorId]);
    return result.rowCount===0 ? status.visitorNotFound(visitorId) : status.visitorUpdated(newValue);
};

const viewOneVisitor = async (visitorId) => {
    validateId(visitorId);

    const result = await pool.query(queries.viewOneVisitor, [visitorId]);
    result.rows[0].date = result.rows[0].date.toISOString().split("T")[0];
    return result.rows[0];
};

const deleteAllVisitors = async () => {
    const result = await pool.query(queries.deleteAllVisitors);
    return result.rowCount===0 ? status.noVisitorsFound : status.allVisitorsDeleted;
};

const viewLastVisitor = async () => {
    const result = await pool.query(queries.viewLastVisitor);
    return result.rows[0];
};

console.log("*****************************************************************");
updateVisitor(7, "name","Jane lane").then(result => console.log(result));
console.log("*****************************************************************");
console.log("View all visitors: ");
viewAllVisitors().then(result => console.log(result));
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