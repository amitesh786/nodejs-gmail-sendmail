
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../modules/config");
const saltRounds = 10;

const expireTime = 3600;

const executeQuery  = require('../database/dbConnection');

const signUp = async (req, res) => {

	console.log(req);
	let name = req.body.name;
	let email = req.body.email;
	let passwordNotHash = req.body.password;

	// Hash the password
	let pass = bcrypt.hashSync(passwordNotHash, saltRounds);

	executeQuery(`SELECT * FROM users WHERE email = '${email}'`, (err, results) => {
		if (err) throw err;
		if (results.length > 0) {
			res.status(200).send("this email already exist.!!!");
		}
	});

	// payload users
	const userObject = {
		name: name,
		email: email,
		pass: pass,
	};

	// Create the user in DB
	await executeQuery(`INSERT INTO users SET ?`, userObject, (err, result) => {
		if (err) throw err;
		
		// TOKEN
		let token = jwt.sign({ email: email }, config.secret, {
			expiresIn: expireTime,
		});

		console.log("Auth token created =>", token);
		res.status(201).send({ auth: true, token: token, user: userObject });
	});
};

const signIn = async (req, res) => {	
	
	// let name = req.body.name.toLowerCase();
	// let email = req.body.email.toLowerCase();
	console.log(req);
	let email = req.body.email;
	let pass = req.body.password;

	let mailUser = "SELECT * FROM users WHERE email = ?";
	let hash = "";

	await executeQuery(mailUser, [email], (err, results, fields) => {
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
};

module.exports = {
	signUp,
	signIn
};
