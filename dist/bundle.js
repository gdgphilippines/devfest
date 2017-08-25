/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		4: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  'use strict';

  var userPolymer = window.Polymer;

  /**
   * @namespace Polymer
   * @summary Polymer is a lightweight library built on top of the web
   *   standards-based Web Components API's, and makes it easy to build your
   *   own custom HTML elements.
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer = function (info) {
    return window.Polymer._polymerFn(info);
  };

  // support user settings on the Polymer object
  if (userPolymer) {
    Object.assign(Polymer, userPolymer);
  }

  // To be plugged by legacy implementation if loaded
  /* eslint-disable valid-jsdoc */
  /**
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer._polymerFn = function (info) {
    // eslint-disable-line no-unused-vars
    throw new Error('Load polymer.html to use the Polymer() function.');
  };
  /* eslint-enable */

  window.Polymer.version = '2.0.1';

  /* eslint-disable no-unused-vars */
  /*
  When using Closure Compiler, JSCompiler_renameProperty(property, object) is replaced by the munged name for object[property]
  We cannot alias this function, so we have to use a small shim that has the same behavior when not compiling.
  */
  window.JSCompiler_renameProperty = function (prop, obj) {
    return prop;
  };
  /* eslint-enable */
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

(function () {

  'use strict';

  /** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */

  var AsyncInterface = void 0; // eslint-disable-line no-unused-vars

  // Microtask implemented using Mutation Observer
  var microtaskCurrHandle = 0;
  var microtaskLastHandle = 0;
  var microtaskCallbacks = [];
  var microtaskNodeContent = 0;
  var microtaskNode = document.createTextNode('');
  new window.MutationObserver(microtaskFlush).observe(microtaskNode, { characterData: true });

  function microtaskFlush() {
    var len = microtaskCallbacks.length;
    for (var i = 0; i < len; i++) {
      var cb = microtaskCallbacks[i];
      if (cb) {
        try {
          cb();
        } catch (e) {
          setTimeout(function () {
            throw e;
          });
        }
      }
    }
    microtaskCallbacks.splice(0, len);
    microtaskLastHandle += len;
  }

  /**
   * Module that provides a number of strategies for enqueuing asynchronous
   * tasks.  Each sub-module provides a standard `run(fn)` interface that returns a
   * handle, and a `cancel(handle)` interface for canceling async tasks before
   * they run.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides a number of strategies for enqueuing asynchronous
   * tasks.
   */
  Polymer.Async = {

    /**
     * Async interface wrapper around `setTimeout`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `setTimeout`.
     */
    timeOut: {
      /**
       * Returns a sub-module with the async interface providing the provided
       * delay.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} delay Time to wait before calling callbacks in ms
       * @return {AsyncInterface} An async timeout interface
       */
      after: function after(delay) {
        return {
          run: function run(fn) {
            return setTimeout(fn, delay);
          },

          cancel: window.clearTimeout.bind(window)
        };
      },

      /**
       * Enqueues a function called in the next task.
       *
       * @memberof Polymer.Async.timeOut
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.setTimeout.bind(window),
      /**
       * Cancels a previously enqueued `timeOut` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.clearTimeout.bind(window)
    },

    /**
     * Async interface wrapper around `requestAnimationFrame`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestAnimationFrame`.
     */
    animationFrame: {
      /**
       * Enqueues a function called at `requestAnimationFrame` timing.
       *
       * @memberof Polymer.Async.animationFrame
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.requestAnimationFrame.bind(window),
      /**
       * Cancels a previously enqueued `animationFrame` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.cancelAnimationFrame.bind(window)
    },

    /**
     * Async interface wrapper around `requestIdleCallback`.  Falls back to
     * `setTimeout` on browsers that do not support `requestIdleCallback`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestIdleCallback`.
     */
    idlePeriod: {
      /**
       * Enqueues a function called at `requestIdleCallback` timing.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {function(IdleDeadline)} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: function run(fn) {
        return window.requestIdleCallback ? window.requestIdleCallback(fn) : window.setTimeout(fn, 16);
      },

      /**
       * Cancels a previously enqueued `idlePeriod` callback.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: function cancel(handle) {
        window.cancelIdleCallback ? window.cancelIdleCallback(handle) : window.clearTimeout(handle);
      }
    },

    /**
     * Async interface for enqueueing callbacks that run at microtask timing.
     *
     * Note that microtask timing is achieved via a single `MutationObserver`,
     * and thus callbacks enqueued with this API will all run in a single
     * batch, and not interleaved with other microtasks such as promises.
     * Promises are avoided as an implementation choice for the time being
     * due to Safari bugs that cause Promises to lack microtask guarantees.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface for enqueueing callbacks that run at microtask
     *   timing.
     */
    microTask: {

      /**
       * Enqueues a function called at microtask timing.
       *
       * @memberof Polymer.Async.microTask
       * @param {Function} callback Callback to run
       * @return {number} Handle used for canceling task
       */
      run: function run(callback) {
        microtaskNode.textContent = microtaskNodeContent++;
        microtaskCallbacks.push(callback);
        return microtaskCurrHandle++;
      },


      /**
       * Cancels a previously enqueued `microTask` callback.
       *
       * @memberof Polymer.Async.microTask
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: function cancel(handle) {
        var idx = handle - microtaskLastHandle;
        if (idx >= 0) {
          if (!microtaskCallbacks[idx]) {
            throw new Error('invalid async handle: ' + handle);
          }
          microtaskCallbacks[idx] = null;
        }
      }
    }
  };
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

(function () {

  'use strict';

  // unique global id for deduping mixins.

  var dedupeId = 0;

  /**
   * @constructor
   * @extends {Function}
   */
  function MixinFunction() {}
  /** @type {(WeakMap | undefined)} */
  MixinFunction.prototype.__mixinApplications;
  /** @type {(Object | undefined)} */
  MixinFunction.prototype.__mixinSet;

  /* eslint-disable valid-jsdoc */
  /**
   * Wraps an ES6 class expression mixin such that the mixin is only applied
   * if it has not already been applied its base argument.  Also memoizes mixin
   * applications.
   *
   * @memberof Polymer
   * @template T
   * @param {T} mixin ES6 class expression mixin to wrap
   * @suppress {invalidCasts}
   */
  Polymer.dedupingMixin = function (mixin) {
    var mixinApplications = /** @type {!MixinFunction} */mixin.__mixinApplications;
    if (!mixinApplications) {
      mixinApplications = new WeakMap();
      /** @type {!MixinFunction} */mixin.__mixinApplications = mixinApplications;
    }
    // maintain a unique id for each mixin
    var mixinDedupeId = dedupeId++;
    function dedupingMixin(base) {
      var baseSet = /** @type {!MixinFunction} */base.__mixinSet;
      if (baseSet && baseSet[mixinDedupeId]) {
        return base;
      }
      var map = mixinApplications;
      var extended = map.get(base);
      if (!extended) {
        extended = /** @type {!Function} */mixin(base);
        map.set(base, extended);
      }
      // copy inherited mixin set from the extended class, or the base class
      // NOTE: we avoid use of Set here because some browser (IE11)
      // cannot extend a base Set via the constructor.
      var mixinSet = Object.create( /** @type {!MixinFunction} */extended.__mixinSet || baseSet || null);
      mixinSet[mixinDedupeId] = true;
      /** @type {!MixinFunction} */extended.__mixinSet = mixinSet;
      return extended;
    }

    return dedupingMixin;
  };
  /* eslint-enable valid-jsdoc */
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

(function () {
  'use strict';

  var caseMap = {};
  var DASH_TO_CAMEL = /-[a-z]/g;
  var CAMEL_TO_DASH = /([A-Z])/g;

  /**
   * Module with utilities for converting between "dash-case" and "camelCase"
   * identifiers.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides utilities for converting between "dash-case"
   *   and "camelCase".
   */
  var CaseMap = {

    /**
     * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
     * (e.g. `fooBarBaz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} dash Dash-case identifier
     * @return {string} Camel-case representation of the identifier
     */
    dashToCamelCase: function dashToCamelCase(dash) {
      return caseMap[dash] || (caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL, function (m) {
        return m[1].toUpperCase();
      }));
    },


    /**
     * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
     * (e.g. `foo-bar-baz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} camel Camel-case identifier
     * @return {string} Dash-case representation of the identifier
     */
    camelToDashCase: function camelToDashCase(camel) {
      return caseMap[camel] || (caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase());
    }
  };

  Polymer.CaseMap = CaseMap;
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(0);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(1);

(function () {

  'use strict';

  var caseMap = Polymer.CaseMap;

  var microtask = Polymer.Async.microTask;

  // Save map of native properties; this forms a blacklist or properties
  // that won't have their values "saved" by `saveAccessorValue`, since
  // reading from an HTMLElement accessor from the context of a prototype throws
  var nativeProperties = {};
  var proto = HTMLElement.prototype;
  while (proto) {
    var props = Object.getOwnPropertyNames(proto);
    for (var i = 0; i < props.length; i++) {
      nativeProperties[props[i]] = true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  /**
   * Used to save the value of a property that will be overridden with
   * an accessor. If the `model` is a prototype, the values will be saved
   * in `__dataProto`, and it's up to the user (or downstream mixin) to
   * decide how/when to set these values back into the accessors.
   * If `model` is already an instance (it has a `__data` property), then
   * the value will be set as a pending property, meaning the user should
   * call `_invalidateProperties` or `_flushProperties` to take effect
   *
   * @param {Object} model Prototype or instance
   * @param {string} property Name of property
   * @private
   */
  function saveAccessorValue(model, property) {
    // Don't read/store value for any native properties since they could throw
    if (!nativeProperties[property]) {
      var value = model[property];
      if (value !== undefined) {
        if (model.__data) {
          // Adding accessor to instance; update the property
          // It is the user's responsibility to call _flushProperties
          model._setPendingProperty(property, value);
        } else {
          // Adding accessor to proto; save proto's value for instance-time use
          if (!model.__dataProto) {
            model.__dataProto = {};
          } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
            model.__dataProto = Object.create(model.__dataProto);
          }
          model.__dataProto[property] = value;
        }
      }
    }
  }

  /**
   * Element class mixin that provides basic meta-programming for creating one
   * or more property accessors (getter/setter pair) that enqueue an async
   * (batched) `_propertiesChanged` callback.
   *
   * For basic usage of this mixin, simply declare attributes to observe via
   * the standard `static get observedAttributes()`, implement `_propertiesChanged`
   * on the class, and then call `MyClass.createPropertiesForAttributes()` once
   * on the class to generate property accessors for each observed attribute
   * prior to instancing.  Last, call `this._flushProperties()` once to enable
   * the accessors.
   *
   * Any `observedAttributes` will automatically be
   * deserialized via `attributeChangedCallback` and set to the associated
   * property using `dash-case`-to-`camelCase` convention.
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin for reacting to property changes from
   *   generated property accessors.
   */
  Polymer.PropertyAccessors = Polymer.dedupingMixin(function (superClass) {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyAccessors}
     * @extends HTMLElement
     * @unrestricted
     */
    var PropertyAccessors = function (_superClass) {
      _inherits(PropertyAccessors, _superClass);

      _createClass(PropertyAccessors, null, [{
        key: 'createPropertiesForAttributes',


        /**
         * Generates property accessors for all attributes in the standard
         * static `observedAttributes` array.
         *
         * Attribute names are mapped to property names using the `dash-case` to
         * `camelCase` convention
         *
         */
        value: function createPropertiesForAttributes() {
          var a$ = this.observedAttributes;
          for (var _i = 0; _i < a$.length; _i++) {
            this.prototype._createPropertyAccessor(caseMap.dashToCamelCase(a$[_i]));
          }
        }
      }]);

      function PropertyAccessors() {
        _classCallCheck(this, PropertyAccessors);

        /** @type {boolean} */
        var _this = _possibleConstructorReturn(this, (PropertyAccessors.__proto__ || Object.getPrototypeOf(PropertyAccessors)).call(this));

        _this.__serializing;
        /** @type {number} */
        _this.__dataCounter;
        /** @type {boolean} */
        _this.__dataEnabled;
        /** @type {boolean} */
        _this.__dataReady;
        /** @type {boolean} */
        _this.__dataInvalid;
        /** @type {!Object} */
        _this.__data;
        /** @type {Object} */
        _this.__dataPending;
        /** @type {Object} */
        _this.__dataOld;
        /** @type {Object} */
        _this.__dataProto;
        /** @type {Object} */
        _this.__dataHasAccessor;
        /** @type {Object} */
        _this.__dataInstanceProps;
        _this._initializeProperties();
        return _this;
      }

      /**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       *
       * @param {string} name Name of attribute that changed
       * @param {?string} old Old attribute value
       * @param {?string} value New attribute value
       */


      _createClass(PropertyAccessors, [{
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, old, value) {
          if (old !== value) {
            this._attributeToProperty(name, value);
          }
        }

        /**
         * Initializes the local storage for property accessors.
         *
         * Provided as an override point for performing any setup work prior
         * to initializing the property accessor system.
         *
         * @protected
         */

      }, {
        key: '_initializeProperties',
        value: function _initializeProperties() {
          this.__serializing = false;
          this.__dataCounter = 0;
          this.__dataEnabled = false;
          this.__dataReady = false;
          this.__dataInvalid = false;
          this.__data = {};
          this.__dataPending = null;
          this.__dataOld = null;
          if (this.__dataProto) {
            this._initializeProtoProperties(this.__dataProto);
            this.__dataProto = null;
          }
          // Capture instance properties; these will be set into accessors
          // during first flush. Don't set them here, since we want
          // these to overwrite defaults/constructor assignments
          for (var p in this.__dataHasAccessor) {
            if (this.hasOwnProperty(p)) {
              this.__dataInstanceProps = this.__dataInstanceProps || {};
              this.__dataInstanceProps[p] = this[p];
              delete this[p];
            }
          }
        }

        /**
         * Called at instance time with bag of properties that were overwritten
         * by accessors on the prototype when accessors were created.
         *
         * The default implementation sets these properties back into the
         * setter at instance time.  This method is provided as an override
         * point for customizing or providing more efficient initialization.
         *
         * @param {Object} props Bag of property values that were overwritten
         *   when creating property accessors.
         * @protected
         */

      }, {
        key: '_initializeProtoProperties',
        value: function _initializeProtoProperties(props) {
          for (var p in props) {
            this._setProperty(p, props[p]);
          }
        }

        /**
         * Called at ready time with bag of instance properties that overwrote
         * accessors when the element upgraded.
         *
         * The default implementation sets these properties back into the
         * setter at ready time.  This method is provided as an override
         * point for customizing or providing more efficient initialization.
         *
         * @param {Object} props Bag of property values that were overwritten
         *   when creating property accessors.
         * @protected
         */

      }, {
        key: '_initializeInstanceProperties',
        value: function _initializeInstanceProperties(props) {
          Object.assign(this, props);
        }

        /**
         * Ensures the element has the given attribute. If it does not,
         * assigns the given value to the attribute.
         *
         *
         * @param {string} attribute Name of attribute to ensure is set.
         * @param {string} value of the attribute.
         */

      }, {
        key: '_ensureAttribute',
        value: function _ensureAttribute(attribute, value) {
          if (!this.hasAttribute(attribute)) {
            this._valueToNodeAttribute(this, value, attribute);
          }
        }

        /**
         * Deserializes an attribute to its associated property.
         *
         * This method calls the `_deserializeValue` method to convert the string to
         * a typed value.
         *
         * @param {string} attribute Name of attribute to deserialize.
         * @param {?string} value of the attribute.
         * @param {*=} type type to deserialize to.
         */

      }, {
        key: '_attributeToProperty',
        value: function _attributeToProperty(attribute, value, type) {
          // Don't deserialize back to property if currently reflecting
          if (!this.__serializing) {
            var property = caseMap.dashToCamelCase(attribute);
            this[property] = this._deserializeValue(value, type);
          }
        }

        /**
         * Serializes a property to its associated attribute.
         *
         * @param {string} property Property name to reflect.
         * @param {string=} attribute Attribute name to reflect.
         * @param {*=} value Property value to refect.
         */

      }, {
        key: '_propertyToAttribute',
        value: function _propertyToAttribute(property, attribute, value) {
          this.__serializing = true;
          value = arguments.length < 3 ? this[property] : value;
          this._valueToNodeAttribute(this, value, attribute || caseMap.camelToDashCase(property));
          this.__serializing = false;
        }

        /**
         * Sets a typed value to an HTML attribute on a node.
         *
         * This method calls the `_serializeValue` method to convert the typed
         * value to a string.  If the `_serializeValue` method returns `undefined`,
         * the attribute will be removed (this is the default for boolean
         * type `false`).
         *
         * @param {Element} node Element to set attribute to.
         * @param {*} value Value to serialize.
         * @param {string} attribute Attribute name to serialize to.
         */

      }, {
        key: '_valueToNodeAttribute',
        value: function _valueToNodeAttribute(node, value, attribute) {
          var str = this._serializeValue(value);
          if (str === undefined) {
            node.removeAttribute(attribute);
          } else {
            node.setAttribute(attribute, str);
          }
        }

        /**
         * Converts a typed JavaScript value to a string.
         *
         * This method is called by Polymer when setting JS property values to
         * HTML attributes.  Users may override this method on Polymer element
         * prototypes to provide serialization for custom types.
         *
         * @param {*} value Property value to serialize.
         * @return {string | undefined} String serialized from the provided property value.
         */

      }, {
        key: '_serializeValue',
        value: function _serializeValue(value) {
          /* eslint-disable no-fallthrough */
          switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
            case 'boolean':
              return value ? '' : undefined;

            case 'object':
              if (value instanceof Date) {
                return value.toString();
              } else if (value) {
                try {
                  return JSON.stringify(value);
                } catch (x) {
                  return '';
                }
              }

            default:
              return value != null ? value.toString() : undefined;
          }
        }

        /**
         * Converts a string to a typed JavaScript value.
         *
         * This method is called by Polymer when reading HTML attribute values to
         * JS properties.  Users may override this method on Polymer element
         * prototypes to provide deserialization for custom `type`s.  Note,
         * the `type` argument is the value of the `type` field provided in the
         * `properties` configuration object for a given property, and is
         * by convention the constructor for the type to deserialize.
         *
         * Note: The return value of `undefined` is used as a sentinel value to
         * indicate the attribute should be removed.
         *
         * @param {?string} value Attribute value to deserialize.
         * @param {*=} type Type to deserialize the string to.
         * @return {*} Typed value deserialized from the provided string.
         */

      }, {
        key: '_deserializeValue',
        value: function _deserializeValue(value, type) {
          /**
           * @type {*}
           */
          var outValue = void 0;
          switch (type) {
            case Number:
              outValue = Number(value);
              break;

            case Boolean:
              outValue = value !== null;
              break;

            case Object:
              try {
                outValue = JSON.parse( /** @type string */value);
              } catch (x) {
                // allow non-JSON literals like Strings and Numbers
              }
              break;

            case Array:
              try {
                outValue = JSON.parse( /** @type string */value);
              } catch (x) {
                outValue = null;
                console.warn('Polymer::Attributes: couldn\'t decode Array as JSON: ' + value);
              }
              break;

            case Date:
              outValue = new Date(value);
              break;

            case String:
            default:
              outValue = value;
              break;
          }

          return outValue;
        }
        /* eslint-enable no-fallthrough */

        /**
         * Creates a setter/getter pair for the named property with its own
         * local storage.  The getter returns the value in the local storage,
         * and the setter calls `_setProperty`, which updates the local storage
         * for the property and enqueues a `_propertiesChanged` callback.
         *
         * This method may be called on a prototype or an instance.  Calling
         * this method may overwrite a property value that already exists on
         * the prototype/instance by creating the accessor.  When calling on
         * a prototype, any overwritten values are saved in `__dataProto`,
         * and it is up to the subclasser to decide how/when to set those
         * properties back into the accessor.  When calling on an instance,
         * the overwritten value is set via `_setPendingProperty`, and the
         * user should call `_invalidateProperties` or `_flushProperties`
         * for the values to take effect.
         *
         * @param {string} property Name of the property
         * @param {boolean=} readOnly When true, no setter is created; the
         *   protected `_setProperty` function must be used to set the property
         * @protected
         */

      }, {
        key: '_createPropertyAccessor',
        value: function _createPropertyAccessor(property, readOnly) {
          if (!this.hasOwnProperty('__dataHasAccessor')) {
            this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
          }
          if (!this.__dataHasAccessor[property]) {
            this.__dataHasAccessor[property] = true;
            saveAccessorValue(this, property);
            Object.defineProperty(this, property, {
              /* eslint-disable valid-jsdoc */
              /** @this {PropertyAccessors} */
              get: function get() {
                return this.__data[property];
              },
              /** @this {PropertyAccessors} */
              set: readOnly ? function () {} : function (value) {
                this._setProperty(property, value);
              }
              /* eslint-enable */
            });
          }
        }

        /**
         * Returns true if this library created an accessor for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if an accessor was created
         */

      }, {
        key: '_hasAccessor',
        value: function _hasAccessor(property) {
          return this.__dataHasAccessor && this.__dataHasAccessor[property];
        }

        /**
         * Updates the local storage for a property (via `_setPendingProperty`)
         * and enqueues a `_proeprtiesChanged` callback.
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @protected
         */

      }, {
        key: '_setProperty',
        value: function _setProperty(property, value) {
          if (this._setPendingProperty(property, value)) {
            this._invalidateProperties();
          }
        }

        /**
         * Updates the local storage for a property, records the previous value,
         * and adds it to the set of "pending changes" that will be passed to the
         * `_propertiesChanged` callback.  This method does not enqueue the
         * `_propertiesChanged` callback.
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @return {boolean} Returns true if the property changed
         * @protected
         */

      }, {
        key: '_setPendingProperty',
        value: function _setPendingProperty(property, value) {
          var old = this.__data[property];
          var changed = this._shouldPropertyChange(property, value, old);
          if (changed) {
            if (!this.__dataPending) {
              this.__dataPending = {};
              this.__dataOld = {};
            }
            // Ensure old is captured from the last turn
            if (this.__dataOld && !(property in this.__dataOld)) {
              this.__dataOld[property] = old;
            }
            this.__data[property] = value;
            this.__dataPending[property] = value;
          }
          return changed;
        }

        /**
         * Returns true if the specified property has a pending change.
         *
         * @param {string} prop Property name
         * @return {boolean} True if property has a pending change
         * @protected
         */

      }, {
        key: '_isPropertyPending',
        value: function _isPropertyPending(prop) {
          return Boolean(this.__dataPending && prop in this.__dataPending);
        }

        /**
         * Marks the properties as invalid, and enqueues an async
         * `_propertiesChanged` callback.
         *
         * @protected
         */

      }, {
        key: '_invalidateProperties',
        value: function _invalidateProperties() {
          var _this2 = this;

          if (!this.__dataInvalid && this.__dataReady) {
            this.__dataInvalid = true;
            microtask.run(function () {
              if (_this2.__dataInvalid) {
                _this2.__dataInvalid = false;
                _this2._flushProperties();
              }
            });
          }
        }

        /**
         * Call to enable property accessor processing. Before this method is
         * called accessor values will be set but side effects are
         * queued. When called, any pending side effects occur immediately.
         * For elements, generally `connectedCallback` is a normal spot to do so.
         * It is safe to call this method multiple times as it only turns on
         * property accessors once.
         */

      }, {
        key: '_enableProperties',
        value: function _enableProperties() {
          if (!this.__dataEnabled) {
            this.__dataEnabled = true;
            if (this.__dataInstanceProps) {
              this._initializeInstanceProperties(this.__dataInstanceProps);
              this.__dataInstanceProps = null;
            }
            this.ready();
          }
        }

        /**
         * Calls the `_propertiesChanged` callback with the current set of
         * pending changes (and old values recorded when pending changes were
         * set), and resets the pending set of changes. Generally, this method
         * should not be called in user code.
         *
         *
         * @protected
         */

      }, {
        key: '_flushProperties',
        value: function _flushProperties() {
          if (this.__dataPending && this.__dataOld) {
            var changedProps = this.__dataPending;
            this.__dataPending = null;
            this.__dataCounter++;
            this._propertiesChanged(this.__data, changedProps, this.__dataOld);
            this.__dataCounter--;
          }
        }

        /**
         * Lifecycle callback called the first time properties are being flushed.
         * Prior to `ready`, all property sets through accessors are queued and
         * their effects are flushed after this method returns.
         *
         * Users may override this function to implement behavior that is
         * dependent on the element having its properties initialized, e.g.
         * from defaults (initialized from `constructor`, `_initializeProperties`),
         * `attributeChangedCallback`, or values propagated from host e.g. via
         * bindings.  `super.ready()` must be called to ensure the data system
         * becomes enabled.
         *
         * @public
         */

      }, {
        key: 'ready',
        value: function ready() {
          this.__dataReady = true;
          // Run normal flush
          this._flushProperties();
        }

        /**
         * Callback called when any properties with accessors created via
         * `_createPropertyAccessor` have been set.
         *
         * @param {!Object} currentProps Bag of all current accessor values
         * @param {!Object} changedProps Bag of properties changed since the last
         *   call to `_propertiesChanged`
         * @param {!Object} oldProps Bag of previous values for each property
         *   in `changedProps`
         * @protected
         */

      }, {
        key: '_propertiesChanged',
        value: function _propertiesChanged(currentProps, changedProps, oldProps) {} // eslint-disable-line no-unused-vars


        /**
         * Method called to determine whether a property value should be
         * considered as a change and cause the `_propertiesChanged` callback
         * to be enqueued.
         *
         * The default implementation returns `true` for primitive types if a
         * strict equality check fails, and returns `true` for all Object/Arrays.
         * The method always returns false for `NaN`.
         *
         * Override this method to e.g. provide stricter checking for
         * Objects/Arrays when using immutable patterns.
         *
         * @param {string} property Property name
         * @param {*} value New property value
         * @param {*} old Previous property value
         * @return {boolean} Whether the property should be considered a change
         *   and enqueue a `_proeprtiesChanged` callback
         * @protected
         */

      }, {
        key: '_shouldPropertyChange',
        value: function _shouldPropertyChange(property, value, old) {
          return (
            // Strict equality check
            old !== value && (
            // This ensures (old==NaN, value==NaN) always returns false
            old === old || value === value)
          );
        }
      }]);

      return PropertyAccessors;
    }(superClass);

    return PropertyAccessors;
  });
})();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(0);

__webpack_require__(6);

__webpack_require__(1);

(function () {
  'use strict';

  /**
   * Returns true if `node` is a slot element
   * @param {HTMLElement} node Node to test.
   * @return {boolean} Returns true if the given `node` is a slot
   * @private
   */

  function isSlot(node) {
    return node.localName === 'slot';
  }

  /**
   * Class that listens for changes (additions or removals) to
   * "flattened nodes" on a given `node`. The list of flattened nodes consists
   * of a node's children and, for any children that are `<slot>` elements,
   * the expanded flattened list of `assignedNodes`.
   * For example, if the observed node has children `<a></a><slot></slot><b></b>`
   * and the `<slot>` has one `<div>` assigned to it, then the flattened
   * nodes list is `<a></a><div></div><b></b>`. If the `<slot>` has other
   * `<slot>` elements assigned to it, these are flattened as well.
   *
   * The provided `callback` is called whenever any change to this list
   * of flattened nodes occurs, where an addition or removal of a node is
   * considered a change. The `callback` is called with one argument, an object
   * containing an array of any `addedNodes` and `removedNodes`.
   *
   * Note: the callback is called asynchronous to any changes
   * at a microtask checkpoint. This is because observation is performed using
   * `MutationObserver` and the `<slot>` element's `slotchange` event which
   * are asynchronous.
   *
   * @memberof Polymer
   * @summary Class that listens for changes (additions or removals) to
   * "flattened nodes" on a given `node`.
   */

  var FlattenedNodesObserver = function () {
    _createClass(FlattenedNodesObserver, null, [{
      key: 'getFlattenedNodes',


      /**
       * Returns the list of flattened nodes for the given `node`.
       * This list consists of a node's children and, for any children
       * that are `<slot>` elements, the expanded flattened list of `assignedNodes`.
       * For example, if the observed node has children `<a></a><slot></slot><b></b>`
       * and the `<slot>` has one `<div>` assigned to it, then the flattened
       * nodes list is `<a></a><div></div><b></b>`. If the `<slot>` has other
       * `<slot>` elements assigned to it, these are flattened as well.
       *
       * @param {HTMLElement|HTMLSlotElement} node The node for which to return the list of flattened nodes.
       * @return {Array} The list of flattened nodes for the given `node`.
      */
      value: function getFlattenedNodes(node) {
        if (isSlot(node)) {
          return (/** @type {HTMLSlotElement} */node.assignedNodes({ flatten: true })
          );
        } else {
          return Array.from(node.childNodes).map(function (node) {
            if (isSlot(node)) {
              return (/** @type {HTMLSlotElement} */node.assignedNodes({ flatten: true })
              );
            } else {
              return [node];
            }
          }).reduce(function (a, b) {
            return a.concat(b);
          }, []);
        }
      }

      /**
       * @param {Node} target Node on which to listen for changes.
       * @param {Function} callback Function called when there are additions
       * or removals from the target's list of flattened nodes.
      */

    }]);

    function FlattenedNodesObserver(target, callback) {
      var _this = this;

      _classCallCheck(this, FlattenedNodesObserver);

      /** @type {MutationObserver} */
      this._shadyChildrenObserver = null;
      /** @type {MutationObserver} */
      this._nativeChildrenObserver = null;
      this._connected = false;
      this._target = target;
      this.callback = callback;
      this._effectiveNodes = [];
      this._observer = null;
      this._scheduled = false;
      /** @type {function()} */
      this._boundSchedule = function () {
        _this._schedule();
      };
      this.connect();
      this._schedule();
    }

    /**
     * Activates an observer. This method is automatically called when
     * a `FlattenedNodesObserver` is created. It should only be called to
     * re-activate an observer that has been deactivated via the `disconnect` method.
     */


    _createClass(FlattenedNodesObserver, [{
      key: 'connect',
      value: function connect() {
        var _this2 = this;

        if (isSlot(this._target)) {
          this._listenSlots([this._target]);
        } else {
          this._listenSlots(this._target.children);
          if (window.ShadyDOM) {
            this._shadyChildrenObserver = ShadyDOM.observeChildren(this._target, function (mutations) {
              _this2._processMutations(mutations);
            });
          } else {
            this._nativeChildrenObserver = new MutationObserver(function (mutations) {
              _this2._processMutations(mutations);
            });
            this._nativeChildrenObserver.observe(this._target, { childList: true });
          }
        }
        this._connected = true;
      }

      /**
       * Deactivates the flattened nodes observer. After calling this method
       * the observer callback will not be called when changes to flattened nodes
       * occur. The `connect` method may be subsequently called to reactivate
       * the observer.
       */

    }, {
      key: 'disconnect',
      value: function disconnect() {
        if (isSlot(this._target)) {
          this._unlistenSlots([this._target]);
        } else {
          this._unlistenSlots(this._target.children);
          if (window.ShadyDOM && this._shadyChildrenObserver) {
            ShadyDOM.unobserveChildren(this._shadyChildrenObserver);
            this._shadyChildrenObserver = null;
          } else if (this._nativeChildrenObserver) {
            this._nativeChildrenObserver.disconnect();
            this._nativeChildrenObserver = null;
          }
        }
        this._connected = false;
      }
    }, {
      key: '_schedule',
      value: function _schedule() {
        var _this3 = this;

        if (!this._scheduled) {
          this._scheduled = true;
          Polymer.Async.microTask.run(function () {
            return _this3.flush();
          });
        }
      }
    }, {
      key: '_processMutations',
      value: function _processMutations(mutations) {
        this._processSlotMutations(mutations);
        this.flush();
      }
    }, {
      key: '_processSlotMutations',
      value: function _processSlotMutations(mutations) {
        if (mutations) {
          for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.addedNodes) {
              this._listenSlots(mutation.addedNodes);
            }
            if (mutation.removedNodes) {
              this._unlistenSlots(mutation.removedNodes);
            }
          }
        }
      }

      /**
       * Flushes the observer causing any pending changes to be immediately
       * delivered the observer callback. By default these changes are delivered
       * asynchronously at the next microtask checkpoint.
       *
       * @return {boolean} Returns true if any pending changes caused the observer
       * callback to run.
       */

    }, {
      key: 'flush',
      value: function flush() {
        if (!this._connected) {
          return false;
        }
        if (window.ShadyDOM) {
          ShadyDOM.flush();
        }
        if (this._nativeChildrenObserver) {
          this._processSlotMutations(this._nativeChildrenObserver.takeRecords());
        } else if (this._shadyChildrenObserver) {
          this._processSlotMutations(this._shadyChildrenObserver.takeRecords());
        }
        this._scheduled = false;
        var info = {
          target: this._target,
          addedNodes: [],
          removedNodes: []
        };
        var newNodes = this.constructor.getFlattenedNodes(this._target);
        var splices = Polymer.ArraySplice.calculateSplices(newNodes, this._effectiveNodes);
        // process removals
        for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
          for (var j = 0, n; j < s.removed.length && (n = s.removed[j]); j++) {
            info.removedNodes.push(n);
          }
        }
        // process adds
        for (var _i = 0, _s; _i < splices.length && (_s = splices[_i]); _i++) {
          for (var _j = _s.index; _j < _s.index + _s.addedCount; _j++) {
            info.addedNodes.push(newNodes[_j]);
          }
        }
        // update cache
        this._effectiveNodes = newNodes;
        var didFlush = false;
        if (info.addedNodes.length || info.removedNodes.length) {
          didFlush = true;
          this.callback.call(this._target, info);
        }
        return didFlush;
      }
    }, {
      key: '_listenSlots',
      value: function _listenSlots(nodeList) {
        for (var i = 0; i < nodeList.length; i++) {
          var n = nodeList[i];
          if (isSlot(n)) {
            n.addEventListener('slotchange', this._boundSchedule);
          }
        }
      }
    }, {
      key: '_unlistenSlots',
      value: function _unlistenSlots(nodeList) {
        for (var i = 0; i < nodeList.length; i++) {
          var n = nodeList[i];
          if (isSlot(n)) {
            n.removeEventListener('slotchange', this._boundSchedule);
          }
        }
      }
    }]);

    return FlattenedNodesObserver;
  }();

  Polymer.FlattenedNodesObserver = FlattenedNodesObserver;
})();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

(function () {

  'use strict';

  function newSplice(index, removed, addedCount) {
    return {
      index: index,
      removed: removed,
      addedCount: addedCount
    };
  }

  var EDIT_LEAVE = 0;
  var EDIT_UPDATE = 1;
  var EDIT_ADD = 2;
  var EDIT_DELETE = 3;

  // Note: This function is *based* on the computation of the Levenshtein
  // "edit" distance. The one change is that "updates" are treated as two
  // edits - not one. With Array splices, an update is really a delete
  // followed by an add. By retaining this, we optimize for "keeping" the
  // maximum array items in the original array. For example:
  //
  //   'xxxx123' -> '123yyyy'
  //
  // With 1-edit updates, the shortest path would be just to update all seven
  // characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
  // leaves the substring '123' intact.
  function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    // "Deletion" columns
    var rowCount = oldEnd - oldStart + 1;
    var columnCount = currentEnd - currentStart + 1;
    var distances = new Array(rowCount);

    // "Addition" rows. Initialize null column.
    for (var i = 0; i < rowCount; i++) {
      distances[i] = new Array(columnCount);
      distances[i][0] = i;
    }

    // Initialize null row
    for (var j = 0; j < columnCount; j++) {
      distances[0][j] = j;
    }for (var _i = 1; _i < rowCount; _i++) {
      for (var _j = 1; _j < columnCount; _j++) {
        if (equals(current[currentStart + _j - 1], old[oldStart + _i - 1])) distances[_i][_j] = distances[_i - 1][_j - 1];else {
          var north = distances[_i - 1][_j] + 1;
          var west = distances[_i][_j - 1] + 1;
          distances[_i][_j] = north < west ? north : west;
        }
      }
    }

    return distances;
  }

  // This starts at the final weight, and walks "backward" by finding
  // the minimum previous weight recursively until the origin of the weight
  // matrix.
  function spliceOperationsFromEditDistances(distances) {
    var i = distances.length - 1;
    var j = distances[0].length - 1;
    var current = distances[i][j];
    var edits = [];
    while (i > 0 || j > 0) {
      if (i == 0) {
        edits.push(EDIT_ADD);
        j--;
        continue;
      }
      if (j == 0) {
        edits.push(EDIT_DELETE);
        i--;
        continue;
      }
      var northWest = distances[i - 1][j - 1];
      var west = distances[i - 1][j];
      var north = distances[i][j - 1];

      var min = void 0;
      if (west < north) min = west < northWest ? west : northWest;else min = north < northWest ? north : northWest;

      if (min == northWest) {
        if (northWest == current) {
          edits.push(EDIT_LEAVE);
        } else {
          edits.push(EDIT_UPDATE);
          current = northWest;
        }
        i--;
        j--;
      } else if (min == west) {
        edits.push(EDIT_DELETE);
        i--;
        current = west;
      } else {
        edits.push(EDIT_ADD);
        j--;
        current = north;
      }
    }

    edits.reverse();
    return edits;
  }

  /**
   * Splice Projection functions:
   *
   * A splice map is a representation of how a previous array of items
   * was transformed into a new array of items. Conceptually it is a list of
   * tuples of
   *
   *   <index, removed, addedCount>
   *
   * which are kept in ascending index order of. The tuple represents that at
   * the |index|, |removed| sequence of items were removed, and counting forward
   * from |index|, |addedCount| items were added.
   */

  /**
   * Lacking individual splice mutation information, the minimal set of
   * splices can be synthesized given the previous state and final state of an
   * array. The basic approach is to calculate the edit distance matrix and
   * choose the shortest path through it.
   *
   * Complexity: O(l * p)
   *   l: The length of the current array
   *   p: The length of the old array
   *
   * @param {Array} current The current "changed" array for which to
   * calculate splices.
   * @param {number} currentStart Starting index in the `current` array for
   * which splices are calculated.
   * @param {number} currentEnd Ending index in the `current` array for
   * which splices are calculated.
   * @param {Array} old The original "unchanged" array to compare `current`
   * against to determine splices.
   * @param {number} oldStart Starting index in the `old` array for
   * which splices are calculated.
   * @param {number} oldEnd Ending index in the `old` array for
   * which splices are calculated.
   * @return {Array} Returns an array of splice record objects. Each of these
   * contains: `index` the location where the splice occurred; `removed`
   * the array of removed items from this location; `addedCount` the number
   * of items added at this location.
   */
  function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    var prefixCount = 0;
    var suffixCount = 0;
    var splice = void 0;

    var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
    if (currentStart == 0 && oldStart == 0) prefixCount = sharedPrefix(current, old, minLength);

    if (currentEnd == current.length && oldEnd == old.length) suffixCount = sharedSuffix(current, old, minLength - prefixCount);

    currentStart += prefixCount;
    oldStart += prefixCount;
    currentEnd -= suffixCount;
    oldEnd -= suffixCount;

    if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0) return [];

    if (currentStart == currentEnd) {
      splice = newSplice(currentStart, [], 0);
      while (oldStart < oldEnd) {
        splice.removed.push(old[oldStart++]);
      }return [splice];
    } else if (oldStart == oldEnd) return [newSplice(currentStart, [], currentEnd - currentStart)];

    var ops = spliceOperationsFromEditDistances(calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));

    splice = undefined;
    var splices = [];
    var index = currentStart;
    var oldIndex = oldStart;
    for (var i = 0; i < ops.length; i++) {
      switch (ops[i]) {
        case EDIT_LEAVE:
          if (splice) {
            splices.push(splice);
            splice = undefined;
          }

          index++;
          oldIndex++;
          break;
        case EDIT_UPDATE:
          if (!splice) splice = newSplice(index, [], 0);

          splice.addedCount++;
          index++;

          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
        case EDIT_ADD:
          if (!splice) splice = newSplice(index, [], 0);

          splice.addedCount++;
          index++;
          break;
        case EDIT_DELETE:
          if (!splice) splice = newSplice(index, [], 0);

          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
      }
    }

    if (splice) {
      splices.push(splice);
    }
    return splices;
  }

  function sharedPrefix(current, old, searchLength) {
    for (var i = 0; i < searchLength; i++) {
      if (!equals(current[i], old[i])) return i;
    }return searchLength;
  }

  function sharedSuffix(current, old, searchLength) {
    var index1 = current.length;
    var index2 = old.length;
    var count = 0;
    while (count < searchLength && equals(current[--index1], old[--index2])) {
      count++;
    }return count;
  }

  function calculateSplices(current, previous) {
    return calcSplices(current, 0, current.length, previous, 0, previous.length);
  }

  function equals(currentValue, previousValue) {
    return currentValue === previousValue;
  }

  /**
   * @namespace
   * @memberof Polymer
   * @summary Module that provides utilities for diffing arrays.
   */
  Polymer.ArraySplice = {
    /**
     * Returns an array of splice records indicating the minimum edits required
     * to transform the `previous` array into the `current` array.
     *
     * Splice records are ordered by index and contain the following fields:
     * - `index`: index where edit started
     * - `removed`: array of removed items from this index
     * - `addedCount`: number of items added at this index
     *
     * This function is based on the Levenshtein "minimum edit distance"
     * algorithm. Note that updates are treated as removal followed by addition.
     *
     * The worst-case time complexity of this algorithm is `O(l * p)`
     *   l: The length of the current array
     *   p: The length of the previous array
     *
     * However, the worst-case complexity is reduced by an `O(n)` optimization
     * to detect any shared prefix & suffix between the two arrays and only
     * perform the more expensive minimum edit distance calculation over the
     * non-shared portions of the arrays.
     *
     * @memberof Polymer.ArraySplice
     * @param {Array} current The "changed" array for which splices will be
     * calculated.
     * @param {Array} previous The "unchanged" original array to compare
     * `current` against to determine the splices.
     * @return {Array} Returns an array of splice record objects. Each of these
     * contains: `index` the location where the splice occurred; `removed`
     * the array of removed items from this location; `addedCount` the number
     * of items added at this location.
     */
    calculateSplices: calculateSplices
  };
})();

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
// import pagesLocation from '../utils/pages-location'


