!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("Avalon requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(){avalon.config.debug&&console.log.apply(console,arguments)}function r(){return Object.create(null)}function i(){}function o(e,t){"string"==typeof e&&(e=e.match(Tt)||[]);for(var n={},a=void 0!==t?t:1,r=0,i=e.length;i>r;r++)n[e[r]]=a;return n}function l(){if(e.VBArray){var t=document.documentMode;return t?t:e.XMLHttpRequest?7:6}return 0/0}function s(e){if(e&&"object"==typeof e){var t=e.length,n=Ot.call(e);if(/(Array|List|Collection|Map|Arguments)\]$/.test(n))return!0;if("[object Object]"===n&&t===t>>>0)return!0}return!1}function c(e,t){if(e&&e.childNodes)for(var n,a=e.childNodes,r=0;n=a[r++];)if(n.tagName){var i=yt.createElementNS(Xt,n.tagName.toLowerCase());Nt.forEach.call(n.attributes,function(e){i.setAttribute(e.name,e.value)}),c(n,i),t.appendChild(i)}}function u(e){for(var t in e)if(Mt.call(e,t)){var n=e[t];"function"==typeof u.plugins[t]?u.plugins[t](n):"object"==typeof u[t]?avalon.mix(u[t],n):u[t]=n}return this}function f(e){return(e+"").replace(Jt,"\\$&")}function d(e,t,n){if(Array.isArray(e)){var a=e.concat();e.length=0;var i=$(e);return i.pushArray(a),i}if(!e||e.nodeType>0||e.$id&&e.$events)return e;var o=Array.isArray(e.$skipArray)?e.$skipArray:[];o.$special=t||r();var l={};n=n||{};var s=r(),c=r(),u=[];nn.forEach(function(t){delete e[t]});var f=Object.keys(e);f.forEach(function(t,a){var r=e[t];if(n[t]=r,x(t,r,o)){s[t]=[];var i=avalon.type(r);"object"===i&&_t(r.get)&&Object.keys(r).length<=2?(a=m(t,r),u.push(a)):a=Ct.test(i)?g(t,r,i,s[t],n):h(t,r),c[t]=a}}),l=Object.defineProperties(l,rn(c));for(var d=0;d<f.length;d++){var p=f[d];c[p]||(l[p]=e[p])}v(l,"$id",Rt()),v(l,"$model",n),v(l,"$events",s),v(l,"hasOwnProperty",function(e){return e in this.$model});for(d in en)v(l,d,en[d]);return l.$reinitialize=function(){u.forEach(function(e){delete e._value,delete e.oldArgs,e.digest=function(){e.call(l)},sn.begin({callback:function(t,n){var a=n._name;if(n!==e){var r=t.$events[a];e.vm=l,E(r,e.digest)}}});try{e.get.call(l)}finally{sn.end()}})},l.$reinitialize(),l}function v(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!1,configurable:!0})}function p(e){for(var t=Object.keys(e),n=0;n<nn.length;n++){var a=t.indexOf(nn[n]);-1!==a&&t.splice(a,1)}return t}function h(e,t){function n(e){var t=n._value;return arguments.length>0?($t||an(e,t)||(n.updateValue(this,e),n.notify(this,e,t)),this):(sn.collectDependency(this,n),t)}return w(n,e),n._value=t,n}function m(e,t){function n(t){var a=n._value,r="_value"in n;if(arguments.length>0){if($t)return this;if("function"==typeof n.set&&n.oldArgs!==t){n.oldArgs=t;var i=this.$events,o=i[e];i[e]=[],n.set.call(this,t),i[e]=o,t=n.get.call(this),t!==a&&(n.updateValue(this,t),n.notify(this,t,a))}return this}return t=n.get.call(this),n.updateValue(this,t),r&&a!==t&&n.notify(this,t,a),t}return n.set=t.set,n.get=t.get,w(n,e),n}function g(e,t,n,a,r){function i(t){var a=i._value,r=i._vmodel;if(arguments.length>0){if($t)return this;if("array"===n){var o=r,l=t,s=o.length,c=l.length;o.$lock=!0,s>c?o.splice(c,s-c):c>s&&o.push.apply(o,l.slice(s));for(var u=Math.min(s,c),f=0;u>f;f++)o.set(f,l[f]);delete o.$lock,o._fire("set")}else if("object"===n){t=t.$model?t.$model:t;var v=this.$events[e]||[],p=avalon.mix(!0,{},t);for(f in r)r.hasOwnProperty(f)&&Mt.call(p,f)&&(r[f]=p[f]);r=i._vmodel=d(t),r.$events[xt]=v,v.length&&v.forEach(function(e){e.type&&(e.rollback&&e.rollback(),Bt[e.type](e,e.vmodels))})}return i.updateValue(this,r.$model),i.notify(this,this._value,a),this}return sn.collectDependency(this,i),r}w(i,e),r[e]=Array.isArray(t)?t:r[e]||{};var o=i._vmodel=d(t,0,r[e]);return o.$events[xt]=a,i}function y(e,t){e.$model[this._name]=this._value=t}function b(e,t,n){var a=this._name,r=e.$events[a];r&&(k(r),en.$fire.call(e,a,t,n))}function w(e,t){e._name=t,e.updateValue=y,e.notify=b}function x(e,t,n){if(_t(t)||t&&t.nodeType)return!1;if(-1!==n.indexOf(e))return!1;var a=n.$special;return e&&"$"===e.charAt(0)&&!a[e]?!1:!0}function $(e){var t=[];t.$id=Rt(),t.$model=e,t.$events={},t.$events[xt]=[],t._=d({length:e.length}),t._.$watch("length",function(e,n){t.$fire("length",e,n)});for(var n in en)t[n]=en[n];return avalon.mix(t,ln),t}function T(e,t,n,a,r,i,o){for(var l=this.length,s=2;--s;){switch(e){case"add":var c=this.$model.slice(t,t+n).map(function(e){return Ct.test(avalon.type(e))?e.$id?e:d(e,0,e):e});on.apply(this,[t,0].concat(c)),this._fire("add",t,n);break;case"del":var u=this._splice(t,n);this._fire("del",t,n)}r&&(e=r,t=i,n=o,s=2,r=0)}return this._fire("index",a),this.length!==l&&(this._.length=this.length),u}function C(e,t){for(var n={},a=0,r=t.length;r>a;a++){n[a]=e[a];var i=t[a];i in n?(e[a]=n[i],delete n[i]):e[a]=e[i]}}function E(e,t){t.oneTime||e&&avalon.Array.ensure(e,t)&&t.element&&(M(t,e),new Date-dn>444&&O())}function k(e){if(e&&e.length){new Date-dn>444&&"object"==typeof e[0]&&O();for(var t,n=St.call(arguments,1),a=e.length;t=e[--a];){var r=t.element;if(r&&r.parentNode)try{var i=t.evaluator;if(t.$repeat)t.handler.apply(t,n);else if("$repeat"in t||!i)Bt[t.type](t,t.vmodels);else if("on"!==t.type){var o=i.apply(0,t.args||[]);t.handler(o,r,t)}}catch(l){console.log(l)}}}}function A(e,t){return e.uuid||t||(e.uuid=++un),e.uuid}function M(e,t){var n=e.element;e.uuid||(e.uuid=1!==n.nodeType?e.type+A(n.parentNode)+"-"+ ++un:e.name+"-"+A(n));var a=e.lists||(e.lists=[]);avalon.Array.ensure(a,t),t.$uuid=t.$uuid||Rt(),fn[e.uuid]||(fn[e.uuid]=1,fn.push(e))}function O(e){if(!avalon.optimize){for(var t=fn.length,n=t,a=[],r={},i={};e=fn[--t];){var o=e.type;i[o]?i[o]++:(i[o]=1,a.push(o))}var l=!1;if(a.forEach(function(e){vn[e]!==i[e]&&(r[e]=1,l=!0)}),t=n,l)for(;e=fn[--t];)if(null!==e.element){if(r[e.type]&&S(e.element)){fn.splice(t,1),delete fn[e.uuid];for(var s,c=e.lists,u=0;s=c[u++];)avalon.Array.remove(c,s),avalon.Array.remove(s,e);N(e)}}else fn.splice(t,1);vn=i,dn=new Date}}function N(e){delete fn[e.uuid],e.element=null,e.rollback&&e.rollback();for(var t in e)e[t]=null}function S(e){try{{e.parentNode.nodeType}}catch(t){return!0}return e.ifRemove&&!Lt.contains(e.ifRemove)&&wt===e.parentNode?(e.parentNode&&e.parentNode.removeChild(e),!0):e.msRetain?0:1===e.nodeType?!Lt.contains(e):!avalon.contains(Lt,e)}function j(e){return e.replace(/([a-z\d])([A-Z]+)/g,"$1-$2").toLowerCase()}function L(e){return e.indexOf("-")<0&&e.indexOf("_")<0?e:e.replace(/[-_][^-_]/g,function(e){return e.charAt(1).toUpperCase()})}function H(e){try{if("object"==typeof e)return e;e="true"===e?!0:"false"===e?!1:"null"===e?null:+e+""===e?+e:wn.test(e)?JSON.parse(e):e}catch(t){}return e}function D(e){return e.window&&e.document?e:9===e.nodeType?e.defaultView:!1}function P(e,t){if(e.offsetWidth<=0){var n=getComputedStyle(e,null);if(En.test(n.display)){var a={node:e};for(var r in Cn)a[r]=n[r],e.style[r]=Cn[r];t.push(a)}var i=e.parentNode;i&&1===i.nodeType&&P(i,t)}}function R(e){var t=e.tagName.toLowerCase();return"input"===t&&/checkbox|radio/.test(e.type)?"checked":t}function I(e,t,n,a){for(var r,i=[],o=" = "+n+".",l=e.length;r=e[--l];)t.hasOwnProperty(r)&&(i.push(r+o+r),a.vars.push(r),"duplex"===a.type&&(e.get=n+"."+r),e.splice(l,1));return i}function _(e){for(var t=[],n={},a=0;a<e.length;a++){var r=e[a],i=r&&"string"==typeof r.$id?r.$id:r;n[i]||(n[i]=t.push(r))}return t}function B(e,t){return t=t.replace(_n,"").replace(Bn,function(){return"],|"}).replace(Fn,function(e,t){return"["+An(t)}).replace(Vn,function(){return'"],["'}).replace(Xn,function(){return'",'})+"]","return this.filters.$filter("+e+", "+t+")"}function F(e,t,a){var r=a.type,o=a.filters||"",l=t.map(function(e){return String(e.$id).replace(In,"$1")})+e+r+o,s=Dn(e).concat(),c=[],u=[],f=[],d="";t=_(t),a.vars=[];for(var v=0,p=t.length;p>v;v++)if(s.length){var h="vm"+gt+"_"+v;u.push(h),f.push(t[v]),c.push.apply(c,I(s,t[v],h,a))}if(c.length||"duplex"!==r){"duplex"!==r&&(e.indexOf("||")>-1||e.indexOf("&&")>-1)&&a.vars.forEach(function(t){var n=new RegExp("\\b"+t+"(?:\\.\\w+|\\[\\w+\\])+","ig");e=e.replace(n,function(n,a){var r=n.charAt(t.length),i=e.slice(a+n.length),o=/^\s*\(/.test(i);if("."===r||"["===r||o){var l="var"+String(Math.random()).replace(/^0\./,"");if(o){var s=n.split(".");if(s.length>2){var u=s.pop();return c.push(l+" = "+s.join(".")),l+"."+u}return n}return c.push(l+" = "+n),l}return n})}),a.args=f,delete a.vars;var m=Pn.get(l);if(m)return void(a.evaluator=m);if(d=c.join(", "),d&&(d="var "+d),/\S/.test(o)){if(!/text|html/.test(a.type))throw Error("ms-"+a.type+"不支持过滤器");e="\nvar ret"+gt+" = "+e+";\r\n",e+=B("ret"+gt,o);try{m=Function.apply(i,u.concat("'use strict';\n"+d+e)),a.evaluator=Pn.put(l,function(){return m.apply(avalon,arguments)})}catch(g){n("debug: parse error,"+g.message)}return void(s=c=u=null)}if("duplex"===r){var y="'use strict';\nreturn function(vvv){\n  "+d+";\n  if(!arguments.length){\n    return "+e+"\n  }\n "+(Rn.test(e)?e:s.get)+"= vvv;\n} ";try{m=Function.apply(i,u.concat(y)),a.evaluator=Pn.put(l,m)}catch(g){n("debug: parse error,"+g.message)}return void(s=c=u=null)}if("on"===r){-1===e.indexOf("(")?e+=".call(this, $event)":e=e.replace("(",".call(this,"),u.push("$event"),e="\nreturn "+e+";";var b=e.lastIndexOf("\nreturn"),w=e.slice(0,b),x=e.slice(b);e=w+"\n"+x}else e="\nreturn "+e+";";try{m=Function.apply(i,u.concat("'use strict';\n"+d+e)),a.evaluator=Pn.put(l,m)}catch(g){n("debug: parse error,"+g.message)}s=c=u=null}}function V(e){var t=Wt.test(e);if(t){var n=K(e);return 1===n.length?n[0].value:n.map(function(e){return e.expr?"("+e.value+")":An(e.value)}).join(" + ")}return e}function X(e,t,n,a){e=e||"",F(e,t,n),n.evaluator&&!a&&(n.handler=Ft[n.handlerName||n.type],avalon.injectBinding(n))}function U(e,t,n){var a=setTimeout(function(){var r=e.innerHTML;clearTimeout(a),r===n?t():U(e,t,r)})}function Y(e,t){var n=e.getAttribute("avalonctrl")||t.$id;e.setAttribute("avalonctrl",n),t.$events.expr=e.tagName+'[avalonctrl="'+n+'"]'}function q(e,t){for(var n,a=0;n=e[a++];)n.vmodels=t,Bt[n.type](n,t),n.evaluator&&n.element&&1===n.element.nodeType&&n.element.removeAttribute(n.name);e.length=0}function z(e,t){return e.priority-t.priority}function W(e,t,a){var i=!0;if(t.length){for(var o,l=e.attributes,s=[],c=[],u={},f=r(),d=0;o=l[d++];)if(o.specified&&(a=o.name.match(Wn))){var v=a[1],p=a[2]||"",h=o.value,m=o.name;if(u[m])continue;if(u[m]=1,Zn[v]?(p=v,v="on"):Jn[v]&&("enabled"===v&&(n("warning!ms-enabled或ms-attr-enabled已经被废弃"),v="disabled",h="!("+h+")"),p=v,v="attr",m="ms-"+v+"-"+p,c.push([o.name,m,h])),f[m]=h,"function"==typeof Bt[v]){var g=h.replace(zn,""),y=h!==g,b={type:v,param:p,element:e,name:m,value:g,oneTime:y,priority:(Gn[v]||10*v.charCodeAt(0))+(Number(p.replace(/\D/g,""))||0)};if("html"===v||"text"===v){var w=Q(h);avalon.mix(b,w),b.filters=b.filters.replace(ea,function(){return b.type="html",b.group=1,""})}else if("duplex"===v)var x=m;else"ms-if-loop"===m&&(b.priority+=100);s.push(b),"widget"===v&&(e.msData=e.msData||f)}}if(s.length){s.sort(z),c.forEach(function(t){n("warning!请改用"+t[1]+"代替"+t[0]+"!"),e.removeAttribute(t[0]),e.setAttribute(t[1],t[2])});var $=e.type;for($&&x&&f["ms-attr-value"]&&"text"===e.type&&n("warning!"+$+"控件不能同时定义ms-attr-value与"+x),d=0;b=s[d];d++){if(v=b.type,Qn.test(v))return q(s.slice(0,d+1),t);i&&(i=!Kn.test(v))}q(s,t)}}i&&!Un[e.tagName]&&Zt.test(e.innerHTML+e.textContent)&&(qn&&qn(e),G(e,t))}function G(e,t){var n=avalon.slice(e.childNodes);Z(n,t)}function Z(e,t){for(var n,a=0;n=e[a++];)switch(n.nodeType){case 1:J(n,t),n.msCallback&&(n.msCallback(),n.msCallback=void 0);break;case 3:Wt.test(n.nodeValue)&&et(n,t,a)}}function J(e,t,n){var a=e.getAttribute("ms-skip"),r=e.getAttributeNode("ms-important"),i=e.getAttributeNode("ms-controller");if("string"!=typeof a){if(n=r||i){var o=avalon.vmodels[n.value];if(!o)return;t=n===r?[o]:[o].concat(t),e.removeAttribute(n.name),e.classList.remove(n.name),Y(e,o)}W(e,t)}}function Q(e){if(e.indexOf("|")>0){var t=e.replace(na,function(e){return Array(e.length+1).join("1")}),n=t.replace(ta,"ᄢ㍄").indexOf("|");if(n>-1)return{filters:e.slice(n),value:e.slice(0,n),expr:!0}}return{value:e,filters:"",expr:!0}}function K(e){for(var t,n,a=[],r=0;;){if(n=e.indexOf(qt,r),-1===n)break;if(t=e.slice(r,n),t&&a.push({value:t,filters:"",expr:!1}),r=n+qt.length,n=e.indexOf(zt,r),-1===n)break;t=e.slice(r,n),t&&a.push(Q(t)),r=n+zt.length}return t=e.slice(r),t&&a.push({value:t,expr:!1,filters:""}),a}function et(e,t){var n=[],a=K(e.data);if(a.length){for(var r,i=0;r=a[i++];){var o=yt.createTextNode(r.value);r.expr&&(r.value=r.value.replace(zn,function(){return r.oneTime=!0,""}),r.type="text",r.element=o,r.filters=r.filters.replace(ea,function(){return r.type="html",""}),n.push(r)),Ht.appendChild(o)}e.parentNode.replaceChild(Ht,e),n.length&&q(n,t)}}function tt(e,t,n){var a=e.templateCache&&e.templateCache[t];if(a){for(var r,i=yt.createDocumentFragment();r=a.firstChild;)i.appendChild(r);return i}return avalon.parseHTML(n)}function nt(e){return null==e?"":e}function at(e,t,n){return t.param.replace(/\w+/g,function(a){var r=avalon.duplexHooks[a];r&&"function"==typeof r[n]&&(e=r[n](e,t))}),e}function rt(){for(var e=va.length-1;e>=0;e--){var t=va[e];t()===!1&&va.splice(e,1)}va.length||clearInterval(da)}function it(e,t,n,a){var r=e.template.cloneNode(!0),i=avalon.slice(r.childNodes);r.insertBefore(yt.createComment(e.signature),r.firstChild),t.appendChild(r);var o=[n].concat(e.vmodels),l={nodes:i,vmodels:o};a.push(l)}function ot(e){for(var t,n=[],a=e.element.parentNode.childNodes,r=0;t=a[r++];)if(t.nodeValue===e.signature)n.push(t);else if(t.nodeValue===e.signature+":end")break;return n}function lt(e,t,n){for(;;){var a=t.previousSibling;if(!a)break;if(a.parentNode.removeChild(a),n&&n.call(a),a===e)break}}function st(){var e=d({$key:"",$outer:{},$host:{},$val:{get:function(){return this.$host[this.$key]},set:function(e){this.$host[this.$key]=e}}},{$val:1});return e.$id=Rt("$proxy$with"),e}function ct(e,t,n){e=e||ga.pop(),e?e.$reinitialize():e=st();var a=n.$repeat;return e.$key=t,e.$host=a,e.$outer=n.$outer,a.$events?e.$events.$val=a.$events[t]:e.$events={},e}function ut(e){ft(e)}function ft(e){e.forEach(function(e){pt(e,ya)}),e.length=0}function dt(e){var t={$host:[],$outer:{},$index:0,$first:!1,$last:!1,$remove:avalon.noop};t[e]={get:function(){var t=this.$events,n=t.$index;t.$index=t[e];try{return this.$host[this.$index]}finally{t.$index=n}},set:function(e){try{var t=this.$events,n=t.$index;t.$index=[],this.$host.set(this.$index,e)}finally{t.$index=n}}};var n={$last:1,$first:1,$index:1},a=d(t,n);return a.$id=Rt("$proxy$each"),a}function vt(e,t){for(var n,a=t.param||"el",r=0,i=ya.length;i>r;r++){var o=ya[r];o&&o.hasOwnProperty(a)&&(n=o,ya.splice(r,1))}n||(n=dt(a));var l=t.$repeat,s=l.length-1;return n.$index=e,n.$first=0===e,n.$last=e===s,n.$host=l,n.$outer=t.$outer,n.$remove=function(){return l.removeAt(n.$index)},n}function pt(e,t){for(var n in e.$events){var a=e.$events[n];Array.isArray(a)&&(a.forEach(function(e){"object"==typeof e&&N(e)}),a.length=0)}e.$host=e.$outer={},t.unshift(e)>u.maxRepeatSize&&t.pop()}function ht(e,t){var n="_"+e;if(!ht[n]){var a=yt.createElement(e);Lt.appendChild(a),t=jt?getComputedStyle(a,null).display:a.currentStyle.display,Lt.removeChild(a),ht[n]=t}return ht[n]}function mt(e,t,n,a){e=(e+"").replace(/[^0-9+\-Ee.]/g,"");var r=isFinite(+e)?+e:0,i=isFinite(+t)?Math.abs(t):3,o=a||",",l=n||".",s="",c=function(e,t){var n=Math.pow(10,t);return""+(Math.round(e*n)/n).toFixed(t)};return s=(i?c(r,i):""+Math.round(r)).split("."),s[0].length>3&&(s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,o)),(s[1]||"").length<i&&(s[1]=s[1]||"",s[1]+=new Array(i-s[1].length+1).join("0")),s.join(l)}var gt=Date.now(),yt=e.document,bt=yt.head;bt.insertAdjacentHTML("afterBegin",'<avalon ms-skip class="avalonHide"><style id="avalonStyle">.avalonHide{ display: none!important }</style></avalon>');var wt=bt.firstChild,xt="$"+gt,$t=!1,Tt=/[^, ]+/g,Ct=/^(?:object|array)$/,Et=/^\[object SVG\w*Element\]$/,kt=/^\[object (?:Window|DOMWindow|global)\]$/,At=Object.prototype,Mt=At.hasOwnProperty,Ot=At.toString,Nt=Array.prototype,St=Nt.slice,jt=e.dispatchEvent,Lt=yt.documentElement,Ht=yt.createDocumentFragment(),Dt=yt.createElement("div"),Pt={};"Boolean Number String Function Array Date RegExp Object Error".replace(Tt,function(e){Pt["[object "+e+"]"]=e.toLowerCase()});var Rt=function(e){return e=e||"avalon",String(Math.random()+Math.random()).replace(/\d\.\d{4}/,e)},It=l();avalon=function(e){return new avalon.init(e)},avalon.profile=function(){e.console&&avalon.config.profile&&Function.apply.call(console.log,console,arguments)},avalon.nextTick=new function(){function t(){for(var e=r.length,t=0;e>t;t++)r[t]();r=r.slice(e)}var n=e.setImmediate,a=e.MutationObserver;if(n)return n.bind(e);var r=[];if(a){var i=document.createTextNode("avalon");return new a(t).observe(i,{characterData:!0}),function(e){r.push(e),i.data=Math.random()}}return e.VBArray?function(e){r.push(e);var n=yt.createElement("script");n.onreadystatechange=function(){t(),n.onreadystatechange=null,bt.removeChild(n),n=null},bt.appendChild(n)}:function(e){setTimeout(e,4)}},avalon.init=function(e){this[0]=this.element=e},avalon.fn=avalon.prototype=avalon.init.prototype,avalon.type=function(e){return null==e?String(e):"object"==typeof e||"function"==typeof e?Pt[Ot.call(e)]||"object":typeof e};var _t=function(e){return"[object Function]"===Ot.call(e)};avalon.isFunction=_t,avalon.isWindow=function(e){return kt.test(Ot.call(e))},avalon.isPlainObject=function(e){return"[object Object]"===Ot.call(e)&&Object.getPrototypeOf(e)===At},avalon.mix=avalon.fn.mix=function(){var e,t,n,a,r,i,o=arguments[0]||{},l=1,s=arguments.length,c=!1;for("boolean"==typeof o&&(c=o,o=arguments[1]||{},l++),"object"==typeof o||_t(o)||(o={}),l===s&&(o=this,l--);s>l;l++)if(null!=(e=arguments[l]))for(t in e)n=o[t],a=e[t],o!==a&&(c&&a&&(avalon.isPlainObject(a)||(r=Array.isArray(a)))?(r?(r=!1,i=n&&Array.isArray(n)?n:[]):i=n&&avalon.isPlainObject(n)?n:{},o[t]=avalon.mix(c,i,a)):void 0!==a&&(o[t]=a));return o},avalon.mix({rword:Tt,subscribers:xt,version:1.47,ui:{},log:n,slice:function(e,t,n){return St.call(e,t,n)},noop:i,error:function(e,t){throw new(t||Error)(e)},oneObject:o,range:function(e,t,n){n||(n=1),null==t&&(t=e||0,e=0);for(var a=-1,r=Math.max(0,Math.ceil((t-e)/n)),i=new Array(r);++a<r;)i[a]=e,e+=n;return i},eventHooks:{},bind:function(e,t,n,a){var r=avalon.eventHooks,i=r[t];return"object"==typeof i&&(t=i.type||t,a=i.phase||!!a,n=i.fn?i.fn(e,n):n),e.addEventListener(t,n,a),n},unbind:function(e,t,n,a){var r=avalon.eventHooks,o=r[t],l=n||i;"object"==typeof o&&(t=o.type||t,a=o.phase||!!a),e.removeEventListener(t,l,a)},css:function(e,t,n){e instanceof avalon&&(e=e[0]);var a,r=/[_-]/.test(t)?L(t):t;if(t=avalon.cssName(r)||r,void 0===n||"boolean"==typeof n){a=xn[r+":get"]||xn["@:get"],"background"===t&&(t="backgroundColor");var i=a(e,t);return n===!0?parseFloat(i)||0:i}if(""===n)e.style[t]="";else{if(null==n||n!==n)return;isFinite(n)&&!avalon.cssNumber[r]&&(n+="px"),a=xn[r+":set"]||xn["@:set"],a(e,t,n)}},each:function(e,t){if(e){var n=0;if(s(e))for(var a=e.length;a>n&&t(n,e[n])!==!1;n++);else for(n in e)if(e.hasOwnProperty(n)&&t(n,e[n])===!1)break}},getWidgetData:function(e,t){var n=avalon(e).data(),a={};for(var r in n)0===r.indexOf(t)&&(a[r.replace(t,"").replace(/\w/,function(e){return e.toLowerCase()})]=n[r]);return a},Array:{ensure:function(e,t){return-1===e.indexOf(t)?e.push(t):void 0},removeAt:function(e,t){return!!e.splice(t,1).length},remove:function(e,t){var n=e.indexOf(t);return~n?avalon.Array.removeAt(e,n):!1}}});var Bt=avalon.bindingHandlers={},Ft=avalon.bindingExecutors={},Vt=new function(){function e(e){this.size=0,this.limit=e,this.head=this.tail=void 0,this._keymap={}}var t=e.prototype;return t.put=function(e,t){var n={key:e,value:t};return this._keymap[e]=n,this.tail?(this.tail.newer=n,n.older=this.tail):this.head=n,this.tail=n,this.size===this.limit?this.shift():this.size++,t},t.shift=function(){var e=this.head;e&&(this.head=this.head.newer,this.head.older=e.newer=e.older=this._keymap[e.key]=void 0,delete this._keymap[e.key])},t.get=function(e){var t=this._keymap[e];if(void 0!==t)return t===this.tail?t.value:(t.newer&&(t===this.head&&(this.head=t.newer),t.newer.older=t.older),t.older&&(t.older.newer=t.newer),t.newer=void 0,t.older=this.tail,this.tail&&(this.tail.newer=t),this.tail=t,t.value)},e};if(yt.contains||(Node.prototype.contains=function(e){return!!(16&this.compareDocumentPosition(e))}),avalon.contains=function(e,t){try{for(;t=t.parentNode;)if(t===e)return!0;return!1}catch(n){return!1}},e.SVGElement){var Xt="http://www.w3.org/2000/svg",Ut=yt.createElementNS(Xt,"svg");Ut.innerHTML='<circle cx="50" cy="50" r="40" fill="red" />',Et.test(Ut.firstChild)||Object.defineProperties(SVGElement.prototype,{outerHTML:{enumerable:!0,configurable:!0,get:function(){return(new XMLSerializer).serializeToString(this)},set:function(e){var t=this.tagName.toLowerCase(),n=this.parentNode,a=avalon.parseHTML(e);if("svg"===t)n.insertBefore(a,this);else{var r=yt.createDocumentFragment();c(a,r),n.insertBefore(r,this)}n.removeChild(this)}},innerHTML:{enumerable:!0,configurable:!0,get:function(){var e=this.outerHTML,t=new RegExp("<"+this.nodeName+'\\b(?:(["\'])[^"]*?(\\1)|[^>])*>',"i"),n=new RegExp("</"+this.nodeName+">$","i");return e.replace(t,"").replace(n,"")},set:function(e){if(avalon.clearHTML){avalon.clearHTML(this);var t=avalon.parseHTML(e);c(t,this)}}}})}var Yt=avalon.eventHooks;"onmouseenter"in Lt||avalon.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){Yt[e]={type:t,deel:function(t,n,a){return function(n){var r=n.relatedTarget;return r&&(r===t||16&t.compareDocumentPosition(r))?void 0:(delete n.type,n.type=e,a.call(t,n))}}}}),avalon.each({AnimationEvent:"animationend",WebKitAnimationEvent:"webkitAnimationEnd"},function(t,n){e[t]&&!Yt.animationend&&(Yt.animationend={type:n})}),void 0===yt.onmousewheel&&(Yt.mousewheel={type:"wheel",fn:function(e,t){return function(n){n.wheelDeltaY=n.wheelDelta=n.deltaY>0?-120:120,n.wheelDeltaX=0,Object.defineProperty(n,"type",{value:"mousewheel"}),t.call(e,n)}}});var qt,zt,Wt,Gt,Zt,Jt=/[-.*+?^${}()|[\]\/\\]/g,Qt={interpolate:function(e){if(qt=e[0],zt=e[1],qt===zt)throw new SyntaxError("openTag===closeTag");var t=qt+"test"+zt;if(Dt.innerHTML=t,Dt.innerHTML!==t&&Dt.innerHTML.indexOf("&lt;")>-1)throw new SyntaxError("此定界符不合法");u.openTag=qt,u.closeTag=zt,Dt.innerHTML="";var n=f(qt),a=f(zt);Wt=new RegExp(n+"(.*?)"+a),Gt=new RegExp(n+"(.*?)"+a,"g"),Zt=new RegExp(n+".*?"+a+"|\\sms-")}};u.debug=!0,u.plugins=Qt,u.plugins.interpolate(["{{","}}"]),u.paths={},u.shim={},u.maxRepeatSize=100,avalon.config=u;var Kt=function(e){return yt.querySelectorAll(e)},en={$watch:function(e,t){if("function"==typeof t){var n=this.$events[e];n?n.push(t):this.$events[e]=[t]}else this.$events=this.$watch.backup;return this},$unwatch:function(e,t){var n=arguments.length;if(0===n)this.$watch.backup=this.$events,this.$events={};else if(1===n)this.$events[e]=[];else for(var a=this.$events[e]||[],r=a.length;~--r<0;)if(a[r]===t)return a.splice(r,1);return this},$fire:function(e){var t,n,a,r;/^(\w+)!(\S+)$/.test(e)&&(t=RegExp.$1,e=RegExp.$2);var i=this.$events;if(i){var o=St.call(arguments,1),l=[e].concat(o);if("all"===t)for(n in avalon.vmodels)a=avalon.vmodels[n],a!==this&&a.$fire.apply(a,l);else if("up"===t||"down"===t){var s=i.expr?Kt(i.expr):[];if(0===s.length)return;for(n in avalon.vmodels)if(a=avalon.vmodels[n],a!==this&&a.$events.expr){var c=Kt(a.$events.expr);if(0===c.length)continue;Nt.forEach.call(c,function(e){Nt.forEach.call(s,function(n){var r="down"===t?n.contains(e):e.contains(n);r&&(e._avalon=a)})})}var u=yt.getElementsByTagName("*"),f=[];for(Nt.forEach.call(u,function(e){e._avalon&&(f.push(e._avalon),e._avalon="",e.removeAttribute("_avalon"))}),"up"===t&&f.reverse(),n=0;(r=f[n++])&&r.$fire.apply(r,l)!==!1;);}else{var d=i[e]||[],v=i.$all||[];for(n=0;r=d[n++];)_t(r)&&r.apply(this,o);for(n=0;r=v[n++];)_t(r)&&r.apply(this,arguments)}}}},tn=avalon.vmodels={};avalon.define=function(e,t){var a=e.$id||e;if(a||n("warning: vm必须指定$id"),tn[a]&&n("warning: "+a+" 已经存在于avalon.vmodels中"),"object"==typeof e)var r=d(e);else{var o={$watch:i};t(o),r=d(o),$t=!0,t(r),$t=!1}return r.$id=a,tn[a]=r};var nn=String("$id,$watch,$unwatch,$fire,$events,$model,$skipArray,$reinitialize").match(Tt),an=Object.is||function(e,t){return 0===e&&0===t?1/e===1/t:e!==e?t!==t:e===t},rn=function(e){var t={};for(var n in e)t[n]={get:e[n],set:e[n],enumerable:!0,configurable:!0};return t},on=Nt.splice,ln={_splice:on,_fire:function(e,t,n){k(this.$events[xt],e,t,n)},size:function(){return this._.length},pushArray:function(e){var t=e.length,n=this.length;return t&&(Nt.push.apply(this.$model,e),T.call(this,"add",n,t,Math.max(0,n-1))),t+n},push:function(){var e,t=[],n=arguments.length;for(e=0;n>e;e++)t[e]=arguments[e];return this.pushArray(t)},unshift:function(){var e=arguments.length,t=this.length;return e&&(Nt.unshift.apply(this.$model,arguments),T.call(this,"add",0,e,0)),e+t},shift:function(){if(this.length){var e=this.$model.shift();return T.call(this,"del",0,1,0),e}},pop:function(){var e=this.length;if(e){var t=this.$model.pop();return T.call(this,"del",e-1,1,Math.max(0,e-2)),t}},splice:function(e){var t,n=arguments.length,a=[],r=on.apply(this.$model,arguments);return r.length&&(a.push("del",e,r.length,0),t=!0),n>2&&(t?a.splice(3,1,0,"add",e,n-2):a.push("add",e,n-2,0),t=!0),t?T.apply(this,a):[]},contains:function(e){return-1!==this.indexOf(e)},remove:function(e){return this.removeAt(this.indexOf(e))},removeAt:function(e){return e>=0?(this.$model.splice(e,1),T.call(this,"del",e,1,0)):[]},clear:function(){return this.$model.length=this.length=this._.length=0,this._fire("clear",0),this},removeAll:function(e){if(Array.isArray(e))for(var t=this.length-1;t>=0;t--)-1!==e.indexOf(this[t])&&this.removeAt(t);else if("function"==typeof e)for(t=this.length-1;t>=0;t--){var n=this[t];e(n,t)&&this.removeAt(t)}else this.clear()},ensure:function(e){return this.contains(e)||this.push(e),this},set:function(e,t){if(e<this.length&&e>-1){var n=avalon.type(t);t&&t.$model&&(t=t.$model);var a=this[e];if("object"===n)for(var r in t)a.hasOwnProperty(r)&&(a[r]=t[r]);else"array"===n?a.clear().push.apply(a,t):a!==t&&(this[e]=t,this.$model[e]=t,this._fire("set",e,t))}return this}};"sort,reverse".replace(Tt,function(e){ln[e]=function(){var t,n=this.$model,a=n.concat(),r=Math.random(),i=[];Nt[e].apply(n,arguments);for(var o=0,l=a.length;l>o;o++){var s=n[o],c=a[o];if(an(s,c))i.push(o);else{var u=a.indexOf(s);i.push(u),a[u]=r,t=!0}}return t&&(C(this,i),this._fire("move",i),this._fire("index",0)),this}});var sn=function(){var e,t=[];return{begin:function(n){t.push(e),e=n},end:function(){e=t.pop()},collectDependency:function(t,n){e&&e.callback(t,n)}}}(),cn=/^(duplex|on)$/;avalon.injectBinding=function(e){var t=e.evaluator;if(t){sn.begin({callback:function(t,n){E(t.$events[n._name],e)}});try{var a=cn.test(e.type)?e:t.apply(0,e.args);void 0===a&&delete e.evaluator,e.handler&&e.handler(a,e.element,e)}catch(r){n("warning:exception throwed in [avalon.injectBinding] ",r),delete e.evaluator;var i=e.element;if(i&&3===i.nodeType){var o=i.parentNode;u.commentInterpolate?o.replaceChild(yt.createComment(e.value),i):i.data=qt+(e.oneTime?"::":"")+e.value+zt}}finally{sn.end()}}};var un=0,fn=avalon.$$subscribers=[],dn=new Date,vn={},pn=new function(){avalon.mix(this,{option:yt.createElement("select"),thead:yt.createElement("table"),td:yt.createElement("tr"),area:yt.createElement("map"),tr:yt.createElement("tbody"),col:yt.createElement("colgroup"),legend:yt.createElement("fieldset"),_default:yt.createElement("div"),g:yt.createElementNS("http://www.w3.org/2000/svg","svg")}),this.optgroup=this.option,this.tbody=this.tfoot=this.colgroup=this.caption=this.thead,this.th=this.td};String("circle,defs,ellipse,image,line,path,polygon,polyline,rect,symbol,text,use").replace(Tt,function(e){pn[e]=pn.g});var hn=/<([\w:]+)/,mn=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,gn=o(["","text/javascript","text/ecmascript","application/ecmascript","application/javascript"]),yn=yt.createElement("script"),bn=/<|&#?\w+;/;avalon.parseHTML=function(e){var t=Ht.cloneNode(!1);if("string"!=typeof e)return t;if(!bn.test(e))return t.appendChild(yt.createTextNode(e)),t;e=e.replace(mn,"<$1></$2>").trim();var n,a=(hn.exec(e)||["",""])[1].toLowerCase(),r=pn[a]||pn._default;r.innerHTML=e;var i=r.getElementsByTagName("script");if(i.length)for(var o,l=0;o=i[l++];)if(gn[o.type]){var s=yn.cloneNode(!1);Nt.forEach.call(o.attributes,function(e){s.setAttribute(e.name,e.value)}),s.text=o.text,o.parentNode.replaceChild(s,o)}for(;n=r.firstChild;)t.appendChild(n);return t},avalon.innerHTML=function(e,t){var n=this.parseHTML(t);this.clearHTML(e).appendChild(n)},avalon.clearHTML=function(e){for(e.textContent="";e.firstChild;)e.removeChild(e.firstChild);return e},"add,remove".replace(Tt,function(e){avalon.fn[e+"Class"]=function(t){var n=this[0];return t&&"string"==typeof t&&n&&1===n.nodeType&&t.replace(/\S+/g,function(t){n.classList[e](t)}),this}}),avalon.fn.mix({hasClass:function(e){var t=this[0]||{};return 1===t.nodeType&&t.classList.contains(e)},toggleClass:function(e,t){for(var n,a=0,r=String(e).split(/\s+/),i="boolean"==typeof t;n=r[a++];){var o=i?t:!this.hasClass(n);this[o?"addClass":"removeClass"](n)}return this},attr:function(e,t){return 2===arguments.length?(this[0].setAttribute(e,t),this):this[0].getAttribute(e)},data:function(e,t){switch(e="data-"+j(e||""),arguments.length){case 2:return this.attr(e,t),this;case 1:var n=this.attr(e);return H(n);case 0:var a={};return Nt.forEach.call(this[0].attributes,function(t){t&&(e=t.name,e.indexOf("data-")||(e=L(e.slice(5)),a[e]=H(t.value)))}),a}},removeData:function(e){return e="data-"+j(e),this[0].removeAttribute(e),this},css:function(e,t){if(avalon.isPlainObject(e))for(var n in e)avalon.css(this,n,e[n]);else var a=avalon.css(this,e,t);return void 0!==a?a:this},position:function(){var e,t,n=this[0],a={top:0,left:0};if(n)return"fixed"===this.css("position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),"HTML"!==e[0].tagName&&(a=e.offset()),a.top+=avalon.css(e[0],"borderTopWidth",!0),a.left+=avalon.css(e[0],"borderLeftWidth",!0),a.top-=e.scrollTop(),a.left-=e.scrollLeft()),{top:t.top-a.top-avalon.css(n,"marginTop",!0),left:t.left-a.left-avalon.css(n,"marginLeft",!0)}},offsetParent:function(){for(var e=this[0].offsetParent;e&&"static"===avalon.css(e,"position");)e=e.offsetParent;return avalon(e||Lt)},bind:function(e,t,n){return this[0]?avalon.bind(this[0],e,t,n):void 0},unbind:function(e,t,n){return this[0]&&avalon.unbind(this[0],e,t,n),this},val:function(e){var t=this[0];if(t&&1===t.nodeType){var n=0===arguments.length,a=n?":get":":set",r=kn[R(t)+a];if(r)var i=r(t,e);else{if(n)return(t.value||"").replace(/\r/g,"");t.value=e}}return n?i:this}}),Lt.dataset&&(avalon.fn.data=function(e,t){e=e&&L(e);var n=this[0].dataset;switch(arguments.length){case 2:return n[e]=t,this;case 1:return t=n[e],H(t);case 0:var a=r();for(e in n)a[e]=H(n[e]);return a}});var wn=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/;avalon.parseJSON=JSON.parse,avalon.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){avalon.fn[e]=function(n){var a=this[0]||{},r=D(a),i="scrollTop"===e;return arguments.length?void(r?r.scrollTo(i?r[t]:n,i?n:r[t]):a[e]=n):r?r[t]:a[e]}});var xn=avalon.cssHooks=r(),$n=["","-webkit-","-moz-","-ms-"],Tn={"float":"cssFloat"};avalon.cssNumber=o("animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom"),avalon.cssName=function(e,t,n){if(Tn[e])return Tn[e];t=t||Lt.style;for(var a=0,r=$n.length;r>a;a++)if(n=L($n[a]+e),n in t)return Tn[e]=n;return null},xn["@:set"]=function(e,t,n){e.style[t]=n},xn["@:get"]=function(e,t){if(!e||!e.style)throw new Error("getComputedStyle要求传入一个节点 "+e);
var n,a=getComputedStyle(e);return a&&(n="filter"===t?a.getPropertyValue(t):a[t],""===n&&(n=e.style[t])),n},xn["opacity:get"]=function(e){var t=xn["@:get"](e,"opacity");return""===t?"1":t},"top,left".replace(Tt,function(e){xn[e+":get"]=function(t){var n=xn["@:get"](t,e);return/px$/.test(n)?n:avalon(t).position()[e]+"px"}});var Cn={position:"absolute",visibility:"hidden",display:"block"},En=/^(none|table(?!-c[ea]).+)/;"Width,Height".replace(Tt,function(e){var t=e.toLowerCase(),n="client"+e,a="scroll"+e,r="offset"+e;xn[t+":get"]=function(t,n,a){var i=-4;"number"==typeof a&&(i=a),n="Width"===e?["Left","Right"]:["Top","Bottom"];var o=t[r];return 2===i?o+avalon.css(t,"margin"+n[0],!0)+avalon.css(t,"margin"+n[1],!0):(0>i&&(o=o-avalon.css(t,"border"+n[0]+"Width",!0)-avalon.css(t,"border"+n[1]+"Width",!0)),-4===i&&(o=o-avalon.css(t,"padding"+n[0],!0)-avalon.css(t,"padding"+n[1],!0)),o)},xn[t+"&get"]=function(e){var n=[];P(e,n);for(var a,r=xn[t+":get"](e),i=0;a=n[i++];){e=a.node;for(var o in a)"string"==typeof a[o]&&(e.style[o]=a[o])}return r},avalon.fn[t]=function(i){var o=this[0];if(0===arguments.length){if(o.setTimeout)return o["inner"+e];if(9===o.nodeType){var l=o.documentElement;return Math.max(o.body[a],l[a],o.body[r],l[r],l[n])}return xn[t+"&get"](o)}return this.css(t,i)},avalon.fn["inner"+e]=function(){return xn[t+":get"](this[0],void 0,-2)},avalon.fn["outer"+e]=function(e){return xn[t+":get"](this[0],void 0,e===!0?2:0)}}),avalon.fn.offset=function(){var e=this[0];try{var t=e.getBoundingClientRect();if(t.width||t.height||e.getClientRects().length){var n=e.ownerDocument,a=n.documentElement,r=n.defaultView;return{top:t.top+r.pageYOffset-a.clientTop,left:t.left+r.pageXOffset-a.clientLeft}}}catch(i){return{left:0,top:0}}};var kn={"select:get":function(e,t){for(var n,a=e.options,r=e.selectedIndex,i="select-one"===e.type||0>r,o=i?null:[],l=i?r+1:a.length,s=0>r?l:i?r:0;l>s;s++)if(n=a[s],(n.selected||s===r)&&!n.disabled){if(t=n.value,i)return t;o.push(t)}return o},"select:set":function(e,t,n){t=[].concat(t);for(var a,r=0;a=e.options[r++];)(a.selected=t.indexOf(a.value)>-1)&&(n=!0);n||(e.selectedIndex=-1)}},An=JSON.stringify,Mn=["break,case,catch,continue,debugger,default,delete,do,else,false","finally,for,function,if,in,instanceof,new,null,return,switch,this","throw,true,try,typeof,var,void,while,with","abstract,boolean,byte,char,class,const,double,enum,export,extends","final,float,goto,implements,import,int,interface,long,native","package,private,protected,public,short,static,super,synchronized","throws,transient,volatile","arguments,let,yield,undefined"].join(","),On=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,Nn=/[^\w$]+/g,Sn=new RegExp(["\\b"+Mn.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),jn=/\b\d[^,]*/g,Ln=/^,+|,+$/g,Hn=new Vt(512),Dn=function(e){var t=","+e.trim(),n=Hn.get(t);if(n)return n;var a=e.replace(On,"").replace(Nn,",").replace(Sn,"").replace(jn,"").replace(Ln,"").split(/^$|,+/);return Hn.put(t,_(a))},Pn=new Vt(128),Rn=/\w\[.*\]|\w\.\w/,In=/(\$proxy\$[a-z]+)\d+$/,_n=/\)\s*$/,Bn=/\)\s*\|/g,Fn=/\|\s*([$\w]+)/g,Vn=/"\s*\["/g,Xn=/"\s*\(/g;avalon.parseExprProxy=X,avalon.scan=function(e,t){e=e||Lt;var n=t?[].concat(t):[];J(e,n)};var Un=o("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase()),Yn=function(e,t,n){var a=e.getAttribute(t);if(a)for(var r,i=0;r=n[i++];)if(r.hasOwnProperty(a)&&"function"==typeof r[a])return r[a]},qn=It&&e.MutationObserver?function(e){for(var t,n=e.firstChild;n;){var a=n.nextSibling;3===n.nodeType?t?(t.nodeValue+=n.nodeValue,e.removeChild(n)):t=n:t=null,n=a}}:0,zn=/^\s*::/,Wn=/ms-(\w+)-?(.*)/,Gn={"if":10,repeat:90,data:100,widget:110,each:1400,"with":1500,duplex:2e3,on:3e3},Zn=o("animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit"),Jn=o("value,title,alt,checked,selected,disabled,readonly,enabled"),Qn=/^if|widget|repeat$/,Kn=/^each|with|html|include$/,ea=/\|\s*html(?:\b|$)/,ta=/\|\|/g,na=/(['"])(\\\1|.)+?\1/g,aa=["autofocus,autoplay,async,allowTransparency,checked,controls","declare,disabled,defer,defaultChecked,defaultSelected","contentEditable,isMap,loop,multiple,noHref,noResize,noShade","open,readOnly,selected"].join(","),ra={};aa.replace(Tt,function(e){ra[e.toLowerCase()]=e});var ia={"accept-charset":"acceptCharset","char":"ch",charoff:"chOff","class":"className","for":"htmlFor","http-equiv":"httpEquiv"},oa=["accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan","dateTime,defaultValue,frameBorder,longDesc,maxLength,marginWidth,marginHeight","rowSpan,tabIndex,useMap,vSpace,valueType,vAlign"].join(",");oa.replace(Tt,function(e){ia[e.toLowerCase()]=e});var la=/<noscript.*?>(?:[\s\S]+?)<\/noscript>/gim,sa=/<noscript.*?>([\s\S]+?)<\/noscript>/im,ca=function(){return new(e.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP")},ua=avalon.templateCache={};Bt.attr=function(e,t){var n=V(e.value.trim());if("include"===e.type){var a=e.element;e.includeRendered=Yn(a,"data-include-rendered",t),e.includeLoaded=Yn(a,"data-include-loaded",t);var r=e.includeReplace=!!avalon(a).data("includeReplace");avalon(a).data("includeCache")&&(e.templateCache={}),e.startInclude=yt.createComment("ms-include"),e.endInclude=yt.createComment("ms-include-end"),r?(e.element=e.startInclude,a.parentNode.insertBefore(e.startInclude,a),a.parentNode.insertBefore(e.endInclude,a.nextSibling)):(a.insertBefore(e.startInclude,a.firstChild),a.appendChild(e.endInclude))}e.handlerName="attr",X(n,t,e)},Ft.attr=function(t,n,a){var r=a.type,i=a.param;if("css"===r)avalon(n).css(i,t);else if("attr"===r){var o=t===!1||null===t||void 0===t;!jt&&ia[i]&&(i=ia[i]);var l=ra[i];if("boolean"==typeof n[l]&&(n[l]=!!t,t||(o=!0)),o)return n.removeAttribute(i);var s=Et.test(n)?!1:yt.namespaces&&isVML(n)?!0:i in n.cloneNode(!1);s?n[i]=t+"":n.setAttribute(i,t)}else if("include"===r&&t){var c=a.vmodels,u=a.includeRendered,f=a.includeLoaded,d=a.includeReplace,v=d?n.parentNode:n,p=function(e){if(null!==a.vmodels){if(f){var n=f.apply(v,[e].concat(c));"string"==typeof n&&(e=n)}u&&U(v,function(){u.call(v)},0/0);var r=a.includeLastID;if(a.templateCache&&r&&r!==t){var i=a.templateCache[r];i||(i=a.templateCache[r]=yt.createElement("div"),wt.appendChild(i))}for(a.includeLastID=t;a.startInclude;){var o=a.startInclude.nextSibling;if(!o||o===a.endInclude)break;v.removeChild(o),i&&i.appendChild(o)}var l=tt(a,t,e),s=avalon.slice(l.childNodes);v.insertBefore(l,a.endInclude),Z(s,c)}};if("src"===a.param)if("string"==typeof ua[t])avalon.nextTick(function(){p(ua[t])});else if(Array.isArray(ua[t]))ua[t].push(p);else{var h=ca();h.onreadystatechange=function(){if(4===h.readyState){var e=h.status;if(e>=200&&300>e||304===e||1223===e){for(var n,a=h.responseText,r=0;n=ua[t][r++];)n(a);ua[t]=a}}},ua[t]=[p],h.open("GET",t,!0),"withCredentials"in h&&(h.withCredentials=!0),h.setRequestHeader("X-Requested-With","XMLHttpRequest"),h.send(null)}else{var m=t&&1===t.nodeType?t:yt.getElementById(t);if(m){if("NOSCRIPT"===m.tagName&&!m.innerHTML&&!m.fixIE78){h=ca(),h.open("GET",location,!1),h.send(null);for(var g=yt.getElementsByTagName("noscript"),y=(h.responseText||"").match(la)||[],b=y.length,w=0;b>w;w++){var x=g[w];x&&(x.style.display="none",x.fixIE78=(y[w].match(sa)||["","&nbsp;"])[1])}}avalon.nextTick(function(){p(m.fixIE78||m.value||m.innerText||m.innerHTML)})}}}else if(Lt.hasAttribute||"string"!=typeof t||"src"!==r&&"href"!==r||(t=t.replace(/&amp;/g,"&")),n[r]=t,e.chrome&&"EMBED"===n.tagName){var $=n.parentNode,T=document.createComment("ms-src");$.replaceChild(T,n),$.replaceChild(n,T)}},"title,alt,src,value,css,include,href".replace(Tt,function(e){Bt[e]=Bt.attr}),Bt["class"]=function(e,t){var n,a=e.param,r=e.value;if(e.handlerName="class",!a||isFinite(a)){e.param="";var i=r.replace(Gt,function(e){return e.replace(/./g,"0")}).indexOf(":");if(-1===i){var o=r;n=!0}else o=r.slice(0,i),n=r.slice(i+1);o=Wt.test(r)?V(o):An(o),e.expr="["+o+","+n+"]"}else e.expr="["+An(a)+","+r+"]",e.oldStyle=a;var l=e.type;if("hover"===l||"active"===l){if(!e.hasBindEvent){var s=e.element,c=avalon(s),u="mouseenter",f="mouseleave";if("active"===l){s.tabIndex=s.tabIndex||-1,u="mousedown",f="mouseup";var d=c.bind("mouseleave",function(){e.toggleClass&&c.removeClass(e.newClass)})}}var v=c.bind(u,function(){e.toggleClass&&c.addClass(e.newClass)}),p=c.bind(f,function(){e.toggleClass&&c.removeClass(e.newClass)});e.rollback=function(){c.unbind("mouseleave",d),c.unbind(u,v),c.unbind(f,p)},e.hasBindEvent=!0}X(e.expr,t,e)},Ft["class"]=function(e,t,n){var a=avalon(t);n.newClass=e[0],n.toggleClass=!!e[1],n.oldClass&&n.newClass!==n.oldClass&&a.removeClass(n.oldClass),n.oldClass=n.newClass,"class"===n.type&&(n.oldStyle?a.toggleClass(n.oldStyle,!!e[1]):a.toggleClass(n.newClass,n.toggleClass))},"hover,active".replace(Tt,function(e){Bt[e]=Bt["class"]}),Ft.data=function(e,t,n){var a="data-"+n.param;e&&"object"==typeof e?t[a]=e:t.setAttribute(a,String(e))};var fa=Bt.duplex=function(e,t){var a,r=e.element;if(X(e.value,t,e,1),e.changed=Yn(r,"data-duplex-changed",t)||i,e.evaluator&&e.args){var l=[],s=o("string,number,boolean,checked");"radio"===r.type&&""===e.param&&(e.param="checked"),r.msData&&(r.msData["ms-duplex"]=e.value),e.param.replace(/\w+/g,function(t){/^(checkbox|radio)$/.test(r.type)&&/^(radio|checked)$/.test(t)&&("radio"===t&&n("ms-duplex-radio已经更名为ms-duplex-checked"),t="checked",e.isChecked=!0),"bool"===t?(t="boolean",n("ms-duplex-bool已经更名为ms-duplex-boolean")):"text"===t&&(t="string",n("ms-duplex-text已经更名为ms-duplex-string")),s[t]&&(a=!0),avalon.Array.ensure(l,t)}),a||l.push("string"),e.param=l.join("-"),e.bound=function(t,n){r.addEventListener?r.addEventListener(t,n,!1):r.attachEvent("on"+t,n);var a=e.rollback;e.rollback=function(){r.avalonSetter=null,avalon.unbind(r,t,n),a&&a()}};for(var c in avalon.vmodels){var u=avalon.vmodels[c];u.$fire("avalon-ms-duplex-init",e)}var f=e.pipe||(e.pipe=at);f(null,e,"init");var d=r.tagName;fa[d]&&fa[d](r,e.evaluator.apply(null,e.args),e)}};avalon.duplexHooks={checked:{get:function(e,t){return!t.element.oldValue}},string:{get:function(e){return e},set:nt},"boolean":{get:function(e){return"true"===e},set:nt},number:{get:function(e,t){var n=parseFloat(e);if(-e===-n)return n;var a=/strong|medium|weak/.exec(t.element.getAttribute("data-duplex-number"))||["medium"];switch(a[0]){case"strong":return 0;case"medium":return""===e?"":0;case"weak":return e}},set:nt}};var da,va=[];avalon.tick=function(e){1===va.push(e)&&(da=setInterval(rt,60))};var pa=i;!new function(){function e(e){t[this.tagName].call(this,e),!this.msFocus&&this.avalonSetter&&this.oldValue!==e&&this.avalonSetter()}try{var t={},n=HTMLInputElement.prototype,a=HTMLTextAreaElement.prototype,r=HTMLInputElement.prototype;Object.getOwnPropertyNames(r),t.INPUT=Object.getOwnPropertyDescriptor(n,"value").set,Object.defineProperty(n,"value",{set:e}),t.TEXTAREA=Object.getOwnPropertyDescriptor(a,"value").set,Object.defineProperty(a,"value",{set:e})}catch(i){pa=avalon.tick}};var ha=/^(file|button|reset|submit|checkbox|radio|range)$/;fa.INPUT=function(e,t,a){function r(e){a.changed.call(this,e,a)}function i(){u=!0}function o(){u=!1}var l=e.type,s=a.bound,c=avalon(e),u=!1,f=function(){var n=e.value;if(!u&&n!==e.oldValue){var i=a.pipe(n,a,"get");c.data("duplexObserve")!==!1&&(t(i),r.call(e,i))}};if(a.handler=function(){var n=a.pipe(t(),a,"set");if(n!==e.oldValue){var r=!1;if(e.msFocus){var i=e.selectionStart,o=e.selectionEnd;if(i===o){var l=i;r=!0}}e.value=e.oldValue=n,r&&(e.selectionStart=e.selectionEnd=l)}},a.isChecked||"radio"===l)f=function(){if(c.data("duplexObserve")!==!1){var n=a.pipe(e.value,a,"get");t(n),r.call(e,n)}},a.handler=function(){var n=t(),r=a.isChecked?!!n:n+""===e.value;e.checked=e.oldValue=r},s("click",f);else if("checkbox"===l)f=function(){if(c.data("duplexObserve")!==!1){var i=e.checked?"ensure":"remove",o=t();Array.isArray(o)||(n("ms-duplex应用于checkbox上要对应一个数组"),o=[o]),avalon.Array[i](o,a.pipe(e.value,a,"get")),r.call(e,o)}},a.handler=function(){var n=[].concat(t());e.checked=n.indexOf(a.pipe(e.value,a,"get"))>-1},s("change",f);else{var d=e.getAttribute("data-duplex-event")||"input";e.attributes["data-event"]&&n("data-event指令已经废弃，请改用data-duplex-event"),d.replace(Tt,function(e){switch(e){case"input":s("input",f),s("DOMAutoComplete",f),It||(s("compositionstart",i),s("compositionend",o));break;default:s(e,f)}}),ha.test(l)||("hidden"!==l&&(s("focus",function(){e.msFocus=!0}),s("blur",function(){e.msFocus=!1})),e.avalonSetter=f,pa(function(){if(Lt.contains(e))e.msFocus||a.oldValue===e.value||f();else if(!e.msRetain)return!1}))}avalon.injectBinding(a),r.call(e,e.value)},fa.TEXTAREA=fa.INPUT,fa.SELECT=function(e,t,a){function r(){if(i.data("duplexObserve")!==!1){var n=i.val();n=Array.isArray(n)?n.map(function(e){return a.pipe(e,a,"get")}):a.pipe(n,a,"get"),n+""!==e.oldValue&&t(n),a.changed.call(e,n,a)}}var i=avalon(e);a.handler=function(){var a=t();a=a&&a.$model||a,Array.isArray(a)?e.multiple||n("ms-duplex在<select multiple=true>上要求对应一个数组"):e.multiple&&n("ms-duplex在<select multiple=false>不能对应一个数组"),a=Array.isArray(a)?a.map(String):a+"",a+""!==e.oldValue&&(i.val(a),e.oldValue=a+"")},a.bound("change",r),e.msCallback=function(){avalon.injectBinding(a),a.changed.call(e,t(),a)}},Ft.html=function(e,t,n){var a=1!==t.nodeType,r=a?t.parentNode:t;if(r&&(e=null==e?"":e,n.oldText!==e)){if(n.oldText=e,3===t.nodeType){var i=Rt("html");r.insertBefore(yt.createComment(i),t),n.element=yt.createComment(i+":end"),r.replaceChild(n.element,t),t=n.element}if("object"!=typeof e)var o=avalon.parseHTML(String(e));else if(11===e.nodeType)o=e;else if(1===e.nodeType||e.item){var l=1===e.nodeType?e.childNodes:e.item;for(o=Ht.cloneNode(!0);l[0];)o.appendChild(l[0])}if(l=avalon.slice(o.childNodes),a){for(var s=t.nodeValue.slice(0,-4);;){var c=t.previousSibling;if(!c||8===c.nodeType&&c.nodeValue===s)break;r.removeChild(c)}r.insertBefore(o,t)}else avalon.clearHTML(t).appendChild(o);Z(l,n.vmodels)}},Bt["if"]=Bt.data=Bt.text=Bt.html=function(e,t){X(e.value,t,e)},Ft["if"]=function(e,t,n){try{if(!t.parentNode)return}catch(a){return}if(e)8===t.nodeType&&(t.parentNode.replaceChild(n.template,t),t.ifRemove=null,t=n.element=n.template),t.getAttribute(n.name)&&(t.removeAttribute(n.name),W(t,n.vmodels)),n.rollback=null;else if(1===t.nodeType){var r=n.element=yt.createComment("ms-if");t.parentNode.replaceChild(r,t),t.ifRemove=r,n.template=t,wt.appendChild(t),n.rollback=function(){t.parentNode===wt&&wt.removeChild(t)}}};var ma=/\(([^)]*)\)/;Bt.on=function(e,t){var n=e.value;e.type="on";var a=e.param.replace(/-\d+$/,"");if("function"==typeof Bt.on[a+"Hook"]&&Bt.on[a+"Hook"](e),n.indexOf("(")>0&&n.indexOf(")")>-1){var r=(n.match(ma)||["",""])[1].trim();(""===r||"$event"===r)&&(n=n.replace(ma,""))}X(n,t,e)},Ft.on=function(e,t,n){e=function(e){var t=n.evaluator||i;return t.apply(this,n.args.concat(e))};var a=n.param.replace(/-\d+$/,"");if("scan"===a)e.call(t,{type:a});else if("function"==typeof n.specialBind)n.specialBind(t,e);else var r=avalon.bind(t,a,e);n.rollback=function(){"function"==typeof n.specialUnbind?n.specialUnbind():avalon.unbind(t,a,r)}},Bt.repeat=function(e,t){var n=e.type;X(e.value,t,e,1),e.proxies=[];var a=!1;try{var r=e.$repeat=e.evaluator.apply(0,e.args||[]),o=avalon.type(r);"object"!==o&&"array"!==o?(a=!0,avalon.log("warning:"+e.value+"只能是对象或数组")):e.xtype=o}catch(l){a=!0}var s=e.value.split(".")||[];if(s.length>1){s.pop();for(var c,u=s[0],f=0;c=t[f++];)if(c&&c.hasOwnProperty(u)){var d=c[u].$events||{};d[xt]=d[xt]||[],d[xt].push(e);break}}var v=e.handler;e.handler=i,avalon.injectBinding(e),e.handler=v;var p=e.element;if(1===p.nodeType){p.removeAttribute(e.name),e.sortedCallback=Yn(p,"data-with-sorted",t),e.renderedCallback=Yn(p,"data-"+n+"-rendered",t);var h=Rt(n),m=yt.createComment(h),g=yt.createComment(h+":end");if(e.signature=h,e.template=Ht.cloneNode(!1),"repeat"===n){var y=p.parentNode;y.replaceChild(g,p),y.insertBefore(m,g),e.template.appendChild(p)}else{for(;p.firstChild;)e.template.appendChild(p.firstChild);p.appendChild(m),p.appendChild(g)}e.element=g,e.handler=Ft.repeat,e.rollback=function(){var t=e.element;t&&e.handler("clear")}}if(!a){e.$outer={};var b="$key",w="$val";for(Array.isArray(r)&&(b="$first",w="$last"),f=0;c=t[f++];)if(c.hasOwnProperty(b)&&c.hasOwnProperty(w)){e.$outer=c;break}var x=r.$events,$=(x||{})[xt];E($,e),"object"===o?e.handler("append"):r.length&&e.handler("add",0,r.length)}},Ft.repeat=function(e,t,n){var a=this;if(!e&&a.xtype){var r=a.$repeat,o=a.evaluator.apply(0,a.args||[]);if("array"===a.xtype){if(r.length===o.length){if(!(r!==o&&r.length>0))return;Ft.repeat.call(this,"clear",t,n)}e="add",t=0,a.$repeat=o,n=o.length}else{if(p(r).join(";;")===p(o).join(";;"))return;e="append",a.$repeat=o}}if(e){var l,s,c=a.element,u=ot(a),f=c.parentNode,d=a.proxies,v=Ht.cloneNode(!1);switch(e){case"add":for(var h=t+n,m=[],g=t;h>g;g++){var y=vt(g,a);d.splice(g,0,y),it(a,v,y,m)}for(f.insertBefore(v,u[t]||c),g=0;s=m[g++];)Z(s.nodes,s.vmodels),s.nodes=s.vmodels=null;break;case"del":lt(u[t],u[t+n]||c);var b=d.splice(t,n);ut(b,"each");break;case"clear":l=u[0],l&&(lt(l,c),"object"===a.xtype?f.insertBefore(l,c):ut(d,"each"));break;case"move":if(l=u[0]){var w,x=l.nodeValue,$=[],T=[];for(lt(l,c,function(){T.unshift(this),this.nodeValue===x&&($.unshift(T),T=[])}),C($,t),C(d,t);T=$.shift();)for(;w=T.shift();)v.appendChild(w);f.insertBefore(v,c)}break;case"index":for(var E=d.length-1;n=d[t];t++)n.$index=t,n.$first=0===t,n.$last=t===E;return;case"set":y=d[t],y&&k(y.$events[a.param||"el"]);break;case"append":var A=a.$repeat,M=Array.isArray(d)||!d?{}:d;a.proxies=M;var O=[];m=[];for(var N in M)A.hasOwnProperty(N)||(pt(M[N],ga),delete M[N]);for(N in A)A.hasOwnProperty(N)&&"hasOwnProperty"!==N&&O.push(N);if(a.sortedCallback){var S=a.sortedCallback.call(f,O);S&&Array.isArray(S)&&S.length&&(O=S)}for(g=0;N=O[g++];)"hasOwnProperty"!==N&&(M[N]=ct(M[N],N,a),it(a,v,M[N],m));for(f.insertBefore(v,c),g=0;s=m[g++];)Z(s.nodes,s.vmodels),s.nodes=s.vmodels=null}if(!a.$repeat||a.$repeat.hasOwnProperty("$lock"))return;"clear"===e&&(e="del");var j=a.renderedCallback||i,L=arguments;f.oldValue&&"SELECT"===f.tagName&&avalon(f).val(f.oldValue.split(",")),j.apply(f,L)}},"with,each".replace(Tt,function(e){Bt[e]=Bt.repeat});var ga=[],ya=[];Ft.text=function(e,t){if(e=null==e?"":e,3===t.nodeType)try{t.data=e}catch(n){}else t.textContent=e},avalon.parseDisplay=ht,Bt.visible=function(e,t){X(e.value,t,e)},Ft.visible=function(e,t,n){e?(t.style.display=n.display||"","none"===avalon(t).css("display")&&(t.style.display=n.display=ht(t.nodeName))):t.style.display="none"},Bt.widget=function(t,a){var r=t.value.match(Tt),o=t.element,l=r[0],s=r[1];s&&"$"!==s||(s=Rt(l));var c=r[2]||l,u=avalon.ui[l];if("function"==typeof u){a=o.vmodels||a;for(var f,d=0;f=a[d++];)if(f.hasOwnProperty(c)&&"object"==typeof f[c]){var v=f[c];v=v.$model||v;break}if(v){var p=v[l+"Id"];"string"==typeof p&&(n("warning!不再支持"+l+"Id"),s=p)}var h=avalon.getWidgetData(o,l);t.value=[l,s,c].join(","),t[l+"Id"]=s,t.evaluator=i,o.msData["ms-widget-id"]=s;var m=t[l+"Options"]=avalon.mix({},u.defaults,v||{},h);o.removeAttribute("ms-widget");var g=u(o,t,a)||{};if(g.$id){avalon.vmodels[s]=g,Y(o,g);try{g.$init(function(){avalon.scan(o,[g].concat(a)),"function"==typeof m.onInit&&m.onInit.call(o,g,m,a)})}catch(y){n(y)}t.rollback=function(){try{g.$remove(),g.widgetElement=null}catch(e){}o.msData={},delete avalon.vmodels[g.$id]},M(t,ba),e.chrome&&o.addEventListener("DOMNodeRemovedFromDocument",function(){setTimeout(O)})}else avalon.scan(o,a)}else a.length&&(o.vmodels=a)};var ba=[],wa=/<script[^>]*>([\S\s]*?)<\/script\s*>/gim,xa=/\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g,$a=/<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/gi,Ta={a:/\b(href)\=("javascript[^"]*"|'javascript[^']*')/gi,img:/\b(src)\=("javascript[^"]*"|'javascript[^']*')/gi,form:/\b(action)\=("javascript[^"]*"|'javascript[^']*')/gi},Ca=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,Ea=/([^\#-~| |!])/g,ka=avalon.filters={uppercase:function(e){return e.toUpperCase()},lowercase:function(e){return e.toLowerCase()},truncate:function(e,t,n){return t=t||30,n="string"==typeof n?n:"...",e.length>t?e.slice(0,t-n.length)+n:String(e)},$filter:function(e){for(var t=1,n=arguments.length;n>t;t++){var a=arguments[t],r=avalon.filters[a[0]];if("function"==typeof r){var i=[e].concat(a.slice(1));e=r.apply(null,i)}}return e},camelize:L,sanitize:function(e){return e.replace(wa,"").replace($a,function(e){var t=e.toLowerCase().match(/<(\w+)\s/);if(t){var n=Ta[t[1]];n&&(e=e.replace(n,function(e,t,n){var a=n.charAt(0);return t+"="+a+"javascript:void(0)"+a}))}return e.replace(xa," ").replace(/\s+/g," ")})},escape:function(e){return String(e).replace(/&/g,"&amp;").replace(Ca,function(e){var t=e.charCodeAt(0),n=e.charCodeAt(1);return"&#"+(1024*(t-55296)+(n-56320)+65536)+";"}).replace(Ea,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")},currency:function(e,t,n){return(t||"￥")+mt(e,isFinite(n)?n:2)},number:mt};!new function(){function e(e){return parseInt(e,10)||0}function t(e,t,n){var a="";for(0>e&&(a="-",e=-e),e=""+e;e.length<t;)e="0"+e;return n&&(e=e.substr(e.length-t)),a+e}function n(e,n,a,r){return function(i){var o=i["get"+e]();return(a>0||o>-a)&&(o+=a),0===o&&-12===a&&(o=12),t(o,n,r)}}function a(e,t){return function(n,a){var r=n["get"+e](),i=(t?"SHORT"+e:e).toUpperCase();return a[i][r]}}function r(e){var n=-1*e.getTimezoneOffset(),a=n>=0?"+":"";return a+=t(Math[n>0?"floor":"ceil"](n/60),2)+t(Math.abs(n%60),2)}function i(e,t){return e.getHours()<12?t.AMPMS[0]:t.AMPMS[1]}var o={yyyy:n("FullYear",4),yy:n("FullYear",2,0,!0),y:n("FullYear",1),MMMM:a("Month"),MMM:a("Month",!0),MM:n("Month",2,1),M:n("Month",1,1),dd:n("Date",2),d:n("Date",1),HH:n("Hours",2),H:n("Hours",1),hh:n("Hours",2,-12),h:n("Hours",1,-12),mm:n("Minutes",2),m:n("Minutes",1),ss:n("Seconds",2),s:n("Seconds",1),sss:n("Milliseconds",3),EEEE:a("Day"),EEE:a("Day",!0),a:i,Z:r},l=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,s=/^\/Date\((\d+)\)\/$/;ka.date=function(t,n){var a,r,i=ka.date.locate,c="",u=[];if(n=n||"mediumDate",n=i[n]||n,"string"==typeof t)if(/^\d+$/.test(t))t=e(t);else if(s.test(t))t=+RegExp.$1;else{var f=t.trim(),d=[0,0,0,0,0,0,0],v=new Date(0);f=f.replace(/^(\d+)\D(\d+)\D(\d+)/,function(t,n,a,r){var i=4===r.length?[r,n,a]:[n,a,r];return d[0]=e(i[0]),d[1]=e(i[1])-1,d[2]=e(i[2]),""});var p=v.setFullYear,h=v.setHours;f=f.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/,function(t,n,a,r,i){return d[3]=e(n),d[4]=e(a),d[5]=e(r),i&&(d[6]=Math.round(1e3*parseFloat("0."+i))),""});var m=0,g=0;f=f.replace(/Z|([+-])(\d\d):?(\d\d)/,function(t,n,a,r){return p=v.setUTCFullYear,h=v.setUTCHours,n&&(m=e(n+a),g=e(n+r)),""}),d[3]-=m,d[4]-=g,p.apply(v,d.slice(0,3)),h.apply(v,d.slice(3)),t=v}if("number"==typeof t&&(t=new Date(t)),"date"===avalon.type(t)){for(;n;)r=l.exec(n),r?(u=u.concat(r.slice(1)),n=u.pop()):(u.push(n),n=null);return u.forEach(function(e){a=o[e],c+=a?a(t,i):e.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),c}};var c={AMPMS:{0:"上午",1:"下午"},DAY:{0:"星期日",1:"星期一",2:"星期二",3:"星期三",4:"星期四",5:"星期五",6:"星期六"},MONTH:{0:"1月",1:"2月",2:"3月",3:"4月",4:"5月",5:"6月",6:"7月",7:"8月",8:"9月",9:"10月",10:"11月",11:"12月"},SHORTDAY:{0:"周日",1:"周一",2:"周二",3:"周三",4:"周四",5:"周五",6:"周六"},fullDate:"y年M月d日EEEE",longDate:"y年M月d日",medium:"yyyy-M-d H:mm:ss",mediumDate:"yyyy-M-d",mediumTime:"H:mm:ss","short":"yy-M-d ah:mm",shortDate:"yy-M-d",shortTime:"ah:mm"};c.SHORTMONTH=c.MONTH,ka.date.locate=c};var Aa,Ma=avalon.modules={"domReady!":{exports:avalon,state:3},avalon:{exports:avalon,state:4}},Oa=e.require,Na=e.define;Qt.loader=function(t){var n=Aa&&t;e.require=n?Aa:Oa,e.define=n?Aa.define:Na},Ma.exports=Ma.avalon,new function(){function t(e,t){var a="js";e=e.replace(/^(\w+)\!/,function(e,t){return a=t,""}),"ready"===a&&(n("debug: ready!已经被废弃，请使用domReady!"),a="domReady");var r="";e=e.replace(D,function(e){return r=e,""});var i="."+a,o=/js|css/.test(i)?i:"";e=e.replace(/\.[a-z0-9]+$/g,function(e){return e===i?(o=e,""):e});var l=avalon.mix({query:r,ext:o,res:a,name:e,toUrl:m},t);return l.toUrl(e),l}function o(e){var t=e.name,n=e.res,a=Ma[t],r=t&&e.urlNoQuery;if(a&&a.state>=1)return t;if(a=Ma[r],a&&a.state>=3)return Aa(a.deps||[],a.factory,r),r;if(t&&!a){a=Ma[r]={id:r,state:1};var i=function(r){H[n]=r,r.load(t,e,function(e){arguments.length&&void 0!==e&&(a.exports=e),a.state=4,c()})};H[n]?i(H[n]):Aa([n],i)}return t?r:n+"!"}function l(e,t){for(var n,a=0;n=e[a++];)if(4!==Ma[n].state&&(n===t||l(Ma[n].deps,t)))return!0}function s(e,t){var a=d(e.src);return e.onload=e.onerror=null,t?(setTimeout(function(){bt.removeChild(e),e=null}),void n("debug: 加载 "+a+" 失败"+t+" "+!Ma[a].state)):!0}function c(){e:for(var e,t=E.length;e=E[--t];){var n=Ma[e],a=n.deps;if(a){for(var r,i=0;r=a[i];i++)if(4!==Object(Ma[r]).state)continue e;4!==n.state&&(E.splice(t,1),h(n.id,n.deps,n.factory),c())}}}function f(e,t,a){var r=yt.createElement("script");r.className=xt,r.onload=function(){var r=k.pop();r&&r.require(t),a&&a(),n("debug: 已成功加载 "+e),t&&E.push(t),c()},r.onerror=function(){s(r,!0)},bt.insertBefore(r,bt.firstChild),r.src=e,n("debug: 正准备加载 "+e)}function d(e){return(e||"").replace(D,"")}function v(e){return/^(?:[a-z]+:)?\/\//i.test(String(e))}function p(){var e;try{a.b.c()}catch(t){e=t.stack}if(e)return e=e.split(/[@ ]/g).pop(),e="("===e[0]?e.slice(1,-1):e.replace(/\s/,""),d(e.replace(/(:\d+)?:\d+$/i,""));for(var n,r=bt.getElementsByTagName("script"),i=r.length;n=r[--i];)if(n.className===xt&&"interactive"===n.readyState){var o=n.src;return n.className=d(o)}}function h(t,a,i){var o=Object(Ma[t]);o.state=4;for(var l,s=0,c=[];l=a[s++];)if("exports"===l){var u=o.exports||(o.exports=r());c.push(u)}else c.push(Ma[l].exports);try{var f=i.apply(e,c)}catch(d){n("执行["+t+"]模块的factory抛错： ",d)}return void 0!==f&&(o.exports=f),P.test(t)&&delete Ma[t],delete o.factory,f}function m(e){0===e.indexOf(this.res+"!")&&(e=e.slice(this.res.length+1));var t=e,n=0,a=this.baseUrl,r=this.parentUrl||a;x(e,u.paths,function(e,a){t=t.replace(a,e),n=1}),n||x(e,u.packages,function(e,n,a){t=t.replace(a.name,a.location)}),this.mapUrl&&x(this.mapUrl,u.map,function(e){x(t,e,function(e,n){t=t.replace(n,e),r=a})});var i=this.ext;i&&n&&t.slice(-i.length)===i&&(t=t.slice(0,-i.length)),v(t)||(r=this.built||/^\w/.test(t)?a:r,t=T(r,t));var o=t+i;return t=o+this.query,o=t.replace(D,function(e){return this.query=e,""}),x(e,u.urlArgs,function(e){t+=(-1===t.indexOf("?")?"?":"&")+e}),this.url=t,this.urlNoQuery=o}function g(e,t,n){var a=w(e,t,n);return a.sort($),a}function y(e){return new RegExp("^"+e+"(/|$)")}function b(t){return function(){var n;return t.init&&(n=t.init.apply(e,arguments)),n||t.exports&&C(t.exports)}}function w(e,t,n){var a=[];for(var r in e){var i={name:r,val:e[r]};a.push(i),i.reg="*"===r&&t?/^/:y(r),n&&"*"!==r&&(i.reg=new RegExp("/"+r.replace(/^\//,"")+"(/|$)"))}return a}function x(e,t,n){t=t||[];for(var a,r=0;a=t[r++];)if(a.reg.test(e))return n(a.val,a.name,a),!1}function $(e,t){var n=e.name,a=t.name;return"*"===a?-1:"*"===n?1:a.length-n.length}function T(e,t){if("/"!==e.charAt(e.length-1)&&(e+="/"),"./"===t.slice(0,2))return e+t.slice(2);if(".."===t.slice(0,2)){for(e+=t;R.test(e);)e=e.replace(R,"");return e}return"/"===t.slice(0,1)?e+t.slice(1):e+t}function C(t){if(!t)return t;var n=e;return t.split(".").forEach(function(e){n=n[e]}),n}var E=[],k=[],A=/\.js$/i,M=[],O=!1;Aa=avalon.require=function(e,n,a,l){if(O){Array.isArray(e)||avalon.error("require方法的第一个参数应为数组 "+e);var s=[],f=r(),d=a||"callback"+setTimeout("1");l=l||r(),l.baseUrl=u.baseUrl;var v=!!l.built;if(a&&(l.parentUrl=a.substr(0,a.lastIndexOf("/")),l.mapUrl=a.replace(A,"")),v){var p=t(l.defineName,l);d=p.urlNoQuery}else e.forEach(function(e){var n=t(e,l),a=o(n);a&&(f[a]||(s.push(a),f[a]="司徒正美"))});var h=Ma[d];h&&4===h.state||(Ma[d]={id:d,deps:v?e.concat():s,factory:n||i,state:3}),h||E.push(d),c()}else if(M.push(avalon.slice(arguments)),arguments.length<=2){O=!0;for(var m,g=M.splice(0,M.length);m=g.shift();)Aa.apply(null,m)}},Aa.define=function(e,t,n){"string"!=typeof e&&(n=t,t=e,e="anonymous"),Array.isArray(t)||(n=t,t=[]);var a={built:!O,defineName:e},r=[t,n,a];n.require=function(e){if(r.splice(2,0,e),Ma[e]){Ma[e].state=3;var t=!1;try{t=l(Ma[e].deps,e)}catch(a){}t&&avalon.error(e+"模块与之前的模块存在循环依赖，请不要直接用script标签引入"+e+"模块")}delete n.require,Aa.apply(null,r)};var i=a.built?"unknown":p();if(i){var o=Ma[i];o&&(o.state=2),n.require(i)}else k.push(n)},Aa.config=u,Aa.define.amd=Ma;var N=u["orig.paths"]=r(),S=u["orig.map"]=r(),j=u.packages=[],L=u["orig.args"]=r();avalon.mix(Qt,{paths:function(e){avalon.mix(N,e),u.paths=g(N)},map:function(e){avalon.mix(S,e);var t=g(S,1,1);avalon.each(t,function(e,t){t.val=g(t.val)}),u.map=t},packages:function(e){e=e.concat(j);for(var t,n=r(),a=[],i=0;t=e[i++];){t="string"==typeof t?{name:t}:t;var o=t.name;if(!n[o]){var l=T(t.location||o,t.main||"main");l=l.replace(A,""),a.push(t),n[o]=t.location=l,t.reg=y(o)}}u.packages=a.sort()},urlArgs:function(e){"string"==typeof e&&(e={"*":e}),avalon.mix(L,e),u.urlArgs=g(L,1)},baseUrl:function(e){if(!v(e)){var t=bt.getElementsByTagName("base")[0];t&&bt.removeChild(t);var n=yt.createElement("a");n.href=e,e=n.href,t&&bt.insertBefore(t,bt.firstChild)}e.length>3&&(u.baseUrl=e)},shim:function(e){for(var t in e){var n=e[t];Array.isArray(n)&&(n=e[t]={deps:n}),n.exportsFn||!n.exports&&!n.init||(n.exportsFn=b(n))}u.shim=e}});var H=Aa.plugins={ready:{load:i},js:{load:function(e,t,n){var a=t.url,r=t.urlNoQuery,i=u.shim[e.replace(A,"")];i?Aa(i.deps||[],function(){var e=avalon.slice(arguments);f(a,r,function(){n(i.exportsFn?i.exportsFn.apply(0,e):void 0)})}):f(a,r)}},css:{load:function(e,t,a){var r=t.url;bt.insertAdjacentHTML("afterBegin",'<link rel="stylesheet" href="'+r+'">'),n("debug: 已成功加载 "+r),a()}},text:{load:function(e,t,a){var r=t.url,i=ca();i.onload=function(){var e=i.status;e>399&&600>e?avalon.error(r+" 对应资源不存在或没有开启 CORS"):(n("debug: 已成功加载 "+r),a(i.responseText))};var o="_="+(new Date-0),l=-1===r.indexOf("?")?r+"?"+o:r+"&"+o;i.open("GET",l,!0),"withCredentials"in i&&(i.withCredentials=!0),i.setRequestHeader("X-Requested-With","XMLHttpRequest"),i.send(),n("debug: 正准备加载 "+r)}}};Aa.checkDeps=c;var D=/(\?[^#]*)$/,P=/^callback\d+$/,R=/\/\w+\/\.\./,I=yt.scripts[yt.scripts.length-1],_=I.getAttribute("data-main");if(_){Qt.baseUrl(_);var B=u.baseUrl;u.baseUrl=B.slice(0,B.lastIndexOf("/")+1),f(B.replace(A,"")+".js")}else{var F=d(I.src);u.baseUrl=F.slice(0,F.lastIndexOf("/")+1)}};var Sa,ja=[],La=function(e){Sa=!0;var t=avalon.require;for(t&&t.checkDeps&&(Ma["domReady!"].state=4,t.checkDeps());e=ja.shift();)e(avalon)};"complete"===yt.readyState?setTimeout(La):yt.addEventListener("DOMContentLoaded",La),e.addEventListener("load",La),avalon.ready=function(e){Sa?e(avalon):ja.push(e)},avalon.config({loader:!0}),avalon.ready(function(){avalon.scan(yt.body)}),new function(){function t(){return/iPad|iPhone|iPod/i.test(a)&&!e.MSStream?"backdropFilter"in document.documentElement.style?9:e.indexedDB?8:e.SpeechSynthesisUtterance?7:e.webkitAudioContext?6:e.matchMedia?5:e.history&&"pushState"in e.history?4:3:0/0}function n(e,t){return t&&s.forEach(function(n){e[n]=t[n]}),e}var a=navigator.userAgent.toLowerCase(),r=a.indexOf("android")>0,o=t(),l=avalon.gestureHooks={pointers:{},start:function(e,t){for(var a=0;a<e.changedTouches.length;a++){var r=e.changedTouches[a],i={startTouch:n({},r),startTime:Date.now(),status:"tapping",element:e.target};l.pointers[r.identifier]=i,t(i,r)}},move:function(e,t){for(var a=0;a<e.changedTouches.length;a++){var r=e.changedTouches[a],i=l.pointers[r.identifier];if(!i)return;"lastTouch"in i||(i.lastTouch=i.startTouch,i.lastTime=i.startTime,i.deltaX=i.deltaY=i.duration=i.distance=0);var o=Date.now()-i.lastTime;if(o>0){var s=70;o>s&&(o=s),i.duration+o>s&&(i.duration=s-o),i.duration+=o,i.lastTouch=n({},r),i.lastTime=Date.now(),i.deltaX=r.clientX-i.startTouch.clientX,i.deltaY=r.clientY-i.startTouch.clientY;
var c=i.deltaX*i.deltaX,u=i.deltaY*i.deltaY;i.distance=Math.sqrt(c+u),i.isVertical=u>c,t(i,r)}}},end:function(e,t){for(var n=0;n<e.changedTouches.length;n++){var a=e.changedTouches[n],r=a.identifier,i=l.pointers[r];i&&(t(i,a),delete l.pointers[r])}},fire:function(e,t,n){if(e){var a=document.createEvent("Events");a.initEvent(t,!0,!0),avalon.mix(a,n),e.dispatchEvent(a)}},add:function(e,t){function n(e){t.touchmove(e)}function a(e){t.touchend(e),document.removeEventListener("touchmove",n),document.removeEventListener("touchend",a),document.removeEventListener("touchcancel",r)}function r(e){t.touchcancel(e),document.removeEventListener("touchmove",n),document.removeEventListener("touchend",a),document.removeEventListener("touchcancel",r)}t.events.forEach(function(i){avalon.eventHooks[i]={fn:function(i,o){return i["touch-"+e]||(i["touch-"+e]="1",i.addEventListener("touchstart",function(e){t.touchstart(e),document.addEventListener("touchmove",n),document.addEventListener("touchend",a),document.addEventListener("touchcancel",r)})),o}}})}},s=["screenX","screenY","clientX","clientY","pageX","pageY"],c=!!navigator.pointerEnabled||!!navigator.msPointerEnabled;c&&(Lt.style.msTouchAction=Lt.style.touchAction="none");var u={events:["tap"],touchBoundary:10,tapDelay:200,needClick:function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(o&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return!1},needFocus:function(e){switch(e.nodeName.toLowerCase()){case"textarea":case"select":return!0;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return!1}},focus:function(e){var t,n=e.type;o&&e.setSelectionRange&&0!==n.indexOf("date")&&"time"!==n&&"month"!==n?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},findControl:function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},fixTarget:function(t){return 3===t.nodeType?t.parentNode:e.SVGElementInstance&&t instanceof SVGElementInstance?t.correspondingUseElement:t},updateScrollParent:function(e){var t=e.tapScrollParent;if(!t||!t.contains(e)){var n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.tapScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.lastScrollTop=t.scrollTop)},touchHasMoved:function(e){var t=e.changedTouches[0],n=u.touchBoundary;return Math.abs(t.pageX-u.touchStartX)>n||Math.abs(t.pageY-u.touchStartY)>n},findType:function(e){return r&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},sendClick:function(t,n){l.fire(t,"tap",{touchEvent:n});var a,r;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),r=n.changedTouches[0],a=document.createEvent("MouseEvents"),a.initMouseEvent(u.findType(t),!0,!0,e,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),a.touchEvent=n,t.dispatchEvent(a)},touchstart:function(t){if(1!==t.targetTouches.length)return!0;var n=u.fixTarget(t.target),a=t.targetTouches[0];if(o){var r=e.getSelection();if(r.rangeCount&&!r.isCollapsed)return!0;var i=a.identifier;if(i&&isFinite(u.lastTouchIdentifier)&&u.lastTouchIdentifier===i)return t.preventDefault(),!1;u.lastTouchIdentifier=i,u.updateScrollParent(n)}u.status="tapping",u.startTime=Date.now(),u.element=n,u.pageX=a.pageX,u.pageY=a.pageY,u.startTime-u.lastTime<u.tapDelay&&t.preventDefault()},touchmove:function(e){return"tapping"!==u.status?!0:void((u.element!==u.fixTarget(e.target)||u.touchHasMoved(e))&&(u.status=u.element=0))},touchend:function(t){var n=u.element,a=Date.now();if(!n||a-u.startTime>u.tapDelay)return!0;u.lastTime=a;var i=u.startTime;if(u.status=u.startTime=0,targetTagName=n.tagName.toLowerCase(),"label"===targetTagName){l.fire(n,"tap",{touchEvent:t});var s=u.findControl(n);s&&(u.focus(n),n=s)}else if(u.needFocus(n))return a-i>100||o&&e.top!==e&&"input"===targetTagName?(u.element=0,!1):(u.focus(n),r&&u.sendClick(n,t),!1);if(o){var c=n.tapScrollParent;if(c&&c.lastScrollTop!==c.scrollTop)return!0}u.needClick(n)||(t.preventDefault(),u.sendClick(n,t))},touchcancel:function(){u.startTime=u.element=0}};l.add("tap",u);var f={events:["longtap","doubletap"],cancelPress:function(e){clearTimeout(e.pressingHandler),e.pressingHandler=null},touchstart:function(e){l.start(e,function(t,n){t.pressingHandler=setTimeout(function(){"tapping"===t.status&&l.fire(e.target,"longtap",{touch:n,touchEvent:e}),f.cancelPress(t)},500),1!==e.changedTouches.length&&(t.status=0)})},touchmove:function(e){l.move(e,function(e){e.distance>10&&e.pressingHandler&&(f.cancelPress(e),"tapping"===e.status&&(e.status="panning"))})},touchend:function(e){l.end(e,function(t,n){f.cancelPress(t),"tapping"===t.status&&(t.lastTime=Date.now(),f.lastTap&&t.lastTime-f.lastTap.lastTime<300&&l.fire(t.element,"doubletap",{touch:n,touchEvent:e}),f.lastTap=t)})},touchcancel:function(e){l.end(e,function(e){f.cancelPress(e)})}};l.add("press",f);var d={events:["swipe","swipeleft","swiperight","swipeup","swipedown"],getAngle:function(e,t){var n=Math.atan2(t,e),a=Math.round(180*n/Math.PI);return 0>a?360-Math.abs(a):a},getDirection:function(e,t){var n=d.getAngle(e,t);return 45>=n&&n>=0?"left":360>=n&&n>=315?"left":n>=135&&225>=n?"right":n>45&&135>n?"down":"up"},touchstart:function(e){l.start(e,i)},touchmove:function(e){l.move(e,i)},touchend:function(e){1===e.changedTouches.length&&l.end(e,function(t,n){var a=t.distance>30&&t.distance/t.duration>.65;if(a){var r={deltaX:t.deltaX,deltaY:t.deltaY,touch:n,touchEvent:e,direction:d.getDirection(t.deltaX,t.deltaY),isVertical:t.isVertical},i=t.element;l.fire(i,"swipe",r),l.fire(i,"swipe"+r.direction,r)}})}};d.touchcancel=d.touchend,l.add("swipe",d)},"function"==typeof define&&define.amd&&define("avalon",[],function(){return avalon});var Ha=e.avalon;return avalon.noConflict=function(t){return t&&e.avalon===avalon&&(e.avalon=Ha),avalon},void 0===t&&(e.avalon=avalon),avalon});
/**
 * @return {XHR}
 */
