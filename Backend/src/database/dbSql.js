var mysql = require("mysql2");

const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	port: process.env.DATABASE_PORT,
});

connection.connect(function(err) {

	if (err) throw err;
	console.log("Connected to DB");
	
	// Create table users
	let createTableUsers =
		"CREATE TABLE IF NOT EXISTS users ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(200) NOT NULL, pass VARCHAR(200))";
	
	connection.query(createTableUsers, function(err, results) {
		if (err) throw err;
	});
	
	// Create table contacts
	let createTableContacts =
		"CREATE TABLE IF NOT EXISTS contacts ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(200) NOT NULL, id_user VARCHAR(50))";
	
	connection.query(createTableContacts, function(err, results) {
		if (err) throw err;
	});
	
});

module.exports = connection;
