var express = require('express');

const httpPort = 8080;

const options = {
    index: "index.htm"
};

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public', options));

app.listen(httpPort, function() {
    console.log('HTTP server started on port ' + httpPort);
});