var createXHR = (function () {
  if (typeof XMLHttpRequest != "undefined") {
    return function() {
      return new XMLHttpRequest();
    };
  } else if (typeof ActiveXObject != "undefined") {
    return function() {
      if (typeof arguments.callee.activeXString != "string") {
        var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i, len;
        for (i=0,len=versions.length; i<len; i++){
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {}
        }
      }
      return new ActiveXObject(arguments.callee.activeXString);
    };
  } else {
    createXHR = function() {
      throw new Error("No XHR object available.");
    };
  }
  return createXHR();
})();
Object.freeze(createXHR);
/**
 * @param {string} url
 * @param {[{}]} params
 * @return {string} url
 */
var addURLParams = function(url, params) {
  if (Array.isArray(params)) {
    params.forEach(function(item, index, array) {
      if (typeof item.n == "string" && (typeof item.v == "string" || typeof item.v == "number")) {
        url = addURLParam(url, item.n, item.v);
      }
    });
  }
  return url;
}
Object.freeze(addURLParams);
/**
 * @param {string} url
 * @param {string} param.key
 * @param {string|number} param.value
 * @return {string} url
 */
var addURLParam = function(url, name, value) {
  url += (url.indexOf("?") == -1 ? "?" : "&");
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
};
Object.freeze(addURLParam);
/**
 * add Event Listener
 * @param  {element}  el    html element
 * @param  {string}   type  event name
 * @param  {function} fn    function
 */
