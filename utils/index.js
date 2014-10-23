/*
 * This file is part of the gina package.
 * Copyright (c) 2014 Rhinostone <gina@rhinostone.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Gina.Core.Utils Class
 *
 * @package    Gina.Core
 * @author     Rhinostone <gina@rhinostone.com>
 */


var merge = require('./lib/merge');


function Utils() {

    var self = this;


    /**
     * Clean files on directory read
     * Mac os Hack
     * NB.: use once in the server.js
     * TODO - remove it...
     **/
    this.cleanFiles = function(files){
        for(var f=0; f< files.length; f++){
            if(files[f].substring(0,1) == '.')
                files.splice(0,1);
        }
        return files;
    };

    var _require = function(path) {
        var cacheless = (process.env.IS_CACHELESS == 'false') ? false : true;
        if (cacheless) {
            delete require.cache[require.resolve(path)];
            return require(path)
        } else {
            return require(path)
        }
    }


    return {
        inherits    : _require('./lib/inherits'),
        helpers     : _require('./lib/helpers'),
        //this one must move to Dev since it's dev related
        merge       : _require('./lib/merge')
    }
};

module.exports = Utils()