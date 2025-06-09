(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var toPropertyKey = require("./toPropertyKey.js");
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPropertyKey.js":4}],2:[function(require,module,exports){
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],3:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./typeof.js":5}],4:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
var toPrimitive = require("./toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPrimitive.js":3,"./typeof.js":5}],5:[function(require,module,exports){
function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],6:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],7:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":32,"./_wks":83}],8:[function(require,module,exports){
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":73}],9:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":39}],10:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":74,"./_to-iobject":76,"./_to-length":77}],11:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_array-species-create":14,"./_ctx":19,"./_iobject":36,"./_to-length":77,"./_to-object":78}],12:[function(require,module,exports){
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var toLength = require('./_to-length');

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

},{"./_a-function":6,"./_iobject":36,"./_to-length":77,"./_to-object":78}],13:[function(require,module,exports){
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-array":38,"./_is-object":39,"./_wks":83}],14:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":13}],15:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":16,"./_wks":83}],16:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],17:[function(require,module,exports){
var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],18:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":50,"./_property-desc":62}],19:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":6}],20:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],21:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":26}],22:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":30,"./_is-object":39}],23:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],24:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":55,"./_object-keys":58,"./_object-pie":59}],25:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":17,"./_ctx":19,"./_global":30,"./_hide":32,"./_redefine":63}],26:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],27:[function(require,module,exports){
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./_defined":20,"./_fails":26,"./_hide":32,"./_redefine":63,"./_regexp-exec":65,"./_wks":83,"./es6.regexp.exec":99}],28:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":9}],29:[function(require,module,exports){
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":70}],30:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],31:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],32:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":21,"./_object-dp":50,"./_property-desc":62}],33:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":30}],34:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":21,"./_dom-create":22,"./_fails":26}],35:[function(require,module,exports){
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":39,"./_set-proto":66}],36:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":16}],37:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":46,"./_wks":83}],38:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":16}],39:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],40:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_cof":16,"./_is-object":39,"./_wks":83}],41:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":9}],42:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":32,"./_object-create":49,"./_property-desc":62,"./_set-to-string-tag":68,"./_wks":83}],43:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":25,"./_hide":32,"./_iter-create":42,"./_iterators":46,"./_library":47,"./_object-gpo":56,"./_redefine":63,"./_set-to-string-tag":68,"./_wks":83}],44:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":83}],45:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],46:[function(require,module,exports){
module.exports = {};

},{}],47:[function(require,module,exports){
module.exports = false;

},{}],48:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":26,"./_has":31,"./_is-object":39,"./_object-dp":50,"./_uid":80}],49:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":9,"./_dom-create":22,"./_enum-bug-keys":23,"./_html":33,"./_object-dps":51,"./_shared-key":69}],50:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":9,"./_descriptors":21,"./_ie8-dom-define":34,"./_to-primitive":79}],51:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":9,"./_descriptors":21,"./_object-dp":50,"./_object-keys":58}],52:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":21,"./_has":31,"./_ie8-dom-define":34,"./_object-pie":59,"./_property-desc":62,"./_to-iobject":76,"./_to-primitive":79}],53:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":54,"./_to-iobject":76}],54:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":23,"./_object-keys-internal":57}],55:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],56:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":31,"./_shared-key":69,"./_to-object":78}],57:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":10,"./_has":31,"./_shared-key":69,"./_to-iobject":76}],58:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":23,"./_object-keys-internal":57}],59:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],60:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":17,"./_export":25,"./_fails":26}],61:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_an-object":9,"./_global":30,"./_object-gopn":54,"./_object-gops":55}],62:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],63:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":17,"./_function-to-string":29,"./_global":30,"./_has":31,"./_hide":32,"./_uid":80}],64:[function(require,module,exports){
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":15}],65:[function(require,module,exports){
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":28}],66:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_an-object":9,"./_ctx":19,"./_is-object":39,"./_object-gopd":52}],67:[function(require,module,exports){
'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_descriptors":21,"./_global":30,"./_object-dp":50,"./_wks":83}],68:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":31,"./_object-dp":50,"./_wks":83}],69:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":70,"./_uid":80}],70:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":17,"./_global":30,"./_library":47}],71:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":6,"./_an-object":9,"./_wks":83}],72:[function(require,module,exports){
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":26}],73:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":20,"./_to-integer":75}],74:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":75}],75:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],76:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":20,"./_iobject":36}],77:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":75}],78:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":20}],79:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":39}],80:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],81:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":17,"./_global":30,"./_library":47,"./_object-dp":50,"./_wks-ext":82}],82:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":83}],83:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":30,"./_shared":70,"./_uid":80}],84:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":15,"./_core":17,"./_iterators":46,"./_wks":83}],85:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":11,"./_export":25,"./_strict-method":72}],86:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":11,"./_export":25,"./_strict-method":72}],87:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":18,"./_ctx":19,"./_export":25,"./_is-array-iter":37,"./_iter-call":41,"./_iter-detect":44,"./_to-length":77,"./_to-object":78,"./core.get-iterator-method":84}],88:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $indexOf = require('./_array-includes')(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"./_array-includes":10,"./_export":25,"./_strict-method":72}],89:[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":25,"./_is-array":38}],90:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":7,"./_iter-define":43,"./_iter-step":45,"./_iterators":46,"./_to-iobject":76}],91:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

},{"./_array-reduce":12,"./_export":25,"./_strict-method":72}],92:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_a-function":6,"./_export":25,"./_fails":26,"./_strict-method":72,"./_to-object":78}],93:[function(require,module,exports){
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  require('./_redefine')(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"./_redefine":63}],94:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });

},{"./_descriptors":21,"./_export":25,"./_object-dps":51}],95:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":21,"./_export":25,"./_object-dp":50}],96:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":58,"./_object-sap":60,"./_to-object":78}],97:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":15,"./_redefine":63,"./_wks":83}],98:[function(require,module,exports){
var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_descriptors":21,"./_fails":26,"./_flags":28,"./_global":30,"./_inherit-if-required":35,"./_is-regexp":40,"./_object-dp":50,"./_object-gopn":54,"./_redefine":63,"./_set-species":67,"./_wks":83}],99:[function(require,module,exports){
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_export":25,"./_regexp-exec":65}],100:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":21,"./_flags":28,"./_object-dp":50}],101:[function(require,module,exports){
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_advance-string-index":8,"./_an-object":9,"./_fix-re-wks":27,"./_regexp-exec-abstract":64,"./_to-length":77}],102:[function(require,module,exports){
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_advance-string-index":8,"./_an-object":9,"./_fix-re-wks":27,"./_regexp-exec-abstract":64,"./_to-integer":75,"./_to-length":77,"./_to-object":78}],103:[function(require,module,exports){
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_advance-string-index":8,"./_an-object":9,"./_fails":26,"./_fix-re-wks":27,"./_is-regexp":40,"./_regexp-exec":65,"./_regexp-exec-abstract":64,"./_species-constructor":71,"./_to-length":77}],104:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./_an-object":9,"./_descriptors":21,"./_fails":26,"./_flags":28,"./_redefine":63,"./es6.regexp.flags":100}],105:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":43,"./_string-at":73}],106:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":9,"./_descriptors":21,"./_enum-keys":24,"./_export":25,"./_fails":26,"./_global":30,"./_has":31,"./_hide":32,"./_is-array":38,"./_is-object":39,"./_library":47,"./_meta":48,"./_object-create":49,"./_object-dp":50,"./_object-gopd":52,"./_object-gopn":54,"./_object-gopn-ext":53,"./_object-gops":55,"./_object-keys":58,"./_object-pie":59,"./_property-desc":62,"./_redefine":63,"./_set-to-string-tag":68,"./_shared":70,"./_to-iobject":76,"./_to-object":78,"./_to-primitive":79,"./_uid":80,"./_wks":83,"./_wks-define":81,"./_wks-ext":82}],107:[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_create-property":18,"./_export":25,"./_object-gopd":52,"./_own-keys":61,"./_to-iobject":76}],108:[function(require,module,exports){
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./_global":30,"./_hide":32,"./_iterators":46,"./_object-keys":58,"./_redefine":63,"./_wks":83,"./es6.array.iterator":90}],109:[function(require,module,exports){
(function (global){(function (){
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeName = undefined;
exports.parse = parse;
exports.toCodePoints = toCodePoints;

var _regex = require('./lib/regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeName = exports.TypeName = 'emoji';
// Copyright Twitter Inc. Licensed under MIT
// https://github.com/twitter/twemoji-parser/blob/master/LICENSE.md
function parse(text, options) {
  var assetType = options && options.assetType ? options.assetType : 'svg';
  var getTwemojiUrl = options && options.buildUrl ? options.buildUrl : function (codepoints, assetType) {
    return assetType === 'png' ? 'https://twemoji.maxcdn.com/2/72x72/' + codepoints + '.png' : 'https://twemoji.maxcdn.com/2/svg/' + codepoints + '.svg';
  };

  var entities = [];

  _regex2.default.lastIndex = 0;
  while (true) {
    var result = _regex2.default.exec(text);
    if (!result) {
      break;
    }

    var emojiText = result[0];
    var codepoints = toCodePoints(removeVS16s(emojiText)).join('-');

    entities.push({
      url: codepoints ? getTwemojiUrl(codepoints, assetType) : '',
      indices: [result.index, _regex2.default.lastIndex],
      text: emojiText,
      type: TypeName
    });
  }
  return entities;
}

var vs16RegExp = /\uFE0F/g;
// avoid using a string literal like '\u200D' here because minifiers expand it inline
var zeroWidthJoiner = String.fromCharCode(0x200d);

var removeVS16s = function removeVS16s(rawEmoji) {
  return rawEmoji.indexOf(zeroWidthJoiner) < 0 ? rawEmoji.replace(vs16RegExp, '') : rawEmoji;
};

function toCodePoints(unicodeSurrogates) {
  var points = [];
  var char = 0;
  var previous = 0;
  var i = 0;
  while (i < unicodeSurrogates.length) {
    char = unicodeSurrogates.charCodeAt(i++);
    if (previous) {
      points.push((0x10000 + (previous - 0xd800 << 10) + (char - 0xdc00)).toString(16));
      previous = 0;
    } else if (char > 0xd800 && char <= 0xdbff) {
      previous = char;
    } else {
      points.push(char.toString(16));
    }
  }
  return points;
}
},{"./lib/regex":111}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright Twitter Inc. Licensed under MIT
// https://github.com/twitter/twemoji-parser/blob/master/LICENSE.md

// This file is auto-generated
exports.default = /(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddb0-\uddb3])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\udeeb\udeec\udef4-\udef9]|\ud83e[\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd40-\udd45\udd47-\udd70\udd73-\udd76\udd7a\udd7c-\udda2\uddb4\uddb7\uddc0-\uddc2\uddd0\uddde-\uddff]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
},{}],112:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractEntitiesWithIndices = _interopRequireDefault(require("./extractEntitiesWithIndices"));

var _autoLinkEntities = _interopRequireDefault(require("./autoLinkEntities"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, options) {
  var entities = (0, _extractEntitiesWithIndices["default"])(text, {
    extractUrlsWithoutProtocol: false
  });
  return (0, _autoLinkEntities["default"])(text, entities, options);
}

module.exports = exports.default;
},{"./autoLinkEntities":114,"./extractEntitiesWithIndices":123,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],113:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _autoLinkEntities = _interopRequireDefault(require("./autoLinkEntities"));

var _extractCashtagsWithIndices = _interopRequireDefault(require("./extractCashtagsWithIndices"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, options) {
  var entities = (0, _extractCashtagsWithIndices["default"])(text);
  return (0, _autoLinkEntities["default"])(text, entities, options);
}

module.exports = exports.default;
},{"./autoLinkEntities":114,"./extractCashtagsWithIndices":122,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],114:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.array.sort");

var _clone = _interopRequireDefault(require("./lib/clone"));

var _extractHtmlAttrsFromOptions = _interopRequireDefault(require("./extractHtmlAttrsFromOptions"));

var _htmlEscape = _interopRequireDefault(require("./htmlEscape"));

var _linkToCashtag = _interopRequireDefault(require("./linkToCashtag"));

var _linkToHashtag = _interopRequireDefault(require("./linkToHashtag"));

var _linkToUrl = _interopRequireDefault(require("./linkToUrl"));

var _linkToMentionAndList = _interopRequireDefault(require("./linkToMentionAndList"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Default CSS class for auto-linked lists (along with the url class)
var DEFAULT_LIST_CLASS = 'tweet-url list-slug'; // Default CSS class for auto-linked usernames (along with the url class)

var DEFAULT_USERNAME_CLASS = 'tweet-url username'; // Default CSS class for auto-linked hashtags (along with the url class)

var DEFAULT_HASHTAG_CLASS = 'tweet-url hashtag'; // Default CSS class for auto-linked cashtags (along with the url class)

var DEFAULT_CASHTAG_CLASS = 'tweet-url cashtag';

function _default(text, entities, options) {
  var options = (0, _clone["default"])(options || {});
  options.hashtagClass = options.hashtagClass || DEFAULT_HASHTAG_CLASS;
  options.hashtagUrlBase = options.hashtagUrlBase || 'https://twitter.com/search?q=%23';
  options.cashtagClass = options.cashtagClass || DEFAULT_CASHTAG_CLASS;
  options.cashtagUrlBase = options.cashtagUrlBase || 'https://twitter.com/search?q=%24';
  options.listClass = options.listClass || DEFAULT_LIST_CLASS;
  options.usernameClass = options.usernameClass || DEFAULT_USERNAME_CLASS;
  options.usernameUrlBase = options.usernameUrlBase || 'https://twitter.com/';
  options.listUrlBase = options.listUrlBase || 'https://twitter.com/';
  options.htmlAttrs = (0, _extractHtmlAttrsFromOptions["default"])(options);
  options.invisibleTagAttrs = options.invisibleTagAttrs || "style='position:absolute;left:-9999px;'"; // remap url entities to hash

  var urlEntities, i, len;

  if (options.urlEntities) {
    urlEntities = {};

    for (i = 0, len = options.urlEntities.length; i < len; i++) {
      urlEntities[options.urlEntities[i].url] = options.urlEntities[i];
    }

    options.urlEntities = urlEntities;
  }

  var result = '';
  var beginIndex = 0; // sort entities by start index

  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });
  var nonEntity = options.htmlEscapeNonEntities ? _htmlEscape["default"] : function (text) {
    return text;
  };

  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    result += nonEntity(text.substring(beginIndex, entity.indices[0]));

    if (entity.url) {
      result += (0, _linkToUrl["default"])(entity, text, options);
    } else if (entity.hashtag) {
      result += (0, _linkToHashtag["default"])(entity, text, options);
    } else if (entity.screenName) {
      result += (0, _linkToMentionAndList["default"])(entity, text, options);
    } else if (entity.cashtag) {
      result += (0, _linkToCashtag["default"])(entity, text, options);
    }

    beginIndex = entity.indices[1];
  }

  result += nonEntity(text.substring(beginIndex, text.length));
  return result;
}

module.exports = exports.default;
},{"./extractHtmlAttrsFromOptions":126,"./htmlEscape":137,"./lib/clone":145,"./linkToCashtag":152,"./linkToHashtag":153,"./linkToMentionAndList":154,"./linkToUrl":157,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.array.sort":92,"core-js/modules/es6.object.define-property":95}],115:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractHashtagsWithIndices = _interopRequireDefault(require("./extractHashtagsWithIndices"));

var _autoLinkEntities = _interopRequireDefault(require("./autoLinkEntities"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, options) {
  var entities = (0, _extractHashtagsWithIndices["default"])(text);
  return (0, _autoLinkEntities["default"])(text, entities, options);
}

module.exports = exports.default;
},{"./autoLinkEntities":114,"./extractHashtagsWithIndices":125,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],116:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _autoLinkEntities = _interopRequireDefault(require("./autoLinkEntities"));

var _extractUrlsWithIndices = _interopRequireDefault(require("./extractUrlsWithIndices"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, options) {
  var entities = (0, _extractUrlsWithIndices["default"])(text, {
    extractUrlsWithoutProtocol: false
  });
  return (0, _autoLinkEntities["default"])(text, entities, options);
}

module.exports = exports.default;
},{"./autoLinkEntities":114,"./extractUrlsWithIndices":132,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],117:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractMentionsOrListsWithIndices = _interopRequireDefault(require("./extractMentionsOrListsWithIndices"));

var _autoLinkEntities = _interopRequireDefault(require("./autoLinkEntities"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, options) {
  var entities = (0, _extractMentionsOrListsWithIndices["default"])(text);
  return (0, _autoLinkEntities["default"])(text, entities, options);
}

module.exports = exports.default;
},{"./autoLinkEntities":114,"./extractMentionsOrListsWithIndices":128,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],118:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _autoLinkEntities = _interopRequireDefault(require("./autoLinkEntities"));

var _modifyIndicesFromUnicodeToUTF = _interopRequireDefault(require("./modifyIndicesFromUnicodeToUTF16"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, json, options) {
  // map JSON entity to twitter-text entity
  if (json.user_mentions) {
    for (var i = 0; i < json.user_mentions.length; i++) {
      // this is a @mention
      json.user_mentions[i].screenName = json.user_mentions[i].screen_name;
    }
  }

  if (json.hashtags) {
    for (var i = 0; i < json.hashtags.length; i++) {
      // this is a #hashtag
      json.hashtags[i].hashtag = json.hashtags[i].text;
    }
  }

  if (json.symbols) {
    for (var i = 0; i < json.symbols.length; i++) {
      // this is a $CASH tag
      json.symbols[i].cashtag = json.symbols[i].text;
    }
  } // concatenate all entities


  var entities = [];

  for (var key in json) {
    entities = entities.concat(json[key]);
  } // modify indices to UTF-16


  (0, _modifyIndicesFromUnicodeToUTF["default"])(text, entities);
  return (0, _autoLinkEntities["default"])(text, entities, options);
}

module.exports = exports.default;
},{"./autoLinkEntities":114,"./modifyIndicesFromUnicodeToUTF16":159,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],119:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// This file is generated by scripts/buildConfig.js
var _default = {
  version1: {
    version: 1,
    maxWeightedTweetLength: 140,
    scale: 1,
    defaultWeight: 1,
    transformedURLLength: 23,
    ranges: []
  },
  version2: {
    version: 2,
    maxWeightedTweetLength: 280,
    scale: 100,
    defaultWeight: 200,
    transformedURLLength: 23,
    ranges: [{
      start: 0,
      end: 4351,
      weight: 100
    }, {
      start: 8192,
      end: 8205,
      weight: 100
    }, {
      start: 8208,
      end: 8223,
      weight: 100
    }, {
      start: 8242,
      end: 8247,
      weight: 100
    }]
  },
  version3: {
    version: 3,
    maxWeightedTweetLength: 280,
    scale: 100,
    defaultWeight: 200,
    emojiParsingEnabled: true,
    transformedURLLength: 23,
    ranges: [{
      start: 0,
      end: 4351,
      weight: 100
    }, {
      start: 8192,
      end: 8205,
      weight: 100
    }, {
      start: 8208,
      end: 8223,
      weight: 100
    }, {
      start: 8242,
      end: 8247,
      weight: 100
    }]
  },
  defaults: {
    version: 3,
    maxWeightedTweetLength: 280,
    scale: 100,
    defaultWeight: 200,
    emojiParsingEnabled: true,
    transformedURLLength: 23,
    ranges: [{
      start: 0,
      end: 4351,
      weight: 100
    }, {
      start: 8192,
      end: 8205,
      weight: 100
    }, {
      start: 8208,
      end: 8223,
      weight: 100
    }, {
      start: 8242,
      end: 8247,
      weight: 100
    }]
  }
};
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],120:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.array.sort");

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, entities, indicesInUTF16) {
  if (entities.length == 0) {
    return;
  }

  var charIndex = 0;
  var codePointIndex = 0; // sort entities by start index

  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });
  var entityIndex = 0;
  var entity = entities[0];

  while (charIndex < text.length) {
    if (entity.indices[0] == (indicesInUTF16 ? charIndex : codePointIndex)) {
      var len = entity.indices[1] - entity.indices[0];
      entity.indices[0] = indicesInUTF16 ? codePointIndex : charIndex;
      entity.indices[1] = entity.indices[0] + len;
      entityIndex++;

      if (entityIndex == entities.length) {
        // no more entity
        break;
      }

      entity = entities[entityIndex];
    }

    var c = text.charCodeAt(charIndex);

    if (c >= 0xd800 && c <= 0xdbff && charIndex < text.length - 1) {
      // Found high surrogate char
      c = text.charCodeAt(charIndex + 1);

      if (c >= 0xdc00 && c <= 0xdfff) {
        // Found surrogate pair
        charIndex++;
      }
    }

    codePointIndex++;
    charIndex++;
  }
}

