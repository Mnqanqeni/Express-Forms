const moment = require("moment");

const validateName = (name) => {
    if(!(typeof name === 'string' && name.trim().length > 0)){
        throw new Error("Invalid name");
    }
};

const validateAge = (age) => {
    if(!(Number.isInteger(age) && age > 0)){
        throw new Error("Invalid age");
    }
};

const validateDate = (date) => {
    if(!(moment(date, 'YYYY-MM-DD', true).isValid())){
        throw new Error("Invalid date");
    }
};

const validateTime = (time) => {
    if(!(moment(time, 'HH:mm', true).isValid())){
        throw new Error("Invalid time");
    }
};

const validateAssistant = (assistant) => {
    if(!(typeof assistant === 'string' && assistant.trim().length > 0)){
        throw new Error("Invalid assistant name");
    }
};

const validateId = (id) => {
    if (!(typeof id === 'number' && Number.isInteger(id) && id > 0)) {
        throw new Error("Invalid id");
    }
};
const validateComments = (comments) => {
     if(!(typeof comments === 'string' && comments.trim().length > 1)){
         throw new Error("Invalid comments");
     }
};

console.log(validateTime("12:00"));

module.exports = {validateName, validateAge, validateDate, validateTime, validateAssistant, validateComments,validateId}