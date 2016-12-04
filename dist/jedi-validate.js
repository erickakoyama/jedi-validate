(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JediValidate"] = factory();
	else
		root["JediValidate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createObject = createObject;
exports.convertNameToPath = convertNameToPath;
exports.getValueByPath = getValueByPath;
exports.getValueByName = getValueByName;
exports.getRadioGroupValue = getRadioGroupValue;
exports.getInputValue = getInputValue;
exports.getInputData = getInputData;
exports.getData = getData;
exports.getQueryPart = getQueryPart;
exports.convertData = convertData;

var _deepmerge = __webpack_require__(1);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Create object by path and value
 * @param {Array} path - path array
 * @param {string|FileList} value - value on input
 * @returns {object} - data object
 */
function createObject(path, value) {
    var segment = path[0];

    if (segment.length === 0) {
        return value;
    } else if (segment === '[]') {
        return [createObject(path.slice(1), value)];
    }

    return _defineProperty({}, segment, createObject(path.slice(1), value));
}

/**
 * Name regexp for conversion to path
 * @type {RegExp}
 */
var NAME = /(\[(\w*)\]|\w*)/gi;

/**
 * Convart name of input to path array
 * @param {string} name - name of input
 * @returns {Array} - path to value in data object
 */
function convertNameToPath(name) {
    var path = [];

    var matches = NAME.exec(name);
    while (matches !== null) {
        if (matches.index === NAME.lastIndex) {
            NAME.lastIndex += 1;
        }

        path.push(matches[2] || matches[1]);

        matches = NAME.exec(name);
    }

    return path;
}

/**
 * Get value from data object by path
 * @param {Array} path - value path
 * @param {object} data - data object
 */
function getValueByPath(path, data) {
    return path.reduce(function (value, segment) {
        return segment && value ? value[segment] : value;
    }, data || '');
}

/**
 * Get value from data object by name
 * @param {string} name - input name
 * @param {object} data - data object
 */
function getValueByName(name, data) {
    var path = convertNameToPath(name);
    return getValueByPath(path, data);
}

/**
 * Get value from radio group
 * @param {Array} inputs - array of radio inputs
 * @returns {string} value of checked input
 */
function getRadioGroupValue(inputs) {
    return [].concat(_toConsumableArray(inputs)).map(function (radio) {
        return getInputValue(radio);
    }).filter(Boolean)[0];
}

/**
 * Get value form input
 * @param {HTMLInputElement|HTMLSelectElement|Array} input - input element or array of HTMLInputElements
 * @returns {string|FileList|Array} - value of input, or array of value if input is select
 */
function getInputValue(input) {
    if (!input) return '';

    var type = input.type;


    if (Array.isArray(input)) {
        return getRadioGroupValue(input);
    }

    switch (type) {
        case 'select-one':
            return input.options.length ? input.options[input.selectedIndex].value : '';
        case 'select-multiple':
            return [].concat(_toConsumableArray(input.options)).filter(function (option) {
                return option.selected;
            }).map(function (option) {
                return option.value;
            });
        case 'checkbox':
        case 'radio':
            return input.checked ? input.value : '';
        case 'file':
            return input.files;
        default:
            return input.value;
    }
}

/**
 * Get object which key is name of input and value is value of input
 * @param {HTMLInputElement|array} input - input element or Array of HTMLInputElements
 * @returns {object} - data
 */
function getInputData(input) {
    var name = input.name;
    if (!name && Array.isArray(input) && input[0]) {
        name = input[0].name;
    }

    var value = getInputValue(input);
    var path = convertNameToPath(name);

    return createObject(path, value);
}

/**
 * Get data object with values from inputs object
 * @param {object} inputs - inputs object
 * @returns {object} - data object
 */
function getData(inputs) {
    return Object.keys(inputs).reduce(function (data, name) {
        return (0, _deepmerge2.default)(data, getInputData(inputs[name]));
    }, {});
}

/**
 * Create part url for serialize method
 * @param {string} name
 * @param {object|Array|string} data
 * @returns {string} - part of url
 */
function getQueryPart(name, data) {
    if (Array.isArray(data)) {
        return data.reduce(function (part, index) {
            return part + getQueryPart(name + '[' + index + ']', data[index]);
        }, '');
    } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        return Object.keys(data).reduce(function (part, index) {
            return part + getQueryPart(name + '[' + index + ']', data[index]);
        }, '');
    }

    return name + '=' + encodeURIComponent(data) + '&';
}

/**
 * Convert data object to value for sending
 * @param {object} data - data object
 * @param {string} type - type of conversion
 * @returns {string|FormData} - output value
 */
function convertData(data, type) {
    var convertedData = void 0;

    switch (type) {
        case 'serialize':
            convertedData = Object.keys(data).reduce(function (query, name) {
                return '' + query + getQueryPart(name, data[name]);
            }, '');
            return convertedData.length ? convertedData.slice(0, -1) : '';
        case 'formData':
            return Object.keys(data).reduce(function (formData, name) {
                if (data[name] instanceof FileList) {
                    if (data[name].length > 1) {
                        for (var i = 0; i < data[name].length; i += 1) {
                            formData.append(name + '[' + i + ']', data[name][i]);
                        }
                    } else if (data[name].length === 1) {
                        formData.append(name, data[name][0]);
                    }
                } else if (_typeof(data[name]) === 'object') {
                    Object.keys(data[name]).forEach(function (key) {
                        return formData.append(name + '[' + key + ']', data[name][key]);
                    });
                } else {
                    formData.append(name, data[name]);
                }

                return formData;
            }, new FormData());
        case 'json':
        default:
            return JSON.stringify(data);
    }
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.deepmerge = factory();
    }
}(this, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object'

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice()
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument)
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument)
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument))
        }
    })
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {}
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument)
        })
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument)
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument)
        }
    })
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge }
    var arrayMerge = options.arrayMerge || defaultArrayMerge

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
}

