const connection  = require('../database/dbConnection');

const addNewContact = (req, res) => {

	let name = req.body.name.toLowerCase();
	let firstCharUpperCase = name.charAt(0).toUpperCase() + name.slice(1);
	let email = req.body.email.toLowerCase();
	let id_user = req.body.id_user;

	let sql = `insert into contacts (name, email, id_user) VALUES ('${firstCharUpperCase}', '${email}', '${id_user}')`;
	connection.getConnection((err, connection) => {
        if(err) throw err;
		connection.query(sql, (err, results) => {
			if (err) throw err;
			connection.release(); // return the connection to pool
			res.status(200).send(results);
		});
	});
};

const contactId = (req, res) => {
	let userId = req.params.id;

	let getAll = `SELECT contacts.name,contacts.email,contacts.id_user 
	from users inner join contacts on users.id = 
	contacts.id_user where users.id = ${userId}`;

	connection.getConnection((err, connection) => {
        if(err) throw err;
		connection.query(getAll, (err, results) => {
			if (err) throw err;
			connection.release(); // return the connection to pool
			res.send(results);
		});
	});
};

module.exports = {
	addNewContact,
	contactId
};
