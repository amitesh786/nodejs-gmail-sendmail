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

const port = process.env.PORT || 4000;

// CORS middleware
const whiteList = ['http://localhost:8080', 'http://localhost:4000'];
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

const staticFileMiddleware = express.static(path.join(__dirname + '/../public/dist'));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(history());
app.use(staticFileMiddleware);

// connection mysql
const connection = require("./database/dbSql");
connection.connect();

// Routes for all
require("./routes/auth")(app, connection);
require("./routes/user")(app, connection);
require("./routes/contact")(app, connection);
require("./routes/routes")(app, connection);

app.get('/', (req, res) => {
    // res.render(path.join(__dirname + '/../dist/index.html'));
	res.sendFile('index.html', { root: path.join(__dirname, '../public/dist/') });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}.`);
});
