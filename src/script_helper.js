const moment = require("moment");
const { errorMessages } = require("./script_objects");

function validateName(name, duty) {
  const isNameFullRegex = /^\s*[A-Za-z]+(\s+[A-Za-z]+)*\s*$/;
  if (!(typeof name === "string")) {
    throw new Error(errorMessages.inputErrorMessages.string(name));
  }

  if (!isNameFullRegex.test(name.trim())) {
    throw new Error(errorMessages.invalidName.namesMustBeFull(duty, name));
  }

  if (name.split(" ")[0].length < 2 || name.split(" ")[1].length < 2) {
    throw new Error(
      errorMessages.invalidName.nameAtLeastTwoLetters(duty, name)
    );
  }
}

function validateAge(age) {
  if (!(Number.isInteger(age) && age > 0)) {
    throw new Error(errorMessages.formatErrorMessages.ageFormatError);
  }
}

function validateDate(date) {
  if (!(typeof date === "string")) {
    throw new Error(errorMessages.inputErrorMessages.string(date));
  }

  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    throw new Error(errorMessages.formatErrorMessages.dateOfVisitFormatError);
  }
}

function validateTime(time) {
  if (!(typeof time === "string")) {
    throw new Error(errorMessages.inputErrorMessages.string(time));
  }
  if (!moment(time, "HH:mm", true).isValid()) {
    throw new Error(errorMessages.formatErrorMessages.timeOfVisitFormatError);
  }
}

function validateId(id) {
  if (!(typeof id === "number" && Number.isInteger(id) && id > 0)) {
    throw new Error(errorMessages.id.idMustBePositive(id));
  }
}

function validateComments(comment) {
  if (!(typeof comment === "string")) {
    throw new Error(errorMessages.inputErrorMessages.string(comment));
  }

  if (!(comment.trim().length > 1)) {
    throw new Error(errorMessages.comment.commentAtLeastTwoCharacters(comment));
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
