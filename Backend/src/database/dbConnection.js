// async function poolPromise() {
// 	try {
// 		const mysql = require('mysql2');
	
// 		const pool = mysql.createPool({
			// host: process.env.DATABASE_HOST,
			// server: process.env.DATABASE_SERVER,
			// port: process.env.PORT,
			// user: process.env.DATABASE_USER,
			// password: process.env.DATABASE_PASSWORD,
			// database: process.env.DATABASE_NAME,
			// connectionLimit: 10,
			// waitForConnections: true,
			// queueLimit: 0
// 		});
	
// 		const promisePool = pool.promise();
	
// 		return promisePool;
// 	} catch (error) {
// 	  return console.log(`Could not connect - ${error}`);
// 	}
// }

// const pool = poolPromise();
  
// module.exports = {
// 	connection: async () => pool.getConnection(),
//   	execute: (...params) => pool.execute(...params)
// };

const mysql = require('mysql');

// var pool  = mysql.createPool({
// 	host: process.env.DATABASE_HOST,
// 	port: process.env.PORT,
// 	user: process.env.DATABASE_USER,
// 	password: process.env.DATABASE_PASSWORD,
// 	database: process.env.DATABASE_NAME,
// });

const connection  = mysql.createConnection({
	host: "sql8.freesqldatabase.com",
	user: "sql8512646",
	password: "73md9XEk5U",
	database: "sql8512646",
});

const executeQuery = async (sql, callback) => {
	await connection.query(sql, callback);
	await connection.end();
}

// exports.pool = pool;
module.exports = executeQuery;
