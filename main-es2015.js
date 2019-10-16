(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n    <app-login-page></app-login-page>\n  </div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/contact-details/contact-details.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/contact-details/contact-details.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div *ngIf=\"contact\" class=\"row\">\n    <div class=\"col-md-12\">\n      <h2 *ngIf=\"contact._id\">Contact Details</h2>\n      <h2 *ngIf=\"!contact._id\">New Contact</h2>\n    </div>\n  </div>\n  <div *ngIf=\"contact\" class=\"row\">\n    <form class=\"col-md-12\">\n      <div class=\"form-group\">\n        <label for=\"contact-name\">Name</label>\n        <input class=\"form-control\" name=\"contact-name\" [(ngModel)]=\"contact.name\" placeholder=\"Name\"/>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"contact-email\">Email</label>\n        <input class=\"form-control\" name=\"contact-email\" [(ngModel)]=\"contact.email\" placeholder=\"support@mlab.com\"/>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"contact-phone-mobile\">Mobile</label>\n        <input class=\"form-control\" name=\"contact-phone-mobile\" [(ngModel)]=\"contact.phone.mobile\" placeholder=\"1234567890\"/>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"contact-phone-work\">Work</label>\n        <input class=\"form-control\" name=\"contact-phone-work\" [(ngModel)]=\"contact.phone.work\" placeholder=\"0123456789\"/>\n      </div>\n      <button class=\"btn btn-primary\" *ngIf=\"!contact._id\" (click)=\"createContact(contact)\">Create</button>\n      <button class=\"btn btn-info\" *ngIf=\"contact._id\" (click)=\"updateContact(contact)\">Update</button>\n      <button class=\"btn btn-danger\" *ngIf=\"contact._id\" (click)=\"deleteContact(contact._id)\">Delete</button>\n    </form>\n  </div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/contract-list/contract-list.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/contract-list/contract-list.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n    <div class=\"col-md-5\">\n      <h2>Contacts</h2>\n      <ul class=\"list-group\">\n        <li class=\"list-group-item\"\n          *ngFor=\"let contact of contacts\"\n          (click)=\"selectContact(contact)\"\n          [class.active]=\"contact === selectedContact\">\n          {{contact.name}}\n        </li>\n      </ul>\n      <button class=\"btn btn-warning\" (click)=\"createNewContact()\">New</button>\n    </div>\n    <div class=\"col-md-5 col-md-offset-2\">\n      <contact-details\n        [contact]=\"selectedContact\"\n        [createHandler]=\"addContact\"\n        [updateHandler]=\"updateContact\"\n        [deleteHandler]=\"deleteContact\">\n      </contact-details>\n    </div>\n  </div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/dashboard.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/dashboard.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"\r\n\tintegrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">\r\n\r\n<h1 style=\"width:40%;margin: 0 auto;\">Admin</h1>\r\n\r\n<div class=\"row\">\r\n\r\n\t<div class=\"col-md\">\r\n\t\t<h2>Branches</h2>\r\n\r\n\t\t<pre class=\"tree\"> {{treeString}}</pre>\r\n\r\n\t\t<mat-expansion-panel class=\"mainPanel\" [class.panel-selected]=\"curBranch=='master'\">\r\n\t\t\t<mat-expansion-panel-header>\r\n\t\t\t\t<button mat-raised-button color=\"primary\" (click)=\"selectBranch('master');$event.stopPropagation();\"\r\n\t\t\t\t\tstyle=\"margin-right:7em\">Checkout</button>\r\n\t\t\t\t<mat-panel-title [class.panel-selected]=\"curBranch=='master'\">\r\n\t\t\t\t\t{{ministry.name}}\r\n\t\t\t\t</mat-panel-title>\r\n\t\t\t</mat-expansion-panel-header>\r\n\r\n\t\t\t<div *ngFor=\"let schoolboard of ministry.childEntities\">\r\n\t\t\t\t<mat-expansion-panel [class.panel-selected]=\"curBranch==schoolboard.name\">\r\n\t\t\t\t\t<mat-expansion-panel-header>\r\n\t\t\t\t\t\t<button mat-raised-button color=\"primary\"\r\n\t\t\t\t\t\t\t(click)=\"selectBranch(schoolboard.name);$event.stopPropagation();\"\r\n\t\t\t\t\t\t\tstyle=\"margin-right:7em\">Checkout</button>\r\n\t\t\t\t\t\t<mat-panel-title [class.panel-selected]=\"curBranch==schoolboard.name\">\r\n\t\t\t\t\t\t\t{{schoolboard.name}}\r\n\t\t\t\t\t\t</mat-panel-title>\r\n\t\t\t\t\t</mat-expansion-panel-header>\r\n\r\n\t\t\t\t\t<div *ngFor=\"let school of schoolboard.childEntities\">\r\n\t\t\t\t\t\t<mat-expansion-panel [class.panel-selected]=\"curBranch==school.name\">\r\n\t\t\t\t\t\t\t<mat-expansion-panel-header>\r\n\t\t\t\t\t\t\t\t<button mat-raised-button color=\"primary\"\r\n\t\t\t\t\t\t\t\t\t(click)=\"selectBranch(school.name);$event.stopPropagation();\"\r\n\t\t\t\t\t\t\t\t\tstyle=\"margin-right:7em\">Checkout</button>\r\n\t\t\t\t\t\t\t\t<mat-panel-title [class.panel-selected]=\"curBranch==school.name\">\r\n\t\t\t\t\t\t\t\t\t{{school.name}}\r\n\t\t\t\t\t\t\t\t</mat-panel-title>\r\n\t\t\t\t\t\t\t</mat-expansion-panel-header>\r\n\r\n\t\t\t\t\t\t</mat-expansion-panel>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</mat-expansion-panel>\r\n\t\t\t</div>\r\n\t\t</mat-expansion-panel>\r\n\r\n\t\t<div style=\"width: 100%; overflow: hidden;\">\r\n\t\t\t<div style=\"margin-left: 380px;\" *ngIf=\"loading\">\r\n\t\t\t\t<h4>Processing........</h4>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<!-- <button mat-raised-button (click)=\"branchCreation=true\" \">+ NEW Entity</button> -->\r\n\r\n\r\n\t\t<mat-expansion-panel style=\"margin-top: 30px; width: 370px\">\r\n\t\t\t<mat-expansion-panel-header>\r\n\t\t\t\t<mat-panel-title>\r\n\t\t\t\t\t+ NEW {{childType}}\r\n\t\t\t\t</mat-panel-title>\r\n\r\n\t\t\t</mat-expansion-panel-header>\r\n\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<label for=\"name\">Name</label>\r\n\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"name\" required [(ngModel)]=\"childBranch\" name=\"name\">\r\n\r\n\t\t\t\t<button (click)=\"newChildBranch()\">Create</button>\r\n\r\n\t\t\t</div>\r\n\r\n\r\n\t\t</mat-expansion-panel>\r\n\r\n\t</div>\r\n\r\n\r\n\t<div class=\"col-md\">\r\n\t\t<!-- <div style=\"float: left; margin-top: 20px;\" *ngFor=\"let branch of branches\">\r\n\t\t\t<button (click)=\"selectBranch(branch)\">{{branch}}</button>\r\n\t\t</div> -->\r\n\r\n\t\t<button (click)=\"sendRequest()\">Send request to parent entity</button>\r\n\r\n\t\t<h2 style=\"margin-top: 60px\">Current Branch: {{curBranch}}</h2>\r\n\r\n\t\t<div *ngFor=\"let commit of commits\">\r\n\t\t\t<p>OID: {{commit.oid}}</p>\r\n\t\t\t<p>Message: {{commit.message}}</p>\r\n\t\t\t<p>Author: {{commit.author.name}}</p>\r\n\r\n\t\t\t<button mat-raised-button (click)=\"acceptRequest(commit)\">Accept</button>\r\n\t\t\t<p>_</p>\r\n\t\t</div>\r\n\t</div>\r\n\r\n</div>\r\n\r\n<!-- <form>\r\n\t<div class=\"form-group\">\r\n\t  <label for=\"name\">Name</label>\r\n\t  <input type=\"text\" class=\"form-control\" id=\"name\"\r\n\t  required\r\n\t  [(ngModel)]=\"childBranch\" name=\"name\">\r\n\t</div>\r\n\r\n\t<button type=\"submit\" class=\"btn btn-success\" (onClick)=\"getChild()\">Submit</button>\r\n\r\n  </form> -->");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/login-page/login-page.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/login-page/login-page.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!DOCTYPE html>\n<html  *ngIf=\"!proceed && !admin\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Credential Mangager Test</title>\n\n</head>\n\n<body style=\" margin: auto;\nmargin-top:20px;\nwidth: 24%;\nborder: 3px solid green;\npadding: 30px;\">\n\n<div>\n\n\n  <h1>Welcome to eOSR! You are:</h1>\n\n  <button mat-raised-button color=\"primary\" class=\"button\" (click)=\"selectStudent()\">Student/Parent</button>\n  <br>\n  <button mat-raised-button class=\"button\" (click)=\"admin = true\">Ministry Admin</button>\n  <br>\n  <button mat-raised-button class=\"button\">Schoolboard Admin</button>\n  <br>\n  <button mat-raised-button class=\"button\">School Admin</button>\n\n</div>\n\n  <div *ngIf=\"proceed\">\n      <div id=\"welcome-text\"></div>\n\n     <button mat-raised-button (click)=\"proceed = false\">Back</button>\n    <h1>Register</h1>\n    <button (click)=\"register()\">Sign up</button>\n\n    <h1>Login</h1>\n\n    <form id=\"login-form\" action=\"#\" onsubmit=\"event.preventDefault();\">\n      Email:<br>\n      <input [(ngModel)]=\"publicKey\" type=\"text\" id=\"email\" name=\"public key\">\n      <br>\n      Password:<br>\n      <input [(ngModel)]=\"privateKey\" type=\"password\" id=\"password\" name=\"private key\">\n      <br><br>\n      <button (click)=\"login()\">Login</button>\n    </form>\n  </div>\n\n</body>\n\n</html>\n\n<div *ngIf=\"admin\">\n  <app-dashboard></app-dashboard>\n</div>");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



