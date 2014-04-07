/*
 * This file is part of the geena package.
 * Copyright (c) 2013 Thomson Reuters <etap@thomsonreuters.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Geena Com Module
 *
 * @author     Martin-Luther ETOUMAN <martin@rhinostone.com>
 */
var GeenaCom;

GeenaCom = function() {
    return {
        Http     : require('./lib/http')
    }
};

module.exports = GeenaCom()