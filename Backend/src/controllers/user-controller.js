const executeQuery  = require('../database/dbConnection');

const deleteEmail = (req, res) => {
	let email = req.params.email;
	let usersMailToDelete = "DELETE FROM sql8512646.contacts where email = ?";
	
	executeQuery(usersMailToDelete, [email], (err, results) => {
		if (err) throw err;
		
		// handle unknown user
		if (results.affectedRows > 0) {
			console.log(results.affectedRows);
			res.send("Users removed");
		} else {
			res.send("Unknown users");
		}
	});
};

const modifyEmail = (req, res) => {
	let email = JSON.stringify(req.params.email).toLowerCase();
	let payload = JSON.stringify(req.body.specify).toLowerCase();
	
	console.log("SPE", payload);
	console.log("@", email);

	let updateEmail = "UPDATE sql8512646.contacts SET email = " + payload + "WHERE email = " + email;

	executeQuery(updateEmail, (err, results) => {
		if (err) throw err;
		res.send(results);
	});
};

module.exports = {
	deleteEmail,
	modifyEmail
};