var addEvent=(function(){
  if(document.addEventListener){
    return function(el,type,fn){
      if(el.length){
        for(var i=0;i<el.length;i++){
          addEvent(el[i],type,fn);
        }
      }else{
        el.addEventListener(type,fn,false);
      }
    };
  }else{
    return function(el,type,fn){
      if(el.length){
        for(var i=0;i<el.length;i++){
          addEvent(el[i],type,fn);
        }
      }else{
        el.attachEvent('on'+type,function(){
          return fn.call(el,window.event);
        });
      }
    };
  }
})();
Object.freeze(addEvent);
/**
 * remove Event Listener
 * @param  {element}  el    html element
 * @param  {string}   type  event name
 * @param  {function} fn    function
 */
var removeEvent=(function(){
  if(document.removeEventListener){
    return function(el,type,fn){
      if(el.length){
        for(var i=0;i<el.length;i++){
          removeEvent(el[i],type,fn);
        }
      }else{
        el.removeEventListener(type,fn,false);
      }
    };
  }else{
    return function(el,type,fn){
      if(el.length){
        for(var i=0;i<el.length;i++){
          removeEvent(el[i],type,fn);
        }
      }else{
        el.detachEvent('on'+type,function(){
          return fn.call(el,window.event);
        });
      }
    };
  }
})();
Object.freeze(removeEvent);
/**
 * 返回GET参数集合的对象
 * @return {[object]} [包含所有返回值的对象]
 */
