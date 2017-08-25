webpackJsonp([3],{

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(20);

var RegisterHtmlTemplate = __webpack_require__(21);

RegisterHtmlTemplate.register("<dom-module id=devfest-not-authorized-page> <template> <style></style> </template> </dom-module>");

(function () {
  var DevfestNotAuthorizedPage = function (_Polymer$Element) {
    _inherits(DevfestNotAuthorizedPage, _Polymer$Element);

    function DevfestNotAuthorizedPage() {
      _classCallCheck(this, DevfestNotAuthorizedPage);

      return _possibleConstructorReturn(this, (DevfestNotAuthorizedPage.__proto__ || Object.getPrototypeOf(DevfestNotAuthorizedPage)).apply(this, arguments));
    }

    _createClass(DevfestNotAuthorizedPage, null, [{
      key: 'is',
      get: function get() {
        return 'devfest-not-authorized-page';
      }
    }]);

    return DevfestNotAuthorizedPage;
  }(Polymer.Element);

  window.customElements.define(DevfestNotAuthorizedPage.is, DevfestNotAuthorizedPage);
})();

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

(function () {
  'use strict';

  var CSS_URL_RX = /(url\()([^)]*)(\))/g;
  var ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
  var workingURL = void 0;
  var resolveDoc = void 0;
  /**
   * Resolves the given URL against the provided `baseUri'.
   *
   * @memberof Polymer.ResolveUrl
   * @param {string} url Input URL to resolve
   * @param {?string=} baseURI Base URI to resolve the URL against
   * @return {string} resolved URL
   */
  function resolveUrl(url, baseURI) {
    if (url && ABS_URL.test(url)) {
      return url;
    }
    // Lazy feature detection.
    if (workingURL === undefined) {
      workingURL = false;
      try {
        var u = new URL('b', 'http://a');
        u.pathname = 'c%20d';
        workingURL = u.href === 'http://a/c%20d';
      } catch (e) {
        // silently fail
      }
    }
    if (!baseURI) {
      baseURI = document.baseURI || window.location.href;
    }
    if (workingURL) {
      return new URL(url, baseURI).href;
    }
    // Fallback to creating an anchor into a disconnected document.
    if (!resolveDoc) {
      resolveDoc = document.implementation.createHTMLDocument('temp');
      resolveDoc.base = resolveDoc.createElement('base');
      resolveDoc.head.appendChild(resolveDoc.base);
      resolveDoc.anchor = resolveDoc.createElement('a');
      resolveDoc.body.appendChild(resolveDoc.anchor);
    }
    resolveDoc.base.href = baseURI;
    resolveDoc.anchor.href = url;
    return resolveDoc.anchor.href || url;
  }

  /**
   * Resolves any relative URL's in the given CSS text against the provided
   * `ownerDocument`'s `baseURI`.
   *
   * @memberof Polymer.ResolveUrl
   * @param {string} cssText CSS text to process
   * @param {string} baseURI Base URI to resolve the URL against
   * @return {string} Processed CSS text with resolved URL's
   */
  function resolveCss(cssText, baseURI) {
    return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
      return pre + '\'' + resolveUrl(url.replace(/["']/g, ''), baseURI) + '\'' + post;
    });
  }

  /**
   * Returns a path from a given `url`. The path includes the trailing
   * `/` from the url.
   *
   * @memberof Polymer.ResolveUrl
   * @param {string} url Input URL to transform
   * @return {string} resolved path
   */
  function pathFromUrl(url) {
    return url.substring(0, url.lastIndexOf('/') + 1);
  }

  /**
   * Module with utilities for resolving relative URL's.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for resolving relative URL's.
   */
  Polymer.ResolveUrl = {
    resolveCss: resolveCss,
    resolveUrl: resolveUrl,
    pathFromUrl: pathFromUrl
  };
})();

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(23);

(function () {
  'use strict';

  /**
   * Base class that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * @customElement
   * @polymer
   * @memberof Polymer
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends HTMLElement
   * @appliesMixin Polymer.ElementMixin
   * @summary Custom element base class that provides the core API for Polymer's
   *   key meta-programming features including template stamping, data-binding,
   *   attribute deserialization, and property change observation
   */

  var Element = Polymer.ElementMixin(HTMLElement);
  /**
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends {HTMLElement}
   */
  Polymer.Element = Element;
})();

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-env browser */

var RegisterHtmlTemplate = function () {
  function RegisterHtmlTemplate() {
    _classCallCheck(this, RegisterHtmlTemplate);
  }

  _createClass(RegisterHtmlTemplate, null, [{
    key: 'register',

    /**
     * Create a `<template>` element to hold `<dom-module>` content.
     * This bit of code will execute in the context of the main document,
     * calling `importNode` on the `<template>`, which in turn triggers
     * the lifecycle of the `<dom-module>` and allows it to insert its
     * content into Polymer's global module map. When a Polymer element
     * boots up it will fetch its template from this module map.
     * https://github.com/Polymer/polymer/blob/master/lib/mixins/element-mixin.html#L501-L538
     * @param {string} val A `<dom-module>` as an HTML string
     */
    value: function register(val) {
      var content = void 0;
      var template = document.createElement('template');
      template.innerHTML = val;
      if (template.content) {
        content = template.content; // eslint-disable-line prefer-destructuring
      } else {
        content = document.createDocumentFragment();
        while (template.firstChild) {
          content.appendChild(template.firstChild);
        }
      }
      document.importNode(content, true);
    }
    /**
     * Content that will be injected into the main document. This is primarily
     * for things like `<iron-iconset>` and `<custom-style>` which do not have
     * templates but rely on HTML Imports ability to apply content to the main
     * document.
     * @param {string} val An HTML string
     */

  }, {
    key: 'toBody',
    value: function toBody(val) {
      var trimmedVal = val.trim();
      if (trimmedVal) {
        var div = document.createElement('div');
        div.innerHTML = trimmedVal;
        if (div.firstChild) {
          if (document.body) {
            document.body.insertBefore(div.firstChild, document.body.firstChild);
          } else {
            document.addEventListener('DOMContentLoaded', function () {
              document.body.insertBefore(div.firstChild, document.body.firstChild);
            });
          }
        }
      }
    }
  }]);

  return RegisterHtmlTemplate;
}();

module.exports = RegisterHtmlTemplate;

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(0);

__webpack_require__(2);

__webpack_require__(28);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(29);

(function () {

  'use strict';

  /** @const {Object} */

  var CaseMap = Polymer.CaseMap;

  // Monotonically increasing unique ID used for de-duping effects triggered
  // from multiple properties in the same turn
  var dedupeId = 0;

  /**
   * Property effect types; effects are stored on the prototype using these keys
   * @enum {string}
   */
  var TYPES = {
    COMPUTE: '__computeEffects',
    REFLECT: '__reflectEffects',
    NOTIFY: '__notifyEffects',
    PROPAGATE: '__propagateEffects',
    OBSERVE: '__observeEffects',
    READ_ONLY: '__readOnly'

    /**
     * @typedef {{
     * name: (string | undefined),
     * structured: (boolean | undefined),
     * wildcard: (boolean | undefined)
     * }}
     */
  };var DataTrigger = void 0; //eslint-disable-line no-unused-vars

  /**
   * @typedef {{
   * info: ?,
   * trigger: (!DataTrigger | undefined),
   * fn: (!Function | undefined)
   * }}
   */
  var DataEffect = void 0; //eslint-disable-line no-unused-vars

  var PropertyEffectsType = void 0; //eslint-disable-line no-unused-vars

  /**
   * Ensures that the model has an own-property map of effects for the given type.
   * The model may be a prototype or an instance.
   *
   * Property effects are stored as arrays of effects by property in a map,
   * by named type on the model. e.g.
   *
   *   __computeEffects: {
   *     foo: [ ... ],
   *     bar: [ ... ]
   *   }
   *
   * If the model does not yet have an effect map for the type, one is created
   * and returned.  If it does, but it is not an own property (i.e. the
   * prototype had effects), the the map is deeply cloned and the copy is
   * set on the model and returned, ready for new effects to be added.
   *
   * @param {Object} model Prototype or instance
   * @param {string} type Property effect type
   * @return {Object} The own-property map of effects for the given type
   * @private
   */
  function ensureOwnEffectMap(model, type) {
    var effects = model[type];
    if (!effects) {
      effects = model[type] = {};
    } else if (!model.hasOwnProperty(type)) {
      effects = model[type] = Object.create(model[type]);
      for (var p in effects) {
        var protoFx = effects[p];
        var instFx = effects[p] = Array(protoFx.length);
        for (var i = 0; i < protoFx.length; i++) {
          instFx[i] = protoFx[i];
        }
      }
    }
    return effects;
  }

  // -- effects ----------------------------------------------

  /**
   * Runs all effects of a given type for the given set of property changes
   * on an instance.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {Object} props Bag of current property changes
   * @param {Object=} oldProps Bag of previous values for changed properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
    if (effects) {
      var ran = false;
      var id = dedupeId++;
      for (var prop in props) {
        if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
          ran = true;
        }
      }
      return ran;
    }
    return false;
  }

  /**
   * Runs a list of effects for a given property.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {number} dedupeId Counter used for de-duping effects
   * @param {string} prop Name of changed property
   * @param {*} props Changed properties
   * @param {*} oldProps Old properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
    var ran = false;
    var rootProperty = hasPaths ? Polymer.Path.root(prop) : prop;
    var fxs = effects[rootProperty];
    if (fxs) {
      for (var i = 0, l = fxs.length, fx; i < l && (fx = fxs[i]); i++) {
        if ((!fx.info || fx.info.lastRun !== dedupeId) && (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
          if (fx.info) {
            fx.info.lastRun = dedupeId;
          }
          fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
          ran = true;
        }
      }
    }
    return ran;
  }

  /**
   * Determines whether a property/path that has changed matches the trigger
   * criteria for an effect.  A trigger is a descriptor with the following
   * structure, which matches the descriptors returned from `parseArg`.
   * e.g. for `foo.bar.*`:
   * ```
   * trigger: {
   *   name: 'a.b',
   *   structured: true,
   *   wildcard: true
   * }
   * ```
   * If no trigger is given, the path is deemed to match.
   *
   * @param {string} path Path or property that changed
   * @param {DataTrigger} trigger Descriptor
   * @return {boolean} Whether the path matched the trigger
   */
  function pathMatchesTrigger(path, trigger) {
    if (trigger) {
      var triggerPath = trigger.name;
      return triggerPath == path || trigger.structured && Polymer.Path.isAncestor(triggerPath, path) || trigger.wildcard && Polymer.Path.isDescendant(triggerPath, path);
    } else {
      return true;
    }
  }

  /**
   * Implements the "observer" effect.
   *
   * Calls the method with `info.methodName` on the instance, passing the
   * new and old values.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runObserverEffect(inst, property, props, oldProps, info) {
    var fn = inst[info.methodName];
    var changedProp = info.property;
    if (fn) {
      fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
    } else if (!info.dynamicFn) {
      console.warn('observer method `' + info.methodName + '` not defined');
    }
  }

  /**
   * Runs "notify" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * will dispatch path notification events in the case that the property
   * changed was a path and the root property for that path didn't have a
   * "notify" effect.  This is to maintain 1.0 behavior that did not require
   * `notify: true` to ensure object sub-property notifications were
   * sent.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} notifyProps Bag of properties to notify
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
    // Notify
    var fxs = inst[TYPES.NOTIFY];
    var notified = void 0;
    var id = dedupeId++;
    // Try normal notify effects; if none, fall back to try path notification
    for (var prop in notifyProps) {
      if (notifyProps[prop]) {
        if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
          notified = true;
        } else if (hasPaths && notifyPath(inst, prop, props)) {
          notified = true;
        }
      }
    }
    // Flush host if we actually notified and host was batching
    // And the host has already initialized clients; this prevents
    // an issue with a host observing data changes before clients are ready.
    var host = void 0;
    if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
      host._invalidateProperties();
    }
  }

  /**
   * Dispatches {property}-changed events with path information in the detail
   * object to indicate a sub-path of the property was changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} path The path that was changed
   * @param {Object} props Bag of current property changes
   * @return {boolean} Returns true if the path was notified
   * @private
   */
  function notifyPath(inst, path, props) {
    var rootProperty = Polymer.Path.root(path);
    if (rootProperty !== path) {
      var eventName = Polymer.CaseMap.camelToDashCase(rootProperty) + '-changed';
      dispatchNotifyEvent(inst, eventName, props[path], path);
      return true;
    }
    return false;
  }

  /**
   * Dispatches {property}-changed events to indicate a property (or path)
   * changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} eventName The name of the event to send ('{property}-changed')
   * @param {*} value The value of the changed property
   * @param {string | null | undefined} path If a sub-path of this property changed, the path
   *   that changed (optional).
   * @private
   * @suppress {invalidCasts}
   */
  function dispatchNotifyEvent(inst, eventName, value, path) {
    var detail = {
      value: value,
      queueProperty: true
    };
    if (path) {
      detail.path = path;
    }
    /** @type {!HTMLElement} */inst.dispatchEvent(new CustomEvent(eventName, { detail: detail }));
  }

  /**
   * Implements the "notify" effect.
   *
   * Dispatches a non-bubbling event named `info.eventName` on the instance
   * with a detail object containing the new `value`.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
    var rootProperty = hasPaths ? Polymer.Path.root(property) : property;
    var path = rootProperty != property ? property : null;
    var value = path ? Polymer.Path.get(inst, path) : inst.__data[property];
    if (path && value === undefined) {
      value = props[property]; // specifically for .splices
    }
    dispatchNotifyEvent(inst, info.eventName, value, path);
  }

  /**
   * Handler function for 2-way notification events. Receives context
   * information captured in the `addNotifyListener` closure from the
   * `__notifyListeners` metadata.
   *
   * Sets the value of the notified property to the host property or path.  If
   * the event contained path information, translate that path to the host
   * scope's name for that path first.
   *
   * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
   * @param {!PropertyEffectsType} inst Host element instance handling the notification event
   * @param {string} fromProp Child element property that was bound
   * @param {string} toPath Host property/path that was bound
   * @param {boolean} negate Whether the binding was negated
   * @private
   */
  function handleNotification(event, inst, fromProp, toPath, negate) {
    var value = void 0;
    var detail = /** @type {Object} */event.detail;
    var fromPath = detail && detail.path;
    if (fromPath) {
      toPath = Polymer.Path.translate(fromProp, toPath, fromPath);
      value = detail && detail.value;
    } else {
      value = event.target[fromProp];
    }
    value = negate ? !value : value;
    if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
      if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath)) && (!detail || !detail.queueProperty)) {
        inst._invalidateProperties();
      }
    }
  }

  /**
   * Implements the "reflect" effect.
   *
   * Sets the attribute named `info.attrName` to the given property value.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runReflectEffect(inst, property, props, oldProps, info) {
    var value = inst.__data[property];
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, info.attrName, 'attribute', /** @type {Node} */inst);
    }
    inst._propertyToAttribute(property, info.attrName, value);
  }

  /**
   * Runs "computed" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * continues to run computed effects based on the output of each pass until
   * there are no more newly computed properties.  This ensures that all
   * properties that will be computed by the initial set of changes are
   * computed before other effects (binding propagation, observers, and notify)
   * run.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {!Object} changedProps Bag of changed properties
   * @param {!Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
    var computeEffects = inst[TYPES.COMPUTE];
    if (computeEffects) {
      var inputProps = changedProps;
      while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
        Object.assign(oldProps, inst.__dataOld);
        Object.assign(changedProps, inst.__dataPending);
        inputProps = inst.__dataPending;
        inst.__dataPending = null;
      }
    }
  }

  /**
   * Implements the "computed property" effect by running the method with the
   * values of the arguments specified in the `info` object and setting the
   * return value to the computed property specified.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runComputedEffect(inst, property, props, oldProps, info) {
    var result = runMethodEffect(inst, property, props, oldProps, info);
    var computedProp = info.methodInfo;
    if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
      inst._setPendingProperty(computedProp, result, true);
    } else {
      inst[computedProp] = result;
    }
  }

  /**
   * Computes path changes based on path links set up using the `linkPaths`
   * API.
   *
   * @param {!PropertyEffectsType} inst The instance whose props are changing
   * @param {string | !Array<(string|number)>} path Path that has changed
   * @param {*} value Value of changed path
   * @private
   */
  function computeLinkedPaths(inst, path, value) {
    var links = inst.__dataLinkedPaths;
    if (links) {
      var link = void 0;
      for (var a in links) {
        var b = links[a];
        if (Polymer.Path.isDescendant(a, path)) {
          link = Polymer.Path.translate(a, b, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        } else if (Polymer.Path.isDescendant(b, path)) {
          link = Polymer.Path.translate(b, a, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        }
      }
    }
  }

  // -- bindings ----------------------------------------------

  /**
   * Adds binding metadata to the current `nodeInfo`, and binding effects
   * for all part dependencies to `templateInfo`.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {NodeInfo} nodeInfo Node metadata for current template node
   * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
   * @param {string} target Target property name
   * @param {!Array<!BindingPart>} parts Array of binding part metadata
   * @param {string=} literal Literal text surrounding binding parts (specified
   *   only for 'property' bindings, since these must be initialized as part
   *   of boot-up)
   * @private
   */
  function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
    // Create binding metadata and add to nodeInfo
    nodeInfo.bindings = nodeInfo.bindings || [];
    var /** Binding */binding = { kind: kind, target: target, parts: parts, literal: literal, isCompound: parts.length !== 1 };
    nodeInfo.bindings.push(binding);
    // Add listener info to binding metadata
    if (shouldAddListener(binding)) {
      var _binding$parts$ = binding.parts[0],
          event = _binding$parts$.event,
          negate = _binding$parts$.negate;

      binding.listenerEvent = event || CaseMap.camelToDashCase(target) + '-changed';
      binding.listenerNegate = negate;
    }
    // Add "propagate" property effects to templateInfo
    var index = templateInfo.nodeInfoList.length;
    for (var i = 0; i < binding.parts.length; i++) {
      var part = binding.parts[i];
      part.compoundIndex = i;
      addEffectForBindingPart(constructor, templateInfo, binding, part, index);
    }
  }

  /**
   * Adds property effects to the given `templateInfo` for the given binding
   * part.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {number} index Index into `nodeInfoList` for this node
   */
  function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
    if (!part.literal) {
      if (binding.kind === 'attribute' && binding.target[0] === '-') {
        console.warn('Cannot set attribute ' + binding.target + ' because "-" is not a valid attribute starting character');
      } else {
        var dependencies = part.dependencies;
        var info = { index: index, binding: binding, part: part, evaluator: constructor };
        for (var j = 0; j < dependencies.length; j++) {
          var trigger = dependencies[j];
          if (typeof trigger == 'string') {
            trigger = parseArg(trigger);
            trigger.wildcard = true;
          }
          constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
            fn: runBindingEffect,
            info: info, trigger: trigger
          });
        }
      }
    }
  }

  /**
   * Implements the "binding" (property/path binding) effect.
   *
   * Note that binding syntax is overridable via `_parseBindings` and
   * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
   * non-literal parts returned from `_parseBindings`.  However,
   * there is no support for _path_ bindings via custom binding parts,
   * as this is specific to Polymer's path binding syntax.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} path Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
   *   metadata
   * @private
   */
  function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
    var node = nodeList[info.index];
    var binding = info.binding;
    var part = info.part;
    // Subpath notification: transform path and set to client
    // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
    if (hasPaths && part.source && path.length > part.source.length && binding.kind == 'property' && !binding.isCompound && node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
      var value = props[path];
      path = Polymer.Path.translate(part.source, binding.target, path);
      if (node._setPendingPropertyOrPath(path, value, false, true)) {
        inst._enqueueClient(node);
      }
    } else {
      var _value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
      // Propagate value to child
      applyBindingValue(inst, node, binding, part, _value);
    }
  }

  /**
   * Sets the value for an "binding" (binding) effect to a node,
   * either as a property or attribute.
   *
   * @param {!PropertyEffectsType} inst The instance owning the binding effect
   * @param {Node} node Target node for binding
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {*} value Value to set
   * @private
   */
  function applyBindingValue(inst, node, binding, part, value) {
    value = computeBindingValue(node, value, binding, part);
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, binding.target, binding.kind, node);
    }
    if (binding.kind == 'attribute') {
      // Attribute binding
      inst._valueToNodeAttribute( /** @type {Element} */node, value, binding.target);
    } else {
      // Property binding
      var prop = binding.target;
      if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
        if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
          if (node._setPendingProperty(prop, value)) {
            inst._enqueueClient(node);
          }
        }
      } else {
        inst._setUnmanagedPropertyToNode(node, prop, value);
      }
    }
  }

  /**
   * Transforms an "binding" effect value based on compound & negation
   * effect metadata, as well as handling for special-case properties
   *
   * @param {Node} node Node the value will be set to
   * @param {*} value Value to set
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @return {*} Transformed value to set
   * @private
   */
  function computeBindingValue(node, value, binding, part) {
    if (binding.isCompound) {
      var storage = node.__dataCompoundStorage[binding.target];
      storage[part.compoundIndex] = value;
      value = storage.join('');
    }
    if (binding.kind !== 'attribute') {
      // Some browsers serialize `undefined` to `"undefined"`
      if (binding.target === 'textContent' || node.localName == 'input' && binding.target == 'value') {
        value = value == undefined ? '' : value;
      }
    }
    return value;
  }

  /**
   * Returns true if a binding's metadata meets all the requirements to allow
   * 2-way binding, and therefore a `<property>-changed` event listener should be
   * added:
   * - used curly braces
   * - is a property (not attribute) binding
   * - is not a textContent binding
   * - is not compound
   *
   * @param {!Binding} binding Binding metadata
   * @return {boolean} True if 2-way listener should be added
   * @private
   */
  function shouldAddListener(binding) {
    return Boolean(binding.target) && binding.kind != 'attribute' && binding.kind != 'text' && !binding.isCompound && binding.parts[0].mode === '{';
  }

  /**
   * Setup compound binding storage structures, notify listeners, and dataHost
   * references onto the bound nodeList.
   *
   * @param {!PropertyEffectsType} inst Instance that bas been previously bound
   * @param {TemplateInfo} templateInfo Template metadata
   * @private
   */
  function setupBindings(inst, templateInfo) {
    // Setup compound storage, dataHost, and notify listeners
    var nodeList = templateInfo.nodeList,
        nodeInfoList = templateInfo.nodeInfoList;

    if (nodeInfoList.length) {
      for (var i = 0; i < nodeInfoList.length; i++) {
        var info = nodeInfoList[i];
        var node = nodeList[i];
        var bindings = info.bindings;
        if (bindings) {
          for (var _i = 0; _i < bindings.length; _i++) {
            var binding = bindings[_i];
            setupCompoundStorage(node, binding);
            addNotifyListener(node, inst, binding);
          }
        }
        node.__dataHost = inst;
      }
    }
  }

  /**
   * Initializes `__dataCompoundStorage` local storage on a bound node with
   * initial literal data for compound bindings, and sets the joined
   * literal parts to the bound property.
   *
   * When changes to compound parts occur, they are first set into the compound
   * storage array for that property, and then the array is joined to result in
   * the final value set to the property/attribute.
   *
   * @param {Node} node Bound node to initialize
   * @param {Binding} binding Binding metadata
   * @private
   */
  function setupCompoundStorage(node, binding) {
    if (binding.isCompound) {
      // Create compound storage map
      var storage = node.__dataCompoundStorage || (node.__dataCompoundStorage = {});
      var parts = binding.parts;
      // Copy literals from parts into storage for this binding
      var literals = new Array(parts.length);
      for (var j = 0; j < parts.length; j++) {
        literals[j] = parts[j].literal;
      }
      var target = binding.target;
      storage[target] = literals;
      // Configure properties with their literal parts
      if (binding.literal && binding.kind == 'property') {
        node[target] = binding.literal;
      }
    }
  }

  /**
   * Adds a 2-way binding notification event listener to the node specified
   *
   * @param {Object} node Child element to add listener to
   * @param {!PropertyEffectsType} inst Host element instance to handle notification event
   * @param {Binding} binding Binding metadata
   * @private
   */
  function addNotifyListener(node, inst, binding) {
    if (binding.listenerEvent) {
      var part = binding.parts[0];
      node.addEventListener(binding.listenerEvent, function (e) {
        handleNotification(e, inst, binding.target, part.source, part.negate);
      });
    }
  }

  // -- for method-based effects (complexObserver & computed) --------------

  /**
   * Adds property effects for each argument in the method signature (and
   * optionally, for the method name if `dynamic` is true) that calls the
   * provided effect function.
   *
   * @param {Element | Object} model Prototype or instance
   * @param {!MethodSignature} sig Method signature metadata
   * @param {string} type Type of property effect to add
   * @param {Function} effectFn Function to run when arguments change
   * @param {*=} methodInfo Effect-specific information to be included in
   *   method effect metadata
   * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
   *   method names should be included as a dependency to the effect. Note,
   *   defaults to true if the signature is static (sig.static is true).
   * @private
   */
  function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
    dynamicFn = sig.static || dynamicFn && ((typeof dynamicFn === 'undefined' ? 'undefined' : _typeof(dynamicFn)) !== 'object' || dynamicFn[sig.methodName]);
    var info = {
      methodName: sig.methodName,
      args: sig.args,
      methodInfo: methodInfo,
      dynamicFn: dynamicFn
    };
    for (var i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
      if (!arg.literal) {
        model._addPropertyEffect(arg.rootProperty, type, {
          fn: effectFn, info: info, trigger: arg
        });
      }
    }
    if (dynamicFn) {
      model._addPropertyEffect(sig.methodName, type, {
        fn: effectFn, info: info
      });
    }
  }

  /**
   * Calls a method with arguments marshaled from properties on the instance
   * based on the method signature contained in the effect metadata.
   *
   * Multi-property observers, computed properties, and inline computing
   * functions call this function to invoke the method, then use the return
   * value accordingly.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @return {*} Returns the return value from the method invocation
   * @private
   */
  function runMethodEffect(inst, property, props, oldProps, info) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    var context = inst._methodHost || inst;
    var fn = context[info.methodName];
    if (fn) {
      var args = marshalArgs(inst.__data, info.args, property, props);
      return fn.apply(context, args);
    } else if (!info.dynamicFn) {
      console.warn('method `' + info.methodName + '` not defined');
    }
  }

  var emptyArray = [];

  // Regular expressions used for binding
  var IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
  var NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
  var SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
  var DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
  var STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
  var ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' + STRING + ')\\s*' + ')';
  var ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
  var ARGUMENT_LIST = '(?:' + '\\(\\s*' + '(?:' + ARGUMENTS + '?' + ')' + '\\)\\s*' + ')';
  var BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
  var OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
  var CLOSE_BRACKET = '(?:]]|}})';
  var NEGATE = '(?:(!)\\s*)?'; // Group 2
  var EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
  var bindingRegex = new RegExp(EXPRESSION, "g");

  /**
   * Create a string from binding parts of all the literal parts
   *
   * @param {!Array<BindingPart>} parts All parts to stringify
   * @return {string} String made from the literal parts
   */
  function literalFromParts(parts) {
    var s = '';
    for (var i = 0; i < parts.length; i++) {
      var literal = parts[i].literal;
      s += literal || '';
    }
    return s;
  }

  /**
   * Parses an expression string for a method signature, and returns a metadata
   * describing the method in terms of `methodName`, `static` (whether all the
   * arguments are literals), and an array of `args`
   *
   * @param {string} expression The expression to parse
   * @return {?MethodSignature} The method metadata object if a method expression was
   *   found, otherwise `undefined`
   * @private
   */
  function parseMethod(expression) {
    // tries to match valid javascript property names
    var m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (m) {
      var methodName = m[1];
      var sig = { methodName: methodName, static: true, args: emptyArray };
      if (m[2].trim()) {
        // replace escaped commas with comma entity, split on un-escaped commas
        var args = m[2].replace(/\\,/g, '&comma;').split(',');
        return parseArgs(args, sig);
      } else {
        return sig;
      }
    }
    return null;
  }

  /**
   * Parses an array of arguments and sets the `args` property of the supplied
   * signature metadata object. Sets the `static` property to false if any
   * argument is a non-literal.
   *
   * @param {!Array<string>} argList Array of argument names
   * @param {!MethodSignature} sig Method signature metadata object
   * @return {!MethodSignature} The updated signature metadata object
   * @private
   */
  function parseArgs(argList, sig) {
    sig.args = argList.map(function (rawArg) {
      var arg = parseArg(rawArg);
      if (!arg.literal) {
        sig.static = false;
      }
      return arg;
    }, this);
    return sig;
  }

  /**
   * Parses an individual argument, and returns an argument metadata object
   * with the following fields:
   *
   *   {
   *     value: 'prop',        // property/path or literal value
   *     literal: false,       // whether argument is a literal
   *     structured: false,    // whether the property is a path
   *     rootProperty: 'prop', // the root property of the path
   *     wildcard: false       // whether the argument was a wildcard '.*' path
   *   }
   *
   * @param {string} rawArg The string value of the argument
   * @return {!MethodArg} Argument metadata object
   * @private
   */
  function parseArg(rawArg) {
    // clean up whitespace
    var arg = rawArg.trim()
    // replace comma entity with comma
    .replace(/&comma;/g, ',')
    // repair extra escape sequences; note only commas strictly need
    // escaping, but we allow any other char to be escaped since its
    // likely users will do this
    .replace(/\\(.)/g, '\$1');
    // basic argument descriptor
    var a = {
      name: arg,
      value: '',
      literal: false
    };
    // detect literal value (must be String or Number)
    var fc = arg[0];
    if (fc === '-') {
      fc = arg[1];
    }
    if (fc >= '0' && fc <= '9') {
      fc = '#';
    }
    switch (fc) {
      case "'":
      case '"':
        a.value = arg.slice(1, -1);
        a.literal = true;
        break;
      case '#':
        a.value = Number(arg);
        a.literal = true;
        break;
    }
    // if not literal, look for structured path
    if (!a.literal) {
      a.rootProperty = Polymer.Path.root(arg);
      // detect structured path (has dots)
      a.structured = Polymer.Path.isPath(arg);
      if (a.structured) {
        a.wildcard = arg.slice(-2) == '.*';
        if (a.wildcard) {
          a.name = arg.slice(0, -2);
        }
      }
    }
    return a;
  }

  /**
   * Gather the argument values for a method specified in the provided array
   * of argument metadata.
   *
   * The `path` and `value` arguments are used to fill in wildcard descriptor
   * when the method is being called as a result of a path notification.
   *
   * @param {Object} data Instance data storage object to read properties from
   * @param {!Array<!MethodArg>} args Array of argument metadata
   * @param {string} path Property/path name that triggered the method effect
   * @param {Object} props Bag of current property changes
   * @return {Array<*>} Array of argument values
   * @private
   */
  function marshalArgs(data, args, path, props) {
    var values = [];
    for (var i = 0, l = args.length; i < l; i++) {
      var arg = args[i];
      var name = arg.name;
      var v = void 0;
      if (arg.literal) {
        v = arg.value;
      } else {
        if (arg.structured) {
          v = Polymer.Path.get(data, name);
          // when data is not stored e.g. `splices`
          if (v === undefined) {
            v = props[name];
          }
        } else {
          v = data[name];
        }
      }
      if (arg.wildcard) {
        // Only send the actual path changed info if the change that
        // caused the observer to run matched the wildcard
        var baseChanged = name.indexOf(path + '.') === 0;
        var matches = path.indexOf(name) === 0 && !baseChanged;
        values[i] = {
          path: matches ? path : name,
          value: matches ? props[path] : v,
          base: v
        };
      } else {
        values[i] = v;
      }
    }
    return values;
  }

  // data api

  /**
   * Sends array splice notifications (`.splices` and `.length`)
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {Array} splices Array of splice records
   * @private
   */
  function _notifySplices(inst, array, path, splices) {
    var splicesPath = path + '.splices';
    inst.notifyPath(splicesPath, { indexSplices: splices });
    inst.notifyPath(path + '.length', array.length);
    // Null here to allow potentially large splice records to be GC'ed.
    inst.__data[splicesPath] = { indexSplices: null };
  }

  /**
   * Creates a splice record and sends an array splice notification for
   * the described mutation
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {number} index Index at which the array mutation occurred
   * @param {number} addedCount Number of added items
   * @param {Array} removed Array of removed items
   * @private
   */
  function notifySplice(inst, array, path, index, addedCount, removed) {
    _notifySplices(inst, array, path, [{
      index: index,
      addedCount: addedCount,
      removed: removed,
      object: array,
      type: 'splice'
    }]);
  }

  /**
   * Returns an upper-cased version of the string.
   *
   * @param {string} name String to uppercase
   * @return {string} Uppercased string
   * @private
   */
  function upper(name) {
    return name[0].toUpperCase() + name.substring(1);
  }

  /**
   * Element class mixin that provides meta-programming for Polymer's template
   * binding and data observation (collectively, "property effects") system.
   *
   * This mixin uses provides the following key static methods for adding
   * property effects to an element class:
   * - `addPropertyEffect`
   * - `createPropertyObserver`
   * - `createMethodObserver`
   * - `createNotifyingProperty`
   * - `createReadOnlyProperty`
   * - `createReflectedProperty`
   * - `createComputedProperty`
   * - `bindTemplate`
   *
   * Each method creates one or more property accessors, along with metadata
   * used by this mixin's implementation of `_propertiesChanged` to perform
   * the property effects.
   *
   * Underscored versions of the above methods also exist on the element
   * prototype for adding property effects on instances at runtime.
   *
   * Note that this mixin overrides several `PropertyAccessors` methods, in
   * many cases to maintain guarantees provided by the Polymer 1.x features;
   * notably it changes property accessors to be synchronous by default
   * whereas the default when using `PropertyAccessors` standalone is to be
   * async by default.
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.TemplateStamp
   * @appliesMixin Polymer.PropertyAccessors
   * @memberof Polymer
   * @summary Element class mixin that provides meta-programming for Polymer's
   * template binding and data observation system.
   */
  Polymer.PropertyEffects = Polymer.dedupingMixin(function (superClass) {

    /**
     * @constructor
     * @extends {superClass}
     * @implements {Polymer_PropertyAccessors}
     * @implements {Polymer_TemplateStamp}
     * @unrestricted
     */
    var propertyEffectsBase = Polymer.TemplateStamp(Polymer.PropertyAccessors(superClass));

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyEffects}
     * @extends {propertyEffectsBase}
     * @unrestricted
     */

    var PropertyEffects = function (_propertyEffectsBase) {
      _inherits(PropertyEffects, _propertyEffectsBase);

      function PropertyEffects() {
        _classCallCheck(this, PropertyEffects);

        /** @type {boolean} */
        var _this = _possibleConstructorReturn(this, (PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects)).call(this));

        _this.__dataClientsReady;
        /** @type {Array} */
        _this.__dataPendingClients;
        /** @type {Object} */
        _this.__dataToNotify;
        /** @type {Object} */
        _this.__dataLinkedPaths;
        /** @type {boolean} */
        _this.__dataHasPaths;
        /** @type {Object} */
        _this.__dataCompoundStorage;
        /** @type {Polymer_PropertyEffects} */
        _this.__dataHost;
        /** @type {!Object} */
        _this.__dataTemp;
        /** @type {boolean} */
        _this.__dataClientsInitialized;
        /** @type {!Object} */
        _this.__data;
        /** @type {!Object} */
        _this.__dataPending;
        /** @type {!Object} */
        _this.__dataOld;
        /** @type {Object} */
        _this.__computeEffects;
        /** @type {Object} */
        _this.__reflectEffects;
        /** @type {Object} */
        _this.__notifyEffects;
        /** @type {Object} */
        _this.__propagateEffects;
        /** @type {Object} */
        _this.__observeEffects;
        /** @type {Object} */
        _this.__readOnly;
        /** @type {number} */
        _this.__dataCounter;
        /** @type {!TemplateInfo} */
        _this.__templateInfo;
        return _this;
      }

      _createClass(PropertyEffects, [{
        key: '_initializeProperties',
        value: function _initializeProperties() {
          _get(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_initializeProperties', this).call(this);
          hostStack.registerHost(this);
          this.__dataClientsReady = false;
          this.__dataPendingClients = null;
          this.__dataToNotify = null;
          this.__dataLinkedPaths = null;
          this.__dataHasPaths = false;
          // May be set on instance prior to upgrade
          this.__dataCompoundStorage = this.__dataCompoundStorage || null;
          this.__dataHost = this.__dataHost || null;
          this.__dataTemp = {};
          this.__dataClientsInitialized = false;
        }

        /**
         * Overrides `Polymer.PropertyAccessors` implementation to provide a
         * more efficient implementation of initializing properties from
         * the prototype on the instance.
         *
         * @override
         * @param {Object} props Properties to initialize on the prototype
         */

      }, {
        key: '_initializeProtoProperties',
        value: function _initializeProtoProperties(props) {
          this.__data = Object.create(props);
          this.__dataPending = Object.create(props);
          this.__dataOld = {};
        }

        /**
         * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
         * `_setProperty`'s `shouldNotify: true`.
         *
         * @override
         * @param {Object} props Properties to initialize on the instance
         */

      }, {
        key: '_initializeInstanceProperties',
        value: function _initializeInstanceProperties(props) {
          var readOnly = this[TYPES.READ_ONLY];
          for (var prop in props) {
            if (!readOnly || !readOnly[prop]) {
              this.__dataPending = this.__dataPending || {};
              this.__dataOld = this.__dataOld || {};
              this.__data[prop] = this.__dataPending[prop] = props[prop];
            }
          }
        }

        // Prototype setup ----------------------------------------

        /**
         * Equivalent to static `addPropertyEffect` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property that should trigger the effect
         * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @param {Object=} effect Effect metadata object
         * @protected
         */

      }, {
        key: '_addPropertyEffect',
        value: function _addPropertyEffect(property, type, effect) {
          this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
          // effects are accumulated into arrays per property based on type
          var effects = ensureOwnEffectMap(this, type)[property];
          if (!effects) {
            effects = this[type][property] = [];
          }
          effects.push(effect);
        }

        /**
         * Removes the given property effect.
         *
         * @param {string} property Property the effect was associated with
         * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @param {Object=} effect Effect metadata object to remove
         */

      }, {
        key: '_removePropertyEffect',
        value: function _removePropertyEffect(property, type, effect) {
          var effects = ensureOwnEffectMap(this, type)[property];
          var idx = effects.indexOf(effect);
          if (idx >= 0) {
            effects.splice(idx, 1);
          }
        }

        /**
         * Returns whether the current prototype/instance has a property effect
         * of a certain type.
         *
         * @param {string} property Property name
         * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasPropertyEffect',
        value: function _hasPropertyEffect(property, type) {
          var effects = this[type];
          return Boolean(effects && effects[property]);
        }

        /**
         * Returns whether the current prototype/instance has a "read only"
         * accessor for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasReadOnlyEffect',
        value: function _hasReadOnlyEffect(property) {
          return this._hasPropertyEffect(property, TYPES.READ_ONLY);
        }

        /**
         * Returns whether the current prototype/instance has a "notify"
         * property effect for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasNotifyEffect',
        value: function _hasNotifyEffect(property) {
          return this._hasPropertyEffect(property, TYPES.NOTIFY);
        }

        /**
         * Returns whether the current prototype/instance has a "reflect to attribute"
         * property effect for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasReflectEffect',
        value: function _hasReflectEffect(property) {
          return this._hasPropertyEffect(property, TYPES.REFLECT);
        }

        /**
         * Returns whether the current prototype/instance has a "computed"
         * property effect for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasComputedEffect',
        value: function _hasComputedEffect(property) {
          return this._hasPropertyEffect(property, TYPES.COMPUTE);
        }

        // Runtime ----------------------------------------

        /**
         * Sets a pending property or path.  If the root property of the path in
         * question had no accessor, the path is set, otherwise it is enqueued
         * via `_setPendingProperty`.
         *
         * This function isolates relatively expensive functionality necessary
         * for the public API (`set`, `setProperties`, `notifyPath`, and property
         * change listeners via {{...}} bindings), such that it is only done
         * when paths enter the system, and not at every propagation step.  It
         * also sets a `__dataHasPaths` flag on the instance which is used to
         * fast-path slower path-matching code in the property effects host paths.
         *
         * `path` can be a path string or array of path parts as accepted by the
         * public API.
         *
         * @param {string | !Array<number|string>} path Path to set
         * @param {*} value Value to set
         * @param {boolean=} shouldNotify Set to true if this change should
         *  cause a property notification event dispatch
         * @param {boolean=} isPathNotification If the path being set is a path
         *   notification of an already changed value, as opposed to a request
         *   to set and notify the change.  In the latter `false` case, a dirty
         *   check is performed and then the value is set to the path before
         *   enqueuing the pending property change.
         * @return {boolean} Returns true if the property/path was enqueued in
         *   the pending changes bag.
         * @protected
         */

      }, {
        key: '_setPendingPropertyOrPath',
        value: function _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
          if (isPathNotification || Polymer.Path.root(Array.isArray(path) ? path[0] : path) !== path) {
            // Dirty check changes being set to a path against the actual object,
            // since this is the entry point for paths into the system; from here
            // the only dirty checks are against the `__dataTemp` cache to prevent
            // duplicate work in the same turn only. Note, if this was a notification
            // of a change already set to a path (isPathNotification: true),
            // we always let the change through and skip the `set` since it was
            // already dirty checked at the point of entry and the underlying
            // object has already been updated
            if (!isPathNotification) {
              var old = Polymer.Path.get(this, path);
              path = /** @type {string} */Polymer.Path.set(this, path, value);
              // Use property-accessor's simpler dirty check
              if (!path || !_get(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_shouldPropertyChange', this).call(this, path, value, old)) {
                return false;
              }
            }
            this.__dataHasPaths = true;
            if (this._setPendingProperty( /**@type{string}*/path, value, shouldNotify)) {
              computeLinkedPaths(this, path, value);
              return true;
            }
          } else {
            if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
              return this._setPendingProperty( /**@type{string}*/path, value, shouldNotify);
            } else {
              this[path] = value;
            }
          }
          return false;
        }

        /**
         * Applies a value to a non-Polymer element/node's property.
         *
         * The implementation makes a best-effort at binding interop:
         * Some native element properties have side-effects when
         * re-setting the same value (e.g. setting `<input>.value` resets the
         * cursor position), so we do a dirty-check before setting the value.
         * However, for better interop with non-Polymer custom elements that
         * accept objects, we explicitly re-set object changes coming from the
         * Polymer world (which may include deep object changes without the
         * top reference changing), erring on the side of providing more
         * information.
         *
         * Users may override this method to provide alternate approaches.
         *
         * @param {Node} node The node to set a property on
         * @param {string} prop The property to set
         * @param {*} value The value to set
         * @protected
         */

      }, {
        key: '_setUnmanagedPropertyToNode',
        value: function _setUnmanagedPropertyToNode(node, prop, value) {
          // It is a judgment call that resetting primitives is
          // "bad" and resettings objects is also "good"; alternatively we could
          // implement a whitelist of tag & property values that should never
          // be reset (e.g. <input>.value && <select>.value)
          if (value !== node[prop] || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
            node[prop] = value;
          }
        }

        /**
         * Overrides the `PropertyAccessors` implementation to introduce special
         * dirty check logic depending on the property & value being set:
         *
         * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
         *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
         * 2. Object set to simple property (e.g. 'prop': {...})
         *    Stored in `__dataTemp` and `__data`, dirty checked against
         *    `__dataTemp` by default implementation of `_shouldPropertyChange`
         * 3. Primitive value set to simple property (e.g. 'prop': 42)
         *    Stored in `__data`, dirty checked against `__data`
         *
         * The dirty-check is important to prevent cycles due to two-way
         * notification, but paths and objects are only dirty checked against any
         * previous value set during this turn via a "temporary cache" that is
         * cleared when the last `_propertiesChaged` exits. This is so:
         * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
         *    due to array mutations like shift/unshift/splice; this is fine
         *    since path changes are dirty-checked at user entry points like `set`
         * b. dirty-checking for objects only lasts one turn to allow the user
         *    to mutate the object in-place and re-set it with the same identity
         *    and have all sub-properties re-propagated in a subsequent turn.
         *
         * The temp cache is not necessarily sufficient to prevent invalid array
         * paths, since a splice can happen during the same turn (with pathological
         * user code); we could introduce a "fixup" for temporarily cached array
         * paths if needed: https://github.com/Polymer/polymer/issues/4227
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @param {boolean=} shouldNotify True if property should fire notification
         *   event (applies only for `notify: true` properties)
         * @return {boolean} Returns true if the property changed
         * @override
         */

      }, {
        key: '_setPendingProperty',
        value: function _setPendingProperty(property, value, shouldNotify) {
          var isPath = this.__dataHasPaths && Polymer.Path.isPath(property);
          var prevProps = isPath ? this.__dataTemp : this.__data;
          if (this._shouldPropertyChange(property, value, prevProps[property])) {
            if (!this.__dataPending) {
              this.__dataPending = {};
              this.__dataOld = {};
            }
            // Ensure old is captured from the last turn
            if (!(property in this.__dataOld)) {
              this.__dataOld[property] = this.__data[property];
            }
            // Paths are stored in temporary cache (cleared at end of turn),
            // which is used for dirty-checking, all others stored in __data
            if (isPath) {
              this.__dataTemp[property] = value;
            } else {
              this.__data[property] = value;
            }
            // All changes go into pending property bag, passed to _propertiesChanged
            this.__dataPending[property] = value;
            // Track properties that should notify separately
            if (isPath || this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property]) {
              this.__dataToNotify = this.__dataToNotify || {};
              this.__dataToNotify[property] = shouldNotify;
            }
            return true;
          }
          return false;
        }

        /**
         * Overrides base implementation to ensure all accessors set `shouldNotify`
         * to true, for per-property notification tracking.
         *
         * @override
         */

      }, {
        key: '_setProperty',
        value: function _setProperty(property, value) {
          if (this._setPendingProperty(property, value, true)) {
            this._invalidateProperties();
          }
        }

        /**
         * Overrides `PropertyAccessor`'s default async queuing of
         * `_propertiesChanged`: if `__dataReady` is false (has not yet been
         * manually flushed), the function no-ops; otherwise flushes
         * `_propertiesChanged` synchronously.
         *
         * @override
         */

      }, {
        key: '_invalidateProperties',
        value: function _invalidateProperties() {
          if (this.__dataReady) {
            this._flushProperties();
          }
        }

        /**
         * Enqueues the given client on a list of pending clients, whose
         * pending property changes can later be flushed via a call to
         * `_flushClients`.
         *
         * @param {Object} client PropertyEffects client to enqueue
         * @protected
         */

      }, {
        key: '_enqueueClient',
        value: function _enqueueClient(client) {
          this.__dataPendingClients = this.__dataPendingClients || [];
          if (client !== this) {
            this.__dataPendingClients.push(client);
          }
        }

        /**
         * Flushes any clients previously enqueued via `_enqueueClient`, causing
         * their `_flushProperties` method to run.
         *
         * @protected
         */

      }, {
        key: '_flushClients',
        value: function _flushClients() {
          if (!this.__dataClientsReady) {
            this.__dataClientsReady = true;
            this._readyClients();
            // Override point where accessors are turned on; importantly,
            // this is after clients have fully readied, providing a guarantee
            // that any property effects occur only after all clients are ready.
            this.__dataReady = true;
          } else {
            this.__enableOrFlushClients();
          }
        }

        // NOTE: We ensure clients either enable or flush as appropriate. This
        // handles two corner cases:
        // (1) clients flush properly when connected/enabled before the host
        // enables; e.g.
        //   (a) Templatize stamps with no properties and does not flush and
        //   (b) the instance is inserted into dom and
        //   (c) then the instance flushes.
        // (2) clients enable properly when not connected/enabled when the host
        // flushes; e.g.
        //   (a) a template is runtime stamped and not yet connected/enabled
        //   (b) a host sets a property, causing stamped dom to flush
        //   (c) the stamped dom enables.

      }, {
        key: '__enableOrFlushClients',
        value: function __enableOrFlushClients() {
          var clients = this.__dataPendingClients;
          if (clients) {
            this.__dataPendingClients = null;
            for (var i = 0; i < clients.length; i++) {
              var client = clients[i];
              if (!client.__dataEnabled) {
                client._enableProperties();
              } else if (client.__dataPending) {
                client._flushProperties();
              }
            }
          }
        }

        /**
         * Perform any initial setup on client dom. Called before the first
         * `_flushProperties` call on client dom and before any element
         * observers are called.
         *
         * @protected
         */

      }, {
        key: '_readyClients',
        value: function _readyClients() {
          this.__enableOrFlushClients();
        }

        /**
         * Sets a bag of property changes to this instance, and
         * synchronously processes all effects of the properties as a batch.
         *
         * Property names must be simple properties, not paths.  Batched
         * path propagation is not supported.
         *
         * @param {Object} props Bag of one or more key-value pairs whose key is
         *   a property and value is the new value to set for that property.
         * @param {boolean=} setReadOnly When true, any private values set in
         *   `props` will be set. By default, `setProperties` will not set
         *   `readOnly: true` root properties.
         * @public
         */

      }, {
        key: 'setProperties',
        value: function setProperties(props, setReadOnly) {
          for (var path in props) {
            if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
              //TODO(kschaaf): explicitly disallow paths in setProperty?
              // wildcard observers currently only pass the first changed path
              // in the `info` object, and you could do some odd things batching
              // paths, e.g. {'foo.bar': {...}, 'foo': null}
              this._setPendingPropertyOrPath(path, props[path], true);
            }
          }
          this._invalidateProperties();
        }

        /**
         * Overrides `PropertyAccessors` so that property accessor
         * side effects are not enabled until after client dom is fully ready.
         * Also calls `_flushClients` callback to ensure client dom is enabled
         * that was not enabled as a result of flushing properties.
         *
         * @override
         */

      }, {
        key: 'ready',
        value: function ready() {
          // It is important that `super.ready()` is not called here as it
          // immediately turns on accessors. Instead, we wait until `readyClients`
          // to enable accessors to provide a guarantee that clients are ready
          // before processing any accessors side effects.
          this._flushProperties();
          // If no data was pending, `_flushProperties` will not `flushClients`
          // so ensure this is done.
          if (!this.__dataClientsReady) {
            this._flushClients();
          }
          // Before ready, client notifications do not trigger _flushProperties.
          // Therefore a flush is necessary here if data has been set.
          if (this.__dataPending) {
            this._flushProperties();
          }
        }

        /**
         * Implements `PropertyAccessors`'s properties changed callback.
         *
         * Runs each class of effects for the batch of changed properties in
         * a specific order (compute, propagate, reflect, observe, notify).
         *
         * @override
         */

      }, {
        key: '_propertiesChanged',
        value: function _propertiesChanged(currentProps, changedProps, oldProps) {
          // ----------------------------
          // let c = Object.getOwnPropertyNames(changedProps || {});
          // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
          // if (window.debug) { debugger; }
          // ----------------------------
          var hasPaths = this.__dataHasPaths;
          this.__dataHasPaths = false;
          // Compute properties
          runComputedEffects(this, changedProps, oldProps, hasPaths);
          // Clear notify properties prior to possible reentry (propagate, observe),
          // but after computing effects have a chance to add to them
          var notifyProps = this.__dataToNotify;
          this.__dataToNotify = null;
          // Propagate properties to clients
          this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
          // Flush clients
          this._flushClients();
          // Reflect properties
          runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
          // Observe properties
          runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
          // Notify properties to host
          if (notifyProps) {
            runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
          }
          // Clear temporary cache at end of turn
          if (this.__dataCounter == 1) {
            this.__dataTemp = {};
          }
          // ----------------------------
          // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
          // ----------------------------
        }

        /**
         * Called to propagate any property changes to stamped template nodes
         * managed by this element.
         *
         * @param {Object} changedProps Bag of changed properties
         * @param {Object} oldProps Bag of previous values for changed properties
         * @param {boolean} hasPaths True with `props` contains one or more paths
         * @protected
         */

      }, {
        key: '_propagatePropertyChanges',
        value: function _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
          if (this[TYPES.PROPAGATE]) {
            runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
          }
          var templateInfo = this.__templateInfo;
          while (templateInfo) {
            runEffects(this, templateInfo.propertyEffects, changedProps, oldProps, hasPaths, templateInfo.nodeList);
            templateInfo = templateInfo.nextTemplateInfo;
          }
        }

        /**
         * Aliases one data path as another, such that path notifications from one
         * are routed to the other.
         *
         * @param {string | !Array<string|number>} to Target path to link.
         * @param {string | !Array<string|number>} from Source path to link.
         * @public
         */

      }, {
        key: 'linkPaths',
        value: function linkPaths(to, from) {
          to = Polymer.Path.normalize(to);
          from = Polymer.Path.normalize(from);
          this.__dataLinkedPaths = this.__dataLinkedPaths || {};
          this.__dataLinkedPaths[to] = from;
        }

        /**
         * Removes a data path alias previously established with `_linkPaths`.
         *
         * Note, the path to unlink should be the target (`to`) used when
         * linking the paths.
         *
         * @param {string | !Array<string|number>} path Target path to unlink.
         * @public
         */

      }, {
        key: 'unlinkPaths',
        value: function unlinkPaths(path) {
          path = Polymer.Path.normalize(path);
          if (this.__dataLinkedPaths) {
            delete this.__dataLinkedPaths[path];
          }
        }

        /**
         * Notify that an array has changed.
         *
         * Example:
         *
         *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
         *     ...
         *     this.items.splice(1, 1, {name: 'Sam'});
         *     this.items.push({name: 'Bob'});
         *     this.notifySplices('items', [
         *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, obect: this.items, type: 'splice' },
         *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
         *     ]);
         *
         * @param {string} path Path that should be notified.
         * @param {Array} splices Array of splice records indicating ordered
         *   changes that occurred to the array. Each record should have the
         *   following fields:
         *    * index: index at which the change occurred
         *    * removed: array of items that were removed from this index
         *    * addedCount: number of new items added at this index
         *    * object: a reference to the array in question
         *    * type: the string literal 'splice'
         *
         *   Note that splice records _must_ be normalized such that they are
         *   reported in index order (raw results from `Object.observe` are not
         *   ordered and must be normalized/merged before notifying).
         * @public
        */

      }, {
        key: 'notifySplices',
        value: function notifySplices(path, splices) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);
          _notifySplices(this, array, info.path, splices);
        }

        /**
         * Convenience method for reading a value from a path.
         *
         * Note, if any part in the path is undefined, this method returns
         * `undefined` (this method does not throw when dereferencing undefined
         * paths).
         *
         * @param {(string|!Array<(string|number)>)} path Path to the value
         *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
         *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
         *   bracketed expressions are not supported; string-based path parts
         *   *must* be separated by dots.  Note that when dereferencing array
         *   indices, the index may be used as a dotted part directly
         *   (e.g. `users.12.name` or `['users', 12, 'name']`).
         * @param {Object=} root Root object from which the path is evaluated.
         * @return {*} Value at the path, or `undefined` if any part of the path
         *   is undefined.
         * @public
         */

      }, {
        key: 'get',
        value: function get(path, root) {
          return Polymer.Path.get(root || this, path);
        }

        /**
         * Convenience method for setting a value to a path and notifying any
         * elements bound to the same path.
         *
         * Note, if any part in the path except for the last is undefined,
         * this method does nothing (this method does not throw when
         * dereferencing undefined paths).
         *
         * @param {(string|!Array<(string|number)>)} path Path to the value
         *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
         *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
         *   bracketed expressions are not supported; string-based path parts
         *   *must* be separated by dots.  Note that when dereferencing array
         *   indices, the index may be used as a dotted part directly
         *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
         * @param {*} value Value to set at the specified path.
         * @param {Object=} root Root object from which the path is evaluated.
         *   When specified, no notification will occur.
         * @public
        */

      }, {
        key: 'set',
        value: function set(path, value, root) {
          if (root) {
            Polymer.Path.set(root, path, value);
          } else {
            if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */path]) {
              if (this._setPendingPropertyOrPath(path, value, true)) {
                this._invalidateProperties();
              }
            }
          }
        }

        /**
         * Adds items onto the end of the array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.push`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @param {...*} items Items to push onto array
         * @return {number} New length of the array.
         * @public
         */

      }, {
        key: 'push',
        value: function push(path) {
          var info = { path: '' };
          var array = /** @type {Array}*/Polymer.Path.get(this, path, info);
          var len = array.length;

          for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            items[_key - 1] = arguments[_key];
          }

          var ret = array.push.apply(array, items);
          if (items.length) {
            notifySplice(this, array, info.path, len, items.length, []);
          }
          return ret;
        }

        /**
         * Removes an item from the end of array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.pop`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @return {*} Item that was removed.
         * @public
         */

      }, {
        key: 'pop',
        value: function pop(path) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);
          var hadLength = Boolean(array.length);
          var ret = array.pop();
          if (hadLength) {
            notifySplice(this, array, info.path, array.length, 0, [ret]);
          }
          return ret;
        }

        /**
         * Starting from the start index specified, removes 0 or more items
         * from the array and inserts 0 or more new items in their place.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.splice`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @param {number} start Index from which to start removing/inserting.
         * @param {number} deleteCount Number of items to remove.
         * @param {...*} items Items to insert into array.
         * @return {Array} Array of removed items.
         * @public
         */

      }, {
        key: 'splice',
        value: function splice(path, start, deleteCount) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);
          // Normalize fancy native splice handling of crazy start values
          if (start < 0) {
            start = array.length - Math.floor(-start);
          } else {
            start = Math.floor(start);
          }
          if (!start) {
            start = 0;
          }

          for (var _len2 = arguments.length, items = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
            items[_key2 - 3] = arguments[_key2];
          }

          var ret = array.splice.apply(array, [start, deleteCount].concat(items));
          if (items.length || ret.length) {
            notifySplice(this, array, info.path, start, items.length, ret);
          }
          return ret;
        }

        /**
         * Removes an item from the beginning of array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.pop`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @return {*} Item that was removed.
         * @public
         */

      }, {
        key: 'shift',
        value: function shift(path) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);
          var hadLength = Boolean(array.length);
          var ret = array.shift();
          if (hadLength) {
            notifySplice(this, array, info.path, 0, 0, [ret]);
          }
          return ret;
        }

        /**
         * Adds items onto the beginning of the array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.push`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @param {...*} items Items to insert info array
         * @return {number} New length of the array.
         * @public
         */

      }, {
        key: 'unshift',
        value: function unshift(path) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);

          for (var _len3 = arguments.length, items = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            items[_key3 - 1] = arguments[_key3];
          }

          var ret = array.unshift.apply(array, items);
          if (items.length) {
            notifySplice(this, array, info.path, 0, items.length, []);
          }
          return ret;
        }

        /**
         * Notify that a path has changed.
         *
         * Example:
         *
         *     this.item.user.name = 'Bob';
         *     this.notifyPath('item.user.name');
         *
         * @param {string} path Path that should be notified.
         * @param {*=} value Value at the path (optional).
         * @public
        */

      }, {
        key: 'notifyPath',
        value: function notifyPath(path, value) {
          /** @type {string} */
          var propPath = void 0;
          if (arguments.length == 1) {
            // Get value if not supplied
            var info = { path: '' };
            value = Polymer.Path.get(this, path, info);
            propPath = info.path;
          } else if (Array.isArray(path)) {
            // Normalize path if needed
            propPath = Polymer.Path.normalize(path);
          } else {
            propPath = /** @type{string} */path;
          }
          if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
            this._invalidateProperties();
          }
        }

        /**
         * Equivalent to static `createReadOnlyProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property name
         * @param {boolean=} protectedSetter Creates a custom protected setter
         *   when `true`.
         * @protected
         */

      }, {
        key: '_createReadOnlyProperty',
        value: function _createReadOnlyProperty(property, protectedSetter) {
          this._addPropertyEffect(property, TYPES.READ_ONLY);
          if (protectedSetter) {
            this['_set' + upper(property)] = /** @this {PropertyEffects} */function (value) {
              this._setProperty(property, value);
            };
          }
        }

        /**
         * Equivalent to static `createPropertyObserver` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property name
         * @param {string} methodName Name of observer method to call
         * @param {boolean=} dynamicFn Whether the method name should be included as
         *   a dependency to the effect.
         * @protected
         */

      }, {
        key: '_createPropertyObserver',
        value: function _createPropertyObserver(property, methodName, dynamicFn) {
          var info = { property: property, methodName: methodName, dynamicFn: Boolean(dynamicFn) };
          this._addPropertyEffect(property, TYPES.OBSERVE, {
            fn: runObserverEffect, info: info, trigger: { name: property }
          });
          if (dynamicFn) {
            this._addPropertyEffect(methodName, TYPES.OBSERVE, {
              fn: runObserverEffect, info: info, trigger: { name: methodName }
            });
          }
        }

        /**
         * Equivalent to static `createMethodObserver` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating
         *   whether method names should be included as a dependency to the effect.
         * @protected
         */

      }, {
        key: '_createMethodObserver',
        value: function _createMethodObserver(expression, dynamicFn) {
          var sig = parseMethod(expression);
          if (!sig) {
            throw new Error("Malformed observer expression '" + expression + "'");
          }
          createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
        }

        /**
         * Equivalent to static `createNotifyingProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property name
         * @protected
         */

      }, {
        key: '_createNotifyingProperty',
        value: function _createNotifyingProperty(property) {
          this._addPropertyEffect(property, TYPES.NOTIFY, {
            fn: runNotifyEffect,
            info: {
              eventName: CaseMap.camelToDashCase(property) + '-changed',
              property: property
            }
          });
        }

        /**
         * Equivalent to static `createReflectedProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property name
         * @protected
         */

      }, {
        key: '_createReflectedProperty',
        value: function _createReflectedProperty(property) {
          var attr = CaseMap.camelToDashCase(property);
          if (attr[0] === '-') {
            console.warn('Property ' + property + ' cannot be reflected to attribute ' + attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property thisead.');
          } else {
            this._addPropertyEffect(property, TYPES.REFLECT, {
              fn: runReflectEffect,
              info: {
                attrName: attr
              }
            });
          }
        }

        /**
         * Equivalent to static `createComputedProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Name of computed property to set
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating
         *   whether method names should be included as a dependency to the effect.
         * @protected
         */

      }, {
        key: '_createComputedProperty',
        value: function _createComputedProperty(property, expression, dynamicFn) {
          var sig = parseMethod(expression);
          if (!sig) {
            throw new Error("Malformed computed expression '" + expression + "'");
          }
          createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
        }

        // -- static class methods ------------

        /**
         * Ensures an accessor exists for the specified property, and adds
         * to a list of "property effects" that will run when the accessor for
         * the specified property is set.  Effects are grouped by "type", which
         * roughly corresponds to a phase in effect processing.  The effect
         * metadata should be in the following form:
         *
         *   {
         *     fn: effectFunction, // Reference to function to call to perform effect
         *     info: { ... }       // Effect metadata passed to function
         *     trigger: {          // Optional triggering metadata; if not provided
         *       name: string      // the property is treated as a wildcard
         *       structured: boolean
         *       wildcard: boolean
         *     }
         *   }
         *
         * Effects are called from `_propertiesChanged` in the following order by
         * type:
         *
         * 1. COMPUTE
         * 2. PROPAGATE
         * 3. REFLECT
         * 4. OBSERVE
         * 5. NOTIFY
         *
         * Effect functions are called with the following signature:
         *
         *   effectFunction(inst, path, props, oldProps, info, hasPaths)
         *
         * @param {string} property Property that should trigger the effect
         * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @param {Object=} effect Effect metadata object
         * @protected
         */

      }, {
        key: '_bindTemplate',


        // -- binding ----------------------------------------------

        /**
         * Equivalent to static `bindTemplate` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * This method may be called on the prototype (for prototypical template
         * binding, to avoid creating accessors every instance) once per prototype,
         * and will be called with `runtimeBinding: true` by `_stampTemplate` to
         * create and link an instance of the template metadata associated with a
         * particular stamping.
         *
         * @param {HTMLTemplateElement} template Template containing binding
         *   bindings
         * @param {boolean=} instanceBinding When false (default), performs
         *   "prototypical" binding of the template and overwrites any previously
         *   bound template for the class. When true (as passed from
         *   `_stampTemplate`), the template info is instanced and linked into
         *   the list of bound templates.
         * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
         *   this is an instance of the prototypical template info
         * @protected
         */
        value: function _bindTemplate(template, instanceBinding) {
          var templateInfo = this.constructor._parseTemplate(template);
          var wasPreBound = this.__templateInfo == templateInfo;
          // Optimization: since this is called twice for proto-bound templates,
          // don't attempt to recreate accessors if this template was pre-bound
          if (!wasPreBound) {
            for (var prop in templateInfo.propertyEffects) {
              this._createPropertyAccessor(prop);
            }
          }
          if (instanceBinding) {
            // For instance-time binding, create instance of template metadata
            // and link into list of templates if necessary
            templateInfo = /** @type {!TemplateInfo} */Object.create(templateInfo);
            templateInfo.wasPreBound = wasPreBound;
            if (!wasPreBound && this.__templateInfo) {
              var last = this.__templateInfoLast || this.__templateInfo;
              this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
              templateInfo.previousTemplateInfo = last;
              return templateInfo;
            }
          }
          return this.__templateInfo = templateInfo;
        }

        /**
         * Adds a property effect to the given template metadata, which is run
         * at the "propagate" stage of `_propertiesChanged` when the template
         * has been bound to the element via `_bindTemplate`.
         *
         * The `effect` object should match the format in `_addPropertyEffect`.
         *
         * @param {Object} templateInfo Template metadata to add effect to
         * @param {string} prop Property that should trigger the effect
         * @param {Object=} effect Effect metadata object
         * @protected
         */

      }, {
        key: '_stampTemplate',


        /**
         * Stamps the provided template and performs instance-time setup for
         * Polymer template features, including data bindings, declarative event
         * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
         * is returned containing the stamped DOM, ready for insertion into the
         * DOM.
         *
         * This method may be called more than once; however note that due to
         * `shadycss` polyfill limitations, only styles from templates prepared
         * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
         * to the shadow root and support CSS custom properties), and note that
         * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
         * any styles required by in runtime-stamped templates must be included
         * in the main element template.
         *
         * @param {!HTMLTemplateElement} template Template to stamp
         * @return {!StampedTemplate} Cloned template content
         * @override
         * @protected
         */
        value: function _stampTemplate(template) {
          // Ensures that created dom is `_enqueueClient`'d to this element so
          // that it can be flushed on next call to `_flushProperties`
          hostStack.beginHosting(this);
          var dom = _get(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_stampTemplate', this).call(this, template);
          hostStack.endHosting(this);
          var templateInfo = /** @type {!TemplateInfo} */this._bindTemplate(template, true);
          // Add template-instance-specific data to instanced templateInfo
          templateInfo.nodeList = dom.nodeList;
          // Capture child nodes to allow unstamping of non-prototypical templates
          if (!templateInfo.wasPreBound) {
            var nodes = templateInfo.childNodes = [];
            for (var n = dom.firstChild; n; n = n.nextSibling) {
              nodes.push(n);
            }
          }
          dom.templateInfo = templateInfo;
          // Setup compound storage, 2-way listeners, and dataHost for bindings
          setupBindings(this, templateInfo);
          // Flush properties into template nodes if already booted
          if (this.__dataReady) {
            runEffects(this, templateInfo.propertyEffects, this.__data, null, false, templateInfo.nodeList);
          }
          return dom;
        }

        /**
         * Removes and unbinds the nodes previously contained in the provided
         * DocumentFragment returned from `_stampTemplate`.
         *
         * @param {!StampedTemplate} dom DocumentFragment previously returned
         *   from `_stampTemplate` associated with the nodes to be removed
         * @protected
         */

      }, {
        key: '_removeBoundDom',
        value: function _removeBoundDom(dom) {
          // Unlink template info
          var templateInfo = dom.templateInfo;
          if (templateInfo.previousTemplateInfo) {
            templateInfo.previousTemplateInfo.nextTemplateInfo = templateInfo.nextTemplateInfo;
          }
          if (templateInfo.nextTemplateInfo) {
            templateInfo.nextTemplateInfo.previousTemplateInfo = templateInfo.previousTemplateInfo;
          }
          if (this.__templateInfoLast == templateInfo) {
            this.__templateInfoLast = templateInfo.previousTemplateInfo;
          }
          templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
          // Remove stamped nodes
          var nodes = templateInfo.childNodes;
          for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            node.parentNode.removeChild(node);
          }
        }

        /**
         * Overrides default `TemplateStamp` implementation to add support for
         * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
         * array is added to `nodeInfo` and populated with binding metadata
         * with information capturing the binding target, and a `parts` array
         * with one or more metadata objects capturing the source(s) of the
         * binding.
         *
         * @override
         * @param {Node} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template node
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         */

      }, {
        key: 'PROPERTY_EFFECT_TYPES',
        get: function get() {
          return TYPES;
        }
      }], [{
        key: 'addPropertyEffect',
        value: function addPropertyEffect(property, type, effect) {
          this.prototype._addPropertyEffect(property, type, effect);
        }

        /**
         * Creates a single-property observer for the given property.
         *
         * @param {string} property Property name
         * @param {string} methodName Name of observer method to call
         * @param {boolean=} dynamicFn Whether the method name should be included as
         *   a dependency to the effect.
         * @protected
         */

      }, {
        key: 'createPropertyObserver',
        value: function createPropertyObserver(property, methodName, dynamicFn) {
          this.prototype._createPropertyObserver(property, methodName, dynamicFn);
        }

        /**
         * Creates a multi-property "method observer" based on the provided
         * expression, which should be a string in the form of a normal Javascript
         * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
         * should correspond to a property or path in the context of this
         * prototype (or instance), or may be a literal string or number.
         *
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating
         *   whether method names should be included as a dependency to the effect.
         * @protected
         */

      }, {
        key: 'createMethodObserver',
        value: function createMethodObserver(expression, dynamicFn) {
          this.prototype._createMethodObserver(expression, dynamicFn);
        }

        /**
         * Causes the setter for the given property to dispatch `<property>-changed`
         * events to notify of changes to the property.
         *
         * @param {string} property Property name
         * @protected
         */

      }, {
        key: 'createNotifyingProperty',
        value: function createNotifyingProperty(property) {
          this.prototype._createNotifyingProperty(property);
        }

        /**
         * Creates a read-only accessor for the given property.
         *
         * To set the property, use the protected `_setProperty` API.
         * To create a custom protected setter (e.g. `_setMyProp()` for
         * property `myProp`), pass `true` for `protectedSetter`.
         *
         * Note, if the property will have other property effects, this method
         * should be called first, before adding other effects.
         *
         * @param {string} property Property name
         * @param {boolean=} protectedSetter Creates a custom protected setter
         *   when `true`.
         * @protected
         */

      }, {
        key: 'createReadOnlyProperty',
        value: function createReadOnlyProperty(property, protectedSetter) {
          this.prototype._createReadOnlyProperty(property, protectedSetter);
        }

        /**
         * Causes the setter for the given property to reflect the property value
         * to a (dash-cased) attribute of the same name.
         *
         * @param {string} property Property name
         * @protected
         */

      }, {
        key: 'createReflectedProperty',
        value: function createReflectedProperty(property) {
          this.prototype._createReflectedProperty(property);
        }

        /**
         * Creates a computed property whose value is set to the result of the
         * method described by the given `expression` each time one or more
         * arguments to the method changes.  The expression should be a string
         * in the form of a normal Javascript function signature:
         * `'methodName(arg1, [..., argn])'`
         *
         * @param {string} property Name of computed property to set
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
         *   method names should be included as a dependency to the effect.
         * @protected
         */

      }, {
        key: 'createComputedProperty',
        value: function createComputedProperty(property, expression, dynamicFn) {
          this.prototype._createComputedProperty(property, expression, dynamicFn);
        }

        /**
         * Parses the provided template to ensure binding effects are created
         * for them, and then ensures property accessors are created for any
         * dependent properties in the template.  Binding effects for bound
         * templates are stored in a linked list on the instance so that
         * templates can be efficiently stamped and unstamped.
         *
         * @param {HTMLTemplateElement} template Template containing binding
         *   bindings
         * @return {Object} Template metadata object
         * @protected
         */

      }, {
        key: 'bindTemplate',
        value: function bindTemplate(template) {
          return this.prototype._bindTemplate(template);
        }
      }, {
        key: '_addTemplatePropertyEffect',
        value: function _addTemplatePropertyEffect(templateInfo, prop, effect) {
          var hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
          hostProps[prop] = true;
          var effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
          var propEffects = effects[prop] = effects[prop] || [];
          propEffects.push(effect);
        }
      }, {
        key: '_parseTemplateNode',
        value: function _parseTemplateNode(node, templateInfo, nodeInfo) {
          var noted = _get(PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects), '_parseTemplateNode', this).call(this, node, templateInfo, nodeInfo);
          if (node.nodeType === Node.TEXT_NODE) {
            var parts = this._parseBindings(node.textContent, templateInfo);
            if (parts) {
              // Initialize the textContent with any literal parts
              // NOTE: default to a space here so the textNode remains; some browsers
              // (IE) evacipate an empty textNode following cloneNode/importNode.
              node.textContent = literalFromParts(parts) || ' ';
              addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
              noted = true;
            }
          }
          return noted;
        }

        /**
         * Overrides default `TemplateStamp` implementation to add support for
         * parsing bindings from attributes.  A `bindings`
         * array is added to `nodeInfo` and populated with binding metadata
         * with information capturing the binding target, and a `parts` array
         * with one or more metadata objects capturing the source(s) of the
         * binding.
         *
         * @override
         * @param {Element} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template node
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         */

      }, {
        key: '_parseTemplateNodeAttribute',
        value: function _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
          var parts = this._parseBindings(value, templateInfo);
          if (parts) {
            // Attribute or property
            var origName = name;
            var kind = 'property';
            if (name[name.length - 1] == '$') {
              name = name.slice(0, -1);
              kind = 'attribute';
            }
            // Initialize attribute bindings with any literal parts
            var literal = literalFromParts(parts);
            if (literal && kind == 'attribute') {
              node.setAttribute(name, literal);
            }
            // Clear attribute before removing, since IE won't allow removing
            // `value` attribute if it previously had a value (can't
            // unconditionally set '' before removing since attributes with `$`
            // can't be set using setAttribute)
            if (node.localName === 'input' && origName === 'value') {
              node.setAttribute(origName, '');
            }
            // Remove annotation
            node.removeAttribute(origName);
            // Case hackery: attributes are lower-case, but bind targets
            // (properties) are case sensitive. Gambit is to map dash-case to
            // camel-case: `foo-bar` becomes `fooBar`.
            // Attribute bindings are excepted.
            if (kind === 'property') {
              name = Polymer.CaseMap.dashToCamelCase(name);
            }
            addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
            return true;
          } else {
            return _get(PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects), '_parseTemplateNodeAttribute', this).call(this, node, templateInfo, nodeInfo, name, value);
          }
        }

        /**
         * Overrides default `TemplateStamp` implementation to add support for
         * binding the properties that a nested template depends on to the template
         * as `_host_<property>`.
         *
         * @override
         * @param {Node} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template node
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         */

      }, {
        key: '_parseTemplateNestedTemplate',
        value: function _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
          var noted = _get(PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects), '_parseTemplateNestedTemplate', this).call(this, node, templateInfo, nodeInfo);
          // Merge host props into outer template and add bindings
          var hostProps = nodeInfo.templateInfo.hostProps;
          var mode = '{';
          for (var source in hostProps) {
            var parts = [{ mode: mode, source: source, dependencies: [source] }];
            addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
          }
          return noted;
        }

        /**
         * Called to parse text in a template (either attribute values or
         * textContent) into binding metadata.
         *
         * Any overrides of this method should return an array of binding part
         * metadata  representing one or more bindings found in the provided text
         * and any "literal" text in between.  Any non-literal parts will be passed
         * to `_evaluateBinding` when any dependencies change.  The only required
         * fields of each "part" in the returned array are as follows:
         *
         * - `dependencies` - Array containing trigger metadata for each property
         *   that should trigger the binding to update
         * - `literal` - String containing text if the part represents a literal;
         *   in this case no `dependencies` are needed
         *
         * Additional metadata for use by `_evaluateBinding` may be provided in
         * each part object as needed.
         *
         * The default implementation handles the following types of bindings
         * (one or more may be intermixed with literal strings):
         * - Property binding: `[[prop]]`
         * - Path binding: `[[object.prop]]`
         * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
         * - Two-way property or path bindings (supports negation):
         *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
         * - Inline computed method (supports negation):
         *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
         *
         * @param {string} text Text to parse from attribute or textContent
         * @param {Object} templateInfo Current template metadata
         * @return {Array<!BindingPart>} Array of binding part metadata
         * @protected
         */

      }, {
        key: '_parseBindings',
        value: function _parseBindings(text, templateInfo) {
          var parts = [];
          var lastIndex = 0;
          var m = void 0;
          // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
          // Regex matches:
          //        Iteration 1:  Iteration 2:
          // m[1]: '{{'          '[['
          // m[2]: ''            '!'
          // m[3]: 'prop'        'compute(foo,bar)'
          while ((m = bindingRegex.exec(text)) !== null) {
            // Add literal part
            if (m.index > lastIndex) {
              parts.push({ literal: text.slice(lastIndex, m.index) });
            }
            // Add binding part
            var mode = m[1][0];
            var negate = Boolean(m[2]);
            var source = m[3].trim();
            var customEvent = false,
                notifyEvent = '',
                colon = -1;
            if (mode == '{' && (colon = source.indexOf('::')) > 0) {
              notifyEvent = source.substring(colon + 2);
              source = source.substring(0, colon);
              customEvent = true;
            }
            var signature = parseMethod(source);
            var dependencies = [];
            if (signature) {
              // Inline computed function
              var args = signature.args,
                  methodName = signature.methodName;

              for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (!arg.literal) {
                  dependencies.push(arg);
                }
              }
              var dynamicFns = templateInfo.dynamicFns;
              if (dynamicFns && dynamicFns[methodName] || signature.static) {
                dependencies.push(methodName);
                signature.dynamicFn = true;
              }
            } else {
              // Property or path
              dependencies.push(source);
            }
            parts.push({
              source: source, mode: mode, negate: negate, customEvent: customEvent, signature: signature, dependencies: dependencies,
              event: notifyEvent
            });
            lastIndex = bindingRegex.lastIndex;
          }
          // Add a final literal part
          if (lastIndex && lastIndex < text.length) {
            var literal = text.substring(lastIndex);
            if (literal) {
              parts.push({
                literal: literal
              });
            }
          }
          if (parts.length) {
            return parts;
          } else {
            return null;
          }
        }

        /**
         * Called to evaluate a previously parsed binding part based on a set of
         * one or more changed dependencies.
         *
         * @param {this} inst Element that should be used as scope for
         *   binding dependencies
         * @param {BindingPart} part Binding part metadata
         * @param {string} path Property/path that triggered this effect
         * @param {Object} props Bag of current property changes
         * @param {Object} oldProps Bag of previous values for changed properties
         * @param {boolean} hasPaths True with `props` contains one or more paths
         * @return {*} Value the binding part evaluated to
         * @protected
         */

      }, {
        key: '_evaluateBinding',
        value: function _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
          var value = void 0;
          if (part.signature) {
            value = runMethodEffect(inst, path, props, oldProps, part.signature);
          } else if (path != part.source) {
            value = Polymer.Path.get(inst, part.source);
          } else {
            if (hasPaths && Polymer.Path.isPath(path)) {
              value = Polymer.Path.get(inst, path);
            } else {
              value = inst.__data[path];
            }
          }
          if (part.negate) {
            value = !value;
          }
          return value;
        }
      }]);

      return PropertyEffects;
    }(propertyEffectsBase);

    // make a typing for closure :P


    PropertyEffectsType = PropertyEffects;

    return PropertyEffects;
  });

  /**
   * Helper api for enqueing client dom created by a host element.
   *
   * By default elements are flushed via `_flushProperties` when
   * `connectedCallback` is called. Elements attach their client dom to
   * themselves at `ready` time which results from this first flush.
   * This provides an ordering guarantee that the client dom an element
   * creates is flushed before the element itself (i.e. client `ready`
   * fires before host `ready`).
   *
   * However, if `_flushProperties` is called *before* an element is connected,
   * as for example `Templatize` does, this ordering guarantee cannot be
   * satisfied because no elements are connected. (Note: Bound elements that
   * receive data do become enqueued clients and are properly ordered but
   * unbound elements are not.)
   *
   * To maintain the desired "client before host" ordering guarantee for this
   * case we rely on the "host stack. Client nodes registers themselves with
   * the creating host element when created. This ensures that all client dom
   * is readied in the proper order, maintaining the desired guarantee.
   *
   * @private
   */
  var hostStack = {

    stack: [],

    /**
     * @param {*} inst Instance to add to hostStack
     * @this {hostStack}
     */
    registerHost: function registerHost(inst) {
      if (this.stack.length) {
        var host = this.stack[this.stack.length - 1];
        host._enqueueClient(inst);
      }
    },


    /**
     * @param {*} inst Instance to begin hosting
     * @this {hostStack}
     */
    beginHosting: function beginHosting(inst) {
      this.stack.push(inst);
    },


    /**
     * @param {*} inst Instance to end hosting
     * @this {hostStack}
     */
    endHosting: function endHosting(inst) {
      var stackLen = this.stack.length;
      if (stackLen && this.stack[stackLen - 1] == inst) {
        this.stack.pop();
      }
    }
  };
})();

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(0);

