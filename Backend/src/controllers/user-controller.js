const connection  = require('../database/dbConnection');

const deleteEmail = (req, res) => {
	
	connection.getConnection((err, connection) => {
        if(err) throw err;
		let email = req.params.email;
	
		connection.query(`DELETE FROM ${process.env.DATABASE_USER}.contacts where email = ?`, [email], (err, results) => {
			if (err) throw err;
			connection.release(); // return the connection to pool
			// handle unknown user
			if (results.affectedRows > 0) {
				console.log(results.affectedRows);
				res.send("Users removed");
			} else {
				res.send("Unknown users");
			}
		});
	});
};

const modifyEmail = (req, res) => {
	let email = JSON.stringify(req.params.email).toLowerCase();
	let payload = JSON.stringify(req.body.specify).toLowerCase();
	
	console.log("SPE", payload);
	console.log("@", email);

	connection.getConnection((err, connection) => {
        if(err) throw err;

		connection.query(`UPDATE ${process.env.DATABASE_USER}.contacts SET email = ${payload} WHERE email = ${email}`, (err, results) => {
			if (err) throw err;
			connection.release(); // return the connection to pool
			res.send(results);
		});	
	});
};

module.exports = {
	deleteEmail,
	modifyEmail
};
