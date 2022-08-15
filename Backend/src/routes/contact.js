// Modules
const auth = require("../middleware/auth-middleware");

// FUNCTION GLOBAL ASYNC
const appRouter = async (app, connection) => {

	// Contact added
	await app.post("/contact/addNewContact", auth, (req, res) => {
		
		let name = req.body.name.toLowerCase();
		let firstCharUpperCase = name.charAt(0).toUpperCase() + name.slice(1);
		let email = req.body.email.toLowerCase();
		let id_user = req.body.id_user;
		
		let sql = `insert into contacts (name, email, id_user) VALUES ('${firstCharUpperCase}', '${email}', '${id_user}')`;
		connection.query(sql, (err, results) => {
			if (err) throw err;
			res.status(200).send(results);
		});
	});

	// get contact with the users ID same as user_id
	await app.get("/contact/:id", auth, (req, res) => {
		
		let userId = req.params.id;
		let getAll = `SELECT contacts.name,contacts.email,contacts.id_user 
		from users inner join contacts on users.id = 
		contacts.id_user where users.id = ${connection.escape(userId)}`;

		connection.query(getAll, (err, results) => {
			if (err) throw err;
			res.send(results);
		});
	});
};

module.exports = appRouter;