const routes = [];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.sass":
/*!************************************!*\
  !*** ./src/app/app.component.sass ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2FzcyJ9 */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'eOSR-blockchain';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.sass */ "./src/app/app.component.sass")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ "./src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm2015/expansion.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm2015/button.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm2015/form-field.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _components_login_page_login_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/login-page/login-page.component */ "./src/app/components/login-page/login-page.component.ts");
/* harmony import */ var _components_contract_list_contract_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/contract-list/contract-list.component */ "./src/app/components/contract-list/contract-list.component.ts");
/* harmony import */ var _components_contact_details_contact_details_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/contact-details/contact-details.component */ "./src/app/components/contact-details/contact-details.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");















let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"],
            _components_login_page_login_page_component__WEBPACK_IMPORTED_MODULE_11__["LoginPageComponent"],
            _components_contract_list_contract_list_component__WEBPACK_IMPORTED_MODULE_12__["ContactListComponent"],
            _components_contact_details_contact_details_component__WEBPACK_IMPORTED_MODULE_13__["ContactDetailsComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__["MatExpansionModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatFormFieldModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_14__["HttpClientModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/components/contact-details/contact-details.component.sass":
/*!***************************************************************************!*\
  !*** ./src/app/components/contact-details/contact-details.component.sass ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvY29udGFjdC1kZXRhaWxzL2NvbnRhY3QtZGV0YWlscy5jb21wb25lbnQuc2FzcyJ9 */");

/***/ }),