__webpack_require__(4);

__webpack_require__(5);

var _locationMixin = __webpack_require__(9);

var _locationMixin2 = _interopRequireDefault(_locationMixin);

var _queryParamsMixin = __webpack_require__(11);

var _queryParamsMixin2 = _interopRequireDefault(_queryParamsMixin);

var _pathToRegexp = __webpack_require__(12);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _routing = __webpack_require__(14);

var _routing2 = _interopRequireDefault(_routing);

var _httpCodes = __webpack_require__(15);

var _httpCodes2 = _interopRequireDefault(_httpCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppShell = function (_QueryParamsMixin) {
  _inherits(AppShell, _QueryParamsMixin);

  _createClass(AppShell, null, [{
    key: 'is',
    get: function get() {
      return 'app-shell';
    }
  }, {
    key: 'observedAttributes',
    get: function get() {
      var observedAttributes = _get(AppShell.__proto__ || Object.getPrototypeOf(AppShell), 'observedAttributes', this) || [];
      return observedAttributes.concat(['params', 'queryParams', 'currentRoute']);
    }
  }]);

  function AppShell() {
    _classCallCheck(this, AppShell);

    var _this = _possibleConstructorReturn(this, (AppShell.__proto__ || Object.getPrototypeOf(AppShell)).call(this));

    var shadowRoot = _this.attachShadow({ mode: 'open' });
    var style = document.createElement('style');
    style.setAttribute('is', 'custom-style');
    style.innerHTML = 'div[role=\'main\'] {\n      position: relative;\n    }\n\n    ::slotted(.page) {\n      position: absolute;\n      background-color: white;\n      width: 100%;\n      top: 0;\n      opacity: 0;\n      z-index: -1;\n      transition: opacity 0.3s;\n    }\n\n    ::slotted(*) > .page {\n      position: absolute;\n      background-color: white;\n      width: 100%;\n      top: 0;\n      opacity: 0;\n      z-index: -1;\n      transition: opacity 0.3s;\n    }\n\n    ::slotted(.page--on-view) {\n      position: relative !important;\n      opacity: 1;\n      z-index: 0;\n    }\n\n    ::slotted(*) > .page--on-view {\n      position: relative !important;\n      opacity: 1;\n      z-index: 0;\n    }';
    var main = document.createElement('div');
    main.setAttribute('class', 'main');
    var slot = document.createElement('slot');
    main.appendChild(slot);
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(main);
    _this._routes = {};
    return _this;
  }

  _createClass(AppShell, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      if (_get(AppShell.prototype.__proto__ || Object.getPrototypeOf(AppShell.prototype), 'connectedCallback', this)) {
        _get(AppShell.prototype.__proto__ || Object.getPrototypeOf(AppShell.prototype), 'connectedCallback', this).call(this);
      }
      this._enableProperties(); // turn on accessors
      this._observer = new Polymer.FlattenedNodesObserver(this, function (info) {
        _this2._contentAdded(info.addedNodes.filter(function (node) {
          return node.nodeType === window.Node.ELEMENT_NODE;
        }));
      });
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      if (_get(AppShell.prototype.__proto__ || Object.getPrototypeOf(AppShell.prototype), 'disconnectedCallback', this)) {
        _get(AppShell.prototype.__proto__ || Object.getPrototypeOf(AppShell.prototype), 'disconnectedCallback', this).call(this);
      }
      if (this._observer) this._observer.disconnect();
    }
  }, {
    key: '_propertiesChanged',
    value: function _propertiesChanged(currentProps, changedProps, oldProps) {
      if (_get(AppShell.prototype.__proto__ || Object.getPrototypeOf(AppShell.prototype), '_propertiesChanged', this)) {
        _get(AppShell.prototype.__proto__ || Object.getPrototypeOf(AppShell.prototype), '_propertiesChanged', this).call(this, currentProps, changedProps, oldProps);
      }
      if ('path' in changedProps) {
        this._pathChanged(changedProps['path']);
      }
    }
  }, {
    key: '_contentAdded',
    value: function _contentAdded(pages) {
      var _this3 = this;

      pages.forEach(function (page) {
        page.classList.add('page');
        _this3._routes[page.getAttribute('route')] = {
          element: page
        };
      });
      this._pathChanged(this.path);
    }
  }, {
    key: '_pathChanged',
    value: function _pathChanged(path) {
      var routeName = null;
      Object.entries(this._routes).forEach(function (route) {
        if (routeName) return;
        var params = {};
        var keys = [];
        var re = (0, _pathToRegexp2.default)(route[0], keys);
        var exec = re.exec(path);

        if (exec) {
          params = {};
          for (var j = 0; j < keys.length; j++) {
            params[keys[j].name] = exec[j + 1];
          }
          routeName = route[0];
        }
      });

      this._loadPage(routeName || 'not-found');
    }
  }, {
    key: '_loadPage',
    value: function _loadPage(route) {
      var _this4 = this;

      var routes = Object.assign({}, _routing2.default, _httpCodes2.default);
      for (var i in this._routes) {
        if (this._routes[i] && this._routes[i].element) this._routes[i].element.classList.remove('page--on-view');
      }
      if (this._routes[route] && this._routes[route].element) this._routes[route].element.classList.add('page--on-view');
      if (this._routes[route]) {
        routes[route]().then(function () {
          if (window.ga) {
            ga('set', 'page', _this4.path);
            ga('send', 'pageview');
          }
        });
      }
    }
  }]);

  return AppShell;
}((0, _queryParamsMixin2.default)((0, _locationMixin2.default)(Polymer.PropertyAccessors(window.HTMLElement))));

