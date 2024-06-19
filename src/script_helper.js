const moment = require("moment");
const { errorMessages } = require("./script_objects");

function validateName(name) {
    if (!(typeof name === 'string' )) {
        throw new Error(errorMessages.inputErrorMessages.string(name));
    }
    
    if(name.split(" ")[0].length < 2 || name.split(" ")[1].length < 2) {
        throw new Error("invalid name, at least 2 letters in first and last name");
    }

    if (!/^\s*[A-Za-z]+\s+[A-Za-z]+\s*$/.test(name.trim())) {
        throw new Error("invalid name, provide a full name");
    }
    
}

function validateAge(age) {
    if (!(Number.isInteger(age) && age > 0)) {
        throw new Error(errorMessages.formatErrorMessages.ageFormatError);
    }
}

function validateDate(date) {
    if(!(typeof date === 'string')) {
        throw new Error(errorMessages.inputErrorMessages.string(date));
    }

    if (!(moment(date, 'YYYY-MM-DD', true).isValid())) {
        throw new Error(errorMessages.formatErrorMessages.dateOfVisitFormatError);
    }
}

function validateTime(time) {
    if (!(typeof time === 'string' )) {
        throw new Error(errorMessages.inputErrorMessages.string(time));
    }
    if (!(moment(time, 'HH:mm', true).isValid())) {
        throw new Error(errorMessages.formatErrorMessages.timeOfVisitFormatError);
    }
}

function validateAssistant(assistant) {
    if (!(typeof assistant === 'string' )) {
        throw new Error(errorMessages.inputErrorMessages.string(assistant));
    }

    if (!(typeof assistant === 'string' && assistant.trim().length > 0)) {
        throw new Error("Invalid assistant name");
    }
}

function validateId(id) {
    if (!(typeof id === 'number' && Number.isInteger(id) && id > 0)) {
        throw new Error("Invalid id");
    }
}

function validateComments(comments) {
    if (!(typeof comments === 'string' )) {
        throw new Error(errorMessages.inputErrorMessages.string(comments));
    }

    if (!(typeof comments === 'string' && comments.trim().length > 1)) {
        throw new Error("Invalid comments");
    }
}

module.exports = {validateName, validateAge, validateDate, validateTime, validateAssistant, validateComments, validateId};