/***/ "./src/app/components/contact-details/contact-details.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/contact-details/contact-details.component.ts ***!
  \*************************************************************************/
/*! exports provided: ContactDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactDetailsComponent", function() { return ContactDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_contact_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/contact.service */ "./src/app/services/contact.service.ts");



let ContactDetailsComponent = class ContactDetailsComponent {
    constructor(contactService) {
        this.contactService = contactService;
    }
    createContact(contact) {
        this.contactService.createContact(contact).then((newContact) => {
            this.createHandler(newContact);
        });
    }
    updateContact(contact) {
        this.contactService.updateContact(contact).then((updatedContact) => {
            this.updateHandler(updatedContact);
        });
    }
    deleteContact(contactId) {
        this.contactService.deleteContact(contactId).then((deletedContactId) => {
            this.deleteHandler(deletedContactId);
        });
    }
};
ContactDetailsComponent.ctorParameters = () => [
    { type: _services_contact_service__WEBPACK_IMPORTED_MODULE_2__["ContactService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactDetailsComponent.prototype, "contact", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactDetailsComponent.prototype, "createHandler", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactDetailsComponent.prototype, "updateHandler", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactDetailsComponent.prototype, "deleteHandler", void 0);
ContactDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'contact-details',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./contact-details.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/contact-details/contact-details.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./contact-details.component.sass */ "./src/app/components/contact-details/contact-details.component.sass")).default]
    })
], ContactDetailsComponent);



/***/ }),

/***/ "./src/app/components/contract-list/contract-list.component.sass":
/*!***********************************************************************!*\
  !*** ./src/app/components/contract-list/contract-list.component.sass ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvY29udHJhY3QtbGlzdC9jb250cmFjdC1saXN0LmNvbXBvbmVudC5zYXNzIn0= */");

/***/ }),

/***/ "./src/app/components/contract-list/contract-list.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/contract-list/contract-list.component.ts ***!
  \*********************************************************************/
/*! exports provided: ContactListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactListComponent", function() { return ContactListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_contact_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/contact.service */ "./src/app/services/contact.service.ts");



let ContactListComponent = class ContactListComponent {
    constructor(contactService) {
        this.contactService = contactService;
        this.getIndexOfContact = (contactId) => {
            return this.contacts.findIndex((contact) => {
                return contact._id === contactId;
            });
        };
        this.deleteContact = (contactId) => {
            var idx = this.getIndexOfContact(contactId);
            if (idx !== -1) {
                this.contacts.splice(idx, 1);
                this.selectContact(null);
            }
            return this.contacts;
        };
        this.addContact = (contact) => {
            this.contacts.push(contact);
            this.selectContact(contact);
            return this.contacts;
        };
        this.updateContact = (contact) => {
            var idx = this.getIndexOfContact(contact._id);
            if (idx !== -1) {
                this.contacts[idx] = contact;
                this.selectContact(contact);
            }
            return this.contacts;
        };
    }
    ngOnInit() {
        this.contactService
            .getContacts()
            .then((contacts) => {
            this.contacts = contacts.map((contact) => {
                if (!contact.phone) {
                    contact.phone = {
                        mobile: '',
                        work: ''
                    };
                }
                return contact;
            });
        });
    }
    selectContact(contact) {
        this.selectedContact = contact;
    }
    createNewContact() {
        var contact = {
            name: '',
            email: '',
            phone: {
                work: '',
                mobile: ''
            }
        };
        // By default, a newly-created contact will have the selected state.
        this.selectContact(contact);
    }
};
ContactListComponent.ctorParameters = () => [
    { type: _services_contact_service__WEBPACK_IMPORTED_MODULE_2__["ContactService"] }
];
ContactListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'contact-list',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./contract-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/contract-list/contract-list.component.html")).default,
        providers: [_services_contact_service__WEBPACK_IMPORTED_MODULE_2__["ContactService"]],
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./contract-list.component.sass */ "./src/app/components/contract-list/contract-list.component.sass")).default]
    })
], ContactListComponent);



/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.sass":
/*!***************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.sass ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".tree {\n  font-size: 25px;\n}\n\nmat-expansion-panel {\n  width: 37em;\n}\n\n.main {\n  width: 30em;\n}\n\n.panel-selected {\n  background-color: #000000;\n  color: white;\n}\n\n#container {\n  display: flex;\n}\n\n#left {\n  flex: 0 0 45%;\n}\n\n#right {\n  flex: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvQzpcXERFVlxcZ2hwYWdlLWVPU1Ivc3JjXFxhcHBcXGNvbXBvbmVudHNcXGRhc2hib2FyZFxcZGFzaGJvYXJkLmNvbXBvbmVudC5zYXNzIiwic3JjL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxlQUFBO0FDQ0Q7O0FEQUE7RUFDQyxXQUFBO0FDR0Q7O0FEREE7RUFDQyxXQUFBO0FDSUQ7O0FERkE7RUFDQyx5QkFBQTtFQUNBLFlBQUE7QUNLRDs7QURIQTtFQUNDLGFBQUE7QUNNRDs7QURKQTtFQUNDLGFBQUE7QUNPRDs7QURMQTtFQUNDLE9BQUE7QUNRRCIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIi50cmVlXHJcblx0Zm9udC1zaXplOiAyNXB4XHJcbm1hdC1leHBhbnNpb24tcGFuZWxcclxuXHR3aWR0aDogMzdlbVxyXG5cclxuLm1haW5cclxuXHR3aWR0aDogMzBlbVxyXG5cclxuLnBhbmVsLXNlbGVjdGVkXHJcblx0YmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMFxyXG5cdGNvbG9yOiB3aGl0ZVxyXG5cclxuI2NvbnRhaW5lclxyXG5cdGRpc3BsYXk6IGZsZXhcclxuXHJcbiNsZWZ0XHJcblx0ZmxleDogMCAwIDQ1JVxyXG5cclxuI3JpZ2h0XHJcblx0ZmxleDogMVxyXG4iLCIudHJlZSB7XG4gIGZvbnQtc2l6ZTogMjVweDtcbn1cblxubWF0LWV4cGFuc2lvbi1wYW5lbCB7XG4gIHdpZHRoOiAzN2VtO1xufVxuXG4ubWFpbiB7XG4gIHdpZHRoOiAzMGVtO1xufVxuXG4ucGFuZWwtc2VsZWN0ZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbiNjb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4jbGVmdCB7XG4gIGZsZXg6IDAgMCA0NSU7XG59XG5cbiNyaWdodCB7XG4gIGZsZXg6IDE7XG59Il19 */");

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_isomorphic_git_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/isomorphic-git.service */ "./src/app/services/isomorphic-git.service.ts");
/* harmony import */ var _services_encryption_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/encryption.service */ "./src/app/services/encryption.service.ts");
/* harmony import */ var isomorphic_git__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-git */ "./node_modules/isomorphic-git/dist/for-future/isomorphic-git/index.js");
/* harmony import */ var _entities_ministry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../entities/ministry */ "./src/app/entities/ministry.ts");
/* harmony import */ var _entities_Entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../entities/Entity */ "./src/app/entities/Entity.ts");







