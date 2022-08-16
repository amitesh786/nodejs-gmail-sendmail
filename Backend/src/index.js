// Module
const express = require('express');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');
const app = express();

// Import dev enviornment
const dotenv = require("dotenv");

// Config env
dotenv.config();
const port = process.env.PORTAPP || 4000;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const contactRouter = require('./routes/contact');
const routesRouter = require('./routes/routes');

// CORS middleware
const whiteList = ['http://localhost:8080', 'http://localhost:4000', 'https://nodejs-test-gmail.herokuapp.com/'];
const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.includes(origin) || !origin) { // !origin allows REST tools and server2server interaction
			callback(null, true);
		}
		else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true
};

const staticFileMiddleware = express.static(path.join(__dirname + '/../dist'));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(history());
app.use(staticFileMiddleware);

// connection mysql
// const connection = require("./database/dbSql");
// connection.connect();

// Routes for all
// require("./routes/auth")(app, connection);
// require("./routes/user")(app, connection);
// require("./routes/contact")(app, connection);
// require("./routes/routes")(app, connection);

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/contact', contactRouter);
app.use('/', routesRouter);

app.get('/', (request, response) => {
    response.render(path.join(__dirname + '/../dist/index.html'));
});

app.listen(process.env.PORTAPP || 4000, () => {
    console.log(`Server is running on port: ${process.env.PORTAPP}.`);
});