AppShell.createPropertiesForAttributes();

window.customElements.define(AppShell.is, AppShell);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _resolveUrl = __webpack_require__(10);

var _resolveUrl2 = _interopRequireDefault(_resolveUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (superClass) {
  return function (_superClass) {
    _inherits(_class, _superClass);

    _createClass(_class, [{
      key: '_propertiesChanged',
      value: function _propertiesChanged(currentProps, changedProps, oldProps) {
        if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), '_propertiesChanged', this)) {
          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), '_propertiesChanged', this).call(this, currentProps, changedProps, oldProps);
        }
        if ('path' in changedProps && 'query' in changedProps && 'hash' in changedProps) {
          if (changedProps['path'] !== oldProps['path'] && changedProps['query'] !== oldProps['query'] && changedProps['hash'] !== oldProps['hash']) {
            this._updateUrl(changedProps['path'], changedProps['query'], changedProps['hash']);
          }
        }
        if ('urlSpaceRegex' in changedProps) {
          if (changedProps['urlSpaceRegex'] !== oldProps['urlSpaceRegex']) {
            this.__urlSpaceRegExp = this._makeRegExp(changedProps['urlSpaceRegex']);
          }
        }
      }
    }], [{
      key: 'observedAttributes',
      get: function get() {
        var observedAttributes = _get(_class.__proto__ || Object.getPrototypeOf(_class), 'observedAttributes', this) || [];
        return observedAttributes.concat(['path', 'query', 'urlSpaceRegex', 'hash', 'dwellTime', 'urlSpaceRegex', '_urlSpaceRegExp', '_lastChangedAt', '_initialized']);
      }
    }]);

    function _class() {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

      _this._boundHashChanged = _this._hashChanged.bind(_this);
      _this._boundUrlChanged = _this._urlChanged.bind(_this);
      _this._boundGlobalOnClick = _this._globalOnClick.bind(_this);
      return _this;
    }

    _createClass(_class, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'disconnectedCallback', this)) {
          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'connectedCallback', this).call(this);
        }
        window.addEventListener('hashchange', this._boundHashChanged);
        window.addEventListener('location-changed', this._boundUrlChanged);
        window.addEventListener('popstate', this._boundUrlChanged);
        document.body.addEventListener('click', this._boundGlobalOnClick, true);
        this._lastChangedAt = window.performance.now() - (this.dwellTime - 200);
        this._initialized = true;

        // set initialize values
        this.path = window.decodeURIComponent(window.location.pathname);
        this.query = window.location.search.slice(1);
        this.hash = window.decodeURIComponent(window.location.hash.slice(1));
        this.dwellTime = 2000;
        this._initialized = false;
        this._urlChanged();
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'disconnectedCallback', this)) {
          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'disconnectedCallback', this).call(this);
        }
        window.removeEventListener('hashchange', this._boundHashChanged);
        window.removeEventListener('location-changed', this._boundUrlChanged);
        window.removeEventListener('popstate', this._boundUrlChanged);
        document.body.removeEventListener('click', this._boundGlobalOnClick);
        this._initialized = false;
      }
    }, {
      key: '_hashChanged',
      value: function _hashChanged() {
        this.hash = window.decodeURIComponent(window.location.hash.substring(1));
      }
    }, {
      key: '_urlChanged',
      value: function _urlChanged() {
        // We want to extract all info out of the updated URL before we
        // try to write anything back into it.
        //
        // i.e. without _dontUpdateUrl we'd overwrite the new path with the old
        // one when we set this.hash. Likewise for query.
        this._dontUpdateUrl = true;
        this._hashChanged();
        this.path = window.decodeURIComponent(window.location.pathname);
        this.query = window.location.search.substring(1);
        this._dontUpdateUrl = false;
        this._updateUrl();
      }
    }, {
      key: '_getUrl',
      value: function _getUrl() {
        var partiallyEncodedPath = window.encodeURI(this.path).replace(/\#/g, '%23').replace(/\?/g, '%3F');
        var partiallyEncodedQuery = '';
        if (this.query) {
          partiallyEncodedQuery = '?' + this.query.replace(/\#/g, '%23');
        }
        var partiallyEncodedHash = '';
        if (this.hash) {
          partiallyEncodedHash = '#' + window.encodeURI(this.hash);
        }
        return partiallyEncodedPath + partiallyEncodedQuery + partiallyEncodedHash;
      }
    }, {
      key: '_updateUrl',
      value: function _updateUrl() {
        if (this._dontUpdateUrl || !this._initialized) {
          return;
        }

        if (this.path === window.decodeURIComponent(window.location.pathname) && this.query === window.location.search.substring(1) && this.hash === window.decodeURIComponent(window.location.hash.substring(1))) {
          // Nothing to do, the current URL is a representation of our properties.
          return;
        }
        var newUrl = this._getUrl();
        // Need to use a full URL in case the containing page has a base URI.
        var fullNewUrl = (0, _resolveUrl2.default)(newUrl, window.location.protocol + '//' + window.location.host).href;
        var now = window.performance.now();
        var shouldReplace = this._lastChangedAt + this.dwellTime > now;
        this._lastChangedAt = now;
        if (shouldReplace) {
          window.history.replaceState({}, '', fullNewUrl);
        } else {
          window.history.pushState({}, '', fullNewUrl);
        }
        window.dispatchEvent(new CustomEvent('location-changed'));
      }

      /**
       * A necessary evil so that links work as expected. Does its best to
       * bail out early if possible.
       *
       * @param {MouseEvent} event .
       */

    }, {
      key: '_globalOnClick',
      value: function _globalOnClick(event) {
        // If another event handler has stopped this event then there's nothing
        // for us to do. This can happen e.g. when there are multiple
        // iron-location elements in a page.
        if (event.defaultPrevented) {
          return;
        }
        var href = this._getSameOriginLinkHref(event);
        if (!href) {
          return;
        }
        event.preventDefault();
        // If the navigation is to the current page we shouldn't add a history
        // entry or fire a change event.
        if (href === window.location.href) {
          return;
        }
        window.history.pushState({}, '', href);
        window.dispatchEvent(new CustomEvent('location-changed'));
      }

      /**
       * Returns the absolute URL of the link (if any) that this click event
       * is clicking on, if we can and should override the resulting full
       * page navigation. Returns null otherwise.
       *
       * @param {MouseEvent} event .
       * @return {string?} .
       */

    }, {
      key: '_getSameOriginLinkHref',
      value: function _getSameOriginLinkHref(event) {
        // We only care about left-clicks.
        if (event.button !== 0) {
          return null;
        }
        // We don't want modified clicks, where the intent is to open the page
        // in a new tab.
        if (event.metaKey || event.ctrlKey) {
          return null;
        }
        var eventPath = event.composedPath();
        var anchor = null;
        for (var i = 0; i < eventPath.length; i++) {
          var element = eventPath[i];
          if (element.tagName === 'A' && element.href) {
            anchor = element;
            break;
          }
        }
        // If there's no link there's nothing to do.
        if (!anchor) {
          return null;
        }
        // Target blank is a new tab, don't intercept.
        if (anchor.target === '_blank') {
          return null;
        }
        // If the link is for an existing parent frame, don't intercept.
        if ((anchor.target === '_top' || anchor.target === '_parent') && window.top !== window) {
          return null;
        }
        var href = anchor.href;
        // It only makes sense for us to intercept same-origin navigations.
        // pushState/replaceState don't work with cross-origin links.
        var url;
        if (document.baseURI != null) {
          url = (0, _resolveUrl2.default)(href, /** @type {string} */document.baseURI);
        } else {
          url = (0, _resolveUrl2.default)(href);
        }
        var origin;
        // IE Polyfill
        if (window.location.origin) {
          origin = window.location.origin;
        } else {
          origin = window.location.protocol + '//' + window.location.host;
        }
        var urlOrigin;
        if (url.origin) {
          urlOrigin = url.origin;
        } else {
          urlOrigin = url.protocol + '//' + url.host;
        }
        if (urlOrigin !== origin) {
          return null;
        }
        var normalizedHref = url.pathname + url.search + url.hash;
        // pathname should start with '/', but may not if `new URL` is not supported
        if (normalizedHref[0] !== '/') {
          normalizedHref = '/' + normalizedHref;
        }
        // If we've been configured not to handle this url... don't handle it!
        if (this._urlSpaceRegExp && !this._urlSpaceRegExp.test(normalizedHref)) {
          return null;
        }
        // Need to use a full URL in case the containing page has a base URI.
        var fullNormalizedHref = (0, _resolveUrl2.default)(normalizedHref, window.location.href).href;
        return fullNormalizedHref;
      }
    }, {
      key: '_makeRegExp',
      value: function _makeRegExp(urlSpaceRegex) {
        return RegExp(urlSpaceRegex);
      }
    }]);

    return _class;
  }(superClass);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var workingURL;