let DashboardComponent = class DashboardComponent {
    constructor(isomorphicGitService, encryptionService) {
        this.isomorphicGitService = isomorphicGitService;
        this.encryptionService = encryptionService;
        this.branches = [];
        this.commits = [];
        this.curBranch = "master";
        this.loading = true;
        //maps branch name to Entity and corresponding JSON object for O(1) access
        this.branchEntityMap = {};
        this.childType = "schoolboard";
        this.childBranch = 'branch';
    }
    ngOnInit() {
        console.log(this.childBranch);
        this.ministry = new _entities_ministry__WEBPACK_IMPORTED_MODULE_5__["Ministry"]("Ontario Ministry of Education", this.encryptionService, this.isomorphicGitService); // Root node of Entities-node tree
        this.setupComplete = this.setUp();
        this.setupComplete.then(x => {
            // breadth first search JSON object tree
            this.treeString = this.DFS(this.treeStructure, this.ministry)[1];
            console.log(this.ministry.childEntities);
            console.log(this.treeString);
        });
    }
    setCurBranch(branch) {
        this.curBranch = branch;
        console.log(this.curBranch);
        console.log(this.branchEntityMap[this.curBranch]);
        switch (this.branchEntityMap[this.curBranch][1].type) {
            case "ministry":
                this.childType = "schoolboard";
                break;
            case "school-board":
                this.childType = "school";
                break;
            case "school":
                this.childType = "student";
                break;
        }
    }
    DFS(root, entity, output = "", indent = 0) {
        console.log(root);
        output = root.name;
        let node = entity;
        if (!node)
            node = new _entities_Entity__WEBPACK_IMPORTED_MODULE_6__["Entity"](root.name, this.encryptionService, this.isomorphicGitService);
        this.branchEntityMap[node.name] = [node, root];
        console.log(node.name);
        if (root.children) {
            indent += 1;
            root.children.forEach(child => {
                let [childEntity, treeString] = this.DFS(child, undefined, output, indent);
                node.childEntities.push(childEntity);
                output += "\n" + "    ".repeat(indent) + " |--> " + treeString;
            });
        }
        return [node, output];
    }
    setUp() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.isomorphicGitService.build(this.isomorphicGitService.GIT_TOKEN);
            let branch = yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["currentBranch"]({ dir: '/', fullname: false });
            console.log("Current branch:", branch);
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["listBranches"]({ dir: '/', remote: 'origin' }).then(x => this.branches = x);
            // await Promise.all(this.branches.map(async (branch) => {
            // 	await git.checkout({ dir: '/', ref: branch })
            // }))
            let sha = yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["resolveRef"]({ dir: '/', ref: branch });
            // read file hierarchy.json
            let promise = isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["readObject"]({
                dir: '/',
                oid: sha,
                filepath: 'hierarchy.json',
                encoding: 'utf8'
            });
            let { object: blob } = yield promise;
            this.treeStructure = JSON.parse(blob.toString());
            console.log("set up completed");
            this.loading = false;
        });
    }
    selectBranch(branch) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.setupComplete;
            this.loading = true;
            // if (this.branchEntityMap[branch])
            // 	switch (this.branchEntityMap[branch][1].type) {
            // 		case "ministry":
            // 			this.childType = "schoolboard"
            // 			break;
            // 		case "school-board":
            // 			this.childType = "school"
            // 			break;
            // 		case "school":
            // 			this.childType = "student"
            // 			break;
            // 	}
            // // set child branch type
            // if (branch == "master")
            // 	branch = "Ontario Ministry of Education"
            // checkout the master branch
            // await git.checkout({ dir: '/', ref: branch })
            // checkout the master branch
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["checkout"]({ dir: '/', ref: this.curBranch });
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["fetch"]({
                dir: '/',
                corsProxy: 'https://cors.isomorphic-git.org',
                ref: this.curBranch,
                depth: 1,
                singleBranch: true,
                tags: false
            });
            this.commits = yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["log"]({ dir: '/', depth: 5, ref: branch });
            // set current branch
            this.curBranch = branch;
            this.loading = false;
        });
    }
    sendRequest() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = true;
            yield this.setupComplete;
            console.log("requst sent");
            console.log(this.curBranch);
            let sha = yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["resolveRef"]({ dir: '/', ref: this.curBranch });
            console.log(sha);
            let { object: blob } = yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["readObject"]({
                dir: '/',
                oid: sha,
                filepath: 'properties.json',
                encoding: 'utf8'
            });
            let properties = JSON.parse(blob.toString());
            console.log(properties);
            let parentBranchName = properties.parent;
            console.log(parentBranchName);
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["checkout"]({ dir: '/', ref: parentBranchName });
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["commit"]({
                dir: '/',
                author: {
                    name: this.curBranch,
                    email: this.curBranch + "@mail.com"
                },
                message: 'Request sent from ' + this.curBranch + " on " + new Date()
            });
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["push"]({
                dir: '/',
                force: true,
                remote: 'origin',
                token: this.isomorphicGitService.GIT_TOKEN
            });
            // await git.checkout({ dir: '/', ref: this.curBranch })
            console.log("done");
            this.loading = false;
        });
    }
    acceptRequest(commit) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = true;
            console.log("checking out branch: ", commit.author.name);
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["checkout"]({ dir: '/', ref: commit.author.name });
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["commit"]({
                dir: '/',
                author: {
                    name: this.curBranch,
                    email: this.curBranch + "@mail.com"
                },
                message: 'Request accepted by ' + this.curBranch + " => Original Rquest: " + commit.oid + " " + commit.message
            });
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_4__["push"]({
                dir: '/',
                remote: 'origin',
                token: this.isomorphicGitService.GIT_TOKEN,
                force: true
            });
            console.log("done");
            this.loading = false;
        });
    }
    newChildBranch() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let name = this.childBranch;
            console.log("add child: ", name);
            let child = new _entities_Entity__WEBPACK_IMPORTED_MODULE_6__["Entity"](name, this.encryptionService, this.isomorphicGitService);
            let branch = this.curBranch == "master" ? "Ontario Ministry of Education" : this.curBranch;
            console.log(branch);
            let [entity, parentNode] = this.branchEntityMap[branch];
            let parent = entity;
            console.log(parentNode.name);
            yield parent.addChildEntity(child, parentNode, this.childType);
            console.log("done");
        });
    }
    parseBranchName(branch) {
        return (branch == "Ontario Ministry of Education") ? "master" : branch;
    }
};
DashboardComponent.ctorParameters = () => [
    { type: _services_isomorphic_git_service__WEBPACK_IMPORTED_MODULE_2__["IsomorhicGitService"] },
    { type: _services_encryption_service__WEBPACK_IMPORTED_MODULE_3__["EncryptionService"] }
];
DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-dashboard',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/dashboard.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./dashboard.component.sass */ "./src/app/components/dashboard/dashboard.component.sass")).default]
    })
], DashboardComponent);



