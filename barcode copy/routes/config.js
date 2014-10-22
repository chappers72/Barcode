/**
 * Created by Mark on 28/05/2014.
 * This file contains the routes for the configuration
 */
bodyParser = require('body-parser')()
//Defining Databases
module.exports = function (app, db,logger) {

    /*
    Get a list of configuration items
     */
    app.get('/config', function (req, res) {
            logger.log('debug','Config GET called')
            db.config.find({}, function (err, result) {
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    logger.log('info','Config Get Success');
                    res.send(result);
                }
            })
        }
    );

    /*
    Post either a new item or update it
     */
    app.post('/config', bodyParser,function (req, res) {
             var item = req.body;
            if (item.isEmpty == true) {
                logger.log('debug','Config POST INSERT called')
                db.config.insert(item, function (err, result) {
                    if (err) {
                        res.send({'error': 'An error has occurred'});
                    } else {
                        logger.log('info','Config POST Insert Success');
                        res.send(result);
                    }
                })
            } else {
                logger.log('debug','Config POST UPDATE called')
                db.config.update({}, item, {}, function (err, numReplaced, newDoc) {
                    if (err) {
                        res.send({'error': 'An error has occurred'});
                    } else {
                        logger.log('info','Config POST UPDATE Success');
                        res.send(item);
                    }
                })
            }
        }
    )

    app.delete('/config',function(req,res){
        logger.log('debug','Config DELETE called')
        db.config.remove({}, {}, function (err, numRemoved) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send({"numRemoved":numRemoved});
            }
        });
    })



}