return deepmerge

}));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.translate = translate;
exports.addTranslation = addTranslation;
var dictionary = __webpack_require__(7);

var defaultLang = 'en';

function translate(text) {
    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultLang;

    return dictionary[lang] && dictionary[lang][text] || text;
}

function addTranslation(sourceText, translatedText) {
    var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultLang;

    if (dictionary[lang] === undefined) {
        dictionary[lang] = {};
    }
    dictionary[lang][sourceText] = translatedText;
}

/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
    required: {
        func: function func(value) {
            if (!value) return false;
            if (Array.isArray(value) && value.length === 0) return false;
            if (value instanceof FileList && value.length === 0) return false;
            if (typeof value === 'string' && value.trim() === '') return false;

            return true;
        },
        message: 'This field is required'
    },
    regexp: {
        func: function func(value, regexp) {
            return regexp.test(value);
        },
        message: 'Please, provide correct value'
    },
    email: {
        func: function func(value) {
            return (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(value)
            );
        },
        message: 'This email is incorrect'
    },
    filesize: {
        func: function func(value, size) {
            return [].concat(_toConsumableArray(value)).reduce(function (r, file) {
                return file.size < size && r;
            }, true);
        }, // eslint-disable-line max-len
        message: 'This file is too large'
    },
    extension: {
        func: function func(value, extensions) {
            return [].concat(_toConsumableArray(value)).reduce(function (r, file) {
                return extensions.indexOf(file.name.split('.').pop()) !== -1 && r;
            }, true);
        }, // eslint-disable-line max-len
        message: 'This extension is not supported'
    },
    tel: {
        func: function func(value) {
            return (/^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/.test(value)
            );
        },
        message: 'This phone number is incorrect'
    },
    url: {
        func: function func(value) {
            return (/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(value)
            );
        }, // eslint-disable-line max-len
        message: 'Wrong url'
    }
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.validateField = validateField;
exports.validateData = validateData;

var _getData = __webpack_require__(0);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Validate field
 * @param {object} rules - object with rules for validation
 * @param {object} methods - validation methods
 * @param {string|FileList|Array} value - value of input
 * @param {string} name - name on input
 * @param {object} errorMessages - object with error messages
 * @returns {Array.<string>} - array of field errors
 */
