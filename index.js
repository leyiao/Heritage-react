const express = require('express');
const cors = require('cors');
const app = express();
//---------------- Allow Cross Origin ----------------

app.use(cors());
//------------------ body parser ------------------
app.use(express.json());
//----------Routes const----------------- 

const user_routes = require('./routes/api/users');
const timeline_routes = require('./routes/api/timeline');
const postcard_routes = require('./routes/api/postcard');
const physical_routes = require('./routes/api/comment');
const photos_routes = require('./routes/api/photos');
const letters_routes = require('./routes/api/letters');
const Form_routes = require('./routes/api/New_Artifact_form');

//----------------- routes ------------------

app.use("/api", user_routes);
app.use("/api", timeline_routes);
app.use("/api", postcard_routes);
app.use("/api", physical_routes);
app.use("/api", photos_routes);
app.use("/api", letters_routes);
app.use("/api", Form_routes);



//------------------ port -----------------

var PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});  

if (process.env.NODE_ENV === 'production') {
	// Exprees will serve up production assets
	app.use(express.static('client/build'));
  
	// Express serve up index.html file if it doesn't recognize route
	const path = require('path');
	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
  }




