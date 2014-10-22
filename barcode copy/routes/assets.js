/**
 * Created by Mark on 28/05/2014.
 * This file contains the routes for the configuration
 */
//Defining Databases
module.exports = function (app, db,logger) {

    bodyParser = require('body-parser')()
    /*
    Get assets
     */

    app.get('/assets',function(req,res){
        console.log('debug items')
        db.assets.find({}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                logger.log('info','Config Get Success');
                res.send(result);
            }
        })
        })

    /*
     Post either a new item or update it
     */
    app.post('/assets', bodyParser,function (req, res) {
            var item = req.body;
            console.log(item);

        }
    )

}