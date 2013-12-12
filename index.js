/*
 * This file is part of the etap package.
 * Copyright (c) 2013 Thomson Reuters <etap@thomsonreuters.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Geena Http Module
 *
 * @author     Martin-Luther ETOUMAN <martin@rhinostone.com>
 */
var GeenaHttp;

GeenaHttp = function(){
    return {
        Client     : require('./client')
    };
};

module.exports = GeenaHttp();