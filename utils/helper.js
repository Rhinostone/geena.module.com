var GeenaUtils;

GeenaUtils = function() {
    /**
     * Check if object before extending.
     * */
    var isObject = function(obj) {
        if (
            !obj ||
            {}.toString.call(obj) !== '[object Object]' ||
            obj.nodeType ||
            obj.setInterval
            ) {
            return false
        }

        var hasOwn              = {}.hasOwnProperty;
        var hasOwnConstructor   = hasOwn.call( obj, 'constructor');
        var hasMethodPrototyped = hasOwn.call( obj.constructor.prototype, 'isPrototypeOf');


        if (
            obj.constructor &&
            !hasOwnConstructor &&
            !hasMethodPrototyped
            ) {
            return false
        }

        //Own properties are enumerated firstly, so to speed up,
        //if last one is own, then all properties are own.
        var key;
        return key === undefined || hasOwn.call( obj, key )
    }
    /**
     *
     * @param {boolean} deep - Deep copy
     * @param {boolean} [override] - Override when copying
     * @param {object} target - Target object
     * @param {object} source - Source object
     *
     * @return {object} [result]
     * */
    extend = function() {
        var target = arguments[ 0 ] || {};
        var i      = 1;
        var length = arguments.length;
        var deep   = false;
        var override = false;
        var options, name, src, copy, copy_is_array, clone;

        // Handle a deep copy situation
        if ( typeof target === 'boolean' ) {
            deep   = target;
            target = arguments[ 1 ] || {};
            // skip the boolean and the target
            i = 2
        }
        // Handle an override copy situation
        if ( typeof target === 'boolean' ) {
            override   = target;
            target = arguments[ 2 ] || {};
            // skip the boolean and the target
            i = 3
        }


        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== 'object' && typeof target !== 'function' ) {
            target = {};
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if (( options = arguments[ i ]) != null ) {
                // Extend the base object
                for (var name in options ) {
                    src  = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (
                        deep &&
                        copy &&
                        (
                            isObject( copy ) ||
                            ( copy_is_array = Array.isArray( copy ) )
                            )
                        ) {

                        if ( copy_is_array ) {
                            copy_is_array = false;
                            clone = src && Array.isArray( src ) ? src : []
                        } else {
                            clone = src && isObject( src) ? src : {}
                        }

                        //[propose] Supposed to go deep... deep... deep...
                        if (!override) {
                            for (var prop in copy) {
                                if( typeof(clone[ prop ]) != "undefined" ){
                                    copy[ prop ] = clone[ prop ];
                                }
                            }
                        }

                        // Never move original objects, clone them
                        if (typeof(src) != "boolean") {//if property is not boolean
                            target[ name ] = extend( deep, override, clone, copy )
                        }
                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        //[propose]Don't override existing if prop defined or override @ false
                        if (
                            typeof(src) != "undefined" &&
                            src != copy &&
                            !override
                            ) {
                            target[ name ] = src
                        } else {
                            target[ name ] = copy
                        }

                    }
                }
            }
        }
        // Return the modified object
        return target
    }
}
exports.module = GeenaUtils()
