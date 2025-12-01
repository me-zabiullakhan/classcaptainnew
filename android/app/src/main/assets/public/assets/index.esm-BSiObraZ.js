(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var e5=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Sb(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Rb={exports:{}},Ad={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var MP=Symbol.for("react.transitional.element"),xP=Symbol.for("react.fragment");function Cb(t,e,n){var i=null;if(n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),"key"in e){n={};for(var r in e)r!=="key"&&(n[r]=e[r])}else n=e;return e=n.ref,{$$typeof:MP,type:t,key:i,ref:e!==void 0?e:null,props:n}}Ad.Fragment=xP;Ad.jsx=Cb;Ad.jsxs=Cb;Rb.exports=Ad;var t5=Rb.exports,Db={exports:{}},Z={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var j_=Symbol.for("react.transitional.element"),LP=Symbol.for("react.portal"),UP=Symbol.for("react.fragment"),zP=Symbol.for("react.strict_mode"),BP=Symbol.for("react.profiler"),FP=Symbol.for("react.consumer"),qP=Symbol.for("react.context"),HP=Symbol.for("react.forward_ref"),jP=Symbol.for("react.suspense"),GP=Symbol.for("react.memo"),Nb=Symbol.for("react.lazy"),KP=Symbol.for("react.activity"),LE=Symbol.iterator;function QP(t){return t===null||typeof t!="object"?null:(t=LE&&t[LE]||t["@@iterator"],typeof t=="function"?t:null)}var Pb={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ob=Object.assign,Vb={};function Jo(t,e,n){this.props=t,this.context=e,this.refs=Vb,this.updater=n||Pb}Jo.prototype.isReactComponent={};Jo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Jo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function kb(){}kb.prototype=Jo.prototype;function G_(t,e,n){this.props=t,this.context=e,this.refs=Vb,this.updater=n||Pb}var K_=G_.prototype=new kb;K_.constructor=G_;Ob(K_,Jo.prototype);K_.isPureReactComponent=!0;var UE=Array.isArray;function ag(){}var Ve={H:null,A:null,T:null,S:null},Mb=Object.prototype.hasOwnProperty;function Q_(t,e,n){var i=n.ref;return{$$typeof:j_,type:t,key:e,ref:i!==void 0?i:null,props:n}}function YP(t,e){return Q_(t.type,e,t.props)}function Y_(t){return typeof t=="object"&&t!==null&&t.$$typeof===j_}function $P(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var zE=/\/+/g;function ep(t,e){return typeof t=="object"&&t!==null&&t.key!=null?$P(""+t.key):e.toString(36)}function WP(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(ag,ag):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function La(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"bigint":case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case j_:case LP:a=!0;break;case Nb:return a=t._init,La(a(t._payload),e,n,i,r)}}if(a)return r=r(t),a=i===""?"."+ep(t,0):i,UE(r)?(n="",a!=null&&(n=a.replace(zE,"$&/")+"/"),La(r,e,n,"",function(c){return c})):r!=null&&(Y_(r)&&(r=YP(r,n+(r.key==null||t&&t.key===r.key?"":(""+r.key).replace(zE,"$&/")+"/")+a)),e.push(r)),1;a=0;var o=i===""?".":i+":";if(UE(t))for(var u=0;u<t.length;u++)i=t[u],s=o+ep(i,u),a+=La(i,e,n,s,r);else if(u=QP(t),typeof u=="function")for(t=u.call(t),u=0;!(i=t.next()).done;)i=i.value,s=o+ep(i,u++),a+=La(i,e,n,s,r);else if(s==="object"){if(typeof t.then=="function")return La(WP(t),e,n,i,r);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return a}function yh(t,e,n){if(t==null)return t;var i=[],r=0;return La(t,i,"","",function(s){return e.call(n,s,r++)}),i}function XP(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var BE=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},JP={map:yh,forEach:function(t,e,n){yh(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return yh(t,function(){e++}),e},toArray:function(t){return yh(t,function(e){return e})||[]},only:function(t){if(!Y_(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Z.Activity=KP;Z.Children=JP;Z.Component=Jo;Z.Fragment=UP;Z.Profiler=BP;Z.PureComponent=G_;Z.StrictMode=zP;Z.Suspense=jP;Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ve;Z.__COMPILER_RUNTIME={__proto__:null,c:function(t){return Ve.H.useMemoCache(t)}};Z.cache=function(t){return function(){return t.apply(null,arguments)}};Z.cacheSignal=function(){return null};Z.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var i=Ob({},t.props),r=t.key;if(e!=null)for(s in e.key!==void 0&&(r=""+e.key),e)!Mb.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(i[s]=e[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var a=Array(s),o=0;o<s;o++)a[o]=arguments[o+2];i.children=a}return Q_(t.type,r,i)};Z.createContext=function(t){return t={$$typeof:qP,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:FP,_context:t},t};Z.createElement=function(t,e,n){var i,r={},s=null;if(e!=null)for(i in e.key!==void 0&&(s=""+e.key),e)Mb.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),u=0;u<a;u++)o[u]=arguments[u+2];r.children=o}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return Q_(t,s,r)};Z.createRef=function(){return{current:null}};Z.forwardRef=function(t){return{$$typeof:HP,render:t}};Z.isValidElement=Y_;Z.lazy=function(t){return{$$typeof:Nb,_payload:{_status:-1,_result:t},_init:XP}};Z.memo=function(t,e){return{$$typeof:GP,type:t,compare:e===void 0?null:e}};Z.startTransition=function(t){var e=Ve.T,n={};Ve.T=n;try{var i=t(),r=Ve.S;r!==null&&r(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(ag,BE)}catch(s){BE(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),Ve.T=e}};Z.unstable_useCacheRefresh=function(){return Ve.H.useCacheRefresh()};Z.use=function(t){return Ve.H.use(t)};Z.useActionState=function(t,e,n){return Ve.H.useActionState(t,e,n)};Z.useCallback=function(t,e){return Ve.H.useCallback(t,e)};Z.useContext=function(t){return Ve.H.useContext(t)};Z.useDebugValue=function(){};Z.useDeferredValue=function(t,e){return Ve.H.useDeferredValue(t,e)};Z.useEffect=function(t,e){return Ve.H.useEffect(t,e)};Z.useEffectEvent=function(t){return Ve.H.useEffectEvent(t)};Z.useId=function(){return Ve.H.useId()};Z.useImperativeHandle=function(t,e,n){return Ve.H.useImperativeHandle(t,e,n)};Z.useInsertionEffect=function(t,e){return Ve.H.useInsertionEffect(t,e)};Z.useLayoutEffect=function(t,e){return Ve.H.useLayoutEffect(t,e)};Z.useMemo=function(t,e){return Ve.H.useMemo(t,e)};Z.useOptimistic=function(t,e){return Ve.H.useOptimistic(t,e)};Z.useReducer=function(t,e,n){return Ve.H.useReducer(t,e,n)};Z.useRef=function(t){return Ve.H.useRef(t)};Z.useState=function(t){return Ve.H.useState(t)};Z.useSyncExternalStore=function(t,e,n){return Ve.H.useSyncExternalStore(t,e,n)};Z.useTransition=function(){return Ve.H.useTransition()};Z.version="19.2.0";Db.exports=Z;var $_=Db.exports;const n5=Sb($_);var xb={exports:{}},bd={},Lb={exports:{}},Ub={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(K,ie){var J=K.length;K.push(ie);e:for(;0<J;){var Ae=J-1>>>1,et=K[Ae];if(0<r(et,ie))K[Ae]=ie,K[J]=et,J=Ae;else break e}}function n(K){return K.length===0?null:K[0]}function i(K){if(K.length===0)return null;var ie=K[0],J=K.pop();if(J!==ie){K[0]=J;e:for(var Ae=0,et=K.length,fs=et>>>1;Ae<fs;){var ds=2*(Ae+1)-1,Ia=K[ds],An=ds+1,Zi=K[An];if(0>r(Ia,J))An<et&&0>r(Zi,Ia)?(K[Ae]=Zi,K[An]=J,Ae=An):(K[Ae]=Ia,K[ds]=J,Ae=ds);else if(An<et&&0>r(Zi,J))K[Ae]=Zi,K[An]=J,Ae=An;else break e}}return ie}function r(K,ie){var J=K.sortIndex-ie.sortIndex;return J!==0?J:K.id-ie.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var u=[],c=[],h=1,d=null,m=3,g=!1,R=!1,D=!1,V=!1,w=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function C(K){for(var ie=n(c);ie!==null;){if(ie.callback===null)i(c);else if(ie.startTime<=K)i(c),ie.sortIndex=ie.expirationTime,e(u,ie);else break;ie=n(c)}}function z(K){if(D=!1,C(K),!R)if(n(u)!==null)R=!0,F||(F=!0,P());else{var ie=n(c);ie!==null&&Un(z,ie.startTime-K)}}var F=!1,T=-1,y=5,E=-1;function b(){return V?!0:!(t.unstable_now()-E<y)}function S(){if(V=!1,F){var K=t.unstable_now();E=K;var ie=!0;try{e:{R=!1,D&&(D=!1,v(T),T=-1),g=!0;var J=m;try{t:{for(C(K),d=n(u);d!==null&&!(d.expirationTime>K&&b());){var Ae=d.callback;if(typeof Ae=="function"){d.callback=null,m=d.priorityLevel;var et=Ae(d.expirationTime<=K);if(K=t.unstable_now(),typeof et=="function"){d.callback=et,C(K),ie=!0;break t}d===n(u)&&i(u),C(K)}else i(u);d=n(u)}if(d!==null)ie=!0;else{var fs=n(c);fs!==null&&Un(z,fs.startTime-K),ie=!1}}break e}finally{d=null,m=J,g=!1}ie=void 0}}finally{ie?P():F=!1}}}var P;if(typeof I=="function")P=function(){I(S)};else if(typeof MessageChannel<"u"){var A=new MessageChannel,Nt=A.port2;A.port1.onmessage=S,P=function(){Nt.postMessage(null)}}else P=function(){w(S,0)};function Un(K,ie){T=w(function(){K(t.unstable_now())},ie)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(K){K.callback=null},t.unstable_forceFrameRate=function(K){0>K||125<K?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<K?Math.floor(1e3/K):5},t.unstable_getCurrentPriorityLevel=function(){return m},t.unstable_next=function(K){switch(m){case 1:case 2:case 3:var ie=3;break;default:ie=m}var J=m;m=ie;try{return K()}finally{m=J}},t.unstable_requestPaint=function(){V=!0},t.unstable_runWithPriority=function(K,ie){switch(K){case 1:case 2:case 3:case 4:case 5:break;default:K=3}var J=m;m=K;try{return ie()}finally{m=J}},t.unstable_scheduleCallback=function(K,ie,J){var Ae=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?Ae+J:Ae):J=Ae,K){case 1:var et=-1;break;case 2:et=250;break;case 5:et=1073741823;break;case 4:et=1e4;break;default:et=5e3}return et=J+et,K={id:h++,callback:ie,priorityLevel:K,startTime:J,expirationTime:et,sortIndex:-1},J>Ae?(K.sortIndex=J,e(c,K),n(u)===null&&K===n(c)&&(D?(v(T),T=-1):D=!0,Un(z,J-Ae))):(K.sortIndex=et,e(u,K),R||g||(R=!0,F||(F=!0,P()))),K},t.unstable_shouldYield=b,t.unstable_wrapCallback=function(K){var ie=m;return function(){var J=m;m=ie;try{return K.apply(this,arguments)}finally{m=J}}}})(Ub);Lb.exports=Ub;var ZP=Lb.exports,zb={exports:{}},Kt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var eO=$_;function Bb(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ar(){}var Ht={d:{f:ar,r:function(){throw Error(Bb(522))},D:ar,C:ar,L:ar,m:ar,X:ar,S:ar,M:ar},p:0,findDOMNode:null},tO=Symbol.for("react.portal");function nO(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:tO,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}var fu=eO.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Sd(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ht;Kt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(Bb(299));return nO(t,e,null,n)};Kt.flushSync=function(t){var e=fu.T,n=Ht.p;try{if(fu.T=null,Ht.p=2,t)return t()}finally{fu.T=e,Ht.p=n,Ht.d.f()}};Kt.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,Ht.d.C(t,e))};Kt.prefetchDNS=function(t){typeof t=="string"&&Ht.d.D(t)};Kt.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,i=Sd(n,e.crossOrigin),r=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?Ht.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:r,fetchPriority:s}):n==="script"&&Ht.d.X(t,{crossOrigin:i,integrity:r,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Kt.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=Sd(e.as,e.crossOrigin);Ht.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&Ht.d.M(t)};Kt.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,i=Sd(n,e.crossOrigin);Ht.d.L(t,n,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Kt.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=Sd(e.as,e.crossOrigin);Ht.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else Ht.d.m(t)};Kt.requestFormReset=function(t){Ht.d.r(t)};Kt.unstable_batchedUpdates=function(t,e){return t(e)};Kt.useFormState=function(t,e,n){return fu.H.useFormState(t,e,n)};Kt.useFormStatus=function(){return fu.H.useHostTransitionStatus()};Kt.version="19.2.0";function Fb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Fb)}catch(t){console.error(t)}}Fb(),zb.exports=Kt;var iO=zb.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ht=ZP,qb=$_,rO=iO;function x(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Hb(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function bc(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function jb(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Gb(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function FE(t){if(bc(t)!==t)throw Error(x(188))}function sO(t){var e=t.alternate;if(!e){if(e=bc(t),e===null)throw Error(x(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return FE(r),t;if(s===i)return FE(r),e;s=s.sibling}throw Error(x(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(x(189))}}if(n.alternate!==i)throw Error(x(190))}if(n.tag!==3)throw Error(x(188));return n.stateNode.current===n?t:e}function Kb(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=Kb(t),e!==null)return e;t=t.sibling}return null}var ke=Object.assign,aO=Symbol.for("react.element"),vh=Symbol.for("react.transitional.element"),Zl=Symbol.for("react.portal"),Ga=Symbol.for("react.fragment"),Qb=Symbol.for("react.strict_mode"),og=Symbol.for("react.profiler"),Yb=Symbol.for("react.consumer"),bi=Symbol.for("react.context"),W_=Symbol.for("react.forward_ref"),lg=Symbol.for("react.suspense"),ug=Symbol.for("react.suspense_list"),X_=Symbol.for("react.memo"),fr=Symbol.for("react.lazy"),cg=Symbol.for("react.activity"),oO=Symbol.for("react.memo_cache_sentinel"),qE=Symbol.iterator;function xl(t){return t===null||typeof t!="object"?null:(t=qE&&t[qE]||t["@@iterator"],typeof t=="function"?t:null)}var lO=Symbol.for("react.client.reference");function hg(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===lO?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ga:return"Fragment";case og:return"Profiler";case Qb:return"StrictMode";case lg:return"Suspense";case ug:return"SuspenseList";case cg:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Zl:return"Portal";case bi:return t.displayName||"Context";case Yb:return(t._context.displayName||"Context")+".Consumer";case W_:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case X_:return e=t.displayName||null,e!==null?e:hg(t.type)||"Memo";case fr:e=t._payload,t=t._init;try{return hg(t(e))}catch{}}return null}var eu=Array.isArray,W=qb.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,me=rO.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Us={pending:!1,data:null,method:null,action:null},fg=[],Ka=-1;function gi(t){return{current:t}}function yt(t){0>Ka||(t.current=fg[Ka],fg[Ka]=null,Ka--)}function be(t,e){Ka++,fg[Ka]=t.current,t.current=e}var ui=gi(null),qu=gi(null),Cr=gi(null),Ef=gi(null);function wf(t,e){switch(be(Cr,e),be(qu,t),be(ui,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Yw(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Yw(e),t=m0(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}yt(ui),be(ui,t)}function yo(){yt(ui),yt(qu),yt(Cr)}function dg(t){t.memoizedState!==null&&be(Ef,t);var e=ui.current,n=m0(e,t.type);e!==n&&(be(qu,t),be(ui,n))}function If(t){qu.current===t&&(yt(ui),yt(qu)),Ef.current===t&&(yt(Ef),Zu._currentValue=Us)}var tp,HE;function Es(t){if(tp===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);tp=e&&e[1]||"",HE=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+tp+t+HE}var np=!1;function ip(t,e){if(!t||np)return"";np=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(g){var m=g}Reflect.construct(t,[],d)}else{try{d.call()}catch(g){m=g}t.call(d.prototype)}}else{try{throw Error()}catch(g){m=g}(d=t())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(g){if(g&&m&&typeof g.stack=="string")return[g.stack,m.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),a=s[0],o=s[1];if(a&&o){var u=a.split(`
`),c=o.split(`
`);for(r=i=0;i<u.length&&!u[i].includes("DetermineComponentFrameRoot");)i++;for(;r<c.length&&!c[r].includes("DetermineComponentFrameRoot");)r++;if(i===u.length||r===c.length)for(i=u.length-1,r=c.length-1;1<=i&&0<=r&&u[i]!==c[r];)r--;for(;1<=i&&0<=r;i--,r--)if(u[i]!==c[r]){if(i!==1||r!==1)do if(i--,r--,0>r||u[i]!==c[r]){var h=`
`+u[i].replace(" at new "," at ");return t.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",t.displayName)),h}while(1<=i&&0<=r);break}}}finally{np=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Es(n):""}function uO(t,e){switch(t.tag){case 26:case 27:case 5:return Es(t.type);case 16:return Es("Lazy");case 13:return t.child!==e&&e!==null?Es("Suspense Fallback"):Es("Suspense");case 19:return Es("SuspenseList");case 0:case 15:return ip(t.type,!1);case 11:return ip(t.type.render,!1);case 1:return ip(t.type,!0);case 31:return Es("Activity");default:return""}}function jE(t){try{var e="",n=null;do e+=uO(t,n),n=t,t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var mg=Object.prototype.hasOwnProperty,J_=ht.unstable_scheduleCallback,rp=ht.unstable_cancelCallback,cO=ht.unstable_shouldYield,hO=ht.unstable_requestPaint,pn=ht.unstable_now,fO=ht.unstable_getCurrentPriorityLevel,$b=ht.unstable_ImmediatePriority,Wb=ht.unstable_UserBlockingPriority,Af=ht.unstable_NormalPriority,dO=ht.unstable_LowPriority,Xb=ht.unstable_IdlePriority,mO=ht.log,pO=ht.unstable_setDisableYieldValue,Sc=null,gn=null;function Tr(t){if(typeof mO=="function"&&pO(t),gn&&typeof gn.setStrictMode=="function")try{gn.setStrictMode(Sc,t)}catch{}}var _n=Math.clz32?Math.clz32:yO,gO=Math.log,_O=Math.LN2;function yO(t){return t>>>=0,t===0?32:31-(gO(t)/_O|0)|0}var Th=256,Eh=262144,wh=4194304;function ws(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Rd(t,e,n){var i=t.pendingLanes;if(i===0)return 0;var r=0,s=t.suspendedLanes,a=t.pingedLanes;t=t.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?r=ws(i):(a&=o,a!==0?r=ws(a):n||(n=o&~t,n!==0&&(r=ws(n))))):(o=i&~s,o!==0?r=ws(o):a!==0?r=ws(a):n||(n=i&~t,n!==0&&(r=ws(n)))),r===0?0:e!==0&&e!==r&&!(e&s)&&(s=r&-r,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:r}function Rc(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function vO(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Jb(){var t=wh;return wh<<=1,!(wh&62914560)&&(wh=4194304),t}function sp(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Cc(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function TO(t,e,n,i,r,s){var a=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,u=t.expirationTimes,c=t.hiddenUpdates;for(n=a&~n;0<n;){var h=31-_n(n),d=1<<h;o[h]=0,u[h]=-1;var m=c[h];if(m!==null)for(c[h]=null,h=0;h<m.length;h++){var g=m[h];g!==null&&(g.lane&=-536870913)}n&=~d}i!==0&&Zb(t,i,0),s!==0&&r===0&&t.tag!==0&&(t.suspendedLanes|=s&~(a&~e))}function Zb(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var i=31-_n(e);t.entangledLanes|=e,t.entanglements[i]=t.entanglements[i]|1073741824|n&261930}function eS(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-_n(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}function tS(t,e){var n=e&-e;return n=n&42?1:Z_(n),n&(t.suspendedLanes|e)?0:n}function Z_(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ey(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function nS(){var t=me.p;return t!==0?t:(t=window.event,t===void 0?32:b0(t.type))}function GE(t,e){var n=me.p;try{return me.p=t,e()}finally{me.p=n}}var is=Math.random().toString(36).slice(2),wt="__reactFiber$"+is,rn="__reactProps$"+is,Zo="__reactContainer$"+is,pg="__reactEvents$"+is,EO="__reactListeners$"+is,wO="__reactHandles$"+is,KE="__reactResources$"+is,Dc="__reactMarker$"+is;function ty(t){delete t[wt],delete t[rn],delete t[pg],delete t[EO],delete t[wO]}function Qa(t){var e=t[wt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Zo]||n[wt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Zw(t);t!==null;){if(n=t[wt])return n;t=Zw(t)}return e}t=n,n=t.parentNode}return null}function el(t){if(t=t[wt]||t[Zo]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function tu(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(x(33))}function ro(t){var e=t[KE];return e||(e=t[KE]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function _t(t){t[Dc]=!0}var iS=new Set,rS={};function ha(t,e){vo(t,e),vo(t+"Capture",e)}function vo(t,e){for(rS[t]=e,t=0;t<e.length;t++)iS.add(e[t])}var IO=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),QE={},YE={};function AO(t){return mg.call(YE,t)?!0:mg.call(QE,t)?!1:IO.test(t)?YE[t]=!0:(QE[t]=!0,!1)}function jh(t,e,n){if(AO(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Ih(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function yi(t,e,n,i){if(i===null)t.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+i)}}function Sn(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function sS(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function bO(t,e,n){var i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var r=i.get,s=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){n=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(a){n=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function gg(t){if(!t._valueTracker){var e=sS(t)?"checked":"value";t._valueTracker=bO(t,e,""+t[e])}}function aS(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=sS(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function bf(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var SO=/[\n"\\]/g;function Dn(t){return t.replace(SO,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function _g(t,e,n,i,r,s,a,o){t.name="",a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"?t.type=a:t.removeAttribute("type"),e!=null?a==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Sn(e)):t.value!==""+Sn(e)&&(t.value=""+Sn(e)):a!=="submit"&&a!=="reset"||t.removeAttribute("value"),e!=null?yg(t,a,Sn(e)):n!=null?yg(t,a,Sn(n)):i!=null&&t.removeAttribute("value"),r==null&&s!=null&&(t.defaultChecked=!!s),r!=null&&(t.checked=r&&typeof r!="function"&&typeof r!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+Sn(o):t.removeAttribute("name")}function oS(t,e,n,i,r,s,a,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){gg(t);return}n=n!=null?""+Sn(n):"",e=e!=null?""+Sn(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}i=i??r,i=typeof i!="function"&&typeof i!="symbol"&&!!i,t.checked=o?t.checked:!!i,t.defaultChecked=!!i,a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(t.name=a),gg(t)}function yg(t,e,n){e==="number"&&bf(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function so(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Sn(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function lS(t,e,n){if(e!=null&&(e=""+Sn(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+Sn(n):""}function uS(t,e,n,i){if(e==null){if(i!=null){if(n!=null)throw Error(x(92));if(eu(i)){if(1<i.length)throw Error(x(93));i=i[0]}n=i}n==null&&(n=""),e=n}n=Sn(e),t.defaultValue=n,i=t.textContent,i===n&&i!==""&&i!==null&&(t.value=i),gg(t)}function To(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var RO=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function $E(t,e,n){var i=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":i?t.setProperty(e,n):typeof n!="number"||n===0||RO.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function cS(t,e,n){if(e!=null&&typeof e!="object")throw Error(x(62));if(t=t.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="");for(var r in e)i=e[r],e.hasOwnProperty(r)&&n[r]!==i&&$E(t,r,i)}else for(var s in e)e.hasOwnProperty(s)&&$E(t,s,e[s])}function ny(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var CO=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),DO=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Gh(t){return DO.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Si(){}var vg=null;function iy(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ya=null,ao=null;function WE(t){var e=el(t);if(e&&(t=e.stateNode)){var n=t[rn]||null;e:switch(t=e.stateNode,e.type){case"input":if(_g(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Dn(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=i[rn]||null;if(!r)throw Error(x(90));_g(i,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(e=0;e<n.length;e++)i=n[e],i.form===t.form&&aS(i)}break e;case"textarea":lS(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&so(t,!!n.multiple,e,!1)}}}var ap=!1;function hS(t,e,n){if(ap)return t(e,n);ap=!0;try{var i=t(e);return i}finally{if(ap=!1,(Ya!==null||ao!==null)&&(zd(),Ya&&(e=Ya,t=ao,ao=Ya=null,WE(e),t)))for(e=0;e<t.length;e++)WE(t[e])}}function Hu(t,e){var n=t.stateNode;if(n===null)return null;var i=n[rn]||null;if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(x(231,e,typeof n));return n}var Mi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Tg=!1;if(Mi)try{var Ll={};Object.defineProperty(Ll,"passive",{get:function(){Tg=!0}}),window.addEventListener("test",Ll,Ll),window.removeEventListener("test",Ll,Ll)}catch{Tg=!1}var Er=null,ry=null,Kh=null;function fS(){if(Kh)return Kh;var t,e=ry,n=e.length,i,r="value"in Er?Er.value:Er.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return Kh=r.slice(t,1<i?1-i:void 0)}function Qh(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ah(){return!0}function XE(){return!1}function sn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ah:XE,this.isPropagationStopped=XE,this}return ke(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ah)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ah)},persist:function(){},isPersistent:Ah}),e}var fa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Cd=sn(fa),Nc=ke({},fa,{view:0,detail:0}),NO=sn(Nc),op,lp,Ul,Dd=ke({},Nc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sy,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ul&&(Ul&&t.type==="mousemove"?(op=t.screenX-Ul.screenX,lp=t.screenY-Ul.screenY):lp=op=0,Ul=t),op)},movementY:function(t){return"movementY"in t?t.movementY:lp}}),JE=sn(Dd),PO=ke({},Dd,{dataTransfer:0}),OO=sn(PO),VO=ke({},Nc,{relatedTarget:0}),up=sn(VO),kO=ke({},fa,{animationName:0,elapsedTime:0,pseudoElement:0}),MO=sn(kO),xO=ke({},fa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),LO=sn(xO),UO=ke({},fa,{data:0}),ZE=sn(UO),zO={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},BO={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},FO={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function qO(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=FO[t])?!!e[t]:!1}function sy(){return qO}var HO=ke({},Nc,{key:function(t){if(t.key){var e=zO[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Qh(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?BO[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sy,charCode:function(t){return t.type==="keypress"?Qh(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Qh(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),jO=sn(HO),GO=ke({},Dd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ew=sn(GO),KO=ke({},Nc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sy}),QO=sn(KO),YO=ke({},fa,{propertyName:0,elapsedTime:0,pseudoElement:0}),$O=sn(YO),WO=ke({},Dd,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),XO=sn(WO),JO=ke({},fa,{newState:0,oldState:0}),ZO=sn(JO),eV=[9,13,27,32],ay=Mi&&"CompositionEvent"in window,du=null;Mi&&"documentMode"in document&&(du=document.documentMode);var tV=Mi&&"TextEvent"in window&&!du,dS=Mi&&(!ay||du&&8<du&&11>=du),tw=" ",nw=!1;function mS(t,e){switch(t){case"keyup":return eV.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function pS(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var $a=!1;function nV(t,e){switch(t){case"compositionend":return pS(e);case"keypress":return e.which!==32?null:(nw=!0,tw);case"textInput":return t=e.data,t===tw&&nw?null:t;default:return null}}function iV(t,e){if($a)return t==="compositionend"||!ay&&mS(t,e)?(t=fS(),Kh=ry=Er=null,$a=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return dS&&e.locale!=="ko"?null:e.data;default:return null}}var rV={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function iw(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!rV[t.type]:e==="textarea"}function gS(t,e,n,i){Ya?ao?ao.push(i):ao=[i]:Ya=i,e=Hf(e,"onChange"),0<e.length&&(n=new Cd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var mu=null,ju=null;function sV(t){h0(t,0)}function Nd(t){var e=tu(t);if(aS(e))return t}function rw(t,e){if(t==="change")return e}var _S=!1;if(Mi){var cp;if(Mi){var hp="oninput"in document;if(!hp){var sw=document.createElement("div");sw.setAttribute("oninput","return;"),hp=typeof sw.oninput=="function"}cp=hp}else cp=!1;_S=cp&&(!document.documentMode||9<document.documentMode)}function aw(){mu&&(mu.detachEvent("onpropertychange",yS),ju=mu=null)}function yS(t){if(t.propertyName==="value"&&Nd(ju)){var e=[];gS(e,ju,t,iy(t)),hS(sV,e)}}function aV(t,e,n){t==="focusin"?(aw(),mu=e,ju=n,mu.attachEvent("onpropertychange",yS)):t==="focusout"&&aw()}function oV(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Nd(ju)}function lV(t,e){if(t==="click")return Nd(e)}function uV(t,e){if(t==="input"||t==="change")return Nd(e)}function cV(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var En=typeof Object.is=="function"?Object.is:cV;function Gu(t,e){if(En(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!mg.call(e,r)||!En(t[r],e[r]))return!1}return!0}function ow(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function lw(t,e){var n=ow(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ow(n)}}function vS(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?vS(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function TS(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=bf(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=bf(t.document)}return e}function oy(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var hV=Mi&&"documentMode"in document&&11>=document.documentMode,Wa=null,Eg=null,pu=null,wg=!1;function uw(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wg||Wa==null||Wa!==bf(i)||(i=Wa,"selectionStart"in i&&oy(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),pu&&Gu(pu,i)||(pu=i,i=Hf(Eg,"onSelect"),0<i.length&&(e=new Cd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Wa)))}function vs(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Xa={animationend:vs("Animation","AnimationEnd"),animationiteration:vs("Animation","AnimationIteration"),animationstart:vs("Animation","AnimationStart"),transitionrun:vs("Transition","TransitionRun"),transitionstart:vs("Transition","TransitionStart"),transitioncancel:vs("Transition","TransitionCancel"),transitionend:vs("Transition","TransitionEnd")},fp={},ES={};Mi&&(ES=document.createElement("div").style,"AnimationEvent"in window||(delete Xa.animationend.animation,delete Xa.animationiteration.animation,delete Xa.animationstart.animation),"TransitionEvent"in window||delete Xa.transitionend.transition);function da(t){if(fp[t])return fp[t];if(!Xa[t])return t;var e=Xa[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ES)return fp[t]=e[n];return t}var wS=da("animationend"),IS=da("animationiteration"),AS=da("animationstart"),fV=da("transitionrun"),dV=da("transitionstart"),mV=da("transitioncancel"),bS=da("transitionend"),SS=new Map,Ig="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ig.push("scrollEnd");function Qn(t,e){SS.set(t,e),ha(e,[t])}var Sf=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},bn=[],Ja=0,ly=0;function Pd(){for(var t=Ja,e=ly=Ja=0;e<t;){var n=bn[e];bn[e++]=null;var i=bn[e];bn[e++]=null;var r=bn[e];bn[e++]=null;var s=bn[e];if(bn[e++]=null,i!==null&&r!==null){var a=i.pending;a===null?r.next=r:(r.next=a.next,a.next=r),i.pending=r}s!==0&&RS(n,r,s)}}function Od(t,e,n,i){bn[Ja++]=t,bn[Ja++]=e,bn[Ja++]=n,bn[Ja++]=i,ly|=i,t.lanes|=i,t=t.alternate,t!==null&&(t.lanes|=i)}function uy(t,e,n,i){return Od(t,e,n,i),Rf(t)}function ma(t,e){return Od(t,null,null,e),Rf(t)}function RS(t,e,n){t.lanes|=n;var i=t.alternate;i!==null&&(i.lanes|=n);for(var r=!1,s=t.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(r=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,r&&e!==null&&(r=31-_n(n),t=s.hiddenUpdates,i=t[r],i===null?t[r]=[e]:i.push(e),e.lane=n|536870912),s):null}function Rf(t){if(50<Au)throw Au=0,jg=null,Error(x(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Za={};function pV(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hn(t,e,n,i){return new pV(t,e,n,i)}function cy(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ni(t,e){var n=t.alternate;return n===null?(n=hn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function CS(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Yh(t,e,n,i,r,s){var a=0;if(i=t,typeof t=="function")cy(t)&&(a=1);else if(typeof t=="string")a=T2(t,n,ui.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case cg:return t=hn(31,n,e,r),t.elementType=cg,t.lanes=s,t;case Ga:return zs(n.children,r,s,e);case Qb:a=8,r|=24;break;case og:return t=hn(12,n,e,r|2),t.elementType=og,t.lanes=s,t;case lg:return t=hn(13,n,e,r),t.elementType=lg,t.lanes=s,t;case ug:return t=hn(19,n,e,r),t.elementType=ug,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case bi:a=10;break e;case Yb:a=9;break e;case W_:a=11;break e;case X_:a=14;break e;case fr:a=16,i=null;break e}a=29,n=Error(x(130,t===null?"null":typeof t,"")),i=null}return e=hn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function zs(t,e,n,i){return t=hn(7,t,i,e),t.lanes=n,t}function dp(t,e,n){return t=hn(6,t,null,e),t.lanes=n,t}function DS(t){var e=hn(18,null,null,0);return e.stateNode=t,e}function mp(t,e,n){return e=hn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var cw=new WeakMap;function Nn(t,e){if(typeof t=="object"&&t!==null){var n=cw.get(t);return n!==void 0?n:(e={value:t,source:e,stack:jE(e)},cw.set(t,e),e)}return{value:t,source:e,stack:jE(e)}}var eo=[],to=0,Cf=null,Ku=0,Rn=[],Cn=0,qr=null,ni=1,ii="";function Ii(t,e){eo[to++]=Ku,eo[to++]=Cf,Cf=t,Ku=e}function NS(t,e,n){Rn[Cn++]=ni,Rn[Cn++]=ii,Rn[Cn++]=qr,qr=t;var i=ni;t=ii;var r=32-_n(i)-1;i&=~(1<<r),n+=1;var s=32-_n(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,ni=1<<32-_n(e)+r|n<<r|i,ii=s+t}else ni=1<<s|n<<r|i,ii=t}function hy(t){t.return!==null&&(Ii(t,1),NS(t,1,0))}function fy(t){for(;t===Cf;)Cf=eo[--to],eo[to]=null,Ku=eo[--to],eo[to]=null;for(;t===qr;)qr=Rn[--Cn],Rn[Cn]=null,ii=Rn[--Cn],Rn[Cn]=null,ni=Rn[--Cn],Rn[Cn]=null}function PS(t,e){Rn[Cn++]=ni,Rn[Cn++]=ii,Rn[Cn++]=qr,ni=e.id,ii=e.overflow,qr=t}var It=null,Ne=null,ce=!1,Dr=null,Pn=!1,Ag=Error(x(519));function Hr(t){var e=Error(x(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Qu(Nn(e,t)),Ag}function hw(t){var e=t.stateNode,n=t.type,i=t.memoizedProps;switch(e[wt]=t,e[rn]=i,n){case"dialog":re("cancel",e),re("close",e);break;case"iframe":case"object":case"embed":re("load",e);break;case"video":case"audio":for(n=0;n<Xu.length;n++)re(Xu[n],e);break;case"source":re("error",e);break;case"img":case"image":case"link":re("error",e),re("load",e);break;case"details":re("toggle",e);break;case"input":re("invalid",e),oS(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":re("invalid",e);break;case"textarea":re("invalid",e),uS(e,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||i.suppressHydrationWarning===!0||d0(e.textContent,n)?(i.popover!=null&&(re("beforetoggle",e),re("toggle",e)),i.onScroll!=null&&re("scroll",e),i.onScrollEnd!=null&&re("scrollend",e),i.onClick!=null&&(e.onclick=Si),e=!0):e=!1,e||Hr(t,!0)}function fw(t){for(It=t.return;It;)switch(It.tag){case 5:case 31:case 13:Pn=!1;return;case 27:case 3:Pn=!0;return;default:It=It.return}}function Ra(t){if(t!==It)return!1;if(!ce)return fw(t),ce=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||$g(t.type,t.memoizedProps)),n=!n),n&&Ne&&Hr(t),fw(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(x(317));Ne=Jw(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(x(317));Ne=Jw(t)}else e===27?(e=Ne,rs(t.type)?(t=Zg,Zg=null,Ne=t):Ne=e):Ne=It?kn(t.stateNode.nextSibling):null;return!0}function Qs(){Ne=It=null,ce=!1}function pp(){var t=Dr;return t!==null&&(Wt===null?Wt=t:Wt.push.apply(Wt,t),Dr=null),t}function Qu(t){Dr===null?Dr=[t]:Dr.push(t)}var bg=gi(null),pa=null,Ri=null;function mr(t,e,n){be(bg,e._currentValue),e._currentValue=n}function Pi(t){t._currentValue=bg.current,yt(bg)}function Sg(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Rg(t,e,n,i){var r=t.child;for(r!==null&&(r.return=t);r!==null;){var s=r.dependencies;if(s!==null){var a=r.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=r;for(var u=0;u<e.length;u++)if(o.context===e[u]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Sg(s.return,n,t),i||(a=null);break e}s=o.next}}else if(r.tag===18){if(a=r.return,a===null)throw Error(x(341));a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Sg(a,n,t),a=null}else a=r.child;if(a!==null)a.return=r;else for(a=r;a!==null;){if(a===t){a=null;break}if(r=a.sibling,r!==null){r.return=a.return,a=r;break}a=a.return}r=a}}function tl(t,e,n,i){t=null;for(var r=e,s=!1;r!==null;){if(!s){if(r.flags&524288)s=!0;else if(r.flags&262144)break}if(r.tag===10){var a=r.alternate;if(a===null)throw Error(x(387));if(a=a.memoizedProps,a!==null){var o=r.type;En(r.pendingProps.value,a.value)||(t!==null?t.push(o):t=[o])}}else if(r===Ef.current){if(a=r.alternate,a===null)throw Error(x(387));a.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(t!==null?t.push(Zu):t=[Zu])}r=r.return}t!==null&&Rg(e,t,n,i),e.flags|=262144}function Df(t){for(t=t.firstContext;t!==null;){if(!En(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ys(t){pa=t,Ri=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function bt(t){return OS(pa,t)}function bh(t,e){return pa===null&&Ys(t),OS(t,e)}function OS(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ri===null){if(t===null)throw Error(x(308));Ri=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ri=Ri.next=e;return n}var gV=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,i){t.push(i)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},_V=ht.unstable_scheduleCallback,yV=ht.unstable_NormalPriority,st={$$typeof:bi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function dy(){return{controller:new gV,data:new Map,refCount:0}}function Pc(t){t.refCount--,t.refCount===0&&_V(yV,function(){t.controller.abort()})}var gu=null,Cg=0,Eo=0,oo=null;function vV(t,e){if(gu===null){var n=gu=[];Cg=0,Eo=Uy(),oo={status:"pending",value:void 0,then:function(i){n.push(i)}}}return Cg++,e.then(dw,dw),e}function dw(){if(--Cg===0&&gu!==null){oo!==null&&(oo.status="fulfilled");var t=gu;gu=null,Eo=0,oo=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function TV(t,e){var n=[],i={status:"pending",value:null,reason:null,then:function(r){n.push(r)}};return t.then(function(){i.status="fulfilled",i.value=e;for(var r=0;r<n.length;r++)(0,n[r])(e)},function(r){for(i.status="rejected",i.reason=r,r=0;r<n.length;r++)(0,n[r])(void 0)}),i}var mw=W.S;W.S=function(t,e){KR=pn(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&vV(t,e),mw!==null&&mw(t,e)};var Bs=gi(null);function my(){var t=Bs.current;return t!==null?t:Ie.pooledCache}function $h(t,e){e===null?be(Bs,Bs.current):be(Bs,e.pool)}function VS(){var t=my();return t===null?null:{parent:st._currentValue,pool:t}}var nl=Error(x(460)),py=Error(x(474)),Vd=Error(x(542)),Nf={then:function(){}};function pw(t){return t=t.status,t==="fulfilled"||t==="rejected"}function kS(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Si,Si),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,_w(t),t;default:if(typeof e.status=="string")e.then(Si,Si);else{if(t=Ie,t!==null&&100<t.shellSuspendCounter)throw Error(x(482));t=e,t.status="pending",t.then(function(i){if(e.status==="pending"){var r=e;r.status="fulfilled",r.value=i}},function(i){if(e.status==="pending"){var r=e;r.status="rejected",r.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,_w(t),t}throw Fs=e,nl}}function Is(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Fs=n,nl):n}}var Fs=null;function gw(){if(Fs===null)throw Error(x(459));var t=Fs;return Fs=null,t}function _w(t){if(t===nl||t===Vd)throw Error(x(483))}var lo=null,Yu=0;function Sh(t){var e=Yu;return Yu+=1,lo===null&&(lo=[]),kS(lo,t,e)}function zl(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function Rh(t,e){throw e.$$typeof===aO?Error(x(525)):(t=Object.prototype.toString.call(e),Error(x(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function MS(t){function e(w,v){if(t){var I=w.deletions;I===null?(w.deletions=[v],w.flags|=16):I.push(v)}}function n(w,v){if(!t)return null;for(;v!==null;)e(w,v),v=v.sibling;return null}function i(w){for(var v=new Map;w!==null;)w.key!==null?v.set(w.key,w):v.set(w.index,w),w=w.sibling;return v}function r(w,v){return w=Ni(w,v),w.index=0,w.sibling=null,w}function s(w,v,I){return w.index=I,t?(I=w.alternate,I!==null?(I=I.index,I<v?(w.flags|=67108866,v):I):(w.flags|=67108866,v)):(w.flags|=1048576,v)}function a(w){return t&&w.alternate===null&&(w.flags|=67108866),w}function o(w,v,I,C){return v===null||v.tag!==6?(v=dp(I,w.mode,C),v.return=w,v):(v=r(v,I),v.return=w,v)}function u(w,v,I,C){var z=I.type;return z===Ga?h(w,v,I.props.children,C,I.key):v!==null&&(v.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===fr&&Is(z)===v.type)?(v=r(v,I.props),zl(v,I),v.return=w,v):(v=Yh(I.type,I.key,I.props,null,w.mode,C),zl(v,I),v.return=w,v)}function c(w,v,I,C){return v===null||v.tag!==4||v.stateNode.containerInfo!==I.containerInfo||v.stateNode.implementation!==I.implementation?(v=mp(I,w.mode,C),v.return=w,v):(v=r(v,I.children||[]),v.return=w,v)}function h(w,v,I,C,z){return v===null||v.tag!==7?(v=zs(I,w.mode,C,z),v.return=w,v):(v=r(v,I),v.return=w,v)}function d(w,v,I){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=dp(""+v,w.mode,I),v.return=w,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case vh:return I=Yh(v.type,v.key,v.props,null,w.mode,I),zl(I,v),I.return=w,I;case Zl:return v=mp(v,w.mode,I),v.return=w,v;case fr:return v=Is(v),d(w,v,I)}if(eu(v)||xl(v))return v=zs(v,w.mode,I,null),v.return=w,v;if(typeof v.then=="function")return d(w,Sh(v),I);if(v.$$typeof===bi)return d(w,bh(w,v),I);Rh(w,v)}return null}function m(w,v,I,C){var z=v!==null?v.key:null;if(typeof I=="string"&&I!==""||typeof I=="number"||typeof I=="bigint")return z!==null?null:o(w,v,""+I,C);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case vh:return I.key===z?u(w,v,I,C):null;case Zl:return I.key===z?c(w,v,I,C):null;case fr:return I=Is(I),m(w,v,I,C)}if(eu(I)||xl(I))return z!==null?null:h(w,v,I,C,null);if(typeof I.then=="function")return m(w,v,Sh(I),C);if(I.$$typeof===bi)return m(w,v,bh(w,I),C);Rh(w,I)}return null}function g(w,v,I,C,z){if(typeof C=="string"&&C!==""||typeof C=="number"||typeof C=="bigint")return w=w.get(I)||null,o(v,w,""+C,z);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case vh:return w=w.get(C.key===null?I:C.key)||null,u(v,w,C,z);case Zl:return w=w.get(C.key===null?I:C.key)||null,c(v,w,C,z);case fr:return C=Is(C),g(w,v,I,C,z)}if(eu(C)||xl(C))return w=w.get(I)||null,h(v,w,C,z,null);if(typeof C.then=="function")return g(w,v,I,Sh(C),z);if(C.$$typeof===bi)return g(w,v,I,bh(v,C),z);Rh(v,C)}return null}function R(w,v,I,C){for(var z=null,F=null,T=v,y=v=0,E=null;T!==null&&y<I.length;y++){T.index>y?(E=T,T=null):E=T.sibling;var b=m(w,T,I[y],C);if(b===null){T===null&&(T=E);break}t&&T&&b.alternate===null&&e(w,T),v=s(b,v,y),F===null?z=b:F.sibling=b,F=b,T=E}if(y===I.length)return n(w,T),ce&&Ii(w,y),z;if(T===null){for(;y<I.length;y++)T=d(w,I[y],C),T!==null&&(v=s(T,v,y),F===null?z=T:F.sibling=T,F=T);return ce&&Ii(w,y),z}for(T=i(T);y<I.length;y++)E=g(T,w,y,I[y],C),E!==null&&(t&&E.alternate!==null&&T.delete(E.key===null?y:E.key),v=s(E,v,y),F===null?z=E:F.sibling=E,F=E);return t&&T.forEach(function(S){return e(w,S)}),ce&&Ii(w,y),z}function D(w,v,I,C){if(I==null)throw Error(x(151));for(var z=null,F=null,T=v,y=v=0,E=null,b=I.next();T!==null&&!b.done;y++,b=I.next()){T.index>y?(E=T,T=null):E=T.sibling;var S=m(w,T,b.value,C);if(S===null){T===null&&(T=E);break}t&&T&&S.alternate===null&&e(w,T),v=s(S,v,y),F===null?z=S:F.sibling=S,F=S,T=E}if(b.done)return n(w,T),ce&&Ii(w,y),z;if(T===null){for(;!b.done;y++,b=I.next())b=d(w,b.value,C),b!==null&&(v=s(b,v,y),F===null?z=b:F.sibling=b,F=b);return ce&&Ii(w,y),z}for(T=i(T);!b.done;y++,b=I.next())b=g(T,w,y,b.value,C),b!==null&&(t&&b.alternate!==null&&T.delete(b.key===null?y:b.key),v=s(b,v,y),F===null?z=b:F.sibling=b,F=b);return t&&T.forEach(function(P){return e(w,P)}),ce&&Ii(w,y),z}function V(w,v,I,C){if(typeof I=="object"&&I!==null&&I.type===Ga&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case vh:e:{for(var z=I.key;v!==null;){if(v.key===z){if(z=I.type,z===Ga){if(v.tag===7){n(w,v.sibling),C=r(v,I.props.children),C.return=w,w=C;break e}}else if(v.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===fr&&Is(z)===v.type){n(w,v.sibling),C=r(v,I.props),zl(C,I),C.return=w,w=C;break e}n(w,v);break}else e(w,v);v=v.sibling}I.type===Ga?(C=zs(I.props.children,w.mode,C,I.key),C.return=w,w=C):(C=Yh(I.type,I.key,I.props,null,w.mode,C),zl(C,I),C.return=w,w=C)}return a(w);case Zl:e:{for(z=I.key;v!==null;){if(v.key===z)if(v.tag===4&&v.stateNode.containerInfo===I.containerInfo&&v.stateNode.implementation===I.implementation){n(w,v.sibling),C=r(v,I.children||[]),C.return=w,w=C;break e}else{n(w,v);break}else e(w,v);v=v.sibling}C=mp(I,w.mode,C),C.return=w,w=C}return a(w);case fr:return I=Is(I),V(w,v,I,C)}if(eu(I))return R(w,v,I,C);if(xl(I)){if(z=xl(I),typeof z!="function")throw Error(x(150));return I=z.call(I),D(w,v,I,C)}if(typeof I.then=="function")return V(w,v,Sh(I),C);if(I.$$typeof===bi)return V(w,v,bh(w,I),C);Rh(w,I)}return typeof I=="string"&&I!==""||typeof I=="number"||typeof I=="bigint"?(I=""+I,v!==null&&v.tag===6?(n(w,v.sibling),C=r(v,I),C.return=w,w=C):(n(w,v),C=dp(I,w.mode,C),C.return=w,w=C),a(w)):n(w,v)}return function(w,v,I,C){try{Yu=0;var z=V(w,v,I,C);return lo=null,z}catch(T){if(T===nl||T===Vd)throw T;var F=hn(29,T,null,w.mode);return F.lanes=C,F.return=w,F}finally{}}}var $s=MS(!0),xS=MS(!1),dr=!1;function gy(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Dg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Nr(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Pr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,de&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,e=Rf(t),RS(t,null,n),e}return Od(t,i,e,n),Rf(t)}function _u(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,eS(t,n)}}function gp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Ng=!1;function yu(){if(Ng){var t=oo;if(t!==null)throw t}}function vu(t,e,n,i){Ng=!1;var r=t.updateQueue;dr=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var u=o,c=u.next;u.next=null,a===null?s=c:a.next=c,a=u;var h=t.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==a&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=u))}if(s!==null){var d=r.baseState;a=0,h=c=u=null,o=s;do{var m=o.lane&-536870913,g=m!==o.lane;if(g?(le&m)===m:(i&m)===m){m!==0&&m===Eo&&(Ng=!0),h!==null&&(h=h.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var R=t,D=o;m=e;var V=n;switch(D.tag){case 1:if(R=D.payload,typeof R=="function"){d=R.call(V,d,m);break e}d=R;break e;case 3:R.flags=R.flags&-65537|128;case 0:if(R=D.payload,m=typeof R=="function"?R.call(V,d,m):R,m==null)break e;d=ke({},d,m);break e;case 2:dr=!0}}m=o.callback,m!==null&&(t.flags|=64,g&&(t.flags|=8192),g=r.callbacks,g===null?r.callbacks=[m]:g.push(m))}else g={lane:m,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=g,u=d):h=h.next=g,a|=m;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;g=o,o=g.next,g.next=null,r.lastBaseUpdate=g,r.shared.pending=null}}while(!0);h===null&&(u=d),r.baseState=u,r.firstBaseUpdate=c,r.lastBaseUpdate=h,s===null&&(r.shared.lanes=0),Gr|=a,t.lanes=a,t.memoizedState=d}}function LS(t,e){if(typeof t!="function")throw Error(x(191,t));t.call(e)}function US(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)LS(n[t],e)}var wo=gi(null),Pf=gi(0);function yw(t,e){t=zi,be(Pf,t),be(wo,e),zi=t|e.baseLanes}function Pg(){be(Pf,zi),be(wo,wo.current)}function _y(){zi=Pf.current,yt(wo),yt(Pf)}var wn=gi(null),Vn=null;function pr(t){var e=t.alternate;be(We,We.current&1),be(wn,t),Vn===null&&(e===null||wo.current!==null||e.memoizedState!==null)&&(Vn=t)}function Og(t){be(We,We.current),be(wn,t),Vn===null&&(Vn=t)}function zS(t){t.tag===22?(be(We,We.current),be(wn,t),Vn===null&&(Vn=t)):gr()}function gr(){be(We,We.current),be(wn,wn.current)}function un(t){yt(wn),Vn===t&&(Vn=null),yt(We)}var We=gi(0);function Of(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Xg(n)||Jg(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var xi=0,ee=null,Ee=null,it=null,Vf=!1,uo=!1,Ws=!1,kf=0,$u=0,co=null,EV=0;function je(){throw Error(x(321))}function yy(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!En(t[n],e[n]))return!1;return!0}function vy(t,e,n,i,r,s){return xi=s,ee=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,W.H=t===null||t.memoizedState===null?gR:Ny,Ws=!1,s=n(i,r),Ws=!1,uo&&(s=FS(e,n,i,r)),BS(t),s}function BS(t){W.H=Wu;var e=Ee!==null&&Ee.next!==null;if(xi=0,it=Ee=ee=null,Vf=!1,$u=0,co=null,e)throw Error(x(300));t===null||at||(t=t.dependencies,t!==null&&Df(t)&&(at=!0))}function FS(t,e,n,i){ee=t;var r=0;do{if(uo&&(co=null),$u=0,uo=!1,25<=r)throw Error(x(301));if(r+=1,it=Ee=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}W.H=_R,s=e(n,i)}while(uo);return s}function wV(){var t=W.H,e=t.useState()[0];return e=typeof e.then=="function"?Oc(e):e,t=t.useState()[0],(Ee!==null?Ee.memoizedState:null)!==t&&(ee.flags|=1024),e}function Ty(){var t=kf!==0;return kf=0,t}function Ey(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function wy(t){if(Vf){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Vf=!1}xi=0,it=Ee=ee=null,uo=!1,$u=kf=0,co=null}function Bt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return it===null?ee.memoizedState=it=t:it=it.next=t,it}function Je(){if(Ee===null){var t=ee.alternate;t=t!==null?t.memoizedState:null}else t=Ee.next;var e=it===null?ee.memoizedState:it.next;if(e!==null)it=e,Ee=t;else{if(t===null)throw ee.alternate===null?Error(x(467)):Error(x(310));Ee=t,t={memoizedState:Ee.memoizedState,baseState:Ee.baseState,baseQueue:Ee.baseQueue,queue:Ee.queue,next:null},it===null?ee.memoizedState=it=t:it=it.next=t}return it}function kd(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Oc(t){var e=$u;return $u+=1,co===null&&(co=[]),t=kS(co,t,e),e=ee,(it===null?e.memoizedState:it.next)===null&&(e=e.alternate,W.H=e===null||e.memoizedState===null?gR:Ny),t}function Md(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Oc(t);if(t.$$typeof===bi)return bt(t)}throw Error(x(438,String(t)))}function Iy(t){var e=null,n=ee.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var i=ee.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(r){return r.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=kd(),ee.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),i=0;i<t;i++)n[i]=oO;return e.index++,n}function Li(t,e){return typeof e=="function"?e(t):e}function Wh(t){var e=Je();return Ay(e,Ee,t)}function Ay(t,e,n){var i=t.queue;if(i===null)throw Error(x(311));i.lastRenderedReducer=n;var r=t.baseQueue,s=i.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}e.baseQueue=r=s,i.pending=null}if(s=t.baseState,r===null)t.memoizedState=s;else{e=r.next;var o=a=null,u=null,c=e,h=!1;do{var d=c.lane&-536870913;if(d!==c.lane?(le&d)===d:(xi&d)===d){var m=c.revertLane;if(m===0)u!==null&&(u=u.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),d===Eo&&(h=!0);else if((xi&m)===m){c=c.next,m===Eo&&(h=!0);continue}else d={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},u===null?(o=u=d,a=s):u=u.next=d,ee.lanes|=m,Gr|=m;d=c.action,Ws&&n(s,d),s=c.hasEagerState?c.eagerState:n(s,d)}else m={lane:d,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},u===null?(o=u=m,a=s):u=u.next=m,ee.lanes|=d,Gr|=d;c=c.next}while(c!==null&&c!==e);if(u===null?a=s:u.next=o,!En(s,t.memoizedState)&&(at=!0,h&&(n=oo,n!==null)))throw n;t.memoizedState=s,t.baseState=a,t.baseQueue=u,i.lastRenderedState=s}return r===null&&(i.lanes=0),[t.memoizedState,i.dispatch]}function _p(t){var e=Je(),n=e.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);En(s,e.memoizedState)||(at=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function qS(t,e,n){var i=ee,r=Je(),s=ce;if(s){if(n===void 0)throw Error(x(407));n=n()}else n=e();var a=!En((Ee||r).memoizedState,n);if(a&&(r.memoizedState=n,at=!0),r=r.queue,by(GS.bind(null,i,r,t),[t]),r.getSnapshot!==e||a||it!==null&&it.memoizedState.tag&1){if(i.flags|=2048,Io(9,{destroy:void 0},jS.bind(null,i,r,n,e),null),Ie===null)throw Error(x(349));s||xi&127||HS(i,e,n)}return n}function HS(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ee.updateQueue,e===null?(e=kd(),ee.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function jS(t,e,n,i){e.value=n,e.getSnapshot=i,KS(e)&&QS(t)}function GS(t,e,n){return n(function(){KS(e)&&QS(t)})}function KS(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!En(t,n)}catch{return!0}}function QS(t){var e=ma(t,2);e!==null&&nn(e,t,2)}function Vg(t){var e=Bt();if(typeof t=="function"){var n=t;if(t=n(),Ws){Tr(!0);try{n()}finally{Tr(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Li,lastRenderedState:t},e}function YS(t,e,n,i){return t.baseState=n,Ay(t,Ee,typeof i=="function"?i:Li)}function IV(t,e,n,i,r){if(Ld(t))throw Error(x(485));if(t=e.action,t!==null){var s={payload:r,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(a){s.listeners.push(a)}};W.T!==null?n(!0):s.isTransition=!1,i(s),n=e.pending,n===null?(s.next=e.pending=s,$S(e,s)):(s.next=n.next,e.pending=n.next=s)}}function $S(t,e){var n=e.action,i=e.payload,r=t.state;if(e.isTransition){var s=W.T,a={};W.T=a;try{var o=n(r,i),u=W.S;u!==null&&u(a,o),vw(t,e,o)}catch(c){kg(t,e,c)}finally{s!==null&&a.types!==null&&(s.types=a.types),W.T=s}}else try{s=n(r,i),vw(t,e,s)}catch(c){kg(t,e,c)}}function vw(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Tw(t,e,i)},function(i){return kg(t,e,i)}):Tw(t,e,n)}function Tw(t,e,n){e.status="fulfilled",e.value=n,WS(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,$S(t,n)))}function kg(t,e,n){var i=t.pending;if(t.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=n,WS(e),e=e.next;while(e!==i)}t.action=null}function WS(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function XS(t,e){return e}function Ew(t,e){if(ce){var n=Ie.formState;if(n!==null){e:{var i=ee;if(ce){if(Ne){t:{for(var r=Ne,s=Pn;r.nodeType!==8;){if(!s){r=null;break t}if(r=kn(r.nextSibling),r===null){r=null;break t}}s=r.data,r=s==="F!"||s==="F"?r:null}if(r){Ne=kn(r.nextSibling),i=r.data==="F!";break e}}Hr(i)}i=!1}i&&(e=n[0])}}return n=Bt(),n.memoizedState=n.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:XS,lastRenderedState:e},n.queue=i,n=dR.bind(null,ee,i),i.dispatch=n,i=Vg(!1),s=Dy.bind(null,ee,!1,i.queue),i=Bt(),r={state:e,dispatch:null,action:t,pending:null},i.queue=r,n=IV.bind(null,ee,r,s,n),r.dispatch=n,i.memoizedState=t,[e,n,!1]}function ww(t){var e=Je();return JS(e,Ee,t)}function JS(t,e,n){if(e=Ay(t,e,XS)[0],t=Wh(Li)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=Oc(e)}catch(a){throw a===nl?Vd:a}else i=e;e=Je();var r=e.queue,s=r.dispatch;return n!==e.memoizedState&&(ee.flags|=2048,Io(9,{destroy:void 0},AV.bind(null,r,n),null)),[i,s,t]}function AV(t,e){t.action=e}function Iw(t){var e=Je(),n=Ee;if(n!==null)return JS(e,n,t);Je(),e=e.memoizedState,n=Je();var i=n.queue.dispatch;return n.memoizedState=t,[e,i,!1]}function Io(t,e,n,i){return t={tag:t,create:n,deps:i,inst:e,next:null},e=ee.updateQueue,e===null&&(e=kd(),ee.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t),t}function ZS(){return Je().memoizedState}function Xh(t,e,n,i){var r=Bt();ee.flags|=t,r.memoizedState=Io(1|e,{destroy:void 0},n,i===void 0?null:i)}function xd(t,e,n,i){var r=Je();i=i===void 0?null:i;var s=r.memoizedState.inst;Ee!==null&&i!==null&&yy(i,Ee.memoizedState.deps)?r.memoizedState=Io(e,s,n,i):(ee.flags|=t,r.memoizedState=Io(1|e,s,n,i))}function Aw(t,e){Xh(8390656,8,t,e)}function by(t,e){xd(2048,8,t,e)}function bV(t){ee.flags|=4;var e=ee.updateQueue;if(e===null)e=kd(),ee.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function eR(t){var e=Je().memoizedState;return bV({ref:e,nextImpl:t}),function(){if(de&2)throw Error(x(440));return e.impl.apply(void 0,arguments)}}function tR(t,e){return xd(4,2,t,e)}function nR(t,e){return xd(4,4,t,e)}function iR(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function rR(t,e,n){n=n!=null?n.concat([t]):null,xd(4,4,iR.bind(null,e,t),n)}function Sy(){}function sR(t,e){var n=Je();e=e===void 0?null:e;var i=n.memoizedState;return e!==null&&yy(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function aR(t,e){var n=Je();e=e===void 0?null:e;var i=n.memoizedState;if(e!==null&&yy(e,i[1]))return i[0];if(i=t(),Ws){Tr(!0);try{t()}finally{Tr(!1)}}return n.memoizedState=[i,e],i}function Ry(t,e,n){return n===void 0||xi&1073741824&&!(le&261930)?t.memoizedState=e:(t.memoizedState=n,t=YR(),ee.lanes|=t,Gr|=t,n)}function oR(t,e,n,i){return En(n,e)?n:wo.current!==null?(t=Ry(t,n,i),En(t,e)||(at=!0),t):!(xi&42)||xi&1073741824&&!(le&261930)?(at=!0,t.memoizedState=n):(t=YR(),ee.lanes|=t,Gr|=t,e)}function lR(t,e,n,i,r){var s=me.p;me.p=s!==0&&8>s?s:8;var a=W.T,o={};W.T=o,Dy(t,!1,e,n);try{var u=r(),c=W.S;if(c!==null&&c(o,u),u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=TV(u,i);Tu(t,e,h,yn(t))}else Tu(t,e,i,yn(t))}catch(d){Tu(t,e,{then:function(){},status:"rejected",reason:d},yn())}finally{me.p=s,a!==null&&o.types!==null&&(a.types=o.types),W.T=a}}function SV(){}function Mg(t,e,n,i){if(t.tag!==5)throw Error(x(476));var r=uR(t).queue;lR(t,r,e,Us,n===null?SV:function(){return cR(t),n(i)})}function uR(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Us,baseState:Us,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Li,lastRenderedState:Us},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Li,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function cR(t){var e=uR(t);e.next===null&&(e=t.alternate.memoizedState),Tu(t,e.next.queue,{},yn())}function Cy(){return bt(Zu)}function hR(){return Je().memoizedState}function fR(){return Je().memoizedState}function RV(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=yn();t=Nr(n);var i=Pr(e,t,n);i!==null&&(nn(i,e,n),_u(i,e,n)),e={cache:dy()},t.payload=e;return}e=e.return}}function CV(t,e,n){var i=yn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ld(t)?mR(e,n):(n=uy(t,e,n,i),n!==null&&(nn(n,t,i),pR(n,e,i)))}function dR(t,e,n){var i=yn();Tu(t,e,n,i)}function Tu(t,e,n,i){var r={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ld(t))mR(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,En(o,a))return Od(t,e,r,0),Ie===null&&Pd(),!1}catch{}finally{}if(n=uy(t,e,r,i),n!==null)return nn(n,t,i),pR(n,e,i),!0}return!1}function Dy(t,e,n,i){if(i={lane:2,revertLane:Uy(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Ld(t)){if(e)throw Error(x(479))}else e=uy(t,n,i,2),e!==null&&nn(e,t,2)}function Ld(t){var e=t.alternate;return t===ee||e!==null&&e===ee}function mR(t,e){uo=Vf=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function pR(t,e,n){if(n&4194048){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,eS(t,n)}}var Wu={readContext:bt,use:Md,useCallback:je,useContext:je,useEffect:je,useImperativeHandle:je,useLayoutEffect:je,useInsertionEffect:je,useMemo:je,useReducer:je,useRef:je,useState:je,useDebugValue:je,useDeferredValue:je,useTransition:je,useSyncExternalStore:je,useId:je,useHostTransitionStatus:je,useFormState:je,useActionState:je,useOptimistic:je,useMemoCache:je,useCacheRefresh:je};Wu.useEffectEvent=je;var gR={readContext:bt,use:Md,useCallback:function(t,e){return Bt().memoizedState=[t,e===void 0?null:e],t},useContext:bt,useEffect:Aw,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Xh(4194308,4,iR.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Xh(4194308,4,t,e)},useInsertionEffect:function(t,e){Xh(4,2,t,e)},useMemo:function(t,e){var n=Bt();e=e===void 0?null:e;var i=t();if(Ws){Tr(!0);try{t()}finally{Tr(!1)}}return n.memoizedState=[i,e],i},useReducer:function(t,e,n){var i=Bt();if(n!==void 0){var r=n(e);if(Ws){Tr(!0);try{n(e)}finally{Tr(!1)}}}else r=e;return i.memoizedState=i.baseState=r,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:r},i.queue=t,t=t.dispatch=CV.bind(null,ee,t),[i.memoizedState,t]},useRef:function(t){var e=Bt();return t={current:t},e.memoizedState=t},useState:function(t){t=Vg(t);var e=t.queue,n=dR.bind(null,ee,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:Sy,useDeferredValue:function(t,e){var n=Bt();return Ry(n,t,e)},useTransition:function(){var t=Vg(!1);return t=lR.bind(null,ee,t.queue,!0,!1),Bt().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var i=ee,r=Bt();if(ce){if(n===void 0)throw Error(x(407));n=n()}else{if(n=e(),Ie===null)throw Error(x(349));le&127||HS(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Aw(GS.bind(null,i,s,t),[t]),i.flags|=2048,Io(9,{destroy:void 0},jS.bind(null,i,s,n,e),null),n},useId:function(){var t=Bt(),e=Ie.identifierPrefix;if(ce){var n=ii,i=ni;n=(i&~(1<<32-_n(i)-1)).toString(32)+n,e="_"+e+"R_"+n,n=kf++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=EV++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Cy,useFormState:Ew,useActionState:Ew,useOptimistic:function(t){var e=Bt();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Dy.bind(null,ee,!0,n),n.dispatch=e,[t,e]},useMemoCache:Iy,useCacheRefresh:function(){return Bt().memoizedState=RV.bind(null,ee)},useEffectEvent:function(t){var e=Bt(),n={impl:t};return e.memoizedState=n,function(){if(de&2)throw Error(x(440));return n.impl.apply(void 0,arguments)}}},Ny={readContext:bt,use:Md,useCallback:sR,useContext:bt,useEffect:by,useImperativeHandle:rR,useInsertionEffect:tR,useLayoutEffect:nR,useMemo:aR,useReducer:Wh,useRef:ZS,useState:function(){return Wh(Li)},useDebugValue:Sy,useDeferredValue:function(t,e){var n=Je();return oR(n,Ee.memoizedState,t,e)},useTransition:function(){var t=Wh(Li)[0],e=Je().memoizedState;return[typeof t=="boolean"?t:Oc(t),e]},useSyncExternalStore:qS,useId:hR,useHostTransitionStatus:Cy,useFormState:ww,useActionState:ww,useOptimistic:function(t,e){var n=Je();return YS(n,Ee,t,e)},useMemoCache:Iy,useCacheRefresh:fR};Ny.useEffectEvent=eR;var _R={readContext:bt,use:Md,useCallback:sR,useContext:bt,useEffect:by,useImperativeHandle:rR,useInsertionEffect:tR,useLayoutEffect:nR,useMemo:aR,useReducer:_p,useRef:ZS,useState:function(){return _p(Li)},useDebugValue:Sy,useDeferredValue:function(t,e){var n=Je();return Ee===null?Ry(n,t,e):oR(n,Ee.memoizedState,t,e)},useTransition:function(){var t=_p(Li)[0],e=Je().memoizedState;return[typeof t=="boolean"?t:Oc(t),e]},useSyncExternalStore:qS,useId:hR,useHostTransitionStatus:Cy,useFormState:Iw,useActionState:Iw,useOptimistic:function(t,e){var n=Je();return Ee!==null?YS(n,Ee,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:Iy,useCacheRefresh:fR};_R.useEffectEvent=eR;function yp(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:ke({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var xg={enqueueSetState:function(t,e,n){t=t._reactInternals;var i=yn(),r=Nr(i);r.payload=e,n!=null&&(r.callback=n),e=Pr(t,r,i),e!==null&&(nn(e,t,i),_u(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=yn(),r=Nr(i);r.tag=1,r.payload=e,n!=null&&(r.callback=n),e=Pr(t,r,i),e!==null&&(nn(e,t,i),_u(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=yn(),i=Nr(n);i.tag=2,e!=null&&(i.callback=e),e=Pr(t,i,n),e!==null&&(nn(e,t,n),_u(e,t,n))}};function bw(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Gu(n,i)||!Gu(r,s):!0}function Sw(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&xg.enqueueReplaceState(e,e.state,null)}function Xs(t,e){var n=e;if("ref"in e){n={};for(var i in e)i!=="ref"&&(n[i]=e[i])}if(t=t.defaultProps){n===e&&(n=ke({},n));for(var r in t)n[r]===void 0&&(n[r]=t[r])}return n}function yR(t){Sf(t)}function vR(t){console.error(t)}function TR(t){Sf(t)}function Mf(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function Rw(t,e,n){try{var i=t.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function Lg(t,e,n){return n=Nr(n),n.tag=3,n.payload={element:null},n.callback=function(){Mf(t,e)},n}function ER(t){return t=Nr(t),t.tag=3,t}function wR(t,e,n,i){var r=n.type.getDerivedStateFromError;if(typeof r=="function"){var s=i.value;t.payload=function(){return r(s)},t.callback=function(){Rw(e,n,i)}}var a=n.stateNode;a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){Rw(e,n,i),typeof r!="function"&&(Or===null?Or=new Set([this]):Or.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function DV(t,e,n,i,r){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=n.alternate,e!==null&&tl(e,n,r,!0),n=wn.current,n!==null){switch(n.tag){case 31:case 13:return Vn===null?Bf():n.alternate===null&&Ge===0&&(Ge=3),n.flags&=-257,n.flags|=65536,n.lanes=r,i===Nf?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([i]):e.add(i),Dp(t,i,r)),!1;case 22:return n.flags|=65536,i===Nf?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([i]):n.add(i)),Dp(t,i,r)),!1}throw Error(x(435,n.tag))}return Dp(t,i,r),Bf(),!1}if(ce)return e=wn.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=r,i!==Ag&&(t=Error(x(422),{cause:i}),Qu(Nn(t,n)))):(i!==Ag&&(e=Error(x(423),{cause:i}),Qu(Nn(e,n))),t=t.current.alternate,t.flags|=65536,r&=-r,t.lanes|=r,i=Nn(i,n),r=Lg(t.stateNode,i,r),gp(t,r),Ge!==4&&(Ge=2)),!1;var s=Error(x(520),{cause:i});if(s=Nn(s,n),Iu===null?Iu=[s]:Iu.push(s),Ge!==4&&(Ge=2),e===null)return!0;i=Nn(i,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=r&-r,n.lanes|=t,t=Lg(n.stateNode,i,t),gp(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(Or===null||!Or.has(s))))return n.flags|=65536,r&=-r,n.lanes|=r,r=ER(r),wR(r,t,n,i),gp(n,r),!1}n=n.return}while(n!==null);return!1}var Py=Error(x(461)),at=!1;function Tt(t,e,n,i){e.child=t===null?xS(e,null,n,i):$s(e,t.child,n,i)}function Cw(t,e,n,i,r){n=n.render;var s=e.ref;if("ref"in i){var a={};for(var o in i)o!=="ref"&&(a[o]=i[o])}else a=i;return Ys(e),i=vy(t,e,n,a,s,r),o=Ty(),t!==null&&!at?(Ey(t,e,r),Ui(t,e,r)):(ce&&o&&hy(e),e.flags|=1,Tt(t,e,i,r),e.child)}function Dw(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!cy(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,IR(t,e,s,i,r)):(t=Yh(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!Oy(t,r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Gu,n(a,i)&&t.ref===e.ref)return Ui(t,e,r)}return e.flags|=1,t=Ni(s,i),t.ref=e.ref,t.return=e,e.child=t}function IR(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Gu(s,i)&&t.ref===e.ref)if(at=!1,e.pendingProps=i=s,Oy(t,r))t.flags&131072&&(at=!0);else return e.lanes=t.lanes,Ui(t,e,r)}return Ug(t,e,n,i,r)}function AR(t,e,n,i){var r=i.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(e.flags&128){if(s=s!==null?s.baseLanes|n:n,t!==null){for(i=e.child=t.child,r=0;i!==null;)r=r|i.lanes|i.childLanes,i=i.sibling;i=r&~s}else i=0,e.child=null;return Nw(t,e,s,n,i)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&$h(e,s!==null?s.cachePool:null),s!==null?yw(e,s):Pg(),zS(e);else return i=e.lanes=536870912,Nw(t,e,s!==null?s.baseLanes|n:n,n,i)}else s!==null?($h(e,s.cachePool),yw(e,s),gr(),e.memoizedState=null):(t!==null&&$h(e,null),Pg(),gr());return Tt(t,e,r,n),e.child}function nu(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Nw(t,e,n,i,r){var s=my();return s=s===null?null:{parent:st._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&$h(e,null),Pg(),zS(e),t!==null&&tl(t,e,i,!0),e.childLanes=r,null}function Jh(t,e){return e=xf({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Pw(t,e,n){return $s(e,t.child,null,n),t=Jh(e,e.pendingProps),t.flags|=2,un(e),e.memoizedState=null,t}function NV(t,e,n){var i=e.pendingProps,r=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(ce){if(i.mode==="hidden")return t=Jh(e,i),e.lanes=536870912,nu(null,t);if(Og(e),(t=Ne)?(t=g0(t,Pn),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:qr!==null?{id:ni,overflow:ii}:null,retryLane:536870912,hydrationErrors:null},n=DS(t),n.return=e,e.child=n,It=e,Ne=null)):t=null,t===null)throw Hr(e);return e.lanes=536870912,null}return Jh(e,i)}var s=t.memoizedState;if(s!==null){var a=s.dehydrated;if(Og(e),r)if(e.flags&256)e.flags&=-257,e=Pw(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(x(558));else if(at||tl(t,e,n,!1),r=(n&t.childLanes)!==0,at||r){if(i=Ie,i!==null&&(a=tS(i,n),a!==0&&a!==s.retryLane))throw s.retryLane=a,ma(t,a),nn(i,t,a),Py;Bf(),e=Pw(t,e,n)}else t=s.treeContext,Ne=kn(a.nextSibling),It=e,ce=!0,Dr=null,Pn=!1,t!==null&&PS(e,t),e=Jh(e,i),e.flags|=4096;return e}return t=Ni(t.child,{mode:i.mode,children:i.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Zh(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(x(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Ug(t,e,n,i,r){return Ys(e),n=vy(t,e,n,i,void 0,r),i=Ty(),t!==null&&!at?(Ey(t,e,r),Ui(t,e,r)):(ce&&i&&hy(e),e.flags|=1,Tt(t,e,n,r),e.child)}function Ow(t,e,n,i,r,s){return Ys(e),e.updateQueue=null,n=FS(e,i,n,r),BS(t),i=Ty(),t!==null&&!at?(Ey(t,e,s),Ui(t,e,s)):(ce&&i&&hy(e),e.flags|=1,Tt(t,e,n,s),e.child)}function Vw(t,e,n,i,r){if(Ys(e),e.stateNode===null){var s=Za,a=n.contextType;typeof a=="object"&&a!==null&&(s=bt(a)),s=new n(i,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=xg,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=i,s.state=e.memoizedState,s.refs={},gy(e),a=n.contextType,s.context=typeof a=="object"&&a!==null?bt(a):Za,s.state=e.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(yp(e,n,a,i),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(a=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),a!==s.state&&xg.enqueueReplaceState(s,s.state,null),vu(e,i,s,r),yu(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(t===null){s=e.stateNode;var o=e.memoizedProps,u=Xs(n,o);s.props=u;var c=s.context,h=n.contextType;a=Za,typeof h=="object"&&h!==null&&(a=bt(h));var d=n.getDerivedStateFromProps;h=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==a)&&Sw(e,s,i,a),dr=!1;var m=e.memoizedState;s.state=m,vu(e,i,s,r),yu(),c=e.memoizedState,o||m!==c||dr?(typeof d=="function"&&(yp(e,n,d,i),c=e.memoizedState),(u=dr||bw(e,n,u,i,m,c,a))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=a,i=u):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,Dg(t,e),a=e.memoizedProps,h=Xs(n,a),s.props=h,d=e.pendingProps,m=s.context,c=n.contextType,u=Za,typeof c=="object"&&c!==null&&(u=bt(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==d||m!==u)&&Sw(e,s,i,u),dr=!1,m=e.memoizedState,s.state=m,vu(e,i,s,r),yu();var g=e.memoizedState;a!==d||m!==g||dr||t!==null&&t.dependencies!==null&&Df(t.dependencies)?(typeof o=="function"&&(yp(e,n,o,i),g=e.memoizedState),(h=dr||bw(e,n,h,i,m,g,u)||t!==null&&t.dependencies!==null&&Df(t.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,g,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,g,u)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),s.props=i,s.state=g,s.context=u,i=h):(typeof s.componentDidUpdate!="function"||a===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),i=!1)}return s=i,Zh(t,e),i=(e.flags&128)!==0,s||i?(s=e.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&i?(e.child=$s(e,t.child,null,r),e.child=$s(e,null,n,r)):Tt(t,e,n,r),e.memoizedState=s.state,t=e.child):t=Ui(t,e,r),t}function kw(t,e,n,i){return Qs(),e.flags|=256,Tt(t,e,n,i),e.child}var vp={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Tp(t){return{baseLanes:t,cachePool:VS()}}function Ep(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=fn),t}function bR(t,e,n){var i=e.pendingProps,r=!1,s=(e.flags&128)!==0,a;if((a=s)||(a=t!==null&&t.memoizedState===null?!1:(We.current&2)!==0),a&&(r=!0,e.flags&=-129),a=(e.flags&32)!==0,e.flags&=-33,t===null){if(ce){if(r?pr(e):gr(),(t=Ne)?(t=g0(t,Pn),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:qr!==null?{id:ni,overflow:ii}:null,retryLane:536870912,hydrationErrors:null},n=DS(t),n.return=e,e.child=n,It=e,Ne=null)):t=null,t===null)throw Hr(e);return Jg(t)?e.lanes=32:e.lanes=536870912,null}var o=i.children;return i=i.fallback,r?(gr(),r=e.mode,o=xf({mode:"hidden",children:o},r),i=zs(i,r,n,null),o.return=e,i.return=e,o.sibling=i,e.child=o,i=e.child,i.memoizedState=Tp(n),i.childLanes=Ep(t,a,n),e.memoizedState=vp,nu(null,i)):(pr(e),zg(e,o))}var u=t.memoizedState;if(u!==null&&(o=u.dehydrated,o!==null)){if(s)e.flags&256?(pr(e),e.flags&=-257,e=wp(t,e,n)):e.memoizedState!==null?(gr(),e.child=t.child,e.flags|=128,e=null):(gr(),o=i.fallback,r=e.mode,i=xf({mode:"visible",children:i.children},r),o=zs(o,r,n,null),o.flags|=2,i.return=e,o.return=e,i.sibling=o,e.child=i,$s(e,t.child,null,n),i=e.child,i.memoizedState=Tp(n),i.childLanes=Ep(t,a,n),e.memoizedState=vp,e=nu(null,i));else if(pr(e),Jg(o)){if(a=o.nextSibling&&o.nextSibling.dataset,a)var c=a.dgst;a=c,i=Error(x(419)),i.stack="",i.digest=a,Qu({value:i,source:null,stack:null}),e=wp(t,e,n)}else if(at||tl(t,e,n,!1),a=(n&t.childLanes)!==0,at||a){if(a=Ie,a!==null&&(i=tS(a,n),i!==0&&i!==u.retryLane))throw u.retryLane=i,ma(t,i),nn(a,t,i),Py;Xg(o)||Bf(),e=wp(t,e,n)}else Xg(o)?(e.flags|=192,e.child=t.child,e=null):(t=u.treeContext,Ne=kn(o.nextSibling),It=e,ce=!0,Dr=null,Pn=!1,t!==null&&PS(e,t),e=zg(e,i.children),e.flags|=4096);return e}return r?(gr(),o=i.fallback,r=e.mode,u=t.child,c=u.sibling,i=Ni(u,{mode:"hidden",children:i.children}),i.subtreeFlags=u.subtreeFlags&65011712,c!==null?o=Ni(c,o):(o=zs(o,r,n,null),o.flags|=2),o.return=e,i.return=e,i.sibling=o,e.child=i,nu(null,i),i=e.child,o=t.child.memoizedState,o===null?o=Tp(n):(r=o.cachePool,r!==null?(u=st._currentValue,r=r.parent!==u?{parent:u,pool:u}:r):r=VS(),o={baseLanes:o.baseLanes|n,cachePool:r}),i.memoizedState=o,i.childLanes=Ep(t,a,n),e.memoizedState=vp,nu(t.child,i)):(pr(e),n=t.child,t=n.sibling,n=Ni(n,{mode:"visible",children:i.children}),n.return=e,n.sibling=null,t!==null&&(a=e.deletions,a===null?(e.deletions=[t],e.flags|=16):a.push(t)),e.child=n,e.memoizedState=null,n)}function zg(t,e){return e=xf({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function xf(t,e){return t=hn(22,t,null,e),t.lanes=0,t}function wp(t,e,n){return $s(e,t.child,null,n),t=zg(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Mw(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Sg(t.return,e,n)}function Ip(t,e,n,i,r,s){var a=t.memoizedState;a===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r,treeForkCount:s}:(a.isBackwards=e,a.rendering=null,a.renderingStartTime=0,a.last=i,a.tail=n,a.tailMode=r,a.treeForkCount=s)}function SR(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;i=i.children;var a=We.current,o=(a&2)!==0;if(o?(a=a&1|2,e.flags|=128):a&=1,be(We,a),Tt(t,e,i,n),i=ce?Ku:0,!o&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Mw(t,n,e);else if(t.tag===19)Mw(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Of(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Ip(e,!1,r,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Of(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Ip(e,!0,n,null,s,i);break;case"together":Ip(e,!1,null,null,void 0,i);break;default:e.memoizedState=null}return e.child}function Ui(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Gr|=e.lanes,!(n&e.childLanes))if(t!==null){if(tl(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(x(153));if(e.child!==null){for(t=e.child,n=Ni(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ni(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Oy(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&Df(t)))}function PV(t,e,n){switch(e.tag){case 3:wf(e,e.stateNode.containerInfo),mr(e,st,t.memoizedState.cache),Qs();break;case 27:case 5:dg(e);break;case 4:wf(e,e.stateNode.containerInfo);break;case 10:mr(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Og(e),null;break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?(pr(e),e.flags|=128,null):n&e.child.childLanes?bR(t,e,n):(pr(e),t=Ui(t,e,n),t!==null?t.sibling:null);pr(e);break;case 19:var r=(t.flags&128)!==0;if(i=(n&e.childLanes)!==0,i||(tl(t,e,n,!1),i=(n&e.childLanes)!==0),r){if(i)return SR(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),be(We,We.current),i)break;return null;case 22:return e.lanes=0,AR(t,e,n,e.pendingProps);case 24:mr(e,st,t.memoizedState.cache)}return Ui(t,e,n)}function RR(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)at=!0;else{if(!Oy(t,n)&&!(e.flags&128))return at=!1,PV(t,e,n);at=!!(t.flags&131072)}else at=!1,ce&&e.flags&1048576&&NS(e,Ku,e.index);switch(e.lanes=0,e.tag){case 16:e:{var i=e.pendingProps;if(t=Is(e.elementType),e.type=t,typeof t=="function")cy(t)?(i=Xs(t,i),e.tag=1,e=Vw(null,e,t,i,n)):(e.tag=0,e=Ug(null,e,t,i,n));else{if(t!=null){var r=t.$$typeof;if(r===W_){e.tag=11,e=Cw(null,e,t,i,n);break e}else if(r===X_){e.tag=14,e=Dw(null,e,t,i,n);break e}}throw e=hg(t)||t,Error(x(306,e,""))}}return e;case 0:return Ug(t,e,e.type,e.pendingProps,n);case 1:return i=e.type,r=Xs(i,e.pendingProps),Vw(t,e,i,r,n);case 3:e:{if(wf(e,e.stateNode.containerInfo),t===null)throw Error(x(387));i=e.pendingProps;var s=e.memoizedState;r=s.element,Dg(t,e),vu(e,i,null,n);var a=e.memoizedState;if(i=a.cache,mr(e,st,i),i!==s.cache&&Rg(e,[st],n,!0),yu(),i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=kw(t,e,i,n);break e}else if(i!==r){r=Nn(Error(x(424)),e),Qu(r),e=kw(t,e,i,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Ne=kn(t.firstChild),It=e,ce=!0,Dr=null,Pn=!0,n=xS(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Qs(),i===r){e=Ui(t,e,n);break e}Tt(t,e,i,n)}e=e.child}return e;case 26:return Zh(t,e),t===null?(n=tI(e.type,null,e.pendingProps,null))?e.memoizedState=n:ce||(n=e.type,t=e.pendingProps,i=jf(Cr.current).createElement(n),i[wt]=e,i[rn]=t,St(i,n,t),_t(i),e.stateNode=i):e.memoizedState=tI(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return dg(e),t===null&&ce&&(i=e.stateNode=_0(e.type,e.pendingProps,Cr.current),It=e,Pn=!0,r=Ne,rs(e.type)?(Zg=r,Ne=kn(i.firstChild)):Ne=r),Tt(t,e,e.pendingProps.children,n),Zh(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&ce&&((r=i=Ne)&&(i=o2(i,e.type,e.pendingProps,Pn),i!==null?(e.stateNode=i,It=e,Ne=kn(i.firstChild),Pn=!1,r=!0):r=!1),r||Hr(e)),dg(e),r=e.type,s=e.pendingProps,a=t!==null?t.memoizedProps:null,i=s.children,$g(r,s)?i=null:a!==null&&$g(r,a)&&(e.flags|=32),e.memoizedState!==null&&(r=vy(t,e,wV,null,null,n),Zu._currentValue=r),Zh(t,e),Tt(t,e,i,n),e.child;case 6:return t===null&&ce&&((t=n=Ne)&&(n=l2(n,e.pendingProps,Pn),n!==null?(e.stateNode=n,It=e,Ne=null,t=!0):t=!1),t||Hr(e)),null;case 13:return bR(t,e,n);case 4:return wf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=$s(e,null,i,n):Tt(t,e,i,n),e.child;case 11:return Cw(t,e,e.type,e.pendingProps,n);case 7:return Tt(t,e,e.pendingProps,n),e.child;case 8:return Tt(t,e,e.pendingProps.children,n),e.child;case 12:return Tt(t,e,e.pendingProps.children,n),e.child;case 10:return i=e.pendingProps,mr(e,e.type,i.value),Tt(t,e,i.children,n),e.child;case 9:return r=e.type._context,i=e.pendingProps.children,Ys(e),r=bt(r),i=i(r),e.flags|=1,Tt(t,e,i,n),e.child;case 14:return Dw(t,e,e.type,e.pendingProps,n);case 15:return IR(t,e,e.type,e.pendingProps,n);case 19:return SR(t,e,n);case 31:return NV(t,e,n);case 22:return AR(t,e,n,e.pendingProps);case 24:return Ys(e),i=bt(st),t===null?(r=my(),r===null&&(r=Ie,s=dy(),r.pooledCache=s,s.refCount++,s!==null&&(r.pooledCacheLanes|=n),r=s),e.memoizedState={parent:i,cache:r},gy(e),mr(e,st,r)):(t.lanes&n&&(Dg(t,e),vu(e,null,null,n),yu()),r=t.memoizedState,s=e.memoizedState,r.parent!==i?(r={parent:i,cache:i},e.memoizedState=r,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=r),mr(e,st,i)):(i=s.cache,mr(e,st,i),i!==r.cache&&Rg(e,[st],n,!0))),Tt(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(x(156,e.tag))}function vi(t){t.flags|=4}function Ap(t,e,n,i,r){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(r&335544128)===r)if(t.stateNode.complete)t.flags|=8192;else if(XR())t.flags|=8192;else throw Fs=Nf,py}else t.flags&=-16777217}function xw(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!T0(e))if(XR())t.flags|=8192;else throw Fs=Nf,py}function Ch(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?Jb():536870912,t.lanes|=e,Ao|=e)}function Bl(t,e){if(!ce)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function De(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&65011712,i|=r.flags&65011712,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function OV(t,e,n){var i=e.pendingProps;switch(fy(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return De(e),null;case 1:return De(e),null;case 3:return n=e.stateNode,i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),Pi(st),yo(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Ra(e)?vi(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,pp())),De(e),null;case 26:var r=e.type,s=e.memoizedState;return t===null?(vi(e),s!==null?(De(e),xw(e,s)):(De(e),Ap(e,r,null,i,n))):s?s!==t.memoizedState?(vi(e),De(e),xw(e,s)):(De(e),e.flags&=-16777217):(t=t.memoizedProps,t!==i&&vi(e),De(e),Ap(e,r,t,i,n)),null;case 27:if(If(e),n=Cr.current,r=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&vi(e);else{if(!i){if(e.stateNode===null)throw Error(x(166));return De(e),null}t=ui.current,Ra(e)?hw(e):(t=_0(r,i,n),e.stateNode=t,vi(e))}return De(e),null;case 5:if(If(e),r=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&vi(e);else{if(!i){if(e.stateNode===null)throw Error(x(166));return De(e),null}if(s=ui.current,Ra(e))hw(e);else{var a=jf(Cr.current);switch(s){case 1:s=a.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:s=a.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":s=a.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":s=a.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":s=a.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?a.createElement("select",{is:i.is}):a.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?a.createElement(r,{is:i.is}):a.createElement(r)}}s[wt]=e,s[rn]=i;e:for(a=e.child;a!==null;){if(a.tag===5||a.tag===6)s.appendChild(a.stateNode);else if(a.tag!==4&&a.tag!==27&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===e)break e;for(;a.sibling===null;){if(a.return===null||a.return===e)break e;a=a.return}a.sibling.return=a.return,a=a.sibling}e.stateNode=s;e:switch(St(s,r,i),r){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&vi(e)}}return De(e),Ap(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==i&&vi(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(x(166));if(t=Cr.current,Ra(e)){if(t=e.stateNode,n=e.memoizedProps,i=null,r=It,r!==null)switch(r.tag){case 27:case 5:i=r.memoizedProps}t[wt]=e,t=!!(t.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||d0(t.nodeValue,n)),t||Hr(e,!0)}else t=jf(t).createTextNode(i),t[wt]=e,e.stateNode=t}return De(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(i=Ra(e),n!==null){if(t===null){if(!i)throw Error(x(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(x(557));t[wt]=e}else Qs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;De(e),t=!1}else n=pp(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(un(e),e):(un(e),null);if(e.flags&128)throw Error(x(558))}return De(e),null;case 13:if(i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(r=Ra(e),i!==null&&i.dehydrated!==null){if(t===null){if(!r)throw Error(x(318));if(r=e.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(x(317));r[wt]=e}else Qs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;De(e),r=!1}else r=pp(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=r),r=!0;if(!r)return e.flags&256?(un(e),e):(un(e),null)}return un(e),e.flags&128?(e.lanes=n,e):(n=i!==null,t=t!==null&&t.memoizedState!==null,n&&(i=e.child,r=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(r=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==r&&(i.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Ch(e,e.updateQueue),De(e),null);case 4:return yo(),t===null&&zy(e.stateNode.containerInfo),De(e),null;case 10:return Pi(e.type),De(e),null;case 19:if(yt(We),i=e.memoizedState,i===null)return De(e),null;if(r=(e.flags&128)!==0,s=i.rendering,s===null)if(r)Bl(i,!1);else{if(Ge!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=Of(t),s!==null){for(e.flags|=128,Bl(i,!1),t=s.updateQueue,e.updateQueue=t,Ch(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)CS(n,t),n=n.sibling;return be(We,We.current&1|2),ce&&Ii(e,i.treeForkCount),e.child}t=t.sibling}i.tail!==null&&pn()>Uf&&(e.flags|=128,r=!0,Bl(i,!1),e.lanes=4194304)}else{if(!r)if(t=Of(s),t!==null){if(e.flags|=128,r=!0,t=t.updateQueue,e.updateQueue=t,Ch(e,t),Bl(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!ce)return De(e),null}else 2*pn()-i.renderingStartTime>Uf&&n!==536870912&&(e.flags|=128,r=!0,Bl(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=pn(),t.sibling=null,n=We.current,be(We,r?n&1|2:n&1),ce&&Ii(e,i.treeForkCount),t):(De(e),null);case 22:case 23:return un(e),_y(),i=e.memoizedState!==null,t!==null?t.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?n&536870912&&!(e.flags&128)&&(De(e),e.subtreeFlags&6&&(e.flags|=8192)):De(e),n=e.updateQueue,n!==null&&Ch(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==n&&(e.flags|=2048),t!==null&&yt(Bs),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Pi(st),De(e),null;case 25:return null;case 30:return null}throw Error(x(156,e.tag))}function VV(t,e){switch(fy(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Pi(st),yo(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return If(e),null;case 31:if(e.memoizedState!==null){if(un(e),e.alternate===null)throw Error(x(340));Qs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(un(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(x(340));Qs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return yt(We),null;case 4:return yo(),null;case 10:return Pi(e.type),null;case 22:case 23:return un(e),_y(),t!==null&&yt(Bs),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Pi(st),null;case 25:return null;default:return null}}function CR(t,e){switch(fy(e),e.tag){case 3:Pi(st),yo();break;case 26:case 27:case 5:If(e);break;case 4:yo();break;case 31:e.memoizedState!==null&&un(e);break;case 13:un(e);break;case 19:yt(We);break;case 10:Pi(e.type);break;case 22:case 23:un(e),_y(),t!==null&&yt(Bs);break;case 24:Pi(st)}}function Vc(t,e){try{var n=e.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var r=i.next;n=r;do{if((n.tag&t)===t){i=void 0;var s=n.create,a=n.inst;i=s(),a.destroy=i}n=n.next}while(n!==r)}}catch(o){_e(e,e.return,o)}}function jr(t,e,n){try{var i=e.updateQueue,r=i!==null?i.lastEffect:null;if(r!==null){var s=r.next;i=s;do{if((i.tag&t)===t){var a=i.inst,o=a.destroy;if(o!==void 0){a.destroy=void 0,r=e;var u=n,c=o;try{c()}catch(h){_e(r,u,h)}}}i=i.next}while(i!==s)}}catch(h){_e(e,e.return,h)}}function DR(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{US(e,n)}catch(i){_e(t,t.return,i)}}}function NR(t,e,n){n.props=Xs(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(i){_e(t,e,i)}}function Eu(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var i=t.stateNode;break;case 30:i=t.stateNode;break;default:i=t.stateNode}typeof n=="function"?t.refCleanup=n(i):n.current=i}}catch(r){_e(t,e,r)}}function ri(t,e){var n=t.ref,i=t.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(r){_e(t,e,r)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(r){_e(t,e,r)}else n.current=null}function PR(t){var e=t.type,n=t.memoizedProps,i=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(r){_e(t,t.return,r)}}function bp(t,e,n){try{var i=t.stateNode;t2(i,t.type,n,e),i[rn]=e}catch(r){_e(t,t.return,r)}}function OR(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&rs(t.type)||t.tag===4}function Sp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||OR(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&rs(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Bg(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Si));else if(i!==4&&(i===27&&rs(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Bg(t,e,n),t=t.sibling;t!==null;)Bg(t,e,n),t=t.sibling}function Lf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(i===27&&rs(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Lf(t,e,n),t=t.sibling;t!==null;)Lf(t,e,n),t=t.sibling}function VR(t){var e=t.stateNode,n=t.memoizedProps;try{for(var i=t.type,r=e.attributes;r.length;)e.removeAttributeNode(r[0]);St(e,i,n),e[wt]=t,e[rn]=n}catch(s){_e(t,t.return,s)}}var Ai=!1,rt=!1,Rp=!1,Lw=typeof WeakSet=="function"?WeakSet:Set,pt=null;function kV(t,e){if(t=t.containerInfo,Qg=Yf,t=TS(t),oy(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,u=-1,c=0,h=0,d=t,m=null;t:for(;;){for(var g;d!==n||r!==0&&d.nodeType!==3||(o=a+r),d!==s||i!==0&&d.nodeType!==3||(u=a+i),d.nodeType===3&&(a+=d.nodeValue.length),(g=d.firstChild)!==null;)m=d,d=g;for(;;){if(d===t)break t;if(m===n&&++c===r&&(o=a),m===s&&++h===i&&(u=a),(g=d.nextSibling)!==null)break;d=m,m=d.parentNode}d=g}n=o===-1||u===-1?null:{start:o,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Yg={focusedElem:t,selectionRange:n},Yf=!1,pt=e;pt!==null;)if(e=pt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,pt=t;else for(;pt!==null;){switch(e=pt,s=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)r=t[n],r.ref.impl=r.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&s!==null){t=void 0,n=e,r=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var R=Xs(n.type,r);t=i.getSnapshotBeforeUpdate(R,s),i.__reactInternalSnapshotBeforeUpdate=t}catch(D){_e(n,n.return,D)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Wg(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Wg(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(x(163))}if(t=e.sibling,t!==null){t.return=e.return,pt=t;break}pt=e.return}}function kR(t,e,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Ei(t,n),i&4&&Vc(5,n);break;case 1:if(Ei(t,n),i&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(a){_e(n,n.return,a)}else{var r=Xs(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(r,e,t.__reactInternalSnapshotBeforeUpdate)}catch(a){_e(n,n.return,a)}}i&64&&DR(n),i&512&&Eu(n,n.return);break;case 3:if(Ei(t,n),i&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{US(t,e)}catch(a){_e(n,n.return,a)}}break;case 27:e===null&&i&4&&VR(n);case 26:case 5:Ei(t,n),e===null&&i&4&&PR(n),i&512&&Eu(n,n.return);break;case 12:Ei(t,n);break;case 31:Ei(t,n),i&4&&LR(t,n);break;case 13:Ei(t,n),i&4&&UR(t,n),i&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=HV.bind(null,n),u2(t,n))));break;case 22:if(i=n.memoizedState!==null||Ai,!i){e=e!==null&&e.memoizedState!==null||rt,r=Ai;var s=rt;Ai=i,(rt=e)&&!s?wi(t,n,(n.subtreeFlags&8772)!==0):Ei(t,n),Ai=r,rt=s}break;case 30:break;default:Ei(t,n)}}function MR(t){var e=t.alternate;e!==null&&(t.alternate=null,MR(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&ty(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var xe=null,$t=!1;function Ti(t,e,n){for(n=n.child;n!==null;)xR(t,e,n),n=n.sibling}function xR(t,e,n){if(gn&&typeof gn.onCommitFiberUnmount=="function")try{gn.onCommitFiberUnmount(Sc,n)}catch{}switch(n.tag){case 26:rt||ri(n,e),Ti(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:rt||ri(n,e);var i=xe,r=$t;rs(n.type)&&(xe=n.stateNode,$t=!1),Ti(t,e,n),bu(n.stateNode),xe=i,$t=r;break;case 5:rt||ri(n,e);case 6:if(i=xe,r=$t,xe=null,Ti(t,e,n),xe=i,$t=r,xe!==null)if($t)try{(xe.nodeType===9?xe.body:xe.nodeName==="HTML"?xe.ownerDocument.body:xe).removeChild(n.stateNode)}catch(s){_e(n,e,s)}else try{xe.removeChild(n.stateNode)}catch(s){_e(n,e,s)}break;case 18:xe!==null&&($t?(t=xe,Ww(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Co(t)):Ww(xe,n.stateNode));break;case 4:i=xe,r=$t,xe=n.stateNode.containerInfo,$t=!0,Ti(t,e,n),xe=i,$t=r;break;case 0:case 11:case 14:case 15:jr(2,n,e),rt||jr(4,n,e),Ti(t,e,n);break;case 1:rt||(ri(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"&&NR(n,e,i)),Ti(t,e,n);break;case 21:Ti(t,e,n);break;case 22:rt=(i=rt)||n.memoizedState!==null,Ti(t,e,n),rt=i;break;default:Ti(t,e,n)}}function LR(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Co(t)}catch(n){_e(e,e.return,n)}}}function UR(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Co(t)}catch(n){_e(e,e.return,n)}}function MV(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Lw),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Lw),e;default:throw Error(x(435,t.tag))}}function Dh(t,e){var n=MV(t);e.forEach(function(i){if(!n.has(i)){n.add(i);var r=jV.bind(null,t,i);i.then(r,r)}})}function Qt(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i],s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 27:if(rs(o.type)){xe=o.stateNode,$t=!1;break e}break;case 5:xe=o.stateNode,$t=!1;break e;case 3:case 4:xe=o.stateNode.containerInfo,$t=!0;break e}o=o.return}if(xe===null)throw Error(x(160));xR(s,a,r),xe=null,$t=!1,s=r.alternate,s!==null&&(s.return=null),r.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)zR(e,t),e=e.sibling}var Bn=null;function zR(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Qt(e,t),Yt(t),i&4&&(jr(3,t,t.return),Vc(3,t),jr(5,t,t.return));break;case 1:Qt(e,t),Yt(t),i&512&&(rt||n===null||ri(n,n.return)),i&64&&Ai&&(t=t.updateQueue,t!==null&&(i=t.callbacks,i!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var r=Bn;if(Qt(e,t),Yt(t),i&512&&(rt||n===null||ri(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=t.memoizedState,n===null)if(i===null)if(t.stateNode===null){e:{i=t.type,n=t.memoizedProps,r=r.ownerDocument||r;t:switch(i){case"title":s=r.getElementsByTagName("title")[0],(!s||s[Dc]||s[wt]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=r.createElement(i),r.head.insertBefore(s,r.querySelector("head > title"))),St(s,i,n),s[wt]=t,_t(s),i=s;break e;case"link":var a=iI("link","href",r).get(i+(n.href||""));if(a){for(var o=0;o<a.length;o++)if(s=a[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(o,1);break t}}s=r.createElement(i),St(s,i,n),r.head.appendChild(s);break;case"meta":if(a=iI("meta","content",r).get(i+(n.content||""))){for(o=0;o<a.length;o++)if(s=a[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(o,1);break t}}s=r.createElement(i),St(s,i,n),r.head.appendChild(s);break;default:throw Error(x(468,i))}s[wt]=t,_t(s),i=s}t.stateNode=i}else rI(r,t.type,t.stateNode);else t.stateNode=nI(r,i,t.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?rI(r,t.type,t.stateNode):nI(r,i,t.memoizedProps)):i===null&&t.stateNode!==null&&bp(t,t.memoizedProps,n.memoizedProps)}break;case 27:Qt(e,t),Yt(t),i&512&&(rt||n===null||ri(n,n.return)),n!==null&&i&4&&bp(t,t.memoizedProps,n.memoizedProps);break;case 5:if(Qt(e,t),Yt(t),i&512&&(rt||n===null||ri(n,n.return)),t.flags&32){r=t.stateNode;try{To(r,"")}catch(R){_e(t,t.return,R)}}i&4&&t.stateNode!=null&&(r=t.memoizedProps,bp(t,r,n!==null?n.memoizedProps:r)),i&1024&&(Rp=!0);break;case 6:if(Qt(e,t),Yt(t),i&4){if(t.stateNode===null)throw Error(x(162));i=t.memoizedProps,n=t.stateNode;try{n.nodeValue=i}catch(R){_e(t,t.return,R)}}break;case 3:if(nf=null,r=Bn,Bn=Gf(e.containerInfo),Qt(e,t),Bn=r,Yt(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Co(e.containerInfo)}catch(R){_e(t,t.return,R)}Rp&&(Rp=!1,BR(t));break;case 4:i=Bn,Bn=Gf(t.stateNode.containerInfo),Qt(e,t),Yt(t),Bn=i;break;case 12:Qt(e,t),Yt(t);break;case 31:Qt(e,t),Yt(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,Dh(t,i)));break;case 13:Qt(e,t),Yt(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Ud=pn()),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,Dh(t,i)));break;case 22:r=t.memoizedState!==null;var u=n!==null&&n.memoizedState!==null,c=Ai,h=rt;if(Ai=c||r,rt=h||u,Qt(e,t),rt=h,Ai=c,Yt(t),i&8192)e:for(e=t.stateNode,e._visibility=r?e._visibility&-2:e._visibility|1,r&&(n===null||u||Ai||rt||As(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){u=n=e;try{if(s=u.stateNode,r)a=s.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none";else{o=u.stateNode;var d=u.memoizedProps.style,m=d!=null&&d.hasOwnProperty("display")?d.display:null;o.style.display=m==null||typeof m=="boolean"?"":(""+m).trim()}}catch(R){_e(u,u.return,R)}}}else if(e.tag===6){if(n===null){u=e;try{u.stateNode.nodeValue=r?"":u.memoizedProps}catch(R){_e(u,u.return,R)}}}else if(e.tag===18){if(n===null){u=e;try{var g=u.stateNode;r?Xw(g,!0):Xw(u.stateNode,!1)}catch(R){_e(u,u.return,R)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=t.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,Dh(t,n))));break;case 19:Qt(e,t),Yt(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,Dh(t,i)));break;case 30:break;case 21:break;default:Qt(e,t),Yt(t)}}function Yt(t){var e=t.flags;if(e&2){try{for(var n,i=t.return;i!==null;){if(OR(i)){n=i;break}i=i.return}if(n==null)throw Error(x(160));switch(n.tag){case 27:var r=n.stateNode,s=Sp(t);Lf(t,s,r);break;case 5:var a=n.stateNode;n.flags&32&&(To(a,""),n.flags&=-33);var o=Sp(t);Lf(t,o,a);break;case 3:case 4:var u=n.stateNode.containerInfo,c=Sp(t);Bg(t,c,u);break;default:throw Error(x(161))}}catch(h){_e(t,t.return,h)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function BR(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;BR(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Ei(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)kR(t,e.alternate,e),e=e.sibling}function As(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:jr(4,e,e.return),As(e);break;case 1:ri(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&NR(e,e.return,n),As(e);break;case 27:bu(e.stateNode);case 26:case 5:ri(e,e.return),As(e);break;case 22:e.memoizedState===null&&As(e);break;case 30:As(e);break;default:As(e)}t=t.sibling}}function wi(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,r=t,s=e,a=s.flags;switch(s.tag){case 0:case 11:case 15:wi(r,s,n),Vc(4,s);break;case 1:if(wi(r,s,n),i=s,r=i.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(c){_e(i,i.return,c)}if(i=s,r=i.updateQueue,r!==null){var o=i.stateNode;try{var u=r.shared.hiddenCallbacks;if(u!==null)for(r.shared.hiddenCallbacks=null,r=0;r<u.length;r++)LS(u[r],o)}catch(c){_e(i,i.return,c)}}n&&a&64&&DR(s),Eu(s,s.return);break;case 27:VR(s);case 26:case 5:wi(r,s,n),n&&i===null&&a&4&&PR(s),Eu(s,s.return);break;case 12:wi(r,s,n);break;case 31:wi(r,s,n),n&&a&4&&LR(r,s);break;case 13:wi(r,s,n),n&&a&4&&UR(r,s);break;case 22:s.memoizedState===null&&wi(r,s,n),Eu(s,s.return);break;case 30:break;default:wi(r,s,n)}e=e.sibling}}function Vy(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&Pc(n))}function ky(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Pc(t))}function zn(t,e,n,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)FR(t,e,n,i),e=e.sibling}function FR(t,e,n,i){var r=e.flags;switch(e.tag){case 0:case 11:case 15:zn(t,e,n,i),r&2048&&Vc(9,e);break;case 1:zn(t,e,n,i);break;case 3:zn(t,e,n,i),r&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Pc(t)));break;case 12:if(r&2048){zn(t,e,n,i),t=e.stateNode;try{var s=e.memoizedProps,a=s.id,o=s.onPostCommit;typeof o=="function"&&o(a,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(u){_e(e,e.return,u)}}else zn(t,e,n,i);break;case 31:zn(t,e,n,i);break;case 13:zn(t,e,n,i);break;case 23:break;case 22:s=e.stateNode,a=e.alternate,e.memoizedState!==null?s._visibility&2?zn(t,e,n,i):wu(t,e):s._visibility&2?zn(t,e,n,i):(s._visibility|=2,Ua(t,e,n,i,(e.subtreeFlags&10256)!==0||!1)),r&2048&&Vy(a,e);break;case 24:zn(t,e,n,i),r&2048&&ky(e.alternate,e);break;default:zn(t,e,n,i)}}function Ua(t,e,n,i,r){for(r=r&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,a=e,o=n,u=i,c=a.flags;switch(a.tag){case 0:case 11:case 15:Ua(s,a,o,u,r),Vc(8,a);break;case 23:break;case 22:var h=a.stateNode;a.memoizedState!==null?h._visibility&2?Ua(s,a,o,u,r):wu(s,a):(h._visibility|=2,Ua(s,a,o,u,r)),r&&c&2048&&Vy(a.alternate,a);break;case 24:Ua(s,a,o,u,r),r&&c&2048&&ky(a.alternate,a);break;default:Ua(s,a,o,u,r)}e=e.sibling}}function wu(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,i=e,r=i.flags;switch(i.tag){case 22:wu(n,i),r&2048&&Vy(i.alternate,i);break;case 24:wu(n,i),r&2048&&ky(i.alternate,i);break;default:wu(n,i)}e=e.sibling}}var iu=8192;function Ca(t,e,n){if(t.subtreeFlags&iu)for(t=t.child;t!==null;)qR(t,e,n),t=t.sibling}function qR(t,e,n){switch(t.tag){case 26:Ca(t,e,n),t.flags&iu&&t.memoizedState!==null&&E2(n,Bn,t.memoizedState,t.memoizedProps);break;case 5:Ca(t,e,n);break;case 3:case 4:var i=Bn;Bn=Gf(t.stateNode.containerInfo),Ca(t,e,n),Bn=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=iu,iu=16777216,Ca(t,e,n),iu=i):Ca(t,e,n));break;default:Ca(t,e,n)}}function HR(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Fl(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];pt=i,GR(i,t)}HR(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)jR(t),t=t.sibling}function jR(t){switch(t.tag){case 0:case 11:case 15:Fl(t),t.flags&2048&&jr(9,t,t.return);break;case 3:Fl(t);break;case 12:Fl(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,ef(t)):Fl(t);break;default:Fl(t)}}function ef(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];pt=i,GR(i,t)}HR(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:jr(8,e,e.return),ef(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,ef(e));break;default:ef(e)}t=t.sibling}}function GR(t,e){for(;pt!==null;){var n=pt;switch(n.tag){case 0:case 11:case 15:jr(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Pc(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,pt=i;else e:for(n=t;pt!==null;){i=pt;var r=i.sibling,s=i.return;if(MR(i),i===n){pt=null;break e}if(r!==null){r.return=s,pt=r;break e}pt=s}}}var xV={getCacheForType:function(t){var e=bt(st),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return bt(st).controller.signal}},LV=typeof WeakMap=="function"?WeakMap:Map,de=0,Ie=null,ae=null,le=0,ge=0,on=null,wr=!1,il=!1,My=!1,zi=0,Ge=0,Gr=0,qs=0,xy=0,fn=0,Ao=0,Iu=null,Wt=null,Fg=!1,Ud=0,KR=0,Uf=1/0,zf=null,Or=null,ut=0,Vr=null,bo=null,Oi=0,qg=0,Hg=null,QR=null,Au=0,jg=null;function yn(){return de&2&&le!==0?le&-le:W.T!==null?Uy():nS()}function YR(){if(fn===0)if(!(le&536870912)||ce){var t=Eh;Eh<<=1,!(Eh&3932160)&&(Eh=262144),fn=t}else fn=536870912;return t=wn.current,t!==null&&(t.flags|=32),fn}function nn(t,e,n){(t===Ie&&(ge===2||ge===9)||t.cancelPendingCommit!==null)&&(So(t,0),Ir(t,le,fn,!1)),Cc(t,n),(!(de&2)||t!==Ie)&&(t===Ie&&(!(de&2)&&(qs|=n),Ge===4&&Ir(t,le,fn,!1)),_i(t))}function $R(t,e,n){if(de&6)throw Error(x(327));var i=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Rc(t,e),r=i?BV(t,e):Cp(t,e,!0),s=i;do{if(r===0){il&&!i&&Ir(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!UV(n)){r=Cp(t,e,!1),s=!1;continue}if(r===2){if(s=e,t.errorRecoveryDisabledLanes&s)var a=0;else a=t.pendingLanes&-536870913,a=a!==0?a:a&536870912?536870912:0;if(a!==0){e=a;e:{var o=t;r=Iu;var u=o.current.memoizedState.isDehydrated;if(u&&(So(o,a).flags|=256),a=Cp(o,a,!1),a!==2){if(My&&!u){o.errorRecoveryDisabledLanes|=s,qs|=s,r=4;break e}s=Wt,Wt=r,s!==null&&(Wt===null?Wt=s:Wt.push.apply(Wt,s))}r=a}if(s=!1,r!==2)continue}}if(r===1){So(t,0),Ir(t,e,0,!0);break}e:{switch(i=t,s=r,s){case 0:case 1:throw Error(x(345));case 4:if((e&4194048)!==e)break;case 6:Ir(i,e,fn,!wr);break e;case 2:Wt=null;break;case 3:case 5:break;default:throw Error(x(329))}if((e&62914560)===e&&(r=Ud+300-pn(),10<r)){if(Ir(i,e,fn,!wr),Rd(i,0,!0)!==0)break e;Oi=e,i.timeoutHandle=p0(Uw.bind(null,i,n,Wt,zf,Fg,e,fn,qs,Ao,wr,s,"Throttled",-0,0),r);break e}Uw(i,n,Wt,zf,Fg,e,fn,qs,Ao,wr,s,null,-0,0)}}break}while(!0);_i(t)}function Uw(t,e,n,i,r,s,a,o,u,c,h,d,m,g){if(t.timeoutHandle=-1,d=e.subtreeFlags,d&8192||(d&16785408)===16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Si},qR(e,s,d);var R=(s&62914560)===s?Ud-pn():(s&4194048)===s?KR-pn():0;if(R=w2(d,R),R!==null){Oi=s,t.cancelPendingCommit=R(Bw.bind(null,t,e,s,n,i,r,a,o,u,h,d,null,m,g)),Ir(t,s,a,!c);return}}Bw(t,e,s,n,i,r,a,o,u)}function UV(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!En(s(),r))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ir(t,e,n,i){e&=~xy,e&=~qs,t.suspendedLanes|=e,t.pingedLanes&=~e,i&&(t.warmLanes|=e),i=t.expirationTimes;for(var r=e;0<r;){var s=31-_n(r),a=1<<s;i[s]=-1,r&=~a}n!==0&&Zb(t,n,e)}function zd(){return de&6?!0:(kc(0),!1)}function Ly(){if(ae!==null){if(ge===0)var t=ae.return;else t=ae,Ri=pa=null,wy(t),lo=null,Yu=0,t=ae;for(;t!==null;)CR(t.alternate,t),t=t.return;ae=null}}function So(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,r2(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Oi=0,Ly(),Ie=t,ae=n=Ni(t.current,null),le=e,ge=0,on=null,wr=!1,il=Rc(t,e),My=!1,Ao=fn=xy=qs=Gr=Ge=0,Wt=Iu=null,Fg=!1,e&8&&(e|=e&32);var i=t.entangledLanes;if(i!==0)for(t=t.entanglements,i&=e;0<i;){var r=31-_n(i),s=1<<r;e|=t[r],i&=~s}return zi=e,Pd(),n}function WR(t,e){ee=null,W.H=Wu,e===nl||e===Vd?(e=gw(),ge=3):e===py?(e=gw(),ge=4):ge=e===Py?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,on=e,ae===null&&(Ge=1,Mf(t,Nn(e,t.current)))}function XR(){var t=wn.current;return t===null?!0:(le&4194048)===le?Vn===null:(le&62914560)===le||le&536870912?t===Vn:!1}function JR(){var t=W.H;return W.H=Wu,t===null?Wu:t}function ZR(){var t=W.A;return W.A=xV,t}function Bf(){Ge=4,wr||(le&4194048)!==le&&wn.current!==null||(il=!0),!(Gr&134217727)&&!(qs&134217727)||Ie===null||Ir(Ie,le,fn,!1)}function Cp(t,e,n){var i=de;de|=2;var r=JR(),s=ZR();(Ie!==t||le!==e)&&(zf=null,So(t,e)),e=!1;var a=Ge;e:do try{if(ge!==0&&ae!==null){var o=ae,u=on;switch(ge){case 8:Ly(),a=6;break e;case 3:case 2:case 9:case 6:wn.current===null&&(e=!0);var c=ge;if(ge=0,on=null,no(t,o,u,c),n&&il){a=0;break e}break;default:c=ge,ge=0,on=null,no(t,o,u,c)}}zV(),a=Ge;break}catch(h){WR(t,h)}while(!0);return e&&t.shellSuspendCounter++,Ri=pa=null,de=i,W.H=r,W.A=s,ae===null&&(Ie=null,le=0,Pd()),a}function zV(){for(;ae!==null;)e0(ae)}function BV(t,e){var n=de;de|=2;var i=JR(),r=ZR();Ie!==t||le!==e?(zf=null,Uf=pn()+500,So(t,e)):il=Rc(t,e);e:do try{if(ge!==0&&ae!==null){e=ae;var s=on;t:switch(ge){case 1:ge=0,on=null,no(t,e,s,1);break;case 2:case 9:if(pw(s)){ge=0,on=null,zw(e);break}e=function(){ge!==2&&ge!==9||Ie!==t||(ge=7),_i(t)},s.then(e,e);break e;case 3:ge=7;break e;case 4:ge=5;break e;case 7:pw(s)?(ge=0,on=null,zw(e)):(ge=0,on=null,no(t,e,s,7));break;case 5:var a=null;switch(ae.tag){case 26:a=ae.memoizedState;case 5:case 27:var o=ae;if(a?T0(a):o.stateNode.complete){ge=0,on=null;var u=o.sibling;if(u!==null)ae=u;else{var c=o.return;c!==null?(ae=c,Bd(c)):ae=null}break t}}ge=0,on=null,no(t,e,s,5);break;case 6:ge=0,on=null,no(t,e,s,6);break;case 8:Ly(),Ge=6;break e;default:throw Error(x(462))}}FV();break}catch(h){WR(t,h)}while(!0);return Ri=pa=null,W.H=i,W.A=r,de=n,ae!==null?0:(Ie=null,le=0,Pd(),Ge)}function FV(){for(;ae!==null&&!cO();)e0(ae)}function e0(t){var e=RR(t.alternate,t,zi);t.memoizedProps=t.pendingProps,e===null?Bd(t):ae=e}function zw(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Ow(n,e,e.pendingProps,e.type,void 0,le);break;case 11:e=Ow(n,e,e.pendingProps,e.type.render,e.ref,le);break;case 5:wy(e);default:CR(n,e),e=ae=CS(e,zi),e=RR(n,e,zi)}t.memoizedProps=t.pendingProps,e===null?Bd(t):ae=e}function no(t,e,n,i){Ri=pa=null,wy(e),lo=null,Yu=0;var r=e.return;try{if(DV(t,r,e,n,le)){Ge=1,Mf(t,Nn(n,t.current)),ae=null;return}}catch(s){if(r!==null)throw ae=r,s;Ge=1,Mf(t,Nn(n,t.current)),ae=null;return}e.flags&32768?(ce||i===1?t=!0:il||le&536870912?t=!1:(wr=t=!0,(i===2||i===9||i===3||i===6)&&(i=wn.current,i!==null&&i.tag===13&&(i.flags|=16384))),t0(e,t)):Bd(e)}function Bd(t){var e=t;do{if(e.flags&32768){t0(e,wr);return}t=e.return;var n=OV(e.alternate,e,zi);if(n!==null){ae=n;return}if(e=e.sibling,e!==null){ae=e;return}ae=e=t}while(e!==null);Ge===0&&(Ge=5)}function t0(t,e){do{var n=VV(t.alternate,t);if(n!==null){n.flags&=32767,ae=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){ae=t;return}ae=t=n}while(t!==null);Ge=6,ae=null}function Bw(t,e,n,i,r,s,a,o,u){t.cancelPendingCommit=null;do Fd();while(ut!==0);if(de&6)throw Error(x(327));if(e!==null){if(e===t.current)throw Error(x(177));if(s=e.lanes|e.childLanes,s|=ly,TO(t,n,s,a,o,u),t===Ie&&(ae=Ie=null,le=0),bo=e,Vr=t,Oi=n,qg=s,Hg=r,QR=i,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,GV(Af,function(){return a0(),null})):(t.callbackNode=null,t.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=W.T,W.T=null,r=me.p,me.p=2,a=de,de|=4;try{kV(t,e,n)}finally{de=a,me.p=r,W.T=i}}ut=1,n0(),i0(),r0()}}function n0(){if(ut===1){ut=0;var t=Vr,e=bo,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=W.T,W.T=null;var i=me.p;me.p=2;var r=de;de|=4;try{zR(e,t);var s=Yg,a=TS(t.containerInfo),o=s.focusedElem,u=s.selectionRange;if(a!==o&&o&&o.ownerDocument&&vS(o.ownerDocument.documentElement,o)){if(u!==null&&oy(o)){var c=u.start,h=u.end;if(h===void 0&&(h=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(h,o.value.length);else{var d=o.ownerDocument||document,m=d&&d.defaultView||window;if(m.getSelection){var g=m.getSelection(),R=o.textContent.length,D=Math.min(u.start,R),V=u.end===void 0?D:Math.min(u.end,R);!g.extend&&D>V&&(a=V,V=D,D=a);var w=lw(o,D),v=lw(o,V);if(w&&v&&(g.rangeCount!==1||g.anchorNode!==w.node||g.anchorOffset!==w.offset||g.focusNode!==v.node||g.focusOffset!==v.offset)){var I=d.createRange();I.setStart(w.node,w.offset),g.removeAllRanges(),D>V?(g.addRange(I),g.extend(v.node,v.offset)):(I.setEnd(v.node,v.offset),g.addRange(I))}}}}for(d=[],g=o;g=g.parentNode;)g.nodeType===1&&d.push({element:g,left:g.scrollLeft,top:g.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<d.length;o++){var C=d[o];C.element.scrollLeft=C.left,C.element.scrollTop=C.top}}Yf=!!Qg,Yg=Qg=null}finally{de=r,me.p=i,W.T=n}}t.current=e,ut=2}}function i0(){if(ut===2){ut=0;var t=Vr,e=bo,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=W.T,W.T=null;var i=me.p;me.p=2;var r=de;de|=4;try{kR(t,e.alternate,e)}finally{de=r,me.p=i,W.T=n}}ut=3}}function r0(){if(ut===4||ut===3){ut=0,hO();var t=Vr,e=bo,n=Oi,i=QR;e.subtreeFlags&10256||e.flags&10256?ut=5:(ut=0,bo=Vr=null,s0(t,t.pendingLanes));var r=t.pendingLanes;if(r===0&&(Or=null),ey(n),e=e.stateNode,gn&&typeof gn.onCommitFiberRoot=="function")try{gn.onCommitFiberRoot(Sc,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=W.T,r=me.p,me.p=2,W.T=null;try{for(var s=t.onRecoverableError,a=0;a<i.length;a++){var o=i[a];s(o.value,{componentStack:o.stack})}}finally{W.T=e,me.p=r}}Oi&3&&Fd(),_i(t),r=t.pendingLanes,n&261930&&r&42?t===jg?Au++:(Au=0,jg=t):Au=0,kc(0)}}function s0(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,Pc(e)))}function Fd(){return n0(),i0(),r0(),a0()}function a0(){if(ut!==5)return!1;var t=Vr,e=qg;qg=0;var n=ey(Oi),i=W.T,r=me.p;try{me.p=32>n?32:n,W.T=null,n=Hg,Hg=null;var s=Vr,a=Oi;if(ut=0,bo=Vr=null,Oi=0,de&6)throw Error(x(331));var o=de;if(de|=4,jR(s.current),FR(s,s.current,a,n),de=o,kc(0,!1),gn&&typeof gn.onPostCommitFiberRoot=="function")try{gn.onPostCommitFiberRoot(Sc,s)}catch{}return!0}finally{me.p=r,W.T=i,s0(t,e)}}function Fw(t,e,n){e=Nn(n,e),e=Lg(t.stateNode,e,2),t=Pr(t,e,2),t!==null&&(Cc(t,2),_i(t))}function _e(t,e,n){if(t.tag===3)Fw(t,t,n);else for(;e!==null;){if(e.tag===3){Fw(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Or===null||!Or.has(i))){t=Nn(n,t),n=ER(2),i=Pr(e,n,2),i!==null&&(wR(n,i,e,t),Cc(i,2),_i(i));break}}e=e.return}}function Dp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new LV;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(My=!0,r.add(n),t=qV.bind(null,t,e,n),e.then(t,t))}function qV(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Ie===t&&(le&n)===n&&(Ge===4||Ge===3&&(le&62914560)===le&&300>pn()-Ud?!(de&2)&&So(t,0):xy|=n,Ao===le&&(Ao=0)),_i(t)}function o0(t,e){e===0&&(e=Jb()),t=ma(t,e),t!==null&&(Cc(t,e),_i(t))}function HV(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),o0(t,n)}function jV(t,e){var n=0;switch(t.tag){case 31:case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;case 22:i=t.stateNode._retryCache;break;default:throw Error(x(314))}i!==null&&i.delete(e),o0(t,n)}function GV(t,e){return J_(t,e)}var Ff=null,za=null,Gg=!1,qf=!1,Np=!1,Ar=0;function _i(t){t!==za&&t.next===null&&(za===null?Ff=za=t:za=za.next=t),qf=!0,Gg||(Gg=!0,QV())}function kc(t,e){if(!Np&&qf){Np=!0;do for(var n=!1,i=Ff;i!==null;){if(t!==0){var r=i.pendingLanes;if(r===0)var s=0;else{var a=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-_n(42|t)+1)-1,s&=r&~(a&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,qw(i,s))}else s=le,s=Rd(i,i===Ie?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Rc(i,s)||(n=!0,qw(i,s));i=i.next}while(n);Np=!1}}function KV(){l0()}function l0(){qf=Gg=!1;var t=0;Ar!==0&&i2()&&(t=Ar);for(var e=pn(),n=null,i=Ff;i!==null;){var r=i.next,s=u0(i,e);s===0?(i.next=null,n===null?Ff=r:n.next=r,r===null&&(za=n)):(n=i,(t!==0||s&3)&&(qf=!0)),i=r}ut!==0&&ut!==5||kc(t),Ar!==0&&(Ar=0)}function u0(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var a=31-_n(s),o=1<<a,u=r[a];u===-1?(!(o&n)||o&i)&&(r[a]=vO(o,e)):u<=e&&(t.expiredLanes|=o),s&=~o}if(e=Ie,n=le,n=Rd(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i=t.callbackNode,n===0||t===e&&(ge===2||ge===9)||t.cancelPendingCommit!==null)return i!==null&&i!==null&&rp(i),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Rc(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(i!==null&&rp(i),ey(n)){case 2:case 8:n=Wb;break;case 32:n=Af;break;case 268435456:n=Xb;break;default:n=Af}return i=c0.bind(null,t),n=J_(n,i),t.callbackPriority=e,t.callbackNode=n,e}return i!==null&&i!==null&&rp(i),t.callbackPriority=2,t.callbackNode=null,2}function c0(t,e){if(ut!==0&&ut!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Fd()&&t.callbackNode!==n)return null;var i=le;return i=Rd(t,t===Ie?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i===0?null:($R(t,i,e),u0(t,pn()),t.callbackNode!=null&&t.callbackNode===n?c0.bind(null,t):null)}function qw(t,e){if(Fd())return null;$R(t,e,!0)}function QV(){s2(function(){de&6?J_($b,KV):l0()})}function Uy(){if(Ar===0){var t=Eo;t===0&&(t=Th,Th<<=1,!(Th&261888)&&(Th=256)),Ar=t}return Ar}function Hw(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Gh(""+t)}function jw(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function YV(t,e,n,i,r){if(e==="submit"&&n&&n.stateNode===r){var s=Hw((r[rn]||null).action),a=i.submitter;a&&(e=(e=a[rn]||null)?Hw(e.formAction):a.getAttribute("formAction"),e!==null&&(s=e,a=null));var o=new Cd("action","action",null,i,r);t.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Ar!==0){var u=a?jw(r,a):new FormData(r);Mg(n,{pending:!0,data:u,method:r.method,action:s},null,u)}}else typeof s=="function"&&(o.preventDefault(),u=a?jw(r,a):new FormData(r),Mg(n,{pending:!0,data:u,method:r.method,action:s},s,u))},currentTarget:r}]})}}for(var Pp=0;Pp<Ig.length;Pp++){var Op=Ig[Pp],$V=Op.toLowerCase(),WV=Op[0].toUpperCase()+Op.slice(1);Qn($V,"on"+WV)}Qn(wS,"onAnimationEnd");Qn(IS,"onAnimationIteration");Qn(AS,"onAnimationStart");Qn("dblclick","onDoubleClick");Qn("focusin","onFocus");Qn("focusout","onBlur");Qn(fV,"onTransitionRun");Qn(dV,"onTransitionStart");Qn(mV,"onTransitionCancel");Qn(bS,"onTransitionEnd");vo("onMouseEnter",["mouseout","mouseover"]);vo("onMouseLeave",["mouseout","mouseover"]);vo("onPointerEnter",["pointerout","pointerover"]);vo("onPointerLeave",["pointerout","pointerover"]);ha("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ha("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ha("onBeforeInput",["compositionend","keypress","textInput","paste"]);ha("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ha("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ha("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xu="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),XV=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xu));function h0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],u=o.instance,c=o.currentTarget;if(o=o.listener,u!==s&&r.isPropagationStopped())break e;s=o,r.currentTarget=c;try{s(r)}catch(h){Sf(h)}r.currentTarget=null,s=u}else for(a=0;a<i.length;a++){if(o=i[a],u=o.instance,c=o.currentTarget,o=o.listener,u!==s&&r.isPropagationStopped())break e;s=o,r.currentTarget=c;try{s(r)}catch(h){Sf(h)}r.currentTarget=null,s=u}}}}function re(t,e){var n=e[pg];n===void 0&&(n=e[pg]=new Set);var i=t+"__bubble";n.has(i)||(f0(e,t,2,!1),n.add(i))}function Vp(t,e,n){var i=0;e&&(i|=4),f0(n,t,i,e)}var Nh="_reactListening"+Math.random().toString(36).slice(2);function zy(t){if(!t[Nh]){t[Nh]=!0,iS.forEach(function(n){n!=="selectionchange"&&(XV.has(n)||Vp(n,!1,t),Vp(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Nh]||(e[Nh]=!0,Vp("selectionchange",!1,e))}}function f0(t,e,n,i){switch(b0(e)){case 2:var r=b2;break;case 8:r=S2;break;default:r=Hy}n=r.bind(null,e,n,t),r=void 0,!Tg||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function kp(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r)break;if(a===4)for(a=i.return;a!==null;){var u=a.tag;if((u===3||u===4)&&a.stateNode.containerInfo===r)return;a=a.return}for(;o!==null;){if(a=Qa(o),a===null)return;if(u=a.tag,u===5||u===6||u===26||u===27){i=s=a;continue e}o=o.parentNode}}i=i.return}hS(function(){var c=s,h=iy(n),d=[];e:{var m=SS.get(t);if(m!==void 0){var g=Cd,R=t;switch(t){case"keypress":if(Qh(n)===0)break e;case"keydown":case"keyup":g=jO;break;case"focusin":R="focus",g=up;break;case"focusout":R="blur",g=up;break;case"beforeblur":case"afterblur":g=up;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=JE;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=OO;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=QO;break;case wS:case IS:case AS:g=MO;break;case bS:g=$O;break;case"scroll":case"scrollend":g=NO;break;case"wheel":g=XO;break;case"copy":case"cut":case"paste":g=LO;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=ew;break;case"toggle":case"beforetoggle":g=ZO}var D=(e&4)!==0,V=!D&&(t==="scroll"||t==="scrollend"),w=D?m!==null?m+"Capture":null:m;D=[];for(var v=c,I;v!==null;){var C=v;if(I=C.stateNode,C=C.tag,C!==5&&C!==26&&C!==27||I===null||w===null||(C=Hu(v,w),C!=null&&D.push(Ju(v,C,I))),V)break;v=v.return}0<D.length&&(m=new g(m,R,null,n,h),d.push({event:m,listeners:D}))}}if(!(e&7)){e:{if(m=t==="mouseover"||t==="pointerover",g=t==="mouseout"||t==="pointerout",m&&n!==vg&&(R=n.relatedTarget||n.fromElement)&&(Qa(R)||R[Zo]))break e;if((g||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,g?(R=n.relatedTarget||n.toElement,g=c,R=R?Qa(R):null,R!==null&&(V=bc(R),D=R.tag,R!==V||D!==5&&D!==27&&D!==6)&&(R=null)):(g=null,R=c),g!==R)){if(D=JE,C="onMouseLeave",w="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(D=ew,C="onPointerLeave",w="onPointerEnter",v="pointer"),V=g==null?m:tu(g),I=R==null?m:tu(R),m=new D(C,v+"leave",g,n,h),m.target=V,m.relatedTarget=I,C=null,Qa(h)===c&&(D=new D(w,v+"enter",R,n,h),D.target=I,D.relatedTarget=V,C=D),V=C,g&&R)t:{for(D=JV,w=g,v=R,I=0,C=w;C;C=D(C))I++;C=0;for(var z=v;z;z=D(z))C++;for(;0<I-C;)w=D(w),I--;for(;0<C-I;)v=D(v),C--;for(;I--;){if(w===v||v!==null&&w===v.alternate){D=w;break t}w=D(w),v=D(v)}D=null}else D=null;g!==null&&Gw(d,m,g,D,!1),R!==null&&V!==null&&Gw(d,V,R,D,!0)}}e:{if(m=c?tu(c):window,g=m.nodeName&&m.nodeName.toLowerCase(),g==="select"||g==="input"&&m.type==="file")var F=rw;else if(iw(m))if(_S)F=uV;else{F=oV;var T=aV}else g=m.nodeName,!g||g.toLowerCase()!=="input"||m.type!=="checkbox"&&m.type!=="radio"?c&&ny(c.elementType)&&(F=rw):F=lV;if(F&&(F=F(t,c))){gS(d,F,n,h);break e}T&&T(t,m,c),t==="focusout"&&c&&m.type==="number"&&c.memoizedProps.value!=null&&yg(m,"number",m.value)}switch(T=c?tu(c):window,t){case"focusin":(iw(T)||T.contentEditable==="true")&&(Wa=T,Eg=c,pu=null);break;case"focusout":pu=Eg=Wa=null;break;case"mousedown":wg=!0;break;case"contextmenu":case"mouseup":case"dragend":wg=!1,uw(d,n,h);break;case"selectionchange":if(hV)break;case"keydown":case"keyup":uw(d,n,h)}var y;if(ay)e:{switch(t){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else $a?mS(t,n)&&(E="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(dS&&n.locale!=="ko"&&($a||E!=="onCompositionStart"?E==="onCompositionEnd"&&$a&&(y=fS()):(Er=h,ry="value"in Er?Er.value:Er.textContent,$a=!0)),T=Hf(c,E),0<T.length&&(E=new ZE(E,t,null,n,h),d.push({event:E,listeners:T}),y?E.data=y:(y=pS(n),y!==null&&(E.data=y)))),(y=tV?nV(t,n):iV(t,n))&&(E=Hf(c,"onBeforeInput"),0<E.length&&(T=new ZE("onBeforeInput","beforeinput",null,n,h),d.push({event:T,listeners:E}),T.data=y)),YV(d,t,c,n,h)}h0(d,e)})}function Ju(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Hf(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||s===null||(r=Hu(t,n),r!=null&&i.unshift(Ju(t,r,s)),r=Hu(t,e),r!=null&&i.push(Ju(t,r,s))),t.tag===3)return i;t=t.return}return[]}function JV(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Gw(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,u=o.alternate,c=o.stateNode;if(o=o.tag,u!==null&&u===i)break;o!==5&&o!==26&&o!==27||c===null||(u=c,r?(c=Hu(n,s),c!=null&&a.unshift(Ju(n,c,u))):r||(c=Hu(n,s),c!=null&&a.push(Ju(n,c,u)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var ZV=/\r\n?/g,e2=/\u0000|\uFFFD/g;function Kw(t){return(typeof t=="string"?t:""+t).replace(ZV,`
`).replace(e2,"")}function d0(t,e){return e=Kw(e),Kw(t)===e}function Te(t,e,n,i,r,s){switch(n){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||To(t,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&To(t,""+i);break;case"className":Ih(t,"class",i);break;case"tabIndex":Ih(t,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Ih(t,n,i);break;case"style":cS(t,i,s);break;case"data":if(e!=="object"){Ih(t,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Gh(""+i),t.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&Te(t,e,"name",r.name,r,null),Te(t,e,"formEncType",r.formEncType,r,null),Te(t,e,"formMethod",r.formMethod,r,null),Te(t,e,"formTarget",r.formTarget,r,null)):(Te(t,e,"encType",r.encType,r,null),Te(t,e,"method",r.method,r,null),Te(t,e,"target",r.target,r,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Gh(""+i),t.setAttribute(n,i);break;case"onClick":i!=null&&(t.onclick=Si);break;case"onScroll":i!=null&&re("scroll",t);break;case"onScrollEnd":i!=null&&re("scrollend",t);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(x(61));if(n=i.__html,n!=null){if(r.children!=null)throw Error(x(60));t.innerHTML=n}}break;case"multiple":t.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":t.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){t.removeAttribute("xlink:href");break}n=Gh(""+i),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""+i):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":i===!0?t.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,i):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?t.setAttribute(n,i):t.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?t.removeAttribute(n):t.setAttribute(n,i);break;case"popover":re("beforetoggle",t),re("toggle",t),jh(t,"popover",i);break;case"xlinkActuate":yi(t,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":yi(t,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":yi(t,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":yi(t,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":yi(t,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":yi(t,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":yi(t,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":yi(t,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":yi(t,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":jh(t,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=CO.get(n)||n,jh(t,n,i))}}function Kg(t,e,n,i,r,s){switch(n){case"style":cS(t,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(x(61));if(n=i.__html,n!=null){if(r.children!=null)throw Error(x(60));t.innerHTML=n}}break;case"children":typeof i=="string"?To(t,i):(typeof i=="number"||typeof i=="bigint")&&To(t,""+i);break;case"onScroll":i!=null&&re("scroll",t);break;case"onScrollEnd":i!=null&&re("scrollend",t);break;case"onClick":i!=null&&(t.onclick=Si);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!rS.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(r=n.endsWith("Capture"),e=n.slice(2,r?n.length-7:void 0),s=t[rn]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,r),typeof i=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,i,r);break e}n in t?t[n]=i:i===!0?t.setAttribute(n,""):jh(t,n,i)}}}function St(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":re("error",t),re("load",t);var i=!1,r=!1,s;for(s in n)if(n.hasOwnProperty(s)){var a=n[s];if(a!=null)switch(s){case"src":i=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(x(137,e));default:Te(t,e,s,a,n,null)}}r&&Te(t,e,"srcSet",n.srcSet,n,null),i&&Te(t,e,"src",n.src,n,null);return;case"input":re("invalid",t);var o=s=a=r=null,u=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var h=n[i];if(h!=null)switch(i){case"name":r=h;break;case"type":a=h;break;case"checked":u=h;break;case"defaultChecked":c=h;break;case"value":s=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(x(137,e));break;default:Te(t,e,i,h,n,null)}}oS(t,s,o,u,c,a,r,!1);return;case"select":re("invalid",t),i=a=s=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":s=o;break;case"defaultValue":a=o;break;case"multiple":i=o;default:Te(t,e,r,o,n,null)}e=s,n=a,t.multiple=!!i,e!=null?so(t,!!i,e,!1):n!=null&&so(t,!!i,n,!0);return;case"textarea":re("invalid",t),s=r=i=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":i=o;break;case"defaultValue":r=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(x(91));break;default:Te(t,e,a,o,n,null)}uS(t,i,r,s);return;case"option":for(u in n)if(n.hasOwnProperty(u)&&(i=n[u],i!=null))switch(u){case"selected":t.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Te(t,e,u,i,n,null)}return;case"dialog":re("beforetoggle",t),re("toggle",t),re("cancel",t),re("close",t);break;case"iframe":case"object":re("load",t);break;case"video":case"audio":for(i=0;i<Xu.length;i++)re(Xu[i],t);break;case"image":re("error",t),re("load",t);break;case"details":re("toggle",t);break;case"embed":case"source":case"link":re("error",t),re("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(x(137,e));default:Te(t,e,c,i,n,null)}return;default:if(ny(e)){for(h in n)n.hasOwnProperty(h)&&(i=n[h],i!==void 0&&Kg(t,e,h,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&Te(t,e,o,i,n,null))}function t2(t,e,n,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,s=null,a=null,o=null,u=null,c=null,h=null;for(g in n){var d=n[g];if(n.hasOwnProperty(g)&&d!=null)switch(g){case"checked":break;case"value":break;case"defaultValue":u=d;default:i.hasOwnProperty(g)||Te(t,e,g,null,i,d)}}for(var m in i){var g=i[m];if(d=n[m],i.hasOwnProperty(m)&&(g!=null||d!=null))switch(m){case"type":s=g;break;case"name":r=g;break;case"checked":c=g;break;case"defaultChecked":h=g;break;case"value":a=g;break;case"defaultValue":o=g;break;case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(x(137,e));break;default:g!==d&&Te(t,e,m,g,i,d)}}_g(t,a,o,u,c,h,s,r);return;case"select":g=a=o=m=null;for(s in n)if(u=n[s],n.hasOwnProperty(s)&&u!=null)switch(s){case"value":break;case"multiple":g=u;default:i.hasOwnProperty(s)||Te(t,e,s,null,i,u)}for(r in i)if(s=i[r],u=n[r],i.hasOwnProperty(r)&&(s!=null||u!=null))switch(r){case"value":m=s;break;case"defaultValue":o=s;break;case"multiple":a=s;default:s!==u&&Te(t,e,r,s,i,u)}e=o,n=a,i=g,m!=null?so(t,!!n,m,!1):!!i!=!!n&&(e!=null?so(t,!!n,e,!0):so(t,!!n,n?[]:"",!1));return;case"textarea":g=m=null;for(o in n)if(r=n[o],n.hasOwnProperty(o)&&r!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Te(t,e,o,null,i,r)}for(a in i)if(r=i[a],s=n[a],i.hasOwnProperty(a)&&(r!=null||s!=null))switch(a){case"value":m=r;break;case"defaultValue":g=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(x(91));break;default:r!==s&&Te(t,e,a,r,i,s)}lS(t,m,g);return;case"option":for(var R in n)if(m=n[R],n.hasOwnProperty(R)&&m!=null&&!i.hasOwnProperty(R))switch(R){case"selected":t.selected=!1;break;default:Te(t,e,R,null,i,m)}for(u in i)if(m=i[u],g=n[u],i.hasOwnProperty(u)&&m!==g&&(m!=null||g!=null))switch(u){case"selected":t.selected=m&&typeof m!="function"&&typeof m!="symbol";break;default:Te(t,e,u,m,i,g)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var D in n)m=n[D],n.hasOwnProperty(D)&&m!=null&&!i.hasOwnProperty(D)&&Te(t,e,D,null,i,m);for(c in i)if(m=i[c],g=n[c],i.hasOwnProperty(c)&&m!==g&&(m!=null||g!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(x(137,e));break;default:Te(t,e,c,m,i,g)}return;default:if(ny(e)){for(var V in n)m=n[V],n.hasOwnProperty(V)&&m!==void 0&&!i.hasOwnProperty(V)&&Kg(t,e,V,void 0,i,m);for(h in i)m=i[h],g=n[h],!i.hasOwnProperty(h)||m===g||m===void 0&&g===void 0||Kg(t,e,h,m,i,g);return}}for(var w in n)m=n[w],n.hasOwnProperty(w)&&m!=null&&!i.hasOwnProperty(w)&&Te(t,e,w,null,i,m);for(d in i)m=i[d],g=n[d],!i.hasOwnProperty(d)||m===g||m==null&&g==null||Te(t,e,d,m,i,g)}function Qw(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function n2(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var r=n[i],s=r.transferSize,a=r.initiatorType,o=r.duration;if(s&&o&&Qw(a)){for(a=0,o=r.responseEnd,i+=1;i<n.length;i++){var u=n[i],c=u.startTime;if(c>o)break;var h=u.transferSize,d=u.initiatorType;h&&Qw(d)&&(u=u.responseEnd,a+=h*(u<o?1:(o-c)/(u-c)))}if(--i,e+=8*(s+a)/(r.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Qg=null,Yg=null;function jf(t){return t.nodeType===9?t:t.ownerDocument}function Yw(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function m0(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function $g(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Mp=null;function i2(){var t=window.event;return t&&t.type==="popstate"?t===Mp?!1:(Mp=t,!0):(Mp=null,!1)}var p0=typeof setTimeout=="function"?setTimeout:void 0,r2=typeof clearTimeout=="function"?clearTimeout:void 0,$w=typeof Promise=="function"?Promise:void 0,s2=typeof queueMicrotask=="function"?queueMicrotask:typeof $w<"u"?function(t){return $w.resolve(null).then(t).catch(a2)}:p0;function a2(t){setTimeout(function(){throw t})}function rs(t){return t==="head"}function Ww(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"||n==="/&"){if(i===0){t.removeChild(r),Co(e);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")bu(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,bu(n);for(var s=n.firstChild;s;){var a=s.nextSibling,o=s.nodeName;s[Dc]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=a}}else n==="body"&&bu(t.ownerDocument.body);n=r}while(n);Co(e)}function Xw(t,e){var n=t;t=0;do{var i=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=i}while(n)}function Wg(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Wg(n),ty(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function o2(t,e,n,i){for(;t.nodeType===1;){var r=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(i){if(!t[Dc])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==r.rel||t.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||t.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||t.getAttribute("title")!==(r.title==null?null:r.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(r.src==null?null:r.src)||t.getAttribute("type")!==(r.type==null?null:r.type)||t.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=r.name==null?null:""+r.name;if(r.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=kn(t.nextSibling),t===null)break}return null}function l2(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=kn(t.nextSibling),t===null))return null;return t}function g0(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=kn(t.nextSibling),t===null))return null;return t}function Xg(t){return t.data==="$?"||t.data==="$~"}function Jg(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function u2(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var i=function(){e(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),t._reactRetry=i}}function kn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Zg=null;function Jw(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return kn(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Zw(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function _0(t,e,n){switch(e=jf(n),t){case"html":if(t=e.documentElement,!t)throw Error(x(452));return t;case"head":if(t=e.head,!t)throw Error(x(453));return t;case"body":if(t=e.body,!t)throw Error(x(454));return t;default:throw Error(x(451))}}function bu(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);ty(t)}var xn=new Map,eI=new Set;function Gf(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Gi=me.d;me.d={f:c2,r:h2,D:f2,C:d2,L:m2,m:p2,X:_2,S:g2,M:y2};function c2(){var t=Gi.f(),e=zd();return t||e}function h2(t){var e=el(t);e!==null&&e.tag===5&&e.type==="form"?cR(e):Gi.r(t)}var rl=typeof document>"u"?null:document;function y0(t,e,n){var i=rl;if(i&&typeof e=="string"&&e){var r=Dn(e);r='link[rel="'+t+'"][href="'+r+'"]',typeof n=="string"&&(r+='[crossorigin="'+n+'"]'),eI.has(r)||(eI.add(r),t={rel:t,crossOrigin:n,href:e},i.querySelector(r)===null&&(e=i.createElement("link"),St(e,"link",t),_t(e),i.head.appendChild(e)))}}function f2(t){Gi.D(t),y0("dns-prefetch",t,null)}function d2(t,e){Gi.C(t,e),y0("preconnect",t,e)}function m2(t,e,n){Gi.L(t,e,n);var i=rl;if(i&&t&&e){var r='link[rel="preload"][as="'+Dn(e)+'"]';e==="image"&&n&&n.imageSrcSet?(r+='[imagesrcset="'+Dn(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(r+='[imagesizes="'+Dn(n.imageSizes)+'"]')):r+='[href="'+Dn(t)+'"]';var s=r;switch(e){case"style":s=Ro(t);break;case"script":s=sl(t)}xn.has(s)||(t=ke({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),xn.set(s,t),i.querySelector(r)!==null||e==="style"&&i.querySelector(Mc(s))||e==="script"&&i.querySelector(xc(s))||(e=i.createElement("link"),St(e,"link",t),_t(e),i.head.appendChild(e)))}}function p2(t,e){Gi.m(t,e);var n=rl;if(n&&t){var i=e&&typeof e.as=="string"?e.as:"script",r='link[rel="modulepreload"][as="'+Dn(i)+'"][href="'+Dn(t)+'"]',s=r;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=sl(t)}if(!xn.has(s)&&(t=ke({rel:"modulepreload",href:t},e),xn.set(s,t),n.querySelector(r)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(xc(s)))return}i=n.createElement("link"),St(i,"link",t),_t(i),n.head.appendChild(i)}}}function g2(t,e,n){Gi.S(t,e,n);var i=rl;if(i&&t){var r=ro(i).hoistableStyles,s=Ro(t);e=e||"default";var a=r.get(s);if(!a){var o={loading:0,preload:null};if(a=i.querySelector(Mc(s)))o.loading=5;else{t=ke({rel:"stylesheet",href:t,"data-precedence":e},n),(n=xn.get(s))&&By(t,n);var u=a=i.createElement("link");_t(u),St(u,"link",t),u._p=new Promise(function(c,h){u.onload=c,u.onerror=h}),u.addEventListener("load",function(){o.loading|=1}),u.addEventListener("error",function(){o.loading|=2}),o.loading|=4,tf(a,e,i)}a={type:"stylesheet",instance:a,count:1,state:o},r.set(s,a)}}}function _2(t,e){Gi.X(t,e);var n=rl;if(n&&t){var i=ro(n).hoistableScripts,r=sl(t),s=i.get(r);s||(s=n.querySelector(xc(r)),s||(t=ke({src:t,async:!0},e),(e=xn.get(r))&&Fy(t,e),s=n.createElement("script"),_t(s),St(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(r,s))}}function y2(t,e){Gi.M(t,e);var n=rl;if(n&&t){var i=ro(n).hoistableScripts,r=sl(t),s=i.get(r);s||(s=n.querySelector(xc(r)),s||(t=ke({src:t,async:!0,type:"module"},e),(e=xn.get(r))&&Fy(t,e),s=n.createElement("script"),_t(s),St(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(r,s))}}function tI(t,e,n,i){var r=(r=Cr.current)?Gf(r):null;if(!r)throw Error(x(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=Ro(n.href),n=ro(r).hoistableStyles,i=n.get(e),i||(i={type:"style",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Ro(n.href);var s=ro(r).hoistableStyles,a=s.get(t);if(a||(r=r.ownerDocument||r,a={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,a),(s=r.querySelector(Mc(t)))&&!s._p&&(a.instance=s,a.state.loading=5),xn.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},xn.set(t,n),s||v2(r,t,n,a.state))),e&&i===null)throw Error(x(528,""));return a}if(e&&i!==null)throw Error(x(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=sl(n),n=ro(r).hoistableScripts,i=n.get(e),i||(i={type:"script",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(x(444,t))}}function Ro(t){return'href="'+Dn(t)+'"'}function Mc(t){return'link[rel="stylesheet"]['+t+"]"}function v0(t){return ke({},t,{"data-precedence":t.precedence,precedence:null})}function v2(t,e,n,i){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=t.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),St(e,"link",n),_t(e),t.head.appendChild(e))}function sl(t){return'[src="'+Dn(t)+'"]'}function xc(t){return"script[async]"+t}function nI(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var i=t.querySelector('style[data-href~="'+Dn(n.href)+'"]');if(i)return e.instance=i,_t(i),i;var r=ke({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(t.ownerDocument||t).createElement("style"),_t(i),St(i,"style",r),tf(i,n.precedence,t),e.instance=i;case"stylesheet":r=Ro(n.href);var s=t.querySelector(Mc(r));if(s)return e.state.loading|=4,e.instance=s,_t(s),s;i=v0(n),(r=xn.get(r))&&By(i,r),s=(t.ownerDocument||t).createElement("link"),_t(s);var a=s;return a._p=new Promise(function(o,u){a.onload=o,a.onerror=u}),St(s,"link",i),e.state.loading|=4,tf(s,n.precedence,t),e.instance=s;case"script":return s=sl(n.src),(r=t.querySelector(xc(s)))?(e.instance=r,_t(r),r):(i=n,(r=xn.get(s))&&(i=ke({},n),Fy(i,r)),t=t.ownerDocument||t,r=t.createElement("script"),_t(r),St(r,"link",i),t.head.appendChild(r),e.instance=r);case"void":return null;default:throw Error(x(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,tf(i,n.precedence,t));return e.instance}function tf(t,e,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),r=i.length?i[i.length-1]:null,s=r,a=0;a<i.length;a++){var o=i[a];if(o.dataset.precedence===e)s=o;else if(s!==r)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function By(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Fy(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var nf=null;function iI(t,e,n){if(nf===null){var i=new Map,r=nf=new Map;r.set(n,i)}else r=nf,i=r.get(n),i||(i=new Map,r.set(n,i));if(i.has(t))return i;for(i.set(t,null),n=n.getElementsByTagName(t),r=0;r<n.length;r++){var s=n[r];if(!(s[Dc]||s[wt]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var a=s.getAttribute(e)||"";a=t+a;var o=i.get(a);o?o.push(s):i.set(a,[s])}}return i}function rI(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function T2(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function T0(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function E2(t,e,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var r=Ro(i.href),s=e.querySelector(Mc(r));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Kf.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,_t(s);return}s=e.ownerDocument||e,i=v0(i),(r=xn.get(r))&&By(i,r),s=s.createElement("link"),_t(s);var a=s;a._p=new Promise(function(o,u){a.onload=o,a.onerror=u}),St(s,"link",i),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Kf.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var xp=0;function w2(t,e){return t.stylesheets&&t.count===0&&rf(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var i=setTimeout(function(){if(t.stylesheets&&rf(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&xp===0&&(xp=62500*n2());var r=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&rf(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>xp?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(i),clearTimeout(r)}}:null}function Kf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)rf(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Qf=null;function rf(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Qf=new Map,e.forEach(I2,t),Qf=null,Kf.call(t))}function I2(t,e){if(!(e.state.loading&4)){var n=Qf.get(t);if(n)var i=n.get(null);else{n=new Map,Qf.set(t,n);for(var r=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<r.length;s++){var a=r[s];(a.nodeName==="LINK"||a.getAttribute("media")!=="not all")&&(n.set(a.dataset.precedence,a),i=a)}i&&n.set(null,i)}r=e.instance,a=r.getAttribute("data-precedence"),s=n.get(a)||i,s===i&&n.set(null,r),n.set(a,r),this.count++,i=Kf.bind(this),r.addEventListener("load",i),r.addEventListener("error",i),s?s.parentNode.insertBefore(r,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(r,t.firstChild)),e.state.loading|=4}}var Zu={$$typeof:bi,Provider:null,Consumer:null,_currentValue:Us,_currentValue2:Us,_threadCount:0};function A2(t,e,n,i,r,s,a,o,u){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=sp(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=sp(0),this.hiddenUpdates=sp(null),this.identifierPrefix=i,this.onUncaughtError=r,this.onCaughtError=s,this.onRecoverableError=a,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=u,this.incompleteTransitions=new Map}function E0(t,e,n,i,r,s,a,o,u,c,h,d){return t=new A2(t,e,n,a,u,c,h,d,o),e=1,s===!0&&(e|=24),s=hn(3,null,null,e),t.current=s,s.stateNode=t,e=dy(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:e},gy(s),t}function w0(t){return t?(t=Za,t):Za}function I0(t,e,n,i,r,s){r=w0(r),i.context===null?i.context=r:i.pendingContext=r,i=Nr(e),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=Pr(t,i,e),n!==null&&(nn(n,t,e),_u(n,t,e))}function sI(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function qy(t,e){sI(t,e),(t=t.alternate)&&sI(t,e)}function A0(t){if(t.tag===13||t.tag===31){var e=ma(t,67108864);e!==null&&nn(e,t,67108864),qy(t,67108864)}}function aI(t){if(t.tag===13||t.tag===31){var e=yn();e=Z_(e);var n=ma(t,e);n!==null&&nn(n,t,e),qy(t,e)}}var Yf=!0;function b2(t,e,n,i){var r=W.T;W.T=null;var s=me.p;try{me.p=2,Hy(t,e,n,i)}finally{me.p=s,W.T=r}}function S2(t,e,n,i){var r=W.T;W.T=null;var s=me.p;try{me.p=8,Hy(t,e,n,i)}finally{me.p=s,W.T=r}}function Hy(t,e,n,i){if(Yf){var r=e_(i);if(r===null)kp(t,e,i,$f,n),oI(t,i);else if(C2(r,t,e,n,i))i.stopPropagation();else if(oI(t,i),e&4&&-1<R2.indexOf(t)){for(;r!==null;){var s=el(r);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var a=ws(s.pendingLanes);if(a!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;a;){var u=1<<31-_n(a);o.entanglements[1]|=u,a&=~u}_i(s),!(de&6)&&(Uf=pn()+500,kc(0))}}break;case 31:case 13:o=ma(s,2),o!==null&&nn(o,s,2),zd(),qy(s,2)}if(s=e_(i),s===null&&kp(t,e,i,$f,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else kp(t,e,i,null,n)}}function e_(t){return t=iy(t),jy(t)}var $f=null;function jy(t){if($f=null,t=Qa(t),t!==null){var e=bc(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=jb(e),t!==null)return t;t=null}else if(n===31){if(t=Gb(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return $f=t,null}function b0(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(fO()){case $b:return 2;case Wb:return 8;case Af:case dO:return 32;case Xb:return 268435456;default:return 32}default:return 32}}var t_=!1,kr=null,Mr=null,xr=null,ec=new Map,tc=new Map,_r=[],R2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function oI(t,e){switch(t){case"focusin":case"focusout":kr=null;break;case"dragenter":case"dragleave":Mr=null;break;case"mouseover":case"mouseout":xr=null;break;case"pointerover":case"pointerout":ec.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":tc.delete(e.pointerId)}}function ql(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=el(e),e!==null&&A0(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function C2(t,e,n,i,r){switch(e){case"focusin":return kr=ql(kr,t,e,n,i,r),!0;case"dragenter":return Mr=ql(Mr,t,e,n,i,r),!0;case"mouseover":return xr=ql(xr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return ec.set(s,ql(ec.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,tc.set(s,ql(tc.get(s)||null,t,e,n,i,r)),!0}return!1}function S0(t){var e=Qa(t.target);if(e!==null){var n=bc(e);if(n!==null){if(e=n.tag,e===13){if(e=jb(n),e!==null){t.blockedOn=e,GE(t.priority,function(){aI(n)});return}}else if(e===31){if(e=Gb(n),e!==null){t.blockedOn=e,GE(t.priority,function(){aI(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function sf(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=e_(t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);vg=i,n.target.dispatchEvent(i),vg=null}else return e=el(n),e!==null&&A0(e),t.blockedOn=n,!1;e.shift()}return!0}function lI(t,e,n){sf(t)&&n.delete(e)}function D2(){t_=!1,kr!==null&&sf(kr)&&(kr=null),Mr!==null&&sf(Mr)&&(Mr=null),xr!==null&&sf(xr)&&(xr=null),ec.forEach(lI),tc.forEach(lI)}function Ph(t,e){t.blockedOn===e&&(t.blockedOn=null,t_||(t_=!0,ht.unstable_scheduleCallback(ht.unstable_NormalPriority,D2)))}var Oh=null;function uI(t){Oh!==t&&(Oh=t,ht.unstable_scheduleCallback(ht.unstable_NormalPriority,function(){Oh===t&&(Oh=null);for(var e=0;e<t.length;e+=3){var n=t[e],i=t[e+1],r=t[e+2];if(typeof i!="function"){if(jy(i||n)===null)continue;break}var s=el(n);s!==null&&(t.splice(e,3),e-=3,Mg(s,{pending:!0,data:r,method:n.method,action:i},i,r))}}))}function Co(t){function e(u){return Ph(u,t)}kr!==null&&Ph(kr,t),Mr!==null&&Ph(Mr,t),xr!==null&&Ph(xr,t),ec.forEach(e),tc.forEach(e);for(var n=0;n<_r.length;n++){var i=_r[n];i.blockedOn===t&&(i.blockedOn=null)}for(;0<_r.length&&(n=_r[0],n.blockedOn===null);)S0(n),n.blockedOn===null&&_r.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var r=n[i],s=n[i+1],a=r[rn]||null;if(typeof s=="function")a||uI(n);else if(a){var o=null;if(s&&s.hasAttribute("formAction")){if(r=s,a=s[rn]||null)o=a.formAction;else if(jy(r)!==null)continue}else o=a.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),uI(n)}}}function R0(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(a){return r=a})},focusReset:"manual",scroll:"manual"})}function e(){r!==null&&(r(),r=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,r=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),r!==null&&(r(),r=null)}}}function Gy(t){this._internalRoot=t}qd.prototype.render=Gy.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(x(409));var n=e.current,i=yn();I0(n,i,t,e,null,null)};qd.prototype.unmount=Gy.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;I0(t.current,2,null,t,null,null),zd(),e[Zo]=null}};function qd(t){this._internalRoot=t}qd.prototype.unstable_scheduleHydration=function(t){if(t){var e=nS();t={blockedOn:null,target:t,priority:e};for(var n=0;n<_r.length&&e!==0&&e<_r[n].priority;n++);_r.splice(n,0,t),n===0&&S0(t)}};var cI=qb.version;if(cI!=="19.2.0")throw Error(x(527,cI,"19.2.0"));me.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(x(188)):(t=Object.keys(t).join(","),Error(x(268,t)));return t=sO(e),t=t!==null?Kb(t):null,t=t===null?null:t.stateNode,t};var N2={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:W,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Vh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Vh.isDisabled&&Vh.supportsFiber)try{Sc=Vh.inject(N2),gn=Vh}catch{}}bd.createRoot=function(t,e){if(!Hb(t))throw Error(x(299));var n=!1,i="",r=yR,s=vR,a=TR;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(r=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(a=e.onRecoverableError)),e=E0(t,1,!1,null,null,n,i,null,r,s,a,R0),t[Zo]=e.current,zy(t),new Gy(e)};bd.hydrateRoot=function(t,e,n){if(!Hb(t))throw Error(x(299));var i=!1,r="",s=yR,a=vR,o=TR,u=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(a=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(u=n.formState)),e=E0(t,1,!0,e,n??null,i,r,u,s,a,o,R0),e.context=w0(null),n=e.current,i=yn(),i=Z_(i),r=Nr(i),r.callback=null,Pr(n,r,i),n=i,e.current.lanes=n,Cc(e,n),_i(e),t[Zo]=e.current,zy(t),new qd(e)};bd.version="19.2.0";function C0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(C0)}catch(t){console.error(t)}}C0(),xb.exports=bd;var P2=xb.exports;const i5=Sb(P2),O2=()=>{};var hI={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D0=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},V2=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const r=t[n++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const s=t[n++];e[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){const s=t[n++],a=t[n++],o=t[n++],u=((r&7)<<18|(s&63)<<12|(a&63)<<6|o&63)-65536;e[i++]=String.fromCharCode(55296+(u>>10)),e[i++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],a=t[n++];e[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|a&63)}}return e.join("")},N0={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<t.length;r+=3){const s=t[r],a=r+1<t.length,o=a?t[r+1]:0,u=r+2<t.length,c=u?t[r+2]:0,h=s>>2,d=(s&3)<<4|o>>4;let m=(o&15)<<2|c>>6,g=c&63;u||(g=64,a||(m=64)),i.push(n[h],n[d],n[m],n[g])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(D0(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):V2(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<t.length;){const s=n[t.charAt(r++)],o=r<t.length?n[t.charAt(r)]:0;++r;const c=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,s==null||o==null||c==null||d==null)throw new k2;const m=s<<2|o>>4;if(i.push(m),c!==64){const g=o<<4&240|c>>2;if(i.push(g),d!==64){const R=c<<6&192|d;i.push(R)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class k2 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const M2=function(t){const e=D0(t);return N0.encodeByteArray(e,!0)},Wf=function(t){return M2(t).replace(/\./g,"")},Ky=function(t){try{return N0.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Xf(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!x2(n)||(t[n]=Xf(t[n],e[n]));return t}function x2(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qy(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L2=()=>Qy().__FIREBASE_DEFAULTS__,U2=()=>{if(typeof process>"u"||typeof hI>"u")return;const t=hI.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},z2=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ky(t[1]);return e&&JSON.parse(e)},Hd=()=>{try{return O2()||L2()||U2()||z2()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},B2=t=>{var e,n;return(n=(e=Hd())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},P0=t=>{const e=B2(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Yy=()=>{var t;return(t=Hd())==null?void 0:t.config},F2=t=>{var e;return(e=Hd())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q2{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ss(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function $y(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O0(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Wf(JSON.stringify(n)),Wf(JSON.stringify(a)),""].join(".")}const Su={};function H2(){const t={prod:[],emulator:[]};for(const e of Object.keys(Su))Su[e]?t.emulator.push(e):t.prod.push(e);return t}function j2(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let fI=!1;function Wy(t,e){if(typeof window>"u"||typeof document>"u"||!ss(window.location.host)||Su[t]===e||Su[t]||fI)return;Su[t]=e;function n(m){return`__firebase__banner__${m}`}const i="__firebase__banner",s=H2().prod.length>0;function a(){const m=document.getElementById(i);m&&m.remove()}function o(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,g){m.setAttribute("width","24"),m.setAttribute("id",g),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function c(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{fI=!0,a()},m}function h(m,g){m.setAttribute("id",g),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function d(){const m=j2(i),g=n("text"),R=document.getElementById(g)||document.createElement("span"),D=n("learnmore"),V=document.getElementById(D)||document.createElement("a"),w=n("preprendIcon"),v=document.getElementById(w)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const I=m.element;o(I),h(V,D);const C=c();u(v,w),I.append(v,R,V,C),document.body.appendChild(I)}s?(R.innerText="Preview backend disconnected.",v.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(v.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",g)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function G2(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Be())}function jd(){var e;const t=(e=Hd())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function K2(){return typeof window<"u"||V0()}function V0(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function Q2(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function k0(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Xy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function M0(){const t=Be();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function x0(){return!jd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function L0(){return!jd()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function nc(){try{return typeof indexedDB=="object"}catch{return!1}}function Y2(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var s;e(((s=r.error)==null?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $2="FirebaseError";class Mt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=$2,Object.setPrototypeOf(this,Mt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ga.prototype.create)}}class ga{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},r=`${this.service}/${e}`,s=this.errors[e],a=s?W2(s,i):"Error",o=`${this.serviceName}: ${a} (${r}).`;return new Mt(r,o,i)}}function W2(t,e){return t.replace(X2,(n,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const X2=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dI(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function J2(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Kr(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const r of n){if(!i.includes(r))return!1;const s=t[r],a=e[r];if(mI(s)&&mI(a)){if(!Kr(s,a))return!1}else if(s!==a)return!1}for(const r of i)if(!n.includes(r))return!1;return!0}function mI(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function al(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function io(t){const e={};return t.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[r,s]=i.split("=");e[decodeURIComponent(r)]=decodeURIComponent(s)}}),e}function ru(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function U0(t,e){const n=new Z2(t,e);return n.subscribe.bind(n)}class Z2{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let r;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");ek(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:i},r.next===void 0&&(r.next=Lp),r.error===void 0&&(r.error=Lp),r.complete===void 0&&(r.complete=Lp);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ek(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Lp(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(t){return t&&t._delegate?t._delegate:t}class Gn{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bs="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tk{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new q2;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ik(e))try{this.getOrInitializeService({instanceIdentifier:bs})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(e=bs){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=bs){return this.instances.has(e)}getOptions(e=bs){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[s,a]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(s);i===o&&a.resolve(r)}return r}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(i)??new Set;r.add(e),this.onInitCallbacks.set(i,r);const s=this.instances.get(i);return s&&e(s,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const r of i)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:nk(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=bs){return this.component?this.component.multipleInstances?e:bs:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function nk(t){return t===bs?void 0:t}function ik(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z0{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new tk(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy=[];var se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(se||(se={}));const B0={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},rk=se.INFO,sk={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},ak=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),r=sk[e];if(r)console[r](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Gd{constructor(e){this.name=e,this._logLevel=rk,this._logHandler=ak,this._userLogHandler=null,Jy.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?B0[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}function ok(t){Jy.forEach(e=>{e.setLogLevel(t)})}function lk(t,e){for(const n of Jy){let i=null;e&&e.level&&(i=B0[e.level]),t===null?n.userLogHandler=null:n.userLogHandler=(r,s,...a)=>{const o=a.map(u=>{if(u==null)return null;if(typeof u=="string")return u;if(typeof u=="number"||typeof u=="boolean")return u.toString();if(u instanceof Error)return u.message;try{return JSON.stringify(u)}catch{return null}}).filter(u=>u).join(" ");s>=(i??r.logLevel)&&t({level:se[s].toLowerCase(),message:o,args:a,type:r.name})}}}const uk=(t,e)=>e.some(n=>t instanceof n);let pI,gI;function ck(){return pI||(pI=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hk(){return gI||(gI=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const F0=new WeakMap,n_=new WeakMap,q0=new WeakMap,Up=new WeakMap,Zy=new WeakMap;function fk(t){const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",a)},s=()=>{n(Lr(t.result)),r()},a=()=>{i(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&F0.set(n,t)}).catch(()=>{}),Zy.set(e,t),e}function dk(t){if(n_.has(t))return;const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",a),t.removeEventListener("abort",a)},s=()=>{n(),r()},a=()=>{i(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",a),t.addEventListener("abort",a)});n_.set(t,e)}let i_={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return n_.get(t);if(e==="objectStoreNames")return t.objectStoreNames||q0.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Lr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function mk(t){i_=t(i_)}function pk(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(zp(this),e,...n);return q0.set(i,e.sort?e.sort():[e]),Lr(i)}:hk().includes(t)?function(...e){return t.apply(zp(this),e),Lr(F0.get(this))}:function(...e){return Lr(t.apply(zp(this),e))}}function gk(t){return typeof t=="function"?pk(t):(t instanceof IDBTransaction&&dk(t),uk(t,ck())?new Proxy(t,i_):t)}function Lr(t){if(t instanceof IDBRequest)return fk(t);if(Up.has(t))return Up.get(t);const e=gk(t);return e!==t&&(Up.set(t,e),Zy.set(e,t)),e}const zp=t=>Zy.get(t);function _k(t,e,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){const a=indexedDB.open(t,e),o=Lr(a);return i&&a.addEventListener("upgradeneeded",u=>{i(Lr(a.result),u.oldVersion,u.newVersion,Lr(a.transaction),u)}),n&&a.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),o.then(u=>{s&&u.addEventListener("close",()=>s()),r&&u.addEventListener("versionchange",c=>r(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}const yk=["get","getKey","getAll","getAllKeys","count"],vk=["put","add","delete","clear"],Bp=new Map;function _I(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Bp.get(e))return Bp.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,r=vk.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||yk.includes(n)))return;const s=async function(a,...o){const u=this.transaction(a,r?"readwrite":"readonly");let c=u.store;return i&&(c=c.index(o.shift())),(await Promise.all([c[n](...o),r&&u.done]))[0]};return Bp.set(e,s),s}mk(t=>({...t,get:(e,n,i)=>_I(e,n)||t.get(e,n,i),has:(e,n)=>!!_I(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tk{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ek(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Ek(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Jf="@firebase/app",r_="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi=new Gd("@firebase/app"),wk="@firebase/app-compat",Ik="@firebase/analytics-compat",Ak="@firebase/analytics",bk="@firebase/app-check-compat",Sk="@firebase/app-check",Rk="@firebase/auth",Ck="@firebase/auth-compat",Dk="@firebase/database",Nk="@firebase/data-connect",Pk="@firebase/database-compat",Ok="@firebase/functions",Vk="@firebase/functions-compat",kk="@firebase/installations",Mk="@firebase/installations-compat",xk="@firebase/messaging",Lk="@firebase/messaging-compat",Uk="@firebase/performance",zk="@firebase/performance-compat",Bk="@firebase/remote-config",Fk="@firebase/remote-config-compat",qk="@firebase/storage",Hk="@firebase/storage-compat",jk="@firebase/firestore",Gk="@firebase/ai",Kk="@firebase/firestore-compat",Qk="firebase",Yk="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr="[DEFAULT]",$k={[Jf]:"fire-core",[wk]:"fire-core-compat",[Ak]:"fire-analytics",[Ik]:"fire-analytics-compat",[Sk]:"fire-app-check",[bk]:"fire-app-check-compat",[Rk]:"fire-auth",[Ck]:"fire-auth-compat",[Dk]:"fire-rtdb",[Nk]:"fire-data-connect",[Pk]:"fire-rtdb-compat",[Ok]:"fire-fn",[Vk]:"fire-fn-compat",[kk]:"fire-iid",[Mk]:"fire-iid-compat",[xk]:"fire-fcm",[Lk]:"fire-fcm-compat",[Uk]:"fire-perf",[zk]:"fire-perf-compat",[Bk]:"fire-rc",[Fk]:"fire-rc-compat",[qk]:"fire-gcs",[Hk]:"fire-gcs-compat",[jk]:"fire-fst",[Kk]:"fire-fst-compat",[Gk]:"fire-vertex","fire-js":"fire-js",[Qk]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr=new Map,Do=new Map,No=new Map;function ic(t,e){try{t.container.addComponent(e)}catch(n){Bi.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function H0(t,e){t.container.addOrOverwriteComponent(e)}function Fi(t){const e=t.name;if(No.has(e))return Bi.debug(`There were multiple attempts to register component ${e}.`),!1;No.set(e,t);for(const n of Yr.values())ic(n,t);for(const n of Do.values())ic(n,t);return!0}function Kd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Wk(t,e,n=Qr){Kd(t,e).clearInstance(n)}function ev(t){return t.options!==void 0}function j0(t){return ev(t)?!1:"authIdToken"in t||"appCheckToken"in t||"releaseOnDeref"in t||"automaticDataCollectionEnabled"in t}function Oe(t){return t==null?!1:t.settings!==void 0}function Xk(){No.clear()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jk={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},vn=new ga("app","Firebase",Jk);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let G0=class{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Gn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw vn.create("app-deleted",{appName:this._name})}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yI(t,e){const n=Ky(t.split(".")[1]);if(n===null){console.error(`FirebaseServerApp ${e} is invalid: second part could not be parsed.`);return}if(JSON.parse(n).exp===void 0){console.error(`FirebaseServerApp ${e} is invalid: expiration claim could not be parsed`);return}const r=JSON.parse(n).exp*1e3,s=new Date().getTime();r-s<=0&&console.error(`FirebaseServerApp ${e} is invalid: the token has expired.`)}class Zk extends G0{constructor(e,n,i,r){const s=n.automaticDataCollectionEnabled!==void 0?n.automaticDataCollectionEnabled:!0,a={name:i,automaticDataCollectionEnabled:s};if(e.apiKey!==void 0)super(e,a,r);else{const o=e;super(o.options,a,r)}this._serverConfig={automaticDataCollectionEnabled:s,...n},this._serverConfig.authIdToken&&yI(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&yI(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,n.releaseOnDeref=void 0,Tn(Jf,r_,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){iv(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw vn.create("server-app-deleted")}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki=Yk;function tv(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Qr,automaticDataCollectionEnabled:!0,...e},r=i.name;if(typeof r!="string"||!r)throw vn.create("bad-app-name",{appName:String(r)});if(n||(n=Yy()),!n)throw vn.create("no-options");const s=Yr.get(r);if(s){if(Kr(n,s.options)&&Kr(i,s.config))return s;throw vn.create("duplicate-app",{appName:r})}const a=new z0(r);for(const u of No.values())a.addComponent(u);const o=new G0(n,i,a);return Yr.set(r,o),o}function eM(t,e={}){if(K2()&&!V0())throw vn.create("invalid-server-app-environment");let n,i=e||{};if(t&&(ev(t)?n=t.options:j0(t)?i=t:n=t),i.automaticDataCollectionEnabled===void 0&&(i.automaticDataCollectionEnabled=!0),n||(n=Yy()),!n)throw vn.create("no-options");const r={...i,...n};r.releaseOnDeref!==void 0&&delete r.releaseOnDeref;const s=h=>[...h].reduce((d,m)=>Math.imul(31,d)+m.charCodeAt(0)|0,0);if(i.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw vn.create("finalization-registry-not-supported",{});const a=""+s(JSON.stringify(r)),o=Do.get(a);if(o)return o.incRefCount(i.releaseOnDeref),o;const u=new z0(a);for(const h of No.values())u.addComponent(h);const c=new Zk(n,i,a,u);return Do.set(a,c),c}function nv(t=Qr){const e=Yr.get(t);if(!e&&t===Qr&&Yy())return tv();if(!e)throw vn.create("no-app",{appName:t});return e}function tM(){return Array.from(Yr.values())}async function iv(t){let e=!1;const n=t.name;Yr.has(n)?(e=!0,Yr.delete(n)):Do.has(n)&&t.decRefCount()<=0&&(Do.delete(n),e=!0),e&&(await Promise.all(t.container.getProviders().map(i=>i.delete())),t.isDeleted=!0)}function Tn(t,e,n){let i=$k[t]??t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),s=e.match(/\s|\//);if(r||s){const a=[`Unable to register library "${i}" with version "${e}":`];r&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Bi.warn(a.join(" "));return}Fi(new Gn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}function K0(t,e){if(t!==null&&typeof t!="function")throw vn.create("invalid-log-argument");lk(t,e)}function Q0(t){ok(t)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nM="firebase-heartbeat-database",iM=1,rc="firebase-heartbeat-store";let Fp=null;function Y0(){return Fp||(Fp=_k(nM,iM,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(rc)}catch(n){console.warn(n)}}}}).catch(t=>{throw vn.create("idb-open",{originalErrorMessage:t.message})})),Fp}async function rM(t){try{const n=(await Y0()).transaction(rc),i=await n.objectStore(rc).get($0(t));return await n.done,i}catch(e){if(e instanceof Mt)Bi.warn(e.message);else{const n=vn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Bi.warn(n.message)}}}async function vI(t,e){try{const i=(await Y0()).transaction(rc,"readwrite");await i.objectStore(rc).put(e,$0(t)),await i.done}catch(n){if(n instanceof Mt)Bi.warn(n.message);else{const i=vn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Bi.warn(i.message)}}}function $0(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sM=1024,aM=30;class oM{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new uM(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=TI();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats.length>aM){const a=cM(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Bi.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=TI(),{heartbeatsToSend:i,unsentEntries:r}=lM(this._heartbeatsCache.heartbeats),s=Wf(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Bi.warn(n),""}}}function TI(){return new Date().toISOString().substring(0,10)}function lM(t,e=sM){const n=[];let i=t.slice();for(const r of t){const s=n.find(a=>a.agent===r.agent);if(s){if(s.dates.push(r.date),EI(n)>e){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),EI(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class uM{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return nc()?Y2().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await rM(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return vI(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return vI(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function EI(t){return Wf(JSON.stringify({version:2,heartbeats:t})).length}function cM(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hM(t){Fi(new Gn("platform-logger",e=>new Tk(e),"PRIVATE")),Fi(new Gn("heartbeat",e=>new oM(e),"PRIVATE")),Tn(Jf,r_,t),Tn(Jf,r_,"esm2020"),Tn("fire-js","")}hM("");const fM=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:Mt,SDK_VERSION:Ki,_DEFAULT_ENTRY_NAME:Qr,_addComponent:ic,_addOrOverwriteComponent:H0,_apps:Yr,_clearComponents:Xk,_components:No,_getProvider:Kd,_isFirebaseApp:ev,_isFirebaseServerApp:Oe,_isFirebaseServerAppSettings:j0,_registerComponent:Fi,_removeServiceInstance:Wk,_serverApps:Do,deleteApp:iv,getApp:nv,getApps:tM,initializeApp:tv,initializeServerApp:eM,onLog:K0,registerVersion:Tn,setLogLevel:Q0},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dM{constructor(e,n){this._delegate=e,this.firebase=n,ic(e,new Gn("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),iv(this._delegate)))}_getService(e,n=Qr){var r;this._delegate.checkDestroyed();const i=this._delegate.container.getProvider(e);return!i.isInitialized()&&((r=i.getComponent())==null?void 0:r.instantiationMode)==="EXPLICIT"&&i.initialize(),i.getImmediate({identifier:n})}_removeServiceInstance(e,n=Qr){this._delegate.container.getProvider(e).clearInstance(n)}_addComponent(e){ic(this._delegate,e)}_addOrOverwriteComponent(e){H0(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mM={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},wI=new ga("app-compat","Firebase",mM);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pM(t){const e={},n={__esModule:!0,initializeApp:s,app:r,registerVersion:Tn,setLogLevel:Q0,onLog:K0,apps:null,SDK_VERSION:Ki,INTERNAL:{registerComponent:o,removeApp:i,useAsService:u,modularAPIs:fM}};n.default=n,Object.defineProperty(n,"apps",{get:a});function i(c){delete e[c]}function r(c){if(c=c||Qr,!dI(e,c))throw wI.create("no-app",{appName:c});return e[c]}r.App=t;function s(c,h={}){const d=tv(c,h);if(dI(e,d.name))return e[d.name];const m=new t(d,n);return e[d.name]=m,m}function a(){return Object.keys(e).map(c=>e[c])}function o(c){const h=c.name,d=h.replace("-compat","");if(Fi(c)&&c.type==="PUBLIC"){const m=(g=r())=>{if(typeof g[d]!="function")throw wI.create("invalid-app-argument",{appName:h});return g[d]()};c.serviceProps!==void 0&&Xf(m,c.serviceProps),n[d]=m,t.prototype[d]=function(...g){return this._getService.bind(this,h).apply(this,c.multipleInstances?g:[])}}return c.type==="PUBLIC"?n[d]:null}function u(c,h){return h==="serverAuth"?null:h}return n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W0(){const t=pM(dM);t.INTERNAL={...t.INTERNAL,createFirebaseNamespace:W0,extendNamespace:e,createSubscribe:U0,ErrorFactory:ga,deepExtend:Xf};function e(n){Xf(t,n)}return t}const gM=W0();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const II=new Gd("@firebase/app-compat"),_M="@firebase/app-compat",yM="0.5.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vM(t){Tn(_M,yM,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */try{const t=Qy();if(t.firebase!==void 0){II.warn(`
      Warning: Firebase is already defined in the global scope. Please make sure
      Firebase library is only loaded once.
    `);const e=t.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&II.warn(`
        Warning: You are trying to load Firebase while using Firebase Performance standalone script.
        You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
        `)}}catch{}const Lc=gM;vM();var TM="firebase",EM="12.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Lc.registerVersion(TM,EM,"app-compat");const Hl={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",TWITTER:"twitter.com"},Da={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wM(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements.","invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}}function X0(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const IM=wM,AM=X0,J0=new ga("auth","Firebase",X0());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=new Gd("@firebase/auth");function bM(t,...e){Zf.logLevel<=se.WARN&&Zf.warn(`Auth (${Ki}): ${t}`,...e)}function af(t,...e){Zf.logLevel<=se.ERROR&&Zf.error(`Auth (${Ki}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(t,...e){throw sv(t,...e)}function ct(t,...e){return sv(t,...e)}function rv(t,e,n){const i={...AM(),[e]:n};return new ga("auth","Firebase",i).create(e,{appName:t.name})}function vt(t){return rv(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ol(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&Ct(t,"argument-error"),rv(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function sv(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return J0.create(t,...e)}function B(t,e,...n){if(!t)throw sv(e,...n)}function si(t){const e="INTERNAL ASSERTION FAILED: "+t;throw af(e),new Error(e)}function Kn(t,e){t||si(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sc(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function av(){return AI()==="http:"||AI()==="https:"}function AI(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SM(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(av()||k0()||"connection"in navigator)?navigator.onLine:!0}function RM(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(e,n){this.shortDelay=e,this.longDelay=n,Kn(n>e,"Short delay should be less than long delay!"),this.isMobile=G2()||Xy()}get(){return SM()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ov(t,e){Kn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z0{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;si("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;si("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;si("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CM={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DM=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],NM=new Uc(3e4,6e4);function Ye(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function $e(t,e,n,i,r={}){return e1(t,r,async()=>{let s={},a={};i&&(e==="GET"?a=i:s={body:JSON.stringify(i)});const o=al({key:t.config.apiKey,...a}).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c={method:e,headers:u,...s};return Q2()||(c.referrerPolicy="no-referrer"),t.emulatorConfig&&ss(t.emulatorConfig.host)&&(c.credentials="include"),Z0.fetch()(await t1(t,t.config.apiHost,n,o),c)})}async function e1(t,e,n){t._canInitEmulator=!1;const i={...CM,...e};try{const r=new OM(t),s=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw su(t,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const o=s.ok?a.errorMessage:a.error.message,[u,c]=o.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw su(t,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw su(t,"email-already-in-use",a);if(u==="USER_DISABLED")throw su(t,"user-disabled",a);const h=i[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw rv(t,h,c);Ct(t,h)}}catch(r){if(r instanceof Mt)throw r;Ct(t,"network-request-failed",{message:String(r)})}}async function Qi(t,e,n,i,r={}){const s=await $e(t,e,n,i,r);return"mfaPendingCredential"in s&&Ct(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function t1(t,e,n,i){const r=`${e}${n}?${i}`,s=t,a=s.config.emulator?ov(t.config,r):`${t.config.apiScheme}://${r}`;return DM.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function PM(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class OM{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(ct(this.auth,"network-request-failed")),NM.get())})}}function su(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const r=ct(t,e,i);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bI(t){return t!==void 0&&t.getResponse!==void 0}function SI(t){return t!==void 0&&t.enterprise!==void 0}class n1{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return PM(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VM(t){return(await $e(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function i1(t,e){return $e(t,"GET","/v2/recaptchaConfig",Ye(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kM(t,e){return $e(t,"POST","/v1/accounts:delete",e)}async function MM(t,e){return $e(t,"POST","/v1/accounts:update",e)}async function ed(t,e){return $e(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ru(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function xM(t,e=!1){const n=$(t),i=await n.getIdToken(e),r=Qd(i);B(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const s=typeof r.firebase=="object"?r.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:r,token:i,authTime:Ru(qp(r.auth_time)),issuedAtTime:Ru(qp(r.iat)),expirationTime:Ru(qp(r.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function qp(t){return Number(t)*1e3}function Qd(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return af("JWT malformed, contained fewer than 3 sections"),null;try{const r=Ky(n);return r?JSON.parse(r):(af("Failed to decode base64 JWT payload"),null)}catch(r){return af("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function RI(t){const e=Qd(t);return B(e,"internal-error"),B(typeof e.exp<"u","internal-error"),B(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qi(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof Mt&&LM(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function LM({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UM{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ru(this.lastLoginAt),this.creationTime=Ru(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ac(t){var d;const e=t.auth,n=await t.getIdToken(),i=await qi(t,ed(e,{idToken:n}));B(i==null?void 0:i.users.length,e,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const s=(d=r.providerUserInfo)!=null&&d.length?r1(r.providerUserInfo):[],a=BM(t.providerData,s),o=t.isAnonymous,u=!(t.email&&r.passwordHash)&&!(a!=null&&a.length),c=o?u:!1,h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new s_(r.createdAt,r.lastLoginAt),isAnonymous:c};Object.assign(t,h)}async function zM(t){const e=$(t);await ac(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function BM(t,e){return[...t.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function r1(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FM(t,e){const n=await e1(t,{},async()=>{const i=al({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:s}=t.config,a=await t1(t,r,"/v1/token",`key=${s}`),o=await t._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:o,body:i};return t.emulatorConfig&&ss(t.emulatorConfig.host)&&(u.credentials="include"),Z0.fetch()(a,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function qM(t,e){return $e(t,"POST","/v2/accounts:revokeToken",Ye(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){B(e.idToken,"internal-error"),B(typeof e.idToken<"u","internal-error"),B(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):RI(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){B(e.length!==0,"internal-error");const n=RI(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(B(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:r,expiresIn:s}=await FM(e,n);this.updateTokensAndExpiration(i,r,Number(s))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:r,expirationTime:s}=n,a=new ho;return i&&(B(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),r&&(B(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),s&&(B(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ho,this.toJSON())}_performRefresh(){return si("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function or(t,e){B(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class qn{constructor({uid:e,auth:n,stsTokenManager:i,...r}){this.providerId="firebase",this.proactiveRefresh=new UM(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new s_(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await qi(this,this.stsTokenManager.getToken(this.auth,e));return B(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return xM(this,e)}reload(){return zM(this)}_assign(e){this!==e&&(B(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new qn({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){B(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await ac(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Oe(this.auth.app))return Promise.reject(vt(this.auth));const e=await this.getIdToken();return await qi(this,kM(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,r=n.email??void 0,s=n.phoneNumber??void 0,a=n.photoURL??void 0,o=n.tenantId??void 0,u=n._redirectEventId??void 0,c=n.createdAt??void 0,h=n.lastLoginAt??void 0,{uid:d,emailVerified:m,isAnonymous:g,providerData:R,stsTokenManager:D}=n;B(d&&D,e,"internal-error");const V=ho.fromJSON(this.name,D);B(typeof d=="string",e,"internal-error"),or(i,e.name),or(r,e.name),B(typeof m=="boolean",e,"internal-error"),B(typeof g=="boolean",e,"internal-error"),or(s,e.name),or(a,e.name),or(o,e.name),or(u,e.name),or(c,e.name),or(h,e.name);const w=new qn({uid:d,auth:e,email:r,emailVerified:m,displayName:i,isAnonymous:g,photoURL:a,phoneNumber:s,tenantId:o,stsTokenManager:V,createdAt:c,lastLoginAt:h});return R&&Array.isArray(R)&&(w.providerData=R.map(v=>({...v}))),u&&(w._redirectEventId=u),w}static async _fromIdTokenResponse(e,n,i=!1){const r=new ho;r.updateFromServerResponse(n);const s=new qn({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await ac(s),s}static async _fromGetAccountInfoResponse(e,n,i){const r=n.users[0];B(r.localId!==void 0,"internal-error");const s=r.providerUserInfo!==void 0?r1(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(s!=null&&s.length),o=new ho;o.updateFromIdToken(i);const u=new qn({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:a}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new s_(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CI=new Map;function dn(t){Kn(t instanceof Function,"Expected a class definition");let e=CI.get(t);return e?(Kn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,CI.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s1{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}s1.type="NONE";const Po=s1;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hs(t,e,n){return`firebase:${t}:${e}:${n}`}class fo{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:r,name:s}=this.auth;this.fullUserKey=Hs(this.userKey,r.apiKey,s),this.fullPersistenceKey=Hs("persistence",r.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await ed(this.auth,{idToken:e}).catch(()=>{});return n?qn._fromGetAccountInfoResponse(this.auth,n,e):null}return qn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new fo(dn(Po),e,i);const r=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=r[0]||dn(Po);const a=Hs(i,e.config.apiKey,e.name);let o=null;for(const c of n)try{const h=await c._get(a);if(h){let d;if(typeof h=="string"){const m=await ed(e,{idToken:h}).catch(()=>{});if(!m)break;d=await qn._fromGetAccountInfoResponse(e,m,h)}else d=qn._fromJSON(e,h);c!==s&&(o=d),s=c;break}}catch{}const u=r.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new fo(s,e,i):(s=u[0],o&&await s._set(a,o.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(a)}catch{}})),new fo(s,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DI(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(u1(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(a1(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(c1(e))return"Blackberry";if(h1(e))return"Webos";if(o1(e))return"Safari";if((e.includes("chrome/")||l1(e))&&!e.includes("edge/"))return"Chrome";if(zc(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function a1(t=Be()){return/firefox\//i.test(t)}function o1(t=Be()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function l1(t=Be()){return/crios\//i.test(t)}function u1(t=Be()){return/iemobile/i.test(t)}function zc(t=Be()){return/android/i.test(t)}function c1(t=Be()){return/blackberry/i.test(t)}function h1(t=Be()){return/webos/i.test(t)}function Bc(t=Be()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function HM(t=Be()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(t)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(t)}function jM(t=Be()){var e;return Bc(t)&&!!((e=window.navigator)!=null&&e.standalone)}function GM(){return M0()&&document.documentMode===10}function f1(t=Be()){return Bc(t)||zc(t)||h1(t)||c1(t)||/windows phone/i.test(t)||u1(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d1(t,e=[]){let n;switch(t){case"Browser":n=DI(Be());break;case"Worker":n=`${DI(Be())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ki}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KM{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=s=>new Promise((a,o)=>{try{const u=e(s);a(u)}catch(u){o(u)}});i.onAbort=n,this.queue.push(i);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QM(t,e={}){return $e(t,"GET","/v2/passwordPolicy",Ye(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YM=6;class $M{constructor(e){var i;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??YM,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WM{constructor(e,n,i,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new NI(this),this.idTokenSubscription=new NI(this),this.beforeStateQueue=new KM(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=J0,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=dn(n)),this._initializationPromise=this.queue(async()=>{var i,r,s;if(!this._deleted&&(this.persistenceManager=await fo.create(this,e),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ed(this,{idToken:e}),i=await qn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(Oe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(s=this.redirectUser)==null?void 0:s._redirectEventId,o=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===o)&&(u!=null&&u.user)&&(i=u.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ac(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=RM()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Oe(this.app))return Promise.reject(vt(this));const n=e?$(e):null;return n&&B(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&B(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Oe(this.app)?Promise.reject(vt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Oe(this.app)?Promise.reject(vt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(dn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await QM(this),n=new $M(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ga("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await qM(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&dn(e)||this._popupRedirectResolver;B(n,this,"argument-error"),this.redirectPersistenceManager=await fo.create(this,[dn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,i;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,r){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let a=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(o,this,"internal-error"),o.then(()=>{a||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,i,r);return()=>{a=!0,u()}}else{const u=e.addObserver(n);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=d1(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var n;if(Oe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&bM(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Fe(t){return $(t)}class NI{constructor(e){this.auth=e,this.observer=null,this.addObserver=U0(n=>this.observer=n)}get next(){return B(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function XM(t){Fc=t}function lv(t){return Fc.loadJS(t)}function JM(){return Fc.recaptchaV2Script}function ZM(){return Fc.recaptchaEnterpriseScript}function ex(){return Fc.gapiScript}function m1(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tx=500,nx=6e4,kh=1e12;class ix{constructor(e){this.auth=e,this.counter=kh,this._widgets=new Map}render(e,n){const i=this.counter;return this._widgets.set(i,new ax(e,this.auth.name,n||{})),this.counter++,i}reset(e){var i;const n=e||kh;(i=this._widgets.get(n))==null||i.delete(),this._widgets.delete(n)}getResponse(e){var i;const n=e||kh;return((i=this._widgets.get(n))==null?void 0:i.getResponse())||""}async execute(e){var i;const n=e||kh;return(i=this._widgets.get(n))==null||i.execute(),""}}class rx{constructor(){this.enterprise=new sx}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class sx{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class ax{constructor(e,n,i){this.params=i,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const r=typeof e=="string"?document.getElementById(e):e;B(r,"argument-error",{appName:n}),this.container=r,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=ox(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},nx)},tx))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function ox(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let i=0;i<t;i++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}const lx="recaptcha-enterprise",Cu="NO_RECAPTCHA";class p1{constructor(e){this.type=lx,this.auth=Fe(e)}async verify(e="verify",n=!1){async function i(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,o)=>{i1(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)o(new Error("recaptcha Enterprise site key undefined"));else{const c=new n1(u);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,a(c.siteKey)}}).catch(u=>{o(u)})})}function r(s,a,o){const u=window.grecaptcha;SI(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(c=>{a(c)}).catch(()=>{a(Cu)})}):o(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new rx().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{i(this.auth).then(o=>{if(!n&&SI(window.grecaptcha))r(o,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=ZM();u.length!==0&&(u+=o),lv(u).then(()=>{r(o,s,a)}).catch(c=>{a(c)})}}).catch(o=>{a(o)})})}}async function jl(t,e,n,i=!1,r=!1){const s=new p1(t);let a;if(r)a=Cu;else try{a=await s.verify(n)}catch{a=await s.verify(n,!0)}const o={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in o){const u=o.phoneEnrollmentInfo.phoneNumber,c=o.phoneEnrollmentInfo.recaptchaToken;Object.assign(o,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in o){const u=o.phoneSignInInfo.recaptchaToken;Object.assign(o,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return o}return i?Object.assign(o,{captchaResp:a}):Object.assign(o,{captchaResponse:a}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Ur(t,e,n,i,r){var s,a;if(r==="EMAIL_PASSWORD_PROVIDER")if((s=t._getRecaptchaConfig())!=null&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await jl(t,e,n,n==="getOobCode");return i(t,o)}else return i(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await jl(t,e,n,n==="getOobCode");return i(t,u)}else return Promise.reject(o)});else if(r==="PHONE_PROVIDER")if((a=t._getRecaptchaConfig())!=null&&a.isProviderEnabled("PHONE_PROVIDER")){const o=await jl(t,e,n);return i(t,o).catch(async u=>{var c;if(((c=t._getRecaptchaConfig())==null?void 0:c.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(u.code==="auth/missing-recaptcha-token"||u.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const h=await jl(t,e,n,!1,!0);return i(t,h)}return Promise.reject(u)})}else{const o=await jl(t,e,n,!1,!0);return i(t,o)}else return Promise.reject(r+" provider is not supported.")}async function ux(t){const e=Fe(t),n=await i1(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),i=new n1(n);e.tenantId==null?e._agentRecaptchaConfig=i:e._tenantRecaptchaConfigs[e.tenantId]=i,i.isAnyProviderEnabled()&&new p1(e).verify()}function cx(t,e){const n=(e==null?void 0:e.persistence)||[],i=(Array.isArray(n)?n:[n]).map(dn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function hx(t,e,n){const i=Fe(t);B(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const r=!!(n!=null&&n.disableWarnings),s=g1(e),{host:a,port:o}=fx(e),u=o===null?"":`:${o}`,c={url:`${s}//${a}${u}/`},h=Object.freeze({host:a,port:o,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!i._canInitEmulator){B(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),B(Kr(c,i.config.emulator)&&Kr(h,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=c,i.emulatorConfig=h,i.settings.appVerificationDisabledForTesting=!0,ss(a)?($y(`${s}//${a}${u}`),Wy("Auth",!0)):r||dx()}function g1(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function fx(t){const e=g1(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const s=r[1];return{host:s,port:PI(i.substr(s.length+1))}}else{const[s,a]=i.split(":");return{host:s,port:PI(a)}}}function PI(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function dx(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return si("not implemented")}_getIdTokenResponse(e){return si("not implemented")}_linkToIdToken(e,n){return si("not implemented")}_getReauthenticationResolver(e){return si("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _1(t,e){return $e(t,"POST","/v1/accounts:resetPassword",Ye(t,e))}async function mx(t,e){return $e(t,"POST","/v1/accounts:update",e)}async function px(t,e){return $e(t,"POST","/v1/accounts:signUp",e)}async function gx(t,e){return $e(t,"POST","/v1/accounts:update",Ye(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _x(t,e){return Qi(t,"POST","/v1/accounts:signInWithPassword",Ye(t,e))}async function Yd(t,e){return $e(t,"POST","/v1/accounts:sendOobCode",Ye(t,e))}async function yx(t,e){return Yd(t,e)}async function vx(t,e){return Yd(t,e)}async function Tx(t,e){return Yd(t,e)}async function Ex(t,e){return Yd(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wx(t,e){return Qi(t,"POST","/v1/accounts:signInWithEmailLink",Ye(t,e))}async function Ix(t,e){return Qi(t,"POST","/v1/accounts:signInWithEmailLink",Ye(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc extends ll{constructor(e,n,i,r=null){super("password",i),this._email=e,this._password=n,this._tenantId=r}static _fromEmailAndPassword(e,n){return new oc(e,n,"password")}static _fromEmailAndCode(e,n,i=null){return new oc(e,n,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ur(e,n,"signInWithPassword",_x,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return wx(e,{email:this._email,oobCode:this._password});default:Ct(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const i={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ur(e,i,"signUpPassword",px,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Ix(e,{idToken:n,email:this._email,oobCode:this._password});default:Ct(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vi(t,e){return Qi(t,"POST","/v1/accounts:signInWithIdp",Ye(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ax="http://localhost";class di extends ll{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new di(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ct("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r,...s}=n;if(!i||!r)return null;const a=new di(i,r);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const n=this.buildRequest();return Vi(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Vi(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Vi(e,n)}buildRequest(){const e={requestUri:Ax,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=al(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OI(t,e){return $e(t,"POST","/v1/accounts:sendVerificationCode",Ye(t,e))}async function bx(t,e){return Qi(t,"POST","/v1/accounts:signInWithPhoneNumber",Ye(t,e))}async function Sx(t,e){const n=await Qi(t,"POST","/v1/accounts:signInWithPhoneNumber",Ye(t,e));if(n.temporaryProof)throw su(t,"account-exists-with-different-credential",n);return n}const Rx={USER_NOT_FOUND:"user-not-found"};async function Cx(t,e){const n={...e,operation:"REAUTH"};return Qi(t,"POST","/v1/accounts:signInWithPhoneNumber",Ye(t,n),Rx)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js extends ll{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new js({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new js({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return bx(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return Sx(e,{idToken:n,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Cx(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:i,verificationCode:r}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:i,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:i,phoneNumber:r,temporaryProof:s}=e;return!i&&!n&&!r&&!s?null:new js({verificationId:n,verificationCode:i,phoneNumber:r,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dx(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Nx(t){const e=io(ru(t)).link,n=e?io(ru(e)).deep_link_id:null,i=io(ru(t)).deep_link_id;return(i?io(ru(i)).link:null)||i||n||e||t}class $d{constructor(e){const n=io(ru(e)),i=n.apiKey??null,r=n.oobCode??null,s=Dx(n.mode??null);B(i&&r&&s,"argument-error"),this.apiKey=i,this.operation=s,this.code=r,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=Nx(e);try{return new $d(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(){this.providerId=as.PROVIDER_ID}static credential(e,n){return oc._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const i=$d.parseLink(n);return B(i,"argument-error"),oc._fromEmailAndCode(e,i.code,i.tenantId)}}as.PROVIDER_ID="password";as.EMAIL_PASSWORD_SIGN_IN_METHOD="password";as.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul extends Yi{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class mo extends ul{static credentialFromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;return B("providerId"in n&&"signInMethod"in n,"argument-error"),di._fromParams(n)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return B(e.idToken||e.accessToken,"argument-error"),di._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return mo.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return mo.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i,oauthTokenSecret:r,pendingToken:s,nonce:a,providerId:o}=e;if(!i&&!r&&!n&&!s||!o)return null;try{return new mo(o)._credential({idToken:n,accessToken:i,nonce:a,pendingToken:s})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn extends ul{constructor(){super("facebook.com")}static credential(e){return di._fromParams({providerId:Jn.PROVIDER_ID,signInMethod:Jn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Jn.credentialFromTaggedObject(e)}static credentialFromError(e){return Jn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Jn.credential(e.oauthAccessToken)}catch{return null}}}Jn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Jn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn extends ul{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return di._fromParams({providerId:Zn.PROVIDER_ID,signInMethod:Zn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Zn.credentialFromTaggedObject(e)}static credentialFromError(e){return Zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return Zn.credential(n,i)}catch{return null}}}Zn.GOOGLE_SIGN_IN_METHOD="google.com";Zn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei extends ul{constructor(){super("github.com")}static credential(e){return di._fromParams({providerId:ei.PROVIDER_ID,signInMethod:ei.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ei.credentialFromTaggedObject(e)}static credentialFromError(e){return ei.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ei.credential(e.oauthAccessToken)}catch{return null}}}ei.GITHUB_SIGN_IN_METHOD="github.com";ei.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Px="http://localhost";class Oo extends ll{constructor(e,n){super(e,e),this.pendingToken=n}_getIdTokenResponse(e){const n=this.buildRequest();return Vi(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Vi(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Vi(e,n)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r,pendingToken:s}=n;return!i||!r||!s||i!==r?null:new Oo(i,s)}static _create(e,n){return new Oo(e,n)}buildRequest(){return{requestUri:Px,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ox="saml.";class td extends Yi{constructor(e){B(e.startsWith(Ox),"argument-error"),super(e)}static credentialFromResult(e){return td.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return td.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const n=Oo.fromJSON(e);return B(n,"argument-error"),n}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:n,providerId:i}=e;if(!n||!i)return null;try{return Oo._create(i,n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti extends ul{constructor(){super("twitter.com")}static credential(e,n){return di._fromParams({providerId:ti.PROVIDER_ID,signInMethod:ti.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ti.credentialFromTaggedObject(e)}static credentialFromError(e){return ti.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return ti.credential(n,i)}catch{return null}}}ti.TWITTER_SIGN_IN_METHOD="twitter.com";ti.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function y1(t,e){return Qi(t,"POST","/v1/accounts:signUp",Ye(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,r=!1){const s=await qn._fromIdTokenResponse(e,i,r),a=VI(i);return new Ln({user:s,providerId:a,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const r=VI(i);return new Ln({user:e,providerId:r,_tokenResponse:i,operationType:n})}}function VI(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vx(t){var r;if(Oe(t.app))return Promise.reject(vt(t));const e=Fe(t);if(await e._initializationPromise,(r=e.currentUser)!=null&&r.isAnonymous)return new Ln({user:e.currentUser,providerId:null,operationType:"signIn"});const n=await y1(e,{returnSecureToken:!0}),i=await Ln._fromIdTokenResponse(e,"signIn",n,!0);return await e._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd extends Mt{constructor(e,n,i,r){super(n.code,n.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,nd.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,r){return new nd(e,n,i,r)}}function v1(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?nd._fromErrorAndOperation(t,s,e,i):s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T1(t){return new Set(t.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kx(t,e){const n=$(t);await Wd(!0,n,e);const{providerUserInfo:i}=await MM(n.auth,{idToken:await n.getIdToken(),deleteProvider:[e]}),r=T1(i||[]);return n.providerData=n.providerData.filter(s=>r.has(s.providerId)),r.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function uv(t,e,n=!1){const i=await qi(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ln._forOperation(t,"link",i)}async function Wd(t,e,n){await ac(e);const i=T1(e.providerData),r=t===!1?"provider-already-linked":"no-such-provider";B(i.has(n)===t,e.auth,r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function E1(t,e,n=!1){const{auth:i}=t;if(Oe(i.app))return Promise.reject(vt(i));const r="reauthenticate";try{const s=await qi(t,v1(i,r,e,t),n);B(s.idToken,i,"internal-error");const a=Qd(s.idToken);B(a,i,"internal-error");const{sub:o}=a;return B(t.uid===o,i,"user-mismatch"),Ln._forOperation(t,r,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Ct(i,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function w1(t,e,n=!1){if(Oe(t.app))return Promise.reject(vt(t));const i="signIn",r=await v1(t,i,e),s=await Ln._fromIdTokenResponse(t,i,r);return n||await t._updateCurrentUser(s.user),s}async function Xd(t,e){return w1(Fe(t),e)}async function I1(t,e){const n=$(t);return await Wd(!1,n,e.providerId),uv(n,e)}async function A1(t,e){return E1($(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mx(t,e){return Qi(t,"POST","/v1/accounts:signInWithCustomToken",Ye(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xx(t,e){if(Oe(t.app))return Promise.reject(vt(t));const n=Fe(t),i=await Mx(n,{token:e,returnSecureToken:!0}),r=await Ln._fromIdTokenResponse(n,"signIn",i);return await n._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e,n){this.factorId=e,this.uid=n.mfaEnrollmentId,this.enrollmentTime=new Date(n.enrolledAt).toUTCString(),this.displayName=n.displayName}static _fromServerResponse(e,n){return"phoneInfo"in n?cv._fromServerResponse(e,n):"totpInfo"in n?hv._fromServerResponse(e,n):Ct(e,"internal-error")}}class cv extends qc{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,n){return new cv(n)}}class hv extends qc{constructor(e){super("totp",e)}static _fromServerResponse(e,n){return new hv(n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jd(t,e,n){var i;B(((i=n.url)==null?void 0:i.length)>0,t,"invalid-continue-uri"),B(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),B(typeof n.linkDomain>"u"||n.linkDomain.length>0,t,"invalid-hosting-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.linkDomain=n.linkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(B(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(B(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fv(t){const e=Fe(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Lx(t,e,n){const i=Fe(t),r={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};n&&Jd(i,r,n),await Ur(i,r,"getOobCode",vx,"EMAIL_PASSWORD_PROVIDER")}async function Ux(t,e,n){await _1($(t),{oobCode:e,newPassword:n}).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&fv(t),i})}async function zx(t,e){await gx($(t),{oobCode:e})}async function b1(t,e){const n=$(t),i=await _1(n,{oobCode:e}),r=i.requestType;switch(B(r,n,"internal-error"),r){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":B(i.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":B(i.mfaInfo,n,"internal-error");default:B(i.email,n,"internal-error")}let s=null;return i.mfaInfo&&(s=qc._fromServerResponse(Fe(n),i.mfaInfo)),{data:{email:(i.requestType==="VERIFY_AND_CHANGE_EMAIL"?i.newEmail:i.email)||null,previousEmail:(i.requestType==="VERIFY_AND_CHANGE_EMAIL"?i.email:i.newEmail)||null,multiFactorInfo:s},operation:r}}async function Bx(t,e){const{data:n}=await b1($(t),e);return n.email}async function Fx(t,e,n){if(Oe(t.app))return Promise.reject(vt(t));const i=Fe(t),a=await Ur(i,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",y1,"EMAIL_PASSWORD_PROVIDER").catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&fv(t),u}),o=await Ln._fromIdTokenResponse(i,"signIn",a);return await i._updateCurrentUser(o.user),o}function qx(t,e,n){return Oe(t.app)?Promise.reject(vt(t)):Xd($(t),as.credential(e,n)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&fv(t),i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hx(t,e,n){const i=Fe(t),r={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(a,o){B(o.handleCodeInApp,i,"argument-error"),o&&Jd(i,a,o)}s(r,n),await Ur(i,r,"getOobCode",Tx,"EMAIL_PASSWORD_PROVIDER")}function jx(t,e){const n=$d.parseLink(e);return(n==null?void 0:n.operation)==="EMAIL_SIGNIN"}async function Gx(t,e,n){if(Oe(t.app))return Promise.reject(vt(t));const i=$(t),r=as.credentialWithLink(e,n||sc());return B(r._tenantId===(i.tenantId||null),i,"tenant-id-mismatch"),Xd(i,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kx(t,e){return $e(t,"POST","/v1/accounts:createAuthUri",Ye(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qx(t,e){const n=av()?sc():"http://localhost",i={identifier:e,continueUri:n},{signinMethods:r}=await Kx($(t),i);return r||[]}async function Yx(t,e){const n=$(t),r={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&Jd(n.auth,r,e);const{email:s}=await yx(n.auth,r);s!==t.email&&await t.reload()}async function $x(t,e,n){const i=$(t),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await t.getIdToken(),newEmail:e};n&&Jd(i.auth,s,n);const{email:a}=await Ex(i.auth,s);a!==t.email&&await t.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wx(t,e){return $e(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xx(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const i=$(t),s={idToken:await i.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},a=await qi(i,Wx(i.auth,s));i.displayName=a.displayName||null,i.photoURL=a.photoUrl||null;const o=i.providerData.find(({providerId:u})=>u==="password");o&&(o.displayName=i.displayName,o.photoURL=i.photoURL),await i._updateTokensIfNecessary(a)}function Jx(t,e){const n=$(t);return Oe(n.auth.app)?Promise.reject(vt(n.auth)):S1(n,e,null)}function Zx(t,e){return S1($(t),null,e)}async function S1(t,e,n){const{auth:i}=t,s={idToken:await t.getIdToken(),returnSecureToken:!0};e&&(s.email=e),n&&(s.password=n);const a=await qi(t,mx(i,s));await t._updateTokensIfNecessary(a,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eL(t){var r,s;if(!t)return null;const{providerId:e}=t,n=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},i=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&(t!=null&&t.idToken)){const a=(s=(r=Qd(t.idToken))==null?void 0:r.firebase)==null?void 0:s.sign_in_provider;if(a){const o=a!=="anonymous"&&a!=="custom"?a:null;return new po(i,o)}}if(!e)return null;switch(e){case"facebook.com":return new tL(i,n);case"github.com":return new nL(i,n);case"google.com":return new iL(i,n);case"twitter.com":return new rL(i,n,t.screenName||null);case"custom":case"anonymous":return new po(i,null);default:return new po(i,e,n)}}class po{constructor(e,n,i={}){this.isNewUser=e,this.providerId=n,this.profile=i}}class R1 extends po{constructor(e,n,i,r){super(e,n,i),this.username=r}}class tL extends po{constructor(e,n){super(e,"facebook.com",n)}}class nL extends R1{constructor(e,n){super(e,"github.com",n,typeof(n==null?void 0:n.login)=="string"?n==null?void 0:n.login:null)}}class iL extends po{constructor(e,n){super(e,"google.com",n)}}class rL extends R1{constructor(e,n,i){super(e,"twitter.com",n,i)}}function sL(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:eL(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e,n,i){this.type=e,this.credential=n,this.user=i}static _fromIdtoken(e,n){return new ks("enroll",e,n)}static _fromMfaPendingCredential(e){return new ks("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var n,i;if(e!=null&&e.multiFactorSession){if((n=e.multiFactorSession)!=null&&n.pendingCredential)return ks._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if((i=e.multiFactorSession)!=null&&i.idToken)return ks._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(e,n,i){this.session=e,this.hints=n,this.signInResolver=i}static _fromError(e,n){const i=Fe(e),r=n.customData._serverResponse,s=(r.mfaInfo||[]).map(o=>qc._fromServerResponse(i,o));B(r.mfaPendingCredential,i,"internal-error");const a=ks._fromMfaPendingCredential(r.mfaPendingCredential);return new dv(a,s,async o=>{const u=await o._process(i,a);delete r.mfaInfo,delete r.mfaPendingCredential;const c={...r,idToken:u.idToken,refreshToken:u.refreshToken};switch(n.operationType){case"signIn":const h=await Ln._fromIdTokenResponse(i,n.operationType,c);return await i._updateCurrentUser(h.user),h;case"reauthenticate":return B(n.user,i,"internal-error"),Ln._forOperation(n.user,n.operationType,c);default:Ct(i,"internal-error")}})}async resolveSignIn(e){const n=e;return this.signInResolver(n)}}function aL(t,e){var r;const n=$(t),i=e;return B(e.customData.operationType,n,"argument-error"),B((r=i.customData._serverResponse)==null?void 0:r.mfaPendingCredential,n,"argument-error"),dv._fromError(n,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kI(t,e){return $e(t,"POST","/v2/accounts/mfaEnrollment:start",Ye(t,e))}function oL(t,e){return $e(t,"POST","/v2/accounts/mfaEnrollment:finalize",Ye(t,e))}function lL(t,e){return $e(t,"POST","/v2/accounts/mfaEnrollment:withdraw",Ye(t,e))}class mv{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(n=>{n.mfaInfo&&(this.enrolledFactors=n.mfaInfo.map(i=>qc._fromServerResponse(e.auth,i)))})}static _fromUser(e){return new mv(e)}async getSession(){return ks._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,n){const i=e,r=await this.getSession(),s=await qi(this.user,i._process(this.user.auth,r,n));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const n=typeof e=="string"?e:e.uid,i=await this.user.getIdToken();try{const r=await qi(this.user,lL(this.user.auth,{idToken:i,mfaEnrollmentId:n}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==n),await this.user._updateTokensIfNecessary(r),await this.user.reload()}catch(r){throw r}}}const Hp=new WeakMap;function uL(t){const e=$(t);return Hp.has(e)||Hp.set(e,mv._fromUser(e)),Hp.get(e)}const id="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C1{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(id,"1"),this.storage.removeItem(id),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cL=1e3,hL=10;class D1 extends C1{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=f1(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),r=this.localCache[n];i!==r&&e(n,r,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((a,o,u)=>{this.notifyListeners(a,u)});return}const i=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(i);!n&&this.localCache[i]===a||this.notifyListeners(i,a)},s=this.storage.getItem(i);GM()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,hL):r()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},cL)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}D1.type="LOCAL";const pv=D1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N1 extends C1{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}N1.type="SESSION";const Js=N1;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fL(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const i=new Zd(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:r,data:s}=n.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:r});const o=Array.from(a).map(async c=>c(n.origin,s)),u=await fL(o);n.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Zd.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hc(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dL{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,a;return new Promise((o,u)=>{const c=Hc("",20);r.port1.start();const h=setTimeout(()=>{u(new Error("unsupported_event"))},i);a={messageChannel:r,onMessage(d){const m=d;if(m.data.eventId===c)switch(m.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),o(m.data.response);break;default:clearTimeout(h),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(){return window}function mL(t){nt().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gv(){return typeof nt().WorkerGlobalScope<"u"&&typeof nt().importScripts=="function"}async function pL(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function gL(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function _L(){return gv()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P1="firebaseLocalStorageDb",yL=1,rd="firebaseLocalStorage",O1="fbase_key";class jc{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function em(t,e){return t.transaction([rd],e?"readwrite":"readonly").objectStore(rd)}function vL(){const t=indexedDB.deleteDatabase(P1);return new jc(t).toPromise()}function a_(){const t=indexedDB.open(P1,yL);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(rd,{keyPath:O1})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(rd)?e(i):(i.close(),await vL(),e(await a_()))})})}async function MI(t,e,n){const i=em(t,!0).put({[O1]:e,value:n});return new jc(i).toPromise()}async function TL(t,e){const n=em(t,!1).get(e),i=await new jc(n).toPromise();return i===void 0?null:i.value}function xI(t,e){const n=em(t,!0).delete(e);return new jc(n).toPromise()}const EL=800,wL=3;class V1{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await a_(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>wL)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return gv()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Zd._getInstance(_L()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,i;if(this.activeServiceWorker=await pL(),!this.activeServiceWorker)return;this.sender=new dL(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(i=e[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||gL()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await a_();return await MI(e,id,"1"),await xI(e,id),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>MI(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>TL(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>xI(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const s=em(r,!1).getAll();return new jc(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:r,value:s}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),EL)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}V1.type="LOCAL";const lc=V1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LI(t,e){return $e(t,"POST","/v2/accounts/mfaSignIn:start",Ye(t,e))}function IL(t,e){return $e(t,"POST","/v2/accounts/mfaSignIn:finalize",Ye(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jp=m1("rcb"),AL=new Uc(3e4,6e4);class bL{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!((e=nt().grecaptcha)!=null&&e.render)}load(e,n=""){return B(SL(n),e,"argument-error"),this.shouldResolveImmediately(n)&&bI(nt().grecaptcha)?Promise.resolve(nt().grecaptcha):new Promise((i,r)=>{const s=nt().setTimeout(()=>{r(ct(e,"network-request-failed"))},AL.get());nt()[jp]=()=>{nt().clearTimeout(s),delete nt()[jp];const o=nt().grecaptcha;if(!o||!bI(o)){r(ct(e,"internal-error"));return}const u=o.render;o.render=(c,h)=>{const d=u(c,h);return this.counter++,d},this.hostLanguage=n,i(o)};const a=`${JM()}?${al({onload:jp,render:"explicit",hl:n})}`;lv(a).catch(()=>{clearTimeout(s),r(ct(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!((n=nt().grecaptcha)!=null&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function SL(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class RL{async load(e){return new ix(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du="recaptcha",CL={theme:"light",type:"image"};let DL=class{constructor(e,n,i={...CL}){this.parameters=i,this.type=Du,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Fe(e),this.isInvisible=this.parameters.size==="invisible",B(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const r=typeof n=="string"?document.getElementById(n):n;B(r,this.auth,"argument-error"),this.container=r,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new RL:new bL,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),i=n.getResponse(e);return i||new Promise(r=>{const s=a=>{a&&(this.tokenChangeListeners.delete(s),r(a))};this.tokenChangeListeners.add(s),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){B(!this.parameters.sitekey,this.auth,"argument-error"),B(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),B(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(i=>i(n)),typeof e=="function")e(n);else if(typeof e=="string"){const i=nt()[e];typeof i=="function"&&i(n)}}}assertNotDestroyed(){B(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){B(av()&&!gv(),this.auth,"internal-error"),await NL(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await VM(this.auth);B(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return B(this.recaptcha,this.auth,"internal-error"),this.recaptcha}};function NL(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _v{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=js._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function PL(t,e,n){if(Oe(t.app))return Promise.reject(vt(t));const i=Fe(t),r=await tm(i,e,$(n));return new _v(r,s=>Xd(i,s))}async function OL(t,e,n){const i=$(t);await Wd(!1,i,"phone");const r=await tm(i.auth,e,$(n));return new _v(r,s=>I1(i,s))}async function VL(t,e,n){const i=$(t);if(Oe(i.auth.app))return Promise.reject(vt(i.auth));const r=await tm(i.auth,e,$(n));return new _v(r,s=>A1(i,s))}async function tm(t,e,n){var i;if(!t._getRecaptchaConfig())try{await ux(t)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const s=r.session;if("phoneNumber"in r){B(s.type==="enroll",t,"internal-error");const a={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Ur(t,a,"mfaSmsEnrollment",async(h,d)=>{if(d.phoneEnrollmentInfo.captchaResponse===Cu){B((n==null?void 0:n.type)===Du,h,"argument-error");const m=await Gp(h,d,n);return kI(h,m)}return kI(h,d)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneSessionInfo.sessionInfo}else{B(s.type==="signin",t,"internal-error");const a=((i=r.multiFactorHint)==null?void 0:i.uid)||r.multiFactorUid;B(a,t,"missing-multi-factor-info");const o={mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Ur(t,o,"mfaSmsSignIn",async(d,m)=>{if(m.phoneSignInInfo.captchaResponse===Cu){B((n==null?void 0:n.type)===Du,d,"argument-error");const g=await Gp(d,m,n);return LI(d,g)}return LI(d,m)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Ur(t,s,"sendVerificationCode",async(c,h)=>{if(h.captchaResponse===Cu){B((n==null?void 0:n.type)===Du,c,"argument-error");const d=await Gp(c,h,n);return OI(c,d)}return OI(c,h)},"PHONE_PROVIDER").catch(c=>Promise.reject(c))).sessionInfo}}finally{n==null||n._reset()}}async function kL(t,e){const n=$(t);if(Oe(n.auth.app))return Promise.reject(vt(n.auth));await uv(n,e)}async function Gp(t,e,n){B(n.type===Du,t,"argument-error");const i=await n.verify();B(typeof i=="string",t,"argument-error");const r={...e};if("phoneEnrollmentInfo"in r){const s=r.phoneEnrollmentInfo.phoneNumber,a=r.phoneEnrollmentInfo.captchaResponse,o=r.phoneEnrollmentInfo.clientType,u=r.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(r,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:i,captchaResponse:a,clientType:o,recaptchaVersion:u}}),r}else if("phoneSignInInfo"in r){const s=r.phoneSignInInfo.captchaResponse,a=r.phoneSignInInfo.clientType,o=r.phoneSignInInfo.recaptchaVersion;return Object.assign(r,{phoneSignInInfo:{recaptchaToken:i,captchaResponse:s,clientType:a,recaptchaVersion:o}}),r}else return Object.assign(r,{recaptchaToken:i}),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zs=class of{constructor(e){this.providerId=of.PROVIDER_ID,this.auth=Fe(e)}verifyPhoneNumber(e,n){return tm(this.auth,e,$(n))}static credential(e,n){return js._fromVerification(e,n)}static credentialFromResult(e){const n=e;return of.credentialFromTaggedObject(n)}static credentialFromError(e){return of.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:n,temporaryProof:i}=e;return n&&i?js._fromTokenResponse(n,i):null}};Zs.PROVIDER_ID="phone";Zs.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _a(t,e){return e?dn(e):(B(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv extends ll{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vi(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Vi(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Vi(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function ML(t){return w1(t.auth,new yv(t),t.bypassAuthState)}function xL(t){const{auth:e,user:n}=t;return B(n,e,"internal-error"),E1(n,new yv(t),t.bypassAuthState)}async function LL(t){const{auth:e,user:n}=t;return B(n,e,"internal-error"),uv(n,new yv(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k1{constructor(e,n,i,r,s=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:r,tenantId:s,error:a,type:o}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:n,sessionId:i,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ML;case"linkViaPopup":case"linkViaRedirect":return LL;case"reauthViaPopup":case"reauthViaRedirect":return xL;default:Ct(this.auth,"internal-error")}}resolve(e){Kn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Kn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UL=new Uc(2e3,1e4);async function zL(t,e,n){if(Oe(t.app))return Promise.reject(ct(t,"operation-not-supported-in-this-environment"));const i=Fe(t);ol(t,e,Yi);const r=_a(i,n);return new Ci(i,"signInViaPopup",e,r).executeNotNull()}async function BL(t,e,n){const i=$(t);if(Oe(i.auth.app))return Promise.reject(ct(i.auth,"operation-not-supported-in-this-environment"));ol(i.auth,e,Yi);const r=_a(i.auth,n);return new Ci(i.auth,"reauthViaPopup",e,r,i).executeNotNull()}async function FL(t,e,n){const i=$(t);ol(i.auth,e,Yi);const r=_a(i.auth,n);return new Ci(i.auth,"linkViaPopup",e,r,i).executeNotNull()}class Ci extends k1{constructor(e,n,i,r,s){super(e,n,r,s),this.provider=i,this.authWindow=null,this.pollId=null,Ci.currentPopupAction&&Ci.currentPopupAction.cancel(),Ci.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return B(e,this.auth,"internal-error"),e}async onExecution(){Kn(this.filter.length===1,"Popup operations only handle one event");const e=Hc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ct(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ct(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ci.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,i;if((i=(n=this.authWindow)==null?void 0:n.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ct(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,UL.get())};e()}}Ci.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qL="pendingRedirect",Nu=new Map;class HL extends k1{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=Nu.get(this.auth._key());if(!e){try{const i=await jL(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}Nu.set(this.auth._key(),e)}return this.bypassAuthState||Nu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function jL(t,e){const n=x1(e),i=M1(t);if(!await i._isAvailable())return!1;const r=await i._get(n)==="true";return await i._remove(n),r}async function vv(t,e){return M1(t)._set(x1(e),"true")}function GL(){Nu.clear()}function Tv(t,e){Nu.set(t._key(),e)}function M1(t){return dn(t._redirectPersistence)}function x1(t){return Hs(qL,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KL(t,e,n){return QL(t,e,n)}async function QL(t,e,n){if(Oe(t.app))return Promise.reject(vt(t));const i=Fe(t);ol(t,e,Yi),await i._initializationPromise;const r=_a(i,n);return await vv(r,i),r._openRedirect(i,e,"signInViaRedirect")}function YL(t,e,n){return $L(t,e,n)}async function $L(t,e,n){const i=$(t);if(ol(i.auth,e,Yi),Oe(i.auth.app))return Promise.reject(vt(i.auth));await i.auth._initializationPromise;const r=_a(i.auth,n);await vv(r,i.auth);const s=await L1(i);return r._openRedirect(i.auth,e,"reauthViaRedirect",s)}function WL(t,e,n){return XL(t,e,n)}async function XL(t,e,n){const i=$(t);ol(i.auth,e,Yi),await i.auth._initializationPromise;const r=_a(i.auth,n);await Wd(!1,i,e.providerId),await vv(r,i.auth);const s=await L1(i);return r._openRedirect(i.auth,e,"linkViaRedirect",s)}async function JL(t,e){return await Fe(t)._initializationPromise,nm(t,e,!1)}async function nm(t,e,n=!1){if(Oe(t.app))return Promise.reject(vt(t));const i=Fe(t),r=_a(i,e),a=await new HL(i,r,n).execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}async function L1(t){const e=Hc(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZL=10*60*1e3;class U1{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!eU(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var i;if(e.error&&!z1(e)){const r=((i=e.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";n.onError(ct(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ZL&&this.cachedEventUids.clear(),this.cachedEventUids.has(UI(e))}saveEventToCache(e){this.cachedEventUids.add(UI(e)),this.lastProcessedEventTime=Date.now()}}function UI(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function z1({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function eU(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return z1(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function B1(t,e={}){return $e(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tU=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,nU=/^https?/;async function iU(t){if(t.config.emulator)return;const{authorizedDomains:e}=await B1(t);for(const n of e)try{if(rU(n))return}catch{}Ct(t,"unauthorized-domain")}function rU(t){const e=sc(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const a=new URL(t);return a.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&a.hostname===i}if(!nU.test(n))return!1;if(tU.test(t))return i===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sU=new Uc(3e4,6e4);function zI(){const t=nt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function aU(t){return new Promise((e,n)=>{var r,s,a;function i(){zI(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{zI(),n(ct(t,"network-request-failed"))},timeout:sU.get()})}if((s=(r=nt().gapi)==null?void 0:r.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((a=nt().gapi)!=null&&a.load)i();else{const o=m1("iframefcb");return nt()[o]=()=>{gapi.load?i():n(ct(t,"network-request-failed"))},lv(`${ex()}?onload=${o}`).catch(u=>n(u))}}).catch(e=>{throw lf=null,e})}let lf=null;function oU(t){return lf=lf||aU(t),lf}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lU=new Uc(5e3,15e3),uU="__/auth/iframe",cU="emulator/auth/iframe",hU={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},fU=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function dU(t){const e=t.config;B(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ov(e,cU):`https://${t.config.authDomain}/${uU}`,i={apiKey:e.apiKey,appName:t.name,v:Ki},r=fU.get(t.config.apiHost);r&&(i.eid=r);const s=t._getFrameworks();return s.length&&(i.fw=s.join(",")),`${n}?${al(i).slice(1)}`}async function mU(t){const e=await oU(t),n=nt().gapi;return B(n,t,"internal-error"),e.open({where:document.body,url:dU(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:hU,dontclear:!0},i=>new Promise(async(r,s)=>{await i.restyle({setHideOnLeave:!1});const a=ct(t,"network-request-failed"),o=nt().setTimeout(()=>{s(a)},lU.get());function u(){nt().clearTimeout(o),r(i)}i.ping(u).then(u,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pU={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},gU=500,_U=600,yU="_blank",vU="http://localhost";class BI{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function TU(t,e,n,i=gU,r=_U){const s=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let o="";const u={...pU,width:i.toString(),height:r.toString(),top:s,left:a},c=Be().toLowerCase();n&&(o=l1(c)?yU:n),a1(c)&&(e=e||vU,u.scrollbars="yes");const h=Object.entries(u).reduce((m,[g,R])=>`${m}${g}=${R},`,"");if(jM(c)&&o!=="_self")return EU(e||"",o),new BI(null);const d=window.open(e||"",o,h);B(d,t,"popup-blocked");try{d.focus()}catch{}return new BI(d)}function EU(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wU="__/auth/handler",IU="emulator/auth/handler",AU=encodeURIComponent("fac");async function o_(t,e,n,i,r,s){B(t.config.authDomain,t,"auth-domain-config-required"),B(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:Ki,eventId:r};if(e instanceof Yi){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",J2(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries(s||{}))a[h]=d}if(e instanceof ul){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(a.scopes=h.join(","))}t.tenantId&&(a.tid=t.tenantId);const o=a;for(const h of Object.keys(o))o[h]===void 0&&delete o[h];const u=await t._getAppCheckToken(),c=u?`#${AU}=${encodeURIComponent(u)}`:"";return`${bU(t)}?${al(o).slice(1)}${c}`}function bU({config:t}){return t.emulator?ov(t,IU):`https://${t.authDomain}/${wU}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp="webStorageSupport";class SU{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Js,this._completeRedirectFn=nm,this._overrideRedirectResult=Tv}async _openPopup(e,n,i,r){var a;Kn((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const s=await o_(e,n,i,sc(),r);return TU(e,s,Hc())}async _openRedirect(e,n,i,r){await this._originValidation(e);const s=await o_(e,n,i,sc(),r);return mL(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:s}=this.eventManagers[n];return r?Promise.resolve(r):(Kn(s,"If manager is not set, promise should be"),s)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await mU(e),i=new U1(e);return n.register("authEvent",r=>(B(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Kp,{type:Kp},r=>{var a;const s=(a=r==null?void 0:r[0])==null?void 0:a[Kp];s!==void 0&&n(!!s),Ct(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=iU(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return f1()||o1()||Bc()}}const RU=SU;class CU{constructor(e){this.factorId=e}_process(e,n,i){switch(n.type){case"enroll":return this._finalizeEnroll(e,n.credential,i);case"signin":return this._finalizeSignIn(e,n.credential);default:return si("unexpected MultiFactorSessionType")}}}class Ev extends CU{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Ev(e)}_finalizeEnroll(e,n,i){return oL(e,{idToken:n,displayName:i,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,n){return IL(e,{mfaPendingCredential:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class F1{constructor(){}static assertion(e){return Ev._fromCredential(e)}}F1.FACTOR_ID="phone";var FI="@firebase/auth",qI="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DU{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NU(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function PU(t){Fi(new Gn("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=i.options;B(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const u={apiKey:a,authDomain:o,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:d1(t)},c=new WM(i,r,s,u);return cx(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),Fi(new Gn("auth-internal",e=>{const n=Fe(e.getProvider("auth").getImmediate());return(i=>new DU(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Tn(FI,qI,NU(t)),Tn(FI,qI,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OU=5*60;F2("authIdTokenMaxAge");function VU(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}XM({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=r=>{const s=ct("internal-error");s.customData=r,n(s)},i.type="text/javascript",i.charset="UTF-8",VU().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});PU("Browser");/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(){return window}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kU=2e3;async function MU(t,e,n){const{BuildInfo:i}=ea();Kn(e.sessionId,"AuthEvent did not contain a session ID");const r=await BU(e.sessionId),s={};return Bc()?s.ibi=i.packageName:zc()?s.apn=i.packageName:Ct(t,"operation-not-supported-in-this-environment"),i.displayName&&(s.appDisplayName=i.displayName),s.sessionId=r,o_(t,n,e.type,void 0,e.eventId??void 0,s)}async function xU(t){const{BuildInfo:e}=ea(),n={};Bc()?n.iosBundleId=e.packageName:zc()?n.androidPackageName=e.packageName:Ct(t,"operation-not-supported-in-this-environment"),await B1(t,n)}function LU(t){const{cordova:e}=ea();return new Promise(n=>{e.plugins.browsertab.isAvailable(i=>{let r=null;i?e.plugins.browsertab.openUrl(t):r=e.InAppBrowser.open(t,HM()?"_blank":"_system","location=yes"),n(r)})})}async function UU(t,e,n){const{cordova:i}=ea();let r=()=>{};try{await new Promise((s,a)=>{let o=null;function u(){var m;s();const d=(m=i.plugins.browsertab)==null?void 0:m.close;typeof d=="function"&&d(),typeof(n==null?void 0:n.close)=="function"&&n.close()}function c(){o||(o=window.setTimeout(()=>{a(ct(t,"redirect-cancelled-by-user"))},kU))}function h(){(document==null?void 0:document.visibilityState)==="visible"&&c()}e.addPassiveListener(u),document.addEventListener("resume",c,!1),zc()&&document.addEventListener("visibilitychange",h,!1),r=()=>{e.removePassiveListener(u),document.removeEventListener("resume",c,!1),document.removeEventListener("visibilitychange",h,!1),o&&window.clearTimeout(o)}})}finally{r()}}function zU(t){var n,i,r,s,a,o,u,c,h,d;const e=ea();B(typeof((n=e==null?void 0:e.universalLinks)==null?void 0:n.subscribe)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),B(typeof((i=e==null?void 0:e.BuildInfo)==null?void 0:i.packageName)<"u",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),B(typeof((a=(s=(r=e==null?void 0:e.cordova)==null?void 0:r.plugins)==null?void 0:s.browsertab)==null?void 0:a.openUrl)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),B(typeof((c=(u=(o=e==null?void 0:e.cordova)==null?void 0:o.plugins)==null?void 0:u.browsertab)==null?void 0:c.isAvailable)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),B(typeof((d=(h=e==null?void 0:e.cordova)==null?void 0:h.InAppBrowser)==null?void 0:d.open)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function BU(t){const e=FU(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map(r=>r.toString(16).padStart(2,"0")).join("")}function FU(t){if(Kn(/[0-9a-zA-Z]+/.test(t),"Can only convert alpha-numeric strings"),typeof TextEncoder<"u")return new TextEncoder().encode(t);const e=new ArrayBuffer(t.length),n=new Uint8Array(e);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qU=20;class HU extends U1{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInitialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInitialized(),this.passiveListeners.forEach(n=>n(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function jU(t,e,n=null){return{type:e,eventId:n,urlResponse:null,sessionId:QU(),postBody:null,tenantId:t.tenantId,error:ct(t,"no-auth-event")}}function GU(t,e){return l_()._set(u_(t),e)}async function HI(t){const e=await l_()._get(u_(t));return e&&await l_()._remove(u_(t)),e}function KU(t,e){var i,r;const n=$U(e);if(n.includes("/__/auth/callback")){const s=uf(n),a=s.firebaseError?YU(decodeURIComponent(s.firebaseError)):null,o=(r=(i=a==null?void 0:a.code)==null?void 0:i.split("auth/"))==null?void 0:r[1],u=o?ct(o):null;return u?{type:t.type,eventId:t.eventId,tenantId:t.tenantId,error:u,urlResponse:null,sessionId:null,postBody:null}:{type:t.type,eventId:t.eventId,tenantId:t.tenantId,sessionId:t.sessionId,urlResponse:n,postBody:null}}return null}function QU(){const t=[],e="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<qU;n++){const i=Math.floor(Math.random()*e.length);t.push(e.charAt(i))}return t.join("")}function l_(){return dn(pv)}function u_(t){return Hs("authEvent",t.config.apiKey,t.name)}function YU(t){try{return JSON.parse(t)}catch{return null}}function $U(t){const e=uf(t),n=e.link?decodeURIComponent(e.link):void 0,i=uf(n).link,r=e.deep_link_id?decodeURIComponent(e.deep_link_id):void 0;return uf(r).link||r||i||n||t}function uf(t){if(!(t!=null&&t.includes("?")))return{};const[e,...n]=t.split("?");return io(n.join("?"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WU=500;class XU{constructor(){this._redirectPersistence=Js,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=nm,this._overrideRedirectResult=Tv}async _initialize(e){const n=e._key();let i=this.eventManagers.get(n);return i||(i=new HU(e),this.eventManagers.set(n,i),this.attachCallbackListeners(e,i)),i}_openPopup(e){Ct(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,n,i,r){zU(e);const s=await this._initialize(e);await s.initialized(),s.resetRedirect(),GL(),await this._originValidation(e);const a=jU(e,i,r);await GU(e,a);const o=await MU(e,a,n),u=await LU(o);return UU(e,s,u)}_isIframeWebStorageSupported(e,n){throw new Error("Method not implemented.")}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=xU(e)),this.originValidationPromises[n]}attachCallbackListeners(e,n){const{universalLinks:i,handleOpenURL:r,BuildInfo:s}=ea(),a=setTimeout(async()=>{await HI(e),n.onEvent(jI())},WU),o=async h=>{clearTimeout(a);const d=await HI(e);let m=null;d&&(h!=null&&h.url)&&(m=KU(d,h.url)),n.onEvent(m||jI())};typeof i<"u"&&typeof i.subscribe=="function"&&i.subscribe(null,o);const u=r,c=`${s.packageName.toLowerCase()}://`;ea().handleOpenURL=async h=>{if(h.toLowerCase().startsWith(c)&&o({url:h}),typeof u=="function")try{u(h)}catch(d){console.error(d)}}}}const JU=XU;function jI(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:ct("no-auth-event")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZU(t,e){Fe(t)._logFramework(e)}var e4="@firebase/auth-compat",t4="0.6.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n4=1e3;function Pu(){var t;return((t=self==null?void 0:self.location)==null?void 0:t.protocol)||null}function i4(){return Pu()==="http:"||Pu()==="https:"}function q1(t=Be()){return!!((Pu()==="file:"||Pu()==="ionic:"||Pu()==="capacitor:")&&t.toLowerCase().match(/iphone|ipad|ipod|android/))}function r4(){return Xy()||jd()}function s4(){return M0()&&(document==null?void 0:document.documentMode)===11}function a4(t=Be()){return/Edge\/\d+/.test(t)}function o4(t=Be()){return s4()||a4(t)}function H1(){try{const t=self.localStorage,e=Hc();if(t)return t.setItem(e,"1"),t.removeItem(e),o4()?nc():!0}catch{return wv()&&nc()}return!1}function wv(){return typeof global<"u"&&"WorkerGlobalScope"in global&&"importScripts"in global}function Qp(){return(i4()||k0()||q1())&&!r4()&&H1()&&!wv()}function j1(){return q1()&&typeof document<"u"}async function l4(){return j1()?new Promise(t=>{const e=setTimeout(()=>{t(!1)},n4);document.addEventListener("deviceready",()=>{clearTimeout(e),t(!0)})}):!1}function u4(){return typeof window<"u"?window:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn={LOCAL:"local",NONE:"none",SESSION:"session"},Gl=B,G1="persistence";function c4(t,e){if(Gl(Object.values(cn).includes(e),t,"invalid-persistence-type"),Xy()){Gl(e!==cn.SESSION,t,"unsupported-persistence-type");return}if(jd()){Gl(e===cn.NONE,t,"unsupported-persistence-type");return}if(wv()){Gl(e===cn.NONE||e===cn.LOCAL&&nc(),t,"unsupported-persistence-type");return}Gl(e===cn.NONE||H1(),t,"unsupported-persistence-type")}async function c_(t){await t._initializationPromise;const e=K1(),n=Hs(G1,t.config.apiKey,t.name);e&&e.setItem(n,t._getPersistenceType())}function h4(t,e){const n=K1();if(!n)return[];const i=Hs(G1,t,e);switch(n.getItem(i)){case cn.NONE:return[Po];case cn.LOCAL:return[lc,Js];case cn.SESSION:return[Js];default:return[]}}function K1(){var t;try{return((t=u4())==null?void 0:t.sessionStorage)||null}catch{return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f4=B;class br{constructor(){this.browserResolver=dn(RU),this.cordovaResolver=dn(JU),this.underlyingResolver=null,this._redirectPersistence=Js,this._completeRedirectFn=nm,this._overrideRedirectResult=Tv}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,n,i,r){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,n,i,r)}async _openRedirect(e,n,i,r){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,n,i,r)}_isIframeWebStorageSupported(e,n){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,n)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return j1()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return f4(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await l4();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q1(t){return t.unwrap()}function d4(t){return t.wrapped()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m4(t){return Y1(t)}function p4(t,e){var i;const n=(i=e.customData)==null?void 0:i._tokenResponse;if((e==null?void 0:e.code)==="auth/multi-factor-auth-required"){const r=e;r.resolver=new g4(t,aL(t,e))}else if(n){const r=Y1(e),s=e;r&&(s.credential=r,s.tenantId=n.tenantId||void 0,s.email=n.email||void 0,s.phoneNumber=n.phoneNumber||void 0)}}function Y1(t){const{_tokenResponse:e}=t instanceof Mt?t.customData:t;if(!e)return null;if(!(t instanceof Mt)&&"temporaryProof"in e&&"phoneNumber"in e)return Zs.credentialFromResult(t);const n=e.providerId;if(!n||n===Hl.PASSWORD)return null;let i;switch(n){case Hl.GOOGLE:i=Zn;break;case Hl.FACEBOOK:i=Jn;break;case Hl.GITHUB:i=ei;break;case Hl.TWITTER:i=ti;break;default:const{oauthIdToken:r,oauthAccessToken:s,oauthTokenSecret:a,pendingToken:o,nonce:u}=e;return!s&&!a&&!r&&!o?null:o?n.startsWith("saml.")?Oo._create(n,o):di._fromParams({providerId:n,signInMethod:n,pendingToken:o,idToken:r,accessToken:s}):new mo(n).credential({idToken:r,accessToken:s,rawNonce:u})}return t instanceof Mt?i.credentialFromError(t):i.credentialFromResult(t)}function Xt(t,e){return e.catch(n=>{throw n instanceof Mt&&p4(t,n),n}).then(n=>{const i=n.operationType,r=n.user;return{operationType:i,credential:m4(n),additionalUserInfo:sL(n),user:im.getOrCreate(r)}})}async function h_(t,e){const n=await e;return{verificationId:n.verificationId,confirm:i=>Xt(t,n.confirm(i))}}class g4{constructor(e,n){this.resolver=n,this.auth=d4(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return Xt(Q1(this.auth),this.resolver.resolveSignIn(e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let im=class au{constructor(e){this._delegate=e,this.multiFactor=uL(e)}static getOrCreate(e){return au.USER_MAP.has(e)||au.USER_MAP.set(e,new au(e)),au.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return Xt(this.auth,I1(this._delegate,e))}async linkWithPhoneNumber(e,n){return h_(this.auth,OL(this._delegate,e,n))}async linkWithPopup(e){return Xt(this.auth,FL(this._delegate,e,br))}async linkWithRedirect(e){return await c_(Fe(this.auth)),WL(this._delegate,e,br)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return Xt(this.auth,A1(this._delegate,e))}reauthenticateWithPhoneNumber(e,n){return h_(this.auth,VL(this._delegate,e,n))}reauthenticateWithPopup(e){return Xt(this.auth,BL(this._delegate,e,br))}async reauthenticateWithRedirect(e){return await c_(Fe(this.auth)),YL(this._delegate,e,br)}sendEmailVerification(e){return Yx(this._delegate,e)}async unlink(e){return await kx(this._delegate,e),this}updateEmail(e){return Jx(this._delegate,e)}updatePassword(e){return Zx(this._delegate,e)}updatePhoneNumber(e){return kL(this._delegate,e)}updateProfile(e){return Xx(this._delegate,e)}verifyBeforeUpdateEmail(e,n){return $x(this._delegate,e,n)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}};im.USER_MAP=new WeakMap;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kl=B;class f_{constructor(e,n){if(this.app=e,n.isInitialized()){this._delegate=n.getImmediate(),this.linkUnderlyingAuth();return}const{apiKey:i}=e.options;Kl(i,"invalid-api-key",{appName:e.name}),Kl(i,"invalid-api-key",{appName:e.name});const r=typeof window<"u"?br:void 0;this._delegate=n.initialize({options:{persistence:_4(i,e.name),popupRedirectResolver:r}}),this._delegate._updateErrorMap(IM),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?im.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,n){hx(this._delegate,e,n)}applyActionCode(e){return zx(this._delegate,e)}checkActionCode(e){return b1(this._delegate,e)}confirmPasswordReset(e,n){return Ux(this._delegate,e,n)}async createUserWithEmailAndPassword(e,n){return Xt(this._delegate,Fx(this._delegate,e,n))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return Qx(this._delegate,e)}isSignInWithEmailLink(e){return jx(this._delegate,e)}async getRedirectResult(){Kl(Qp(),this._delegate,"operation-not-supported-in-this-environment");const e=await JL(this._delegate,br);return e?Xt(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){ZU(this._delegate,e)}onAuthStateChanged(e,n,i){const{next:r,error:s,complete:a}=GI(e,n,i);return this._delegate.onAuthStateChanged(r,s,a)}onIdTokenChanged(e,n,i){const{next:r,error:s,complete:a}=GI(e,n,i);return this._delegate.onIdTokenChanged(r,s,a)}sendSignInLinkToEmail(e,n){return Hx(this._delegate,e,n)}sendPasswordResetEmail(e,n){return Lx(this._delegate,e,n||void 0)}async setPersistence(e){c4(this._delegate,e);let n;switch(e){case cn.SESSION:n=Js;break;case cn.LOCAL:n=await dn(lc)._isAvailable()?lc:pv;break;case cn.NONE:n=Po;break;default:return Ct("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(n)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return Xt(this._delegate,Vx(this._delegate))}signInWithCredential(e){return Xt(this._delegate,Xd(this._delegate,e))}signInWithCustomToken(e){return Xt(this._delegate,xx(this._delegate,e))}signInWithEmailAndPassword(e,n){return Xt(this._delegate,qx(this._delegate,e,n))}signInWithEmailLink(e,n){return Xt(this._delegate,Gx(this._delegate,e,n))}signInWithPhoneNumber(e,n){return h_(this._delegate,PL(this._delegate,e,n))}async signInWithPopup(e){return Kl(Qp(),this._delegate,"operation-not-supported-in-this-environment"),Xt(this._delegate,zL(this._delegate,e,br))}async signInWithRedirect(e){return Kl(Qp(),this._delegate,"operation-not-supported-in-this-environment"),await c_(this._delegate),KL(this._delegate,e,br)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return Bx(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}f_.Persistence=cn;function GI(t,e,n){let i=t;typeof t!="function"&&({next:i,error:e,complete:n}=t);const r=i;return{next:a=>r(a&&im.getOrCreate(a)),error:e,complete:n}}function _4(t,e){const n=h4(t,e);if(typeof self<"u"&&!n.includes(lc)&&n.push(lc),typeof window<"u")for(const i of[pv,Js])n.includes(i)||n.push(i);return n.includes(Po)||n.push(Po),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iv{static credential(e,n){return Zs.credential(e,n)}constructor(){this.providerId="phone",this._delegate=new Zs(Q1(Lc.auth()))}verifyPhoneNumber(e,n){return this._delegate.verifyPhoneNumber(e,n)}unwrap(){return this._delegate}}Iv.PHONE_SIGN_IN_METHOD=Zs.PHONE_SIGN_IN_METHOD;Iv.PROVIDER_ID=Zs.PROVIDER_ID;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y4=B;class v4{constructor(e,n,i=Lc.app()){var r;y4((r=i.options)==null?void 0:r.apiKey,"invalid-api-key",{appName:i.name}),this._delegate=new DL(i.auth(),e,n),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T4="auth-compat";function E4(t){t.INTERNAL.registerComponent(new Gn(T4,e=>{const n=e.getProvider("app-compat").getImmediate(),i=e.getProvider("auth");return new f_(n,i)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:Da.EMAIL_SIGNIN,PASSWORD_RESET:Da.PASSWORD_RESET,RECOVER_EMAIL:Da.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:Da.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:Da.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:Da.VERIFY_EMAIL}},EmailAuthProvider:as,FacebookAuthProvider:Jn,GithubAuthProvider:ei,GoogleAuthProvider:Zn,OAuthProvider:mo,SAMLAuthProvider:td,PhoneAuthProvider:Iv,PhoneMultiFactorGenerator:F1,RecaptchaVerifier:v4,TwitterAuthProvider:ti,Auth:f_,AuthCredential:ll,Error:Mt}).setInstantiationMode("LAZY").setMultipleInstances(!1)),t.registerVersion(e4,t4)}E4(Lc);var KI=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zr,$1;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,y){function E(){}E.prototype=y.prototype,T.F=y.prototype,T.prototype=new E,T.prototype.constructor=T,T.D=function(b,S,P){for(var A=Array(arguments.length-2),Nt=2;Nt<arguments.length;Nt++)A[Nt-2]=arguments[Nt];return y.prototype[S].apply(b,A)}}function n(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(i,n),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(T,y,E){E||(E=0);const b=Array(16);if(typeof y=="string")for(var S=0;S<16;++S)b[S]=y.charCodeAt(E++)|y.charCodeAt(E++)<<8|y.charCodeAt(E++)<<16|y.charCodeAt(E++)<<24;else for(S=0;S<16;++S)b[S]=y[E++]|y[E++]<<8|y[E++]<<16|y[E++]<<24;y=T.g[0],E=T.g[1],S=T.g[2];let P=T.g[3],A;A=y+(P^E&(S^P))+b[0]+3614090360&4294967295,y=E+(A<<7&4294967295|A>>>25),A=P+(S^y&(E^S))+b[1]+3905402710&4294967295,P=y+(A<<12&4294967295|A>>>20),A=S+(E^P&(y^E))+b[2]+606105819&4294967295,S=P+(A<<17&4294967295|A>>>15),A=E+(y^S&(P^y))+b[3]+3250441966&4294967295,E=S+(A<<22&4294967295|A>>>10),A=y+(P^E&(S^P))+b[4]+4118548399&4294967295,y=E+(A<<7&4294967295|A>>>25),A=P+(S^y&(E^S))+b[5]+1200080426&4294967295,P=y+(A<<12&4294967295|A>>>20),A=S+(E^P&(y^E))+b[6]+2821735955&4294967295,S=P+(A<<17&4294967295|A>>>15),A=E+(y^S&(P^y))+b[7]+4249261313&4294967295,E=S+(A<<22&4294967295|A>>>10),A=y+(P^E&(S^P))+b[8]+1770035416&4294967295,y=E+(A<<7&4294967295|A>>>25),A=P+(S^y&(E^S))+b[9]+2336552879&4294967295,P=y+(A<<12&4294967295|A>>>20),A=S+(E^P&(y^E))+b[10]+4294925233&4294967295,S=P+(A<<17&4294967295|A>>>15),A=E+(y^S&(P^y))+b[11]+2304563134&4294967295,E=S+(A<<22&4294967295|A>>>10),A=y+(P^E&(S^P))+b[12]+1804603682&4294967295,y=E+(A<<7&4294967295|A>>>25),A=P+(S^y&(E^S))+b[13]+4254626195&4294967295,P=y+(A<<12&4294967295|A>>>20),A=S+(E^P&(y^E))+b[14]+2792965006&4294967295,S=P+(A<<17&4294967295|A>>>15),A=E+(y^S&(P^y))+b[15]+1236535329&4294967295,E=S+(A<<22&4294967295|A>>>10),A=y+(S^P&(E^S))+b[1]+4129170786&4294967295,y=E+(A<<5&4294967295|A>>>27),A=P+(E^S&(y^E))+b[6]+3225465664&4294967295,P=y+(A<<9&4294967295|A>>>23),A=S+(y^E&(P^y))+b[11]+643717713&4294967295,S=P+(A<<14&4294967295|A>>>18),A=E+(P^y&(S^P))+b[0]+3921069994&4294967295,E=S+(A<<20&4294967295|A>>>12),A=y+(S^P&(E^S))+b[5]+3593408605&4294967295,y=E+(A<<5&4294967295|A>>>27),A=P+(E^S&(y^E))+b[10]+38016083&4294967295,P=y+(A<<9&4294967295|A>>>23),A=S+(y^E&(P^y))+b[15]+3634488961&4294967295,S=P+(A<<14&4294967295|A>>>18),A=E+(P^y&(S^P))+b[4]+3889429448&4294967295,E=S+(A<<20&4294967295|A>>>12),A=y+(S^P&(E^S))+b[9]+568446438&4294967295,y=E+(A<<5&4294967295|A>>>27),A=P+(E^S&(y^E))+b[14]+3275163606&4294967295,P=y+(A<<9&4294967295|A>>>23),A=S+(y^E&(P^y))+b[3]+4107603335&4294967295,S=P+(A<<14&4294967295|A>>>18),A=E+(P^y&(S^P))+b[8]+1163531501&4294967295,E=S+(A<<20&4294967295|A>>>12),A=y+(S^P&(E^S))+b[13]+2850285829&4294967295,y=E+(A<<5&4294967295|A>>>27),A=P+(E^S&(y^E))+b[2]+4243563512&4294967295,P=y+(A<<9&4294967295|A>>>23),A=S+(y^E&(P^y))+b[7]+1735328473&4294967295,S=P+(A<<14&4294967295|A>>>18),A=E+(P^y&(S^P))+b[12]+2368359562&4294967295,E=S+(A<<20&4294967295|A>>>12),A=y+(E^S^P)+b[5]+4294588738&4294967295,y=E+(A<<4&4294967295|A>>>28),A=P+(y^E^S)+b[8]+2272392833&4294967295,P=y+(A<<11&4294967295|A>>>21),A=S+(P^y^E)+b[11]+1839030562&4294967295,S=P+(A<<16&4294967295|A>>>16),A=E+(S^P^y)+b[14]+4259657740&4294967295,E=S+(A<<23&4294967295|A>>>9),A=y+(E^S^P)+b[1]+2763975236&4294967295,y=E+(A<<4&4294967295|A>>>28),A=P+(y^E^S)+b[4]+1272893353&4294967295,P=y+(A<<11&4294967295|A>>>21),A=S+(P^y^E)+b[7]+4139469664&4294967295,S=P+(A<<16&4294967295|A>>>16),A=E+(S^P^y)+b[10]+3200236656&4294967295,E=S+(A<<23&4294967295|A>>>9),A=y+(E^S^P)+b[13]+681279174&4294967295,y=E+(A<<4&4294967295|A>>>28),A=P+(y^E^S)+b[0]+3936430074&4294967295,P=y+(A<<11&4294967295|A>>>21),A=S+(P^y^E)+b[3]+3572445317&4294967295,S=P+(A<<16&4294967295|A>>>16),A=E+(S^P^y)+b[6]+76029189&4294967295,E=S+(A<<23&4294967295|A>>>9),A=y+(E^S^P)+b[9]+3654602809&4294967295,y=E+(A<<4&4294967295|A>>>28),A=P+(y^E^S)+b[12]+3873151461&4294967295,P=y+(A<<11&4294967295|A>>>21),A=S+(P^y^E)+b[15]+530742520&4294967295,S=P+(A<<16&4294967295|A>>>16),A=E+(S^P^y)+b[2]+3299628645&4294967295,E=S+(A<<23&4294967295|A>>>9),A=y+(S^(E|~P))+b[0]+4096336452&4294967295,y=E+(A<<6&4294967295|A>>>26),A=P+(E^(y|~S))+b[7]+1126891415&4294967295,P=y+(A<<10&4294967295|A>>>22),A=S+(y^(P|~E))+b[14]+2878612391&4294967295,S=P+(A<<15&4294967295|A>>>17),A=E+(P^(S|~y))+b[5]+4237533241&4294967295,E=S+(A<<21&4294967295|A>>>11),A=y+(S^(E|~P))+b[12]+1700485571&4294967295,y=E+(A<<6&4294967295|A>>>26),A=P+(E^(y|~S))+b[3]+2399980690&4294967295,P=y+(A<<10&4294967295|A>>>22),A=S+(y^(P|~E))+b[10]+4293915773&4294967295,S=P+(A<<15&4294967295|A>>>17),A=E+(P^(S|~y))+b[1]+2240044497&4294967295,E=S+(A<<21&4294967295|A>>>11),A=y+(S^(E|~P))+b[8]+1873313359&4294967295,y=E+(A<<6&4294967295|A>>>26),A=P+(E^(y|~S))+b[15]+4264355552&4294967295,P=y+(A<<10&4294967295|A>>>22),A=S+(y^(P|~E))+b[6]+2734768916&4294967295,S=P+(A<<15&4294967295|A>>>17),A=E+(P^(S|~y))+b[13]+1309151649&4294967295,E=S+(A<<21&4294967295|A>>>11),A=y+(S^(E|~P))+b[4]+4149444226&4294967295,y=E+(A<<6&4294967295|A>>>26),A=P+(E^(y|~S))+b[11]+3174756917&4294967295,P=y+(A<<10&4294967295|A>>>22),A=S+(y^(P|~E))+b[2]+718787259&4294967295,S=P+(A<<15&4294967295|A>>>17),A=E+(P^(S|~y))+b[9]+3951481745&4294967295,T.g[0]=T.g[0]+y&4294967295,T.g[1]=T.g[1]+(S+(A<<21&4294967295|A>>>11))&4294967295,T.g[2]=T.g[2]+S&4294967295,T.g[3]=T.g[3]+P&4294967295}i.prototype.v=function(T,y){y===void 0&&(y=T.length);const E=y-this.blockSize,b=this.C;let S=this.h,P=0;for(;P<y;){if(S==0)for(;P<=E;)r(this,T,P),P+=this.blockSize;if(typeof T=="string"){for(;P<y;)if(b[S++]=T.charCodeAt(P++),S==this.blockSize){r(this,b),S=0;break}}else for(;P<y;)if(b[S++]=T[P++],S==this.blockSize){r(this,b),S=0;break}}this.h=S,this.o+=y},i.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var y=1;y<T.length-8;++y)T[y]=0;y=this.o*8;for(var E=T.length-8;E<T.length;++E)T[E]=y&255,y/=256;for(this.v(T),T=Array(16),y=0,E=0;E<4;++E)for(let b=0;b<32;b+=8)T[y++]=this.g[E]>>>b&255;return T};function s(T,y){var E=o;return Object.prototype.hasOwnProperty.call(E,T)?E[T]:E[T]=y(T)}function a(T,y){this.h=y;const E=[];let b=!0;for(let S=T.length-1;S>=0;S--){const P=T[S]|0;b&&P==y||(E[S]=P,b=!1)}this.g=E}var o={};function u(T){return-128<=T&&T<128?s(T,function(y){return new a([y|0],y<0?-1:0)}):new a([T|0],T<0?-1:0)}function c(T){if(isNaN(T)||!isFinite(T))return d;if(T<0)return V(c(-T));const y=[];let E=1;for(let b=0;T>=E;b++)y[b]=T/E|0,E*=4294967296;return new a(y,0)}function h(T,y){if(T.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(T.charAt(0)=="-")return V(h(T.substring(1),y));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const E=c(Math.pow(y,8));let b=d;for(let P=0;P<T.length;P+=8){var S=Math.min(8,T.length-P);const A=parseInt(T.substring(P,P+S),y);S<8?(S=c(Math.pow(y,S)),b=b.j(S).add(c(A))):(b=b.j(E),b=b.add(c(A)))}return b}var d=u(0),m=u(1),g=u(16777216);t=a.prototype,t.m=function(){if(D(this))return-V(this).m();let T=0,y=1;for(let E=0;E<this.g.length;E++){const b=this.i(E);T+=(b>=0?b:4294967296+b)*y,y*=4294967296}return T},t.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(R(this))return"0";if(D(this))return"-"+V(this).toString(T);const y=c(Math.pow(T,6));var E=this;let b="";for(;;){const S=C(E,y).g;E=w(E,S.j(y));let P=((E.g.length>0?E.g[0]:E.h)>>>0).toString(T);if(E=S,R(E))return P+b;for(;P.length<6;)P="0"+P;b=P+b}},t.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function R(T){if(T.h!=0)return!1;for(let y=0;y<T.g.length;y++)if(T.g[y]!=0)return!1;return!0}function D(T){return T.h==-1}t.l=function(T){return T=w(this,T),D(T)?-1:R(T)?0:1};function V(T){const y=T.g.length,E=[];for(let b=0;b<y;b++)E[b]=~T.g[b];return new a(E,~T.h).add(m)}t.abs=function(){return D(this)?V(this):this},t.add=function(T){const y=Math.max(this.g.length,T.g.length),E=[];let b=0;for(let S=0;S<=y;S++){let P=b+(this.i(S)&65535)+(T.i(S)&65535),A=(P>>>16)+(this.i(S)>>>16)+(T.i(S)>>>16);b=A>>>16,P&=65535,A&=65535,E[S]=A<<16|P}return new a(E,E[E.length-1]&-2147483648?-1:0)};function w(T,y){return T.add(V(y))}t.j=function(T){if(R(this)||R(T))return d;if(D(this))return D(T)?V(this).j(V(T)):V(V(this).j(T));if(D(T))return V(this.j(V(T)));if(this.l(g)<0&&T.l(g)<0)return c(this.m()*T.m());const y=this.g.length+T.g.length,E=[];for(var b=0;b<2*y;b++)E[b]=0;for(b=0;b<this.g.length;b++)for(let S=0;S<T.g.length;S++){const P=this.i(b)>>>16,A=this.i(b)&65535,Nt=T.i(S)>>>16,Un=T.i(S)&65535;E[2*b+2*S]+=A*Un,v(E,2*b+2*S),E[2*b+2*S+1]+=P*Un,v(E,2*b+2*S+1),E[2*b+2*S+1]+=A*Nt,v(E,2*b+2*S+1),E[2*b+2*S+2]+=P*Nt,v(E,2*b+2*S+2)}for(T=0;T<y;T++)E[T]=E[2*T+1]<<16|E[2*T];for(T=y;T<2*y;T++)E[T]=0;return new a(E,0)};function v(T,y){for(;(T[y]&65535)!=T[y];)T[y+1]+=T[y]>>>16,T[y]&=65535,y++}function I(T,y){this.g=T,this.h=y}function C(T,y){if(R(y))throw Error("division by zero");if(R(T))return new I(d,d);if(D(T))return y=C(V(T),y),new I(V(y.g),V(y.h));if(D(y))return y=C(T,V(y)),new I(V(y.g),y.h);if(T.g.length>30){if(D(T)||D(y))throw Error("slowDivide_ only works with positive integers.");for(var E=m,b=y;b.l(T)<=0;)E=z(E),b=z(b);var S=F(E,1),P=F(b,1);for(b=F(b,2),E=F(E,2);!R(b);){var A=P.add(b);A.l(T)<=0&&(S=S.add(E),P=A),b=F(b,1),E=F(E,1)}return y=w(T,S.j(y)),new I(S,y)}for(S=d;T.l(y)>=0;){for(E=Math.max(1,Math.floor(T.m()/y.m())),b=Math.ceil(Math.log(E)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),P=c(E),A=P.j(y);D(A)||A.l(T)>0;)E-=b,P=c(E),A=P.j(y);R(P)&&(P=m),S=S.add(P),T=w(T,A)}return new I(S,T)}t.B=function(T){return C(this,T).h},t.and=function(T){const y=Math.max(this.g.length,T.g.length),E=[];for(let b=0;b<y;b++)E[b]=this.i(b)&T.i(b);return new a(E,this.h&T.h)},t.or=function(T){const y=Math.max(this.g.length,T.g.length),E=[];for(let b=0;b<y;b++)E[b]=this.i(b)|T.i(b);return new a(E,this.h|T.h)},t.xor=function(T){const y=Math.max(this.g.length,T.g.length),E=[];for(let b=0;b<y;b++)E[b]=this.i(b)^T.i(b);return new a(E,this.h^T.h)};function z(T){const y=T.g.length+1,E=[];for(let b=0;b<y;b++)E[b]=T.i(b)<<1|T.i(b-1)>>>31;return new a(E,T.h)}function F(T,y){const E=y>>5;y%=32;const b=T.g.length-E,S=[];for(let P=0;P<b;P++)S[P]=y>0?T.i(P+E)>>>y|T.i(P+E+1)<<32-y:T.i(P+E);return new a(S,T.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,$1=i,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=c,a.fromString=h,zr=a}).apply(typeof KI<"u"?KI:typeof self<"u"?self:typeof window<"u"?window:{});var Mh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var W1,ou,X1,cf,d_,J1,Z1,eC;(function(){var t,e=Object.defineProperty;function n(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof Mh=="object"&&Mh];for(var f=0;f<l.length;++f){var p=l[f];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var i=n(this);function r(l,f){if(f)e:{var p=i;l=l.split(".");for(var _=0;_<l.length-1;_++){var O=l[_];if(!(O in p))break e;p=p[O]}l=l[l.length-1],_=p[l],f=f(_),f!=_&&f!=null&&e(p,l,{configurable:!0,writable:!0,value:f})}}r("Symbol.dispose",function(l){return l||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(l){return l||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(l){return l||function(f){var p=[],_;for(_ in f)Object.prototype.hasOwnProperty.call(f,_)&&p.push([_,f[_]]);return p}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},a=this||self;function o(l){var f=typeof l;return f=="object"&&l!=null||f=="function"}function u(l,f,p){return l.call.apply(l.bind,arguments)}function c(l,f,p){return c=u,c.apply(null,arguments)}function h(l,f){var p=Array.prototype.slice.call(arguments,1);return function(){var _=p.slice();return _.push.apply(_,arguments),l.apply(this,_)}}function d(l,f){function p(){}p.prototype=f.prototype,l.Z=f.prototype,l.prototype=new p,l.prototype.constructor=l,l.Ob=function(_,O,M){for(var H=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)H[ne-2]=arguments[ne];return f.prototype[O].apply(_,H)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?l=>l&&AsyncContext.Snapshot.wrap(l):l=>l;function g(l){const f=l.length;if(f>0){const p=Array(f);for(let _=0;_<f;_++)p[_]=l[_];return p}return[]}function R(l,f){for(let _=1;_<arguments.length;_++){const O=arguments[_];var p=typeof O;if(p=p!="object"?p:O?Array.isArray(O)?"array":p:"null",p=="array"||p=="object"&&typeof O.length=="number"){p=l.length||0;const M=O.length||0;l.length=p+M;for(let H=0;H<M;H++)l[p+H]=O[H]}else l.push(O)}}class D{constructor(f,p){this.i=f,this.j=p,this.h=0,this.g=null}get(){let f;return this.h>0?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function V(l){a.setTimeout(()=>{throw l},0)}function w(){var l=T;let f=null;return l.g&&(f=l.g,l.g=l.g.next,l.g||(l.h=null),f.next=null),f}class v{constructor(){this.h=this.g=null}add(f,p){const _=I.get();_.set(f,p),this.h?this.h.next=_:this.g=_,this.h=_}}var I=new D(()=>new C,l=>l.reset());class C{constructor(){this.next=this.g=this.h=null}set(f,p){this.h=f,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let z,F=!1,T=new v,y=()=>{const l=Promise.resolve(void 0);z=()=>{l.then(E)}};function E(){for(var l;l=w();){try{l.h.call(l.g)}catch(p){V(p)}var f=I;f.j(l),f.h<100&&(f.h++,l.next=f.g,f.g=l)}F=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function S(l,f){this.type=l,this.g=this.target=f,this.defaultPrevented=!1}S.prototype.h=function(){this.defaultPrevented=!0};var P=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var l=!1,f=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const p=()=>{};a.addEventListener("test",p,f),a.removeEventListener("test",p,f)}catch{}return l}();function A(l){return/^[\s\xa0]*$/.test(l)}function Nt(l,f){S.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l&&this.init(l,f)}d(Nt,S),Nt.prototype.init=function(l,f){const p=this.type=l.type,_=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;this.target=l.target||l.srcElement,this.g=f,f=l.relatedTarget,f||(p=="mouseover"?f=l.fromElement:p=="mouseout"&&(f=l.toElement)),this.relatedTarget=f,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=l.pointerType,this.state=l.state,this.i=l,l.defaultPrevented&&Nt.Z.h.call(this)},Nt.prototype.h=function(){Nt.Z.h.call(this);const l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var Un="closure_listenable_"+(Math.random()*1e6|0),K=0;function ie(l,f,p,_,O){this.listener=l,this.proxy=null,this.src=f,this.type=p,this.capture=!!_,this.ha=O,this.key=++K,this.da=this.fa=!1}function J(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function Ae(l,f,p){for(const _ in l)f.call(p,l[_],_,l)}function et(l,f){for(const p in l)f.call(void 0,l[p],p,l)}function fs(l){const f={};for(const p in l)f[p]=l[p];return f}const ds="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ia(l,f){let p,_;for(let O=1;O<arguments.length;O++){_=arguments[O];for(p in _)l[p]=_[p];for(let M=0;M<ds.length;M++)p=ds[M],Object.prototype.hasOwnProperty.call(_,p)&&(l[p]=_[p])}}function An(l){this.src=l,this.g={},this.h=0}An.prototype.add=function(l,f,p,_,O){const M=l.toString();l=this.g[M],l||(l=this.g[M]=[],this.h++);const H=Pm(l,f,_,O);return H>-1?(f=l[H],p||(f.fa=!1)):(f=new ie(f,this.src,M,!!_,O),f.fa=p,l.push(f)),f};function Zi(l,f){const p=f.type;if(p in l.g){var _=l.g[p],O=Array.prototype.indexOf.call(_,f,void 0),M;(M=O>=0)&&Array.prototype.splice.call(_,O,1),M&&(J(f),l.g[p].length==0&&(delete l.g[p],l.h--))}}function Pm(l,f,p,_){for(let O=0;O<l.length;++O){const M=l[O];if(!M.da&&M.listener==f&&M.capture==!!p&&M.ha==_)return O}return-1}var Om="closure_lm_"+(Math.random()*1e6|0),Vm={};function zT(l,f,p,_,O){if(Array.isArray(f)){for(let M=0;M<f.length;M++)zT(l,f[M],p,_,O);return null}return p=qT(p),l&&l[Un]?l.J(f,p,o(_)?!!_.capture:!1,O):aP(l,f,p,!1,_,O)}function aP(l,f,p,_,O,M){if(!f)throw Error("Invalid event type");const H=o(O)?!!O.capture:!!O;let ne=Mm(l);if(ne||(l[Om]=ne=new An(l)),p=ne.add(f,p,_,H,M),p.proxy)return p;if(_=oP(),p.proxy=_,_.src=l,_.listener=p,l.addEventListener)P||(O=H),O===void 0&&(O=!1),l.addEventListener(f.toString(),_,O);else if(l.attachEvent)l.attachEvent(FT(f.toString()),_);else if(l.addListener&&l.removeListener)l.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return p}function oP(){function l(p){return f.call(l.src,l.listener,p)}const f=lP;return l}function BT(l,f,p,_,O){if(Array.isArray(f))for(var M=0;M<f.length;M++)BT(l,f[M],p,_,O);else _=o(_)?!!_.capture:!!_,p=qT(p),l&&l[Un]?(l=l.i,M=String(f).toString(),M in l.g&&(f=l.g[M],p=Pm(f,p,_,O),p>-1&&(J(f[p]),Array.prototype.splice.call(f,p,1),f.length==0&&(delete l.g[M],l.h--)))):l&&(l=Mm(l))&&(f=l.g[f.toString()],l=-1,f&&(l=Pm(f,p,_,O)),(p=l>-1?f[l]:null)&&km(p))}function km(l){if(typeof l!="number"&&l&&!l.da){var f=l.src;if(f&&f[Un])Zi(f.i,l);else{var p=l.type,_=l.proxy;f.removeEventListener?f.removeEventListener(p,_,l.capture):f.detachEvent?f.detachEvent(FT(p),_):f.addListener&&f.removeListener&&f.removeListener(_),(p=Mm(f))?(Zi(p,l),p.h==0&&(p.src=null,f[Om]=null)):J(l)}}}function FT(l){return l in Vm?Vm[l]:Vm[l]="on"+l}function lP(l,f){if(l.da)l=!0;else{f=new Nt(f,this);const p=l.listener,_=l.ha||l.src;l.fa&&km(l),l=p.call(_,f)}return l}function Mm(l){return l=l[Om],l instanceof An?l:null}var xm="__closure_events_fn_"+(Math.random()*1e9>>>0);function qT(l){return typeof l=="function"?l:(l[xm]||(l[xm]=function(f){return l.handleEvent(f)}),l[xm])}function Pt(){b.call(this),this.i=new An(this),this.M=this,this.G=null}d(Pt,b),Pt.prototype[Un]=!0,Pt.prototype.removeEventListener=function(l,f,p,_){BT(this,l,f,p,_)};function Lt(l,f){var p,_=l.G;if(_)for(p=[];_;_=_.G)p.push(_);if(l=l.M,_=f.type||f,typeof f=="string")f=new S(f,l);else if(f instanceof S)f.target=f.target||l;else{var O=f;f=new S(_,l),Ia(f,O)}O=!0;let M,H;if(p)for(H=p.length-1;H>=0;H--)M=f.g=p[H],O=ah(M,_,!0,f)&&O;if(M=f.g=l,O=ah(M,_,!0,f)&&O,O=ah(M,_,!1,f)&&O,p)for(H=0;H<p.length;H++)M=f.g=p[H],O=ah(M,_,!1,f)&&O}Pt.prototype.N=function(){if(Pt.Z.N.call(this),this.i){var l=this.i;for(const f in l.g){const p=l.g[f];for(let _=0;_<p.length;_++)J(p[_]);delete l.g[f],l.h--}}this.G=null},Pt.prototype.J=function(l,f,p,_){return this.i.add(String(l),f,!1,p,_)},Pt.prototype.K=function(l,f,p,_){return this.i.add(String(l),f,!0,p,_)};function ah(l,f,p,_){if(f=l.i.g[String(f)],!f)return!0;f=f.concat();let O=!0;for(let M=0;M<f.length;++M){const H=f[M];if(H&&!H.da&&H.capture==p){const ne=H.listener,lt=H.ha||H.src;H.fa&&Zi(l.i,H),O=ne.call(lt,_)!==!1&&O}}return O&&!_.defaultPrevented}function uP(l,f){if(typeof l!="function")if(l&&typeof l.handleEvent=="function")l=c(l.handleEvent,l);else throw Error("Invalid listener argument");return Number(f)>2147483647?-1:a.setTimeout(l,f||0)}function HT(l){l.g=uP(()=>{l.g=null,l.i&&(l.i=!1,HT(l))},l.l);const f=l.h;l.h=null,l.m.apply(null,f)}class cP extends b{constructor(f,p){super(),this.m=f,this.l=p,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:HT(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Tl(l){b.call(this),this.h=l,this.g={}}d(Tl,b);var jT=[];function GT(l){Ae(l.g,function(f,p){this.g.hasOwnProperty(p)&&km(f)},l),l.g={}}Tl.prototype.N=function(){Tl.Z.N.call(this),GT(this)},Tl.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Lm=a.JSON.stringify,hP=a.JSON.parse,fP=class{stringify(l){return a.JSON.stringify(l,void 0)}parse(l){return a.JSON.parse(l,void 0)}};function KT(){}function QT(){}var El={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Um(){S.call(this,"d")}d(Um,S);function zm(){S.call(this,"c")}d(zm,S);var ms={},YT=null;function oh(){return YT=YT||new Pt}ms.Ia="serverreachability";function $T(l){S.call(this,ms.Ia,l)}d($T,S);function wl(l){const f=oh();Lt(f,new $T(f))}ms.STAT_EVENT="statevent";function WT(l,f){S.call(this,ms.STAT_EVENT,l),this.stat=f}d(WT,S);function Ut(l){const f=oh();Lt(f,new WT(f,l))}ms.Ja="timingevent";function XT(l,f){S.call(this,ms.Ja,l),this.size=f}d(XT,S);function Il(l,f){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){l()},f)}function Al(){this.g=!0}Al.prototype.ua=function(){this.g=!1};function dP(l,f,p,_,O,M){l.info(function(){if(l.g)if(M){var H="",ne=M.split("&");for(let we=0;we<ne.length;we++){var lt=ne[we].split("=");if(lt.length>1){const dt=lt[0];lt=lt[1];const $n=dt.split("_");H=$n.length>=2&&$n[1]=="type"?H+(dt+"="+lt+"&"):H+(dt+"=redacted&")}}}else H=null;else H=M;return"XMLHTTP REQ ("+_+") [attempt "+O+"]: "+f+`
`+p+`
`+H})}function mP(l,f,p,_,O,M,H){l.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+O+"]: "+f+`
`+p+`
`+M+" "+H})}function Aa(l,f,p,_){l.info(function(){return"XMLHTTP TEXT ("+f+"): "+gP(l,p)+(_?" "+_:"")})}function pP(l,f){l.info(function(){return"TIMEOUT: "+f})}Al.prototype.info=function(){};function gP(l,f){if(!l.g)return f;if(!f)return null;try{const M=JSON.parse(f);if(M){for(l=0;l<M.length;l++)if(Array.isArray(M[l])){var p=M[l];if(!(p.length<2)){var _=p[1];if(Array.isArray(_)&&!(_.length<1)){var O=_[0];if(O!="noop"&&O!="stop"&&O!="close")for(let H=1;H<_.length;H++)_[H]=""}}}}return Lm(M)}catch{return f}}var lh={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},JT={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ZT;function Bm(){}d(Bm,KT),Bm.prototype.g=function(){return new XMLHttpRequest},ZT=new Bm;function bl(l){return encodeURIComponent(String(l))}function _P(l){var f=1;l=l.split(":");const p=[];for(;f>0&&l.length;)p.push(l.shift()),f--;return l.length&&p.push(l.join(":")),p}function er(l,f,p,_){this.j=l,this.i=f,this.l=p,this.S=_||1,this.V=new Tl(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new eE}function eE(){this.i=null,this.g="",this.h=!1}var tE={},Fm={};function qm(l,f,p){l.M=1,l.A=ch(Yn(f)),l.u=p,l.R=!0,nE(l,null)}function nE(l,f){l.F=Date.now(),uh(l),l.B=Yn(l.A);var p=l.B,_=l.S;Array.isArray(_)||(_=[String(_)]),pE(p.i,"t",_),l.C=0,p=l.j.L,l.h=new eE,l.g=VE(l.j,p?f:null,!l.u),l.P>0&&(l.O=new cP(c(l.Y,l,l.g),l.P)),f=l.V,p=l.g,_=l.ba;var O="readystatechange";Array.isArray(O)||(O&&(jT[0]=O.toString()),O=jT);for(let M=0;M<O.length;M++){const H=zT(p,O[M],_||f.handleEvent,!1,f.h||f);if(!H)break;f.g[H.key]=H}f=l.J?fs(l.J):{},l.u?(l.v||(l.v="POST"),f["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.B,l.v,l.u,f)):(l.v="GET",l.g.ea(l.B,l.v,null,f)),wl(),dP(l.i,l.v,l.B,l.l,l.S,l.u)}er.prototype.ba=function(l){l=l.target;const f=this.O;f&&ir(l)==3?f.j():this.Y(l)},er.prototype.Y=function(l){try{if(l==this.g)e:{const ne=ir(this.g),lt=this.g.ya(),we=this.g.ca();if(!(ne<3)&&(ne!=3||this.g&&(this.h.h||this.g.la()||wE(this.g)))){this.K||ne!=4||lt==7||(lt==8||we<=0?wl(3):wl(2)),Hm(this);var f=this.g.ca();this.X=f;var p=yP(this);if(this.o=f==200,mP(this.i,this.v,this.B,this.l,this.S,ne,f),this.o){if(this.U&&!this.L){t:{if(this.g){var _,O=this.g;if((_=O.g?O.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!A(_)){var M=_;break t}}M=null}if(l=M)Aa(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,jm(this,l);else{this.o=!1,this.m=3,Ut(12),ps(this),Sl(this);break e}}if(this.R){l=!0;let dt;for(;!this.K&&this.C<p.length;)if(dt=vP(this,p),dt==Fm){ne==4&&(this.m=4,Ut(14),l=!1),Aa(this.i,this.l,null,"[Incomplete Response]");break}else if(dt==tE){this.m=4,Ut(15),Aa(this.i,this.l,p,"[Invalid Chunk]"),l=!1;break}else Aa(this.i,this.l,dt,null),jm(this,dt);if(iE(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ne!=4||p.length!=0||this.h.h||(this.m=1,Ut(16),l=!1),this.o=this.o&&l,!l)Aa(this.i,this.l,p,"[Invalid Chunked Response]"),ps(this),Sl(this);else if(p.length>0&&!this.W){this.W=!0;var H=this.j;H.g==this&&H.aa&&!H.P&&(H.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),Jm(H),H.P=!0,Ut(11))}}else Aa(this.i,this.l,p,null),jm(this,p);ne==4&&ps(this),this.o&&!this.K&&(ne==4?DE(this.j,this):(this.o=!1,uh(this)))}else VP(this.g),f==400&&p.indexOf("Unknown SID")>0?(this.m=3,Ut(12)):(this.m=0,Ut(13)),ps(this),Sl(this)}}}catch{}finally{}};function yP(l){if(!iE(l))return l.g.la();const f=wE(l.g);if(f==="")return"";let p="";const _=f.length,O=ir(l.g)==4;if(!l.h.i){if(typeof TextDecoder>"u")return ps(l),Sl(l),"";l.h.i=new a.TextDecoder}for(let M=0;M<_;M++)l.h.h=!0,p+=l.h.i.decode(f[M],{stream:!(O&&M==_-1)});return f.length=0,l.h.g+=p,l.C=0,l.h.g}function iE(l){return l.g?l.v=="GET"&&l.M!=2&&l.j.Aa:!1}function vP(l,f){var p=l.C,_=f.indexOf(`
`,p);return _==-1?Fm:(p=Number(f.substring(p,_)),isNaN(p)?tE:(_+=1,_+p>f.length?Fm:(f=f.slice(_,_+p),l.C=_+p,f)))}er.prototype.cancel=function(){this.K=!0,ps(this)};function uh(l){l.T=Date.now()+l.H,rE(l,l.H)}function rE(l,f){if(l.D!=null)throw Error("WatchDog timer not null");l.D=Il(c(l.aa,l),f)}function Hm(l){l.D&&(a.clearTimeout(l.D),l.D=null)}er.prototype.aa=function(){this.D=null;const l=Date.now();l-this.T>=0?(pP(this.i,this.B),this.M!=2&&(wl(),Ut(17)),ps(this),this.m=2,Sl(this)):rE(this,this.T-l)};function Sl(l){l.j.I==0||l.K||DE(l.j,l)}function ps(l){Hm(l);var f=l.O;f&&typeof f.dispose=="function"&&f.dispose(),l.O=null,GT(l.V),l.g&&(f=l.g,l.g=null,f.abort(),f.dispose())}function jm(l,f){try{var p=l.j;if(p.I!=0&&(p.g==l||Gm(p.h,l))){if(!l.L&&Gm(p.h,l)&&p.I==3){try{var _=p.Ba.g.parse(f)}catch{_=null}if(Array.isArray(_)&&_.length==3){var O=_;if(O[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<l.F)ph(p),dh(p);else break e;Xm(p),Ut(18)}}else p.xa=O[1],0<p.xa-p.K&&O[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=Il(c(p.Va,p),6e3));oE(p.h)<=1&&p.ta&&(p.ta=void 0)}else _s(p,11)}else if((l.L||p.g==l)&&ph(p),!A(f))for(O=p.Ba.g.parse(f),f=0;f<O.length;f++){let we=O[f];const dt=we[0];if(!(dt<=p.K))if(p.K=dt,we=we[1],p.I==2)if(we[0]=="c"){p.M=we[1],p.ba=we[2];const $n=we[3];$n!=null&&(p.ka=$n,p.j.info("VER="+p.ka));const ys=we[4];ys!=null&&(p.za=ys,p.j.info("SVER="+p.za));const rr=we[5];rr!=null&&typeof rr=="number"&&rr>0&&(_=1.5*rr,p.O=_,p.j.info("backChannelRequestTimeoutMs_="+_)),_=p;const sr=l.g;if(sr){const _h=sr.g?sr.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_h){var M=_.h;M.g||_h.indexOf("spdy")==-1&&_h.indexOf("quic")==-1&&_h.indexOf("h2")==-1||(M.j=M.l,M.g=new Set,M.h&&(Km(M,M.h),M.h=null))}if(_.G){const Zm=sr.g?sr.g.getResponseHeader("X-HTTP-Session-Id"):null;Zm&&(_.wa=Zm,Ce(_.J,_.G,Zm))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-l.F,p.j.info("Handshake RTT: "+p.T+"ms")),_=p;var H=l;if(_.na=OE(_,_.L?_.ba:null,_.W),H.L){lE(_.h,H);var ne=H,lt=_.O;lt&&(ne.H=lt),ne.D&&(Hm(ne),uh(ne)),_.g=H}else RE(_);p.i.length>0&&mh(p)}else we[0]!="stop"&&we[0]!="close"||_s(p,7);else p.I==3&&(we[0]=="stop"||we[0]=="close"?we[0]=="stop"?_s(p,7):Wm(p):we[0]!="noop"&&p.l&&p.l.qa(we),p.A=0)}}wl(4)}catch{}}var TP=class{constructor(l,f){this.g=l,this.map=f}};function sE(l){this.l=l||10,a.PerformanceNavigationTiming?(l=a.performance.getEntriesByType("navigation"),l=l.length>0&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function aE(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function oE(l){return l.h?1:l.g?l.g.size:0}function Gm(l,f){return l.h?l.h==f:l.g?l.g.has(f):!1}function Km(l,f){l.g?l.g.add(f):l.h=f}function lE(l,f){l.h&&l.h==f?l.h=null:l.g&&l.g.has(f)&&l.g.delete(f)}sE.prototype.cancel=function(){if(this.i=uE(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function uE(l){if(l.h!=null)return l.i.concat(l.h.G);if(l.g!=null&&l.g.size!==0){let f=l.i;for(const p of l.g.values())f=f.concat(p.G);return f}return g(l.i)}var cE=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function EP(l,f){if(l){l=l.split("&");for(let p=0;p<l.length;p++){const _=l[p].indexOf("=");let O,M=null;_>=0?(O=l[p].substring(0,_),M=l[p].substring(_+1)):O=l[p],f(O,M?decodeURIComponent(M.replace(/\+/g," ")):"")}}}function tr(l){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let f;l instanceof tr?(this.l=l.l,Rl(this,l.j),this.o=l.o,this.g=l.g,Cl(this,l.u),this.h=l.h,Qm(this,gE(l.i)),this.m=l.m):l&&(f=String(l).match(cE))?(this.l=!1,Rl(this,f[1]||"",!0),this.o=Dl(f[2]||""),this.g=Dl(f[3]||"",!0),Cl(this,f[4]),this.h=Dl(f[5]||"",!0),Qm(this,f[6]||"",!0),this.m=Dl(f[7]||"")):(this.l=!1,this.i=new Pl(null,this.l))}tr.prototype.toString=function(){const l=[];var f=this.j;f&&l.push(Nl(f,hE,!0),":");var p=this.g;return(p||f=="file")&&(l.push("//"),(f=this.o)&&l.push(Nl(f,hE,!0),"@"),l.push(bl(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&l.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&l.push("/"),l.push(Nl(p,p.charAt(0)=="/"?AP:IP,!0))),(p=this.i.toString())&&l.push("?",p),(p=this.m)&&l.push("#",Nl(p,SP)),l.join("")},tr.prototype.resolve=function(l){const f=Yn(this);let p=!!l.j;p?Rl(f,l.j):p=!!l.o,p?f.o=l.o:p=!!l.g,p?f.g=l.g:p=l.u!=null;var _=l.h;if(p)Cl(f,l.u);else if(p=!!l.h){if(_.charAt(0)!="/")if(this.g&&!this.h)_="/"+_;else{var O=f.h.lastIndexOf("/");O!=-1&&(_=f.h.slice(0,O+1)+_)}if(O=_,O==".."||O==".")_="";else if(O.indexOf("./")!=-1||O.indexOf("/.")!=-1){_=O.lastIndexOf("/",0)==0,O=O.split("/");const M=[];for(let H=0;H<O.length;){const ne=O[H++];ne=="."?_&&H==O.length&&M.push(""):ne==".."?((M.length>1||M.length==1&&M[0]!="")&&M.pop(),_&&H==O.length&&M.push("")):(M.push(ne),_=!0)}_=M.join("/")}else _=O}return p?f.h=_:p=l.i.toString()!=="",p?Qm(f,gE(l.i)):p=!!l.m,p&&(f.m=l.m),f};function Yn(l){return new tr(l)}function Rl(l,f,p){l.j=p?Dl(f,!0):f,l.j&&(l.j=l.j.replace(/:$/,""))}function Cl(l,f){if(f){if(f=Number(f),isNaN(f)||f<0)throw Error("Bad port number "+f);l.u=f}else l.u=null}function Qm(l,f,p){f instanceof Pl?(l.i=f,RP(l.i,l.l)):(p||(f=Nl(f,bP)),l.i=new Pl(f,l.l))}function Ce(l,f,p){l.i.set(f,p)}function ch(l){return Ce(l,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),l}function Dl(l,f){return l?f?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function Nl(l,f,p){return typeof l=="string"?(l=encodeURI(l).replace(f,wP),p&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function wP(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var hE=/[#\/\?@]/g,IP=/[#\?:]/g,AP=/[#\?]/g,bP=/[#\?@]/g,SP=/#/g;function Pl(l,f){this.h=this.g=null,this.i=l||null,this.j=!!f}function gs(l){l.g||(l.g=new Map,l.h=0,l.i&&EP(l.i,function(f,p){l.add(decodeURIComponent(f.replace(/\+/g," ")),p)}))}t=Pl.prototype,t.add=function(l,f){gs(this),this.i=null,l=ba(this,l);let p=this.g.get(l);return p||this.g.set(l,p=[]),p.push(f),this.h+=1,this};function fE(l,f){gs(l),f=ba(l,f),l.g.has(f)&&(l.i=null,l.h-=l.g.get(f).length,l.g.delete(f))}function dE(l,f){return gs(l),f=ba(l,f),l.g.has(f)}t.forEach=function(l,f){gs(this),this.g.forEach(function(p,_){p.forEach(function(O){l.call(f,O,_,this)},this)},this)};function mE(l,f){gs(l);let p=[];if(typeof f=="string")dE(l,f)&&(p=p.concat(l.g.get(ba(l,f))));else for(l=Array.from(l.g.values()),f=0;f<l.length;f++)p=p.concat(l[f]);return p}t.set=function(l,f){return gs(this),this.i=null,l=ba(this,l),dE(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[f]),this.h+=1,this},t.get=function(l,f){return l?(l=mE(this,l),l.length>0?String(l[0]):f):f};function pE(l,f,p){fE(l,f),p.length>0&&(l.i=null,l.g.set(ba(l,f),g(p)),l.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],f=Array.from(this.g.keys());for(let _=0;_<f.length;_++){var p=f[_];const O=bl(p);p=mE(this,p);for(let M=0;M<p.length;M++){let H=O;p[M]!==""&&(H+="="+bl(p[M])),l.push(H)}}return this.i=l.join("&")};function gE(l){const f=new Pl;return f.i=l.i,l.g&&(f.g=new Map(l.g),f.h=l.h),f}function ba(l,f){return f=String(f),l.j&&(f=f.toLowerCase()),f}function RP(l,f){f&&!l.j&&(gs(l),l.i=null,l.g.forEach(function(p,_){const O=_.toLowerCase();_!=O&&(fE(this,_),pE(this,O,p))},l)),l.j=f}function CP(l,f){const p=new Al;if(a.Image){const _=new Image;_.onload=h(nr,p,"TestLoadImage: loaded",!0,f,_),_.onerror=h(nr,p,"TestLoadImage: error",!1,f,_),_.onabort=h(nr,p,"TestLoadImage: abort",!1,f,_),_.ontimeout=h(nr,p,"TestLoadImage: timeout",!1,f,_),a.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=l}else f(!1)}function DP(l,f){const p=new Al,_=new AbortController,O=setTimeout(()=>{_.abort(),nr(p,"TestPingServer: timeout",!1,f)},1e4);fetch(l,{signal:_.signal}).then(M=>{clearTimeout(O),M.ok?nr(p,"TestPingServer: ok",!0,f):nr(p,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(O),nr(p,"TestPingServer: error",!1,f)})}function nr(l,f,p,_,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),_(p)}catch{}}function NP(){this.g=new fP}function Ym(l){this.i=l.Sb||null,this.h=l.ab||!1}d(Ym,KT),Ym.prototype.g=function(){return new hh(this.i,this.h)};function hh(l,f){Pt.call(this),this.H=l,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}d(hh,Pt),t=hh.prototype,t.open=function(l,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=l,this.D=f,this.readyState=1,Vl(this)},t.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const f={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};l&&(f.body=l),(this.H||a).fetch(new Request(this.D,f)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ol(this)),this.readyState=0},t.Pa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,Vl(this)),this.g&&(this.readyState=3,Vl(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;_E(this)}else l.text().then(this.Oa.bind(this),this.ga.bind(this))};function _E(l){l.j.read().then(l.Ma.bind(l)).catch(l.ga.bind(l))}t.Ma=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var f=l.value?l.value:new Uint8Array(0);(f=this.B.decode(f,{stream:!l.done}))&&(this.response=this.responseText+=f)}l.done?Ol(this):Vl(this),this.readyState==3&&_E(this)}},t.Oa=function(l){this.g&&(this.response=this.responseText=l,Ol(this))},t.Na=function(l){this.g&&(this.response=l,Ol(this))},t.ga=function(){this.g&&Ol(this)};function Ol(l){l.readyState=4,l.l=null,l.j=null,l.B=null,Vl(l)}t.setRequestHeader=function(l,f){this.A.append(l,f)},t.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],f=this.h.entries();for(var p=f.next();!p.done;)p=p.value,l.push(p[0]+": "+p[1]),p=f.next();return l.join(`\r
`)};function Vl(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(hh.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function yE(l){let f="";return Ae(l,function(p,_){f+=_,f+=":",f+=p,f+=`\r
`}),f}function $m(l,f,p){e:{for(_ in p){var _=!1;break e}_=!0}_||(p=yE(p),typeof l=="string"?p!=null&&bl(p):Ce(l,f,p))}function He(l){Pt.call(this),this.headers=new Map,this.L=l||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}d(He,Pt);var PP=/^https?$/i,OP=["POST","PUT"];t=He.prototype,t.Fa=function(l){this.H=l},t.ea=function(l,f,p,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);f=f?f.toUpperCase():"GET",this.D=l,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ZT.g(),this.g.onreadystatechange=m(c(this.Ca,this));try{this.B=!0,this.g.open(f,String(l),!0),this.B=!1}catch(M){vE(this,M);return}if(l=p||"",p=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var O in _)p.set(O,_[O]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const M of _.keys())p.set(M,_.get(M));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(p.keys()).find(M=>M.toLowerCase()=="content-type"),O=a.FormData&&l instanceof a.FormData,!(Array.prototype.indexOf.call(OP,f,void 0)>=0)||_||O||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[M,H]of p)this.g.setRequestHeader(M,H);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(l),this.v=!1}catch(M){vE(this,M)}};function vE(l,f){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=f,l.o=5,TE(l),fh(l)}function TE(l){l.A||(l.A=!0,Lt(l,"complete"),Lt(l,"error"))}t.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=l||7,Lt(this,"complete"),Lt(this,"abort"),fh(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),fh(this,!0)),He.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?EE(this):this.Xa())},t.Xa=function(){EE(this)};function EE(l){if(l.h&&typeof s<"u"){if(l.v&&ir(l)==4)setTimeout(l.Ca.bind(l),0);else if(Lt(l,"readystatechange"),ir(l)==4){l.h=!1;try{const M=l.ca();e:switch(M){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var p;if(!(p=f)){var _;if(_=M===0){let H=String(l.D).match(cE)[1]||null;!H&&a.self&&a.self.location&&(H=a.self.location.protocol.slice(0,-1)),_=!PP.test(H?H.toLowerCase():"")}p=_}if(p)Lt(l,"complete"),Lt(l,"success");else{l.o=6;try{var O=ir(l)>2?l.g.statusText:""}catch{O=""}l.l=O+" ["+l.ca()+"]",TE(l)}}finally{fh(l)}}}}function fh(l,f){if(l.g){l.m&&(clearTimeout(l.m),l.m=null);const p=l.g;l.g=null,f||Lt(l,"ready");try{p.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function ir(l){return l.g?l.g.readyState:0}t.ca=function(){try{return ir(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(l){if(this.g){var f=this.g.responseText;return l&&f.indexOf(l)==0&&(f=f.substring(l.length)),hP(f)}};function wE(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.F){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function VP(l){const f={};l=(l.g&&ir(l)>=2&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<l.length;_++){if(A(l[_]))continue;var p=_P(l[_]);const O=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const M=f[O]||[];f[O]=M,M.push(p)}et(f,function(_){return _.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function kl(l,f,p){return p&&p.internalChannelParams&&p.internalChannelParams[l]||f}function IE(l){this.za=0,this.i=[],this.j=new Al,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=kl("failFast",!1,l),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=kl("baseRetryDelayMs",5e3,l),this.Za=kl("retryDelaySeedMs",1e4,l),this.Ta=kl("forwardChannelMaxRetries",2,l),this.va=kl("forwardChannelRequestTimeoutMs",2e4,l),this.ma=l&&l.xmlHttpFactory||void 0,this.Ua=l&&l.Rb||void 0,this.Aa=l&&l.useFetchStreams||!1,this.O=void 0,this.L=l&&l.supportsCrossDomainXhr||!1,this.M="",this.h=new sE(l&&l.concurrentRequestLimit),this.Ba=new NP,this.S=l&&l.fastHandshake||!1,this.R=l&&l.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=l&&l.Pb||!1,l&&l.ua&&this.j.ua(),l&&l.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&l&&l.detectBufferingProxy||!1,this.ia=void 0,l&&l.longPollingTimeout&&l.longPollingTimeout>0&&(this.ia=l.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=IE.prototype,t.ka=8,t.I=1,t.connect=function(l,f,p,_){Ut(0),this.W=l,this.H=f||{},p&&_!==void 0&&(this.H.OSID=p,this.H.OAID=_),this.F=this.X,this.J=OE(this,null,this.W),mh(this)};function Wm(l){if(AE(l),l.I==3){var f=l.V++,p=Yn(l.J);if(Ce(p,"SID",l.M),Ce(p,"RID",f),Ce(p,"TYPE","terminate"),Ml(l,p),f=new er(l,l.j,f),f.M=2,f.A=ch(Yn(p)),p=!1,a.navigator&&a.navigator.sendBeacon)try{p=a.navigator.sendBeacon(f.A.toString(),"")}catch{}!p&&a.Image&&(new Image().src=f.A,p=!0),p||(f.g=VE(f.j,null),f.g.ea(f.A)),f.F=Date.now(),uh(f)}PE(l)}function dh(l){l.g&&(Jm(l),l.g.cancel(),l.g=null)}function AE(l){dh(l),l.v&&(a.clearTimeout(l.v),l.v=null),ph(l),l.h.cancel(),l.m&&(typeof l.m=="number"&&a.clearTimeout(l.m),l.m=null)}function mh(l){if(!aE(l.h)&&!l.m){l.m=!0;var f=l.Ea;z||y(),F||(z(),F=!0),T.add(f,l),l.D=0}}function kP(l,f){return oE(l.h)>=l.h.j-(l.m?1:0)?!1:l.m?(l.i=f.G.concat(l.i),!0):l.I==1||l.I==2||l.D>=(l.Sa?0:l.Ta)?!1:(l.m=Il(c(l.Ea,l,f),NE(l,l.D)),l.D++,!0)}t.Ea=function(l){if(this.m)if(this.m=null,this.I==1){if(!l){this.V=Math.floor(Math.random()*1e5),l=this.V++;const O=new er(this,this.j,l);let M=this.o;if(this.U&&(M?(M=fs(M),Ia(M,this.U)):M=this.U),this.u!==null||this.R||(O.J=M,M=null),this.S)e:{for(var f=0,p=0;p<this.i.length;p++){t:{var _=this.i[p];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(f+=_,f>4096){f=p;break e}if(f===4096||p===this.i.length-1){f=p+1;break e}}f=1e3}else f=1e3;f=SE(this,O,f),p=Yn(this.J),Ce(p,"RID",l),Ce(p,"CVER",22),this.G&&Ce(p,"X-HTTP-Session-Id",this.G),Ml(this,p),M&&(this.R?f="headers="+bl(yE(M))+"&"+f:this.u&&$m(p,this.u,M)),Km(this.h,O),this.Ra&&Ce(p,"TYPE","init"),this.S?(Ce(p,"$req",f),Ce(p,"SID","null"),O.U=!0,qm(O,p,null)):qm(O,p,f),this.I=2}}else this.I==3&&(l?bE(this,l):this.i.length==0||aE(this.h)||bE(this))};function bE(l,f){var p;f?p=f.l:p=l.V++;const _=Yn(l.J);Ce(_,"SID",l.M),Ce(_,"RID",p),Ce(_,"AID",l.K),Ml(l,_),l.u&&l.o&&$m(_,l.u,l.o),p=new er(l,l.j,p,l.D+1),l.u===null&&(p.J=l.o),f&&(l.i=f.G.concat(l.i)),f=SE(l,p,1e3),p.H=Math.round(l.va*.5)+Math.round(l.va*.5*Math.random()),Km(l.h,p),qm(p,_,f)}function Ml(l,f){l.H&&Ae(l.H,function(p,_){Ce(f,_,p)}),l.l&&Ae({},function(p,_){Ce(f,_,p)})}function SE(l,f,p){p=Math.min(l.i.length,p);const _=l.l?c(l.l.Ka,l.l,l):null;e:{var O=l.i;let ne=-1;for(;;){const lt=["count="+p];ne==-1?p>0?(ne=O[0].g,lt.push("ofs="+ne)):ne=0:lt.push("ofs="+ne);let we=!0;for(let dt=0;dt<p;dt++){var M=O[dt].g;const $n=O[dt].map;if(M-=ne,M<0)ne=Math.max(0,O[dt].g-100),we=!1;else try{M="req"+M+"_"||"";try{var H=$n instanceof Map?$n:Object.entries($n);for(const[ys,rr]of H){let sr=rr;o(rr)&&(sr=Lm(rr)),lt.push(M+ys+"="+encodeURIComponent(sr))}}catch(ys){throw lt.push(M+"type="+encodeURIComponent("_badmap")),ys}}catch{_&&_($n)}}if(we){H=lt.join("&");break e}}H=void 0}return l=l.i.splice(0,p),f.G=l,H}function RE(l){if(!l.g&&!l.v){l.Y=1;var f=l.Da;z||y(),F||(z(),F=!0),T.add(f,l),l.A=0}}function Xm(l){return l.g||l.v||l.A>=3?!1:(l.Y++,l.v=Il(c(l.Da,l),NE(l,l.A)),l.A++,!0)}t.Da=function(){if(this.v=null,CE(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var l=4*this.T;this.j.info("BP detection timer enabled: "+l),this.B=Il(c(this.Wa,this),l)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ut(10),dh(this),CE(this))};function Jm(l){l.B!=null&&(a.clearTimeout(l.B),l.B=null)}function CE(l){l.g=new er(l,l.j,"rpc",l.Y),l.u===null&&(l.g.J=l.o),l.g.P=0;var f=Yn(l.na);Ce(f,"RID","rpc"),Ce(f,"SID",l.M),Ce(f,"AID",l.K),Ce(f,"CI",l.F?"0":"1"),!l.F&&l.ia&&Ce(f,"TO",l.ia),Ce(f,"TYPE","xmlhttp"),Ml(l,f),l.u&&l.o&&$m(f,l.u,l.o),l.O&&(l.g.H=l.O);var p=l.g;l=l.ba,p.M=1,p.A=ch(Yn(f)),p.u=null,p.R=!0,nE(p,l)}t.Va=function(){this.C!=null&&(this.C=null,dh(this),Xm(this),Ut(19))};function ph(l){l.C!=null&&(a.clearTimeout(l.C),l.C=null)}function DE(l,f){var p=null;if(l.g==f){ph(l),Jm(l),l.g=null;var _=2}else if(Gm(l.h,f))p=f.G,lE(l.h,f),_=1;else return;if(l.I!=0){if(f.o)if(_==1){p=f.u?f.u.length:0,f=Date.now()-f.F;var O=l.D;_=oh(),Lt(_,new XT(_,p)),mh(l)}else RE(l);else if(O=f.m,O==3||O==0&&f.X>0||!(_==1&&kP(l,f)||_==2&&Xm(l)))switch(p&&p.length>0&&(f=l.h,f.i=f.i.concat(p)),O){case 1:_s(l,5);break;case 4:_s(l,10);break;case 3:_s(l,6);break;default:_s(l,2)}}}function NE(l,f){let p=l.Qa+Math.floor(Math.random()*l.Za);return l.isActive()||(p*=2),p*f}function _s(l,f){if(l.j.info("Error code "+f),f==2){var p=c(l.bb,l),_=l.Ua;const O=!_;_=new tr(_||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Rl(_,"https"),ch(_),O?CP(_.toString(),p):DP(_.toString(),p)}else Ut(2);l.I=0,l.l&&l.l.pa(f),PE(l),AE(l)}t.bb=function(l){l?(this.j.info("Successfully pinged google.com"),Ut(2)):(this.j.info("Failed to ping google.com"),Ut(1))};function PE(l){if(l.I=0,l.ja=[],l.l){const f=uE(l.h);(f.length!=0||l.i.length!=0)&&(R(l.ja,f),R(l.ja,l.i),l.h.i.length=0,g(l.i),l.i.length=0),l.l.oa()}}function OE(l,f,p){var _=p instanceof tr?Yn(p):new tr(p);if(_.g!="")f&&(_.g=f+"."+_.g),Cl(_,_.u);else{var O=a.location;_=O.protocol,f=f?f+"."+O.hostname:O.hostname,O=+O.port;const M=new tr(null);_&&Rl(M,_),f&&(M.g=f),O&&Cl(M,O),p&&(M.h=p),_=M}return p=l.G,f=l.wa,p&&f&&Ce(_,p,f),Ce(_,"VER",l.ka),Ml(l,_),_}function VE(l,f,p){if(f&&!l.L)throw Error("Can't create secondary domain capable XhrIo object.");return f=l.Aa&&!l.ma?new He(new Ym({ab:p})):new He(l.ma),f.Fa(l.L),f}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function kE(){}t=kE.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function gh(){}gh.prototype.g=function(l,f){return new an(l,f)};function an(l,f){Pt.call(this),this.g=new IE(f),this.l=l,this.h=f&&f.messageUrlParams||null,l=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(l?l["X-WebChannel-Content-Type"]=f.messageContentType:l={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.sa&&(l?l["X-WebChannel-Client-Profile"]=f.sa:l={"X-WebChannel-Client-Profile":f.sa}),this.g.U=l,(l=f&&f.Qb)&&!A(l)&&(this.g.u=l),this.A=f&&f.supportsCrossDomainXhr||!1,this.v=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!A(f)&&(this.g.G=f,l=this.h,l!==null&&f in l&&(l=this.h,f in l&&delete l[f])),this.j=new Sa(this)}d(an,Pt),an.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},an.prototype.close=function(){Wm(this.g)},an.prototype.o=function(l){var f=this.g;if(typeof l=="string"){var p={};p.__data__=l,l=p}else this.v&&(p={},p.__data__=Lm(l),l=p);f.i.push(new TP(f.Ya++,l)),f.I==3&&mh(f)},an.prototype.N=function(){this.g.l=null,delete this.j,Wm(this.g),delete this.g,an.Z.N.call(this)};function ME(l){Um.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var f=l.__sm__;if(f){e:{for(const p in f){l=p;break e}l=void 0}(this.i=l)&&(l=this.i,f=f!==null&&l in f?f[l]:void 0),this.data=f}else this.data=l}d(ME,Um);function xE(){zm.call(this),this.status=1}d(xE,zm);function Sa(l){this.g=l}d(Sa,kE),Sa.prototype.ra=function(){Lt(this.g,"a")},Sa.prototype.qa=function(l){Lt(this.g,new ME(l))},Sa.prototype.pa=function(l){Lt(this.g,new xE)},Sa.prototype.oa=function(){Lt(this.g,"b")},gh.prototype.createWebChannel=gh.prototype.g,an.prototype.send=an.prototype.o,an.prototype.open=an.prototype.m,an.prototype.close=an.prototype.close,eC=function(){return new gh},Z1=function(){return oh()},J1=ms,d_={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},lh.NO_ERROR=0,lh.TIMEOUT=8,lh.HTTP_ERROR=6,cf=lh,JT.COMPLETE="complete",X1=JT,QT.EventType=El,El.OPEN="a",El.CLOSE="b",El.ERROR="c",El.MESSAGE="d",Pt.prototype.listen=Pt.prototype.J,ou=QT,He.prototype.listenOnce=He.prototype.K,He.prototype.getLastError=He.prototype.Ha,He.prototype.getLastErrorCode=He.prototype.ya,He.prototype.getStatus=He.prototype.ca,He.prototype.getResponseJson=He.prototype.La,He.prototype.getResponseText=He.prototype.la,He.prototype.send=He.prototype.ea,He.prototype.setWithCredentials=He.prototype.Fa,W1=He}).apply(typeof Mh<"u"?Mh:typeof self<"u"?self:typeof window<"u"?window:{});const QI="@firebase/firestore",YI="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cl="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r=new Gd("@firebase/firestore");function Ba(){return $r.logLevel}function w4(t){$r.setLogLevel(t)}function U(t,...e){if($r.logLevel<=se.DEBUG){const n=e.map(Av);$r.debug(`Firestore (${cl}): ${t}`,...n)}}function Xe(t,...e){if($r.logLevel<=se.ERROR){const n=e.map(Av);$r.error(`Firestore (${cl}): ${t}`,...n)}}function mi(t,...e){if($r.logLevel<=se.WARN){const n=e.map(Av);$r.warn(`Firestore (${cl}): ${t}`,...n)}}function Av(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(t,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,tC(t,i,n)}function tC(t,e,n){let i=`FIRESTORE (${cl}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{i+=" CONTEXT: "+JSON.stringify(n)}catch{i+=" CONTEXT: "+n}throw Xe(i),new Error(i)}function Q(t,e,n,i){let r="Unexpected state";typeof n=="string"?r=n:i=n,t||tC(e,r,i)}function I4(t,e){t||G(57014,e)}function j(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends Mt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nC{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class A4{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(gt.UNAUTHENTICATED))}shutdown(){}}class b4{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class S4{constructor(e){this.t=e,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Q(this.o===void 0,42304);let i=this.i;const r=u=>this.i!==i?(i=this.i,n(u)):Promise.resolve();let s=new Rt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Rt,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await r(this.currentUser)})},o=u=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>o(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?o(u):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Rt)}},0),a()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(i=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(Q(typeof i.accessToken=="string",31837,{l:i}),new nC(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string",2055,{h:e}),new gt(e)}}class R4{constructor(e,n,i){this.P=e,this.T=n,this.I=i,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class C4{constructor(e,n,i){this.P=e,this.T=n,this.I=i}getToken(){return Promise.resolve(new R4(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class $I{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class D4{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Oe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Q(this.o===void 0,3512);const i=s=>{s.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,U("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>i(s))};const r=s=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>r(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?r(s):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new $I(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Q(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new $I(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N4(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let i=0;i<t;i++)n[i]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bv{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const r=N4(40);for(let s=0;s<r.length;++s)i.length<20&&r[s]<n&&(i+=e.charAt(r[s]%62))}return i}}function X(t,e){return t<e?-1:t>e?1:0}function m_(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const r=t.charAt(i),s=e.charAt(i);if(r!==s)return Yp(r)===Yp(s)?X(r,s):Yp(r)?1:-1}return X(t.length,e.length)}const P4=55296,O4=57343;function Yp(t){const e=t.charCodeAt(0);return e>=P4&&e<=O4}function Vo(t,e,n){return t.length===e.length&&t.every((i,r)=>n(i,e[r]))}function iC(t){return t+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI="__name__";class Wn{constructor(e,n,i){n===void 0?n=0:n>e.length&&G(637,{offset:n,range:e.length}),i===void 0?i=e.length-n:i>e.length-n&&G(1746,{length:i,range:e.length-n}),this.segments=e,this.offset=n,this.len=i}get length(){return this.len}isEqual(e){return Wn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Wn?e.forEach(i=>{n.push(i)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,i=this.limit();n<i;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const i=Math.min(e.length,n.length);for(let r=0;r<i;r++){const s=Wn.compareSegments(e.get(r),n.get(r));if(s!==0)return s}return X(e.length,n.length)}static compareSegments(e,n){const i=Wn.isNumericId(e),r=Wn.isNumericId(n);return i&&!r?-1:!i&&r?1:i&&r?Wn.extractNumericId(e).compare(Wn.extractNumericId(n)):m_(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return zr.fromString(e.substring(4,e.length-2))}}class oe extends Wn{construct(e,n,i){return new oe(e,n,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const i of e){if(i.indexOf("//")>=0)throw new L(k.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);n.push(...i.split("/").filter(r=>r.length>0))}return new oe(n)}static emptyPath(){return new oe([])}}const V4=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ue extends Wn{construct(e,n,i){return new Ue(e,n,i)}static isValidIdentifier(e){return V4.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ue.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===WI}static keyField(){return new Ue([WI])}static fromServerFormat(e){const n=[];let i="",r=0;const s=()=>{if(i.length===0)throw new L(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(i),i=""};let a=!1;for(;r<e.length;){const o=e[r];if(o==="\\"){if(r+1===e.length)throw new L(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[r+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new L(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=u,r+=2}else o==="`"?(a=!a,r++):o!=="."||a?(i+=o,r++):(s(),r++)}if(s(),a)throw new L(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ue(n)}static emptyPath(){return new Ue([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(oe.fromString(e))}static fromName(e){return new q(oe.fromString(e).popFirst(5))}static empty(){return new q(oe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&oe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return oe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new oe(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sv(t,e,n){if(!n)throw new L(k.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function rC(t,e,n,i){if(e===!0&&i===!0)throw new L(k.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function XI(t){if(!q.isDocumentKey(t))throw new L(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function JI(t){if(q.isDocumentKey(t))throw new L(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function sC(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function rm(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":G(12329,{type:typeof t})}function fe(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new L(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=rm(t);throw new L(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function aC(t,e){if(e<=0)throw new L(k.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(t,e){const n={typeString:t};return e&&(n.value=e),n}function Gc(t,e){if(!sC(t))throw new L(k.INVALID_ARGUMENT,"JSON must be an object");let n;for(const i in e)if(e[i]){const r=e[i].typeString,s="value"in e[i]?{value:e[i].value}:void 0;if(!(i in t)){n=`JSON missing required field: '${i}'`;break}const a=t[i];if(r&&typeof a!==r){n=`JSON field '${i}' must be a ${r}.`;break}if(s!==void 0&&a!==s.value){n=`Expected '${i}' field to equal '${s.value}'`;break}}if(n)throw new L(k.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI=-62135596800,eA=1e6;class pe{static now(){return pe.fromMillis(Date.now())}static fromDate(e){return pe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),i=Math.floor((e-1e3*n)*eA);return new pe(n,i)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new L(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new L(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<ZI)throw new L(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/eA}_compareTo(e){return this.seconds===e.seconds?X(this.nanoseconds,e.nanoseconds):X(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:pe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Gc(e,pe._jsonSchema))return new pe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ZI;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}pe._jsonSchemaVersion="firestore/timestamp/1.0",pe._jsonSchema={type:ot("string",pe._jsonSchemaVersion),seconds:ot("number"),nanoseconds:ot("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{static fromTimestamp(e){return new Y(e)}static min(){return new Y(new pe(0,0))}static max(){return new Y(new pe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko=-1;class sd{constructor(e,n,i,r){this.indexId=e,this.collectionGroup=n,this.fields=i,this.indexState=r}}function p_(t){return t.fields.find(e=>e.kind===2)}function Ss(t){return t.fields.filter(e=>e.kind!==2)}sd.UNKNOWN_ID=-1;class hf{constructor(e,n){this.fieldPath=e,this.kind=n}}class uc{constructor(e,n){this.sequenceNumber=e,this.offset=n}static empty(){return new uc(0,In.min())}}function oC(t,e){const n=t.toTimestamp().seconds,i=t.toTimestamp().nanoseconds+1,r=Y.fromTimestamp(i===1e9?new pe(n+1,0):new pe(n,i));return new In(r,q.empty(),e)}function lC(t){return new In(t.readTime,t.key,ko)}class In{constructor(e,n,i){this.readTime=e,this.documentKey=n,this.largestBatchId=i}static min(){return new In(Y.min(),q.empty(),ko)}static max(){return new In(Y.max(),q.empty(),ko)}}function Rv(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=q.comparator(t.documentKey,e.documentKey),n!==0?n:X(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uC="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class cC{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function os(t){if(t.code!==k.FAILED_PRECONDITION||t.message!==uC)throw t;U("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new N((i,r)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(i,r)},this.catchCallback=s=>{this.wrapFailure(n,s).next(i,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof N?n:N.resolve(n)}catch(n){return N.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):N.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):N.reject(n)}static resolve(e){return new N((n,i)=>{n(e)})}static reject(e){return new N((n,i)=>{i(e)})}static waitFor(e){return new N((n,i)=>{let r=0,s=0,a=!1;e.forEach(o=>{++r,o.next(()=>{++s,a&&s===r&&n()},u=>i(u))}),a=!0,s===r&&n()})}static or(e){let n=N.resolve(!1);for(const i of e)n=n.next(r=>r?N.resolve(r):i());return n}static forEach(e,n){const i=[];return e.forEach((r,s)=>{i.push(n.call(this,r,s))}),this.waitFor(i)}static mapArray(e,n){return new N((i,r)=>{const s=e.length,a=new Array(s);let o=0;for(let u=0;u<s;u++){const c=u;n(e[c]).next(h=>{a[c]=h,++o,o===s&&i(a)},h=>r(h))}})}static doWhile(e,n){return new N((i,r)=>{const s=()=>{e()===!0?n().next(()=>{s()},r):i()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln="SimpleDb";class sm{static open(e,n,i,r){try{return new sm(n,e.transaction(r,i))}catch(s){throw new Ou(n,s)}}constructor(e,n){this.action=e,this.transaction=n,this.aborted=!1,this.S=new Rt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{n.error?this.S.reject(new Ou(e,n.error)):this.S.resolve()},this.transaction.onerror=i=>{const r=Cv(i.target.error);this.S.reject(new Ou(e,r))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(U(ln,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const n=this.transaction.objectStore(e);return new M4(n)}}class ci{static delete(e){return U(ln,"Removing database:",e),Cs(Qy().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!nc())return!1;if(ci.F())return!0;const e=Be(),n=ci.M(e),i=0<n&&n<10,r=hC(e),s=0<r&&r<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||i||s)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,n){return e.store(n)}static M(e){const n=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),i=n?n[1].split("_").slice(0,2).join("."):"-1";return Number(i)}constructor(e,n,i){this.name=e,this.version=n,this.N=i,this.B=null,ci.M(Be())===12.2&&Xe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(U(ln,"Opening database:",this.name),this.db=await new Promise((n,i)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=s=>{const a=s.target.result;n(a)},r.onblocked=()=>{i(new Ou(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=s=>{const a=s.target.error;a.name==="VersionError"?i(new L(k.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?i(new L(k.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):i(new Ou(e,a))},r.onupgradeneeded=s=>{U(ln,'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const a=s.target.result;this.N.k(a,r.transaction,s.oldVersion,this.version).next(()=>{U(ln,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=n=>this.q(n)),this.db}$(e){this.q=e,this.db&&(this.db.onversionchange=n=>e(n))}async runTransaction(e,n,i,r){const s=n==="readonly";let a=0;for(;;){++a;try{this.db=await this.L(e);const o=sm.open(this.db,e,s?"readonly":"readwrite",i),u=r(o).next(c=>(o.C(),c)).catch(c=>(o.abort(c),N.reject(c))).toPromise();return u.catch(()=>{}),await o.D,u}catch(o){const u=o,c=u.name!=="FirebaseError"&&a<3;if(U(ln,"Transaction failed with error:",u.message,"Retrying:",c),this.close(),!c)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function hC(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class k4{constructor(e){this.U=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.U=e}done(){this.K=!0}j(e){this.W=e}delete(){return Cs(this.U.delete())}}class Ou extends L{constructor(e,n){super(k.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${n}`),this.name="IndexedDbTransactionError"}}function ls(t){return t.name==="IndexedDbTransactionError"}class M4{constructor(e){this.store=e}put(e,n){let i;return n!==void 0?(U(ln,"PUT",this.store.name,e,n),i=this.store.put(n,e)):(U(ln,"PUT",this.store.name,"<auto-key>",e),i=this.store.put(e)),Cs(i)}add(e){return U(ln,"ADD",this.store.name,e,e),Cs(this.store.add(e))}get(e){return Cs(this.store.get(e)).next(n=>(n===void 0&&(n=null),U(ln,"GET",this.store.name,e,n),n))}delete(e){return U(ln,"DELETE",this.store.name,e),Cs(this.store.delete(e))}count(){return U(ln,"COUNT",this.store.name),Cs(this.store.count())}J(e,n){const i=this.options(e,n),r=i.index?this.store.index(i.index):this.store;if(typeof r.getAll=="function"){const s=r.getAll(i.range);return new N((a,o)=>{s.onerror=u=>{o(u.target.error)},s.onsuccess=u=>{a(u.target.result)}})}{const s=this.cursor(i),a=[];return this.H(s,(o,u)=>{a.push(u)}).next(()=>a)}}Y(e,n){const i=this.store.getAll(e,n===null?void 0:n);return new N((r,s)=>{i.onerror=a=>{s(a.target.error)},i.onsuccess=a=>{r(a.target.result)}})}Z(e,n){U(ln,"DELETE ALL",this.store.name);const i=this.options(e,n);i.X=!1;const r=this.cursor(i);return this.H(r,(s,a,o)=>o.delete())}ee(e,n){let i;n?i=e:(i={},n=e);const r=this.cursor(i);return this.H(r,n)}te(e){const n=this.cursor({});return new N((i,r)=>{n.onerror=s=>{const a=Cv(s.target.error);r(a)},n.onsuccess=s=>{const a=s.target.result;a?e(a.primaryKey,a.value).next(o=>{o?a.continue():i()}):i()}})}H(e,n){const i=[];return new N((r,s)=>{e.onerror=a=>{s(a.target.error)},e.onsuccess=a=>{const o=a.target.result;if(!o)return void r();const u=new k4(o),c=n(o.primaryKey,o.value,u);if(c instanceof N){const h=c.catch(d=>(u.done(),N.reject(d)));i.push(h)}u.isDone?r():u.G===null?o.continue():o.continue(u.G)}}).next(()=>N.waitFor(i))}options(e,n){let i;return e!==void 0&&(typeof e=="string"?i=e:n=e),{index:i,range:n}}cursor(e){let n="next";if(e.reverse&&(n="prev"),e.index){const i=this.store.index(e.index);return e.X?i.openKeyCursor(e.range,n):i.openCursor(e.range,n)}return this.store.openCursor(e.range,n)}}function Cs(t){return new N((e,n)=>{t.onsuccess=i=>{const r=i.target.result;e(r)},t.onerror=i=>{const r=Cv(i.target.error);n(r)}})}let tA=!1;function Cv(t){const e=ci.M(Be());if(e>=12.2&&e<13){const n="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(n)>=0){const i=new L("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${n}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return tA||(tA=!0,setTimeout(()=>{throw i},0)),i}}return t}const Vu="IndexBackfiller";class x4{constructor(e,n){this.asyncQueue=e,this.ne=n,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){U(Vu,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const n=await this.ne.ie();U(Vu,`Documents written: ${n}`)}catch(n){ls(n)?U(Vu,"Ignoring IndexedDB error during index backfill: ",n):await os(n)}await this.re(6e4)})}}class L4{constructor(e,n){this.localStore=e,this.persistence=n}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",n=>this.se(n,e))}se(e,n){const i=new Set;let r=n,s=!0;return N.doWhile(()=>s===!0&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(a=>{if(a!==null&&!i.has(a))return U(Vu,`Processing collection: ${a}`),this.oe(e,a,r).next(o=>{r-=o,i.add(a)});s=!1})).next(()=>n-r)}oe(e,n,i){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,n).next(r=>this.localStore.localDocuments.getNextDocuments(e,n,r,i).next(s=>{const a=s.changes;return this.localStore.indexManager.updateIndexEntries(e,a).next(()=>this._e(r,s)).next(o=>(U(Vu,`Updating offset: ${o}`),this.localStore.indexManager.updateCollectionGroup(e,n,o))).next(()=>a.size)}))}_e(e,n){let i=e;return n.changes.forEach((r,s)=>{const a=lC(s);Rv(a,i)>0&&(i=a)}),new In(i.readTime,i.documentKey,Math.max(n.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=i=>this.ae(i),this.ue=i=>n.writeSequenceNumber(i))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Zt.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=-1;function Kc(t){return t==null}function cc(t){return t===0&&1/t==-1/0}function fC(t){return typeof t=="number"&&Number.isInteger(t)&&!cc(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="";function xt(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=nA(e)),e=U4(t.get(n),e);return nA(e)}function U4(t,e){let n=e;const i=t.length;for(let r=0;r<i;r++){const s=t.charAt(r);switch(s){case"\0":n+="";break;case ad:n+="";break;default:n+=s}}return n}function nA(t){return t+ad+""}function ai(t){const e=t.length;if(Q(e>=2,64408,{path:t}),e===2)return Q(t.charAt(0)===ad&&t.charAt(1)==="",56145,{path:t}),oe.emptyPath();const n=e-2,i=[];let r="";for(let s=0;s<e;){const a=t.indexOf(ad,s);switch((a<0||a>n)&&G(50515,{path:t}),t.charAt(a+1)){case"":const o=t.substring(s,a);let u;r.length===0?u=o:(r+=o,u=r,r=""),i.push(u);break;case"":r+=t.substring(s,a),r+="\0";break;case"":r+=t.substring(s,a+1);break;default:G(61167,{path:t})}s=a+2}return new oe(i)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs="remoteDocuments",Qc="owner",Na="owner",hc="mutationQueues",z4="userId",Fn="mutations",iA="batchId",Ms="userMutationsIndex",rA=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ff(t,e){return[t,xt(e)]}function dC(t,e,n){return[t,xt(e),n]}const B4={},Mo="documentMutations",od="remoteDocumentsV14",F4=["prefixPath","collectionGroup","readTime","documentId"],df="documentKeyIndex",q4=["prefixPath","collectionGroup","documentId"],mC="collectionGroupIndex",H4=["collectionGroup","readTime","prefixPath","documentId"],fc="remoteDocumentGlobal",g_="remoteDocumentGlobalKey",xo="targets",pC="queryTargetsIndex",j4=["canonicalId","targetId"],Lo="targetDocuments",G4=["targetId","path"],Dv="documentTargetsIndex",K4=["path","targetId"],ld="targetGlobalKey",Gs="targetGlobal",dc="collectionParents",Q4=["collectionId","parent"],Uo="clientMetadata",Y4="clientId",am="bundles",$4="bundleId",om="namedQueries",W4="name",Nv="indexConfiguration",X4="indexId",__="collectionGroupIndex",J4="collectionGroup",ku="indexState",Z4=["indexId","uid"],gC="sequenceNumberIndex",e6=["uid","sequenceNumber"],Mu="indexEntries",t6=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],_C="documentKeyIndex",n6=["indexId","uid","orderedDocumentKey"],lm="documentOverlays",i6=["userId","collectionPath","documentId"],y_="collectionPathOverlayIndex",r6=["userId","collectionPath","largestBatchId"],yC="collectionGroupOverlayIndex",s6=["userId","collectionGroup","largestBatchId"],Pv="globals",a6="name",vC=[hc,Fn,Mo,Rs,xo,Qc,Gs,Lo,Uo,fc,dc,am,om],o6=[...vC,lm],TC=[hc,Fn,Mo,od,xo,Qc,Gs,Lo,Uo,fc,dc,am,om,lm],EC=TC,Ov=[...EC,Nv,ku,Mu],l6=Ov,wC=[...Ov,Pv],u6=wC;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_ extends cC{constructor(e,n){super(),this.le=e,this.currentSequenceNumber=n}}function ft(t,e){const n=j(t);return ci.O(n.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sA(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function us(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function IC(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,n){this.comparator=e,this.root=n||Et.EMPTY}insert(e,n){return new Re(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Et.BLACK,null,null))}remove(e){return new Re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Et.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return n.value;i<0?n=n.left:i>0&&(n=n.right)}return null}indexOf(e){let n=0,i=this.root;for(;!i.isEmpty();){const r=this.comparator(e,i.key);if(r===0)return n+i.left.size;r<0?i=i.left:(n+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,i)=>(e(n,i),!1))}toString(){const e=[];return this.inorderTraversal((n,i)=>(e.push(`${n}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new xh(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new xh(this.root,e,this.comparator,!1)}getReverseIterator(){return new xh(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new xh(this.root,e,this.comparator,!0)}}class xh{constructor(e,n,i,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?i(e.key,n):1,n&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Et{constructor(e,n,i,r,s){this.key=e,this.value=n,this.color=i??Et.RED,this.left=r??Et.EMPTY,this.right=s??Et.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,i,r,s){return new Et(e??this.key,n??this.value,i??this.color,r??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let r=this;const s=i(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,n,i),null):s===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,i)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Et.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let i,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return Et.EMPTY;i=r.right.min(),r=r.copy(i.key,i.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Et.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw G(27949);return e+(this.isRed()?0:1)}}Et.EMPTY=null,Et.RED=!0,Et.BLACK=!1;Et.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(e,n,i,r,s){return this}insert(e,n,i){return new Et(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.comparator=e,this.data=new Re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,i)=>(e(n),!1))}forEachInRange(e,n){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const r=i.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let i;for(i=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new aA(this.data.getIterator())}getIteratorFrom(e){return new aA(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(i=>{n=n.add(i)}),n}isEqual(e){if(!(e instanceof ve)||this.size!==e.size)return!1;const n=this.data.getIterator(),i=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,s=i.getNext().key;if(this.comparator(r,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ve(this.comparator);return n.data=e,n}}class aA{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Pa(t){return t.hasNext()?t.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e){this.fields=e,e.sort(Ue.comparator)}static empty(){return new en([])}unionWith(e){let n=new ve(Ue.comparator);for(const i of this.fields)n=n.add(i);for(const i of e)n=n.add(i);return new en(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Vo(this.fields,e.fields,(n,i)=>n.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AC extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c6(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new AC("Invalid base64 string: "+s):s}}(e);return new Ke(n)}static fromUint8Array(e){const n=function(r){let s="";for(let a=0;a<r.length;++a)s+=String.fromCharCode(r[a]);return s}(e);return new Ke(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const i=new Uint8Array(n.length);for(let r=0;r<n.length;r++)i[r]=n.charCodeAt(r);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return X(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ke.EMPTY_BYTE_STRING=new Ke("");const h6=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Hi(t){if(Q(!!t,39018),typeof t=="string"){let e=0;const n=h6.exec(t);if(Q(!!n,46558,{timestamp:t}),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const i=new Date(t);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:Le(t.seconds),nanos:Le(t.nanos)}}function Le(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function ji(t){return typeof t=="string"?Ke.fromBase64String(t):Ke.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bC="server_timestamp",SC="__type__",RC="__previous_value__",CC="__local_write_time__";function um(t){var n,i;return((i=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[SC])==null?void 0:i.stringValue)===bC}function cm(t){const e=t.mapValue.fields[RC];return um(e)?cm(e):e}function mc(t){const e=Hi(t.mapValue.fields[CC].timestampValue);return new pe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f6{constructor(e,n,i,r,s,a,o,u,c,h){this.databaseId=e,this.appId=n,this.persistenceKey=i,this.host=r,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=o,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=h}}const ud="(default)";class Wr{constructor(e,n){this.projectId=e,this.database=n||ud}static empty(){return new Wr("","")}get isDefaultDatabase(){return this.database===ud}isEqual(e){return e instanceof Wr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv="__type__",DC="__max__",Sr={mapValue:{fields:{__type__:{stringValue:DC}}}},kv="__vector__",zo="value",mf={nullValue:"NULL_VALUE"};function Xr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?um(t)?4:NC(t)?9007199254740991:hm(t)?10:11:G(28295,{value:t})}function pi(t,e){if(t===e)return!0;const n=Xr(t);if(n!==Xr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return mc(t).isEqual(mc(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const a=Hi(r.timestampValue),o=Hi(s.timestampValue);return a.seconds===o.seconds&&a.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,s){return ji(r.bytesValue).isEqual(ji(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,s){return Le(r.geoPointValue.latitude)===Le(s.geoPointValue.latitude)&&Le(r.geoPointValue.longitude)===Le(s.geoPointValue.longitude)}(t,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return Le(r.integerValue)===Le(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const a=Le(r.doubleValue),o=Le(s.doubleValue);return a===o?cc(a)===cc(o):isNaN(a)&&isNaN(o)}return!1}(t,e);case 9:return Vo(t.arrayValue.values||[],e.arrayValue.values||[],pi);case 10:case 11:return function(r,s){const a=r.mapValue.fields||{},o=s.mapValue.fields||{};if(sA(a)!==sA(o))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(o[u]===void 0||!pi(a[u],o[u])))return!1;return!0}(t,e);default:return G(52216,{left:t})}}function pc(t,e){return(t.values||[]).find(n=>pi(n,e))!==void 0}function Jr(t,e){if(t===e)return 0;const n=Xr(t),i=Xr(e);if(n!==i)return X(n,i);switch(n){case 0:case 9007199254740991:return 0;case 1:return X(t.booleanValue,e.booleanValue);case 2:return function(s,a){const o=Le(s.integerValue||s.doubleValue),u=Le(a.integerValue||a.doubleValue);return o<u?-1:o>u?1:o===u?0:isNaN(o)?isNaN(u)?0:-1:1}(t,e);case 3:return oA(t.timestampValue,e.timestampValue);case 4:return oA(mc(t),mc(e));case 5:return m_(t.stringValue,e.stringValue);case 6:return function(s,a){const o=ji(s),u=ji(a);return o.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,a){const o=s.split("/"),u=a.split("/");for(let c=0;c<o.length&&c<u.length;c++){const h=X(o[c],u[c]);if(h!==0)return h}return X(o.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,a){const o=X(Le(s.latitude),Le(a.latitude));return o!==0?o:X(Le(s.longitude),Le(a.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return lA(t.arrayValue,e.arrayValue);case 10:return function(s,a){var m,g,R,D;const o=s.fields||{},u=a.fields||{},c=(m=o[zo])==null?void 0:m.arrayValue,h=(g=u[zo])==null?void 0:g.arrayValue,d=X(((R=c==null?void 0:c.values)==null?void 0:R.length)||0,((D=h==null?void 0:h.values)==null?void 0:D.length)||0);return d!==0?d:lA(c,h)}(t.mapValue,e.mapValue);case 11:return function(s,a){if(s===Sr.mapValue&&a===Sr.mapValue)return 0;if(s===Sr.mapValue)return 1;if(a===Sr.mapValue)return-1;const o=s.fields||{},u=Object.keys(o),c=a.fields||{},h=Object.keys(c);u.sort(),h.sort();for(let d=0;d<u.length&&d<h.length;++d){const m=m_(u[d],h[d]);if(m!==0)return m;const g=Jr(o[u[d]],c[h[d]]);if(g!==0)return g}return X(u.length,h.length)}(t.mapValue,e.mapValue);default:throw G(23264,{he:n})}}function oA(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return X(t,e);const n=Hi(t),i=Hi(e),r=X(n.seconds,i.seconds);return r!==0?r:X(n.nanos,i.nanos)}function lA(t,e){const n=t.values||[],i=e.values||[];for(let r=0;r<n.length&&r<i.length;++r){const s=Jr(n[r],i[r]);if(s)return s}return X(n.length,i.length)}function Bo(t){return T_(t)}function T_(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const i=Hi(n);return`time(${i.seconds},${i.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return ji(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return q.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let i="[",r=!0;for(const s of n.values||[])r?r=!1:i+=",",i+=T_(s);return i+"]"}(t.arrayValue):"mapValue"in t?function(n){const i=Object.keys(n.fields||{}).sort();let r="{",s=!0;for(const a of i)s?s=!1:r+=",",r+=`${a}:${T_(n.fields[a])}`;return r+"}"}(t.mapValue):G(61005,{value:t})}function pf(t){switch(Xr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=cm(t);return e?16+pf(e):16;case 5:return 2*t.stringValue.length;case 6:return ji(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(i){return(i.values||[]).reduce((r,s)=>r+pf(s),0)}(t.arrayValue);case 10:case 11:return function(i){let r=0;return us(i.fields,(s,a)=>{r+=s.length+pf(a)}),r}(t.mapValue);default:throw G(13486,{value:t})}}function ta(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function E_(t){return!!t&&"integerValue"in t}function gc(t){return!!t&&"arrayValue"in t}function uA(t){return!!t&&"nullValue"in t}function cA(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function gf(t){return!!t&&"mapValue"in t}function hm(t){var n,i;return((i=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[Vv])==null?void 0:i.stringValue)===kv}function xu(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return us(t.mapValue.fields,(n,i)=>e.mapValue.fields[n]=xu(i)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=xu(t.arrayValue.values[n]);return e}return{...t}}function NC(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===DC}const PC={mapValue:{fields:{[Vv]:{stringValue:kv},[zo]:{arrayValue:{}}}}};function d6(t){return"nullValue"in t?mf:"booleanValue"in t?{booleanValue:!1}:"integerValue"in t||"doubleValue"in t?{doubleValue:NaN}:"timestampValue"in t?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in t?{stringValue:""}:"bytesValue"in t?{bytesValue:""}:"referenceValue"in t?ta(Wr.empty(),q.empty()):"geoPointValue"in t?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in t?{arrayValue:{}}:"mapValue"in t?hm(t)?PC:{mapValue:{}}:G(35942,{value:t})}function m6(t){return"nullValue"in t?{booleanValue:!1}:"booleanValue"in t?{doubleValue:NaN}:"integerValue"in t||"doubleValue"in t?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in t?{stringValue:""}:"stringValue"in t?{bytesValue:""}:"bytesValue"in t?ta(Wr.empty(),q.empty()):"referenceValue"in t?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in t?{arrayValue:{}}:"arrayValue"in t?PC:"mapValue"in t?hm(t)?{mapValue:{}}:Sr:G(61959,{value:t})}function hA(t,e){const n=Jr(t.value,e.value);return n!==0?n:t.inclusive&&!e.inclusive?-1:!t.inclusive&&e.inclusive?1:0}function fA(t,e){const n=Jr(t.value,e.value);return n!==0?n:t.inclusive&&!e.inclusive?1:!t.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.value=e}static empty(){return new At({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let i=0;i<e.length-1;++i)if(n=(n.mapValue.fields||{})[e.get(i)],!gf(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=xu(n)}setAll(e){let n=Ue.emptyPath(),i={},r=[];e.forEach((a,o)=>{if(!n.isImmediateParentOf(o)){const u=this.getFieldsMap(n);this.applyChanges(u,i,r),i={},r=[],n=o.popLast()}a?i[o.lastSegment()]=xu(a):r.push(o.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,i,r)}delete(e){const n=this.field(e.popLast());gf(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return pi(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let i=0;i<e.length;++i){let r=n.mapValue.fields[e.get(i)];gf(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(i)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,i){us(n,(r,s)=>e[r]=s);for(const r of i)delete e[r]}clone(){return new At(xu(this.value))}}function OC(t){const e=[];return us(t.fields,(n,i)=>{const r=new Ue([n]);if(gf(i)){const s=OC(i.mapValue).fields;if(s.length===0)e.push(r);else for(const a of s)e.push(r.child(a))}else e.push(r)}),new en(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,n,i,r,s,a,o){this.key=e,this.documentType=n,this.version=i,this.readTime=r,this.createTime=s,this.data=a,this.documentState=o}static newInvalidDocument(e){return new Pe(e,0,Y.min(),Y.min(),Y.min(),At.empty(),0)}static newFoundDocument(e,n,i,r){return new Pe(e,1,n,Y.min(),i,r,0)}static newNoDocument(e,n){return new Pe(e,2,n,Y.min(),Y.min(),At.empty(),0)}static newUnknownDocument(e,n){return new Pe(e,3,n,Y.min(),Y.min(),At.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Pe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Pe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,n){this.position=e,this.inclusive=n}}function dA(t,e,n){let i=0;for(let r=0;r<t.position.length;r++){const s=e[r],a=t.position[r];if(s.field.isKeyField()?i=q.comparator(q.fromName(a.referenceValue),n.key):i=Jr(a,n.data.field(s.field)),s.dir==="desc"&&(i*=-1),i!==0)break}return i}function mA(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!pi(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(e,n="asc"){this.field=e,this.dir=n}}function p6(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VC{}class ue extends VC{constructor(e,n,i){super(),this.field=e,this.op=n,this.value=i}static create(e,n,i){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,i):new g6(e,n,i):n==="array-contains"?new v6(e,i):n==="in"?new zC(e,i):n==="not-in"?new T6(e,i):n==="array-contains-any"?new E6(e,i):new ue(e,n,i)}static createKeyFieldInFilter(e,n,i){return n==="in"?new _6(e,i):new y6(e,i)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Jr(n,this.value)):n!==null&&Xr(this.value)===Xr(n)&&this.matchesComparison(Jr(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ye extends VC{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new ye(e,n)}matches(e){return Fo(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Fo(t){return t.op==="and"}function w_(t){return t.op==="or"}function Mv(t){return kC(t)&&Fo(t)}function kC(t){for(const e of t.filters)if(e instanceof ye)return!1;return!0}function I_(t){if(t instanceof ue)return t.field.canonicalString()+t.op.toString()+Bo(t.value);if(Mv(t))return t.filters.map(e=>I_(e)).join(",");{const e=t.filters.map(n=>I_(n)).join(",");return`${t.op}(${e})`}}function MC(t,e){return t instanceof ue?function(i,r){return r instanceof ue&&i.op===r.op&&i.field.isEqual(r.field)&&pi(i.value,r.value)}(t,e):t instanceof ye?function(i,r){return r instanceof ye&&i.op===r.op&&i.filters.length===r.filters.length?i.filters.reduce((s,a,o)=>s&&MC(a,r.filters[o]),!0):!1}(t,e):void G(19439)}function xC(t,e){const n=t.filters.concat(e);return ye.create(n,t.op)}function LC(t){return t instanceof ue?function(n){return`${n.field.canonicalString()} ${n.op} ${Bo(n.value)}`}(t):t instanceof ye?function(n){return n.op.toString()+" {"+n.getFilters().map(LC).join(" ,")+"}"}(t):"Filter"}class g6 extends ue{constructor(e,n,i){super(e,n,i),this.key=q.fromName(i.referenceValue)}matches(e){const n=q.comparator(e.key,this.key);return this.matchesComparison(n)}}class _6 extends ue{constructor(e,n){super(e,"in",n),this.keys=UC("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class y6 extends ue{constructor(e,n){super(e,"not-in",n),this.keys=UC("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function UC(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(i=>q.fromName(i.referenceValue))}class v6 extends ue{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return gc(n)&&pc(n.arrayValue,this.value)}}class zC extends ue{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&pc(this.value.arrayValue,n)}}class T6 extends ue{constructor(e,n){super(e,"not-in",n)}matches(e){if(pc(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!pc(this.value.arrayValue,n)}}class E6 extends ue{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!gc(n)||!n.arrayValue.values)&&n.arrayValue.values.some(i=>pc(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w6{constructor(e,n=null,i=[],r=[],s=null,a=null,o=null){this.path=e,this.collectionGroup=n,this.orderBy=i,this.filters=r,this.limit=s,this.startAt=a,this.endAt=o,this.Te=null}}function A_(t,e=null,n=[],i=[],r=null,s=null,a=null){return new w6(t,e,n,i,r,s,a)}function na(t){const e=j(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(i=>I_(i)).join(","),n+="|ob:",n+=e.orderBy.map(i=>function(s){return s.field.canonicalString()+s.dir}(i)).join(","),Kc(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(i=>Bo(i)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(i=>Bo(i)).join(",")),e.Te=n}return e.Te}function Yc(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!p6(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!MC(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!mA(t.startAt,e.startAt)&&mA(t.endAt,e.endAt)}function cd(t){return q.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function hd(t,e){return t.filters.filter(n=>n instanceof ue&&n.field.isEqual(e))}function pA(t,e,n){let i=mf,r=!0;for(const s of hd(t,e)){let a=mf,o=!0;switch(s.op){case"<":case"<=":a=d6(s.value);break;case"==":case"in":case">=":a=s.value;break;case">":a=s.value,o=!1;break;case"!=":case"not-in":a=mf}hA({value:i,inclusive:r},{value:a,inclusive:o})<0&&(i=a,r=o)}if(n!==null){for(let s=0;s<t.orderBy.length;++s)if(t.orderBy[s].field.isEqual(e)){const a=n.position[s];hA({value:i,inclusive:r},{value:a,inclusive:n.inclusive})<0&&(i=a,r=n.inclusive);break}}return{value:i,inclusive:r}}function gA(t,e,n){let i=Sr,r=!0;for(const s of hd(t,e)){let a=Sr,o=!0;switch(s.op){case">=":case">":a=m6(s.value),o=!1;break;case"==":case"in":case"<=":a=s.value;break;case"<":a=s.value,o=!1;break;case"!=":case"not-in":a=Sr}fA({value:i,inclusive:r},{value:a,inclusive:o})>0&&(i=a,r=o)}if(n!==null){for(let s=0;s<t.orderBy.length;++s)if(t.orderBy[s].field.isEqual(e)){const a=n.position[s];fA({value:i,inclusive:r},{value:a,inclusive:n.inclusive})>0&&(i=a,r=n.inclusive);break}}return{value:i,inclusive:r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,n=null,i=[],r=[],s=null,a="F",o=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=i,this.filters=r,this.limit=s,this.limitType=a,this.startAt=o,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function BC(t,e,n,i,r,s,a,o){return new $i(t,e,n,i,r,s,a,o)}function hl(t){return new $i(t)}function _A(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function xv(t){return t.collectionGroup!==null}function go(t){const e=j(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),n.add(s.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let o=new ve(Ue.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(o=o.add(c.field))})}),o})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new _c(s,i))}),n.has(Ue.keyField().canonicalString())||e.Ie.push(new _c(Ue.keyField(),i))}return e.Ie}function jt(t){const e=j(t);return e.Ee||(e.Ee=I6(e,go(t))),e.Ee}function I6(t,e){if(t.limitType==="F")return A_(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(r=>{const s=r.dir==="desc"?"asc":"desc";return new _c(r.field,s)});const n=t.endAt?new Zr(t.endAt.position,t.endAt.inclusive):null,i=t.startAt?new Zr(t.startAt.position,t.startAt.inclusive):null;return A_(t.path,t.collectionGroup,e,t.filters,t.limit,n,i)}}function b_(t,e){const n=t.filters.concat([e]);return new $i(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function fd(t,e,n){return new $i(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function $c(t,e){return Yc(jt(t),jt(e))&&t.limitType===e.limitType}function FC(t){return`${na(jt(t))}|lt:${t.limitType}`}function Fa(t){return`Query(target=${function(n){let i=n.path.canonicalString();return n.collectionGroup!==null&&(i+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(i+=`, filters: [${n.filters.map(r=>LC(r)).join(", ")}]`),Kc(n.limit)||(i+=", limit: "+n.limit),n.orderBy.length>0&&(i+=`, orderBy: [${n.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),n.startAt&&(i+=", startAt: ",i+=n.startAt.inclusive?"b:":"a:",i+=n.startAt.position.map(r=>Bo(r)).join(",")),n.endAt&&(i+=", endAt: ",i+=n.endAt.inclusive?"a:":"b:",i+=n.endAt.position.map(r=>Bo(r)).join(",")),`Target(${i})`}(jt(t))}; limitType=${t.limitType})`}function Wc(t,e){return e.isFoundDocument()&&function(i,r){const s=r.key.path;return i.collectionGroup!==null?r.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(s):q.isDocumentKey(i.path)?i.path.isEqual(s):i.path.isImmediateParentOf(s)}(t,e)&&function(i,r){for(const s of go(i))if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(t,e)&&function(i,r){for(const s of i.filters)if(!s.matches(r))return!1;return!0}(t,e)&&function(i,r){return!(i.startAt&&!function(a,o,u){const c=dA(a,o,u);return a.inclusive?c<=0:c<0}(i.startAt,go(i),r)||i.endAt&&!function(a,o,u){const c=dA(a,o,u);return a.inclusive?c>=0:c>0}(i.endAt,go(i),r))}(t,e)}function qC(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function HC(t){return(e,n)=>{let i=!1;for(const r of go(t)){const s=A6(r,e,n);if(s!==0)return s;i=i||r.field.isKeyField()}return 0}}function A6(t,e,n){const i=t.field.isKeyField()?q.comparator(e.key,n.key):function(s,a,o){const u=a.data.field(s),c=o.data.field(s);return u!==null&&c!==null?Jr(u,c):G(42886)}(t.field,e,n);switch(t.dir){case"asc":return i;case"desc":return-1*i;default:return G(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),i=this.inner[n];if(i!==void 0){for(const[r,s]of i)if(this.equalsFn(r,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const i=this.mapKeyFn(e),r=this.inner[i];if(r===void 0)return this.inner[i]=[[e,n]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return void(r[s]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return!1;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return i.length===1?delete this.inner[n]:i.splice(r,1),this.innerSize--,!0;return!1}forEach(e){us(this.inner,(n,i)=>{for(const[r,s]of i)e(r,s)})}isEmpty(){return IC(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b6=new Re(q.comparator);function tn(){return b6}const jC=new Re(q.comparator);function lu(...t){let e=jC;for(const n of t)e=e.insert(n.key,n);return e}function GC(t){let e=jC;return t.forEach((n,i)=>e=e.insert(n,i.overlayedDocument)),e}function oi(){return Lu()}function KC(){return Lu()}function Lu(){return new Wi(t=>t.toString(),(t,e)=>t.isEqual(e))}const S6=new Re(q.comparator),R6=new ve(q.comparator);function te(...t){let e=R6;for(const n of t)e=e.add(n);return e}const C6=new ve(X);function Lv(){return C6}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uv(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:cc(e)?"-0":e}}function QC(t){return{integerValue:""+t}}function YC(t,e){return fC(e)?QC(e):Uv(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(){this._=void 0}}function D6(t,e,n){return t instanceof qo?function(r,s){const a={fields:{[SC]:{stringValue:bC},[CC]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&um(s)&&(s=cm(s)),s&&(a.fields[RC]=s),{mapValue:a}}(n,e):t instanceof ia?WC(t,e):t instanceof ra?XC(t,e):function(r,s){const a=$C(r,s),o=yA(a)+yA(r.Ae);return E_(a)&&E_(r.Ae)?QC(o):Uv(r.serializer,o)}(t,e)}function N6(t,e,n){return t instanceof ia?WC(t,e):t instanceof ra?XC(t,e):n}function $C(t,e){return t instanceof Ho?function(i){return E_(i)||function(s){return!!s&&"doubleValue"in s}(i)}(e)?e:{integerValue:0}:null}class qo extends fm{}class ia extends fm{constructor(e){super(),this.elements=e}}function WC(t,e){const n=JC(e);for(const i of t.elements)n.some(r=>pi(r,i))||n.push(i);return{arrayValue:{values:n}}}class ra extends fm{constructor(e){super(),this.elements=e}}function XC(t,e){let n=JC(e);for(const i of t.elements)n=n.filter(r=>!pi(r,i));return{arrayValue:{values:n}}}class Ho extends fm{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function yA(t){return Le(t.integerValue||t.doubleValue)}function JC(t){return gc(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(e,n){this.field=e,this.transform=n}}function P6(t,e){return t.field.isEqual(e.field)&&function(i,r){return i instanceof ia&&r instanceof ia||i instanceof ra&&r instanceof ra?Vo(i.elements,r.elements,pi):i instanceof Ho&&r instanceof Ho?pi(i.Ae,r.Ae):i instanceof qo&&r instanceof qo}(t.transform,e.transform)}class O6{constructor(e,n){this.version=e,this.transformResults=n}}class ze{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new ze}static exists(e){return new ze(void 0,e)}static updateTime(e){return new ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function _f(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class dm{}function ZC(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new dl(t.key,ze.none()):new fl(t.key,t.data,ze.none());{const n=t.data,i=At.empty();let r=new ve(Ue.comparator);for(let s of e.fields)if(!r.has(s)){let a=n.field(s);a===null&&s.length>1&&(s=s.popLast(),a=n.field(s)),a===null?i.delete(s):i.set(s,a),r=r.add(s)}return new Xi(t.key,i,new en(r.toArray()),ze.none())}}function V6(t,e,n){t instanceof fl?function(r,s,a){const o=r.value.clone(),u=TA(r.fieldTransforms,s,a.transformResults);o.setAll(u),s.convertToFoundDocument(a.version,o).setHasCommittedMutations()}(t,e,n):t instanceof Xi?function(r,s,a){if(!_f(r.precondition,s))return void s.convertToUnknownDocument(a.version);const o=TA(r.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(eD(r)),u.setAll(o),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(t,e,n):function(r,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,n)}function Uu(t,e,n,i){return t instanceof fl?function(s,a,o,u){if(!_f(s.precondition,a))return o;const c=s.value.clone(),h=EA(s.fieldTransforms,u,a);return c.setAll(h),a.convertToFoundDocument(a.version,c).setHasLocalMutations(),null}(t,e,n,i):t instanceof Xi?function(s,a,o,u){if(!_f(s.precondition,a))return o;const c=EA(s.fieldTransforms,u,a),h=a.data;return h.setAll(eD(s)),h.setAll(c),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),o===null?null:o.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(d=>d.field))}(t,e,n,i):function(s,a,o){return _f(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):o}(t,e,n)}function k6(t,e){let n=null;for(const i of t.fieldTransforms){const r=e.data.field(i.field),s=$C(i.transform,r||null);s!=null&&(n===null&&(n=At.empty()),n.set(i.field,s))}return n||null}function vA(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(i,r){return i===void 0&&r===void 0||!(!i||!r)&&Vo(i,r,(s,a)=>P6(s,a))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class fl extends dm{constructor(e,n,i,r=[]){super(),this.key=e,this.value=n,this.precondition=i,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Xi extends dm{constructor(e,n,i,r,s=[]){super(),this.key=e,this.data=n,this.fieldMask=i,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function eD(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const i=t.data.field(n);e.set(n,i)}}),e}function TA(t,e,n){const i=new Map;Q(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let r=0;r<n.length;r++){const s=t[r],a=s.transform,o=e.data.field(s.field);i.set(s.field,N6(a,o,n[r]))}return i}function EA(t,e,n){const i=new Map;for(const r of t){const s=r.transform,a=n.data.field(r.field);i.set(r.field,D6(s,a,e))}return i}class dl extends dm{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class zv extends dm{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{constructor(e,n,i,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=i,this.mutations=r}applyToRemoteDocument(e,n){const i=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const s=this.mutations[r];s.key.isEqual(e.key)&&V6(s,e,i[r])}}applyToLocalView(e,n){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(n=Uu(i,e,n,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(n=Uu(i,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const i=KC();return this.mutations.forEach(r=>{const s=e.get(r.key),a=s.overlayedDocument;let o=this.applyToLocalView(a,s.mutatedFields);o=n.has(r.key)?null:o;const u=ZC(a,o);u!==null&&i.set(r.key,u),a.isValidDocument()||a.convertToNoDocument(Y.min())}),i}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),te())}isEqual(e){return this.batchId===e.batchId&&Vo(this.mutations,e.mutations,(n,i)=>vA(n,i))&&Vo(this.baseMutations,e.baseMutations,(n,i)=>vA(n,i))}}class Fv{constructor(e,n,i,r){this.batch=e,this.commitVersion=n,this.mutationResults=i,this.docVersions=r}static from(e,n,i){Q(e.mutations.length===i.length,58842,{me:e.mutations.length,fe:i.length});let r=function(){return S6}();const s=e.mutations;for(let a=0;a<s.length;a++)r=r.insert(s[a].key,i[a].version);return new Fv(e,n,i,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qv{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M6{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tt,he;function tD(t){switch(t){case k.OK:return G(64938);case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0;default:return G(15467,{code:t})}}function nD(t){if(t===void 0)return Xe("GRPC error has no .code"),k.UNKNOWN;switch(t){case tt.OK:return k.OK;case tt.CANCELLED:return k.CANCELLED;case tt.UNKNOWN:return k.UNKNOWN;case tt.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case tt.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case tt.INTERNAL:return k.INTERNAL;case tt.UNAVAILABLE:return k.UNAVAILABLE;case tt.UNAUTHENTICATED:return k.UNAUTHENTICATED;case tt.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case tt.NOT_FOUND:return k.NOT_FOUND;case tt.ALREADY_EXISTS:return k.ALREADY_EXISTS;case tt.PERMISSION_DENIED:return k.PERMISSION_DENIED;case tt.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case tt.ABORTED:return k.ABORTED;case tt.OUT_OF_RANGE:return k.OUT_OF_RANGE;case tt.UNIMPLEMENTED:return k.UNIMPLEMENTED;case tt.DATA_LOSS:return k.DATA_LOSS;default:return G(39323,{code:t})}}(he=tt||(tt={}))[he.OK=0]="OK",he[he.CANCELLED=1]="CANCELLED",he[he.UNKNOWN=2]="UNKNOWN",he[he.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",he[he.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",he[he.NOT_FOUND=5]="NOT_FOUND",he[he.ALREADY_EXISTS=6]="ALREADY_EXISTS",he[he.PERMISSION_DENIED=7]="PERMISSION_DENIED",he[he.UNAUTHENTICATED=16]="UNAUTHENTICATED",he[he.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",he[he.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",he[he.ABORTED=10]="ABORTED",he[he.OUT_OF_RANGE=11]="OUT_OF_RANGE",he[he.UNIMPLEMENTED=12]="UNIMPLEMENTED",he[he.INTERNAL=13]="INTERNAL",he[he.UNAVAILABLE=14]="UNAVAILABLE",he[he.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iD(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x6=new zr([4294967295,4294967295],0);function wA(t){const e=iD().encode(t),n=new $1;return n.update(e),new Uint8Array(n.digest())}function IA(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),i=e.getUint32(4,!0),r=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new zr([n,i],0),new zr([r,s],0)]}class Hv{constructor(e,n,i){if(this.bitmap=e,this.padding=n,this.hashCount=i,n<0||n>=8)throw new uu(`Invalid padding: ${n}`);if(i<0)throw new uu(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new uu(`Invalid hash count: ${i}`);if(e.length===0&&n!==0)throw new uu(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=zr.fromNumber(this.ge)}ye(e,n,i){let r=e.add(n.multiply(zr.fromNumber(i)));return r.compare(x6)===1&&(r=new zr([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=wA(e),[i,r]=IA(n);for(let s=0;s<this.hashCount;s++){const a=this.ye(i,r,s);if(!this.we(a))return!1}return!0}static create(e,n,i){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Hv(s,r,n);return i.forEach(o=>a.insert(o)),a}insert(e){if(this.ge===0)return;const n=wA(e),[i,r]=IA(n);for(let s=0;s<this.hashCount;s++){const a=this.ye(i,r,s);this.Se(a)}}Se(e){const n=Math.floor(e/8),i=e%8;this.bitmap[n]|=1<<i}}class uu extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(e,n,i,r,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=i,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,i){const r=new Map;return r.set(e,Zc.createSynthesizedTargetChangeForCurrentChange(e,n,i)),new Jc(Y.min(),r,new Re(X),tn(),te())}}class Zc{constructor(e,n,i,r,s){this.resumeToken=e,this.current=n,this.addedDocuments=i,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,i){return new Zc(i,n,te(),te(),te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(e,n,i,r){this.be=e,this.removedTargetIds=n,this.key=i,this.De=r}}class rD{constructor(e,n){this.targetId=e,this.Ce=n}}class sD{constructor(e,n,i=Ke.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=i,this.cause=r}}class AA{constructor(){this.ve=0,this.Fe=bA(),this.Me=Ke.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=te(),n=te(),i=te();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:i=i.add(r);break;default:G(38017,{changeType:s})}}),new Zc(this.Me,this.xe,e,n,i)}qe(){this.Oe=!1,this.Fe=bA()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Q(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class L6{constructor(e){this.Ge=e,this.ze=new Map,this.je=tn(),this.Je=Lh(),this.He=Lh(),this.Ye=new Re(X)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const i=this.nt(n);switch(e.state){case 0:this.rt(n)&&i.Le(e.resumeToken);break;case 1:i.Ke(),i.Ne||i.qe(),i.Le(e.resumeToken);break;case 2:i.Ke(),i.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(i.We(),i.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),i.Le(e.resumeToken));break;default:G(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((i,r)=>{this.rt(r)&&n(r)})}st(e){const n=e.targetId,i=e.Ce.count,r=this.ot(n);if(r){const s=r.target;if(cd(s))if(i===0){const a=new q(s.path);this.et(n,a,Pe.newNoDocument(a,Y.min()))}else Q(i===1,20013,{expectedCount:i});else{const a=this._t(n);if(a!==i){const o=this.ut(e),u=o?this.ct(o,e,a):1;if(u!==0){this.it(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,c)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:i="",padding:r=0},hashCount:s=0}=n;let a,o;try{a=ji(i).toUint8Array()}catch(u){if(u instanceof AC)return mi("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{o=new Hv(a,r,s)}catch(u){return mi(u instanceof uu?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return o.ge===0?null:o}ct(e,n,i){return n.Ce.count===i-this.Pt(e,n.targetId)?0:2}Pt(e,n){const i=this.Ge.getRemoteKeysForTarget(n);let r=0;return i.forEach(s=>{const a=this.Ge.ht(),o=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(o)||(this.et(n,s,null),r++)}),r}Tt(e){const n=new Map;this.ze.forEach((s,a)=>{const o=this.ot(a);if(o){if(s.current&&cd(o.target)){const u=new q(o.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,Pe.newNoDocument(u,e))}s.Be&&(n.set(a,s.ke()),s.qe())}});let i=te();this.He.forEach((s,a)=>{let o=!0;a.forEachWhile(u=>{const c=this.ot(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(o=!1,!1)}),o&&(i=i.add(s))}),this.je.forEach((s,a)=>a.setReadTime(e));const r=new Jc(e,n,this.Ye,this.je,i);return this.je=tn(),this.Je=Lh(),this.He=Lh(),this.Ye=new Re(X),r}Xe(e,n){if(!this.rt(e))return;const i=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,i),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,i){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,n)?r.Qe(n,1):r.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),i&&(this.je=this.je.insert(n,i))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new AA,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new ve(X),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new ve(X),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||U("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new AA),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function Lh(){return new Re(q.comparator)}function bA(){return new Re(q.comparator)}const U6={asc:"ASCENDING",desc:"DESCENDING"},z6={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},B6={and:"AND",or:"OR"};class F6{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function S_(t,e){return t.useProto3Json||Kc(e)?e:{value:e}}function jo(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function aD(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function q6(t,e){return jo(t,e.toTimestamp())}function Ze(t){return Q(!!t,49232),Y.fromTimestamp(function(n){const i=Hi(n);return new pe(i.seconds,i.nanos)}(t))}function jv(t,e){return R_(t,e).canonicalString()}function R_(t,e){const n=function(r){return new oe(["projects",r.projectId,"databases",r.database])}(t).child("documents");return e===void 0?n:n.child(e)}function oD(t){const e=oe.fromString(t);return Q(_D(e),10190,{key:e.toString()}),e}function yc(t,e){return jv(t.databaseId,e.path)}function hi(t,e){const n=oD(e);if(n.get(1)!==t.databaseId.projectId)throw new L(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new L(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new q(cD(n))}function lD(t,e){return jv(t.databaseId,e)}function uD(t){const e=oD(t);return e.length===4?oe.emptyPath():cD(e)}function C_(t){return new oe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function cD(t){return Q(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function SA(t,e,n){return{name:yc(t,e),fields:n.value.mapValue.fields}}function hD(t,e,n){const i=hi(t,e.name),r=Ze(e.updateTime),s=e.createTime?Ze(e.createTime):Y.min(),a=new At({mapValue:{fields:e.fields}}),o=Pe.newFoundDocument(i,r,s,a);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function H6(t,e){return"found"in e?function(i,r){Q(!!r.found,43571),r.found.name,r.found.updateTime;const s=hi(i,r.found.name),a=Ze(r.found.updateTime),o=r.found.createTime?Ze(r.found.createTime):Y.min(),u=new At({mapValue:{fields:r.found.fields}});return Pe.newFoundDocument(s,a,o,u)}(t,e):"missing"in e?function(i,r){Q(!!r.missing,3894),Q(!!r.readTime,22933);const s=hi(i,r.missing),a=Ze(r.readTime);return Pe.newNoDocument(s,a)}(t,e):G(7234,{result:e})}function j6(t,e){let n;if("targetChange"in e){e.targetChange;const i=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:G(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],s=function(c,h){return c.useProto3Json?(Q(h===void 0||typeof h=="string",58123),Ke.fromBase64String(h||"")):(Q(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),Ke.fromUint8Array(h||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,o=a&&function(c){const h=c.code===void 0?k.UNKNOWN:nD(c.code);return new L(h,c.message||"")}(a);n=new sD(i,r,s,o||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const r=hi(t,i.document.name),s=Ze(i.document.updateTime),a=i.document.createTime?Ze(i.document.createTime):Y.min(),o=new At({mapValue:{fields:i.document.fields}}),u=Pe.newFoundDocument(r,s,a,o),c=i.targetIds||[],h=i.removedTargetIds||[];n=new yf(c,h,u.key,u)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const r=hi(t,i.document),s=i.readTime?Ze(i.readTime):Y.min(),a=Pe.newNoDocument(r,s),o=i.removedTargetIds||[];n=new yf([],o,a.key,a)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const r=hi(t,i.document),s=i.removedTargetIds||[];n=new yf([],s,r,null)}else{if(!("filter"in e))return G(11601,{Rt:e});{e.filter;const i=e.filter;i.targetId;const{count:r=0,unchangedNames:s}=i,a=new M6(r,s),o=i.targetId;n=new rD(o,a)}}return n}function vc(t,e){let n;if(e instanceof fl)n={update:SA(t,e.key,e.value)};else if(e instanceof dl)n={delete:yc(t,e.key)};else if(e instanceof Xi)n={update:SA(t,e.key,e.data),updateMask:W6(e.fieldMask)};else{if(!(e instanceof zv))return G(16599,{Vt:e.type});n={verify:yc(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(i=>function(s,a){const o=a.transform;if(o instanceof qo)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof ia)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof ra)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Ho)return{fieldPath:a.field.canonicalString(),increment:o.Ae};throw G(20930,{transform:a.transform})}(0,i))),e.precondition.isNone||(n.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:q6(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:G(27497)}(t,e.precondition)),n}function D_(t,e){const n=e.currentDocument?function(s){return s.updateTime!==void 0?ze.updateTime(Ze(s.updateTime)):s.exists!==void 0?ze.exists(s.exists):ze.none()}(e.currentDocument):ze.none(),i=e.updateTransforms?e.updateTransforms.map(r=>function(a,o){let u=null;if("setToServerValue"in o)Q(o.setToServerValue==="REQUEST_TIME",16630,{proto:o}),u=new qo;else if("appendMissingElements"in o){const h=o.appendMissingElements.values||[];u=new ia(h)}else if("removeAllFromArray"in o){const h=o.removeAllFromArray.values||[];u=new ra(h)}else"increment"in o?u=new Ho(a,o.increment):G(16584,{proto:o});const c=Ue.fromServerFormat(o.fieldPath);return new Xc(c,u)}(t,r)):[];if(e.update){e.update.name;const r=hi(t,e.update.name),s=new At({mapValue:{fields:e.update.fields}});if(e.updateMask){const a=function(u){const c=u.fieldPaths||[];return new en(c.map(h=>Ue.fromServerFormat(h)))}(e.updateMask);return new Xi(r,s,a,n,i)}return new fl(r,s,n,i)}if(e.delete){const r=hi(t,e.delete);return new dl(r,n)}if(e.verify){const r=hi(t,e.verify);return new zv(r,n)}return G(1463,{proto:e})}function G6(t,e){return t&&t.length>0?(Q(e!==void 0,14353),t.map(n=>function(r,s){let a=r.updateTime?Ze(r.updateTime):Ze(s);return a.isEqual(Y.min())&&(a=Ze(s)),new O6(a,r.transformResults||[])}(n,e))):[]}function fD(t,e){return{documents:[lD(t,e.path)]}}function dD(t,e){const n={structuredQuery:{}},i=e.path;let r;e.collectionGroup!==null?(r=i,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=i.popLast(),n.structuredQuery.from=[{collectionId:i.lastSegment()}]),n.parent=lD(t,r);const s=function(c){if(c.length!==0)return gD(ye.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const a=function(c){if(c.length!==0)return c.map(h=>function(m){return{field:qa(m.field),direction:Q6(m.dir)}}(h))}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const o=S_(t,e.limit);return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{ft:n,parent:r}}function mD(t){let e=uD(t.parent);const n=t.structuredQuery,i=n.from?n.from.length:0;let r=null;if(i>0){Q(i===1,65062);const h=n.from[0];h.allDescendants?r=h.collectionId:e=e.child(h.collectionId)}let s=[];n.where&&(s=function(d){const m=pD(d);return m instanceof ye&&Mv(m)?m.getFilters():[m]}(n.where));let a=[];n.orderBy&&(a=function(d){return d.map(m=>function(R){return new _c(Ha(R.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(m))}(n.orderBy));let o=null;n.limit&&(o=function(d){let m;return m=typeof d=="object"?d.value:d,Kc(m)?null:m}(n.limit));let u=null;n.startAt&&(u=function(d){const m=!!d.before,g=d.values||[];return new Zr(g,m)}(n.startAt));let c=null;return n.endAt&&(c=function(d){const m=!d.before,g=d.values||[];return new Zr(g,m)}(n.endAt)),BC(e,r,a,s,o,"F",u,c)}function K6(t,e){const n=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:r})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function pD(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const i=Ha(n.unaryFilter.field);return ue.create(i,"==",{doubleValue:NaN});case"IS_NULL":const r=Ha(n.unaryFilter.field);return ue.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Ha(n.unaryFilter.field);return ue.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ha(n.unaryFilter.field);return ue.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}}(t):t.fieldFilter!==void 0?function(n){return ue.create(Ha(n.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return ye.create(n.compositeFilter.filters.map(i=>pD(i)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return G(1026)}}(n.compositeFilter.op))}(t):G(30097,{filter:t})}function Q6(t){return U6[t]}function Y6(t){return z6[t]}function $6(t){return B6[t]}function qa(t){return{fieldPath:t.canonicalString()}}function Ha(t){return Ue.fromServerFormat(t.fieldPath)}function gD(t){return t instanceof ue?function(n){if(n.op==="=="){if(cA(n.value))return{unaryFilter:{field:qa(n.field),op:"IS_NAN"}};if(uA(n.value))return{unaryFilter:{field:qa(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(cA(n.value))return{unaryFilter:{field:qa(n.field),op:"IS_NOT_NAN"}};if(uA(n.value))return{unaryFilter:{field:qa(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:qa(n.field),op:Y6(n.op),value:n.value}}}(t):t instanceof ye?function(n){const i=n.getFilters().map(r=>gD(r));return i.length===1?i[0]:{compositeFilter:{op:$6(n.op),filters:i}}}(t):G(54877,{filter:t})}function W6(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function _D(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,n,i,r,s=Y.min(),a=Y.min(),o=Ke.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=i,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=o,this.expectedCount=u}withSequenceNumber(e){return new Di(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Di(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Di(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Di(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yD{constructor(e){this.yt=e}}function X6(t,e){let n;if(e.document)n=hD(t.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const i=q.fromSegments(e.noDocument.path),r=aa(e.noDocument.readTime);n=Pe.newNoDocument(i,r),e.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!e.unknownDocument)return G(56709);{const i=q.fromSegments(e.unknownDocument.path),r=aa(e.unknownDocument.version);n=Pe.newUnknownDocument(i,r)}}return e.readTime&&n.setReadTime(function(r){const s=new pe(r[0],r[1]);return Y.fromTimestamp(s)}(e.readTime)),n}function RA(t,e){const n=e.key,i={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:dd(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())i.document=function(s,a){return{name:yc(s,a.key),fields:a.data.value.mapValue.fields,updateTime:jo(s,a.version.toTimestamp()),createTime:jo(s,a.createTime.toTimestamp())}}(t.yt,e);else if(e.isNoDocument())i.noDocument={path:n.path.toArray(),readTime:sa(e.version)};else{if(!e.isUnknownDocument())return G(57904,{document:e});i.unknownDocument={path:n.path.toArray(),version:sa(e.version)}}return i}function dd(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function sa(t){const e=t.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function aa(t){const e=new pe(t.seconds,t.nanoseconds);return Y.fromTimestamp(e)}function Ds(t,e){const n=(e.baseMutations||[]).map(s=>D_(t.yt,s));for(let s=0;s<e.mutations.length-1;++s){const a=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const o=e.mutations[s+1];a.updateTransforms=o.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const i=e.mutations.map(s=>D_(t.yt,s)),r=pe.fromMillis(e.localWriteTimeMs);return new Bv(e.batchId,r,n,i)}function cu(t){const e=aa(t.readTime),n=t.lastLimboFreeSnapshotVersion!==void 0?aa(t.lastLimboFreeSnapshotVersion):Y.min();let i;return i=function(s){return s.documents!==void 0}(t.query)?function(s){const a=s.documents.length;return Q(a===1,1966,{count:a}),jt(hl(uD(s.documents[0])))}(t.query):function(s){return jt(mD(s))}(t.query),new Di(i,t.targetId,"TargetPurposeListen",t.lastListenSequenceNumber,e,n,Ke.fromBase64String(t.resumeToken))}function vD(t,e){const n=sa(e.snapshotVersion),i=sa(e.lastLimboFreeSnapshotVersion);let r;r=cd(e.target)?fD(t.yt,e.target):dD(t.yt,e.target).ft;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:na(e.target),readTime:n,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:i,query:r}}function Gv(t){const e=mD({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?fd(e,e.limit,"L"):e}function $p(t,e){return new qv(e.largestBatchId,D_(t.yt,e.overlayMutation))}function CA(t,e){const n=e.path.lastSegment();return[t,xt(e.path.popLast()),n]}function DA(t,e,n,i){return{indexId:t,uid:e,sequenceNumber:n,readTime:sa(i.readTime),documentKey:xt(i.documentKey.path),largestBatchId:i.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J6{getBundleMetadata(e,n){return NA(e).get(n).next(i=>{if(i)return function(s){return{id:s.bundleId,createTime:aa(s.createTime),version:s.version}}(i)})}saveBundleMetadata(e,n){return NA(e).put(function(r){return{bundleId:r.id,createTime:sa(Ze(r.createTime)),version:r.version}}(n))}getNamedQuery(e,n){return PA(e).get(n).next(i=>{if(i)return function(s){return{name:s.name,query:Gv(s.bundledQuery),readTime:aa(s.readTime)}}(i)})}saveNamedQuery(e,n){return PA(e).put(function(r){return{name:r.name,readTime:sa(Ze(r.readTime)),bundledQuery:r.bundledQuery}}(n))}}function NA(t){return ft(t,am)}function PA(t){return ft(t,om)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(e,n){this.serializer=e,this.userId=n}static wt(e,n){const i=n.uid||"";return new mm(e,i)}getOverlay(e,n){return Ql(e).get(CA(this.userId,n)).next(i=>i?$p(this.serializer,i):null)}getOverlays(e,n){const i=oi();return N.forEach(n,r=>this.getOverlay(e,r).next(s=>{s!==null&&i.set(r,s)})).next(()=>i)}saveOverlays(e,n,i){const r=[];return i.forEach((s,a)=>{const o=new qv(n,a);r.push(this.St(e,o))}),N.waitFor(r)}removeOverlaysForBatchId(e,n,i){const r=new Set;n.forEach(a=>r.add(xt(a.getCollectionPath())));const s=[];return r.forEach(a=>{const o=IDBKeyRange.bound([this.userId,a,i],[this.userId,a,i+1],!1,!0);s.push(Ql(e).Z(y_,o))}),N.waitFor(s)}getOverlaysForCollection(e,n,i){const r=oi(),s=xt(n),a=IDBKeyRange.bound([this.userId,s,i],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Ql(e).J(y_,a).next(o=>{for(const u of o){const c=$p(this.serializer,u);r.set(c.getKey(),c)}return r})}getOverlaysForCollectionGroup(e,n,i,r){const s=oi();let a;const o=IDBKeyRange.bound([this.userId,n,i],[this.userId,n,Number.POSITIVE_INFINITY],!0);return Ql(e).ee({index:yC,range:o},(u,c,h)=>{const d=$p(this.serializer,c);s.size()<r||d.largestBatchId===a?(s.set(d.getKey(),d),a=d.largestBatchId):h.done()}).next(()=>s)}St(e,n){return Ql(e).put(function(r,s,a){const[o,u,c]=CA(s,a.mutation.key);return{userId:s,collectionPath:u,documentId:c,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:vc(r.yt,a.mutation)}}(this.serializer,this.userId,n))}}function Ql(t){return ft(t,lm)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z6{bt(e){return ft(e,Pv)}getSessionToken(e){return this.bt(e).get("sessionToken").next(n=>{const i=n==null?void 0:n.value;return i?Ke.fromUint8Array(i):Ke.EMPTY_BYTE_STRING})}setSessionToken(e,n){return this.bt(e).put({name:"sessionToken",value:n.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(){}Dt(e,n){this.Ct(e,n),n.vt()}Ct(e,n){if("nullValue"in e)this.Ft(n,5);else if("booleanValue"in e)this.Ft(n,10),n.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(n,15),n.Mt(Le(e.integerValue));else if("doubleValue"in e){const i=Le(e.doubleValue);isNaN(i)?this.Ft(n,13):(this.Ft(n,15),cc(i)?n.Mt(0):n.Mt(i))}else if("timestampValue"in e){let i=e.timestampValue;this.Ft(n,20),typeof i=="string"&&(i=Hi(i)),n.xt(`${i.seconds||""}`),n.Mt(i.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,n),this.Nt(n);else if("bytesValue"in e)this.Ft(n,30),n.Bt(ji(e.bytesValue)),this.Nt(n);else if("referenceValue"in e)this.Lt(e.referenceValue,n);else if("geoPointValue"in e){const i=e.geoPointValue;this.Ft(n,45),n.Mt(i.latitude||0),n.Mt(i.longitude||0)}else"mapValue"in e?NC(e)?this.Ft(n,Number.MAX_SAFE_INTEGER):hm(e)?this.kt(e.mapValue,n):(this.qt(e.mapValue,n),this.Nt(n)):"arrayValue"in e?(this.Qt(e.arrayValue,n),this.Nt(n)):G(19022,{$t:e})}Ot(e,n){this.Ft(n,25),this.Ut(e,n)}Ut(e,n){n.xt(e)}qt(e,n){const i=e.fields||{};this.Ft(n,55);for(const r of Object.keys(i))this.Ot(r,n),this.Ct(i[r],n)}kt(e,n){var a,o;const i=e.fields||{};this.Ft(n,53);const r=zo,s=((o=(a=i[r].arrayValue)==null?void 0:a.values)==null?void 0:o.length)||0;this.Ft(n,15),n.Mt(Le(s)),this.Ot(r,n),this.Ct(i[r],n)}Qt(e,n){const i=e.values||[];this.Ft(n,50);for(const r of i)this.Ct(r,n)}Lt(e,n){this.Ft(n,37),q.fromName(e).path.forEach(i=>{this.Ft(n,60),this.Ut(i,n)})}Ft(e,n){e.Mt(n)}Nt(e){e.Mt(2)}}Ns.Kt=new Ns;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oa=255;function e3(t){if(t===0)return 8;let e=0;return t>>4||(e+=4,t<<=4),t>>6||(e+=2,t<<=2),t>>7||(e+=1),e}function OA(t){const e=64-function(i){let r=0;for(let s=0;s<8;++s){const a=e3(255&i[s]);if(r+=a,a!==8)break}return r}(t);return Math.ceil(e/8)}class t3{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(e){const n=e[Symbol.iterator]();let i=n.next();for(;!i.done;)this.Gt(i.value),i=n.next();this.zt()}jt(e){const n=e[Symbol.iterator]();let i=n.next();for(;!i.done;)this.Jt(i.value),i=n.next();this.Ht()}Yt(e){for(const n of e){const i=n.charCodeAt(0);if(i<128)this.Gt(i);else if(i<2048)this.Gt(960|i>>>6),this.Gt(128|63&i);else if(n<"\uD800"||"\uDBFF"<n)this.Gt(480|i>>>12),this.Gt(128|63&i>>>6),this.Gt(128|63&i);else{const r=n.codePointAt(0);this.Gt(240|r>>>18),this.Gt(128|63&r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r)}}this.zt()}Zt(e){for(const n of e){const i=n.charCodeAt(0);if(i<128)this.Jt(i);else if(i<2048)this.Jt(960|i>>>6),this.Jt(128|63&i);else if(n<"\uD800"||"\uDBFF"<n)this.Jt(480|i>>>12),this.Jt(128|63&i>>>6),this.Jt(128|63&i);else{const r=n.codePointAt(0);this.Jt(240|r>>>18),this.Jt(128|63&r>>>12),this.Jt(128|63&r>>>6),this.Jt(128|63&r)}}this.Ht()}Xt(e){const n=this.en(e),i=OA(n);this.tn(1+i),this.buffer[this.position++]=255&i;for(let r=n.length-i;r<n.length;++r)this.buffer[this.position++]=255&n[r]}nn(e){const n=this.en(e),i=OA(n);this.tn(1+i),this.buffer[this.position++]=~(255&i);for(let r=n.length-i;r<n.length;++r)this.buffer[this.position++]=~(255&n[r])}rn(){this.sn(Oa),this.sn(255)}_n(){this.an(Oa),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const n=function(s){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,s,!1),new Uint8Array(a.buffer)}(e),i=!!(128&n[0]);n[0]^=i?255:128;for(let r=1;r<n.length;++r)n[r]^=i?255:0;return n}Gt(e){const n=255&e;n===0?(this.sn(0),this.sn(255)):n===Oa?(this.sn(Oa),this.sn(0)):this.sn(n)}Jt(e){const n=255&e;n===0?(this.an(0),this.an(255)):n===Oa?(this.an(Oa),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const n=e+this.position;if(n<=this.buffer.length)return;let i=2*this.buffer.length;i<n&&(i=n);const r=new Uint8Array(i);r.set(this.buffer),this.buffer=r}}class n3{constructor(e){this.cn=e}Bt(e){this.cn.Wt(e)}xt(e){this.cn.Yt(e)}Mt(e){this.cn.Xt(e)}vt(){this.cn.rn()}}class i3{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Yl{constructor(){this.cn=new t3,this.ln=new n3(this.cn),this.hn=new i3(this.cn)}seed(e){this.cn.seed(e)}Pn(e){return e===0?this.ln:this.hn}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e,n,i,r){this.Tn=e,this.In=n,this.En=i,this.dn=r}An(){const e=this.dn.length,n=e===0||this.dn[e-1]===255?e+1:e,i=new Uint8Array(n);return i.set(this.dn,0),n!==e?i.set([0],this.dn.length):++i[i.length-1],new Ps(this.Tn,this.In,this.En,i)}Rn(e,n,i){return{indexId:this.Tn,uid:e,arrayValue:vf(this.En),directionalValue:vf(this.dn),orderedDocumentKey:vf(n),documentKey:i.path.toArray()}}Vn(e,n,i){const r=this.Rn(e,n,i);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function lr(t,e){let n=t.Tn-e.Tn;return n!==0?n:(n=VA(t.En,e.En),n!==0?n:(n=VA(t.dn,e.dn),n!==0?n:q.comparator(t.In,e.In)))}function VA(t,e){for(let n=0;n<t.length&&n<e.length;++n){const i=t[n]-e[n];if(i!==0)return i}return t.length-e.length}function vf(t){return L0()?function(n){let i="";for(let r=0;r<n.length;r++)i+=String.fromCharCode(n[r]);return i}(t):t}function kA(t){return typeof t!="string"?t:function(n){const i=new Uint8Array(n.length);for(let r=0;r<n.length;r++)i[r]=n.charCodeAt(r);return i}(t)}class MA{constructor(e){this.mn=new ve((n,i)=>Ue.comparator(n.field,i.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.fn=e.orderBy,this.gn=[];for(const n of e.filters){const i=n;i.isInequality()?this.mn=this.mn.add(i):this.gn.push(i)}}get pn(){return this.mn.size>1}yn(e){if(Q(e.collectionGroup===this.collectionId,49279),this.pn)return!1;const n=p_(e);if(n!==void 0&&!this.wn(n))return!1;const i=Ss(e);let r=new Set,s=0,a=0;for(;s<i.length&&this.wn(i[s]);++s)r=r.add(i[s].fieldPath.canonicalString());if(s===i.length)return!0;if(this.mn.size>0){const o=this.mn.getIterator().getNext();if(!r.has(o.field.canonicalString())){const u=i[s];if(!this.Sn(o,u)||!this.bn(this.fn[a++],u))return!1}++s}for(;s<i.length;++s){const o=i[s];if(a>=this.fn.length||!this.bn(this.fn[a++],o))return!1}return!0}Dn(){if(this.pn)return null;let e=new ve(Ue.comparator);const n=[];for(const i of this.gn)if(!i.field.isKeyField())if(i.op==="array-contains"||i.op==="array-contains-any")n.push(new hf(i.field,2));else{if(e.has(i.field))continue;e=e.add(i.field),n.push(new hf(i.field,0))}for(const i of this.fn)i.field.isKeyField()||e.has(i.field)||(e=e.add(i.field),n.push(new hf(i.field,i.dir==="asc"?0:1)));return new sd(sd.UNKNOWN_ID,this.collectionId,n,uc.empty())}wn(e){for(const n of this.gn)if(this.Sn(n,e))return!0;return!1}Sn(e,n){if(e===void 0||!e.field.isEqual(n.fieldPath))return!1;const i=e.op==="array-contains"||e.op==="array-contains-any";return n.kind===2===i}bn(e,n){return!!e.field.isEqual(n.fieldPath)&&(n.kind===0&&e.dir==="asc"||n.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TD(t){var n,i;if(Q(t instanceof ue||t instanceof ye,20012),t instanceof ue){if(t instanceof zC){const r=((i=(n=t.value.arrayValue)==null?void 0:n.values)==null?void 0:i.map(s=>ue.create(t.field,"==",s)))||[];return ye.create(r,"or")}return t}const e=t.filters.map(r=>TD(r));return ye.create(e,t.op)}function r3(t){if(t.getFilters().length===0)return[];const e=O_(TD(t));return Q(ED(e),7391),N_(e)||P_(e)?[e]:e.getFilters()}function N_(t){return t instanceof ue}function P_(t){return t instanceof ye&&Mv(t)}function ED(t){return N_(t)||P_(t)||function(n){if(n instanceof ye&&w_(n)){for(const i of n.getFilters())if(!N_(i)&&!P_(i))return!1;return!0}return!1}(t)}function O_(t){if(Q(t instanceof ue||t instanceof ye,34018),t instanceof ue)return t;if(t.filters.length===1)return O_(t.filters[0]);const e=t.filters.map(i=>O_(i));let n=ye.create(e,t.op);return n=md(n),ED(n)?n:(Q(n instanceof ye,64498),Q(Fo(n),40251),Q(n.filters.length>1,57927),n.filters.reduce((i,r)=>Kv(i,r)))}function Kv(t,e){let n;return Q(t instanceof ue||t instanceof ye,38388),Q(e instanceof ue||e instanceof ye,25473),n=t instanceof ue?e instanceof ue?function(r,s){return ye.create([r,s],"and")}(t,e):xA(t,e):e instanceof ue?xA(e,t):function(r,s){if(Q(r.filters.length>0&&s.filters.length>0,48005),Fo(r)&&Fo(s))return xC(r,s.getFilters());const a=w_(r)?r:s,o=w_(r)?s:r,u=a.filters.map(c=>Kv(c,o));return ye.create(u,"or")}(t,e),md(n)}function xA(t,e){if(Fo(e))return xC(e,t.getFilters());{const n=e.filters.map(i=>Kv(t,i));return ye.create(n,"or")}}function md(t){if(Q(t instanceof ue||t instanceof ye,11850),t instanceof ue)return t;const e=t.getFilters();if(e.length===1)return md(e[0]);if(kC(t))return t;const n=e.map(r=>md(r)),i=[];return n.forEach(r=>{r instanceof ue?i.push(r):r instanceof ye&&(r.op===t.op?i.push(...r.filters):i.push(r))}),i.length===1?i[0]:ye.create(i,t.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s3{constructor(){this.Cn=new Qv}addToCollectionParentIndex(e,n){return this.Cn.add(n),N.resolve()}getCollectionParents(e,n){return N.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return N.resolve()}deleteFieldIndex(e,n){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,n){return N.resolve()}getDocumentsMatchingTarget(e,n){return N.resolve(null)}getIndexType(e,n){return N.resolve(0)}getFieldIndexes(e,n){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,n){return N.resolve(In.min())}getMinOffsetFromCollectionGroup(e,n){return N.resolve(In.min())}updateCollectionGroup(e,n,i){return N.resolve()}updateIndexEntries(e,n){return N.resolve()}}class Qv{constructor(){this.index={}}add(e){const n=e.lastSegment(),i=e.popLast(),r=this.index[n]||new ve(oe.comparator),s=!r.has(i);return this.index[n]=r.add(i),s}has(e){const n=e.lastSegment(),i=e.popLast(),r=this.index[n];return r&&r.has(i)}getEntries(e){return(this.index[e]||new ve(oe.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA="IndexedDbIndexManager",Uh=new Uint8Array(0);class a3{constructor(e,n){this.databaseId=n,this.vn=new Qv,this.Fn=new Wi(i=>na(i),(i,r)=>Yc(i,r)),this.uid=e.uid||""}addToCollectionParentIndex(e,n){if(!this.vn.has(n)){const i=n.lastSegment(),r=n.popLast();e.addOnCommittedListener(()=>{this.vn.add(n)});const s={collectionId:i,parent:xt(r)};return UA(e).put(s)}return N.resolve()}getCollectionParents(e,n){const i=[],r=IDBKeyRange.bound([n,""],[iC(n),""],!1,!0);return UA(e).J(r).next(s=>{for(const a of s){if(a.collectionId!==n)break;i.push(ai(a.parent))}return i})}addFieldIndex(e,n){const i=$l(e),r=function(o){return{indexId:o.indexId,collectionGroup:o.collectionGroup,fields:o.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(n);delete r.indexId;const s=i.add(r);if(n.indexState){const a=ka(e);return s.next(o=>{a.put(DA(o,this.uid,n.indexState.sequenceNumber,n.indexState.offset))})}return s.next()}deleteFieldIndex(e,n){const i=$l(e),r=ka(e),s=Va(e);return i.delete(n.indexId).next(()=>r.delete(IDBKeyRange.bound([n.indexId],[n.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([n.indexId],[n.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const n=$l(e),i=Va(e),r=ka(e);return n.Z().next(()=>i.Z()).next(()=>r.Z())}createTargetIndexes(e,n){return N.forEach(this.Mn(n),i=>this.getIndexType(e,i).next(r=>{if(r===0||r===1){const s=new MA(i).Dn();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,n){const i=Va(e);let r=!0;const s=new Map;return N.forEach(this.Mn(n),a=>this.xn(e,a).next(o=>{r&&(r=!!o),s.set(a,o)})).next(()=>{if(r){let a=te();const o=[];return N.forEach(s,(u,c)=>{U(LA,`Using index ${function(I){return`id=${I.indexId}|cg=${I.collectionGroup}|f=${I.fields.map(C=>`${C.fieldPath}:${C.kind}`).join(",")}`}(u)} to execute ${na(n)}`);const h=function(I,C){const z=p_(C);if(z===void 0)return null;for(const F of hd(I,z.fieldPath))switch(F.op){case"array-contains-any":return F.value.arrayValue.values||[];case"array-contains":return[F.value]}return null}(c,u),d=function(I,C){const z=new Map;for(const F of Ss(C))for(const T of hd(I,F.fieldPath))switch(T.op){case"==":case"in":z.set(F.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return z.set(F.fieldPath.canonicalString(),T.value),Array.from(z.values())}return null}(c,u),m=function(I,C){const z=[];let F=!0;for(const T of Ss(C)){const y=T.kind===0?pA(I,T.fieldPath,I.startAt):gA(I,T.fieldPath,I.startAt);z.push(y.value),F&&(F=y.inclusive)}return new Zr(z,F)}(c,u),g=function(I,C){const z=[];let F=!0;for(const T of Ss(C)){const y=T.kind===0?gA(I,T.fieldPath,I.endAt):pA(I,T.fieldPath,I.endAt);z.push(y.value),F&&(F=y.inclusive)}return new Zr(z,F)}(c,u),R=this.On(u,c,m),D=this.On(u,c,g),V=this.Nn(u,c,d),w=this.Bn(u.indexId,h,R,m.inclusive,D,g.inclusive,V);return N.forEach(w,v=>i.Y(v,n.limit).next(I=>{I.forEach(C=>{const z=q.fromSegments(C.documentKey);a.has(z)||(a=a.add(z),o.push(z))})}))}).next(()=>o)}return N.resolve(null)})}Mn(e){let n=this.Fn.get(e);return n||(e.filters.length===0?n=[e]:n=r3(ye.create(e.filters,"and")).map(i=>A_(e.path,e.collectionGroup,e.orderBy,i.getFilters(),e.limit,e.startAt,e.endAt)),this.Fn.set(e,n),n)}Bn(e,n,i,r,s,a,o){const u=(n!=null?n.length:1)*Math.max(i.length,s.length),c=u/(n!=null?n.length:1),h=[];for(let d=0;d<u;++d){const m=n?this.Ln(n[d/c]):Uh,g=this.kn(e,m,i[d%c],r),R=this.qn(e,m,s[d%c],a),D=o.map(V=>this.kn(e,m,V,!0));h.push(...this.createRange(g,R,D))}return h}kn(e,n,i,r){const s=new Ps(e,q.empty(),n,i);return r?s:s.An()}qn(e,n,i,r){const s=new Ps(e,q.empty(),n,i);return r?s.An():s}xn(e,n){const i=new MA(n),r=n.collectionGroup!=null?n.collectionGroup:n.path.lastSegment();return this.getFieldIndexes(e,r).next(s=>{let a=null;for(const o of s)i.yn(o)&&(!a||o.fields.length>a.fields.length)&&(a=o);return a})}getIndexType(e,n){let i=2;const r=this.Mn(n);return N.forEach(r,s=>this.xn(e,s).next(a=>{a?i!==0&&a.fields.length<function(u){let c=new ve(Ue.comparator),h=!1;for(const d of u.filters)for(const m of d.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?h=!0:c=c.add(m.field));for(const d of u.orderBy)d.field.isKeyField()||(c=c.add(d.field));return c.size+(h?1:0)}(s)&&(i=1):i=0})).next(()=>function(a){return a.limit!==null}(n)&&r.length>1&&i===2?1:i)}Qn(e,n){const i=new Yl;for(const r of Ss(e)){const s=n.data.field(r.fieldPath);if(s==null)return null;const a=i.Pn(r.kind);Ns.Kt.Dt(s,a)}return i.un()}Ln(e){const n=new Yl;return Ns.Kt.Dt(e,n.Pn(0)),n.un()}$n(e,n){const i=new Yl;return Ns.Kt.Dt(ta(this.databaseId,n),i.Pn(function(s){const a=Ss(s);return a.length===0?0:a[a.length-1].kind}(e))),i.un()}Nn(e,n,i){if(i===null)return[];let r=[];r.push(new Yl);let s=0;for(const a of Ss(e)){const o=i[s++];for(const u of r)if(this.Un(n,a.fieldPath)&&gc(o))r=this.Kn(r,a,o);else{const c=u.Pn(a.kind);Ns.Kt.Dt(o,c)}}return this.Wn(r)}On(e,n,i){return this.Nn(e,n,i.position)}Wn(e){const n=[];for(let i=0;i<e.length;++i)n[i]=e[i].un();return n}Kn(e,n,i){const r=[...e],s=[];for(const a of i.arrayValue.values||[])for(const o of r){const u=new Yl;u.seed(o.un()),Ns.Kt.Dt(a,u.Pn(n.kind)),s.push(u)}return s}Un(e,n){return!!e.filters.find(i=>i instanceof ue&&i.field.isEqual(n)&&(i.op==="in"||i.op==="not-in"))}getFieldIndexes(e,n){const i=$l(e),r=ka(e);return(n?i.J(__,IDBKeyRange.bound(n,n)):i.J()).next(s=>{const a=[];return N.forEach(s,o=>r.get([o.indexId,this.uid]).next(u=>{a.push(function(h,d){const m=d?new uc(d.sequenceNumber,new In(aa(d.readTime),new q(ai(d.documentKey)),d.largestBatchId)):uc.empty(),g=h.fields.map(([R,D])=>new hf(Ue.fromServerFormat(R),D));return new sd(h.indexId,h.collectionGroup,g,m)}(o,u))})).next(()=>a)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(n=>n.length===0?null:(n.sort((i,r)=>{const s=i.indexState.sequenceNumber-r.indexState.sequenceNumber;return s!==0?s:X(i.collectionGroup,r.collectionGroup)}),n[0].collectionGroup))}updateCollectionGroup(e,n,i){const r=$l(e),s=ka(e);return this.Gn(e).next(a=>r.J(__,IDBKeyRange.bound(n,n)).next(o=>N.forEach(o,u=>s.put(DA(u.indexId,this.uid,a,i)))))}updateIndexEntries(e,n){const i=new Map;return N.forEach(n,(r,s)=>{const a=i.get(r.collectionGroup);return(a?N.resolve(a):this.getFieldIndexes(e,r.collectionGroup)).next(o=>(i.set(r.collectionGroup,o),N.forEach(o,u=>this.zn(e,r,u).next(c=>{const h=this.jn(s,u);return c.isEqual(h)?N.resolve():this.Jn(e,s,u,c,h)}))))})}Hn(e,n,i,r){return Va(e).put(r.Rn(this.uid,this.$n(i,n.key),n.key))}Yn(e,n,i,r){return Va(e).delete(r.Vn(this.uid,this.$n(i,n.key),n.key))}zn(e,n,i){const r=Va(e);let s=new ve(lr);return r.ee({index:_C,range:IDBKeyRange.only([i.indexId,this.uid,vf(this.$n(i,n))])},(a,o)=>{s=s.add(new Ps(i.indexId,n,kA(o.arrayValue),kA(o.directionalValue)))}).next(()=>s)}jn(e,n){let i=new ve(lr);const r=this.Qn(n,e);if(r==null)return i;const s=p_(n);if(s!=null){const a=e.data.field(s.fieldPath);if(gc(a))for(const o of a.arrayValue.values||[])i=i.add(new Ps(n.indexId,e.key,this.Ln(o),r))}else i=i.add(new Ps(n.indexId,e.key,Uh,r));return i}Jn(e,n,i,r,s){U(LA,"Updating index entries for document '%s'",n.key);const a=[];return function(u,c,h,d,m){const g=u.getIterator(),R=c.getIterator();let D=Pa(g),V=Pa(R);for(;D||V;){let w=!1,v=!1;if(D&&V){const I=h(D,V);I<0?v=!0:I>0&&(w=!0)}else D!=null?v=!0:w=!0;w?(d(V),V=Pa(R)):v?(m(D),D=Pa(g)):(D=Pa(g),V=Pa(R))}}(r,s,lr,o=>{a.push(this.Hn(e,n,i,o))},o=>{a.push(this.Yn(e,n,i,o))}),N.waitFor(a)}Gn(e){let n=1;return ka(e).ee({index:gC,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(i,r,s)=>{s.done(),n=r.sequenceNumber+1}).next(()=>n)}createRange(e,n,i){i=i.sort((a,o)=>lr(a,o)).filter((a,o,u)=>!o||lr(a,u[o-1])!==0);const r=[];r.push(e);for(const a of i){const o=lr(a,e),u=lr(a,n);if(o===0)r[0]=e.An();else if(o>0&&u<0)r.push(a),r.push(a.An());else if(u>0)break}r.push(n);const s=[];for(let a=0;a<r.length;a+=2){if(this.Zn(r[a],r[a+1]))return[];const o=r[a].Vn(this.uid,Uh,q.empty()),u=r[a+1].Vn(this.uid,Uh,q.empty());s.push(IDBKeyRange.bound(o,u))}return s}Zn(e,n){return lr(e,n)>0}getMinOffsetFromCollectionGroup(e,n){return this.getFieldIndexes(e,n).next(zA)}getMinOffset(e,n){return N.mapArray(this.Mn(n),i=>this.xn(e,i).next(r=>r||G(44426))).next(zA)}}function UA(t){return ft(t,dc)}function Va(t){return ft(t,Mu)}function $l(t){return ft(t,Nv)}function ka(t){return ft(t,ku)}function zA(t){Q(t.length!==0,28825);let e=t[0].indexState.offset,n=e.largestBatchId;for(let i=1;i<t.length;i++){const r=t[i].indexState.offset;Rv(r,e)<0&&(e=r),n<r.largestBatchId&&(n=r.largestBatchId)}return new In(e.readTime,e.documentKey,n)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BA={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},wD=41943040;class Vt{static withCacheSize(e){return new Vt(e,Vt.DEFAULT_COLLECTION_PERCENTILE,Vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ID(t,e,n){const i=t.store(Fn),r=t.store(Mo),s=[],a=IDBKeyRange.only(n.batchId);let o=0;const u=i.ee({range:a},(h,d,m)=>(o++,m.delete()));s.push(u.next(()=>{Q(o===1,47070,{batchId:n.batchId})}));const c=[];for(const h of n.mutations){const d=dC(e,h.key.path,n.batchId);s.push(r.delete(d)),c.push(h.key)}return N.waitFor(s).next(()=>c)}function pd(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw G(14731);e=t.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Vt.DEFAULT_COLLECTION_PERCENTILE=10,Vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Vt.DEFAULT=new Vt(wD,Vt.DEFAULT_COLLECTION_PERCENTILE,Vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Vt.DISABLED=new Vt(-1,0,0);class pm{constructor(e,n,i,r){this.userId=e,this.serializer=n,this.indexManager=i,this.referenceDelegate=r,this.Xn={}}static wt(e,n,i,r){Q(e.uid!=="",64387);const s=e.isAuthenticated()?e.uid:"";return new pm(s,n,i,r)}checkEmpty(e){let n=!0;const i=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return ur(e).ee({index:Ms,range:i},(r,s,a)=>{n=!1,a.done()}).next(()=>n)}addMutationBatch(e,n,i,r){const s=ja(e),a=ur(e);return a.add({}).next(o=>{Q(typeof o=="number",49019);const u=new Bv(o,n,i,r),c=function(g,R,D){const V=D.baseMutations.map(v=>vc(g.yt,v)),w=D.mutations.map(v=>vc(g.yt,v));return{userId:R,batchId:D.batchId,localWriteTimeMs:D.localWriteTime.toMillis(),baseMutations:V,mutations:w}}(this.serializer,this.userId,u),h=[];let d=new ve((m,g)=>X(m.canonicalString(),g.canonicalString()));for(const m of r){const g=dC(this.userId,m.key.path,o);d=d.add(m.key.path.popLast()),h.push(a.put(c)),h.push(s.put(g,B4))}return d.forEach(m=>{h.push(this.indexManager.addToCollectionParentIndex(e,m))}),e.addOnCommittedListener(()=>{this.Xn[o]=u.keys()}),N.waitFor(h).next(()=>u)})}lookupMutationBatch(e,n){return ur(e).get(n).next(i=>i?(Q(i.userId===this.userId,48,"Unexpected user for mutation batch",{userId:i.userId,batchId:n}),Ds(this.serializer,i)):null)}er(e,n){return this.Xn[n]?N.resolve(this.Xn[n]):this.lookupMutationBatch(e,n).next(i=>{if(i){const r=i.keys();return this.Xn[n]=r,r}return null})}getNextMutationBatchAfterBatchId(e,n){const i=n+1,r=IDBKeyRange.lowerBound([this.userId,i]);let s=null;return ur(e).ee({index:Ms,range:r},(a,o,u)=>{o.userId===this.userId&&(Q(o.batchId>=i,47524,{tr:i}),s=Ds(this.serializer,o)),u.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const n=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let i=Br;return ur(e).ee({index:Ms,range:n,reverse:!0},(r,s,a)=>{i=s.batchId,a.done()}).next(()=>i)}getAllMutationBatches(e){const n=IDBKeyRange.bound([this.userId,Br],[this.userId,Number.POSITIVE_INFINITY]);return ur(e).J(Ms,n).next(i=>i.map(r=>Ds(this.serializer,r)))}getAllMutationBatchesAffectingDocumentKey(e,n){const i=ff(this.userId,n.path),r=IDBKeyRange.lowerBound(i),s=[];return ja(e).ee({range:r},(a,o,u)=>{const[c,h,d]=a,m=ai(h);if(c===this.userId&&n.path.isEqual(m))return ur(e).get(d).next(g=>{if(!g)throw G(61480,{nr:a,batchId:d});Q(g.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:g.userId,batchId:d}),s.push(Ds(this.serializer,g))});u.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let i=new ve(X);const r=[];return n.forEach(s=>{const a=ff(this.userId,s.path),o=IDBKeyRange.lowerBound(a),u=ja(e).ee({range:o},(c,h,d)=>{const[m,g,R]=c,D=ai(g);m===this.userId&&s.path.isEqual(D)?i=i.add(R):d.done()});r.push(u)}),N.waitFor(r).next(()=>this.rr(e,i))}getAllMutationBatchesAffectingQuery(e,n){const i=n.path,r=i.length+1,s=ff(this.userId,i),a=IDBKeyRange.lowerBound(s);let o=new ve(X);return ja(e).ee({range:a},(u,c,h)=>{const[d,m,g]=u,R=ai(m);d===this.userId&&i.isPrefixOf(R)?R.length===r&&(o=o.add(g)):h.done()}).next(()=>this.rr(e,o))}rr(e,n){const i=[],r=[];return n.forEach(s=>{r.push(ur(e).get(s).next(a=>{if(a===null)throw G(35274,{batchId:s});Q(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:s}),i.push(Ds(this.serializer,a))}))}),N.waitFor(r).next(()=>i)}removeMutationBatch(e,n){return ID(e.le,this.userId,n).next(i=>(e.addOnCommittedListener(()=>{this.ir(n.batchId)}),N.forEach(i,r=>this.referenceDelegate.markPotentiallyOrphaned(e,r))))}ir(e){delete this.Xn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(n=>{if(!n)return N.resolve();const i=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),r=[];return ja(e).ee({range:i},(s,a,o)=>{if(s[0]===this.userId){const u=ai(s[1]);r.push(u)}else o.done()}).next(()=>{Q(r.length===0,56720,{sr:r.map(s=>s.canonicalString())})})})}containsKey(e,n){return AD(e,this.userId,n)}_r(e){return bD(e).get(this.userId).next(n=>n||{userId:this.userId,lastAcknowledgedBatchId:Br,lastStreamToken:""})}}function AD(t,e,n){const i=ff(e,n.path),r=i[1],s=IDBKeyRange.lowerBound(i);let a=!1;return ja(t).ee({range:s,X:!0},(o,u,c)=>{const[h,d,m]=o;h===e&&d===r&&(a=!0),c.done()}).next(()=>a)}function ur(t){return ft(t,Fn)}function ja(t){return ft(t,Mo)}function bD(t){return ft(t,hc)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new oa(0)}static cr(){return new oa(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o3{constructor(e,n){this.referenceDelegate=e,this.serializer=n}allocateTargetId(e){return this.lr(e).next(n=>{const i=new oa(n.highestTargetId);return n.highestTargetId=i.next(),this.hr(e,n).next(()=>n.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.lr(e).next(n=>Y.fromTimestamp(new pe(n.lastRemoteSnapshotVersion.seconds,n.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.lr(e).next(n=>n.highestListenSequenceNumber)}setTargetsMetadata(e,n,i){return this.lr(e).next(r=>(r.highestListenSequenceNumber=n,i&&(r.lastRemoteSnapshotVersion=i.toTimestamp()),n>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=n),this.hr(e,r)))}addTargetData(e,n){return this.Pr(e,n).next(()=>this.lr(e).next(i=>(i.targetCount+=1,this.Tr(n,i),this.hr(e,i))))}updateTargetData(e,n){return this.Pr(e,n)}removeTargetData(e,n){return this.removeMatchingKeysForTargetId(e,n.targetId).next(()=>Ma(e).delete(n.targetId)).next(()=>this.lr(e)).next(i=>(Q(i.targetCount>0,8065),i.targetCount-=1,this.hr(e,i)))}removeTargets(e,n,i){let r=0;const s=[];return Ma(e).ee((a,o)=>{const u=cu(o);u.sequenceNumber<=n&&i.get(u.targetId)===null&&(r++,s.push(this.removeTargetData(e,u)))}).next(()=>N.waitFor(s)).next(()=>r)}forEachTarget(e,n){return Ma(e).ee((i,r)=>{const s=cu(r);n(s)})}lr(e){return FA(e).get(ld).next(n=>(Q(n!==null,2888),n))}hr(e,n){return FA(e).put(ld,n)}Pr(e,n){return Ma(e).put(vD(this.serializer,n))}Tr(e,n){let i=!1;return e.targetId>n.highestTargetId&&(n.highestTargetId=e.targetId,i=!0),e.sequenceNumber>n.highestListenSequenceNumber&&(n.highestListenSequenceNumber=e.sequenceNumber,i=!0),i}getTargetCount(e){return this.lr(e).next(n=>n.targetCount)}getTargetData(e,n){const i=na(n),r=IDBKeyRange.bound([i,Number.NEGATIVE_INFINITY],[i,Number.POSITIVE_INFINITY]);let s=null;return Ma(e).ee({range:r,index:pC},(a,o,u)=>{const c=cu(o);Yc(n,c.target)&&(s=c,u.done())}).next(()=>s)}addMatchingKeys(e,n,i){const r=[],s=yr(e);return n.forEach(a=>{const o=xt(a.path);r.push(s.put({targetId:i,path:o})),r.push(this.referenceDelegate.addReference(e,i,a))}),N.waitFor(r)}removeMatchingKeys(e,n,i){const r=yr(e);return N.forEach(n,s=>{const a=xt(s.path);return N.waitFor([r.delete([i,a]),this.referenceDelegate.removeReference(e,i,s)])})}removeMatchingKeysForTargetId(e,n){const i=yr(e),r=IDBKeyRange.bound([n],[n+1],!1,!0);return i.delete(r)}getMatchingKeysForTargetId(e,n){const i=IDBKeyRange.bound([n],[n+1],!1,!0),r=yr(e);let s=te();return r.ee({range:i,X:!0},(a,o,u)=>{const c=ai(a[1]),h=new q(c);s=s.add(h)}).next(()=>s)}containsKey(e,n){const i=xt(n.path),r=IDBKeyRange.bound([i],[iC(i)],!1,!0);let s=0;return yr(e).ee({index:Dv,X:!0,range:r},([a,o],u,c)=>{a!==0&&(s++,c.done())}).next(()=>s>0)}At(e,n){return Ma(e).get(n).next(i=>i?cu(i):null)}}function Ma(t){return ft(t,xo)}function FA(t){return ft(t,Gs)}function yr(t){return ft(t,Lo)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qA="LruGarbageCollector",l3=1048576;function HA([t,e],[n,i]){const r=X(t,n);return r===0?X(e,i):r}class u3{constructor(e){this.Ir=e,this.buffer=new ve(HA),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const i=this.buffer.last();HA(n,i)<0&&(this.buffer=this.buffer.delete(i).add(n))}}get maxValue(){return this.buffer.last()[0]}}class SD{constructor(e,n,i){this.garbageCollector=e,this.asyncQueue=n,this.localStore=i,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){U(qA,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){ls(n)?U(qA,"Ignoring IndexedDB error during garbage collection: ",n):await os(n)}await this.Vr(3e5)})}}class c3{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next(i=>Math.floor(n/100*i))}nthSequenceNumber(e,n){if(n===0)return N.resolve(Zt.ce);const i=new u3(n);return this.mr.forEachTarget(e,r=>i.Ar(r.sequenceNumber)).next(()=>this.mr.pr(e,r=>i.Ar(r))).next(()=>i.maxValue)}removeTargets(e,n,i){return this.mr.removeTargets(e,n,i)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(BA)):this.getCacheSize(e).next(i=>i<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),BA):this.yr(e,n))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let i,r,s,a,o,u,c;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(d=>(d>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),r=this.params.maximumSequenceNumbersToCollect):r=d,a=Date.now(),this.nthSequenceNumber(e,r))).next(d=>(i=d,o=Date.now(),this.removeTargets(e,i,n))).next(d=>(s=d,u=Date.now(),this.removeOrphanedDocuments(e,i))).next(d=>(c=Date.now(),Ba()<=se.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-h}ms
	Determined least recently used ${r} in `+(o-a)+`ms
	Removed ${s} targets in `+(u-o)+`ms
	Removed ${d} documents in `+(c-u)+`ms
Total Duration: ${c-h}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:d})))}}function RD(t,e){return new c3(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h3{constructor(e,n){this.db=e,this.garbageCollector=RD(this,n)}gr(e){const n=this.wr(e);return this.db.getTargetCache().getTargetCount(e).next(i=>n.next(r=>i+r))}wr(e){let n=0;return this.pr(e,i=>{n++}).next(()=>n)}forEachTarget(e,n){return this.db.getTargetCache().forEachTarget(e,n)}pr(e,n){return this.Sr(e,(i,r)=>n(r))}addReference(e,n,i){return zh(e,i)}removeReference(e,n,i){return zh(e,i)}removeTargets(e,n,i){return this.db.getTargetCache().removeTargets(e,n,i)}markPotentiallyOrphaned(e,n){return zh(e,n)}br(e,n){return function(r,s){let a=!1;return bD(r).te(o=>AD(r,o,s).next(u=>(u&&(a=!0),N.resolve(!u)))).next(()=>a)}(e,n)}removeOrphanedDocuments(e,n){const i=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.Sr(e,(a,o)=>{if(o<=n){const u=this.br(e,a).next(c=>{if(!c)return s++,i.getEntry(e,a).next(()=>(i.removeEntry(a,Y.min()),yr(e).delete(function(d){return[0,xt(d.path)]}(a))))});r.push(u)}}).next(()=>N.waitFor(r)).next(()=>i.apply(e)).next(()=>s)}removeTarget(e,n){const i=n.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,i)}updateLimboDocument(e,n){return zh(e,n)}Sr(e,n){const i=yr(e);let r,s=Zt.ce;return i.ee({index:Dv},([a,o],{path:u,sequenceNumber:c})=>{a===0?(s!==Zt.ce&&n(new q(ai(r)),s),s=c,r=u):s=Zt.ce}).next(()=>{s!==Zt.ce&&n(new q(ai(r)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function zh(t,e){return yr(t).put(function(i,r){return{targetId:0,path:xt(i.path),sequenceNumber:r}}(e,t.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CD{constructor(){this.changes=new Wi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Pe.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const i=this.changes.get(n);return i!==void 0?N.resolve(i):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f3{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,n,i){return Ts(e).put(i)}removeEntry(e,n,i){return Ts(e).delete(function(s,a){const o=s.path.toArray();return[o.slice(0,o.length-2),o[o.length-2],dd(a),o[o.length-1]]}(n,i))}updateMetadata(e,n){return this.getMetadata(e).next(i=>(i.byteSize+=n,this.Dr(e,i)))}getEntry(e,n){let i=Pe.newInvalidDocument(n);return Ts(e).ee({index:df,range:IDBKeyRange.only(Wl(n))},(r,s)=>{i=this.Cr(n,s)}).next(()=>i)}vr(e,n){let i={size:0,document:Pe.newInvalidDocument(n)};return Ts(e).ee({index:df,range:IDBKeyRange.only(Wl(n))},(r,s)=>{i={document:this.Cr(n,s),size:pd(s)}}).next(()=>i)}getEntries(e,n){let i=tn();return this.Fr(e,n,(r,s)=>{const a=this.Cr(r,s);i=i.insert(r,a)}).next(()=>i)}Mr(e,n){let i=tn(),r=new Re(q.comparator);return this.Fr(e,n,(s,a)=>{const o=this.Cr(s,a);i=i.insert(s,o),r=r.insert(s,pd(a))}).next(()=>({documents:i,Or:r}))}Fr(e,n,i){if(n.isEmpty())return N.resolve();let r=new ve(KA);n.forEach(u=>r=r.add(u));const s=IDBKeyRange.bound(Wl(r.first()),Wl(r.last())),a=r.getIterator();let o=a.getNext();return Ts(e).ee({index:df,range:s},(u,c,h)=>{const d=q.fromSegments([...c.prefixPath,c.collectionGroup,c.documentId]);for(;o&&KA(o,d)<0;)i(o,null),o=a.getNext();o&&o.isEqual(d)&&(i(o,c),o=a.hasNext()?a.getNext():null),o?h.j(Wl(o)):h.done()}).next(()=>{for(;o;)i(o,null),o=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(e,n,i,r,s){const a=n.path,o=[a.popLast().toArray(),a.lastSegment(),dd(i.readTime),i.documentKey.path.isEmpty()?"":i.documentKey.path.lastSegment()],u=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ts(e).J(IDBKeyRange.bound(o,u,!0)).next(c=>{s==null||s.incrementDocumentReadCount(c.length);let h=tn();for(const d of c){const m=this.Cr(q.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);m.isFoundDocument()&&(Wc(n,m)||r.has(m.key))&&(h=h.insert(m.key,m))}return h})}getAllFromCollectionGroup(e,n,i,r){let s=tn();const a=GA(n,i),o=GA(n,In.max());return Ts(e).ee({index:mC,range:IDBKeyRange.bound(a,o,!0)},(u,c,h)=>{const d=this.Cr(q.fromSegments(c.prefixPath.concat(c.collectionGroup,c.documentId)),c);s=s.insert(d.key,d),s.size===r&&h.done()}).next(()=>s)}newChangeBuffer(e){return new d3(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(n=>n.byteSize)}getMetadata(e){return jA(e).get(g_).next(n=>(Q(!!n,20021),n))}Dr(e,n){return jA(e).put(g_,n)}Cr(e,n){if(n){const i=X6(this.serializer,n);if(!(i.isNoDocument()&&i.version.isEqual(Y.min())))return i}return Pe.newInvalidDocument(e)}}function DD(t){return new f3(t)}class d3 extends CD{constructor(e,n){super(),this.Nr=e,this.trackRemovals=n,this.Br=new Wi(i=>i.toString(),(i,r)=>i.isEqual(r))}applyChanges(e){const n=[];let i=0,r=new ve((s,a)=>X(s.canonicalString(),a.canonicalString()));return this.changes.forEach((s,a)=>{const o=this.Br.get(s);if(n.push(this.Nr.removeEntry(e,s,o.readTime)),a.isValidDocument()){const u=RA(this.Nr.serializer,a);r=r.add(s.path.popLast());const c=pd(u);i+=c-o.size,n.push(this.Nr.addEntry(e,s,u))}else if(i-=o.size,this.trackRemovals){const u=RA(this.Nr.serializer,a.convertToNoDocument(Y.min()));n.push(this.Nr.addEntry(e,s,u))}}),r.forEach(s=>{n.push(this.Nr.indexManager.addToCollectionParentIndex(e,s))}),n.push(this.Nr.updateMetadata(e,i)),N.waitFor(n)}getFromCache(e,n){return this.Nr.vr(e,n).next(i=>(this.Br.set(n,{size:i.size,readTime:i.document.readTime}),i.document))}getAllFromCache(e,n){return this.Nr.Mr(e,n).next(({documents:i,Or:r})=>(r.forEach((s,a)=>{this.Br.set(s,{size:a,readTime:i.get(s).readTime})}),i))}}function jA(t){return ft(t,fc)}function Ts(t){return ft(t,od)}function Wl(t){const e=t.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function GA(t,e){const n=e.documentKey.path.toArray();return[t,dd(e.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function KA(t,e){const n=t.path.toArray(),i=e.path.toArray();let r=0;for(let s=0;s<n.length-2&&s<i.length-2;++s)if(r=X(n[s],i[s]),r)return r;return r=X(n.length,i.length),r||(r=X(n[n.length-2],i[i.length-2]),r||X(n[n.length-1],i[i.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m3{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ND{constructor(e,n,i,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=i,this.indexManager=r}getDocument(e,n){let i=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(i=r,this.remoteDocumentCache.getEntry(e,n))).next(r=>(i!==null&&Uu(i.mutation,r,en.empty(),pe.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(i=>this.getLocalViewOfDocuments(e,i,te()).next(()=>i))}getLocalViewOfDocuments(e,n,i=te()){const r=oi();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,i).next(s=>{let a=lu();return s.forEach((o,u)=>{a=a.insert(o,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,n){const i=oi();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,te()))}populateOverlays(e,n,i){const r=[];return i.forEach(s=>{n.has(s)||r.push(s)}),this.documentOverlayCache.getOverlays(e,r).next(s=>{s.forEach((a,o)=>{n.set(a,o)})})}computeViews(e,n,i,r){let s=tn();const a=Lu(),o=function(){return Lu()}();return n.forEach((u,c)=>{const h=i.get(c.key);r.has(c.key)&&(h===void 0||h.mutation instanceof Xi)?s=s.insert(c.key,c):h!==void 0?(a.set(c.key,h.mutation.getFieldMask()),Uu(h.mutation,c,h.mutation.getFieldMask(),pe.now())):a.set(c.key,en.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((c,h)=>a.set(c,h)),n.forEach((c,h)=>o.set(c,new m3(h,a.get(c)??null))),o))}recalculateAndSaveOverlays(e,n){const i=Lu();let r=new Re((a,o)=>a-o),s=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(a=>{for(const o of a)o.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let h=i.get(u)||en.empty();h=o.applyToLocalView(c,h),i.set(u,h);const d=(r.get(o.batchId)||te()).add(u);r=r.insert(o.batchId,d)})}).next(()=>{const a=[],o=r.getReverseIterator();for(;o.hasNext();){const u=o.getNext(),c=u.key,h=u.value,d=KC();h.forEach(m=>{if(!s.has(m)){const g=ZC(n.get(m),i.get(m));g!==null&&d.set(m,g),s=s.add(m)}}),a.push(this.documentOverlayCache.saveOverlays(e,c,d))}return N.waitFor(a)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,n,i,r){return function(a){return q.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):xv(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,i,r):this.getDocumentsMatchingCollectionQuery(e,n,i,r)}getNextDocuments(e,n,i,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,i,r).next(s=>{const a=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,i.largestBatchId,r-s.size):N.resolve(oi());let o=ko,u=s;return a.next(c=>N.forEach(c,(h,d)=>(o<d.largestBatchId&&(o=d.largestBatchId),s.get(h)?N.resolve():this.remoteDocumentCache.getEntry(e,h).next(m=>{u=u.insert(h,m)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,u,c,te())).next(h=>({batchId:o,changes:GC(h)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new q(n)).next(i=>{let r=lu();return i.isFoundDocument()&&(r=r.insert(i.key,i)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,i,r){const s=n.collectionGroup;let a=lu();return this.indexManager.getCollectionParents(e,s).next(o=>N.forEach(o,u=>{const c=function(d,m){return new $i(m,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,i,r).next(h=>{h.forEach((d,m)=>{a=a.insert(d,m)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,n,i,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,i.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,i,s,r))).next(a=>{s.forEach((u,c)=>{const h=c.getKey();a.get(h)===null&&(a=a.insert(h,Pe.newInvalidDocument(h)))});let o=lu();return a.forEach((u,c)=>{const h=s.get(u);h!==void 0&&Uu(h.mutation,c,en.empty(),pe.now()),Wc(n,c)&&(o=o.insert(u,c))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p3{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return N.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,function(r){return{id:r.id,version:r.version,createTime:Ze(r.createTime)}}(n)),N.resolve()}getNamedQuery(e,n){return N.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,function(r){return{name:r.name,query:Gv(r.bundledQuery),readTime:Ze(r.readTime)}}(n)),N.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g3{constructor(){this.overlays=new Re(q.comparator),this.qr=new Map}getOverlay(e,n){return N.resolve(this.overlays.get(n))}getOverlays(e,n){const i=oi();return N.forEach(n,r=>this.getOverlay(e,r).next(s=>{s!==null&&i.set(r,s)})).next(()=>i)}saveOverlays(e,n,i){return i.forEach((r,s)=>{this.St(e,n,s)}),N.resolve()}removeOverlaysForBatchId(e,n,i){const r=this.qr.get(i);return r!==void 0&&(r.forEach(s=>this.overlays=this.overlays.remove(s)),this.qr.delete(i)),N.resolve()}getOverlaysForCollection(e,n,i){const r=oi(),s=n.length+1,a=new q(n.child("")),o=this.overlays.getIteratorFrom(a);for(;o.hasNext();){const u=o.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===s&&u.largestBatchId>i&&r.set(u.getKey(),u)}return N.resolve(r)}getOverlaysForCollectionGroup(e,n,i,r){let s=new Re((c,h)=>c-h);const a=this.overlays.getIterator();for(;a.hasNext();){const c=a.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>i){let h=s.get(c.largestBatchId);h===null&&(h=oi(),s=s.insert(c.largestBatchId,h)),h.set(c.getKey(),c)}}const o=oi(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,h)=>o.set(c,h)),!(o.size()>=r)););return N.resolve(o)}St(e,n,i){const r=this.overlays.get(i.key);if(r!==null){const a=this.qr.get(r.largestBatchId).delete(i.key);this.qr.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(i.key,new qv(n,i));let s=this.qr.get(n);s===void 0&&(s=te(),this.qr.set(n,s)),this.qr.set(n,s.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _3{constructor(){this.sessionToken=Ke.EMPTY_BYTE_STRING}getSessionToken(e){return N.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,N.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yv{constructor(){this.Qr=new ve(mt.$r),this.Ur=new ve(mt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const i=new mt(e,n);this.Qr=this.Qr.add(i),this.Ur=this.Ur.add(i)}Wr(e,n){e.forEach(i=>this.addReference(i,n))}removeReference(e,n){this.Gr(new mt(e,n))}zr(e,n){e.forEach(i=>this.removeReference(i,n))}jr(e){const n=new q(new oe([])),i=new mt(n,e),r=new mt(n,e+1),s=[];return this.Ur.forEachInRange([i,r],a=>{this.Gr(a),s.push(a.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new q(new oe([])),i=new mt(n,e),r=new mt(n,e+1);let s=te();return this.Ur.forEachInRange([i,r],a=>{s=s.add(a.key)}),s}containsKey(e){const n=new mt(e,0),i=this.Qr.firstAfterOrEqual(n);return i!==null&&e.isEqual(i.key)}}class mt{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return q.comparator(e.key,n.key)||X(e.Yr,n.Yr)}static Kr(e,n){return X(e.Yr,n.Yr)||q.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y3{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new ve(mt.$r)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,i,r){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Bv(s,n,i,r);this.mutationQueue.push(a);for(const o of r)this.Zr=this.Zr.add(new mt(o.key,s)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return N.resolve(a)}lookupMutationBatch(e,n){return N.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const i=n+1,r=this.ei(i),s=r<0?0:r;return N.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?Br:this.tr-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const i=new mt(n,0),r=new mt(n,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([i,r],a=>{const o=this.Xr(a.Yr);s.push(o)}),N.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let i=new ve(X);return n.forEach(r=>{const s=new mt(r,0),a=new mt(r,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([s,a],o=>{i=i.add(o.Yr)})}),N.resolve(this.ti(i))}getAllMutationBatchesAffectingQuery(e,n){const i=n.path,r=i.length+1;let s=i;q.isDocumentKey(s)||(s=s.child(""));const a=new mt(new q(s),0);let o=new ve(X);return this.Zr.forEachWhile(u=>{const c=u.key.path;return!!i.isPrefixOf(c)&&(c.length===r&&(o=o.add(u.Yr)),!0)},a),N.resolve(this.ti(o))}ti(e){const n=[];return e.forEach(i=>{const r=this.Xr(i);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){Q(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Zr;return N.forEach(n.mutations,r=>{const s=new mt(r.key,n.batchId);return i=i.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=i})}ir(e){}containsKey(e,n){const i=new mt(n,0),r=this.Zr.firstAfterOrEqual(i);return N.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v3{constructor(e){this.ri=e,this.docs=function(){return new Re(q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const i=n.key,r=this.docs.get(i),s=r?r.size:0,a=this.ri(n);return this.docs=this.docs.insert(i,{document:n.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const i=this.docs.get(n);return N.resolve(i?i.document.mutableCopy():Pe.newInvalidDocument(n))}getEntries(e,n){let i=tn();return n.forEach(r=>{const s=this.docs.get(r);i=i.insert(r,s?s.document.mutableCopy():Pe.newInvalidDocument(r))}),N.resolve(i)}getDocumentsMatchingQuery(e,n,i,r){let s=tn();const a=n.path,o=new q(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(o);for(;u.hasNext();){const{key:c,value:{document:h}}=u.getNext();if(!a.isPrefixOf(c.path))break;c.path.length>a.length+1||Rv(lC(h),i)<=0||(r.has(h.key)||Wc(n,h))&&(s=s.insert(h.key,h.mutableCopy()))}return N.resolve(s)}getAllFromCollectionGroup(e,n,i,r){G(9500)}ii(e,n){return N.forEach(this.docs,i=>n(i))}newChangeBuffer(e){return new T3(this)}getSize(e){return N.resolve(this.size)}}class T3 extends CD{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach((i,r)=>{r.isValidDocument()?n.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(i)}),N.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E3{constructor(e){this.persistence=e,this.si=new Wi(n=>na(n),Yc),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.oi=0,this._i=new Yv,this.targetCount=0,this.ai=oa.ur()}forEachTarget(e,n){return this.si.forEach((i,r)=>n(r)),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,n,i){return i&&(this.lastRemoteSnapshotVersion=i),n>this.oi&&(this.oi=n),N.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new oa(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,N.resolve()}updateTargetData(e,n){return this.Pr(n),N.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,n,i){let r=0;const s=[];return this.si.forEach((a,o)=>{o.sequenceNumber<=n&&i.get(o.targetId)===null&&(this.si.delete(a),s.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),N.waitFor(s).next(()=>r)}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,n){const i=this.si.get(n)||null;return N.resolve(i)}addMatchingKeys(e,n,i){return this._i.Wr(n,i),N.resolve()}removeMatchingKeys(e,n,i){this._i.zr(n,i);const r=this.persistence.referenceDelegate,s=[];return r&&n.forEach(a=>{s.push(r.markPotentiallyOrphaned(e,a))}),N.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),N.resolve()}getMatchingKeysForTargetId(e,n){const i=this._i.Hr(n);return N.resolve(i)}containsKey(e,n){return N.resolve(this._i.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $v{constructor(e,n){this.ui={},this.overlays={},this.ci=new Zt(0),this.li=!1,this.li=!0,this.hi=new _3,this.referenceDelegate=e(this),this.Pi=new E3(this),this.indexManager=new s3,this.remoteDocumentCache=function(r){return new v3(r)}(i=>this.referenceDelegate.Ti(i)),this.serializer=new yD(n),this.Ii=new p3(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new g3,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let i=this.ui[e.toKey()];return i||(i=new y3(n,this.referenceDelegate),this.ui[e.toKey()]=i),i}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,i){U("MemoryPersistence","Starting transaction:",e);const r=new w3(this.ci.next());return this.referenceDelegate.Ei(),i(r).next(s=>this.referenceDelegate.di(r).next(()=>s)).toPromise().then(s=>(r.raiseOnCommittedEvent(),s))}Ai(e,n){return N.or(Object.values(this.ui).map(i=>()=>i.containsKey(e,n)))}}class w3 extends cC{constructor(e){super(),this.currentSequenceNumber=e}}class gm{constructor(e){this.persistence=e,this.Ri=new Yv,this.Vi=null}static mi(e){return new gm(e)}get fi(){if(this.Vi)return this.Vi;throw G(60996)}addReference(e,n,i){return this.Ri.addReference(i,n),this.fi.delete(i.toString()),N.resolve()}removeReference(e,n,i){return this.Ri.removeReference(i,n),this.fi.add(i.toString()),N.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),N.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach(r=>this.fi.add(r.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(s=>this.fi.add(s.toString()))}).next(()=>i.removeTargetData(e,n))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.fi,i=>{const r=q.fromPath(i);return this.gi(e,r).next(s=>{s||n.removeEntry(r,Y.min())})}).next(()=>(this.Vi=null,n.apply(e)))}updateLimboDocument(e,n){return this.gi(e,n).next(i=>{i?this.fi.delete(n.toString()):this.fi.add(n.toString())})}Ti(e){return 0}gi(e,n){return N.or([()=>N.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class gd{constructor(e,n){this.persistence=e,this.pi=new Wi(i=>xt(i.path),(i,r)=>i.isEqual(r)),this.garbageCollector=RD(this,n)}static mi(e,n){return new gd(e,n)}Ei(){}di(e){return N.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(i=>n.next(r=>i+r))}wr(e){let n=0;return this.pr(e,i=>{n++}).next(()=>n)}pr(e,n){return N.forEach(this.pi,(i,r)=>this.br(e,i,r).next(s=>s?N.resolve():n(r)))}removeTargets(e,n,i){return this.persistence.getTargetCache().removeTargets(e,n,i)}removeOrphanedDocuments(e,n){let i=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.ii(e,a=>this.br(e,a,n).next(o=>{o||(i++,s.removeEntry(a,Y.min()))})).next(()=>s.apply(e)).next(()=>i)}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),N.resolve()}removeTarget(e,n){const i=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,n,i){return this.pi.set(i,e.currentSequenceNumber),N.resolve()}removeReference(e,n,i){return this.pi.set(i,e.currentSequenceNumber),N.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),N.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=pf(e.data.value)),n}br(e,n,i){return N.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const r=this.pi.get(n);return N.resolve(r!==void 0&&r>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I3{constructor(e){this.serializer=e}k(e,n,i,r){const s=new sm("createOrUpgrade",n);i<1&&r>=1&&(function(u){u.createObjectStore(Qc)}(e),function(u){u.createObjectStore(hc,{keyPath:z4}),u.createObjectStore(Fn,{keyPath:iA,autoIncrement:!0}).createIndex(Ms,rA,{unique:!0}),u.createObjectStore(Mo)}(e),QA(e),function(u){u.createObjectStore(Rs)}(e));let a=N.resolve();return i<3&&r>=3&&(i!==0&&(function(u){u.deleteObjectStore(Lo),u.deleteObjectStore(xo),u.deleteObjectStore(Gs)}(e),QA(e)),a=a.next(()=>function(u){const c=u.store(Gs),h={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Y.min().toTimestamp(),targetCount:0};return c.put(ld,h)}(s))),i<4&&r>=4&&(i!==0&&(a=a.next(()=>function(u,c){return c.store(Fn).J().next(d=>{u.deleteObjectStore(Fn),u.createObjectStore(Fn,{keyPath:iA,autoIncrement:!0}).createIndex(Ms,rA,{unique:!0});const m=c.store(Fn),g=d.map(R=>m.put(R));return N.waitFor(g)})}(e,s))),a=a.next(()=>{(function(u){u.createObjectStore(Uo,{keyPath:Y4})})(e)})),i<5&&r>=5&&(a=a.next(()=>this.yi(s))),i<6&&r>=6&&(a=a.next(()=>(function(u){u.createObjectStore(fc)}(e),this.wi(s)))),i<7&&r>=7&&(a=a.next(()=>this.Si(s))),i<8&&r>=8&&(a=a.next(()=>this.bi(e,s))),i<9&&r>=9&&(a=a.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),i<10&&r>=10&&(a=a.next(()=>this.Di(s))),i<11&&r>=11&&(a=a.next(()=>{(function(u){u.createObjectStore(am,{keyPath:$4})})(e),function(u){u.createObjectStore(om,{keyPath:W4})}(e)})),i<12&&r>=12&&(a=a.next(()=>{(function(u){const c=u.createObjectStore(lm,{keyPath:i6});c.createIndex(y_,r6,{unique:!1}),c.createIndex(yC,s6,{unique:!1})})(e)})),i<13&&r>=13&&(a=a.next(()=>function(u){const c=u.createObjectStore(od,{keyPath:F4});c.createIndex(df,q4),c.createIndex(mC,H4)}(e)).next(()=>this.Ci(e,s)).next(()=>e.deleteObjectStore(Rs))),i<14&&r>=14&&(a=a.next(()=>this.Fi(e,s))),i<15&&r>=15&&(a=a.next(()=>function(u){u.createObjectStore(Nv,{keyPath:X4,autoIncrement:!0}).createIndex(__,J4,{unique:!1}),u.createObjectStore(ku,{keyPath:Z4}).createIndex(gC,e6,{unique:!1}),u.createObjectStore(Mu,{keyPath:t6}).createIndex(_C,n6,{unique:!1})}(e))),i<16&&r>=16&&(a=a.next(()=>{n.objectStore(ku).clear()}).next(()=>{n.objectStore(Mu).clear()})),i<17&&r>=17&&(a=a.next(()=>{(function(u){u.createObjectStore(Pv,{keyPath:a6})})(e)})),i<18&&r>=18&&L0()&&(a=a.next(()=>{n.objectStore(ku).clear()}).next(()=>{n.objectStore(Mu).clear()})),a}wi(e){let n=0;return e.store(Rs).ee((i,r)=>{n+=pd(r)}).next(()=>{const i={byteSize:n};return e.store(fc).put(g_,i)})}yi(e){const n=e.store(hc),i=e.store(Fn);return n.J().next(r=>N.forEach(r,s=>{const a=IDBKeyRange.bound([s.userId,Br],[s.userId,s.lastAcknowledgedBatchId]);return i.J(Ms,a).next(o=>N.forEach(o,u=>{Q(u.userId===s.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const c=Ds(this.serializer,u);return ID(e,s.userId,c).next(()=>{})}))}))}Si(e){const n=e.store(Lo),i=e.store(Rs);return e.store(Gs).get(ld).next(r=>{const s=[];return i.ee((a,o)=>{const u=new oe(a),c=function(d){return[0,xt(d)]}(u);s.push(n.get(c).next(h=>h?N.resolve():(d=>n.put({targetId:0,path:xt(d),sequenceNumber:r.highestListenSequenceNumber}))(u)))}).next(()=>N.waitFor(s))})}bi(e,n){e.createObjectStore(dc,{keyPath:Q4});const i=n.store(dc),r=new Qv,s=a=>{if(r.add(a)){const o=a.lastSegment(),u=a.popLast();return i.put({collectionId:o,parent:xt(u)})}};return n.store(Rs).ee({X:!0},(a,o)=>{const u=new oe(a);return s(u.popLast())}).next(()=>n.store(Mo).ee({X:!0},([a,o,u],c)=>{const h=ai(o);return s(h.popLast())}))}Di(e){const n=e.store(xo);return n.ee((i,r)=>{const s=cu(r),a=vD(this.serializer,s);return n.put(a)})}Ci(e,n){const i=n.store(Rs),r=[];return i.ee((s,a)=>{const o=n.store(od),u=function(d){return d.document?new q(oe.fromString(d.document.name).popFirst(5)):d.noDocument?q.fromSegments(d.noDocument.path):d.unknownDocument?q.fromSegments(d.unknownDocument.path):G(36783)}(a).path.toArray(),c={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};r.push(o.put(c))}).next(()=>N.waitFor(r))}Fi(e,n){const i=n.store(Fn),r=DD(this.serializer),s=new $v(gm.mi,this.serializer.yt);return i.J().next(a=>{const o=new Map;return a.forEach(u=>{let c=o.get(u.userId)??te();Ds(this.serializer,u).keys().forEach(h=>c=c.add(h)),o.set(u.userId,c)}),N.forEach(o,(u,c)=>{const h=new gt(c),d=mm.wt(this.serializer,h),m=s.getIndexManager(h),g=pm.wt(h,this.serializer,m,s.referenceDelegate);return new ND(r,g,d,m).recalculateAndSaveOverlaysForDocumentKeys(new v_(n,Zt.ce),u).next()})})}}function QA(t){t.createObjectStore(Lo,{keyPath:G4}).createIndex(Dv,K4,{unique:!0}),t.createObjectStore(xo,{keyPath:"targetId"}).createIndex(pC,j4,{unique:!0}),t.createObjectStore(Gs)}const cr="IndexedDbPersistence",Wp=18e5,Xp=5e3,Jp="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",PD="main";class Wv{constructor(e,n,i,r,s,a,o,u,c,h,d=18){if(this.allowTabSynchronization=e,this.persistenceKey=n,this.clientId=i,this.Mi=s,this.window=a,this.document=o,this.xi=c,this.Oi=h,this.Ni=d,this.ci=null,this.li=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Bi=null,this.inForeground=!1,this.Li=null,this.ki=null,this.qi=Number.NEGATIVE_INFINITY,this.Qi=m=>Promise.resolve(),!Wv.v())throw new L(k.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new h3(this,r),this.$i=n+PD,this.serializer=new yD(u),this.Ui=new ci(this.$i,this.Ni,new I3(this.serializer)),this.hi=new Z6,this.Pi=new o3(this.referenceDelegate,this.serializer),this.remoteDocumentCache=DD(this.serializer),this.Ii=new J6,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,h===!1&&Xe(cr,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new L(k.FAILED_PRECONDITION,Jp);return this.Gi(),this.zi(),this.ji(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Pi.getHighestSequenceNumber(e))}).then(e=>{this.ci=new Zt(e,this.xi)}).then(()=>{this.li=!0}).catch(e=>(this.Ui&&this.Ui.close(),Promise.reject(e)))}Ji(e){return this.Qi=async n=>{if(this.started)return e(n)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ui.$(async n=>{n.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Mi.enqueueAndForget(async()=>{this.started&&await this.Wi()}))}Wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Bh(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Hi(e).next(n=>{n||(this.isPrimary=!1,this.Mi.enqueueRetryable(()=>this.Qi(!1)))})}).next(()=>this.Yi(e)).next(n=>this.isPrimary&&!n?this.Zi(e).next(()=>!1):!!n&&this.Xi(e).next(()=>!0))).catch(e=>{if(ls(e))return U(cr,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return U(cr,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Mi.enqueueRetryable(()=>this.Qi(e)),this.isPrimary=e})}Hi(e){return Xl(e).get(Na).next(n=>N.resolve(this.es(n)))}ts(e){return Bh(e).delete(this.clientId)}async ns(){if(this.isPrimary&&!this.rs(this.qi,Wp)){this.qi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",n=>{const i=ft(n,Uo);return i.J().next(r=>{const s=this.ss(r,Wp),a=r.filter(o=>s.indexOf(o)===-1);return N.forEach(a,o=>i.delete(o.clientId)).next(()=>a)})}).catch(()=>[]);if(this.Ki)for(const n of e)this.Ki.removeItem(this._s(n.clientId))}}ji(){this.ki=this.Mi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Wi().then(()=>this.ns()).then(()=>this.ji()))}es(e){return!!e&&e.ownerId===this.clientId}Yi(e){return this.Oi?N.resolve(!0):Xl(e).get(Na).next(n=>{if(n!==null&&this.rs(n.leaseTimestampMs,Xp)&&!this.us(n.ownerId)){if(this.es(n)&&this.networkEnabled)return!0;if(!this.es(n)){if(!n.allowTabSynchronization)throw new L(k.FAILED_PRECONDITION,Jp);return!1}}return!(!this.networkEnabled||!this.inForeground)||Bh(e).J().next(i=>this.ss(i,Xp).find(r=>{if(this.clientId!==r.clientId){const s=!this.networkEnabled&&r.networkEnabled,a=!this.inForeground&&r.inForeground,o=this.networkEnabled===r.networkEnabled;if(s||a&&o)return!0}return!1})===void 0)}).next(n=>(this.isPrimary!==n&&U(cr,`Client ${n?"is":"is not"} eligible for a primary lease.`),n))}async shutdown(){this.li=!1,this.cs(),this.ki&&(this.ki.cancel(),this.ki=null),this.ls(),this.hs(),await this.Ui.runTransaction("shutdown","readwrite",[Qc,Uo],e=>{const n=new v_(e,Zt.ce);return this.Zi(n).next(()=>this.ts(n))}),this.Ui.close(),this.Ps()}ss(e,n){return e.filter(i=>this.rs(i.updateTimeMs,n)&&!this.us(i.clientId))}Ts(){return this.runTransaction("getActiveClients","readonly",e=>Bh(e).J().next(n=>this.ss(n,Wp).map(i=>i.clientId)))}get started(){return this.li}getGlobalsCache(){return this.hi}getMutationQueue(e,n){return pm.wt(e,this.serializer,n,this.referenceDelegate)}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new a3(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return mm.wt(this.serializer,e)}getBundleCache(){return this.Ii}runTransaction(e,n,i){U(cr,"Starting transaction:",e);const r=n==="readonly"?"readonly":"readwrite",s=function(u){return u===18?u6:u===17?wC:u===16?l6:u===15?Ov:u===14?EC:u===13?TC:u===12?o6:u===11?vC:void G(60245)}(this.Ni);let a;return this.Ui.runTransaction(e,r,s,o=>(a=new v_(o,this.ci?this.ci.next():Zt.ce),n==="readwrite-primary"?this.Hi(a).next(u=>!!u||this.Yi(a)).next(u=>{if(!u)throw Xe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Mi.enqueueRetryable(()=>this.Qi(!1)),new L(k.FAILED_PRECONDITION,uC);return i(a)}).next(u=>this.Xi(a).next(()=>u)):this.Is(a).next(()=>i(a)))).then(o=>(a.raiseOnCommittedEvent(),o))}Is(e){return Xl(e).get(Na).next(n=>{if(n!==null&&this.rs(n.leaseTimestampMs,Xp)&&!this.us(n.ownerId)&&!this.es(n)&&!(this.Oi||this.allowTabSynchronization&&n.allowTabSynchronization))throw new L(k.FAILED_PRECONDITION,Jp)})}Xi(e){const n={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Xl(e).put(Na,n)}static v(){return ci.v()}Zi(e){const n=Xl(e);return n.get(Na).next(i=>this.es(i)?(U(cr,"Releasing primary lease."),n.delete(Na)):N.resolve())}rs(e,n){const i=Date.now();return!(e<i-n)&&(!(e>i)||(Xe(`Detected an update time that is in the future: ${e} > ${i}`),!1))}Gi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Li=()=>{this.Mi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Wi()))},this.document.addEventListener("visibilitychange",this.Li),this.inForeground=this.document.visibilityState==="visible")}ls(){this.Li&&(this.document.removeEventListener("visibilitychange",this.Li),this.Li=null)}zi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Bi=()=>{this.cs();const n=/(?:Version|Mobile)\/1[456]/;x0()&&(navigator.appVersion.match(n)||navigator.userAgent.match(n))&&this.Mi.enterRestrictedMode(!0),this.Mi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Bi))}hs(){this.Bi&&(this.window.removeEventListener("pagehide",this.Bi),this.Bi=null)}us(e){var n;try{const i=((n=this.Ki)==null?void 0:n.getItem(this._s(e)))!==null;return U(cr,`Client '${e}' ${i?"is":"is not"} zombied in LocalStorage`),i}catch(i){return Xe(cr,"Failed to get zombied client id.",i),!1}}cs(){if(this.Ki)try{this.Ki.setItem(this._s(this.clientId),String(Date.now()))}catch(e){Xe("Failed to set zombie client id.",e)}}Ps(){if(this.Ki)try{this.Ki.removeItem(this._s(this.clientId))}catch{}}_s(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Xl(t){return ft(t,Qc)}function Bh(t){return ft(t,Uo)}function Xv(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jv{constructor(e,n,i,r){this.targetId=e,this.fromCache=n,this.Es=i,this.ds=r}static As(e,n){let i=te(),r=te();for(const s of n.docChanges)switch(s.type){case 0:i=i.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new Jv(e,n.fromCache,i,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A3{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OD{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return x0()?8:hC(Be())>0?6:4}()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,i,r){const s={result:null};return this.ys(e,n).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ws(e,n,r,i).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new A3;return this.Ss(e,n,a).next(o=>{if(s.result=o,this.Vs)return this.bs(e,n,a,o.size)})}).next(()=>s.result)}bs(e,n,i,r){return i.documentReadCount<this.fs?(Ba()<=se.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",Fa(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),N.resolve()):(Ba()<=se.DEBUG&&U("QueryEngine","Query:",Fa(n),"scans",i.documentReadCount,"local documents and returns",r,"documents as results."),i.documentReadCount>this.gs*r?(Ba()<=se.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",Fa(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,jt(n))):N.resolve())}ys(e,n){if(_A(n))return N.resolve(null);let i=jt(n);return this.indexManager.getIndexType(e,i).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=fd(n,null,"F"),i=jt(n)),this.indexManager.getDocumentsMatchingTarget(e,i).next(s=>{const a=te(...s);return this.ps.getDocuments(e,a).next(o=>this.indexManager.getMinOffset(e,i).next(u=>{const c=this.Ds(n,o);return this.Cs(n,c,a,u.readTime)?this.ys(e,fd(n,null,"F")):this.vs(e,c,n,u)}))})))}ws(e,n,i,r){return _A(n)||r.isEqual(Y.min())?N.resolve(null):this.ps.getDocuments(e,i).next(s=>{const a=this.Ds(n,s);return this.Cs(n,a,i,r)?N.resolve(null):(Ba()<=se.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Fa(n)),this.vs(e,a,n,oC(r,ko)).next(o=>o))})}Ds(e,n){let i=new ve(HC(e));return n.forEach((r,s)=>{Wc(e,s)&&(i=i.add(s))}),i}Cs(e,n,i,r){if(e.limit===null)return!1;if(i.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Ss(e,n,i){return Ba()<=se.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",Fa(n)),this.ps.getDocumentsMatchingQuery(e,n,In.min(),i)}vs(e,n,i,r){return this.ps.getDocumentsMatchingQuery(e,i,r).next(s=>(n.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zv="LocalStore",b3=3e8;class S3{constructor(e,n,i,r){this.persistence=e,this.Fs=n,this.serializer=r,this.Ms=new Re(X),this.xs=new Wi(s=>na(s),Yc),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(i)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ND(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ms))}}function VD(t,e,n,i){return new S3(t,e,n,i)}async function kD(t,e){const n=j(t);return await n.persistence.runTransaction("Handle user change","readonly",i=>{let r;return n.mutationQueue.getAllMutationBatches(i).next(s=>(r=s,n.Bs(e),n.mutationQueue.getAllMutationBatches(i))).next(s=>{const a=[],o=[];let u=te();for(const c of r){a.push(c.batchId);for(const h of c.mutations)u=u.add(h.key)}for(const c of s){o.push(c.batchId);for(const h of c.mutations)u=u.add(h.key)}return n.localDocuments.getDocuments(i,u).next(c=>({Ls:c,removedBatchIds:a,addedBatchIds:o}))})})}function R3(t,e){const n=j(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const r=e.batch.keys(),s=n.Ns.newChangeBuffer({trackRemovals:!0});return function(o,u,c,h){const d=c.batch,m=d.keys();let g=N.resolve();return m.forEach(R=>{g=g.next(()=>h.getEntry(u,R)).next(D=>{const V=c.docVersions.get(R);Q(V!==null,48541),D.version.compareTo(V)<0&&(d.applyToRemoteDocument(D,c),D.isValidDocument()&&(D.setReadTime(c.commitVersion),h.addEntry(D)))})}),g.next(()=>o.mutationQueue.removeMutationBatch(u,d))}(n,i,e,s).next(()=>s.apply(i)).next(()=>n.mutationQueue.performConsistencyCheck(i)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(i,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(o){let u=te();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(u=u.add(o.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(i,r))})}function MD(t){const e=j(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Pi.getLastRemoteSnapshotVersion(n))}function C3(t,e){const n=j(t),i=e.snapshotVersion;let r=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=n.Ns.newChangeBuffer({trackRemovals:!0});r=n.Ms;const o=[];e.targetChanges.forEach((h,d)=>{const m=r.get(d);if(!m)return;o.push(n.Pi.removeMatchingKeys(s,h.removedDocuments,d).next(()=>n.Pi.addMatchingKeys(s,h.addedDocuments,d)));let g=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(d)!==null?g=g.withResumeToken(Ke.EMPTY_BYTE_STRING,Y.min()).withLastLimboFreeSnapshotVersion(Y.min()):h.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(h.resumeToken,i)),r=r.insert(d,g),function(D,V,w){return D.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=b3?!0:w.addedDocuments.size+w.modifiedDocuments.size+w.removedDocuments.size>0}(m,g,h)&&o.push(n.Pi.updateTargetData(s,g))});let u=tn(),c=te();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(s,h))}),o.push(xD(s,a,e.documentUpdates).next(h=>{u=h.ks,c=h.qs})),!i.isEqual(Y.min())){const h=n.Pi.getLastRemoteSnapshotVersion(s).next(d=>n.Pi.setTargetsMetadata(s,s.currentSequenceNumber,i));o.push(h)}return N.waitFor(o).next(()=>a.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,c)).next(()=>u)}).then(s=>(n.Ms=r,s))}function xD(t,e,n){let i=te(),r=te();return n.forEach(s=>i=i.add(s)),e.getEntries(t,i).next(s=>{let a=tn();return n.forEach((o,u)=>{const c=s.get(o);u.isFoundDocument()!==c.isFoundDocument()&&(r=r.add(o)),u.isNoDocument()&&u.version.isEqual(Y.min())?(e.removeEntry(o,u.readTime),a=a.insert(o,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),a=a.insert(o,u)):U(Zv,"Ignoring outdated watch update for ",o,". Current version:",c.version," Watch version:",u.version)}),{ks:a,qs:r}})}function D3(t,e){const n=j(t);return n.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=Br),n.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}function Go(t,e){const n=j(t);return n.persistence.runTransaction("Allocate target","readwrite",i=>{let r;return n.Pi.getTargetData(i,e).next(s=>s?(r=s,N.resolve(r)):n.Pi.allocateTargetId(i).next(a=>(r=new Di(e,a,"TargetPurposeListen",i.currentSequenceNumber),n.Pi.addTargetData(i,r).next(()=>r))))}).then(i=>{const r=n.Ms.get(i.targetId);return(r===null||i.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(i.targetId,i),n.xs.set(e,i.targetId)),i})}async function Ko(t,e,n){const i=j(t),r=i.Ms.get(e),s=n?"readwrite":"readwrite-primary";try{n||await i.persistence.runTransaction("Release target",s,a=>i.persistence.referenceDelegate.removeTarget(a,r))}catch(a){if(!ls(a))throw a;U(Zv,`Failed to update sequence numbers for target ${e}: ${a}`)}i.Ms=i.Ms.remove(e),i.xs.delete(r.target)}function _d(t,e,n){const i=j(t);let r=Y.min(),s=te();return i.persistence.runTransaction("Execute query","readwrite",a=>function(u,c,h){const d=j(u),m=d.xs.get(h);return m!==void 0?N.resolve(d.Ms.get(m)):d.Pi.getTargetData(c,h)}(i,a,jt(e)).next(o=>{if(o)return r=o.lastLimboFreeSnapshotVersion,i.Pi.getMatchingKeysForTargetId(a,o.targetId).next(u=>{s=u})}).next(()=>i.Fs.getDocumentsMatchingQuery(a,e,n?r:Y.min(),n?s:te())).next(o=>(zD(i,qC(e),o),{documents:o,Qs:s})))}function LD(t,e){const n=j(t),i=j(n.Pi),r=n.Ms.get(e);return r?Promise.resolve(r.target):n.persistence.runTransaction("Get target data","readonly",s=>i.At(s,e).next(a=>a?a.target:null))}function UD(t,e){const n=j(t),i=n.Os.get(e)||Y.min();return n.persistence.runTransaction("Get new document changes","readonly",r=>n.Ns.getAllFromCollectionGroup(r,e,oC(i,ko),Number.MAX_SAFE_INTEGER)).then(r=>(zD(n,e,r),r))}function zD(t,e,n){let i=t.Os.get(e)||Y.min();n.forEach((r,s)=>{s.readTime.compareTo(i)>0&&(i=s.readTime)}),t.Os.set(e,i)}async function N3(t,e,n,i){const r=j(t);let s=te(),a=tn();for(const c of n){const h=e.$s(c.metadata.name);c.document&&(s=s.add(h));const d=e.Us(c);d.setReadTime(e.Ks(c.metadata.readTime)),a=a.insert(h,d)}const o=r.Ns.newChangeBuffer({trackRemovals:!0}),u=await Go(r,function(h){return jt(hl(oe.fromString(`__bundle__/docs/${h}`)))}(i));return r.persistence.runTransaction("Apply bundle documents","readwrite",c=>xD(c,o,a).next(h=>(o.apply(c),h)).next(h=>r.Pi.removeMatchingKeysForTargetId(c,u.targetId).next(()=>r.Pi.addMatchingKeys(c,s,u.targetId)).next(()=>r.localDocuments.getLocalViewOfDocuments(c,h.ks,h.qs)).next(()=>h.ks)))}async function P3(t,e,n=te()){const i=await Go(t,jt(Gv(e.bundledQuery))),r=j(t);return r.persistence.runTransaction("Save named query","readwrite",s=>{const a=Ze(e.readTime);if(i.snapshotVersion.compareTo(a)>=0)return r.Ii.saveNamedQuery(s,e);const o=i.withResumeToken(Ke.EMPTY_BYTE_STRING,a);return r.Ms=r.Ms.insert(o.targetId,o),r.Pi.updateTargetData(s,o).next(()=>r.Pi.removeMatchingKeysForTargetId(s,i.targetId)).next(()=>r.Pi.addMatchingKeys(s,n,i.targetId)).next(()=>r.Ii.saveNamedQuery(s,e))})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BD="firestore_clients";function YA(t,e){return`${BD}_${t}_${e}`}const FD="firestore_mutations";function $A(t,e,n){let i=`${FD}_${t}_${n}`;return e.isAuthenticated()&&(i+=`_${e.uid}`),i}const qD="firestore_targets";function Zp(t,e){return`${qD}_${t}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn="SharedClientState";class yd{constructor(e,n,i,r){this.user=e,this.batchId=n,this.state=i,this.error=r}static Ws(e,n,i){const r=JSON.parse(i);let s,a=typeof r=="object"&&["pending","acknowledged","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return a&&r.error&&(a=typeof r.error.message=="string"&&typeof r.error.code=="string",a&&(s=new L(r.error.code,r.error.message))),a?new yd(e,n,r.state,s):(Xe(Xn,`Failed to parse mutation state for ID '${n}': ${i}`),null)}Gs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class zu{constructor(e,n,i){this.targetId=e,this.state=n,this.error=i}static Ws(e,n){const i=JSON.parse(n);let r,s=typeof i=="object"&&["not-current","current","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return s&&i.error&&(s=typeof i.error.message=="string"&&typeof i.error.code=="string",s&&(r=new L(i.error.code,i.error.message))),s?new zu(e,i.state,r):(Xe(Xn,`Failed to parse target state for ID '${e}': ${n}`),null)}Gs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class vd{constructor(e,n){this.clientId=e,this.activeTargetIds=n}static Ws(e,n){const i=JSON.parse(n);let r=typeof i=="object"&&i.activeTargetIds instanceof Array,s=Lv();for(let a=0;r&&a<i.activeTargetIds.length;++a)r=fC(i.activeTargetIds[a]),s=s.add(i.activeTargetIds[a]);return r?new vd(e,s):(Xe(Xn,`Failed to parse client data for instance '${e}': ${n}`),null)}}class eT{constructor(e,n){this.clientId=e,this.onlineState=n}static Ws(e){const n=JSON.parse(e);return typeof n=="object"&&["Unknown","Online","Offline"].indexOf(n.onlineState)!==-1&&typeof n.clientId=="string"?new eT(n.clientId,n.onlineState):(Xe(Xn,`Failed to parse online state: ${e}`),null)}}class V_{constructor(){this.activeTargetIds=Lv()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class eg{constructor(e,n,i,r,s){this.window=e,this.Mi=n,this.persistenceKey=i,this.Js=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Hs=this.Ys.bind(this),this.Zs=new Re(X),this.started=!1,this.Xs=[];const a=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.eo=YA(this.persistenceKey,this.Js),this.no=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Zs=this.Zs.insert(this.Js,new V_),this.ro=new RegExp(`^${BD}_${a}_([^_]*)$`),this.io=new RegExp(`^${FD}_${a}_(\\d+)(?:_(.*))?$`),this.so=new RegExp(`^${qD}_${a}_(\\d+)$`),this.oo=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this._o=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.Hs)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Ts();for(const i of e){if(i===this.Js)continue;const r=this.getItem(YA(this.persistenceKey,i));if(r){const s=vd.Ws(i,r);s&&(this.Zs=this.Zs.insert(s.clientId,s))}}this.ao();const n=this.storage.getItem(this.oo);if(n){const i=this.uo(n);i&&this.co(i)}for(const i of this.Xs)this.Ys(i);this.Xs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.no,JSON.stringify(e))}getAllActiveQueryTargets(){return this.lo(this.Zs)}isActiveQueryTarget(e){let n=!1;return this.Zs.forEach((i,r)=>{r.activeTargetIds.has(e)&&(n=!0)}),n}addPendingMutation(e){this.ho(e,"pending")}updateMutationState(e,n,i){this.ho(e,n,i),this.Po(e)}addLocalQueryTarget(e,n=!0){let i="not-current";if(this.isActiveQueryTarget(e)){const r=this.storage.getItem(Zp(this.persistenceKey,e));if(r){const s=zu.Ws(e,r);s&&(i=s.state)}}return n&&this.To.zs(e),this.ao(),i}removeLocalQueryTarget(e){this.To.js(e),this.ao()}isLocalQueryTarget(e){return this.To.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Zp(this.persistenceKey,e))}updateQueryState(e,n,i){this.Io(e,n,i)}handleUserChange(e,n,i){n.forEach(r=>{this.Po(r)}),this.currentUser=e,i.forEach(r=>{this.addPendingMutation(r)})}setOnlineState(e){this.Eo(e)}notifyBundleLoaded(e){this.Ao(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Hs),this.removeItem(this.eo),this.started=!1)}getItem(e){const n=this.storage.getItem(e);return U(Xn,"READ",e,n),n}setItem(e,n){U(Xn,"SET",e,n),this.storage.setItem(e,n)}removeItem(e){U(Xn,"REMOVE",e),this.storage.removeItem(e)}Ys(e){const n=e;if(n.storageArea===this.storage){if(U(Xn,"EVENT",n.key,n.newValue),n.key===this.eo)return void Xe("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Mi.enqueueRetryable(async()=>{if(this.started){if(n.key!==null){if(this.ro.test(n.key)){if(n.newValue==null){const i=this.Ro(n.key);return this.Vo(i,null)}{const i=this.mo(n.key,n.newValue);if(i)return this.Vo(i.clientId,i)}}else if(this.io.test(n.key)){if(n.newValue!==null){const i=this.fo(n.key,n.newValue);if(i)return this.po(i)}}else if(this.so.test(n.key)){if(n.newValue!==null){const i=this.yo(n.key,n.newValue);if(i)return this.wo(i)}}else if(n.key===this.oo){if(n.newValue!==null){const i=this.uo(n.newValue);if(i)return this.co(i)}}else if(n.key===this.no){const i=function(s){let a=Zt.ce;if(s!=null)try{const o=JSON.parse(s);Q(typeof o=="number",30636,{So:s}),a=o}catch(o){Xe(Xn,"Failed to read sequence number from WebStorage",o)}return a}(n.newValue);i!==Zt.ce&&this.sequenceNumberHandler(i)}else if(n.key===this._o){const i=this.bo(n.newValue);await Promise.all(i.map(r=>this.syncEngine.Do(r)))}}}else this.Xs.push(n)})}}get To(){return this.Zs.get(this.Js)}ao(){this.setItem(this.eo,this.To.Gs())}ho(e,n,i){const r=new yd(this.currentUser,e,n,i),s=$A(this.persistenceKey,this.currentUser,e);this.setItem(s,r.Gs())}Po(e){const n=$A(this.persistenceKey,this.currentUser,e);this.removeItem(n)}Eo(e){const n={clientId:this.Js,onlineState:e};this.storage.setItem(this.oo,JSON.stringify(n))}Io(e,n,i){const r=Zp(this.persistenceKey,e),s=new zu(e,n,i);this.setItem(r,s.Gs())}Ao(e){const n=JSON.stringify(Array.from(e));this.setItem(this._o,n)}Ro(e){const n=this.ro.exec(e);return n?n[1]:null}mo(e,n){const i=this.Ro(e);return vd.Ws(i,n)}fo(e,n){const i=this.io.exec(e),r=Number(i[1]),s=i[2]!==void 0?i[2]:null;return yd.Ws(new gt(s),r,n)}yo(e,n){const i=this.so.exec(e),r=Number(i[1]);return zu.Ws(r,n)}uo(e){return eT.Ws(e)}bo(e){return JSON.parse(e)}async po(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Co(e.batchId,e.state,e.error);U(Xn,`Ignoring mutation for non-active user ${e.user.uid}`)}wo(e){return this.syncEngine.vo(e.targetId,e.state,e.error)}Vo(e,n){const i=n?this.Zs.insert(e,n):this.Zs.remove(e),r=this.lo(this.Zs),s=this.lo(i),a=[],o=[];return s.forEach(u=>{r.has(u)||a.push(u)}),r.forEach(u=>{s.has(u)||o.push(u)}),this.syncEngine.Fo(a,o).then(()=>{this.Zs=i})}co(e){this.Zs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}lo(e){let n=Lv();return e.forEach((i,r)=>{n=n.unionWith(r.activeTargetIds)}),n}}class HD{constructor(){this.Mo=new V_,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,i){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,i){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new V_,Promise.resolve()}handleUserChange(e,n,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O3{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WA="ConnectivityMonitor";class XA{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){U(WA,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){U(WA,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fh=null;function k_(){return Fh===null?Fh=function(){return 268435456+Math.round(2147483648*Math.random())}():Fh++,"0x"+Fh.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg="RestConnection",V3={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class k3{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${i}/databases/${r}`,this.Wo=this.databaseId.database===ud?`project_id=${i}`:`project_id=${i}&database_id=${r}`}Go(e,n,i,r,s){const a=k_(),o=this.zo(e,n.toUriEncodedString());U(tg,`Sending RPC '${e}' ${a}:`,o,i);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,r,s);const{host:c}=new URL(o),h=ss(c);return this.Jo(e,o,u,i,h).then(d=>(U(tg,`Received RPC '${e}' ${a}: `,d),d),d=>{throw mi(tg,`RPC '${e}' ${a} failed with error: `,d,"url: ",o,"request:",i),d})}Ho(e,n,i,r,s,a){return this.Go(e,n,i,r,s)}jo(e,n,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cl}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((r,s)=>e[s]=r),i&&i.headers.forEach((r,s)=>e[s]=r)}zo(e,n){const i=V3[e];return`${this.Uo}/v1/${n}:${i}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M3{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ot="WebChannelConnection";class x3 extends k3{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,i,r,s){const a=k_();return new Promise((o,u)=>{const c=new W1;c.setWithCredentials(!0),c.listenOnce(X1.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case cf.NO_ERROR:const d=c.getResponseJson();U(Ot,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(d)),o(d);break;case cf.TIMEOUT:U(Ot,`RPC '${e}' ${a} timed out`),u(new L(k.DEADLINE_EXCEEDED,"Request time out"));break;case cf.HTTP_ERROR:const m=c.getStatus();if(U(Ot,`RPC '${e}' ${a} failed with status:`,m,"response text:",c.getResponseText()),m>0){let g=c.getResponseJson();Array.isArray(g)&&(g=g[0]);const R=g==null?void 0:g.error;if(R&&R.status&&R.message){const D=function(w){const v=w.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(v)>=0?v:k.UNKNOWN}(R.status);u(new L(D,R.message))}else u(new L(k.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new L(k.UNAVAILABLE,"Connection failed."));break;default:G(9055,{l_:e,streamId:a,h_:c.getLastErrorCode(),P_:c.getLastError()})}}finally{U(Ot,`RPC '${e}' ${a} completed.`)}});const h=JSON.stringify(r);U(Ot,`RPC '${e}' ${a} sending request:`,r),c.send(n,"POST",h,i,15)})}T_(e,n,i){const r=k_(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=eC(),o=Z1(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,n,i),u.encodeInitMessageHeaders=!0;const h=s.join("");U(Ot,`Creating RPC '${e}' stream ${r}: ${h}`,u);const d=a.createWebChannel(h,u);this.I_(d);let m=!1,g=!1;const R=new M3({Yo:V=>{g?U(Ot,`Not sending because RPC '${e}' stream ${r} is closed:`,V):(m||(U(Ot,`Opening RPC '${e}' stream ${r} transport.`),d.open(),m=!0),U(Ot,`RPC '${e}' stream ${r} sending:`,V),d.send(V))},Zo:()=>d.close()}),D=(V,w,v)=>{V.listen(w,I=>{try{v(I)}catch(C){setTimeout(()=>{throw C},0)}})};return D(d,ou.EventType.OPEN,()=>{g||(U(Ot,`RPC '${e}' stream ${r} transport opened.`),R.o_())}),D(d,ou.EventType.CLOSE,()=>{g||(g=!0,U(Ot,`RPC '${e}' stream ${r} transport closed`),R.a_(),this.E_(d))}),D(d,ou.EventType.ERROR,V=>{g||(g=!0,mi(Ot,`RPC '${e}' stream ${r} transport errored. Name:`,V.name,"Message:",V.message),R.a_(new L(k.UNAVAILABLE,"The operation could not be completed")))}),D(d,ou.EventType.MESSAGE,V=>{var w;if(!g){const v=V.data[0];Q(!!v,16349);const I=v,C=(I==null?void 0:I.error)||((w=I[0])==null?void 0:w.error);if(C){U(Ot,`RPC '${e}' stream ${r} received error:`,C);const z=C.status;let F=function(E){const b=tt[E];if(b!==void 0)return nD(b)}(z),T=C.message;F===void 0&&(F=k.INTERNAL,T="Unknown error status: "+z+" with message "+C.message),g=!0,R.a_(new L(F,T)),d.close()}else U(Ot,`RPC '${e}' stream ${r} received:`,v),R.u_(v)}}),D(o,J1.STAT_EVENT,V=>{V.stat===d_.PROXY?U(Ot,`RPC '${e}' stream ${r} detected buffering proxy`):V.stat===d_.NOPROXY&&U(Ot,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{R.__()},0),R}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(n=>n===e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jD(){return typeof window<"u"?window:null}function Tf(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eh(t){return new F6(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e,n,i=1e3,r=1.5,s=6e4){this.Mi=e,this.timerId=n,this.d_=i,this.A_=r,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),i=Math.max(0,Date.now()-this.f_),r=Math.max(0,n-i);r>0&&U("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${i} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JA="PersistentStream";class GD{constructor(e,n,i,r,s,a,o,u){this.Mi=e,this.S_=i,this.b_=r,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=o,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new tT(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===k.RESOURCE_EXHAUSTED?(Xe(n.toString()),Xe("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,r])=>{this.D_===n&&this.G_(i,r)},i=>{e(()=>{const r=new L(k.UNKNOWN,"Fetching auth token failed: "+i.message);return this.z_(r)})})}G_(e,n){const i=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo(()=>{i(()=>this.listener.Xo())}),this.stream.t_(()=>{i(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(r=>{i(()=>this.z_(r))}),this.stream.onMessage(r=>{i(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return U(JA,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget(()=>this.D_===e?n():(U(JA,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class L3 extends GD{constructor(e,n,i,r,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,i,r,a),this.serializer=s}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=j6(this.serializer,e),i=function(s){if(!("targetChange"in s))return Y.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?Y.min():a.readTime?Ze(a.readTime):Y.min()}(e);return this.listener.H_(n,i)}Y_(e){const n={};n.database=C_(this.serializer),n.addTarget=function(s,a){let o;const u=a.target;if(o=cd(u)?{documents:fD(s,u)}:{query:dD(s,u).ft},o.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){o.resumeToken=aD(s,a.resumeToken);const c=S_(s,a.expectedCount);c!==null&&(o.expectedCount=c)}else if(a.snapshotVersion.compareTo(Y.min())>0){o.readTime=jo(s,a.snapshotVersion.toTimestamp());const c=S_(s,a.expectedCount);c!==null&&(o.expectedCount=c)}return o}(this.serializer,e);const i=K6(this.serializer,e);i&&(n.labels=i),this.q_(n)}Z_(e){const n={};n.database=C_(this.serializer),n.removeTarget=e,this.q_(n)}}class U3 extends GD{constructor(e,n,i,r,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,i,r,a),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return Q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=G6(e.writeResults,e.commitTime),i=Ze(e.commitTime);return this.listener.na(i,n)}ra(){const e={};e.database=C_(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(i=>vc(this.serializer,i))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z3{}class B3 extends z3{constructor(e,n,i,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=i,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new L(k.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,i,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Go(e,R_(n,i),r,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new L(k.UNKNOWN,s.toString())})}Ho(e,n,i,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,o])=>this.connection.Ho(e,R_(n,i),r,a,o,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new L(k.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class F3{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Xe(n),this.aa=!1):U("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la="RemoteStore";class q3{constructor(e,n,i,r,s){this.localStore=e,this.datastore=n,this.asyncQueue=i,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(a=>{i.enqueueAndForget(async()=>{cs(this)&&(U(la,"Restarting streams for network reachability change."),await async function(u){const c=j(u);c.Ea.add(4),await ml(c),c.Ra.set("Unknown"),c.Ea.delete(4),await th(c)}(this))})}),this.Ra=new F3(i,r)}}async function th(t){if(cs(t))for(const e of t.da)await e(!0)}async function ml(t){for(const e of t.da)await e(!1)}function _m(t,e){const n=j(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),rT(n)?iT(n):gl(n).O_()&&nT(n,e))}function Qo(t,e){const n=j(t),i=gl(n);n.Ia.delete(e),i.O_()&&KD(n,e),n.Ia.size===0&&(i.O_()?i.L_():cs(n)&&n.Ra.set("Unknown"))}function nT(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Y.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}gl(t).Y_(e)}function KD(t,e){t.Va.Ue(e),gl(t).Z_(e)}function iT(t){t.Va=new L6({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),gl(t).start(),t.Ra.ua()}function rT(t){return cs(t)&&!gl(t).x_()&&t.Ia.size>0}function cs(t){return j(t).Ea.size===0}function QD(t){t.Va=void 0}async function H3(t){t.Ra.set("Online")}async function j3(t){t.Ia.forEach((e,n)=>{nT(t,e)})}async function G3(t,e){QD(t),rT(t)?(t.Ra.ha(e),iT(t)):t.Ra.set("Unknown")}async function K3(t,e,n){if(t.Ra.set("Online"),e instanceof sD&&e.state===2&&e.cause)try{await async function(r,s){const a=s.cause;for(const o of s.targetIds)r.Ia.has(o)&&(await r.remoteSyncer.rejectListen(o,a),r.Ia.delete(o),r.Va.removeTarget(o))}(t,e)}catch(i){U(la,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await Td(t,i)}else if(e instanceof yf?t.Va.Ze(e):e instanceof rD?t.Va.st(e):t.Va.tt(e),!n.isEqual(Y.min()))try{const i=await MD(t.localStore);n.compareTo(i)>=0&&await function(s,a){const o=s.Va.Tt(a);return o.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const h=s.Ia.get(c);h&&s.Ia.set(c,h.withResumeToken(u.resumeToken,a))}}),o.targetMismatches.forEach((u,c)=>{const h=s.Ia.get(u);if(!h)return;s.Ia.set(u,h.withResumeToken(Ke.EMPTY_BYTE_STRING,h.snapshotVersion)),KD(s,u);const d=new Di(h.target,u,c,h.sequenceNumber);nT(s,d)}),s.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(i){U(la,"Failed to raise snapshot:",i),await Td(t,i)}}async function Td(t,e,n){if(!ls(e))throw e;t.Ea.add(1),await ml(t),t.Ra.set("Offline"),n||(n=()=>MD(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{U(la,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await th(t)})}function YD(t,e){return e().catch(n=>Td(t,n,e))}async function pl(t){const e=j(t),n=es(e);let i=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Br;for(;Q3(e);)try{const r=await D3(e.localStore,i);if(r===null){e.Ta.length===0&&n.L_();break}i=r.batchId,Y3(e,r)}catch(r){await Td(e,r)}$D(e)&&WD(e)}function Q3(t){return cs(t)&&t.Ta.length<10}function Y3(t,e){t.Ta.push(e);const n=es(t);n.O_()&&n.X_&&n.ea(e.mutations)}function $D(t){return cs(t)&&!es(t).x_()&&t.Ta.length>0}function WD(t){es(t).start()}async function $3(t){es(t).ra()}async function W3(t){const e=es(t);for(const n of t.Ta)e.ea(n.mutations)}async function X3(t,e,n){const i=t.Ta.shift(),r=Fv.from(i,e,n);await YD(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await pl(t)}async function J3(t,e){e&&es(t).X_&&await async function(i,r){if(function(a){return tD(a)&&a!==k.ABORTED}(r.code)){const s=i.Ta.shift();es(i).B_(),await YD(i,()=>i.remoteSyncer.rejectFailedWrite(s.batchId,r)),await pl(i)}}(t,e),$D(t)&&WD(t)}async function ZA(t,e){const n=j(t);n.asyncQueue.verifyOperationInProgress(),U(la,"RemoteStore received new credentials");const i=cs(n);n.Ea.add(3),await ml(n),i&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await th(n)}async function M_(t,e){const n=j(t);e?(n.Ea.delete(2),await th(n)):e||(n.Ea.add(2),await ml(n),n.Ra.set("Unknown"))}function gl(t){return t.ma||(t.ma=function(n,i,r){const s=j(n);return s.sa(),new L3(i,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Xo:H3.bind(null,t),t_:j3.bind(null,t),r_:G3.bind(null,t),H_:K3.bind(null,t)}),t.da.push(async e=>{e?(t.ma.B_(),rT(t)?iT(t):t.Ra.set("Unknown")):(await t.ma.stop(),QD(t))})),t.ma}function es(t){return t.fa||(t.fa=function(n,i,r){const s=j(n);return s.sa(),new U3(i,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:$3.bind(null,t),r_:J3.bind(null,t),ta:W3.bind(null,t),na:X3.bind(null,t)}),t.da.push(async e=>{e?(t.fa.B_(),await pl(t)):(await t.fa.stop(),t.Ta.length>0&&(U(la,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e,n,i,r,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=i,this.op=r,this.removalCallback=s,this.deferred=new Rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,i,r,s){const a=Date.now()+i,o=new sT(e,n,a,r,s);return o.start(i),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function _l(t,e){if(Xe("AsyncQueue",`${e}: ${t}`),ls(t))return new L(k.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{static emptySet(e){return new _o(e.comparator)}constructor(e){this.comparator=e?(n,i)=>e(n,i)||q.comparator(n.key,i.key):(n,i)=>q.comparator(n.key,i.key),this.keyedMap=lu(),this.sortedSet=new Re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,i)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof _o)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,s=i.getNext().key;if(!r.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const i=new _o;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=n,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(){this.ga=new Re(q.comparator)}track(e){const n=e.doc.key,i=this.ga.get(n);i?e.type!==0&&i.type===3?this.ga=this.ga.insert(n,e):e.type===3&&i.type!==1?this.ga=this.ga.insert(n,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.ga=this.ga.remove(n):e.type===1&&i.type===2?this.ga=this.ga.insert(n,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):G(63341,{Rt:e,pa:i}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,i)=>{e.push(i)}),e}}class Yo{constructor(e,n,i,r,s,a,o,u,c){this.query=e,this.docs=n,this.oldDocs=i,this.docChanges=r,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=o,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,i,r,s){const a=[];return n.forEach(o=>{a.push({type:0,doc:o})}),new Yo(e,n,_o.emptySet(n),a,i,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&$c(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,i=e.docChanges;if(n.length!==i.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==i[r].type||!n[r].doc.isEqual(i[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z3{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class ez{constructor(){this.queries=tb(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,i){const r=j(n),s=r.queries;r.queries=tb(),s.forEach((a,o)=>{for(const u of o.Sa)u.onError(i)})})(this,new L(k.ABORTED,"Firestore shutting down"))}}function tb(){return new Wi(t=>FC(t),$c)}async function aT(t,e){const n=j(t);let i=3;const r=e.query;let s=n.queries.get(r);s?!s.ba()&&e.Da()&&(i=2):(s=new Z3,i=e.Da()?0:1);try{switch(i){case 0:s.wa=await n.onListen(r,!0);break;case 1:s.wa=await n.onListen(r,!1);break;case 2:await n.onFirstRemoteStoreListen(r)}}catch(a){const o=_l(a,`Initialization of query '${Fa(e.query)}' failed`);return void e.onError(o)}n.queries.set(r,s),s.Sa.push(e),e.va(n.onlineState),s.wa&&e.Fa(s.wa)&&lT(n)}async function oT(t,e){const n=j(t),i=e.query;let r=3;const s=n.queries.get(i);if(s){const a=s.Sa.indexOf(e);a>=0&&(s.Sa.splice(a,1),s.Sa.length===0?r=e.Da()?0:1:!s.ba()&&e.Da()&&(r=2))}switch(r){case 0:return n.queries.delete(i),n.onUnlisten(i,!0);case 1:return n.queries.delete(i),n.onUnlisten(i,!1);case 2:return n.onLastRemoteStoreUnlisten(i);default:return}}function tz(t,e){const n=j(t);let i=!1;for(const r of e){const s=r.query,a=n.queries.get(s);if(a){for(const o of a.Sa)o.Fa(r)&&(i=!0);a.wa=r}}i&&lT(n)}function nz(t,e,n){const i=j(t),r=i.queries.get(e);if(r)for(const s of r.Sa)s.onError(n);i.queries.delete(e)}function lT(t){t.Ca.forEach(e=>{e.next()})}var x_,nb;(nb=x_||(x_={})).Ma="default",nb.Cache="cache";class uT{constructor(e,n,i){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=i||{}}Fa(e){if(!this.options.includeMetadataChanges){const i=[];for(const r of e.docChanges)r.type!==3&&i.push(r);e=new Yo(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const i=n!=="Offline";return(!this.options.qa||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=Yo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==x_.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iz{constructor(e,n){this.Qa=e,this.byteLength=n}$a(){return"metadata"in this.Qa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ib{constructor(e){this.serializer=e}$s(e){return hi(this.serializer,e)}Us(e){return e.metadata.exists?hD(this.serializer,e.document,!1):Pe.newNoDocument(this.$s(e.metadata.name),this.Ks(e.metadata.readTime))}Ks(e){return Ze(e)}}class rz{constructor(e,n){this.Ua=e,this.serializer=n,this.Ka=[],this.Wa=[],this.collectionGroups=new Set,this.progress=XD(e)}get queries(){return this.Ka}get documents(){return this.Wa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let n=this.progress.documentsLoaded;if(e.Qa.namedQuery)this.Ka.push(e.Qa.namedQuery);else if(e.Qa.documentMetadata){this.Wa.push({metadata:e.Qa.documentMetadata}),e.Qa.documentMetadata.exists||++n;const i=oe.fromString(e.Qa.documentMetadata.name);this.collectionGroups.add(i.get(i.length-2))}else e.Qa.document&&(this.Wa[this.Wa.length-1].document=e.Qa.document,++n);return n!==this.progress.documentsLoaded?(this.progress.documentsLoaded=n,{...this.progress}):null}za(e){const n=new Map,i=new ib(this.serializer);for(const r of e)if(r.metadata.queries){const s=i.$s(r.metadata.name);for(const a of r.metadata.queries){const o=(n.get(a)||te()).add(s);n.set(a,o)}}return n}async ja(e){const n=await N3(e,new ib(this.serializer),this.Wa,this.Ua.id),i=this.za(this.documents);for(const r of this.Ka)await P3(e,r,i.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:n}}}function XD(t){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JD{constructor(e){this.key=e}}class ZD{constructor(e){this.key=e}}class eN{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=te(),this.mutatedKeys=te(),this.eu=HC(e),this.tu=new _o(this.eu)}get nu(){return this.Ya}ru(e,n){const i=n?n.iu:new eb,r=n?n.tu:this.tu;let s=n?n.mutatedKeys:this.mutatedKeys,a=r,o=!1;const u=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,c=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((h,d)=>{const m=r.get(h),g=Wc(this.query,d)?d:null,R=!!m&&this.mutatedKeys.has(m.key),D=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let V=!1;m&&g?m.data.isEqual(g.data)?R!==D&&(i.track({type:3,doc:g}),V=!0):this.su(m,g)||(i.track({type:2,doc:g}),V=!0,(u&&this.eu(g,u)>0||c&&this.eu(g,c)<0)&&(o=!0)):!m&&g?(i.track({type:0,doc:g}),V=!0):m&&!g&&(i.track({type:1,doc:m}),V=!0,(u||c)&&(o=!0)),V&&(g?(a=a.add(g),s=D?s.add(h):s.delete(h)):(a=a.delete(h),s=s.delete(h)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const h=this.query.limitType==="F"?a.last():a.first();a=a.delete(h.key),s=s.delete(h.key),i.track({type:1,doc:h})}return{tu:a,iu:i,Cs:o,mutatedKeys:s}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,i,r){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((h,d)=>function(g,R){const D=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{Rt:V})}};return D(g)-D(R)}(h.type,d.type)||this.eu(h.doc,d.doc)),this.ou(i),r=r??!1;const o=n&&!r?this._u():[],u=this.Xa.size===0&&this.current&&!r?1:0,c=u!==this.Za;return this.Za=u,a.length!==0||c?{snapshot:new Yo(this.query,e.tu,s,a,e.mutatedKeys,u===0,c,!1,!!i&&i.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new eb,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Ya=this.Ya.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ya=this.Ya.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=te(),this.tu.forEach(i=>{this.uu(i.key)&&(this.Xa=this.Xa.add(i.key))});const n=[];return e.forEach(i=>{this.Xa.has(i)||n.push(new ZD(i))}),this.Xa.forEach(i=>{e.has(i)||n.push(new JD(i))}),n}cu(e){this.Ya=e.Qs,this.Xa=te();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return Yo.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const hs="SyncEngine";class sz{constructor(e,n,i){this.query=e,this.targetId=n,this.view=i}}class az{constructor(e){this.key=e,this.hu=!1}}class oz{constructor(e,n,i,r,s,a){this.localStore=e,this.remoteStore=n,this.eventManager=i,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Wi(o=>FC(o),$c),this.Iu=new Map,this.Eu=new Set,this.du=new Re(q.comparator),this.Au=new Map,this.Ru=new Yv,this.Vu={},this.mu=new Map,this.fu=oa.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function lz(t,e,n=!0){const i=ym(t);let r;const s=i.Tu.get(e);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),r=s.view.lu()):r=await tN(i,e,n,!0),r}async function uz(t,e){const n=ym(t);await tN(n,e,!0,!1)}async function tN(t,e,n,i){const r=await Go(t.localStore,jt(e)),s=r.targetId,a=t.sharedClientState.addLocalQueryTarget(s,n);let o;return i&&(o=await cT(t,e,s,a==="current",r.resumeToken)),t.isPrimaryClient&&n&&_m(t.remoteStore,r),o}async function cT(t,e,n,i,r){t.pu=(d,m,g)=>async function(D,V,w,v){let I=V.view.ru(w);I.Cs&&(I=await _d(D.localStore,V.query,!1).then(({documents:T})=>V.view.ru(T,I)));const C=v&&v.targetChanges.get(V.targetId),z=v&&v.targetMismatches.get(V.targetId)!=null,F=V.view.applyChanges(I,D.isPrimaryClient,C,z);return L_(D,V.targetId,F.au),F.snapshot}(t,d,m,g);const s=await _d(t.localStore,e,!0),a=new eN(e,s.Qs),o=a.ru(s.documents),u=Zc.createSynthesizedTargetChangeForCurrentChange(n,i&&t.onlineState!=="Offline",r),c=a.applyChanges(o,t.isPrimaryClient,u);L_(t,n,c.au);const h=new sz(e,n,a);return t.Tu.set(e,h),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),c.snapshot}async function cz(t,e,n){const i=j(t),r=i.Tu.get(e),s=i.Iu.get(r.targetId);if(s.length>1)return i.Iu.set(r.targetId,s.filter(a=>!$c(a,e))),void i.Tu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(r.targetId),i.sharedClientState.isActiveQueryTarget(r.targetId)||await Ko(i.localStore,r.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(r.targetId),n&&Qo(i.remoteStore,r.targetId),$o(i,r.targetId)}).catch(os)):($o(i,r.targetId),await Ko(i.localStore,r.targetId,!0))}async function hz(t,e){const n=j(t),i=n.Tu.get(e),r=n.Iu.get(i.targetId);n.isPrimaryClient&&r.length===1&&(n.sharedClientState.removeLocalQueryTarget(i.targetId),Qo(n.remoteStore,i.targetId))}async function fz(t,e,n){const i=mT(t);try{const r=await function(a,o){const u=j(a),c=pe.now(),h=o.reduce((g,R)=>g.add(R.key),te());let d,m;return u.persistence.runTransaction("Locally write mutations","readwrite",g=>{let R=tn(),D=te();return u.Ns.getEntries(g,h).next(V=>{R=V,R.forEach((w,v)=>{v.isValidDocument()||(D=D.add(w))})}).next(()=>u.localDocuments.getOverlayedDocuments(g,R)).next(V=>{d=V;const w=[];for(const v of o){const I=k6(v,d.get(v.key).overlayedDocument);I!=null&&w.push(new Xi(v.key,I,OC(I.value.mapValue),ze.exists(!0)))}return u.mutationQueue.addMutationBatch(g,c,w,o)}).next(V=>{m=V;const w=V.applyToLocalDocumentSet(d,D);return u.documentOverlayCache.saveOverlays(g,V.batchId,w)})}).then(()=>({batchId:m.batchId,changes:GC(d)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(r.batchId),function(a,o,u){let c=a.Vu[a.currentUser.toKey()];c||(c=new Re(X)),c=c.insert(o,u),a.Vu[a.currentUser.toKey()]=c}(i,r.batchId,n),await Ji(i,r.changes),await pl(i.remoteStore)}catch(r){const s=_l(r,"Failed to persist write");n.reject(s)}}async function nN(t,e){const n=j(t);try{const i=await C3(n.localStore,e);e.targetChanges.forEach((r,s)=>{const a=n.Au.get(s);a&&(Q(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?a.hu=!0:r.modifiedDocuments.size>0?Q(a.hu,14607):r.removedDocuments.size>0&&(Q(a.hu,42227),a.hu=!1))}),await Ji(n,i,e)}catch(i){await os(i)}}function rb(t,e,n){const i=j(t);if(i.isPrimaryClient&&n===0||!i.isPrimaryClient&&n===1){const r=[];i.Tu.forEach((s,a)=>{const o=a.view.va(e);o.snapshot&&r.push(o.snapshot)}),function(a,o){const u=j(a);u.onlineState=o;let c=!1;u.queries.forEach((h,d)=>{for(const m of d.Sa)m.va(o)&&(c=!0)}),c&&lT(u)}(i.eventManager,e),r.length&&i.Pu.H_(r),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function dz(t,e,n){const i=j(t);i.sharedClientState.updateQueryState(e,"rejected",n);const r=i.Au.get(e),s=r&&r.key;if(s){let a=new Re(q.comparator);a=a.insert(s,Pe.newNoDocument(s,Y.min()));const o=te().add(s),u=new Jc(Y.min(),new Map,new Re(X),a,o);await nN(i,u),i.du=i.du.remove(s),i.Au.delete(e),dT(i)}else await Ko(i.localStore,e,!1).then(()=>$o(i,e,n)).catch(os)}async function mz(t,e){const n=j(t),i=e.batch.batchId;try{const r=await R3(n.localStore,e);fT(n,i,null),hT(n,i),n.sharedClientState.updateMutationState(i,"acknowledged"),await Ji(n,r)}catch(r){await os(r)}}async function pz(t,e,n){const i=j(t);try{const r=await function(a,o){const u=j(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let h;return u.mutationQueue.lookupMutationBatch(c,o).next(d=>(Q(d!==null,37113),h=d.keys(),u.mutationQueue.removeMutationBatch(c,d))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,h,o)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,h)).next(()=>u.localDocuments.getDocuments(c,h))})}(i.localStore,e);fT(i,e,n),hT(i,e),i.sharedClientState.updateMutationState(e,"rejected",n),await Ji(i,r)}catch(r){await os(r)}}async function gz(t,e){const n=j(t);cs(n.remoteStore)||U(hs,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const i=await function(a){const o=j(a);return o.persistence.runTransaction("Get highest unacknowledged batch id","readonly",u=>o.mutationQueue.getHighestUnacknowledgedBatchId(u))}(n.localStore);if(i===Br)return void e.resolve();const r=n.mu.get(i)||[];r.push(e),n.mu.set(i,r)}catch(i){const r=_l(i,"Initialization of waitForPendingWrites() operation failed");e.reject(r)}}function hT(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function fT(t,e,n){const i=j(t);let r=i.Vu[i.currentUser.toKey()];if(r){const s=r.get(e);s&&(n?s.reject(n):s.resolve(),r=r.remove(e)),i.Vu[i.currentUser.toKey()]=r}}function $o(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const i of t.Iu.get(e))t.Tu.delete(i),n&&t.Pu.yu(i,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach(i=>{t.Ru.containsKey(i)||iN(t,i)})}function iN(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(Qo(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),dT(t))}function L_(t,e,n){for(const i of n)i instanceof JD?(t.Ru.addReference(i.key,e),_z(t,i)):i instanceof ZD?(U(hs,"Document no longer in limbo: "+i.key),t.Ru.removeReference(i.key,e),t.Ru.containsKey(i.key)||iN(t,i.key)):G(19791,{wu:i})}function _z(t,e){const n=e.key,i=n.path.canonicalString();t.du.get(n)||t.Eu.has(i)||(U(hs,"New document in limbo: "+n),t.Eu.add(i),dT(t))}function dT(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new q(oe.fromString(e)),i=t.fu.next();t.Au.set(i,new az(n)),t.du=t.du.insert(n,i),_m(t.remoteStore,new Di(jt(hl(n.path)),i,"TargetPurposeLimboResolution",Zt.ce))}}async function Ji(t,e,n){const i=j(t),r=[],s=[],a=[];i.Tu.isEmpty()||(i.Tu.forEach((o,u)=>{a.push(i.pu(u,e,n).then(c=>{var h;if((c||n)&&i.isPrimaryClient){const d=c?!c.fromCache:(h=n==null?void 0:n.targetChanges.get(u.targetId))==null?void 0:h.current;i.sharedClientState.updateQueryState(u.targetId,d?"current":"not-current")}if(c){r.push(c);const d=Jv.As(u.targetId,c);s.push(d)}}))}),await Promise.all(a),i.Pu.H_(r),await async function(u,c){const h=j(u);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>N.forEach(c,m=>N.forEach(m.Es,g=>h.persistence.referenceDelegate.addReference(d,m.targetId,g)).next(()=>N.forEach(m.ds,g=>h.persistence.referenceDelegate.removeReference(d,m.targetId,g)))))}catch(d){if(!ls(d))throw d;U(Zv,"Failed to update sequence numbers: "+d)}for(const d of c){const m=d.targetId;if(!d.fromCache){const g=h.Ms.get(m),R=g.snapshotVersion,D=g.withLastLimboFreeSnapshotVersion(R);h.Ms=h.Ms.insert(m,D)}}}(i.localStore,s))}async function yz(t,e){const n=j(t);if(!n.currentUser.isEqual(e)){U(hs,"User change. New user:",e.toKey());const i=await kD(n.localStore,e);n.currentUser=e,function(s,a){s.mu.forEach(o=>{o.forEach(u=>{u.reject(new L(k.CANCELLED,a))})}),s.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await Ji(n,i.Ls)}}function vz(t,e){const n=j(t),i=n.Au.get(e);if(i&&i.hu)return te().add(i.key);{let r=te();const s=n.Iu.get(e);if(!s)return r;for(const a of s){const o=n.Tu.get(a);r=r.unionWith(o.view.nu)}return r}}async function Tz(t,e){const n=j(t),i=await _d(n.localStore,e.query,!0),r=e.view.cu(i);return n.isPrimaryClient&&L_(n,e.targetId,r.au),r}async function Ez(t,e){const n=j(t);return UD(n.localStore,e).then(i=>Ji(n,i))}async function wz(t,e,n,i){const r=j(t),s=await function(o,u){const c=j(o),h=j(c.mutationQueue);return c.persistence.runTransaction("Lookup mutation documents","readonly",d=>h.er(d,u).next(m=>m?c.localDocuments.getDocuments(d,m):N.resolve(null)))}(r.localStore,e);s!==null?(n==="pending"?await pl(r.remoteStore):n==="acknowledged"||n==="rejected"?(fT(r,e,i||null),hT(r,e),function(o,u){j(j(o).mutationQueue).ir(u)}(r.localStore,e)):G(6720,"Unknown batchState",{Su:n}),await Ji(r,s)):U(hs,"Cannot apply mutation batch with id: "+e)}async function Iz(t,e){const n=j(t);if(ym(n),mT(n),e===!0&&n.gu!==!0){const i=n.sharedClientState.getAllActiveQueryTargets(),r=await sb(n,i.toArray());n.gu=!0,await M_(n.remoteStore,!0);for(const s of r)_m(n.remoteStore,s)}else if(e===!1&&n.gu!==!1){const i=[];let r=Promise.resolve();n.Iu.forEach((s,a)=>{n.sharedClientState.isLocalQueryTarget(a)?i.push(a):r=r.then(()=>($o(n,a),Ko(n.localStore,a,!0))),Qo(n.remoteStore,a)}),await r,await sb(n,i),function(a){const o=j(a);o.Au.forEach((u,c)=>{Qo(o.remoteStore,c)}),o.Ru.Jr(),o.Au=new Map,o.du=new Re(q.comparator)}(n),n.gu=!1,await M_(n.remoteStore,!1)}}async function sb(t,e,n){const i=j(t),r=[],s=[];for(const a of e){let o;const u=i.Iu.get(a);if(u&&u.length!==0){o=await Go(i.localStore,jt(u[0]));for(const c of u){const h=i.Tu.get(c),d=await Tz(i,h);d.snapshot&&s.push(d.snapshot)}}else{const c=await LD(i.localStore,a);o=await Go(i.localStore,c),await cT(i,rN(c),a,!1,o.resumeToken)}r.push(o)}return i.Pu.H_(s),r}function rN(t){return BC(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function Az(t){return function(n){return j(j(n).persistence).Ts()}(j(t).localStore)}async function bz(t,e,n,i){const r=j(t);if(r.gu)return void U(hs,"Ignoring unexpected query state notification.");const s=r.Iu.get(e);if(s&&s.length>0)switch(n){case"current":case"not-current":{const a=await UD(r.localStore,qC(s[0])),o=Jc.createSynthesizedRemoteEventForCurrentChange(e,n==="current",Ke.EMPTY_BYTE_STRING);await Ji(r,a,o);break}case"rejected":await Ko(r.localStore,e,!0),$o(r,e,i);break;default:G(64155,n)}}async function Sz(t,e,n){const i=ym(t);if(i.gu){for(const r of e){if(i.Iu.has(r)&&i.sharedClientState.isActiveQueryTarget(r)){U(hs,"Adding an already active target "+r);continue}const s=await LD(i.localStore,r),a=await Go(i.localStore,s);await cT(i,rN(s),a.targetId,!1,a.resumeToken),_m(i.remoteStore,a)}for(const r of n)i.Iu.has(r)&&await Ko(i.localStore,r,!1).then(()=>{Qo(i.remoteStore,r),$o(i,r)}).catch(os)}}function ym(t){const e=j(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=nN.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=vz.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=dz.bind(null,e),e.Pu.H_=tz.bind(null,e.eventManager),e.Pu.yu=nz.bind(null,e.eventManager),e}function mT(t){const e=j(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=mz.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=pz.bind(null,e),e}function Rz(t,e,n){const i=j(t);(async function(s,a,o){try{const u=await a.getMetadata();if(await function(g,R){const D=j(g),V=Ze(R.createTime);return D.persistence.runTransaction("hasNewerBundle","readonly",w=>D.Ii.getBundleMetadata(w,R.id)).then(w=>!!w&&w.createTime.compareTo(V)>=0)}(s.localStore,u))return await a.close(),o._completeWith(function(g){return{taskState:"Success",documentsLoaded:g.totalDocuments,bytesLoaded:g.totalBytes,totalDocuments:g.totalDocuments,totalBytes:g.totalBytes}}(u)),Promise.resolve(new Set);o._updateProgress(XD(u));const c=new rz(u,a.serializer);let h=await a.bu();for(;h;){const m=await c.Ga(h);m&&o._updateProgress(m),h=await a.bu()}const d=await c.ja(s.localStore);return await Ji(s,d.Ha,void 0),await function(g,R){const D=j(g);return D.persistence.runTransaction("Save bundle","readwrite",V=>D.Ii.saveBundleMetadata(V,R))}(s.localStore,u),o._completeWith(d.progress),Promise.resolve(d.Ja)}catch(u){return mi(hs,`Loading bundle failed with ${u}`),o._failWith(u),Promise.resolve(new Set)}})(i,e,n).then(r=>{i.sharedClientState.notifyBundleLoaded(r)})}class Tc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=eh(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return VD(this.persistence,new OD,e.initialUser,this.serializer)}Cu(e){return new $v(gm.mi,this.serializer)}Du(e){return new HD}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Tc.provider={build:()=>new Tc};class Cz extends Tc{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){Q(this.persistence.referenceDelegate instanceof gd,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new SD(i,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?Vt.withCacheSize(this.cacheSizeBytes):Vt.DEFAULT;return new $v(i=>gd.mi(i,n),this.serializer)}}class sN extends Tc{constructor(e,n,i){super(),this.xu=e,this.cacheSizeBytes=n,this.forceOwnership=i,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await mT(this.xu.syncEngine),await pl(this.xu.remoteStore),await this.persistence.Ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return VD(this.persistence,new OD,e.initialUser,this.serializer)}Fu(e,n){const i=this.persistence.referenceDelegate.garbageCollector;return new SD(i,e.asyncQueue,n)}Mu(e,n){const i=new L4(n,this.persistence);return new x4(e.asyncQueue,i)}Cu(e){const n=Xv(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),i=this.cacheSizeBytes!==void 0?Vt.withCacheSize(this.cacheSizeBytes):Vt.DEFAULT;return new Wv(this.synchronizeTabs,n,e.clientId,i,e.asyncQueue,jD(),Tf(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new HD}}class Dz extends sN{constructor(e,n){super(e,n,!1),this.xu=e,this.cacheSizeBytes=n,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const n=this.xu.syncEngine;this.sharedClientState instanceof eg&&(this.sharedClientState.syncEngine={Co:wz.bind(null,n),vo:bz.bind(null,n),Fo:Sz.bind(null,n),Ts:Az.bind(null,n),Do:Ez.bind(null,n)},await this.sharedClientState.start()),await this.persistence.Ji(async i=>{await Iz(this.xu.syncEngine,i),this.gcScheduler&&(i&&!this.gcScheduler.started?this.gcScheduler.start():i||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(i&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():i||this.indexBackfillerScheduler.stop())})}Du(e){const n=jD();if(!eg.v(n))throw new L(k.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const i=Xv(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new eg(n,e.asyncQueue,i,e.clientId,e.initialUser)}}class Ec{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>rb(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=yz.bind(null,this.syncEngine),await M_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ez}()}createDatastore(e){const n=eh(e.databaseInfo.databaseId),i=function(s){return new x3(s)}(e.databaseInfo);return function(s,a,o,u){return new B3(s,a,o,u)}(e.authCredentials,e.appCheckCredentials,i,n)}createRemoteStore(e){return function(i,r,s,a,o){return new q3(i,r,s,a,o)}(this.localStore,this.datastore,e.asyncQueue,n=>rb(this.syncEngine,n,0),function(){return XA.v()?new XA:new O3}())}createSyncEngine(e,n){return function(r,s,a,o,u,c,h){const d=new oz(r,s,a,o,u,c);return h&&(d.gu=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(r){const s=j(r);U(la,"RemoteStore shutting down."),s.Ea.add(5),await ml(s),s.Aa.shutdown(),s.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}Ec.provider={build:()=>new Ec};function ab(t,e=10240){let n=0;return{async read(){if(n<t.byteLength){const i={value:t.slice(n,n+e),done:!1};return n+=e,i}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Xe("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nz{constructor(e,n){this.Bu=e,this.serializer=n,this.metadata=new Rt,this.buffer=new Uint8Array,this.Lu=function(){return new TextDecoder("utf-8")}(),this.ku().then(i=>{i&&i.$a()?this.metadata.resolve(i.Qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(i==null?void 0:i.Qa)}`))},i=>this.metadata.reject(i))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(e===null)return null;const n=this.Lu.decode(e),i=Number(n);isNaN(i)&&this.Qu(`length string (${n}) is not valid number`);const r=await this.$u(i);return new iz(JSON.parse(r),e.length+i)}Uu(){return this.buffer.findIndex(e=>e===123)}async qu(){for(;this.Uu()<0&&!await this.Ku(););if(this.buffer.length===0)return null;const e=this.Uu();e<0&&this.Qu("Reached the end of bundle when a length string is expected.");const n=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),n}async $u(e){for(;this.buffer.length<e;)await this.Ku()&&this.Qu("Reached the end of bundle when more is expected.");const n=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),n}Qu(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Ku(){const e=await this.Bu.read();if(!e.done){const n=new Uint8Array(this.buffer.length+e.value.length);n.set(this.buffer),n.set(e.value,this.buffer.length),this.buffer=n}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pz{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new L(k.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const n=await async function(r,s){const a=j(r),o={documents:s.map(d=>yc(a.serializer,d))},u=await a.Ho("BatchGetDocuments",a.serializer.databaseId,oe.emptyPath(),o,s.length),c=new Map;u.forEach(d=>{const m=H6(a.serializer,d);c.set(m.key.toString(),m)});const h=[];return s.forEach(d=>{const m=c.get(d.toString());Q(!!m,55234,{key:d}),h.push(m)}),h}(this.datastore,e);return n.forEach(i=>this.recordVersion(i)),n}set(e,n){this.write(n.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,n){try{this.write(n.toMutation(e,this.preconditionForUpdate(e)))}catch(i){this.lastTransactionError=i}this.writtenDocs.add(e.toString())}delete(e){this.write(new dl(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(n=>{e.delete(n.key.toString())}),e.forEach((n,i)=>{const r=q.fromPath(i);this.mutations.push(new zv(r,this.precondition(r)))}),await async function(i,r){const s=j(i),a={writes:r.map(o=>vc(s.serializer,o))};await s.Go("Commit",s.serializer.databaseId,oe.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let n;if(e.isFoundDocument())n=e.version;else{if(!e.isNoDocument())throw G(50498,{Gu:e.constructor.name});n=Y.min()}const i=this.readVersions.get(e.key.toString());if(i){if(!n.isEqual(i))throw new L(k.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),n)}precondition(e){const n=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&n?n.isEqual(Y.min())?ze.exists(!1):ze.updateTime(n):ze.none()}preconditionForUpdate(e){const n=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&n){if(n.isEqual(Y.min()))throw new L(k.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ze.updateTime(n)}return ze.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oz{constructor(e,n,i,r,s){this.asyncQueue=e,this.datastore=n,this.options=i,this.updateFunction=r,this.deferred=s,this.zu=i.maxAttempts,this.M_=new tT(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const e=new Pz(this.datastore),n=this.Hu(e);n&&n.then(i=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(i)}).catch(r=>{this.Yu(r)}))}).catch(i=>{this.Yu(i)})})}Hu(e){try{const n=this.updateFunction(e);return!Kc(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}Yu(e){this.zu>0&&this.Zu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Zu(e){if((e==null?void 0:e.name)==="FirebaseError"){const n=e.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!tD(n)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ts="FirestoreClient";class Vz{constructor(e,n,i,r,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=i,this.databaseInfo=r,this.user=gt.UNAUTHENTICATED,this.clientId=bv.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(i,async a=>{U(ts,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(i,a=>(U(ts,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const i=_l(n,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function ng(t,e){t.asyncQueue.verifyOperationInProgress(),U(ts,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let i=n.initialUser;t.setCredentialChangeListener(async r=>{i.isEqual(r)||(await kD(e.localStore,r),i=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function ob(t,e){t.asyncQueue.verifyOperationInProgress();const n=await pT(t);U(ts,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(i=>ZA(e.remoteStore,i)),t.setAppCheckTokenChangeListener((i,r)=>ZA(e.remoteStore,r)),t._onlineComponents=e}async function pT(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){U(ts,"Using user provided OfflineComponentProvider");try{await ng(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(r){return r.name==="FirebaseError"?r.code===k.FAILED_PRECONDITION||r.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(n))throw n;mi("Error using user provided cache. Falling back to memory cache: "+n),await ng(t,new Tc)}}else U(ts,"Using default OfflineComponentProvider"),await ng(t,new Cz(void 0));return t._offlineComponents}async function Tm(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(U(ts,"Using user provided OnlineComponentProvider"),await ob(t,t._uninitializedComponentsProvider._online)):(U(ts,"Using default OnlineComponentProvider"),await ob(t,new Ec))),t._onlineComponents}function aN(t){return pT(t).then(e=>e.persistence)}function gT(t){return pT(t).then(e=>e.localStore)}function oN(t){return Tm(t).then(e=>e.remoteStore)}function _T(t){return Tm(t).then(e=>e.syncEngine)}function kz(t){return Tm(t).then(e=>e.datastore)}async function Wo(t){const e=await Tm(t),n=e.eventManager;return n.onListen=lz.bind(null,e.syncEngine),n.onUnlisten=cz.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=uz.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=hz.bind(null,e.syncEngine),n}function Mz(t){return t.asyncQueue.enqueue(async()=>{const e=await aN(t),n=await oN(t);return e.setNetworkEnabled(!0),function(r){const s=j(r);return s.Ea.delete(0),th(s)}(n)})}function xz(t){return t.asyncQueue.enqueue(async()=>{const e=await aN(t),n=await oN(t);return e.setNetworkEnabled(!1),async function(r){const s=j(r);s.Ea.add(0),await ml(s),s.Ra.set("Offline")}(n)})}function Lz(t,e){const n=new Rt;return t.asyncQueue.enqueueAndForget(async()=>async function(r,s,a){try{const o=await function(c,h){const d=j(c);return d.persistence.runTransaction("read document","readonly",m=>d.localDocuments.getDocument(m,h))}(r,s);o.isFoundDocument()?a.resolve(o):o.isNoDocument()?a.resolve(null):a.reject(new L(k.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(o){const u=_l(o,`Failed to get document '${s} from cache`);a.reject(u)}}(await gT(t),e,n)),n.promise}function lN(t,e,n={}){const i=new Rt;return t.asyncQueue.enqueueAndForget(async()=>function(s,a,o,u,c){const h=new vm({next:m=>{h.Nu(),a.enqueueAndForget(()=>oT(s,d));const g=m.docs.has(o);!g&&m.fromCache?c.reject(new L(k.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&m.fromCache&&u&&u.source==="server"?c.reject(new L(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(m)},error:m=>c.reject(m)}),d=new uT(hl(o.path),h,{includeMetadataChanges:!0,qa:!0});return aT(s,d)}(await Wo(t),t.asyncQueue,e,n,i)),i.promise}function Uz(t,e){const n=new Rt;return t.asyncQueue.enqueueAndForget(async()=>async function(r,s,a){try{const o=await _d(r,s,!0),u=new eN(s,o.Qs),c=u.ru(o.documents),h=u.applyChanges(c,!1);a.resolve(h.snapshot)}catch(o){const u=_l(o,`Failed to execute query '${s} against cache`);a.reject(u)}}(await gT(t),e,n)),n.promise}function uN(t,e,n={}){const i=new Rt;return t.asyncQueue.enqueueAndForget(async()=>function(s,a,o,u,c){const h=new vm({next:m=>{h.Nu(),a.enqueueAndForget(()=>oT(s,d)),m.fromCache&&u.source==="server"?c.reject(new L(k.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(m)},error:m=>c.reject(m)}),d=new uT(o,h,{includeMetadataChanges:!0,qa:!0});return aT(s,d)}(await Wo(t),t.asyncQueue,e,n,i)),i.promise}function zz(t,e){const n=new vm(e);return t.asyncQueue.enqueueAndForget(async()=>function(r,s){j(r).Ca.add(s),s.next()}(await Wo(t),n)),()=>{n.Nu(),t.asyncQueue.enqueueAndForget(async()=>function(r,s){j(r).Ca.delete(s)}(await Wo(t),n))}}function Bz(t,e,n,i){const r=function(a,o){let u;return u=typeof a=="string"?iD().encode(a):a,function(h,d){return new Nz(h,d)}(function(h,d){if(h instanceof Uint8Array)return ab(h,d);if(h instanceof ArrayBuffer)return ab(new Uint8Array(h),d);if(h instanceof ReadableStream)return h.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(u),o)}(n,eh(e));t.asyncQueue.enqueueAndForget(async()=>{Rz(await _T(t),r,i)})}function Fz(t,e){return t.asyncQueue.enqueue(async()=>function(i,r){const s=j(i);return s.persistence.runTransaction("Get named query","readonly",a=>s.Ii.getNamedQuery(a,r))}(await gT(t),e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cN(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lb=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hN="firestore.googleapis.com",ub=!0;class cb{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new L(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=hN,this.ssl=ub}else this.host=e.host,this.ssl=e.ssl??ub;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=wD;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<l3)throw new L(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}rC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=cN(e.experimentalLongPollingOptions??{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new L(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new L(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new L(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,r){return i.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class nh{constructor(e,n,i,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=i,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new cb({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new L(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new cb(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new A4;switch(i.type){case"firstParty":return new C4(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new L(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const i=lb.get(n);i&&(U("ComponentProvider","Removing Datastore"),lb.delete(n),i.terminate())}(this),Promise.resolve()}}function fN(t,e,n,i={}){var c;t=fe(t,nh);const r=ss(e),s=t._getSettings(),a={...s,emulatorOptions:t._getEmulatorOptions()},o=`${e}:${n}`;r&&($y(`https://${o}`),Wy("Firestore",!0)),s.host!==hN&&s.host!==o&&mi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:o,ssl:r,emulatorOptions:i};if(!Kr(u,a)&&(t._setSettings(u),i.mockUserToken)){let h,d;if(typeof i.mockUserToken=="string")h=i.mockUserToken,d=gt.MOCK_USER;else{h=O0(i.mockUserToken,(c=t._app)==null?void 0:c.options.projectId);const m=i.mockUserToken.sub||i.mockUserToken.user_id;if(!m)throw new L(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new gt(m)}t._authCredentials=new b4(new nC(h,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gt=class dN{constructor(e,n,i){this.converter=n,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new dN(this.firestore,e,this._query)}},Se=class hu{constructor(e,n,i){this.converter=n,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Fr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new hu(this.firestore,e,this._key)}toJSON(){return{type:hu._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,i){if(Gc(n,hu._jsonSchema))return new hu(e,i||null,new q(oe.fromString(n.referencePath)))}};Se._jsonSchemaVersion="firestore/documentReference/1.0",Se._jsonSchema={type:ot("string",Se._jsonSchemaVersion),referencePath:ot("string")};let Fr=class mN extends Gt{constructor(e,n,i){super(e,n,hl(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Se(this.firestore,null,new q(e))}withConverter(e){return new mN(this.firestore,e,this._path)}};function pN(t,e,...n){if(t=$(t),Sv("collection","path",e),t instanceof nh){const i=oe.fromString(e,...n);return JI(i),new Fr(t,null,i)}{if(!(t instanceof Se||t instanceof Fr))throw new L(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=t._path.child(oe.fromString(e,...n));return JI(i),new Fr(t.firestore,null,i)}}function qz(t,e){if(t=fe(t,nh),Sv("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new L(k.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Gt(t,null,function(i){return new $i(oe.emptyPath(),i)}(e))}function Ed(t,e,...n){if(t=$(t),arguments.length===1&&(e=bv.newId()),Sv("doc","path",e),t instanceof nh){const i=oe.fromString(e,...n);return XI(i),new Se(t,null,new q(i))}{if(!(t instanceof Se||t instanceof Fr))throw new L(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=t._path.child(oe.fromString(e,...n));return XI(i),new Se(t.firestore,t instanceof Fr?t.converter:null,new q(i))}}function gN(t,e){return t=$(t),e=$(e),(t instanceof Se||t instanceof Fr)&&(e instanceof Se||e instanceof Fr)&&t.firestore===e.firestore&&t.path===e.path&&t.converter===e.converter}function _N(t,e){return t=$(t),e=$(e),t instanceof Gt&&e instanceof Gt&&t.firestore===e.firestore&&$c(t._query,e._query)&&t.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hb="AsyncQueue";class fb{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new tT(this,"async_queue_retry"),this._c=()=>{const i=Tf();i&&U(hb,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=e;const n=Tf();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=Tf();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new Rt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!ls(e))throw e;U(hb,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(i=>{throw this.nc=i,this.rc=!1,Xe("INTERNAL UNHANDLED ERROR: ",db(i)),i}).then(i=>(this.rc=!1,i))));return this.ac=n,n}enqueueAfterDelay(e,n,i){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const r=sT.createAndSchedule(this,e,n,i,s=>this.hc(s));return this.tc.push(r),r}uc(){this.nc&&G(47125,{Pc:db(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((n,i)=>n.targetTimeMs-i.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function db(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U_(t){return function(n,i){if(typeof n!="object"||n===null)return!1;const r=n;for(const s of i)if(s in r&&typeof r[s]=="function")return!0;return!1}(t,["next","error","complete"])}class Hz{constructor(){this._progressObserver={},this._taskCompletionResolver=new Rt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,n,i){this._progressObserver={next:e,error:n,complete:i}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,n){return this._taskCompletionResolver.promise.then(e,n)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jz=-1;let Qe=class extends nh{constructor(e,n,i,r){super(e,n,i,r),this.type="firestore",this._queue=new fb,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new fb(e),this._firestoreClient=void 0,await e}}};function l5(t,e){const n=nv(),i=ud,r=Kd(n,"firestore").getImmediate({identifier:i});if(!r._initialized){const s=P0("firestore");s&&fN(r,...s)}return r}function Dt(t){if(t._terminated)throw new L(k.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||yN(t),t._firestoreClient}function yN(t){var i,r,s;const e=t._freezeSettings(),n=function(o,u,c,h){return new f6(o,u,c,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,cN(h.experimentalLongPollingOptions),h.useFetchStreams,h.isUsingEmulator)}(t._databaseId,((i=t._app)==null?void 0:i.options.appId)||"",t._persistenceKey,e);t._componentsProvider||(r=e.localCache)!=null&&r._offlineComponentProvider&&((s=e.localCache)!=null&&s._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new Vz(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(o){const u=o==null?void 0:o._online.build();return{_offline:o==null?void 0:o._offline.build(u),_online:u}}(t._componentsProvider))}function Gz(t,e){mi("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=t._freezeSettings();return vN(t,Ec.provider,{build:i=>new sN(i,n.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function Kz(t){mi("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=t._freezeSettings();vN(t,Ec.provider,{build:n=>new Dz(n,e.cacheSizeBytes)})}function vN(t,e,n){if((t=fe(t,Qe))._firestoreClient||t._terminated)throw new L(k.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(t._componentsProvider||t._getSettings().localCache)throw new L(k.FAILED_PRECONDITION,"SDK cache is already specified.");t._componentsProvider={_online:e,_offline:n},yN(t)}function Qz(t){if(t._initialized&&!t._terminated)throw new L(k.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Rt;return t._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(i){if(!ci.v())return Promise.resolve();const r=i+PD;await ci.delete(r)}(Xv(t._databaseId,t._persistenceKey)),e.resolve()}catch(n){e.reject(n)}}),e.promise}function Yz(t){return function(n){const i=new Rt;return n.asyncQueue.enqueueAndForget(async()=>gz(await _T(n),i)),i.promise}(Dt(t=fe(t,Qe)))}function $z(t){return Mz(Dt(t=fe(t,Qe)))}function Wz(t){return xz(Dt(t=fe(t,Qe)))}function Xz(t,e){const n=Dt(t=fe(t,Qe)),i=new Hz;return Bz(n,t._databaseId,e,i),i}function Jz(t,e){return Fz(Dt(t=fe(t,Qe)),e).then(n=>n?new Gt(t,null,n.query):null)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new kt(Ke.fromBase64String(e))}catch(n){throw new L(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new kt(Ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:kt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Gc(e,kt._jsonSchema))return kt.fromBase64String(e.bytes)}}kt._jsonSchemaVersion="firestore/bytes/1.0",kt._jsonSchema={type:ot("string",kt._jsonSchemaVersion),bytes:ot("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ns=class{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new L(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ue(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ya=class{constructor(e){this._methodName=e}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new L(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new L(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return X(this._lat,e._lat)||X(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Hn._jsonSchemaVersion}}static fromJSON(e){if(Gc(e,Hn._jsonSchema))return new Hn(e.latitude,e.longitude)}}Hn._jsonSchemaVersion="firestore/geoPoint/1.0",Hn._jsonSchema={type:ot("string",Hn._jsonSchemaVersion),latitude:ot("number"),longitude:ot("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,r){if(i.length!==r.length)return!1;for(let s=0;s<i.length;++s)if(i[s]!==r[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:fi._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Gc(e,fi._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new fi(e.vectorValues);throw new L(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}fi._jsonSchemaVersion="firestore/vectorValue/1.0",fi._jsonSchema={type:ot("string",fi._jsonSchemaVersion),vectorValues:ot("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zz=/^__.*__$/;class e9{constructor(e,n,i){this.data=e,this.fieldMask=n,this.fieldTransforms=i}toMutation(e,n){return this.fieldMask!==null?new Xi(e,this.data,this.fieldMask,n,this.fieldTransforms):new fl(e,this.data,n,this.fieldTransforms)}}class TN{constructor(e,n,i){this.data=e,this.fieldMask=n,this.fieldTransforms=i}toMutation(e,n){return new Xi(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function EN(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{Ac:t})}}class Em{constructor(e,n,i,r,s,a){this.settings=e,this.databaseId=n,this.serializer=i,this.ignoreUndefinedProperties=r,s===void 0&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Em({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var r;const n=(r=this.path)==null?void 0:r.child(e),i=this.Vc({path:n,fc:!1});return i.gc(e),i}yc(e){var r;const n=(r=this.path)==null?void 0:r.child(e),i=this.Vc({path:n,fc:!1});return i.Rc(),i}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return wd(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(EN(this.Ac)&&Zz.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class t9{constructor(e,n,i){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=i||eh(e)}Cc(e,n,i,r=!1){return new Em({Ac:e,methodName:n,Dc:i,path:Ue.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function va(t){const e=t._freezeSettings(),n=eh(t._databaseId);return new t9(t._databaseId,!!e.ignoreUndefinedProperties,n)}function wm(t,e,n,i,r,s={}){const a=t.Cc(s.merge||s.mergeFields?2:0,e,n,r);AT("Data must be an object, but it was:",a,i);const o=AN(i,a);let u,c;if(s.merge)u=new en(a.fieldMask),c=a.fieldTransforms;else if(s.mergeFields){const h=[];for(const d of s.mergeFields){const m=z_(e,d,n);if(!a.contains(m))throw new L(k.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);SN(h,m)||h.push(m)}u=new en(h),c=a.fieldTransforms.filter(d=>u.covers(d.field))}else u=null,c=a.fieldTransforms;return new e9(new At(o),u,c)}class ih extends ya{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ih}}function wN(t,e,n){return new Em({Ac:3,Dc:e.settings.Dc,methodName:t._methodName,fc:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class yT extends ya{_toFieldTransform(e){return new Xc(e.path,new qo)}isEqual(e){return e instanceof yT}}class vT extends ya{constructor(e,n){super(e),this.vc=n}_toFieldTransform(e){const n=wN(this,e,!0),i=this.vc.map(s=>Ta(s,n)),r=new ia(i);return new Xc(e.path,r)}isEqual(e){return e instanceof vT&&Kr(this.vc,e.vc)}}class TT extends ya{constructor(e,n){super(e),this.vc=n}_toFieldTransform(e){const n=wN(this,e,!0),i=this.vc.map(s=>Ta(s,n)),r=new ra(i);return new Xc(e.path,r)}isEqual(e){return e instanceof TT&&Kr(this.vc,e.vc)}}class ET extends ya{constructor(e,n){super(e),this.Fc=n}_toFieldTransform(e){const n=new Ho(e.serializer,YC(e.serializer,this.Fc));return new Xc(e.path,n)}isEqual(e){return e instanceof ET&&this.Fc===e.Fc}}function wT(t,e,n,i){const r=t.Cc(1,e,n);AT("Data must be an object, but it was:",r,i);const s=[],a=At.empty();us(i,(u,c)=>{const h=bT(e,u,n);c=$(c);const d=r.yc(h);if(c instanceof ih)s.push(h);else{const m=Ta(c,d);m!=null&&(s.push(h),a.set(h,m))}});const o=new en(s);return new TN(a,o,r.fieldTransforms)}function IT(t,e,n,i,r,s){const a=t.Cc(1,e,n),o=[z_(e,i,n)],u=[r];if(s.length%2!=0)throw new L(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)o.push(z_(e,s[m])),u.push(s[m+1]);const c=[],h=At.empty();for(let m=o.length-1;m>=0;--m)if(!SN(c,o[m])){const g=o[m];let R=u[m];R=$(R);const D=a.yc(g);if(R instanceof ih)c.push(g);else{const V=Ta(R,D);V!=null&&(c.push(g),h.set(g,V))}}const d=new en(c);return new TN(h,d,a.fieldTransforms)}function IN(t,e,n,i=!1){return Ta(n,t.Cc(i?4:3,e))}function Ta(t,e){if(bN(t=$(t)))return AT("Unsupported field value:",e,t),AN(t,e);if(t instanceof ya)return function(i,r){if(!EN(r.Ac))throw r.Sc(`${i._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Sc(`${i._methodName}() is not currently supported inside arrays`);const s=i._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(i,r){const s=[];let a=0;for(const o of i){let u=Ta(o,r.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}}(t,e)}return function(i,r){if((i=$(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return YC(r.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const s=pe.fromDate(i);return{timestampValue:jo(r.serializer,s)}}if(i instanceof pe){const s=new pe(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:jo(r.serializer,s)}}if(i instanceof Hn)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof kt)return{bytesValue:aD(r.serializer,i._byteString)};if(i instanceof Se){const s=r.databaseId,a=i.firestore._databaseId;if(!a.isEqual(s))throw r.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:jv(i.firestore._databaseId||r.databaseId,i._key.path)}}if(i instanceof fi)return function(a,o){return{mapValue:{fields:{[Vv]:{stringValue:kv},[zo]:{arrayValue:{values:a.toArray().map(c=>{if(typeof c!="number")throw o.Sc("VectorValues must only contain numeric values.");return Uv(o.serializer,c)})}}}}}}(i,r);throw r.Sc(`Unsupported field value: ${rm(i)}`)}(t,e)}function AN(t,e){const n={};return IC(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):us(t,(i,r)=>{const s=Ta(r,e.mc(i));s!=null&&(n[i]=s)}),{mapValue:{fields:n}}}function bN(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof pe||t instanceof Hn||t instanceof kt||t instanceof Se||t instanceof ya||t instanceof fi)}function AT(t,e,n){if(!bN(n)||!sC(n)){const i=rm(n);throw i==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+i)}}function z_(t,e,n){if((e=$(e))instanceof ns)return e._internalPath;if(typeof e=="string")return bT(t,e);throw wd("Field path arguments must be of type string or ",t,!1,void 0,n)}const n9=new RegExp("[~\\*/\\[\\]]");function bT(t,e,n){if(e.search(n9)>=0)throw wd(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ns(...e.split("."))._internalPath}catch{throw wd(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function wd(t,e,n,i,r){const s=i&&!i.isEmpty(),a=r!==void 0;let o=`Function ${e}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${i}`),a&&(u+=` in document ${r}`),u+=")"),new L(k.INVALID_ARGUMENT,o+t+u)}function SN(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e,n,i,r,s){this._firestore=e,this._userDataWriter=n,this._key=i,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new i9(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Im("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class i9 extends wc{data(){return super.data()}}function Im(t,e){return typeof e=="string"?bT(t,e):e instanceof ns?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RN(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new L(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ST{}class rh extends ST{}function hr(t,e,...n){let i=[];e instanceof ST&&i.push(e),i=i.concat(n),function(s){const a=s.filter(u=>u instanceof RT).length,o=s.filter(u=>u instanceof Am).length;if(a>1||a>0&&o>0)throw new L(k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(i);for(const r of i)t=r._apply(t);return t}class Am extends rh{constructor(e,n,i){super(),this._field=e,this._op=n,this._value=i,this.type="where"}static _create(e,n,i){return new Am(e,n,i)}_apply(e){const n=this._parse(e);return DN(e._query,n),new Gt(e.firestore,e.converter,b_(e._query,n))}_parse(e){const n=va(e.firestore);return function(s,a,o,u,c,h,d){let m;if(c.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new L(k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){pb(d,h);const R=[];for(const D of d)R.push(mb(u,s,D));m={arrayValue:{values:R}}}else m=mb(u,s,d)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||pb(d,h),m=IN(o,a,d,h==="in"||h==="not-in");return ue.create(c,h,m)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function r9(t,e,n){const i=e,r=Im("where",t);return Am._create(r,i,n)}class RT extends ST{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new RT(e,n)}_parse(e){const n=this._queryConstraints.map(i=>i._parse(e)).filter(i=>i.getFilters().length>0);return n.length===1?n[0]:ye.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(r,s){let a=r;const o=s.getFlattenedFilters();for(const u of o)DN(a,u),a=b_(a,u)}(e._query,n),new Gt(e.firestore,e.converter,b_(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class CT extends rh{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new CT(e,n)}_apply(e){const n=function(r,s,a){if(r.startAt!==null)throw new L(k.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new L(k.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new _c(s,a)}(e._query,this._field,this._direction);return new Gt(e.firestore,e.converter,function(r,s){const a=r.explicitOrderBy.concat([s]);return new $i(r.path,r.collectionGroup,a,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,n))}}function s9(t,e="asc"){const n=e,i=Im("orderBy",t);return CT._create(i,n)}class bm extends rh{constructor(e,n,i){super(),this.type=e,this._limit=n,this._limitType=i}static _create(e,n,i){return new bm(e,n,i)}_apply(e){return new Gt(e.firestore,e.converter,fd(e._query,this._limit,this._limitType))}}function a9(t){return aC("limit",t),bm._create("limit",t,"F")}function o9(t){return aC("limitToLast",t),bm._create("limitToLast",t,"L")}class Sm extends rh{constructor(e,n,i){super(),this.type=e,this._docOrFields=n,this._inclusive=i}static _create(e,n,i){return new Sm(e,n,i)}_apply(e){const n=CN(e,this.type,this._docOrFields,this._inclusive);return new Gt(e.firestore,e.converter,function(r,s){return new $i(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,s,r.endAt)}(e._query,n))}}function l9(...t){return Sm._create("startAt",t,!0)}function u9(...t){return Sm._create("startAfter",t,!1)}class Rm extends rh{constructor(e,n,i){super(),this.type=e,this._docOrFields=n,this._inclusive=i}static _create(e,n,i){return new Rm(e,n,i)}_apply(e){const n=CN(e,this.type,this._docOrFields,this._inclusive);return new Gt(e.firestore,e.converter,function(r,s){return new $i(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,r.startAt,s)}(e._query,n))}}function c9(...t){return Rm._create("endBefore",t,!1)}function h9(...t){return Rm._create("endAt",t,!0)}function CN(t,e,n,i){if(n[0]=$(n[0]),n[0]instanceof wc)return function(s,a,o,u,c){if(!u)throw new L(k.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${o}().`);const h=[];for(const d of go(s))if(d.field.isKeyField())h.push(ta(a,u.key));else{const m=u.data.field(d.field);if(um(m))throw new L(k.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+d.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(m===null){const g=d.field.canonicalString();throw new L(k.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${g}' (used as the orderBy) does not exist.`)}h.push(m)}return new Zr(h,c)}(t._query,t.firestore._databaseId,e,n[0]._document,i);{const r=va(t.firestore);return function(a,o,u,c,h,d){const m=a.explicitOrderBy;if(h.length>m.length)throw new L(k.INVALID_ARGUMENT,`Too many arguments provided to ${c}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const g=[];for(let R=0;R<h.length;R++){const D=h[R];if(m[R].field.isKeyField()){if(typeof D!="string")throw new L(k.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${c}(), but got a ${typeof D}`);if(!xv(a)&&D.indexOf("/")!==-1)throw new L(k.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${c}() must be a plain document ID, but '${D}' contains a slash.`);const V=a.path.child(oe.fromString(D));if(!q.isDocumentKey(V))throw new L(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${c}() must result in a valid document path, but '${V}' is not because it contains an odd number of segments.`);const w=new q(V);g.push(ta(o,w))}else{const V=IN(u,c,D);g.push(V)}}return new Zr(g,d)}(t._query,t.firestore._databaseId,r,e,n,i)}}function mb(t,e,n){if(typeof(n=$(n))=="string"){if(n==="")throw new L(k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!xv(e)&&n.indexOf("/")!==-1)throw new L(k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const i=e.path.child(oe.fromString(n));if(!q.isDocumentKey(i))throw new L(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return ta(t,new q(i))}if(n instanceof Se)return ta(t,n._key);throw new L(k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${rm(n)}.`)}function pb(t,e){if(!Array.isArray(t)||t.length===0)throw new L(k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function DN(t,e){const n=function(r,s){for(const a of r)for(const o of a.getFlattenedFilters())if(s.indexOf(o.op)>=0)return o.op;return null}(t.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new L(k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new L(k.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class DT{convertValue(e,n="none"){switch(Xr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(ji(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw G(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const i={};return us(e,(r,s)=>{i[r]=this.convertValue(s,n)}),i}convertVectorValue(e){var i,r,s;const n=(s=(r=(i=e.fields)==null?void 0:i[zo].arrayValue)==null?void 0:r.values)==null?void 0:s.map(a=>Le(a.doubleValue));return new fi(n)}convertGeoPoint(e){return new Hn(Le(e.latitude),Le(e.longitude))}convertArray(e,n){return(e.values||[]).map(i=>this.convertValue(i,n))}convertServerTimestamp(e,n){switch(n){case"previous":const i=cm(e);return i==null?null:this.convertValue(i,n);case"estimate":return this.convertTimestamp(mc(e));default:return null}}convertTimestamp(e){const n=Hi(e);return new pe(n.seconds,n.nanos)}convertDocumentKey(e,n){const i=oe.fromString(e);Q(_D(i),9688,{name:e});const r=new Wr(i.get(1),i.get(3)),s=new q(i.popFirst(5));return r.isEqual(n)||Xe(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cm(t,e,n){let i;return i=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,i}class f9 extends DT{constructor(e){super(),this.firestore=e}convertBytes(e){return new kt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,n)}}class xs{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}let Mn=class NN extends wc{constructor(e,n,i,r,s,a){super(e,n,i,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Bu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const i=this._document.data.field(Im("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new L(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=NN._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}};Mn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Mn._jsonSchema={type:ot("string",Mn._jsonSchemaVersion),bundleSource:ot("string","DocumentSnapshot"),bundleName:ot("string"),bundle:ot("string")};let Bu=class extends Mn{data(e={}){return super.data(e)}},jn=class PN{constructor(e,n,i,r){this._firestore=e,this._userDataWriter=n,this._snapshot=r,this.metadata=new xs(r.hasPendingWrites,r.fromCache),this.query=i}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(i=>{e.call(n,new Bu(this._firestore,this._userDataWriter,i.key,i,new xs(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new L(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let a=0;return r._snapshot.docChanges.map(o=>{const u=new Bu(r._firestore,r._userDataWriter,o.doc.key,o.doc,new xs(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);return o.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>s||o.type!==3).map(o=>{const u=new Bu(r._firestore,r._userDataWriter,o.doc.key,o.doc,new xs(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let c=-1,h=-1;return o.type!==0&&(c=a.indexOf(o.doc.key),a=a.delete(o.doc.key)),o.type!==1&&(a=a.add(o.doc),h=a.indexOf(o.doc.key)),{type:d9(o.type),doc:u,oldIndex:c,newIndex:h}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new L(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=PN._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=bv.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],i=[],r=[];return this.docs.forEach(s=>{s._document!==null&&(n.push(s._document),i.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),r.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function d9(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:t})}}function ON(t,e){return t instanceof Mn&&e instanceof Mn?t._firestore===e._firestore&&t._key.isEqual(e._key)&&(t._document===null?e._document===null:t._document.isEqual(e._document))&&t._converter===e._converter:t instanceof jn&&e instanceof jn&&t._firestore===e._firestore&&_N(t.query,e.query)&&t.metadata.isEqual(e.metadata)&&t._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m9(t){t=fe(t,Se);const e=fe(t.firestore,Qe);return lN(Dt(e),t._key).then(n=>NT(e,t,n))}jn._jsonSchemaVersion="firestore/querySnapshot/1.0",jn._jsonSchema={type:ot("string",jn._jsonSchemaVersion),bundleSource:ot("string","QuerySnapshot"),bundleName:ot("string"),bundle:ot("string")};class Ea extends DT{constructor(e){super(),this.firestore=e}convertBytes(e){return new kt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,n)}}function p9(t){t=fe(t,Se);const e=fe(t.firestore,Qe),n=Dt(e),i=new Ea(e);return Lz(n,t._key).then(r=>new Mn(e,i,t._key,r,new xs(r!==null&&r.hasLocalMutations,!0),t.converter))}function g9(t){t=fe(t,Se);const e=fe(t.firestore,Qe);return lN(Dt(e),t._key,{source:"server"}).then(n=>NT(e,t,n))}function _9(t){t=fe(t,Gt);const e=fe(t.firestore,Qe),n=Dt(e),i=new Ea(e);return RN(t._query),uN(n,t._query).then(r=>new jn(e,i,t,r))}function y9(t){t=fe(t,Gt);const e=fe(t.firestore,Qe),n=Dt(e),i=new Ea(e);return Uz(n,t._query).then(r=>new jn(e,i,t,r))}function v9(t){t=fe(t,Gt);const e=fe(t.firestore,Qe),n=Dt(e),i=new Ea(e);return uN(n,t._query,{source:"server"}).then(r=>new jn(e,i,t,r))}function gb(t,e,n){t=fe(t,Se);const i=fe(t.firestore,Qe),r=Cm(t.converter,e,n);return yl(i,[wm(va(i),"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,ze.none())])}function _b(t,e,n,...i){t=fe(t,Se);const r=fe(t.firestore,Qe),s=va(r);let a;return a=typeof(e=$(e))=="string"||e instanceof ns?IT(s,"updateDoc",t._key,e,n,i):wT(s,"updateDoc",t._key,e),yl(r,[a.toMutation(t._key,ze.exists(!0))])}function T9(t){return yl(fe(t.firestore,Qe),[new dl(t._key,ze.none())])}function E9(t,e){const n=fe(t.firestore,Qe),i=Ed(t),r=Cm(t.converter,e);return yl(n,[wm(va(t.firestore),"addDoc",i._key,r,t.converter!==null,{}).toMutation(i._key,ze.exists(!1))]).then(()=>i)}function VN(t,...e){var u,c,h;t=$(t);let n={includeMetadataChanges:!1,source:"default"},i=0;typeof e[i]!="object"||U_(e[i])||(n=e[i++]);const r={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(U_(e[i])){const d=e[i];e[i]=(u=d.next)==null?void 0:u.bind(d),e[i+1]=(c=d.error)==null?void 0:c.bind(d),e[i+2]=(h=d.complete)==null?void 0:h.bind(d)}let s,a,o;if(t instanceof Se)a=fe(t.firestore,Qe),o=hl(t._key.path),s={next:d=>{e[i]&&e[i](NT(a,t,d))},error:e[i+1],complete:e[i+2]};else{const d=fe(t,Gt);a=fe(d.firestore,Qe),o=d._query;const m=new Ea(a);s={next:g=>{e[i]&&e[i](new jn(a,m,d,g))},error:e[i+1],complete:e[i+2]},RN(t._query)}return function(m,g,R,D){const V=new vm(D),w=new uT(g,V,R);return m.asyncQueue.enqueueAndForget(async()=>aT(await Wo(m),w)),()=>{V.Nu(),m.asyncQueue.enqueueAndForget(async()=>oT(await Wo(m),w))}}(Dt(a),o,r,s)}function w9(t,e){return zz(Dt(t=fe(t,Qe)),U_(e)?e:{next:e})}function yl(t,e){return function(i,r){const s=new Rt;return i.asyncQueue.enqueueAndForget(async()=>fz(await _T(i),r,s)),s.promise}(Dt(t),e)}function NT(t,e,n){const i=n.docs.get(e._key),r=new Ea(t);return new Mn(t,r,e._key,i,new xs(n.hasPendingWrites,n.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I9={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kN=class{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=va(e)}set(e,n,i){this._verifyNotCommitted();const r=Rr(e,this._firestore),s=Cm(r.converter,n,i),a=wm(this._dataReader,"WriteBatch.set",r._key,s,r.converter!==null,i);return this._mutations.push(a.toMutation(r._key,ze.none())),this}update(e,n,i,...r){this._verifyNotCommitted();const s=Rr(e,this._firestore);let a;return a=typeof(n=$(n))=="string"||n instanceof ns?IT(this._dataReader,"WriteBatch.update",s._key,n,i,r):wT(this._dataReader,"WriteBatch.update",s._key,n),this._mutations.push(a.toMutation(s._key,ze.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=Rr(e,this._firestore);return this._mutations=this._mutations.concat(new dl(n._key,ze.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new L(k.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function Rr(t,e){if((t=$(t)).firestore!==e)throw new L(k.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A9{constructor(e,n){this._firestore=e,this._transaction=n,this._dataReader=va(e)}get(e){const n=Rr(e,this._firestore),i=new f9(this._firestore);return this._transaction.lookup([n._key]).then(r=>{if(!r||r.length!==1)return G(24041);const s=r[0];if(s.isFoundDocument())return new wc(this._firestore,i,s.key,s,n.converter);if(s.isNoDocument())return new wc(this._firestore,i,n._key,null,n.converter);throw G(18433,{doc:s})})}set(e,n,i){const r=Rr(e,this._firestore),s=Cm(r.converter,n,i),a=wm(this._dataReader,"Transaction.set",r._key,s,r.converter!==null,i);return this._transaction.set(r._key,a),this}update(e,n,i,...r){const s=Rr(e,this._firestore);let a;return a=typeof(n=$(n))=="string"||n instanceof ns?IT(this._dataReader,"Transaction.update",s._key,n,i,r):wT(this._dataReader,"Transaction.update",s._key,n),this._transaction.update(s._key,a),this}delete(e){const n=Rr(e,this._firestore);return this._transaction.delete(n._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let b9=class extends A9{constructor(e,n){super(e,n),this._firestore=e}get(e){const n=Rr(e,this._firestore),i=new Ea(this._firestore);return super.get(e).then(r=>new Mn(this._firestore,i,n._key,r._document,new xs(!1,!1),n.converter))}};function S9(t,e,n){t=fe(t,Qe);const i={...I9,...n};return function(s){if(s.maxAttempts<1)throw new L(k.INVALID_ARGUMENT,"Max attempts must be at least 1")}(i),function(s,a,o){const u=new Rt;return s.asyncQueue.enqueueAndForget(async()=>{const c=await kz(s);new Oz(s.asyncQueue,c,o,a,u).ju()}),u.promise}(Dt(t),r=>e(new b9(t,r)),i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R9(){return new ih("deleteField")}function C9(){return new yT("serverTimestamp")}function D9(...t){return new vT("arrayUnion",t)}function N9(...t){return new TT("arrayRemove",t)}function P9(t){return new ET("increment",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m5(t){return Dt(t=fe(t,Qe)),new kN(t,e=>yl(t,e))}(function(e,n=!0){(function(r){cl=r})(Ki),Fi(new Gn("firestore",(i,{instanceIdentifier:r,options:s})=>{const a=i.getProvider("app").getImmediate(),o=new Qe(new S4(i.getProvider("auth-internal")),new D4(a,i.getProvider("app-check-internal")),function(c,h){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new L(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Wr(c.options.projectId,h)}(a,r),a);return s={useFetchStreams:n,...s},o._setSettings(s),o},"PUBLIC").setMultipleInstances(!0)),Tn(QI,YI,e),Tn(QI,YI,"esm2020")})();const O9="@firebase/firestore-compat",V9="0.4.2";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PT(t,e){if(e===void 0)return{merge:!1};if(e.mergeFields!==void 0&&e.merge!==void 0)throw new L("invalid-argument",`Invalid options passed to function ${t}(): You cannot specify both "merge" and "mergeFields".`);return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yb(){if(typeof Uint8Array>"u")throw new L("unimplemented","Uint8Arrays are not available in this environment.")}function vb(){if(!c6())throw new L("unimplemented","Blobs are unavailable in Firestore in this environment.")}let MN=class B_{constructor(e){this._delegate=e}static fromBase64String(e){return vb(),new B_(kt.fromBase64String(e))}static fromUint8Array(e){return yb(),new B_(kt.fromUint8Array(e))}toBase64(){return vb(),this._delegate.toBase64()}toUint8Array(){return yb(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F_(t){return k9(t,["next","error","complete"])}function k9(t,e){if(typeof t!="object"||t===null)return!1;const n=t;for(const i of e)if(i in n&&typeof n[i]=="function")return!0;return!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M9{enableIndexedDbPersistence(e,n){return Gz(e._delegate,{forceOwnership:n})}enableMultiTabIndexedDbPersistence(e){return Kz(e._delegate)}clearIndexedDbPersistence(e){return Qz(e._delegate)}}class xN{constructor(e,n,i){this._delegate=n,this._persistenceProvider=i,this.INTERNAL={delete:()=>this.terminate()},e instanceof Wr||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){const n=this._delegate._getSettings();!e.merge&&n.host!==e.host&&mi("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&(e={...n,...e},delete e.merge),this._delegate._setSettings(e)}useEmulator(e,n,i={}){fN(this._delegate,e,n,i)}enableNetwork(){return $z(this._delegate)}disableNetwork(){return Wz(this._delegate)}enablePersistence(e){let n=!1,i=!1;return e&&(n=!!e.synchronizeTabs,i=!!e.experimentalForceOwningTab,rC("synchronizeTabs",n,"experimentalForceOwningTab",i)),n?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,i)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return Yz(this._delegate)}onSnapshotsInSync(e){return w9(this._delegate,e)}get app(){if(!this._appCompat)throw new L("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new Xo(this,pN(this._delegate,e))}catch(n){throw qt(n,"collection()","Firestore.collection()")}}doc(e){try{return new On(this,Ed(this._delegate,e))}catch(n){throw qt(n,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new Ft(this,qz(this._delegate,e))}catch(n){throw qt(n,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return S9(this._delegate,n=>e(new LN(this,n)))}batch(){return Dt(this._delegate),new UN(new kN(this._delegate,e=>yl(this._delegate,e)))}loadBundle(e){return Xz(this._delegate,e)}namedQuery(e){return Jz(this._delegate,e).then(n=>n?new Ft(this,n):null)}}class Dm extends DT{constructor(e){super(),this.firestore=e}convertBytes(e){return new MN(new kt(e))}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return On.forKey(n,this.firestore,null)}}function x9(t){w4(t)}class LN{constructor(e,n){this._firestore=e,this._delegate=n,this._userDataWriter=new Dm(e)}get(e){const n=Ls(e);return this._delegate.get(n).then(i=>new Ic(this._firestore,new Mn(this._firestore._delegate,this._userDataWriter,i._key,i._document,i.metadata,n.converter)))}set(e,n,i){const r=Ls(e);return i?(PT("Transaction.set",i),this._delegate.set(r,n,i)):this._delegate.set(r,n),this}update(e,n,i,...r){const s=Ls(e);return arguments.length===2?this._delegate.update(s,n):this._delegate.update(s,n,i,...r),this}delete(e){const n=Ls(e);return this._delegate.delete(n),this}}class UN{constructor(e){this._delegate=e}set(e,n,i){const r=Ls(e);return i?(PT("WriteBatch.set",i),this._delegate.set(r,n,i)):this._delegate.set(r,n),this}update(e,n,i,...r){const s=Ls(e);return arguments.length===2?this._delegate.update(s,n):this._delegate.update(s,n,i,...r),this}delete(e){const n=Ls(e);return this._delegate.delete(n),this}commit(){return this._delegate.commit()}}class ua{constructor(e,n,i){this._firestore=e,this._userDataWriter=n,this._delegate=i}fromFirestore(e,n){const i=new Bu(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new Ac(this._firestore,i),n??{})}toFirestore(e,n){return n?this._delegate.toFirestore(e,n):this._delegate.toFirestore(e)}static getInstance(e,n){const i=ua.INSTANCES;let r=i.get(e);r||(r=new WeakMap,i.set(e,r));let s=r.get(n);return s||(s=new ua(e,new Dm(e),n),r.set(n,s)),s}}ua.INSTANCES=new WeakMap;class On{constructor(e,n){this.firestore=e,this._delegate=n,this._userDataWriter=new Dm(e)}static forPath(e,n,i){if(e.length%2!==0)throw new L("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new On(n,new Se(n._delegate,i,new q(e)))}static forKey(e,n,i){return new On(n,new Se(n._delegate,i,e))}get id(){return this._delegate.id}get parent(){return new Xo(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new Xo(this.firestore,pN(this._delegate,e))}catch(n){throw qt(n,"collection()","DocumentReference.collection()")}}isEqual(e){return e=$(e),e instanceof Se?gN(this._delegate,e):!1}set(e,n){n=PT("DocumentReference.set",n);try{return n?gb(this._delegate,e,n):gb(this._delegate,e)}catch(i){throw qt(i,"setDoc()","DocumentReference.set()")}}update(e,n,...i){try{return arguments.length===1?_b(this._delegate,e):_b(this._delegate,e,n,...i)}catch(r){throw qt(r,"updateDoc()","DocumentReference.update()")}}delete(){return T9(this._delegate)}onSnapshot(...e){const n=zN(e),i=BN(e,r=>new Ic(this.firestore,new Mn(this.firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,this._delegate.converter)));return VN(this._delegate,n,i)}get(e){let n;return(e==null?void 0:e.source)==="cache"?n=p9(this._delegate):(e==null?void 0:e.source)==="server"?n=g9(this._delegate):n=m9(this._delegate),n.then(i=>new Ic(this.firestore,new Mn(this.firestore._delegate,this._userDataWriter,i._key,i._document,i.metadata,this._delegate.converter)))}withConverter(e){return new On(this.firestore,e?this._delegate.withConverter(ua.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function qt(t,e,n){return t.message=t.message.replace(e,n),t}function zN(t){for(const e of t)if(typeof e=="object"&&!F_(e))return e;return{}}function BN(t,e){var i,r;let n;return F_(t[0])?n=t[0]:F_(t[1])?n=t[1]:typeof t[0]=="function"?n={next:t[0],error:t[1],complete:t[2]}:n={next:t[1],error:t[2],complete:t[3]},{next:s=>{n.next&&n.next(e(s))},error:(i=n.error)==null?void 0:i.bind(n),complete:(r=n.complete)==null?void 0:r.bind(n)}}class Ic{constructor(e,n){this._firestore=e,this._delegate=n}get ref(){return new On(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,n){return this._delegate.get(e,n)}isEqual(e){return ON(this._delegate,e._delegate)}}class Ac extends Ic{data(e){const n=this._delegate.data(e);return this._delegate._converter||I4(n!==void 0,"Document in a QueryDocumentSnapshot should exist"),n}}class Ft{constructor(e,n){this.firestore=e,this._delegate=n,this._userDataWriter=new Dm(e)}where(e,n,i){try{return new Ft(this.firestore,hr(this._delegate,r9(e,n,i)))}catch(r){throw qt(r,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,n){try{return new Ft(this.firestore,hr(this._delegate,s9(e,n)))}catch(i){throw qt(i,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new Ft(this.firestore,hr(this._delegate,a9(e)))}catch(n){throw qt(n,"limit()","Query.limit()")}}limitToLast(e){try{return new Ft(this.firestore,hr(this._delegate,o9(e)))}catch(n){throw qt(n,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new Ft(this.firestore,hr(this._delegate,l9(...e)))}catch(n){throw qt(n,"startAt()","Query.startAt()")}}startAfter(...e){try{return new Ft(this.firestore,hr(this._delegate,u9(...e)))}catch(n){throw qt(n,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new Ft(this.firestore,hr(this._delegate,c9(...e)))}catch(n){throw qt(n,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new Ft(this.firestore,hr(this._delegate,h9(...e)))}catch(n){throw qt(n,"endAt()","Query.endAt()")}}isEqual(e){return _N(this._delegate,e._delegate)}get(e){let n;return(e==null?void 0:e.source)==="cache"?n=y9(this._delegate):(e==null?void 0:e.source)==="server"?n=v9(this._delegate):n=_9(this._delegate),n.then(i=>new q_(this.firestore,new jn(this.firestore._delegate,this._userDataWriter,this._delegate,i._snapshot)))}onSnapshot(...e){const n=zN(e),i=BN(e,r=>new q_(this.firestore,new jn(this.firestore._delegate,this._userDataWriter,this._delegate,r._snapshot)));return VN(this._delegate,n,i)}withConverter(e){return new Ft(this.firestore,e?this._delegate.withConverter(ua.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}class L9{constructor(e,n){this._firestore=e,this._delegate=n}get type(){return this._delegate.type}get doc(){return new Ac(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class q_{constructor(e,n){this._firestore=e,this._delegate=n}get query(){return new Ft(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new Ac(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(n=>new L9(this._firestore,n))}forEach(e,n){this._delegate.forEach(i=>{e.call(n,new Ac(this._firestore,i))})}isEqual(e){return ON(this._delegate,e._delegate)}}class Xo extends Ft{constructor(e,n){super(e,n),this.firestore=e,this._delegate=n}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const e=this._delegate.parent;return e?new On(this.firestore,e):null}doc(e){try{return e===void 0?new On(this.firestore,Ed(this._delegate)):new On(this.firestore,Ed(this._delegate,e))}catch(n){throw qt(n,"doc()","CollectionReference.doc()")}}add(e){return E9(this._delegate,e).then(n=>new On(this.firestore,n))}isEqual(e){return gN(this._delegate,e._delegate)}withConverter(e){return new Xo(this.firestore,e?this._delegate.withConverter(ua.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function Ls(t){return fe(t,Se)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(...e){this._delegate=new ns(...e)}static documentId(){return new OT(Ue.keyField().canonicalString())}isEqual(e){return e=$(e),e instanceof ns?this._delegate._internalPath.isEqual(e._internalPath):!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{static serverTimestamp(){const e=C9();return e._methodName="FieldValue.serverTimestamp",new Os(e)}static delete(){const e=R9();return e._methodName="FieldValue.delete",new Os(e)}static arrayUnion(...e){const n=D9(...e);return n._methodName="FieldValue.arrayUnion",new Os(n)}static arrayRemove(...e){const n=N9(...e);return n._methodName="FieldValue.arrayRemove",new Os(n)}static increment(e){const n=P9(e);return n._methodName="FieldValue.increment",new Os(n)}constructor(e){this._delegate=e}isEqual(e){return this._delegate.isEqual(e._delegate)}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U9={Firestore:xN,GeoPoint:Hn,Timestamp:pe,Blob:MN,Transaction:LN,WriteBatch:UN,DocumentReference:On,DocumentSnapshot:Ic,Query:Ft,QueryDocumentSnapshot:Ac,QuerySnapshot:q_,CollectionReference:Xo,FieldPath:OT,FieldValue:Os,setLogLevel:x9,CACHE_SIZE_UNLIMITED:jz};function z9(t,e){t.INTERNAL.registerComponent(new Gn("firestore-compat",n=>{const i=n.getProvider("app-compat").getImmediate(),r=n.getProvider("firestore").getImmediate();return e(i,r)},"PUBLIC").setServiceProps({...U9}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B9(t){z9(t,(e,n)=>new xN(e,n,new M9)),t.registerVersion(O9,V9)}B9(Lc);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FN="firebasestorage.googleapis.com",qN="storageBucket",F9=2*60*1e3,q9=10*60*1e3,H9=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe extends Mt{constructor(e,n,i=0){super(ig(e),`Firebase Storage: ${n} (${ig(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,qe.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return ig(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Me;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Me||(Me={}));function ig(t){return"storage/"+t}function VT(){const t="An unknown error occurred, please check the error payload for server response.";return new qe(Me.UNKNOWN,t)}function j9(t){return new qe(Me.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function G9(t){return new qe(Me.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function K9(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new qe(Me.UNAUTHENTICATED,t)}function Q9(){return new qe(Me.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Y9(t){return new qe(Me.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function HN(){return new qe(Me.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function jN(){return new qe(Me.CANCELED,"User canceled the upload/download.")}function $9(t){return new qe(Me.INVALID_URL,"Invalid URL '"+t+"'.")}function W9(t){return new qe(Me.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function X9(){return new qe(Me.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+qN+"' property when initializing the app?")}function GN(){return new qe(Me.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function J9(){return new qe(Me.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function Z9(){return new qe(Me.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function eB(t){return new qe(Me.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function H_(t){return new qe(Me.INVALID_ARGUMENT,t)}function KN(){return new qe(Me.APP_DELETED,"The Firebase app was deleted.")}function tB(t){return new qe(Me.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Fu(t,e){return new qe(Me.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function Jl(t){throw new qe(Me.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let i;try{i=mn.makeFromUrl(e,n)}catch{return new mn(e,"")}if(i.path==="")return i;throw W9(e)}static makeFromUrl(e,n){let i=null;const r="([A-Za-z0-9.\\-_]+)";function s(C){C.path.charAt(C.path.length-1)==="/"&&(C.path_=C.path_.slice(0,-1))}const a="(/(.*))?$",o=new RegExp("^gs://"+r+a,"i"),u={bucket:1,path:3};function c(C){C.path_=decodeURIComponent(C.path)}const h="v[A-Za-z0-9_]+",d=n.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",g=new RegExp(`^https?://${d}/${h}/b/${r}/o${m}`,"i"),R={bucket:1,path:3},D=n===FN?"(?:storage.googleapis.com|storage.cloud.google.com)":n,V="([^?#]*)",w=new RegExp(`^https?://${D}/${r}/${V}`,"i"),I=[{regex:o,indices:u,postModify:s},{regex:g,indices:R,postModify:c},{regex:w,indices:{bucket:1,path:2},postModify:c}];for(let C=0;C<I.length;C++){const z=I[C],F=z.regex.exec(e);if(F){const T=F[z.indices.bucket];let y=F[z.indices.path];y||(y=""),i=new mn(T,y),z.postModify(i);break}}if(i==null)throw $9(e);return i}}class nB{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iB(t,e,n){let i=1,r=null,s=null,a=!1,o=0;function u(){return o===2}let c=!1;function h(...V){c||(c=!0,e.apply(null,V))}function d(V){r=setTimeout(()=>{r=null,t(g,u())},V)}function m(){s&&clearTimeout(s)}function g(V,...w){if(c){m();return}if(V){m(),h.call(null,V,...w);return}if(u()||a){m(),h.call(null,V,...w);return}i<64&&(i*=2);let I;o===1?(o=2,I=0):I=(i+Math.random())*1e3,d(I)}let R=!1;function D(V){R||(R=!0,m(),!c&&(r!==null?(V||(o=2),clearTimeout(r),d(0)):V||(o=1)))}return d(0),s=setTimeout(()=>{a=!0,D(!0)},n),D}function rB(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sB(t){return t!==void 0}function aB(t){return typeof t=="function"}function oB(t){return typeof t=="object"&&!Array.isArray(t)}function Nm(t){return typeof t=="string"||t instanceof String}function Tb(t){return kT()&&t instanceof Blob}function kT(){return typeof Blob<"u"}function Eb(t,e,n,i){if(i<e)throw H_(`Invalid value for '${t}'. Expected ${e} or greater.`);if(i>n)throw H_(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vl(t,e,n){let i=e;return n==null&&(i=`https://${e}`),`${n}://${i}/v0${t}`}function QN(t){const e=encodeURIComponent;let n="?";for(const i in t)if(t.hasOwnProperty(i)){const r=e(i)+"="+e(t[i]);n=n+r+"&"}return n=n.slice(0,-1),n}var Ks;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Ks||(Ks={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YN(t,e){const n=t>=500&&t<600,r=[408,429].indexOf(t)!==-1,s=e.indexOf(t)!==-1;return n||r||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lB{constructor(e,n,i,r,s,a,o,u,c,h,d,m=!0,g=!1){this.url_=e,this.method_=n,this.headers_=i,this.body_=r,this.successCodes_=s,this.additionalRetryCodes_=a,this.callback_=o,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=h,this.connectionFactory_=d,this.retry=m,this.isUsingEmulator=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((R,D)=>{this.resolve_=R,this.reject_=D,this.start_()})}start_(){const e=(i,r)=>{if(r){i(!1,new qh(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const a=o=>{const u=o.loaded,c=o.lengthComputable?o.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&s.addUploadProgressListener(a),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(a),this.pendingConnection_=null;const o=s.getErrorCode()===Ks.NO_ERROR,u=s.getStatus();if(!o||YN(u,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===Ks.ABORT;i(!1,new qh(!1,null,h));return}const c=this.successCodes_.indexOf(u)!==-1;i(!0,new qh(c,s))})},n=(i,r)=>{const s=this.resolve_,a=this.reject_,o=r.connection;if(r.wasSuccessCode)try{const u=this.callback_(o,o.getResponse());sB(u)?s(u):s()}catch(u){a(u)}else if(o!==null){const u=VT();u.serverResponse=o.getErrorText(),this.errorCallback_?a(this.errorCallback_(o,u)):a(u)}else if(r.canceled){const u=this.appDelete_?KN():jN();a(u)}else{const u=HN();a(u)}};this.canceled_?n(!1,new qh(!1,null,!0)):this.backoffId_=iB(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&rB(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class qh{constructor(e,n,i){this.wasSuccessCode=e,this.connection=n,this.canceled=!!i}}function uB(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function cB(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function hB(t,e){e&&(t["X-Firebase-GMPID"]=e)}function fB(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function dB(t,e,n,i,r,s,a=!0,o=!1){const u=QN(t.urlParams),c=t.url+u,h=Object.assign({},t.headers);return hB(h,e),uB(h,n),cB(h,s),fB(h,i),new lB(c,t.method,h,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,r,a,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mB(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function pB(...t){const e=mB();if(e!==void 0){const n=new e;for(let i=0;i<t.length;i++)n.append(t[i]);return n.getBlob()}else{if(kT())return new Blob(t);throw new qe(Me.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function gB(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _B(t){if(typeof atob>"u")throw eB("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class rg{constructor(e,n){this.data=e,this.contentType=n||null}}function yB(t,e){switch(t){case li.RAW:return new rg($N(e));case li.BASE64:case li.BASE64URL:return new rg(WN(t,e));case li.DATA_URL:return new rg(TB(e),EB(e))}throw VT()}function $N(t){const e=[];for(let n=0;n<t.length;n++){let i=t.charCodeAt(n);if(i<=127)e.push(i);else if(i<=2047)e.push(192|i>>6,128|i&63);else if((i&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const s=i,a=t.charCodeAt(++n);i=65536|(s&1023)<<10|a&1023,e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63)}else(i&64512)===56320?e.push(239,191,189):e.push(224|i>>12,128|i>>6&63,128|i&63)}return new Uint8Array(e)}function vB(t){let e;try{e=decodeURIComponent(t)}catch{throw Fu(li.DATA_URL,"Malformed data URL.")}return $N(e)}function WN(t,e){switch(t){case li.BASE64:{const r=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(r||s)throw Fu(t,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case li.BASE64URL:{const r=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(r||s)throw Fu(t,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=_B(e)}catch(r){throw r.message.includes("polyfill")?r:Fu(t,"Invalid character found")}const i=new Uint8Array(n.length);for(let r=0;r<n.length;r++)i[r]=n.charCodeAt(r);return i}class XN{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw Fu(li.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const i=n[1]||null;i!=null&&(this.base64=wB(i,";base64"),this.contentType=this.base64?i.substring(0,i.length-7):i),this.rest=e.substring(e.indexOf(",")+1)}}function TB(t){const e=new XN(t);return e.base64?WN(li.BASE64,e.rest):vB(e.rest)}function EB(t){return new XN(t).contentType}function wB(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,n){let i=0,r="";Tb(e)?(this.data_=e,i=e.size,r=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),i=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),i=e.length),this.size_=i,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,n){if(Tb(this.data_)){const i=this.data_,r=gB(i,e,n);return r===null?null:new vr(r)}else{const i=new Uint8Array(this.data_.buffer,e,n-e);return new vr(i,!0)}}static getBlob(...e){if(kT()){const n=e.map(i=>i instanceof vr?i.data_:i);return new vr(pB.apply(null,n))}else{const n=e.map(a=>Nm(a)?yB(li.RAW,a).data:a.data_);let i=0;n.forEach(a=>{i+=a.byteLength});const r=new Uint8Array(i);let s=0;return n.forEach(a=>{for(let o=0;o<a.length;o++)r[s++]=a[o]}),new vr(r,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JN(t){let e;try{e=JSON.parse(t)}catch{return null}return oB(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IB(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function AB(t,e){const n=e.split("/").filter(i=>i.length>0).join("/");return t.length===0?n:t+"/"+n}function ZN(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bB(t,e){return e}class zt{constructor(e,n,i,r){this.server=e,this.local=n||e,this.writable=!!i,this.xform=r||bB}}let Hh=null;function SB(t){return!Nm(t)||t.length<2?t:ZN(t)}function eP(){if(Hh)return Hh;const t=[];t.push(new zt("bucket")),t.push(new zt("generation")),t.push(new zt("metageneration")),t.push(new zt("name","fullPath",!0));function e(s,a){return SB(a)}const n=new zt("name");n.xform=e,t.push(n);function i(s,a){return a!==void 0?Number(a):a}const r=new zt("size");return r.xform=i,t.push(r),t.push(new zt("timeCreated")),t.push(new zt("updated")),t.push(new zt("md5Hash",null,!0)),t.push(new zt("cacheControl",null,!0)),t.push(new zt("contentDisposition",null,!0)),t.push(new zt("contentEncoding",null,!0)),t.push(new zt("contentLanguage",null,!0)),t.push(new zt("contentType",null,!0)),t.push(new zt("metadata","customMetadata",!0)),Hh=t,Hh}function RB(t,e){function n(){const i=t.bucket,r=t.fullPath,s=new mn(i,r);return e._makeStorageReference(s)}Object.defineProperty(t,"ref",{get:n})}function CB(t,e,n){const i={};i.type="file";const r=n.length;for(let s=0;s<r;s++){const a=n[s];i[a.local]=a.xform(i,e[a.server])}return RB(i,t),i}function tP(t,e,n){const i=JN(e);return i===null?null:CB(t,i,n)}function DB(t,e,n,i){const r=JN(e);if(r===null||!Nm(r.downloadTokens))return null;const s=r.downloadTokens;if(s.length===0)return null;const a=encodeURIComponent;return s.split(",").map(c=>{const h=t.bucket,d=t.fullPath,m="/b/"+a(h)+"/o/"+a(d),g=vl(m,n,i),R=QN({alt:"media",token:c});return g+R})[0]}function nP(t,e){const n={},i=e.length;for(let r=0;r<i;r++){const s=e[r];s.writable&&(n[s.server]=t[s.local])}return JSON.stringify(n)}class wa{constructor(e,n,i,r){this.url=e,this.method=n,this.handler=i,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ki(t){if(!t)throw VT()}function MT(t,e){function n(i,r){const s=tP(t,r,e);return ki(s!==null),s}return n}function NB(t,e){function n(i,r){const s=tP(t,r,e);return ki(s!==null),DB(s,r,t.host,t._protocol)}return n}function sh(t){function e(n,i){let r;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?r=Q9():r=K9():n.getStatus()===402?r=G9(t.bucket):n.getStatus()===403?r=Y9(t.path):r=i,r.status=n.getStatus(),r.serverResponse=i.serverResponse,r}return e}function xT(t){const e=sh(t);function n(i,r){let s=e(i,r);return i.getStatus()===404&&(s=j9(t.path)),s.serverResponse=r.serverResponse,s}return n}function PB(t,e,n){const i=e.fullServerUrl(),r=vl(i,t.host,t._protocol),s="GET",a=t.maxOperationRetryTime,o=new wa(r,s,MT(t,n),a);return o.errorHandler=xT(e),o}function OB(t,e,n){const i=e.fullServerUrl(),r=vl(i,t.host,t._protocol),s="GET",a=t.maxOperationRetryTime,o=new wa(r,s,NB(t,n),a);return o.errorHandler=xT(e),o}function VB(t,e){const n=e.fullServerUrl(),i=vl(n,t.host,t._protocol),r="DELETE",s=t.maxOperationRetryTime;function a(u,c){}const o=new wa(i,r,a,s);return o.successCodes=[200,204],o.errorHandler=xT(e),o}function kB(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function iP(t,e,n){const i=Object.assign({},n);return i.fullPath=t.path,i.size=e.size(),i.contentType||(i.contentType=kB(null,e)),i}function MB(t,e,n,i,r){const s=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function o(){let I="";for(let C=0;C<2;C++)I=I+Math.random().toString().slice(2);return I}const u=o();a["Content-Type"]="multipart/related; boundary="+u;const c=iP(e,i,r),h=nP(c,n),d="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+u+`\r
Content-Type: `+c.contentType+`\r
\r
`,m=`\r
--`+u+"--",g=vr.getBlob(d,i,m);if(g===null)throw GN();const R={name:c.fullPath},D=vl(s,t.host,t._protocol),V="POST",w=t.maxUploadRetryTime,v=new wa(D,V,MT(t,n),w);return v.urlParams=R,v.headers=a,v.body=g.uploadData(),v.errorHandler=sh(e),v}class Id{constructor(e,n,i,r){this.current=e,this.total=n,this.finalized=!!i,this.metadata=r||null}}function LT(t,e){let n=null;try{n=t.getResponseHeader("X-Goog-Upload-Status")}catch{ki(!1)}return ki(!!n&&(e||["active"]).indexOf(n)!==-1),n}function xB(t,e,n,i,r){const s=e.bucketOnlyServerUrl(),a=iP(e,i,r),o={name:a.fullPath},u=vl(s,t.host,t._protocol),c="POST",h={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${i.size()}`,"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},d=nP(a,n),m=t.maxUploadRetryTime;function g(D){LT(D);let V;try{V=D.getResponseHeader("X-Goog-Upload-URL")}catch{ki(!1)}return ki(Nm(V)),V}const R=new wa(u,c,g,m);return R.urlParams=o,R.headers=h,R.body=d,R.errorHandler=sh(e),R}function LB(t,e,n,i){const r={"X-Goog-Upload-Command":"query"};function s(c){const h=LT(c,["active","final"]);let d=null;try{d=c.getResponseHeader("X-Goog-Upload-Size-Received")}catch{ki(!1)}d||ki(!1);const m=Number(d);return ki(!isNaN(m)),new Id(m,i.size(),h==="final")}const a="POST",o=t.maxUploadRetryTime,u=new wa(n,a,s,o);return u.headers=r,u.errorHandler=sh(e),u}const wb=256*1024;function UB(t,e,n,i,r,s,a,o){const u=new Id(0,0);if(a?(u.current=a.current,u.total=a.total):(u.current=0,u.total=i.size()),i.size()!==u.total)throw J9();const c=u.total-u.current;let h=c;r>0&&(h=Math.min(h,r));const d=u.current,m=d+h;let g="";h===0?g="finalize":c===h?g="upload, finalize":g="upload";const R={"X-Goog-Upload-Command":g,"X-Goog-Upload-Offset":`${u.current}`},D=i.slice(d,m);if(D===null)throw GN();function V(C,z){const F=LT(C,["active","final"]),T=u.current+h,y=i.size();let E;return F==="final"?E=MT(e,s)(C,z):E=null,new Id(T,y,F==="final",E)}const w="POST",v=e.maxUploadRetryTime,I=new wa(n,w,V,v);return I.headers=R,I.body=D.uploadData(),I.progressCallback=o||null,I.errorHandler=sh(t),I}const Jt={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function sg(t){switch(t){case"running":case"pausing":case"canceling":return Jt.RUNNING;case"paused":return Jt.PAUSED;case"success":return Jt.SUCCESS;case"canceled":return Jt.CANCELED;case"error":return Jt.ERROR;default:return Jt.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zB{constructor(e,n,i){if(aB(e)||n!=null||i!=null)this.next=e,this.error=n??void 0,this.complete=i??void 0;else{const s=e;this.next=s.next,this.error=s.error,this.complete=s.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xa(t){return(...e)=>{Promise.resolve().then(()=>t(...e))}}class BB{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Ks.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Ks.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Ks.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,i,r,s){if(this.sent_)throw Jl("cannot .send() more than once");if(ss(e)&&i&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const a in s)s.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,s[a].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Jl("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Jl("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Jl("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Jl("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class FB extends BB{initXhr(){this.xhr_.responseType="text"}}function Vs(){return new FB}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qB{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,n,i=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=n,this._metadata=i,this._mappings=eP(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=r=>{if(this._request=void 0,this._chunkMultiplier=1,r._codeEquals(Me.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const s=this.isExponentialBackoffExpired();if(YN(r.status,[]))if(s)r=HN();else{this.sleepTime=Math.max(this.sleepTime*2,H9),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=r,this._transition("error")}},this._metadataErrorHandler=r=>{this._request=void 0,r._codeEquals(Me.CANCELED)?this.completeTransitions_():(this._error=r,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((r,s)=>{this._resolve=r,this._reject=s,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){const e=this._transferred;return n=>this._updateProgress(e+n)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([n,i])=>{switch(this._state){case"running":e(n,i);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,n)=>{const i=xB(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(i,Vs,e,n);this._request=r,r.getPromise().then(s=>{this._request=void 0,this._uploadUrl=s,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((n,i)=>{const r=LB(this._ref.storage,this._ref._location,e,this._blob),s=this._ref.storage._makeRequest(r,Vs,n,i);this._request=s,s.getPromise().then(a=>{a=a,this._request=void 0,this._updateProgress(a.current),this._needToFetchStatus=!1,a.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=wb*this._chunkMultiplier,n=new Id(this._transferred,this._blob.size()),i=this._uploadUrl;this._resolveToken((r,s)=>{let a;try{a=UB(this._ref._location,this._ref.storage,i,this._blob,e,this._mappings,n,this._makeProgressCallback())}catch(u){this._error=u,this._transition("error");return}const o=this._ref.storage._makeRequest(a,Vs,r,s,!1);this._request=o,o.getPromise().then(u=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(u.current),u.finalized?(this._metadata=u.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){wb*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,n)=>{const i=PB(this._ref.storage,this._ref._location,this._mappings),r=this._ref.storage._makeRequest(i,Vs,e,n);this._request=r,r.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,n)=>{const i=MB(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(i,Vs,e,n);this._request=r,r.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const n=this._transferred;this._transferred=e,this._transferred!==n&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const n=this._state==="paused";this._state=e,n&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=jN(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=sg(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,n,i,r){const s=new zB(n||void 0,i||void 0,r||void 0);return this._addObserver(s),()=>{this._removeObserver(s)}}then(e,n){return this._promise.then(e,n)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const n=this._observers.indexOf(e);n!==-1&&this._observers.splice(n,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(n=>{this._notifyObserver(n)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(sg(this._state)){case Jt.SUCCESS:xa(this._resolve.bind(null,this.snapshot))();break;case Jt.CANCELED:case Jt.ERROR:const n=this._reject;xa(n.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(sg(this._state)){case Jt.RUNNING:case Jt.PAUSED:e.next&&xa(e.next.bind(e,this.snapshot))();break;case Jt.SUCCESS:e.complete&&xa(e.complete.bind(e))();break;case Jt.CANCELED:case Jt.ERROR:e.error&&xa(e.error.bind(e,this._error))();break;default:e.error&&xa(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(e,n){this._service=e,n instanceof mn?this._location=n:this._location=mn.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new ca(e,n)}get root(){const e=new mn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return ZN(this._location.path)}get storage(){return this._service}get parent(){const e=IB(this._location.path);if(e===null)return null;const n=new mn(this._location.bucket,e);return new ca(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw tB(e)}}function HB(t,e,n){return t._throwIfRoot("uploadBytesResumable"),new qB(t,new vr(e),n)}function jB(t){t._throwIfRoot("getDownloadURL");const e=OB(t.storage,t._location,eP());return t.storage.makeRequestWithTokens(e,Vs).then(n=>{if(n===null)throw Z9();return n})}function GB(t){t._throwIfRoot("deleteObject");const e=VB(t.storage,t._location);return t.storage.makeRequestWithTokens(e,Vs)}function KB(t,e){const n=AB(t._location.path,e),i=new mn(t._location.bucket,n);return new ca(t.storage,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QB(t){return/^[A-Za-z]+:\/\//.test(t)}function YB(t,e){return new ca(t,e)}function rP(t,e){if(t instanceof UT){const n=t;if(n._bucket==null)throw X9();const i=new ca(n,n._bucket);return e!=null?rP(i,e):i}else return e!==void 0?KB(t,e):t}function $B(t,e){if(e&&QB(e)){if(t instanceof UT)return YB(t,e);throw H_("To use ref(service, url), the first argument must be a Storage instance.")}else return rP(t,e)}function Ib(t,e){const n=e==null?void 0:e[qN];return n==null?null:mn.makeFromBucketSpec(n,t)}function WB(t,e,n,i={}){t.host=`${e}:${n}`;const r=ss(e);r&&($y(`https://${t.host}/b`),Wy("Storage",!0)),t._isUsingEmulator=!0,t._protocol=r?"https":"http";const{mockUserToken:s}=i;s&&(t._overrideAuthToken=typeof s=="string"?s:O0(s,t.app.options.projectId))}class UT{constructor(e,n,i,r,s,a=!1){this.app=e,this._authProvider=n,this._appCheckProvider=i,this._url=r,this._firebaseVersion=s,this._isUsingEmulator=a,this._bucket=null,this._host=FN,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=F9,this._maxUploadRetryTime=q9,this._requests=new Set,r!=null?this._bucket=mn.makeFromBucketSpec(r,this._host):this._bucket=Ib(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=mn.makeFromBucketSpec(this._url,e):this._bucket=Ib(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Eb("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Eb("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(Oe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ca(this,e)}_makeRequest(e,n,i,r,s=!0){if(this._deleted)return new nB(KN());{const a=dB(e,this._appId,i,r,n,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,n){const[i,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,i,r).getPromise()}}const Ab="@firebase/storage",bb="0.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sP="storage";function p5(t,e,n){return t=$(t),HB(t,e,n)}function g5(t){return t=$(t),jB(t)}function _5(t){return t=$(t),GB(t)}function y5(t,e){return t=$(t),$B(t,e)}function v5(t=nv(),e){t=$(t);const i=Kd(t,sP).getImmediate({identifier:e}),r=P0("storage");return r&&XB(i,...r),i}function XB(t,e,n,i={}){WB(t,e,n,i)}function JB(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return new UT(n,i,r,e,Ki)}function ZB(){Fi(new Gn(sP,JB,"PUBLIC").setMultipleInstances(!0)),Tn(Ab,bb,""),Tn(Ab,bb,"esm2020")}ZB();export{e5 as A,Sb as B,n5 as R,pe as T,v5 as a,_9 as b,pN as c,Ed as d,Gz as e,Lc as f,l5 as g,m9 as h,R9 as i,t5 as j,C9 as k,m5 as l,y5 as m,p5 as n,VN as o,g5 as p,hr as q,$_ as r,gb as s,E9 as t,_b as u,_5 as v,r9 as w,T9 as x,P9 as y,i5 as z};
