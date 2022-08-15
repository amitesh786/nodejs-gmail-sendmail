// Modules
// Modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../modules/config");
const saltRounds = 10;

const nodemailer = require('nodemailer');
const auth = require("../middleware/auth-middleware");

// FUNCTION GLOBAL ASYNC
const appRouter = async (app, connection) => {

	// Check if user with this name already exist
	await app.use("/auth/signUp", (req, res, next) => {
		connection.query(
		`SELECT * FROM users WHERE email = '${req.body.email}'`,
			(err, results) => {
				if (err) throw err;
				if (results.length > 0) {
					res.status(200).send("this email already exist.!!!");
				} else {
					next();
				}
			}
		);
	});

	// add an user ==> /sign-up 
	await app.post("/auth/signUp", (req, res) => {
		
		let name = req.body.name.toLowerCase();
		let email = req.body.email.toLowerCase();
		let passwordNotHash = req.body.password;
		
		// Hash the password
		let pass = bcrypt.hashSync(passwordNotHash, saltRounds);
		
		// payload users
		const userObject = {
			name: name,
			email: email,
			pass: pass,
		};

		// Create the user in DB
		connection.query("INSERT INTO users SET ?", userObject, (err, result) => {
			if (err) throw err;
			
			// TOKEN
			let token = jwt.sign({ email: email }, config.secret, {
				expiresIn: expireTime,
			});

			console.log("Auth token created =>", token);
			res.status(201).send({ auth: true, token: token, user: userObject });
		});
	});

	// Check if an user is register ==> /sign-in
	await app.post("/auth/signIn", (req, res) => {
		try {
			let email = req.body.email.toLowerCase();
			let pass = req.body.password;

			let mailUser = "SELECT * FROM users WHERE email = ?";
			let hash = "";

			connection.query(mailUser, [email], (err, results, fields) => {
				if (err) throw err;
				
				console.log("Successfully sign-in =>", results);
				
				// handle email error
				if (!Array.isArray(results) || !results.length) {

					console.log("email error");	
					res.send("Sorry, email incorrect");
				} else {
						
					let name = results[0].name;
					let id = results[0].id;

					// Token
					let token = jwt.sign(
						{ email: email, name: name, id: id },
						config.secret,
						{ expiresIn: expireTime });

					hash = results[0].pass;

					// handle password error
					bcrypt.compare(pass, hash, (err, result) => {

						if (result == true) {
							
							// get the decoded payload ignoring signature, no secretOrPrivateKey needed
							var decoded = jwt.decode(token);
							
							// get the decoded payload and header
							var decoded = jwt.decode(token, { complete: true });
							console.log("Header Decoded =>", decoded.header);
							console.log("Payload Decoded =>", decoded.payload);
							
							res.status(200).send({
								auth: true,
								token: token,
								email: email,
								name: name,
								id: id,
							});
						} else {
							console.log("pass error");
							res.send("password error");
						}
					});
				}
			});
		} catch (error) {
			console.log(error);
		}
	});

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


	// delete user with this email with endpoint /users/:email
	await app.delete("/users/:email", auth, (req, res) => {
		
		let email = req.params.email;
		let usersMailToDelete = "DELETE FROM sql8512646.contacts where email = ?";
		
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

		let updateEmail = "UPDATE sql8512646.contacts SET email = " + payload + "WHERE email = " + email;

		connection.query(updateEmail, (err, results) => {
			if (err) throw err;
			res.send(results);
		});
	});

	// get all database with endpoint /all
	app.get("/all", (req, res) => {
		let getAll = "SELECT * FROM sql8512646.users";

		connection.query(getAll, (err, results) => {
			if (err) throw err;
			res.send(results);
		});
	});
	
	// get all emails endpoint /emails
	app.get("/emails", (req, res) => {
		let getAllEmail = "SELECT email FROM sql8512646.users";
		
		connection.query(getAllEmail, (err, results) => {
		if (err) throw err;
			res.send(results);
		});
	});

	// get all names endpoint /names
	app.get("/names", (req, res) => {
		let getAllNames = "SELECT name FROM sql8512646.users";
		
		connection.query(getAllNames, (err, results) => {
			if (err) throw err;
			res.send(results);
		});
	});

	// create a database endpoint /createDB
	app.post("/createDB", (req, res) => {
		let dbName = req.body.dbName;
		let createDatabase = "CREATE DATABASE " + dbName;
		
		connection.query(createDatabase, (err, results) => {
			if (err) throw err;
			res.send(`Sucess database ${dbName} created`);
		});
	});

	// delete database endpoint /db/:dbName
	app.delete("/db/:dbName", (req, res) => {
		let dbName = req.params.dbName;
		console.log(dbName);
		
		let dbToDelete = "DROP DATABASE " + dbName;
		connection.query(dbToDelete, (err, results) => {
			if (err) throw err;
			res.send(`Successfully Database deleted: ${dbName}`);
		});
	});

	// Post route to handle retrieving data from HTML form to server
	// Route to handle sending mails
	app.post("/sendMail", auth, (req, res) => {

		// Pulling out the form data from the request body
		const recipient = req.body.email;
		const mailSubject = req.body.subject;
		const mailBody = req.body.message;

		// Mail options
		let mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: recipient,
			subject: mailSubject,
			text: mailBody,
			// attachments: [
			// 	{ filename: 'profile.png', path: './images/profile.png' }
			// ]
		};

		console.log(mailOptions);

		try {
			// Get response from the createTransport
			const transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 587,
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD
				},
			});
			transporter.verify().then(console.log).catch(console.error)

			transporter.sendMail(mailOptions, (err, info) => {
				if (err) {
					// failed block
					console.log(err);
					res.send("Error send mail transporter issue", err);
				} else {
					// Success block
					console.log("Email sent: " + info.response);
					res.send("Email sent successfully");
				}
			})
		} catch (error) {
			console.log(error);
			console.log('Error failed by send mail endpoint');
			res.send('Error failed by send mail', error);
		}
	});
};

module.exports = appRouter;