var getArgs = function(){
  var args = {};
  var match = null;
  var search = decodeURIComponent(location.search.substring(1));
  var reg = /(?:([^&amp;]+)=([^&amp;]+))/g;
  while((match = reg.exec(search))!==null){
    args[match[1]] = match[2];
  }
  return args;
};
Object.freeze(getArgs);
/**
 * @author      shiro
 * @version     1.1
 * @description 图片全屏查看 class="pic-group"分组或 class="pic-item"
 * @namespace   window
 * @name        bigPicture
 * @method      init
 * @method      destory
 */
(function() {
  var imgsList = [];
  var picbox;
  var imgEle;
  function init() {
    loadImgsData();  //获取页面上所有需要放大的图片列表 [][]
    createPicBox();  //创建大图浮动层
    addPicEvent();      //添加图片的点击事件
  };
  function update() {
    removePicEvent();   //移除图片点击事件
    loadImgsData();  //获取页面上所有需要放大的图片列表 [][]
    addPicEvent();      //添加图片的点击事件
  };
  function createPicBox() {
    picbox = document.createElement('div');
    picbox.className = 'syashin-box hidden';
    picbox.innerHTML = '<div><img src="" alt="syashin" /><i class="icon-remove"></i></div>';
    document.body.appendChild(picbox);
    imgEle = picbox.querySelector('img');
    addEvent(picbox.querySelector('i'), "click", function() {
      if (picbox.className != 'syashin-box hidden')
        picbox.className = 'syashin-box hidden';
    });
  };
  function addPicEvent() {
    var imgs = document.querySelectorAll('img');
    for (var i = imgs.length - 1; i >= 0; i--) {
      if (imgs[i].getAttribute('data-img-group') && imgs[i].getAttribute('data-img-item')) {
        addEvent(imgs[i], "click", openBigPic);
      }
    };
  };
  function removePicEvent() {
    var imgs = document.querySelectorAll('img');
    for (var i = imgs.length - 1; i >= 0; i--) {
      if (imgs[i].getAttribute('data-img-group') && imgs[i].getAttribute('data-img-item')) {
        removeEvent(imgs[i], "click", openBigPic);
      }
    };
  };
  function openBigPic() {
    imgEle.src = imgsList[this.getAttribute('data-img-group')][this.getAttribute('data-img-item')];
    picbox.className = 'syashin-box';
  };
  function loadImgsData() {
    var eleList = document.querySelectorAll('.pic-item');
    var imgsGroup = [];
    for (var i = 0; i < eleList.length; i++) {
      imgsGroup.push(eleList[i].src);
      eleList[i].setAttribute('data-img-group', imgsList.length);
      eleList[i].setAttribute('data-img-item', i);
    };
    imgsList.push(imgsGroup);
    eleList = document.querySelectorAll('.pic-group');
    for (var i = 0; i < eleList.length; i++) {
      var childEleList = eleList[i].querySelectorAll('img');
      imgsGroup = [];
      for (var poi = 0; poi < childEleList.length; poi++) {
        imgsGroup.push(childEleList[poi].src);
        childEleList[poi].setAttribute('data-img-group', imgsList.length);
        childEleList[poi].setAttribute('data-img-item', poi);
      }
      imgsList.push(imgsGroup);
    }
  };
  function destory() {
    window.bigPicture = null;
  };
  window.bigPicture = {
    init:init,
    update:update,
    destory:destory
  };
})();
/**
 * @author      shiro
 * @version     1.0
 * @description 显示当前时间
 * @namespace   window
 * @name        Tokei
 * @method      init
 * @method      destory
 */
