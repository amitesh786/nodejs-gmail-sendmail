async function poolPromise() {
	try {
		const mysql = require('mysql2');
	
		const pool = mysql.createPool({
			host: process.env.DATABASE_HOST,
			port: process.env.DATABASE_PORT,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			connectionLimit: 10,
			waitForConnections: true,
			queueLimit: 0
		});
	
		const promisePool = pool.promise();
	
		return promisePool;
	} catch (error) {
	  return console.log(`Could not connect - ${error}`);
	}
}

const pool = poolPromise();
  
module.exports = {
	connection: async () => pool.getConnection(),
  	execute: (...params) => pool.execute(...params)
};
