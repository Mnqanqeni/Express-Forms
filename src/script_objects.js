const status={
    visitorAdded: (name) => `visitor ${name} added`,
    visitorUpdated: (name)=> `visitor ${name} updated`,
    visitorDeleted: (name) => `visitor ${name} deleted`,
    visitorNotFound: (name) => `visitor ${name} not found`,
    allVisitorsDeleted: "all visitors deleted",
    noVisitorsFound: "no visitors found",
    visitorNotFound: (name) => `visitor ${name} not found`,
    tableCreated: "table created",
}

const errorMessages = {
    inputErrorMessages: {
        string: (input) => {
            return `Input must be a string. Received: ${input}`;
        },
        number: (input) => {
            return `Input must be a number. Received: ${input}`;
        },
    },
    formatErrorMessages: {
        ageFormatError: "Age must be a positive integer",
        timeOfVisitFormatError: "Time of visit must be in the format hh:mm",
        dateOfVisitFormatError: "Date of visit must be in the format yyyy-mm-dd",
    },
    invalidName:{
        nameAtLeastTwoLetters:(duty,name) => `invalid ${duty} name, at least 2 letters in first and last name. Received: ${name}`,
        namesMustBeFull:(duty,name) => `invalid ${duty} name, names must be full. Received: ${name}`,
    }
    
}



module.exports = {
    status,
    errorMessages
}