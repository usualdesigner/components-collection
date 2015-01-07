/*!
 * component-collection.js
 * MIT licensed
 *
 * Copyright (C) 2015 Aleksey Bernackiy, http://bernackiy.name
 */
var ComponentCollection = (function () {

    'use strict';

    var CORE_SELECTOR = 'body',
        DATA_REQUIRED_ATTRIBUTE = 'data-component-required',
        DATA_LOADED_ATTRIBUTE = 'data-component-loaded',

        config = {

            dependencies: []

        },

        componentRequired = [],
        componentLoaded = [],
        componentHandlers = {},
        components = [];

    componentHandlers.test1 = function (element) {
        element.html(_.now());
    };
    componentHandlers.test2 = function (element) {
        element.html(_.now());
    };
    componentHandlers.test3 = function (element) {
        element.html(_.now());
    };

    function initialize() {

        var elements = $(CORE_SELECTOR).find('[' + DATA_REQUIRED_ATTRIBUTE + ']');
        _.forEach(elements, function (element) {
            var componentArray = $(element).attr(DATA_REQUIRED_ATTRIBUTE).split(' ');
            _.forEach(componentArray, function (componentName) {
                if (_.has(componentHandlers, componentName)) {
                    if (_.isFunction(componentHandlers[componentName])) {
                        //_.bind(componentHandlers[componentName], $(element));
                        componentHandlers[componentName]($(element));
                        console.info("Component has been loaded");
                    }
                } else {
                    console.warn("Can't load component '" + componentName + "'");
                }
            });
        });
    }

    initialize();

    function getComponents() {

        //

    }

    function setComponents() {

        //

    }

    function loadComponents() {

        //

    }

})();