/***/ }),

/***/ "./src/app/components/login-page/login-page.component.sass":
/*!*****************************************************************!*\
  !*** ./src/app/components/login-page/login-page.component.sass ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".button {\n  margin-bottom: 18px;\n  margin-left: 30px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sb2dpbi1wYWdlL0M6XFxERVZcXGdocGFnZS1lT1NSL3NyY1xcYXBwXFxjb21wb25lbnRzXFxsb2dpbi1wYWdlXFxsb2dpbi1wYWdlLmNvbXBvbmVudC5zYXNzIiwic3JjL2FwcC9jb21wb25lbnRzL2xvZ2luLXBhZ2UvbG9naW4tcGFnZS5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG1CQUFBO0VBQ0EsaUJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9naW4tcGFnZS9sb2dpbi1wYWdlLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ1dHRvblxyXG4gICAgbWFyZ2luLWJvdHRvbTogMThweFxyXG4gICAgbWFyZ2luLWxlZnQ6IDMwcHgiLCIuYnV0dG9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcbiAgbWFyZ2luLWxlZnQ6IDMwcHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/components/login-page/login-page.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/login-page/login-page.component.ts ***!
  \***************************************************************/
/*! exports provided: LoginPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageComponent", function() { return LoginPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var app_services_encryption_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/encryption.service */ "./src/app/services/encryption.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




let LoginPageComponent = class LoginPageComponent {
    constructor(encryptionService, http) {
        this.encryptionService = encryptionService;
        this.http = http;
        this.publicKey = "";
        this.proceed = false;
        this.admin = false;
    }
    ngOnInit() {
        this.send();
    }
    send() {
        this.http.post('http://localhost:3000/api/message', "hello").toPromise();
    }
    selectStudent() {
        this.proceed = true;
    }
    register() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const keys = this.encryptionService.generateKeys();
            this.show(`New public key credential generated: <br> ${keys.publicKey} <br>    private key: ${keys.secretKey}`);
            // navigator.credentials.store({id: "mock", type: "test"})
            // navigator.credentials()
            // console.log(cred.id)
        });
    }
    // const login = async () => {
    //   const cred = await navigator.credentials.get({ password: true })
    //   if (!cred) {
    //     return show('No credentials in store.')
    //   }
    //   console.log(cred)
    //   show(`You are now logged in as ${cred.id}.`)
    // }
    login() {
        console.log(this.publicKey);
        console.log();
    }
    show(msg) {
        document.getElementById('welcome-text').innerHTML = msg;
    }
};
LoginPageComponent.ctorParameters = () => [
    { type: app_services_encryption_service__WEBPACK_IMPORTED_MODULE_2__["EncryptionService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
LoginPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login-page',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login-page.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/login-page/login-page.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login-page.component.sass */ "./src/app/components/login-page/login-page.component.sass")).default]
    })
], LoginPageComponent);



/***/ }),

