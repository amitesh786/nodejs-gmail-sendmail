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

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const contactRouter = require('./routes/contact');
const routesRouter = require('./routes/routes');

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

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/contact', contactRouter);
app.use('/', routesRouter);

app.get('/', (req, res) => {
    // response.render(path.join(__dirname + '/../dist/index.html'));
	res.sendFile('index.html', { root: path.join(__dirname, '../public/dist/') });
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port: ${process.env.PORT}.`);
});