module.exports = exports.default;
},{"core-js/modules/es6.array.sort":92,"core-js/modules/es6.object.define-property":95}],121:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractCashtagsWithIndices = _interopRequireDefault(require("./extractCashtagsWithIndices"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text) {
  var cashtagsOnly = [],
      cashtagsWithIndices = (0, _extractCashtagsWithIndices["default"])(text);

  for (var i = 0; i < cashtagsWithIndices.length; i++) {
    cashtagsOnly.push(cashtagsWithIndices[i].cashtag);
  }

  return cashtagsOnly;
}

module.exports = exports.default;
},{"./extractCashtagsWithIndices":122,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],122:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.index-of");

var _validCashtag = _interopRequireDefault(require("./regexp/validCashtag"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text) {
  if (!text || text.indexOf('$') === -1) {
    return [];
  }

  var tags = [];
  text.replace(_validCashtag["default"], function (match, before, dollar, cashtag, offset, chunk) {
    var startPosition = offset + before.length;
    var endPosition = startPosition + cashtag.length + 1;
    tags.push({
      cashtag: cashtag,
      indices: [startPosition, endPosition]
    });
  });
  return tags;
}

module.exports = exports.default;
},{"./regexp/validCashtag":193,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.array.index-of":88,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.replace":102}],123:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractCashtagsWithIndices = _interopRequireDefault(require("./extractCashtagsWithIndices"));

var _extractHashtagsWithIndices = _interopRequireDefault(require("./extractHashtagsWithIndices"));

var _extractMentionsOrListsWithIndices = _interopRequireDefault(require("./extractMentionsOrListsWithIndices"));

var _extractUrlsWithIndices = _interopRequireDefault(require("./extractUrlsWithIndices"));

var _removeOverlappingEntities = _interopRequireDefault(require("./removeOverlappingEntities"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, options) {
  var entities = (0, _extractUrlsWithIndices["default"])(text, options).concat((0, _extractMentionsOrListsWithIndices["default"])(text)).concat((0, _extractHashtagsWithIndices["default"])(text, {
    checkUrlOverlap: false
  })).concat((0, _extractCashtagsWithIndices["default"])(text));

  if (entities.length == 0) {
    return [];
  }

  (0, _removeOverlappingEntities["default"])(entities);
  return entities;
}

module.exports = exports.default;
},{"./extractCashtagsWithIndices":122,"./extractHashtagsWithIndices":125,"./extractMentionsOrListsWithIndices":128,"./extractUrlsWithIndices":132,"./removeOverlappingEntities":240,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],124:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractHashtagsWithIndices = _interopRequireDefault(require("./extractHashtagsWithIndices"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text) {
  var hashtagsOnly = [];
  var hashtagsWithIndices = (0, _extractHashtagsWithIndices["default"])(text);

  for (var i = 0; i < hashtagsWithIndices.length; i++) {
    hashtagsOnly.push(hashtagsWithIndices[i].hashtag);
  }

  return hashtagsOnly;
}

module.exports = exports.default;
},{"./extractHashtagsWithIndices":125,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],125:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.match");

var _endHashtagMatch = _interopRequireDefault(require("./regexp/endHashtagMatch"));

var _extractUrlsWithIndices = _interopRequireDefault(require("./extractUrlsWithIndices"));

var _hashSigns = _interopRequireDefault(require("./regexp/hashSigns"));

var _removeOverlappingEntities = _interopRequireDefault(require("./removeOverlappingEntities"));

var _validHashtag = _interopRequireDefault(require("./regexp/validHashtag"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var extractHashtagsWithIndices = function extractHashtagsWithIndices(text, options) {
  if (!options) {
    options = {
      checkUrlOverlap: true
    };
  }

  if (!text || !text.match(_hashSigns["default"])) {
    return [];
  }

  var tags = [];
  text.replace(_validHashtag["default"], function (match, before, hash, hashText, offset, chunk) {
    var after = chunk.slice(offset + match.length);

    if (after.match(_endHashtagMatch["default"])) {
      return;
    }

    var startPosition = offset + before.length;
    var endPosition = startPosition + hashText.length + 1;
    tags.push({
      hashtag: hashText,
      indices: [startPosition, endPosition]
    });
  });

  if (options.checkUrlOverlap) {
    // also extract URL entities
    var urls = (0, _extractUrlsWithIndices["default"])(text);

    if (urls.length > 0) {
      var entities = tags.concat(urls); // remove overlap

      (0, _removeOverlappingEntities["default"])(entities); // only push back hashtags

      tags = [];

      for (var i = 0; i < entities.length; i++) {
        if (entities[i].hashtag) {
          tags.push(entities[i]);
        }
      }
    }
  }

  return tags;
};

var _default = extractHashtagsWithIndices;
exports["default"] = _default;
module.exports = exports.default;
},{"./extractUrlsWithIndices":132,"./regexp/endHashtagMatch":170,"./regexp/hashSigns":173,"./regexp/validHashtag":199,"./removeOverlappingEntities":240,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.match":101,"core-js/modules/es6.regexp.replace":102}],126:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
}; // Options which should not be passed as HTML attributes

var OPTIONS_NOT_ATTRIBUTES = {
  urlClass: true,
  listClass: true,
  usernameClass: true,
  hashtagClass: true,
  cashtagClass: true,
  usernameUrlBase: true,
  listUrlBase: true,
  hashtagUrlBase: true,
  cashtagUrlBase: true,
  usernameUrlBlock: true,
  listUrlBlock: true,
  hashtagUrlBlock: true,
  linkUrlBlock: true,
  usernameIncludeSymbol: true,
  suppressLists: true,
  suppressNoFollow: true,
  targetBlank: true,
  suppressDataScreenName: true,
  urlEntities: true,
  symbolTag: true,
  textWithSymbolTag: true,
  urlTarget: true,
  invisibleTagAttrs: true,
  linkAttributeBlock: true,
  linkTextBlock: true,
  htmlEscapeNonEntities: true
};

function _default(options) {
  var htmlAttrs = {};

  for (var k in options) {
    var v = options[k];

    if (OPTIONS_NOT_ATTRIBUTES[k]) {
      continue;
    }

    if (BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null;
    }

    if (v == null) {
      continue;
    }

    htmlAttrs[k] = v;
  }

  return htmlAttrs;
}

module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],127:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractMentionsWithIndices = _interopRequireDefault(require("./extractMentionsWithIndices"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text) {
  var screenNamesOnly = [],
      screenNamesWithIndices = (0, _extractMentionsWithIndices["default"])(text);

  for (var i = 0; i < screenNamesWithIndices.length; i++) {
    var screenName = screenNamesWithIndices[i].screenName;
    screenNamesOnly.push(screenName);
  }

  return screenNamesOnly;
}

module.exports = exports.default;
},{"./extractMentionsWithIndices":129,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],128:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.match");

var _atSigns = _interopRequireDefault(require("./regexp/atSigns"));

var _endMentionMatch = _interopRequireDefault(require("./regexp/endMentionMatch"));

var _validMentionOrList = _interopRequireDefault(require("./regexp/validMentionOrList"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text) {
  if (!text || !text.match(_atSigns["default"])) {
    return [];
  }

  var possibleNames = [];
  text.replace(_validMentionOrList["default"], function (match, before, atSign, screenName, slashListname, offset, chunk) {
    var after = chunk.slice(offset + match.length);

    if (!after.match(_endMentionMatch["default"])) {
      slashListname = slashListname || '';
      var startPosition = offset + before.length;
      var endPosition = startPosition + screenName.length + slashListname.length + 1;
      possibleNames.push({
        screenName: screenName,
        listSlug: slashListname,
        indices: [startPosition, endPosition]
      });
    }
  });
  return possibleNames;
}

module.exports = exports.default;
},{"./regexp/atSigns":163,"./regexp/endMentionMatch":171,"./regexp/validMentionOrList":200,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.match":101,"core-js/modules/es6.regexp.replace":102}],129:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractMentionsOrListsWithIndices = _interopRequireDefault(require("./extractMentionsOrListsWithIndices"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text) {
  var mentions = [];
  var mentionOrList;
  var mentionsOrLists = (0, _extractMentionsOrListsWithIndices["default"])(text);

  for (var i = 0; i < mentionsOrLists.length; i++) {
    mentionOrList = mentionsOrLists[i];

    if (mentionOrList.listSlug === '') {
      mentions.push({
        screenName: mentionOrList.screenName,
        indices: mentionOrList.indices
      });
    }
  }

  return mentions;
}

module.exports = exports.default;
},{"./extractMentionsOrListsWithIndices":128,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],130:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.match");

var _endMentionMatch = _interopRequireDefault(require("./regexp/endMentionMatch"));

var _validReply = _interopRequireDefault(require("./regexp/validReply"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text) {
  if (!text) {
    return null;
  }

  var possibleScreenName = text.match(_validReply["default"]);

  if (!possibleScreenName || RegExp.rightContext.match(_endMentionMatch["default"])) {
    return null;
  }

  return possibleScreenName[1];
}

module.exports = exports.default;
},{"./regexp/endMentionMatch":171,"./regexp/validReply":204,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.constructor":98,"core-js/modules/es6.regexp.match":101}],131:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractUrlsWithIndices = _interopRequireDefault(require("./extractUrlsWithIndices"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, options) {
  var urlsOnly = [];
  var urlsWithIndices = (0, _extractUrlsWithIndices["default"])(text, options);

  for (var i = 0; i < urlsWithIndices.length; i++) {
    urlsOnly.push(urlsWithIndices[i].url);
  }

  return urlsOnly;
}

module.exports = exports.default;
},{"./extractUrlsWithIndices":132,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],132:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.match");

var _extractUrl = _interopRequireDefault(require("./regexp/extractUrl"));

var _invalidUrlWithoutProtocolPrecedingChars = _interopRequireDefault(require("./regexp/invalidUrlWithoutProtocolPrecedingChars"));

var _idna = _interopRequireDefault(require("./lib/idna"));

var _validAsciiDomain = _interopRequireDefault(require("./regexp/validAsciiDomain"));

var _validTcoUrl = _interopRequireDefault(require("./regexp/validTcoUrl"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var DEFAULT_PROTOCOL = 'https://';
var DEFAULT_PROTOCOL_OPTIONS = {
  extractUrlsWithoutProtocol: true
};
var MAX_URL_LENGTH = 4096;
var MAX_TCO_SLUG_LENGTH = 40;

var extractUrlsWithIndices = function extractUrlsWithIndices(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PROTOCOL_OPTIONS;

  if (!text || (options.extractUrlsWithoutProtocol ? !text.match(/\./) : !text.match(/:/))) {
    return [];
  }

  var urls = [];

  var _loop = function _loop() {
    var before = RegExp.$2;
    var url = RegExp.$3;
    var protocol = RegExp.$4;
    var domain = RegExp.$5;
    var path = RegExp.$7;
    var endPosition = _extractUrl["default"].lastIndex;
    var startPosition = endPosition - url.length;

    if (!isValidUrl(url, protocol || DEFAULT_PROTOCOL, domain)) {
      return "continue";
    } // extract ASCII-only domains.


    if (!protocol) {
      if (!options.extractUrlsWithoutProtocol || before.match(_invalidUrlWithoutProtocolPrecedingChars["default"])) {
        return "continue";
      }

      var lastUrl = null;
      var asciiEndPosition = 0;
      domain.replace(_validAsciiDomain["default"], function (asciiDomain) {
        var asciiStartPosition = domain.indexOf(asciiDomain, asciiEndPosition);
        asciiEndPosition = asciiStartPosition + asciiDomain.length;
        lastUrl = {
          url: asciiDomain,
          indices: [startPosition + asciiStartPosition, startPosition + asciiEndPosition]
        };
        urls.push(lastUrl);
      }); // no ASCII-only domain found. Skip the entire URL.

      if (lastUrl == null) {
        return "continue";
      } // lastUrl only contains domain. Need to add path and query if they exist.


      if (path) {
        lastUrl.url = url.replace(domain, lastUrl.url);
        lastUrl.indices[1] = endPosition;
      }
    } else {
      // In the case of t.co URLs, don't allow additional path characters.
      if (url.match(_validTcoUrl["default"])) {
        var tcoUrlSlug = RegExp.$1;

        if (tcoUrlSlug && tcoUrlSlug.length > MAX_TCO_SLUG_LENGTH) {
          return "continue";
        } else {
          url = RegExp.lastMatch;
          endPosition = startPosition + url.length;
        }
      }

      urls.push({
        url: url,
        indices: [startPosition, endPosition]
      });
    }
  };

  while (_extractUrl["default"].exec(text)) {
    var _ret = _loop();

    if (_ret === "continue") continue;
  }

  return urls;
};

var isValidUrl = function isValidUrl(url, protocol, domain) {
  var urlLength = url.length;

  var punycodeEncodedDomain = _idna["default"].toAscii(domain);

  if (!punycodeEncodedDomain || !punycodeEncodedDomain.length) {
    return false;
  }

  urlLength = urlLength + punycodeEncodedDomain.length - domain.length;
  return protocol.length + urlLength <= MAX_URL_LENGTH;
};

var _default = extractUrlsWithIndices;
exports["default"] = _default;
module.exports = exports.default;
},{"./lib/idna":148,"./regexp/extractUrl":172,"./regexp/invalidUrlWithoutProtocolPrecedingChars":182,"./regexp/validAsciiDomain":191,"./regexp/validTcoUrl":206,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.array.index-of":88,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.constructor":98,"core-js/modules/es6.regexp.match":101,"core-js/modules/es6.regexp.replace":102}],133:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configs = _interopRequireDefault(require("./configs"));

var _extractUrlsWithIndices = _interopRequireDefault(require("./extractUrlsWithIndices"));

var _getCharacterWeight = _interopRequireDefault(require("./lib/getCharacterWeight"));

var _modifyIndicesFromUTF16ToUnicode = _interopRequireDefault(require("./modifyIndicesFromUTF16ToUnicode"));

var _nonBmpCodePairs = _interopRequireDefault(require("./regexp/nonBmpCodePairs"));

var _parseTweet = _interopRequireDefault(require("./parseTweet"));