(function() {
  var weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  var time;
  var week;
  var date;
  var timeout;
  function init(d,t,w) {
    if (typeof(t) == 'string') { time = document.querySelector('#'+t); }
    if (typeof(w) == 'string') { week = document.querySelector('#'+w); }
    if (typeof(d) == 'string') { date = document.querySelector('#'+d); }
    showTime();
    timeout = setInterval(showTime, 1000);
  };
  function showTime(){
    var now = new Date();
    var tem = now.getFullYear() + '/' + addZero(now.getMonth()+1) + '/' + addZero(now.getDate());
    if(tem != date.innerHTML) { date.innerHTML = tem; }
    tem = weeks[now.getDay()];
    if (tem != week.innerHTML) { week.innerHTML = tem; }
    tem = addZero(now.getHours()) + ':' + addZero(now.getMinutes()) + ':' + addZero(now.getSeconds());
    if (tem != time.innerHTML) { time.innerHTML = tem; }
  };
  function addZero(i) {
    if (i < 10) { return '0'+i; }
    else { return i; }
  };
  function destory() {
    clearInterval(timeout);
    window.Tokei = null;
  };
  window.Tokei = {
    init:init,
    destory:destory
  };
})();
/**
 * @author      shiro
 * @version     1.0
 * @description 弹出模态确认框
 * @namespace   window
 * @name        ConfirmModal
 * @method      init
 * @method      show(文字信息,等级,ok的方法,cancel的方法,关闭按钮是否,是否开启点击任何地方关闭,自动关闭时间)
 * @method      close
 * @method      destory
 */
