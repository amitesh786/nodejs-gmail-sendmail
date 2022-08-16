const executeQuery  = require('../database/dbConnection');

const getAllUser = async (req, res) => {

	// get all database with endpoint /all
	let getAll = "SELECT * FROM sql8512646.users";

	executeQuery(getAll, (err, results) => {
		if (err) throw err;
		res.send(results);
	});		
};

const getAllEmails = async (req, res) => {

	let getAllEmail = "SELECT email FROM sql8512646.users";

	executeQuery(getAllEmail, (err, results) => {
	if (err) throw err;
		res.send(results);
	});
};

const getAllNames = async (req, res) => {

	let getAllNames = "SELECT name FROM sql8512646.users";
		
	executeQuery(getAllNames, (err, results) => {
		if (err) throw err;
		res.send(results);
	});
};

const postDB = async (req, res) => {

	let dbName = req.body.dbName;
	let createDatabase = "CREATE DATABASE " + dbName;
	
	executeQuery(createDatabase, (err, results) => {
		if (err) throw err;
		res.send(`Sucess database ${dbName} created`);
	});
};

const deleteDBName = async (req, res) => {

	let dbName = req.params.dbName;

	let dbToDelete = "DROP DATABASE " + dbName;
	executeQuery(dbToDelete, (err, results) => {
		if (err) throw err;
		res.send(`Successfully Database deleted: ${dbName}`);
	});
};

const sendMails = async (req, res) => {

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
};

module.exports = {
	getAllUser,
	getAllEmails,
	getAllNames,
	postDB,
	deleteDBName,
	sendMails
};
