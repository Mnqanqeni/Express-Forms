const {
  createVisitorsTable,
  addNewVisitor,
  listAllVisitors,
  deleteVisitor,
  updateVisitor,
  viewOneVisitor,
  deleteAllVisitors,
  viewLastVisitor,
} = require("../src/script.js");
const { pool } = require("../src/config.js");
const mockedVisitor = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    date: "2024-06-08",
    time: "12:00",
    assistant: "Assistant",
    comments: "No comments",
  },
];
const { queries } = require("../src/query_script.js");
const { errorMessages, status } = require("../src/script_objects.js");

describe("Database Functionality", () => {
  let newVisitor;
  beforeEach(() => {
    spyOn(pool, "query");
    newVisitor = {
      name: "Bend Over",
      age: 25,
      date: "2024-05-13",
      time: "09:00",
      assistant: "Jane Smith",
      comments: "Interested in programming and designing courses",
    };
    args = [
      newVisitor.name,
      newVisitor.age,
      newVisitor.date,
      newVisitor.time,
      newVisitor.assistant,
      newVisitor.comments,
    ];
  });

  describe("Create Visitors Table", () => {
    it("should create the visitors table", async () => {
      await createVisitorsTable();
      expect(pool.query).toHaveBeenCalledOnceWith(queries.createVisitorsTable);
    });

    it("should return success message when the table is created", async () => {
      pool.query.and.returnValue({ rows: [] });
      const result = await createVisitorsTable();
      expect(result).toBe(status.tableCreated);
    });
  });

  describe("Add New Visitor", () => {
    it("should throw an error when name is not a string", async () => {
      newVisitor.name = 123;
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(
          errorMessages.inputMustBeString(newVisitor.name)
        )
      );
    });

    it("should throw an error when visitor name is less than two letters", async () => {
      newVisitor.name = "A B";
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(
          errorMessages.nameAtLeastTwoLetters("visitor", newVisitor.name)
        )
      );
    });

    it("should throw an error when age is not valid", async () => {
      newVisitor.age = -1;
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(errorMessages.ageMustBePositiveInteger)
      );
    });

    it("should throw an error when date is not a string", async () => {
      newVisitor.date = 2022 - 13 - 24;
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(
          errorMessages.inputMustBeString(newVisitor.date)
        )
      );
    });

    it("should throw an error when date is not in the correct format", async () => {
      newVisitor.date = "04-12-2022";
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(errorMessages.dateOfVisitFormat)
      );
    });

    it("should throw an error when time is not a string", async () => {
      newVisitor.time = 7;
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(
          errorMessages.inputMustBeString(newVisitor.time)
        )
      );
    });

    it("should throw an error when time is not in the correct format", async () => {
      newVisitor.time = "10:1";
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(errorMessages.timeOfVisitFormat)
      );
    });

    it("should throw an error when assistant is not a string", async () => {
      newVisitor.assistant = 123;
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(
          errorMessages.inputMustBeString(newVisitor.assistant)
        )
      );
    });

    it("should throw an error when assistant name is less than two letters", async () => {
      newVisitor.assistant = "A B";
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(
          errorMessages.nameAtLeastTwoLetters("assistant", newVisitor.assistant)
        )
      );
    });

    // fit("should throw an error when comments is not a string", async () => {
    //   newVisitor.comments = 123;
    //   await addNewVisitor(newVisitor).catch((error) =>
    //     expect(error.message).toBe(
    //       errorMessages.inputMustBeString(newVisitor.comments)
    //     )
    //   );
    // });

    it("should throw an error when comments is less than two letters", async () => {
      newVisitor.comments = "A";
      await addNewVisitor(newVisitor).catch((error) =>
        expect(error.message).toBe(
          errorMessages.commentAtLeastTwoCharacters(newVisitor.comments)
        )
      );
    });

    it("should add a new visitor", async () => {
      await addNewVisitor(newVisitor);
      expect(pool.query).toHaveBeenCalledWith(queries.addNewVisitor, args);
    });

    it("should return success message when visitor is added", async () => {
      const result = await addNewVisitor(newVisitor);
      expect(result).toBe(status.visitorAdded(newVisitor.name));
    });
  });

  describe("List All Visitors", () => {
    it("should list all visitors", async () => {
      const mockVisitors = [newVisitor];
      pool.query.and.returnValue({ rows: mockVisitors });
      const result = await listAllVisitors();
      expect(result).toEqual(mockVisitors);
      expect(pool.query).toHaveBeenCalledWith(queries.listAllVisitors);
    });
  });

  describe("Delete Visitor", () => {
    it("should delete a visitor and return success message", async () => {
      pool.query.and.returnValue({ rowCount: 1 });
      const response = await deleteVisitor(1);
      expect(response).toBe(status.visitorDeleted(1));
      expect(pool.query).toHaveBeenCalledOnceWith(queries.deleteVisitor, [1]);
    });

    it("should return visitor not found message when visitor is not found", async () => {
      pool.query.and.returnValue({ rowCount: 0 });
      await deleteVisitor(1).catch((error) =>
        expect(error.message).toBe(status.visitorNotFound(1))
      );
      expect(pool.query).toHaveBeenCalledOnceWith(queries.deleteVisitor, [1]);
    });
  });

  describe("Update Visitor", () => {
    it("should update a visitor and return success message", async () => {
      pool.query.and.returnValue({ rowCount: 1 });
      const column = "name";
      const result = await updateVisitor(1, column, "Teddy Bear");
      const query = queries.generateUpdateQuery(column);
      expect(pool.query).toHaveBeenCalledWith(query, ["Teddy Bear", 1]);
      expect(result).toBe(status.visitorUpdated(column));
    });

    it("should return visitor not found message when visitor is not found", async () => {
      pool.query.and.returnValue({ rowCount: 0 });
      const column = "name";
      const result = await updateVisitor(1, column, "Donald Duck");
      const query = queries.generateUpdateQuery(column);
      expect(pool.query).toHaveBeenCalledWith(query, ["Donald Duck", 1]);
      expect(result).toBe(status.visitorNotFound(1));
    });

    it("should return ", async () => {
      pool.query.and.returnValue({ rowCount: 0 });
      const column = "name";
      await updateVisitor(-1, column, "Donald Duck").catch((error) => {
        expect(error.message).toBe(errorMessages.idMustBePositive(-1));
      });
    });
  });

  describe("View One Visitor", () => {
    it("should return a specific visitor", async () => {
      newVisitor.date = new Date("2021-12-31");
      pool.query.and.returnValue({ rows: [newVisitor] });
      const result = await viewOneVisitor(1);
      expect(result).toEqual(newVisitor);
      expect(pool.query).toHaveBeenCalledWith(queries.viewOneVisitor, [1]);
    });

    it("should return visitor not found message when visitor is not found", async () => {
      pool.query.and.returnValue({ rows: [] });
      const result = await viewOneVisitor(1);
      expect(result).toEqual(status.visitorNotFound(1));
    });
  });

  describe("View Last Visitor", () => {
    it("should return the last visitor", async () => {
      pool.query.and.returnValue({ rows: [mockedVisitor] });
      const result = await viewLastVisitor();
      expect(result).toEqual(mockedVisitor);
      expect(pool.query).toHaveBeenCalledWith(queries.viewLastVisitor);
    });
  });

  describe("Delete All Visitors", () => {
    it("should delete all visitors", async () => {
      pool.query.and.returnValue({ rowCount: 1 });
      await deleteAllVisitors();
      expect(pool.query).toHaveBeenCalledWith(queries.deleteAllVisitors);
    });

    it("should return success message when all visitors are deleted", async () => {
      pool.query.and.returnValue({ rowCount: 1 });
      const result = await deleteAllVisitors();
      expect(result).toBe(status.allVisitorsDeleted);
    });

    it("should return no visitors found message when no visitors are found", async () => {
      pool.query.and.returnValue({ rowCount: 0 });
      const result = await deleteAllVisitors();
      expect(result).toBe(status.noVisitorsFound);
    });
  });
});