__webpack_require__(24);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(25);

__webpack_require__(19);

__webpack_require__(27);

__webpack_require__(22);

(function () {
  'use strict';

  /**
   * Element class mixin that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * Subclassers may provide the following static getters to return metadata
   * used to configure Polymer's features for the class:
   *
   * - `static get is()`: When the template is provided via a `dom-module`,
   *   users should return the `dom-module` id from a static `is` getter.  If
   *   no template is needed or the template is provided directly via the
   *   `template` getter, there is no need to define `is` for the element.
   *
   * - `static get template()`: Users may provide the template directly (as
   *   opposed to via `dom-module`) by implementing a static `template` getter.
   *   The getter may return an `HTMLTemplateElement` or a string, which will
   *   automatically be parsed into a template.
   *
   * - `static get properties()`: Should return an object describing
   *   property-related metadata used by Polymer features (key: property name
   *   value: object containing property metadata). Valid keys in per-property
   *   metadata include:
   *   - `type` (String|Number|Object|Array|...): Used by
   *     `attributeChangedCallback` to determine how string-based attributes
   *     are deserialized to JavaScript property values.
   *   - `notify` (boolean): Causes a change in the property to fire a
   *     non-bubbling event called `<property>-changed`. Elements that have
   *     enabled two-way binding to the property use this event to observe changes.
   *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
   *     To set a read-only property, use the private setter method
   *     `_setProperty(property, value)`.
   *   - `observer` (string): Observer method name that will be called when
   *     the property changes. The arguments of the method are
   *     `(value, previousValue)`.
   *   - `computed` (string): String describing method and dependent properties
   *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
   *     Computed properties are read-only by default and can only be changed
   *     via the return value of the computing method.
   *
   * - `static get observers()`: Array of strings describing multi-property
   *   observer methods and their dependent properties (e.g.
   *   `'observeABC(a, b, c)'`).
   *
   * The base class provides default implementations for the following standard
   * custom element lifecycle callbacks; users may override these, but should
   * call the super method to ensure
   * - `constructor`: Run when the element is created or upgraded
   * - `connectedCallback`: Run each time the element is connected to the
   *   document
   * - `disconnectedCallback`: Run each time the element is disconnected from
   *   the document
   * - `attributeChangedCallback`: Run each time an attribute in
   *   `observedAttributes` is set or removed (note: this element's default
   *   `observedAttributes` implementation will automatically return an array
   *   of dash-cased attributes based on `properties`)
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.PropertyEffects
   * @memberof Polymer
   * @property rootPath {string} Set to the value of `Polymer.rootPath`,
   *   which defaults to the main document path
   * @property importPath {string} Set to the value of the class's static
   *   `importPath` property, which defaults to the path of this element's
   *   `dom-module` (when `is` is used), but can be overridden for other
   *   import strategies.
   * @summary Element class mixin that provides the core API for Polymer's
   * meta-programming features.
   */

  Polymer.ElementMixin = Polymer.dedupingMixin(function (base) {

    /**
     * @constructor
     * @extends {base}
     * @implements {Polymer_PropertyEffects}
     */
    var polymerElementBase = Polymer.PropertyEffects(base);

    var caseMap = Polymer.CaseMap;

    /**
     * Returns the `properties` object specifically on `klass`. Use for:
     * (1) super chain mixes togther to make `propertiesForClass` which is
     * then used to make `observedAttributes`.
     * (2) properties effects and observers are created from it at `finalize` time.
     *
     * @param {HTMLElement} klass Element class
     * @return {Object} Object containing own properties for this class
     * @private
     */
    function ownPropertiesForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', klass))) {
        klass.__ownProperties = klass.hasOwnProperty(JSCompiler_renameProperty('properties', klass)) ?
        /** @type PolymerElementConstructor */klass.properties : {};
      }
      return klass.__ownProperties;
    }

    /**
     * Returns the `observers` array specifically on `klass`. Use for
     * setting up observers.
     *
     * @param {HTMLElement} klass Element class
     * @return {Array} Array containing own observers for this class
     * @private
     */
    function ownObserversForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__ownObservers', klass))) {
        klass.__ownObservers = klass.hasOwnProperty(JSCompiler_renameProperty('observers', klass)) ?
        /** @type PolymerElementConstructor */klass.observers : [];
      }
      return klass.__ownObservers;
    }

    /**
     * Mixes `props` into `flattenedProps` but upgrades shorthand type
     * syntax to { type: Type}.
     *
     * @param {Object} flattenedProps Bag to collect flattened properties into
     * @param {Object} props Bag of properties to add to `flattenedProps`
     * @return {Object} The input `flattenedProps` bag
     * @private
     */
    function flattenProperties(flattenedProps, props) {
      for (var p in props) {
        var o = props[p];
        if (typeof o == 'function') {
          o = { type: o };
        }
        flattenedProps[p] = o;
      }
      return flattenedProps;
    }

    /**
     * Returns a flattened list of properties mixed together from the chain of all
     * constructor's `config.properties`. This list is used to create
     * (1) observedAttributes,
     * (2) class property default values
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     * @suppress {missingProperties} class.prototype is not a property for some reason?
     * @private
     */
    function propertiesForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__classProperties', klass))) {
        klass.__classProperties = flattenProperties({}, ownPropertiesForClass(klass));
        var superCtor = Object.getPrototypeOf(klass.prototype).constructor;
        if (superCtor.prototype instanceof PolymerElement) {
          klass.__classProperties = Object.assign(Object.create(propertiesForClass( /** @type PolymerElementConstructor */superCtor)), klass.__classProperties);
        }
      }
      return klass.__classProperties;
    }

    /**
     * Returns a list of properties with default values.
     * This list is created as an optimization since it is a subset of
     * the list returned from `propertiesForClass`.
     * This list is used in `_initializeProperties` to set property defaults.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     *   that have default values
     * @private
     */
    function propertyDefaultsForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__classPropertyDefaults', klass))) {
        klass.__classPropertyDefaults = null;
        var props = propertiesForClass(klass);
        for (var p in props) {
          var info = props[p];
          if ('value' in info) {
            klass.__classPropertyDefaults = klass.__classPropertyDefaults || {};
            klass.__classPropertyDefaults[p] = info;
          }
        }
      }
      return klass.__classPropertyDefaults;
    }

    /**
     * Returns true if a `klass` has finalized. Called in `ElementClass.finalize()`
     * @param {PolymerElementConstructor} klass Element class
     * @return {boolean} True if all metaprogramming for this class has been
     *   completed
     * @private
     */
    function hasClassFinalized(klass) {
      return klass.hasOwnProperty(JSCompiler_renameProperty('__finalized', klass));
    }

    /**
     * Called by `ElementClass.finalize()`. Ensures this `klass` and
     * *all superclasses* are finalized by traversing the prototype chain
     * and calling `klass.finalize()`.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClassAndSuper(klass) {
      var proto = /** @type PolymerElementConstructor */klass.prototype;
      var superCtor = Object.getPrototypeOf(proto).constructor;
      if (superCtor.prototype instanceof PolymerElement) {
        superCtor.finalize();
      }
      finalizeClass(klass);
    }

    /**
     * Configures a `klass` based on a staic `klass.config` object and
     * a `template`. This includes creating accessors and effects
     * for properties in `config` and the `template` as well as preparing the
     * `template` for stamping.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClass(klass) {
      klass.__finalized = true;
      var proto = /** @type PolymerElementConstructor */klass.prototype;
      if (klass.hasOwnProperty(JSCompiler_renameProperty('is', klass)) && klass.is) {
        Polymer.telemetry.register(proto);
      }
      var props = ownPropertiesForClass(klass);
      if (props) {
        finalizeProperties(proto, props);
      }
      var observers = ownObserversForClass(klass);
      if (observers) {
        finalizeObservers(proto, observers, props);
      }
      // note: create "working" template that is finalized at instance time
      var template = /** @type PolymerElementConstructor */klass.template;
      if (template) {
        if (typeof template === 'string') {
          var t = document.createElement('template');
          t.innerHTML = template;
          template = t;
        } else {
          template = template.cloneNode(true);
        }
        proto._template = template;
      }
    }

    /**
     * Configures a `proto` based on a `properties` object.
     * Leverages `PropertyEffects` to create property accessors and effects
     * supporting, observers, reflecting to attributes, change notification,
     * computed properties, and read only properties.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *    and effects to
     * @param {Object} properties Flattened bag of property descriptors for
     *    this class
     * @private
     */
    function finalizeProperties(proto, properties) {
      for (var p in properties) {
        createPropertyFromConfig(proto, p, properties[p], properties);
      }
    }

    /**
     * Configures a `proto` based on a `observers` array.
     * Leverages `PropertyEffects` to create observers.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {Object} observers Flattened array of observer descriptors for
     *   this class
     * @param {Object} dynamicFns Object containing keys for any properties
     *   that are functions and should trigger the effect when the function
     *   reference is changed
     * @private
     */
    function finalizeObservers(proto, observers, dynamicFns) {
      for (var i = 0; i < observers.length; i++) {
        proto._createMethodObserver(observers[i], dynamicFns);
      }
    }

    /**
     * Creates effects for a property.
     *
     * Note, once a property has been set to
     * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
     * these values may not be changed. For example, a subclass cannot
     * alter these settings. However, additional `observers` may be added
     * by subclasses.
     *
     * The info object should may contain property metadata as follows:
     *
     * * `type`: {function} type to which an attribute matching the property
     * is deserialized. Note the property is camel-cased from a dash-cased
     * attribute. For example, 'foo-bar' attribute is dersialized to a
     * property named 'fooBar'.
     *
     * * `readOnly`: {boolean} creates a readOnly property and
     * makes a private setter for the private of the form '_setFoo' for a
     * property 'foo',
     *
     * * `computed`: {string} creates a computed property. A computed property
     * also automatically is set to `readOnly: true`. The value is calculated
     * by running a method and arguments parsed from the given string. For
     * example 'compute(foo)' will compute a given property when the
     * 'foo' property changes by executing the 'compute' method. This method
     * must return the computed value.
     *
     * * `reflectToAttriute`: {boolean} If true, the property value is reflected
     * to an attribute of the same name. Note, the attribute is dash-cased
     * so a property named 'fooBar' is reflected as 'foo-bar'.
     *
     * * `notify`: {boolean} sends a non-bubbling notification event when
     * the property changes. For example, a property named 'foo' sends an
     * event named 'foo-changed' with `event.detail` set to the value of
     * the property.
     *
     * * observer: {string} name of a method that runs when the property
     * changes. The arguments of the method are (value, previousValue).
     *
     * Note: Users may want control over modifying property
     * effects via subclassing. For example, a user might want to make a
     * reflectToAttribute property not do so in a subclass. We've chosen to
     * disable this because it leads to additional complication.
     * For example, a readOnly effect generates a special setter. If a subclass
     * disables the effect, the setter would fail unexpectedly.
     * Based on feedback, we may want to try to make effects more malleable
     * and/or provide an advanced api for manipulating them.
     * Also consider adding warnings when an effect cannot be changed.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {string} name Name of the property.
     * @param {Object} info Info object from which to create property effects.
     * Supported keys:
     * @param {Object} allProps Flattened map of all properties defined in this
     *   element (including inherited properties)
     * @private
     */
    function createPropertyFromConfig(proto, name, info, allProps) {
      // computed forces readOnly...
      if (info.computed) {
        info.readOnly = true;
      }
      // Note, since all computed properties are readOnly, this prevents
      // adding additional computed property effects (which leads to a confusing
      // setup where multiple triggers for setting a property)
      // While we do have `hasComputedEffect` this is set on the property's
      // dependencies rather than itself.
      if (info.computed && !proto._hasReadOnlyEffect(name)) {
        proto._createComputedProperty(name, info.computed, allProps);
      }
      if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
        proto._createReadOnlyProperty(name, !info.computed);
      }
      if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
        proto._createReflectedProperty(name);
      }
      if (info.notify && !proto._hasNotifyEffect(name)) {
        proto._createNotifyingProperty(name);
      }
      // always add observer
      if (info.observer) {
        proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
      }
    }

    /**
     * Configures an element `proto` to function with a given `template`.
     * The element name `is` and extends `ext` must be specified for ShadyCSS
     * style scoping.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {!HTMLTemplateElement} template Template to process and bind
     * @param {string} baseURI URL against which to resolve urls in
     *   style element cssText
     * @param {string} is Tag name (or type extension name) for this element
     * @param {string=} ext For type extensions, the tag name that was extended
     * @private
     */
    function finalizeTemplate(proto, template, baseURI, is, ext) {
      // support `include="module-name"`
      var cssText = Polymer.StyleGather.cssFromTemplate(template, baseURI) + Polymer.StyleGather.cssFromModuleImports(is);
      if (cssText) {
        var style = document.createElement('style');
        style.textContent = cssText;
        template.content.insertBefore(style, template.content.firstChild);
      }
      if (window.ShadyCSS) {
        window.ShadyCSS.prepareTemplate(template, is, ext);
      }
      proto._bindTemplate(template);
    }

    /**
     * @polymer
     * @mixinClass
     * @unrestricted
     * @implements {Polymer_ElementMixin}
     */

    var PolymerElement = function (_polymerElementBase) {
      _inherits(PolymerElement, _polymerElementBase);

      function PolymerElement() {
        _classCallCheck(this, PolymerElement);

        return _possibleConstructorReturn(this, (PolymerElement.__proto__ || Object.getPrototypeOf(PolymerElement)).apply(this, arguments));
      }

      _createClass(PolymerElement, [{
        key: '_initializeProperties',


        /**
         * Overrides the default `Polymer.PropertyAccessors` to ensure class
         * metaprogramming related to property accessors and effects has
         * completed (calls `finalize`).
         *
         * It also initializes any property defaults provided via `value` in
         * `properties` metadata.
         *
         * @override
         * @suppress {invalidCasts}
         */
        value: function _initializeProperties() {
          Polymer.telemetry.instanceCount++;
          this.constructor.finalize();
          var importPath = this.constructor.importPath;
          // note: finalize template when we have access to `localName` to
          // avoid dependence on `is` for polyfilling styling.
          if (this._template && !this._template.__polymerFinalized) {
            this._template.__polymerFinalized = true;
            var baseURI = importPath ? Polymer.ResolveUrl.resolveUrl(importPath) : '';
            finalizeTemplate( /** @type {!PolymerElement} */this.__proto__, this._template, baseURI,
            /**@type {!HTMLElement}*/this.localName);
          }
          _get(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), '_initializeProperties', this).call(this);
          // set path defaults
          this.rootPath = Polymer.rootPath;
          this.importPath = importPath;
          // apply property defaults...
          var p$ = propertyDefaultsForClass(this.constructor);
          if (!p$) {
            return;
          }
          for (var p in p$) {
            var info = p$[p];
            // Don't set default value if there is already an own property, which
            // happens when a `properties` property with default but no effects had
            // a property set (e.g. bound) by its host before upgrade
            if (!this.hasOwnProperty(p)) {
              var value = typeof info.value == 'function' ? info.value.call(this) : info.value;
              // Set via `_setProperty` if there is an accessor, to enable
              // initializing readOnly property defaults
              if (this._hasAccessor(p)) {
                this._setPendingProperty(p, value, true);
              } else {
                this[p] = value;
              }
            }
          }
        }

        /**
         * Provides a default implementation of the standard Custom Elements
         * `connectedCallback`.
         *
         * The default implementation enables the property effects system and
         * flushes any pending properties, and updates shimmed CSS properties
         * when using the ShadyCSS scoping/custom properties polyfill.
         *
         * @suppress {invalidCasts}
         */

      }, {
        key: 'connectedCallback',
        value: function connectedCallback() {
          if (window.ShadyCSS && this._template) {
            window.ShadyCSS.styleElement( /** @type {!HTMLElement} */this);
          }
          this._enableProperties();
        }

        /**
         * Provides a default implementation of the standard Custom Elements
         * `disconnectedCallback`.
         */

      }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {}

        /**
         * Stamps the element template.
         *
         * @override
         */

      }, {
        key: 'ready',
        value: function ready() {
          if (this._template) {
            this.root = this._stampTemplate(this._template);
            this.$ = this.root.$;
          }
          _get(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), 'ready', this).call(this);
        }

        /**
         * Implements `PropertyEffects`'s `_readyClients` call. Attaches
         * element dom by calling `_attachDom` with the dom stamped from the
         * element's template via `_stampTemplate`. Note that this allows
         * client dom to be attached to the element prior to any observers
         * running.
         *
         * @override
         */

      }, {
        key: '_readyClients',
        value: function _readyClients() {
          if (this._template) {
            this.root = this._attachDom(this.root);
          }
          // The super._readyClients here sets the clients initialized flag.
          // We must wait to do this until after client dom is created/attached
          // so that this flag can be checked to prevent notifications fired
          // during this process from being handled before clients are ready.
          _get(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), '_readyClients', this).call(this);
        }

        /**
         * Attaches an element's stamped dom to itself. By default,
         * this method creates a `shadowRoot` and adds the dom to it.
         * However, this method may be overridden to allow an element
         * to put its dom in another location.
         *
         * @throws {Error}
         * @suppress {missingReturn}
         * @param {NodeList} dom to attach to the element.
         * @return {Node} node to which the dom has been attached.
         */

      }, {
        key: '_attachDom',
        value: function _attachDom(dom) {
          if (this.attachShadow) {
            if (dom) {
              if (!this.shadowRoot) {
                this.attachShadow({ mode: 'open' });
              }
              this.shadowRoot.appendChild(dom);
              return this.shadowRoot;
            }
            return null;
          } else {
            throw new Error('ShadowDOM not available. ' +
            // TODO(sorvell): move to compile-time conditional when supported
            'Polymer.Element can create dom as children instead of in ' + 'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
          }
        }

        /**
         * Provides a default implementation of the standard Custom Elements
         * `attributeChangedCallback`.
         *
         * By default, attributes declared in `properties` metadata are
         * deserialized using their `type` information to properties of the
         * same name.  "Dash-cased" attributes are deserialzed to "camelCase"
         * properties.
         *
         * @param {string} name Name of attribute.
         * @param {?string} old Old value of attribute.
         * @param {?string} value Current value of attribute.
         * @override
         */

      }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, old, value) {
          if (old !== value) {
            var property = caseMap.dashToCamelCase(name);
            var type = propertiesForClass(this.constructor)[property].type;
            if (!this._hasReadOnlyEffect(property)) {
              this._attributeToProperty(name, value, type);
            }
          }
        }

        /**
         * When using the ShadyCSS scoping and custom property shim, causes all
         * shimmed styles in this element (and its subtree) to be updated
         * based on current custom property values.
         *
         * The optional parameter overrides inline custom property styles with an
         * object of properties where the keys are CSS properties, and the values
         * are strings.
         *
         * Example: `this.updateStyles({'--color': 'blue'})`
         *
         * These properties are retained unless a value of `null` is set.
         *
         * @param {Object=} properties Bag of custom property key/values to
         *   apply to this element.
         * @suppress {invalidCasts}
         */

      }, {
        key: 'updateStyles',
        value: function updateStyles(properties) {
          if (window.ShadyCSS) {
            window.ShadyCSS.styleSubtree( /** @type {!HTMLElement} */this, properties);
          }
        }

        /**
         * Rewrites a given URL relative to a base URL. The base URL defaults to
         * the original location of the document containing the `dom-module` for
         * this element. This method will return the same URL before and after
         * bundling.
         *
         * @param {string} url URL to resolve.
         * @param {string=} base Optional base URL to resolve against, defaults
         * to the element's `importPath`
         * @return {string} Rewritten URL relative to base
         */

      }, {
        key: 'resolveUrl',
        value: function resolveUrl(url, base) {
          if (!base && this.importPath) {
            base = Polymer.ResolveUrl.resolveUrl(this.importPath);
          }
          return Polymer.ResolveUrl.resolveUrl(url, base);
        }

        /**
         * Overrides `PropertyAccessors` to add map of dynamic functions on
         * template info, for consumption by `PropertyEffects` template binding
         * code. This map determines which method templates should have accessors
         * created for them.
         *
         * @override
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         */

      }], [{
        key: 'finalize',


        /**
         * Called automatically when the first element instance is created to
         * ensure that class finalization work has been completed.
         * May be called by users to eagerly perform class finalization work
         * prior to the creation of the first element instance.
         *
         * Class finalization work generally includes meta-programming such as
         * creating property accessors and any property effect metadata needed for
         * the features used.
         *
         * @public
         */
        value: function finalize() {
          if (!hasClassFinalized(this)) {
            finalizeClassAndSuper(this);
          }
        }

        /**
         * Returns the template that will be stamped into this element's shadow root.
         *
         * If a `static get is()` getter is defined, the default implementation
         * will return the first `<template>` in a `dom-module` whose `id`
         * matches this element's `is`.
         *
         * Users may override this getter to return an arbitrary template
         * (in which case the `is` getter is unnecessary). The template returned
         * may be either an `HTMLTemplateElement` or a string that will be
         * automatically parsed into a template.
         *
         * Note that when subclassing, if the super class overrode the default
         * implementation and the subclass would like to provide an alternate
         * template via a `dom-module`, it should override this getter and
         * return `Polymer.DomModule.import(this.is, 'template')`.
         *
         * If a subclass would like to modify the super class template, it should
         * clone it rather than modify it in place.  If the getter does expensive
         * work such as cloning/modifying a template, it should memoize the
         * template for maximum performance:
         *
         *   let memoizedTemplate;
         *   class MySubClass extends MySuperClass {
         *     static get template() {
         *       if (!memoizedTemplate) {
         *         memoizedTemplate = super.template.cloneNode(true);
         *         let subContent = document.createElement('div');
         *         subContent.textContent = 'This came from MySubClass';
         *         memoizedTemplate.content.appendChild(subContent);
         *       }
         *       return memoizedTemplate;
         *     }
         *   }
         *
         * @return {HTMLTemplateElement|string} Template to be stamped
         */

      }, {
        key: '_parseTemplateContent',
        value: function _parseTemplateContent(template, templateInfo, nodeInfo) {
          templateInfo.dynamicFns = templateInfo.dynamicFns || propertiesForClass(this);
          return _get(PolymerElement.__proto__ || Object.getPrototypeOf(PolymerElement), '_parseTemplateContent', this).call(this, template, templateInfo, nodeInfo);
        }
      }, {
        key: 'observedAttributes',


        /**
         * Standard Custom Elements V1 API.  The default implementation returns
         * a list of dash-cased attributes based on a flattening of all properties
         * declared in `static get properties()` for this element and any
         * superclasses.
         *
         * @return {Array} Observed attribute list
         */
        get: function get() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
            var list = [];
            var properties = propertiesForClass(this);
            for (var prop in properties) {
              list.push(Polymer.CaseMap.camelToDashCase(prop));
            }
            this.__observedAttributes = list;
          }
          return this.__observedAttributes;
        }
      }, {
        key: 'template',
        get: function get() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
            this._template = Polymer.DomModule && Polymer.DomModule.import(
            /** @type PolymerElementConstructor*/this.is, 'template') ||
            // note: implemented so a subclass can retrieve the super
            // template; call the super impl this way so that `this` points
            // to the superclass.
            Object.getPrototypeOf( /** @type PolymerElementConstructor*/this.prototype).constructor.template;
          }
          return this._template;
        }

        /**
         * Path matching the url from which the element was imported.
         * This path is used to resolve url's in template style cssText.
         * The `importPath` property is also set on element instances and can be
         * used to create bindings relative to the import path.
         * Defaults to the path matching the url containing a `dom-module` element
         * matching this element's static `is` property.
         * Note, this path should contain a trailing `/`.
         *
         * @return {string} The import path for this element class
         */

      }, {
        key: 'importPath',
        get: function get() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
            var module = Polymer.DomModule && Polymer.DomModule.import( /** @type PolymerElementConstructor */this.is);
            this._importPath = module ? module.assetpath : '' || Object.getPrototypeOf( /** @type PolymerElementConstructor*/this.prototype).constructor.importPath;
          }
          return this._importPath;
        }
      }]);

      return PolymerElement;
    }(polymerElementBase);

    return PolymerElement;
  });

  /**
   * Provides basic tracking of element definitions (registrations) and
   * instance counts.
   *
   * @namespace
   * @summary Provides basic tracking of element definitions (registrations) and
   * instance counts.
   */
  Polymer.telemetry = {
    /**
     * Total number of Polymer element instances created.
     * @type {number}
     */
    instanceCount: 0,
    /**
     * Array of Polymer element classes that have been finalized.
     * @type {Array<Polymer.Element>}
     */
    registrations: [],
    /**
     * @param {!PolymerElementConstructor} prototype Element prototype to log
     * @this {this}
     * @private
     */
    _regLog: function _regLog(prototype) {
      console.log('[' + prototype.is + ']: registered');
    },
    /**
     * Registers a class prototype for telemetry purposes.
     * @param {HTMLElement} prototype Element prototype to register
     * @this {this}
     * @protected
     */
    register: function register(prototype) {
      this.registrations.push(prototype);
      Polymer.log && this._regLog(prototype);
    },
    /**
     * Logs all elements registered with an `is` to the console.
     * @public
     * @this {this}
     */
    dumpRegistrations: function dumpRegistrations() {
      this.registrations.forEach(this._regLog);
    }
  };

  /**
   * When using the ShadyCSS scoping and custom property shim, causes all
   * shimmed `styles` (via `custom-style`) in the document (and its subtree)
   * to be updated based on current custom property values.
   *
   * The optional parameter overrides inline custom property styles with an
   * object of properties where the keys are CSS properties, and the values
   * are strings.
   *
   * Example: `Polymer.updateStyles({'--color': 'blue'})`
   *
   * These properties are retained unless a value of `null` is set.
   *
   * @param {Object=} props Bag of custom property key/values to
   *   apply to the document.
   */
  Polymer.updateStyles = function (props) {
    if (window.ShadyCSS) {
      window.ShadyCSS.styleDocument(props);
    }
  };
})();

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

