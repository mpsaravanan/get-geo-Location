const express = require('express');
const app = express();
 
var NodeGeocoder = require('node-geocoder');
var options = {
	provider: 'google',
	apiKey: 'API_KEY',
	formatter: null        
};
var geocoder = NodeGeocoder(options);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/get', (req, res) => {
	var latitude = req.param('lat');
  	var longitude = req.param('long');
  	async function getGeoLocation(latitude, longitude) {
  		let promise = new Promise((resolve, reject) => {
	        geocoder.reverse({lat:latitude, lon:longitude
	        }).then((resp) => {
	        	return resp;
	        }).then((data) => {
	        	return resolve(data);
	        }).catch((reason) => {
	        	return reject(reason);
	        });
	    });
	    let response = await promise;
	    res.send(JSON.stringify(response));
	}  
	getGeoLocation(latitude, longitude);
})

//Listen Port 3000
app.listen(3000, function() {
  console.log('listening on 3000')
});

