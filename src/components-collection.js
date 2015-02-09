/*!
 * component-collection.js
 * MIT licensed
 *
 * Copyright (C) 2015 Aleksey Bernackiy, http://bernackiy.name
 */
var ComponentCollection = (function () {

    'use strict';

    var DATA_REQUIRED_ATTRIBUTE = 'data-component-required',
        DATA_LOADED_ATTRIBUTE = 'data-component-loaded',

        componentHandlers = {};

    function bindComponents(wrapperElement) {
        var $wrapperElement = wrapperElement,
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
        createComponent: function (name, handler) {
            componentHandlers[name] = handler;
        },
        bindComponents: bindComponents
    };

})();