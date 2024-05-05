const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test1",
  password: "Ndiya@123",
  port: 5432
});

const helloWorld = () => {
  pool.query(
    "SELECT * FROM",
    (error, results) => {
      if (error) {
        throw error;
      }

      console.log(results.rows);
    }
  );
};

helloWorld();