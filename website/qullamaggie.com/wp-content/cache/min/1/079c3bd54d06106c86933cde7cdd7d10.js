/*! jQuery Migrate v3.4.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(e){return t(e,window)}):"object"==typeof module&&module.exports?module.exports=t(require("jquery"),window):t(jQuery,window)}(function(s,n){"use strict";function e(e){return 0<=function(e,t){for(var r=/^(\d+)\.(\d+)\.(\d+)/,n=r.exec(e)||[],o=r.exec(t)||[],a=1;a<=3;a++){if(+o[a]<+n[a])return 1;if(+n[a]<+o[a])return-1}return 0}(s.fn.jquery,e)}s.migrateVersion="3.4.1";var t=Object.create(null);s.migrateDisablePatches=function(){for(var e=0;e<arguments.length;e++)t[arguments[e]]=!0},s.migrateEnablePatches=function(){for(var e=0;e<arguments.length;e++)delete t[arguments[e]]},s.migrateIsPatchEnabled=function(e){return!t[e]},n.console&&n.console.log&&(s&&e("3.0.0")&&!e("5.0.0")||n.console.log("JQMIGRATE: jQuery 3.x-4.x REQUIRED"),s.migrateWarnings&&n.console.log("JQMIGRATE: Migrate plugin loaded multiple times"),n.console.log("JQMIGRATE: Migrate is installed"+(s.migrateMute?"":" with logging active")+", version "+s.migrateVersion));var o={};function u(e,t){var r=n.console;!s.migrateIsPatchEnabled(e)||s.migrateDeduplicateWarnings&&o[t]||(o[t]=!0,s.migrateWarnings.push(t+" ["+e+"]"),r&&r.warn&&!s.migrateMute&&(r.warn("JQMIGRATE: "+t),s.migrateTrace&&r.trace&&r.trace()))}function r(e,t,r,n,o){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){return u(n,o),r},set:function(e){u(n,o),r=e}})}function a(e,t,r,n,o){var a=e[t];e[t]=function(){return o&&u(n,o),(s.migrateIsPatchEnabled(n)?r:a||s.noop).apply(this,arguments)}}function c(e,t,r,n,o){if(!o)throw new Error("No warning message provided");return a(e,t,r,n,o),0}function i(e,t,r,n){return a(e,t,r,n),0}s.migrateDeduplicateWarnings=!0,s.migrateWarnings=[],void 0===s.migrateTrace&&(s.migrateTrace=!0),s.migrateReset=function(){o={},s.migrateWarnings.length=0},"BackCompat"===n.document.compatMode&&u("quirks","jQuery is not compatible with Quirks Mode");var d,l,p,f={},m=s.fn.init,y=s.find,h=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,g=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,v=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;for(d in i(s.fn,"init",function(e){var t=Array.prototype.slice.call(arguments);return s.migrateIsPatchEnabled("selector-empty-id")&&"string"==typeof e&&"#"===e&&(u("selector-empty-id","jQuery( '#' ) is not a valid selector"),t[0]=[]),m.apply(this,t)},"selector-empty-id"),s.fn.init.prototype=s.fn,i(s,"find",function(t){var r=Array.prototype.slice.call(arguments);if("string"==typeof t&&h.test(t))try{n.document.querySelector(t)}catch(e){t=t.replace(g,function(e,t,r,n){return"["+t+r+'"'+n+'"]'});try{n.document.querySelector(t),u("selector-hash","Attribute selector with '#' must be quoted: "+r[0]),r[0]=t}catch(e){u("selector-hash","Attribute selector with '#' was not fixed: "+r[0])}}return y.apply(this,r)},"selector-hash"),y)Object.prototype.hasOwnProperty.call(y,d)&&(s.find[d]=y[d]);c(s.fn,"size",function(){return this.length},"size","jQuery.fn.size() is deprecated and removed; use the .length property"),c(s,"parseJSON",function(){return JSON.parse.apply(null,arguments)},"parseJSON","jQuery.parseJSON is deprecated; use JSON.parse"),c(s,"holdReady",s.holdReady,"holdReady","jQuery.holdReady is deprecated"),c(s,"unique",s.uniqueSort,"unique","jQuery.unique is deprecated; use jQuery.uniqueSort"),r(s.expr,"filters",s.expr.pseudos,"expr-pre-pseudos","jQuery.expr.filters is deprecated; use jQuery.expr.pseudos"),r(s.expr,":",s.expr.pseudos,"expr-pre-pseudos","jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos"),e("3.1.1")&&c(s,"trim",function(e){return null==e?"":(e+"").replace(v,"$1")},"trim","jQuery.trim is deprecated; use String.prototype.trim"),e("3.2.0")&&(c(s,"nodeName",function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},"nodeName","jQuery.nodeName is deprecated"),c(s,"isArray",Array.isArray,"isArray","jQuery.isArray is deprecated; use Array.isArray")),e("3.3.0")&&(c(s,"isNumeric",function(e){var t=typeof e;return("number"==t||"string"==t)&&!isNaN(e-parseFloat(e))},"isNumeric","jQuery.isNumeric() is deprecated"),s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){f["[object "+t+"]"]=t.toLowerCase()}),c(s,"type",function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?f[Object.prototype.toString.call(e)]||"object":typeof e},"type","jQuery.type is deprecated"),c(s,"isFunction",function(e){return"function"==typeof e},"isFunction","jQuery.isFunction() is deprecated"),c(s,"isWindow",function(e){return null!=e&&e===e.window},"isWindow","jQuery.isWindow() is deprecated")),s.ajax&&(l=s.ajax,p=/(=)\?(?=&|$)|\?\?/,i(s,"ajax",function(){var e=l.apply(this,arguments);return e.promise&&(c(e,"success",e.done,"jqXHR-methods","jQXHR.success is deprecated and removed"),c(e,"error",e.fail,"jqXHR-methods","jQXHR.error is deprecated and removed"),c(e,"complete",e.always,"jqXHR-methods","jQXHR.complete is deprecated and removed")),e},"jqXHR-methods"),e("4.0.0")||s.ajaxPrefilter("+json",function(e){!1!==e.jsonp&&(p.test(e.url)||"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&p.test(e.data))&&u("jsonp-promotion","JSON-to-JSONP auto-promotion is deprecated")}));var j=s.fn.removeAttr,b=s.fn.toggleClass,w=/\S+/g;function x(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()})}i(s.fn,"removeAttr",function(e){var r=this,n=!1;return s.each(e.match(w),function(e,t){s.expr.match.bool.test(t)&&r.each(function(){if(!1!==s(this).prop(t))return!(n=!0)}),n&&(u("removeAttr-bool","jQuery.fn.removeAttr no longer sets boolean properties: "+t),r.prop(t,!1))}),j.apply(this,arguments)},"removeAttr-bool"),i(s.fn,"toggleClass",function(t){return void 0!==t&&"boolean"!=typeof t?b.apply(this,arguments):(u("toggleClass-bool","jQuery.fn.toggleClass( boolean ) is deprecated"),this.each(function(){var e=this.getAttribute&&this.getAttribute("class")||"";e&&s.data(this,"__className__",e),this.setAttribute&&this.setAttribute("class",!e&&!1!==t&&s.data(this,"__className__")||"")}))},"toggleClass-bool");var Q,A,R=!1,C=/^[a-z]/,N=/^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;s.swap&&s.each(["height","width","reliableMarginRight"],function(e,t){var r=s.cssHooks[t]&&s.cssHooks[t].get;r&&(s.cssHooks[t].get=function(){var e;return R=!0,e=r.apply(this,arguments),R=!1,e})}),i(s,"swap",function(e,t,r,n){var o,a,i={};for(a in R||u("swap","jQuery.swap() is undocumented and deprecated"),t)i[a]=e.style[a],e.style[a]=t[a];for(a in o=r.apply(e,n||[]),t)e.style[a]=i[a];return o},"swap"),e("3.4.0")&&"undefined"!=typeof Proxy&&(s.cssProps=new Proxy(s.cssProps||{},{set:function(){return u("cssProps","jQuery.cssProps is deprecated"),Reflect.set.apply(this,arguments)}})),e("4.0.0")?(A={animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},"undefined"!=typeof Proxy?s.cssNumber=new Proxy(A,{get:function(){return u("css-number","jQuery.cssNumber is deprecated"),Reflect.get.apply(this,arguments)},set:function(){return u("css-number","jQuery.cssNumber is deprecated"),Reflect.set.apply(this,arguments)}}):s.cssNumber=A):A=s.cssNumber,Q=s.fn.css,i(s.fn,"css",function(e,t){var r,n,o=this;return e&&"object"==typeof e&&!Array.isArray(e)?(s.each(e,function(e,t){s.fn.css.call(o,e,t)}),this):("number"==typeof t&&(r=x(e),n=r,C.test(n)&&N.test(n[0].toUpperCase()+n.slice(1))||A[r]||u("css-number",'Number-typed values are deprecated for jQuery.fn.css( "'+e+'", value )')),Q.apply(this,arguments))},"css-number");var S,P,k,H,E=s.data;i(s,"data",function(e,t,r){var n,o,a;if(t&&"object"==typeof t&&2===arguments.length){for(a in n=s.hasData(e)&&E.call(this,e),o={},t)a!==x(a)?(u("data-camelCase","jQuery.data() always sets/gets camelCased names: "+a),n[a]=t[a]):o[a]=t[a];return E.call(this,e,o),t}return t&&"string"==typeof t&&t!==x(t)&&(n=s.hasData(e)&&E.call(this,e))&&t in n?(u("data-camelCase","jQuery.data() always sets/gets camelCased names: "+t),2<arguments.length&&(n[t]=r),n[t]):E.apply(this,arguments)},"data-camelCase"),s.fx&&(k=s.Tween.prototype.run,H=function(e){return e},i(s.Tween.prototype,"run",function(){1<s.easing[this.easing].length&&(u("easing-one-arg","'jQuery.easing."+this.easing.toString()+"' should use only one argument"),s.easing[this.easing]=H),k.apply(this,arguments)},"easing-one-arg"),S=s.fx.interval,P="jQuery.fx.interval is deprecated",n.requestAnimationFrame&&Object.defineProperty(s.fx,"interval",{configurable:!0,enumerable:!0,get:function(){return n.document.hidden||u("fx-interval",P),s.migrateIsPatchEnabled("fx-interval")&&void 0===S?13:S},set:function(e){u("fx-interval",P),S=e}}));var M=s.fn.load,q=s.event.add,O=s.event.fix;s.event.props=[],s.event.fixHooks={},r(s.event.props,"concat",s.event.props.concat,"event-old-patch","jQuery.event.props.concat() is deprecated and removed"),i(s.event,"fix",function(e){var t,r=e.type,n=this.fixHooks[r],o=s.event.props;if(o.length){u("event-old-patch","jQuery.event.props are deprecated and removed: "+o.join());while(o.length)s.event.addProp(o.pop())}if(n&&!n._migrated_&&(n._migrated_=!0,u("event-old-patch","jQuery.event.fixHooks are deprecated and removed: "+r),(o=n.props)&&o.length))while(o.length)s.event.addProp(o.pop());return t=O.call(this,e),n&&n.filter?n.filter(t,e):t},"event-old-patch"),i(s.event,"add",function(e,t){return e===n&&"load"===t&&"complete"===n.document.readyState&&u("load-after-event","jQuery(window).on('load'...) called after load event occurred"),q.apply(this,arguments)},"load-after-event"),s.each(["load","unload","error"],function(e,t){i(s.fn,t,function(){var e=Array.prototype.slice.call(arguments,0);return"load"===t&&"string"==typeof e[0]?M.apply(this,e):(u("shorthand-removed-v3","jQuery.fn."+t+"() is deprecated"),e.splice(0,0,t),arguments.length?this.on.apply(this,e):(this.triggerHandler.apply(this,e),this))},"shorthand-removed-v3")}),s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,r){c(s.fn,r,function(e,t){return 0<arguments.length?this.on(r,null,e,t):this.trigger(r)},"shorthand-deprecated-v3","jQuery.fn."+r+"() event shorthand is deprecated")}),s(function(){s(n.document).triggerHandler("ready")}),s.event.special.ready={setup:function(){this===n.document&&u("ready-event","'ready' event is deprecated")}},c(s.fn,"bind",function(e,t,r){return this.on(e,null,t,r)},"pre-on-methods","jQuery.fn.bind() is deprecated"),c(s.fn,"unbind",function(e,t){return this.off(e,null,t)},"pre-on-methods","jQuery.fn.unbind() is deprecated"),c(s.fn,"delegate",function(e,t,r,n){return this.on(t,e,r,n)},"pre-on-methods","jQuery.fn.delegate() is deprecated"),c(s.fn,"undelegate",function(e,t,r){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",r)},"pre-on-methods","jQuery.fn.undelegate() is deprecated"),c(s.fn,"hover",function(e,t){return this.on("mouseenter",e).on("mouseleave",t||e)},"pre-on-methods","jQuery.fn.hover() is deprecated");function T(e){var t=n.document.implementation.createHTMLDocument("");return t.body.innerHTML=e,t.body&&t.body.innerHTML}var F=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;s.UNSAFE_restoreLegacyHtmlPrefilter=function(){s.migrateEnablePatches("self-closed-tags")},i(s,"htmlPrefilter",function(e){var t,r;return(r=(t=e).replace(F,"<$1></$2>"))!==t&&T(t)!==T(r)&&u("self-closed-tags","HTML tags must be properly nested and closed: "+t),e.replace(F,"<$1></$2>")},"self-closed-tags"),s.migrateDisablePatches("self-closed-tags");var D,W,_,I=s.fn.offset;return i(s.fn,"offset",function(){var e=this[0];return!e||e.nodeType&&e.getBoundingClientRect?I.apply(this,arguments):(u("offset-valid-elem","jQuery.fn.offset() requires a valid DOM element"),arguments.length?this:void 0)},"offset-valid-elem"),s.ajax&&(D=s.param,i(s,"param",function(e,t){var r=s.ajaxSettings&&s.ajaxSettings.traditional;return void 0===t&&r&&(u("param-ajax-traditional","jQuery.param() no longer uses jQuery.ajaxSettings.traditional"),t=r),D.call(this,e,t)},"param-ajax-traditional")),c(s.fn,"andSelf",s.fn.addBack,"andSelf","jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"),s.Deferred&&(W=s.Deferred,_=[["resolve","done",s.Callbacks("once memory"),s.Callbacks("once memory"),"resolved"],["reject","fail",s.Callbacks("once memory"),s.Callbacks("once memory"),"rejected"],["notify","progress",s.Callbacks("memory"),s.Callbacks("memory")]],i(s,"Deferred",function(e){var a=W(),i=a.promise();function t(){var o=arguments;return s.Deferred(function(n){s.each(_,function(e,t){var r="function"==typeof o[e]&&o[e];a[t[1]](function(){var e=r&&r.apply(this,arguments);e&&"function"==typeof e.promise?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[t[0]+"With"](this===i?n.promise():this,r?[e]:arguments)})}),o=null}).promise()}return c(a,"pipe",t,"deferred-pipe","deferred.pipe() is deprecated"),c(i,"pipe",t,"deferred-pipe","deferred.pipe() is deprecated"),e&&e.call(a,a),a},"deferred-pipe"),s.Deferred.exceptionHook=W.exceptionHook),s});/(trident|msie)/i.test(navigator.userAgent)&&document.getElementById&&window.addEventListener&&window.addEventListener("hashchange",function(){var t,e=location.hash.substring(1);/^[A-z0-9_-]+$/.test(e)&&(t=document.getElementById(e))&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())},!1);!function(){const e=document.querySelectorAll(".coblocks-animate");if("IntersectionObserver"in window){const t=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&(e.target.classList.add(e.target.dataset.coblocksAnimation),t.unobserve(e.target))}))}),{threshold:[.15]});e.forEach((e=>{t.observe(e)}))}else e.forEach((e=>{e.classList.remove("coblocks-animate"),delete e.dataset.coblocksAnimation}))}();/*! This file is auto-generated */
/*!
 * imagesLoaded PACKAGED v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!function(t,e){"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,(function(){function t(){}let e=t.prototype;return e.on=function(t,e){if(!t||!e)return this;let i=this._events=this._events||{},s=i[t]=i[t]||[];return s.includes(e)||s.push(e),this},e.once=function(t,e){if(!t||!e)return this;this.on(t,e);let i=this._onceEvents=this._onceEvents||{};return(i[t]=i[t]||{})[e]=!0,this},e.off=function(t,e){let i=this._events&&this._events[t];if(!i||!i.length)return this;let s=i.indexOf(e);return-1!=s&&i.splice(s,1),this},e.emitEvent=function(t,e){let i=this._events&&this._events[t];if(!i||!i.length)return this;i=i.slice(0),e=e||[];let s=this._onceEvents&&this._onceEvents[t];for(let n of i){s&&s[n]&&(this.off(t,n),delete s[n]),n.apply(this,e)}return this},e.allOff=function(){return delete this._events,delete this._onceEvents,this},t})),
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
function(t,e){"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}("undefined"!=typeof window?window:this,(function(t,e){let i=t.jQuery,s=t.console;function n(t,e,o){if(!(this instanceof n))return new n(t,e,o);let r=t;var h;("string"==typeof t&&(r=document.querySelectorAll(t)),r)?(this.elements=(h=r,Array.isArray(h)?h:"object"==typeof h&&"number"==typeof h.length?[...h]:[h]),this.options={},"function"==typeof e?o=e:Object.assign(this.options,e),o&&this.on("always",o),this.getImages(),i&&(this.jqDeferred=new i.Deferred),setTimeout(this.check.bind(this))):s.error(`Bad element for imagesLoaded ${r||t}`)}n.prototype=Object.create(e.prototype),n.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)};const o=[1,9,11];n.prototype.addElementImages=function(t){"IMG"===t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);let{nodeType:e}=t;if(!e||!o.includes(e))return;let i=t.querySelectorAll("img");for(let t of i)this.addImage(t);if("string"==typeof this.options.background){let e=t.querySelectorAll(this.options.background);for(let t of e)this.addElementBackgroundImages(t)}};const r=/url\((['"])?(.*?)\1\)/gi;function h(t){this.img=t}function d(t,e){this.url=t,this.element=e,this.img=new Image}return n.prototype.addElementBackgroundImages=function(t){let e=getComputedStyle(t);if(!e)return;let i=r.exec(e.backgroundImage);for(;null!==i;){let s=i&&i[2];s&&this.addBackground(s,t),i=r.exec(e.backgroundImage)}},n.prototype.addImage=function(t){let e=new h(t);this.images.push(e)},n.prototype.addBackground=function(t,e){let i=new d(t,e);this.images.push(i)},n.prototype.check=function(){if(this.progressedCount=0,this.hasAnyBroken=!1,!this.images.length)return void this.complete();let t=(t,e,i)=>{setTimeout((()=>{this.progress(t,e,i)}))};this.images.forEach((function(e){e.once("progress",t),e.check()}))},n.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount===this.images.length&&this.complete(),this.options.debug&&s&&s.log(`progress: ${i}`,t,e)},n.prototype.complete=function(){let t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){let t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},h.prototype=Object.create(e.prototype),h.prototype.check=function(){this.getIsImageComplete()?this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.img.crossOrigin&&(this.proxyImage.crossOrigin=this.img.crossOrigin),this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.currentSrc||this.img.src)},h.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},h.prototype.confirm=function(t,e){this.isLoaded=t;let{parentNode:i}=this.img,s="PICTURE"===i.nodeName?i:this.img;this.emitEvent("progress",[this,s,e])},h.prototype.handleEvent=function(t){let e="on"+t.type;this[e]&&this[e](t)},h.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},h.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},h.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},d.prototype=Object.create(h.prototype),d.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},d.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},d.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},n.makeJQueryPlugin=function(e){(e=e||t.jQuery)&&(i=e,i.fn.imagesLoaded=function(t,e){return new n(this,t,e).jqDeferred.promise(i(this))})},n.makeJQueryPlugin(),n}));/*! This file is auto-generated */
/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(t,r),delete n[r]),r.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);s=200==Math.round(t(o.width)),r.isBoxSizeOuter=s,i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e};var n=Array.prototype.slice;i.makeArray=function(t){if(Array.isArray(t))return t;if(null===t||void 0===t)return[];var e="object"==typeof t&&"number"==typeof t.length;return e?n.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){i=i||100;var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var r=i.toDashed(n),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(o&&o.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,n,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=parseFloat(n),s=parseFloat(o),a=this.layout.size;-1!=n.indexOf("%")&&(r=r/100*a.width),-1!=o.indexOf("%")&&(s=s/100*a.height),r=isNaN(r)?0:r,s=isNaN(s)?0:s,r-=e?a.paddingLeft:a.paddingRight,s-=i?a.paddingTop:a.paddingBottom,this.position.x=r,this.position.y=s},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=t==this.position.x&&e==this.position.y;if(this.setPosition(t,e),o&&!this.isTransitioning)return void this.layoutPosition();var r=t-i,s=e-n,a={};a.transform=this.getTranslate(r,s),this.transition({to:a,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseFloat(t),this.position.y=parseFloat(e)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});(function($){"use strict";$.fn.menumaker=function(options){var cssmenu=$(this),settings=$.extend({title:"Menu",format:"dropdown",breakpoint:768,sticky:!1},options);return this.each(function(){cssmenu.find('li ul').parent().addClass('has-sub');if(settings.format!='select'){cssmenu.prepend('<div id="menu-button">'+settings.title+'</div>');$(this).find("#menu-button").on('click',function(){$(this).toggleClass('menu-opened');var mainmenu=$(this).next('ul');if(mainmenu.hasClass('open')){mainmenu.hide().removeClass('open')}else{mainmenu.show().addClass('open');if(settings.format==="dropdown"){mainmenu.find('ul').show()}}});var multiTg=function(){cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');cssmenu.find('.submenu-button').on('click',function(){$(this).toggleClass('submenu-opened');if($(this).siblings('ul').hasClass('open')){$(this).siblings('ul').removeClass('open').hide()}else{$(this).siblings('ul').addClass('open').show()}})};if(settings.format==='multitoggle')multiTg();else cssmenu.addClass('dropdown')}else if(settings.format==='select'){cssmenu.append('<select style="width: 100%"/>').addClass('select-list');var selectList=cssmenu.find('select');selectList.append('<option>'+settings.title+'</option>',{"selected":"selected","value":""});cssmenu.find('a').each(function(){var element=$(this),indentation="";for(i=1;i<element.parents('ul').length;i++){indentation+='-'}
selectList.append('<option value="'+$(this).attr('href')+'">'+indentation+element.text()+'</option')});selectList.on('change',function(){window.location=$(this).find("option:selected").val()})}
if(settings.sticky===!0)cssmenu.css('position','fixed');var resizeFix=function(){if($(window).width()>settings.breakpoint){cssmenu.find('ul').show();cssmenu.removeClass('small-screen');if(settings.format==='select'){cssmenu.find('select').hide()}else{cssmenu.find("#menu-button").removeClass("menu-opened")}}
if($(window).width()<=settings.breakpoint&&!cssmenu.hasClass("small-screen")){cssmenu.find('ul').hide().removeClass('open');cssmenu.addClass('small-screen');if(settings.format==='select'){cssmenu.find('select').show()}}};resizeFix();return $(window).on('resize',resizeFix)})}})(jQuery);/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
/**
 * Owl carousel
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($,window,document,undefined){/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Proxied event handlers.
		 * @protected
		 */
		this._handlers = {};

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from being retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Widths of all items.
		 */
		this._widths = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		/**
		 * Current state information for the drag operation.
		 * @todo #261
		 * @protected
		 */
		this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		};

		/**
		 * Current state information and their tags.
		 * @type {Object}
		 * @protected
		 */
		this._states = {
			current: {},
			tags: {
				'initializing': [ 'busy' ],
				'animating': [ 'busy' ],
				'dragging': [ 'interacting' ]
			}
		};

		$.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
			this._handlers[handler] = $.proxy(this[handler], this);
		}, this));

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Workers, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,
		rewind: false,
		checkVisibility: true,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,

		fallbackEasing: 'swing',
		slideTransition: '',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		refreshClass: 'owl-refresh',
		loadedClass: 'owl-loaded',
		loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		stageClass: 'owl-stage',
		stageOuterClass: 'owl-stage-outer',
		grabClass: 'owl-grab'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Enumeration for types.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Type = {
		Event: 'event',
		State: 'state'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * List of workers involved in the update process.
	 */
	Owl.Workers = [ {
		filter: [ 'width', 'settings' ],
		run: function() {
			this._width = this.$element.width();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			this.$stage.children('.cloned').remove();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var margin = this.settings.margin || '',
				grid = !this.settings.autoWidth,
				rtl = this.settings.rtl,
				css = {
					'width': 'auto',
					'margin-left': rtl ? margin : '',
					'margin-right': rtl ? '' : margin
				};

			!grid && this.$stage.children().css(css);

			cache.css = css;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				merge = null,
				iterator = this._items.length,
				grid = !this.settings.autoWidth,
				widths = [];

			cache.items = {
				merge: false,
				width: width
			};

			while (iterator--) {
				merge = this._mergers[iterator];
				merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

				cache.items.merge = merge > 1 || cache.items.merge;

				widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
			}

			this._widths = widths;
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var clones = [],
				items = this._items,
				settings = this.settings,
				// TODO: Should be computed from number of min width items in stage
				view = Math.max(settings.items * 2, 4),
				size = Math.ceil(items.length / 2) * 2,
				repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
				append = '',
				prepend = '';

			repeat /= 2;

			while (repeat > 0) {
				// Switch to only using appended clones
				clones.push(this.normalize(clones.length / 2, true));
				append = append + items[clones[clones.length - 1]][0].outerHTML;
				clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
				prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
				repeat -= 1;
			}

			this._clones = clones;

			$(append).addClass('cloned').appendTo(this.$stage);
			$(prepend).addClass('cloned').prependTo(this.$stage);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				size = this._clones.length + this._items.length,
				iterator = -1,
				previous = 0,
				current = 0,
				coordinates = [];

			while (++iterator < size) {
				previous = coordinates[iterator - 1] || 0;
				current = this._widths[this.relative(iterator)] + this.settings.margin;
				coordinates.push(previous + current * rtl);
			}

			this._coordinates = coordinates;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var padding = this.settings.stagePadding,
				coordinates = this._coordinates,
				css = {
					'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
					'padding-left': padding || '',
					'padding-right': padding || ''
				};

			this.$stage.css(css);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var iterator = this._coordinates.length,
				grid = !this.settings.autoWidth,
				items = this.$stage.children();

			if (grid && cache.items.merge) {
				while (iterator--) {
					cache.css.width = this._widths[this.relative(iterator)];
					items.eq(iterator).css(cache.css);
				}
			} else if (grid) {
				cache.css.width = cache.items.width;
				items.css(cache.css);
			}
		}
	}, {
		filter: [ 'items' ],
		run: function() {
			this._coordinates.length < 1 && this.$stage.removeAttr('style');
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
			cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
			this.reset(cache.current);
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.active').removeClass('active');
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

			this.$stage.children('.center').removeClass('center');
			if (this.settings.center) {
				this.$stage.children().eq(this.current()).addClass('center');
			}
		}
	} ];

	/**
	 * Create the stage DOM element
	 */
	Owl.prototype.initializeStage = function() {
		this.$stage = this.$element.find('.' + this.settings.stageClass);

		// if the stage is already in the DOM, grab it and skip stage initialization
		if (this.$stage.length) {
			return;
		}

		this.$element.addClass(this.options.loadingClass);

		// create stage
		this.$stage = $('<' + this.settings.stageElement + '>', {
			"class": this.settings.stageClass
		}).wrap( $( '<div/>', {
			"class": this.settings.stageOuterClass
		}));

		// append stage
		this.$element.append(this.$stage.parent());
	};

	/**
	 * Create item DOM elements
	 */
	Owl.prototype.initializeItems = function() {
		var $items = this.$element.find('.owl-item');

		// if the items are already in the DOM, grab them and skip item initialization
		if ($items.length) {
			this._items = $items.get().map(function(item) {
				return $(item);
			});

			this._mergers = this._items.map(function() {
				return 1;
			});

			this.refresh();

			return;
		}

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// check visibility
		if (this.isVisible()) {
			// update view
			this.refresh();
		} else {
			// invalidate width
			this.invalidate('width');
		}

		this.$element
			.removeClass(this.options.loadingClass)
			.addClass(this.options.loadedClass);
	};

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.enter('initializing');
		this.trigger('initialize');

		this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

		if (this.settings.autoWidth && !this.is('pre-loading')) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
			}
		}

		this.initializeStage();
		this.initializeItems();

		// register event handlers
		this.registerEventHandlers();

		this.leave('initializing');
		this.trigger('initialized');
	};

	/**
	 * @returns {Boolean} visibility of $element
	 *                    if you know the carousel will always be visible you can set `checkVisibility` to `false` to
	 *                    prevent the expensive browser layout forced reflow the $element.is(':visible') does
	 */
	Owl.prototype.isVisible = function() {
		return this.settings.checkVisibility
			? this.$element.is(':visible')
			: true;
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			if (typeof settings.stagePadding === 'function') {
				settings.stagePadding = settings.stagePadding();
			}
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class',
					this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
				);
			}
		}

		this.trigger('change', { property: { name: 'settings', value: settings } });
		this._breakpoint = match;
		this.settings = settings;
		this.invalidate('settings');
		this.trigger('changed', { property: { name: 'settings', value: this.settings } });
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.options.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};

		!this.is('valid') && this.enter('valid');
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		this.enter('refreshing');
		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		this.$element.addClass(this.options.refreshClass);

		this.update();

		this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		this.trigger('refreshed');
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (!this.isVisible()) {
			return false;
		}

		this.enter('resizing');

		if (this.trigger('resize').isDefaultPrevented()) {
			this.leave('resizing');
			return false;
		}

		this.invalidate('width');

		this.refresh();

		this.leave('resizing');
		this.trigger('resized');
	};

	/**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 * @protected
	 */
	Owl.prototype.registerEventHandlers = function() {
		if ($.support.transition) {
			this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
		}

		if (this.settings.responsive !== false) {
			this.on(window, 'resize', this._handlers.onThrottledResize);
		}

		if (this.settings.mouseDrag) {
			this.$element.addClass(this.options.dragClass);
			this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
		}

		if (this.settings.touchDrag){
			this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
		}
	};

	/**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var stage = null;

		if (event.which === 3) {
			return;
		}

		if ($.support.transform) {
			stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
			stage = {
				x: stage[stage.length === 16 ? 12 : 4],
				y: stage[stage.length === 16 ? 13 : 5]
			};
		} else {
			stage = this.$stage.position();
			stage = {
				x: this.settings.rtl ?
					stage.left + this.$stage.width() - this.width() + this.settings.margin :
					stage.left,
				y: stage.top
			};
		}

		if (this.is('animating')) {
			$.support.transform ? this.animate(stage.x) : this.$stage.stop()
			this.invalidate('position');
		}

		this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

		this.speed(0);

		this._drag.time = new Date().getTime();
		this._drag.target = $(event.target);
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
		this._drag.pointer = this.pointer(event);

		$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

		$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
			var delta = this.difference(this._drag.pointer, this.pointer(event));

			$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

			if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
				return;
			}

			event.preventDefault();

			this.enter('dragging');
			this.trigger('drag');
		}, this));
	};

	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var minimum = null,
			maximum = null,
			pull = null,
			delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this.difference(this._drag.stage.start, delta);

		if (!this.is('dragging')) {
			return;
		}

		event.preventDefault();

		if (this.settings.loop) {
			minimum = this.coordinates(this.minimum());
			maximum = this.coordinates(this.maximum() + 1) - minimum;
			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
		} else {
			minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
		}

		this._drag.stage.current = stage;

		this.animate(stage.x);
	};

	/**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragEnd = function(event) {
		var delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this._drag.stage.current,
			direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

		$(document).off('.owl.core');

		this.$element.removeClass(this.options.grabClass);

		if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
			this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
			this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
			this.invalidate('position');
			this.update();

			this._drag.direction = direction;

			if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
				this._drag.target.one('click.owl.core', function() { return false; });
			}
		}

		if (!this.is('dragging')) {
			return;
		}

		this.leave('dragging');
		this.trigger('dragged');
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate, direction) {
		var position = -1,
			pull = 30,
			width = this.width(),
			coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				// on a left pull, check on current index
				if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
					position = index;
				// on a right pull, check on previous index
				// to do so, subtract width from value and set position = index + 1
				} else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
					position = index + 1;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] !== undefined ? coordinates[index + 1] : value - width)) {
					position = direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @todo #270
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		var animate = this.speed() > 0;

		this.is('animating') && this.onTransitionEnd();

		if (animate) {
			this.enter('animating');
			this.trigger('translate');
		}

		if ($.support.transform3d && $.support.transition) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px,0px,0px)',
				transition: (this.speed() / 1000) + 's' + (
					this.settings.slideTransition ? ' ' + this.settings.slideTransition : ''
				)
			});
		} else if (animate) {
			this.$stage.animate({
				left: coordinate + 'px'
			}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
		} else {
			this.$stage.css({
				left: coordinate + 'px'
			});
		}
	};

	/**
	 * Checks whether the carousel is in a specific state or not.
	 * @param {String} state - The state to check.
	 * @returns {Boolean} - The flag which indicates if the carousel is busy.
	 */
	Owl.prototype.is = function(state) {
		return this._states.current[state] && this._states.current[state] > 0;
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} [part] - The part to invalidate.
	 * @returns {Array.<String>} - The invalidated parts.
	 */
	Owl.prototype.invalidate = function(part) {
		if ($.type(part) === 'string') {
			this._invalidated[part] = true;
			this.is('valid') && this.leave('valid');
		}
		return $.map(this._invalidated, function(v, i) { return i });
	};

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position of an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = this._items.length,
			m = relative ? 0 : this._clones.length;

		if (!this.isNumeric(position) || n < 1) {
			position = undefined;
		} else if (position < 0 || position >= n + m) {
			position = ((position - m / 2) % n + n) % n + m / 2;
		}

		return position;
	};

	/**
	 * Converts an absolute position of an item into a relative one.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position -= this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var settings = this.settings,
			maximum = this._coordinates.length,
			iterator,
			reciprocalItemsWidth,
			elementWidth;

		if (settings.loop) {
			maximum = this._clones.length / 2 + this._items.length - 1;
		} else if (settings.autoWidth || settings.merge) {
			iterator = this._items.length;
			if (iterator) {
				reciprocalItemsWidth = this._items[--iterator].width();
				elementWidth = this.$element.width();
				while (iterator--) {
					reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
					if (reciprocalItemsWidth > elementWidth) {
						break;
					}
				}
			}
			maximum = iterator + 1;
		} else if (settings.center) {
			maximum = this._items.length - 1;
		} else {
			maximum = this._items.length - settings.items;
		}

		if (relative) {
			maximum -= this._clones.length / 2;
		}

		return Math.max(maximum, 0);
	};

	/**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		return relative ? 0 : this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var multiplier = 1,
			newPosition = position - 1,
			coordinate;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			if (this.settings.rtl) {
				multiplier = -1;
				newPosition = position + 1;
			}

			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
		} else {
			coordinate = this._coordinates[newPosition] || 0;
		}

		coordinate = Math.ceil(coordinate);

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		if (factor === 0) {
			return 0;
		}

		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		var current = this.current(),
			revert = null,
			distance = position - this.relative(current),
			direction = (distance > 0) - (distance < 0),
			items = this._items.length,
			minimum = this.minimum(),
			maximum = this.maximum();

		if (this.settings.loop) {
			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
				distance += direction * -1 * items;
			}

			position = current + distance;
			revert = ((position - minimum) % items + items) % items + minimum;

			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
				current = revert - distance;
				position = revert;
				this.reset(current);
			}
		} else if (this.settings.rewind) {
			maximum += 1;
			position = (position % maximum + maximum) % maximum;
		} else {
			position = Math.max(minimum, Math.min(maximum, position));
		}

		this.speed(this.duration(current, position, speed));
		this.current(position);

		if (this.isVisible()) {
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onTransitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.leave('animating');
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			console.warn('Can not detect viewport width.');
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		var current = this.relative(this._current);

		position = position === undefined ? this._items.length : this.normalize(position, true);
		content = content instanceof jQuery ? content : $(content);

		this.trigger('add', { content: content, position: position });

		content = this.prepare(content);

		if (this._items.length === 0 || position === this._items.length) {
			this._items.length === 0 && this.$stage.append(content);
			this._items.length !== 0 && this._items[position - 1].after(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this._items[current] && this.reset(this._items[current].index());

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Preloads images with auto width.
	 * @todo Replace by a more generic approach
	 * @protected
	 */
	Owl.prototype.preloadAutoWidthImages = function(images) {
		images.each($.proxy(function(i, element) {
			this.enter('pre-loading');
			element = $(element);
			$(new Image()).one('load', $.proxy(function(e) {
				element.attr('src', e.target.src);
				element.css('opacity', 1);
				this.leave('pre-loading');
				!this.is('pre-loading') && !this.is('initializing') && this.refresh();
			}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
		}, this));
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		this.$element.off('.owl.core');
		this.$stage.off('.owl.core');
		$(document).off('.owl.core');

		if (this.settings.responsive !== false) {
			window.clearTimeout(this.resizeTimer);
			this.off(window, 'resize', this._handlers.onThrottledResize);
		}

		for (var i in this._plugins) {
			this._plugins[i].destroy();
		}

		this.$stage.children('.cloned').remove();

		this.$stage.unwrap();
		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();
		this.$stage.remove();
		this.$element
			.removeClass(this.options.refreshClass)
			.removeClass(this.options.loadingClass)
			.removeClass(this.options.loadedClass)
			.removeClass(this.options.rtlClass)
			.removeClass(this.options.dragClass)
			.removeClass(this.options.grabClass)
			.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
			.removeData('owl.carousel');
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=carousel] - The event namespace.
	 * @param {String} [state] - The state which is associated with the event.
	 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace, state, enter) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.register({ type: Owl.Type.Event, name: name });
			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].call(this, event);
			}
		}

		return event;
	};

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
	Owl.prototype.enter = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			if (this._states.current[name] === undefined) {
				this._states.current[name] = 0;
			}

			this._states.current[name]++;
		}, this));
	};

	/**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	Owl.prototype.leave = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			this._states.current[name]--;
		}, this));
	};

	/**
	 * Registers an event or state.
	 * @public
	 * @param {Object} object - The event or state to register.
	 */
	Owl.prototype.register = function(object) {
		if (object.type === Owl.Type.Event) {
			if (!$.event.special[object.name]) {
				$.event.special[object.name] = {};
			}

			if (!$.event.special[object.name].owl) {
				var _default = $.event.special[object.name]._default;
				$.event.special[object.name]._default = function(e) {
					if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
						return _default.apply(this, arguments);
					}
					return e.namespace && e.namespace.indexOf('owl') > -1;
				};
				$.event.special[object.name].owl = true;
			}
		} else if (object.type === Owl.Type.State) {
			if (!this._states.tags[object.name]) {
				this._states.tags[object.name] = object.tags;
			} else {
				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
			}

			this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
				return $.inArray(tag, this._states.tags[object.name]) === i;
			}, this));
		}
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	};

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	};

	/**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @protected
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
	Owl.prototype.pointer = function(event) {
		var result = { x: null, y: null };

		event = event.originalEvent || event || window.event;

		event = event.touches && event.touches.length ?
			event.touches[0] : event.changedTouches && event.changedTouches.length ?
				event.changedTouches[0] : event;

		if (event.pageX) {
			result.x = event.pageX;
			result.y = event.pageY;
		} else {
			result.x = event.clientX;
			result.y = event.clientY;
		}

		return result;
	};

	/**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @protected
	 * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
	 * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
	 */
	Owl.prototype.isNumeric = function(number) {
		return !isNaN(parseFloat(number));
	};

	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @protected
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
	Owl.prototype.difference = function(first, second) {
		return {
			x: first.x - second.x,
			y: first.y - second.y
		};
	};

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @todo Navigation plugin `next` and `prev`
	 * @public
	 */
	$.fn.owlCarousel = function(option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			var $this = $(this),
				data = $this.data('owl.carousel');

			if (!data) {
				data = new Owl(this, typeof option == 'object' && option);
				$this.data('owl.carousel', data);

				$.each([
					'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
				], function(i, event) {
					data.register({ type: Owl.Type.Event, name: event });
					data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
						if (e.namespace && e.relatedTarget !== this) {
							this.suppress([ event ]);
							data[event].apply(this, [].slice.call(arguments, 1));
							this.release([ event ]);
						}
					}, data));
				});
			}

			if (typeof option == 'string' && option.charAt(0) !== '_') {
				data[option].apply(data, args);
			}
		});
	};

	/**
	 * The blogshoptor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.blogshoptor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($,window,document,undefined){/**
	 * Creates the auto refresh plugin.
	 * @class The Auto Refresh Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoRefresh = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Refresh interval.
		 * @protected
		 * @type {number}
		 */
		this._interval = null;

		/**
		 * Whether the element is currently visible or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._visible = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoRefresh) {
					this.watch();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoRefresh.Defaults = {
		autoRefresh: true,
		autoRefreshInterval: 500
	};

	/**
	 * Watches the element.
	 */
	AutoRefresh.prototype.watch = function() {
		if (this._interval) {
			return;
		}

		this._visible = this._core.isVisible();
		this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
	};

	/**
	 * Refreshes the element.
	 */
	AutoRefresh.prototype.refresh = function() {
		if (this._core.isVisible() === this._visible) {
			return;
		}

		this._visible = !this._visible;

		this._core.$element.toggleClass('owl-hidden', !this._visible);

		this._visible && (this._core.invalidate('width') && this._core.refresh());
	};

	/**
	 * Destroys the plugin.
	 */
	AutoRefresh.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this._interval);

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.blogshoptor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($,window,document,undefined){/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);
					//TODO: Need documentation for this new option
					if (settings.lazyLoadEager > 0) {
						n += settings.lazyLoadEager;
						// If the carousel is looping also preload images that are to the "left"
						if (settings.loop) {
              position -= settings.lazyLoadEager;
              n++;
            }
					}

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position)), load);
						position++;
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false,
		lazyLoadEager: 0
	};

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
                url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src') || $element.attr('data-srcset');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
            } else if ($element.is('source')) {
                $element.one('load.owl.lazy', $.proxy(function() {
                    this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
                }, this)).attr('srcset', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url("' + url + '")',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.blogshoptor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($,window,document,undefined){/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		this._previousHeight = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight && e.property.name === 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight
					&& e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
		this._intervalId = null;
		var refThis = this;

		// These changes have been taken from a PR by gavrochelegnou proposed in #1575
		// and have been made compatible with the latest jQuery version
		$(window).on('load', function() {
			if (refThis._core.settings.autoHeight) {
				refThis.update();
			}
		});

		// Autoresize the height of the carousel when window is resized
		// When carousel has images, the height is dependent on the width
		// and should also change on resize
		$(window).resize(function() {
			if (refThis._core.settings.autoHeight) {
				if (refThis._intervalId != null) {
					clearTimeout(refThis._intervalId);
				}

				refThis._intervalId = setTimeout(function() {
					refThis.update();
				}, 250);
			}
		});

	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		var start = this._core._current,
			end = start + this._core.settings.items,
			lazyLoadEnabled = this._core.settings.lazyLoad,
			visible = this._core.$stage.children().toArray().slice(start, end),
			heights = [],
			maxheight = 0;

		$.each(visible, function(index, item) {
			heights.push($(item).height());
		});

		maxheight = Math.max.apply(null, heights);

		if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) {
			maxheight = this._previousHeight;
		}

		this._previousHeight = maxheight;

		this._core.$stage.parent()
			.height(maxheight)
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] !== 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.blogshoptor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($,window,document,undefined){/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * All event handlers.
		 * @todo The cloned content removale is too late
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
				}
			}, this),
			'resize.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.is('resizing')) {
					this._core.$stage.find('.cloned .owl-video-frame').remove();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position' && this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				var $element = $(e.content).find('.owl-video');

				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {
			var type = (function() {
					if (target.attr('data-vimeo-id')) {
						return 'vimeo';
					} else if (target.attr('data-vzaar-id')) {
						return 'vzaar'
					} else {
						return 'youtube';
					}
				})(),
				id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
				width = target.attr('data-width') || this._core.settings.videoWidth,
				height = target.attr('data-height') || this._core.settings.videoHeight,
				url = target.attr('href');

		if (url) {

			/*
					Parses the id's out of the following urls (and probably more):
					https://www.youtube.com/watch?v=:id
					https://youtu.be/:id
					https://vimeo.com/:id
					https://vimeo.com/channels/:channel/:id
					https://vimeo.com/groups/:group/videos/:id
					https://app.vzaar.com/videos/:id

					Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
			*/

			id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else if (id[3].indexOf('vzaar') > -1) {
				type = 'vzaar';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {
		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'width:' + video.width + 'px;height:' + video.height + 'px;' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = $('<div/>',{
						"class": 'owl-video-tn ' + lazyClass,
						"srcType": path
					});
				} else {
					tnLink = $( '<div/>', {
						"class": "owl-video-tn",
						"style": 'opacity:1;background-image:url(' + path + ')'
					});
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap( $( '<div/>', {
			"class": "owl-video-wrapper",
			"style": dimensions
		}));

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: '//vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		} else if (video.type === 'vzaar') {
			$.ajax({
				type: 'GET',
				url: '//vzaar.com/api/videos/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data.framegrab_url;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
		this._core.leave('playing');
		this._core.trigger('stopped', null, 'video');
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} event - The event arguments.
	 */
	Video.prototype.play = function(event) {
		var target = $(event.target),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html,
			iframe;

		if (this._playing) {
			return;
		}

		this._core.enter('playing');
		this._core.trigger('play', null, 'video');

		item = this._core.items(this._core.relative(item.index()));

		this._core.reset(item.index());

		html = $( '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>' );
		html.attr( 'height', height );
		html.attr( 'width', width );
		if (video.type === 'youtube') {
			html.attr( 'src', '//www.youtube.com/embed/' + video.id + '?autoplay=1&rel=0&v=' + video.id );
		} else if (video.type === 'vimeo') {
			html.attr( 'src', '//player.vimeo.com/video/' + video.id + '?autoplay=1' );
		} else if (video.type === 'vzaar') {
			html.attr( 'src', '//view.vzaar.com/' + video.id + '/player?autoplay=true' );
		}

		iframe = $(html).wrap( '<div class="owl-video-frame" />' ).insertAfter(item.find('.owl-video'));

		this._playing = item.addClass('owl-video-playing');
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {
		var element = document.fullscreenElement || document.mozFullScreenElement ||
				document.webkitFullscreenElement;

		return element && $(element).parent().hasClass('owl-video-frame');
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.blogshoptor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($,window,document,undefined){/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this.swapping = e.type == 'translated';
				}
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1) {
			return;
		}

		if (!$.support.animation || !$.support.transition) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.one($.support.animation.end, clear)
				.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing);
		}

		if (incoming) {
			next.one($.support.animation.end, clear)
				.addClass('animated owl-animated-in')
				.addClass(incoming);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.onTransitionEnd();
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.blogshoptor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @author Tom De Caluwé
 * @license The MIT License (MIT)
 */
;(function($,window,document,undefined){/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The autoplay timeout id.
		 * @type {Number}
		 */
		this._call = null;

		/**
		 * Depending on the state of the plugin, this variable contains either
		 * the start time of the timer or the current timer value if it's
		 * paused. Since we start in a paused state we initialize the timer
		 * value.
		 * @type {Number}
		 */
		this._time = 0;

		/**
		 * Stores the timeout currently used.
		 * @type {Number}
		 */
		this._timeout = 0;

		/**
		 * Indicates whenever the autoplay is paused.
		 * @type {Boolean}
		 */
		this._paused = true;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'settings') {
					if (this._core.settings.autoplay) {
						this.play();
					} else {
						this.stop();
					}
				} else if (e.namespace && e.property.name === 'position' && this._paused) {
					// Reset the timer. This code is triggered when the position
					// of the carousel was changed through user interaction.
					this._time = 0;
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoplay) {
					this.play();
				}
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				if (e.namespace) {
					this.play(t, s);
				}
			}, this),
			'stop.owl.autoplay': $.proxy(function(e) {
				if (e.namespace) {
					this.stop();
				}
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.play();
				}
			}, this),
			'touchstart.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'touchend.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause) {
					this.play();
				}
			}, this)
		};

		// register event handlers
		this._core.$element.on(this._handlers);

		// set default options
		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * Transition to the next slide and set a timeout for the next transition.
	 * @private
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype._next = function(speed) {
		this._call = window.setTimeout(
			$.proxy(this._next, this, speed),
			this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()
		);

		if (this._core.is('interacting') || document.hidden) {
			return;
		}
		this._core.next(speed || this._core.settings.autoplaySpeed);
	}

	/**
	 * Reads the current timer value when the timer is playing.
	 * @public
	 */
	Autoplay.prototype.read = function() {
		return new Date().getTime() - this._time;
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		var elapsed;

		if (!this._core.is('rotating')) {
			this._core.enter('rotating');
		}

		timeout = timeout || this._core.settings.autoplayTimeout;

		// Calculate the elapsed time since the last transition. If the carousel
		// wasn't playing this calculation will yield zero.
		elapsed = Math.min(this._time % (this._timeout || timeout), timeout);

		if (this._paused) {
			// Start the clock.
			this._time = this.read();
			this._paused = false;
		} else {
			// Clear the active timeout to allow replacement.
			window.clearTimeout(this._call);
		}

		// Adjust the origin of the timer to match the new timeout value.
		this._time += this.read() % timeout - elapsed;

		this._timeout = timeout;
		this._call = window.setTimeout($.proxy(this._next, this, speed), timeout - elapsed);
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		if (this._core.is('rotating')) {
			// Reset the clock.
			this._time = 0;
			this._paused = true;

			window.clearTimeout(this._call);
			this._core.leave('rotating');
		}
	};

	/**
	 * Pauses the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		if (this._core.is('rotating') && !this._paused) {
			// Pause the clock.
			this._time = this.read();
			this._paused = true;

			window.clearTimeout(this._call);
		}
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		this.stop();

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.blogshoptor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($,window,document,undefined){'use strict';/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
						$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
				}
			}, this),
			'added.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, this._templates.pop());
				}
			}, this),
			'remove.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && !this._initialized) {
					this._core.trigger('initialize', null, 'navigation');
					this.initialize();
					this.update();
					this.draw();
					this._initialized = true;
					this._core.trigger('initialized', null, 'navigation');
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._initialized) {
					this._core.trigger('refresh', null, 'navigation');
					this.update();
					this.draw();
					this._core.trigger('refreshed', null, 'navigation');
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navText: [
			'<span aria-label="' + 'Previous' + '">&#x2039;</span>',
			'<span aria-label="' + 'Next' + '">&#x203a;</span>'
		],
		navSpeed: false,
		navElement: 'button type="button" role="presentation"',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: [
			'owl-prev',
			'owl-next'
		],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotsData: false,
		dotsSpeed: false,
		dotsContainer: false
	};

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var override,
			settings = this._core.settings;

		// create DOM structure for relative navigation
		this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
			: $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$previous = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[0])
			.html(settings.navText[0])
			.prependTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.prev(settings.navSpeed);
			}, this));
		this._controls.$next = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[1])
			.html(settings.navText[1])
			.appendTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.next(settings.navSpeed);
			}, this));

		// create DOM structure for absolute navigation
		if (!settings.dotsData) {
			this._templates = [ $('<button role="button">')
				.addClass(settings.dotClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
			: $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$absolute.on('click', 'button', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$absolute)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, settings.dotsSpeed);
		}, this));

		/*$el.on('focusin', function() {
			$(document).off(".carousel");

			$(document).on('keydown.carousel', function(e) {
				if(e.keyCode == 37) {
					$el.trigger('prev.owl')
				}
				if(e.keyCode == 39) {
					$el.trigger('next.owl')
				}
			});
		});*/

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	};

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override, settings;
		settings = this._core.settings;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			if (control === '$relative' && settings.navContainer) {
				this._controls[control].html('');
			} else {
				this._controls[control].remove();
			}
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			maximum = this._core.maximum(true),
			settings = this._core.settings,
			size = settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items;

		if (settings.slideBy !== 'page') {
			settings.slideBy = Math.min(settings.slideBy, settings.items);
		}

		if (settings.dots || settings.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: Math.min(maximum, i - lower),
						end: i - lower + size - 1
					});
					if (Math.min(maximum, i - lower) === maximum) {
						break;
					}
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	};

	/**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference,
			settings = this._core.settings,
			disabled = this._core.items().length <= settings.items,
			index = this._core.relative(this._core.current()),
			loop = settings.loop || settings.rewind;

		this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

		if (settings.nav) {
			this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
			this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
		}

		this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

		if (settings.dots) {
			difference = this._pages.length - this._controls.$absolute.children().length;

			if (settings.dotsData && difference !== 0) {
				this._controls.$absolute.html(this._templates.join(''));
			} else if (difference > 0) {
				this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
			} else if (difference < 0) {
				this._controls.$absolute.children().slice(difference).remove();
			}

			this._controls.$absolute.find('.active').removeClass('active');
			this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}
	};

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items)
		};
	};

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var current = this._core.relative(this._core.current());
		return $.grep(this._pages, $.proxy(function(page, index) {
			return page.start <= current && page.end >= current;
		}, this)).pop();
	};

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			settings = this._core.settings;

		if (settings.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += settings.slideBy : position -= settings.slideBy;
		}

		return position;
	};

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	};

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	};

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard && this._pages.length) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	};

	$.fn.owlCarousel.blogshoptor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($,window,document,undefined){'use strict';/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash index for the items.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.startPosition === 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

					if (!hash) {
						return;
					}

					this._hashes[hash] = e.content;
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position') {
					var current = this._core.items(this._core.relative(this._core.current())),
						hash = $.map(this._hashes, function(item, hash) {
							return item === current ? hash : null;
						}).join();

					if (!hash || window.location.hash.slice(1) === hash) {
						return;
					}

					window.location.hash = hash;
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function(e) {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]);

			if (position === undefined || position === this._core.current()) {
				return;
			}

			this._core.to(this._core.relative(position), false, true);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.blogshoptor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.3.4
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($,window,document,undefined){var style=$('<support>').get(0).style,prefixes='Webkit Moz O ms'.split(' '),events={transition:{end:{WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd',transition:'transitionend'}},animation:{end:{WebkitAnimation:'webkitAnimationEnd',MozAnimation:'animationend',OAnimation:'oAnimationEnd',animation:'animationend'}}},tests={csstransforms:function(){return!!test('transform')},csstransforms3d:function(){return!!test('perspective')},csstransitions:function(){return!!test('transition')},cssanimations:function(){return!!test('animation')}};function test(property,prefixed){var result=!1,upper=property.charAt(0).toUpperCase()+property.slice(1);$.each((property+' '+prefixes.join(upper+' ')+upper).split(' '),function(i,property){if(style[property]!==undefined){result=prefixed?property:!0;return!1}});return result}
function prefixed(property){return test(property,!0)}
if(tests.csstransitions()){$.support.transition=new String(prefixed('transition'))
$.support.transition.end=events.transition.end[$.support.transition]}
if(tests.cssanimations()){$.support.animation=new String(prefixed('animation'))
$.support.animation.end=events.animation.end[$.support.animation]}
if(tests.csstransforms()){$.support.transform=new String(prefixed('transform'));$.support.transform3d=tests.csstransforms3d()}})(window.Zepto||window.jQuery,window,document);(function($){"use strict";if($.fn.menumaker){$("#cssmenu").menumaker({title:"Menu",breakpoint:767,format:"multitoggle"});var siteNavigation=$('#cssmenu').children('ul');siteNavigation.find('a').on('focus blur',function(){$(this).parents('.menu-item, .page_item').toggleClass('focus')})}
$('table').addClass('table-bordered table').wrap('<div class="table-responsive"></div>');$('.shop_table').removeClass('table-bordered');$(window).on('scroll',function(){var topspace=$(this).scrollTop();if(topspace>300){$('.scrooltotop').css('display','block')}else{$('.scrooltotop').css('display','none')}});jQuery(window).on('load',function(){$('.scrooltotop').css('display','none');$('.masonaryactive').masonry({itemSelector:'.blog-grid-layout',});$('#preloader').fadeOut('slow',function(){$(this).remove()})});$('.scrooltotop').click(function(){$('html,body').animate({scrollTop:0},'slow');return!1});$('.contact-form').parents('.entry-content').addClass('contact-form-parent');$('.tagcloud a').removeAttr('style');var searchPopupDiv=$('.search-popup');searchPopupDiv.children('div').on('click',function(e){e.preventDefault();$('.searchform-area').toggleClass('show');return!1});$('.search-close i').on('click',function(){$('.searchform-area').removeClass('show');return!1});$('.related-post-sldider').owlCarousel({items:2,nav:!0,autoplay:!1,navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],smartSpeed:1000,margin:30,rewind:!0,dots:!1,autoHeight:!0,autoHeightClass:'owl-height',responsive:{0:{items:1,},480:{items:1,margin:15},768:{items:1,},992:{items:2,}}});$('.active-subfeatured-slider').owlCarousel({items:3,nav:!0,autoplay:!1,navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],smartSpeed:1000,margin:30,rewind:!0,dots:!1,mouseDrag:!1,pullDrag:!1,responsive:{0:{items:1,},480:{items:1,margin:15},768:{items:2,},992:{items:3,}}});$('.featured-main-slider').owlCarousel({items:1,nav:!0,autoplay:!1,navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],smartSpeed:1000,margin:30,rewind:!0,loop:!0,dots:!0,autoHeight:!0,mouseDrag:!0,pullDrag:!1,center:!1,responsive:{0:{items:1,},480:{items:1,margin:15},768:{items:1,},992:{items:1,},1200:{items:1,}}});$('.navigation.pagination').addClass('Page navigation example');$('.enjoy-instagram-carousel').addClass('owl-carousel');$('.navigation.pagination div.nav-links').wrapInner('<ul class="pagination"></ul>');$('div.nav-links ul.pagination * ').wrap('<li class="page-item"></li>')})(jQuery);/*! This file is auto-generated */
window.addComment=function(v){var I,C,h,E=v.document,b={commentReplyClass:"comment-reply-link",commentReplyTitleId:"reply-title",cancelReplyId:"cancel-comment-reply-link",commentFormId:"commentform",temporaryFormId:"wp-temp-form-div",parentIdFieldId:"comment_parent",postIdFieldId:"comment_post_ID"},e=v.MutationObserver||v.WebKitMutationObserver||v.MozMutationObserver,r="querySelector"in E&&"addEventListener"in v,n=!!E.documentElement.dataset;function t(){d(),e&&new e(o).observe(E.body,{childList:!0,subtree:!0})}function d(e){if(r&&(I=g(b.cancelReplyId),C=g(b.commentFormId),I)){I.addEventListener("touchstart",l),I.addEventListener("click",l);function t(e){if((e.metaKey||e.ctrlKey)&&13===e.keyCode&&"a"!==E.activeElement.tagName.toLowerCase())return C.removeEventListener("keydown",t),e.preventDefault(),C.submit.click(),!1}C&&C.addEventListener("keydown",t);for(var n,d=function(e){var t=b.commentReplyClass;e&&e.childNodes||(e=E);e=E.getElementsByClassName?e.getElementsByClassName(t):e.querySelectorAll("."+t);return e}(e),o=0,i=d.length;o<i;o++)(n=d[o]).addEventListener("touchstart",a),n.addEventListener("click",a)}}function l(e){var t,n,d=g(b.temporaryFormId);d&&h&&(g(b.parentIdFieldId).value="0",t=d.textContent,d.parentNode.replaceChild(h,d),this.style.display="none",n=(d=(d=g(b.commentReplyTitleId))&&d.firstChild)&&d.nextSibling,d&&d.nodeType===Node.TEXT_NODE&&t&&(n&&"A"===n.nodeName&&n.id!==b.cancelReplyId&&(n.style.display=""),d.textContent=t),e.preventDefault())}function a(e){var t=g(b.commentReplyTitleId),t=t&&t.firstChild.textContent,n=this,d=m(n,"belowelement"),o=m(n,"commentid"),i=m(n,"respondelement"),r=m(n,"postid"),n=m(n,"replyto")||t;d&&o&&i&&r&&!1===v.addComment.moveForm(d,o,i,r,n)&&e.preventDefault()}function o(e){for(var t=e.length;t--;)if(e[t].addedNodes.length)return void d()}function m(e,t){return n?e.dataset[t]:e.getAttribute("data-"+t)}function g(e){return E.getElementById(e)}return r&&"loading"!==E.readyState?t():r&&v.addEventListener("DOMContentLoaded",t,!1),{init:d,moveForm:function(e,t,n,d,o){var i,r,l,a,m,c,s,e=g(e),n=(h=g(n),g(b.parentIdFieldId)),y=g(b.postIdFieldId),p=g(b.commentReplyTitleId),u=(p=p&&p.firstChild)&&p.nextSibling;if(e&&h&&n){void 0===o&&(o=p&&p.textContent),a=h,m=b.temporaryFormId,c=g(m),s=(s=g(b.commentReplyTitleId))?s.firstChild.textContent:"",c||((c=E.createElement("div")).id=m,c.style.display="none",c.textContent=s,a.parentNode.insertBefore(c,a)),d&&y&&(y.value=d),n.value=t,I.style.display="",e.parentNode.insertBefore(h,e.nextSibling),p&&p.nodeType===Node.TEXT_NODE&&(u&&"A"===u.nodeName&&u.id!==b.cancelReplyId&&(u.style.display="none"),p.textContent=o),I.onclick=function(){return!1};try{for(var f=0;f<C.elements.length;f++)if(i=C.elements[f],r=!1,"getComputedStyle"in v?l=v.getComputedStyle(i):E.documentElement.currentStyle&&(l=i.currentStyle),(i.offsetWidth<=0&&i.offsetHeight<=0||"hidden"===l.visibility)&&(r=!0),"hidden"!==i.type&&!i.disabled&&!r){i.focus();break}}catch(e){}return!1}}}}(window);function heateorSssLoadEvent(e){var t=window.onload;if(typeof window.onload!="function"){window.onload=e}else{window.onload=function(){t();e()}}};var heateorSssSharingAjaxUrl='https://qullamaggie.com/wp-admin/admin-ajax.php',heateorSssCloseIconPath='https://qullamaggie.com/wp-content/plugins/sassy-social-share/public/../images/close.png',heateorSssPluginIconPath='https://qullamaggie.com/wp-content/plugins/sassy-social-share/public/../images/logo.png',heateorSssHorizontalSharingCountEnable=0,heateorSssVerticalSharingCountEnable=0,heateorSssSharingOffset=-10;var heateorSssMobileStickySharingEnabled=0;var heateorSssCopyLinkMessage="Link copied.";var heateorSssUrlCountFetched=[],heateorSssSharesText='Shares',heateorSssShareText='Share';function heateorSssPopup(e){window.open(e,"popUpWindow","height=400,width=600,left=400,top=100,resizable,scrollbars,toolbar=0,personalbar=0,menubar=no,location=no,directories=no,status")}function heateorSssInitiateFB(){FB.init({appId:"",channelUrl:"",status:!0,cookie:!0,xfbml:!0,version:"v13.0"})}window.fbAsyncInit=function(){heateorSssInitiateFB(),0&&(FB.Event.subscribe("edge.create",function(e){heateorSsmiMycredPoints("Facebook_like_recommend","",e?e:"")}),FB.Event.subscribe("edge.remove",function(e){heateorSsmiMycredPoints("Facebook_like_recommend","",e?e:"","Minus point(s) for undoing Facebook like-recommend")})),0&&(FB.Event.subscribe("edge.create",function(e){heateorSsgaSocialPluginsTracking("Facebook","Like",e?e:"")}),FB.Event.subscribe("edge.remove",function(e){heateorSsgaSocialPluginsTracking("Facebook","Unlike",e?e:"")}))},function(e){var n,i="facebook-jssdk",o=e.getElementsByTagName("script")[0];e.getElementById(i)||(n=e.createElement("script"),n.id=i,n.async=!0,n.src="//connect.facebook.net/en_US/sdk.js",o.parentNode.insertBefore(n,o))}(document);function heateorSssDetermineWhatsappShareAPI(a){if(a)return-1!=navigator.userAgent.indexOf("Mobi")?"api.whatsapp.com":"web.whatsapp.com";var p=jQuery("i.heateorSssWhatsappBackground a").attr("href");return void 0!==p?-1!=navigator.userAgent.indexOf("Mobi")?(jQuery("i.heateorSssWhatsappBackground a").attr("href",p.replace("web.whatsapp.com","api.whatsapp.com")),"api.whatsapp.com"):(jQuery("i.heateorSssWhatsappBackground a").attr("href",p.replace("api.whatsapp.com","web.whatsapp.com")),"web.whatsapp.com"):""}
function heateorSssMoreSharingPopup(elem,postUrl,postTitle,twitterTitle){postUrl=encodeURIComponent(postUrl);concate='</ul></div><div class="footer-panel"><p></p></div></div>';var heateorSssMoreSharingServices={facebook:{background_color:"#3c589a",title:"Facebook",redirect_url:"https://www.facebook.com/sharer.php?u="+postUrl+"&t="+postTitle+"&v=3",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-5 -5 42 42"><path d="M17.78 27.5V17.008h3.522l.527-4.09h-4.05v-2.61c0-1.182.33-1.99 2.023-1.99h2.166V4.66c-.375-.05-1.66-.16-3.155-.16-3.123 0-5.26 1.905-5.26 5.405v3.016h-3.53v4.09h3.53V27.5h4.223z" fill="#fff"></path></svg>'},twitter:{background_color:"#55acee",title:"Twitter",redirect_url:"https://twitter.com/intent/tweet?text="+(twitterTitle?twitterTitle:postTitle)+" "+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-4 -4 39 39"><path d="M28 8.557a9.913 9.913 0 0 1-2.828.775 4.93 4.93 0 0 0 2.166-2.725 9.738 9.738 0 0 1-3.13 1.194 4.92 4.92 0 0 0-3.593-1.55 4.924 4.924 0 0 0-4.794 6.049c-4.09-.21-7.72-2.17-10.15-5.15a4.942 4.942 0 0 0-.665 2.477c0 1.71.87 3.214 2.19 4.1a4.968 4.968 0 0 1-2.23-.616v.06c0 2.39 1.7 4.38 3.952 4.83-.414.115-.85.174-1.297.174-.318 0-.626-.03-.928-.086a4.935 4.935 0 0 0 4.6 3.42 9.893 9.893 0 0 1-6.114 2.107c-.398 0-.79-.023-1.175-.068a13.953 13.953 0 0 0 7.55 2.213c9.056 0 14.01-7.507 14.01-14.013 0-.213-.005-.426-.015-.637.96-.695 1.795-1.56 2.455-2.55z" fill="#fff"></path></svg>'},linkedin:{background_color:"#0077b5",title:"Linkedin",redirect_url:"https://www.linkedin.com/shareArticle?mini=true&url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path d="M6.227 12.61h4.19v13.48h-4.19V12.61zm2.095-6.7a2.43 2.43 0 0 1 0 4.86c-1.344 0-2.428-1.09-2.428-2.43s1.084-2.43 2.428-2.43m4.72 6.7h4.02v1.84h.058c.56-1.058 1.927-2.176 3.965-2.176 4.238 0 5.02 2.792 5.02 6.42v7.395h-4.183v-6.56c0-1.564-.03-3.574-2.178-3.574-2.18 0-2.514 1.7-2.514 3.46v6.668h-4.187V12.61z" fill="#fff"></path></svg>'},parler:{background_color:"#C63240",title:"Parler",redirect_url:"https://parler.com/new-post?message="+postTitle+"&url="+postUrl,svg:'<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="-24 -30 140 160"><g fill="#fff"><path d="M58.34 83.31h-25v-8.49c0-4.5 3.64-8.14 8.14-8.14h16.87c13.8 0 25.02-11.19 25.02-24.94 0-13.75-11.23-24.94-25.03-24.94h-.26l-5.3-.16H0C0 7.45 7.45 0 16.63 0h36.41l5.44.17C81.39.24 100 18.86 100 41.74c0 22.92-18.69 41.57-41.66 41.57z"></path><path d="M16.65 100C7.46 100 .02 92.55.02 83.37V49.49c0-8.92 7.23-16.16 16.16-16.16h42.19a8.32 8.32 0 010 16.64h-33.5c-4.53 0-8.21 3.67-8.21 8.21V100z"></path></g></svg>'},gab:{background_color:"#25CC80",title:"Gab",redirect_url:"https://gab.com/compose?text="+postTitle+"&url="+postUrl,svg:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-14.5 3.5 46 30" xml:space="preserve"><g><path fill="#fff" d="M13.8,7.6h-2.4v0.7V9l-0.4-0.3C10.2,7.8,9,7.2,7.7,7.2c-0.2,0-0.4,0-0.4,0c-0.1,0-0.3,0-0.5,0 c-5.6,0.3-8.7,7.2-5.4,12.1c2.3,3.4,7.1,4.1,9.7,1.5l0.3-0.3l0,0.7c0,1-0.1,1.5-0.4,2.2c-1,2.4-4.1,3-6.8,1.3 c-0.2-0.1-0.4-0.2-0.4-0.2c-0.1,0.1-1.9,3.5-1.9,3.6c0,0.1,0.5,0.4,0.8,0.6c2.2,1.4,5.6,1.7,8.3,0.8c2.7-0.9,4.5-3.2,5-6.4 c0.2-1.1,0.2-0.8,0.2-8.4l0-7.1H13.8z M9.7,17.6c-2.2,1.2-4.9-0.4-4.9-2.9C4.8,12.6,7,11,9,11.6C11.8,12.4,12.3,16.1,9.7,17.6z"></path></g></svg>'},gettr:{background_color:"#E50000",title:"Gettr",redirect_url:"https://gettr.com/share?text="+postTitle+"&url="+postUrl,svg:'<svg width="100%" height="100%" viewBox="-8 -5 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.528 7.9125C24.1467 8.22187 23.7874 8.3875 23.2655 8.39688C23.7249 7.94688 24.1405 7.43125 24.478 6.875C24.8155 6.31875 25.0717 5.71875 25.2624 5.09375C23.6436 6.32187 21.1561 6.64062 18.9186 7.55312C16.753 8.42812 14.8186 9.85312 14.5655 11.7312C14.3874 13.0781 15.0686 14.6531 16.0249 16.0063C16.1311 15.6469 16.303 15.2781 16.553 15.0125C17.0467 14.4906 17.853 14.3594 18.628 14.2344C19.7999 14.0469 20.8936 13.875 21.8561 13.3156C22.5342 12.9219 23.1436 12.3313 23.528 11.6281C23.7467 11.2344 23.8936 10.8031 23.9811 10.3656C23.7311 10.6 23.3405 10.7531 23.0155 10.6844C23.8186 9.9 24.3374 9.00625 24.528 7.9125Z" fill="white"/><path d="M16.0221 17.6094H8.7002V18.2969C8.7002 18.2969 12.1314 18.4781 12.6877 21.0938H16.0189H19.3502C19.9064 18.4781 23.3377 18.2969 23.3377 18.2969V17.6094H16.0221Z" fill="white"/><path d="M19.2221 21.6846C19.0033 21.6439 18.8002 21.7658 18.7627 21.9596L18.3689 24.4533C18.3658 24.4721 18.3627 24.4908 18.3627 24.5096H17.6346L17.9564 22.0721C17.9752 21.8752 17.8127 21.7033 17.5971 21.6814C17.3783 21.6596 17.1846 21.8033 17.1689 21.9971L17.0189 24.5064C17.0189 24.5096 17.0189 24.5096 17.0189 24.5127H16.3314L16.4221 22.0377C16.4221 21.8533 16.2627 21.7002 16.0658 21.6846C16.0533 21.6846 16.0408 21.6814 16.0252 21.6814C16.0127 21.6814 15.9971 21.6814 15.9846 21.6846C15.8377 21.6971 15.7127 21.7814 15.6596 21.9033C15.6377 21.9471 15.6283 21.9939 15.6283 22.0439L15.7189 24.5189H15.0314C15.0314 24.5158 15.0314 24.5158 15.0314 24.5127L14.8752 22.0002C14.8564 21.8033 14.6658 21.6627 14.4471 21.6846C14.2283 21.7064 14.0658 21.8814 14.0877 22.0752L14.4096 24.5127H13.6814C13.6783 24.4939 13.6752 24.4752 13.6752 24.4564L13.2814 21.9627C13.2439 21.7689 13.0377 21.6471 12.8221 21.6877C12.6033 21.7283 12.4627 21.9221 12.5002 22.1158L13.0564 24.5158H13.3846C13.4814 25.0502 13.5439 25.4252 13.5783 25.6283H14.1283C14.2314 26.6533 15.2189 36.1221 15.2189 36.1221C15.2189 36.1221 15.2846 36.9252 16.0221 36.9252C16.7564 36.9252 16.8252 36.1221 16.8252 36.1221C16.9908 34.7971 17.8064 26.5814 17.9158 25.6283H18.4689C18.5033 25.4252 18.5658 25.0502 18.6627 24.5158H18.9908L19.5471 22.1158C19.5814 21.9189 19.4377 21.7252 19.2221 21.6846Z" fill="white"/></svg>'},MeWe:{background_color:"#007da1",title:"MeWe",redirect_url:"https://mewe.com/share?link="+postUrl,svg:'<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-3 -3 38 38"><g fill="#fff"><path d="M9.636 10.427a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 1 1 2.44 0zM15.574 10.431a1.22 1.22 0 0 1-2.438 0 1.22 1.22 0 1 1 2.438 0zM22.592 10.431a1.221 1.221 0 1 1-2.443 0 1.221 1.221 0 0 1 2.443 0zM29.605 10.431a1.221 1.221 0 1 1-2.442 0 1.221 1.221 0 0 1 2.442 0zM3.605 13.772c0-.471.374-.859.859-.859h.18c.374 0 .624.194.789.457l2.935 4.597 2.95-4.611c.18-.291.43-.443.774-.443h.18c.485 0 .859.387.859.859v8.113a.843.843 0 0 1-.859.845.857.857 0 0 1-.845-.845V16.07l-2.366 3.559c-.18.276-.402.443-.72.443-.304 0-.526-.167-.706-.443l-2.354-3.53V21.9c0 .471-.374.83-.845.83a.815.815 0 0 1-.83-.83v-8.128h-.001zM14.396 14.055a.9.9 0 0 1-.069-.333c0-.471.402-.83.872-.83.415 0 .735.263.845.624l2.23 6.66 2.187-6.632c.139-.402.428-.678.859-.678h.124c.428 0 .735.278.859.678l2.187 6.632 2.23-6.675c.126-.346.415-.609.83-.609.457 0 .845.361.845.817a.96.96 0 0 1-.083.346l-2.867 8.032c-.152.43-.471.706-.887.706h-.165c-.415 0-.721-.263-.872-.706l-2.161-6.328-2.16 6.328c-.152.443-.47.706-.887.706h-.165c-.415 0-.72-.263-.887-.706l-2.865-8.032z"></path></g></svg>'},pinterest:{background_color:"#cc2329",title:"Pinterest",redirect_url:"https://pinterest.com/pin/create/button/?url="+postUrl+"&media=${media_link}&description="+postTitle,bookmarklet_url:"javascript:void((function(){var e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)})());",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-2 -2 35 35"><path fill="#fff" d="M16.539 4.5c-6.277 0-9.442 4.5-9.442 8.253 0 2.272.86 4.293 2.705 5.046.303.125.574.005.662-.33.061-.231.205-.816.27-1.06.088-.331.053-.447-.191-.736-.532-.627-.873-1.439-.873-2.591 0-3.338 2.498-6.327 6.505-6.327 3.548 0 5.497 2.168 5.497 5.062 0 3.81-1.686 7.025-4.188 7.025-1.382 0-2.416-1.142-2.085-2.545.397-1.674 1.166-3.48 1.166-4.689 0-1.081-.581-1.983-1.782-1.983-1.413 0-2.548 1.462-2.548 3.419 0 1.247.421 2.091.421 2.091l-1.699 7.199c-.505 2.137-.076 4.755-.039 5.019.021.158.223.196.314.077.13-.17 1.813-2.247 2.384-4.324.162-.587.929-3.631.929-3.631.46.876 1.801 1.646 3.227 1.646 4.247 0 7.128-3.871 7.128-9.053.003-3.918-3.317-7.568-8.361-7.568z"/></svg>'},CopyLink:{background_color:"#ffc112",title:"Copy Link",redirect_url:"",bookmarklet_url:"",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-4 -4 40 40"><path fill="#fff" d="M24.412 21.177c0-.36-.126-.665-.377-.917l-2.804-2.804a1.235 1.235 0 0 0-.913-.378c-.377 0-.7.144-.97.43.026.028.11.11.255.25.144.14.24.236.29.29s.117.14.2.256c.087.117.146.232.177.344.03.112.046.236.046.37 0 .36-.126.666-.377.918a1.25 1.25 0 0 1-.918.377 1.4 1.4 0 0 1-.373-.047 1.062 1.062 0 0 1-.345-.175 2.268 2.268 0 0 1-.256-.2 6.815 6.815 0 0 1-.29-.29c-.14-.142-.223-.23-.25-.254-.297.28-.445.607-.445.984 0 .36.126.664.377.916l2.778 2.79c.243.243.548.364.917.364.36 0 .665-.118.917-.35l1.982-1.97c.252-.25.378-.55.378-.9zm-9.477-9.504c0-.36-.126-.665-.377-.917l-2.777-2.79a1.235 1.235 0 0 0-.913-.378c-.35 0-.656.12-.917.364L7.967 9.92c-.254.252-.38.553-.38.903 0 .36.126.665.38.917l2.802 2.804c.242.243.547.364.916.364.377 0 .7-.14.97-.418-.026-.027-.11-.11-.255-.25s-.24-.235-.29-.29a2.675 2.675 0 0 1-.2-.255 1.052 1.052 0 0 1-.176-.344 1.396 1.396 0 0 1-.047-.37c0-.36.126-.662.377-.914.252-.252.557-.377.917-.377.136 0 .26.015.37.046.114.03.23.09.346.175.117.085.202.153.256.2.054.05.15.148.29.29.14.146.222.23.25.258.294-.278.442-.606.442-.983zM27 21.177c0 1.078-.382 1.99-1.146 2.736l-1.982 1.968c-.745.75-1.658 1.12-2.736 1.12-1.087 0-2.004-.38-2.75-1.143l-2.777-2.79c-.75-.747-1.12-1.66-1.12-2.737 0-1.106.392-2.046 1.183-2.818l-1.186-1.185c-.774.79-1.708 1.186-2.805 1.186-1.078 0-1.995-.376-2.75-1.13l-2.803-2.81C5.377 12.82 5 11.903 5 10.826c0-1.08.382-1.993 1.146-2.738L8.128 6.12C8.873 5.372 9.785 5 10.864 5c1.087 0 2.004.382 2.75 1.146l2.777 2.79c.75.747 1.12 1.66 1.12 2.737 0 1.105-.392 2.045-1.183 2.817l1.186 1.186c.774-.79 1.708-1.186 2.805-1.186 1.078 0 1.995.377 2.75 1.132l2.804 2.804c.754.755 1.13 1.672 1.13 2.75z"/></svg>'},Douban:{background_color:"#497700",title:"Douban",locale:"en-US",redirect_url:"https://www.douban.com/share/service?name="+postTitle+"&href="+postUrl+"&image=&updated=&bm=&url="+postUrl+"&title="+postTitle+"&sel=",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-1 -1 34 34"><path fill="#fff" d="M13.498 6.49v6.258l-5.953-1.933L6 15.57l5.95 1.934-3.677 5.063 4.046 2.942L16 20.44l3.68 5.064 4.047-2.943L20.05 17.5 26 15.57l-1.545-4.755-5.953 1.933V6.49h-5.004z"/></svg>'},Draugiem:{background_color:"#ffad66",title:"Draugiem",redirect_url:"https://www.draugiem.lv/say/ext/add.php?link="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-4 -4 40 40"><path fill="#fff" d="M21.55 11.33c4.656.062 7.374 2.92 4.294 6.828-1.415 1.798-3.812 3.575-7.003 4.725-.15.056-.303.105-.46.16-.3.098-.595.188-.89.28a24.866 24.866 0 0 1-4.05.814c-.464.043-.91.078-1.35.085-2.97.077-5.205-.74-5.93-2.474-.88-2.077.9-4.976 4.454-7.178-2.627 1.06-7.408 3.546-7.61 7.12v.454c.02.362.09.725.21 1.108.76 2.41 4.333 3.533 8.884 3.13.446-.036.892-.092 1.352-.16.66-.1 1.337-.23 2.027-.39a35.76 35.76 0 0 0 2.02-.558c.154-.056.3-.098.454-.153.31-.094.608-.2.9-.31 3.945-1.436 6.87-3.34 8.58-5.526.975-1.253 1.476-2.424 1.574-3.448v-.787c-.28-2.61-3.317-4.135-7.45-3.717zm-3.024-1.29c.11 0 .21-.014.307-.035.662-.167.983-.87 1.01-1.7.028-.885-.286-1.624-1.01-1.728-.063-.014-.125-.014-.195-.014-.578 0-.955.348-1.157.857-.094.265-.16.564-.163.885-.014.383.034.745.167 1.038.196.418.53.697 1.046.697zm-.014.292c-.293 0-.544.028-.76.084l.063.084.11.202.092.21.077.215.056.223.035.223.02.23.008.223v.237l-.014.23-.018.23-.028.23-.028.23-.043.23-.042.23-.04.223-.056.223-.042.212-.056.21-.057.2-.057.196-.042.19-.04.18-.02.11-.03.125-.028.132-.02.14-.03.152-.02.124v.03l-.028.166-.056.21-.02.172-.03.18-.02.182-.03.18-.02.19-.03.18-.02.188-.02.188-.02.19v.007c.04.537.082.997.103 1.26.02.3.085.517.18.663.14.215.378.292.706.32.28-.028.487-.084.647-.23.153-.14.237-.376.3-.753.118-.774.467-3.31.767-4.397.425-1.568 1.456-4.418-1.066-4.634-.122-.024-.226-.024-.338-.024zm-3.06-.8h.015c.976-.008 1.436-.9 1.436-1.994s-.46-1.993-1.436-2h-.014c-.99 0-1.45.9-1.45 2s.46 1.993 1.45 1.993zm-2.013 4.626c.09.383.18.732.254 1.052.307 1.254.606 4.16.718 5.038.105.885.418 1.073 1.052 1.136.62-.063.94-.25 1.045-1.136.105-.878.41-3.79.71-5.038.08-.314.175-.67.266-1.052.28-1.15.502-2.495 0-3.366-.32-.557-.94-.92-2.02-.92-1.088 0-1.708.37-2.03.92-.5.864-.27 2.216 0 3.366zm-1.35-4.153c.1.02.196.035.308.035.516 0 .857-.28 1.045-.704.118-.293.174-.655.167-1.038a2.96 2.96 0 0 0-.167-.885c-.202-.51-.585-.857-1.157-.857-.07 0-.134 0-.197.014-.725.105-1.045.843-1.01 1.728.02.836.35 1.54 1.01 1.707zm-.3 9.373c.057.376.154.606.3.753.16.157.37.206.65.23.33-.024.557-.1.704-.32.09-.14.153-.36.18-.66.022-.264.064-.72.106-1.253v-.014l-.02-.187-.02-.188-.03-.188-.02-.18-.02-.19-.03-.18-.02-.18-.03-.183-.025-.174-.02-.166-.03-.167v-.02l-.02-.133-.028-.153-.028-.14-.024-.13-.028-.125-.03-.11-.034-.184-.056-.188-.04-.196-.058-.203-.056-.21-.056-.215-.04-.223-.057-.225-.04-.23-.033-.23-.028-.23-.03-.23-.02-.23-.008-.237v-.23l.007-.223.02-.23.034-.223.056-.222.07-.216.1-.21.11-.2.065-.085a3.128 3.128 0 0 0-.76-.083c-.11 0-.216 0-.32.014-2.524.216-1.492 3.066-1.067 4.634.262 1.054.603 3.59.728 4.364z"/></svg>'},Facebook_Messenger:{background_color:"#0084ff",title:"Facebook Messenger",redirect_url:"https://www.facebook.com/dialog/send?app_id=1904103319867886&display=popup&link="+postUrl+"&redirect_uri="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-2 -2 36 36"><path fill="#fff" d="M16 5C9.986 5 5.11 9.56 5.11 15.182c0 3.2 1.58 6.054 4.046 7.92V27l3.716-2.06c.99.276 2.04.425 3.128.425 6.014 0 10.89-4.56 10.89-10.183S22.013 5 16 5zm1.147 13.655L14.33 15.73l-5.423 3 5.946-6.31 2.816 2.925 5.42-3-5.946 6.31z"/></svg>'},Google_Classroom:{background_color:"#ffc112",title:"Google Classroom",redirect_url:"https://classroom.google.com/u/0/share?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-2 2 36 36"><g fill="#fff"><path d="M22.667 16.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334zM22.333 18c-1.928 0-4 .946-4 2.117v1.217h8v-1.217c0-1.17-2.072-2.117-4-2.117zm-13-1.333a1.668 1.668 0 1 0-.002-3.336 1.668 1.668 0 0 0 .002 3.336zM9.667 18c-1.928 0-4 .946-4 2.117v1.217h8v-1.217c0-1.17-2.072-2.117-4-2.117z"/><path d="M15.335 15.333A2.332 2.332 0 1 0 13 13a2.333 2.333 0 0 0 2.335 2.333zm.332 1.334c-2.572 0-5.333 1.392-5.333 3.11v1.557H21v-1.556c0-1.72-2.762-3.11-5.333-3.11zm3 10.666h8v2h-8v-2z"/></g></svg>'},Kik:{background_color:"#2a2a2a",title:"Kik",redirect_url:"https://www.kik.com/send/article/?app_name=Share&text=&title="+postTitle+"&url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-6 -4 40 40"><path d="M23.436 20.74a2.511 2.511 0 0 0 .109-5.019h-.11a2.516 2.516 0 0 0-2.507 2.515 2.509 2.509 0 0 0 2.508 2.508zm-7.946-3.09l2.89-2.89c.93-.93.93-2.434 0-3.363a2.374 2.374 0 0 0-3.362 0l-4.262 4.263V7.267A2.378 2.378 0 0 0 6 7.263V24.7a2.378 2.378 0 0 0 4.756.002v-2.316l1.335-1.335 3.76 5.07a2.378 2.378 0 0 0 3.866-2.771c-.016-.02-.03-.04-.047-.06l-4.177-5.638v-.002z" fill="#fff"/></svg>'},Papaly:{background_color:"#3ac0f6",title:"Papaly",redirect_url:"https://papaly.com/api/share.html?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M20.744 8.217c1.112 0 2.296.519 3.106 1.329l.185.185c1.361 1.361 1.402 4.432.042 5.792l-3.103 2.787L16 22.777l-4.974-4.467-3.103-2.787c-1.361-1.361-1.319-4.432.042-5.792l.185-.185c.81-.81 1.994-1.329 3.106-1.329.756 0 1.48.24 2.03.79L16 12.291l2.714-3.284c.55-.55 1.274-.79 2.03-.79m0-2.921c-1.58 0-3.035.585-4.096 1.646l-.098.098-.088.107-.462.558-.462-.559-.088-.106-.098-.098c-1.061-1.061-2.516-1.646-4.096-1.646-1.871 0-3.804.816-5.172 2.184l-.185.185c-2.515 2.515-2.535 7.43-.042 9.924l.055.055.058.052 3.103 2.787 4.974 4.467L16 26.704l1.952-1.753 4.974-4.467 3.103-2.787.058-.052.055-.055c2.494-2.494 2.473-7.409-.042-9.924l-.184-.186c-1.368-1.368-3.301-2.184-5.172-2.184z"></path></svg>'},Refind:{background_color:"#1492ef",title:"Refind",redirect_url:"https://refind.com/?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M16 21.256c-2.891 0-5.256-2.365-5.256-5.255 0-2.891 2.365-5.255 5.255-5.255 2.891 0 5.255 2.365 5.255 5.255.002 2.89-2.363 5.255-5.254 5.255z"></path><path d="M20.664 23.676A8.91 8.91 0 0 1 16 25c-4.95 0-9-4.05-9-9s4.05-9 9-9 9 4.05 9 9a8.912 8.912 0 0 1-1.302 4.628l2.293 1.991A11.908 11.908 0 0 0 28 16c0-6.6-5.4-12-12-12S4 9.4 4 16s5.4 12 12 12c2.456 0 4.745-.75 6.652-2.029l-1.988-2.295z"></path></g></svg>'},Skype:{background_color:"#00aff0",title:"Skype",redirect_url:"https://web.skype.com/share?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M27.15 18c-.007.04-.012.084-.02.126l-.04-.24.06.113c.124-.678.19-1.37.19-2.06 0-1.53-.3-3.013-.892-4.41a11.273 11.273 0 0 0-2.43-3.602 11.288 11.288 0 0 0-8.012-3.32c-.72 0-1.443.068-2.146.203h-.005c.04.023.08.04.118.063l-.238-.037c.04-.01.08-.018.12-.026a6.717 6.717 0 0 0-3.146-.787 6.67 6.67 0 0 0-4.748 1.965A6.7 6.7 0 0 0 4 10.738c0 1.14.293 2.262.844 3.253.007-.04.012-.08.02-.12l.04.238-.06-.114c-.112.643-.17 1.3-.17 1.954a11.285 11.285 0 0 0 3.32 8.012c1.04 1.04 2.25 1.86 3.602 2.43 1.397.592 2.882.89 4.412.89.666 0 1.334-.06 1.985-.175-.038-.02-.077-.04-.116-.063l.242.04c-.046.01-.088.015-.13.02a6.68 6.68 0 0 0 3.3.87 6.661 6.661 0 0 0 4.743-1.963A6.666 6.666 0 0 0 28 21.26c0-1.145-.295-2.27-.85-3.264zm-11.098 4.885c-4.027 0-5.828-1.98-5.828-3.463 0-.76.562-1.294 1.336-1.294 1.723 0 1.277 2.474 4.49 2.474 1.647 0 2.556-.893 2.556-1.808 0-.55-.27-1.16-1.355-1.426l-3.58-.895c-2.88-.723-3.405-2.282-3.405-3.748 0-3.043 2.865-4.186 5.556-4.186 2.478 0 5.4 1.37 5.4 3.192 0 .783-.677 1.237-1.45 1.237-1.472 0-1.2-2.035-4.163-2.035-1.47 0-2.285.666-2.285 1.618 0 .95 1.16 1.254 2.17 1.484l2.65.587c2.905.647 3.64 2.342 3.64 3.94 0 2.47-1.895 4.318-5.726 4.318z"></path></svg>'},SMS:{background_color:"#6ebe45",title:"SMS",bookmarklet_url:"sms:?&body="+postTitle+" "+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M16 3.543c-7.177 0-13 4.612-13 10.294 0 3.35 2.027 6.33 5.16 8.21 1.71 1.565 1.542 4.08-.827 6.41 2.874 0 7.445-1.698 8.462-4.34H16c7.176 0 13-4.605 13-10.285s-5.824-10.29-13-10.29zM9.045 17.376c-.73 0-1.45-.19-1.81-.388l.294-1.194c.384.2.98.398 1.6.398.66 0 1.01-.275 1.01-.692 0-.398-.302-.625-1.07-.9-1.06-.37-1.753-.957-1.753-1.886 0-1.09.91-1.924 2.415-1.924.72 0 1.25.152 1.63.322l-.322 1.166a3.037 3.037 0 0 0-1.336-.303c-.625 0-.93.284-.93.616 0 .41.36.59 1.186.9 1.127.42 1.658 1.01 1.658 1.91.003 1.07-.822 1.98-2.575 1.98zm9.053-.095l-.095-2.44a72.993 72.993 0 0 1-.057-2.626h-.028a35.41 35.41 0 0 1-.71 2.475l-.778 2.49h-1.128l-.682-2.473a29.602 29.602 0 0 1-.578-2.493h-.02c-.037.863-.065 1.85-.112 2.645l-.114 2.425H12.46l.407-6.386h1.924l.63 2.13c.2.74.397 1.536.54 2.285h.027a52.9 52.9 0 0 1 .607-2.293l.683-2.12h1.886l.35 6.386H18.1zm4.09.1c-.73 0-1.45-.19-1.81-.39l.293-1.194c.39.2.99.398 1.605.398.663 0 1.014-.275 1.014-.692 0-.396-.305-.623-1.07-.9-1.064-.37-1.755-.955-1.755-1.884 0-1.09.91-1.924 2.416-1.924.72 0 1.25.153 1.63.323l-.322 1.166a3.038 3.038 0 0 0-1.337-.303c-.625 0-.93.284-.93.616 0 .408.36.588 1.186.9 1.127.42 1.658 1.006 1.658 1.906.002 1.07-.823 1.98-2.576 1.98z"></path></svg>'},Trello:{background_color:"#1189ce",title:"Trello",redirect_url:"https://trello.com/add-card?mode=popup&url="+postUrl+"&name="+postTitle+"&desc=",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M26.5 4h-21A1.5 1.5 0 0 0 4 5.5v21A1.5 1.5 0 0 0 5.5 28h21a1.5 1.5 0 0 0 1.5-1.5v-21A1.5 1.5 0 0 0 26.5 4zM14.44 22.12c0 .825-.675 1.5-1.5 1.5H8.62c-.825 0-1.5-.675-1.5-1.5V8.62c0-.825.675-1.5 1.5-1.5h4.32c.825 0 1.5.675 1.5 1.5v13.5zm10.44-6c0 .825-.675 1.5-1.5 1.5h-4.32c-.825 0-1.5-.675-1.5-1.5v-7.5c0-.825.675-1.5 1.5-1.5h4.32c.825 0 1.5.675 1.5 1.5v7.5z"></path></svg>'},Viber:{background_color:"#8b628f",title:"Viber",bookmarklet_url:"viber://forward?text="+postTitle+" "+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path d="M22.57 27.22a7.39 7.39 0 0 1-1.14-.32 29 29 0 0 1-16-16.12c-1-2.55 0-4.7 2.66-5.58a2 2 0 0 1 1.39 0c1.12.41 3.94 4.3 4 5.46a2 2 0 0 1-1.16 1.78 2 2 0 0 0-.66 2.84A10.3 10.3 0 0 0 17 20.55a1.67 1.67 0 0 0 2.35-.55c1.07-1.62 2.38-1.54 3.82-.54.72.51 1.45 1 2.14 1.55.93.75 2.1 1.37 1.55 2.94a5.21 5.21 0 0 1-4.29 3.27zM17.06 4.79A10.42 10.42 0 0 1 26.79 15c0 .51.18 1.27-.58 1.25s-.54-.78-.6-1.29c-.7-5.52-3.23-8.13-8.71-9-.45-.07-1.15 0-1.11-.57.05-.87.87-.54 1.27-.6z" fill="#fff" fill-rule="evenodd"></path><path d="M24.09 14.06c-.05.38.17 1-.45 1.13-.83.13-.67-.64-.75-1.13-.56-3.36-1.74-4.59-5.12-5.35-.5-.11-1.27 0-1.15-.8s.82-.48 1.35-.42a6.9 6.9 0 0 1 6.12 6.57z" fill="#fff" fill-rule="evenodd"></path><path d="M21.52 13.45c0 .43 0 .87-.53.93s-.6-.26-.64-.64a2.47 2.47 0 0 0-2.26-2.43c-.42-.07-.82-.2-.63-.76.13-.38.47-.41.83-.42a3.66 3.66 0 0 1 3.23 3.32z" fill="#fff" fill-rule="evenodd"></path></svg>'},Threema:{background_color:"#2a2a2a",title:"Threema",bookmarklet_url:"threema://compose?text="+postTitle+" "+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M25.515 6.896L6.027 14.41c-1.33.534-1.322 1.276-.243 1.606l5 1.56 1.72 5.66c.226.625.115.873.77.873.506 0 .73-.235 1.012-.51l2.43-2.363 5.056 3.734c.93.514 1.602.25 1.834-.863l3.32-15.638c.338-1.363-.52-1.98-1.41-1.577z"></path></svg>'},Telegram:{background_color:"#3da5f1",title:"Telegram",redirect_url:"https://telegram.me/share/url?url="+postUrl+"&text="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M25.515 6.896L6.027 14.41c-1.33.534-1.322 1.276-.243 1.606l5 1.56 1.72 5.66c.226.625.115.873.77.873.506 0 .73-.235 1.012-.51l2.43-2.363 5.056 3.734c.93.514 1.602.25 1.834-.863l3.32-15.638c.338-1.363-.52-1.98-1.41-1.577z"></path></svg>'},email:{background_color:"#649a3f",title:"Email",redirect_url:"mailto:?subject="+postTitle+"&body=Link: "+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-4 -4 43 43"><path d="M 5.5 11 h 23 v 1 l -11 6 l -11 -6 v -1 m 0 2 l 11 6 l 11 -6 v 11 h -22 v -11" stroke-width="1" fill="#fff"></path></svg>'},reddit:{background_color:"#ff5700",title:"Reddit",redirect_url:"https://reddit.com/submit?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-3.5 -3.5 39 39"><path d="M28.543 15.774a2.953 2.953 0 0 0-2.951-2.949 2.882 2.882 0 0 0-1.9.713 14.075 14.075 0 0 0-6.85-2.044l1.38-4.349 3.768.884a2.452 2.452 0 1 0 .24-1.176l-4.274-1a.6.6 0 0 0-.709.4l-1.659 5.224a14.314 14.314 0 0 0-7.316 2.029 2.908 2.908 0 0 0-1.872-.681 2.942 2.942 0 0 0-1.618 5.4 5.109 5.109 0 0 0-.062.765c0 4.158 5.037 7.541 11.229 7.541s11.22-3.383 11.22-7.541a5.2 5.2 0 0 0-.053-.706 2.963 2.963 0 0 0 1.427-2.51zm-18.008 1.88a1.753 1.753 0 0 1 1.73-1.74 1.73 1.73 0 0 1 1.709 1.74 1.709 1.709 0 0 1-1.709 1.711 1.733 1.733 0 0 1-1.73-1.711zm9.565 4.968a5.573 5.573 0 0 1-4.081 1.272h-.032a5.576 5.576 0 0 1-4.087-1.272.6.6 0 0 1 .844-.854 4.5 4.5 0 0 0 3.238.927h.032a4.5 4.5 0 0 0 3.237-.927.6.6 0 1 1 .844.854zm-.331-3.256a1.726 1.726 0 1 1 1.709-1.712 1.717 1.717 0 0 1-1.712 1.712z" fill="#fff"/></svg>'},float_it:{background_color:"#53beee",title:"Float it",redirect_url:"https://www.designfloat.com/submit.php?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-3 -3 38 38"><g fill="#fff"><path d="M16 3C8.814 3 3 8.814 3 16s5.814 13 13 13 13-5.814 13-13S23.187 3 16 3zm0 25.152c-6.712 0-12.153-5.44-12.153-12.152C3.847 9.288 9.287 3.848 16 3.848S28.152 9.288 28.152 16c0 6.712-5.44 12.152-12.152 12.152z"/><path d="M22.406 16A6.402 6.402 0 0 0 16 9.593 6.402 6.402 0 0 0 9.593 16 6.4 6.4 0 0 0 16 22.406 6.4 6.4 0 0 0 22.406 16zM16 21.39A5.392 5.392 0 0 1 10.61 16 5.403 5.403 0 0 1 16 10.61 5.393 5.393 0 0 1 21.39 16 5.382 5.382 0 0 1 16 21.39z"/><path d="M13.763 9.187V4.864c-4.475.9-8 4.424-8.898 8.898h4.322a7.226 7.226 0 0 1 4.576-4.575zm9.05 4.576h4.32c-.896-4.475-4.422-8-8.896-8.898v4.322a7.224 7.224 0 0 1 4.575 4.576zm-4.576 9.052v4.322c4.475-.9 8-4.424 8.897-8.9h-4.322a7.232 7.232 0 0 1-4.575 4.578zm-9.05-4.578H4.863c.898 4.475 4.424 8 8.898 8.9v-4.323a7.233 7.233 0 0 1-4.574-4.577z"/></g></svg>'},gentlereader:{background_color:"#46aecf",title:"GentleReader",redirect_url:"https://app.gentlereader.com/bookmark?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-80 -80.014 1200.014 1200"><path fill-rule="evenodd" clip-rule="evenodd" fill=#fff d="M819.664,291.684C572.661-7.32,155.656,203.683,169.656,527.687 c38,489.007,727.009,448.006,683.009-28H562.661v98h177.002c-54.721,270.685-443.659,218.617-464.179-77.827 c-0.48-6.934,1.493-36.96,3.053-44.641c44.28-217.95,300.377-317.791,467.126-110.535L819.664,291.684z"></path></svg>',},google_bookmarks:{background_color:"#cb0909",title:"Google Bookmarks",redirect_url:"http://www.google.com/bookmarks/mark?op=edit&bkmk="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 0 100 100"><path d="M 51.22877660575707 38.19080770219705 A 17 17 0 1 0 56 50.00000000000001 h -17" stroke="#fff" stroke-width="8" fill="none"></path></svg>'},digg:{background_color:"#006094",title:"Digg",redirect_url:"http://digg.com/submit?phase=2&url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-5 -5 49 49"><path d="M 6 20 h 10 c 0 -14 -9 -14 -9 0 m 5 0 v 7 m -1 0 v -7 m 4 -7 h 4.5 v -5 h 8 v 8 h -8 v -3 m 8 0 h 4 v 5.5 h -3 v 12 h -4 v -8 m 0 8 h -6.5 v -12 h -2" stroke-width="2" stroke="#fff" fill="none"></path><ellipse cx="11.5" cy="28.5" rx="4" ry="2" style="fill:#fff;"></ellipse></svg>'},printfriendly:{background_color:"#61d1d5",title:"PrintFriendly",redirect_url:"https://www.printfriendly.com/print?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10"><path fill="none" d="M22.562 19.588v4.373H9.438v-4.37h13.124zm-13.124 1.53H6.375c-.483 0-.875-.313-.875-.7v-7.35c0-.387.392-.7.875-.7h19.25c.482 0 .875.313.875.7v7.35c0 .387-.393.7-.876.7h-3.062"></path><path fill="#fff" d="M22.562 12.32V8.04H9.436v4.28"></path></g></svg>'},print:{background_color:"#fd6500",title:"Print",bookmarklet_url:"javascript:window.print()",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#A9A9A9" stroke="#fff" stroke-width=".1" d="M4.467 14.305h23.065v6.498H4.467v-6.498z"/><path fill="#DCDCDC" stroke="#fff" stroke-width=".1" d="M5.228 12.83H26.77l.745 1.39H4.485l.743-1.39z"/><path d="M9.19 8.118h13.467v6.106H9.19z"/><path fill="#fff" stroke="#fff" stroke-width=".1" d="M9.844 6.516h12.312v7.31H9.844z"/><path stroke="#fff" stroke-width=".1" d="M8.602 17.37h14.574v3.396H8.602z"/><path fill="#fff" stroke="#fff" stroke-width=".1" d="M10.152 17.97h11.27l2.233 7.515H7.92l2.232-7.514z"/></svg>'},tumblr:{background_color:"#29435d",title:"Tumblr",redirect_url:"https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl="+postUrl+"&title="+postTitle+"&caption=",bookmarklet_url:"javascript:var d=document,w=window,e=w.getSelection,k=d.getSelection,x=d.selection,s=(e?e():(k)?k():(x?x.createRange().text:0)),f='http://www.tumblr.com/share',l=d.location,e=encodeURIComponent,p='?v=3&u='+e(l.href) +'&t='+e(d.title) +'&s='+e(s),u=f+p;try{if(!/^(.*\\.)?tumblr[^.]*$/.test(l.host))throw(0);tstbklt();}catch(z){a =function(){if(!w.open(u,'t','toolbar=0,resizable=0,status=1,width=450,height=430'))l.href=u;};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else a();}void(0);",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-2 -2 36 36"><path fill="#fff" d="M20.775 21.962c-.37.177-1.08.33-1.61.345-1.598.043-1.907-1.122-1.92-1.968v-6.217h4.007V11.1H17.26V6.02h-2.925s-.132.044-.144.15c-.17 1.556-.895 4.287-3.923 5.378v2.578h2.02v6.522c0 2.232 1.647 5.404 5.994 5.33 1.467-.025 3.096-.64 3.456-1.17l-.96-2.846z"/></svg>'},vk:{background_color:"#5e84ac",title:"Vkontakte",redirect_url:"https://vk.com/share.php?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-1 -2 34 34"><path fill-rule="evenodd" clip-rule="evenodd" fill="#fff" d="M15.764 22.223h1.315s.394-.044.6-.262c.184-.2.18-.574.18-.574s-.03-1.764.79-2.023c.81-.255 1.844 1.705 2.942 2.46.832.57 1.464.445 1.464.445l2.936-.04s1.538-.097.81-1.304c-.06-.1-.426-.894-2.186-2.526-1.843-1.71-1.594-1.434.624-4.39 1.353-1.804 1.893-2.902 1.724-3.374-.16-.45-1.153-.33-1.153-.33l-3.306.02s-.247-.034-.428.074c-.178.108-.293.356-.293.356s-.522 1.394-1.223 2.58c-1.47 2.5-2.06 2.633-2.3 2.476-.563-.36-.42-1.454-.42-2.23 0-2.423.365-3.435-.72-3.696-.357-.085-.623-.143-1.544-.15-1.182-.014-2.18.003-2.743.28-.378.185-.667.595-.49.62.218.027.713.13.975.49.34.46.33 1.496.33 1.496s.193 2.852-.46 3.206c-.442.245-1.056-.252-2.37-2.52-.67-1.163-1.18-2.446-1.18-2.446s-.1-.24-.273-.37c-.212-.155-.506-.204-.506-.204l-3.145.02s-.473.015-.647.22c-.154.183-.01.56-.01.56s2.46 5.757 5.245 8.657c2.553 2.66 5.454 2.485 5.454 2.485z"/></svg>'},evernote:{background_color:"#8be056",title:"Evernote",redirect_url:"https://www.evernote.com/clip.action?url="+postUrl+"&title="+postTitle,bookmarklet_url:"javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M7.884 8.573h2.276c.13 0 .236-.106.236-.235 0 0-.027-1.95-.027-2.494v-.006c0-.445.09-.833.253-1.16l.078-.145c-.007 0-.017.005-.025.014l-4.42 4.385c-.01.007-.014.016-.017.026.09-.046.215-.107.233-.115.386-.175.85-.27 1.41-.27zm17.704-.477c-.18-.968-.755-1.444-1.275-1.632-.56-.203-1.698-.413-3.127-.58-1.15-.137-2.504-.126-3.318-.1-.1-.672-.568-1.285-1.096-1.498-1.404-.564-3.573-.428-4.13-.272-.442.125-.932.378-1.205.768-.183.262-.302.595-.302 1.062 0 .265.007.886.015 1.44l.014 1.054c0 .494-.4.896-.896.897H7.99c-.485 0-.856.082-1.14.21-.284.128-.484.303-.636.508-.304.408-.357.912-.355 1.426 0 0 0 .416.102 1.23.084.63.767 5.02 1.414 6.356.25.522.42.736.912.966 1.1.47 3.61.994 4.787 1.146 1.174.15 1.912.466 2.35-.457.002 0 .088-.227.208-.56.382-1.156.435-2.18.435-2.924 0-.076.11-.078.11 0 0 .524-.1 2.38 1.303 2.875.554.197 1.7.373 2.864.51 1.055.12 1.82.537 1.82 3.24 0 1.645-.346 1.87-2.152 1.87-1.464 0-2.02.038-2.02-1.125 0-.938.93-.842 1.616-.842.31 0 .086-.23.086-.81 0-.576.36-.91.02-.918-2.384-.065-3.786-.004-3.786 2.978 0 2.706 1.036 3.208 4.418 3.208 2.65 0 3.588-.086 4.682-3.483.22-.67.742-2.718 1.06-6.154.197-2.173-.194-8.732-.502-10.388zm-4.622 7.25c-.327-.012-.643.01-.937.056.08-.667.353-1.488 1.332-1.453 1.08.033 1.23 1.056 1.237 1.75-.457-.205-1.02-.335-1.635-.357z"/></svg>'},amazon_us_wish_list:{background_color:"#ffe000",title:"Amazon Wish List",redirect_url:"https://www.amazon.com/wishlist/add?u="+postUrl+"&t="+postTitle,bookmarklet_url:"javascript:(function(){var w=window,l=w.location,d=w.document,s=d.createElement('script'),e=encodeURIComponent,x='undefined',u='http://www.amazon.com/gp/wishlist/add';if(typeof s!='object')l.href=u+'?u='+e(l)+'&t='+e(d.title);function g(){if(d.readyState&&d.readyState!='complete'){setTimeout(g,200);}else{if(typeof AUWLBook==x)s.setAttribute('src',u+'.js?loc='+e(l)),d.body.appendChild(s);function f(){(typeof AUWLBook==x)?setTimeout(f,200):AUWLBook.showPopover();}f();}}g();}())",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M24.998 23.842c-.127 0-.256.03-.377.086-.132.055-.27.117-.4.172l-.194.08-.25.1v.005c-2.72 1.102-5.573 1.748-8.215 1.805-.097.004-.193.004-.29.004-4.153.003-7.544-1.926-10.964-3.823-.12-.06-.24-.094-.36-.094-.156 0-.313.058-.43.164-.114.106-.183.266-.182.426 0 .207.112.395.267.52 3.21 2.786 6.73 5.376 11.46 5.378.094 0 .188-.002.28-.004 3.01-.07 6.415-1.085 9.058-2.745l.016-.01c.346-.207.69-.44 1.018-.703.205-.15.346-.385.344-.63-.01-.435-.377-.73-.775-.73zm3.666-1.54c-.012-.265-.068-.466-.178-.632l-.01-.016-.015-.02c-.11-.12-.216-.167-.333-.218-.347-.133-.853-.205-1.46-.207-.437 0-.92.04-1.4.143l-.002-.03-.486.16-.01.006-.276.09v.012c-.322.136-.615.302-.89.498-.167.13-.31.297-.317.556-.004.14.066.3.185.395.12.097.257.13.378.13.027 0 .055 0 .078-.005l.023-.002.018-.003c.238-.053.586-.085.992-.144.347-.037.72-.066 1.04-.066.225 0 .43.014.57.045.07.016.12.032.15.05.01.003.016.007.02.01.006.02.016.067.014.14.004.268-.11.767-.266 1.25-.152.487-.338.974-.46 1.298-.03.075-.048.157-.048.247-.003.13.05.287.16.393.11.104.255.145.374.145h.006c.18-.002.332-.07.463-.176 1.236-1.112 1.666-2.888 1.684-3.888l-.003-.16z"/><path d="M17.355 10.384c-.728.055-1.565.11-2.404.222-1.282.17-2.57.39-3.63.896-2.07.838-3.467 2.627-3.467 5.254 0 3.3 2.124 4.98 4.81 4.98.894 0 1.622-.114 2.29-.28 1.064-.336 1.958-.95 3.02-2.07.614.838.782 1.23 1.844 2.125.278.114.558.114.78-.052.673-.56 1.85-1.568 2.462-2.125.28-.224.224-.56.056-.837-.613-.783-1.23-1.455-1.23-2.965V10.5c0-2.125.167-4.082-1.397-5.534-1.285-1.173-3.3-1.62-4.864-1.62h-.672c-2.85.164-5.868 1.395-6.54 4.918-.11.447.226.613.45.67l3.13.39c.336-.055.502-.336.56-.613.278-1.23 1.284-1.845 2.4-1.96h.227c.67 0 1.397.28 1.79.84.447.67.39 1.568.39 2.35v.446zm-.613 6.65c-.393.782-1.063 1.286-1.79 1.456-.112 0-.28.055-.448.055-1.228 0-1.956-.95-1.956-2.35 0-1.788 1.06-2.627 2.402-3.018.727-.167 1.567-.225 2.405-.225v.672c0 1.287.057 2.292-.613 3.41z" fill="#fff"/></svg>'},wordpress_blog:{background_color:"#464646",title:"WordPress",redirect_url:"https://www.addtoany.com/ext/wordpress/press_this?linkurl="+postUrl+"&linkname="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M3.176 16c0 5.076 2.95 9.462 7.226 11.54L4.287 10.78A12.77 12.77 0 0 0 3.177 16zm21.48-.646c0-1.586-.57-2.684-1.06-3.537-.647-1.058-1.26-1.95-1.26-3.008 0-1.18.897-2.28 2.156-2.28.057 0 .11.01.166.01A12.772 12.772 0 0 0 16 3.172c-4.48 0-8.422 2.3-10.715 5.78.302.01.585.017.826.017 1.345 0 3.42-.163 3.42-.163.69-.042.774.974.084 1.056 0 0-.694.08-1.466.12l4.668 13.892 2.808-8.417-1.998-5.476c-.69-.04-1.345-.12-1.345-.12-.69-.04-.61-1.1.08-1.058 0 0 2.117.164 3.38.164 1.34 0 3.417-.163 3.417-.163.69-.04.77.976.08 1.058 0 0-.694.08-1.467.12l4.633 13.785 1.28-4.272c.552-1.773.975-3.048.975-4.144zm-8.43 1.766l-3.85 11.18c1.15.34 2.365.523 3.624.523 1.492 0 2.925-.26 4.26-.728a1.235 1.235 0 0 1-.093-.177L16.225 17.12zM27.25 9.848c.055.408.086.848.086 1.318 0 1.3-.242 2.764-.975 4.594l-3.914 11.324C26.26 24.86 28.822 20.73 28.822 16c0-2.23-.568-4.326-1.57-6.152z"></path><path d="M16 1.052C7.757 1.052 1.052 7.757 1.052 16c0 8.242 6.705 14.948 14.948 14.948 8.242 0 14.948-6.706 14.948-14.95 0-8.24-6.706-14.946-14.948-14.946zm0 29.212c-7.865 0-14.264-6.4-14.264-14.265S8.136 1.732 16 1.732c7.863 0 14.264 6.398 14.264 14.263 0 7.863-6.4 14.264-14.264 14.264z"></path></g></svg>'},whatsapp:{background_color:"#55eb4c",title:"Whatsapp",bookmarklet_url:"https://"+heateorSssDetermineWhatsappShareAPI(!0)+"/send?text="+postTitle+" "+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-5 -5 40 40"><path id="arc1" stroke="#fff" stroke-width="2" fill="none" d="M 11.579798566743314 24.396926207859085 A 10 10 0 1 0 6.808479557110079 20.73576436351046"></path><path d="M 7 19 l -1 6 l 6 -1" stroke="#fff" stroke-width="2" fill="none"></path><path d="M 10 10 q -1 8 8 11 c 5 -1 0 -6 -1 -3 q -4 -3 -5 -5 c 4 -2 -1 -5 -1 -4" fill="#fff"></path></svg>'},diigo:{background_color:"#4a8bca",title:"Diigo",redirect_url:"https://www.diigo.com/post?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill-rule="evenodd" clip-rule="evenodd" fill="#fff" d="M23.81 4.5c.012.198.035.396.035.593 0 4.807.026 9.615-.01 14.422-.02 3.248-1.5 5.678-4.393 7.158-4.66 2.385-10.495-.64-11.212-5.836-.76-5.517 3.747-9.56 8.682-9.018 1.114.12 2.16.5 3.134 1.07.517.3.527.295.53-.29.007-2.7.01-5.4.014-8.103h3.22zm-7.914 19.97c2.608.068 4.82-2.025 4.954-4.552.138-2.626-1.89-5.074-4.727-5.145-2.7-.067-4.867 2-4.973 4.71-.107 2.72 2.13 5.008 4.746 4.988z"/></svg>'},yc_hacker_news:{background_color:"#f60",title:"Hacker News",redirect_url:"https://news.ycombinator.com/submitlink?u="+postUrl+"&t="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M17.275 17.834v7.13h-2.602v-7.182L9 7.035h3.07l2.967 6.115c.365.755.702 1.51.988 2.316.312-.728.65-1.483 1.042-2.29l3.018-6.142H23l-5.725 10.8z"/></svg>'},box_net:{background_color:"#1a74b0",title:"Box.net",redirect_url:"https://www.box.net/api/1.0/import?url="+postUrl+"&name="+postTitle+"&import_as=link",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M16.49 11.36c-1.653 0-3.18.524-4.434 1.41V6.543a1.617 1.617 0 0 0-3.235 0v11.903c-.017.2.002 1.37.055 1.7.53 3.73 3.73 6.604 7.61 6.604a7.693 7.693 0 0 0 7.692-7.696 7.694 7.694 0 0 0-7.695-7.695zm0 12.126a4.432 4.432 0 0 1-4.434-4.432 4.432 4.432 0 1 1 8.863 0 4.433 4.433 0 0 1-4.434 4.432z"></path></svg>'},aol_mail:{background_color:"#2a2a2a",title:"AOL Mail",redirect_url:"http://webmail.aol.com/25045/aol/en-us/Mail/compose-message.aspx?subject="+postTitle+"&body="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path d="M17.334 13.26c-2.315 0-4.067 1.8-4.067 4.027 0 2.35 1.824 4.03 4.067 4.03 2.243 0 4.062-1.68 4.062-4.03 0-2.228-1.744-4.027-4.062-4.027zm0 2.127c1-.007 1.82.847 1.82 1.9 0 1.048-.82 1.9-1.82 1.9s-1.818-.853-1.818-1.9c0-1.053.817-1.9 1.818-1.9zm11.59 4.518c0 .778-.63 1.412-1.41 1.412-.778 0-1.41-.634-1.41-1.412 0-.778.632-1.408 1.41-1.408.78 0 1.41.63 1.41 1.408zm-4.104 1.418h-2.216v-10.28h2.216v10.28zM9.33 11.04s2.585 6.79 3.862 10.13c.015.037.028.078.047.132-.06.006-.105.01-.15.01-.83.002-1.664-.003-2.497.004-.12.002-.17-.04-.204-.156-.116-.385-.247-.766-.365-1.147-.032-.11-.074-.153-.193-.153-1.066.006-2.132.006-3.2 0-.1 0-.142.03-.173.13-.127.405-.26.81-.39 1.21-.02.076-.05.117-.136.117-.874-.006-1.75-.004-2.624-.004-.016 0-.036-.005-.07-.012.023-.06.04-.116.064-.17 1.286-3.307 3.91-10.086 3.91-10.086H9.33zm-.023 6.674c-.343-1.147-.68-2.274-1.02-3.4h-.03l-1.017 3.4h2.067z" fill="#fff"/></svg>'},yahoo_mail:{background_color:"#400090",title:"Yahoo Mail",redirect_url:"https://compose.mail.yahoo.com/?Subject="+postTitle+"&body=Link: "+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M21.495 6.097c1.09.31 2.213.28 3.304 0l-7.42 12.09v9.91a4.366 4.366 0 0 0-1.37-.22c-.47 0-.937.065-1.404.22v-9.91L7.19 6.097c1.09.28 2.213.31 3.304 0l5.516 8.788 5.483-8.787z"></path></svg>'},instapaper:{background_color:"#ededed",title:"Instapaper",redirect_url:"https://www.instapaper.com/edit?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M11.98 5.5h8.04v1.265h-.62c-.582 0-1.004.08-1.264.242-.262.162-.453.39-.572.69-.12.297-.182.874-.182 1.732v13.53c0 .683.064 1.167.195 1.453.13.286.313.494.55.625.234.13.658.196 1.27.196h.618V26.5H11.98v-1.265h.662c.592 0 1.012-.067 1.258-.203.246-.135.424-.33.533-.587.11-.256.166-.75.166-1.483V9.112c0-.776-.057-1.3-.168-1.567-.11-.268-.287-.465-.533-.59-.247-.128-.667-.19-1.26-.19h-.66V5.5z"/></svg>'},plurk:{background_color:"#cf682f",title:"Plurk",redirect_url:"https://www.plurk.com/m?content="+postUrl+"&qualifier=shares",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M20.215 16.016h-8.43V9.7h8.43v6.316zm4.2 4.2V5.5H7.585v21h4.2v-6.285h12.63z"></path></svg>'},aim:{background_color:"#10ff00",title:"AIM",redirect_url:"http://share.aim.com/share/?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M16.75 16.548c-.24.558-.465 1.08-.707 1.646 2.756 1.873 5.48 3.752 7.615 6.453l-2.11 1.43c-.708-.768-1.364-1.59-2.132-2.29-1.047-.958-2.156-1.85-3.557-2.285-.585-.183-.98-.086-1.39.41-1.527 1.862-3.26 3.49-5.476 4.522-1.368.64-1.368.642-1.972-.695-.178-.39-.346-.785-.54-1.226 1.827-.433 3.38-1.246 4.62-2.62.74-.822 1.166-1.716 1.26-2.856.17-2.103.628-4.15 1.828-5.95.534-.797 1.768-.98 2.493-.37.062.046.11.126.13.2.48 1.81 2.08 2.005 3.58 1.63.573-.146 1.118-.404 1.73-.63l1.07 1.483c-1.903 1.718-4.075 1.73-6.444 1.145zm.842-12.054c1.78.02 3.254 1.57 3.22 3.386-.032 1.734-1.62 3.284-3.325 3.246-1.822-.04-3.326-1.604-3.284-3.418.038-1.8 1.555-3.236 3.39-3.214z"></path></svg>'},viadeo:{background_color:"#2a2a2a",title:"Viadeo",redirect_url:"https://www.viadeo.com/shareit/share/?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M15.107 4s2.838 1.88 3.326 7.05c0 0 .957 12.423-5.47 14.858 0 0 .577.106 1.224.076 0 0 7.947-5.012 4.3-14.742 0 0-1.09-3.396-3.38-7.242zm4.15 8.483s-1.48-2.29.397-4.18c0 0 .658-.725 2.537-1.202 0 0 1.88-.4 2.897-2.553 0 0 2.105 2.94.81 6.807 0 0-.64 1.742-1.976 2.538-1.01.6-2.535.788-4.133-.776 0 0 4.83-2.644 5.01-4.884 0 0-1.483 3.334-5.54 4.256z"></path><path d="M19.256 12.483s-1.48-2.29.398-4.18c0 0 .658-.725 2.537-1.202 0 0 1.88-.4 2.897-2.553 0 0 2.105 2.94.81 6.807 0 0-.64 1.742-1.976 2.538-1.01.6-2.535.788-4.133-.776 0 0 4.83-2.644 5.01-4.884 0 0-1.483 3.334-5.54 4.256zm1.23 6.95c0 1.19-.283 2.3-.85 3.33-.57 1.03-1.34 1.825-2.306 2.384-.967.56-2.03.84-3.186.84-1.156 0-2.22-.28-3.186-.84-.97-.56-1.736-1.354-2.305-2.383a6.787 6.787 0 0 1-.853-3.33c0-1.847.625-3.42 1.87-4.723 1.247-1.3 2.74-1.95 4.474-1.95.824 0 1.596.15 2.313.45.072-.754.336-1.456.63-2.03a8.578 8.578 0 0 0-2.936-.49c-2.504 0-4.58.92-6.22 2.77-1.495 1.675-2.24 3.65-2.24 5.933 0 2.3.79 4.31 2.366 6.03C9.63 27.14 11.666 28 14.15 28c2.48 0 4.508-.86 6.086-2.58 1.578-1.72 2.367-3.73 2.367-6.03 0-1.233-.22-2.374-.65-3.427a6.21 6.21 0 0 1-1.982.797c.347.816.52 1.707.52 2.674z"></path></g></svg>'},pinboard_in:{background_color:"#1341de",title:"Pinboard",redirect_url:"https://pinboard.in/add?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M17.357 18.913l-5.01 5.014.88-4.5-6.588-8.075-3.48.044 4.314-4.313 4.035-4.04V6.85l7.795 6.403 4.502-.786-4.876 4.87 9.908 11.62"></path></svg>'},blogger_post:{background_color:"#fda352",title:"Blogger Post",redirect_url:"https://www.blogger.com/blog_this.pyra?t=&u="+postUrl+"&l&n="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path stroke="#fff" stroke-width="2" fill="none" d="M12.393 6.112h4.367c1.61.19 3.96 1.572 4.824 3.41.238.515.363.594.56 2.12.106.786.16 1.367.51 1.69.495.45 2.333.147 2.696.43l.277.22.166.343.06.277-.04 5.048c-.02 3.43-2.81 6.238-6.244 6.238h-7.177c-3.436 0-6.244-2.81-6.244-6.238v-7.29c-.003-3.434 2.806-6.248 6.242-6.248z"/><path fill="none" stroke="#fff" stroke-width="1.5" d="M12.47 11.22h3.464c.66 0 1.195.534 1.195 1.188 0 .653-.538 1.195-1.198 1.195H12.47c-.66 0-1.194-.542-1.194-1.195 0-.654.535-1.19 1.195-1.19zm0 7.15h7.038c.654 0 1.19.534 1.19 1.188 0 .646-.535 1.188-1.19 1.188H12.47c-.66 0-1.194-.54-1.194-1.188 0-.654.535-1.19 1.195-1.19z"/></svg>'},typepad_post:{background_color:"#2a2a2a",title:"TypePad Post",redirect_url:"https://www.typepad.com/services/quickpost/post?v=2&qp_show=ac&qp_title="+postTitle+"&qp_href="+postUrl+"&qp_text="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#D2DE61" d="M16 8.875c-6.627 0-12 3.225-12 7.202 0 .844.342 2.21.787 2.407.447.196 1.67.683 12.523-3.836 0 0-9.096 4.09-9.83 5.85-.253.605 2.154 2.627 8.52 2.627 6.626 0 12-3.148 12-7.125s-5.374-7.125-12-7.125z"/></svg>'},buffer:{background_color:"#000",title:"Buffer",redirect_url:"https://bufferapp.com/add?url="+postUrl+"&text="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-4 -4 38 39"><path stroke="#fff" d="M 15 6 l -10 5 l 10 5 l 10 -5 z" stroke-width="0" fill="#fff"></path><path stroke="#fff" d="M 5.5 14.5 l 9.5 5 l 9.5 -5 m -19 4 l 9.5 5 l 9.5 -5" stroke-width="2" fill="none"></path></svg>'},flipboard:{background_color:"#c00",title:"Flipboard",redirect_url:"https://share.flipboard.com/bookmarklet/popout?v=2&url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M19 19H7V7h12v12z"/><path fill="#fff" d="M25 13H7V7h18v6z"/><path fill="#fff" d="M13 25H7V7h6v18z"/></svg>'},pocket:{background_color:"#f0f0f0",title:"Pocket",redirect_url:"https://readitlaterlist.com/save?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M16.005 6.244c2.927 0 5.854-.002 8.782 0 1.396.002 2.195.78 2.188 2.165-.015 2.483.116 4.985-.11 7.454-.75 8.204-10.027 12.607-16.91 8.064-3.086-2.037-4.82-4.926-4.917-8.673-.06-2.34-.034-4.684-.018-7.025.008-1.214.812-1.98 2.056-1.983 2.975-.01 5.952-.005 8.93-.007zm-5.037 5.483c-.867.093-1.365.396-1.62 1.025-.27.67-.078 1.256.417 1.732a529.74 529.74 0 0 0 5.09 4.838c.745.695 1.537.687 2.278-.01a473.74 473.74 0 0 0 4.93-4.686c.827-.797.91-1.714.252-2.38-.694-.704-1.583-.647-2.447.17-1.097 1.04-2.215 2.06-3.266 3.143-.485.492-.77.432-1.227-.027a87.392 87.392 0 0 0-3.39-3.225c-.325-.29-.77-.448-1.017-.584z"></path></svg>'},fark:{background_color:"#555",title:"Fark",redirect_url:"https://cgi.fark.com/cgi/fark/submit.pl?new_url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M22.925 9.77V5.613H9.075v20.772h5.54v-8.31h8.31v-4.153h-8.31V9.77"/></svg>'},fintel:{background_color:"#087515",title:"Fintel",redirect_url:"https://fintel.io/submit?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="-110 -120 428 494" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon fill="#fff" points="108,274 48,274 48,152 0,152 0,95 48,95 48,0 208,0 208,56 108,56 108,95 180,95 180,151 108,151 "/><polygon fill="#fff" points="99,272 103,272 103,147 175,147 175,100 103,100 103,52 203,52 203,7 199,7 199,48 98,48 98,104 171,104 171,142 99,142 "/></g></svg>'},yummly:{background_color:"#e16120",title:"Yummly",redirect_url:"https://www.yummly.com/urb/verify?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 30 30"><path stroke="#fff" d="M 10.5 10 q 4 -2 2.5 1 l -1 4 q 0 2 5 0 l 1 -6.5 m -1 6.5 l -1 4 c -3 6 -6 -1 0 -1 q 1 -1 5 1" stroke-width="2" fill="none"></path></svg>'},app_net:{background_color:"#5d5d5d",title:"App.net",locale:"en-US",redirect_url:"https://account.app.net/login/",svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M16 7.158L4.156 25h2.422l2.695-4h13.453l2.695 4h2.425L16 7.158zM10.82 19L16 11.2l5.178 7.8H10.82z"/></svg>'},Symbaloo_Feeds:{background_color:"#6da8f7",title:"Symbaloo Feeds",redirect_url:"https://www.symbaloo.com/"+postUrl,svg:'<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path d="M7 7h4.5v4.5H7zm6.75 0h4.5v4.5h-4.5zm6.75 0H25v4.5h-4.5zM7 13.75h4.5v4.5H7zm6.75 0h4.5v4.5h-4.5zm6.75 0H25v4.5h-4.5zM7 20.5h4.5V25H7zm6.75 0h4.5V25h-4.5zm6.75 0H25V25h-4.5z" fill="#FFF"/></svg>'},Outlook_com:{background_color:"#0072c6",title:"Outlook.com",redirect_url:"https://mail.live.com/default.aspx?rru=compose?subject="+postTitle+"&body="+postUrl+"&lc=1033&id=64855&mkt=en-us&cbcxt=mai",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M19.52 8.29v5.5l1.92 1.208c.053.016.163.016.212 0l8.27-5.574c0-.66-.613-1.134-.962-1.134h-9.44z"/><path fill="#fff" d="M19.52 15.84l1.755 1.204c.246.183.543 0 .543 0-.297.183 8.104-5.397 8.104-5.397V21.75c0 1.102-.704 1.562-1.496 1.562H19.52V15.84z"/><g fill="#fff"><path d="M10.445 13.305c-.6 0-1.073.282-1.426.842-.355.56-.53 1.305-.53 2.23 0 .936.175 1.677.53 2.22.347.546.813.82 1.38.82.59 0 1.055-.266 1.4-.795.344-.53.517-1.266.517-2.206 0-.984-.17-1.744-.502-2.288-.333-.55-.79-.823-1.37-.823z"/><path d="M2.123 5.5v21.51l16.362 3.428V2.33L2.123 5.5zm10.95 14.387c-.693.91-1.594 1.367-2.706 1.367-1.082 0-1.967-.442-2.65-1.324-.68-.88-1.02-2.03-1.02-3.448 0-1.496.343-2.707 1.037-3.63.693-.926 1.614-1.388 2.754-1.388 1.08 0 1.955.438 2.62 1.324.667.885 1 2.05 1 3.495.004 1.496-.345 2.695-1.034 3.604z"/></g></svg>'},balatarin:{background_color:"#fff",title:"Balatarin",redirect_url:"https://www.balatarin.com/login",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#B90E10" d="M29 17H3v10c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V17z"/><path fill="#fff" d="M12 22h8v2h-8z"/><path fill="#079948" d="M29 15H3V5c0-1.1.9-2 2-2h22c1.1 0 2 .9 2 2v10z"/><g fill="#fff"><path d="M15 5h2v8h-2z"/><path d="M12 8h8v2h-8z"/></g></svg>'},bibSonomy:{background_color:"#000",title:"BibSonomy",redirect_url:"https://www.bibsonomy.org/login",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-7 -7 46 46"><path fill="#fff" d="M25.058 25.892c-.25 0-.484.065-.694.17l-5.907-8.2a1.548 1.548 0 0 0 .344-1.68l4.28-2.573c.288.333.71.552 1.187.552.862 0 1.56-.7 1.56-1.56 0-.776-.567-1.415-1.31-1.535V6.11a1.556 1.556 0 0 0-.25-3.095c-.862 0-1.56.7-1.56 1.56 0 .196.04.383.106.556l-4.256 2.477a1.548 1.548 0 0 0-1.2-.574c-.862 0-1.56.7-1.56 1.56 0 .778.567 1.417 1.31 1.537v5.1c-.218.035-.42.112-.598.23L9.93 8.204c.213-.268.345-.6.345-.97a1.56 1.56 0 1 0-.712 1.309l6.575 7.25c-.213.267-.345.6-.345.968 0 .23.054.45.144.647L8.08 22.66a1.547 1.547 0 0 0-1.138-.5 1.56 1.56 0 1 0 1.56 1.56c0-.23-.053-.45-.144-.646l7.857-5.25c.07.076.147.144.23.204l-1.95 3.927a1.536 1.536 0 0 0-.457-.076c-.862 0-1.56.695-1.56 1.56a1.56 1.56 0 1 0 2.468-1.27l1.95-3.926c.146.045.297.076.458.076.25 0 .484-.064.694-.17l5.907 8.2a1.56 1.56 0 1 0 1.103-.459zM18.914 8.59c0-.197-.04-.383-.106-.556l4.257-2.473c.236.29.567.49.95.55v4.96a1.558 1.558 0 0 0-1.197 2.115l-4.278 2.573a1.542 1.542 0 0 0-.935-.53v-5.102a1.555 1.555 0 0 0 1.31-1.534z"/></svg>'},Bitty_Browser:{background_color:"#3d3c3b",title:"Bitty Browser",redirect_url:"http://www.bitty.com/manual/?contenttype=&contentvalue="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M4 4h12v12H4z"/><path fill="#fff" d="M20 4v16H4v8h24V4"/></svg>'},Blinklist:{background_color:"#3d3c3b",title:"Blinklist",locale:"en-US",redirect_url:"https://blinklist.com/blink?t="+postTitle+"&d=&u="+postUrl,svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="#FFF"><path d="M3 10.35v11.3l8.977-5.418"/><path d="M17.55 27.454c-4.397 0-8.314-2.39-10.205-6.36l1.675-1.04c1.558 3.274 4.906 5.388 8.53 5.388 5.204 0 9.438-4.235 9.438-9.44 0-5.208-4.233-9.443-9.44-9.443-3.804 0-7.22 2.26-8.7 5.763l-1.733-1.057c1.798-4.25 5.82-6.72 10.434-6.72C23.86 4.546 29 9.683 29 15.996c0 6.317-5.136 11.457-11.45 11.457z"/><path d="M11.425 18.623c1.02 2.406 3.403 4.09 6.18 4.09 3.71 0 6.715-3.006 6.715-6.712 0-3.71-3.005-6.712-6.714-6.712-2.887 0-5.35 1.823-6.295 4.38l3.958 2.566-3.84 2.39z"/></g></svg>'},BlogMarks:{background_color:"#535353",title:"BlogMarks",redirect_url:"https://blogmarks.net/my/new.php?mini=1&simple=1&title="+postTitle+"&url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M3 10.35v11.3l8.977-5.418"/><path d="M17.55 27.454c-4.397 0-8.314-2.39-10.205-6.36l1.675-1.04c1.558 3.274 4.906 5.388 8.53 5.388 5.204 0 9.438-4.235 9.438-9.44 0-5.208-4.233-9.443-9.44-9.443-3.804 0-7.22 2.26-8.7 5.763l-1.733-1.057c1.798-4.25 5.82-6.72 10.434-6.72C23.86 4.546 29 9.683 29 15.996c0 6.317-5.136 11.457-11.45 11.457z"/><path d="M11.425 18.623c1.02 2.406 3.403 4.09 6.18 4.09 3.71 0 6.715-3.006 6.715-6.712 0-3.71-3.005-6.712-6.714-6.712-2.887 0-5.35 1.823-6.295 4.38l3.958 2.566-3.84 2.39z"/></g></svg>'},Bookmarks_fr:{background_color:"#e8ead4",title:"Bookmarks.fr",redirect_url:"https://www.bookmarks.fr/Connexion/?action=add&address="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#CC3467" d="M27.256 9.5c-2.188-3.79-6.36-.54-7.83 2.205 1.073.86 1.802 2.112 2.006 3.475 3.103.094 8.023-1.873 5.824-5.68-.7-1.212.515.894 0 0z"/><path fill="#96C044" d="M15.998 3c-4.368 0-3.664 5.23-2.013 7.886 1.283-.505 2.74-.505 4.023 0C19.66 8.23 20.366 3 15.998 3z"/><path fill="#CC3467" d="M9.255 8.294c-1.108-.64-2.42-.918-3.49-.053-.96.78-1.79 2.268-1.617 3.538.352 2.564 4.32 3.468 6.416 3.405.204-1.363.934-2.618 2.01-3.477-.67-1.256-1.898-2.59-3.32-3.41-.71-.41 1.422.82 0 0z"/><path fill="#96C044" d="M11.426 19.05c-.447-.67-.744-1.435-.862-2.23-2.785-.084-7.768 1.608-6.056 5.24 2.023 4.292 6.448 1.248 8.063-1.765-.44-.354-.83-.773-1.142-1.246-.132-.198.314.47 0 0z"/><path fill="#CC3467" d="M18.202 21.458c-.064-.12-.13-.232-.198-.342-1.28.503-2.737.503-4.02 0C12.338 23.766 11.624 29 16 29c4.218 0 3.67-4.848 2.204-7.542-.064-.12.678 1.243 0 0z"/><path fill="#96C044" d="M27.83 20.088c-.478-2.46-4.326-3.33-6.398-3.27-.204 1.364-.933 2.617-2.007 3.476.934 1.744 2.858 3.73 4.913 4.006 2.043.276 3.853-2.332 3.49-4.212-.153-.8.137.706 0 0z"/></svg>'},BuddyMarks:{background_color:"#ffd400",title:"BuddyMarks",redirect_url:"http://buddymarks.com/login.php?bookmark_title="+postTitle+"&bookmark_url="+postUrl+"&bookmark_desc=&bookmark_tags=",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><circle cx="19.587" cy="7.172" r="4.209"/><path d="M21.374 11.668h-3.572c-.085 0-.168.01-.253.013.32.68.51 1.437.51 2.236 0 1.476-.62 2.807-1.61 3.756 2.314.69 4.084 2.656 4.486 5.08 3.414-.15 5.382-1.114 5.513-1.18l.282-.145h.03V17.06c0-2.97-2.418-5.39-5.39-5.39z"/></g><g fill="#fff"><circle cx="12.413" cy="13.439" r="4.209"/><path d="M14.198 17.937h-3.57c-2.973 0-5.39 2.417-5.39 5.388v4.37l.01.067.303.095c2.838.885 5.3 1.18 7.33 1.18 3.96 0 6.257-1.13 6.398-1.2l.282-.142h.027v-4.37c0-2.97-2.416-5.388-5.388-5.388z"/></g></svg>'},Care2_news:{background_color:"#6eb43f",title:"Care2 News",redirect_url:"https://www.care2.com/passport/login.html?promoID=10&pg=http://www.care2.com/news/compose?sharehint=news&share[share_type]news&bookmarklet=Y&share[title]=",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M20.56 21.21c1.558.926 3.202 1.637 4.95 2.122.746.207 1.255.03 1.596-.673.102-.21.25-.404.4-.586 2.322-2.812 1.91-6.988-1.06-7.983.66-.517.662-1.2.47-1.92-.156-.59-.265-1.204-.492-1.767-.514-1.278-.694-2.603-.77-3.964-.047-.814-.1-1.767-1-2.068-.875-.292-1.54.357-2.09.977-1.85 2.082-2.9 4.576-3.644 7.22-.372 1.33-.7 2.676-1.077 4.12-.332-.34-.57-.837-.925-.897-.14-.376-.74-2.2.177-3.78.02-.008.033-.022.047-.037l.174-.22c.05-.063.037-.15-.024-.2-.06-.048-.15-.037-.196.025l-.174.223c-.033.04-.035.093-.02.138-.84 1.48-.432 3.147-.23 3.76-.422-.616-1.416-1.792-2.95-2.06-.024-.04-.067-.067-.116-.067h-.28c-.08 0-.143.063-.143.14 0 .08.062.142.142.142h.28c.023 0 .043-.007.062-.017 1.54.254 2.51 1.48 2.884 2.046-.38.265.127.786.08 1.276-1.986-1.483-4.072-2.605-6.244-3.572-1.956-.87-3.89-1.798-6.008-2.233-.47-.097-.977-.107-1.25.41-.25.474-.093.936.19 1.34.153.222.347.434.566.585 2.44 1.678 4.303 3.93 6.212 6.145.446.517.896 1.027 1.665 1.065.25.012.455.132.445.446v.123c.047.827.25 1.5.774 2.28 1.365 1.67 3.08 2.88 5.054 3.7.4.167.73.25 1.01.25.685 0 1.018-.517 1.116-1.578.026-1.45-.42-2.82-.863-4.154.352-.27.517.24.788.065.237-.33-.216-.68.018-1.08.172.097.316.173.456.256z"/></svg>'},Diary_Ru:{background_color:"#e8d8c6",title:"Diary.Ru",redirect_url:"https://www.diary.ru/?newpost&title="+postTitle+"&text="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm0 24.807C9.48 27.807 4.192 22.522 4.192 16 4.192 9.48 9.48 4.193 16 4.193c3.92 0 7.392 1.91 9.54 4.85h-8.308s-2.863.397-3.18 2.544c-.34 2.293-1.988 2.465-1.988 2.465h-4.69v1.51h9.74c.206-1.086 1.16-1.907 2.305-1.907 1.143 0 2.096.82 2.302 1.908h1.632v.874h-1.632c-.206 1.087-1.16 1.91-2.305 1.91-1.147 0-2.1-.823-2.306-1.91H7.37v1.59h4.69s1.67 0 1.988 2.464c.304 2.356 3.18 2.548 3.18 2.548h8.25c-2.15 2.895-5.596 4.77-9.48 4.77z"/></svg>'},Folkd:{background_color:"#0f70b2",title:"Folkd",redirect_url:"https://www.folkd.com/page/social-bookmarking.html?addurl="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M19.956 10.21c-.183.192-.613.138-.99.14-.102.317-.126.71-.283.974.626.496 1.85.406 2.405.972 1.197-.444.245-1.354.99-2.085 1.134-.14 1.386.588 1.697 1.254-.267.247-.936.102-1.415.14-.26.208-.333.6-.565.833.258.58.96.724 1.133 1.39 1.454-.376 2.954-.71 4.526-.973.41-.43.317-1.356.99-1.53 1.104.213 1.46 1.16 1.556 2.363-.586 1.043-2.1.605-2.546-.277-1.465.226-2.867.52-4.245.832-.11.325.1 1.263-.144 1.81.926.625 1.29-.49 2.122-.42.48.503.495 2.374-.566 2.224-.604-.053-.674-.634-.708-1.25-.432.1-.515-.143-.85-.14-.646.383-.97 1.083-1.695 1.39.094 1.236 1.462.38 2.12.974-.057 1.01-.8 1.345-1.838 1.39-.066-.836.216-1.503-.707-1.945-.94.142-1.37.782-2.264.973-.013.43.175.664.284.972.248.17 1.165-.21 1.415.278-.01 1.075-1.473 1.828-2.264 1.25-.063-.616.382-.734.565-1.11-.267-.293-.405-.713-.564-1.112-.878.342-1.665.773-2.83.834.004.327-.243.41-.14.833-.056.518.68.26.706.696.24 1.26-1.777 1.455-2.12.555-.03-.86 1.033-.65.706-1.808-.713-.274-1.917-.063-2.55-.417-.374.14-.382.644-.706.835.065.4.5.436.425.974-.925.36-2.313.07-2.12-1.114.533-.615 1.49-.076 1.835-.973-.557-.656-1.166-1.263-1.413-2.223-2.124.464-3.843 1.323-5.8 1.947-.187.467-.196 1.107-.566 1.39-.59.148-.625.036-1.273 0-.56-.854-.257-2.7.85-2.78.61-.135.41.523.85.557 2.016-.472 3.78-1.195 5.8-1.667-.433-2.485 3.206-4.233-.85-3.893-.396-1.225.373-2.164 1.13-2.085 1.273.132.285 1.725 1.273 2.224.908-.498 1.543-1.263 2.69-1.53.08-.45-.097-.646-.143-.972-.088-.33-.87.02-.99-.28v-.97c.46-.426 1.663-.355 1.98.138.114.623-.25.773-.706.834.037.427.308.626.424.972.9-.37 2.268-.273 3.538-.277.2-.17.266-.48.28-.836.108-.522-.75-.095-.564-.694.156-1.48 2.125-.633 2.12.416zm1.132 6.256c.652-.378.368-1.677.424-2.64-1.742-1.426-2.885 2.7-.424 2.64zm-6.224 1.53c1.3.173 3.114-1.23 2.97-2.502-.14-1.227-2.55-2.332-3.96-1.67-1.815.858-.44 3.98.99 4.17z"/></svg>'},Hatena:{background_color:"#00a6db",title:"Hatena",redirect_url:"https://b.hatena.ne.jp/bookmarklet?url="+postUrl+"&btitle="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M6.96 8.33h7.328c1.247 0 2.206.366 2.875 1.098.666.733 1.002 1.64 1.002 2.72 0 .91-.24 1.688-.715 2.336-.318.433-.784.773-1.396 1.023.928.266 1.614.72 2.05 1.367.44.645.66 1.457.66 2.432 0 .795-.157 1.512-.468 2.146-.314.635-.74 1.14-1.28 1.508-.337.23-.842.396-1.52.502-.9.14-1.498.21-1.79.21H6.958V8.328zm3.877 6.017h1.74c.623 0 1.058-.13 1.302-.382.24-.255.364-.623.364-1.104 0-.442-.123-.793-.366-1.045-.245-.25-.67-.377-1.276-.377h-1.767v2.91zm0 6.027h2.038c.69 0 1.176-.145 1.458-.434.282-.29.425-.68.425-1.168 0-.453-.142-.818-.42-1.092-.28-.277-.77-.414-1.47-.414h-2.03v3.108zM21.213 8.52h3.584v9.58h-3.584z"/><circle cx="23.005" cy="21.635" r="2.036"/></g></svg>'},Jamespot:{background_color:"#ff9e2c",title:"Jamespot",redirect_url:"http://my.jamespot.com/",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M12.427 24.073c.677.4 1.633.708 2.927.708 1.848 0 2.587-.83 2.587-2.71V5h2.436v17.13c0 2.745-1.478 4.87-5.176 4.87-1.664 0-2.99-.4-3.573-.678l.8-2.25z"/></svg>'},Kakao:{background_color:"#fcb700",title:"Kakao",redirect_url:"https://story.kakao.com/share?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M20.345 6h-8.688c-.583 0-1.06.45-1.06 1.005v8.814c0 .553.477 1.003 1.06 1.003h4.007c-.03.98-.445 2.056-1.077 2.996-.612.904-1.613 1.796-2.156 2.223l-.04.032c-.117.107-.202.23-.204.405-.003.13.07.232.15.34l.018.022 2.774 2.975s.137.137.247.163c.126.03.27.032.368-.042 4.84-3.56 5.537-8.023 5.66-10.44V7.004C21.403 6.45 20.93 6 20.346 6"/></svg>'},Kindle_It:{background_color:"#2a2a2a",title:"Kindle_It",redirect_url:"https://fivefilters.org/kindle-it/send.php?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#FFA036" d="M12.927 27H10V5h2.927v11.754l5.15-5.47h3.683l-5.814 6.067L22 27h-3.407l-4.704-7.763-.964 1.037V27z"/></svg>'},Known:{background_color:"#fff101",title:"Known",redirect_url:"https://withknown.com/share/?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M16.38 2.65c-7.45 0-13.5 6.048-13.5 13.5s6.05 13.5 13.5 13.5 13.5-6.048 13.5-13.5-6.04-13.5-13.5-13.5zm.078 25.203c-6.387 0-11.57-5.184-11.57-11.572 0-6.385 5.183-11.57 11.57-11.57 6.387 0 11.57 5.185 11.57 11.57.002 6.39-5.175 11.574-11.57 11.574z"/><path fill="#fff" d="M23.856 21.758c-.393 0-.694-.07-.903-.2-.154-.094-.4-.402-.74-.91l-3.934-5.964 3.3-3.2c.254-.248.463-.433.625-.54s.293-.178.41-.217c.107-.03.308-.046.593-.046h.207v-.01l.555-.01V8.55h-.648v.01h-6.087v2.12h.548c.31 0 .494.023.57.077.078.054.117.13.117.23 0 .055-.023.11-.062.18-.04.068-.154.2-.34.4l-4.257 4.436v-4.08c0-.402.03-.68.1-.826.07-.147.178-.262.34-.34.1-.053.363-.076.78-.076h.44V8.56H8.8v2.113h.563c.34 0 .58.04.71.116.132.075.225.19.286.345.06.154.084.455.084.91v8.37c0 .478-.022.78-.076.903-.062.153-.154.26-.285.33-.132.07-.394.11-.78.11H8.8v2.12h6.666v-2.12h-.556c-.363 0-.61-.032-.733-.094s-.216-.162-.278-.31c-.063-.145-.1-.408-.1-.786v-1.543l2.067-2.013 2.4 3.842c.2.332.3.54.3.625 0 .077-.054.147-.162.2-.108.054-.417.077-.918.077h-.278v2.12h6.89v-2.12h-.24z"/></svg>'},Line:{background_color:"#00c300",title:"Line",redirect_url:"https://social-plugins.line.me/lineit/share?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M28 14.304c0-5.37-5.384-9.738-12-9.738S4 8.936 4 14.304c0 4.814 4.27 8.846 10.035 9.608.39.084.923.258 1.058.592.122.303.08.778.04 1.084l-.172 1.028c-.05.303-.24 1.187 1.04.647s6.91-4.07 9.43-6.968c1.737-1.905 2.57-3.842 2.57-5.99zM11.302 17.5H8.918c-.347 0-.63-.283-.63-.63V12.1c0-.346.283-.628.63-.628.348 0 .63.283.63.63v4.14h1.754c.35 0 .63.28.63.628 0 .347-.282.63-.63.63zm2.467-.63c0 .347-.284.628-.63.628-.348 0-.63-.282-.63-.63V12.1c0-.347.282-.63.63-.63.346 0 .63.284.63.63v4.77zm5.74 0c0 .27-.175.51-.433.596-.065.02-.132.032-.2.032-.195 0-.384-.094-.502-.25l-2.443-3.33v2.95c0 .35-.282.63-.63.63-.347 0-.63-.282-.63-.63V12.1c0-.27.174-.51.43-.597.066-.02.134-.033.2-.033.197 0 .386.094.503.252l2.444 3.328V12.1c0-.347.282-.63.63-.63.346 0 .63.284.63.63v4.77zm3.855-3.014c.348 0 .63.282.63.63 0 .346-.282.628-.63.628H21.61v1.126h1.755c.348 0 .63.282.63.63 0 .347-.282.628-.63.628H20.98c-.345 0-.628-.282-.628-.63v-4.766c0-.346.283-.628.63-.628h2.384c.348 0 .63.283.63.63 0 .346-.282.628-.63.628h-1.754v1.126h1.754z"/></svg>'},LiveJournal:{background_color:"#ededed",title:"LiveJournal",redirect_url:"https://www.livejournal.com/update.bml?subject="+postTitle+"&event="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M7.08 9.882l.004-.008.004-.01c.195-.408.422-.81.674-1.192.264-.393.53-.75.81-1.06 1.493-1.683 3.524-2.692 6.08-3.015l.733-.097.426.61 8.426 12.14.188.27.027.328.608 7.65.164 2.002-1.854-.783-7.23-3.053-.325-.143-.208-.286-8.422-12.14-.4-.574.3-.638zm2.72.13c-.06.097-.118.202-.18.305l7.79 11.235 5.05 2.13-.427-5.32-7.79-11.226c-1.603.326-2.884 1.032-3.84 2.102-.227.252-.428.514-.602.775z"/><path fill="#FFC805" d="M8.186 10.4c1.283-2.66 3.488-4.192 6.62-4.594l8.423 12.14.61 7.648-7.23-3.057L8.186 10.4z"/><path fill="#fff" d="M15.158 6.316l1.89 2.717c-2.597.352-5.354 2.552-6.603 4.62l-1.898-2.735c1.115-2.09 4.27-4.18 6.61-4.602z"/><path fill="#9291AD" d="M13.285 10.666c-1.22.873-2.197 1.915-2.84 2.987l-1.898-2.735c.557-1.043 1.654-2.108 2.875-2.944l1.863 2.692z"/><path fill="#fff" d="M7.215 10.283c1.35-3.24 4.182-4.8 7.568-5.527l.55-.026.38.397.314.322 1.14 1.817-1.835.243h-.012c-.242.038-.512.108-.8.212h-.003c-.3.1-.613.238-.957.406-1.69.837-3.4 2.216-3.898 3.306l-.928 1.746-1.252-1.66-.166-.285-.25-.453.15-.5z"/><path fill="#F5A8AA" d="M8.33 10.597c.95-2.725 3.1-4.214 6.504-4.615l.314.322c-2.3.35-5.756 2.777-6.598 4.62l-.22-.327z"/><path fill="#485E85" d="M23.69 22.727l.283 3.084-2.924-1.235 1.224-1.202"/><path fill="#fff" d="M16.41 21.274c.053-.062.113-.133.176-.197.635-.712 1.287-1.447 1.43-2.695l-4.875-7.02c-.436.35-.832.706-1.176 1.062-.363.382-.674.775-.924 1.168l5.37 7.682zm.93.483c-.203.222-.398.445-.572.665l-.416.54-.402-.566-5.94-8.49-.183-.265.166-.282c.318-.558.73-1.097 1.236-1.63.494-.526 1.076-1.027 1.726-1.5l.424-.305.296.425 5.27 7.6.103.15-.014.17c-.113 1.718-.92 2.615-1.697 3.49z"/><path fill="#6A9AC2" d="M16.367 22.11c.846-1.09 2.03-1.903 2.164-3.868l-5.273-7.602c-1.27.914-2.227 1.933-2.83 2.97l5.94 8.5z"/><path fill="#fff" d="M22.125 17.31c-.09.026-.168.062-.248.093-.89.35-1.81.71-3.027.396l-4.87-7.02c.48-.29.95-.53 1.405-.73.486-.208.96-.36 1.42-.464l5.32 7.724zm.12 1.037c.28-.11.563-.22.823-.294l.658-.21-.39-.568-5.888-8.532-.18-.267-.32.052c-.635.105-1.287.3-1.967.59-.66.286-1.67.887-2.342 1.33l5.893 8.313c1.647.49 2.627.014 3.717-.412z"/><path fill="#A1BBD6" d="M22.896 17.537c-1.312.41-2.498 1.232-4.383.67l-5.272-7.6c1.303-.87 2.59-1.412 3.77-1.605l5.887 8.535z"/><path fill="#fff" d="M18.248 8.95l-1.846.24v-.004c-.244.04-.514.113-.8.214h-.01c-2.726.944-4.46 2.964-5.784 5.454l-.68-1.004c.604-.86 2.52-5.224 8.484-5.94.27.258.415.692.636 1.04z"/></svg>'},Mail_Ru:{background_color:"#356fac",title:"Mail.Ru",redirect_url:"https://connect.mail.ru/share?share_url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#F89C0E" d="M19.975 15.894c-.134-2.542-2.02-4.07-4.3-4.07h-.086c-2.63 0-4.09 2.068-4.09 4.417 0 2.633 1.765 4.296 4.077 4.296 2.58 0 4.275-1.89 4.4-4.127l-.003-.515zm-4.37-6.346c1.755 0 3.407.776 4.62 1.993v.006c0-.584.395-1.024.94-1.024h.14c.85 0 1.025.808 1.025 1.063l.005 9.08c-.06.595.613.9.988.52 1.457-1.497 3.203-7.702-.907-11.295-3.83-3.352-8.967-2.8-11.7-.916-2.904 2.003-4.764 6.438-2.958 10.603 1.968 4.543 7.6 5.896 10.947 4.546 1.696-.684 2.48 1.607.72 2.355-2.66 1.132-10.066 1.02-13.525-4.972-2.338-4.046-2.212-11.163 3.987-14.85 4.74-2.822 10.99-2.042 14.762 1.895 3.937 4.117 3.705 11.82-.137 14.818-1.742 1.36-4.326.035-4.312-1.947l-.02-.647c-1.21 1.203-2.824 1.905-4.58 1.905-3.475 0-6.53-3.056-6.53-6.528 0-3.508 3.057-6.6 6.533-6.6"/></svg>'},Mendeley:{background_color:"#a70805",title:"Mendeley",redirect_url:"https://www.mendeley.com/sign-in/",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M26.596 18.11c-1.466-.087-2.02-.834-1.93-2.164.076-1.113.274-2.22.418-3.327-.023-1.743-.942-3.13-2.488-3.59-1.583-.47-2.97-.14-4.102 1.15-2.322 2.646-2.616 2.634-5.023-.045-1.152-1.28-2.852-1.66-4.39-.98-1.5.667-2.37 2.237-2.15 3.954.08.625.278 1.235.377 1.863.338 2.122-.105 2.7-2.226 3.147-1.066.228-1.913.786-2.05 1.99-.137 1.22.17 2.39 1.404 2.75.77.226 1.853.084 2.55-.32.96-.553 1.064-1.64.733-2.74-.62-2.05-.027-3.04 2.115-3.34.836-.117 1.766-.022 2.568.235 1.302.41 1.692 1.373 1.175 2.65-.45 1.1-.443 2.09.39 2.984.84.9 2.417 1.08 3.518.435 1.12-.657 1.497-1.807 1.042-3.164-.608-1.814-.085-2.783 1.807-3.123.7-.126 1.463-.113 2.16.025 1.834.367 2.377 1.377 1.84 3.188-.504 1.698.196 3.09 1.72 3.43 1.332.295 2.624-.607 2.89-2.022.308-1.633-.593-2.882-2.344-2.988zm-10.71-.085c-1.374-.06-2.453-1.194-2.445-2.57.01-1.46 1.148-2.567 2.61-2.54 1.467.026 2.57 1.177 2.523 2.627-.05 1.43-1.255 2.545-2.687 2.483z"/></svg>'},Meneame:{background_color:"#ff7d12",title:"Meneame",redirect_url:"https://www.meneame.net/submit.php?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M25.514 10.435c-1.582 1.605-4.438 1.56-5.502 3.726-.906 2.57 1.23 6.677 2.12 9.02.603 1.21-4.716 2.378-4.065 2.677 3.754-.043 5.354-1.412 4.904-3.094-.43-1.607-2.376-4.816-2.376-7.383.056-1.938 2.222-2.533 3.618-3.322 1.622-.727 3.14-2.35 2.72-4.25-.018-.672-1.187-2.907-.71-1.175.26 1.278.385 2.856-.706 3.802z"/><path d="M20.632 7.546C18.59 6.492 16.32 5.854 13.946 6.41c-1.277.236-2.78.933-3.637 2.1-1.123 1.34-1.166 3.288-.43 4.82.57 1.18 1.44 2.492 2.85 2.688 1.21.182 2.54.018 3.566-.683-1.223.21-2.64.646-3.736-.172-1.842-1.177-2.735-3.85-1.618-5.8.898-1.7 2.705-2.178 4.62-2.262 2.55-.11 4.995 1.345 5.934 1.7.903.285 2.2.645 2.844-.315.376-.446.226-1.674-.08-1.788.09.86-.543 1.943-1.524 1.66-.736-.17-1.41-.523-2.104-.81zM6.94 15.156c-1.183 1.865-2.264 4.05-1.85 6.322.38 2.375 2.678 4.05 4.963 4.35 2.348.273 4.69.205 7.043.035.397-.385-1.92-.373-2.895-.514-2.224-.254-4.64-.3-6.55-1.623-1.775-1.33-2.01-3.938-1.155-5.863.714-1.814 1.782-3.568 2.903-5.084-.876.727-1.683 1.27-2.456 2.376z"/><path d="M12.787 21.02c1.386.107 3.688-.032 4.768.724.387.582-.332 3.802-.084 4.174.553.162 1.186-3.773.836-4.75-.266-.75-4.966-.352-5.518-.147z"/></g></svg>'},Mix:{background_color:"#ff8226",title:"Mix",redirect_url:"https://mix.com/mixit?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-7 -8 45 45"><g fill="#fff"><path opacity=".8" d="M27.87 4.125c-5.224 0-9.467 4.159-9.467 9.291v2.89c0-1.306 1.074-2.362 2.399-2.362s2.399 1.056 2.399 2.362v1.204c0 1.306 1.074 2.362 2.399 2.362s2.399-1.056 2.399-2.362V4.134c-.036-.009-.082-.009-.129-.009"/><path d="M4 4.125v12.94c2.566 0 4.668-1.973 4.807-4.465v-2.214c0-.065 0-.12.009-.176.093-1.213 1.13-2.177 2.39-2.177 1.325 0 2.399 1.056 2.399 2.362v9.226c0 1.306 1.074 2.353 2.399 2.353s2.399-1.056 2.399-2.353v-6.206c0-5.132 4.233-9.291 9.467-9.291H4z"/><path opacity=".8" d="M4 17.074v8.438c0 1.306 1.074 2.362 2.399 2.362s2.399-1.056 2.399-2.362V12.61C8.659 15.102 6.566 17.074 4 17.074"/></g></svg>'},Mixi:{background_color:"#ededed",title:"Mixi",redirect_url:"https://mixi.jp/share.pl?mode=login&u="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#D1AD5A" d="M16.09 5.246C9.617 5.246 4 9.216 4 16.63c0 6.93 7.707 10.193 12.758 9.01v2.374S28 25.054 28 15.034c0-6.11-4.505-9.788-11.91-9.788z"/><path fill="#fff" d="M22.92 20.024h-1.657v-5.688s-.505-1.586-1.585-1.586c-.9 0-2.525.374-2.525 2.08v5.193h-1.657V14.77c0-1.586-.787-2.09-1.506-2.09-1.15 0-2.727.807-2.727 2.403v4.94H9.605v-9.01h1.657v1.03c.656-.546 1.564-1.03 2.727-1.03 1.222 0 2.09.434 2.604 1.282.73-.677 1.777-1.202 3.082-1.202 1.97 0 3.24 1.788 3.24 3.202v5.73z"/></svg>'},MySpace:{background_color:"#2a2a2a",title:"MySpace",redirect_url:"https://myspace.com/post?u="+encodeURIComponent(postUrl)+"&t="+postTitle+"&l=3&c="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M24 17.716c-2.21 0-4 1.79-4 4v1.712h8v-1.713c0-2.21-1.79-4-4-4z"/><circle cx="24" cy="12.571" r="3.999"/><path d="M15.147 18.31c-2.054 0-3.72 1.66-3.72 3.71v1.408h7.437c.002-.615.002-1.148.002-1.408 0-2.05-1.664-3.71-3.72-3.71z"/><ellipse cx="15.147" cy="13.446" rx="3.719" ry="3.71"/><path d="M7.148 18.875C5.41 18.875 4 20.277 4 22.008v1.42h6.295c.002-.636.002-1.178.002-1.42 0-1.73-1.41-3.133-3.15-3.133z"/><ellipse cx="7.148" cy="14.58" rx="3.148" ry="3.133"/></g></svg>'},Netvouz:{background_color:"#c0ff00",title:"Netvouz",redirect_url:"https://www.netvouz.com/action/submitBookmark?url="+postUrl+"&title="+postTitle+"&popup=no&description=",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#6C3" d="M10.25 8.72v17.184H5.5V6.096h8.396l5.605 5.77v6.43"/><path fill="#09C" d="M21.75 23.28V6.095h4.75v19.808h-8.396L12.5 20.13v-6.427"/></svg>'},Odnoklassniki:{background_color:"#f2720c",title:"Odnoklassniki",redirect_url:"https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st.shareUrl="+postUrl+"&st.client_id=-1",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M16 16.16a6.579 6.579 0 0 1-6.58-6.58A6.578 6.578 0 0 1 16 3a6.58 6.58 0 1 1 .002 13.16zm0-9.817a3.235 3.235 0 0 0-3.236 3.237 3.234 3.234 0 0 0 3.237 3.236 3.236 3.236 0 1 0 .004-6.473zm7.586 10.62c.647 1.3-.084 1.93-1.735 2.99-1.395.9-3.313 1.238-4.564 1.368l1.048 1.05 3.877 3.88c.59.59.59 1.543 0 2.133l-.177.18c-.59.59-1.544.59-2.134 0l-3.88-3.88-3.877 3.88c-.59.59-1.543.59-2.135 0l-.176-.18a1.505 1.505 0 0 1 0-2.132l3.88-3.877 1.042-1.046c-1.25-.127-3.19-.465-4.6-1.37-1.65-1.062-2.38-1.69-1.733-2.99.37-.747 1.4-1.367 2.768-.29C13.035 18.13 16 18.13 16 18.13s2.968 0 4.818-1.456c1.368-1.077 2.4-.457 2.768.29z"></path></svg>'},Protopage_Bookmarks:{background_color:"#413fff",title:"Protopage Bookmarks",redirect_url:"https://www.protopage.com/add-button-site?url="+postUrl+"&label=&type=page",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" stroke="#fff" stroke-miterlimit="10" d="M17.866 14.47l7.626-1.048.574 3.078-7.68 1.038 3.54 7.058-2.804 1.418-3.614-7.23-5.873 5.557-2.144-2.29 5.74-5.42-6.86-3.602 1.593-2.697 6.808 3.595 1.3-7.375 3.1.546-1.303 7.374z"/></svg>'},Pusha:{background_color:"#0072b8",title:"Pusha",redirect_url:"https://www.pusha.se/posta?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M29.27 22.188V8.068L17.207 14.92l3.838 2.33C15.715 24.144 5.898 29.306 0 31.964V32h19.635c3.682-4.865 7.03-11.46 7.03-11.46l2.604 1.648z"></path></svg>'},Qzone:{background_color:"#2b82d9",title:"Qzone",redirect_url:"https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M27.996 12.83l-7.423-.737c-.566-.053-.694-.142-.87-.604l-3.175-7.045c-.29-.598-.765-.598-1.055 0l-3.384 7.04c-.23.393-.34.48-.898.534l-7.187.807c-.66.064-.808.493-.327.952l5.64 5.184c.266.25.27.355.195.697l-1.447 7.61c-.124.65.247.915.82.58l6.44-3.715c.45-.284.87-.293 1.31-.018l6.47 3.734c.575.334.948.07.826-.58L22.83 21.2c.66-.226 1.305-.5 1.69-.81l-.156.03c-2.29.547-5.438.872-8.355.872-1.08 0-2.128-.038-3.13-.11l-.006.005a39.39 39.39 0 0 1-2.53-.26c-.3-.05.026-.242.026-.242l7.76-5.513s.202-.126.002-.153c-3.188-.5-6.723-.627-10.042-.627h-.23c2.246-.51 5.07-.815 8.14-.815 1.81 0 3.54.105 5.11.296-.002.003.888.124 1.31.193.33.05.024.24.024.24l-7.77 5.384s-.18.107.015.136c2.39.337 5.332.457 7.98.49l-.118-.65c-.06-.38 0-.51.284-.78l5.478-5.12c.485-.455.34-.88-.318-.945z"></path></svg>'},Renren:{background_color:"#005eac",title:"Renren",redirect_url:"https://www.connect.renren.com/share/sharer?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M18.74 3.266a14.24 14.24 0 0 0-5.48 0c0 8.96-.07 16.176-9.26 21.662A14.406 14.406 0 0 0 8.322 29c3.595-2.168 5.688-4.736 7.69-8.275 2 3.54 4.07 6.107 7.69 8.275A14.07 14.07 0 0 0 28 24.928c-9.19-5.487-9.26-12.7-9.26-21.662z"></path></svg>'},Sina_Weibo:{background_color:"#ff0",title:"Sina Weibo",redirect_url:"http://service.weibo.com/share/share.php?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M13.92 24.99c-4.303.424-8.02-1.52-8.3-4.346-.278-2.827 2.987-5.463 7.292-5.888 4.304-.426 8.018 1.52 8.297 4.345.274 2.83-2.987 5.468-7.29 5.89m8.61-9.38c-.367-.11-.62-.184-.428-.663.416-1.046.458-1.946.01-2.59-.846-1.204-3.155-1.14-5.8-.03 0-.004-.834.362-.62-.297.406-1.31.345-2.407-.29-3.04-1.435-1.437-5.255.055-8.53 3.33C4.422 14.77 3 17.37 3 19.617c0 4.3 5.513 6.913 10.907 6.913 7.07 0 11.776-4.105 11.776-7.37 0-1.97-1.66-3.09-3.15-3.55m4.693-7.87a6.89 6.89 0 0 0-6.55-2.12h-.002a.997.997 0 0 0-.765 1.182.99.99 0 0 0 1.18.765 4.91 4.91 0 0 1 4.66 1.508 4.899 4.899 0 0 1 1.02 4.787.995.995 0 1 0 1.894.615v-.004a6.883 6.883 0 0 0-1.44-6.732m-2.622 2.37a3.343 3.343 0 0 0-3.192-1.03.852.852 0 0 0-.655 1.016.854.854 0 0 0 1.016.657v.003a1.655 1.655 0 0 1 1.564.502c.406.453.514 1.066.338 1.606h.005a.858.858 0 1 0 1.63.528 3.345 3.345 0 0 0-.7-3.28"></path><path d="M14.16 19.87c-.15.26-.484.383-.746.275-.256-.104-.335-.393-.19-.646.15-.255.47-.378.725-.276.26.094.35.386.21.644m-1.375 1.76c-.417.666-1.308.957-1.98.65-.66-.302-.855-1.072-.44-1.72.413-.645 1.274-.933 1.94-.653.673.287.888 1.054.48 1.724m1.564-4.7c-2.047-.533-4.364.49-5.254 2.293-.904 1.84-.028 3.884 2.04 4.552 2.144.69 4.67-.368 5.55-2.354.865-1.943-.216-3.943-2.336-4.49"></path></g></svg>'},SiteJot:{background_color:"#ffc800",title:"SiteJot",redirect_url:"http://www.sitejot.com/loginform.php?iSiteAdd=&iSiteDes=",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path d="M23.506 8.08c.645 0 1.3.073 1.967.225.547.12.937.285 1.173.495.236.21.354.5.354.868 0 .232-.043.414-.13.547-.086.13-.272.29-.56.48-.333.224-.524.49-.573.794-.05.3-.094 1.48-.134 3.54-.018 1.99-.033 3.183-.048 3.58-.015.4-.05.786-.107 1.16-.167 1.1-.504 1.96-1.01 2.583-.414.51-.946.912-1.596 1.205-.65.293-1.335.44-2.054.44-.64 0-1.278-.11-1.92-.326a5.407 5.407 0 0 1-1.67-.902c-.39-.315-.7-.74-.93-1.278a4.326 4.326 0 0 1-.347-1.72c0-.75.186-1.37.548-1.863.362-.49.816-.738 1.363-.738.535 0 .99.207 1.363.62.375.42.56.938.56 1.555 0 .155-.033.42-.102.787-.01.075-.017.157-.017.247 0 .24.066.437.2.587.13.15.307.227.524.227.386 0 .696-.226.933-.677.233-.45.35-1.043.35-1.78l-.01-1.024-.016-2.76c-.052-1.676-.09-2.662-.116-2.96-.027-.296-.09-.538-.195-.725-.086-.15-.162-.247-.23-.29-.065-.047-.245-.118-.538-.216-.138-.038-.256-.144-.353-.315a1.114 1.114 0 0 1-.147-.555c0-.405.122-.73.366-.975.247-.242.646-.44 1.198-.59.62-.17 1.254-.25 1.91-.25zM10.202 8c.593 0 1.37.19 2.33.574a.785.785 0 0 0 .275.068c.058 0 .23-.068.518-.203.093-.05.19-.07.294-.07.38 0 .79.4 1.22 1.193.43.797.64 1.555.64 2.275 0 .42-.097.775-.29 1.065-.19.288-.426.434-.7.434-.23 0-.418-.06-.56-.18-.146-.12-.46-.48-.95-1.07-.69-.843-1.37-1.264-2.037-1.264-.322 0-.58.102-.772.305-.19.204-.29.47-.29.8 0 .654.44 1.147 1.32 1.477 1.193.46 1.955.793 2.288 1.003 1.466.934 2.2 2.305 2.2 4.114 0 1.6-.5 2.907-1.5 3.922C13.162 23.48 11.825 24 10.175 24a8.64 8.64 0 0 1-2.33-.344c-.816-.23-1.406-.497-1.77-.805-.274-.24-.523-.762-.745-1.57a8.972 8.972 0 0 1-.33-2.36c0-.368.06-.647.174-.834.143-.24.324-.36.543-.36.22 0 .43.146.63.438.12.165.405.695.855 1.59.215.42.553.768 1.016 1.048.463.28.94.418 1.437.418.426 0 .77-.104 1.035-.31a.964.964 0 0 0 .396-.794c0-.3-.103-.56-.31-.777-.208-.22-.544-.423-1.01-.61-.823-.338-1.45-.65-1.88-.93a5.844 5.844 0 0 1-1.21-1.064c-.908-1.053-1.362-2.246-1.362-3.583 0-.66.12-1.305.355-1.932s.57-1.17 1-1.627C7.63 8.53 8.81 8 10.2 8z" fill="#fff"></path></svg>'},Slashdot:{background_color:"#004242",title:"Slashdot",redirect_url:"https://slashdot.org/submission?url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M20.89 6h-5L8.61 26h5"/><circle cx="20.89" cy="23.5" r="2.5"/></g></svg>'},StockTwits:{background_color:"#40576f",title:"StockTwits",redirect_url:"https://stocktwits.com/widgets/share?body="+postTitle+" "+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path d="M11.328 14.309l-1.793-.736c-1.303-.536-1.955-1.244-1.955-2.123 0-.637.249-1.166.746-1.587.498-.427 1.123-.642 1.878-.642.614 0 1.115.125 1.504.373.373.218.766.684 1.178 1.399l2.204-1.306c-1.166-2.024-2.788-3.037-4.863-3.037-1.539 0-2.828.459-3.866 1.376-1.039.909-1.559 2.039-1.559 3.391 0 2.005 1.232 3.528 3.698 4.569l1.738.722c.451.194.84.399 1.167.612.326.214.593.443.799.687.206.245.358.513.455.805.097.291.146.612.146.961 0 .871-.28 1.59-.84 2.156-.56.568-1.263.851-2.111.851-1.073 0-1.889-.389-2.449-1.166-.311-.405-.529-1.135-.653-2.193L4 20.028c.249 1.679.875 2.986 1.878 3.92 1.018.936 2.309 1.403 3.872 1.403 1.648 0 3.028-.544 4.139-1.634 1.102-1.082 1.653-2.451 1.653-4.109 0-1.237-.338-2.281-1.012-3.134-.676-.852-1.743-1.573-3.202-2.165zM28 7.023H17.037v2.571h4.14v15.425h2.695V9.594H28z" fill="#fff"></path></svg>'},Svejo:{background_color:"#fa7aa3",title:"Svejo",redirect_url:"https://svejo.net/story/submit_by_url?url="+postUrl+"&title="+postTitle+"&summary=",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g fill="#fff"><path d="M19.865 10.524c.31.16.48.29.48.29l.04-.02c.2-4.96-2.933-7.41-2.933-7.41-.688.87-1.147 2.21-1.387 3.04.26.11.51.24.76.38 2.13 1.19 2.83 2.92 3.04 3.72zm0 0c-.22-.8-.91-2.53-3.04-3.73-.25-.14-.5-.26-.76-.38-2.27-.99-4.73-.96-4.73-.96s0 2.92 3.08 4.95c.48-.17 1-.31 1.57-.42 1.81-.32 3.19.19 3.88.54zm-9.07 2.72c-.93 1.82 2.15 6.7 4.75 9.37 1.29 1.33 1.93 2.48 2.19 3.052 2.1.5 3.28-.29 3.42-.4l.07-.12c.93-1.94-1.46-4.818-3.19-7.068-2.14-2.78-2.7-4.832-2.7-4.832l-.01-.01c-3.5-1.582-4.53.008-4.53.008z"></path><path d="M21.176 25.274c-.15.11-1.32.9-3.42.4-1.1-.26-2.47-.88-4.07-2.15-2.31-1.818-4.03-3.43-5.2-5.53-.3-.528-.98-.568-1.37.2-.6 1.19-.67 4.5.7 6.44 0 0-.38 1.28.62 2.37.67.73 2.22 1.06 3.06.76l.17-.07s1.73 1.302 4.37.813c2.64-.49 4.33-1.73 5.18-3.24l-.04.007zm3.01-11.4s.38-1.28-.62-2.37c-.67-.73-2.22-1.06-3.06-.76l-.12.05-.04.02s-.17-.13-.48-.28c-.69-.36-2.07-.87-3.89-.53-.57.102-1.09.25-1.57.42-1.68.59-2.83 1.542-3.51 2.66l-.1.17s1.02-1.59 4.53-.01c.84.382 1.83.94 2.978 1.75 2.41 1.692 4.03 3.432 5.2 5.53.3.53.98.57 1.37-.198.612-1.2.682-4.512-.69-6.45z"></path></g></svg>'},Tuenti:{background_color:"#0075c9",title:"Tuenti",redirect_url:"https://www.tuenti.com/share?p=b5dd6602&url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path d="M13.907 19.803l-2.463 5.062a1.836 1.836 0 0 1-2.463.847 1.844 1.844 0 0 1-.844-2.465l2.46-5.062a1.844 1.844 0 0 1 3.314 1.618zm-.053-7.497a2.394 2.394 0 0 1-1.682.698 2.383 2.383 0 0 1-2.378-2.378c0-.626.255-1.236.7-1.68.885-.888 2.48-.888 3.36 0 .442.444.696 1.054.696 1.68 0 .626-.254 1.235-.696 1.68zm9.834 7.17a16.055 16.055 0 0 1-2.445 5.73 1.81 1.81 0 0 1-2.522.478 1.815 1.815 0 0 1-.473-2.52 12.532 12.532 0 0 0 1.896-4.448c.38-1.775.38-3.654 0-5.432a12.506 12.506 0 0 0-1.895-4.445 1.82 1.82 0 0 1 .48-2.527 1.815 1.815 0 0 1 2.522.48c1.177 1.727 2 3.655 2.442 5.73a16.68 16.68 0 0 1-.002 6.95z" fill="#fff"></path></svg>'},Twiddla:{background_color:"#ededed",title:"Twiddla",redirect_url:"https://www.twiddla.com/New.aspx?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M10.5 5.688l1.375 1.375-4.812 4.812L5.688 10.5A3.438 3.438 0 0 1 10.5 5.688zm2.406 2.406l-4.812 4.812 12.72 12.72L27 27l-1.375-6.188-12.72-12.718zm-.095 3.533l9.63 9.625-1.187 1.183-9.624-9.625 1.185-1.183z"></path></svg>'},Webnews:{background_color:"#cc2512",title:"Webnews",redirect_url:"https://www.webnews.de/login",svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M6 6h5.48v14.557h1.844V6h5.396v14.557h1.852V6H26v18.196h-1.82V26h-7.25v-1.825h-1.838V26h-7.25v-1.825H6V6z"/></svg>'},Wykop:{background_color:"#367da9",title:"Wykop",redirect_url:"https://www.wykop.pl/dodaj?url="+postUrl+"&title="+postTitle,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M23.54 3.5H8.46A4.96 4.96 0 0 0 3.5 8.46v15.08a4.96 4.96 0 0 0 4.96 4.96h15.08a4.96 4.96 0 0 0 4.96-4.96V8.46a4.96 4.96 0 0 0-4.96-4.96zM10.93 25.98L5 13.927l4.018-1.977 4.94 10.044 2.01-.988-4.94-10.043 4.016-1.977 4.942 10.043 2.01-.99L17.05 7.994l4.02-1.977L27 18.07l-16.07 7.91z"></path></svg>'},Xing:{background_color:"#00797d",title:"Xing",redirect_url:"https://www.xing.com/spi/shares/new?cb=0&url="+postUrl,svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-6 -6 42 42"><path d="M 6 9 h 5 l 4 4 l -5 7 h -5 l 5 -7 z m 15 -4 h 5 l -9 13 l 4 8 h -5 l -4 -8 z" fill="#fff"></path> </svg>'},Yoolink:{background_color:"#a2c538",title:"Yoolink",redirect_url:"http://auth.yoolink.to/authenticate/login?service=yoolink.to&landing_path=%2Faddorshare%3Furl_value%3D"+encodeURIComponent(postUrl)+"%26title%3D"+encodeURIComponent(postTitle),svg:'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="#fff" d="M16 4C9.37 4 4 9.373 4 16c0 6.628 5.372 12 12 12 6.626 0 12-5.372 12-12 0-6.627-5.374-12-12-12zm5.81 7.1c-.128.275-.346.655-.655 1.14l-3.694 5.942v4.908c0 .64-.14 1.118-.42 1.436a1.38 1.38 0 0 1-1.08.474c-.44 0-.8-.157-1.075-.47-.274-.313-.412-.794-.412-1.44v-4.91l-3.603-5.855c-.316-.528-.54-.94-.67-1.235-.13-.295-.197-.553-.197-.77 0-.36.133-.67.398-.93s.59-.39.98-.39c.41 0 .72.12.93.364.213.243.53.727.953 1.45l2.758 4.697 2.79-4.693c.17-.287.31-.53.423-.727.114-.198.24-.384.378-.556.14-.172.29-.305.46-.396.166-.09.37-.136.613-.136.376 0 .688.13.94.386.252.258.378.554.378.892 0 .275-.064.55-.19.823z"></path></svg>'}};var heateorSssMoreSharingServicesHtml='<button id="heateor_sss_sharing_popup_close" class="close-button separated"><img src="'+heateorSssCloseIconPath+'" /></button><div id="heateor_sss_sharing_more_content" data-href="'+decodeURIComponent(postUrl)+'"><div class="filter"><input type="text" onkeyup="heateorSssFilterSharing(this.value.trim())" placeholder="Search" class="search"></div><div class="all-services"><ul class="mini">';for(var i in heateorSssMoreSharingServices){var tempTitle=heateorSssCapitaliseFirstLetter(heateorSssMoreSharingServices[i].title.replace(/[_. ]/g,""));heateorSssMoreSharingServicesHtml+='<li><a rel="nofollow" title="'+heateorSssMoreSharingServices[i].title+'" alt="'+heateorSssMoreSharingServices[i].title+'" ';if(heateorSssMoreSharingServices[i].bookmarklet_url){heateorSssMoreSharingServicesHtml+='href="'+heateorSssMoreSharingServices[i].bookmarklet_url+'" '}else if(heateorSssMoreSharingServices[i].redirect_url){heateorSssMoreSharingServicesHtml+='onclick="heateorSssPopup(\''+heateorSssMoreSharingServices[i].redirect_url+'\')" href="javascript:void(0)" '}else{heateorSssMoreSharingServicesHtml+='href="javascript:void(0)" '}
heateorSssMoreSharingServicesHtml+='"><span class="heateor_sss_svg heateor_sss_s__default heateor_sss_s_'+heateorSssMoreSharingServices[i].title.replace(' ','_').toLowerCase()+'" style="background-color:'+heateorSssMoreSharingServices[i].background_color+';width:22px;height:22px;display:block;float:left;" title="'+heateorSssMoreSharingServices[i].title+'">'+heateorSssMoreSharingServices[i].svg+'</span><span style="display:block;float:left;margin-left:3px;line-height:24px;" class="heateor_sss_more_label_'+heateorSssMoreSharingServices[i].title.replace(' ','_').toLowerCase()+'">'+heateorSssMoreSharingServices[i].title+'</span></a></li>'}
heateorSssMoreSharingServicesHtml+=concate;var mainDiv=document.createElement('div');mainDiv.innerHTML=heateorSssMoreSharingServicesHtml;mainDiv.setAttribute('id','heateor_sss_sharing_more_providers');var bgDiv=document.createElement('div');bgDiv.setAttribute('id','heateor_sss_popup_bg');jQuery('body').append(mainDiv).append(bgDiv);document.getElementById('heateor_sss_popup_bg').onclick=document.getElementById('heateor_sss_sharing_popup_close').onclick=function(){mainDiv.parentNode.removeChild(mainDiv);bgDiv.parentNode.removeChild(bgDiv)}}
if(heateorSssHorizontalSharingCountEnable||heateorSssVerticalSharingCountEnable){heateorSssLoadEvent(function(){heateorSssGetSharingCounts()})}
function heateorSssFilterSharing(val){jQuery('ul.mini li a').each(function(){if(jQuery(this).text().toLowerCase().indexOf(val.toLowerCase())!=-1){jQuery(this).parent().css('display','block')}else{jQuery(this).parent().css('display','none')}})};var heateorSssFacebookTargetUrls=[];function heateorSssGetSharingCounts(){var targetUrls=[];jQuery('.heateor_sss_sharing_container').each(function(){if(typeof jQuery(this).attr('data-heateor-sss-no-counts')=='undefined'){var currentTargetUrl=jQuery(this).attr('data-heateor-sss-href');if(currentTargetUrl!=null&&jQuery.inArray(currentTargetUrl,heateorSssUrlCountFetched)==-1){targetUrls.push(currentTargetUrl);heateorSssUrlCountFetched.push(currentTargetUrl)}}});if(targetUrls.length==0){return}
jQuery.ajax({type:'GET',dataType:'json',url:heateorSssSharingAjaxUrl,data:{action:'heateor_sss_sharing_count',urls:targetUrls,},success:function(data,textStatus,XMLHttpRequest){if(data.status==1){if(data.facebook){heateorSssFacebookTargetUrls=data.facebook_urls}
for(var i in data.message){var sharingContainers=jQuery("div[data-heateor-sss-href='"+i+"']");jQuery(sharingContainers).each(function(){var totalCount=0;for(var j in data.message[i]){var sharingCount=parseInt(data.message[i][j])||0;var targetElement=jQuery(this).find('.heateor_sss_'+j+'_count');if(jQuery(targetElement).attr('data-heateor-sss-st-count')){sharingCount=parseInt(sharingCount)+parseInt(jQuery(targetElement).attr('data-heateor-sss-st-count'))}
totalCount+=parseInt(sharingCount);if(sharingCount<1){continue}
jQuery(targetElement).html(heateorSssCalculateApproxCount(sharingCount)).css({'visibility':'visible','display':'block'});if((typeof heateorSssReduceHorizontalSvgWidth!='undefined'&&jQuery(this).hasClass('heateor_sss_horizontal_sharing'))||(typeof heateorSssReduceVerticalSvgWidth!='undefined'&&jQuery(this).hasClass('heateor_sss_vertical_sharing'))){jQuery(targetElement).parents('li').find('.heateorSssSharingSvg').css('float','left')}
if((typeof heateorSssReduceHorizontalSvgHeight!='undefined'&&jQuery(this).hasClass('heateor_sss_horizontal_sharing'))||(typeof heateorSssReduceVerticalSvgHeight!='undefined'&&jQuery(this).hasClass('heateor_sss_vertical_sharing'))){jQuery(targetElement).parents('li').find('.heateorSssSharingSvg').css('marginTop','0')}}
var totalCountContainer=jQuery(this).find('.heateorSssTCBackground'),totalShares=heateorSssCalculateApproxCount(totalCount);jQuery(totalCountContainer).each(function(){var containerHeight=jQuery(this).css('height');jQuery(this).html('<div class="heateorSssTotalShareCount" style="font-size: '+(parseInt(containerHeight)*62/100)+'px">'+totalShares+'</div><div class="heateorSssTotalShareText" style="font-size: '+(parseInt(containerHeight)*38/100)+'px">'+(totalCount==0||totalCount>1?heateorSssSharesText:heateorSssShareText)+'</div>').css('visibility','visible')})})}
if(heateorSssFacebookTargetUrls.length!=0){heateorSssFetchFacebookShares(heateorSssFacebookTargetUrls)}}}})}
function heateorSssFetchFacebookShares(targetUrls){var loopCounter=0;for(var i in targetUrls){for(var j in targetUrls[i]){loopCounter++;heateorSssFBShareJSONCall(targetUrls[i][j],loopCounter,targetUrls[0].length*targetUrls.length,targetUrls[0][j])}}}
function heateorSssFBShareJSONCall(targetUrl,loopCounter,targetUrlsLength,dataHref){jQuery.getJSON('//graph.facebook.com/?id='+targetUrl,function(data){if(data.share&&data.share.share_count>=0){var sharingContainers=jQuery("div[data-heateor-sss-href='"+dataHref+"']");jQuery(sharingContainers).each(function(){var targetElement=jQuery(this).find('.heateor_sss_facebook_count');var facebookBackground=jQuery(this).find('i.heateorSssFacebookBackground');var sharingCount=parseInt(data.share.share_count);if(jQuery(targetElement).attr('data-heateor-sss-st-count')!==undefined){sharingCount+=parseInt(jQuery(targetElement).attr('data-heateor-sss-st-count'))}
if(sharingCount>0){if(typeof jQuery(facebookBackground).attr('heateor-sss-fb-shares')=='undefined'){jQuery(targetElement).html(heateorSssCalculateApproxCount(sharingCount)).css({'visibility':'visible','display':'block'});jQuery(facebookBackground).attr('heateor-sss-fb-shares',sharingCount)}else if(typeof jQuery(facebookBackground).attr('heateor-sss-fb-shares')!='undefined'){var tempShareCount=parseInt(jQuery(facebookBackground).attr('heateor-sss-fb-shares'));jQuery(facebookBackground).attr('heateor-sss-fb-shares',sharingCount+tempShareCount);jQuery(targetElement).html(heateorSssCalculateApproxCount(sharingCount+tempShareCount))}
if((typeof heateorSssReduceHorizontalSvgWidth!='undefined'&&jQuery(this).hasClass('heateor_sss_horizontal_sharing'))||(typeof heateorSssReduceVerticalSvgWidth!='undefined'&&jQuery(this).hasClass('heateor_sss_vertical_sharing'))){jQuery(targetElement).parents('li').find('.heateorSssSharingSvg').css('float','left')}
if((typeof heateorSssReduceHorizontalSvgHeight!='undefined'&&jQuery(this).hasClass('heateor_sss_horizontal_sharing'))||(typeof heateorSssReduceVerticalSvgHeight!='undefined'&&jQuery(this).hasClass('heateor_sss_vertical_sharing'))){jQuery(targetElement).parents('li').find('.heateorSssSharingSvg').css('marginTop','0')}
var totalCountContainer=jQuery(this).find('.heateorSssTCBackground');jQuery(totalCountContainer).each(function(){var totalShareCountElem=jQuery(this).find('.heateorSssTotalShareCount');var totalShareCount=jQuery(totalShareCountElem).text();var newTotalCount=heateorSssCalculateActualCount(totalShareCount)+sharingCount;jQuery(totalShareCountElem).text(heateorSssCalculateApproxCount(newTotalCount));jQuery(this).find('.heateorSssTotalShareText').text(newTotalCount==0||newTotalCount>1?heateorSssSharesText:heateorSssShareText)})}})}
if(loopCounter==targetUrlsLength){setTimeout(function(){var facebookShares={};for(var i in heateorSssFacebookTargetUrls[0]){var sharingContainers=jQuery("div[data-heateor-sss-href='"+heateorSssFacebookTargetUrls[0][i]+"']");jQuery(sharingContainers).each(function(){var facebookCountElement=jQuery(this).find('.heateor_sss_facebook_count');var facebookCountElementBg=jQuery(this).find('i.heateorSssFacebookBackground');var shareCountString=typeof jQuery(facebookCountElementBg).attr('heateor-sss-fb-shares')!='undefined'?jQuery(facebookCountElementBg).attr('heateor-sss-fb-shares').trim():'';if(shareCountString!=''){var shareCount=parseInt(heateorSssCalculateActualCount(shareCountString));if(jQuery(facebookCountElement).attr('data-heateor-sss-st-count')!==undefined){var startingCount=parseInt(jQuery(facebookCountElement).attr('data-heateor-sss-st-count').trim());shareCount=Math.abs(shareCount-startingCount)}
facebookShares[heateorSssFacebookTargetUrls[0][i]]=shareCount;return}})}
if(!jQuery.isEmptyObject(facebookShares)){heateorSssSaveFacebookShares(facebookShares)}},1000)}})}
function heateorSssSaveFacebookShares(facebookShares){jQuery.ajax({type:'GET',dataType:'json',url:heateorSssSharingAjaxUrl,data:{action:'heateor_sss_save_facebook_shares',share_counts:facebookShares,},success:function(data,textStatus,XMLHttpRequest){}})}
function heateorSssCalculateApproxCount(sharingCount){if(sharingCount>999&&sharingCount<10000){sharingCount=(Math.round(sharingCount/100))/10+'K'}else if(sharingCount>9999&&sharingCount<100000){sharingCount=(Math.round(sharingCount/100))/10+'K'}else if(sharingCount>99999&&sharingCount<1000000){sharingCount=(Math.round(sharingCount/100))/10+'K'}else if(sharingCount>999999){sharingCount=(Math.round(sharingCount/100000))/10+'M'}
return sharingCount}
function heateorSssCalculateActualCount(sharingCount){if(sharingCount.indexOf('K')>0){sharingCount=sharingCount.replace('K','')*1000}else if(sharingCount.indexOf('M')>0){sharingCount=sharingCount.replace('M','')*1000000}
return parseInt(sharingCount)}
function heateorSssCapitaliseFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}
jQuery(function(){var heateorSssWhatsappJSAPI=heateorSssDetermineWhatsappShareAPI(!1);var classes=['heateor_sss_vertical_sharing','heateor_sss_vertical_counter'];for(var i=0;i<classes.length;i++){if(jQuery('.'+classes[i]).length){jQuery('.'+classes[i]).each(function(){var verticalSharingHtml=jQuery(this).html();if(jQuery(this).attr('style').indexOf('right')>=0){var removeClass='heateorSssPushIn',margin='Right',alignment='right',addClass='heateorSssPullOut'}else{var removeClass='heateorSssPullOut',margin='Left',alignment='left',addClass='heateorSssPushIn'}
jQuery(this).html(verticalSharingHtml+'<div title="Hide" style="float:'+alignment+'" onclick="heateorSssHideSharing(this, \''+removeClass+'\', \''+addClass+'\',\''+margin+'\', \''+alignment+'\')" class="heateorSssSharingArrow '+removeClass+'"></div>')})}}
if(heateorSssMobileStickySharingEnabled==1){if(jQuery('div.heateor_sss_vertical_sharing').length){jQuery(document.body).append("<div class='heateor_sss_mobile_footer'></div>")}}
var heateorSssClipboard=new ClipboardJS('a.heateor_sss_button_copy_link, span.heateor_sss_s_copy_link, span.heateor_sss_s_copy_link svg, span.heateor_sss_more_label_copy_link',{text:function(trigger){if(jQuery(trigger).hasClass('heateor_sss_button_copy_link')){var element=trigger.parentElement.parentElement;var url=jQuery(element).attr("data-heateor-sss-href")||""}else if(jQuery(trigger).hasClass('heateor_sss_s_copy_link')){var element=trigger.parentElement.parentElement.parentElement;var url=jQuery(element).attr("data-heateor-sss-href")||"";if(!url){var element=trigger.parentElement.parentElement.parentElement.parentElement.parentElement;var url=jQuery(element).attr("data-href")||""}}else if(jQuery(trigger).parent().hasClass('heateor_sss_s_copy_link')){var element=trigger.parentElement.parentElement.parentElement.parentElement;var url=jQuery(element).attr("data-heateor-sss-href")||"";if(!url){var element=trigger.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;var url=jQuery(element).attr("data-href")||""}}else if(jQuery(trigger).hasClass('heateor_sss_more_label_copy_link')){var element=trigger.parentElement.parentElement.parentElement.parentElement.parentElement;var url=jQuery(element).attr("data-href")||""}else if(jQuery(trigger).attr('href')!="undefined"){var element=trigger.parentElement.parentElement.parentElement.parentElement;var url=jQuery(element).attr("data-href")||""}
return url}});heateorSssClipboard.on('success',function(e){alert(heateorSssCopyLinkMessage)})});function heateorSssHideSharing(elem,removeClass,addClass,margin,alignment){var animation={},counter=jQuery(elem).parent().hasClass('heateor_sss_vertical_counter'),offset=parseInt(jQuery(elem).parent().css('width'))+10-(counter?16:0);var ssOffset=jQuery(elem).parent().attr('data-heateor-ss-offset');if(ssOffset){var savedOffset=parseInt(ssOffset)}else{var savedOffset=(counter?heateorSssCounterOffset:heateorSssSharingOffset)}
if(jQuery(elem).attr('title')=='Hide'){animation[alignment]="-="+(offset+savedOffset);jQuery(elem).parent().animate(animation,400,function(){jQuery(elem).removeClass(removeClass).addClass(addClass).attr('title','Share');if(counter){var cssFloat=alignment=='left'?'right':'left';jQuery(elem).css('float',cssFloat)}else{jQuery(elem).css('margin'+margin,offset+'px')}})}else{animation[alignment]="+="+(offset+savedOffset);jQuery(elem).parent().animate(animation,400,function(){jQuery(elem).removeClass(addClass).addClass(removeClass).attr('title','Hide');if(counter){jQuery(elem).css('float',alignment)}else{jQuery(elem).css('margin'+margin,'0px')}})}}
/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 * 
 * Licensed MIT © Zeno Rocha
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClipboardJS=e():t.ClipboardJS=e()}(this,function(){return o={},r.m=n=[function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),r=document.createRange();r.selectNodeContents(t),o.removeAllRanges(),o.addRange(r),e=o.toString()}return e}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function r(){o.off(t,r),e.apply(n,arguments)}return r._=e,this.on(t,r,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,a=o.length;i<a;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=n,t.exports.TinyEmitter=n},function(t,e,n){var d=n(3),h=n(4);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!d.string(e))throw new TypeError("Second argument must be a String");if(!d.fn(n))throw new TypeError("Third argument must be a Function");if(d.node(t))return s=e,f=n,(u=t).addEventListener(s,f),{destroy:function(){u.removeEventListener(s,f)}};if(d.nodeList(t))return a=t,c=e,l=n,Array.prototype.forEach.call(a,function(t){t.addEventListener(c,l)}),{destroy:function(){Array.prototype.forEach.call(a,function(t){t.removeEventListener(c,l)})}};if(d.string(t))return o=t,r=e,i=n,h(document.body,o,r,i);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,r,i,a,c,l,u,s,f}},function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e,n){var a=n(5);function i(t,e,n,o,r){var i=function(e,n,t,o){return function(t){t.delegateTarget=a(t.target,n),t.delegateTarget&&o.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,i,r),{destroy:function(){t.removeEventListener(n,i,r)}}}t.exports=function(t,e,n,o,r){return"function"==typeof t.addEventListener?i.apply(null,arguments):"function"==typeof n?i.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return i(t,e,n,o,r)}))}},function(t,e){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),this.resolveOptions(t),this.initSelection()}var l=(function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}(c,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=r()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=r()(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(t){var e=0<arguments.length&&void 0!==t?t:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":i(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),c),u=n(1),s=n.n(u),f=n(2),d=n.n(f),h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p=function(t,e,n){return e&&y(t.prototype,e),n&&y(t,n),t};function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var m=(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(v,s.a),p(v,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===h(e.container)?e.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=d()(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return b("action",t)}},{key:"defaultTarget",value:function(t){var e=b("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return b("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(t){var e=0<arguments.length&&void 0!==t?t:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),v);function v(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(v.__proto__||Object.getPrototypeOf(v)).call(this));return n.resolveOptions(e),n.listenClick(t),n}function b(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}e.default=m}],r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6).default;function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var n,o});var ctf={"ajax_url":"https://qullamaggie.com/wp-admin/admin-ajax.php"};var ctf_js_exists=void 0!==ctf_js_exists;ctf_js_exists||function(u){function t(){if(window.ctfObject.consentGiven||!window.ctfObject.gdpr)return!0;if("undefined"!=typeof CLI_Cookie)null!==CLI_Cookie.read(CLI_ACCEPT_COOKIE_NAME)&&(null!==CLI_Cookie.read("cookielawinfo-checkbox-non-necessary")&&(window.ctfObject.consentGiven="yes"===CLI_Cookie.read("cookielawinfo-checkbox-non-necessary")),null!==CLI_Cookie.read("cookielawinfo-checkbox-necessary")&&(window.ctfObject.consentGiven="yes"===CLI_Cookie.read("cookielawinfo-checkbox-necessary")));else if(void 0!==window.cnArgs){var u=("; "+document.cookie).split("; cookie_notice_accepted=");if(2===u.length){var t=u.pop().split(";").shift();window.ctfObject.consentGiven="true"===t}}else void 0!==window.cookieconsent?window.ctfObject.consentGiven="allow"===function(u){for(var t=u+"=",e=window.document.cookie.split(";"),n=0;n<e.length;n++){var a=e[n].trim();if(0==a.indexOf(t))return a.substring(t.length,a.length)}return""}("cmplz_consent_status")||jQuery("body").hasClass("cmplz-status-marketing"):void 0!==window.Cookiebot?window.ctfObject.consentGiven=Cookiebot.consented:void 0!==window.BorlabsCookie&&(window.ctfObject.consentGiven=window.BorlabsCookie.checkCookieConsent("twitter"));var e=jQuery.Event("ctfcheckconsent");return e.feed=this,jQuery(window).trigger(e),window.ctfObject.consentGiven}function e(t){t.find(".ctf-hide-avatar").length&&!t.find(".ctf-hide-avatar.ctf-no-consent").length||t.find(".ctf-item").addClass("ctf-hide-avatar ctf-no-consent"),u(".ctf-header-img span").length&&u(".ctf-header-img").addClass("ctf-no-consent")}function n(t){c(),t.find(".ctf-item.ctf-no-consent").removeClass("ctf-hide-avatar"),t.find(".ctf-author-avatar").each(function(){u(this).find("span").replaceWith('<img src="'+u(this).find("span").attr("data-avatar")+'" alt="'+u(this).find("span").attr("data-alt")+'" width="48" height="48">')}),t.find(".ctf-header-img").each(function(){u(this).find("span").replaceWith('<img src="'+u(this).find("span").attr("data-avatar")+'" alt="'+u(this).find("span").attr("data-alt")+'" width="48" height="48">')}),t.find(".ctf-no-consent").removeClass("ctf-no-consent"),t.find(".ctf-header .ctf-header-link").on("mouseenter mouseleave",function(u){switch(u.type){case"mouseenter":t.find(".ctf-header .ctf-header-img-hover").fadeIn(200);break;case"mouseleave":t.find(".ctf-header .ctf-header-img-hover").stop().fadeOut(600)}})}function a(){t()&&u(".ctf").each(function(){n(u(this))})}function c(){void 0===window.ctfObject.intentsIncluded&&(window.ctfObject.intentsIncluded=!1),u(".ctf").each(function(){window.ctfObject.intentsIncluded||void 0===u(this).attr("data-ctfintents")||(window.ctfObject.intentsIncluded=!0,function(){if(!window.__twitterIntentHandler){var u=/twitter\.com\/intent\/(\w+)/,t="scrollbars=yes,resizable=yes,toolbar=no,location=yes",e=550,n=420,a=screen.height,c=screen.width;document.addEventListener?document.addEventListener("click",i,!1):document.attachEvent&&document.attachEvent("onclick",i),window.__twitterIntentHandler=!0}function i(i){for(var o,s,d=(i=i||window.event).target||i.srcElement;d&&"a"!==d.nodeName.toLowerCase();)d=d.parentNode;d&&"a"===d.nodeName.toLowerCase()&&d.href&&d.href.match(u)&&(o=Math.round(c/2-e/2),s=0,a>n&&(s=Math.round(a/2-n/2)),window.open(d.href,"intent",t+",width="+e+",height="+n+",left="+o+",top="+s),i.returnValue=!1,i.preventDefault&&i.preventDefault())}}())})}function i(u){var t="content";return u.closest("footer").length?t="footer":u.closest(".header").length||u.closest("header").length?t="header":(u.closest(".sidebar").length||u.closest("aside").length)&&(t="sidebar"),t}window.ctf_init=function(){if(window.ctfObject={},u(".ctf").length&&void 0!==u(".ctf").first().attr("data-ctf-flags")){var a=u(".ctf").first().attr("data-ctf-flags").split(",");if(a.indexOf("gdpr")>-1?(window.ctfObject.consentGiven=!1,window.ctfObject.gdpr=!0):(window.ctfObject.consentGiven=!0,window.ctfObject.gdpr=!1),a.indexOf("locator")>-1){var o=Math.floor(Math.random()*u(".ctf").length);window.ctfObject.locator=1===u(".ctf").length||1===o}else window.ctfObject.locator=!1}else window.ctfObject.consentGiven=!0,window.ctfObject.gdpr=!1,window.ctfObject.locator=!1;function s(a){if(a.addClass("ctf_is_initialized"),window.ctfObject.locator){var c=(a.attr("data-feed-id"),a.attr("data-feed-id")),o=(a.attr("data-postid"),a.attr("data-postid"));jQuery.ajax({url:ctf.ajax_url,type:"post",data:{action:"ctf_do_locator",atts:a.attr("data-ctfshortcode"),feed_id:c,location:i(a),post_id:o},success:function(u){}})}t()?n(a):e(a),a.find(".ctf-item.ctf-new").each(function(){var t,e,n,c,i,o,s=u(this),d=s.find(".ctf-tweet-text-media-wrap"),r=s.find(".ctf-tweet-text").remove(".ctf-tweet-text-media-wrap"),f=" "+r.html();if("true"!=a.attr("data-ctfdisablelinks")&&void 0!==f&&!a.find(".ctf-tweet-text-link").length){var A=a.attr("data-ctflinktextcolor"),l="";A&&(l=A.replace(";","").split("#")[1]),window.ctfLinkify=(t="[a-z\\d.-]+://",e="mailto:",n=new RegExp("(?:\\b[a-z\\d.-]+://[^<>\\s]+|\\b(?:(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)|(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5]))(?:[;/][^#?<>\\s]*)?(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?(?!\\w)|(?:mailto:)?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)|(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5]))(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?(?!\\w))","ig"),c=new RegExp("^"+t,"i"),i={"'":"`",">":"<",")":"(","]":"[","}":"{","B;":"B+","b:":"b9"},o={callback:function(u,t){return t?'<a href="'+t+'" title="'+t+'" target="_blank">'+u+"</a>":u},punct_regexp:/(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/},function(u,t){t=t||{};var a,s,d,r,f,A,l,F,h,m,C,w,g="",B=[];for(s in o)void 0===t[s]&&(t[s]=o[s]);for(;a=n.exec(u);)if(d=a[0],l=(A=n.lastIndex)-d.length,!/[\/:]/.test(u.charAt(l-1))){do{F=d,w=d.substr(-1),(C=i[w])&&(h=d.match(new RegExp("\\"+C+"(?!$)","g")),m=d.match(new RegExp("\\"+w,"g")),(h?h.length:0)<(m?m.length:0)&&(d=d.substr(0,d.length-1),A--)),t.punct_regexp&&(d=d.replace(t.punct_regexp,function(u){return A-=u.length,""}))}while(d.length&&d!==F);r=d,c.test(r)||(r=(-1!==r.indexOf("@")?r.indexOf(e)?e:"":r.indexOf("irc.")?r.indexOf("ftp.")?"http://":"ftp://":"irc://")+r),f!=l&&(B.push([u.slice(f,l)]),f=A),B.push([d,r])}for(B.push([u.substr(f)]),s=0;s<B.length;s++)g+=t.callback.apply(window,B[s]);return g||u}),r.find("a").length||(r.find(".emoji").each(function(){u(this).replaceWith(u(this).attr("alt"))}),f=" "+r.html(),f=ctfLinkify(f));f.length>0&&(f=(f=f.replace(/<br>/g,"<br> ")).replace(/(^|\s)#(\w*[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+\w*)/gi,function(u){var t=u.trim();return/^#[0-9A-F]{6}$/i.test(t)?t:' <a href="https://twitter.com/hashtag/'+t.substring(1)+'" target="_blank" rel="nofollow noopener">'+t+"</a>"}));f=f.replace(/[\s][@]+[A-Za-z0-9-_]+/g,function(u){var t=u.trim();return' <a href="https://twitter.com/'+t.substring(1)+'" target="_blank" rel="nofollow noopener">'+t+"</a>"}),r.html(f.trim()),r.append(d),r.find("a").css("color","#"+l),d.css("color","#"+l)}s.find(".ctf-tweet-text a").each(function(){jQuery(this).text().indexOf("http")>-1&&jQuery(this).text().length>63&&jQuery(this).text(jQuery(this).text().substring(0,60)+"...")})}),a.find(".ctf-author-name, .ctf-tweet-date, .ctf-author-screenname, .ctf-twitterlink, .ctf-author-box-link, .ctf-retweet-text, .ctf-quoted-tweet").css("color",a.find(".ctf-tweet-text").css("color")),a.find(".ctf_more").off("click").on("click",function(t){t.preventDefault(),u(this).hide().next(".ctf_remaining").show()}),"function"==typeof ctf_custom_js&&ctf_custom_js(u),a.find(".ctf-author-box-link p:empty").remove()}function d(u,t,e,n,a,c){n.addClass("ctf-loading").append('<div class="ctf-loader"></div>'),n.find(".ctf-loader").css("background-color",n.css("color"));var o=(e.attr("data-feed-id"),e.attr("data-feed-id")),d=(e.attr("data-postid"),e.attr("data-postid"));jQuery.ajax({url:ctf.ajax_url,type:"post",data:{action:"ctf_get_more_posts",last_id_data:u,shortcode_data:t,num_needed:a,persistent_index:c,feed_id:o,location:i(e),post_id:d},success:function(t){""!==u?(-1==t.indexOf("<meta charset")&&e.find(".ctf-item").removeClass("ctf-new").last().after(t),e.find(".ctf-out-of-tweets").length&&(n.hide(),e.find(".ctf-out-of-tweets p").eq(0).fadeIn().end().eq(1).delay(500).fadeIn())):e.find(".ctf-tweets").append(t),n.removeClass("ctf-loading").find(".ctf-loader").remove(),s(e)}})}u(".ctf").length<=u(".ctf_is_initialized").length||(window.ctfObject.consentGiven&&c(),u(".ctf").each(function(){var a=u(this),c=parseInt(a.attr("data-ctfneeded"));a.width()<=480&&a.addClass("ctf-narrow"),a.width()<=320&&a.addClass("ctf-super-narrow"),u(this).hasClass("ctf_is_initialized")||s(a),setTimeout(function(){if(c>0){var u=a.find(".ctf-more"),t=a.find(".ctf-item").last().attr("id"),e=a.find(".ctf-item").length;d(t,a.attr("data-ctfshortcode"),a,u,c,e)}},500),a.find(".ctf-more").on("click",function(){var t=u(this),e=a.find(".ctf-item").last().attr("id"),n=a.find(".ctf-item").length;d(e,a.attr("data-ctfshortcode"),a,t,0,n)}),a.find(".ctf-author-box-link p:empty").remove(),setTimeout(function(){t()?n(a):e(a)},500)}))},jQuery(document).ready(function(u){ctf_init(),u("#cookie-notice a").on("click",function(){setTimeout(function(){a()},1e3)}),u("#cookie-law-info-bar a").on("click",function(){setTimeout(function(){a()},1e3)}),u(".cli-user-preference-checkbox").on("click",function(){a()}),u(window).on("CookiebotOnAccept",function(u){a()}),u(document).on("cmplzEnableScripts",function(t){"marketing"===t.detail&&u(".ctf").each(function(){window.ctfObject.consentGiven=!0,a()})}),u(document).on("cmplzFireCategories",function(t){"marketing"===t.detail.category&&u(".ctf").each(function(){window.ctfObject.consentGiven=!0,a()})}),u(document).on("borlabs-cookie-consent-saved",function(u){a()})})}(jQuery);/*! elementor - v3.6.5 - 27-04-2022 */
(()=>{"use strict";var e,r,_,t,i,a={},n={};function __webpack_require__(e){var r=n[e];if(void 0!==r)return r.exports;var _=n[e]={exports:{}};return a[e](_,_.exports,__webpack_require__),_.exports}__webpack_require__.m=a,e=[],__webpack_require__.O=(r,_,t,i)=>{if(!_){var a=1/0;for(u=0;u<e.length;u++){for(var[_,t,i]=e[u],n=!0,c=0;c<_.length;c++)(!1&i||a>=i)&&Object.keys(__webpack_require__.O).every((e=>__webpack_require__.O[e](_[c])))?_.splice(c--,1):(n=!1,i<a&&(a=i));if(n){e.splice(u--,1);var o=t();void 0!==o&&(r=o)}}return r}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[_,t,i]},_=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,__webpack_require__.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var i=Object.create(null);__webpack_require__.r(i);var a={};r=r||[null,_({}),_([]),_(_)];for(var n=2&t&&e;"object"==typeof n&&!~r.indexOf(n);n=_(n))Object.getOwnPropertyNames(n).forEach((r=>a[r]=()=>e[r]));return a.default=()=>e,__webpack_require__.d(i,a),i},__webpack_require__.d=(e,r)=>{for(var _ in r)__webpack_require__.o(r,_)&&!__webpack_require__.o(e,_)&&Object.defineProperty(e,_,{enumerable:!0,get:r[_]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((r,_)=>(__webpack_require__.f[_](e,r),r)),[])),__webpack_require__.u=e=>723===e?"lightbox.2b2c155d6ec60974d8c4.bundle.min.js":48===e?"text-path.9f18ebdea5ac00d653e5.bundle.min.js":209===e?"accordion.1840403ce81de408c749.bundle.min.js":745===e?"alert.cbc2a0fee74ee3ed0419.bundle.min.js":120===e?"counter.02cef29c589e742d4c8c.bundle.min.js":192===e?"progress.ca55d33bb06cee4e6f02.bundle.min.js":520===e?"tabs.37d5b4877cdb51ea91e9.bundle.min.js":181===e?"toggle.56f8ace4b1e830c02fc5.bundle.min.js":791===e?"video.d86bfd0676264945e968.bundle.min.js":268===e?"image-carousel.db284b09c0f8a8f1c44d.bundle.min.js":357===e?"text-editor.289ae80d76f0c5abea44.bundle.min.js":52===e?"wp-audio.75f0ced143febb8cd31a.bundle.min.js":413===e?"container.e026b16a99db8a3987c9.bundle.min.js":void 0,__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t={},i="elementor:",__webpack_require__.l=(e,r,_,a)=>{if(t[e])t[e].push(r);else{var n,c;if(void 0!==_)for(var o=document.getElementsByTagName("script"),u=0;u<o.length;u++){var b=o[u];if(b.getAttribute("src")==e||b.getAttribute("data-webpack")==i+_){n=b;break}}n||(c=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,__webpack_require__.nc&&n.setAttribute("nonce",__webpack_require__.nc),n.setAttribute("data-webpack",i+_),n.src=e),t[e]=[r];var onScriptComplete=(r,_)=>{n.onerror=n.onload=null,clearTimeout(p);var i=t[e];if(delete t[e],n.parentNode&&n.parentNode.removeChild(n),i&&i.forEach((e=>e(_))),r)return r(_)},p=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=onScriptComplete.bind(null,n.onerror),n.onload=onScriptComplete.bind(null,n.onload),c&&document.head.appendChild(n)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var r=__webpack_require__.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var _=r.getElementsByTagName("script");_.length&&(e=_[_.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{var e={162:0};__webpack_require__.f.j=(r,_)=>{var t=__webpack_require__.o(e,r)?e[r]:void 0;if(0!==t)if(t)_.push(t[2]);else if(162!=r){var i=new Promise(((_,i)=>t=e[r]=[_,i]));_.push(t[2]=i);var a=__webpack_require__.p+__webpack_require__.u(r),n=new Error;__webpack_require__.l(a,(_=>{if(__webpack_require__.o(e,r)&&(0!==(t=e[r])&&(e[r]=void 0),t)){var i=_&&("load"===_.type?"missing":_.type),a=_&&_.target&&_.target.src;n.message="Loading chunk "+r+" failed.\n("+i+": "+a+")",n.name="ChunkLoadError",n.type=i,n.request=a,t[1](n)}}),"chunk-"+r,r)}else e[r]=0},__webpack_require__.O.j=r=>0===e[r];var webpackJsonpCallback=(r,_)=>{var t,i,[a,n,c]=_,o=0;if(a.some((r=>0!==e[r]))){for(t in n)__webpack_require__.o(n,t)&&(__webpack_require__.m[t]=n[t]);if(c)var u=c(__webpack_require__)}for(r&&r(_);o<a.length;o++)i=a[o],__webpack_require__.o(e,i)&&e[i]&&e[i][0](),e[a[o]]=0;return __webpack_require__.O(u)},r=self.webpackChunkelementor=self.webpackChunkelementor||[];r.forEach(webpackJsonpCallback.bind(null,0)),r.push=webpackJsonpCallback.bind(null,r.push.bind(r))})()})();/*! elementor - v3.6.5 - 27-04-2022 */
(self.webpackChunkelementor=self.webpackChunkelementor||[]).push([[354],{7914:e=>{e.exports=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}},e.exports.default=e.exports,e.exports.__esModule=!0},381:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=(e,t)=>{t=Array.isArray(t)?t:[t];for(const n of t)if(e.constructor.name===n.prototype[Symbol.toStringTag])return!0;return!1}},8135:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.ViewModule{getDefaultSettings(){return{selectors:{elements:".elementor-element",nestedDocumentElements:".elementor .elementor-element"},classes:{editMode:"elementor-edit-mode"}}}getDefaultElements(){const e=this.getSettings("selectors");return{$elements:this.$element.find(e.elements).not(this.$element.find(e.nestedDocumentElements))}}getDocumentSettings(e){let t;if(this.isEdit){t={};const e=elementor.settings.page.model;jQuery.each(e.getActiveControls(),(n=>{t[n]=e.attributes[n]}))}else t=this.$element.data("elementor-settings")||{};return this.getItems(t,e)}runElementsHandlers(){this.elements.$elements.each(((e,t)=>elementorFrontend.elementsHandler.runReadyTrigger(t)))}onInit(){this.$element=this.getSettings("$element"),super.onInit(),this.isEdit=this.$element.hasClass(this.getSettings("classes.editMode")),this.isEdit?elementor.on("document:loaded",(()=>{elementor.settings.page.model.on("change",this.onSettingsChange.bind(this))})):this.runElementsHandlers()}onSettingsChange(){}}t.default=_default},2821:(e,t,n)=>{"use strict";var s=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(3090));class SwiperHandlerBase extends i.default{getInitialSlide(){const e=this.getEditSettings();return e.activeItemIndex?e.activeItemIndex-1:0}getSlidesCount(){return this.elements.$slides.length}togglePauseOnHover(e){e?this.elements.$swiperContainer.on({mouseenter:()=>{this.swiper.autoplay.stop()},mouseleave:()=>{this.swiper.autoplay.start()}}):this.elements.$swiperContainer.off("mouseenter mouseleave")}handleKenBurns(){const e=this.getSettings();this.$activeImageBg&&this.$activeImageBg.removeClass(e.classes.kenBurnsActive),this.activeItemIndex=this.swiper?this.swiper.activeIndex:this.getInitialSlide(),this.swiper?this.$activeImageBg=jQuery(this.swiper.slides[this.activeItemIndex]).children("."+e.classes.slideBackground):this.$activeImageBg=jQuery(this.elements.$slides[0]).children("."+e.classes.slideBackground),this.$activeImageBg.addClass(e.classes.kenBurnsActive)}}t.default=SwiperHandlerBase},3090:e=>{"use strict";e.exports=elementorModules.ViewModule.extend({$element:null,editorListeners:null,onElementChange:null,onEditSettingsChange:null,onPageSettingsChange:null,isEdit:null,__construct:function(e){this.isActive(e)&&(this.$element=e.$element,this.isEdit=this.$element.hasClass("elementor-element-edit-mode"),this.isEdit&&this.addEditorListeners())},isActive:function(){return!0},findElement:function(e){var t=this.$element;return t.find(e).filter((function(){return jQuery(this).closest(".elementor-element").is(t)}))},getUniqueHandlerID:function(e,t){return e||(e=this.getModelCID()),t||(t=this.$element),e+t.attr("data-element_type")+this.getConstructorID()},initEditorListeners:function(){var e=this;if(e.editorListeners=[{event:"element:destroy",to:elementor.channels.data,callback:function(t){t.cid===e.getModelCID()&&e.onDestroy()}}],e.onElementChange){const t=e.getWidgetType()||e.getElementType();let n="change";"global"!==t&&(n+=":"+t),e.editorListeners.push({event:n,to:elementor.channels.editor,callback:function(t,n){e.getUniqueHandlerID(n.model.cid,n.$el)===e.getUniqueHandlerID()&&e.onElementChange(t.model.get("name"),t,n)}})}e.onEditSettingsChange&&e.editorListeners.push({event:"change:editSettings",to:elementor.channels.editor,callback:function(t,n){n.model.cid===e.getModelCID()&&e.onEditSettingsChange(Object.keys(t.changed)[0])}}),["page"].forEach((function(t){var n="on"+t[0].toUpperCase()+t.slice(1)+"SettingsChange";e[n]&&e.editorListeners.push({event:"change",to:elementor.settings[t].model,callback:function(t){e[n](t.changed)}})}))},getEditorListeners:function(){return this.editorListeners||this.initEditorListeners(),this.editorListeners},addEditorListeners:function(){var e=this.getUniqueHandlerID();this.getEditorListeners().forEach((function(t){elementorFrontend.addListenerOnce(e,t.event,t.callback,t.to)}))},removeEditorListeners:function(){var e=this.getUniqueHandlerID();this.getEditorListeners().forEach((function(t){elementorFrontend.removeListeners(e,t.event,null,t.to)}))},getElementType:function(){return this.$element.data("element_type")},getWidgetType:function(){const e=this.$element.data("widget_type");if(e)return e.split(".")[0]},getID:function(){return this.$element.data("id")},getModelCID:function(){return this.$element.data("model-cid")},getElementSettings:function(e){let t={};const n=this.getModelCID();if(this.isEdit&&n){const e=elementorFrontend.config.elements.data[n],s=e.attributes;let i=s.widgetType||s.elType;s.isInner&&(i="inner-"+i);let r=elementorFrontend.config.elements.keys[i];r||(r=elementorFrontend.config.elements.keys[i]=[],jQuery.each(e.controls,((e,t)=>{t.frontend_available&&r.push(e)}))),jQuery.each(e.getActiveControls(),(function(e){if(-1!==r.indexOf(e)){let n=s[e];n.toJSON&&(n=n.toJSON()),t[e]=n}}))}else t=this.$element.data("settings")||{};return this.getItems(t,e)},getEditSettings:function(e){var t={};return this.isEdit&&(t=elementorFrontend.config.elements.editSettings[this.getModelCID()].attributes),this.getItems(t,e)},getCurrentDeviceSetting:function(e){return elementorFrontend.getCurrentDeviceSetting(this.getElementSettings(),e)},onInit:function(){this.isActive(this.getSettings())&&elementorModules.ViewModule.prototype.onInit.apply(this,arguments)},onDestroy:function(){this.isEdit&&this.removeEditorListeners(),this.unbindEvents&&this.unbindEvents()}})},6412:(e,t,n)=>{"use strict";var s=n(7914),i=s(n(5955)),r=s(n(8135)),o=s(n(5658)),l=s(n(3090)),c=s(n(2821));i.default.frontend={Document:r.default,tools:{StretchElement:o.default},handlers:{Base:l.default,SwiperBase:c.default}}},5658:e=>{"use strict";e.exports=elementorModules.ViewModule.extend({getDefaultSettings:function(){return{element:null,direction:elementorFrontend.config.is_rtl?"right":"left",selectors:{container:window}}},getDefaultElements:function(){return{$element:jQuery(this.getSettings("element"))}},stretch:function(){var e,t=this.getSettings("selectors.container");try{e=jQuery(t)}catch(e){}e&&e.length||(e=jQuery(this.getDefaultSettings().selectors.container)),this.reset();var n=this.elements.$element,s=e.innerWidth(),i=n.offset().left,r="fixed"===n.css("position"),o=r?0:i;if(window!==e[0]){var l=e.offset().left;r&&(o=l),i>l&&(o=i-l)}r||(elementorFrontend.config.is_rtl&&(o=s-(n.outerWidth()+o)),o=-o);var c={};c.width=s+"px",c[this.getSettings("direction")]=o+"px",n.css(c)},reset:function(){var e={width:""};e[this.getSettings("direction")]="",this.elements.$element.css(e)}})},2618:(e,t,n)=>{"use strict";var s=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(7597)),r=s(n(381));class ArgsObject extends i.default{static getInstanceType(){return"ArgsObject"}constructor(e){super(),this.args=e}requireArgument(e,t=this.args){if(!t.hasOwnProperty(e))throw Error(`${e} is required.`)}requireArgumentType(e,t,n=this.args){if(this.requireArgument(e,n),typeof n[e]!==t)throw Error(`${e} invalid type: ${t}.`)}requireArgumentInstance(e,t,n=this.args){if(this.requireArgument(e,n),!(n[e]instanceof t||(0,r.default)(n[e],t)))throw Error(`${e} invalid instance.`)}requireArgumentConstructor(e,t,n=this.args){if(this.requireArgument(e,n),n[e].constructor.toString()!==t.prototype.constructor.toString())throw Error(`${e} invalid constructor type.`)}}t.default=ArgsObject},869:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.ForceMethodImplementation=void 0;class ForceMethodImplementation extends Error{constructor(e={}){super(`${e.isStatic?"static ":""}${e.fullName}() should be implemented, please provide '${e.functionName||e.fullName}' functionality.`),Error.captureStackTrace(this,ForceMethodImplementation)}}t.ForceMethodImplementation=ForceMethodImplementation;t.default=()=>{const e=Error().stack.split("\n")[2].trim(),t=e.startsWith("at new")?"constructor":e.split(" ")[1],n={};if(n.functionName=t,n.fullName=t,n.functionName.includes(".")){const e=n.functionName.split(".");n.className=e[0],n.functionName=e[1]}else n.isStatic=!0;throw new ForceMethodImplementation(n)}},7597:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class InstanceType{static[Symbol.hasInstance](e){let t=super[Symbol.hasInstance](e);if(e&&!e.constructor.getInstanceType)return t;if(e&&(e.instanceTypes||(e.instanceTypes=[]),t||this.getInstanceType()===e.constructor.getInstanceType()&&(t=!0),t)){const t=this.getInstanceType===InstanceType.getInstanceType?"BaseInstanceType":this.getInstanceType();-1===e.instanceTypes.indexOf(t)&&e.instanceTypes.push(t)}return!t&&e&&(t=e.instanceTypes&&Array.isArray(e.instanceTypes)&&-1!==e.instanceTypes.indexOf(this.getInstanceType())),t}constructor(){let e=new.target;const t=[];for(;e.__proto__&&e.__proto__.name;)t.push(e.__proto__),e=e.__proto__;t.reverse().forEach((e=>this instanceof e))}static getInstanceType(){elementorModules.ForceMethodImplementation()}}t.default=InstanceType},1192:e=>{"use strict";const Module=function(){const e=jQuery,t=arguments,n=this,s={};let i;const ensureClosureMethods=function(){e.each(n,(function(e){const t=n[e];"function"==typeof t&&(n[e]=function(){return t.apply(n,arguments)})}))},initSettings=function(){i=n.getDefaultSettings();const s=t[0];s&&e.extend(!0,i,s)},init=function(){n.__construct.apply(n,t),ensureClosureMethods(),initSettings(),n.trigger("init")};this.getItems=function(e,t){if(t){const n=t.split("."),s=n.splice(0,1);if(!n.length)return e[s];if(!e[s])return;return this.getItems(e[s],n.join("."))}return e},this.getSettings=function(e){return this.getItems(i,e)},this.setSettings=function(t,s,r){if(r||(r=i),"object"==typeof t)return e.extend(r,t),n;const o=t.split("."),l=o.splice(0,1);return o.length?(r[l]||(r[l]={}),n.setSettings(o.join("."),s,r[l])):(r[l]=s,n)},this.getErrorMessage=function(e,t){let n;if("forceMethodImplementation"===e)n=`The method '${t}' must to be implemented in the inheritor child.`;else n="An error occurs";return n},this.forceMethodImplementation=function(e){throw new Error(this.getErrorMessage("forceMethodImplementation",e))},this.on=function(t,i){if("object"==typeof t)return e.each(t,(function(e){n.on(e,this)})),n;return t.split(" ").forEach((function(e){s[e]||(s[e]=[]),s[e].push(i)})),n},this.off=function(e,t){if(!s[e])return n;if(!t)return delete s[e],n;const i=s[e].indexOf(t);return-1!==i&&(delete s[e][i],s[e]=s[e].filter((e=>e))),n},this.trigger=function(t){const i="on"+t[0].toUpperCase()+t.slice(1),r=Array.prototype.slice.call(arguments,1);n[i]&&n[i].apply(n,r);const o=s[t];return o?(e.each(o,(function(e,t){t.apply(n,r)})),n):n},init()};Module.prototype.__construct=function(){},Module.prototype.getDefaultSettings=function(){return{}},Module.prototype.getConstructorID=function(){return this.constructor.name},Module.extend=function(e){const t=jQuery,n=this,child=function(){return n.apply(this,arguments)};return t.extend(child,n),(child.prototype=Object.create(t.extend({},n.prototype,e))).constructor=child,child.__super__=n.prototype,child},e.exports=Module},6516:(e,t,n)=>{"use strict";var s=n(7914)(n(2640));e.exports=s.default.extend({getDefaultSettings:function(){return{container:null,items:null,columnsCount:3,verticalSpaceBetween:30}},getDefaultElements:function(){return{$container:jQuery(this.getSettings("container")),$items:jQuery(this.getSettings("items"))}},run:function(){var e=[],t=this.elements.$container.position().top,n=this.getSettings(),s=n.columnsCount;t+=parseInt(this.elements.$container.css("margin-top"),10),this.elements.$items.each((function(i){var r=Math.floor(i/s),o=jQuery(this),l=o[0].getBoundingClientRect().height+n.verticalSpaceBetween;if(r){var c=o.position(),a=i%s,u=c.top-t-e[a];u-=parseInt(o.css("margin-top"),10),u*=-1,o.css("margin-top",u+"px"),e[a]+=l}else e.push(l)}))}})},400:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class Scroll{static scrollObserver(e){let t=0;const n={root:e.root||null,rootMargin:e.offset||"0px",threshold:((e=0)=>{const t=[];if(e>0&&e<=100){const n=100/e;for(let e=0;e<=100;e+=n)t.push(e/100)}else t.push(0);return t})(e.sensitivity)};return new IntersectionObserver((function handleIntersect(n){const s=n[0].boundingClientRect.y,i=n[0].isIntersecting,r=s<t?"down":"up",o=Math.abs(parseFloat((100*n[0].intersectionRatio).toFixed(2)));e.callback({sensitivity:e.sensitivity,isInViewport:i,scrollPercentage:o,intersectionScrollDirection:r}),t=s}),n)}static getElementViewportPercentage(e,t={}){const n=e[0].getBoundingClientRect(),s=t.start||0,i=t.end||0,r=window.innerHeight*s/100,o=window.innerHeight*i/100,l=n.top-window.innerHeight,c=0-l+r,a=n.top+r+e.height()-l+o,u=Math.max(0,Math.min(c/a,1));return parseFloat((100*u).toFixed(2))}static getPageScrollPercentage(e={},t){const n=e.start||0,s=e.end||0,i=t||document.documentElement.scrollHeight-document.documentElement.clientHeight,r=i*n/100,o=i+r+i*s/100;return(document.documentElement.scrollTop+document.body.scrollTop+r)/o*100}}},2640:(e,t,n)=>{"use strict";var s=n(7914)(n(1192));e.exports=s.default.extend({elements:null,getDefaultElements:function(){return{}},bindEvents:function(){},onInit:function(){this.initElements(),this.bindEvents()},initElements:function(){this.elements=this.getDefaultElements()}})},5955:(e,t,n)=>{"use strict";var s=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(1192)),r=s(n(2640)),o=s(n(2618)),l=s(n(6516)),c=s(n(400)),a=s(n(869)),u=window.elementorModules={Module:i.default,ViewModule:r.default,ArgsObject:o.default,ForceMethodImplementation:a.default,utils:{Masonry:l.default,Scroll:c.default}};t.default=u}},e=>{var t;t=6412,e(e.s=t)}]);!function(){"use strict";function Waypoint(options){if(!options)throw new Error("No options passed to Waypoint constructor");if(!options.element)throw new Error("No element option passed to Waypoint constructor");if(!options.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+keyCounter,this.options=Waypoint.Adapter.extend({},Waypoint.defaults,options),this.element=this.options.element,this.adapter=new Waypoint.Adapter(this.element),this.callback=options.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=Waypoint.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=Waypoint.Context.findOrCreateByElement(this.options.context),Waypoint.offsetAliases[this.options.offset]&&(this.options.offset=Waypoint.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),allWaypoints[this.key]=this,keyCounter+=1}var keyCounter=0,allWaypoints={};Waypoint.prototype.queueTrigger=function(direction){this.group.queueTrigger(this,direction)},Waypoint.prototype.trigger=function(args){this.enabled&&this.callback&&this.callback.apply(this,args)},Waypoint.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete allWaypoints[this.key]},Waypoint.prototype.disable=function(){return this.enabled=!1,this},Waypoint.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},Waypoint.prototype.next=function(){return this.group.next(this)},Waypoint.prototype.previous=function(){return this.group.previous(this)},Waypoint.invokeAll=function(method){var allWaypointsArray=[];for(var waypointKey in allWaypoints)allWaypointsArray.push(allWaypoints[waypointKey]);for(var i=0,end=allWaypointsArray.length;i<end;i++)allWaypointsArray[i][method]()},Waypoint.destroyAll=function(){Waypoint.invokeAll("destroy")},Waypoint.disableAll=function(){Waypoint.invokeAll("disable")},Waypoint.enableAll=function(){Waypoint.Context.refreshAll();for(var waypointKey in allWaypoints)allWaypoints[waypointKey].enabled=!0;return this},Waypoint.refreshAll=function(){Waypoint.Context.refreshAll()},Waypoint.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},Waypoint.viewportWidth=function(){return document.documentElement.clientWidth},Waypoint.adapters=[],Waypoint.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},Waypoint.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=Waypoint}(),function(){"use strict";function requestAnimationFrameShim(callback){window.setTimeout(callback,1e3/60)}function Context(element){this.element=element,this.Adapter=Waypoint.Adapter,this.adapter=new this.Adapter(element),this.key="waypoint-context-"+keyCounter,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},element.waypointContextKey=this.key,contexts[element.waypointContextKey]=this,keyCounter+=1,Waypoint.windowContext||(Waypoint.windowContext=!0,Waypoint.windowContext=new Context(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var keyCounter=0,contexts={},Waypoint=window.Waypoint,oldWindowLoad=window.onload;Context.prototype.add=function(waypoint){var axis=waypoint.options.horizontal?"horizontal":"vertical";this.waypoints[axis][waypoint.key]=waypoint,this.refresh()},Context.prototype.checkEmpty=function(){var horizontalEmpty=this.Adapter.isEmptyObject(this.waypoints.horizontal),verticalEmpty=this.Adapter.isEmptyObject(this.waypoints.vertical),isWindow=this.element==this.element.window;horizontalEmpty&&verticalEmpty&&!isWindow&&(this.adapter.off(".waypoints"),delete contexts[this.key])},Context.prototype.createThrottledResizeHandler=function(){function resizeHandler(){self.handleResize(),self.didResize=!1}var self=this;this.adapter.on("resize.waypoints",function(){self.didResize||(self.didResize=!0,Waypoint.requestAnimationFrame(resizeHandler))})},Context.prototype.createThrottledScrollHandler=function(){function scrollHandler(){self.handleScroll(),self.didScroll=!1}var self=this;this.adapter.on("scroll.waypoints",function(){self.didScroll&&!Waypoint.isTouch||(self.didScroll=!0,Waypoint.requestAnimationFrame(scrollHandler))})},Context.prototype.handleResize=function(){Waypoint.Context.refreshAll()},Context.prototype.handleScroll=function(){var triggeredGroups={},axes={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var axisKey in axes){var axis=axes[axisKey],isForward=axis.newScroll>axis.oldScroll,direction=isForward?axis.forward:axis.backward;for(var waypointKey in this.waypoints[axisKey]){var waypoint=this.waypoints[axisKey][waypointKey];if(null!==waypoint.triggerPoint){var wasBeforeTriggerPoint=axis.oldScroll<waypoint.triggerPoint,nowAfterTriggerPoint=axis.newScroll>=waypoint.triggerPoint,crossedForward=wasBeforeTriggerPoint&&nowAfterTriggerPoint,crossedBackward=!wasBeforeTriggerPoint&&!nowAfterTriggerPoint;(crossedForward||crossedBackward)&&(waypoint.queueTrigger(direction),triggeredGroups[waypoint.group.id]=waypoint.group)}}}for(var groupKey in triggeredGroups)triggeredGroups[groupKey].flushTriggers();this.oldScroll={x:axes.horizontal.newScroll,y:axes.vertical.newScroll}},Context.prototype.innerHeight=function(){return this.element==this.element.window?Waypoint.viewportHeight():this.adapter.innerHeight()},Context.prototype.remove=function(waypoint){delete this.waypoints[waypoint.axis][waypoint.key],this.checkEmpty()},Context.prototype.innerWidth=function(){return this.element==this.element.window?Waypoint.viewportWidth():this.adapter.innerWidth()},Context.prototype.destroy=function(){var allWaypoints=[];for(var axis in this.waypoints)for(var waypointKey in this.waypoints[axis])allWaypoints.push(this.waypoints[axis][waypointKey]);for(var i=0,end=allWaypoints.length;i<end;i++)allWaypoints[i].destroy()},Context.prototype.refresh=function(){var axes,isWindow=this.element==this.element.window,contextOffset=isWindow?void 0:this.adapter.offset(),triggeredGroups={};this.handleScroll(),axes={horizontal:{contextOffset:isWindow?0:contextOffset.left,contextScroll:isWindow?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:isWindow?0:contextOffset.top,contextScroll:isWindow?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var axisKey in axes){var axis=axes[axisKey];for(var waypointKey in this.waypoints[axisKey]){var contextModifier,wasBeforeScroll,nowAfterScroll,triggeredBackward,triggeredForward,waypoint=this.waypoints[axisKey][waypointKey],adjustment=waypoint.options.offset,oldTriggerPoint=waypoint.triggerPoint,elementOffset=0,freshWaypoint=null==oldTriggerPoint;waypoint.element!==waypoint.element.window&&(elementOffset=waypoint.adapter.offset()[axis.offsetProp]),"function"==typeof adjustment?adjustment=adjustment.apply(waypoint):"string"==typeof adjustment&&(adjustment=parseFloat(adjustment),waypoint.options.offset.indexOf("%")>-1&&(adjustment=Math.ceil(axis.contextDimension*adjustment/100))),contextModifier=axis.contextScroll-axis.contextOffset,waypoint.triggerPoint=Math.floor(elementOffset+contextModifier-adjustment),wasBeforeScroll=oldTriggerPoint<axis.oldScroll,nowAfterScroll=waypoint.triggerPoint>=axis.oldScroll,triggeredBackward=wasBeforeScroll&&nowAfterScroll,triggeredForward=!wasBeforeScroll&&!nowAfterScroll,!freshWaypoint&&triggeredBackward?(waypoint.queueTrigger(axis.backward),triggeredGroups[waypoint.group.id]=waypoint.group):!freshWaypoint&&triggeredForward?(waypoint.queueTrigger(axis.forward),triggeredGroups[waypoint.group.id]=waypoint.group):freshWaypoint&&axis.oldScroll>=waypoint.triggerPoint&&(waypoint.queueTrigger(axis.forward),triggeredGroups[waypoint.group.id]=waypoint.group)}}return Waypoint.requestAnimationFrame(function(){for(var groupKey in triggeredGroups)triggeredGroups[groupKey].flushTriggers()}),this},Context.findOrCreateByElement=function(element){return Context.findByElement(element)||new Context(element)},Context.refreshAll=function(){for(var contextId in contexts)contexts[contextId].refresh()},Context.findByElement=function(element){return contexts[element.waypointContextKey]},window.onload=function(){oldWindowLoad&&oldWindowLoad(),Context.refreshAll()},Waypoint.requestAnimationFrame=function(callback){var requestFn=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||requestAnimationFrameShim;requestFn.call(window,callback)},Waypoint.Context=Context}(),function(){"use strict";function byTriggerPoint(a,b){return a.triggerPoint-b.triggerPoint}function byReverseTriggerPoint(a,b){return b.triggerPoint-a.triggerPoint}function Group(options){this.name=options.name,this.axis=options.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),groups[this.axis][this.name]=this}var groups={vertical:{},horizontal:{}},Waypoint=window.Waypoint;Group.prototype.add=function(waypoint){this.waypoints.push(waypoint)},Group.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},Group.prototype.flushTriggers=function(){for(var direction in this.triggerQueues){var waypoints=this.triggerQueues[direction],reverse="up"===direction||"left"===direction;waypoints.sort(reverse?byReverseTriggerPoint:byTriggerPoint);for(var i=0,end=waypoints.length;i<end;i+=1){var waypoint=waypoints[i];(waypoint.options.continuous||i===waypoints.length-1)&&waypoint.trigger([direction])}}this.clearTriggerQueues()},Group.prototype.next=function(waypoint){this.waypoints.sort(byTriggerPoint);var index=Waypoint.Adapter.inArray(waypoint,this.waypoints),isLast=index===this.waypoints.length-1;return isLast?null:this.waypoints[index+1]},Group.prototype.previous=function(waypoint){this.waypoints.sort(byTriggerPoint);var index=Waypoint.Adapter.inArray(waypoint,this.waypoints);return index?this.waypoints[index-1]:null},Group.prototype.queueTrigger=function(waypoint,direction){this.triggerQueues[direction].push(waypoint)},Group.prototype.remove=function(waypoint){var index=Waypoint.Adapter.inArray(waypoint,this.waypoints);index>-1&&this.waypoints.splice(index,1)},Group.prototype.first=function(){return this.waypoints[0]},Group.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},Group.findOrCreate=function(options){return groups[options.axis][options.name]||new Group(options)},Waypoint.Group=Group}(),function(){"use strict";function JQueryAdapter(element){this.$element=$(element)}var $=window.jQuery,Waypoint=window.Waypoint;$.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(i,method){JQueryAdapter.prototype[method]=function(){var args=Array.prototype.slice.call(arguments);return this.$element[method].apply(this.$element,args)}}),$.each(["extend","inArray","isEmptyObject"],function(i,method){JQueryAdapter[method]=$[method]}),Waypoint.adapters.push({name:"jquery",Adapter:JQueryAdapter}),Waypoint.Adapter=JQueryAdapter}(),function(){"use strict";function createExtension(framework){return function(){var waypoints=[],overrides=arguments[0];return framework.isFunction(arguments[0])&&(overrides=framework.extend({},arguments[1]),overrides.handler=arguments[0]),this.each(function(){var options=framework.extend({},overrides,{element:this});"string"==typeof options.context&&(options.context=framework(this).closest(options.context)[0]),waypoints.push(new Waypoint(options))}),waypoints}}var Waypoint=window.Waypoint;window.jQuery&&(window.jQuery.fn.elementorWaypoint=createExtension(window.jQuery)),window.Zepto&&(window.Zepto.fn.elementorWaypoint=createExtension(window.Zepto))}();/*! jQuery UI - v1.13.3 - 2024-04-26
* https://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-patch.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(x){"use strict";var t,e,i,n,W,C,o,s,r,l,a,h,u;function E(t,e,i){return[parseFloat(t[0])*(a.test(t[0])?e/100:1),parseFloat(t[1])*(a.test(t[1])?i/100:1)]}function L(t,e){return parseInt(x.css(t,e),10)||0}function N(t){return null!=t&&t===t.window}x.ui=x.ui||{},x.ui.version="1.13.3",
/*!
 * jQuery UI :data 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.extend(x.expr.pseudos,{data:x.expr.createPseudo?x.expr.createPseudo(function(e){return function(t){return!!x.data(t,e)}}):function(t,e,i){return!!x.data(t,i[3])}}),
/*!
 * jQuery UI Disable Selection 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.fn.extend({disableSelection:(t="onselectstart"in document.createElement("div")?"selectstart":"mousedown",function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}),enableSelection:function(){return this.off(".ui-disableSelection")}}),
/*!
 * jQuery UI Focusable 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.ui.focusable=function(t,e){var i,n,o,s=t.nodeName.toLowerCase();return"area"===s?(o=(i=t.parentNode).name,!(!t.href||!o||"map"!==i.nodeName.toLowerCase())&&0<(i=x("img[usemap='#"+o+"']")).length&&i.is(":visible")):(/^(input|select|textarea|button|object)$/.test(s)?(n=!t.disabled)&&(o=x(t).closest("fieldset")[0])&&(n=!o.disabled):n="a"===s&&t.href||e,n&&x(t).is(":visible")&&function(t){var e=t.css("visibility");for(;"inherit"===e;)t=t.parent(),e=t.css("visibility");return"visible"===e}(x(t)))},x.extend(x.expr.pseudos,{focusable:function(t){return x.ui.focusable(t,null!=x.attr(t,"tabindex"))}}),x.fn._form=function(){return"string"==typeof this[0].form?this.closest("form"):x(this[0].form)},
/*!
 * jQuery UI Form Reset Mixin 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.ui.formResetMixin={_formResetHandler:function(){var e=x(this);setTimeout(function(){var t=e.data("ui-form-reset-instances");x.each(t,function(){this.refresh()})})},_bindFormResetHandler:function(){var t;this.form=this.element._form(),this.form.length&&((t=this.form.data("ui-form-reset-instances")||[]).length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t))},_unbindFormResetHandler:function(){var t;this.form.length&&((t=this.form.data("ui-form-reset-instances")).splice(x.inArray(this,t),1),t.length?this.form.data("ui-form-reset-instances",t):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset"))}},x.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
/*!
 * jQuery UI Support for jQuery core 1.8.x and newer 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 *
 */
