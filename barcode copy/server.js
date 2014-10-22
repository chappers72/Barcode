
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

//Local database - probably need to migrate to mongo for cloud version
var nedb = require('nedb');
//For Cross Domain Calls - probably need to remove once in production
var cors = require('cors');

//Logger
var winston=require('winston');
var Papertrail=require('winston-papertrail').Papertrail;


var logger = new winston.Logger({
   transports: [
       new winston.transports.Papertrail({
           host: 'logs.papertrailapp.com',
           port: 41288,
           hostname: 'barcode-mb-dev'
       }),
       new winston.transports.Console({
           timestamp: function() {
               return new Date().toString();
           },
           colorize: true
       })
    ]
});

//Defining Databases
var db = {
     config:new nedb({filename:"db/config.db",autoload:true}),
     assets:new nedb({filename:"db/assets.db",autoload:true})
};


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cors());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//CORS generic header for options
app.options('*', cors());

//Configuration router
require('./routes/config.js')(app,db,logger);
require('./routes/assets.js')(app,db,logger);

var host = process.env.VCAP_APP_HOST || process.env.HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || process.env.PORT || 3000;


var server = http.createServer(app).listen(port, function() {
    console.log('Express server listening @ ' + host + ' on port ' + port);
});