__webpack_require__(19);

/** @suppress {deprecated} */
(function () {
  'use strict';

  /**
   * Legacy settings.
   * @namespace
   * @memberof Polymer
   */

  var settings = Polymer.Settings || {};
  settings.useShadow = !window.ShadyDOM;
  settings.useNativeCSSProperties = Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
  settings.useNativeCustomElements = !window.customElements.polyfillWrapFlushCallback;

  /**
   * Sets the global, legacy settings.
   *
   * @deprecated
   * @memberof Polymer
   */
  Polymer.Settings = settings;

  /**
   * Globally settable property that is automatically assigned to
   * `Polymer.ElementMixin` instances, useful for binding in templates to
   * make URL's relative to an application's root.  Defaults to the main
   * document URL, but can be overridden by users.  It may be useful to set
   * `Polymer.rootPath` to provide a stable application mount path when
   * using client side routing.
   *
   * @memberof Polymer
   */
  var rootPath = Polymer.rootPath || Polymer.ResolveUrl.pathFromUrl(document.baseURI || window.location.href);

  Polymer.rootPath = rootPath;

  /**
   * Sets the global rootPath property used by `Polymer.ElementMixin` and
   * available via `Polymer.rootPath`.
   *
   * @memberof Polymer
   * @param {string} path The new root path
   */
  Polymer.setRootPath = function (path) {
    Polymer.rootPath = path;
  };
})();

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(19);