x.expr.pseudos||(x.expr.pseudos=x.expr[":"]),x.uniqueSort||(x.uniqueSort=x.unique),x.escapeSelector||(e=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,i=function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t},x.escapeSelector=function(t){return(t+"").replace(e,i)}),x.fn.even&&x.fn.odd||x.fn.extend({even:function(){return this.filter(function(t){return t%2==0})},odd:function(){return this.filter(function(t){return t%2==1})}}),
/*!
 * jQuery UI Keycode 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},
/*!
 * jQuery UI Labels 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.fn.labels=function(){var t,e,i;return this.length?this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(e=this.eq(0).parents("label"),(t=this.attr("id"))&&(i=(i=this.eq(0).parents().last()).add((i.length?i:this).siblings()),t="label[for='"+x.escapeSelector(t)+"']",e=e.add(i.find(t).addBack(t))),this.pushStack(e)):this.pushStack([])},x.ui.plugin={add:function(t,e,i){var n,o=x.ui[t].prototype;for(n in i)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([e,i[n]])},call:function(t,e,i,n){var o,s=t.plugins[e];if(s&&(n||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(o=0;o<s.length;o++)t.options[s[o][0]]&&s[o][1].apply(t.element,i)}},
/*!
 * jQuery UI Position 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 *
 * https://api.jqueryui.com/position/
 */