var _urlHasHttps = _interopRequireDefault(require("./regexp/urlHasHttps"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var getTweetLength = function getTweetLength(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _configs["default"].defaults;
  return (0, _parseTweet["default"])(text, options).weightedLength;
};

var _default = getTweetLength;
exports["default"] = _default;
module.exports = exports.default;
},{"./configs":119,"./extractUrlsWithIndices":132,"./lib/getCharacterWeight":147,"./modifyIndicesFromUTF16ToUnicode":158,"./parseTweet":160,"./regexp/nonBmpCodePairs":184,"./regexp/urlHasHttps":189,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],134:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.replace");

var _nonBmpCodePairs = _interopRequireDefault(require("./regexp/nonBmpCodePairs"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

/**
 * Copied from https://github.com/twitter/twitter-text/blob/master/js/twitter-text.js
 */
function _default(text) {
  return text.replace(_nonBmpCodePairs["default"], ' ').length;
}

module.exports = exports.default;
},{"./regexp/nonBmpCodePairs":184,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.replace":102}],135:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _invalidChars = _interopRequireDefault(require("./regexp/invalidChars"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text) {
  return _invalidChars["default"].test(text);
}

module.exports = exports.default;
},{"./regexp/invalidChars":179,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],136:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _splitTags = _interopRequireDefault(require("./splitTags"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, hits, options) {
  var defaultHighlightTag = 'em';
  hits = hits || [];
  options = options || {};

  if (hits.length === 0) {
    return text;
  }

  var tagName = options.tag || defaultHighlightTag,
      tags = ["<".concat(tagName, ">"), "</".concat(tagName, ">")],
      chunks = (0, _splitTags["default"])(text),
      i,
      j,
      result = '',
      chunkIndex = 0,
      chunk = chunks[0],
      prevChunksLen = 0,
      chunkCursor = 0,
      startInChunk = false,
      chunkChars = chunk,
      flatHits = [],
      index,
      hit,
      tag,
      placed,
      hitSpot;

  for (i = 0; i < hits.length; i += 1) {
    for (j = 0; j < hits[i].length; j += 1) {
      flatHits.push(hits[i][j]);
    }
  }

  for (index = 0; index < flatHits.length; index += 1) {
    hit = flatHits[index];
    tag = tags[index % 2];
    placed = false;

    while (chunk != null && hit >= prevChunksLen + chunk.length) {
      result += chunkChars.slice(chunkCursor);

      if (startInChunk && hit === prevChunksLen + chunkChars.length) {
        result += tag;
        placed = true;
      }

      if (chunks[chunkIndex + 1]) {
        result += "<".concat(chunks[chunkIndex + 1], ">");
      }

      prevChunksLen += chunkChars.length;
      chunkCursor = 0;
      chunkIndex += 2;
      chunk = chunks[chunkIndex];
      chunkChars = chunk;
      startInChunk = false;
    }

    if (!placed && chunk != null) {
      hitSpot = hit - prevChunksLen;
      result += chunkChars.slice(chunkCursor, hitSpot) + tag;
      chunkCursor = hitSpot;

      if (index % 2 === 0) {
        startInChunk = true;
      } else {
        startInChunk = false;
      }
    } else if (!placed) {
      placed = true;
      result += tag;
    }
  }

  if (chunk != null) {
    if (chunkCursor < chunkChars.length) {
      result += chunkChars.slice(chunkCursor);
    }

    for (index = chunkIndex + 1; index < chunks.length; index += 1) {
      result += index % 2 === 0 ? chunks[index] : "<".concat(chunks[index], ">");
    }
  }

  return result;
}

module.exports = exports.default;
},{"./splitTags":241,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],137:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.replace");

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var HTML_ENTITIES = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#39;'
};

function _default(text) {
  return text && text.replace(/[&"'><]/g, function (character) {
    return HTML_ENTITIES[character];
  });
}

module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.replace":102}],138:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _autoLink = _interopRequireDefault(require("./autoLink"));

var _autoLinkCashtags = _interopRequireDefault(require("./autoLinkCashtags"));

var _autoLinkEntities = _interopRequireDefault(require("./autoLinkEntities"));

var _autoLinkHashtags = _interopRequireDefault(require("./autoLinkHashtags"));

var _autoLinkUrlsCustom = _interopRequireDefault(require("./autoLinkUrlsCustom"));

var _autoLinkUsernamesOrLists = _interopRequireDefault(require("./autoLinkUsernamesOrLists"));

var _autoLinkWithJSON = _interopRequireDefault(require("./autoLinkWithJSON"));

var _configs = _interopRequireDefault(require("./configs"));

var _convertUnicodeIndices = _interopRequireDefault(require("./convertUnicodeIndices"));

var _extractCashtags = _interopRequireDefault(require("./extractCashtags"));

var _extractCashtagsWithIndices = _interopRequireDefault(require("./extractCashtagsWithIndices"));

var _extractEntitiesWithIndices = _interopRequireDefault(require("./extractEntitiesWithIndices"));

var _extractHashtags = _interopRequireDefault(require("./extractHashtags"));

var _extractHashtagsWithIndices = _interopRequireDefault(require("./extractHashtagsWithIndices"));

var _extractHtmlAttrsFromOptions = _interopRequireDefault(require("./extractHtmlAttrsFromOptions"));

var _extractMentions = _interopRequireDefault(require("./extractMentions"));

var _extractMentionsOrListsWithIndices = _interopRequireDefault(require("./extractMentionsOrListsWithIndices"));

var _extractMentionsWithIndices = _interopRequireDefault(require("./extractMentionsWithIndices"));

var _extractReplies = _interopRequireDefault(require("./extractReplies"));

var _extractUrls = _interopRequireDefault(require("./extractUrls"));

var _extractUrlsWithIndices = _interopRequireDefault(require("./extractUrlsWithIndices"));

var _getTweetLength = _interopRequireDefault(require("./getTweetLength"));

var _getUnicodeTextLength = _interopRequireDefault(require("./getUnicodeTextLength"));

var _hasInvalidCharacters = _interopRequireDefault(require("./hasInvalidCharacters"));

var _hitHighlight = _interopRequireDefault(require("./hitHighlight"));

var _htmlEscape = _interopRequireDefault(require("./htmlEscape"));

var _isInvalidTweet = _interopRequireDefault(require("./isInvalidTweet"));

var _isValidHashtag = _interopRequireDefault(require("./isValidHashtag"));

var _isValidList = _interopRequireDefault(require("./isValidList"));

var _isValidTweetText = _interopRequireDefault(require("./isValidTweetText"));

var _isValidUrl = _interopRequireDefault(require("./isValidUrl"));

var _isValidUsername = _interopRequireDefault(require("./isValidUsername"));

var _linkTextWithEntity = _interopRequireDefault(require("./linkTextWithEntity"));

var _linkToCashtag = _interopRequireDefault(require("./linkToCashtag"));

var _linkToHashtag = _interopRequireDefault(require("./linkToHashtag"));

var _linkToMentionAndList = _interopRequireDefault(require("./linkToMentionAndList"));

var _linkToText = _interopRequireDefault(require("./linkToText"));

var _linkToTextWithSymbol = _interopRequireDefault(require("./linkToTextWithSymbol"));

var _linkToUrl = _interopRequireDefault(require("./linkToUrl"));

var _modifyIndicesFromUTF16ToUnicode = _interopRequireDefault(require("./modifyIndicesFromUTF16ToUnicode"));

var _modifyIndicesFromUnicodeToUTF = _interopRequireDefault(require("./modifyIndicesFromUnicodeToUTF16"));

var _index = _interopRequireDefault(require("./regexp/index"));

var _removeOverlappingEntities = _interopRequireDefault(require("./removeOverlappingEntities"));

var _parseTweet = _interopRequireDefault(require("./parseTweet"));

var _splitTags = _interopRequireDefault(require("./splitTags"));

var _standardizeIndices = _interopRequireDefault(require("./standardizeIndices"));

var _tagAttrs = _interopRequireDefault(require("./tagAttrs"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var _default = {
  autoLink: _autoLink["default"],
  autoLinkCashtags: _autoLinkCashtags["default"],
  autoLinkEntities: _autoLinkEntities["default"],
  autoLinkHashtags: _autoLinkHashtags["default"],
  autoLinkUrlsCustom: _autoLinkUrlsCustom["default"],
  autoLinkUsernamesOrLists: _autoLinkUsernamesOrLists["default"],
  autoLinkWithJSON: _autoLinkWithJSON["default"],
  configs: _configs["default"],
  convertUnicodeIndices: _convertUnicodeIndices["default"],
  extractCashtags: _extractCashtags["default"],
  extractCashtagsWithIndices: _extractCashtagsWithIndices["default"],
  extractEntitiesWithIndices: _extractEntitiesWithIndices["default"],
  extractHashtags: _extractHashtags["default"],
  extractHashtagsWithIndices: _extractHashtagsWithIndices["default"],
  extractHtmlAttrsFromOptions: _extractHtmlAttrsFromOptions["default"],
  extractMentions: _extractMentions["default"],
  extractMentionsOrListsWithIndices: _extractMentionsOrListsWithIndices["default"],
  extractMentionsWithIndices: _extractMentionsWithIndices["default"],
  extractReplies: _extractReplies["default"],
  extractUrls: _extractUrls["default"],
  extractUrlsWithIndices: _extractUrlsWithIndices["default"],
  getTweetLength: _getTweetLength["default"],
  getUnicodeTextLength: _getUnicodeTextLength["default"],
  hasInvalidCharacters: _hasInvalidCharacters["default"],
  hitHighlight: _hitHighlight["default"],
  htmlEscape: _htmlEscape["default"],
  isInvalidTweet: _isInvalidTweet["default"],
  isValidHashtag: _isValidHashtag["default"],
  isValidList: _isValidList["default"],
  isValidTweetText: _isValidTweetText["default"],
  isValidUrl: _isValidUrl["default"],
  isValidUsername: _isValidUsername["default"],
  linkTextWithEntity: _linkTextWithEntity["default"],
  linkToCashtag: _linkToCashtag["default"],
  linkToHashtag: _linkToHashtag["default"],
  linkToMentionAndList: _linkToMentionAndList["default"],
  linkToText: _linkToText["default"],
  linkToTextWithSymbol: _linkToTextWithSymbol["default"],
  linkToUrl: _linkToUrl["default"],
  modifyIndicesFromUTF16ToUnicode: _modifyIndicesFromUTF16ToUnicode["default"],
  modifyIndicesFromUnicodeToUTF16: _modifyIndicesFromUnicodeToUTF["default"],
  regexen: _index["default"],
  removeOverlappingEntities: _removeOverlappingEntities["default"],
  parseTweet: _parseTweet["default"],
  splitTags: _splitTags["default"],
  standardizeIndices: _standardizeIndices["default"],
  tagAttrs: _tagAttrs["default"]
};
exports["default"] = _default;
module.exports = exports.default;
},{"./autoLink":112,"./autoLinkCashtags":113,"./autoLinkEntities":114,"./autoLinkHashtags":115,"./autoLinkUrlsCustom":116,"./autoLinkUsernamesOrLists":117,"./autoLinkWithJSON":118,"./configs":119,"./convertUnicodeIndices":120,"./extractCashtags":121,"./extractCashtagsWithIndices":122,"./extractEntitiesWithIndices":123,"./extractHashtags":124,"./extractHashtagsWithIndices":125,"./extractHtmlAttrsFromOptions":126,"./extractMentions":127,"./extractMentionsOrListsWithIndices":128,"./extractMentionsWithIndices":129,"./extractReplies":130,"./extractUrls":131,"./extractUrlsWithIndices":132,"./getTweetLength":133,"./getUnicodeTextLength":134,"./hasInvalidCharacters":135,"./hitHighlight":136,"./htmlEscape":137,"./isInvalidTweet":139,"./isValidHashtag":140,"./isValidList":141,"./isValidTweetText":142,"./isValidUrl":143,"./isValidUsername":144,"./linkTextWithEntity":151,"./linkToCashtag":152,"./linkToHashtag":153,"./linkToMentionAndList":154,"./linkToText":155,"./linkToTextWithSymbol":156,"./linkToUrl":157,"./modifyIndicesFromUTF16ToUnicode":158,"./modifyIndicesFromUnicodeToUTF16":159,"./parseTweet":160,"./regexp/index":178,"./removeOverlappingEntities":240,"./splitTags":241,"./standardizeIndices":242,"./tagAttrs":243,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],139:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _configs = _interopRequireDefault(require("./configs"));

var _getTweetLength = _interopRequireDefault(require("./getTweetLength"));

var _hasInvalidCharacters = _interopRequireDefault(require("./hasInvalidCharacters"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _default(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _configs["default"].defaults;

  if (!text) {
    return 'empty';
  }

  var mergedOptions = _objectSpread({}, _configs["default"].defaults, {}, options);

  var maxLength = mergedOptions.maxWeightedTweetLength; // Determine max length independent of URL length

  if ((0, _getTweetLength["default"])(text, mergedOptions) > maxLength) {
    return 'too_long';
  }

  if ((0, _hasInvalidCharacters["default"])(text)) {
    return 'invalid_characters';
  }

  return false;
}

module.exports = exports.default;
},{"./configs":119,"./getTweetLength":133,"./hasInvalidCharacters":135,"@babel/runtime/helpers/defineProperty":1,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.array.filter":85,"core-js/modules/es6.array.for-each":86,"core-js/modules/es6.array.iterator":90,"core-js/modules/es6.object.define-properties":94,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.object.keys":96,"core-js/modules/es6.object.to-string":97,"core-js/modules/es6.symbol":106,"core-js/modules/es7.object.get-own-property-descriptors":107,"core-js/modules/web.dom.iterable":108}],140:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractHashtags = _interopRequireDefault(require("./extractHashtags"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(hashtag) {
  if (!hashtag) {
    return false;
  }

  var extracted = (0, _extractHashtags["default"])(hashtag); // Should extract the hashtag minus the # sign, hence the .slice(1)

  return extracted.length === 1 && extracted[0] === hashtag.slice(1);
}

module.exports = exports.default;
},{"./extractHashtags":124,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],141:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.match");

var _regexSupplant = _interopRequireDefault(require("./lib/regexSupplant"));

var _validMentionOrList = _interopRequireDefault(require("./regexp/validMentionOrList"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var VALID_LIST_RE = (0, _regexSupplant["default"])(/^#{validMentionOrList}$/, {
  validMentionOrList: _validMentionOrList["default"]
});

function _default(usernameList) {
  var match = usernameList.match(VALID_LIST_RE); // Must have matched and had nothing before or after

  return !!(match && match[1] == '' && match[4]);
}

module.exports = exports.default;
},{"./lib/regexSupplant":149,"./regexp/validMentionOrList":200,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.match":101}],142:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _isInvalidTweet = _interopRequireDefault(require("./isInvalidTweet"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, options) {
  return !(0, _isInvalidTweet["default"])(text, options);
}

module.exports = exports.default;
},{"./isInvalidTweet":139,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],143:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.match");

var _validateUrlAuthority = _interopRequireDefault(require("./regexp/validateUrlAuthority"));

var _validateUrlFragment = _interopRequireDefault(require("./regexp/validateUrlFragment"));

var _validateUrlPath = _interopRequireDefault(require("./regexp/validateUrlPath"));

var _validateUrlQuery = _interopRequireDefault(require("./regexp/validateUrlQuery"));

var _validateUrlScheme = _interopRequireDefault(require("./regexp/validateUrlScheme"));

var _validateUrlUnencoded = _interopRequireDefault(require("./regexp/validateUrlUnencoded"));

var _validateUrlUnicodeAuthority = _interopRequireDefault(require("./regexp/validateUrlUnicodeAuthority"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function isValidMatch(string, regex, optional) {
  if (!optional) {
    // RegExp["$&"] is the text of the last match
    // blank strings are ok, but are falsy, so we check stringiness instead of truthiness
    return typeof string === 'string' && string.match(regex) && RegExp['$&'] === string;
  } // RegExp["$&"] is the text of the last match


  return !string || string.match(regex) && RegExp['$&'] === string;
}

function _default(url, unicodeDomains, requireProtocol) {
  if (unicodeDomains == null) {
    unicodeDomains = true;
  }

  if (requireProtocol == null) {
    requireProtocol = true;
  }

  if (!url) {
    return false;
  }

  var urlParts = url.match(_validateUrlUnencoded["default"]);

  if (!urlParts || urlParts[0] !== url) {
    return false;
  }

  var scheme = urlParts[1],
      authority = urlParts[2],
      path = urlParts[3],
      query = urlParts[4],
      fragment = urlParts[5];

  if (!((!requireProtocol || isValidMatch(scheme, _validateUrlScheme["default"]) && scheme.match(/^https?$/i)) && isValidMatch(path, _validateUrlPath["default"]) && isValidMatch(query, _validateUrlQuery["default"], true) && isValidMatch(fragment, _validateUrlFragment["default"], true))) {
    return false;
  }

  return unicodeDomains && isValidMatch(authority, _validateUrlUnicodeAuthority["default"]) || !unicodeDomains && isValidMatch(authority, _validateUrlAuthority["default"]);
}

module.exports = exports.default;
},{"./regexp/validateUrlAuthority":213,"./regexp/validateUrlFragment":218,"./regexp/validateUrlPath":223,"./regexp/validateUrlQuery":227,"./regexp/validateUrlScheme":228,"./regexp/validateUrlUnencoded":231,"./regexp/validateUrlUnicodeAuthority":232,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.constructor":98,"core-js/modules/es6.regexp.match":101}],144:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extractMentions = _interopRequireDefault(require("./extractMentions"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(username) {
  if (!username) {
    return false;
  }

  var extracted = (0, _extractMentions["default"])(username); // Should extract the username minus the @ sign, hence the .slice(1)

  return extracted.length === 1 && extracted[0] === username.slice(1);
}

module.exports = exports.default;
},{"./extractMentions":127,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],145:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(o) {
  var r = {};

  for (var k in o) {
    if (o.hasOwnProperty(k)) {
      r[k] = o[k];
    }
  }

  return r;
}

module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],146:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.sort");

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

/**
 * Copied from https://github.com/twitter/twitter-text/blob/master/js/twitter-text.js
 */
var convertUnicodeIndices = function convertUnicodeIndices(text, entities, indicesInUTF16) {
  if (entities.length === 0) {
    return;
  }

  var charIndex = 0;
  var codePointIndex = 0; // sort entities by start index

  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });
  var entityIndex = 0;
  var entity = entities[0];

  while (charIndex < text.length) {
    if (entity.indices[0] === (indicesInUTF16 ? charIndex : codePointIndex)) {
      var len = entity.indices[1] - entity.indices[0];
      entity.indices[0] = indicesInUTF16 ? codePointIndex : charIndex;
      entity.indices[1] = entity.indices[0] + len;
      entityIndex++;

      if (entityIndex === entities.length) {
        // no more entity
        break;
      }

      entity = entities[entityIndex];
    }

    var c = text.charCodeAt(charIndex);

    if (c >= 0xd800 && c <= 0xdbff && charIndex < text.length - 1) {
      // Found high surrogate char
      c = text.charCodeAt(charIndex + 1);

      if (c >= 0xdc00 && c <= 0xdfff) {
        // Found surrogate pair
        charIndex++;
      }
    }

    codePointIndex++;
    charIndex++;
  }
};

var _default = convertUnicodeIndices;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.array.sort":92,"core-js/modules/es6.object.define-property":95}],147:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.is-array");

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var getCharacterWeight = function getCharacterWeight(ch, options) {
  var defaultWeight = options.defaultWeight,
      ranges = options.ranges;
  var weight = defaultWeight;
  var chCodePoint = ch.charCodeAt(0);

  if (Array.isArray(ranges)) {
    for (var i = 0, length = ranges.length; i < length; i++) {
      var currRange = ranges[i];

      if (chCodePoint >= currRange.start && chCodePoint <= currRange.end) {
        weight = currRange.weight;
        break;
      }
    }
  }

  return weight;
};

