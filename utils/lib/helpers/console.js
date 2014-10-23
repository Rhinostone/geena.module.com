/*
 * This file is part of the gina package.
 * Copyright (c) 2009-2014 Rhinostone <gina@rhinostone.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * ConsoleHelper
 *
 * @package     Gina.Utils.Helpers
 * @namespace   Gina.Utils.Helpers.ConsoleHelper
 * @author      Rhinostone <gina@rhinostone.com>
 * */

module.exports = function() {
    /**
     * @function log
     * @param {string} content to be printed by the terminal
     * */
    log = function() {

        var args = arguments, content = '';
        //console.log("arg: ", args);
        //To handle logs with coma speparated arguments.
        for (var i=0; i<args.length; ++i) {

            if (args[i] instanceof Object) {
                //console.log("\n...", args[i], args[i].toString());
                content += JSON.stringify(args[i], null, '\t')
            } else {
                content += args[i]
            }
        }

        if (content != '')
            process.stdout.write(content + '\n');
    };
    return false
}