/***/ "./src/app/entities/Entity.ts":
/*!************************************!*\
  !*** ./src/app/entities/Entity.ts ***!
  \************************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

class Entity {
    constructor(name, encryptionService, isomorphicGitService) {
        this.name = name;
        this.encryptionService = encryptionService;
        this.isomorphicGitService = isomorphicGitService;
        this.childEntities = new Array();
        const identity = encryptionService.generateKeys();
        this.publicKey = identity.publicKey;
        this.privateKey = identity.secretKey;
    }
    addChildEntity(child, entityTree, childType) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let branch = this.name == "Ontario Ministry of Education" ? "master" : this.name;
            child.parentEntity = this;
            this.childEntities.push(child);
            //create child branch and establish branch properties
            yield this.isomorphicGitService.checkout(branch);
            yield this.isomorphicGitService.branch(child.name);
            let childNode = {
                name: child.name,
                type: childType,
                children: []
            };
            yield this.isomorphicGitService.fileWriteAndCommit("properties.json", JSON.stringify(childNode), child.name, true);
            //update master branch's branch hierarchy records
            yield this.isomorphicGitService.checkout("master");
            entityTree.children.push(childNode);
            yield this.isomorphicGitService.fileWriteAndCommit("properties.json", JSON.stringify(entityTree), "master", true);
            // await this.isomorphicGitService.commit(entityTree.name, entityTree.name + "@mail.com", "")
        });
    }
    removeChildEntity(child, name = this.name) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            child.parentEntity = undefined;
            this.childEntities.filter(x => x.privateKey != child.privateKey);
            yield this.isomorphicGitService.checkout(name);
            return this.isomorphicGitService.deleteBranch(child.name);
        });
    }
    sendRequest(message, receiver) {
        let request = {
            "bytes": this.encryptionService.decodeUTF8(message),
            "signature": this.encryptionService.generateSignature(message, this.privateKey)
        };
        return request;
    }
    verifyRequest(bytes, signature, sender, childEntities = this.childEntities) {
        return ((this.parentEntity != undefined && this.parentEntity == sender) || childEntities.includes(sender))
            && (this.encryptionService.verifySignature(bytes, signature, sender.publicKey));
    }
}


/***/ }),

/***/ "./src/app/entities/ministry.ts":
/*!**************************************!*\
  !*** ./src/app/entities/ministry.ts ***!
  \**************************************/
/*! exports provided: Ministry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ministry", function() { return Ministry; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Entity */ "./src/app/entities/Entity.ts");


class Ministry extends _Entity__WEBPACK_IMPORTED_MODULE_1__["Entity"] {
    constructor(name, encryptionService, isomorphicGitService) {
        super(name, encryptionService, isomorphicGitService);
        this.name = name;
        this.encryptionService = encryptionService;
        this.isomorphicGitService = isomorphicGitService;
    }
}


/***/ }),

/***/ "./src/app/services/contact.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/contact.service.ts ***!
  \*********************************************/
/*! exports provided: ContactService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactService", function() { return ContactService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm2015/http.js");



let ContactService = class ContactService {
    constructor(http) {
        this.http = http;
        this.contactsUrl = '/api/contacts';
    }
    // get("/api/contacts")
    getContacts() {
        return this.http.get(this.contactsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    // post("/api/contacts")
    createContact(newContact) {
        return this.http.post(this.contactsUrl, newContact)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    // get("/api/contacts/:id") endpoint not used by Angular app
    // delete("/api/contacts/:id")
    deleteContact(delContactId) {
        return this.http.delete(this.contactsUrl + '/' + delContactId)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    // put("/api/contacts/:id")
    updateContact(putContact) {
        var putUrl = this.contactsUrl + '/' + putContact._id;
        return this.http.put(putUrl, putContact)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    handleError(error) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
};
ContactService.ctorParameters = () => [
    { type: _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"] }
];
ContactService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], ContactService);



/***/ }),

/***/ "./src/app/services/encryption.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/encryption.service.ts ***!
  \************************************************/
/*! exports provided: EncryptionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EncryptionService", function() { return EncryptionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var tweetnacl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tweetnacl */ "./node_modules/tweetnacl/nacl-fast.js");
/* harmony import */ var tweetnacl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tweetnacl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tweetnacl_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tweetnacl-util */ "./node_modules/tweetnacl-util/nacl-util.js");
/* harmony import */ var tweetnacl_util__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tweetnacl_util__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");




let EncryptionService = class EncryptionService {
    constructor() {
    }
    generateKeys() {
        return tweetnacl__WEBPACK_IMPORTED_MODULE_1__["sign"].keyPair();
    }
    generateSignature(message, privateKey) {
        const bytes = Object(tweetnacl_util__WEBPACK_IMPORTED_MODULE_2__["decodeUTF8"])(message);
        const signature = tweetnacl__WEBPACK_IMPORTED_MODULE_1__["sign"].detached(bytes, privateKey);
        return signature;
    }
    verifySignature(bytes, signature, publicKey) {
        return tweetnacl__WEBPACK_IMPORTED_MODULE_1__["sign"].detached.verify(bytes, signature, publicKey);
    }
    decodeUTF8(message) {
        return Object(tweetnacl_util__WEBPACK_IMPORTED_MODULE_2__["decodeUTF8"])(message);
    }
    encodeUTF8(bytes) {
        return Object(tweetnacl_util__WEBPACK_IMPORTED_MODULE_2__["encodeUTF8"])(bytes);
    }
    /**Ceasar cipher */
    caesarEncrypt(text, shift) {
        var result = "";
        //loop through each caharacter in the text
        for (var i = 0; i < text.length; i++) {
            //get the character code of each letter
            var c = text.charCodeAt(i);
            // handle uppercase letters
            if (c >= 65 && c <= 90) {
                result += String.fromCharCode((c - 65 + shift) % 26 + 65);
                // handle lowercase letters
            }
            else if (c >= 97 && c <= 122) {
                result += String.fromCharCode((c - 97 + shift) % 26 + 97);
                // its not a letter, let it through
            }
            else {
                result += text.charAt(i);
            }
        }
        return result;
    }
    ceasarDecrypt(text, shift) {
        var result = "";
        shift = (26 - shift) % 26;
        result = this.caesarEncrypt(text, shift);
        return result;
    }
};
EncryptionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])({
        providedIn: 'root'
    })
], EncryptionService);

class Identity {
    constructor(publicKey, secretKey) {
        this.publicKey = publicKey;
        this.secretKey = secretKey;
    }
}


