// Modules
const auth = require("../middleware/auth-middleware");

// FUNCTION GLOBAL ASYNC
const appRouter = async (app, connection) => {

	// delete user with this email with endpoint /users/:email
	await app.delete("/users/:email", auth, (req, res) => {
		
		let email = req.params.email;
		let usersMailToDelete = `DELETE FROM ${process.env.DATABASE_USER}.contacts where email = ?`;
		
		connection.query(usersMailToDelete, [email], (err, results) => {
			if (err) throw err;
			
			// handle unknown user
			if (results.affectedRows > 0) {
				console.log(results.affectedRows);
				res.send("Users removed");
			} else {
				res.send("Unknown users");
			}
		});
	});

	// update email with endpoint /users/:email
	app.put("/users/:email", (req, res) => {
		
		let email = JSON.stringify(req.params.email).toLowerCase();
		let payload = JSON.stringify(req.body.specify).toLowerCase();
		
		console.log("SPE", payload);
		console.log("@", email);

		let updateEmail = `UPDATE ${process.env.DATABASE_USER}.contacts SET email = ${payload} WHERE email = ${email}`;

		connection.query(updateEmail, (err, results) => {
			if (err) throw err;
			res.send(results);
		});
	});
};

module.exports = appRouter;
