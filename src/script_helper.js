const moment = require("moment");
const { errorMessages } = require("./script_objects");

function validateName(name, duty) {
  const isTheNameFullRegEx = /^\s*[A-Za-z]+(\s+[A-Za-z]+)*\s*$/;
  if (!(typeof name === "string")) {
    throw new Error(errorMessages.inputMustBeString(name));
  }

  if (!isTheNameFullRegEx.test(name.trim())) {
    throw new Error(errorMessages.namesMustBeFull(duty, name));
  }

  if (name.split(" ")[0].length < 2 || name.split(" ")[1].length < 2) {
    throw new Error(errorMessages.nameAtLeastTwoLetters(duty, name));
  }
}

function validateAge(age) {
  if (!(Number.isInteger(age) && age > 0)) {
    throw new Error(errorMessages.ageMustBePositiveInteger);
  }
}

function validateDate(date) {
  if (!(typeof date === "string")) {
    throw new Error(errorMessages.inputMustBeString(date));
  }

  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    throw new Error(errorMessages.dateOfVisitFormat);
  }
}

function validateTime(time) {
  if (!(typeof time === "string")) {
    throw new Error(errorMessages.inputMustBeString(time));
  }
  if (!moment(time, "HH:mm", true).isValid()) {
    throw new Error(errorMessages.timeOfVisitFormat);
  }
}

function validateId(id) {
  if (!(typeof id === "number" && Number.isInteger(id) && id > 0)) {
    throw new Error(errorMessages.idMustBePositive(id));
  }
}

function validateComments(comment) {
  if (!(typeof comment === "string")) {
    throw new Error(errorMessages.inputMustBeString(comment));
  }

  if (!(comment.trim().length > 1)) {
    throw new Error(errorMessages.commentAtLeastTwoCharacters(comment));
  }
}

module.exports = {
  validateName,
  validateAge,
  validateDate,
  validateTime,
  validateComments,
  validateId,
};