(function () {
  'use strict';

  var MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
  var INCLUDE_ATTR = 'include';

  function importModule(moduleId) {
    if (!Polymer.DomModule) {
      return null;
    }
    return Polymer.DomModule.import(moduleId);
  }

  /** @typedef {{assetpath: string}} */
  var templateWithAssetPath = void 0; // eslint-disable-line no-unused-vars

  /**
   * Module with utilities for collection CSS text from `<templates>`, external
   * stylesheets, and `dom-module`s.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for collection CSS text from various sources.
   */
  var StyleGather = {

    /**
     * Returns CSS text of styles in a space-separated list of `dom-module`s.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleIds List of dom-module id's within which to
     * search for css.
     * @return {string} Concatenated CSS content from specified `dom-module`s
     * @this {StyleGather}
     */
    cssFromModules: function cssFromModules(moduleIds) {
      var modules = moduleIds.trim().split(' ');
      var cssText = '';
      for (var i = 0; i < modules.length; i++) {
        cssText += this.cssFromModule(modules[i]);
      }
      return cssText;
    },


    /**
     * Returns CSS text of styles in a given `dom-module`.  CSS in a `dom-module`
     * can come either from `<style>`s within the first `<template>`, or else
     * from one or more `<link rel="import" type="css">` links outside the
     * template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId dom-module id to gather styles from
     * @return {string} Concatenated CSS content from specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModule: function cssFromModule(moduleId) {
      var m = importModule(moduleId);
      if (m && m._cssText === undefined) {
        var cssText = '';
        // include css from the first template in the module
        var t = m.querySelector('template');
        if (t) {
          cssText += this.cssFromTemplate(t, /** @type {templateWithAssetPath }*/m.assetpath);
        }
        // module imports: <link rel="import" type="css">
        cssText += this.cssFromModuleImports(moduleId);
        m._cssText = cssText || null;
      }
      if (!m) {
        console.warn('Could not find style data in module named', moduleId);
      }
      return m && m._cssText || '';
    },


    /**
     * Returns CSS text of `<styles>` within a given template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {HTMLTemplateElement} template Template to gather styles from
     * @param {string} baseURI Base URI to resolve the URL against
     * @return {string} Concatenated CSS content from specified template
     * @this {StyleGather}
     */
    cssFromTemplate: function cssFromTemplate(template, baseURI) {
      var cssText = '';
      // if element is a template, get content from its .content
      var e$ = template.content.querySelectorAll('style');
      for (var i = 0; i < e$.length; i++) {
        var e = e$[i];
        // support style sharing by allowing styles to "include"
        // other dom-modules that contain styling
        var include = e.getAttribute(INCLUDE_ATTR);
        if (include) {
          cssText += this.cssFromModules(include);
        }
        e.parentNode.removeChild(e);
        cssText += baseURI ? Polymer.ResolveUrl.resolveCss(e.textContent, baseURI) : e.textContent;
      }
      return cssText;
    },


    /**
     * Returns CSS text from stylsheets loaded via `<link rel="import" type="css">`
     * links within the specified `dom-module`.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId Id of `dom-module` to gather CSS from
     * @return {string} Concatenated CSS content from links in specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModuleImports: function cssFromModuleImports(moduleId) {
      var cssText = '';
      var m = importModule(moduleId);
      if (!m) {
        return cssText;
      }
      var p$ = m.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
      for (var i = 0; i < p$.length; i++) {
        var p = p$[i];
        if (p.import) {
          var importDoc = p.import;
          // NOTE: polyfill affordance.
          // under the HTMLImports polyfill, there will be no 'body',
          // but the import pseudo-doc can be used directly.
          var container = importDoc.body ? importDoc.body : importDoc;
          cssText += Polymer.ResolveUrl.resolveCss(container.textContent, importDoc.baseURI);
        }
      }
      return cssText;
    }
  };

  Polymer.StyleGather = StyleGather;
})();

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(0);

__webpack_require__(19);

(function () {
  'use strict';

  var modules = {};
  var lcModules = {};
  function findModule(id) {
    return modules[id] || lcModules[id.toLowerCase()];
  }

  function styleOutsideTemplateCheck(inst) {
    if (inst.querySelector('style')) {
      console.warn('dom-module %s has style outside template', inst.id);
    }
  }

  /**
   * The `dom-module` element registers the dom it contains to the name given
   * by the module's id attribute. It provides a unified database of dom
   * accessible via its static `import` API.
   *
   * A key use case of `dom-module` is for providing custom element `<template>`s
   * via HTML imports that are parsed by the native HTML parser, that can be
   * relocated during a bundling pass and still looked up by `id`.
   *
   * Example:
   *
   *     <dom-module id="foo">
   *       <img src="stuff.png">
   *     </dom-module>
   *
   * Then in code in some other location that cannot access the dom-module above
   *
   *     let img = document.createElement('dom-module').import('foo', 'img');
   *
   * @customElement
   * @extends HTMLElement
   * @memberof Polymer
   * @summary Custom element that provides a registry of relocatable DOM content
   *   by `id` that is agnostic to bundling.
   * @unrestricted
   */

  var DomModule = function (_HTMLElement) {
    _inherits(DomModule, _HTMLElement);

    function DomModule() {
      _classCallCheck(this, DomModule);

      return _possibleConstructorReturn(this, (DomModule.__proto__ || Object.getPrototypeOf(DomModule)).apply(this, arguments));
    }

    _createClass(DomModule, [{
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(name, old, value) {
        if (old !== value) {
          this.register();
        }
      }

      /**
       * The absolute URL of the original location of this `dom-module`.
       *
       * This value will differ from this element's `ownerDocument` in the
       * following ways:
       * - Takes into account any `assetpath` attribute added during bundling
       *   to indicate the original location relative to the bundled location
       * - Uses the HTMLImports polyfill's `importForElement` API to ensure
       *   the path is relative to the import document's location since
       *   `ownerDocument` is not currently polyfilled
       */

    }, {
      key: 'register',


      /**
       * Registers the dom-module at a given id. This method should only be called
       * when a dom-module is imperatively created. For
       * example, `document.createElement('dom-module').register('foo')`.
       * @param {string=} id The id at which to register the dom-module.
       */
      value: function register(id) {
        id = id || this.id;
        if (id) {
          this.id = id;
          // store id separate from lowercased id so that
          // in all cases mixedCase id will stored distinctly
          // and lowercase version is a fallback
          modules[id] = this;
          lcModules[id.toLowerCase()] = this;
          styleOutsideTemplateCheck(this);
        }
      }
    }, {
      key: 'assetpath',
      get: function get() {
        // Don't override existing assetpath.
        if (!this.__assetpath) {
          // note: assetpath set via an attribute must be relative to this
          // element's location; accomodate polyfilled HTMLImports
          var owner = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument;
          var url = Polymer.ResolveUrl.resolveUrl(this.getAttribute('assetpath') || '', owner.baseURI);
          this.__assetpath = Polymer.ResolveUrl.pathFromUrl(url);
        }
        return this.__assetpath;
      }
    }], [{
      key: 'import',


      /**
       * Retrieves the element specified by the css `selector` in the module
       * registered by `id`. For example, this.import('foo', 'img');
       * @param {string} id The id of the dom-module in which to search.
       * @param {string=} selector The css selector by which to find the element.
       * @return {Element} Returns the element which matches `selector` in the
       * module registered at the specified `id`.
       */
      value: function _import(id, selector) {
        if (id) {
          var m = findModule(id);
          if (m && selector) {
            return m.querySelector(selector);
          }
          return m;
        }
        return null;
      }
    }, {
      key: 'observedAttributes',
      get: function get() {
        return ['id'];
      }
    }]);

    return DomModule;
  }(HTMLElement);

  DomModule.prototype['modules'] = modules;

  customElements.define('dom-module', DomModule);

  // export
  Polymer.DomModule = DomModule;
})();

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

