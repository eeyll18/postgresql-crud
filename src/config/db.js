const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect((err) => {
  if (err) {
    console.error("Veritabanına bağlanırken hata oluştu", err);
  } else {
    console.log("Veritabanına başarıyla bağlanıldı");
  }
});

module.exports = pool;