W=Math.max,C=Math.abs,o=/left|center|right/,s=/top|center|bottom/,r=/[\+\-]\d+(\.[\d]+)?%?/,l=/^\w+/,a=/%$/,h=x.fn.position,x.position={scrollbarWidth:function(){var t,e,i;return void 0!==n?n:(i=(e=x("<div style='display:block;position:absolute;width:200px;height:200px;overflow:hidden;'><div style='height:300px;width:auto;'></div></div>")).children()[0],x("body").append(e),t=i.offsetWidth,e.css("overflow","scroll"),t===(i=i.offsetWidth)&&(i=e[0].clientWidth),e.remove(),n=t-i)},getScrollInfo:function(t){var e=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),i=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),e="scroll"===e||"auto"===e&&t.width<t.element[0].scrollWidth;return{width:"scroll"===i||"auto"===i&&t.height<t.element[0].scrollHeight?x.position.scrollbarWidth():0,height:e?x.position.scrollbarWidth():0}},getWithinInfo:function(t){var e=x(t||window),i=N(e[0]),n=!!e[0]&&9===e[0].nodeType;return{element:e,isWindow:i,isDocument:n,offset:!i&&!n?x(t).offset():{left:0,top:0},scrollLeft:e.scrollLeft(),scrollTop:e.scrollTop(),width:e.outerWidth(),height:e.outerHeight()}}},x.fn.position=function(f){var c,d,p,g,m,v,y,w,b,_,t,e;return f&&f.of?(v="string"==typeof(f=x.extend({},f)).of?x(document).find(f.of):x(f.of),y=x.position.getWithinInfo(f.within),w=x.position.getScrollInfo(y),b=(f.collision||"flip").split(" "),_={},e=9===(e=(t=v)[0]).nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:N(e)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:e.preventDefault?{width:0,height:0,offset:{top:e.pageY,left:e.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()},v[0].preventDefault&&(f.at="left top"),d=e.width,p=e.height,m=x.extend({},g=e.offset),x.each(["my","at"],function(){var t,e,i=(f[this]||"").split(" ");(i=1===i.length?o.test(i[0])?i.concat(["center"]):s.test(i[0])?["center"].concat(i):["center","center"]:i)[0]=o.test(i[0])?i[0]:"center",i[1]=s.test(i[1])?i[1]:"center",t=r.exec(i[0]),e=r.exec(i[1]),_[this]=[t?t[0]:0,e?e[0]:0],f[this]=[l.exec(i[0])[0],l.exec(i[1])[0]]}),1===b.length&&(b[1]=b[0]),"right"===f.at[0]?m.left+=d:"center"===f.at[0]&&(m.left+=d/2),"bottom"===f.at[1]?m.top+=p:"center"===f.at[1]&&(m.top+=p/2),c=E(_.at,d,p),m.left+=c[0],m.top+=c[1],this.each(function(){var i,t,r=x(this),l=r.outerWidth(),a=r.outerHeight(),e=L(this,"marginLeft"),n=L(this,"marginTop"),o=l+e+L(this,"marginRight")+w.width,s=a+n+L(this,"marginBottom")+w.height,h=x.extend({},m),u=E(_.my,r.outerWidth(),r.outerHeight());"right"===f.my[0]?h.left-=l:"center"===f.my[0]&&(h.left-=l/2),"bottom"===f.my[1]?h.top-=a:"center"===f.my[1]&&(h.top-=a/2),h.left+=u[0],h.top+=u[1],i={marginLeft:e,marginTop:n},x.each(["left","top"],function(t,e){x.ui.position[b[t]]&&x.ui.position[b[t]][e](h,{targetWidth:d,targetHeight:p,elemWidth:l,elemHeight:a,collisionPosition:i,collisionWidth:o,collisionHeight:s,offset:[c[0]+u[0],c[1]+u[1]],my:f.my,at:f.at,within:y,elem:r})}),f.using&&(t=function(t){var e=g.left-h.left,i=e+d-l,n=g.top-h.top,o=n+p-a,s={target:{element:v,left:g.left,top:g.top,width:d,height:p},element:{element:r,left:h.left,top:h.top,width:l,height:a},horizontal:i<0?"left":0<e?"right":"center",vertical:o<0?"top":0<n?"bottom":"middle"};d<l&&C(e+i)<d&&(s.horizontal="center"),p<a&&C(n+o)<p&&(s.vertical="middle"),W(C(e),C(i))>W(C(n),C(o))?s.important="horizontal":s.important="vertical",f.using.call(this,t,s)}),r.offset(x.extend(h,{using:t}))})):h.apply(this,arguments)},x.ui.position={fit:{left:function(t,e){var i,n=e.within,o=n.isWindow?n.scrollLeft:n.offset.left,n=n.width,s=t.left-e.collisionPosition.marginLeft,r=o-s,l=s+e.collisionWidth-n-o;n<e.collisionWidth?0<r&&l<=0?(i=t.left+r+e.collisionWidth-n-o,t.left+=r-i):t.left=!(0<l&&r<=0)&&l<r?o+n-e.collisionWidth:o:0<r?t.left+=r:0<l?t.left-=l:t.left=W(t.left-s,t.left)},top:function(t,e){var i,n=e.within,n=n.isWindow?n.scrollTop:n.offset.top,o=e.within.height,s=t.top-e.collisionPosition.marginTop,r=n-s,l=s+e.collisionHeight-o-n;o<e.collisionHeight?0<r&&l<=0?(i=t.top+r+e.collisionHeight-o-n,t.top+=r-i):t.top=!(0<l&&r<=0)&&l<r?n+o-e.collisionHeight:n:0<r?t.top+=r:0<l?t.top-=l:t.top=W(t.top-s,t.top)}},flip:{left:function(t,e){var i=e.within,n=i.offset.left+i.scrollLeft,o=i.width,i=i.isWindow?i.scrollLeft:i.offset.left,s=t.left-e.collisionPosition.marginLeft,r=s-i,s=s+e.collisionWidth-o-i,l="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,a="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,h=-2*e.offset[0];r<0?((o=t.left+l+a+h+e.collisionWidth-o-n)<0||o<C(r))&&(t.left+=l+a+h):0<s&&(0<(n=t.left-e.collisionPosition.marginLeft+l+a+h-i)||C(n)<s)&&(t.left+=l+a+h)},top:function(t,e){var i=e.within,n=i.offset.top+i.scrollTop,o=i.height,i=i.isWindow?i.scrollTop:i.offset.top,s=t.top-e.collisionPosition.marginTop,r=s-i,s=s+e.collisionHeight-o-i,l="top"===e.my[1]?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,a="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,h=-2*e.offset[1];r<0?((o=t.top+l+a+h+e.collisionHeight-o-n)<0||o<C(r))&&(t.top+=l+a+h):0<s&&(0<(n=t.top-e.collisionPosition.marginTop+l+a+h-i)||C(n)<s)&&(t.top+=l+a+h)}},flipfit:{left:function(){x.ui.position.flip.left.apply(this,arguments),x.ui.position.fit.left.apply(this,arguments)},top:function(){x.ui.position.flip.top.apply(this,arguments),x.ui.position.fit.top.apply(this,arguments)}}},x.ui.safeActiveElement=function(e){var i;try{i=e.activeElement}catch(t){i=e.body}return i=(i=i||e.body).nodeName?i:e.body},x.ui.safeBlur=function(t){t&&"body"!==t.nodeName.toLowerCase()&&x(t).trigger("blur")},
/*!
 * jQuery UI Scroll Parent 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.fn.scrollParent=function(t){var e=this.css("position"),i="absolute"===e,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,t=this.parents().filter(function(){var t=x(this);return(!i||"static"!==t.css("position"))&&n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==e&&t.length?t:x(this[0].ownerDocument||document)},
/*!
 * jQuery UI Tabbable 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.extend(x.expr.pseudos,{tabbable:function(t){var e=x.attr(t,"tabindex"),i=null!=e;return(!i||0<=e)&&x.ui.focusable(t,i)}}),
/*!
 * jQuery UI Unique ID 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
x.fn.extend({uniqueId:(u=0,function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++u)})}),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&x(this).removeAttr("id")})}});
/*!
 * jQuery UI Widget 1.13.3
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
var f,c=0,d=Array.prototype.hasOwnProperty,p=Array.prototype.slice;x.cleanData=(f=x.cleanData,function(t){for(var e,i,n=0;null!=(i=t[n]);n++)(e=x._data(i,"events"))&&e.remove&&x(i).triggerHandler("remove");f(t)}),x.widget=function(t,i,e){var n,o,s,r={},l=t.split(".")[0],a=l+"-"+(t=t.split(".")[1]);return e||(e=i,i=x.Widget),Array.isArray(e)&&(e=x.extend.apply(null,[{}].concat(e))),x.expr.pseudos[a.toLowerCase()]=function(t){return!!x.data(t,a)},x[l]=x[l]||{},n=x[l][t],o=x[l][t]=function(t,e){if(!this||!this._createWidget)return new o(t,e);arguments.length&&this._createWidget(t,e)},x.extend(o,n,{version:e.version,_proto:x.extend({},e),_childConstructors:[]}),(s=new i).options=x.widget.extend({},s.options),x.each(e,function(e,n){function o(){return i.prototype[e].apply(this,arguments)}function s(t){return i.prototype[e].apply(this,t)}r[e]="function"!=typeof n?n:function(){var t,e=this._super,i=this._superApply;return this._super=o,this._superApply=s,t=n.apply(this,arguments),this._super=e,this._superApply=i,t}}),o.prototype=x.widget.extend(s,{widgetEventPrefix:n&&s.widgetEventPrefix||t},r,{constructor:o,namespace:l,widgetName:t,widgetFullName:a}),n?(x.each(n._childConstructors,function(t,e){var i=e.prototype;x.widget(i.namespace+"."+i.widgetName,o,e._proto)}),delete n._childConstructors):i._childConstructors.push(o),x.widget.bridge(t,o),o},x.widget.extend=function(t){for(var e,i,n=p.call(arguments,1),o=0,s=n.length;o<s;o++)for(e in n[o])i=n[o][e],d.call(n[o],e)&&void 0!==i&&(x.isPlainObject(i)?t[e]=x.isPlainObject(t[e])?x.widget.extend({},t[e],i):x.widget.extend({},i):t[e]=i);return t},x.widget.bridge=function(s,e){var r=e.prototype.widgetFullName||s;x.fn[s]=function(i){var t="string"==typeof i,n=p.call(arguments,1),o=this;return t?this.length||"instance"!==i?this.each(function(){var t,e=x.data(this,r);return"instance"===i?(o=e,!1):e?"function"!=typeof e[i]||"_"===i.charAt(0)?x.error("no such method '"+i+"' for "+s+" widget instance"):(t=e[i].apply(e,n))!==e&&void 0!==t?(o=t&&t.jquery?o.pushStack(t.get()):t,!1):void 0:x.error("cannot call methods on "+s+" prior to initialization; attempted to call method '"+i+"'")}):o=void 0:(n.length&&(i=x.widget.extend.apply(null,[i].concat(n))),this.each(function(){var t=x.data(this,r);t?(t.option(i||{}),t._init&&t._init()):x.data(this,r,new e(i,this))})),o}},x.Widget=function(){},x.Widget._childConstructors=[],x.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(t,e){e=x(e||this.defaultElement||this)[0],this.element=x(e),this.uuid=c++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=x(),this.hoverable=x(),this.focusable=x(),this.classesElementLookup={},e!==this&&(x.data(e,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===e&&this.destroy()}}),this.document=x(e.style?e.ownerDocument:e.document||e),this.window=x(this.document[0].defaultView||this.document[0].parentWindow)),this.options=x.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:x.noop,_create:x.noop,_init:x.noop,destroy:function(){var i=this;this._destroy(),x.each(this.classesElementLookup,function(t,e){i._removeClass(e,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:x.noop,widget:function(){return this.element},option:function(t,e){var i,n,o,s=t;if(0===arguments.length)return x.widget.extend({},this.options);if("string"==typeof t)if(s={},t=(i=t.split(".")).shift(),i.length){for(n=s[t]=x.widget.extend({},this.options[t]),o=0;o<i.length-1;o++)n[i[o]]=n[i[o]]||{},n=n[i[o]];if(t=i.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=e}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];s[t]=e}return this._setOptions(s),this},_setOptions:function(t){for(var e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(t){var e,i,n;for(e in t)n=this.classesElementLookup[e],t[e]!==this.options.classes[e]&&n&&n.length&&(i=x(n.get()),this._removeClass(n,e),i.addClass(this._classes({element:i,keys:e,classes:t,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(o){var s=[],r=this;function t(t,e){for(var i,n=0;n<t.length;n++)i=r.classesElementLookup[t[n]]||x(),i=o.add?(function(){var i=[];o.element.each(function(t,e){x.map(r.classesElementLookup,function(t){return t}).some(function(t){return t.is(e)})||i.push(e)}),r._on(x(i),{remove:"_untrackClassesElement"})}(),x(x.uniqueSort(i.get().concat(o.element.get())))):x(i.not(o.element).get()),r.classesElementLookup[t[n]]=i,s.push(t[n]),e&&o.classes[t[n]]&&s.push(o.classes[t[n]])}return(o=x.extend({element:this.element,classes:this.options.classes||{}},o)).keys&&t(o.keys.match(/\S+/g)||[],!0),o.extra&&t(o.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(i){var n=this;x.each(n.classesElementLookup,function(t,e){-1!==x.inArray(i.target,e)&&(n.classesElementLookup[t]=x(e.not(i.target).get()))}),this._off(x(i.target))},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,n){var o="string"==typeof t||null===t,e={extra:o?e:i,keys:o?t:e,element:o?this.element:t,add:n="boolean"==typeof n?n:i};return e.element.toggleClass(this._classes(e),n),this},_on:function(o,s,t){var r,l=this;"boolean"!=typeof o&&(t=s,s=o,o=!1),t?(s=r=x(s),this.bindings=this.bindings.add(s)):(t=s,s=this.element,r=this.widget()),x.each(t,function(t,e){function i(){if(o||!0!==l.options.disabled&&!x(this).hasClass("ui-state-disabled"))return("string"==typeof e?l[e]:e).apply(l,arguments)}"string"!=typeof e&&(i.guid=e.guid=e.guid||i.guid||x.guid++);var t=t.match(/^([\w:-]*)\s*(.*)$/),n=t[1]+l.eventNamespace,t=t[2];t?r.on(n,t,i):s.on(n,i)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.off(e),this.bindings=x(this.bindings.not(t).get()),this.focusable=x(this.focusable.not(t).get()),this.hoverable=x(this.hoverable.not(t).get())},_delay:function(t,e){var i=this;return setTimeout(function(){return("string"==typeof t?i[t]:t).apply(i,arguments)},e||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){this._addClass(x(t.currentTarget),null,"ui-state-hover")},mouseleave:function(t){this._removeClass(x(t.currentTarget),null,"ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){this._addClass(x(t.currentTarget),null,"ui-state-focus")},focusout:function(t){this._removeClass(x(t.currentTarget),null,"ui-state-focus")}})},_trigger:function(t,e,i){var n,o,s=this.options[t];if(i=i||{},(e=x.Event(e)).type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),e.target=this.element[0],o=e.originalEvent)for(n in o)n in e||(e[n]=o[n]);return this.element.trigger(e,i),!("function"==typeof s&&!1===s.apply(this.element[0],[e].concat(i))||e.isDefaultPrevented())}},x.each({show:"fadeIn",hide:"fadeOut"},function(s,r){x.Widget.prototype["_"+s]=function(e,t,i){var n,o=(t="string"==typeof t?{effect:t}:t)?!0!==t&&"number"!=typeof t&&t.effect||r:s;"number"==typeof(t=t||{})?t={duration:t}:!0===t&&(t={}),n=!x.isEmptyObject(t),t.complete=i,t.delay&&e.delay(t.delay),n&&x.effects&&x.effects.effect[o]?e[s](t):o!==s&&e[o]?e[o](t.duration,t.easing,i):e.queue(function(t){x(this)[s](),i&&i.call(e[0]),t()})}})});/*! elementor - v3.6.5 - 27-04-2022 */
"use strict";(self.webpackChunkelementor=self.webpackChunkelementor||[]).push([[819],{9220:(e,t,n)=>{var i=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(n(8135));class _default extends elementorModules.ViewModule{constructor(...e){super(...e),this.documents={},this.initDocumentClasses(),this.attachDocumentsClasses()}getDefaultSettings(){return{selectors:{document:".elementor"}}}getDefaultElements(){const e=this.getSettings("selectors");return{$documents:jQuery(e.document)}}initDocumentClasses(){this.documentClasses={base:s.default},elementorFrontend.hooks.doAction("elementor/frontend/documents-manager/init-classes",this)}addDocumentClass(e,t){this.documentClasses[e]=t}attachDocumentsClasses(){this.elements.$documents.each(((e,t)=>this.attachDocumentClass(jQuery(t))))}attachDocumentClass(e){const t=e.data(),n=t.elementorId,i=t.elementorType,s=this.documentClasses[i]||this.documentClasses.base;this.documents[n]=new s({$element:e,id:n})}}t.default=_default},9804:(e,t,n)=>{var i=n(7914),s=i(n(6397)),o=i(n(8704)),r=i(n(4985)),a=i(n(7537)),l=i(n(355)),d=i(n(2804)),c=i(n(3384));e.exports=function(e){const t={};this.elementsHandlers={"accordion.default":()=>n.e(209).then(n.bind(n,8470)),"alert.default":()=>n.e(745).then(n.bind(n,9269)),"counter.default":()=>n.e(120).then(n.bind(n,7884)),"progress.default":()=>n.e(192).then(n.bind(n,1351)),"tabs.default":()=>n.e(520).then(n.bind(n,9459)),"toggle.default":()=>n.e(181).then(n.bind(n,2)),"video.default":()=>n.e(791).then(n.bind(n,5363)),"image-carousel.default":()=>n.e(268).then(n.bind(n,5914)),"text-editor.default":()=>n.e(357).then(n.bind(n,1327)),"wp-widget-media_audio.default":()=>n.e(52).then(n.bind(n,7602))};const addElementsHandlers=()=>{this.elementsHandlers.section=[d.default,...o.default,l.default,c.default],this.elementsHandlers.container=[...o.default],elementorFrontend.isEditMode()&&this.elementsHandlers.container.push(...r.default),this.elementsHandlers.column=a.default,e.each(this.elementsHandlers,((e,t)=>{const n=e.split(".");e=n[0];const i=n[1]||null;this.attachHandler(e,t,i)}))},isClassHandler=e=>{var t;return null===(t=e.prototype)||void 0===t?void 0:t.getUniqueHandlerID},addHandlerWithHook=(e,t,n="default")=>{n=n?"."+n:"",elementorFrontend.hooks.addAction(`frontend/element_ready/${e}${n}`,(e=>{if(isClassHandler(t))this.addHandler(t,{$element:e},!0);else{const n=t();if(!n)return;n instanceof Promise?n.then((({default:t})=>{this.addHandler(t,{$element:e},!0)})):this.addHandler(n,{$element:e},!0)}}))};this.addHandler=function(e,n){const i=n.$element.data("model-cid");let s;if(i){s=e.prototype.getConstructorID(),t[i]||(t[i]={});const n=t[i][s];n&&n.onDestroy()}const o=new e(n);i&&(t[i][s]=o)},this.attachHandler=(e,t,n)=>{Array.isArray(t)||(t=[t]),t.forEach((t=>addHandlerWithHook(e,t,n)))},this.getHandler=function(e){const t=this.elementsHandlers[e];return isClassHandler(t)?t:new Promise((e=>{t().then((({default:t})=>{e(t)}))}))},this.getHandlers=function(e){return elementorCommon.helpers.softDeprecated("getHandlers","3.1.0","elementorFrontend.elementsHandler.getHandler"),e?this.getHandler(e):this.elementsHandlers},this.runReadyTrigger=function(t){if(elementorFrontend.config.is_static)return;const n=jQuery(t),i=n.attr("data-element_type");if(i&&(elementorFrontend.hooks.doAction("frontend/element_ready/global",n,e),elementorFrontend.hooks.doAction(`frontend/element_ready/${i}`,n,e),"widget"===i)){const t=n.attr("data-widget_type");elementorFrontend.hooks.doAction(`frontend/element_ready/${t}`,n,e)}},this.init=()=>{elementorFrontend.hooks.addAction("frontend/element_ready/global",s.default),addElementsHandlers()}}},5654:(e,t,n)=>{var i=n(7914);n(59);var s=i(n(9220)),o=i(n(5107)),r=i(n(3308)),a=i(n(1604)),l=i(n(1911)),d=i(n(4773)),c=i(n(2064)),u=i(n(8628)),h=i(n(8646)),m=i(n(6866)),g=i(n(4375)),p=i(n(6404)),f=i(n(6046)),v=n(6028);const b=n(9469),y=n(9804),_=n(3346);class Frontend extends elementorModules.ViewModule{constructor(...e){super(...e),this.config=elementorFrontendConfig,this.config.legacyMode={get elementWrappers(){return elementorFrontend.isEditMode()&&elementorCommon.helpers.hardDeprecated("elementorFrontend.config.legacyMode.elementWrappers","3.1.0","elementorFrontend.config.experimentalFeatures.e_dom_optimization"),!elementorFrontend.config.experimentalFeatures.e_dom_optimization}},this.populateActiveBreakpointsConfig()}get Module(){return this.isEditMode()&&parent.elementorCommon.helpers.hardDeprecated("elementorFrontend.Module","2.5.0","elementorModules.frontend.handlers.Base"),elementorModules.frontend.handlers.Base}getDefaultSettings(){return{selectors:{elementor:".elementor",adminBar:"#wpadminbar"}}}getDefaultElements(){const e={window,$window:jQuery(window),$document:jQuery(document),$head:jQuery(document.head),$body:jQuery(document.body),$deviceMode:jQuery("<span>",{id:"elementor-device-mode",class:"elementor-screen-only"})};return e.$body.append(e.$deviceMode),e}bindEvents(){this.elements.$window.on("resize",(()=>this.setDeviceModeData()))}getElements(e){return this.getItems(this.elements,e)}getPageSettings(e){const t=this.isEditMode()?elementor.settings.page.model.attributes:this.config.settings.page;return this.getItems(t,e)}getGeneralSettings(e){return this.isEditMode()&&parent.elementorCommon.helpers.softDeprecated("getGeneralSettings","3.0.0","getKitSettings and remove the `elementor_` prefix"),this.getKitSettings(`elementor_${e}`)}getKitSettings(e){return this.getItems(this.config.kit,e)}getCurrentDeviceMode(){return getComputedStyle(this.elements.$deviceMode[0],":after").content.replace(/"/g,"")}getDeviceSetting(e,t,n){if("widescreen"===e)return this.getWidescreenSetting(t,n);const i=elementorFrontend.breakpoints.getActiveBreakpointsList({largeToSmall:!0,withDesktop:!0});let s=i.indexOf(e);for(;s>0;){const e=t[n+"_"+i[s]];if(e||0===e)return e;s--}return t[n]}getWidescreenSetting(e,t){const n=t+"_widescreen";let i;return i=e[n]?e[n]:e[t],i}getCurrentDeviceSetting(e,t){return this.getDeviceSetting(elementorFrontend.getCurrentDeviceMode(),e,t)}isEditMode(){return this.config.environmentMode.edit}isWPPreviewMode(){return this.config.environmentMode.wpPreview}initDialogsManager(){let e;this.getDialogsManager=()=>(e||(e=new DialogsManager.Instance),e)}initOnReadyComponents(){this.utils={youtube:new a.default,vimeo:new l.default,baseVideoLoader:new d.default,anchors:new _,get lightbox(){return h.default.getLightbox()},urlActions:new c.default,swiper:u.default,environment:r.default,assetsLoader:new m.default,escapeHTML:v.escapeHTML},this.modules={StretchElement:elementorModules.frontend.tools.StretchElement,Masonry:elementorModules.utils.Masonry},this.elementsHandler.init(),this.isEditMode()?elementor.once("document:loaded",(()=>this.onDocumentLoaded())):this.onDocumentLoaded()}initOnReadyElements(){this.elements.$wpAdminBar=this.elements.$document.find(this.getSettings("selectors.adminBar"))}addUserAgentClasses(){for(const[e,t]of Object.entries(r.default))t&&this.elements.$body.addClass("e--ua-"+e)}setDeviceModeData(){this.elements.$body.attr("data-elementor-device-mode",this.getCurrentDeviceMode())}addListenerOnce(e,t,n,i){if(i||(i=this.elements.$window),this.isEditMode())if(this.removeListeners(e,t,i),i instanceof jQuery){const s=t+"."+e;i.on(s,n)}else i.on(t,n,e);else i.on(t,n)}removeListeners(e,t,n,i){if(i||(i=this.elements.$window),i instanceof jQuery){const s=t+"."+e;i.off(s,n)}else i.off(t,n,e)}debounce(e,t){let n;return function(){const i=this,s=arguments,later=()=>{n=null,e.apply(i,s)},o=!n;clearTimeout(n),n=setTimeout(later,t),o&&e.apply(i,s)}}waypoint(e,t,n){n=jQuery.extend({offset:"100%",triggerOnce:!0},n);return e.elementorWaypoint((function(){const e=this.element||this,i=t.apply(e,arguments);return n.triggerOnce&&this.destroy&&this.destroy(),i}),n)}muteMigrationTraces(){jQuery.migrateMute=!0,jQuery.migrateTrace=!1}initModules(){const e={shapes:f.default};elementorFrontend.trigger("elementor/modules/init:before"),elementorFrontend.trigger("elementor/modules/init/before"),Object.entries(e).forEach((([e,t])=>{this.modulesHandlers[e]=new t}))}populateActiveBreakpointsConfig(){this.config.responsive.activeBreakpoints={},Object.entries(this.config.responsive.breakpoints).forEach((([e,t])=>{t.is_enabled&&(this.config.responsive.activeBreakpoints[e]=t)}))}init(){this.hooks=new b,this.breakpoints=new g.default(this.config.responsive),this.storage=new o.default,this.elementsHandler=new y(jQuery),this.modulesHandlers={},this.addUserAgentClasses(),this.setDeviceModeData(),this.initDialogsManager(),this.isEditMode()&&this.muteMigrationTraces(),p.default.dispatch(this.elements.$window,"elementor/frontend/init"),this.initModules(),this.initOnReadyElements(),this.initOnReadyComponents()}onDocumentLoaded(){this.documentsManager=new s.default,this.trigger("components:init"),new h.default}}window.elementorFrontend=new Frontend,elementorFrontend.isEditMode()||jQuery((()=>elementorFrontend.init()))},4058:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class BackgroundSlideshow extends elementorModules.frontend.handlers.SwiperBase{getDefaultSettings(){return{classes:{swiperContainer:"elementor-background-slideshow swiper-container",swiperWrapper:"swiper-wrapper",swiperSlide:"elementor-background-slideshow__slide swiper-slide",swiperPreloader:"swiper-lazy-preloader",slideBackground:"elementor-background-slideshow__slide__image",kenBurns:"elementor-ken-burns",kenBurnsActive:"elementor-ken-burns--active",kenBurnsIn:"elementor-ken-burns--in",kenBurnsOut:"elementor-ken-burns--out"}}}getSwiperOptions(){const e=this.getElementSettings(),t={grabCursor:!1,slidesPerView:1,slidesPerGroup:1,loop:"yes"===e.background_slideshow_loop,speed:e.background_slideshow_transition_duration,autoplay:{delay:e.background_slideshow_slide_duration,stopOnLastSlide:!e.background_slideshow_loop},handleElementorBreakpoints:!0,on:{slideChange:()=>{e.background_slideshow_ken_burns&&this.handleKenBurns()}}};switch("yes"===e.background_slideshow_loop&&(t.loopedSlides=this.getSlidesCount()),e.background_slideshow_slide_transition){case"fade":t.effect="fade",t.fadeEffect={crossFade:!0};break;case"slide_down":t.autoplay.reverseDirection=!0;case"slide_up":t.direction="vertical"}return"yes"===e.background_slideshow_lazyload&&(t.lazy={loadPrevNext:!0,loadPrevNextAmount:1}),t}buildSwiperElements(){const e=this.getSettings("classes"),t=this.getElementSettings(),n="slide_left"===t.background_slideshow_slide_transition?"ltr":"rtl",i=jQuery("<div>",{class:e.swiperContainer,dir:n}),s=jQuery("<div>",{class:e.swiperWrapper}),o=t.background_slideshow_ken_burns,r="yes"===t.background_slideshow_lazyload;let a=e.slideBackground;if(o){a+=" "+e.kenBurns;const n="in"===t.background_slideshow_ken_burns_zoom_direction?"kenBurnsIn":"kenBurnsOut";a+=" "+e[n]}r&&(a+=" swiper-lazy"),this.elements.$slides=jQuery(),t.background_slideshow_gallery.forEach((t=>{const n=jQuery("<div>",{class:e.swiperSlide});let i;if(r){const n=jQuery("<div>",{class:e.swiperPreloader});i=jQuery("<div>",{class:a,"data-background":t.url}),i.append(n)}else i=jQuery("<div>",{class:a,style:'background-image: url("'+t.url+'");'});n.append(i),s.append(n),this.elements.$slides=this.elements.$slides.add(n)})),i.append(s),this.$element.prepend(i),this.elements.$backgroundSlideShowContainer=i}async initSlider(){if(1>=this.getSlidesCount())return;const e=this.getElementSettings(),t=elementorFrontend.utils.swiper;this.swiper=await new t(this.elements.$backgroundSlideShowContainer,this.getSwiperOptions()),this.elements.$backgroundSlideShowContainer.data("swiper",this.swiper),e.background_slideshow_ken_burns&&this.handleKenBurns()}activate(){this.buildSwiperElements(),this.initSlider()}deactivate(){this.swiper&&(this.swiper.destroy(),this.elements.$backgroundSlideShowContainer.remove())}run(){"slideshow"===this.getElementSettings("background_background")?this.activate():this.deactivate()}onInit(){super.onInit(),this.getElementSettings("background_slideshow_gallery")&&this.run()}onDestroy(){super.onDestroy(),this.deactivate()}onElementChange(e){"background_background"===e&&this.run()}}t.default=BackgroundSlideshow},9501:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class BackgroundVideo extends elementorModules.frontend.handlers.Base{getDefaultSettings(){return{selectors:{backgroundVideoContainer:".elementor-background-video-container",backgroundVideoEmbed:".elementor-background-video-embed",backgroundVideoHosted:".elementor-background-video-hosted"}}}getDefaultElements(){const e=this.getSettings("selectors"),t={$backgroundVideoContainer:this.$element.find(e.backgroundVideoContainer)};return t.$backgroundVideoEmbed=t.$backgroundVideoContainer.children(e.backgroundVideoEmbed),t.$backgroundVideoHosted=t.$backgroundVideoContainer.children(e.backgroundVideoHosted),t}calcVideosSize(e){let t="16:9";"vimeo"===this.videoType&&(t=e[0].width+":"+e[0].height);const n=this.elements.$backgroundVideoContainer.outerWidth(),i=this.elements.$backgroundVideoContainer.outerHeight(),s=t.split(":"),o=s[0]/s[1],r=n/i>o;return{width:r?n:i*o,height:r?n/o:i}}changeVideoSize(){if("hosted"!==this.videoType&&!this.player)return;let e;if("youtube"===this.videoType?e=jQuery(this.player.getIframe()):"vimeo"===this.videoType?e=jQuery(this.player.element):"hosted"===this.videoType&&(e=this.elements.$backgroundVideoHosted),!e)return;const t=this.calcVideosSize(e);e.width(t.width).height(t.height)}startVideoLoop(e){if(!this.player.getIframe().contentWindow)return;const t=this.getElementSettings(),n=t.background_video_start||0,i=t.background_video_end;if(!t.background_play_once||e){if(this.player.seekTo(n),i){setTimeout((()=>{this.startVideoLoop(!1)}),1e3*(i-n+1))}}else this.player.stopVideo()}prepareVimeoVideo(e,t){const n=this.getElementSettings(),i={url:t,width:this.elements.$backgroundVideoContainer.outerWidth().width,autoplay:!0,loop:!n.background_play_once,transparent:!1,background:!0,muted:!0};this.player=new e.Player(this.elements.$backgroundVideoContainer,i),this.handleVimeoStartEndTimes(n),this.player.ready().then((()=>{jQuery(this.player.element).addClass("elementor-background-video-embed"),this.changeVideoSize()}))}handleVimeoStartEndTimes(e){e.background_video_start&&this.player.on("play",(t=>{0===t.seconds&&this.player.setCurrentTime(e.background_video_start)})),this.player.on("timeupdate",(t=>{e.background_video_end&&e.background_video_end<t.seconds&&(e.background_play_once?this.player.pause():this.player.setCurrentTime(e.background_video_start)),this.player.getDuration().then((n=>{e.background_video_start&&!e.background_video_end&&t.seconds>n-.5&&this.player.setCurrentTime(e.background_video_start)}))}))}prepareYTVideo(e,t){const n=this.elements.$backgroundVideoContainer,i=this.getElementSettings();let s=e.PlayerState.PLAYING;window.chrome&&(s=e.PlayerState.UNSTARTED);const o={videoId:t,events:{onReady:()=>{this.player.mute(),this.changeVideoSize(),this.startVideoLoop(!0),this.player.playVideo()},onStateChange:t=>{switch(t.data){case s:n.removeClass("elementor-invisible elementor-loading");break;case e.PlayerState.ENDED:this.player.seekTo(i.background_video_start||0),i.background_play_once&&this.player.destroy()}}},playerVars:{controls:0,rel:0,playsinline:1}};i.background_privacy_mode&&(o.host="https://www.youtube-nocookie.com",o.origin=window.location.hostname),n.addClass("elementor-loading elementor-invisible"),this.player=new e.Player(this.elements.$backgroundVideoEmbed[0],o)}activate(){let e,t=this.getElementSettings("background_video_link");const n=this.getElementSettings("background_play_once");if(-1!==t.indexOf("vimeo.com")?(this.videoType="vimeo",this.apiProvider=elementorFrontend.utils.vimeo):t.match(/^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com)/)&&(this.videoType="youtube",this.apiProvider=elementorFrontend.utils.youtube),this.apiProvider)e=this.apiProvider.getVideoIDFromURL(t),this.apiProvider.onApiReady((n=>{"youtube"===this.videoType&&this.prepareYTVideo(n,e),"vimeo"===this.videoType&&this.prepareVimeoVideo(n,t)}));else{this.videoType="hosted";const e=this.getElementSettings("background_video_start"),i=this.getElementSettings("background_video_end");(e||i)&&(t+="#t="+(e||0)+(i?","+i:"")),this.elements.$backgroundVideoHosted.attr("src",t).one("canplay",this.changeVideoSize.bind(this)),n&&this.elements.$backgroundVideoHosted.on("ended",(()=>{this.elements.$backgroundVideoHosted.hide()}))}elementorFrontend.elements.$window.on("resize",this.changeVideoSize)}deactivate(){"youtube"===this.videoType&&this.player.getIframe()||"vimeo"===this.videoType?this.player.destroy():this.elements.$backgroundVideoHosted.removeAttr("src").off("ended"),elementorFrontend.elements.$window.off("resize",this.changeVideoSize)}run(){const e=this.getElementSettings();(e.background_play_on_mobile||"mobile"!==elementorFrontend.getCurrentDeviceMode())&&("video"===e.background_background&&e.background_video_link?this.activate():this.deactivate())}onInit(...e){super.onInit(...e),this.changeVideoSize=this.changeVideoSize.bind(this),this.run()}onElementChange(e){"background_background"===e&&this.run()}}t.default=BackgroundVideo},8704:(e,t,n)=>{var i=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(n(4058)),o=i(n(9501)),r=[s.default,o.default];t.default=r},7537:(e,t,n)=>{var i=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=[i(n(4058)).default];t.default=s},4985:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=[()=>n.e(413).then(n.bind(n,2929)),()=>n.e(413).then(n.bind(n,343))];t.default=i},6397:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class GlobalHandler extends elementorModules.frontend.handlers.Base{getWidgetType(){return"global"}animate(){const e=this.$element,t=this.getAnimation();if("none"===t)return void e.removeClass("elementor-invisible");const n=this.getElementSettings(),i=n._animation_delay||n.animation_delay||0;e.removeClass(t),this.currentAnimation&&e.removeClass(this.currentAnimation),this.currentAnimation=t,setTimeout((()=>{e.removeClass("elementor-invisible").addClass("animated "+t)}),i)}getAnimation(){return this.getCurrentDeviceSetting("animation")||this.getCurrentDeviceSetting("_animation")}onInit(...e){if(super.onInit(...e),this.getAnimation()){const e=elementorModules.utils.Scroll.scrollObserver({callback:t=>{t.isInViewport&&(this.animate(),e.unobserve(this.$element[0]))}});e.observe(this.$element[0])}}onElementChange(e){/^_?animation/.test(e)&&this.animate()}}t.default=e=>{elementorFrontend.elementsHandler.addHandler(GlobalHandler,{$element:e})}},355:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class HandlesPosition extends elementorModules.frontend.handlers.Base{isActive(){return elementorFrontend.isEditMode()}isFirstSection(){return this.$element[0]===document.querySelector(".elementor-edit-mode .elementor-top-section")}isOverflowHidden(){return"hidden"===this.$element.css("overflow")}getOffset(){if("body"===elementor.config.document.container)return this.$element.offset().top;const e=jQuery(elementor.config.document.container);return this.$element.offset().top-e.offset().top}setHandlesPosition(){const e=elementor.documents.getCurrent();if(!e||!e.container.isEditable())return;const t="elementor-section--handles-inside",n=this.$element.find("> .elementor-element-overlay > .elementor-editor-section-settings");if(elementor.settings.page.model.attributes.scroll_snap)return void this.$element.addClass(t);const i=this.isOverflowHidden();if(!i&&!this.isFirstSection())return;const s=i?0:this.getOffset();s<25?(this.$element.addClass(t),s<-5?n.css("top",-s):n.css("top","")):this.$element.removeClass(t)}onInit(){this.isActive()&&(this.setHandlesPosition(),this.$element.on("mouseenter",this.setHandlesPosition.bind(this)))}}t.default=HandlesPosition},3384:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class Shapes extends elementorModules.frontend.handlers.Base{getDefaultSettings(){return{selectors:{container:"> .elementor-shape-%s"},svgURL:elementorFrontend.config.urls.assets+"shapes/"}}getDefaultElements(){const e={},t=this.getSettings("selectors");return e.$topContainer=this.$element.find(t.container.replace("%s","top")),e.$bottomContainer=this.$element.find(t.container.replace("%s","bottom")),e}isActive(){return elementorFrontend.isEditMode()}getSvgURL(e,t){let n=this.getSettings("svgURL")+t+".svg";return elementor.config.additional_shapes&&e in elementor.config.additional_shapes&&(n=elementor.config.additional_shapes[e],-1<t.indexOf("-negative")&&(n=n.replace(".svg","-negative.svg"))),n}buildSVG(e){const t="shape_divider_"+e,n=this.getElementSettings(t),i=this.elements["$"+e+"Container"];if(i.attr("data-shape",n),!n)return void i.empty();let s=n;this.getElementSettings(t+"_negative")&&(s+="-negative");const o=this.getSvgURL(n,s);jQuery.get(o,(e=>{i.empty().append(e.childNodes[0])})),this.setNegative(e)}setNegative(e){this.elements["$"+e+"Container"].attr("data-negative",!!this.getElementSettings("shape_divider_"+e+"_negative"))}onInit(...e){this.isActive(this.getSettings())&&(super.onInit(...e),["top","bottom"].forEach((e=>{this.getElementSettings("shape_divider_"+e)&&this.buildSVG(e)})))}onElementChange(e){const t=e.match(/^shape_divider_(top|bottom)$/);if(t)return void this.buildSVG(t[1]);const n=e.match(/^shape_divider_(top|bottom)_negative$/);n&&(this.buildSVG(n[1]),this.setNegative(n[1]))}}t.default=Shapes},2804:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class StretchedSection extends elementorModules.frontend.handlers.Base{bindEvents(){const e=this.getUniqueHandlerID();elementorFrontend.addListenerOnce(e,"resize",this.stretch),elementorFrontend.addListenerOnce(e,"sticky:stick",this.stretch,this.$element),elementorFrontend.addListenerOnce(e,"sticky:unstick",this.stretch,this.$element),elementorFrontend.isEditMode()&&(this.onKitChangeStretchContainerChange=this.onKitChangeStretchContainerChange.bind(this),elementor.channels.editor.on("kit:change:stretchContainer",this.onKitChangeStretchContainerChange))}unbindEvents(){elementorFrontend.removeListeners(this.getUniqueHandlerID(),"resize",this.stretch),elementorFrontend.isEditMode()&&elementor.channels.editor.off("kit:change:stretchContainer",this.onKitChangeStretchContainerChange)}isActive(e){return elementorFrontend.isEditMode()||e.$element.hasClass("elementor-section-stretched")}initStretch(){this.stretch=this.stretch.bind(this),this.stretchElement=new elementorModules.frontend.tools.StretchElement({element:this.$element,selectors:{container:this.getStretchContainer()}})}getStretchContainer(){return elementorFrontend.getKitSettings("stretched_section_container")||window}stretch(){this.getElementSettings("stretch_section")&&this.stretchElement.stretch()}onInit(...e){this.isActive(this.getSettings())&&(this.initStretch(),super.onInit(...e),this.stretch())}onElementChange(e){"stretch_section"===e&&(this.getElementSettings("stretch_section")?this.stretch():this.stretchElement.reset())}onKitChangeStretchContainerChange(){this.stretchElement.setSettings("selectors.container",this.getStretchContainer()),this.stretch()}}t.default=StretchedSection},3346:(e,t,n)=>{var i=n(6028);e.exports=elementorModules.ViewModule.extend({getDefaultSettings:function(){return{scrollDuration:500,selectors:{links:'a[href*="#"]',targets:".elementor-element, .elementor-menu-anchor",scrollable:(0,i.isScrollSnapActive)()?"body":"html, body"}}},getDefaultElements:function(){return{$scrollable:jQuery(this.getSettings("selectors").scrollable)}},bindEvents:function(){elementorFrontend.elements.$document.on("click",this.getSettings("selectors.links"),this.handleAnchorLinks)},handleAnchorLinks:function(e){var t,n=e.currentTarget,s=location.pathname===n.pathname;if(location.hostname===n.hostname&&s&&!(n.hash.length<2)){try{t=jQuery(n.hash).filter(this.getSettings("selectors.targets"))}catch(e){return}if(t.length){var o=t.offset().top,r=elementorFrontend.elements.$wpAdminBar,a=jQuery(".elementor-section.elementor-sticky--active:visible");r.length>0&&(o-=r.height()),a.length>0&&(o-=Math.max.apply(null,a.map((function(){return jQuery(this).outerHeight()})).get())),e.preventDefault(),o=elementorFrontend.hooks.applyFilters("frontend/handlers/menu_anchor/scroll_top_distance",o),(0,i.isScrollSnapActive)()&&elementorFrontend.elements.$body.css("scroll-snap-type","none"),this.elements.$scrollable.animate({scrollTop:o},this.getSettings("scrollDuration"),"linear",(()=>{(0,i.isScrollSnapActive)()&&elementorFrontend.elements.$body.css("scroll-snap-type","")}))}}},onInit:function(){elementorModules.ViewModule.prototype.onInit.apply(this,arguments)}})},6866:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class AssetsLoader{getScriptElement(e){const t=document.createElement("script");return t.src=e,t}getStyleElement(e){const t=document.createElement("link");return t.rel="stylesheet",t.href=e,t}load(e,t){const n=AssetsLoader.assets[e][t];return n.loader||(n.loader=new Promise((t=>{const i="style"===e?this.getStyleElement(n.src):this.getScriptElement(n.src);i.onload=()=>t(!0);const s="head"===n.parent?n.parent:"body";document[s].appendChild(i)}))),n.loader}}t.default=AssetsLoader;const n=elementorFrontendConfig.environmentMode.isScriptDebug?"":".min";AssetsLoader.assets={script:{dialog:{src:`${elementorFrontendConfig.urls.assets}lib/dialog/dialog${n}.js?ver=4.9.0`},"share-link":{src:`${elementorFrontendConfig.urls.assets}lib/share-link/share-link${n}.js?ver=${elementorFrontendConfig.version}`},swiper:{src:`${elementorFrontendConfig.urls.assets}lib/swiper/swiper${n}.js?ver=5.3.6`}},style:{}}},8646:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class LightboxManager extends elementorModules.ViewModule{static getLightbox(){const e=new Promise((e=>{n.e(723).then(n.t.bind(n,3896,23)).then((({default:t})=>e(new t)))})),t=elementorFrontend.utils.assetsLoader.load("script","dialog"),i=elementorFrontend.utils.assetsLoader.load("script","share-link");return Promise.all([e,t,i]).then((()=>e))}getDefaultSettings(){return{selectors:{links:"a, [data-elementor-lightbox]"}}}getDefaultElements(){return{$links:jQuery(this.getSettings("selectors.links"))}}isLightboxLink(e){if("a"===e.tagName.toLowerCase()&&(e.hasAttribute("download")||!/^[^?]+\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i.test(e.href))&&!e.dataset.elementorLightboxVideo)return!1;const t=elementorFrontend.getKitSettings("global_image_lightbox"),n=e.dataset.elementorOpenLightbox;return"yes"===n||t&&"no"!==n}async onLinkClick(e){const t=e.currentTarget,n=jQuery(e.target),i=elementorFrontend.isEditMode(),s=i&&elementor.$previewContents.find("body").hasClass("elementor-editor__ui-state__color-picker"),o=!!n.closest(".elementor-edit-area").length;if(!this.isLightboxLink(t))return void(i&&o&&e.preventDefault());if(e.preventDefault(),i&&!elementor.getPreferences("lightbox_in_editor"))return;if(s)return;(this.isOptimizedAssetsLoading()?await LightboxManager.getLightbox():elementorFrontend.utils.lightbox).createLightbox(t)}isOptimizedAssetsLoading(){return elementorFrontend.config.experimentalFeatures.e_optimized_assets_loading}bindEvents(){elementorFrontend.elements.$document.on("click",this.getSettings("selectors.links"),(e=>this.onLinkClick(e)))}onInit(...e){super.onInit(...e),this.isOptimizedAssetsLoading()&&!elementorFrontend.isEditMode()&&this.elements.$links.each(((e,t)=>{if(this.isLightboxLink(t))return LightboxManager.getLightbox(),!1}))}}t.default=LightboxManager},8628:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class Swiper{constructor(e,t){return this.config=t,this.config.breakpoints&&(this.config=this.adjustConfig(t)),jQuery(e).closest(".elementor-widget-wrap").addClass("e-swiper-container"),jQuery(e).closest(".elementor-widget").addClass("e-widget-swiper"),new Promise((t=>{if(!elementorFrontend.config.experimentalFeatures.e_optimized_assets_loading)return t(this.createSwiperInstance(e,this.config));elementorFrontend.utils.assetsLoader.load("script","swiper").then((()=>t(this.createSwiperInstance(e,this.config))))}))}createSwiperInstance(e,t){const n=window.Swiper;return n.prototype.adjustConfig=this.adjustConfig,new n(e,t)}adjustConfig(e){if(!e.handleElementorBreakpoints)return e;const t=elementorFrontend.config.responsive.activeBreakpoints,n=elementorFrontend.breakpoints.getBreakpointValues();return Object.keys(e.breakpoints).forEach((i=>{const s=parseInt(i);let o;if(s===t.mobile.value||s+1===t.mobile.value)o=0;else if(!t.widescreen||s!==t.widescreen.value&&s+1!==t.widescreen.value){const e=n.findIndex((e=>s===e||s+1===e));o=n[e-1]}else o=s;e.breakpoints[o]=e.breakpoints[i],e.breakpoints[i]={slidesPerView:e.slidesPerView,slidesPerGroup:e.slidesPerGroup?e.slidesPerGroup:1}})),e}}},2064:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.ViewModule{getDefaultSettings(){return{selectors:{links:'a[href^="%23elementor-action"], a[href^="#elementor-action"]'}}}bindEvents(){elementorFrontend.elements.$document.on("click",this.getSettings("selectors.links"),this.runLinkAction.bind(this))}initActions(){this.actions={lightbox:async e=>{const t=await elementorFrontend.utils.lightbox;e.slideshow?t.openSlideshow(e.slideshow,e.url):(e.id&&(e.type="image"),t.showModal(e))}}}addAction(e,t){this.actions[e]=t}runAction(e,...t){const n=(e=decodeURIComponent(e)).match(/action=(.+?)&/),i=e.match(/settings=(.+)/);if(!n)return;const s=this.actions[n[1]];if(!s)return;let o={};i&&(o=JSON.parse(atob(i[1]))),s(o,...t)}runLinkAction(e){e.preventDefault(),this.runAction(jQuery(e.currentTarget).attr("href"),e)}runHashAction(){if(!location.hash)return;const e=document.querySelector(`[e-action-hash="${location.hash}"], a[href*="${location.hash}"]`);e&&this.runAction(e.getAttribute("e-action-hash"))}createActionHash(e,t){return encodeURIComponent(`#elementor-action:action=${e}&settings=${btoa(JSON.stringify(t))}`)}onInit(){super.onInit(),this.initActions(),elementorFrontend.on("components:init",this.runHashAction.bind(this))}}t.default=_default},6028:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isScrollSnapActive=t.escapeHTML=void 0;t.escapeHTML=e=>{const t={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"};return e.replace(/[&<>'"]/g,(e=>t[e]||e))};t.isScrollSnapActive=()=>{var e,t;return"yes"===(elementorFrontend.isEditMode()?null===(e=elementor.settings.page.model.attributes)||void 0===e?void 0:e.scroll_snap:null===(t=elementorFrontend.config.settings.page)||void 0===t?void 0:t.scroll_snap)}},4773:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class BaseLoader extends elementorModules.ViewModule{getDefaultSettings(){return{isInserted:!1,selectors:{firstScript:"script:first"}}}getDefaultElements(){return{$firstScript:jQuery(this.getSettings("selectors.firstScript"))}}insertAPI(){this.elements.$firstScript.before(jQuery("<script>",{src:this.getApiURL()})),this.setSettings("isInserted",!0)}getVideoIDFromURL(e){const t=e.match(this.getURLRegex());return t&&t[1]}onApiReady(e){this.getSettings("isInserted")||this.insertAPI(),this.isApiLoaded()?e(this.getApiObject()):setTimeout((()=>{this.onApiReady(e)}),350)}getAutoplayURL(e){return e.replace("&autoplay=0","")+"&autoplay=1"}}t.default=BaseLoader},1911:(e,t,n)=>{var i=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(n(4773));class VimeoLoader extends s.default{getApiURL(){return"https://player.vimeo.com/api/player.js"}getURLRegex(){return/^(?:https?:\/\/)?(?:www|player\.)?(?:vimeo\.com\/)?(?:video\/|external\/)?(\d+)([^.?&#"'>]?)/}isApiLoaded(){return window.Vimeo}getApiObject(){return Vimeo}getAutoplayURL(e){const t=(e=super.getAutoplayURL(e)).match(/#t=[^&]*/);return e.replace(t[0],"")+t}}t.default=VimeoLoader},1604:(e,t,n)=>{var i=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(n(4773));class YoutubeLoader extends s.default{getApiURL(){return"https://www.youtube.com/iframe_api"}getURLRegex(){return/^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?vi?=|(?:embed|v|vi|user)\/))([^?&"'>]+)/}isApiLoaded(){return window.YT&&YT.loaded}getApiObject(){return YT}}t.default=YoutubeLoader},59:(e,t,n)=>{n.p=elementorFrontendConfig.urls.assets+"js/"},4375:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class Breakpoints extends elementorModules.Module{constructor(e){super(),this.responsiveConfig=e}getActiveBreakpointsList(e={}){e={largeToSmall:!1,withDesktop:!1,...e};const t=Object.keys(this.responsiveConfig.activeBreakpoints);if(e.withDesktop){const e=-1===t.indexOf("widescreen")?t.length:t.length-1;t.splice(e,0,"desktop")}return e.largeToSmall&&t.reverse(),t}getBreakpointValues(){const{activeBreakpoints:e}=this.responsiveConfig,t=[];return Object.values(e).forEach((e=>{t.push(e.value)})),t}getDesktopPreviousDeviceKey(){let e="";const{activeBreakpoints:t}=this.responsiveConfig,n=Object.keys(t),i=n.length;return e="min"===t[n[i-1]].direction?n[i-2]:n[i-1],e}getDesktopMinPoint(){const{activeBreakpoints:e}=this.responsiveConfig;return e[this.getDesktopPreviousDeviceKey()].value+1}getDeviceMinBreakpoint(e){if("desktop"===e)return this.getDesktopMinPoint();const{activeBreakpoints:t}=this.responsiveConfig,n=Object.keys(t);let i;if(n[0]===e)i=320;else if("widescreen"===e)i=t[e]?t[e].value:this.responsiveConfig.breakpoints.widescreen;else{const s=n.indexOf(e);i=t[n[s-1]].value+1}return i}getActiveMatchRegex(){return new RegExp(this.getActiveBreakpointsList().map((e=>"_"+e)).join("|")+"$")}}t.default=Breakpoints},6404:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.Events=void 0;class Events{static dispatch(e,t,n=null,i=null){e=e instanceof jQuery?e[0]:e,i&&e.dispatchEvent(new CustomEvent(i,{detail:n})),e.dispatchEvent(new CustomEvent(t,{detail:n}))}}t.Events=Events;var n=Events;t.default=n},9469:e=>{e.exports=function(){var e,t=Array.prototype.slice,n={actions:{},filters:{}};function _removeHook(e,t,i,s){var o,r,a;if(n[e][t])if(i)if(o=n[e][t],s)for(a=o.length;a--;)(r=o[a]).callback===i&&r.context===s&&o.splice(a,1);else for(a=o.length;a--;)o[a].callback===i&&o.splice(a,1);else n[e][t]=[]}function _addHook(e,t,i,s,o){var r={callback:i,priority:s,context:o},a=n[e][t];if(a){var l=!1;if(jQuery.each(a,(function(){if(this.callback===i)return l=!0,!1})),l)return;a.push(r),a=function _hookInsertSort(e){for(var t,n,i,s=1,o=e.length;s<o;s++){for(t=e[s],n=s;(i=e[n-1])&&i.priority>t.priority;)e[n]=e[n-1],--n;e[n]=t}return e}(a)}else a=[r];n[e][t]=a}function _runHook(e,t,i){var s,o,r=n[e][t];if(!r)return"filters"===e&&i[0];if(o=r.length,"filters"===e)for(s=0;s<o;s++)i[0]=r[s].callback.apply(r[s].context,i);else for(s=0;s<o;s++)r[s].callback.apply(r[s].context,i);return"filters"!==e||i[0]}return e={removeFilter:function removeFilter(t,n){return"string"==typeof t&&_removeHook("filters",t,n),e},applyFilters:function applyFilters(){var n=t.call(arguments),i=n.shift();return"string"==typeof i?_runHook("filters",i,n):e},addFilter:function addFilter(t,n,i,s){return"string"==typeof t&&"function"==typeof n&&_addHook("filters",t,n,i=parseInt(i||10,10),s),e},removeAction:function removeAction(t,n){return"string"==typeof t&&_removeHook("actions",t,n),e},doAction:function doAction(){var n=t.call(arguments),i=n.shift();return"string"==typeof i&&_runHook("actions",i,n),e},addAction:function addAction(t,n,i,s){return"string"==typeof t&&"function"==typeof n&&_addHook("actions",t,n,i=parseInt(i||10,10),s),e}},e}},3308:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;const matchUserAgent=e=>n.indexOf(e)>=0,n=navigator.userAgent,i=!!window.opr&&!!opr.addons||!!window.opera||matchUserAgent(" OPR/"),s=matchUserAgent("Firefox"),o=/^((?!chrome|android).)*safari/i.test(n)||/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&safari.pushNotification).toString(),r=/Trident|MSIE/.test(n)&&!!document.documentMode,a=!r&&!!window.StyleMedia||matchUserAgent("Edg"),l=!!window.chrome&&matchUserAgent("Chrome")&&!(a||i),d=matchUserAgent("Chrome")&&!!window.CSS;var c={appleWebkit:matchUserAgent("AppleWebKit")&&!d,blink:d,chrome:l,edge:a,firefox:s,ie:r,mac:matchUserAgent("Macintosh"),opera:i,safari:o,webkit:matchUserAgent("AppleWebKit")};t.default=c},5107:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{get(e,t){let n;t=t||{};try{n=t.session?sessionStorage:localStorage}catch(t){return e?void 0:{}}let i=n.getItem("elementor");i=i?JSON.parse(i):{},i.__expiration||(i.__expiration={});const s=i.__expiration;let o=[];e?s[e]&&(o=[e]):o=Object.keys(s);let r=!1;return o.forEach((e=>{new Date(s[e])<new Date&&(delete i[e],delete s[e],r=!0)})),r&&this.save(i,t.session),e?i[e]:i}set(e,t,n){n=n||{};const i=this.get(null,n);if(i[e]=t,n.lifetimeInSeconds){const t=new Date;t.setTime(t.getTime()+1e3*n.lifetimeInSeconds),i.__expiration[e]=t.getTime()}this.save(i,n.session)}save(e,t){let n;try{n=t?sessionStorage:localStorage}catch(e){return}n.setItem("elementor",JSON.stringify(e))}}t.default=_default},6046:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.Module{constructor(){super(),elementorFrontend.elementsHandler.attachHandler("text-path",(()=>n.e(48).then(n.bind(n,6468))))}}t.default=_default}},e=>{e.O(0,[354],(()=>{return t=5654,e(e.s=t);var t}));e.O()}]);function lazyLoadThumb(e){var t='<img loading="lazy" data-lazy-src="https://i.ytimg.com/vi/ID/hqdefault.jpg" alt="" width="480" height="360"><noscript><img src="https://i.ytimg.com/vi/ID/hqdefault.jpg" alt="" width="480" height="360"></noscript>',a='<div class="play"></div>';return t.replace("ID",e)+a}function lazyLoadYoutubeIframe(){var e=document.createElement("iframe"),t="ID?autoplay=1";t+=0===this.dataset.query.length?'':'&'+this.dataset.query;e.setAttribute("src",t.replace("ID",this.dataset.src)),e.setAttribute("frameborder","0"),e.setAttribute("allowfullscreen","1"),e.setAttribute("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"),this.parentNode.replaceChild(e,this)}document.addEventListener("DOMContentLoaded",function(){var e,t,a=document.getElementsByClassName("rll-youtube-player");for(t=0;t<a.length;t++)e=document.createElement("div"),e.setAttribute("data-id",a[t].dataset.id),e.setAttribute("data-query",a[t].dataset.query),e.setAttribute("data-src",a[t].dataset.src),e.innerHTML=lazyLoadThumb(a[t].dataset.id),e.onclick=lazyLoadYoutubeIframe,a[t].appendChild(e)});