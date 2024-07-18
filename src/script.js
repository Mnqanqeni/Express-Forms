const { pool } = require("./config");
const {
  validateName,
  validateAge,
  validateDate,
  validateTime,
  validateComments,
  validateId,
} = require("./script_helper");

const { queries } = require("./query_script");
const { status } = require("./script_objects");
const createVisitorsTable = async () => {
  await pool.query(queries.createVisitorsTable);
  return status.tableCreated;
};

const addNewVisitor = async (visitor) => {
  const { name, age, date, time, assistant, comments } = visitor;

  validateName(name, "visitor");
  validateName(assistant, "assistant");
  validateAge(age);
  validateDate(date);
  validateTime(time);
  validateComments(comments);

  const values = [name, age, date, time, assistant, comments];
  await pool.query(queries.addNewVisitor, values);
  return status.visitorAdded(name);
};

const listAllVisitors = async () => {
  const result = await pool.query(queries.listAllVisitors);
  return result.rows;
};

const deleteVisitor = async (visitorId) => {
  validateId(visitorId);

  const result = await pool.query(queries.deleteVisitor, [visitorId]);
  return result.rowCount === 0
    ? status.visitorNotFound(visitorId)
    : status.visitorDeleted(visitorId);
};

const updateVisitor = async (visitorId, columnKey, newValue) => {
  validateId(visitorId);

  switch (columnKey) {
    case "name":
      validateName(newValue, "visitor");
      break;
    case "age":
      validateAge(newValue);
      break;
    case "date":
      validateDate(newValue);
      break;
    case "time":
      validateTime(newValue);
      break;
    case "assistant":
      validateName(newValue, "assistant");
      break;
    case "comments":
      validateComments(newValue);
      break;
    default:
      throw new Error("Invalid column key");
  }
  const query = queries.generateUpdateQuery(columnKey);
  const result = await pool.query(query, [newValue, visitorId]);
  return result.rowCount === 0
    ? status.visitorNotFound(visitorId)
    : status.visitorUpdated(columnKey);
};

const viewOneVisitor = async (visitorId) => {
  validateId(visitorId);

  const result = await pool.query(queries.viewOneVisitor, [visitorId]);
  if (result.rows.length === 0) {
    return status.visitorNotFound(visitorId);
  }
  result.rows[0].date = result.rows[0].date.toISOString().split("T")[0];
  return result.rows[0];
};

const deleteAllVisitors = async () => {
  const result = await pool.query(queries.deleteAllVisitors);
  return result.rowCount === 0
    ? status.noVisitorsFound
    : status.allVisitorsDeleted;
};

const viewLastVisitor = async () => {
  const result = await pool.query(queries.viewLastVisitor);
  return result.rows[0];
};

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