(function () {
  'use strict';

  /**
   * Module with utilities for manipulating structured data path strings.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for manipulating structured data path strings.
   */

  var Path = {

    /**
     * Returns true if the given string is a structured data path (has dots).
     *
     * Example:
     *
     * ```
     * Polymer.Path.isPath('foo.bar.baz') // true
     * Polymer.Path.isPath('foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {boolean} True if the string contained one or more dots
     */
    isPath: function isPath(path) {
      return path.indexOf('.') >= 0;
    },

    /**
     * Returns the root property name for the given path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.root('foo.bar.baz') // 'foo'
     * Polymer.Path.root('foo')         // 'foo'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {string} Root property name
     */
    root: function root(path) {
      var dotIndex = path.indexOf('.');
      if (dotIndex === -1) {
        return path;
      }
      return path.slice(0, dotIndex);
    },

    /**
     * Given `base` is `foo.bar`, `foo` is an ancestor, `foo.bar` is not
     * Returns true if the given path is an ancestor of the base path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.isAncestor('foo.bar', 'foo')         // true
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar.baz') // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is an ancestor of `base`.
     */
    isAncestor: function isAncestor(base, path) {
      //     base.startsWith(path + '.');
      return base.indexOf(path + '.') === 0;
    },

    /**
     * Given `base` is `foo.bar`, `foo.bar.baz` is an descendant
     *
     * Example:
     *
     * ```
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar.baz') // true
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isDescendant('foo.bar', 'foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is a descendant of `base`.
     */
    isDescendant: function isDescendant(base, path) {
      //     path.startsWith(base + '.');
      return path.indexOf(base + '.') === 0;
    },

    /**
     * Replaces a previous base path with a new base path, preserving the
     * remainder of the path.
     *
     * User must ensure `path` has a prefix of `base`.
     *
     * Example:
     *
     * ```
     * Polymer.Path.translate('foo.bar', 'zot' 'foo.bar.baz') // 'zot.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Current base string to remove
     * @param {string} newBase New base string to replace with
     * @param {string} path Path to translate
     * @return {string} Translated string
     */
    translate: function translate(base, newBase, path) {
      return newBase + path.slice(base.length);
    },

    /**
     * @param {string} base Path string to test against
     * @param {string} path Path string to test
     * @return {boolean} True if `path` is equal to `base`
     * @this {Path}
     */
    matches: function matches(base, path) {
      return base === path || this.isAncestor(base, path) || this.isDescendant(base, path);
    },

    /**
     * Converts array-based paths to flattened path.  String-based paths
     * are returned as-is.
     *
     * Example:
     *
     * ```
     * Polymer.Path.normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
     * Polymer.Path.normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {string} Flattened path
     */
    normalize: function normalize(path) {
      if (Array.isArray(path)) {
        var parts = [];
        for (var i = 0; i < path.length; i++) {
          var args = path[i].toString().split('.');
          for (var j = 0; j < args.length; j++) {
            parts.push(args[j]);
          }
        }
        return parts.join('.');
      } else {
        return path;
      }
    },

    /**
     * Splits a path into an array of property names. Accepts either arrays
     * of path parts or strings.
     *
     * Example:
     *
     * ```
     * Polymer.Path.split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
     * Polymer.Path.split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {!Array<string>} Array of path parts
     * @this {Path}
     * @suppress {checkTypes}
     */
    split: function split(path) {
      if (Array.isArray(path)) {
        return this.normalize(path).split('.');
      }
      return path.toString().split('.');
    },

    /**
     * Reads a value from a path.  If any sub-property in the path is `undefined`,
     * this method returns `undefined` (will never throw.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to read
     * @param {Object=} info If an object is provided to `info`, the normalized
     *  (flattened) path will be set to `info.path`.
     * @return {*} Value at path, or `undefined` if the path could not be
     *  fully dereferenced.
     * @this {Path}
     */
    get: function get(root, path, info) {
      var prop = root;
      var parts = this.split(path);
      // Loop over path parts[0..n-1] and dereference
      for (var i = 0; i < parts.length; i++) {
        if (!prop) {
          return;
        }
        var part = parts[i];
        prop = prop[part];
      }
      if (info) {
        info.path = parts.join('.');
      }
      return prop;
    },

    /**
     * Sets a value to a path.  If any sub-property in the path is `undefined`,
     * this method will no-op.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to set
     * @param {*} value Value to set to path
     * @return {string | undefined} The normalized version of the input path
     * @this {Path}
     */
    set: function set(root, path, value) {
      var prop = root;
      var parts = this.split(path);
      var last = parts[parts.length - 1];
      if (parts.length > 1) {
        // Loop over path parts[0..n-2] and dereference
        for (var i = 0; i < parts.length - 1; i++) {
          var part = parts[i];
          prop = prop[part];
          if (!prop) {
            return;
          }
        }
        // Set value to object at end of path
        prop[last] = value;
      } else {
        // Simple property set
        prop[path] = value;
      }
      return parts.join('.');
    }

  };

  /**
   * Returns true if the given string is a structured data path (has dots).
   *
   * This function is deprecated.  Use `Polymer.Path.isPath` instead.
   *
   * Example:
   *
   * ```
   * Polymer.Path.isDeep('foo.bar.baz') // true
   * Polymer.Path.isDeep('foo')         // false
   * ```
   *
   * @deprecated
   * @memberof Polymer.Path
   * @param {string} path Path string
   * @return {boolean} True if the string contained one or more dots
   */
  Path.isDeep = Path.isPath;

  Polymer.Path = Path;
})();

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(0);

