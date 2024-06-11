const moment = require("moment");

function validateName(name) {
    if (!(typeof name === 'string' )) {
        throw new Error(`Input must be a string. Received: ${name}`);
    }
    
    if(name.split(" ")[0].length < 2 || name.split(" ")[1].length < 2) {
        throw new Error("invalid name, provide a full name");
    }

    if (!/^\s*[A-Za-z]+\s+[A-Za-z]+\s*$/.test(name.trim())) {
        throw new Error("invalid name, provide a full name");
    }
    
}

function validateAge(age) {
    if (!(Number.isInteger(age) && age > 0)) {
        throw new Error("Invalid age");
    }
}

function validateDate(date) {
    if (!(moment(date, 'YYYY-MM-DD', true).isValid())) {
        throw new Error("Invalid date");
    }
}

function validateTime(time) {
    if (!(moment(time, 'HH:mm', true).isValid())) {
        throw new Error("Invalid time");
    }
}

function validateAssistant(assistant) {
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
    if (!(typeof comments === 'string' && comments.trim().length > 1)) {
        throw new Error("Invalid comments");
    }
}

module.exports = {validateName, validateAge, validateDate, validateTime, validateAssistant, validateComments, validateId};
