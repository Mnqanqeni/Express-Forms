const status = {
  visitorAdded: (name) => `visitor ${name} added`,
  visitorUpdated: (name) => `visitor ${name} updated`,
  visitorDeleted: (name) => `visitor ${name} deleted`,
  visitorNotFound: (name) => `visitor ${name} not found`,
  allVisitorsDeleted: "all visitors deleted",
  noVisitorsFound: "no visitors found",
  visitorNotFound: (name) => `visitor ${name} not found`,
  tableCreated: "table created",
};

const errorMessages = {
  inputMustBeString: (input) => `Input must be a string. Received: ${input}`,
  ageMustBePositiveInteger: "Age must be a positive integer",
  timeOfVisitFormat: "Time of visit must be in the format hh:mm",
  dateOfVisitFormat: "Date of visit must be in the format yyyy-mm-dd",
  nameAtLeastTwoLetters: (duty, name) =>
    `invalid ${duty} name, at least 2 letters in first and last name. Received: ${name}`,
  namesMustBeFull: (duty, name) =>
    `invalid ${duty} name, names must be full. Received: ${name}`,

  idMustBePositive: (id) =>
    `invalid id, it must be a positive integer or zero. Received: ${id}`,

  commentAtLeastTwoCharacters: (comment) =>
    `invalid comments, it must be at least two characters long. Received: ${comment}`,
};

module.exports = {
  status,
  errorMessages,
};