var _default = getCharacterWeight;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.array.is-array":89,"core-js/modules/es6.object.define-property":95}],148:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.match");

var _punycode = _interopRequireDefault(require("punycode"));

var _validAsciiDomain = _interopRequireDefault(require("../regexp/validAsciiDomain"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var MAX_DOMAIN_LABEL_LENGTH = 63;
var PUNYCODE_ENCODED_DOMAIN_PREFIX = 'xn--'; // This is an extremely lightweight implementation of domain name validation according to RFC 3490
// Our regexes handle most of the cases well enough
// See https://tools.ietf.org/html/rfc3490#section-4.1 for details

var idna = {
  toAscii: function toAscii(domain) {
    if (domain.substring(0, 4) === PUNYCODE_ENCODED_DOMAIN_PREFIX && !domain.match(_validAsciiDomain["default"])) {
      // Punycode encoded url cannot contain non ASCII characters
      return;
    }

    var labels = domain.split('.');

    for (var i = 0; i < labels.length; i++) {
      var label = labels[i];

      var punycodeEncodedLabel = _punycode["default"].toASCII(label);

      if (punycodeEncodedLabel.length < 1 || punycodeEncodedLabel.length > MAX_DOMAIN_LABEL_LENGTH) {
        // DNS label has invalid length
        return;
      }
    }

    return labels.join('.');
  }
};
var _default = idna;
exports["default"] = _default;
module.exports = exports.default;
},{"../regexp/validAsciiDomain":191,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.match":101,"core-js/modules/es6.regexp.split":103,"punycode":109}],149:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.array.index-of");

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Builds a RegExp
function _default(regex, map, flags) {
  flags = flags || '';

  if (typeof regex !== 'string') {
    if (regex.global && flags.indexOf('g') < 0) {
      flags += 'g';
    }

    if (regex.ignoreCase && flags.indexOf('i') < 0) {
      flags += 'i';
    }

    if (regex.multiline && flags.indexOf('m') < 0) {
      flags += 'm';
    }

    regex = regex.source;
  }

  return new RegExp(regex.replace(/#\{(\w+)\}/g, function (match, name) {
    var newRegex = map[name] || '';

    if (typeof newRegex !== 'string') {
      newRegex = newRegex.source;
    }

    return newRegex;
  }), flags);
}

module.exports = exports.default;
},{"core-js/modules/es6.array.index-of":88,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.constructor":98,"core-js/modules/es6.regexp.replace":102}],150:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.replace");

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// simple string interpolation
function _default(str, map) {
  return str.replace(/#\{(\w+)\}/g, function (match, name) {
    return map[name] || '';
  });
}

module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.replace":102}],151:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.replace");

var _htmlEscape = _interopRequireDefault(require("./htmlEscape"));

var _stringSupplant = _interopRequireDefault(require("./lib/stringSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(entity, options) {
  var displayUrl = entity.display_url;
  var expandedUrl = entity.expanded_url; // Goal: If a user copies and pastes a tweet containing t.co'ed link, the resulting paste
  // should contain the full original URL (expanded_url), not the display URL.
  //
  // Method: Whenever possible, we actually emit HTML that contains expanded_url, and use
  // font-size:0 to hide those parts that should not be displayed (because they are not part of display_url).
  // Elements with font-size:0 get copied even though they are not visible.
  // Note that display:none doesn't work here. Elements with display:none don't get copied.
  //
  // Additionally, we want to *display* ellipses, but we don't want them copied.  To make this happen we
  // wrap the ellipses in a tco-ellipsis class and provide an onCopy handler that sets display:none on
  // everything with the tco-ellipsis class.
  //
  // Exception: pic.twitter.com images, for which expandedUrl = "https://twitter.com/#!/username/status/1234/photo/1
  // For those URLs, display_url is not a substring of expanded_url, so we don't do anything special to render the elided parts.
  // For a pic.twitter.com URL, the only elided part will be the "https://", so this is fine.

  var displayUrlSansEllipses = displayUrl.replace(/…/g, ''); // We have to disregard ellipses for matching
  // Note: we currently only support eliding parts of the URL at the beginning or the end.
  // Eventually we may want to elide parts of the URL in the *middle*.  If so, this code will
  // become more complicated.  We will probably want to create a regexp out of display URL,
  // replacing every ellipsis with a ".*".

  if (expandedUrl.indexOf(displayUrlSansEllipses) != -1) {
    var displayUrlIndex = expandedUrl.indexOf(displayUrlSansEllipses);
    var v = {
      displayUrlSansEllipses: displayUrlSansEllipses,
      // Portion of expandedUrl that precedes the displayUrl substring
      beforeDisplayUrl: expandedUrl.substr(0, displayUrlIndex),
      // Portion of expandedUrl that comes after displayUrl
      afterDisplayUrl: expandedUrl.substr(displayUrlIndex + displayUrlSansEllipses.length),
      precedingEllipsis: displayUrl.match(/^…/) ? '…' : '',
      followingEllipsis: displayUrl.match(/…$/) ? '…' : ''
    };

    for (var k in v) {
      if (v.hasOwnProperty(k)) {
        v[k] = (0, _htmlEscape["default"])(v[k]);
      }
    } // As an example: The user tweets "hi http://longdomainname.com/foo"
    // This gets shortened to "hi http://t.co/xyzabc", with display_url = "…nname.com/foo"
    // This will get rendered as:
    // <span class='tco-ellipsis'> <!-- This stuff should get displayed but not copied -->
    //   …
    //   <!-- There's a chance the onCopy event handler might not fire. In case that happens,
    //        we include an &nbsp; here so that the … doesn't bump up against the URL and ruin it.
    //        The &nbsp; is inside the tco-ellipsis span so that when the onCopy handler *does*
    //        fire, it doesn't get copied.  Otherwise the copied text would have two spaces in a row,
    //        e.g. "hi  http://longdomainname.com/foo".
    //   <span style='font-size:0'>&nbsp;</span>
    // </span>
    // <span style='font-size:0'>  <!-- This stuff should get copied but not displayed -->
    //   http://longdomai
    // </span>
    // <span class='js-display-url'> <!-- This stuff should get displayed *and* copied -->
    //   nname.com/foo
    // </span>
    // <span class='tco-ellipsis'> <!-- This stuff should get displayed but not copied -->
    //   <span style='font-size:0'>&nbsp;</span>
    //   …
    // </span>


    v['invisible'] = options.invisibleTagAttrs;
    return (0, _stringSupplant["default"])("<span class='tco-ellipsis'>#{precedingEllipsis}<span #{invisible}>&nbsp;</span></span><span #{invisible}>#{beforeDisplayUrl}</span><span class='js-display-url'>#{displayUrlSansEllipses}</span><span #{invisible}>#{afterDisplayUrl}</span><span class='tco-ellipsis'><span #{invisible}>&nbsp;</span>#{followingEllipsis}</span>", v);
  }

  return displayUrl;
}

module.exports = exports.default;
},{"./htmlEscape":137,"./lib/stringSupplant":150,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.array.index-of":88,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.match":101,"core-js/modules/es6.regexp.replace":102}],152:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _clone = _interopRequireDefault(require("./lib/clone"));

var _htmlEscape = _interopRequireDefault(require("./htmlEscape"));