function validateField(rules, methods, value, name, errorMessages) {
    var isEmpty = !methods.required.func(value);

    if (isEmpty && rules.required) {
        return [errorMessages[name].required];
    }

    if (isEmpty) {
        return [];
    }

    return Object.keys(rules).reduce(function (errors, method) {
        var params = rules[method];
        if (!params) return errors;

        if (methods[method]) {
            var valid = methods[method].func(value, params);

            if (!valid) {
                errors.push(errorMessages[name][method]);
            }
        } else {
            errors.push('Method "' + method + '" not found');
        }

        return errors;
    }, []);
}

/**
 * Validate data object
 * @param {object} rules - object with rules for validation
 * @param {object} methods - validation methods
 * @param {object} data - data object
 * @param {object} errorMessages - object with error messages
 * @returns {object.<string, Array.<string>>} - object of fields error arrays
 */
function validateData(rules, methods, data, errorMessages) {
    return Object.keys(rules).reduce(function (obj, name) {
        var value = (0, _getData.getValueByName)(name, data);
        var errors = validateField(rules[name], methods, value, name, errorMessages);
        return _extends({}, obj, _defineProperty({}, name, errors.length ? errors : undefined));
    }, {});
}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ajax = ajax;

var _jediValidateI18n = __webpack_require__(2);

/**
 * Sending request
 * @param {{url: string, enctype: string, sendType: string, method: string, data: string|FormData}} options - Sending options
 * @returns {Promise}
 */
function ajax(options) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open(options.method, options.url + (options.method.toUpperCase() === 'GET' ? '?' + options.data : ''), true);

        if (options.sendType === 'serialize') {
            xhr.setRequestHeader('Content-type', options.enctype);
        } else if (options.sendType === 'json') {
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = {};

                    try {
                        response = JSON.parse(xhr.responseText);
                    } catch (e) {
                        response.validationErrors = { base: [(0, _jediValidateI18n.translate)('JSON parsing error')] }; // todo rewrite translate now dont work
                    }

                    resolve(response);
                } else {
                    reject({
                        xhr: xhr,
                        method: options.method,
                        url: options.url,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            }
        };

        xhr.send(options.method.toUpperCase() === 'POST' ? options.data : '');
    });
}

exports.default = ajax;

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getFormOptions = getFormOptions;
exports.getInputRules = getInputRules;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get ajax options from form
 * @param {HTMLFormElement} form - form element
 * @returns {{ajax: {url: string, method: string, enctype: string, sendType: *}}} - object with options for sending
 */
function getFormOptions(form) {
    var enctype = form.getAttribute('enctype');

    return {
        ajax: {
            url: form.getAttribute('action'),
            method: form.getAttribute('method'),
            enctype: enctype,
            sendType: enctype === 'multipart/form-data' ? 'formData' : undefined
        }
    };
}

/**
 * Get validate options from input attribute of className
 * @param {HTMLInputElement|HTMLSelectElement} input - input for validation
 * @returns {object} - rules
 */