(function() {
  var msgConfirm_box;
  var okFunction;
  var cancelFunction;
  var ok_btn;
  var cancel_btn;
  var msgTxt;
  var close_btn;
  var showStack = [];
  var timeOut;
  function init() {
    msgConfirm_box = document.createElement('div');
    msgConfirm_box.className = 'limit_box hidden';
    msgConfirm_box.innerHTML = '<div><div class="limit-msg drop-shadow"><p id="errorMsg"></p><p><button type="button" class="ok">确认</button><button type="button" class="cancel">取消</button></p></div><i class="icon-remove"></i></div>';
    document.body.appendChild(msgConfirm_box);
    ok_btn = msgConfirm_box.querySelector('.ok');
    cancel_btn = msgConfirm_box.querySelector('.cancel');
    msgTxt = msgConfirm_box.querySelector('#errorMsg');
    close_btn = msgConfirm_box.querySelector('.icon-remove');
    addEvent(close_btn, 'click', close);
    addEvent(ok_btn, 'click', close);
    addEvent(cancel_btn, 'click', close);
  };
  function close() {
    msgConfirm_box.className = 'limit_box hidden';
    clearTimeout(timeOut);
    setTimeout(nextShow, 1);
  };
  function nextShow() {
    if (showStack.length > 0 && (msgConfirm_box.className.indexOf('hidden') != -1)) {
      show.apply(this, showStack.pop());
    }
  };
  /**
   * 显示模态框
   * @param  {string}     m         需要显示的文字信息
   * @param  {number}     lv        模态框颜色与图标(等级0：信息 1：提醒 2：警告)
   * @param  {Function}   fn        点确定需执行的方法
   * @param  {function}   cfn       点取消需执行的方法
   * @param  {boolean}    closeFlag 是否显示右上角的关闭按钮
   * @param  {boolean}    msgFlag   是否开启点击任何地方关闭模态框
   * @param  {boolean}    closeTime 自动关闭时间
   */
  function show(m, lv, fn, cfn, closeFlag, msgFlag, closeTime) {
    if (msgConfirm_box.className.indexOf('hidden') == -1) {
      showStack.push(arguments);
      return;
    }
    if (msgFlag) { addEvent(msgConfirm_box, 'click', close);}
    else { removeEvent(msgConfirm_box, 'click', close);}
    if (cancelFunction) { removeEvent(cancel_btn, 'click', cancelFunction); cancelFunction = null;}
    if (okFunction) { removeEvent(ok_btn, 'click', okFunction); okFunction = null}
    close_btn.className = (closeFlag && 'icon-remove') || 'hidden';
    if (fn) { okFunction = fn; ok_btn.className = 'ok'; addEvent(ok_btn, 'click', okFunction);}
    else { ok_btn.className = 'ok hidden';}
    if (cfn) { cancelFunction = cfn; cancel_btn.className = 'cancel'; addEvent(cancel_btn, 'click', cancelFunction);}
    else { cancel_btn.className = 'cancel hidden';}
    msg = (lv == 2 && '<i class="icon-remove-sign"></i>') || (lv == 1 && '<i class="icon-warning-sign"></i>') || '<i class="icon-info-sign"></i>';
    msgTxt.innerHTML = msg + m;
    msgConfirm_box.className = (lv == 2 && 'limit_box danger') || (lv == 1 && 'limit_box warning') || 'limit_box info';
    if (!isNaN(closeTime) && closeTime > 0) { setTimeout(close,closeTime);}
  };
  function destory() {
    document.body.removeChild(msgConfirm_box);
    window.ConfirmModal = null;
  };
  window.ConfirmModal = {
    init:init,
    show:show,
    close:close,
    destory:destory
  };
})();
/**
 * 限制输入值长度
 * @param  {[element]} inEle      [需要限制的控件]
 * @param  {[element]} msgEle     [显示剩余可输入字符数的标签]
 * @param  {[int]} maxLength      [最大可输入长度]
 * @return {[function]}           [方法，执行可返回当前输入是否超出限制]
 */
