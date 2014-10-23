/*
 * This file is part of the gina package.
 * Copyright (c) 2013 Thomson Reuters <etap@thomsonreuters.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Gina Com Module
 *
 * @author     Martin-Luther ETOUMAN <martin@rhinostone.com>
 */
function GinaCom() {
    return {
        http : require('./lib/http')
    }
};

module.exports = GinaCom()