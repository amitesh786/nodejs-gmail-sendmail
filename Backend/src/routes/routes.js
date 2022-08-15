// Modules
const nodemailer = require('nodemailer');
const auth = require("../middleware/auth-middleware");

// FUNCTION GLOBAL ASYNC
const appRouter = async (app, connection) => {

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