function limitInput(inEle, msgEle, maxLength) {
  var limit = function(e) {
    var rest = maxLength - inEle.value.length;
    if (rest != msgEle.innerText) msgEle.innerText = rest;
    if (e && e.keyCode == 8) return true;
    if (rest < 0 || (rest == 0 && e)) return false;
    return true;
  };
  addEvent(inEle,'input',limit);
  return limit;
};
/**
 * @author      shiro
 * @version     1.0
 * @description 根据数组自动生成sidebar标签(无事件)
 * @param       {element} el   [生成的位置]
 * @param       {array} data   [列表数据]
 */
function z_Sidebar(el, data) {
  var sidebar_data;
  var sidebar_box;
  var html;
  window.poi = (typeof(poi) == 'number' && poi) || 0;

  function init() {
    sidebar_box = el;
    if (sidebar_box.className.indexOf('nav_tree') == -1) {
      if (sidebar_box.className.length == 0) { sidebar_box.className = 'nav_tree';}
      else { sidebar_box.className += ' nav_tree';}
    }
    sidebar_data = data;
    html = '';
    dealData(sidebar_data);
    el.innerHTML = html;
  };

  function dealData(data) {
    if (Array.isArray(data)) {
      data.forEach(function(item, index, array) {
        poi++;
        if (item.c && Array.isArray(item.c) && item.c.length != 0) {
          html += '<input type="checkbox" class="hidden mom" id="nav_tree_' + poi + '">';
        }else {
          html += '<input type="checkbox" class="hidden" id="nav_tree_' + poi + '">';
        }
        if (item.c && Array.isArray(item.c) && item.c.length != 0) {
          html += '<li data-id="' + item.v + '"><i class="icon-angle-left"></i><label for="nav_tree_' + poi + '">';
        }else {
          html += '<li data-id="' + item.v + '"><label for="nav_tree_' + poi + '">';
        }
        if (item.i) { html += '<i class="' + item.i + '"></i>';}
        html += '<span>' + item.n + '</span></label></li>';
        if (item.c && Array.isArray(item.c) && item.c.length != 0) {
          html += '<ul>';
          dealData(item.c);
          html += '</ul>';
        }
      });
    }
  };

  if (el.nodeType && el.nodeType == 1 && Array.isArray(data)) {
    init();
  }
};

