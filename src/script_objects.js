const status={
    visitorAdded: "visitor added",
    visitorUpdated: "visitor updated",
    visitorDeleted: "visitor deleted",
    visitorNotFound: "visitor not found",
    allVisitorsDeleted: "all visitors deleted",
    noVisitorsFound: "no visitors found",
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
    
}



module.exports = {
    status,
    errorMessages
}