/***/ }),

/***/ "./src/app/services/isomorphic-git.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/isomorphic-git.service.ts ***!
  \****************************************************/
/*! exports provided: IsomorhicGitService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsomorhicGitService", function() { return IsomorhicGitService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var isomorphic_git__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! isomorphic-git */ "./node_modules/isomorphic-git/dist/for-future/isomorphic-git/index.js");
/* harmony import */ var _isomorphic_git_lightning_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @isomorphic-git/lightning-fs */ "./node_modules/@isomorphic-git/lightning-fs/src/index.js");
/* harmony import */ var _isomorphic_git_lightning_fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_isomorphic_git_lightning_fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _encryption_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./encryption.service */ "./src/app/services/encryption.service.ts");


// import * as browserfs from 'browserfs';

const browserfs = __webpack_require__(/*! browserfs */ "./node_modules/browserfs/dist/browserfs.js");


const fs = new _isomorphic_git_lightning_fs__WEBPACK_IMPORTED_MODULE_3___default.a("/");
// const fs = browserfs.BFSRequire("fs")
let IsomorhicGitService = 
/** IsmorphicGitService.build() to instantiate service.*/
class IsomorhicGitService {
    constructor(encryptionService) {
        this.ENCRYPTED_TOKEN = '1p3286q43m6rnoq3520r208737784p9495q094q5';
        this.REPO_URL = "https://github.com/OPSMinistryEducation/eOSR-Blockchain";
        this.CORS_PROXY = "https://cors.isomorphic-git.org";
        // /** Builder for async instantiation */
        // public static build(ownerName: string, ownerEmail: string, initMessage: string) {
        // 	const isoGit = new IsomorhicGitService()
        // 	return isoGit.init()
        // 		.then(function () {
        // 			return isoGit.commit(ownerName, ownerEmail, initMessage).then(function () {
        // 				return isoGit
        // 			})
        // 		});
        // }
        this.git = isomorphic_git__WEBPACK_IMPORTED_MODULE_2__;
        this.fs = fs;
        this.initialized = false;
        // Initialize local filesystem
        browserfs.configure({ fs: "InMemory", options: {} }, function (err) {
            if (err)
                return console.log(err);
            isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["plugins"].set('fs', fs);
        });
        this.GIT_TOKEN = encryptionService.ceasarDecrypt(this.ENCRYPTED_TOKEN, 12);
    }
    build(gitToken) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!this.initialized) {
                const newLocal = {
                    dir: '/',
                    corsProxy: this.CORS_PROXY,
                    url: this.REPO_URL,
                    ref: 'master',
                    singleBranch: false,
                    depth: 10,
                    token: gitToken
                };
                let promise = yield isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["clone"](newLocal).catch(err => console.log(err));
                this.initialized = true;
                return promise;
            }
            return Promise.resolve();
        });
    }
    /** Generic promise handler */
    resolvePromise(promise) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                return yield promise;
            }
            catch (error) {
                console.log(error);
                return Promise.reject();
            }
        });
    }
    /** Write data stream to a file in designated branch */
    fileWriteAndCommit(file, data, branch, overWrite = false) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["checkout"]({ dir: '/', ref: branch });
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["pull"]({
                dir: '/',
                ref: branch,
                singleBranch: true
            });
            if (!overWrite) {
                yield fs.appendFile(file, data, function (err) {
                    if (err)
                        throw err;
                    console.log(data + ' was appended to ' + file);
                });
            }
            else {
                yield fs.writeFile(file, data, function (err) {
                    if (err)
                        throw err;
                    console.log(data + ' was writtten to ' + file);
                });
            }
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["add"]({ dir: '/', filepath: file });
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["commit"]({
                dir: '/',
                author: {
                    name: branch,
                    email: branch + "@ontario.ca"
                },
                message: 'Update ' + file
            });
            yield isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["push"]({
                dir: '/',
                remote: 'origin',
                ref: branch,
                token: this.GIT_TOKEN,
                force: true
            }).catch(err => console.log(err));
            console.log("done");
        });
    }
    /** Initialize git repository */
    init() {
        return this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["init"]({ dir: "/" }));
    }
    /** Git new file to Git index for staging */
    add(filePath) {
        return this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["add"]({ dir: '/', filepath: filePath }));
    }
    /** Commit local changes*/
    commit(name, email, message) {
        return this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["commit"]({
            dir: '/',
            author: {
                name: name,
                email: email
            },
            message: message,
        }));
    }
    push() {
        return this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["push"]({
            dir: '/',
            remote: 'origin',
            ref: 'master',
            token: process.env.GITHUB_TOKEN,
        }));
    }
    /** Get all commit history */
    log(depth, branch) {
        this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["log"]({ dir: '/', depth: depth, ref: branch }))
            .then(x => console.log(x))
            .catch(err => console.log(err));
    }
    /** create new bracnh */
    branch(name) {
        return this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["branch"]({ dir: '/', ref: name }));
    }
    deleteBranch(name) {
        return this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["deleteBranch"]({ dir: '/', ref: name }));
    }
    /** list all local and remote branches */
    listBranches() {
        this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["listBranches"]({ dir: '/' })).then(x => console.log("Local: ", x));
        this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["listBranches"]({ dir: '/', remote: 'origin' })).then(x => console.log("Remote: ", x));
    }
    /** get current branch name */
    currentBranch() {
        let branch = this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["currentBranch"]({ dir: '/', fullname: false }));
        branch.then(x => console.log(branch))
            .catch(err => console.log(err));
    }
    /** checkout new branch */
    checkout(branch) {
        return this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["checkout"]({ dir: '/', ref: branch }));
    }
    // pull(): Promise<any> {
    // 	return this.resolvePromise(git.pull())
    // }
    /** Clone a remote git repository */
    clone(repoUrl) {
        // Make temporary directory
        return this.resolvePromise(isomorphic_git__WEBPACK_IMPORTED_MODULE_2__["clone"]({
            dir: '/',
            url: repoUrl,
            ref: 'master',
            singleBranch: true,
            depth: 10
        }));
    }
};
IsomorhicGitService.ctorParameters = () => [
    { type: _encryption_service__WEBPACK_IMPORTED_MODULE_4__["EncryptionService"] }
];
IsomorhicGitService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
    /** IsmorphicGitService.build() to instantiate service.*/
], IsomorhicGitService);