function z_get(url, sfn, efn) {
  function successFunction(data) {
    data = eval('('+data+')');
    sfn(data);
  };
  function errorFunction(data) {
    if (efn) { efn(data);}
    else {}
  };
  $.ajax({
    type : 'get',
    url : url,
    timeout : 5000,
    success : successFunction,
    error : errorFunction
  });
};
// (function() {
//   var nav;
//   var vav_data;
//   var poi = 0;
//   function init(id) {
//     nav = document.getElementById(id).childNodes;
//     formatTree(nav);
//   };
//   function formatTree(li_list) {
//     for(var i=0;i<li_list.length;i++){
//       if (li_list[i].nodeName == 'LI') {
//         li_list[i].innerHTML = '<label for="nav_tree_'+poi+'"><span>'+li_list[i].innerHTML+'</span><i class="icon-angle-left"></i></label>';
//         li_list[i].outerHTML = '<input type="checkbox" class="hidden" id="nav_tree_'+poi+'">'+li_list[i].outerHTML;
//         poi++;i++;
//       }else if (li_list[i].nodeName == 'UL') { formatTree(li_list[i].childNodes);}
//     }
//   };
//   function destory() {
//     window.NavTree = null;
//   };
//   window.NavTree = {
//     init:init,
//     destory:destory
//   };
// })();
$(document).ready(function() {
  // NavTree.init('nav_tree');
  z_get('http://2.shiro.sinaapp.com/getConfig.php?key=1', function(data) {
    function dealData(d) {
      var lists = [];
      d.forEach(function(item, index, array) {
        var list = {n:item.name_cn,v:item.id,c:[]};
        if (item.childs && Array.isArray(item.childs)) {
          list.c = dealData(item.childs);
        }
        lists.push(list);
      });
      return lists;
    };
    z_Sidebar(document.getElementById('nav_tree'), dealData(data));
  });
  // var sidebar_list = [
  //   {n:'item1',i:'icon-envelope',v:''},
  //   {n:'item2',i:'icon-envelope-alt',v:'',c:[
  //     {n:'item21',v:''},
  //     {n:'item22',v:'',c:[
  //       {n:'item221',v:''},
  //       {n:'item222',v:'',c:[
  //         {n:'item2221',v:'',c:[
  //           {n:'item22221',v:''},
  //           {n:'item22222',v:''},
  //           {n:'item22223',v:''}
  //           ]},
  //         {n:'item2222',v:'',c:[
  //           {n:'item22221',v:''},
  //           {n:'item22222',v:''},
  //           {n:'item22223',v:''}
  //           ]
  //         },
  //         {n:'item2223',v:'',c:[
  //           {n:'item22221',v:''},
  //           {n:'item22222',v:''},
  //           {n:'item22223',v:''}
  //           ]}
  //         ]
  //       },
  //       {n:'item223',v:''}
  //       ]
  //     },
  //     {n:'item23',v:''}
  //     ]
  //   },
  //   {n:'item3',v:''},
  //   {n:'item4',v:''},
  //   {n:'item5',v:''}
  // ];
  // z_Sidebar(document.getElementById('nav_tree'), sidebar_list);
});