var _linkToTextWithSymbol = _interopRequireDefault(require("./linkToTextWithSymbol"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(entity, text, options) {
  var cashtag = (0, _htmlEscape["default"])(entity.cashtag);
  var attrs = (0, _clone["default"])(options.htmlAttrs || {});
  attrs.href = options.cashtagUrlBase + cashtag;
  attrs.title = "$".concat(cashtag);
  attrs['class'] = options.cashtagClass;

  if (options.targetBlank) {
    attrs.target = '_blank';
  }

  return (0, _linkToTextWithSymbol["default"])(entity, '$', cashtag, attrs, options);
}

module.exports = exports.default;
},{"./htmlEscape":137,"./lib/clone":145,"./linkToTextWithSymbol":156,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],153:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.match");

var _clone = _interopRequireDefault(require("./lib/clone"));

var _htmlEscape = _interopRequireDefault(require("./htmlEscape"));

var _rtlChars = _interopRequireDefault(require("./regexp/rtlChars"));

var _linkToTextWithSymbol = _interopRequireDefault(require("./linkToTextWithSymbol"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(entity, text, options) {
  var hash = text.substring(entity.indices[0], entity.indices[0] + 1);
  var hashtag = (0, _htmlEscape["default"])(entity.hashtag);
  var attrs = (0, _clone["default"])(options.htmlAttrs || {});
  attrs.href = options.hashtagUrlBase + hashtag;
  attrs.title = "#".concat(hashtag);
  attrs['class'] = options.hashtagClass;

  if (hashtag.charAt(0).match(_rtlChars["default"])) {
    attrs['class'] += ' rtl';
  }

  if (options.targetBlank) {
    attrs.target = '_blank';
  }

  return (0, _linkToTextWithSymbol["default"])(entity, hash, hashtag, attrs, options);
}

module.exports = exports.default;
},{"./htmlEscape":137,"./lib/clone":145,"./linkToTextWithSymbol":156,"./regexp/rtlChars":186,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.match":101}],154:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _clone = _interopRequireDefault(require("./lib/clone"));

var _htmlEscape = _interopRequireDefault(require("./htmlEscape"));

var _linkToTextWithSymbol = _interopRequireDefault(require("./linkToTextWithSymbol"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(entity, text, options) {
  var at = text.substring(entity.indices[0], entity.indices[0] + 1);
  var user = (0, _htmlEscape["default"])(entity.screenName);
  var slashListname = (0, _htmlEscape["default"])(entity.listSlug);
  var isList = entity.listSlug && !options.suppressLists;
  var attrs = (0, _clone["default"])(options.htmlAttrs || {});
  attrs['class'] = isList ? options.listClass : options.usernameClass;
  attrs.href = isList ? options.listUrlBase + user + slashListname : options.usernameUrlBase + user;

  if (!isList && !options.suppressDataScreenName) {
    attrs['data-screen-name'] = user;
  }

  if (options.targetBlank) {
    attrs.target = '_blank';
  }

  return (0, _linkToTextWithSymbol["default"])(entity, at, isList ? user + slashListname : user, attrs, options);
}

module.exports = exports.default;
},{"./htmlEscape":137,"./lib/clone":145,"./linkToTextWithSymbol":156,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],155:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _stringSupplant = _interopRequireDefault(require("./lib/stringSupplant"));

var _tagAttrs = _interopRequireDefault(require("./tagAttrs"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(entity, text, attributes, options) {
  if (!options.suppressNoFollow) {
    attributes.rel = 'nofollow';
  } // if linkAttributeBlock is specified, call it to modify the attributes


  if (options.linkAttributeBlock) {
    options.linkAttributeBlock(entity, attributes);
  } // if linkTextBlock is specified, call it to get a new/modified link text


  if (options.linkTextBlock) {
    text = options.linkTextBlock(entity, text);
  }

  var d = {
    text: text,
    attr: (0, _tagAttrs["default"])(attributes)
  };
  return (0, _stringSupplant["default"])('<a#{attr}>#{text}</a>', d);
}

module.exports = exports.default;
},{"./lib/stringSupplant":150,"./tagAttrs":243,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],156:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.match");

var _atSigns = _interopRequireDefault(require("./regexp/atSigns"));

var _htmlEscape = _interopRequireDefault(require("./htmlEscape"));

var _linkToText = _interopRequireDefault(require("./linkToText"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(entity, symbol, text, attributes, options) {
  var taggedSymbol = options.symbolTag ? "<".concat(options.symbolTag, ">").concat(symbol, "</").concat(options.symbolTag, ">") : symbol;
  text = (0, _htmlEscape["default"])(text);
  var taggedText = options.textWithSymbolTag ? "<".concat(options.textWithSymbolTag, ">").concat(text, "</").concat(options.textWithSymbolTag, ">") : text;

  if (options.usernameIncludeSymbol || !symbol.match(_atSigns["default"])) {
    return (0, _linkToText["default"])(entity, taggedSymbol + taggedText, attributes, options);
  } else {
    return taggedSymbol + (0, _linkToText["default"])(entity, taggedText, attributes, options);
  }
}

module.exports = exports.default;
},{"./htmlEscape":137,"./linkToText":155,"./regexp/atSigns":163,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.match":101}],157:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.match");

var _clone = _interopRequireDefault(require("./lib/clone"));

var _htmlEscape = _interopRequireDefault(require("./htmlEscape"));

var _linkToText = _interopRequireDefault(require("./linkToText"));

var _linkTextWithEntity = _interopRequireDefault(require("./linkTextWithEntity"));

var _urlHasProtocol = _interopRequireDefault(require("./regexp/urlHasProtocol"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(entity, text, options) {
  var url = entity.url;
  var displayUrl = url;
  var linkText = (0, _htmlEscape["default"])(displayUrl); // If the caller passed a urlEntities object (provided by a Twitter API
  // response with include_entities=true), we use that to render the display_url
  // for each URL instead of it's underlying t.co URL.

  var urlEntity = options.urlEntities && options.urlEntities[url] || entity;

  if (urlEntity.display_url) {
    linkText = (0, _linkTextWithEntity["default"])(urlEntity, options);
  }

  var attrs = (0, _clone["default"])(options.htmlAttrs || {});

  if (!url.match(_urlHasProtocol["default"])) {
    url = "http://".concat(url);
  }

  attrs.href = url;

  if (options.targetBlank) {
    attrs.target = '_blank';
  } // set class only if urlClass is specified.


  if (options.urlClass) {
    attrs['class'] = options.urlClass;
  } // set target only if urlTarget is specified.


  if (options.urlTarget) {
    attrs.target = options.urlTarget;
  }

  if (!options.title && urlEntity.display_url) {
    attrs.title = urlEntity.expanded_url;
  }

  return (0, _linkToText["default"])(entity, linkText, attrs, options);
}

module.exports = exports.default;
},{"./htmlEscape":137,"./lib/clone":145,"./linkTextWithEntity":151,"./linkToText":155,"./regexp/urlHasProtocol":190,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.match":101}],158:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _convertUnicodeIndices = _interopRequireDefault(require("./lib/convertUnicodeIndices"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, entities) {
  (0, _convertUnicodeIndices["default"])(text, entities, true);
}

module.exports = exports.default;
},{"./lib/convertUnicodeIndices":146,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],159:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _convertUnicodeIndices = _interopRequireDefault(require("./lib/convertUnicodeIndices"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(text, entities) {
  (0, _convertUnicodeIndices["default"])(text, entities, false);
}

module.exports = exports.default;
},{"./lib/convertUnicodeIndices":146,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],160:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _configs = _interopRequireDefault(require("./configs"));

var _extractUrlsWithIndices = _interopRequireDefault(require("./extractUrlsWithIndices"));

var _getCharacterWeight = _interopRequireDefault(require("./lib/getCharacterWeight"));

var _hasInvalidCharacters = _interopRequireDefault(require("./hasInvalidCharacters"));

var _modifyIndicesFromUTF16ToUnicode = _interopRequireDefault(require("./modifyIndicesFromUTF16ToUnicode"));

var _twemojiParser = require("twemoji-parser");

var _urlHasHttps = _interopRequireDefault(require("./regexp/urlHasHttps"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// TODO: WEB-19861 Replace with public package after it is open sourced

/**
 * [parseTweet description]
 * @param  {string} text tweet text to parse
 * @param  {Object} options config options to pass
 * @return {Object} Fields in response described below:
 *
 * Response fields:
 * weightedLength {int} the weighted length of tweet based on weights specified in the config
 * valid {bool} If tweet is valid
 * permillage {float} permillage of the tweet over the max length specified in config
 * validRangeStart {int} beginning of valid text
 * validRangeEnd {int} End index of valid part of the tweet text (inclusive) in utf16
 * displayRangeStart {int} beginning index of display text
 * displayRangeEnd {int} end index of display text (inclusive) in utf16
 */
var parseTweet = function parseTweet() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _configs["default"].defaults;
  var mergedOptions = Object.keys(options).length ? options : _configs["default"].defaults;
  var defaultWeight = mergedOptions.defaultWeight,
      emojiParsingEnabled = mergedOptions.emojiParsingEnabled,
      scale = mergedOptions.scale,
      maxWeightedTweetLength = mergedOptions.maxWeightedTweetLength,
      transformedURLLength = mergedOptions.transformedURLLength;
  var normalizedText = typeof String.prototype.normalize === 'function' ? text.normalize() : text; // Hash all entities by their startIndex for fast lookup

  var urlEntitiesMap = transformEntitiesToHash((0, _extractUrlsWithIndices["default"])(normalizedText));
  var emojiEntitiesMap = emojiParsingEnabled ? transformEntitiesToHash((0, _twemojiParser.parse)(normalizedText)) : [];
  var tweetLength = normalizedText.length;
  var weightedLength = 0;
  var validDisplayIndex = 0;
  var valid = true; // Go through every character and calculate weight

  for (var charIndex = 0; charIndex < tweetLength; charIndex++) {
    // If a url begins at the specified index handle, add constant length
    if (urlEntitiesMap[charIndex]) {
      var _urlEntitiesMap$charI = urlEntitiesMap[charIndex],
          url = _urlEntitiesMap$charI.url,
          indices = _urlEntitiesMap$charI.indices;
      weightedLength += transformedURLLength * scale;
      charIndex += url.length - 1;
    } else if (emojiParsingEnabled && emojiEntitiesMap[charIndex]) {
      var _emojiEntitiesMap$cha = emojiEntitiesMap[charIndex],
          emoji = _emojiEntitiesMap$cha.text,
          _indices = _emojiEntitiesMap$cha.indices;
      weightedLength += defaultWeight;
      charIndex += emoji.length - 1;
    } else {
      charIndex += isSurrogatePair(normalizedText, charIndex) ? 1 : 0;
      weightedLength += (0, _getCharacterWeight["default"])(normalizedText.charAt(charIndex), mergedOptions);
    } // Only test for validity of character if it is still valid


    if (valid) {
      valid = !(0, _hasInvalidCharacters["default"])(normalizedText.substring(charIndex, charIndex + 1));
    }

    if (valid && weightedLength <= maxWeightedTweetLength * scale) {
      validDisplayIndex = charIndex;
    }
  }

  weightedLength = weightedLength / scale;
  valid = valid && weightedLength > 0 && weightedLength <= maxWeightedTweetLength;
  var permillage = Math.floor(weightedLength / maxWeightedTweetLength * 1000);
  var normalizationOffset = text.length - normalizedText.length;
  validDisplayIndex += normalizationOffset;
  return {
    weightedLength: weightedLength,
    valid: valid,
    permillage: permillage,
    validRangeStart: 0,
    validRangeEnd: validDisplayIndex,
    displayRangeStart: 0,
    displayRangeEnd: text.length > 0 ? text.length - 1 : 0
  };
};

var transformEntitiesToHash = function transformEntitiesToHash(entities) {
  return entities.reduce(function (map, entity) {
    map[entity.indices[0]] = entity;
    return map;
  }, {});
};

var isSurrogatePair = function isSurrogatePair(text, cIndex) {
  // Test if a character is the beginning of a surrogate pair
  if (cIndex < text.length - 1) {
    var c = text.charCodeAt(cIndex);
    var cNext = text.charCodeAt(cIndex + 1);
    return 0xd800 <= c && c <= 0xdbff && 0xdc00 <= cNext && cNext <= 0xdfff;
  }

  return false;
};

var _default = parseTweet;
exports["default"] = _default;
module.exports = exports.default;
},{"./configs":119,"./extractUrlsWithIndices":132,"./hasInvalidCharacters":135,"./lib/getCharacterWeight":147,"./modifyIndicesFromUTF16ToUnicode":158,"./regexp/urlHasHttps":189,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.array.iterator":90,"core-js/modules/es6.array.reduce":91,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.object.keys":96,"core-js/modules/es6.object.to-string":97,"core-js/modules/web.dom.iterable":108,"twemoji-parser":110}],161:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Generated from unicode_regex/unicode_regex_groups.scala, same as objective c's \p{L}\p{M}
var astralLetterAndMarks = /\ud800[\udc00-\udc0b\udc0d-\udc26\udc28-\udc3a\udc3c\udc3d\udc3f-\udc4d\udc50-\udc5d\udc80-\udcfa\uddfd\ude80-\ude9c\udea0-\uded0\udee0\udf00-\udf1f\udf30-\udf40\udf42-\udf49\udf50-\udf7a\udf80-\udf9d\udfa0-\udfc3\udfc8-\udfcf]|\ud801[\udc00-\udc9d\udd00-\udd27\udd30-\udd63\ude00-\udf36\udf40-\udf55\udf60-\udf67]|\ud802[\udc00-\udc05\udc08\udc0a-\udc35\udc37\udc38\udc3c\udc3f-\udc55\udc60-\udc76\udc80-\udc9e\udd00-\udd15\udd20-\udd39\udd80-\uddb7\uddbe\uddbf\ude00-\ude03\ude05\ude06\ude0c-\ude13\ude15-\ude17\ude19-\ude33\ude38-\ude3a\ude3f\ude60-\ude7c\ude80-\ude9c\udec0-\udec7\udec9-\udee6\udf00-\udf35\udf40-\udf55\udf60-\udf72\udf80-\udf91]|\ud803[\udc00-\udc48]|\ud804[\udc00-\udc46\udc7f-\udcba\udcd0-\udce8\udd00-\udd34\udd50-\udd73\udd76\udd80-\uddc4\uddda\ude00-\ude11\ude13-\ude37\udeb0-\udeea\udf01-\udf03\udf05-\udf0c\udf0f\udf10\udf13-\udf28\udf2a-\udf30\udf32\udf33\udf35-\udf39\udf3c-\udf44\udf47\udf48\udf4b-\udf4d\udf57\udf5d-\udf63\udf66-\udf6c\udf70-\udf74]|\ud805[\udc80-\udcc5\udcc7\udd80-\uddb5\uddb8-\uddc0\ude00-\ude40\ude44\ude80-\udeb7]|\ud806[\udca0-\udcdf\udcff\udec0-\udef8]|\ud808[\udc00-\udf98]|\ud80c[\udc00-\udfff]|\ud80d[\udc00-\udc2e]|\ud81a[\udc00-\ude38\ude40-\ude5e\uded0-\udeed\udef0-\udef4\udf00-\udf36\udf40-\udf43\udf63-\udf77\udf7d-\udf8f]|\ud81b[\udf00-\udf44\udf50-\udf7e\udf8f-\udf9f]|\ud82c[\udc00\udc01]|\ud82f[\udc00-\udc6a\udc70-\udc7c\udc80-\udc88\udc90-\udc99\udc9d\udc9e]|\ud834[\udd65-\udd69\udd6d-\udd72\udd7b-\udd82\udd85-\udd8b\uddaa-\uddad\ude42-\ude44]|\ud835[\udc00-\udc54\udc56-\udc9c\udc9e\udc9f\udca2\udca5\udca6\udca9-\udcac\udcae-\udcb9\udcbb\udcbd-\udcc3\udcc5-\udd05\udd07-\udd0a\udd0d-\udd14\udd16-\udd1c\udd1e-\udd39\udd3b-\udd3e\udd40-\udd44\udd46\udd4a-\udd50\udd52-\udea5\udea8-\udec0\udec2-\udeda\udedc-\udefa\udefc-\udf14\udf16-\udf34\udf36-\udf4e\udf50-\udf6e\udf70-\udf88\udf8a-\udfa8\udfaa-\udfc2\udfc4-\udfcb]|\ud83a[\udc00-\udcc4\udcd0-\udcd6]|\ud83b[\ude00-\ude03\ude05-\ude1f\ude21\ude22\ude24\ude27\ude29-\ude32\ude34-\ude37\ude39\ude3b\ude42\ude47\ude49\ude4b\ude4d-\ude4f\ude51\ude52\ude54\ude57\ude59\ude5b\ude5d\ude5f\ude61\ude62\ude64\ude67-\ude6a\ude6c-\ude72\ude74-\ude77\ude79-\ude7c\ude7e\ude80-\ude89\ude8b-\ude9b\udea1-\udea3\udea5-\udea9\udeab-\udebb]|\ud840[\udc00-\udfff]|\ud841[\udc00-\udfff]|\ud842[\udc00-\udfff]|\ud843[\udc00-\udfff]|\ud844[\udc00-\udfff]|\ud845[\udc00-\udfff]|\ud846[\udc00-\udfff]|\ud847[\udc00-\udfff]|\ud848[\udc00-\udfff]|\ud849[\udc00-\udfff]|\ud84a[\udc00-\udfff]|\ud84b[\udc00-\udfff]|\ud84c[\udc00-\udfff]|\ud84d[\udc00-\udfff]|\ud84e[\udc00-\udfff]|\ud84f[\udc00-\udfff]|\ud850[\udc00-\udfff]|\ud851[\udc00-\udfff]|\ud852[\udc00-\udfff]|\ud853[\udc00-\udfff]|\ud854[\udc00-\udfff]|\ud855[\udc00-\udfff]|\ud856[\udc00-\udfff]|\ud857[\udc00-\udfff]|\ud858[\udc00-\udfff]|\ud859[\udc00-\udfff]|\ud85a[\udc00-\udfff]|\ud85b[\udc00-\udfff]|\ud85c[\udc00-\udfff]|\ud85d[\udc00-\udfff]|\ud85e[\udc00-\udfff]|\ud85f[\udc00-\udfff]|\ud860[\udc00-\udfff]|\ud861[\udc00-\udfff]|\ud862[\udc00-\udfff]|\ud863[\udc00-\udfff]|\ud864[\udc00-\udfff]|\ud865[\udc00-\udfff]|\ud866[\udc00-\udfff]|\ud867[\udc00-\udfff]|\ud868[\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|\ud86a[\udc00-\udfff]|\ud86b[\udc00-\udfff]|\ud86c[\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|\ud87e[\udc00-\ude1d]|\udb40[\udd00-\uddef]/;
var _default = astralLetterAndMarks;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],162:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var astralNumerals = /\ud801[\udca0-\udca9]|\ud804[\udc66-\udc6f\udcf0-\udcf9\udd36-\udd3f\uddd0-\uddd9\udef0-\udef9]|\ud805[\udcd0-\udcd9\ude50-\ude59\udec0-\udec9]|\ud806[\udce0-\udce9]|\ud81a[\ude60-\ude69\udf50-\udf59]|\ud835[\udfce-\udfff]/;
var _default = astralNumerals;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],163:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var atSigns = /[@＠]/;
var _default = atSigns;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],164:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Generated from unicode_regex/unicode_regex_groups.scala, same as objective c's \p{L}\p{M}
var bmpLetterAndMarks = /A-Za-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u052f\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u065f\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06ef\u06fa-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07ca-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0-\u08b2\u08e4-\u0963\u0971-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09f0\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a70-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0c00-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c81-\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0cf1\u0cf2\u0d01-\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u103f\u1050-\u108f\u109a-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16f1-\u16f8\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u180b-\u180d\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191e\u1920-\u192b\u1930-\u193b\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f\u1aa7\u1ab0-\u1abe\u1b00-\u1b4b\u1b6b-\u1b73\u1b80-\u1baf\u1bba-\u1bf3\u1c00-\u1c37\u1c4d-\u1c4f\u1c5a-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1cf8\u1cf9\u1d00-\u1df5\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u20d0-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2183\u2184\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005\u3006\u302a-\u302f\u3031-\u3035\u303b\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua672\ua674-\ua67d\ua67f-\ua69d\ua69f-\ua6e5\ua6f0\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua7ad\ua7b0\ua7b1\ua7f7-\ua827\ua840-\ua873\ua880-\ua8c4\ua8e0-\ua8f7\ua8fb\ua90a-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf\ua9e0-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa36\uaa40-\uaa4d\uaa60-\uaa76\uaa7a-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab5f\uab64\uab65\uabc0-\uabea\uabec\uabed\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf870-\uf87f\uf882\uf884-\uf89f\uf8b8\uf8c1-\uf8d6\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe2d\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc/;
var _default = bmpLetterAndMarks;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],165:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var bmpNumerals = /0-9\u0660-\u0669\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0de6-\u0def\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\ua9f0-\ua9f9\uaa50-\uaa59\uabf0-\uabf9\uff10-\uff19/;
var _default = bmpNumerals;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],166:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var cashtag = /[a-z]{1,6}(?:[._][a-z]{1,2})?/i;
var _default = cashtag;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],167:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var codePoint = /(?:[^\uD800-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF])/;
var _default = codePoint;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],168:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var cyrillicLettersAndMarks = /\u0400-\u04FF/;
var _default = cyrillicLettersAndMarks;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],169:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var directionalMarkersGroup = /\u202A-\u202E\u061C\u200E\u200F\u2066\u2067\u2068\u2069/;
var _default = directionalMarkersGroup;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],170:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hashSigns = _interopRequireDefault(require("./hashSigns"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var endHashtagMatch = (0, _regexSupplant["default"])(/^(?:#{hashSigns}|:\/\/)/, {
  hashSigns: _hashSigns["default"]
});
var _default = endHashtagMatch;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./hashSigns":173,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],171:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _atSigns = _interopRequireDefault(require("./atSigns"));

var _latinAccentChars = _interopRequireDefault(require("./latinAccentChars"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var endMentionMatch = (0, _regexSupplant["default"])(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/, {
  atSigns: _atSigns["default"],
  latinAccentChars: _latinAccentChars["default"]
});
var _default = endMentionMatch;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./atSigns":163,"./latinAccentChars":183,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],172:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validDomain = _interopRequireDefault(require("./validDomain"));

var _validPortNumber = _interopRequireDefault(require("./validPortNumber"));

var _validUrlPath = _interopRequireDefault(require("./validUrlPath"));

var _validUrlPrecedingChars = _interopRequireDefault(require("./validUrlPrecedingChars"));

var _validUrlQueryChars = _interopRequireDefault(require("./validUrlQueryChars"));

var _validUrlQueryEndingChars = _interopRequireDefault(require("./validUrlQueryEndingChars"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var extractUrl = (0, _regexSupplant["default"])('(' + // $1 total match
'(#{validUrlPrecedingChars})' + // $2 Preceeding chracter
'(' + // $3 URL
'(https?:\\/\\/)?' + // $4 Protocol (optional)
'(#{validDomain})' + // $5 Domain(s)
'(?::(#{validPortNumber}))?' + // $6 Port number (optional)
'(\\/#{validUrlPath}*)?' + // $7 URL Path
'(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?' + // $8 Query String
')' + ')', {
  validUrlPrecedingChars: _validUrlPrecedingChars["default"],
  validDomain: _validDomain["default"],
  validPortNumber: _validPortNumber["default"],
  validUrlPath: _validUrlPath["default"],
  validUrlQueryChars: _validUrlQueryChars["default"],
  validUrlQueryEndingChars: _validUrlQueryEndingChars["default"]
}, 'gi');
var _default = extractUrl;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validDomain":194,"./validPortNumber":202,"./validUrlPath":208,"./validUrlPrecedingChars":210,"./validUrlQueryChars":211,"./validUrlQueryEndingChars":212,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],173:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var hashSigns = /[#＃]/;
var _default = hashSigns;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],174:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _astralLetterAndMarks = _interopRequireDefault(require("./astralLetterAndMarks"));

var _bmpLetterAndMarks = _interopRequireDefault(require("./bmpLetterAndMarks"));

var _nonBmpCodePairs = _interopRequireDefault(require("./nonBmpCodePairs"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// A hashtag must contain at least one unicode letter or mark, as well as numbers, underscores, and select special characters.
var hashtagAlpha = (0, _regexSupplant["default"])(/(?:[#{bmpLetterAndMarks}]|(?=#{nonBmpCodePairs})(?:#{astralLetterAndMarks}))/, {
  bmpLetterAndMarks: _bmpLetterAndMarks["default"],
  nonBmpCodePairs: _nonBmpCodePairs["default"],
  astralLetterAndMarks: _astralLetterAndMarks["default"]
});
var _default = hashtagAlpha;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./astralLetterAndMarks":161,"./bmpLetterAndMarks":164,"./nonBmpCodePairs":184,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],175:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _astralLetterAndMarks = _interopRequireDefault(require("./astralLetterAndMarks"));

var _astralNumerals = _interopRequireDefault(require("./astralNumerals"));

var _bmpLetterAndMarks = _interopRequireDefault(require("./bmpLetterAndMarks"));

var _bmpNumerals = _interopRequireDefault(require("./bmpNumerals"));

var _hashtagSpecialChars = _interopRequireDefault(require("./hashtagSpecialChars"));

var _nonBmpCodePairs = _interopRequireDefault(require("./nonBmpCodePairs"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var hashtagAlphaNumeric = (0, _regexSupplant["default"])(/(?:[#{bmpLetterAndMarks}#{bmpNumerals}#{hashtagSpecialChars}]|(?=#{nonBmpCodePairs})(?:#{astralLetterAndMarks}|#{astralNumerals}))/, {
  bmpLetterAndMarks: _bmpLetterAndMarks["default"],
  bmpNumerals: _bmpNumerals["default"],
  hashtagSpecialChars: _hashtagSpecialChars["default"],
  nonBmpCodePairs: _nonBmpCodePairs["default"],
  astralLetterAndMarks: _astralLetterAndMarks["default"],
  astralNumerals: _astralNumerals["default"]
});
var _default = hashtagAlphaNumeric;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./astralLetterAndMarks":161,"./astralNumerals":162,"./bmpLetterAndMarks":164,"./bmpNumerals":165,"./hashtagSpecialChars":177,"./nonBmpCodePairs":184,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],176:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _codePoint = _interopRequireDefault(require("./codePoint"));

var _hashtagAlphaNumeric = _interopRequireDefault(require("./hashtagAlphaNumeric"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var hashtagBoundary = (0, _regexSupplant["default"])(/(?:^|\uFE0E|\uFE0F|$|(?!#{hashtagAlphaNumeric}|&)#{codePoint})/, {
  codePoint: _codePoint["default"],
  hashtagAlphaNumeric: _hashtagAlphaNumeric["default"]
});
var _default = hashtagBoundary;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./codePoint":167,"./hashtagAlphaNumeric":175,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],177:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var hashtagSpecialChars = /_\u200c\u200d\ua67e\u05be\u05f3\u05f4\uff5e\u301c\u309b\u309c\u30a0\u30fb\u3003\u0f0b\u0f0c\xb7/;
var _default = hashtagSpecialChars;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],178:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _astralLetterAndMarks = _interopRequireDefault(require("./astralLetterAndMarks"));

var _astralNumerals = _interopRequireDefault(require("./astralNumerals"));

var _atSigns = _interopRequireDefault(require("./atSigns"));

var _bmpLetterAndMarks = _interopRequireDefault(require("./bmpLetterAndMarks"));

var _bmpNumerals = _interopRequireDefault(require("./bmpNumerals"));

var _cashtag = _interopRequireDefault(require("./cashtag"));

var _codePoint = _interopRequireDefault(require("./codePoint"));

var _cyrillicLettersAndMarks = _interopRequireDefault(require("./cyrillicLettersAndMarks"));

var _endHashtagMatch = _interopRequireDefault(require("./endHashtagMatch"));

var _endMentionMatch = _interopRequireDefault(require("./endMentionMatch"));

var _extractUrl = _interopRequireDefault(require("./extractUrl"));

var _hashSigns = _interopRequireDefault(require("./hashSigns"));

var _hashtagAlpha = _interopRequireDefault(require("./hashtagAlpha"));

var _hashtagAlphaNumeric = _interopRequireDefault(require("./hashtagAlphaNumeric"));

var _hashtagBoundary = _interopRequireDefault(require("./hashtagBoundary"));

var _hashtagSpecialChars = _interopRequireDefault(require("./hashtagSpecialChars"));

var _invalidChars = _interopRequireDefault(require("./invalidChars"));

var _invalidCharsGroup = _interopRequireDefault(require("./invalidCharsGroup"));

var _invalidDomainChars = _interopRequireDefault(require("./invalidDomainChars"));

var _invalidUrlWithoutProtocolPrecedingChars = _interopRequireDefault(require("./invalidUrlWithoutProtocolPrecedingChars"));

var _latinAccentChars = _interopRequireDefault(require("./latinAccentChars"));

var _nonBmpCodePairs = _interopRequireDefault(require("./nonBmpCodePairs"));

var _punct = _interopRequireDefault(require("./punct"));

var _rtlChars = _interopRequireDefault(require("./rtlChars"));

var _spaces = _interopRequireDefault(require("./spaces"));

var _spacesGroup = _interopRequireDefault(require("./spacesGroup"));

var _urlHasHttps = _interopRequireDefault(require("./urlHasHttps"));

var _urlHasProtocol = _interopRequireDefault(require("./urlHasProtocol"));

var _validAsciiDomain = _interopRequireDefault(require("./validAsciiDomain"));

var _validateUrlAuthority = _interopRequireDefault(require("./validateUrlAuthority"));

var _validateUrlDecOctet = _interopRequireDefault(require("./validateUrlDecOctet"));

var _validateUrlDomain = _interopRequireDefault(require("./validateUrlDomain"));

var _validateUrlDomainSegment = _interopRequireDefault(require("./validateUrlDomainSegment"));

var _validateUrlDomainTld = _interopRequireDefault(require("./validateUrlDomainTld"));

var _validateUrlFragment = _interopRequireDefault(require("./validateUrlFragment"));

var _validateUrlHost = _interopRequireDefault(require("./validateUrlHost"));

var _validateUrlIp = _interopRequireDefault(require("./validateUrlIp"));

var _validateUrlIpv = _interopRequireDefault(require("./validateUrlIpv4"));

var _validateUrlIpv2 = _interopRequireDefault(require("./validateUrlIpv6"));

var _validateUrlPath = _interopRequireDefault(require("./validateUrlPath"));

var _validateUrlPchar = _interopRequireDefault(require("./validateUrlPchar"));

var _validateUrlPctEncoded = _interopRequireDefault(require("./validateUrlPctEncoded"));

var _validateUrlPort = _interopRequireDefault(require("./validateUrlPort"));

var _validateUrlQuery = _interopRequireDefault(require("./validateUrlQuery"));

var _validateUrlScheme = _interopRequireDefault(require("./validateUrlScheme"));

var _validateUrlSubDelims = _interopRequireDefault(require("./validateUrlSubDelims"));

var _validateUrlSubDomainSegment = _interopRequireDefault(require("./validateUrlSubDomainSegment"));

var _validateUrlUnencoded = _interopRequireDefault(require("./validateUrlUnencoded"));

var _validateUrlUnicodeAuthority = _interopRequireDefault(require("./validateUrlUnicodeAuthority"));

var _validateUrlUnicodeDomain = _interopRequireDefault(require("./validateUrlUnicodeDomain"));

var _validateUrlUnicodeDomainSegment = _interopRequireDefault(require("./validateUrlUnicodeDomainSegment"));

var _validateUrlUnicodeDomainTld = _interopRequireDefault(require("./validateUrlUnicodeDomainTld"));

var _validateUrlUnicodeHost = _interopRequireDefault(require("./validateUrlUnicodeHost"));

var _validateUrlUnicodeSubDomainSegment = _interopRequireDefault(require("./validateUrlUnicodeSubDomainSegment"));

var _validateUrlUnreserved = _interopRequireDefault(require("./validateUrlUnreserved"));

var _validateUrlUserinfo = _interopRequireDefault(require("./validateUrlUserinfo"));

var _validCashtag = _interopRequireDefault(require("./validCashtag"));

var _validCCTLD = _interopRequireDefault(require("./validCCTLD"));

var _validDomain = _interopRequireDefault(require("./validDomain"));

var _validDomainChars = _interopRequireDefault(require("./validDomainChars"));

var _validDomainName = _interopRequireDefault(require("./validDomainName"));

var _validGeneralUrlPathChars = _interopRequireDefault(require("./validGeneralUrlPathChars"));

var _validGTLD = _interopRequireDefault(require("./validGTLD"));

var _validHashtag = _interopRequireDefault(require("./validHashtag"));

var _validMentionOrList = _interopRequireDefault(require("./validMentionOrList"));

var _validMentionPrecedingChars = _interopRequireDefault(require("./validMentionPrecedingChars"));

var _validPortNumber = _interopRequireDefault(require("./validPortNumber"));

var _validPunycode = _interopRequireDefault(require("./validPunycode"));

var _validReply = _interopRequireDefault(require("./validReply"));

var _validSubdomain = _interopRequireDefault(require("./validSubdomain"));

var _validTcoUrl = _interopRequireDefault(require("./validTcoUrl"));

var _validUrlBalancedParens = _interopRequireDefault(require("./validUrlBalancedParens"));

var _validUrlPath = _interopRequireDefault(require("./validUrlPath"));

var _validUrlPathEndingChars = _interopRequireDefault(require("./validUrlPathEndingChars"));

var _validUrlPrecedingChars = _interopRequireDefault(require("./validUrlPrecedingChars"));

var _validUrlQueryChars = _interopRequireDefault(require("./validUrlQueryChars"));

var _validUrlQueryEndingChars = _interopRequireDefault(require("./validUrlQueryEndingChars"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var _default = {
  astralLetterAndMarks: _astralLetterAndMarks["default"],
  astralNumerals: _astralNumerals["default"],
  atSigns: _atSigns["default"],
  bmpLetterAndMarks: _bmpLetterAndMarks["default"],
  bmpNumerals: _bmpNumerals["default"],
  cashtag: _cashtag["default"],
  codePoint: _codePoint["default"],
  cyrillicLettersAndMarks: _cyrillicLettersAndMarks["default"],
  endHashtagMatch: _endHashtagMatch["default"],
  endMentionMatch: _endMentionMatch["default"],
  extractUrl: _extractUrl["default"],
  hashSigns: _hashSigns["default"],
  hashtagAlpha: _hashtagAlpha["default"],
  hashtagAlphaNumeric: _hashtagAlphaNumeric["default"],
  hashtagBoundary: _hashtagBoundary["default"],
  hashtagSpecialChars: _hashtagSpecialChars["default"],
  invalidChars: _invalidChars["default"],
  invalidCharsGroup: _invalidCharsGroup["default"],
  invalidDomainChars: _invalidDomainChars["default"],
  invalidUrlWithoutProtocolPrecedingChars: _invalidUrlWithoutProtocolPrecedingChars["default"],
  latinAccentChars: _latinAccentChars["default"],
  nonBmpCodePairs: _nonBmpCodePairs["default"],
  punct: _punct["default"],
  rtlChars: _rtlChars["default"],
  spaces: _spaces["default"],
  spacesGroup: _spacesGroup["default"],
  urlHasHttps: _urlHasHttps["default"],
  urlHasProtocol: _urlHasProtocol["default"],
  validAsciiDomain: _validAsciiDomain["default"],
  validateUrlAuthority: _validateUrlAuthority["default"],
  validateUrlDecOctet: _validateUrlDecOctet["default"],
  validateUrlDomain: _validateUrlDomain["default"],
  validateUrlDomainSegment: _validateUrlDomainSegment["default"],
  validateUrlDomainTld: _validateUrlDomainTld["default"],
  validateUrlFragment: _validateUrlFragment["default"],
  validateUrlHost: _validateUrlHost["default"],
  validateUrlIp: _validateUrlIp["default"],
  validateUrlIpv4: _validateUrlIpv["default"],
  validateUrlIpv6: _validateUrlIpv2["default"],
  validateUrlPath: _validateUrlPath["default"],
  validateUrlPchar: _validateUrlPchar["default"],
  validateUrlPctEncoded: _validateUrlPctEncoded["default"],
  validateUrlPort: _validateUrlPort["default"],
  validateUrlQuery: _validateUrlQuery["default"],
  validateUrlScheme: _validateUrlScheme["default"],
  validateUrlSubDelims: _validateUrlSubDelims["default"],
  validateUrlSubDomainSegment: _validateUrlSubDomainSegment["default"],
  validateUrlUnencoded: _validateUrlUnencoded["default"],
  validateUrlUnicodeAuthority: _validateUrlUnicodeAuthority["default"],
  validateUrlUnicodeDomain: _validateUrlUnicodeDomain["default"],
  validateUrlUnicodeDomainSegment: _validateUrlUnicodeDomainSegment["default"],
  validateUrlUnicodeDomainTld: _validateUrlUnicodeDomainTld["default"],
  validateUrlUnicodeHost: _validateUrlUnicodeHost["default"],
  validateUrlUnicodeSubDomainSegment: _validateUrlUnicodeSubDomainSegment["default"],
  validateUrlUnreserved: _validateUrlUnreserved["default"],
  validateUrlUserinfo: _validateUrlUserinfo["default"],
  validCashtag: _validCashtag["default"],
  validCCTLD: _validCCTLD["default"],
  validDomain: _validDomain["default"],
  validDomainChars: _validDomainChars["default"],
  validDomainName: _validDomainName["default"],
  validGeneralUrlPathChars: _validGeneralUrlPathChars["default"],
  validGTLD: _validGTLD["default"],
  validHashtag: _validHashtag["default"],
  validMentionOrList: _validMentionOrList["default"],
  validMentionPrecedingChars: _validMentionPrecedingChars["default"],
  validPortNumber: _validPortNumber["default"],
  validPunycode: _validPunycode["default"],
  validReply: _validReply["default"],
  validSubdomain: _validSubdomain["default"],
  validTcoUrl: _validTcoUrl["default"],
  validUrlBalancedParens: _validUrlBalancedParens["default"],
  validUrlPath: _validUrlPath["default"],
  validUrlPathEndingChars: _validUrlPathEndingChars["default"],
  validUrlPrecedingChars: _validUrlPrecedingChars["default"],
  validUrlQueryChars: _validUrlQueryChars["default"],
  validUrlQueryEndingChars: _validUrlQueryEndingChars["default"]
};
exports["default"] = _default;
module.exports = exports.default;
},{"./astralLetterAndMarks":161,"./astralNumerals":162,"./atSigns":163,"./bmpLetterAndMarks":164,"./bmpNumerals":165,"./cashtag":166,"./codePoint":167,"./cyrillicLettersAndMarks":168,"./endHashtagMatch":170,"./endMentionMatch":171,"./extractUrl":172,"./hashSigns":173,"./hashtagAlpha":174,"./hashtagAlphaNumeric":175,"./hashtagBoundary":176,"./hashtagSpecialChars":177,"./invalidChars":179,"./invalidCharsGroup":180,"./invalidDomainChars":181,"./invalidUrlWithoutProtocolPrecedingChars":182,"./latinAccentChars":183,"./nonBmpCodePairs":184,"./punct":185,"./rtlChars":186,"./spaces":187,"./spacesGroup":188,"./urlHasHttps":189,"./urlHasProtocol":190,"./validAsciiDomain":191,"./validCCTLD":192,"./validCashtag":193,"./validDomain":194,"./validDomainChars":195,"./validDomainName":196,"./validGTLD":197,"./validGeneralUrlPathChars":198,"./validHashtag":199,"./validMentionOrList":200,"./validMentionPrecedingChars":201,"./validPortNumber":202,"./validPunycode":203,"./validReply":204,"./validSubdomain":205,"./validTcoUrl":206,"./validUrlBalancedParens":207,"./validUrlPath":208,"./validUrlPathEndingChars":209,"./validUrlPrecedingChars":210,"./validUrlQueryChars":211,"./validUrlQueryEndingChars":212,"./validateUrlAuthority":213,"./validateUrlDecOctet":214,"./validateUrlDomain":215,"./validateUrlDomainSegment":216,"./validateUrlDomainTld":217,"./validateUrlFragment":218,"./validateUrlHost":219,"./validateUrlIp":220,"./validateUrlIpv4":221,"./validateUrlIpv6":222,"./validateUrlPath":223,"./validateUrlPchar":224,"./validateUrlPctEncoded":225,"./validateUrlPort":226,"./validateUrlQuery":227,"./validateUrlScheme":228,"./validateUrlSubDelims":229,"./validateUrlSubDomainSegment":230,"./validateUrlUnencoded":231,"./validateUrlUnicodeAuthority":232,"./validateUrlUnicodeDomain":233,"./validateUrlUnicodeDomainSegment":234,"./validateUrlUnicodeDomainTld":235,"./validateUrlUnicodeHost":236,"./validateUrlUnicodeSubDomainSegment":237,"./validateUrlUnreserved":238,"./validateUrlUserinfo":239,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],179:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _invalidCharsGroup = _interopRequireDefault(require("./invalidCharsGroup"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var invalidChars = (0, _regexSupplant["default"])(/[#{invalidCharsGroup}]/, {
  invalidCharsGroup: _invalidCharsGroup["default"]
});
var _default = invalidChars;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./invalidCharsGroup":180,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],180:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var invalidCharsGroup = /\uFFFE\uFEFF\uFFFF/;
var _default = invalidCharsGroup;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],181:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _directionalMarkersGroup = _interopRequireDefault(require("./directionalMarkersGroup"));

var _invalidCharsGroup = _interopRequireDefault(require("./invalidCharsGroup"));

var _punct = _interopRequireDefault(require("./punct"));

var _spacesGroup = _interopRequireDefault(require("./spacesGroup"));

var _stringSupplant = _interopRequireDefault(require("../lib/stringSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var invalidDomainChars = (0, _stringSupplant["default"])('#{punct}#{spacesGroup}#{invalidCharsGroup}#{directionalMarkersGroup}', {
  punct: _punct["default"],
  spacesGroup: _spacesGroup["default"],
  invalidCharsGroup: _invalidCharsGroup["default"],
  directionalMarkersGroup: _directionalMarkersGroup["default"]
});
var _default = invalidDomainChars;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/stringSupplant":150,"./directionalMarkersGroup":169,"./invalidCharsGroup":180,"./punct":185,"./spacesGroup":188,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],182:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var invalidUrlWithoutProtocolPrecedingChars = /[-_.\/]$/;
var _default = invalidUrlWithoutProtocolPrecedingChars;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],183:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var latinAccentChars = /\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0100-\u024F\u0253\u0254\u0256\u0257\u0259\u025B\u0263\u0268\u026F\u0272\u0289\u028B\u02BB\u0300-\u036F\u1E00-\u1EFF/;
var _default = latinAccentChars;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],184:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var nonBmpCodePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/gm;
var _default = nonBmpCodePairs;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],185:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var punct = /\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/;
var _default = punct;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],186:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var rtlChars = /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/gm;
var _default = rtlChars;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],187:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _spacesGroup = _interopRequireDefault(require("./spacesGroup"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var _default = (0, _regexSupplant["default"])(/[#{spacesGroup}]/, {
  spacesGroup: _spacesGroup["default"]
});

exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./spacesGroup":188,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],188:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var spacesGroup = /\x09-\x0D\x20\x85\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000/;
var _default = spacesGroup;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],189:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var urlHasHttps = /^https:\/\//i;
var _default = urlHasHttps;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],190:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var urlHasProtocol = /^https?:\/\//i;
var _default = urlHasProtocol;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],191:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _latinAccentChars = _interopRequireDefault(require("./latinAccentChars"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validCCTLD = _interopRequireDefault(require("./validCCTLD"));

var _validGTLD = _interopRequireDefault(require("./validGTLD"));

var _validPunycode = _interopRequireDefault(require("./validPunycode"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validAsciiDomain = (0, _regexSupplant["default"])(/(?:(?:[\-a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi, {
  latinAccentChars: _latinAccentChars["default"],
  validGTLD: _validGTLD["default"],
  validCCTLD: _validCCTLD["default"],
  validPunycode: _validPunycode["default"]
});
var _default = validAsciiDomain;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./latinAccentChars":183,"./validCCTLD":192,"./validGTLD":197,"./validPunycode":203,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],192:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.constructor");

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validCCTLD = (0, _regexSupplant["default"])(RegExp('(?:(?:' + '한국|香港|澳門|新加坡|台灣|台湾|中國|中国|გე|ລາວ|ไทย|ලංකා|ഭാരതം|ಭಾರತ|భారత్|சிங்கப்பூர்|இலங்கை|இந்தியா|ଭାରତ|' + 'ભારત|ਭਾਰਤ|ভাৰত|ভারত|বাংলা|भारोत|भारतम्|भारत|ڀارت|پاکستان|موريتانيا|مليسيا|مصر|قطر|فلسطين|عمان|' + 'عراق|سورية|سودان|تونس|بھارت|بارت|ایران|امارات|المغرب|السعودية|الجزائر|البحرين|الاردن|հայ|қаз|' + 'укр|срб|рф|мон|мкд|ею|бел|бг|ευ|ελ|zw|zm|za|yt|ye|ws|wf|vu|vn|vi|vg|ve|vc|va|uz|uy|us|um|uk|' + 'ug|ua|tz|tw|tv|tt|tr|tp|to|tn|tm|tl|tk|tj|th|tg|tf|td|tc|sz|sy|sx|sv|su|st|ss|sr|so|sn|sm|sl|' + 'sk|sj|si|sh|sg|se|sd|sc|sb|sa|rw|ru|rs|ro|re|qa|py|pw|pt|ps|pr|pn|pm|pl|pk|ph|pg|pf|pe|pa|om|' + 'nz|nu|nr|np|no|nl|ni|ng|nf|ne|nc|na|mz|my|mx|mw|mv|mu|mt|ms|mr|mq|mp|mo|mn|mm|ml|mk|mh|mg|mf|' + 'me|md|mc|ma|ly|lv|lu|lt|ls|lr|lk|li|lc|lb|la|kz|ky|kw|kr|kp|kn|km|ki|kh|kg|ke|jp|jo|jm|je|it|' + 'is|ir|iq|io|in|im|il|ie|id|hu|ht|hr|hn|hm|hk|gy|gw|gu|gt|gs|gr|gq|gp|gn|gm|gl|gi|gh|gg|gf|ge|' + 'gd|gb|ga|fr|fo|fm|fk|fj|fi|eu|et|es|er|eh|eg|ee|ec|dz|do|dm|dk|dj|de|cz|cy|cx|cw|cv|cu|cr|co|' + 'cn|cm|cl|ck|ci|ch|cg|cf|cd|cc|ca|bz|by|bw|bv|bt|bs|br|bq|bo|bn|bm|bl|bj|bi|bh|bg|bf|be|bd|bb|' + 'ba|az|ax|aw|au|at|as|ar|aq|ao|an|am|al|ai|ag|af|ae|ad|ac' + ')(?=[^0-9a-zA-Z@+-]|$))'));
var _default = validCCTLD;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.constructor":98}],193:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cashtag = _interopRequireDefault(require("./cashtag"));

var _punct = _interopRequireDefault(require("./punct"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _spaces = _interopRequireDefault(require("./spaces"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validCashtag = (0, _regexSupplant["default"])('(^|#{spaces})(\\$)(#{cashtag})(?=$|\\s|[#{punct}])', {
  cashtag: _cashtag["default"],
  spaces: _spaces["default"],
  punct: _punct["default"]
}, 'gi');
var _default = validCashtag;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./cashtag":166,"./punct":185,"./spaces":187,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],194:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validCCTLD = _interopRequireDefault(require("./validCCTLD"));

var _validDomainName = _interopRequireDefault(require("./validDomainName"));

var _validGTLD = _interopRequireDefault(require("./validGTLD"));

var _validPunycode = _interopRequireDefault(require("./validPunycode"));

var _validSubdomain = _interopRequireDefault(require("./validSubdomain"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validDomain = (0, _regexSupplant["default"])(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/, {
  validDomainName: _validDomainName["default"],
  validSubdomain: _validSubdomain["default"],
  validGTLD: _validGTLD["default"],
  validCCTLD: _validCCTLD["default"],
  validPunycode: _validPunycode["default"]
});
var _default = validDomain;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validCCTLD":192,"./validDomainName":196,"./validGTLD":197,"./validPunycode":203,"./validSubdomain":205,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],195:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _invalidDomainChars = _interopRequireDefault(require("./invalidDomainChars"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validDomainChars = (0, _regexSupplant["default"])(/[^#{invalidDomainChars}]/, {
  invalidDomainChars: _invalidDomainChars["default"]
});
var _default = validDomainChars;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./invalidDomainChars":181,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],196:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validDomainChars = _interopRequireDefault(require("./validDomainChars"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validDomainName = (0, _regexSupplant["default"])(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/, {
  validDomainChars: _validDomainChars["default"]
});
var _default = validDomainName;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validDomainChars":195,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],197:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.constructor");

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validGTLD = (0, _regexSupplant["default"])(RegExp('(?:(?:' + '삼성|닷컴|닷넷|香格里拉|餐厅|食品|飞利浦|電訊盈科|集团|通販|购物|谷歌|诺基亚|联通|网络|网站|网店|网址|组织机构|移动|珠宝|点看|游戏|淡马锡|机构|書籍|时尚|新闻|' + '政府|政务|招聘|手表|手机|我爱你|慈善|微博|广东|工行|家電|娱乐|天主教|大拿|大众汽车|在线|嘉里大酒店|嘉里|商标|商店|商城|公益|公司|八卦|健康|信息|佛山|企业|' + '中文网|中信|世界|ポイント|ファッション|セール|ストア|コム|グーグル|クラウド|みんな|คอม|संगठन|नेट|कॉम|همراه|موقع|موبايلي|كوم|' + 'كاثوليك|عرب|شبكة|بيتك|بازار|العليان|ارامكو|اتصالات|ابوظبي|קום|сайт|рус|орг|онлайн|москва|ком|' + 'католик|дети|zuerich|zone|zippo|zip|zero|zara|zappos|yun|youtube|you|yokohama|yoga|yodobashi|' + 'yandex|yamaxun|yahoo|yachts|xyz|xxx|xperia|xin|xihuan|xfinity|xerox|xbox|wtf|wtc|wow|world|' + 'works|work|woodside|wolterskluwer|wme|winners|wine|windows|win|williamhill|wiki|wien|whoswho|' + 'weir|weibo|wedding|wed|website|weber|webcam|weatherchannel|weather|watches|watch|warman|' + 'wanggou|wang|walter|walmart|wales|vuelos|voyage|voto|voting|vote|volvo|volkswagen|vodka|' + 'vlaanderen|vivo|viva|vistaprint|vista|vision|visa|virgin|vip|vin|villas|viking|vig|video|' + 'viajes|vet|versicherung|vermögensberatung|vermögensberater|verisign|ventures|vegas|vanguard|' + 'vana|vacations|ups|uol|uno|university|unicom|uconnect|ubs|ubank|tvs|tushu|tunes|tui|tube|trv|' + 'trust|travelersinsurance|travelers|travelchannel|travel|training|trading|trade|toys|toyota|' + 'town|tours|total|toshiba|toray|top|tools|tokyo|today|tmall|tkmaxx|tjx|tjmaxx|tirol|tires|tips|' + 'tiffany|tienda|tickets|tiaa|theatre|theater|thd|teva|tennis|temasek|telefonica|telecity|tel|' + 'technology|tech|team|tdk|tci|taxi|tax|tattoo|tatar|tatamotors|target|taobao|talk|taipei|tab|' + 'systems|symantec|sydney|swiss|swiftcover|swatch|suzuki|surgery|surf|support|supply|supplies|' + 'sucks|style|study|studio|stream|store|storage|stockholm|stcgroup|stc|statoil|statefarm|' + 'statebank|starhub|star|staples|stada|srt|srl|spreadbetting|spot|sport|spiegel|space|soy|sony|' + 'song|solutions|solar|sohu|software|softbank|social|soccer|sncf|smile|smart|sling|skype|sky|' + 'skin|ski|site|singles|sina|silk|shriram|showtime|show|shouji|shopping|shop|shoes|shiksha|shia|' + 'shell|shaw|sharp|shangrila|sfr|sexy|sex|sew|seven|ses|services|sener|select|seek|security|' + 'secure|seat|search|scot|scor|scjohnson|science|schwarz|schule|school|scholarships|schmidt|' + 'schaeffler|scb|sca|sbs|sbi|saxo|save|sas|sarl|sapo|sap|sanofi|sandvikcoromant|sandvik|samsung|' + 'samsclub|salon|sale|sakura|safety|safe|saarland|ryukyu|rwe|run|ruhr|rugby|rsvp|room|rogers|' + 'rodeo|rocks|rocher|rmit|rip|rio|ril|rightathome|ricoh|richardli|rich|rexroth|reviews|review|' + 'restaurant|rest|republican|report|repair|rentals|rent|ren|reliance|reit|reisen|reise|rehab|' + 'redumbrella|redstone|red|recipes|realty|realtor|realestate|read|raid|radio|racing|qvc|quest|' + 'quebec|qpon|pwc|pub|prudential|pru|protection|property|properties|promo|progressive|prof|' + 'productions|prod|pro|prime|press|praxi|pramerica|post|porn|politie|poker|pohl|pnc|plus|' + 'plumbing|playstation|play|place|pizza|pioneer|pink|ping|pin|pid|pictures|pictet|pics|piaget|' + 'physio|photos|photography|photo|phone|philips|phd|pharmacy|pfizer|pet|pccw|pay|passagens|' + 'party|parts|partners|pars|paris|panerai|panasonic|pamperedchef|page|ovh|ott|otsuka|osaka|' + 'origins|orientexpress|organic|org|orange|oracle|open|ooo|onyourside|online|onl|ong|one|omega|' + 'ollo|oldnavy|olayangroup|olayan|okinawa|office|off|observer|obi|nyc|ntt|nrw|nra|nowtv|nowruz|' + 'now|norton|northwesternmutual|nokia|nissay|nissan|ninja|nikon|nike|nico|nhk|ngo|nfl|nexus|' + 'nextdirect|next|news|newholland|new|neustar|network|netflix|netbank|net|nec|nba|navy|natura|' + 'nationwide|name|nagoya|nadex|nab|mutuelle|mutual|museum|mtr|mtpc|mtn|msd|movistar|movie|mov|' + 'motorcycles|moto|moscow|mortgage|mormon|mopar|montblanc|monster|money|monash|mom|moi|moe|moda|' + 'mobily|mobile|mobi|mma|mls|mlb|mitsubishi|mit|mint|mini|mil|microsoft|miami|metlife|merckmsd|' + 'meo|menu|men|memorial|meme|melbourne|meet|media|med|mckinsey|mcdonalds|mcd|mba|mattel|' + 'maserati|marshalls|marriott|markets|marketing|market|map|mango|management|man|makeup|maison|' + 'maif|madrid|macys|luxury|luxe|lupin|lundbeck|ltda|ltd|lplfinancial|lpl|love|lotto|lotte|' + 'london|lol|loft|locus|locker|loans|loan|llp|llc|lixil|living|live|lipsy|link|linde|lincoln|' + 'limo|limited|lilly|like|lighting|lifestyle|lifeinsurance|life|lidl|liaison|lgbt|lexus|lego|' + 'legal|lefrak|leclerc|lease|lds|lawyer|law|latrobe|latino|lat|lasalle|lanxess|landrover|land|' + 'lancome|lancia|lancaster|lamer|lamborghini|ladbrokes|lacaixa|kyoto|kuokgroup|kred|krd|kpn|' + 'kpmg|kosher|komatsu|koeln|kiwi|kitchen|kindle|kinder|kim|kia|kfh|kerryproperties|' + 'kerrylogistics|kerryhotels|kddi|kaufen|juniper|juegos|jprs|jpmorgan|joy|jot|joburg|jobs|jnj|' + 'jmp|jll|jlc|jio|jewelry|jetzt|jeep|jcp|jcb|java|jaguar|iwc|iveco|itv|itau|istanbul|ist|' + 'ismaili|iselect|irish|ipiranga|investments|intuit|international|intel|int|insure|insurance|' + 'institute|ink|ing|info|infiniti|industries|inc|immobilien|immo|imdb|imamat|ikano|iinet|ifm|' + 'ieee|icu|ice|icbc|ibm|hyundai|hyatt|hughes|htc|hsbc|how|house|hotmail|hotels|hoteles|hot|' + 'hosting|host|hospital|horse|honeywell|honda|homesense|homes|homegoods|homedepot|holiday|' + 'holdings|hockey|hkt|hiv|hitachi|hisamitsu|hiphop|hgtv|hermes|here|helsinki|help|healthcare|' + 'health|hdfcbank|hdfc|hbo|haus|hangout|hamburg|hair|guru|guitars|guide|guge|gucci|guardian|' + 'group|grocery|gripe|green|gratis|graphics|grainger|gov|got|gop|google|goog|goodyear|goodhands|' + 'goo|golf|goldpoint|gold|godaddy|gmx|gmo|gmbh|gmail|globo|global|gle|glass|glade|giving|gives|' + 'gifts|gift|ggee|george|genting|gent|gea|gdn|gbiz|gay|garden|gap|games|game|gallup|gallo|' + 'gallery|gal|fyi|futbol|furniture|fund|fun|fujixerox|fujitsu|ftr|frontier|frontdoor|frogans|' + 'frl|fresenius|free|fox|foundation|forum|forsale|forex|ford|football|foodnetwork|food|foo|fly|' + 'flsmidth|flowers|florist|flir|flights|flickr|fitness|fit|fishing|fish|firmdale|firestone|fire|' + 'financial|finance|final|film|fido|fidelity|fiat|ferrero|ferrari|feedback|fedex|fast|fashion|' + 'farmers|farm|fans|fan|family|faith|fairwinds|fail|fage|extraspace|express|exposed|expert|' + 'exchange|everbank|events|eus|eurovision|etisalat|esurance|estate|esq|erni|ericsson|equipment|' + 'epson|epost|enterprises|engineering|engineer|energy|emerck|email|education|edu|edeka|eco|eat|' + 'earth|dvr|dvag|durban|dupont|duns|dunlop|duck|dubai|dtv|drive|download|dot|doosan|domains|' + 'doha|dog|dodge|doctor|docs|dnp|diy|dish|discover|discount|directory|direct|digital|diet|' + 'diamonds|dhl|dev|design|desi|dentist|dental|democrat|delta|deloitte|dell|delivery|degree|' + 'deals|dealer|deal|dds|dclk|day|datsun|dating|date|data|dance|dad|dabur|cyou|cymru|cuisinella|' + 'csc|cruises|cruise|crs|crown|cricket|creditunion|creditcard|credit|cpa|courses|coupons|coupon|' + 'country|corsica|coop|cool|cookingchannel|cooking|contractors|contact|consulting|construction|' + 'condos|comsec|computer|compare|company|community|commbank|comcast|com|cologne|college|coffee|' + 'codes|coach|clubmed|club|cloud|clothing|clinique|clinic|click|cleaning|claims|cityeats|city|' + 'citic|citi|citadel|cisco|circle|cipriani|church|chrysler|chrome|christmas|chloe|chintai|cheap|' + 'chat|chase|charity|channel|chanel|cfd|cfa|cern|ceo|center|ceb|cbs|cbre|cbn|cba|catholic|' + 'catering|cat|casino|cash|caseih|case|casa|cartier|cars|careers|career|care|cards|caravan|car|' + 'capitalone|capital|capetown|canon|cancerresearch|camp|camera|cam|calvinklein|call|cal|cafe|' + 'cab|bzh|buzz|buy|business|builders|build|bugatti|budapest|brussels|brother|broker|broadway|' + 'bridgestone|bradesco|box|boutique|bot|boston|bostik|bosch|boots|booking|book|boo|bond|bom|' + 'bofa|boehringer|boats|bnpparibas|bnl|bmw|bms|blue|bloomberg|blog|blockbuster|blanco|' + 'blackfriday|black|biz|bio|bingo|bing|bike|bid|bible|bharti|bet|bestbuy|best|berlin|bentley|' + 'beer|beauty|beats|bcn|bcg|bbva|bbt|bbc|bayern|bauhaus|basketball|baseball|bargains|barefoot|' + 'barclays|barclaycard|barcelona|bar|bank|band|bananarepublic|banamex|baidu|baby|azure|axa|aws|' + 'avianca|autos|auto|author|auspost|audio|audible|audi|auction|attorney|athleta|associates|asia|' + 'asda|arte|art|arpa|army|archi|aramco|arab|aquarelle|apple|app|apartments|aol|anz|anquan|' + 'android|analytics|amsterdam|amica|amfam|amex|americanfamily|americanexpress|alstom|alsace|' + 'ally|allstate|allfinanz|alipay|alibaba|alfaromeo|akdn|airtel|airforce|airbus|aigo|aig|agency|' + 'agakhan|africa|afl|afamilycompany|aetna|aero|aeg|adult|ads|adac|actor|active|aco|accountants|' + 'accountant|accenture|academy|abudhabi|abogado|able|abc|abbvie|abbott|abb|abarth|aarp|aaa|' + 'onion' + ')(?=[^0-9a-zA-Z@+-]|$))'));
var _default = validGTLD;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.constructor":98}],198:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cyrillicLettersAndMarks = _interopRequireDefault(require("./cyrillicLettersAndMarks"));

var _latinAccentChars = _interopRequireDefault(require("./latinAccentChars"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validGeneralUrlPathChars = (0, _regexSupplant["default"])(/[a-z#{cyrillicLettersAndMarks}0-9!\*';:=\+,\.\$\/%#\[\]\-\u2013_~@\|&#{latinAccentChars}]/i, {
  cyrillicLettersAndMarks: _cyrillicLettersAndMarks["default"],
  latinAccentChars: _latinAccentChars["default"]
});
var _default = validGeneralUrlPathChars;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./cyrillicLettersAndMarks":168,"./latinAccentChars":183,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],199:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hashSigns = _interopRequireDefault(require("./hashSigns"));

var _hashtagAlpha = _interopRequireDefault(require("./hashtagAlpha"));

var _hashtagAlphaNumeric = _interopRequireDefault(require("./hashtagAlphaNumeric"));

var _hashtagBoundary = _interopRequireDefault(require("./hashtagBoundary"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validHashtag = (0, _regexSupplant["default"])(/(#{hashtagBoundary})(#{hashSigns})(?!\uFE0F|\u20E3)(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi, {
  hashtagBoundary: _hashtagBoundary["default"],
  hashSigns: _hashSigns["default"],
  hashtagAlphaNumeric: _hashtagAlphaNumeric["default"],
  hashtagAlpha: _hashtagAlpha["default"]
});
var _default = validHashtag;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./hashSigns":173,"./hashtagAlpha":174,"./hashtagAlphaNumeric":175,"./hashtagBoundary":176,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],200:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _atSigns = _interopRequireDefault(require("./atSigns"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validMentionPrecedingChars = _interopRequireDefault(require("./validMentionPrecedingChars"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validMentionOrList = (0, _regexSupplant["default"])('(#{validMentionPrecedingChars})' + // $1: Preceding character
'(#{atSigns})' + // $2: At mark
'([a-zA-Z0-9_]{1,20})' + // $3: Screen name
'(/[a-zA-Z][a-zA-Z0-9_-]{0,24})?', // $4: List (optional)
{
  validMentionPrecedingChars: _validMentionPrecedingChars["default"],
  atSigns: _atSigns["default"]
}, 'g');
var _default = validMentionOrList;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./atSigns":163,"./validMentionPrecedingChars":201,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],201:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validMentionPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|(?:^|[^a-zA-Z0-9_+~.-])(?:rt|RT|rT|Rt):?)/;
var _default = validMentionPrecedingChars;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],202:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validPortNumber = /[0-9]+/;
var _default = validPortNumber;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],203:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validPunycode = /(?:xn--[\-0-9a-z]+)/;
var _default = validPunycode;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],204:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _atSigns = _interopRequireDefault(require("./atSigns"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _spaces = _interopRequireDefault(require("./spaces"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validReply = (0, _regexSupplant["default"])(/^(?:#{spaces})*#{atSigns}([a-zA-Z0-9_]{1,20})/, {
  atSigns: _atSigns["default"],
  spaces: _spaces["default"]
});
var _default = validReply;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./atSigns":163,"./spaces":187,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],205:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validDomainChars = _interopRequireDefault(require("./validDomainChars"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validSubdomain = (0, _regexSupplant["default"])(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/, {
  validDomainChars: _validDomainChars["default"]
});
var _default = validSubdomain;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validDomainChars":195,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],206:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validUrlQueryChars = _interopRequireDefault(require("./validUrlQueryChars"));

var _validUrlQueryEndingChars = _interopRequireDefault(require("./validUrlQueryEndingChars"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validTcoUrl = (0, _regexSupplant["default"])(/^https?:\/\/t\.co\/([a-z0-9]+)(?:\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?/, {
  validUrlQueryChars: _validUrlQueryChars["default"],
  validUrlQueryEndingChars: _validUrlQueryEndingChars["default"]
}, 'i');
var _default = validTcoUrl;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validUrlQueryChars":211,"./validUrlQueryEndingChars":212,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],207:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validGeneralUrlPathChars = _interopRequireDefault(require("./validGeneralUrlPathChars"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Allow URL paths to contain up to two nested levels of balanced parens
//  1. Used in Wikipedia URLs like /Primer_(film)
//  2. Used in IIS sessions like /S(dfd346)/
//  3. Used in Rdio URLs like /track/We_Up_(Album_Version_(Edited))/
var validUrlBalancedParens = (0, _regexSupplant["default"])('\\(' + '(?:' + '#{validGeneralUrlPathChars}+' + '|' + // allow one nested level of balanced parentheses
'(?:' + '#{validGeneralUrlPathChars}*' + '\\(' + '#{validGeneralUrlPathChars}+' + '\\)' + '#{validGeneralUrlPathChars}*' + ')' + ')' + '\\)', {
  validGeneralUrlPathChars: _validGeneralUrlPathChars["default"]
}, 'i');
var _default = validUrlBalancedParens;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validGeneralUrlPathChars":198,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],208:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validGeneralUrlPathChars = _interopRequireDefault(require("./validGeneralUrlPathChars"));

var _validUrlBalancedParens = _interopRequireDefault(require("./validUrlBalancedParens"));

var _validUrlPathEndingChars = _interopRequireDefault(require("./validUrlPathEndingChars"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Allow @ in a url, but only in the middle. Catch things like http://example.com/@user/
var validUrlPath = (0, _regexSupplant["default"])('(?:' + '(?:' + '#{validGeneralUrlPathChars}*' + '(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*' + '#{validUrlPathEndingChars}' + ')|(?:@#{validGeneralUrlPathChars}+/)' + ')', {
  validGeneralUrlPathChars: _validGeneralUrlPathChars["default"],
  validUrlBalancedParens: _validUrlBalancedParens["default"],
  validUrlPathEndingChars: _validUrlPathEndingChars["default"]
}, 'i');
var _default = validUrlPath;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validGeneralUrlPathChars":198,"./validUrlBalancedParens":207,"./validUrlPathEndingChars":209,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],209:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cyrillicLettersAndMarks = _interopRequireDefault(require("./cyrillicLettersAndMarks"));

var _latinAccentChars = _interopRequireDefault(require("./latinAccentChars"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validUrlBalancedParens = _interopRequireDefault(require("./validUrlBalancedParens"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Valid end-of-path chracters (so /foo. does not gobble the period).
// 1. Allow =&# for empty URL parameters and other URL-join artifacts
var validUrlPathEndingChars = (0, _regexSupplant["default"])(/[\+\-a-z#{cyrillicLettersAndMarks}0-9=_#\/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i, {
  cyrillicLettersAndMarks: _cyrillicLettersAndMarks["default"],
  latinAccentChars: _latinAccentChars["default"],
  validUrlBalancedParens: _validUrlBalancedParens["default"]
});
var _default = validUrlPathEndingChars;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./cyrillicLettersAndMarks":168,"./latinAccentChars":183,"./validUrlBalancedParens":207,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],210:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _directionalMarkersGroup = _interopRequireDefault(require("./directionalMarkersGroup"));

var _invalidCharsGroup = _interopRequireDefault(require("./invalidCharsGroup"));

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validUrlPrecedingChars = (0, _regexSupplant["default"])(/(?:[^A-Za-z0-9@＠$#＃#{invalidCharsGroup}]|[#{directionalMarkersGroup}]|^)/, {
  invalidCharsGroup: _invalidCharsGroup["default"],
  directionalMarkersGroup: _directionalMarkersGroup["default"]
});
var _default = validUrlPrecedingChars;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./directionalMarkersGroup":169,"./invalidCharsGroup":180,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],211:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validUrlQueryChars = /[a-z0-9!?\*'@\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i;
var _default = validUrlQueryChars;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],212:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validUrlQueryEndingChars = /[a-z0-9\-_&=#\/]/i;
var _default = validUrlQueryEndingChars;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],213:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlUserinfo = _interopRequireDefault(require("./validateUrlUserinfo"));

var _validateUrlHost = _interopRequireDefault(require("./validateUrlHost"));

var _validateUrlPort = _interopRequireDefault(require("./validateUrlPort"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlAuthority = (0, _regexSupplant["default"])( // $1 userinfo
'(?:(#{validateUrlUserinfo})@)?' + // $2 host
'(#{validateUrlHost})' + // $3 port
'(?::(#{validateUrlPort}))?', {
  validateUrlUserinfo: _validateUrlUserinfo["default"],
  validateUrlHost: _validateUrlHost["default"],
  validateUrlPort: _validateUrlPort["default"]
}, 'i');
var _default = validateUrlAuthority;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlHost":219,"./validateUrlPort":226,"./validateUrlUserinfo":239,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],214:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlDecOctet = /(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))/i;
var _default = validateUrlDecOctet;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],215:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlDomainSegment = _interopRequireDefault(require("./validateUrlDomainSegment"));

var _validateUrlDomainTld = _interopRequireDefault(require("./validateUrlDomainTld"));

var _validateUrlSubDomainSegment = _interopRequireDefault(require("./validateUrlSubDomainSegment"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlDomain = (0, _regexSupplant["default"])(/(?:(?:#{validateUrlSubDomainSegment}\.)*(?:#{validateUrlDomainSegment}\.)#{validateUrlDomainTld})/i, {
  validateUrlSubDomainSegment: _validateUrlSubDomainSegment["default"],
  validateUrlDomainSegment: _validateUrlDomainSegment["default"],
  validateUrlDomainTld: _validateUrlDomainTld["default"]
});
var _default = validateUrlDomain;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlDomainSegment":216,"./validateUrlDomainTld":217,"./validateUrlSubDomainSegment":230,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],216:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlDomainSegment = /(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)/i;
var _default = validateUrlDomainSegment;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],217:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlDomainTld = /(?:[a-z](?:[a-z0-9\-]*[a-z0-9])?)/i;
var _default = validateUrlDomainTld;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],218:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlPchar = _interopRequireDefault(require("./validateUrlPchar"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlFragment = (0, _regexSupplant["default"])(/(#{validateUrlPchar}|\/|\?)*/i, {
  validateUrlPchar: _validateUrlPchar["default"]
});
var _default = validateUrlFragment;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlPchar":224,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],219:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlDomain = _interopRequireDefault(require("./validateUrlDomain"));

var _validateUrlIp = _interopRequireDefault(require("./validateUrlIp"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlHost = (0, _regexSupplant["default"])('(?:' + '#{validateUrlIp}|' + '#{validateUrlDomain}' + ')', {
  validateUrlIp: _validateUrlIp["default"],
  validateUrlDomain: _validateUrlDomain["default"]
}, 'i');
var _default = validateUrlHost;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlDomain":215,"./validateUrlIp":220,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],220:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlIpv = _interopRequireDefault(require("./validateUrlIpv4"));

var _validateUrlIpv2 = _interopRequireDefault(require("./validateUrlIpv6"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Punting on IPvFuture for now
var validateUrlIp = (0, _regexSupplant["default"])('(?:' + '#{validateUrlIpv4}|' + '#{validateUrlIpv6}' + ')', {
  validateUrlIpv4: _validateUrlIpv["default"],
  validateUrlIpv6: _validateUrlIpv2["default"]
}, 'i');
var _default = validateUrlIp;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlIpv4":221,"./validateUrlIpv6":222,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],221:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlDecOctet = _interopRequireDefault(require("./validateUrlDecOctet"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlIpv4 = (0, _regexSupplant["default"])(/(?:#{validateUrlDecOctet}(?:\.#{validateUrlDecOctet}){3})/i, {
  validateUrlDecOctet: _validateUrlDecOctet["default"]
});
var _default = validateUrlIpv4;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlDecOctet":214,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],222:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Punting on real IPv6 validation for now
var validateUrlIpv6 = /(?:\[[a-f0-9:\.]+\])/i;
var _default = validateUrlIpv6;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],223:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlPchar = _interopRequireDefault(require("./validateUrlPchar"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlPath = (0, _regexSupplant["default"])(/(\/#{validateUrlPchar}*)*/i, {
  validateUrlPchar: _validateUrlPchar["default"]
});
var _default = validateUrlPath;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlPchar":224,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],224:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlUnreserved = _interopRequireDefault(require("./validateUrlUnreserved"));

var _validateUrlPctEncoded = _interopRequireDefault(require("./validateUrlPctEncoded"));

var _validateUrlSubDelims = _interopRequireDefault(require("./validateUrlSubDelims"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// These URL validation pattern strings are based on the ABNF from RFC 3986
var validateUrlPchar = (0, _regexSupplant["default"])('(?:' + '#{validateUrlUnreserved}|' + '#{validateUrlPctEncoded}|' + '#{validateUrlSubDelims}|' + '[:|@]' + ')', {
  validateUrlUnreserved: _validateUrlUnreserved["default"],
  validateUrlPctEncoded: _validateUrlPctEncoded["default"],
  validateUrlSubDelims: _validateUrlSubDelims["default"]
}, 'i');
var _default = validateUrlPchar;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlPctEncoded":225,"./validateUrlSubDelims":229,"./validateUrlUnreserved":238,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],225:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlPctEncoded = /(?:%[0-9a-f]{2})/i;
var _default = validateUrlPctEncoded;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],226:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlPort = /[0-9]{1,5}/;
var _default = validateUrlPort;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],227:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlPchar = _interopRequireDefault(require("./validateUrlPchar"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlQuery = (0, _regexSupplant["default"])(/(#{validateUrlPchar}|\/|\?)*/i, {
  validateUrlPchar: _validateUrlPchar["default"]
});
var _default = validateUrlQuery;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlPchar":224,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],228:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlScheme = /(?:[a-z][a-z0-9+\-.]*)/i;
var _default = validateUrlScheme;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],229:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlSubDelims = /[!$&'()*+,;=]/i;
var _default = validateUrlSubDelims;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],230:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlSubDomainSegment = /(?:[a-z0-9](?:[a-z0-9_\-]*[a-z0-9])?)/i;
var _default = validateUrlSubDomainSegment;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],231:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Modified version of RFC 3986 Appendix B
var validateUrlUnencoded = (0, _regexSupplant["default"])('^' + // Full URL
'(?:' + '([^:/?#]+):\\/\\/' + // $1 Scheme
')?' + '([^/?#]*)' + // $2 Authority
'([^?#]*)' + // $3 Path
'(?:' + '\\?([^#]*)' + // $4 Query
')?' + '(?:' + '#(.*)' + // $5 Fragment
')?$', 'i');
var _default = validateUrlUnencoded;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],232:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlUserinfo = _interopRequireDefault(require("./validateUrlUserinfo"));

var _validateUrlUnicodeHost = _interopRequireDefault(require("./validateUrlUnicodeHost"));

var _validateUrlPort = _interopRequireDefault(require("./validateUrlPort"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlUnicodeAuthority = (0, _regexSupplant["default"])( // $1 userinfo
'(?:(#{validateUrlUserinfo})@)?' + // $2 host
'(#{validateUrlUnicodeHost})' + // $3 port
'(?::(#{validateUrlPort}))?', {
  validateUrlUserinfo: _validateUrlUserinfo["default"],
  validateUrlUnicodeHost: _validateUrlUnicodeHost["default"],
  validateUrlPort: _validateUrlPort["default"]
}, 'i');
var _default = validateUrlUnicodeAuthority;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlPort":226,"./validateUrlUnicodeHost":236,"./validateUrlUserinfo":239,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],233:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlUnicodeSubDomainSegment = _interopRequireDefault(require("./validateUrlUnicodeSubDomainSegment"));

var _validateUrlUnicodeDomainSegment = _interopRequireDefault(require("./validateUrlUnicodeDomainSegment"));

var _validateUrlUnicodeDomainTld = _interopRequireDefault(require("./validateUrlUnicodeDomainTld"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Unencoded internationalized domains - this doesn't check for invalid UTF-8 sequences
var validateUrlUnicodeDomain = (0, _regexSupplant["default"])(/(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i, {
  validateUrlUnicodeSubDomainSegment: _validateUrlUnicodeSubDomainSegment["default"],
  validateUrlUnicodeDomainSegment: _validateUrlUnicodeDomainSegment["default"],
  validateUrlUnicodeDomainTld: _validateUrlUnicodeDomainTld["default"]
});
var _default = validateUrlUnicodeDomain;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlUnicodeDomainSegment":234,"./validateUrlUnicodeDomainTld":235,"./validateUrlUnicodeSubDomainSegment":237,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],234:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlUnicodeDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
var _default = validateUrlUnicodeDomainSegment;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],235:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// Unencoded internationalized domains - this doesn't check for invalid UTF-8 sequences
var validateUrlUnicodeDomainTld = /(?:(?:[a-z]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
var _default = validateUrlUnicodeDomainTld;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],236:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlIp = _interopRequireDefault(require("./validateUrlIp"));

var _validateUrlUnicodeDomain = _interopRequireDefault(require("./validateUrlUnicodeDomain"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlUnicodeHost = (0, _regexSupplant["default"])('(?:' + '#{validateUrlIp}|' + '#{validateUrlUnicodeDomain}' + ')', {
  validateUrlIp: _validateUrlIp["default"],
  validateUrlUnicodeDomain: _validateUrlUnicodeDomain["default"]
}, 'i');
var _default = validateUrlUnicodeHost;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlIp":220,"./validateUrlUnicodeDomain":233,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],237:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlUnicodeSubDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
var _default = validateUrlUnicodeSubDomainSegment;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],238:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlUnreserved = /[a-z\u0400-\u04FF0-9\-._~]/i;
var _default = validateUrlUnreserved;
exports["default"] = _default;
module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95}],239:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regexSupplant = _interopRequireDefault(require("../lib/regexSupplant"));

var _validateUrlUnreserved = _interopRequireDefault(require("./validateUrlUnreserved"));

var _validateUrlPctEncoded = _interopRequireDefault(require("./validateUrlPctEncoded"));

var _validateUrlSubDelims = _interopRequireDefault(require("./validateUrlSubDelims"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var validateUrlUserinfo = (0, _regexSupplant["default"])('(?:' + '#{validateUrlUnreserved}|' + '#{validateUrlPctEncoded}|' + '#{validateUrlSubDelims}|' + ':' + ')*', {
  validateUrlUnreserved: _validateUrlUnreserved["default"],
  validateUrlPctEncoded: _validateUrlPctEncoded["default"],
  validateUrlSubDelims: _validateUrlSubDelims["default"]
}, 'i');
var _default = validateUrlUserinfo;
exports["default"] = _default;
module.exports = exports.default;
},{"../lib/regexSupplant":149,"./validateUrlPctEncoded":225,"./validateUrlSubDelims":229,"./validateUrlUnreserved":238,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.object.define-property":95}],240:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.array.sort");

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
function _default(entities) {
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });
  var prev = entities[0];

  for (var i = 1; i < entities.length; i++) {
    if (prev.indices[1] > entities[i].indices[0]) {
      entities.splice(i, 1);
      i--;
    } else {
      prev = entities[i];
    }
  }
}

module.exports = exports.default;
},{"core-js/modules/es6.array.sort":92,"core-js/modules/es6.object.define-property":95}],241:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.split");

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
// this essentially does text.split(/<|>/)
// except that won't work in IE, where empty strings are ommitted
// so "<>".split(/<|>/) => [] in IE, but is ["", "", ""] in all others
// but "<<".split("<") => ["", "", ""]
function _default(text) {
  var firstSplits = text.split('<'),
      secondSplits,
      allSplits = [],
      split;

  for (var i = 0; i < firstSplits.length; i += 1) {
    split = firstSplits[i];

    if (!split) {
      allSplits.push('');
    } else {
      secondSplits = split.split('>');

      for (var j = 0; j < secondSplits.length; j += 1) {
        allSplits.push(secondSplits[j]);
      }
    }
  }

  return allSplits;
}

module.exports = exports.default;
},{"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.regexp.split":103}],242:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = standardizeIndices;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

var _getUnicodeTextLength = _interopRequireDefault(require("./getUnicodeTextLength"));

function standardizeIndices(text, startIndex, endIndex) {
  var totalUnicodeTextLength = (0, _getUnicodeTextLength["default"])(text);
  var encodingDiff = text.length - totalUnicodeTextLength;

  if (encodingDiff > 0) {
    // split the string into codepoints which will map to the API's indices
    var byCodePair = Array.from(text);
    var beforeText = startIndex === 0 ? '' : byCodePair.slice(0, startIndex).join('');
    var actualText = byCodePair.slice(startIndex, endIndex).join('');
    return [beforeText.length, beforeText.length + actualText.length];
  }

  return [startIndex, endIndex];
}

module.exports = exports.default;
},{"./getUnicodeTextLength":134,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.array.from":87,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.string.iterator":105}],243:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

var _htmlEscape = _interopRequireDefault(require("./htmlEscape"));

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
var BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
};

function _default(attributes) {
  var htmlAttrs = '';

  for (var k in attributes) {
    var v = attributes[k];

    if (BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null;
    }

    if (v == null) {
      continue;
    }

    htmlAttrs += " ".concat((0, _htmlEscape["default"])(k), "=\"").concat((0, _htmlEscape["default"])(v.toString()), "\"");
  }

  return htmlAttrs;
}

module.exports = exports.default;
},{"./htmlEscape":137,"@babel/runtime/helpers/interopRequireDefault":2,"core-js/modules/es6.date.to-string":93,"core-js/modules/es6.object.define-property":95,"core-js/modules/es6.object.to-string":97,"core-js/modules/es6.regexp.to-string":104}],244:[function(require,module,exports){
// twitter-textライブラリをブラウザで使用するためのモジュール
const twitter = require('twitter-text');

// グローバルオブジェクトに追加してブラウザで使用可能にする
window.twitterText = twitter;

},{"twitter-text":138}]},{},[244]);
