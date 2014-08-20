/* Geena Http HttpClient
 *
 * This file is part of the geena.http package.
 * Copyright (c) 2013-2014 Rhinostone <geena@rhinontone.com>
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
 * Errors
 *  [ Error: socket hang up... ]
 *      Could be your proxy or you trying to send junk to the server
 *
 * */

//Imports.
var http = require('http');
var utils = require('geena').utils || require('./utils');
var merge = utils.merge;

function HttpClient() {
    var self = this;
    var local = {};
    local.data = {};
    local.options = {
        host    : undefined, // Must be an IP
        hostname    : 'localhost', // cname of the host e.g.: www.google.com
        path    : undefined, // e.g.: /test.html
        port    : 80, // #80 by default but can be 3000
        method  : 'POST', // POST | GET | PUT | DELETE
        agent   : false,
        headers : {
        'Content-Type': 'application/json',
            'Content-Length': local.data.length
        }
    }


    this.getDefaultOptions  = function() {
        return local.options
    }

    this.query = function(options, data, callback) {

        var queryData = {}, defaultOptions = self.getDefaultOptions();
        var path = options.path;

        options = merge(options, defaultOptions);
        for (var o in options) {//cleaning
            if (!options[o]) {
                delete options[o]
            }
        }

        if (arguments.length <3) {
            if ( typeof(data) == 'function') {
                var callback = data;
                var data = undefined;
            } else {
                callback = undefined;
            }
        }
        if ( typeof(data) != "undefined" &&  data.count() > 0) {

            queryData = '?';

            for (var d in data) {
                if ( typeof(data[d]) == 'object') {
                    data[d] = JSON.stringify(data[d]);
                }
                queryData += d + '=' + data[d] + '&';
            }

            queryData = queryData.substring(0, queryData.length-1);
            queryData = queryData.replace(/\s/g, '%20');
            options.path += queryData;

            //Sample request.
            //options.path = '/updater/start?release={"version":"0.0.5-dev","url":"http://10.1.0.1:8080/project/bundle/repository/archive?ref=0.0.5-dev","date":1383669077141}&pid=46493';
        }



        //you need this, even for empty.
        options.headers['Content-Length'] = queryData.length;
        var req = http.request(options, function(res) {

            //Maybe useless ???.
            //if (res.statusCode != 200) {
            //    err = 'BAD connection or BAD serveur response on ' + options.host +  ':' +options.port +options.path;
            //    if ( typeof(callback) != "undefined") {
            //        callback(err)
            //    } else {
            //        throw new Error(err)
            //    }
            //} else {

            res.setEncoding('utf8');
            var data = '';

            res.on('data', function onData (chunk) {
                //Only when needed.
                data += chunk;
            });
            res.on('end', function onEnd() {
                //Only when needed.
                if ( typeof(callback) != "undefined")
                    callback( false, data ) // data will always be a string
            })
        });


        //starting from from >0.10.15
        req.on('error', function onError(err) {
            if ( typeof(callback) != "undefined") {
                callback(err)
            } else {
                throw new Error(err)
            }
        });

        if (req) {
            if (req.write)
                req.write(queryData);

            if (req.end)
                req.end();
        }
    }

    this.download  = function(url, target, callback) {

        //callback(err)
    }

    return this

};

module.exports = HttpClient