var mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "sql8.freesqldatabase.com",
	user: "sql8512646",
	password: "73md9XEk5U",
	database: "sql8512646",
	port: "3306",
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
