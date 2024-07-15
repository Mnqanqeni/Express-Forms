const queries = {
  createVisitorsTable: `
        CREATE TABLE IF NOT EXISTS Visitors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            age INT NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            assistant VARCHAR(100) NOT NULL,
            comments TEXT
        );
    `,
  addNewVisitor: `
        INSERT INTO Visitors (name, age, date, time, assistant, comments)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
    `,
  listAllVisitors: `
        SELECT id, name FROM Visitors;
    `,
  deleteVisitor: `
        DELETE FROM Visitors
        WHERE id = $1;
    `,
  generateUpdateQuery: (columnKey) => `
        UPDATE Visitors
        SET ${columnKey} = $1
        WHERE id = $2;
    `,
  viewOneVisitor: `
        SELECT * FROM Visitors
        WHERE id = $1;
    `,
  deleteAllVisitors: `
        DELETE FROM Visitors;
    `,
  viewLastVisitor: `
        SELECT id FROM Visitors
        ORDER BY id DESC
        LIMIT 1;
    `,
};

module.exports = { queries };