__webpack_require__(2);

(function () {

  'use strict';

  // 1.x backwards-compatible auto-wrapper for template type extensions
  // This is a clear layering violation and gives favored-nation status to
  // dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
  // a.) to ease 1.x backwards-compatibility due to loss of `is`, and
  // b.) to maintain if/repeat capability in parser-constrained elements
  //     (e.g. table, select) in lieu of native CE type extensions without
  //     massive new invention in this space (e.g. directive system)

  var templateExtensions = {
    'dom-if': true,
    'dom-repeat': true
  };
  function wrapTemplateExtension(node) {
    var is = node.getAttribute('is');
    if (is && templateExtensions[is]) {
      var t = node;
      t.removeAttribute('is');
      node = t.ownerDocument.createElement(is);
      t.parentNode.replaceChild(node, t);
      node.appendChild(t);
      while (t.attributes.length) {
        node.setAttribute(t.attributes[0].name, t.attributes[0].value);
        t.removeAttribute(t.attributes[0].name);
      }
    }
    return node;
  }

  function findTemplateNode(root, nodeInfo) {
    // recursively ascend tree until we hit root
    var parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
    // unwind the stack, returning the indexed node at each level
    if (parent) {
      // note: marginally faster than indexing via childNodes
      // (http://jsperf.com/childnodes-lookup)
      for (var n = parent.firstChild, i = 0; n; n = n.nextSibling) {
        if (nodeInfo.parentIndex === i++) {
          return n;
        }
      }
    } else {
      return root;
    }
  }

  // construct `$` map (from id annotations)
  function applyIdToMap(inst, map, node, nodeInfo) {
    if (nodeInfo.id) {
      map[nodeInfo.id] = node;
    }
  }

  // install event listeners (from event annotations)
  function applyEventListener(inst, node, nodeInfo) {
    if (nodeInfo.events && nodeInfo.events.length) {
      for (var j = 0, e$ = nodeInfo.events, e; j < e$.length && (e = e$[j]); j++) {
        inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
      }
    }
  }

  // push configuration references at configure time
  function applyTemplateContent(inst, node, nodeInfo) {
    if (nodeInfo.templateInfo) {
      node._templateInfo = nodeInfo.templateInfo;
    }
  }

  function createNodeEventHandler(context, eventName, methodName) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    context = context._methodHost || context;
    var handler = function handler(e) {
      if (context[methodName]) {
        context[methodName](e, e.detail);
      } else {
        console.warn('listener method `' + methodName + '` not defined');
      }
    };
    return handler;
  }

  /**
   * Element mixin that provides basic template parsing and stamping, including
   * the following template-related features for stamped templates:
   *
   * - Declarative event listeners (`on-eventname="listener"`)
   * - Map of node id's to stamped node instances (`this.$.id`)
   * - Nested template content caching/removal and re-installation (performance
   *   optimization)
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin that provides basic template parsing and stamping
   */
  Polymer.TemplateStamp = Polymer.dedupingMixin(function (superClass) {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_TemplateStamp}
     */
    var TemplateStamp = function (_superClass) {
      _inherits(TemplateStamp, _superClass);

      function TemplateStamp() {
        _classCallCheck(this, TemplateStamp);

        return _possibleConstructorReturn(this, (TemplateStamp.__proto__ || Object.getPrototypeOf(TemplateStamp)).apply(this, arguments));
      }

      _createClass(TemplateStamp, [{
        key: '_stampTemplate',


        /**
         * Clones the provided template content and returns a document fragment
         * containing the cloned dom.
         *
         * The template is parsed (once and memoized) using this library's
         * template parsing features, and provides the following value-added
         * features:
         * * Adds declarative event listeners for `on-event="handler"` attributes
         * * Generates an "id map" for all nodes with id's under `$` on returned
         *   document fragment
         * * Passes template info including `content` back to templates as
         *   `_templateInfo` (a performance optimization to avoid deep template
         *   cloning)
         *
         * Note that the memoized template parsing process is destructive to the
         * template: attributes for bindings and declarative event listeners are
         * removed after being noted in notes, and any nested `<template>.content`
         * is removed and stored in notes as well.
         *
         * @param {!HTMLTemplateElement} template Template to stamp
         * @return {!StampedTemplate} Cloned template content
         */
        value: function _stampTemplate(template) {
          // Polyfill support: bootstrap the template if it has not already been
          if (template && !template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
            HTMLTemplateElement.decorate(template);
          }
          var templateInfo = this.constructor._parseTemplate(template);
          var nodeInfo = templateInfo.nodeInfoList;
          var content = templateInfo.content || template.content;
          var dom = /** @type DocumentFragment */document.importNode(content, true);
          // NOTE: ShadyDom optimization indicating there is an insertion point
          dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
          var nodes = dom.nodeList = new Array(nodeInfo.length);
          dom.$ = {};
          for (var i = 0, l = nodeInfo.length, info; i < l && (info = nodeInfo[i]); i++) {
            var node = nodes[i] = findTemplateNode(dom, info);
            applyIdToMap(this, dom.$, node, info);
            applyTemplateContent(this, node, info);
            applyEventListener(this, node, info);
          }
          return (/** @type {!StampedTemplate} */dom
          );
        }

        /**
         * Adds an event listener by method name for the event provided.
         *
         * This method generates a handler function that looks up the method
         * name at handling time.
         *
         * @param {Node} node Node to add listener on
         * @param {string} eventName Name of event
         * @param {string} methodName Name of method
         * @param {*=} context Context the method will be called on (defaults
         *   to `node`)
         * @return {Function} Generated handler function
         */

      }, {
        key: '_addMethodEventListenerToNode',
        value: function _addMethodEventListenerToNode(node, eventName, methodName, context) {
          context = context || node;
          var handler = createNodeEventHandler(context, eventName, methodName);
          this._addEventListenerToNode(node, eventName, handler);
          return handler;
        }

        /**
         * Override point for adding custom or simulated event handling.
         *
         * @param {Node} node Node to add event listener to
         * @param {string} eventName Name of event
         * @param {Function} handler Listener function to add
         */

      }, {
        key: '_addEventListenerToNode',
        value: function _addEventListenerToNode(node, eventName, handler) {
          node.addEventListener(eventName, handler);
        }

        /**
         * Override point for adding custom or simulated event handling.
         *
         * @param {Node} node Node to remove event listener from
         * @param {string} eventName Name of event
         * @param {Function} handler Listener function to remove
         */

      }, {
        key: '_removeEventListenerFromNode',
        value: function _removeEventListenerFromNode(node, eventName, handler) {
          node.removeEventListener(eventName, handler);
        }
      }], [{
        key: '_parseTemplate',


        /**
         * Scans a template to produce template metadata.
         *
         * Template-specific metadata are stored in the object returned, and node-
         * specific metadata are stored in objects in its flattened `nodeInfoList`
         * array.  Only nodes in the template that were parsed as nodes of
         * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
         * contains an `index` (`childNodes` index in parent) and optionally
         * `parent`, which points to node info of its parent (including its index).
         *
         * The template metadata object returned from this method has the following
         * structure (many fields optional):
         *
         * ```js
         *   {
         *     // Flattened list of node metadata (for nodes that generated metadata)
         *     nodeInfoList: [
         *       {
         *         // `id` attribute for any nodes with id's for generating `$` map
         *         id: {string},
         *         // `on-event="handler"` metadata
         *         events: [
         *           {
         *             name: {string},   // event name
         *             value: {string},  // handler method name
         *           }, ...
         *         ],
         *         // Notes when the template contained a `<slot>` for shady DOM
         *         // optimization purposes
         *         hasInsertionPoint: {boolean},
         *         // For nested `<template>`` nodes, nested template metadata
         *         templateInfo: {object}, // nested template metadata
         *         // Metadata to allow efficient retrieval of instanced node
         *         // corresponding to this metadata
         *         parentInfo: {number},   // reference to parent nodeInfo>
         *         parentIndex: {number},  // index in parent's `childNodes` collection
         *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
         *       },
         *       ...
         *     ],
         *     // When true, the template had the `strip-whitespace` attribute
         *     // or was nested in a template with that setting
         *     stripWhitespace: {boolean},
         *     // For nested templates, nested template content is moved into
         *     // a document fragment stored here; this is an optimization to
         *     // avoid the cost of nested template cloning
         *     content: {DocumentFragment}
         *   }
         * ```
         *
         * This method kicks off a recursive treewalk as follows:
         *
         * ```
         *    _parseTemplate <---------------------+
         *      _parseTemplateContent              |
         *        _parseTemplateNode  <------------|--+
         *          _parseTemplateNestedTemplate --+  |
         *          _parseTemplateChildNodes ---------+
         *          _parseTemplateNodeAttributes
         *            _parseTemplateNodeAttribute
         *
         * ```
         *
         * These methods may be overridden to add custom metadata about templates
         * to either `templateInfo` or `nodeInfo`.
         *
         * Note that this method may be destructive to the template, in that
         * e.g. event annotations may be removed after being noted in the
         * template metadata.
         *
         * @param {!HTMLTemplateElement} template Template to parse
         * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
         *   template, for parsing nested templates
         * @return {!TemplateInfo} Parsed template metadata
         */
        value: function _parseTemplate(template, outerTemplateInfo) {
          // since a template may be re-used, memo-ize metadata
          if (!template._templateInfo) {
            var templateInfo = template._templateInfo = {};
            templateInfo.nodeInfoList = [];
            templateInfo.stripWhiteSpace = outerTemplateInfo && outerTemplateInfo.stripWhiteSpace || template.hasAttribute('strip-whitespace');
            this._parseTemplateContent(template, templateInfo, { parent: null });
          }
          return template._templateInfo;
        }
      }, {
        key: '_parseTemplateContent',
        value: function _parseTemplateContent(template, templateInfo, nodeInfo) {
          return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
        }

        /**
         * Parses template node and adds template and node metadata based on
         * the current node, and its `childNodes` and `attributes`.
         *
         * This method may be overridden to add custom node or template specific
         * metadata based on this node.
         *
         * @param {Node} node Node to parse
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         */

      }, {
        key: '_parseTemplateNode',
        value: function _parseTemplateNode(node, templateInfo, nodeInfo) {
          var noted = void 0;
          var element = /** @type Element */node;
          if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
            noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
          } else if (element.localName === 'slot') {
            // For ShadyDom optimization, indicating there is an insertion point
            templateInfo.hasInsertionPoint = true;
          }
          if (element.firstChild) {
            noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
          }
          if (element.hasAttributes && element.hasAttributes()) {
            noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
          }
          return noted;
        }

        /**
         * Parses template child nodes for the given root node.
         *
         * This method also wraps whitelisted legacy template extensions
         * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
         * wrappers, collapses text nodes, and strips whitespace from the template
         * if the `templateInfo.stripWhitespace` setting was provided.
         *
         * @param {Node} root Root node whose `childNodes` will be parsed
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         */

      }, {
        key: '_parseTemplateChildNodes',
        value: function _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
          for (var node = root.firstChild, parentIndex = 0, next; node; node = next) {
            // Wrap templates
            if (node.localName == 'template') {
              node = wrapTemplateExtension(node);
            }
            // collapse adjacent textNodes: fixes an IE issue that can cause
            // text nodes to be inexplicably split =(
            // note that root.normalize() should work but does not so we do this
            // manually.
            next = node.nextSibling;
            if (node.nodeType === Node.TEXT_NODE) {
              var /** Node */n = next;
              while (n && n.nodeType === Node.TEXT_NODE) {
                node.textContent += n.textContent;
                next = n.nextSibling;
                root.removeChild(n);
                n = next;
              }
              // optionally strip whitespace
              if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
                root.removeChild(node);
                continue;
              }
            }
            var childInfo = { parentIndex: parentIndex, parentInfo: nodeInfo };
            if (this._parseTemplateNode(node, templateInfo, childInfo)) {
              childInfo.infoIndex = templateInfo.nodeInfoList.push( /** @type {!NodeInfo} */childInfo) - 1;
            }
            // Increment if not removed
            if (node.parentNode) {
              parentIndex++;
            }
          }
        }

        /**
         * Parses template content for the given nested `<template>`.
         *
         * Nested template info is stored as `templateInfo` in the current node's
         * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
         * It will then be the responsibility of the host to set it back to the
         * template and for users stamping nested templates to use the
         * `_contentForTemplate` method to retrieve the content for this template
         * (an optimization to avoid the cost of cloning nested template content).
         *
         * @param {HTMLTemplateElement} node Node to parse (a <template>)
         * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
         *   that includes the template `node`
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         */

      }, {
        key: '_parseTemplateNestedTemplate',
        value: function _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
          var templateInfo = this._parseTemplate(node, outerTemplateInfo);
          var content = templateInfo.content = node.content.ownerDocument.createDocumentFragment();
          content.appendChild(node.content);
          nodeInfo.templateInfo = templateInfo;
          return true;
        }

        /**
         * Parses template node attributes and adds node metadata to `nodeInfo`
         * for nodes of interest.
         *
         * @param {Element} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         */

      }, {
        key: '_parseTemplateNodeAttributes',
        value: function _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
          // Make copy of original attribute list, since the order may change
          // as attributes are added and removed
          var noted = false;
          var attrs = Array.from(node.attributes);
          for (var i = attrs.length - 1, a; a = attrs[i]; i--) {
            noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
          }
          return noted;
        }

        /**
         * Parses a single template node attribute and adds node metadata to
         * `nodeInfo` for attributes of interest.
         *
         * This implementation adds metadata for `on-event="handler"` attributes
         * and `id` attributes.
         *
         * @param {Element} node Node to parse
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @param {string} name Attribute name
         * @param {string} value Attribute value
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         */

      }, {
        key: '_parseTemplateNodeAttribute',
        value: function _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
          // events (on-*)
          if (name.slice(0, 3) === 'on-') {
            node.removeAttribute(name);
            nodeInfo.events = nodeInfo.events || [];
            nodeInfo.events.push({
              name: name.slice(3),
              value: value
            });
            return true;
          }
          // static id
          else if (name === 'id') {
              nodeInfo.id = value;
              return true;
            }
          return false;
        }

        /**
         * Returns the `content` document fragment for a given template.
         *
         * For nested templates, Polymer performs an optimization to cache nested
         * template content to avoid the cost of cloning deeply nested templates.
         * This method retrieves the cached content for a given template.
         *
         * @param {HTMLTemplateElement} template Template to retrieve `content` for
         * @return {DocumentFragment} Content fragment
         */

      }, {
        key: '_contentForTemplate',
        value: function _contentForTemplate(template) {
          var templateInfo = /** @type {HTMLTemplateElementWithInfo} */template._templateInfo;
          return templateInfo && templateInfo.content || template.content;
        }
      }]);

      return TemplateStamp;
    }(superClass);

    return TemplateStamp;
  });
})();

/***/ })

});