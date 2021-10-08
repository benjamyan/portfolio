//
// Dependencies and imports
require('dotenv').config();
const express	= require('express');
const ngrok 	= require('ngrok');
const routes	= require('./routes');
//
// Express server setup
const app = express();
app.use(
    express.json()
);
app.use(
    express.urlencoded({
        extended:false
    })
);
app.use((req, res, next) => {
	res.header(
		'Access-Control-Allow-Origin', 
		'*'
	); 
	res.header(
		'Access-Control-Allow-Headers', 
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'POST, GET, OPTIONS'
	);
	next();
});
//
// Express middleware
app.use('/update', routes.update);
app.use('/build', routes.build);
// 
// Instanciate our server & tunnel
(async function() {
	try {
		const port  = process.env.PORT;
		app.listen(
			port, 
			()=> {
				console.log(`Server running on port ${port}`);
			}
		);
		ngrok.connect({
			proto: 'http',
			addr: port,
			authtoken: process.env.NGROK_TOKEN,
			onLogEvent: data => {
				console.log(data)
			}
		});
	} catch (err) {
		console.log(err);
	};
})();