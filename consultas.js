const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgresql",
    database: "skatepark",
    port: 5432,
});