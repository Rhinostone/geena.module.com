/* Geena Http HttpClient
 *
 * This file is part of the geena.http package.
 * Copyright (c) 2013 Rhinostone <geena@rhinontone.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * HttpClient Constructor
 *
 * @constructor
 *
 * @param {opject} options
 * @param {object} [data]
 *
 * TODO - Support behind proxy query for insecure world
 * TODO - Download query, wget like
 * TODO - Unit tests and functional tests
 *
 * */
var HttpClient;

//Imports.
var http        = require('http'),
    utils       = require('geena').utils;
if (utils == undefined) {
    console.error('You need to install Geena: $ npm install geena');
    process.exit(1);
}
var logger      = utils.logger;

HttpClient = function(){
    var _this = this;

    var _data = {};

    var _options = {
        host    : undefined,
        path    : undefined,
        port    : undefined,
        method  : 'POST',
        agent   : false,
        headers : {
            'Content-Type': 'application/json',
            'Content-Length': _data.length
        }
    };

    this.getDefaultOptions  = function(){
        return _options;
    };

    this.query = function(options, data, callback){

        var queryData = {}, defaultOptions = _this.getDefaultOptions();
        var path = options.path;

        utils.extend(true, options, defaultOptions);

        //console.log("Querying ", "\n[0]" + options, "\n[1]" + data, "\n[2]" + callback);
        if (arguments.length <3) {
            if ( typeof(data) == 'function') {
                var callback = data;
                var data = undefined;
            } else {
                callback = undefined;
            }
        }
        //console.log("PATH => ", options.path, " VS ", data);
        //console.log(".....PRE details ", "\n[0]" + JSON.stringify(options, null, 4), "\n[1]" + JSON.stringify(data, null, 4), "\n[2]" + callback);

        if ( typeof(data) != "undefined" &&  data.count() > 0) {

            queryData = '?';

            for (var d in data) {
                if ( typeof(data[d]) == 'object') {
                    data[d] = JSON.stringify(data[d]);
                }
                queryData += d + '=' + data[d] + '&';
            }

            //console.log(".....details ", "\n[0]" + JSON.stringify(options, null, 4), "\n[1]" + JSON.stringify(data, null, 4), "\n[2]" + callback);
            queryData = queryData.substring(0, queryData.length-1);
            options.path += queryData;

            //Sample request.
            //options.path = '/updater/start?release={"version":"0.0.5-dev","url":"http://10.1.0.1:8080/project/bundle/repository/archive?ref=0.0.5-dev","date":1383669077141}&pid=46493';
        }

        queryData = JSON.stringify(queryData);
        //you need this, even for empty.
        options.headers['Content-Length'] = queryData.length;
        var req = http.request(options, function(res) {
            //Maybe useless ???.
            if (res.statusCode != 200) {
                var err = 'BAD connection or BAD serveur response on ' + options.host +  ':' +options.port +options.path;
                logger.error('etap', 'ETAP:HTTPAPI:ERR:1', err, __stack);
                if ( typeof(callback) != "undefined") {
                    callback(err);
                }
            } else {
                res.on('data', function (chunk) {
                    //Only when needed.
                    if ( typeof(callback) != "undefined") {
                        console.log("trying to callback ", typeof(callback));
                        callback( false, JSON.parse( chunk.toString() ) );
                    }
                });
            }

        });
        if (req) {
            req.write(queryData);
        }
        //starting from from >0.10.15
        req.on('error', function(err){
            logger.error(
                'geena.http',
                'GEENA:HTTP_CLIENT:ERR:1',
                '['+options.host + '] must be down or refusing connection @ ' + options.host +  ':' +options.port +options.path,
                __stack
            );
            if ( typeof(callback) != "undefined") {
                err.stack += '\nat    '+__stack;
                callback(err);
            }
        });
    };

    this.download  = function(url, target, callback){
        //callback(err)
    };

};

module.exports = HttpClient;