function getInputRules(input) {
    var defaultRules = ['required', 'email', 'tel', 'url'];

    var rules = defaultRules.reduce(function (inputRules, rule) {
        return _extends({}, inputRules, _defineProperty({}, rule, input.hasAttribute(rule) || input.type === rule || input.classList.contains(rule)));
    }, {});

    return _extends({}, rules, {
        regexp: input.hasAttribute('pattern') ? new RegExp(input.getAttribute('pattern')) : undefined
    });
}

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = {
	"ru": {
		"This field is required": "Это поле необходимо заполнить",
		"Please, provide correct value": "Пожалуйста, введите корректное значение",
		"This email is incorrect": "Пожалуйста, введите корректный адрес электронной почты",
		"This file is too large": "Попробуйте загрузить файл поменьше",
		"This extension is not supported": "Пожалуйста, выберите файл с правильным расширением",
		"This phone number is incorrect": "Не корректный номер телефона",
		"Wrong url": "Не корректный url",
		"Can not send form!": "Форма не отправлена!",
		"JSON parsing error": "Ошибка разбора JSON"
	}
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deepmerge = __webpack_require__(1);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _getData = __webpack_require__(0);

var _jediValidateI18n = __webpack_require__(2);

var _getOptions = __webpack_require__(6);

var _validateData = __webpack_require__(4);

var _ajax = __webpack_require__(5);

var _methods = __webpack_require__(3);

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JediValidate = function () {

    /**
     * JediValidate
     * @param {HTMLElement} root - element which wrap form element
     * @param {object} options - object with options
     */

    /**
     * Validator options
     * @type {{ajax: {url: string, enctype: string, sendType: string, method: string}, rules: {}, messages: {}, containers: {parent: string, message: string, baseMessage: string}, states: {error: string, valid: string, pristine: string, dirty: string}, formStatePrefix: string, callbacks: {success: (function(object)), error: (function(object.<string, Array.<string>>))}, clean: boolean, redirect: boolean, language: string, translations: {}}}
     */

    /**
     * Object with error message
     * @type {object} - data object
     */

    /**
     * Object with message nodes
     * @type {Object.<string, Element>}
     */

    /**
     * Object with fields
     * @type {Object.<string, Element>}
     */
    function JediValidate(root) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, JediValidate);

        this.fields = {};
        this.inputs = {};
        this.messages = {};
        this.errorMessages = {};
        this.data = {};
        this.methods = _extends({}, _methods2.default);
        this.options = {};
        this.rules = {};

        var defaultOptions = {
            ajax: {
                url: null,
                enctype: 'application/x-www-form-urlencoded',
                sendType: 'serialize', // 'serialize', 'formData', 'json'
                method: 'GET'
            },
            rules: {},
            messages: {},
            containers: {
                parent: 'form-group',
                message: 'help-block',
                baseMessage: 'base-error'
            },
            states: {
                error: 'error',
                valid: 'valid',
                pristine: 'pristine',
                dirty: 'dirty'
            },
            formStatePrefix: 'jedi-',
            callbacks: {
                success: function success() {},
                error: function error() {}
            },
            clean: true,
            redirect: true,
            language: 'en',
            translations: {}
        };

        this.root = root;

        this.options = (0, _deepmerge2.default)(defaultOptions, options);

        this.nodes = JediValidate.cacheNodes(this.root, this.options);

        var formOptions = (0, _getOptions.getFormOptions)(this.nodes.form);

        this.options = (0, _deepmerge2.default)(this.options, defaultOptions);
        this.options = (0, _deepmerge2.default)(this.options, formOptions);
        this.options = (0, _deepmerge2.default)(this.options, options);

        this.rules = _extends({}, this.options.rules);

        // todo rewrite translations
        Object.keys(this.options.translations).forEach(function (language) {
            Object.keys(_this.options.translations[language]).forEach(function (translation) {
                (0, _jediValidateI18n.addTranslation)(translation, _this.options.translations[language][translation], language);
            });
        });

        this.ready();

        this.errorMessages = this.initErrorMessages(this.rules, this.options.messages, this.methods, this.options.language);
    }

    /**
     * Add localisation to JediValidate
     * @param {string} sourceText - text on english
     * @param {string} translatedText - text on needed language
     * @param {string} language - language
     */

    /**
     * Validator rules
     * @type {object}
     */

    /**
     * Validate methods
     * @type {Object.<string, {func: Function, message: string}>}
     */

    /**
     * Object with error message
     * @type {Object.<string, Object.<string, string>>}
     */

    /**
     * Object with inputs nodes
     * @type {Object.<string, HTMLInputElement|HTMLSelectElement|Array>}
     */


    _createClass(JediValidate, [{
        key: 'ready',
        value: function ready() {
            var _this2 = this;

            this.nodes.form.setAttribute('novalidate', 'novalidate');

            this.nodes.form.addEventListener('submit', function (event) {
                event.preventDefault();
                _this2.data = (0, _getData.getData)(_this2.inputs);

                var errors = (0, _validateData.validateData)(_this2.rules, _this2.methods, _this2.data, _this2.errorMessages);

                if (errors && Object.keys(errors).filter(function (name) {
                    return errors[name];
                }).length !== 0) {
                    Object.keys(errors).forEach(function (name) {
                        return JediValidate.markField(_this2.fields[name], _this2.messages[name], _this2.options.states, errors[name]);
                    });

                    try {
                        _this2.options.callbacks.error(errors);
                    } catch (e) {
                        console.error(e);
                    }

                    event.preventDefault();
                    return;
                }

                if (_this2.options.ajax && _this2.options.ajax.url) {
                    event.preventDefault();
                } else {
                    try {
                        _this2.options.callbacks.success(null);
                    } catch (e) {
                        console.error(e);
                    }

                    return;
                }

                var convertedData = (0, _getData.convertData)(_this2.data, _this2.options.ajax.sendType);
                _this2.send(_extends({}, _this2.options.ajax, {
                    data: convertedData
                }));
            });

            this.nodes.inputs.forEach(function (input) {
                var name = input.name;

                if (_this2.inputs[name]) {
                    if (Array.isArray(_this2.inputs[name])) {
                        _this2.inputs[name].push(input);
                    } else {
                        var groupInput = [_this2.inputs[name], input];
                        groupInput.name = name;
                        _this2.inputs[name] = groupInput;
                    }
                } else {
                    _this2.inputs[name] = input;

                    var field = input.parentNode;

                    do {
                        if (field.classList.contains(_this2.options.containers.parent)) {
                            _this2.fields[name] = field;
                            break;
                        }

                        field = field.parentNode;
                    } while (field);

                    if (!_this2.fields[name]) {
                        throw new Error('Have no parent field');
                    }

                    _this2.fields[name].classList.add(_this2.options.states.pristine);

                    var messageElement = _this2.fields[name].querySelector('.' + _this2.options.containers.message);

                    if (messageElement) {
                        _this2.messages[name] = messageElement;
                    } else {
                        _this2.messages[name] = document.createElement('div');
                        _this2.messages[name].classList.add(_this2.options.containers.message);
                        _this2.fields[name].appendChild(_this2.messages[name]);
                    }

                    _this2.rules[name] = _this2.rules[name] || {};
                    var inputRules = (0, _getOptions.getInputRules)(input);
                    _this2.rules[name] = (0, _deepmerge2.default)(_this2.rules[name], inputRules);

                    Object.keys(_this2.rules[name]).forEach(function (rule) {
                        if (_this2.rules[name][rule]) {
                            _this2.fields[name].classList.add(rule);
                        }
                    });
                }

                input.addEventListener('change', function () {
                    _this2.fields[name].classList.remove(_this2.options.states.dirty);

                    var inputData = (0, _getData.getInputData)(input);
                    var value = (0, _getData.getValueByName)(name, inputData);

                    _this2.data = _extends({}, _this2.data, inputData);

                    var errors = (0, _validateData.validateField)(_this2.rules[name], _this2.methods, value, input.name, _this2.errorMessages);

                    JediValidate.markField(_this2.fields[name], _this2.messages[name], _this2.options.states, errors);
                });

                input.addEventListener('input', function () {
                    _this2.fields[name].classList.remove(_this2.options.states.pristine);
                    _this2.fields[name].classList.add(_this2.options.states.dirty);
                });
            });
        }

        /**
         * Send form
         * @param {{url: string, enctype: string, sendType: string, method: string, data: string|FormData}} options - object with options for sending
         */

    }, {
        key: 'send',
        value: function send(options) {
            var _this3 = this;

            (0, _ajax.ajax)(options).then(function (response) {
                if (response.validationErrors) {
                    try {
                        _this3.options.callbacks.error(response.validationErrors);
                    } catch (e) {
                        console.error(e);
                    }

                    if (response.validationErrors.base) {
                        _this3.nodes.baseMessage.innerHTML = response.validationErrors.base.join(', ');
                        _this3.root.classList.add(_this3.options.formStatePrefix + _this3.options.states.error); // eslint-disable-line max-len
                        _this3.root.classList.remove(_this3.options.formStatePrefix + _this3.options.states.valid); // eslint-disable-line max-len
                        delete response.validationErrors.base;
                    } else {
                        _this3.nodes.baseMessage.innerHTML = '';
                    }

                    Object.keys(response.validationErrors).forEach(function (name) {
                        return JediValidate.markField(_this3.fields[name], _this3.messages[name], _this3.options.states, response.validationErrors[name]);
                    });
                } else {
                    try {
                        _this3.options.callbacks.success(response);
                    } catch (e) {
                        console.error(e);
                    }

                    if (_this3.options.redirect && response.redirect) {
                        window.location.href = response.redirect;
                        return;
                    }

                    if (_this3.options.clean) {
                        _this3.nodes.form.reset();
                    }
                }
            }).catch(function (_ref) {
                var method = _ref.method,
                    url = _ref.url,
                    status = _ref.status,
                    statusText = _ref.statusText;

                console.warn(method + ' ' + url + ' ' + status + ' (' + statusText + ')');

                _this3.nodes.baseMessage.innerHTML = (0, _jediValidateI18n.translate)('Can not send form!', _this3.options.language);
                _this3.root.classList.add(_this3.options.formStatePrefix + _this3.options.states.error); // eslint-disable-line max-len
                _this3.root.classList.remove(_this3.options.formStatePrefix + _this3.options.states.valid); // eslint-disable-line max-len
            });
        }

        /**
         *
         * @param {Element} field
         * @param message
         * @param states
         * @param errors
         */

    }, {
        key: 'addMethod',


        /**
         * Add rule to validator
         * @param {string} rule - rule name
         * @param {Function} func - function
         * @param {string} message - error message
         */
        value: function addMethod(rule, func, message) {
            this.methods[rule] = {
                func: func,
                message: message
            };
        }

        /**
         * Init error messages
         * @param {object} rules
         * @param {object} messages
         * @param {object} methods
         * @param {string} language
         * @returns {Object.<string, Object.<string, string>>}
         */

    }, {
        key: 'initErrorMessages',
        value: function initErrorMessages(rules, messages, methods, language) {
            return Object.keys(rules).reduce(function (names, name) {
                return _extends({}, names, _defineProperty({}, name, Object.keys(rules[name]).reduce(function (ruleNames, method) {
                    return _extends({}, ruleNames, _defineProperty({}, method, (0, _jediValidateI18n.translate)(messages[name] && messages[name][method] || methods[method] && methods[method].message || '', language)));
                }, {})));
            }, {});
        }
    }], [{
        key: 'addToDictionary',
        value: function addToDictionary(sourceText, translatedText, language) {
            (0, _jediValidateI18n.addTranslation)(sourceText, translatedText, language);
        }

        /**
         * Return object with working elements
         * @param root Root element for search
         * @param options Object with selectors
         * @returns {{form: Element, inputs: NodeList, baseMessage: Element}}
         */

    }, {
        key: 'cacheNodes',
        value: function cacheNodes(root, options) {
            return {
                form: root.querySelector('form'),
                inputs: root.querySelectorAll('[name]'),
                baseMessage: root.querySelector('.' + options.containers.baseMessage)
            };
        }
    }, {
        key: 'markField',
        value: function markField(field, message, states, errors) {
            if (errors && errors.length) {
                JediValidate.markError(field, message, states, errors);
            } else {
                JediValidate.markValid(field, message, states);
            }
        }

        /**
         *
         * @param {Element} field
         * @param {Element} message
         * @param {string} error
         * @param {string} valid
         * @param {Array.<string>} errors
         */

    }, {
        key: 'markError',
        value: function markError(field, message, _ref2, errors) {
            var error = _ref2.error,
                valid = _ref2.valid;

            if (!field || !message) {
                return;
            }

            field.classList.add(error);
            field.classList.remove(valid);

            message.innerHTML = errors.join(', ');
        }

        /**
         *
         * @param {Element} field
         * @param {Element} message
         * @param {string} error
         * @param {string} valid
         */

    }, {
        key: 'markValid',
        value: function markValid(field, message, _ref3) {
            var error = _ref3.error,
                valid = _ref3.valid;

            if (!field || !message) {
                return;
            }

            field.classList.add(valid);
            field.classList.remove(error);

            message.innerHTML = '';
        }
    }]);

    return JediValidate;
}();

module.exports = JediValidate;

/***/ }
/******/ ]);
});
//# sourceMappingURL=jedi-validate.js.map