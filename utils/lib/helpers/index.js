/*
 * This file is part of the geena package.
 * Copyright (c) 2009-2014 Rhinostone <geena@rhinostone.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * @module Helpers
 *
 * Geena Utils Helpers
 *
 * @package     Geena.Utils
 * @namespace   Geena.Utils.Helpers
 * @author      Rhinostone <geena@rhinostone.com>
 */

var Helpers = {
        console     : require("./console")(),
        //DateTime    : require("./time")(),
        //Form        : require("./form")(),
        //I18n        : require("./i18n")(),
        path        : require("./path")(),
        context     : require("./context")(),
        model      : require("./model"),
        text        : require("./text")()
};

die = function(){
    process.exit(42);
};
module.exports = Helpers;


/**
 * clone array
 * @return {array} Return cloned array
 **/
Object.defineProperty( Array.prototype, 'clone', {
    writable:   false,
    enumerable: false,
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    value: function(){ return this.slice(0) }
});

/***/
Array.prototype.toString = function(){
    return this.join();
};


Object.defineProperty( Array.prototype, 'inArray', {
    writable:   false,
    enumerable: false,
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    value: function(o){ return this.indexOf(o)!=-1 }
});

Object.defineProperty( Object.prototype, 'count', {
    writable:   true,
    enumerable: false,
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    value: function(){
        if (this instanceof String) this = JSON.parse(this);
        var i = 0;
        for (var prop in this)
            if (this.hasOwnProperty(prop)) ++i;

        return i;
    }
});
/**
Object.defineProperty( Object.prototype, 'push', {
    writable:   true,
    enumerable: false,
    value: function(o){
        this.set
        //if (typeof(this.data) == "undefined") this.data = [];
        console.log("pushing.. ", JSON.stringify(this, null, '/t'));
        //this.data.push(o);
        //this.arr[this.i] = o;
        //++this.i;
        //return this.arr;
    }
});*/

/**
 * __stack Get current stack
 * @return {Object} stack Current stack
 **/
Object.defineProperty(global, '__stack', {
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    get: function(){
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack){
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});



/**
 * __line Get current line number
 * @return {Number} stack Current line number
 * */
Object.defineProperty(global, '__line', {
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    get: function() {
        return __stack[1].getLineNumber();
    }
});


/**
 * __function Get current function name
 * @return {String} function Current function name
 * */
Object.defineProperty(global, '__function', {
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    get: function() {
        return __stack[1].getFunctionName();
    }
});

/**
 * __module Get current module name
 * @return {String} module Current module name
 * */
Object.defineProperty(global, '__module', {
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    get: function() {
        return __stack[1].getFunctionName().split('.')[0];
    }
});

/**
 * __filename Get current file path
 * @return {String} stack Current file path
 * */
Object.defineProperty(global, '__filename', {
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    get: function() {
        return __stack[1].getFileName();
    }
});

/**
 * __file Get current file name
 * @return {Integer} stack Current file name
 * */
Object.defineProperty(global, '__file', {
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    get: function() {
        var filename = __stack[1].getFileName().split(/[\\/]/);
        return filename[filename.length-1];
    }
});

/**
 * __column Get current column number
 * @return {Integer} stack Current column number
 * */
Object.defineProperty(global, '__column', {
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    get: function() {
        return  __stack[1].getColumnNumber();
    }
});

Object.defineProperty( Object.prototype, 'toArray', {
    writable:   true,
    enumerable: false,
    //If loaded several times, it can lead to an exception. That's why I put this.
    configurable: true,
    value: function(force) {
        var arr = [], i = 0;
        for (var prop in this) {
            if ( this.hasOwnProperty(prop) ) {
                if (force) {
                    arr[i] = this[prop]
                } else {
                    arr[prop] = this[prop]
                }
                ++i
            }
        }
        return arr
    }
});

/**
 * String.toArray() Convert string path to array
 * @param {String} delimiter Delimiter caracter for implode
 * @return {Array} array Imploded Array
 * */
String.prototype.toArray = function(delimiter) {
    if (typeof(delimiter) != "undefined") {
        var str = this.toString(), reg = new RegExp(delimiter, "g");
        //Removing delimiter at the begining & at the end.
        if (str.substring(str.length-1) == delimiter)
            str = str.substring(0, str.length-1);
        if (str.substring(0,1) == delimiter) str = str.substring(1);

        return str.split(reg);
    }
};