// --------------------TEST---------------------------
// ES6 euivalent of Python's if __name__ == "__main__"
// let isoGit = IsomorhicGitService.build("Ministry of education", "OPS@EDU.ca", "Ministry instantiated");
// isoGit.then(isoGit => {
// (async () => {
// 	// //test branching from master
// 	// await Promise.all([isoGit.branch("TDSB"), isoGit.branch("WDSB")])
// 	// isoGit.listBranches()
// 	// //test hierarchical branching
// 	// await isoGit.checkout('TDSB')
// 	// await isoGit.commit("TDSB", "TDSB@ontario.ca", "TDSB school board instantiated")
// 	// await Promise.all([isoGit.branch("school-1"), isoGit.branch("school-2")])
// 	// 	.catch(err => console.log(err))
// 	// await isoGit.checkout('WDSB')
// 	// await isoGit.commit("WDSB", "WDSB@ontario.ca", "WDSB school board instantiated").then(SHA => console.log("SHA: ", SHA))
// 	// await Promise.all([isoGit.branch("school-3")])
// 	// 	.catch(err => console.log(err))
// 	// isoGit.listBranches()
// 	// await isoGit.checkout("school-1")
// 	// await isoGit.currentBranch()
// 	// // Should be branched under TDSB, therefore log commits unique to TDSB
// 	// await isoGit.log(5, "school-1")
// 	// // Should be branched under TDSB, therefore log commits unique to TDSB
// 	// await isoGit.log(5, "school-2")
// 	// // Should be branched under WDSB, therefore log commits unique to WDSB
// 	// await isoGit.log(1, "school-3")
// 	// await isoGit.log(5, "master")
// 	// console.log("cloning")
// 	// Initialize file system
// 	// browserfs.configure(
// 	// 	{ fs: "InMemory", options: {} },
// 	// 	function (err: any) {
// 	// 		if (err)
// 	// 			return console.log(err);
// 	// 		const fs = browserfs.BFSRequire("fs");
// 	// 		git.plugins.set('fs', fs);
// 	// 	})
// 	// git.plugins.set('fs', fs);
// 	// Initialize file system
// 	// await browserfs.configure(
// 	// 	{ fs: "InMemory", options: {} },
// 	// 	function (err: any) {
// 	// 		if (err)
// 	// 			return console.log(err);
// 	// 		const fs = browserfs.BFSRequire("fs");
// 	// 		// fs.mkdir("/")
// 	// 		git.plugins.set('fs', fs);
// 	// 	})
// 	console.log("hello")
// 	// Initialize file system
// 	await browserfs.configure(
// 		{ fs: "InMemory", options: {} },
// 		function (err: any) {
// 			if (err)
// 				return console.log(err);
// 			git.plugins.set('fs', fs);
// 		})
// 	const newLocal = {
// 		dir: '/',
// 		corsProxy: 'https://cors.isomorphic-git.org',
// 		url: 'https://github.com/OPSMinistryEducation/eOSR-Blockchain',
// 		ref: 'master',
// 		singleBranch: false,
// 		depth: 10,
// 		token: 
// 	};
// 	await git.clone(newLocal);
// 	console.log('done')
// 	const author = {
// 		name: "s",
// 		email: "s@mail.com",
// 		date: Date(),
// 	}
// 	// await fs.appendFile('test.txt', 'data to append', function (err) {
// 	// 		if (err) throw err;
// 	// 		console.log('The "data to append" was appended to file!');
// 	// 	});
// 	// await fs.readFile('test.txt', function (err: Error, data: string) {
// 	// 	if (err) throw err;
// 	// 	console.log(data);
// 	// });
// 	// await git.add({ dir: '/', filepath: 'test.txt' })
// 	// await isoGit.commit("rw", "ryland.wang@ontario.ca", "hello world")
// 	// await git.push({
// 	// 	dir: '/',
// 	// 	remote: 'origin',
// 	// 	ref: 'master',
// 	// 	token: 
// 	// 	force: true
// 	// }).catch(err => console.log(err))
// 	// console.log("done")
// 	await git.listFiles({ dir: '/', ref: 'master' }).then(x => console.log(x))
// 	await git.listFiles({ dir: '/' }).then(x => console.log(x))
// 	// await 
// 	// await fs.readFile('test.txt', function (err: Error, data: string) {
// 	// 		if (err) throw err;
// 	// 		console.log(data);
// 	// 	});
// 	await git.log({ dir: '/', depth: 10 }).then(x => console.log(x))
// 	// checkout the master branch
// 	await git.checkout({ dir: '/', ref: 'TDSB' })
// 	// Get the current branch name
// 	let branch = await git.currentBranch({ dir: '/', fullname: false })
// 	console.log(branch)
// 	// Get the contents of 'README.md' in the master branch.
// 	let sha = await git.resolveRef({ dir: '/', ref: 'TDSB' })
// 	console.log(sha)
// 	let { object: blob } = await git.readObject({
// 		dir: '/',
// 		oid: sha,
// 		filepath: 'properties.json',
// 		encoding: 'utf8'
// 	})
// 	let properties = JSON.parse(blob.toString())
// 	// checkout the master branch
// 	await git.checkout({ dir: '/', ref: properties.parent })
// 	// Get the current branch name
// 	branch = await git.currentBranch({ dir: '/', fullname: false })
// 	console.log(branch)
// })();
// })


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\DEV\ghpage-eOSR\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map