var urlDoc, urlBase, anchor;
/**
 * @param {string} path
 * @param {string=} base
 * @return {!URL|!HTMLAnchorElement}
 */

exports.default = function (path, base) {
  if (workingURL === undefined) {
    workingURL = false;
    try {
      var u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      workingURL = u.href === 'http://a/c%20d';
      workingURL = workingURL && new URL('http://www.google.com/?foo bar').href === 'http://www.google.com/?foo%20bar';
    } catch (e) {}
  }
  if (workingURL) {
    return new URL(path, base);
  }
  if (!urlDoc) {
    urlDoc = document.implementation.createHTMLDocument('url');
    urlBase = urlDoc.createElement('base');
    urlDoc.head.appendChild(urlBase);
    anchor = /** @type {HTMLAnchorElement} */urlDoc.createElement('a');
  }
  urlBase.href = base;
  anchor.href = path.replace(/ /g, '%20');
  return anchor;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import 'polymer/lib/mixins/property-effects.html'
exports.default = function (superClass) {
  return function (_superClass) {
    _inherits(_class, _superClass);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'connectedCallback', this)) {
          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'connectedCallback', this).call(this);
        }

        // initialize values
        this.paramsObject = {};
        this._dontReact = false;
      }
    }, {
      key: '_propertiesChanged',
      value: function _propertiesChanged(currentProps, changedProps, oldProps) {
        if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), '_propertiesChanged', this)) {
          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), '_propertiesChanged', this).call(this, currentProps, changedProps, oldProps);
        }
        if ('paramsString' in changedProps) {
          if (changedProps['paramsString'] !== oldProps['paramsString']) {
            this._paramsStringChanged();
          }
        }
        if ('query' in changedProps) {
          if (changedProps['query'] !== oldProps['query']) {
            this._queryChanged(changedProps['query']);
          }
        }
      }
    }, {
      key: '_queryChanged',
      value: function _queryChanged(query) {
        this.paramsString = query;
      }
    }, {
      key: '_paramsStringChanged',
      value: function _paramsStringChanged() {
        this._dontReact = true;
        this.paramsObject = this._decodeParams(this.paramsString);
        this._dontReact = false;
      }
    }, {
      key: 'paramsObjectChanged',
      value: function paramsObjectChanged() {
        console.log('paramsObject');
        if (this._dontReact) {
          return;
        }
        this.paramsString = this._encodeParams(this.paramsObject).replace(/%3F/g, '?').replace(/%2F/g, '/').replace(/'/g, '%27');
      }
    }, {
      key: '_encodeParams',
      value: function _encodeParams(params) {
        var encodedParams = [];
        for (var key in params) {
          var value = params[key];
          if (value === '') {
            encodedParams.push(encodeURIComponent(key));
          } else if (value) {
            encodedParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value.toString()));
          }
        }
        return encodedParams.join('&');
      }
    }, {
      key: '_decodeParams',
      value: function _decodeParams(paramString) {
        var params = {};
        // Work around a bug in decodeURIComponent where + is not
        // converted to spaces:
        paramString = (paramString || '').replace(/\+/g, '%20');
        var paramList = paramString.split('&');
        for (var i = 0; i < paramList.length; i++) {
          var param = paramList[i].split('=');
          if (param[0]) {
            params[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || '');
          }
        }
        return params;
      }
    }], [{
      key: 'observedAttributes',
      get: function get() {
        var observedAttributes = _get(_class.__proto__ || Object.getPrototypeOf(_class), 'observedAttributes', this) || [];
        return observedAttributes.concat(['paramsString', 'paramsObject', '_dontReact']);
      }
    }]);

    return _class;
  }(superClass);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isarray = __webpack_require__(13);

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp;
module.exports.parse = parse;
module.exports.compile = compile;
module.exports.tokensToFunction = tokensToFunction;
module.exports.tokensToRegExp = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (_typeof(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (isarray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  '/': function _() {
    return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 7));
  },
  '/index.html': function indexHtml() {
    return __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 7));
  },
  '/call-for-speakers': function callForSpeakers() {
    return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 16));
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'not-found': function notFound() {
    return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 17));
  },
  'not-authorized': function notAuthorized() {
    return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 18));
  }
};

/***/ })
/******/ ]);