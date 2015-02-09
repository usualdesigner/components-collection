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
        element.click(function () {
            console.log('clicked');
        });
        element.html(_.now());
    };
    componentHandlers.test11 = function (element) {
        element.click(function () {
            console.log('another clicked');
        });
    };
    componentHandlers.test2 = function (element) {
        element.html(_.now());
    };
    componentHandlers.test3 = function (element) {
        element.html(_.now());
    };

    function initialize() {
        var $wrapperElement = $(CORE_SELECTOR),
            elements = $wrapperElement.find('[' + DATA_REQUIRED_ATTRIBUTE + ']');
        _.forEach(elements, function (element) {
            var componentArray = $(element).attr(DATA_REQUIRED_ATTRIBUTE).split(' ');
            _.forEach(componentArray, function (componentName) {
                if (_.has(componentHandlers, componentName)) {
                    if (_.isFunction(componentHandlers[componentName])) {

                        if ($(element).attr(DATA_LOADED_ATTRIBUTE))
                            var loadedComponents = $(element).attr(DATA_LOADED_ATTRIBUTE).split(' ');
                        else
                            var loadedComponents = [];
                        if (loadedComponents.indexOf(componentName) > 0) {
                            console.warn(componentName + " already loaded");
                        } else {
                            componentHandlers[componentName]($(element));
                            loadedComponents.push(componentName);
                            $(element).attr(DATA_LOADED_ATTRIBUTE, loadedComponents.join(' '));
                            console.info("Component " + componentName + " has been loaded");
                        }
                    } else {
                        console.warn(componentName + " is not a function");
                    }
                } else {
                    console.warn("Can't load component '" + componentName + "'");
                }
            });
        });
        $wrapperElement.addClass('component-collection-initialized');
    }

    return {
        initialize: initialize
    };

})();