(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ac(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ne={},ss=[],Qt=()=>{},ep=()=>!1,oa=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),bc=t=>t.startsWith("onUpdate:"),it=Object.assign,Rc=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},_y=Object.prototype.hasOwnProperty,Ce=(t,e)=>_y.call(t,e),he=Array.isArray,is=t=>aa(t)==="[object Map]",tp=t=>aa(t)==="[object Set]",ge=t=>typeof t=="function",ze=t=>typeof t=="string",Mn=t=>typeof t=="symbol",Ue=t=>t!==null&&typeof t=="object",np=t=>(Ue(t)||ge(t))&&ge(t.then)&&ge(t.catch),rp=Object.prototype.toString,aa=t=>rp.call(t),yy=t=>aa(t).slice(8,-1),sp=t=>aa(t)==="[object Object]",la=t=>ze(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,ti=Ac(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ca=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},vy=/-\w/g,cr=ca(t=>t.replace(vy,e=>e.slice(1).toUpperCase())),Ey=/\B([A-Z])/g,jr=ca(t=>t.replace(Ey,"-$1").toLowerCase()),ip=ca(t=>t.charAt(0).toUpperCase()+t.slice(1)),ol=ca(t=>t?`on${ip(t)}`:""),tr=(t,e)=>!Object.is(t,e),wo=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},op=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},Sc=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Lh;const ua=()=>Lh||(Lh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ha(t){if(he(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=ze(r)?Ay(r):ha(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(ze(t)||Ue(t))return t}const Ty=/;(?![^(]*\))/g,wy=/:([^]+)/,Iy=/\/\*[^]*?\*\//g;function Ay(t){const e={};return t.replace(Iy,"").split(Ty).forEach(n=>{if(n){const r=n.split(wy);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Pc(t){let e="";if(ze(t))e=t;else if(he(t))for(let n=0;n<t.length;n++){const r=Pc(t[n]);r&&(e+=r+" ")}else if(Ue(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const by="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ry=Ac(by);function ap(t){return!!t||t===""}const lp=t=>!!(t&&t.__v_isRef===!0),Me=t=>ze(t)?t:t==null?"":he(t)||Ue(t)&&(t.toString===rp||!ge(t.toString))?lp(t)?Me(t.value):JSON.stringify(t,cp,2):String(t),cp=(t,e)=>lp(e)?cp(t,e.value):is(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[al(r,i)+" =>"]=s,n),{})}:tp(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>al(n))}:Mn(e)?al(e):Ue(e)&&!he(e)&&!sp(e)?String(e):e,al=(t,e="")=>{var n;return Mn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let yt;class up{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=yt,!e&&yt&&(this.index=(yt.scopes||(yt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=yt;try{return yt=this,e()}finally{yt=n}}}on(){++this._on===1&&(this.prevScope=yt,yt=this)}off(){this._on>0&&--this._on===0&&(yt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function hp(t){return new up(t)}function dp(){return yt}function Sy(t,e=!1){yt&&yt.cleanups.push(t)}let Ve;const ll=new WeakSet;class fp{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,yt&&yt.active&&yt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ll.has(this)&&(ll.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||mp(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Fh(this),gp(this);const e=Ve,n=Jt;Ve=this,Jt=!0;try{return this.fn()}finally{_p(this),Ve=e,Jt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)kc(e);this.deps=this.depsTail=void 0,Fh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ll.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Vl(this)&&this.run()}get dirty(){return Vl(this)}}let pp=0,ni,ri;function mp(t,e=!1){if(t.flags|=8,e){t.next=ri,ri=t;return}t.next=ni,ni=t}function Cc(){pp++}function xc(){if(--pp>0)return;if(ri){let e=ri;for(ri=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;ni;){let e=ni;for(ni=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function gp(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function _p(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),kc(r),Py(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function Vl(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(yp(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function yp(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===mi)||(t.globalVersion=mi,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Vl(t))))return;t.flags|=2;const e=t.dep,n=Ve,r=Jt;Ve=t,Jt=!0;try{gp(t);const s=t.fn(t._value);(e.version===0||tr(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{Ve=n,Jt=r,_p(t),t.flags&=-3}}function kc(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)kc(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Py(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Jt=!0;const vp=[];function Pn(){vp.push(Jt),Jt=!1}function Cn(){const t=vp.pop();Jt=t===void 0?!0:t}function Fh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Ve;Ve=void 0;try{e()}finally{Ve=n}}}let mi=0;class Cy{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Dc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ve||!Jt||Ve===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ve)n=this.activeLink=new Cy(Ve,this),Ve.deps?(n.prevDep=Ve.depsTail,Ve.depsTail.nextDep=n,Ve.depsTail=n):Ve.deps=Ve.depsTail=n,Ep(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Ve.depsTail,n.nextDep=void 0,Ve.depsTail.nextDep=n,Ve.depsTail=n,Ve.deps===n&&(Ve.deps=r)}return n}trigger(e){this.version++,mi++,this.notify(e)}notify(e){Cc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{xc()}}}function Ep(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)Ep(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Lo=new WeakMap,Cr=Symbol(""),Ml=Symbol(""),gi=Symbol("");function Et(t,e,n){if(Jt&&Ve){let r=Lo.get(t);r||Lo.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new Dc),s.map=r,s.key=n),s.track()}}function vn(t,e,n,r,s,i){const o=Lo.get(t);if(!o){mi++;return}const l=c=>{c&&c.trigger()};if(Cc(),e==="clear")o.forEach(l);else{const c=he(t),u=c&&la(n);if(c&&n==="length"){const d=Number(r);o.forEach((p,g)=>{(g==="length"||g===gi||!Mn(g)&&g>=d)&&l(p)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),u&&l(o.get(gi)),e){case"add":c?u&&l(o.get("length")):(l(o.get(Cr)),is(t)&&l(o.get(Ml)));break;case"delete":c||(l(o.get(Cr)),is(t)&&l(o.get(Ml)));break;case"set":is(t)&&l(o.get(Cr));break}}xc()}function xy(t,e){const n=Lo.get(t);return n&&n.get(e)}function Qr(t){const e=be(t);return e===t?e:(Et(e,"iterate",gi),jt(t)?e:e.map(Zt))}function da(t){return Et(t=be(t),"iterate",gi),t}function Kn(t,e){return xn(t)?bn(t)?ds(Zt(e)):ds(e):Zt(e)}const ky={__proto__:null,[Symbol.iterator](){return cl(this,Symbol.iterator,t=>Kn(this,t))},concat(...t){return Qr(this).concat(...t.map(e=>he(e)?Qr(e):e))},entries(){return cl(this,"entries",t=>(t[1]=Kn(this,t[1]),t))},every(t,e){return mn(this,"every",t,e,void 0,arguments)},filter(t,e){return mn(this,"filter",t,e,n=>n.map(r=>Kn(this,r)),arguments)},find(t,e){return mn(this,"find",t,e,n=>Kn(this,n),arguments)},findIndex(t,e){return mn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return mn(this,"findLast",t,e,n=>Kn(this,n),arguments)},findLastIndex(t,e){return mn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return mn(this,"forEach",t,e,void 0,arguments)},includes(...t){return ul(this,"includes",t)},indexOf(...t){return ul(this,"indexOf",t)},join(t){return Qr(this).join(t)},lastIndexOf(...t){return ul(this,"lastIndexOf",t)},map(t,e){return mn(this,"map",t,e,void 0,arguments)},pop(){return qs(this,"pop")},push(...t){return qs(this,"push",t)},reduce(t,...e){return Uh(this,"reduce",t,e)},reduceRight(t,...e){return Uh(this,"reduceRight",t,e)},shift(){return qs(this,"shift")},some(t,e){return mn(this,"some",t,e,void 0,arguments)},splice(...t){return qs(this,"splice",t)},toReversed(){return Qr(this).toReversed()},toSorted(t){return Qr(this).toSorted(t)},toSpliced(...t){return Qr(this).toSpliced(...t)},unshift(...t){return qs(this,"unshift",t)},values(){return cl(this,"values",t=>Kn(this,t))}};function cl(t,e,n){const r=da(t),s=r[e]();return r!==t&&!jt(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const Dy=Array.prototype;function mn(t,e,n,r,s,i){const o=da(t),l=o!==t&&!jt(t),c=o[e];if(c!==Dy[e]){const p=c.apply(t,i);return l?Zt(p):p}let u=n;o!==t&&(l?u=function(p,g){return n.call(this,Kn(t,p),g,t)}:n.length>2&&(u=function(p,g){return n.call(this,p,g,t)}));const d=c.call(o,u,r);return l&&s?s(d):d}function Uh(t,e,n,r){const s=da(t);let i=n;return s!==t&&(jt(t)?n.length>3&&(i=function(o,l,c){return n.call(this,o,l,c,t)}):i=function(o,l,c){return n.call(this,o,Kn(t,l),c,t)}),s[e](i,...r)}function ul(t,e,n){const r=be(t);Et(r,"iterate",gi);const s=r[e](...n);return(s===-1||s===!1)&&fa(n[0])?(n[0]=be(n[0]),r[e](...n)):s}function qs(t,e,n=[]){Pn(),Cc();const r=be(t)[e].apply(t,n);return xc(),Cn(),r}const Ny=Ac("__proto__,__v_isRef,__isVue"),Tp=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Mn));function Oy(t){Mn(t)||(t=String(t));const e=be(this);return Et(e,"has",t),e.hasOwnProperty(t)}class wp{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?Hy:Rp:i?bp:Ap).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=he(e);if(!s){let c;if(o&&(c=ky[n]))return c;if(n==="hasOwnProperty")return Oy}const l=Reflect.get(e,n,Ge(e)?e:r);if((Mn(n)?Tp.has(n):Ny(n))||(s||Et(e,"get",n),i))return l;if(Ge(l)){const c=o&&la(n)?l:l.value;return s&&Ue(c)?Fl(c):c}return Ue(l)?s?Fl(l):Ni(l):l}}class Ip extends wp{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];const o=he(e)&&la(n);if(!this._isShallow){const u=xn(i);if(!jt(r)&&!xn(r)&&(i=be(i),r=be(r)),!o&&Ge(i)&&!Ge(r))return u||(i.value=r),!0}const l=o?Number(n)<e.length:Ce(e,n),c=Reflect.set(e,n,r,Ge(e)?e:s);return e===be(s)&&(l?tr(r,i)&&vn(e,"set",n,r):vn(e,"add",n,r)),c}deleteProperty(e,n){const r=Ce(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&vn(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!Mn(n)||!Tp.has(n))&&Et(e,"has",n),r}ownKeys(e){return Et(e,"iterate",he(e)?"length":Cr),Reflect.ownKeys(e)}}class Vy extends wp{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const My=new Ip,Ly=new Vy,Fy=new Ip(!0);const Ll=t=>t,ho=t=>Reflect.getPrototypeOf(t);function Uy(t,e,n){return function(...r){const s=this.__v_raw,i=be(s),o=is(i),l=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=s[t](...r),d=n?Ll:e?ds:Zt;return!e&&Et(i,"iterate",c?Ml:Cr),{next(){const{value:p,done:g}=u.next();return g?{value:p,done:g}:{value:l?[d(p[0]),d(p[1])]:d(p),done:g}},[Symbol.iterator](){return this}}}}function fo(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function jy(t,e){const n={get(s){const i=this.__v_raw,o=be(i),l=be(s);t||(tr(s,l)&&Et(o,"get",s),Et(o,"get",l));const{has:c}=ho(o),u=e?Ll:t?ds:Zt;if(c.call(o,s))return u(i.get(s));if(c.call(o,l))return u(i.get(l));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&Et(be(s),"iterate",Cr),s.size},has(s){const i=this.__v_raw,o=be(i),l=be(s);return t||(tr(s,l)&&Et(o,"has",s),Et(o,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const o=this,l=o.__v_raw,c=be(l),u=e?Ll:t?ds:Zt;return!t&&Et(c,"iterate",Cr),l.forEach((d,p)=>s.call(i,u(d),u(p),o))}};return it(n,t?{add:fo("add"),set:fo("set"),delete:fo("delete"),clear:fo("clear")}:{add(s){!e&&!jt(s)&&!xn(s)&&(s=be(s));const i=be(this);return ho(i).has.call(i,s)||(i.add(s),vn(i,"add",s,s)),this},set(s,i){!e&&!jt(i)&&!xn(i)&&(i=be(i));const o=be(this),{has:l,get:c}=ho(o);let u=l.call(o,s);u||(s=be(s),u=l.call(o,s));const d=c.call(o,s);return o.set(s,i),u?tr(i,d)&&vn(o,"set",s,i):vn(o,"add",s,i),this},delete(s){const i=be(this),{has:o,get:l}=ho(i);let c=o.call(i,s);c||(s=be(s),c=o.call(i,s)),l&&l.call(i,s);const u=i.delete(s);return c&&vn(i,"delete",s,void 0),u},clear(){const s=be(this),i=s.size!==0,o=s.clear();return i&&vn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Uy(s,t,e)}),n}function Nc(t,e){const n=jy(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(Ce(n,s)&&s in r?n:r,s,i)}const By={get:Nc(!1,!1)},$y={get:Nc(!1,!0)},qy={get:Nc(!0,!1)};const Ap=new WeakMap,bp=new WeakMap,Rp=new WeakMap,Hy=new WeakMap;function Wy(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Gy(t){return t.__v_skip||!Object.isExtensible(t)?0:Wy(yy(t))}function Ni(t){return xn(t)?t:Oc(t,!1,My,By,Ap)}function Sp(t){return Oc(t,!1,Fy,$y,bp)}function Fl(t){return Oc(t,!0,Ly,qy,Rp)}function Oc(t,e,n,r,s){if(!Ue(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=Gy(t);if(i===0)return t;const o=s.get(t);if(o)return o;const l=new Proxy(t,i===2?r:n);return s.set(t,l),l}function bn(t){return xn(t)?bn(t.__v_raw):!!(t&&t.__v_isReactive)}function xn(t){return!!(t&&t.__v_isReadonly)}function jt(t){return!!(t&&t.__v_isShallow)}function fa(t){return t?!!t.__v_raw:!1}function be(t){const e=t&&t.__v_raw;return e?be(e):t}function Vc(t){return!Ce(t,"__v_skip")&&Object.isExtensible(t)&&op(t,"__v_skip",!0),t}const Zt=t=>Ue(t)?Ni(t):t,ds=t=>Ue(t)?Fl(t):t;function Ge(t){return t?t.__v_isRef===!0:!1}function Se(t){return Pp(t,!1)}function Ky(t){return Pp(t,!0)}function Pp(t,e){return Ge(t)?t:new zy(t,e)}class zy{constructor(e,n){this.dep=new Dc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:be(e),this._value=n?e:Zt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||jt(e)||xn(e);e=r?e:be(e),tr(e,n)&&(this._rawValue=e,this._value=r?e:Zt(e),this.dep.trigger())}}function qt(t){return Ge(t)?t.value:t}const Qy={get:(t,e,n)=>e==="__v_raw"?t:qt(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return Ge(s)&&!Ge(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Cp(t){return bn(t)?t:new Proxy(t,Qy)}function Jy(t){const e=he(t)?new Array(t.length):{};for(const n in t)e[n]=Xy(t,n);return e}class Yy{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0,this._raw=be(e);let s=!0,i=e;if(!he(e)||!la(String(n)))do s=!fa(i)||jt(i);while(s&&(i=i.__v_raw));this._shallow=s}get value(){let e=this._object[this._key];return this._shallow&&(e=qt(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&Ge(this._raw[this._key])){const n=this._object[this._key];if(Ge(n)){n.value=e;return}}this._object[this._key]=e}get dep(){return xy(this._raw,this._key)}}function Xy(t,e,n){return new Yy(t,e,n)}class Zy{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Dc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=mi-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Ve!==this)return mp(this,!0),!0}get value(){const e=this.dep.track();return yp(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function ev(t,e,n=!1){let r,s;return ge(t)?r=t:(r=t.get,s=t.set),new Zy(r,s,n)}const po={},Fo=new WeakMap;let Ir;function tv(t,e=!1,n=Ir){if(n){let r=Fo.get(n);r||Fo.set(n,r=[]),r.push(t)}}function nv(t,e,n=Ne){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:l,call:c}=n,u=G=>s?G:jt(G)||s===!1||s===0?En(G,1):En(G);let d,p,g,v,S=!1,C=!1;if(Ge(t)?(p=()=>t.value,S=jt(t)):bn(t)?(p=()=>u(t),S=!0):he(t)?(C=!0,S=t.some(G=>bn(G)||jt(G)),p=()=>t.map(G=>{if(Ge(G))return G.value;if(bn(G))return u(G);if(ge(G))return c?c(G,2):G()})):ge(t)?e?p=c?()=>c(t,2):t:p=()=>{if(g){Pn();try{g()}finally{Cn()}}const G=Ir;Ir=d;try{return c?c(t,3,[v]):t(v)}finally{Ir=G}}:p=Qt,e&&s){const G=p,V=s===!0?1/0:s;p=()=>En(G(),V)}const k=dp(),N=()=>{d.stop(),k&&k.active&&Rc(k.effects,d)};if(i&&e){const G=e;e=(...V)=>{G(...V),N()}}let O=C?new Array(t.length).fill(po):po;const B=G=>{if(!(!(d.flags&1)||!d.dirty&&!G))if(e){const V=d.run();if(s||S||(C?V.some(($,T)=>tr($,O[T])):tr(V,O))){g&&g();const $=Ir;Ir=d;try{const T=[V,O===po?void 0:C&&O[0]===po?[]:O,v];O=V,c?c(e,3,T):e(...T)}finally{Ir=$}}}else d.run()};return l&&l(B),d=new fp(p),d.scheduler=o?()=>o(B,!1):B,v=G=>tv(G,!1,d),g=d.onStop=()=>{const G=Fo.get(d);if(G){if(c)c(G,4);else for(const V of G)V();Fo.delete(d)}},e?r?B(!0):O=d.run():o?o(B.bind(null,!0),!0):d.run(),N.pause=d.pause.bind(d),N.resume=d.resume.bind(d),N.stop=N,N}function En(t,e=1/0,n){if(e<=0||!Ue(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,Ge(t))En(t.value,e,n);else if(he(t))for(let r=0;r<t.length;r++)En(t[r],e,n);else if(tp(t)||is(t))t.forEach(r=>{En(r,e,n)});else if(sp(t)){for(const r in t)En(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&En(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Oi(t,e,n,r){try{return r?t(...r):t()}catch(s){pa(s,e,n)}}function hn(t,e,n,r){if(ge(t)){const s=Oi(t,e,n,r);return s&&np(s)&&s.catch(i=>{pa(i,e,n)}),s}if(he(t)){const s=[];for(let i=0;i<t.length;i++)s.push(hn(t[i],e,n,r));return s}}function pa(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ne;if(e){let l=e.parent;const c=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const d=l.ec;if(d){for(let p=0;p<d.length;p++)if(d[p](t,c,u)===!1)return}l=l.parent}if(i){Pn(),Oi(i,null,10,[t,c,u]),Cn();return}}rv(t,n,s,r,o)}function rv(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const Ct=[];let sn=-1;const os=[];let zn=null,Xr=0;const xp=Promise.resolve();let Uo=null;function Mc(t){const e=Uo||xp;return t?e.then(this?t.bind(this):t):e}function sv(t){let e=sn+1,n=Ct.length;for(;e<n;){const r=e+n>>>1,s=Ct[r],i=_i(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function Lc(t){if(!(t.flags&1)){const e=_i(t),n=Ct[Ct.length-1];!n||!(t.flags&2)&&e>=_i(n)?Ct.push(t):Ct.splice(sv(e),0,t),t.flags|=1,kp()}}function kp(){Uo||(Uo=xp.then(Np))}function iv(t){he(t)?os.push(...t):zn&&t.id===-1?zn.splice(Xr+1,0,t):t.flags&1||(os.push(t),t.flags|=1),kp()}function jh(t,e,n=sn+1){for(;n<Ct.length;n++){const r=Ct[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;Ct.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Dp(t){if(os.length){const e=[...new Set(os)].sort((n,r)=>_i(n)-_i(r));if(os.length=0,zn){zn.push(...e);return}for(zn=e,Xr=0;Xr<zn.length;Xr++){const n=zn[Xr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}zn=null,Xr=0}}const _i=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Np(t){const e=Qt;try{for(sn=0;sn<Ct.length;sn++){const n=Ct[sn];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),Oi(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;sn<Ct.length;sn++){const n=Ct[sn];n&&(n.flags&=-2)}sn=-1,Ct.length=0,Dp(),Uo=null,(Ct.length||os.length)&&Np()}}let wt=null,Op=null;function jo(t){const e=wt;return wt=t,Op=t&&t.type.__scopeId||null,e}function ma(t,e=wt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&qo(-1);const i=jo(e);let o;try{o=t(...s)}finally{jo(i),r._d&&qo(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function nr(t,e){if(wt===null)return t;const n=Ea(wt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,l,c=Ne]=e[s];i&&(ge(i)&&(i={mounted:i,updated:i}),i.deep&&En(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:l,modifiers:c}))}return t}function Tr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const l=s[o];i&&(l.oldValue=i[o].value);let c=l.dir[r];c&&(Pn(),hn(c,n,8,[t.el,l,t,e]),Cn())}}function Io(t,e){if(xt){let n=xt.provides;const r=xt.parent&&xt.parent.provides;r===n&&(n=xt.provides=Object.create(r)),n[t]=e}}function Ht(t,e,n=!1){const r=cm();if(r||xr){let s=xr?xr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&ge(e)?e.call(r&&r.proxy):e}}function ov(){return!!(cm()||xr)}const av=Symbol.for("v-scx"),lv=()=>Ht(av);function Rn(t,e,n){return Vp(t,e,n)}function Vp(t,e,n=Ne){const{immediate:r,deep:s,flush:i,once:o}=n,l=it({},n),c=e&&r||!e&&i!=="post";let u;if(Ei){if(i==="sync"){const v=lv();u=v.__watcherHandles||(v.__watcherHandles=[])}else if(!c){const v=()=>{};return v.stop=Qt,v.resume=Qt,v.pause=Qt,v}}const d=xt;l.call=(v,S,C)=>hn(v,d,S,C);let p=!1;i==="post"?l.scheduler=v=>{Rt(v,d&&d.suspense)}:i!=="sync"&&(p=!0,l.scheduler=(v,S)=>{S?v():Lc(v)}),l.augmentJob=v=>{e&&(v.flags|=4),p&&(v.flags|=2,d&&(v.id=d.uid,v.i=d))};const g=nv(t,e,l);return Ei&&(u?u.push(g):c&&g()),g}function cv(t,e,n){const r=this.proxy,s=ze(t)?t.includes(".")?Mp(r,t):()=>r[t]:t.bind(r,r);let i;ge(e)?i=e:(i=e.handler,n=e);const o=Vi(this),l=Vp(s,i.bind(r),n);return o(),l}function Mp(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const Lp=Symbol("_vte"),uv=t=>t.__isTeleport,si=t=>t&&(t.disabled||t.disabled===""),Bh=t=>t&&(t.defer||t.defer===""),$h=t=>typeof SVGElement<"u"&&t instanceof SVGElement,qh=t=>typeof MathMLElement=="function"&&t instanceof MathMLElement,Ul=(t,e)=>{const n=t&&t.to;return ze(n)?e?e(n):null:n},Fp={name:"Teleport",__isTeleport:!0,process(t,e,n,r,s,i,o,l,c,u){const{mc:d,pc:p,pbc:g,o:{insert:v,querySelector:S,createText:C,createComment:k}}=u,N=si(e.props);let{shapeFlag:O,children:B,dynamicChildren:G}=e;if(t==null){const V=e.el=C(""),$=e.anchor=C("");v(V,n,r),v($,n,r);const T=(y,I)=>{O&16&&d(B,y,I,s,i,o,l,c)},_=()=>{const y=e.target=Ul(e.props,S),I=Up(y,e,C,v);y&&(o!=="svg"&&$h(y)?o="svg":o!=="mathml"&&qh(y)&&(o="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(y),N||(T(y,I),Ao(e,!1)))};N&&(T(n,$),Ao(e,!0)),Bh(e.props)?(e.el.__isMounted=!1,Rt(()=>{_(),delete e.el.__isMounted},i)):_()}else{if(Bh(e.props)&&t.el.__isMounted===!1){Rt(()=>{Fp.process(t,e,n,r,s,i,o,l,c,u)},i);return}e.el=t.el,e.targetStart=t.targetStart;const V=e.anchor=t.anchor,$=e.target=t.target,T=e.targetAnchor=t.targetAnchor,_=si(t.props),y=_?n:$,I=_?V:T;if(o==="svg"||$h($)?o="svg":(o==="mathml"||qh($))&&(o="mathml"),G?(g(t.dynamicChildren,G,y,s,i,o,l),$c(t,e,!0)):c||p(t,e,y,I,s,i,o,l,!1),N)_?e.props&&t.props&&e.props.to!==t.props.to&&(e.props.to=t.props.to):mo(e,n,V,u,1);else if((e.props&&e.props.to)!==(t.props&&t.props.to)){const b=e.target=Ul(e.props,S);b&&mo(e,b,null,u,0)}else _&&mo(e,$,T,u,1);Ao(e,N)}},remove(t,e,n,{um:r,o:{remove:s}},i){const{shapeFlag:o,children:l,anchor:c,targetStart:u,targetAnchor:d,target:p,props:g}=t;if(p&&(s(u),s(d)),i&&s(c),o&16){const v=i||!si(g);for(let S=0;S<l.length;S++){const C=l[S];r(C,e,n,v,!!C.dynamicChildren)}}},move:mo,hydrate:hv};function mo(t,e,n,{o:{insert:r},m:s},i=2){i===0&&r(t.targetAnchor,e,n);const{el:o,anchor:l,shapeFlag:c,children:u,props:d}=t,p=i===2;if(p&&r(o,e,n),(!p||si(d))&&c&16)for(let g=0;g<u.length;g++)s(u[g],e,n,2);p&&r(l,e,n)}function hv(t,e,n,r,s,i,{o:{nextSibling:o,parentNode:l,querySelector:c,insert:u,createText:d}},p){function g(C,k,N,O){k.anchor=p(o(C),k,l(C),n,r,s,i),k.targetStart=N,k.targetAnchor=O}const v=e.target=Ul(e.props,c),S=si(e.props);if(v){const C=v._lpa||v.firstChild;if(e.shapeFlag&16)if(S)g(t,e,C,C&&o(C));else{e.anchor=o(t);let k=C;for(;k;){if(k&&k.nodeType===8){if(k.data==="teleport start anchor")e.targetStart=k;else if(k.data==="teleport anchor"){e.targetAnchor=k,v._lpa=e.targetAnchor&&o(e.targetAnchor);break}}k=o(k)}e.targetAnchor||Up(v,e,d,u),p(C&&o(C),e,v,n,r,s,i)}Ao(e,S)}else S&&e.shapeFlag&16&&g(t,e,t,o(t));return e.anchor&&o(e.anchor)}const dv=Fp;function Ao(t,e){const n=t.ctx;if(n&&n.ut){let r,s;for(e?(r=t.el,s=t.anchor):(r=t.targetStart,s=t.targetAnchor);r&&r!==s;)r.nodeType===1&&r.setAttribute("data-v-owner",n.uid),r=r.nextSibling;n.ut()}}function Up(t,e,n,r){const s=e.targetStart=n(""),i=e.targetAnchor=n("");return s[Lp]=i,t&&(r(s,t),r(i,t)),i}const fv=Symbol("_leaveCb");function Fc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Fc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function jp(t,e){return ge(t)?(()=>it({name:t.name},e,{setup:t}))():t}function Bp(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const Bo=new WeakMap;function ii(t,e,n,r,s=!1){if(he(t)){t.forEach((S,C)=>ii(S,e&&(he(e)?e[C]:e),n,r,s));return}if(as(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&ii(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?Ea(r.component):r.el,o=s?null:i,{i:l,r:c}=t,u=e&&e.r,d=l.refs===Ne?l.refs={}:l.refs,p=l.setupState,g=be(p),v=p===Ne?ep:S=>Ce(g,S);if(u!=null&&u!==c){if(Hh(e),ze(u))d[u]=null,v(u)&&(p[u]=null);else if(Ge(u)){u.value=null;const S=e;S.k&&(d[S.k]=null)}}if(ge(c))Oi(c,l,12,[o,d]);else{const S=ze(c),C=Ge(c);if(S||C){const k=()=>{if(t.f){const N=S?v(c)?p[c]:d[c]:c.value;if(s)he(N)&&Rc(N,i);else if(he(N))N.includes(i)||N.push(i);else if(S)d[c]=[i],v(c)&&(p[c]=d[c]);else{const O=[i];c.value=O,t.k&&(d[t.k]=O)}}else S?(d[c]=o,v(c)&&(p[c]=o)):C&&(c.value=o,t.k&&(d[t.k]=o))};if(o){const N=()=>{k(),Bo.delete(t)};N.id=-1,Bo.set(t,N),Rt(N,n)}else Hh(t),k()}}}function Hh(t){const e=Bo.get(t);e&&(e.flags|=8,Bo.delete(t))}ua().requestIdleCallback;ua().cancelIdleCallback;const as=t=>!!t.type.__asyncLoader,$p=t=>t.type.__isKeepAlive;function pv(t,e){qp(t,"a",e)}function mv(t,e){qp(t,"da",e)}function qp(t,e,n=xt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(ga(e,r,n),n){let s=n.parent;for(;s&&s.parent;)$p(s.parent.vnode)&&gv(r,e,n,s),s=s.parent}}function gv(t,e,n,r){const s=ga(e,t,r,!0);Wp(()=>{Rc(r[e],s)},n)}function ga(t,e,n=xt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Pn();const l=Vi(n),c=hn(e,n,t,o);return l(),Cn(),c});return r?s.unshift(i):s.push(i),i}}const Ln=t=>(e,n=xt)=>{(!Ei||t==="sp")&&ga(t,(...r)=>e(...r),n)},_v=Ln("bm"),_a=Ln("m"),yv=Ln("bu"),vv=Ln("u"),Hp=Ln("bum"),Wp=Ln("um"),Ev=Ln("sp"),Tv=Ln("rtg"),wv=Ln("rtc");function Iv(t,e=xt){ga("ec",t,e)}const Av=Symbol.for("v-ndc");function bo(t,e,n,r){let s;const i=n&&n[r],o=he(t);if(o||ze(t)){const l=o&&bn(t);let c=!1,u=!1;l&&(c=!jt(t),u=xn(t),t=da(t)),s=new Array(t.length);for(let d=0,p=t.length;d<p;d++)s[d]=e(c?u?ds(Zt(t[d])):Zt(t[d]):t[d],d,void 0,i&&i[d])}else if(typeof t=="number"){s=new Array(t);for(let l=0;l<t;l++)s[l]=e(l+1,l,void 0,i&&i[l])}else if(Ue(t))if(t[Symbol.iterator])s=Array.from(t,(l,c)=>e(l,c,void 0,i&&i[c]));else{const l=Object.keys(t);s=new Array(l.length);for(let c=0,u=l.length;c<u;c++){const d=l[c];s[c]=e(t[d],d,c,i&&i[c])}}else s=[];return n&&(n[r]=s),s}function bv(t,e,n={},r,s){if(wt.ce||wt.parent&&as(wt.parent)&&wt.parent.ce){const u=Object.keys(n).length>0;return e!=="default"&&(n.name=e),_e(),Dr(ht,null,[Xe("slot",n,r&&r())],u?-2:64)}let i=t[e];i&&i._c&&(i._d=!1),_e();const o=i&&Gp(i(n)),l=n.key||o&&o.key,c=Dr(ht,{key:(l&&!Mn(l)?l:`_${e}`)+(!o&&r?"_fb":"")},o||(r?r():[]),o&&t._===1?64:-2);return!s&&c.scopeId&&(c.slotScopeIds=[c.scopeId+"-s"]),i&&i._c&&(i._d=!0),c}function Gp(t){return t.some(e=>vi(e)?!(e.type===kn||e.type===ht&&!Gp(e.children)):!0)?t:null}const jl=t=>t?um(t)?Ea(t):jl(t.parent):null,oi=it(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>jl(t.parent),$root:t=>jl(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Uc(t),$forceUpdate:t=>t.f||(t.f=()=>{Lc(t.update)}),$nextTick:t=>t.n||(t.n=Mc.bind(t.proxy)),$watch:t=>cv.bind(t)}),hl=(t,e)=>t!==Ne&&!t.__isScriptSetup&&Ce(t,e),Rv={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:l,appContext:c}=t;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(hl(r,e))return o[e]=1,r[e];if(s!==Ne&&Ce(s,e))return o[e]=2,s[e];if(Ce(i,e))return o[e]=3,i[e];if(n!==Ne&&Ce(n,e))return o[e]=4,n[e];Bl&&(o[e]=0)}}const u=oi[e];let d,p;if(u)return e==="$attrs"&&Et(t.attrs,"get",""),u(t);if((d=l.__cssModules)&&(d=d[e]))return d;if(n!==Ne&&Ce(n,e))return o[e]=4,n[e];if(p=c.config.globalProperties,Ce(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return hl(s,e)?(s[e]=n,!0):r!==Ne&&Ce(r,e)?(r[e]=n,!0):Ce(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,props:i,type:o}},l){let c;return!!(n[l]||t!==Ne&&l[0]!=="$"&&Ce(t,l)||hl(e,l)||Ce(i,l)||Ce(r,l)||Ce(oi,l)||Ce(s.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Ce(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Wh(t){return he(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Bl=!0;function Sv(t){const e=Uc(t),n=t.proxy,r=t.ctx;Bl=!1,e.beforeCreate&&Gh(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:l,provide:c,inject:u,created:d,beforeMount:p,mounted:g,beforeUpdate:v,updated:S,activated:C,deactivated:k,beforeDestroy:N,beforeUnmount:O,destroyed:B,unmounted:G,render:V,renderTracked:$,renderTriggered:T,errorCaptured:_,serverPrefetch:y,expose:I,inheritAttrs:b,components:R,directives:w,filters:Qe}=e;if(u&&Pv(u,r,null),o)for(const ce in o){const ye=o[ce];ge(ye)&&(r[ce]=ye.bind(n))}if(s){const ce=s.call(n,n);Ue(ce)&&(t.data=Ni(ce))}if(Bl=!0,i)for(const ce in i){const ye=i[ce],Ot=ge(ye)?ye.bind(n,n):ge(ye.get)?ye.get.bind(n,n):Qt,Gt=!ge(ye)&&ge(ye.set)?ye.set.bind(n):Qt,Bt=je({get:Ot,set:Gt});Object.defineProperty(r,ce,{enumerable:!0,configurable:!0,get:()=>Bt.value,set:Be=>Bt.value=Be})}if(l)for(const ce in l)Kp(l[ce],r,n,ce);if(c){const ce=ge(c)?c.call(n):c;Reflect.ownKeys(ce).forEach(ye=>{Io(ye,ce[ye])})}d&&Gh(d,t,"c");function Oe(ce,ye){he(ye)?ye.forEach(Ot=>ce(Ot.bind(n))):ye&&ce(ye.bind(n))}if(Oe(_v,p),Oe(_a,g),Oe(yv,v),Oe(vv,S),Oe(pv,C),Oe(mv,k),Oe(Iv,_),Oe(wv,$),Oe(Tv,T),Oe(Hp,O),Oe(Wp,G),Oe(Ev,y),he(I))if(I.length){const ce=t.exposed||(t.exposed={});I.forEach(ye=>{Object.defineProperty(ce,ye,{get:()=>n[ye],set:Ot=>n[ye]=Ot,enumerable:!0})})}else t.exposed||(t.exposed={});V&&t.render===Qt&&(t.render=V),b!=null&&(t.inheritAttrs=b),R&&(t.components=R),w&&(t.directives=w),y&&Bp(t)}function Pv(t,e,n=Qt){he(t)&&(t=$l(t));for(const r in t){const s=t[r];let i;Ue(s)?"default"in s?i=Ht(s.from||r,s.default,!0):i=Ht(s.from||r):i=Ht(s),Ge(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Gh(t,e,n){hn(he(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Kp(t,e,n,r){let s=r.includes(".")?Mp(n,r):()=>n[r];if(ze(t)){const i=e[t];ge(i)&&Rn(s,i)}else if(ge(t))Rn(s,t.bind(n));else if(Ue(t))if(he(t))t.forEach(i=>Kp(i,e,n,r));else{const i=ge(t.handler)?t.handler.bind(n):e[t.handler];ge(i)&&Rn(s,i,t)}}function Uc(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,l=i.get(e);let c;return l?c=l:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(u=>$o(c,u,o,!0)),$o(c,e,o)),Ue(e)&&i.set(e,c),c}function $o(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&$o(t,i,n,!0),s&&s.forEach(o=>$o(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const l=Cv[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const Cv={data:Kh,props:zh,emits:zh,methods:zs,computed:zs,beforeCreate:bt,created:bt,beforeMount:bt,mounted:bt,beforeUpdate:bt,updated:bt,beforeDestroy:bt,beforeUnmount:bt,destroyed:bt,unmounted:bt,activated:bt,deactivated:bt,errorCaptured:bt,serverPrefetch:bt,components:zs,directives:zs,watch:kv,provide:Kh,inject:xv};function Kh(t,e){return e?t?function(){return it(ge(t)?t.call(this,this):t,ge(e)?e.call(this,this):e)}:e:t}function xv(t,e){return zs($l(t),$l(e))}function $l(t){if(he(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function bt(t,e){return t?[...new Set([].concat(t,e))]:e}function zs(t,e){return t?it(Object.create(null),t,e):e}function zh(t,e){return t?he(t)&&he(e)?[...new Set([...t,...e])]:it(Object.create(null),Wh(t),Wh(e??{})):e}function kv(t,e){if(!t)return e;if(!e)return t;const n=it(Object.create(null),t);for(const r in e)n[r]=bt(t[r],e[r]);return n}function zp(){return{app:null,config:{isNativeTag:ep,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Dv=0;function Nv(t,e){return function(r,s=null){ge(r)||(r=it({},r)),s!=null&&!Ue(s)&&(s=null);const i=zp(),o=new WeakSet,l=[];let c=!1;const u=i.app={_uid:Dv++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:hE,get config(){return i.config},set config(d){},use(d,...p){return o.has(d)||(d&&ge(d.install)?(o.add(d),d.install(u,...p)):ge(d)&&(o.add(d),d(u,...p))),u},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),u},component(d,p){return p?(i.components[d]=p,u):i.components[d]},directive(d,p){return p?(i.directives[d]=p,u):i.directives[d]},mount(d,p,g){if(!c){const v=u._ceVNode||Xe(r,s);return v.appContext=i,g===!0?g="svg":g===!1&&(g=void 0),p&&e?e(v,d):t(v,d,g),c=!0,u._container=d,d.__vue_app__=u,Ea(v.component)}},onUnmount(d){l.push(d)},unmount(){c&&(hn(l,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(d,p){return i.provides[d]=p,u},runWithContext(d){const p=xr;xr=u;try{return d()}finally{xr=p}}};return u}}let xr=null;const Ov=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${cr(e)}Modifiers`]||t[`${jr(e)}Modifiers`];function Vv(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Ne;let s=n;const i=e.startsWith("update:"),o=i&&Ov(r,e.slice(7));o&&(o.trim&&(s=n.map(d=>ze(d)?d.trim():d)),o.number&&(s=n.map(Sc)));let l,c=r[l=ol(e)]||r[l=ol(cr(e))];!c&&i&&(c=r[l=ol(jr(e))]),c&&hn(c,t,6,s);const u=r[l+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,hn(u,t,6,s)}}const Mv=new WeakMap;function Qp(t,e,n=!1){const r=n?Mv:e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},l=!1;if(!ge(t)){const c=u=>{const d=Qp(u,e,!0);d&&(l=!0,it(o,d))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!l?(Ue(t)&&r.set(t,null),null):(he(i)?i.forEach(c=>o[c]=null):it(o,i),Ue(t)&&r.set(t,o),o)}function ya(t,e){return!t||!oa(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ce(t,e[0].toLowerCase()+e.slice(1))||Ce(t,jr(e))||Ce(t,e))}function dl(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:l,emit:c,render:u,renderCache:d,props:p,data:g,setupState:v,ctx:S,inheritAttrs:C}=t,k=jo(t);let N,O;try{if(n.shapeFlag&4){const G=s||r,V=G;N=on(u.call(V,G,d,p,v,g,S)),O=l}else{const G=e;N=on(G.length>1?G(p,{attrs:l,slots:o,emit:c}):G(p,null)),O=e.props?l:Lv(l)}}catch(G){ai.length=0,pa(G,t,1),N=Xe(kn)}let B=N;if(O&&C!==!1){const G=Object.keys(O),{shapeFlag:V}=B;G.length&&V&7&&(i&&G.some(bc)&&(O=Fv(O,i)),B=fs(B,O,!1,!0))}return n.dirs&&(B=fs(B,null,!1,!0),B.dirs=B.dirs?B.dirs.concat(n.dirs):n.dirs),n.transition&&Fc(B,n.transition),N=B,jo(k),N}const Lv=t=>{let e;for(const n in t)(n==="class"||n==="style"||oa(n))&&((e||(e={}))[n]=t[n]);return e},Fv=(t,e)=>{const n={};for(const r in t)(!bc(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Uv(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:l,patchFlag:c}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Qh(r,o,u):!!o;if(c&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const g=d[p];if(o[g]!==r[g]&&!ya(u,g))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===o?!1:r?o?Qh(r,o,u):!0:!!o;return!1}function Qh(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!ya(n,i))return!0}return!1}function jv({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const Jp={},Yp=()=>Object.create(Jp),Xp=t=>Object.getPrototypeOf(t)===Jp;function Bv(t,e,n,r=!1){const s={},i=Yp();t.propsDefaults=Object.create(null),Zp(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Sp(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function $v(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,l=be(s),[c]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let p=0;p<d.length;p++){let g=d[p];if(ya(t.emitsOptions,g))continue;const v=e[g];if(c)if(Ce(i,g))v!==i[g]&&(i[g]=v,u=!0);else{const S=cr(g);s[S]=ql(c,l,S,v,t,!1)}else v!==i[g]&&(i[g]=v,u=!0)}}}else{Zp(t,e,s,i)&&(u=!0);let d;for(const p in l)(!e||!Ce(e,p)&&((d=jr(p))===p||!Ce(e,d)))&&(c?n&&(n[p]!==void 0||n[d]!==void 0)&&(s[p]=ql(c,l,p,void 0,t,!0)):delete s[p]);if(i!==l)for(const p in i)(!e||!Ce(e,p))&&(delete i[p],u=!0)}u&&vn(t.attrs,"set","")}function Zp(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,l;if(e)for(let c in e){if(ti(c))continue;const u=e[c];let d;s&&Ce(s,d=cr(c))?!i||!i.includes(d)?n[d]=u:(l||(l={}))[d]=u:ya(t.emitsOptions,c)||(!(c in r)||u!==r[c])&&(r[c]=u,o=!0)}if(i){const c=be(n),u=l||Ne;for(let d=0;d<i.length;d++){const p=i[d];n[p]=ql(s,c,p,u[p],t,!Ce(u,p))}}return o}function ql(t,e,n,r,s,i){const o=t[n];if(o!=null){const l=Ce(o,"default");if(l&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&ge(c)){const{propsDefaults:u}=s;if(n in u)r=u[n];else{const d=Vi(s);r=u[n]=c.call(null,e),d()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!l?r=!1:o[1]&&(r===""||r===jr(n))&&(r=!0))}return r}const qv=new WeakMap;function em(t,e,n=!1){const r=n?qv:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},l=[];let c=!1;if(!ge(t)){const d=p=>{c=!0;const[g,v]=em(p,e,!0);it(o,g),v&&l.push(...v)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!c)return Ue(t)&&r.set(t,ss),ss;if(he(i))for(let d=0;d<i.length;d++){const p=cr(i[d]);Jh(p)&&(o[p]=Ne)}else if(i)for(const d in i){const p=cr(d);if(Jh(p)){const g=i[d],v=o[p]=he(g)||ge(g)?{type:g}:it({},g),S=v.type;let C=!1,k=!0;if(he(S))for(let N=0;N<S.length;++N){const O=S[N],B=ge(O)&&O.name;if(B==="Boolean"){C=!0;break}else B==="String"&&(k=!1)}else C=ge(S)&&S.name==="Boolean";v[0]=C,v[1]=k,(C||Ce(v,"default"))&&l.push(p)}}const u=[o,l];return Ue(t)&&r.set(t,u),u}function Jh(t){return t[0]!=="$"&&!ti(t)}const jc=t=>t==="_"||t==="_ctx"||t==="$stable",Bc=t=>he(t)?t.map(on):[on(t)],Hv=(t,e,n)=>{if(e._n)return e;const r=ma((...s)=>Bc(e(...s)),n);return r._c=!1,r},tm=(t,e,n)=>{const r=t._ctx;for(const s in t){if(jc(s))continue;const i=t[s];if(ge(i))e[s]=Hv(s,i,r);else if(i!=null){const o=Bc(i);e[s]=()=>o}}},nm=(t,e)=>{const n=Bc(e);t.slots.default=()=>n},rm=(t,e,n)=>{for(const r in e)(n||!jc(r))&&(t[r]=e[r])},Wv=(t,e,n)=>{const r=t.slots=Yp();if(t.vnode.shapeFlag&32){const s=e._;s?(rm(r,e,n),n&&op(r,"_",s,!0)):tm(e,r)}else e&&nm(t,e)},Gv=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Ne;if(r.shapeFlag&32){const l=e._;l?n&&l===1?i=!1:rm(s,e,n):(i=!e.$stable,tm(e,s)),o=e}else e&&(nm(t,e),o={default:1});if(i)for(const l in s)!jc(l)&&o[l]==null&&delete s[l]},Rt=Yv;function Kv(t){return zv(t)}function zv(t,e){const n=ua();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:l,createComment:c,setText:u,setElementText:d,parentNode:p,nextSibling:g,setScopeId:v=Qt,insertStaticContent:S}=t,C=(E,A,x,j=null,M=null,q=null,J=void 0,z=null,K=!!A.dynamicChildren)=>{if(E===A)return;E&&!Hs(E,A)&&(j=L(E),Be(E,M,q,!0),E=null),A.patchFlag===-2&&(K=!1,A.dynamicChildren=null);const{type:H,ref:ie,shapeFlag:X}=A;switch(H){case va:k(E,A,x,j);break;case kn:N(E,A,x,j);break;case pl:E==null&&O(A,x,j,J);break;case ht:R(E,A,x,j,M,q,J,z,K);break;default:X&1?V(E,A,x,j,M,q,J,z,K):X&6?w(E,A,x,j,M,q,J,z,K):(X&64||X&128)&&H.process(E,A,x,j,M,q,J,z,K,re)}ie!=null&&M?ii(ie,E&&E.ref,q,A||E,!A):ie==null&&E&&E.ref!=null&&ii(E.ref,null,q,E,!0)},k=(E,A,x,j)=>{if(E==null)r(A.el=l(A.children),x,j);else{const M=A.el=E.el;A.children!==E.children&&u(M,A.children)}},N=(E,A,x,j)=>{E==null?r(A.el=c(A.children||""),x,j):A.el=E.el},O=(E,A,x,j)=>{[E.el,E.anchor]=S(E.children,A,x,j,E.el,E.anchor)},B=({el:E,anchor:A},x,j)=>{let M;for(;E&&E!==A;)M=g(E),r(E,x,j),E=M;r(A,x,j)},G=({el:E,anchor:A})=>{let x;for(;E&&E!==A;)x=g(E),s(E),E=x;s(A)},V=(E,A,x,j,M,q,J,z,K)=>{if(A.type==="svg"?J="svg":A.type==="math"&&(J="mathml"),E==null)$(A,x,j,M,q,J,z,K);else{const H=E.el&&E.el._isVueCE?E.el:null;try{H&&H._beginPatch(),y(E,A,M,q,J,z,K)}finally{H&&H._endPatch()}}},$=(E,A,x,j,M,q,J,z)=>{let K,H;const{props:ie,shapeFlag:X,transition:ne,dirs:ae}=E;if(K=E.el=o(E.type,q,ie&&ie.is,ie),X&8?d(K,E.children):X&16&&_(E.children,K,null,j,M,fl(E,q),J,z),ae&&Tr(E,null,j,"created"),T(K,E,E.scopeId,J,j),ie){for(const me in ie)me!=="value"&&!ti(me)&&i(K,me,null,ie[me],q,j);"value"in ie&&i(K,"value",null,ie.value,q),(H=ie.onVnodeBeforeMount)&&nn(H,j,E)}ae&&Tr(E,null,j,"beforeMount");const oe=Qv(M,ne);oe&&ne.beforeEnter(K),r(K,A,x),((H=ie&&ie.onVnodeMounted)||oe||ae)&&Rt(()=>{H&&nn(H,j,E),oe&&ne.enter(K),ae&&Tr(E,null,j,"mounted")},M)},T=(E,A,x,j,M)=>{if(x&&v(E,x),j)for(let q=0;q<j.length;q++)v(E,j[q]);if(M){let q=M.subTree;if(A===q||om(q.type)&&(q.ssContent===A||q.ssFallback===A)){const J=M.vnode;T(E,J,J.scopeId,J.slotScopeIds,M.parent)}}},_=(E,A,x,j,M,q,J,z,K=0)=>{for(let H=K;H<E.length;H++){const ie=E[H]=z?Qn(E[H]):on(E[H]);C(null,ie,A,x,j,M,q,J,z)}},y=(E,A,x,j,M,q,J)=>{const z=A.el=E.el;let{patchFlag:K,dynamicChildren:H,dirs:ie}=A;K|=E.patchFlag&16;const X=E.props||Ne,ne=A.props||Ne;let ae;if(x&&wr(x,!1),(ae=ne.onVnodeBeforeUpdate)&&nn(ae,x,A,E),ie&&Tr(A,E,x,"beforeUpdate"),x&&wr(x,!0),(X.innerHTML&&ne.innerHTML==null||X.textContent&&ne.textContent==null)&&d(z,""),H?I(E.dynamicChildren,H,z,x,j,fl(A,M),q):J||ye(E,A,z,null,x,j,fl(A,M),q,!1),K>0){if(K&16)b(z,X,ne,x,M);else if(K&2&&X.class!==ne.class&&i(z,"class",null,ne.class,M),K&4&&i(z,"style",X.style,ne.style,M),K&8){const oe=A.dynamicProps;for(let me=0;me<oe.length;me++){const Te=oe[me],at=X[Te],Ze=ne[Te];(Ze!==at||Te==="value")&&i(z,Te,at,Ze,M,x)}}K&1&&E.children!==A.children&&d(z,A.children)}else!J&&H==null&&b(z,X,ne,x,M);((ae=ne.onVnodeUpdated)||ie)&&Rt(()=>{ae&&nn(ae,x,A,E),ie&&Tr(A,E,x,"updated")},j)},I=(E,A,x,j,M,q,J)=>{for(let z=0;z<A.length;z++){const K=E[z],H=A[z],ie=K.el&&(K.type===ht||!Hs(K,H)||K.shapeFlag&198)?p(K.el):x;C(K,H,ie,null,j,M,q,J,!0)}},b=(E,A,x,j,M)=>{if(A!==x){if(A!==Ne)for(const q in A)!ti(q)&&!(q in x)&&i(E,q,A[q],null,M,j);for(const q in x){if(ti(q))continue;const J=x[q],z=A[q];J!==z&&q!=="value"&&i(E,q,z,J,M,j)}"value"in x&&i(E,"value",A.value,x.value,M)}},R=(E,A,x,j,M,q,J,z,K)=>{const H=A.el=E?E.el:l(""),ie=A.anchor=E?E.anchor:l("");let{patchFlag:X,dynamicChildren:ne,slotScopeIds:ae}=A;ae&&(z=z?z.concat(ae):ae),E==null?(r(H,x,j),r(ie,x,j),_(A.children||[],x,ie,M,q,J,z,K)):X>0&&X&64&&ne&&E.dynamicChildren&&E.dynamicChildren.length===ne.length?(I(E.dynamicChildren,ne,x,M,q,J,z),(A.key!=null||M&&A===M.subTree)&&$c(E,A,!0)):ye(E,A,x,ie,M,q,J,z,K)},w=(E,A,x,j,M,q,J,z,K)=>{A.slotScopeIds=z,E==null?A.shapeFlag&512?M.ctx.activate(A,x,j,J,K):Qe(A,x,j,M,q,J,K):ot(E,A,K)},Qe=(E,A,x,j,M,q,J)=>{const z=E.component=iE(E,j,M);if($p(E)&&(z.ctx.renderer=re),oE(z,!1,J),z.asyncDep){if(M&&M.registerDep(z,Oe,J),!E.el){const K=z.subTree=Xe(kn);N(null,K,A,x),E.placeholder=K.el}}else Oe(z,E,A,x,M,q,J)},ot=(E,A,x)=>{const j=A.component=E.component;if(Uv(E,A,x))if(j.asyncDep&&!j.asyncResolved){ce(j,A,x);return}else j.next=A,j.update();else A.el=E.el,j.vnode=A},Oe=(E,A,x,j,M,q,J)=>{const z=()=>{if(E.isMounted){let{next:X,bu:ne,u:ae,parent:oe,vnode:me}=E;{const et=sm(E);if(et){X&&(X.el=me.el,ce(E,X,J)),et.asyncDep.then(()=>{E.isUnmounted||z()});return}}let Te=X,at;wr(E,!1),X?(X.el=me.el,ce(E,X,J)):X=me,ne&&wo(ne),(at=X.props&&X.props.onVnodeBeforeUpdate)&&nn(at,oe,X,me),wr(E,!0);const Ze=dl(E),Mt=E.subTree;E.subTree=Ze,C(Mt,Ze,p(Mt.el),L(Mt),E,M,q),X.el=Ze.el,Te===null&&jv(E,Ze.el),ae&&Rt(ae,M),(at=X.props&&X.props.onVnodeUpdated)&&Rt(()=>nn(at,oe,X,me),M)}else{let X;const{el:ne,props:ae}=A,{bm:oe,m:me,parent:Te,root:at,type:Ze}=E,Mt=as(A);if(wr(E,!1),oe&&wo(oe),!Mt&&(X=ae&&ae.onVnodeBeforeMount)&&nn(X,Te,A),wr(E,!0),ne&&ke){const et=()=>{E.subTree=dl(E),ke(ne,E.subTree,E,M,null)};Mt&&Ze.__asyncHydrate?Ze.__asyncHydrate(ne,E,et):et()}else{at.ce&&at.ce._def.shadowRoot!==!1&&at.ce._injectChildStyle(Ze);const et=E.subTree=dl(E);C(null,et,x,j,E,M,q),A.el=et.el}if(me&&Rt(me,M),!Mt&&(X=ae&&ae.onVnodeMounted)){const et=A;Rt(()=>nn(X,Te,et),M)}(A.shapeFlag&256||Te&&as(Te.vnode)&&Te.vnode.shapeFlag&256)&&E.a&&Rt(E.a,M),E.isMounted=!0,A=x=j=null}};E.scope.on();const K=E.effect=new fp(z);E.scope.off();const H=E.update=K.run.bind(K),ie=E.job=K.runIfDirty.bind(K);ie.i=E,ie.id=E.uid,K.scheduler=()=>Lc(ie),wr(E,!0),H()},ce=(E,A,x)=>{A.component=E;const j=E.vnode.props;E.vnode=A,E.next=null,$v(E,A.props,j,x),Gv(E,A.children,x),Pn(),jh(E),Cn()},ye=(E,A,x,j,M,q,J,z,K=!1)=>{const H=E&&E.children,ie=E?E.shapeFlag:0,X=A.children,{patchFlag:ne,shapeFlag:ae}=A;if(ne>0){if(ne&128){Gt(H,X,x,j,M,q,J,z,K);return}else if(ne&256){Ot(H,X,x,j,M,q,J,z,K);return}}ae&8?(ie&16&&Dt(H,M,q),X!==H&&d(x,X)):ie&16?ae&16?Gt(H,X,x,j,M,q,J,z,K):Dt(H,M,q,!0):(ie&8&&d(x,""),ae&16&&_(X,x,j,M,q,J,z,K))},Ot=(E,A,x,j,M,q,J,z,K)=>{E=E||ss,A=A||ss;const H=E.length,ie=A.length,X=Math.min(H,ie);let ne;for(ne=0;ne<X;ne++){const ae=A[ne]=K?Qn(A[ne]):on(A[ne]);C(E[ne],ae,x,null,M,q,J,z,K)}H>ie?Dt(E,M,q,!0,!1,X):_(A,x,j,M,q,J,z,K,X)},Gt=(E,A,x,j,M,q,J,z,K)=>{let H=0;const ie=A.length;let X=E.length-1,ne=ie-1;for(;H<=X&&H<=ne;){const ae=E[H],oe=A[H]=K?Qn(A[H]):on(A[H]);if(Hs(ae,oe))C(ae,oe,x,null,M,q,J,z,K);else break;H++}for(;H<=X&&H<=ne;){const ae=E[X],oe=A[ne]=K?Qn(A[ne]):on(A[ne]);if(Hs(ae,oe))C(ae,oe,x,null,M,q,J,z,K);else break;X--,ne--}if(H>X){if(H<=ne){const ae=ne+1,oe=ae<ie?A[ae].el:j;for(;H<=ne;)C(null,A[H]=K?Qn(A[H]):on(A[H]),x,oe,M,q,J,z,K),H++}}else if(H>ne)for(;H<=X;)Be(E[H],M,q,!0),H++;else{const ae=H,oe=H,me=new Map;for(H=oe;H<=ne;H++){const lt=A[H]=K?Qn(A[H]):on(A[H]);lt.key!=null&&me.set(lt.key,H)}let Te,at=0;const Ze=ne-oe+1;let Mt=!1,et=0;const jn=new Array(Ze);for(H=0;H<Ze;H++)jn[H]=0;for(H=ae;H<=X;H++){const lt=E[H];if(at>=Ze){Be(lt,M,q,!0);continue}let $t;if(lt.key!=null)$t=me.get(lt.key);else for(Te=oe;Te<=ne;Te++)if(jn[Te-oe]===0&&Hs(lt,A[Te])){$t=Te;break}$t===void 0?Be(lt,M,q,!0):(jn[$t-oe]=H+1,$t>=et?et=$t:Mt=!0,C(lt,A[$t],x,null,M,q,J,z,K),at++)}const xs=Mt?Jv(jn):ss;for(Te=xs.length-1,H=Ze-1;H>=0;H--){const lt=oe+H,$t=A[lt],Qi=A[lt+1],Hr=lt+1<ie?Qi.el||im(Qi):j;jn[H]===0?C(null,$t,x,Hr,M,q,J,z,K):Mt&&(Te<0||H!==xs[Te]?Bt($t,x,Hr,2):Te--)}}},Bt=(E,A,x,j,M=null)=>{const{el:q,type:J,transition:z,children:K,shapeFlag:H}=E;if(H&6){Bt(E.component.subTree,A,x,j);return}if(H&128){E.suspense.move(A,x,j);return}if(H&64){J.move(E,A,x,re);return}if(J===ht){r(q,A,x);for(let X=0;X<K.length;X++)Bt(K[X],A,x,j);r(E.anchor,A,x);return}if(J===pl){B(E,A,x);return}if(j!==2&&H&1&&z)if(j===0)z.beforeEnter(q),r(q,A,x),Rt(()=>z.enter(q),M);else{const{leave:X,delayLeave:ne,afterLeave:ae}=z,oe=()=>{E.ctx.isUnmounted?s(q):r(q,A,x)},me=()=>{q._isLeaving&&q[fv](!0),X(q,()=>{oe(),ae&&ae()})};ne?ne(q,oe,me):me()}else r(q,A,x)},Be=(E,A,x,j=!1,M=!1)=>{const{type:q,props:J,ref:z,children:K,dynamicChildren:H,shapeFlag:ie,patchFlag:X,dirs:ne,cacheIndex:ae}=E;if(X===-2&&(M=!1),z!=null&&(Pn(),ii(z,null,x,E,!0),Cn()),ae!=null&&(A.renderCache[ae]=void 0),ie&256){A.ctx.deactivate(E);return}const oe=ie&1&&ne,me=!as(E);let Te;if(me&&(Te=J&&J.onVnodeBeforeUnmount)&&nn(Te,A,E),ie&6)Vt(E.component,x,j);else{if(ie&128){E.suspense.unmount(x,j);return}oe&&Tr(E,null,A,"beforeUnmount"),ie&64?E.type.remove(E,A,x,re,j):H&&!H.hasOnce&&(q!==ht||X>0&&X&64)?Dt(H,A,x,!1,!0):(q===ht&&X&384||!M&&ie&16)&&Dt(K,A,x),j&&$e(E)}(me&&(Te=J&&J.onVnodeUnmounted)||oe)&&Rt(()=>{Te&&nn(Te,A,E),oe&&Tr(E,null,A,"unmounted")},x)},$e=E=>{const{type:A,el:x,anchor:j,transition:M}=E;if(A===ht){Un(x,j);return}if(A===pl){G(E);return}const q=()=>{s(x),M&&!M.persisted&&M.afterLeave&&M.afterLeave()};if(E.shapeFlag&1&&M&&!M.persisted){const{leave:J,delayLeave:z}=M,K=()=>J(x,q);z?z(E.el,q,K):K()}else q()},Un=(E,A)=>{let x;for(;E!==A;)x=g(E),s(E),E=x;s(A)},Vt=(E,A,x)=>{const{bum:j,scope:M,job:q,subTree:J,um:z,m:K,a:H}=E;Yh(K),Yh(H),j&&wo(j),M.stop(),q&&(q.flags|=8,Be(J,E,A,x)),z&&Rt(z,A),Rt(()=>{E.isUnmounted=!0},A)},Dt=(E,A,x,j=!1,M=!1,q=0)=>{for(let J=q;J<E.length;J++)Be(E[J],A,x,j,M)},L=E=>{if(E.shapeFlag&6)return L(E.component.subTree);if(E.shapeFlag&128)return E.suspense.next();const A=g(E.anchor||E.el),x=A&&A[Lp];return x?g(x):A};let ee=!1;const Y=(E,A,x)=>{let j;E==null?A._vnode&&(Be(A._vnode,null,null,!0),j=A._vnode.component):C(A._vnode||null,E,A,null,null,null,x),A._vnode=E,ee||(ee=!0,jh(j),Dp(),ee=!1)},re={p:C,um:Be,m:Bt,r:$e,mt:Qe,mc:_,pc:ye,pbc:I,n:L,o:t};let pe,ke;return e&&([pe,ke]=e(re)),{render:Y,hydrate:pe,createApp:Nv(Y,pe)}}function fl({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function wr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Qv(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function $c(t,e,n=!1){const r=t.children,s=e.children;if(he(r)&&he(s))for(let i=0;i<r.length;i++){const o=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=Qn(s[i]),l.el=o.el),!n&&l.patchFlag!==-2&&$c(o,l)),l.type===va&&(l.patchFlag!==-1?l.el=o.el:l.__elIndex=i+(t.type===ht?1:0)),l.type===kn&&!l.el&&(l.el=o.el)}}function Jv(t){const e=t.slice(),n=[0];let r,s,i,o,l;const c=t.length;for(r=0;r<c;r++){const u=t[r];if(u!==0){if(s=n[n.length-1],t[s]<u){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)l=i+o>>1,t[n[l]]<u?i=l+1:o=l;u<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function sm(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:sm(e)}function Yh(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function im(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?im(e.subTree):null}const om=t=>t.__isSuspense;function Yv(t,e){e&&e.pendingBranch?he(t)?e.effects.push(...t):e.effects.push(t):iv(t)}const ht=Symbol.for("v-fgt"),va=Symbol.for("v-txt"),kn=Symbol.for("v-cmt"),pl=Symbol.for("v-stc"),ai=[];let Ft=null;function _e(t=!1){ai.push(Ft=t?null:[])}function Xv(){ai.pop(),Ft=ai[ai.length-1]||null}let yi=1;function qo(t,e=!1){yi+=t,t<0&&Ft&&e&&(Ft.hasOnce=!0)}function am(t){return t.dynamicChildren=yi>0?Ft||ss:null,Xv(),yi>0&&Ft&&Ft.push(t),t}function Ae(t,e,n,r,s,i){return am(F(t,e,n,r,s,i,!0))}function Dr(t,e,n,r,s){return am(Xe(t,e,n,r,s,!0))}function vi(t){return t?t.__v_isVNode===!0:!1}function Hs(t,e){return t.type===e.type&&t.key===e.key}const lm=({key:t})=>t??null,Ro=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ze(t)||Ge(t)||ge(t)?{i:wt,r:t,k:e,f:!!n}:t:null);function F(t,e=null,n=null,r=0,s=null,i=t===ht?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&lm(e),ref:e&&Ro(e),scopeId:Op,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:wt};return l?(qc(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=ze(n)?8:16),yi>0&&!o&&Ft&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Ft.push(c),c}const Xe=Zv;function Zv(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Av)&&(t=kn),vi(t)){const l=fs(t,e,!0);return n&&qc(l,n),yi>0&&!i&&Ft&&(l.shapeFlag&6?Ft[Ft.indexOf(t)]=l:Ft.push(l)),l.patchFlag=-2,l}if(uE(t)&&(t=t.__vccOpts),e){e=eE(e);let{class:l,style:c}=e;l&&!ze(l)&&(e.class=Pc(l)),Ue(c)&&(fa(c)&&!he(c)&&(c=it({},c)),e.style=ha(c))}const o=ze(t)?1:om(t)?128:uv(t)?64:Ue(t)?4:ge(t)?2:0;return F(t,e,n,r,s,o,i,!0)}function eE(t){return t?fa(t)||Xp(t)?it({},t):t:null}function fs(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:l,transition:c}=t,u=e?nE(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&lm(u),ref:e&&e.ref?n&&i?he(i)?i.concat(Ro(e)):[i,Ro(e)]:Ro(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==ht?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&fs(t.ssContent),ssFallback:t.ssFallback&&fs(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&Fc(d,c.clone(d)),d}function tE(t=" ",e=0){return Xe(va,null,t,e)}function Pt(t="",e=!1){return e?(_e(),Dr(kn,null,t)):Xe(kn,null,t)}function on(t){return t==null||typeof t=="boolean"?Xe(kn):he(t)?Xe(ht,null,t.slice()):vi(t)?Qn(t):Xe(va,null,String(t))}function Qn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:fs(t)}function qc(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(he(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),qc(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Xp(e)?e._ctx=wt:s===3&&wt&&(wt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else ge(e)?(e={default:e,_ctx:wt},n=32):(e=String(e),r&64?(n=16,e=[tE(e)]):n=8);t.children=e,t.shapeFlag|=n}function nE(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Pc([e.class,r.class]));else if(s==="style")e.style=ha([e.style,r.style]);else if(oa(s)){const i=e[s],o=r[s];o&&i!==o&&!(he(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function nn(t,e,n,r=null){hn(t,e,7,[n,r])}const rE=zp();let sE=0;function iE(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||rE,i={uid:sE++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new up(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:em(r,s),emitsOptions:Qp(r,s),emit:null,emitted:null,propsDefaults:Ne,inheritAttrs:r.inheritAttrs,ctx:Ne,data:Ne,props:Ne,attrs:Ne,slots:Ne,refs:Ne,setupState:Ne,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Vv.bind(null,i),t.ce&&t.ce(i),i}let xt=null;const cm=()=>xt||wt;let Ho,Hl;{const t=ua(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};Ho=e("__VUE_INSTANCE_SETTERS__",n=>xt=n),Hl=e("__VUE_SSR_SETTERS__",n=>Ei=n)}const Vi=t=>{const e=xt;return Ho(t),t.scope.on(),()=>{t.scope.off(),Ho(e)}},Xh=()=>{xt&&xt.scope.off(),Ho(null)};function um(t){return t.vnode.shapeFlag&4}let Ei=!1;function oE(t,e=!1,n=!1){e&&Hl(e);const{props:r,children:s}=t.vnode,i=um(t);Bv(t,r,i,e),Wv(t,s,n||e);const o=i?aE(t,e):void 0;return e&&Hl(!1),o}function aE(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Rv);const{setup:r}=n;if(r){Pn();const s=t.setupContext=r.length>1?cE(t):null,i=Vi(t),o=Oi(r,t,0,[t.props,s]),l=np(o);if(Cn(),i(),(l||t.sp)&&!as(t)&&Bp(t),l){if(o.then(Xh,Xh),e)return o.then(c=>{Zh(t,c,e)}).catch(c=>{pa(c,t,0)});t.asyncDep=o}else Zh(t,o,e)}else hm(t,e)}function Zh(t,e,n){ge(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ue(e)&&(t.setupState=Cp(e)),hm(t,n)}let ed;function hm(t,e,n){const r=t.type;if(!t.render){if(!e&&ed&&!r.render){const s=r.template||Uc(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:l,compilerOptions:c}=r,u=it(it({isCustomElement:i,delimiters:l},o),c);r.render=ed(s,u)}}t.render=r.render||Qt}{const s=Vi(t);Pn();try{Sv(t)}finally{Cn(),s()}}}const lE={get(t,e){return Et(t,"get",""),t[e]}};function cE(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,lE),slots:t.slots,emit:t.emit,expose:e}}function Ea(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Cp(Vc(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in oi)return oi[n](t)},has(e,n){return n in e||n in oi}})):t.proxy}function uE(t){return ge(t)&&"__vccOpts"in t}const je=(t,e)=>ev(t,e,Ei);function dm(t,e,n){try{qo(-1);const r=arguments.length;return r===2?Ue(e)&&!he(e)?vi(e)?Xe(t,null,[e]):Xe(t,e):Xe(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&vi(n)&&(n=[n]),Xe(t,e,n))}finally{qo(1)}}const hE="3.5.26";/**
* @vue/runtime-dom v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Wl;const td=typeof window<"u"&&window.trustedTypes;if(td)try{Wl=td.createPolicy("vue",{createHTML:t=>t})}catch{}const fm=Wl?t=>Wl.createHTML(t):t=>t,dE="http://www.w3.org/2000/svg",fE="http://www.w3.org/1998/Math/MathML",_n=typeof document<"u"?document:null,nd=_n&&_n.createElement("template"),pE={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?_n.createElementNS(dE,t):e==="mathml"?_n.createElementNS(fE,t):n?_n.createElement(t,{is:n}):_n.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>_n.createTextNode(t),createComment:t=>_n.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>_n.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{nd.innerHTML=fm(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const l=nd.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},mE=Symbol("_vtc");function gE(t,e,n){const r=t[mE];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const rd=Symbol("_vod"),_E=Symbol("_vsh"),yE=Symbol(""),vE=/(?:^|;)\s*display\s*:/;function EE(t,e,n){const r=t.style,s=ze(n);let i=!1;if(n&&!s){if(e)if(ze(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&So(r,l,"")}else for(const o in e)n[o]==null&&So(r,o,"");for(const o in n)o==="display"&&(i=!0),So(r,o,n[o])}else if(s){if(e!==n){const o=r[yE];o&&(n+=";"+o),r.cssText=n,i=vE.test(n)}}else e&&t.removeAttribute("style");rd in t&&(t[rd]=i?r.display:"",t[_E]&&(r.display="none"))}const sd=/\s*!important$/;function So(t,e,n){if(he(n))n.forEach(r=>So(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=TE(t,e);sd.test(n)?t.setProperty(jr(r),n.replace(sd,""),"important"):t[r]=n}}const id=["Webkit","Moz","ms"],ml={};function TE(t,e){const n=ml[e];if(n)return n;let r=cr(e);if(r!=="filter"&&r in t)return ml[e]=r;r=ip(r);for(let s=0;s<id.length;s++){const i=id[s]+r;if(i in t)return ml[e]=i}return e}const od="http://www.w3.org/1999/xlink";function ad(t,e,n,r,s,i=Ry(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(od,e.slice(6,e.length)):t.setAttributeNS(od,e,n):n==null||i&&!ap(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Mn(n)?String(n):n)}function ld(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?fm(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=ap(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function Zr(t,e,n,r){t.addEventListener(e,n,r)}function wE(t,e,n,r){t.removeEventListener(e,n,r)}const cd=Symbol("_vei");function IE(t,e,n,r,s=null){const i=t[cd]||(t[cd]={}),o=i[e];if(r&&o)o.value=r;else{const[l,c]=AE(e);if(r){const u=i[e]=SE(r,s);Zr(t,l,u,c)}else o&&(wE(t,l,o,c),i[e]=void 0)}}const ud=/(?:Once|Passive|Capture)$/;function AE(t){let e;if(ud.test(t)){e={};let r;for(;r=t.match(ud);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):jr(t.slice(2)),e]}let gl=0;const bE=Promise.resolve(),RE=()=>gl||(bE.then(()=>gl=0),gl=Date.now());function SE(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;hn(PE(r,n.value),e,5,[r])};return n.value=t,n.attached=RE(),n}function PE(t,e){if(he(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const hd=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,CE=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?gE(t,r,o):e==="style"?EE(t,n,r):oa(e)?bc(e)||IE(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):xE(t,e,r,o))?(ld(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&ad(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!ze(r))?ld(t,cr(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),ad(t,e,r,o))};function xE(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&hd(e)&&ge(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return hd(e)&&ze(n)?!1:e in t}const dd=t=>{const e=t.props["onUpdate:modelValue"]||!1;return he(e)?n=>wo(e,n):e};function kE(t){t.target.composing=!0}function fd(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const _l=Symbol("_assign");function pd(t,e,n){return e&&(t=t.trim()),n&&(t=Sc(t)),t}const rr={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[_l]=dd(s);const i=r||s.props&&s.props.type==="number";Zr(t,e?"change":"input",o=>{o.target.composing||t[_l](pd(t.value,n,i))}),(n||i)&&Zr(t,"change",()=>{t.value=pd(t.value,n,i)}),e||(Zr(t,"compositionstart",kE),Zr(t,"compositionend",fd),Zr(t,"change",fd))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[_l]=dd(o),t.composing)return;const l=(i||t.type==="number")&&!/^0\d/.test(t.value)?Sc(t.value):t.value,c=e??"";l!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===c)||(t.value=c))}},DE=["ctrl","shift","alt","meta"],NE={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>DE.some(n=>t[`${n}Key`]&&!e.includes(n))},Hc=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=(s,...i)=>{for(let o=0;o<e.length;o++){const l=NE[e[o]];if(l&&l(s,e))return}return t(s,...i)})},OE=it({patchProp:CE},pE);let md;function VE(){return md||(md=Kv(OE))}const ME=(...t)=>{const e=VE().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=FE(r);if(!s)return;const i=e._component;!ge(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,LE(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function LE(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function FE(t){return ze(t)?document.querySelector(t):t}var UE=!1;/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let pm;const Ta=t=>pm=t,mm=Symbol();function Gl(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var li;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(li||(li={}));function jE(){const t=hp(!0),e=t.run(()=>Se({}));let n=[],r=[];const s=Vc({install(i){Ta(s),s._a=i,i.provide(mm,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!UE?r.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const gm=()=>{};function gd(t,e,n,r=gm){t.push(e);const s=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),r())};return!n&&dp()&&Sy(s),s}function Jr(t,...e){t.slice().forEach(n=>{n(...e)})}const BE=t=>t(),_d=Symbol(),yl=Symbol();function Kl(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,r)=>t.set(r,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n],s=t[n];Gl(s)&&Gl(r)&&t.hasOwnProperty(n)&&!Ge(r)&&!bn(r)?t[n]=Kl(s,r):t[n]=r}return t}const $E=Symbol();function qE(t){return!Gl(t)||!t.hasOwnProperty($E)}const{assign:Gn}=Object;function HE(t){return!!(Ge(t)&&t.effect)}function WE(t,e,n,r){const{state:s,actions:i,getters:o}=e,l=n.state.value[t];let c;function u(){l||(n.state.value[t]=s?s():{});const d=Jy(n.state.value[t]);return Gn(d,i,Object.keys(o||{}).reduce((p,g)=>(p[g]=Vc(je(()=>{Ta(n);const v=n._s.get(t);return o[g].call(v,v)})),p),{}))}return c=_m(t,u,e,n,r,!0),c}function _m(t,e,n={},r,s,i){let o;const l=Gn({actions:{}},n),c={deep:!0};let u,d,p=[],g=[],v;const S=r.state.value[t];!i&&!S&&(r.state.value[t]={}),Se({});let C;function k(_){let y;u=d=!1,typeof _=="function"?(_(r.state.value[t]),y={type:li.patchFunction,storeId:t,events:v}):(Kl(r.state.value[t],_),y={type:li.patchObject,payload:_,storeId:t,events:v});const I=C=Symbol();Mc().then(()=>{C===I&&(u=!0)}),d=!0,Jr(p,y,r.state.value[t])}const N=i?function(){const{state:y}=n,I=y?y():{};this.$patch(b=>{Gn(b,I)})}:gm;function O(){o.stop(),p=[],g=[],r._s.delete(t)}const B=(_,y="")=>{if(_d in _)return _[yl]=y,_;const I=function(){Ta(r);const b=Array.from(arguments),R=[],w=[];function Qe(ce){R.push(ce)}function ot(ce){w.push(ce)}Jr(g,{args:b,name:I[yl],store:V,after:Qe,onError:ot});let Oe;try{Oe=_.apply(this&&this.$id===t?this:V,b)}catch(ce){throw Jr(w,ce),ce}return Oe instanceof Promise?Oe.then(ce=>(Jr(R,ce),ce)).catch(ce=>(Jr(w,ce),Promise.reject(ce))):(Jr(R,Oe),Oe)};return I[_d]=!0,I[yl]=y,I},G={_p:r,$id:t,$onAction:gd.bind(null,g),$patch:k,$reset:N,$subscribe(_,y={}){const I=gd(p,_,y.detached,()=>b()),b=o.run(()=>Rn(()=>r.state.value[t],R=>{(y.flush==="sync"?d:u)&&_({storeId:t,type:li.direct,events:v},R)},Gn({},c,y)));return I},$dispose:O},V=Ni(G);r._s.set(t,V);const T=(r._a&&r._a.runWithContext||BE)(()=>r._e.run(()=>(o=hp()).run(()=>e({action:B}))));for(const _ in T){const y=T[_];if(Ge(y)&&!HE(y)||bn(y))i||(S&&qE(y)&&(Ge(y)?y.value=S[_]:Kl(y,S[_])),r.state.value[t][_]=y);else if(typeof y=="function"){const I=B(y,_);T[_]=I,l.actions[_]=y}}return Gn(V,T),Gn(be(V),T),Object.defineProperty(V,"$state",{get:()=>r.state.value[t],set:_=>{k(y=>{Gn(y,_)})}}),r._p.forEach(_=>{Gn(V,o.run(()=>_({store:V,app:r._a,pinia:r,options:l})))}),S&&i&&n.hydrate&&n.hydrate(V.$state,S),u=!0,d=!0,V}/*! #__NO_SIDE_EFFECTS__ */function ym(t,e,n){let r,s;const i=typeof e=="function";typeof t=="string"?(r=t,s=i?n:e):(s=t,r=t.id);function o(l,c){const u=ov();return l=l||(u?Ht(mm,null):null),l&&Ta(l),l=pm,l._s.has(r)||(i?_m(r,e,s,l):WE(r,s,l)),l._s.get(r)}return o.$id=r,o}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const es=typeof document<"u";function vm(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function GE(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&vm(t.default)}const Pe=Object.assign;function vl(t,e){const n={};for(const r in e){const s=e[r];n[r]=en(s)?s.map(t):t(s)}return n}const ci=()=>{},en=Array.isArray;function yd(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}const Em=/#/g,KE=/&/g,zE=/\//g,QE=/=/g,JE=/\?/g,Tm=/\+/g,YE=/%5B/g,XE=/%5D/g,wm=/%5E/g,ZE=/%60/g,Im=/%7B/g,eT=/%7C/g,Am=/%7D/g,tT=/%20/g;function Wc(t){return t==null?"":encodeURI(""+t).replace(eT,"|").replace(YE,"[").replace(XE,"]")}function nT(t){return Wc(t).replace(Im,"{").replace(Am,"}").replace(wm,"^")}function zl(t){return Wc(t).replace(Tm,"%2B").replace(tT,"+").replace(Em,"%23").replace(KE,"%26").replace(ZE,"`").replace(Im,"{").replace(Am,"}").replace(wm,"^")}function rT(t){return zl(t).replace(QE,"%3D")}function sT(t){return Wc(t).replace(Em,"%23").replace(JE,"%3F")}function iT(t){return sT(t).replace(zE,"%2F")}function Ti(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const oT=/\/$/,aT=t=>t.replace(oT,"");function El(t,e,n="/"){let r,s={},i="",o="";const l=e.indexOf("#");let c=e.indexOf("?");return c=l>=0&&c>l?-1:c,c>=0&&(r=e.slice(0,c),i=e.slice(c,l>0?l:e.length),s=t(i.slice(1))),l>=0&&(r=r||e.slice(0,l),o=e.slice(l,e.length)),r=hT(r??e,n),{fullPath:r+i+o,path:r,query:s,hash:Ti(o)}}function lT(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function vd(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function cT(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&ps(e.matched[r],n.matched[s])&&bm(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function ps(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function bm(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!uT(t[n],e[n]))return!1;return!0}function uT(t,e){return en(t)?Ed(t,e):en(e)?Ed(e,t):(t==null?void 0:t.valueOf())===(e==null?void 0:e.valueOf())}function Ed(t,e){return en(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function hT(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,l;for(o=0;o<r.length;o++)if(l=r[o],l!==".")if(l==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const Hn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Ql=function(t){return t.pop="pop",t.push="push",t}({}),Tl=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function dT(t){if(!t)if(es){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),aT(t)}const fT=/^[^#]+#/;function pT(t,e){return t.replace(fT,"#")+e}function mT(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const wa=()=>({left:window.scrollX,top:window.scrollY});function gT(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=mT(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Td(t,e){return(history.state?history.state.position-e:-1)+t}const Jl=new Map;function _T(t,e){Jl.set(t,e)}function yT(t){const e=Jl.get(t);return Jl.delete(t),e}function vT(t){return typeof t=="string"||t&&typeof t=="object"}function Rm(t){return typeof t=="string"||typeof t=="symbol"}let We=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const Sm=Symbol("");We.MATCHER_NOT_FOUND+"",We.NAVIGATION_GUARD_REDIRECT+"",We.NAVIGATION_ABORTED+"",We.NAVIGATION_CANCELLED+"",We.NAVIGATION_DUPLICATED+"";function ms(t,e){return Pe(new Error,{type:t,[Sm]:!0},e)}function gn(t,e){return t instanceof Error&&Sm in t&&(e==null||!!(t.type&e))}const ET=["params","query","hash"];function TT(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of ET)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function wT(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(Tm," "),i=s.indexOf("="),o=Ti(i<0?s:s.slice(0,i)),l=i<0?null:Ti(s.slice(i+1));if(o in e){let c=e[o];en(c)||(c=e[o]=[c]),c.push(l)}else e[o]=l}return e}function wd(t){let e="";for(let n in t){const r=t[n];if(n=rT(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(en(r)?r.map(s=>s&&zl(s)):[r&&zl(r)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+n,s!=null&&(e+="="+s))})}return e}function IT(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=en(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const AT=Symbol(""),Id=Symbol(""),Ia=Symbol(""),Gc=Symbol(""),Yl=Symbol("");function Ws(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Jn(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((l,c)=>{const u=g=>{g===!1?c(ms(We.NAVIGATION_ABORTED,{from:n,to:e})):g instanceof Error?c(g):vT(g)?c(ms(We.NAVIGATION_GUARD_REDIRECT,{from:e,to:g})):(o&&r.enterCallbacks[s]===o&&typeof g=="function"&&o.push(g),l())},d=i(()=>t.call(r&&r.instances[s],e,n,u));let p=Promise.resolve(d);t.length<3&&(p=p.then(u)),p.catch(g=>c(g))})}function wl(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const l in o.components){let c=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(vm(c)){const u=(c.__vccOpts||c)[e];u&&i.push(Jn(u,n,r,o,l,s))}else{let u=c();i.push(()=>u.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const p=GE(d)?d.default:d;o.mods[l]=d,o.components[l]=p;const g=(p.__vccOpts||p)[e];return g&&Jn(g,n,r,o,l,s)()}))}}return i}function bT(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const l=e.matched[o];l&&(t.matched.find(u=>ps(u,l))?r.push(l):n.push(l));const c=t.matched[o];c&&(e.matched.find(u=>ps(u,c))||s.push(c))}return[n,r,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let RT=()=>location.protocol+"//"+location.host;function Pm(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let o=s.includes(t.slice(i))?t.slice(i).length:1,l=s.slice(o);return l[0]!=="/"&&(l="/"+l),vd(l,"")}return vd(n,t)+r+s}function ST(t,e,n,r){let s=[],i=[],o=null;const l=({state:g})=>{const v=Pm(t,location),S=n.value,C=e.value;let k=0;if(g){if(n.value=v,e.value=g,o&&o===S){o=null;return}k=C?g.position-C.position:0}else r(v);s.forEach(N=>{N(n.value,S,{delta:k,type:Ql.pop,direction:k?k>0?Tl.forward:Tl.back:Tl.unknown})})};function c(){o=n.value}function u(g){s.push(g);const v=()=>{const S=s.indexOf(g);S>-1&&s.splice(S,1)};return i.push(v),v}function d(){if(document.visibilityState==="hidden"){const{history:g}=window;if(!g.state)return;g.replaceState(Pe({},g.state,{scroll:wa()}),"")}}function p(){for(const g of i)g();i=[],window.removeEventListener("popstate",l),window.removeEventListener("pagehide",d),document.removeEventListener("visibilitychange",d)}return window.addEventListener("popstate",l),window.addEventListener("pagehide",d),document.addEventListener("visibilitychange",d),{pauseListeners:c,listen:u,destroy:p}}function Ad(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?wa():null}}function PT(t){const{history:e,location:n}=window,r={value:Pm(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,u,d){const p=t.indexOf("#"),g=p>-1?(n.host&&document.querySelector("base")?t:t.slice(p))+c:RT()+t+c;try{e[d?"replaceState":"pushState"](u,"",g),s.value=u}catch(v){console.error(v),n[d?"replace":"assign"](g)}}function o(c,u){i(c,Pe({},e.state,Ad(s.value.back,c,s.value.forward,!0),u,{position:s.value.position}),!0),r.value=c}function l(c,u){const d=Pe({},s.value,e.state,{forward:c,scroll:wa()});i(d.current,d,!0),i(c,Pe({},Ad(r.value,c,null),{position:d.position+1},u),!1),r.value=c}return{location:r,state:s,push:l,replace:o}}function CT(t){t=dT(t);const e=PT(t),n=ST(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Pe({location:"",base:t,go:r,createHref:pT.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}let Rr=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var tt=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(tt||{});const xT={type:Rr.Static,value:""},kT=/[a-zA-Z0-9_]/;function DT(t){if(!t)return[[]];if(t==="/")return[[xT]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(v){throw new Error(`ERR (${n})/"${u}": ${v}`)}let n=tt.Static,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let l=0,c,u="",d="";function p(){u&&(n===tt.Static?i.push({type:Rr.Static,value:u}):n===tt.Param||n===tt.ParamRegExp||n===tt.ParamRegExpEnd?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:Rr.Param,value:u,regexp:d,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),u="")}function g(){u+=c}for(;l<t.length;){if(c=t[l++],c==="\\"&&n!==tt.ParamRegExp){r=n,n=tt.EscapeNext;continue}switch(n){case tt.Static:c==="/"?(u&&p(),o()):c===":"?(p(),n=tt.Param):g();break;case tt.EscapeNext:g(),n=r;break;case tt.Param:c==="("?n=tt.ParamRegExp:kT.test(c)?g():(p(),n=tt.Static,c!=="*"&&c!=="?"&&c!=="+"&&l--);break;case tt.ParamRegExp:c===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+c:n=tt.ParamRegExpEnd:d+=c;break;case tt.ParamRegExpEnd:p(),n=tt.Static,c!=="*"&&c!=="?"&&c!=="+"&&l--,d="";break;default:e("Unknown state");break}}return n===tt.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),p(),o(),s}const bd="[^/]+?",NT={sensitive:!1,strict:!1,start:!0,end:!0};var St=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(St||{});const OT=/[.+*?^${}()[\]/\\]/g;function VT(t,e){const n=Pe({},NT,e),r=[];let s=n.start?"^":"";const i=[];for(const u of t){const d=u.length?[]:[St.Root];n.strict&&!u.length&&(s+="/");for(let p=0;p<u.length;p++){const g=u[p];let v=St.Segment+(n.sensitive?St.BonusCaseSensitive:0);if(g.type===Rr.Static)p||(s+="/"),s+=g.value.replace(OT,"\\$&"),v+=St.Static;else if(g.type===Rr.Param){const{value:S,repeatable:C,optional:k,regexp:N}=g;i.push({name:S,repeatable:C,optional:k});const O=N||bd;if(O!==bd){v+=St.BonusCustomRegExp;try{`${O}`}catch(G){throw new Error(`Invalid custom RegExp for param "${S}" (${O}): `+G.message)}}let B=C?`((?:${O})(?:/(?:${O}))*)`:`(${O})`;p||(B=k&&u.length<2?`(?:/${B})`:"/"+B),k&&(B+="?"),s+=B,v+=St.Dynamic,k&&(v+=St.BonusOptional),C&&(v+=St.BonusRepeatable),O===".*"&&(v+=St.BonusWildcard)}d.push(v)}r.push(d)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=St.BonusStrict}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function l(u){const d=u.match(o),p={};if(!d)return null;for(let g=1;g<d.length;g++){const v=d[g]||"",S=i[g-1];p[S.name]=v&&S.repeatable?v.split("/"):v}return p}function c(u){let d="",p=!1;for(const g of t){(!p||!d.endsWith("/"))&&(d+="/"),p=!1;for(const v of g)if(v.type===Rr.Static)d+=v.value;else if(v.type===Rr.Param){const{value:S,repeatable:C,optional:k}=v,N=S in u?u[S]:"";if(en(N)&&!C)throw new Error(`Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`);const O=en(N)?N.join("/"):N;if(!O)if(k)g.length<2&&(d.endsWith("/")?d=d.slice(0,-1):p=!0);else throw new Error(`Missing required param "${S}"`);d+=O}}return d||"/"}return{re:o,score:r,keys:i,parse:l,stringify:c}}function MT(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===St.Static+St.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===St.Static+St.Segment?1:-1:0}function Cm(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=MT(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(Rd(r))return 1;if(Rd(s))return-1}return s.length-r.length}function Rd(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const LT={strict:!1,end:!0,sensitive:!1};function FT(t,e,n){const r=VT(DT(t.path),n),s=Pe(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function UT(t,e){const n=[],r=new Map;e=yd(LT,e);function s(p){return r.get(p)}function i(p,g,v){const S=!v,C=Pd(p);C.aliasOf=v&&v.record;const k=yd(e,p),N=[C];if("alias"in p){const G=typeof p.alias=="string"?[p.alias]:p.alias;for(const V of G)N.push(Pd(Pe({},C,{components:v?v.record.components:C.components,path:V,aliasOf:v?v.record:C})))}let O,B;for(const G of N){const{path:V}=G;if(g&&V[0]!=="/"){const $=g.record.path,T=$[$.length-1]==="/"?"":"/";G.path=g.record.path+(V&&T+V)}if(O=FT(G,g,k),v?v.alias.push(O):(B=B||O,B!==O&&B.alias.push(O),S&&p.name&&!Cd(O)&&o(p.name)),xm(O)&&c(O),C.children){const $=C.children;for(let T=0;T<$.length;T++)i($[T],O,v&&v.children[T])}v=v||O}return B?()=>{o(B)}:ci}function o(p){if(Rm(p)){const g=r.get(p);g&&(r.delete(p),n.splice(n.indexOf(g),1),g.children.forEach(o),g.alias.forEach(o))}else{const g=n.indexOf(p);g>-1&&(n.splice(g,1),p.record.name&&r.delete(p.record.name),p.children.forEach(o),p.alias.forEach(o))}}function l(){return n}function c(p){const g=$T(p,n);n.splice(g,0,p),p.record.name&&!Cd(p)&&r.set(p.record.name,p)}function u(p,g){let v,S={},C,k;if("name"in p&&p.name){if(v=r.get(p.name),!v)throw ms(We.MATCHER_NOT_FOUND,{location:p});k=v.record.name,S=Pe(Sd(g.params,v.keys.filter(B=>!B.optional).concat(v.parent?v.parent.keys.filter(B=>B.optional):[]).map(B=>B.name)),p.params&&Sd(p.params,v.keys.map(B=>B.name))),C=v.stringify(S)}else if(p.path!=null)C=p.path,v=n.find(B=>B.re.test(C)),v&&(S=v.parse(C),k=v.record.name);else{if(v=g.name?r.get(g.name):n.find(B=>B.re.test(g.path)),!v)throw ms(We.MATCHER_NOT_FOUND,{location:p,currentLocation:g});k=v.record.name,S=Pe({},g.params,p.params),C=v.stringify(S)}const N=[];let O=v;for(;O;)N.unshift(O.record),O=O.parent;return{name:k,path:C,params:S,matched:N,meta:BT(N)}}t.forEach(p=>i(p));function d(){n.length=0,r.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:d,getRoutes:l,getRecordMatcher:s}}function Sd(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Pd(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:jT(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function jT(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function Cd(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function BT(t){return t.reduce((e,n)=>Pe(e,n.meta),{})}function $T(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;Cm(t,e[i])<0?r=i:n=i+1}const s=qT(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function qT(t){let e=t;for(;e=e.parent;)if(xm(e)&&Cm(t,e)===0)return e}function xm({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function xd(t){const e=Ht(Ia),n=Ht(Gc),r=je(()=>{const c=qt(t.to);return e.resolve(c)}),s=je(()=>{const{matched:c}=r.value,{length:u}=c,d=c[u-1],p=n.matched;if(!d||!p.length)return-1;const g=p.findIndex(ps.bind(null,d));if(g>-1)return g;const v=kd(c[u-2]);return u>1&&kd(d)===v&&p[p.length-1].path!==v?p.findIndex(ps.bind(null,c[u-2])):g}),i=je(()=>s.value>-1&&zT(n.params,r.value.params)),o=je(()=>s.value>-1&&s.value===n.matched.length-1&&bm(n.params,r.value.params));function l(c={}){if(KT(c)){const u=e[qt(t.replace)?"replace":"push"](qt(t.to)).catch(ci);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:r,href:je(()=>r.value.href),isActive:i,isExactActive:o,navigate:l}}function HT(t){return t.length===1?t[0]:t}const WT=jp({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:xd,setup(t,{slots:e}){const n=Ni(xd(t)),{options:r}=Ht(Ia),s=je(()=>({[Dd(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Dd(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&HT(e.default(n));return t.custom?i:dm("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),GT=WT;function KT(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function zT(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!en(s)||s.length!==r.length||r.some((i,o)=>i.valueOf()!==s[o].valueOf()))return!1}return!0}function kd(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Dd=(t,e,n)=>t??e??n,QT=jp({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Ht(Yl),s=je(()=>t.route||r.value),i=Ht(Id,0),o=je(()=>{let u=qt(i);const{matched:d}=s.value;let p;for(;(p=d[u])&&!p.components;)u++;return u}),l=je(()=>s.value.matched[o.value]);Io(Id,je(()=>o.value+1)),Io(AT,l),Io(Yl,s);const c=Se();return Rn(()=>[c.value,l.value,t.name],([u,d,p],[g,v,S])=>{d&&(d.instances[p]=u,v&&v!==d&&u&&u===g&&(d.leaveGuards.size||(d.leaveGuards=v.leaveGuards),d.updateGuards.size||(d.updateGuards=v.updateGuards))),u&&d&&(!v||!ps(d,v)||!g)&&(d.enterCallbacks[p]||[]).forEach(C=>C(u))},{flush:"post"}),()=>{const u=s.value,d=t.name,p=l.value,g=p&&p.components[d];if(!g)return Nd(n.default,{Component:g,route:u});const v=p.props[d],S=v?v===!0?u.params:typeof v=="function"?v(u):v:null,k=dm(g,Pe({},S,e,{onVnodeUnmounted:N=>{N.component.isUnmounted&&(p.instances[d]=null)},ref:c}));return Nd(n.default,{Component:k,route:u})||k}}});function Nd(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const km=QT;function JT(t){const e=UT(t.routes,t),n=t.parseQuery||wT,r=t.stringifyQuery||wd,s=t.history,i=Ws(),o=Ws(),l=Ws(),c=Ky(Hn);let u=Hn;es&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=vl.bind(null,L=>""+L),p=vl.bind(null,iT),g=vl.bind(null,Ti);function v(L,ee){let Y,re;return Rm(L)?(Y=e.getRecordMatcher(L),re=ee):re=L,e.addRoute(re,Y)}function S(L){const ee=e.getRecordMatcher(L);ee&&e.removeRoute(ee)}function C(){return e.getRoutes().map(L=>L.record)}function k(L){return!!e.getRecordMatcher(L)}function N(L,ee){if(ee=Pe({},ee||c.value),typeof L=="string"){const A=El(n,L,ee.path),x=e.resolve({path:A.path},ee),j=s.createHref(A.fullPath);return Pe(A,x,{params:g(x.params),hash:Ti(A.hash),redirectedFrom:void 0,href:j})}let Y;if(L.path!=null)Y=Pe({},L,{path:El(n,L.path,ee.path).path});else{const A=Pe({},L.params);for(const x in A)A[x]==null&&delete A[x];Y=Pe({},L,{params:p(A)}),ee.params=p(ee.params)}const re=e.resolve(Y,ee),pe=L.hash||"";re.params=d(g(re.params));const ke=lT(r,Pe({},L,{hash:nT(pe),path:re.path})),E=s.createHref(ke);return Pe({fullPath:ke,hash:pe,query:r===wd?IT(L.query):L.query||{}},re,{redirectedFrom:void 0,href:E})}function O(L){return typeof L=="string"?El(n,L,c.value.path):Pe({},L)}function B(L,ee){if(u!==L)return ms(We.NAVIGATION_CANCELLED,{from:ee,to:L})}function G(L){return T(L)}function V(L){return G(Pe(O(L),{replace:!0}))}function $(L,ee){const Y=L.matched[L.matched.length-1];if(Y&&Y.redirect){const{redirect:re}=Y;let pe=typeof re=="function"?re(L,ee):re;return typeof pe=="string"&&(pe=pe.includes("?")||pe.includes("#")?pe=O(pe):{path:pe},pe.params={}),Pe({query:L.query,hash:L.hash,params:pe.path!=null?{}:L.params},pe)}}function T(L,ee){const Y=u=N(L),re=c.value,pe=L.state,ke=L.force,E=L.replace===!0,A=$(Y,re);if(A)return T(Pe(O(A),{state:typeof A=="object"?Pe({},pe,A.state):pe,force:ke,replace:E}),ee||Y);const x=Y;x.redirectedFrom=ee;let j;return!ke&&cT(r,re,Y)&&(j=ms(We.NAVIGATION_DUPLICATED,{to:x,from:re}),Bt(re,re,!0,!1)),(j?Promise.resolve(j):I(x,re)).catch(M=>gn(M)?gn(M,We.NAVIGATION_GUARD_REDIRECT)?M:Gt(M):ye(M,x,re)).then(M=>{if(M){if(gn(M,We.NAVIGATION_GUARD_REDIRECT))return T(Pe({replace:E},O(M.to),{state:typeof M.to=="object"?Pe({},pe,M.to.state):pe,force:ke}),ee||x)}else M=R(x,re,!0,E,pe);return b(x,re,M),M})}function _(L,ee){const Y=B(L,ee);return Y?Promise.reject(Y):Promise.resolve()}function y(L){const ee=Un.values().next().value;return ee&&typeof ee.runWithContext=="function"?ee.runWithContext(L):L()}function I(L,ee){let Y;const[re,pe,ke]=bT(L,ee);Y=wl(re.reverse(),"beforeRouteLeave",L,ee);for(const A of re)A.leaveGuards.forEach(x=>{Y.push(Jn(x,L,ee))});const E=_.bind(null,L,ee);return Y.push(E),Dt(Y).then(()=>{Y=[];for(const A of i.list())Y.push(Jn(A,L,ee));return Y.push(E),Dt(Y)}).then(()=>{Y=wl(pe,"beforeRouteUpdate",L,ee);for(const A of pe)A.updateGuards.forEach(x=>{Y.push(Jn(x,L,ee))});return Y.push(E),Dt(Y)}).then(()=>{Y=[];for(const A of ke)if(A.beforeEnter)if(en(A.beforeEnter))for(const x of A.beforeEnter)Y.push(Jn(x,L,ee));else Y.push(Jn(A.beforeEnter,L,ee));return Y.push(E),Dt(Y)}).then(()=>(L.matched.forEach(A=>A.enterCallbacks={}),Y=wl(ke,"beforeRouteEnter",L,ee,y),Y.push(E),Dt(Y))).then(()=>{Y=[];for(const A of o.list())Y.push(Jn(A,L,ee));return Y.push(E),Dt(Y)}).catch(A=>gn(A,We.NAVIGATION_CANCELLED)?A:Promise.reject(A))}function b(L,ee,Y){l.list().forEach(re=>y(()=>re(L,ee,Y)))}function R(L,ee,Y,re,pe){const ke=B(L,ee);if(ke)return ke;const E=ee===Hn,A=es?history.state:{};Y&&(re||E?s.replace(L.fullPath,Pe({scroll:E&&A&&A.scroll},pe)):s.push(L.fullPath,pe)),c.value=L,Bt(L,ee,Y,E),Gt()}let w;function Qe(){w||(w=s.listen((L,ee,Y)=>{if(!Vt.listening)return;const re=N(L),pe=$(re,Vt.currentRoute.value);if(pe){T(Pe(pe,{replace:!0,force:!0}),re).catch(ci);return}u=re;const ke=c.value;es&&_T(Td(ke.fullPath,Y.delta),wa()),I(re,ke).catch(E=>gn(E,We.NAVIGATION_ABORTED|We.NAVIGATION_CANCELLED)?E:gn(E,We.NAVIGATION_GUARD_REDIRECT)?(T(Pe(O(E.to),{force:!0}),re).then(A=>{gn(A,We.NAVIGATION_ABORTED|We.NAVIGATION_DUPLICATED)&&!Y.delta&&Y.type===Ql.pop&&s.go(-1,!1)}).catch(ci),Promise.reject()):(Y.delta&&s.go(-Y.delta,!1),ye(E,re,ke))).then(E=>{E=E||R(re,ke,!1),E&&(Y.delta&&!gn(E,We.NAVIGATION_CANCELLED)?s.go(-Y.delta,!1):Y.type===Ql.pop&&gn(E,We.NAVIGATION_ABORTED|We.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),b(re,ke,E)}).catch(ci)}))}let ot=Ws(),Oe=Ws(),ce;function ye(L,ee,Y){Gt(L);const re=Oe.list();return re.length?re.forEach(pe=>pe(L,ee,Y)):console.error(L),Promise.reject(L)}function Ot(){return ce&&c.value!==Hn?Promise.resolve():new Promise((L,ee)=>{ot.add([L,ee])})}function Gt(L){return ce||(ce=!L,Qe(),ot.list().forEach(([ee,Y])=>L?Y(L):ee()),ot.reset()),L}function Bt(L,ee,Y,re){const{scrollBehavior:pe}=t;if(!es||!pe)return Promise.resolve();const ke=!Y&&yT(Td(L.fullPath,0))||(re||!Y)&&history.state&&history.state.scroll||null;return Mc().then(()=>pe(L,ee,ke)).then(E=>E&&gT(E)).catch(E=>ye(E,L,ee))}const Be=L=>s.go(L);let $e;const Un=new Set,Vt={currentRoute:c,listening:!0,addRoute:v,removeRoute:S,clearRoutes:e.clearRoutes,hasRoute:k,getRoutes:C,resolve:N,options:t,push:G,replace:V,go:Be,back:()=>Be(-1),forward:()=>Be(1),beforeEach:i.add,beforeResolve:o.add,afterEach:l.add,onError:Oe.add,isReady:Ot,install(L){L.component("RouterLink",GT),L.component("RouterView",km),L.config.globalProperties.$router=Vt,Object.defineProperty(L.config.globalProperties,"$route",{enumerable:!0,get:()=>qt(c)}),es&&!$e&&c.value===Hn&&($e=!0,G(s.location).catch(re=>{}));const ee={};for(const re in Hn)Object.defineProperty(ee,re,{get:()=>c.value[re],enumerable:!0});L.provide(Ia,Vt),L.provide(Gc,Sp(ee)),L.provide(Yl,c);const Y=L.unmount;Un.add(L),L.unmount=function(){Un.delete(L),Un.size<1&&(u=Hn,w&&w(),w=null,c.value=Hn,$e=!1,ce=!1),Y()}}};function Dt(L){return L.reduce((ee,Y)=>ee.then(()=>y(Y)),Promise.resolve())}return Vt}function Aa(){return Ht(Ia)}function YT(t){return Ht(Gc)}/**
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
 */const Dm=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},XT=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Nm={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,c=s+2<t.length,u=c?t[s+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let g=(l&15)<<2|u>>6,v=u&63;c||(v=64,o||(g=64)),r.push(n[d],n[p],n[g],n[v])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Dm(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):XT(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||u==null||p==null)throw new ZT;const g=i<<2|l>>4;if(r.push(g),u!==64){const v=l<<4&240|u>>2;if(r.push(v),p!==64){const S=u<<6&192|p;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ZT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ew=function(t){const e=Dm(t);return Nm.encodeByteArray(e,!0)},Wo=function(t){return ew(t).replace(/\./g,"")},Om=function(t){try{return Nm.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function tw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const nw=()=>tw().__FIREBASE_DEFAULTS__,rw=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},sw=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Om(t[1]);return e&&JSON.parse(e)},ba=()=>{try{return nw()||rw()||sw()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Vm=t=>{var e,n;return(n=(e=ba())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},iw=t=>{const e=Vm(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Mm=()=>{var t;return(t=ba())===null||t===void 0?void 0:t.config},Lm=t=>{var e;return(e=ba())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class ow{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function aw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t),l="";return[Wo(JSON.stringify(n)),Wo(JSON.stringify(o)),l].join(".")}/**
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
 */function It(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(It())}function cw(){var t;const e=(t=ba())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function uw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function hw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function dw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function fw(){const t=It();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function pw(){return!cw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function mw(){try{return typeof indexedDB=="object"}catch{return!1}}function gw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
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
 */const _w="FirebaseError";class Fn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=_w,Object.setPrototypeOf(this,Fn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Mi.prototype.create)}}class Mi{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?yw(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Fn(s,l,r)}}function yw(t,e){return t.replace(vw,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const vw=/\{\$([^}]+)}/g;function Ew(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Go(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Od(i)&&Od(o)){if(!Go(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Od(t){return t!==null&&typeof t=="object"}/**
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
 */function Li(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Qs(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Js(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Tw(t,e){const n=new ww(t,e);return n.subscribe.bind(n)}class ww{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Iw(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Il),s.error===void 0&&(s.error=Il),s.complete===void 0&&(s.complete=Il);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Iw(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Il(){}/**
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
 */function rt(t){return t&&t._delegate?t._delegate:t}class Nr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Ar="[DEFAULT]";/**
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
 */class Aw{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new ow;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Rw(e))try{this.getOrInitializeService({instanceIdentifier:Ar})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Ar){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ar){return this.instances.has(e)}getOptions(e=Ar){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:bw(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ar){return this.component?this.component.multipleInstances?e:Ar:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bw(t){return t===Ar?void 0:t}function Rw(t){return t.instantiationMode==="EAGER"}/**
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
 */class Sw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Aw(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Ee;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Ee||(Ee={}));const Pw={debug:Ee.DEBUG,verbose:Ee.VERBOSE,info:Ee.INFO,warn:Ee.WARN,error:Ee.ERROR,silent:Ee.SILENT},Cw=Ee.INFO,xw={[Ee.DEBUG]:"log",[Ee.VERBOSE]:"log",[Ee.INFO]:"info",[Ee.WARN]:"warn",[Ee.ERROR]:"error"},kw=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=xw[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Kc{constructor(e){this.name=e,this._logLevel=Cw,this._logHandler=kw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Pw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Ee.DEBUG,...e),this._logHandler(this,Ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Ee.VERBOSE,...e),this._logHandler(this,Ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Ee.INFO,...e),this._logHandler(this,Ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Ee.WARN,...e),this._logHandler(this,Ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Ee.ERROR,...e),this._logHandler(this,Ee.ERROR,...e)}}const Dw=(t,e)=>e.some(n=>t instanceof n);let Vd,Md;function Nw(){return Vd||(Vd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ow(){return Md||(Md=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Fm=new WeakMap,Xl=new WeakMap,Um=new WeakMap,Al=new WeakMap,zc=new WeakMap;function Vw(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(sr(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Fm.set(n,t)}).catch(()=>{}),zc.set(e,t),e}function Mw(t){if(Xl.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Xl.set(t,e)}let Zl={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Xl.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Um.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return sr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Lw(t){Zl=t(Zl)}function Fw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(bl(this),e,...n);return Um.set(r,e.sort?e.sort():[e]),sr(r)}:Ow().includes(t)?function(...e){return t.apply(bl(this),e),sr(Fm.get(this))}:function(...e){return sr(t.apply(bl(this),e))}}function Uw(t){return typeof t=="function"?Fw(t):(t instanceof IDBTransaction&&Mw(t),Dw(t,Nw())?new Proxy(t,Zl):t)}function sr(t){if(t instanceof IDBRequest)return Vw(t);if(Al.has(t))return Al.get(t);const e=Uw(t);return e!==t&&(Al.set(t,e),zc.set(e,t)),e}const bl=t=>zc.get(t);function jw(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=sr(o);return r&&o.addEventListener("upgradeneeded",c=>{r(sr(o.result),c.oldVersion,c.newVersion,sr(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const Bw=["get","getKey","getAll","getAllKeys","count"],$w=["put","add","delete","clear"],Rl=new Map;function Ld(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Rl.get(e))return Rl.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=$w.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Bw.includes(n)))return;const i=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),s&&c.done]))[0]};return Rl.set(e,i),i}Lw(t=>({...t,get:(e,n,r)=>Ld(e,n)||t.get(e,n,r),has:(e,n)=>!!Ld(e,n)||t.has(e,n)}));/**
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
 */class qw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Hw(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Hw(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ec="@firebase/app",Fd="0.10.13";/**
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
 */const Dn=new Kc("@firebase/app"),Ww="@firebase/app-compat",Gw="@firebase/analytics-compat",Kw="@firebase/analytics",zw="@firebase/app-check-compat",Qw="@firebase/app-check",Jw="@firebase/auth",Yw="@firebase/auth-compat",Xw="@firebase/database",Zw="@firebase/data-connect",eI="@firebase/database-compat",tI="@firebase/functions",nI="@firebase/functions-compat",rI="@firebase/installations",sI="@firebase/installations-compat",iI="@firebase/messaging",oI="@firebase/messaging-compat",aI="@firebase/performance",lI="@firebase/performance-compat",cI="@firebase/remote-config",uI="@firebase/remote-config-compat",hI="@firebase/storage",dI="@firebase/storage-compat",fI="@firebase/firestore",pI="@firebase/vertexai-preview",mI="@firebase/firestore-compat",gI="firebase",_I="10.14.1";/**
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
 */const tc="[DEFAULT]",yI={[ec]:"fire-core",[Ww]:"fire-core-compat",[Kw]:"fire-analytics",[Gw]:"fire-analytics-compat",[Qw]:"fire-app-check",[zw]:"fire-app-check-compat",[Jw]:"fire-auth",[Yw]:"fire-auth-compat",[Xw]:"fire-rtdb",[Zw]:"fire-data-connect",[eI]:"fire-rtdb-compat",[tI]:"fire-fn",[nI]:"fire-fn-compat",[rI]:"fire-iid",[sI]:"fire-iid-compat",[iI]:"fire-fcm",[oI]:"fire-fcm-compat",[aI]:"fire-perf",[lI]:"fire-perf-compat",[cI]:"fire-rc",[uI]:"fire-rc-compat",[hI]:"fire-gcs",[dI]:"fire-gcs-compat",[fI]:"fire-fst",[mI]:"fire-fst-compat",[pI]:"fire-vertex","fire-js":"fire-js",[gI]:"fire-js-all"};/**
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
 */const Ko=new Map,vI=new Map,nc=new Map;function Ud(t,e){try{t.container.addComponent(e)}catch(n){Dn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function gs(t){const e=t.name;if(nc.has(e))return Dn.debug(`There were multiple attempts to register component ${e}.`),!1;nc.set(e,t);for(const n of Ko.values())Ud(n,t);for(const n of vI.values())Ud(n,t);return!0}function Qc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function zt(t){return t.settings!==void 0}/**
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
 */const EI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ir=new Mi("app","Firebase",EI);/**
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
 */class TI{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Nr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ir.create("app-deleted",{appName:this._name})}}/**
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
 */const As=_I;function jm(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:tc,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw ir.create("bad-app-name",{appName:String(s)});if(n||(n=Mm()),!n)throw ir.create("no-options");const i=Ko.get(s);if(i){if(Go(n,i.options)&&Go(r,i.config))return i;throw ir.create("duplicate-app",{appName:s})}const o=new Sw(s);for(const c of nc.values())o.addComponent(c);const l=new TI(n,r,o);return Ko.set(s,l),l}function Bm(t=tc){const e=Ko.get(t);if(!e&&t===tc&&Mm())return jm();if(!e)throw ir.create("no-app",{appName:t});return e}function or(t,e,n){var r;let s=(r=yI[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Dn.warn(l.join(" "));return}gs(new Nr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const wI="firebase-heartbeat-database",II=1,wi="firebase-heartbeat-store";let Sl=null;function $m(){return Sl||(Sl=jw(wI,II,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(wi)}catch(n){console.warn(n)}}}}).catch(t=>{throw ir.create("idb-open",{originalErrorMessage:t.message})})),Sl}async function AI(t){try{const n=(await $m()).transaction(wi),r=await n.objectStore(wi).get(qm(t));return await n.done,r}catch(e){if(e instanceof Fn)Dn.warn(e.message);else{const n=ir.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Dn.warn(n.message)}}}async function jd(t,e){try{const r=(await $m()).transaction(wi,"readwrite");await r.objectStore(wi).put(e,qm(t)),await r.done}catch(n){if(n instanceof Fn)Dn.warn(n.message);else{const r=ir.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Dn.warn(r.message)}}}function qm(t){return`${t.name}!${t.options.appId}`}/**
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
 */const bI=1024,RI=30*24*60*60*1e3;class SI{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new CI(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Bd();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=RI}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Dn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Bd(),{heartbeatsToSend:r,unsentEntries:s}=PI(this._heartbeatsCache.heartbeats),i=Wo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Dn.warn(n),""}}}function Bd(){return new Date().toISOString().substring(0,10)}function PI(t,e=bI){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),$d(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),$d(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class CI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return mw()?gw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await AI(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return jd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return jd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function $d(t){return Wo(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function xI(t){gs(new Nr("platform-logger",e=>new qw(e),"PRIVATE")),gs(new Nr("heartbeat",e=>new SI(e),"PRIVATE")),or(ec,Fd,t),or(ec,Fd,"esm2017"),or("fire-js","")}xI("");var kI="firebase",DI="10.14.1";/**
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
 */or(kI,DI,"app");function Jc(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Hm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const NI=Hm,Wm=new Mi("auth","Firebase",Hm());/**
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
 */const zo=new Kc("@firebase/auth");function OI(t,...e){zo.logLevel<=Ee.WARN&&zo.warn(`Auth (${As}): ${t}`,...e)}function Po(t,...e){zo.logLevel<=Ee.ERROR&&zo.error(`Auth (${As}): ${t}`,...e)}/**
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
 */function Wt(t,...e){throw Xc(t,...e)}function Yt(t,...e){return Xc(t,...e)}function Yc(t,e,n){const r=Object.assign(Object.assign({},NI()),{[e]:n});return new Mi("auth","Firebase",r).create(e,{appName:t.name})}function Sn(t){return Yc(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function VI(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&Wt(t,"argument-error"),Yc(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Xc(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Wm.create(t,...e)}function le(t,e,...n){if(!t)throw Xc(e,...n)}function wn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Po(e),new Error(e)}function Nn(t,e){t||wn(e)}/**
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
 */function rc(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function MI(){return qd()==="http:"||qd()==="https:"}function qd(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function LI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(MI()||hw()||"connection"in navigator)?navigator.onLine:!0}function FI(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Fi{constructor(e,n){this.shortDelay=e,this.longDelay=n,Nn(n>e,"Short delay should be less than long delay!"),this.isMobile=lw()||dw()}get(){return LI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Zc(t,e){Nn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Gm{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const UI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const jI=new Fi(3e4,6e4);function fr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function pr(t,e,n,r,s={}){return Km(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=Li(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const u=Object.assign({method:e,headers:c},i);return uw()||(u.referrerPolicy="no-referrer"),Gm.fetch()(zm(t,t.config.apiHost,n,l),u)})}async function Km(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},UI),e);try{const s=new $I(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw go(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw go(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw go(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw go(t,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Yc(t,d,u);Wt(t,d)}}catch(s){if(s instanceof Fn)throw s;Wt(t,"network-request-failed",{message:String(s)})}}async function Ui(t,e,n,r,s={}){const i=await pr(t,e,n,r,s);return"mfaPendingCredential"in i&&Wt(t,"multi-factor-auth-required",{_serverResponse:i}),i}function zm(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Zc(t.config,s):`${t.config.apiScheme}://${s}`}function BI(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class $I{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Yt(this.auth,"network-request-failed")),jI.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function go(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Yt(t,e,r);return s.customData._tokenResponse=n,s}function Hd(t){return t!==void 0&&t.enterprise!==void 0}class qI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return BI(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function HI(t,e){return pr(t,"GET","/v2/recaptchaConfig",fr(t,e))}/**
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
 */async function WI(t,e){return pr(t,"POST","/v1/accounts:delete",e)}async function Qm(t,e){return pr(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function ui(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function GI(t,e=!1){const n=rt(t),r=await n.getIdToken(e),s=eu(r);le(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ui(Pl(s.auth_time)),issuedAtTime:ui(Pl(s.iat)),expirationTime:ui(Pl(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Pl(t){return Number(t)*1e3}function eu(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Po("JWT malformed, contained fewer than 3 sections"),null;try{const s=Om(n);return s?JSON.parse(s):(Po("Failed to decode base64 JWT payload"),null)}catch(s){return Po("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Wd(t){const e=eu(t);return le(e,"internal-error"),le(typeof e.exp<"u","internal-error"),le(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ii(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Fn&&KI(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function KI({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class zI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class sc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ui(this.lastLoginAt),this.creationTime=ui(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Qo(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Ii(t,Qm(n,{idToken:r}));le(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Jm(i.providerUserInfo):[],l=JI(t.providerData,o),c=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),d=c?u:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new sc(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,p)}async function QI(t){const e=rt(t);await Qo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function JI(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Jm(t){return t.map(e=>{var{providerId:n}=e,r=Jc(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function YI(t,e){const n=await Km(t,{},async()=>{const r=Li({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=zm(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Gm.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function XI(t,e){return pr(t,"POST","/v2/accounts:revokeToken",fr(t,e))}/**
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
 */class ls{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){le(e.idToken,"internal-error"),le(typeof e.idToken<"u","internal-error"),le(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Wd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){le(e.length!==0,"internal-error");const n=Wd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(le(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await YI(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new ls;return r&&(le(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(le(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(le(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ls,this.toJSON())}_performRefresh(){return wn("not implemented")}}/**
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
 */function Wn(t,e){le(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class In{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Jc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new zI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new sc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ii(this,this.stsTokenManager.getToken(this.auth,e));return le(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return GI(this,e)}reload(){return QI(this)}_assign(e){this!==e&&(le(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new In(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){le(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Qo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(zt(this.auth.app))return Promise.reject(Sn(this.auth));const e=await this.getIdToken();return await Ii(this,WI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,c,u,d;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(s=n.email)!==null&&s!==void 0?s:void 0,v=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,S=(o=n.photoURL)!==null&&o!==void 0?o:void 0,C=(l=n.tenantId)!==null&&l!==void 0?l:void 0,k=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,N=(u=n.createdAt)!==null&&u!==void 0?u:void 0,O=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:B,emailVerified:G,isAnonymous:V,providerData:$,stsTokenManager:T}=n;le(B&&T,e,"internal-error");const _=ls.fromJSON(this.name,T);le(typeof B=="string",e,"internal-error"),Wn(p,e.name),Wn(g,e.name),le(typeof G=="boolean",e,"internal-error"),le(typeof V=="boolean",e,"internal-error"),Wn(v,e.name),Wn(S,e.name),Wn(C,e.name),Wn(k,e.name),Wn(N,e.name),Wn(O,e.name);const y=new In({uid:B,auth:e,email:g,emailVerified:G,displayName:p,isAnonymous:V,photoURL:S,phoneNumber:v,tenantId:C,stsTokenManager:_,createdAt:N,lastLoginAt:O});return $&&Array.isArray($)&&(y.providerData=$.map(I=>Object.assign({},I))),k&&(y._redirectEventId=k),y}static async _fromIdTokenResponse(e,n,r=!1){const s=new ls;s.updateFromServerResponse(n);const i=new In({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Qo(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];le(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Jm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new ls;l.updateFromIdToken(r);const c=new In({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new sc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,u),c}}/**
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
 */const Gd=new Map;function An(t){Nn(t instanceof Function,"Expected a class definition");let e=Gd.get(t);return e?(Nn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Gd.set(t,e),e)}/**
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
 */class Ym{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Ym.type="NONE";const Kd=Ym;/**
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
 */function Co(t,e,n){return`firebase:${t}:${e}:${n}`}class cs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Co(this.userKey,s.apiKey,i),this.fullPersistenceKey=Co("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?In._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new cs(An(Kd),e,r);const s=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||An(Kd);const o=Co(r,e.config.apiKey,e.name);let l=null;for(const u of n)try{const d=await u._get(o);if(d){const p=In._fromJSON(e,d);u!==i&&(l=p),i=u;break}}catch{}const c=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new cs(i,e,r):(i=c[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new cs(i,e,r))}}/**
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
 */function zd(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(tg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Xm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(rg(e))return"Blackberry";if(sg(e))return"Webos";if(Zm(e))return"Safari";if((e.includes("chrome/")||eg(e))&&!e.includes("edge/"))return"Chrome";if(ng(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Xm(t=It()){return/firefox\//i.test(t)}function Zm(t=It()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function eg(t=It()){return/crios\//i.test(t)}function tg(t=It()){return/iemobile/i.test(t)}function ng(t=It()){return/android/i.test(t)}function rg(t=It()){return/blackberry/i.test(t)}function sg(t=It()){return/webos/i.test(t)}function tu(t=It()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ZI(t=It()){var e;return tu(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function e0(){return fw()&&document.documentMode===10}function ig(t=It()){return tu(t)||ng(t)||sg(t)||rg(t)||/windows phone/i.test(t)||tg(t)}/**
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
 */function og(t,e=[]){let n;switch(t){case"Browser":n=zd(It());break;case"Worker":n=`${zd(It())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${As}/${r}`}/**
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
 */class t0{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const c=e(i);o(c)}catch(c){l(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function n0(t,e={}){return pr(t,"GET","/v2/passwordPolicy",fr(t,e))}/**
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
 */const r0=6;class s0{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:r0,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class i0{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Qd(this),this.idTokenSubscription=new Qd(this),this.beforeStateQueue=new t0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=An(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await cs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Qm(this,{idToken:e}),r=await In._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(zt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return le(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Qo(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=FI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(zt(this.app))return Promise.reject(Sn(this));const n=e?rt(e):null;return n&&le(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&le(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return zt(this.app)?Promise.reject(Sn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return zt(this.app)?Promise.reject(Sn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(An(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await n0(this),n=new s0(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Mi("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await XI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&An(e)||this._popupRedirectResolver;le(n,this,"argument-error"),this.redirectPersistenceManager=await cs.create(this,[An(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(le(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return le(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=og(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&OI(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function mr(t){return rt(t)}class Qd{constructor(e){this.auth=e,this.observer=null,this.addObserver=Tw(n=>this.observer=n)}get next(){return le(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ra={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function o0(t){Ra=t}function ag(t){return Ra.loadJS(t)}function a0(){return Ra.recaptchaEnterpriseScript}function l0(){return Ra.gapiScript}function c0(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const u0="recaptcha-enterprise",h0="NO_RECAPTCHA";class d0{constructor(e){this.type=u0,this.auth=mr(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{HI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const u=new qI(c);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(c=>{l(c)})})}function s(i,o,l){const c=window.grecaptcha;Hd(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(h0)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&Hd(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=a0();c.length!==0&&(c+=l),ag(c).then(()=>{s(l,i,o)}).catch(u=>{o(u)})}}).catch(l=>{o(l)})})}}async function Jd(t,e,n,r=!1){const s=new d0(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function ic(t,e,n,r){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Jd(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Jd(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
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
 */function f0(t,e){const n=Qc(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Go(i,e??{}))return s;Wt(s,"already-initialized")}return n.initialize({options:e})}function p0(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(An);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function m0(t,e,n){const r=mr(t);le(r._canInitEmulator,r,"emulator-config-failed"),le(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=lg(e),{host:o,port:l}=g0(e),c=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||_0()}function lg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function g0(t){const e=lg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Yd(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Yd(o)}}}function Yd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function _0(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class nu{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return wn("not implemented")}_getIdTokenResponse(e){return wn("not implemented")}_linkToIdToken(e,n){return wn("not implemented")}_getReauthenticationResolver(e){return wn("not implemented")}}async function y0(t,e){return pr(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function v0(t,e){return Ui(t,"POST","/v1/accounts:signInWithPassword",fr(t,e))}/**
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
 */async function E0(t,e){return Ui(t,"POST","/v1/accounts:signInWithEmailLink",fr(t,e))}async function T0(t,e){return Ui(t,"POST","/v1/accounts:signInWithEmailLink",fr(t,e))}/**
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
 */class Ai extends nu{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Ai(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Ai(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ic(e,n,"signInWithPassword",v0);case"emailLink":return E0(e,{email:this._email,oobCode:this._password});default:Wt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ic(e,r,"signUpPassword",y0);case"emailLink":return T0(e,{idToken:n,email:this._email,oobCode:this._password});default:Wt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function us(t,e){return Ui(t,"POST","/v1/accounts:signInWithIdp",fr(t,e))}/**
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
 */const w0="http://localhost";class Or extends nu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Or(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Wt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Jc(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Or(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return us(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,us(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,us(e,n)}buildRequest(){const e={requestUri:w0,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Li(n)}return e}}/**
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
 */function I0(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function A0(t){const e=Qs(Js(t)).link,n=e?Qs(Js(e)).deep_link_id:null,r=Qs(Js(t)).deep_link_id;return(r?Qs(Js(r)).link:null)||r||n||e||t}class ru{constructor(e){var n,r,s,i,o,l;const c=Qs(Js(e)),u=(n=c.apiKey)!==null&&n!==void 0?n:null,d=(r=c.oobCode)!==null&&r!==void 0?r:null,p=I0((s=c.mode)!==null&&s!==void 0?s:null);le(u&&d&&p,"argument-error"),this.apiKey=u,this.operation=p,this.code=d,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=A0(e);try{return new ru(n)}catch{return null}}}/**
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
 */class bs{constructor(){this.providerId=bs.PROVIDER_ID}static credential(e,n){return Ai._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=ru.parseLink(n);return le(r,"argument-error"),Ai._fromEmailAndCode(e,r.code,r.tenantId)}}bs.PROVIDER_ID="password";bs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";bs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class su{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ji extends su{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Yn extends ji{constructor(){super("facebook.com")}static credential(e){return Or._fromParams({providerId:Yn.PROVIDER_ID,signInMethod:Yn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Yn.credentialFromTaggedObject(e)}static credentialFromError(e){return Yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Yn.credential(e.oauthAccessToken)}catch{return null}}}Yn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Yn.PROVIDER_ID="facebook.com";/**
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
 */class Tn extends ji{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Or._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Tn.credential(n,r)}catch{return null}}}Tn.GOOGLE_SIGN_IN_METHOD="google.com";Tn.PROVIDER_ID="google.com";/**
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
 */class Xn extends ji{constructor(){super("github.com")}static credential(e){return Or._fromParams({providerId:Xn.PROVIDER_ID,signInMethod:Xn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xn.credentialFromTaggedObject(e)}static credentialFromError(e){return Xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xn.credential(e.oauthAccessToken)}catch{return null}}}Xn.GITHUB_SIGN_IN_METHOD="github.com";Xn.PROVIDER_ID="github.com";/**
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
 */class Zn extends ji{constructor(){super("twitter.com")}static credential(e,n){return Or._fromParams({providerId:Zn.PROVIDER_ID,signInMethod:Zn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Zn.credentialFromTaggedObject(e)}static credentialFromError(e){return Zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Zn.credential(n,r)}catch{return null}}}Zn.TWITTER_SIGN_IN_METHOD="twitter.com";Zn.PROVIDER_ID="twitter.com";/**
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
 */async function b0(t,e){return Ui(t,"POST","/v1/accounts:signUp",fr(t,e))}/**
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
 */class Vr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await In._fromIdTokenResponse(e,r,s),o=Xd(r);return new Vr({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Xd(r);return new Vr({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Xd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Jo extends Fn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Jo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Jo(e,n,r,s)}}function cg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Jo._fromErrorAndOperation(t,i,e,r):i})}async function R0(t,e,n=!1){const r=await Ii(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Vr._forOperation(t,"link",r)}/**
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
 */async function S0(t,e,n=!1){const{auth:r}=t;if(zt(r.app))return Promise.reject(Sn(r));const s="reauthenticate";try{const i=await Ii(t,cg(r,s,e,t),n);le(i.idToken,r,"internal-error");const o=eu(i.idToken);le(o,r,"internal-error");const{sub:l}=o;return le(t.uid===l,r,"user-mismatch"),Vr._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Wt(r,"user-mismatch"),i}}/**
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
 */async function ug(t,e,n=!1){if(zt(t.app))return Promise.reject(Sn(t));const r="signIn",s=await cg(t,r,e),i=await Vr._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function P0(t,e){return ug(mr(t),e)}/**
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
 */async function hg(t){const e=mr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function C0(t,e,n){if(zt(t.app))return Promise.reject(Sn(t));const r=mr(t),o=await ic(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",b0).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&hg(t),c}),l=await Vr._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function x0(t,e,n){return zt(t.app)?Promise.reject(Sn(t)):P0(rt(t),bs.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&hg(t),r})}function k0(t,e,n,r){return rt(t).onIdTokenChanged(e,n,r)}function D0(t,e,n){return rt(t).beforeAuthStateChanged(e,n)}function iu(t,e,n,r){return rt(t).onAuthStateChanged(e,n,r)}function N0(t){return rt(t).signOut()}const Yo="__sak";/**
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
 */class dg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Yo,"1"),this.storage.removeItem(Yo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const O0=1e3,V0=10;class fg extends dg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ig(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);e0()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,V0):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},O0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}fg.type="LOCAL";const M0=fg;/**
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
 */class pg extends dg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}pg.type="SESSION";const mg=pg;/**
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
 */function L0(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Sa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Sa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async u=>u(n.origin,i)),c=await L0(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Sa.receivers=[];/**
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
 */function ou(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class F0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,c)=>{const u=ou("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===u)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function an(){return window}function U0(t){an().location.href=t}/**
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
 */function gg(){return typeof an().WorkerGlobalScope<"u"&&typeof an().importScripts=="function"}async function j0(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function B0(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function $0(){return gg()?self:null}/**
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
 */const _g="firebaseLocalStorageDb",q0=1,Xo="firebaseLocalStorage",yg="fbase_key";class Bi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Pa(t,e){return t.transaction([Xo],e?"readwrite":"readonly").objectStore(Xo)}function H0(){const t=indexedDB.deleteDatabase(_g);return new Bi(t).toPromise()}function oc(){const t=indexedDB.open(_g,q0);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Xo,{keyPath:yg})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Xo)?e(r):(r.close(),await H0(),e(await oc()))})})}async function Zd(t,e,n){const r=Pa(t,!0).put({[yg]:e,value:n});return new Bi(r).toPromise()}async function W0(t,e){const n=Pa(t,!1).get(e),r=await new Bi(n).toPromise();return r===void 0?null:r.value}function ef(t,e){const n=Pa(t,!0).delete(e);return new Bi(n).toPromise()}const G0=800,K0=3;class vg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await oc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>K0)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return gg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Sa._getInstance($0()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await j0(),!this.activeServiceWorker)return;this.sender=new F0(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||B0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await oc();return await Zd(e,Yo,"1"),await ef(e,Yo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Zd(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>W0(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>ef(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Pa(s,!1).getAll();return new Bi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),G0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}vg.type="LOCAL";const z0=vg;new Fi(3e4,6e4);/**
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
 */function Eg(t,e){return e?An(e):(le(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class au extends nu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return us(e,this._buildIdpRequest())}_linkToIdToken(e,n){return us(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return us(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Q0(t){return ug(t.auth,new au(t),t.bypassAuthState)}function J0(t){const{auth:e,user:n}=t;return le(n,e,"internal-error"),S0(n,new au(t),t.bypassAuthState)}async function Y0(t){const{auth:e,user:n}=t;return le(n,e,"internal-error"),R0(n,new au(t),t.bypassAuthState)}/**
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
 */class Tg{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Q0;case"linkViaPopup":case"linkViaRedirect":return Y0;case"reauthViaPopup":case"reauthViaRedirect":return J0;default:Wt(this.auth,"internal-error")}}resolve(e){Nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const X0=new Fi(2e3,1e4);async function Z0(t,e,n){if(zt(t.app))return Promise.reject(Yt(t,"operation-not-supported-in-this-environment"));const r=mr(t);VI(t,e,su);const s=Eg(r,n);return new Sr(r,"signInViaPopup",e,s).executeNotNull()}class Sr extends Tg{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Sr.currentPopupAction&&Sr.currentPopupAction.cancel(),Sr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return le(e,this.auth,"internal-error"),e}async onExecution(){Nn(this.filter.length===1,"Popup operations only handle one event");const e=ou();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Sr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Yt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,X0.get())};e()}}Sr.currentPopupAction=null;/**
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
 */const eA="pendingRedirect",xo=new Map;class tA extends Tg{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=xo.get(this.auth._key());if(!e){try{const r=await nA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}xo.set(this.auth._key(),e)}return this.bypassAuthState||xo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function nA(t,e){const n=iA(e),r=sA(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function rA(t,e){xo.set(t._key(),e)}function sA(t){return An(t._redirectPersistence)}function iA(t){return Co(eA,t.config.apiKey,t.name)}async function oA(t,e,n=!1){if(zt(t.app))return Promise.reject(Sn(t));const r=mr(t),s=Eg(r,e),o=await new tA(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const aA=10*60*1e3;class lA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cA(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!wg(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Yt(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=aA&&this.cachedEventUids.clear(),this.cachedEventUids.has(tf(e))}saveEventToCache(e){this.cachedEventUids.add(tf(e)),this.lastProcessedEventTime=Date.now()}}function tf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function wg({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cA(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return wg(t);default:return!1}}/**
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
 */async function uA(t,e={}){return pr(t,"GET","/v1/projects",e)}/**
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
 */const hA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dA=/^https?/;async function fA(t){if(t.config.emulator)return;const{authorizedDomains:e}=await uA(t);for(const n of e)try{if(pA(n))return}catch{}Wt(t,"unauthorized-domain")}function pA(t){const e=rc(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!dA.test(n))return!1;if(hA.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const mA=new Fi(3e4,6e4);function nf(){const t=an().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function gA(t){return new Promise((e,n)=>{var r,s,i;function o(){nf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{nf(),n(Yt(t,"network-request-failed"))},timeout:mA.get()})}if(!((s=(r=an().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=an().gapi)===null||i===void 0)&&i.load)o();else{const l=c0("iframefcb");return an()[l]=()=>{gapi.load?o():n(Yt(t,"network-request-failed"))},ag(`${l0()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw ko=null,e})}let ko=null;function _A(t){return ko=ko||gA(t),ko}/**
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
 */const yA=new Fi(5e3,15e3),vA="__/auth/iframe",EA="emulator/auth/iframe",TA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function IA(t){const e=t.config;le(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Zc(e,EA):`https://${t.config.authDomain}/${vA}`,r={apiKey:e.apiKey,appName:t.name,v:As},s=wA.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Li(r).slice(1)}`}async function AA(t){const e=await _A(t),n=an().gapi;return le(n,t,"internal-error"),e.open({where:document.body,url:IA(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:TA,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Yt(t,"network-request-failed"),l=an().setTimeout(()=>{i(o)},yA.get());function c(){an().clearTimeout(l),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const bA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},RA=500,SA=600,PA="_blank",CA="http://localhost";class rf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function xA(t,e,n,r=RA,s=SA){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},bA),{width:r.toString(),height:s.toString(),top:i,left:o}),u=It().toLowerCase();n&&(l=eg(u)?PA:n),Xm(u)&&(e=e||CA,c.scrollbars="yes");const d=Object.entries(c).reduce((g,[v,S])=>`${g}${v}=${S},`,"");if(ZI(u)&&l!=="_self")return kA(e||"",l),new rf(null);const p=window.open(e||"",l,d);le(p,t,"popup-blocked");try{p.focus()}catch{}return new rf(p)}function kA(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const DA="__/auth/handler",NA="emulator/auth/handler",OA=encodeURIComponent("fac");async function sf(t,e,n,r,s,i){le(t.config.authDomain,t,"auth-domain-config-required"),le(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:As,eventId:s};if(e instanceof su){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Ew(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries(i||{}))o[d]=p}if(e instanceof ji){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await t._getAppCheckToken(),u=c?`#${OA}=${encodeURIComponent(c)}`:"";return`${VA(t)}?${Li(l).slice(1)}${u}`}function VA({config:t}){return t.emulator?Zc(t,NA):`https://${t.authDomain}/${DA}`}/**
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
 */const Cl="webStorageSupport";class MA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=mg,this._completeRedirectFn=oA,this._overrideRedirectResult=rA}async _openPopup(e,n,r,s){var i;Nn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await sf(e,n,r,rc(),s);return xA(e,o,ou())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await sf(e,n,r,rc(),s);return U0(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Nn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await AA(e),r=new lA(e);return n.register("authEvent",s=>(le(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Cl,{type:Cl},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Cl];o!==void 0&&n(!!o),Wt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=fA(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return ig()||Zm()||tu()}}const LA=MA;var of="@firebase/auth",af="1.7.9";/**
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
 */class FA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){le(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function UA(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function jA(t){gs(new Nr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;le(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:og(t)},u=new i0(r,s,i,c);return p0(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),gs(new Nr("auth-internal",e=>{const n=mr(e.getProvider("auth").getImmediate());return(r=>new FA(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),or(of,af,UA(t)),or(of,af,"esm2017")}/**
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
 */const BA=5*60,$A=Lm("authIdTokenMaxAge")||BA;let lf=null;const qA=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>$A)return;const s=n==null?void 0:n.token;lf!==s&&(lf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function HA(t=Bm()){const e=Qc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=f0(t,{popupRedirectResolver:LA,persistence:[z0,M0,mg]}),r=Lm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=qA(i.toString());D0(n,o,()=>o(n.currentUser)),k0(n,l=>o(l))}}const s=Vm("auth");return s&&m0(n,`http://${s}`),n}function WA(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}o0({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Yt("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",WA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});jA("Browser");var cf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var kr,Ig;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,_){function y(){}y.prototype=_.prototype,T.D=_.prototype,T.prototype=new y,T.prototype.constructor=T,T.C=function(I,b,R){for(var w=Array(arguments.length-2),Qe=2;Qe<arguments.length;Qe++)w[Qe-2]=arguments[Qe];return _.prototype[b].apply(I,w)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,_,y){y||(y=0);var I=Array(16);if(typeof _=="string")for(var b=0;16>b;++b)I[b]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(b=0;16>b;++b)I[b]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=T.g[0],y=T.g[1],b=T.g[2];var R=T.g[3],w=_+(R^y&(b^R))+I[0]+3614090360&4294967295;_=y+(w<<7&4294967295|w>>>25),w=R+(b^_&(y^b))+I[1]+3905402710&4294967295,R=_+(w<<12&4294967295|w>>>20),w=b+(y^R&(_^y))+I[2]+606105819&4294967295,b=R+(w<<17&4294967295|w>>>15),w=y+(_^b&(R^_))+I[3]+3250441966&4294967295,y=b+(w<<22&4294967295|w>>>10),w=_+(R^y&(b^R))+I[4]+4118548399&4294967295,_=y+(w<<7&4294967295|w>>>25),w=R+(b^_&(y^b))+I[5]+1200080426&4294967295,R=_+(w<<12&4294967295|w>>>20),w=b+(y^R&(_^y))+I[6]+2821735955&4294967295,b=R+(w<<17&4294967295|w>>>15),w=y+(_^b&(R^_))+I[7]+4249261313&4294967295,y=b+(w<<22&4294967295|w>>>10),w=_+(R^y&(b^R))+I[8]+1770035416&4294967295,_=y+(w<<7&4294967295|w>>>25),w=R+(b^_&(y^b))+I[9]+2336552879&4294967295,R=_+(w<<12&4294967295|w>>>20),w=b+(y^R&(_^y))+I[10]+4294925233&4294967295,b=R+(w<<17&4294967295|w>>>15),w=y+(_^b&(R^_))+I[11]+2304563134&4294967295,y=b+(w<<22&4294967295|w>>>10),w=_+(R^y&(b^R))+I[12]+1804603682&4294967295,_=y+(w<<7&4294967295|w>>>25),w=R+(b^_&(y^b))+I[13]+4254626195&4294967295,R=_+(w<<12&4294967295|w>>>20),w=b+(y^R&(_^y))+I[14]+2792965006&4294967295,b=R+(w<<17&4294967295|w>>>15),w=y+(_^b&(R^_))+I[15]+1236535329&4294967295,y=b+(w<<22&4294967295|w>>>10),w=_+(b^R&(y^b))+I[1]+4129170786&4294967295,_=y+(w<<5&4294967295|w>>>27),w=R+(y^b&(_^y))+I[6]+3225465664&4294967295,R=_+(w<<9&4294967295|w>>>23),w=b+(_^y&(R^_))+I[11]+643717713&4294967295,b=R+(w<<14&4294967295|w>>>18),w=y+(R^_&(b^R))+I[0]+3921069994&4294967295,y=b+(w<<20&4294967295|w>>>12),w=_+(b^R&(y^b))+I[5]+3593408605&4294967295,_=y+(w<<5&4294967295|w>>>27),w=R+(y^b&(_^y))+I[10]+38016083&4294967295,R=_+(w<<9&4294967295|w>>>23),w=b+(_^y&(R^_))+I[15]+3634488961&4294967295,b=R+(w<<14&4294967295|w>>>18),w=y+(R^_&(b^R))+I[4]+3889429448&4294967295,y=b+(w<<20&4294967295|w>>>12),w=_+(b^R&(y^b))+I[9]+568446438&4294967295,_=y+(w<<5&4294967295|w>>>27),w=R+(y^b&(_^y))+I[14]+3275163606&4294967295,R=_+(w<<9&4294967295|w>>>23),w=b+(_^y&(R^_))+I[3]+4107603335&4294967295,b=R+(w<<14&4294967295|w>>>18),w=y+(R^_&(b^R))+I[8]+1163531501&4294967295,y=b+(w<<20&4294967295|w>>>12),w=_+(b^R&(y^b))+I[13]+2850285829&4294967295,_=y+(w<<5&4294967295|w>>>27),w=R+(y^b&(_^y))+I[2]+4243563512&4294967295,R=_+(w<<9&4294967295|w>>>23),w=b+(_^y&(R^_))+I[7]+1735328473&4294967295,b=R+(w<<14&4294967295|w>>>18),w=y+(R^_&(b^R))+I[12]+2368359562&4294967295,y=b+(w<<20&4294967295|w>>>12),w=_+(y^b^R)+I[5]+4294588738&4294967295,_=y+(w<<4&4294967295|w>>>28),w=R+(_^y^b)+I[8]+2272392833&4294967295,R=_+(w<<11&4294967295|w>>>21),w=b+(R^_^y)+I[11]+1839030562&4294967295,b=R+(w<<16&4294967295|w>>>16),w=y+(b^R^_)+I[14]+4259657740&4294967295,y=b+(w<<23&4294967295|w>>>9),w=_+(y^b^R)+I[1]+2763975236&4294967295,_=y+(w<<4&4294967295|w>>>28),w=R+(_^y^b)+I[4]+1272893353&4294967295,R=_+(w<<11&4294967295|w>>>21),w=b+(R^_^y)+I[7]+4139469664&4294967295,b=R+(w<<16&4294967295|w>>>16),w=y+(b^R^_)+I[10]+3200236656&4294967295,y=b+(w<<23&4294967295|w>>>9),w=_+(y^b^R)+I[13]+681279174&4294967295,_=y+(w<<4&4294967295|w>>>28),w=R+(_^y^b)+I[0]+3936430074&4294967295,R=_+(w<<11&4294967295|w>>>21),w=b+(R^_^y)+I[3]+3572445317&4294967295,b=R+(w<<16&4294967295|w>>>16),w=y+(b^R^_)+I[6]+76029189&4294967295,y=b+(w<<23&4294967295|w>>>9),w=_+(y^b^R)+I[9]+3654602809&4294967295,_=y+(w<<4&4294967295|w>>>28),w=R+(_^y^b)+I[12]+3873151461&4294967295,R=_+(w<<11&4294967295|w>>>21),w=b+(R^_^y)+I[15]+530742520&4294967295,b=R+(w<<16&4294967295|w>>>16),w=y+(b^R^_)+I[2]+3299628645&4294967295,y=b+(w<<23&4294967295|w>>>9),w=_+(b^(y|~R))+I[0]+4096336452&4294967295,_=y+(w<<6&4294967295|w>>>26),w=R+(y^(_|~b))+I[7]+1126891415&4294967295,R=_+(w<<10&4294967295|w>>>22),w=b+(_^(R|~y))+I[14]+2878612391&4294967295,b=R+(w<<15&4294967295|w>>>17),w=y+(R^(b|~_))+I[5]+4237533241&4294967295,y=b+(w<<21&4294967295|w>>>11),w=_+(b^(y|~R))+I[12]+1700485571&4294967295,_=y+(w<<6&4294967295|w>>>26),w=R+(y^(_|~b))+I[3]+2399980690&4294967295,R=_+(w<<10&4294967295|w>>>22),w=b+(_^(R|~y))+I[10]+4293915773&4294967295,b=R+(w<<15&4294967295|w>>>17),w=y+(R^(b|~_))+I[1]+2240044497&4294967295,y=b+(w<<21&4294967295|w>>>11),w=_+(b^(y|~R))+I[8]+1873313359&4294967295,_=y+(w<<6&4294967295|w>>>26),w=R+(y^(_|~b))+I[15]+4264355552&4294967295,R=_+(w<<10&4294967295|w>>>22),w=b+(_^(R|~y))+I[6]+2734768916&4294967295,b=R+(w<<15&4294967295|w>>>17),w=y+(R^(b|~_))+I[13]+1309151649&4294967295,y=b+(w<<21&4294967295|w>>>11),w=_+(b^(y|~R))+I[4]+4149444226&4294967295,_=y+(w<<6&4294967295|w>>>26),w=R+(y^(_|~b))+I[11]+3174756917&4294967295,R=_+(w<<10&4294967295|w>>>22),w=b+(_^(R|~y))+I[2]+718787259&4294967295,b=R+(w<<15&4294967295|w>>>17),w=y+(R^(b|~_))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+_&4294967295,T.g[1]=T.g[1]+(b+(w<<21&4294967295|w>>>11))&4294967295,T.g[2]=T.g[2]+b&4294967295,T.g[3]=T.g[3]+R&4294967295}r.prototype.u=function(T,_){_===void 0&&(_=T.length);for(var y=_-this.blockSize,I=this.B,b=this.h,R=0;R<_;){if(b==0)for(;R<=y;)s(this,T,R),R+=this.blockSize;if(typeof T=="string"){for(;R<_;)if(I[b++]=T.charCodeAt(R++),b==this.blockSize){s(this,I),b=0;break}}else for(;R<_;)if(I[b++]=T[R++],b==this.blockSize){s(this,I),b=0;break}}this.h=b,this.o+=_},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var _=1;_<T.length-8;++_)T[_]=0;var y=8*this.o;for(_=T.length-8;_<T.length;++_)T[_]=y&255,y/=256;for(this.u(T),T=Array(16),_=y=0;4>_;++_)for(var I=0;32>I;I+=8)T[y++]=this.g[_]>>>I&255;return T};function i(T,_){var y=l;return Object.prototype.hasOwnProperty.call(y,T)?y[T]:y[T]=_(T)}function o(T,_){this.h=_;for(var y=[],I=!0,b=T.length-1;0<=b;b--){var R=T[b]|0;I&&R==_||(y[b]=R,I=!1)}this.g=y}var l={};function c(T){return-128<=T&&128>T?i(T,function(_){return new o([_|0],0>_?-1:0)}):new o([T|0],0>T?-1:0)}function u(T){if(isNaN(T)||!isFinite(T))return p;if(0>T)return k(u(-T));for(var _=[],y=1,I=0;T>=y;I++)_[I]=T/y|0,y*=4294967296;return new o(_,0)}function d(T,_){if(T.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(T.charAt(0)=="-")return k(d(T.substring(1),_));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=u(Math.pow(_,8)),I=p,b=0;b<T.length;b+=8){var R=Math.min(8,T.length-b),w=parseInt(T.substring(b,b+R),_);8>R?(R=u(Math.pow(_,R)),I=I.j(R).add(u(w))):(I=I.j(y),I=I.add(u(w)))}return I}var p=c(0),g=c(1),v=c(16777216);t=o.prototype,t.m=function(){if(C(this))return-k(this).m();for(var T=0,_=1,y=0;y<this.g.length;y++){var I=this.i(y);T+=(0<=I?I:4294967296+I)*_,_*=4294967296}return T},t.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(S(this))return"0";if(C(this))return"-"+k(this).toString(T);for(var _=u(Math.pow(T,6)),y=this,I="";;){var b=G(y,_).g;y=N(y,b.j(_));var R=((0<y.g.length?y.g[0]:y.h)>>>0).toString(T);if(y=b,S(y))return R+I;for(;6>R.length;)R="0"+R;I=R+I}},t.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function S(T){if(T.h!=0)return!1;for(var _=0;_<T.g.length;_++)if(T.g[_]!=0)return!1;return!0}function C(T){return T.h==-1}t.l=function(T){return T=N(this,T),C(T)?-1:S(T)?0:1};function k(T){for(var _=T.g.length,y=[],I=0;I<_;I++)y[I]=~T.g[I];return new o(y,~T.h).add(g)}t.abs=function(){return C(this)?k(this):this},t.add=function(T){for(var _=Math.max(this.g.length,T.g.length),y=[],I=0,b=0;b<=_;b++){var R=I+(this.i(b)&65535)+(T.i(b)&65535),w=(R>>>16)+(this.i(b)>>>16)+(T.i(b)>>>16);I=w>>>16,R&=65535,w&=65535,y[b]=w<<16|R}return new o(y,y[y.length-1]&-2147483648?-1:0)};function N(T,_){return T.add(k(_))}t.j=function(T){if(S(this)||S(T))return p;if(C(this))return C(T)?k(this).j(k(T)):k(k(this).j(T));if(C(T))return k(this.j(k(T)));if(0>this.l(v)&&0>T.l(v))return u(this.m()*T.m());for(var _=this.g.length+T.g.length,y=[],I=0;I<2*_;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(var b=0;b<T.g.length;b++){var R=this.i(I)>>>16,w=this.i(I)&65535,Qe=T.i(b)>>>16,ot=T.i(b)&65535;y[2*I+2*b]+=w*ot,O(y,2*I+2*b),y[2*I+2*b+1]+=R*ot,O(y,2*I+2*b+1),y[2*I+2*b+1]+=w*Qe,O(y,2*I+2*b+1),y[2*I+2*b+2]+=R*Qe,O(y,2*I+2*b+2)}for(I=0;I<_;I++)y[I]=y[2*I+1]<<16|y[2*I];for(I=_;I<2*_;I++)y[I]=0;return new o(y,0)};function O(T,_){for(;(T[_]&65535)!=T[_];)T[_+1]+=T[_]>>>16,T[_]&=65535,_++}function B(T,_){this.g=T,this.h=_}function G(T,_){if(S(_))throw Error("division by zero");if(S(T))return new B(p,p);if(C(T))return _=G(k(T),_),new B(k(_.g),k(_.h));if(C(_))return _=G(T,k(_)),new B(k(_.g),_.h);if(30<T.g.length){if(C(T)||C(_))throw Error("slowDivide_ only works with positive integers.");for(var y=g,I=_;0>=I.l(T);)y=V(y),I=V(I);var b=$(y,1),R=$(I,1);for(I=$(I,2),y=$(y,2);!S(I);){var w=R.add(I);0>=w.l(T)&&(b=b.add(y),R=w),I=$(I,1),y=$(y,1)}return _=N(T,b.j(_)),new B(b,_)}for(b=p;0<=T.l(_);){for(y=Math.max(1,Math.floor(T.m()/_.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),R=u(y),w=R.j(_);C(w)||0<w.l(T);)y-=I,R=u(y),w=R.j(_);S(R)&&(R=g),b=b.add(R),T=N(T,w)}return new B(b,T)}t.A=function(T){return G(this,T).h},t.and=function(T){for(var _=Math.max(this.g.length,T.g.length),y=[],I=0;I<_;I++)y[I]=this.i(I)&T.i(I);return new o(y,this.h&T.h)},t.or=function(T){for(var _=Math.max(this.g.length,T.g.length),y=[],I=0;I<_;I++)y[I]=this.i(I)|T.i(I);return new o(y,this.h|T.h)},t.xor=function(T){for(var _=Math.max(this.g.length,T.g.length),y=[],I=0;I<_;I++)y[I]=this.i(I)^T.i(I);return new o(y,this.h^T.h)};function V(T){for(var _=T.g.length+1,y=[],I=0;I<_;I++)y[I]=T.i(I)<<1|T.i(I-1)>>>31;return new o(y,T.h)}function $(T,_){var y=_>>5;_%=32;for(var I=T.g.length-y,b=[],R=0;R<I;R++)b[R]=0<_?T.i(R+y)>>>_|T.i(R+y+1)<<32-_:T.i(R+y);return new o(b,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Ig=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=d,kr=o}).apply(typeof cf<"u"?cf:typeof self<"u"?self:typeof window<"u"?window:{});var _o=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ag,Ys,bg,Do,ac,Rg,Sg,Pg;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,f){return a==Array.prototype||a==Object.prototype||(a[h]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof _o=="object"&&_o];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(a,h){if(h)e:{var f=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var P=a[m];if(!(P in f))break e;f=f[P]}a=a[a.length-1],m=f[a],h=h(m),h!=m&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}function i(a,h){a instanceof String&&(a+="");var f=0,m=!1,P={next:function(){if(!m&&f<a.length){var D=f++;return{value:h(D,a[D]),done:!1}}return m=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}s("Array.prototype.values",function(a){return a||function(){return i(this,function(h,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function u(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function d(a,h,f){return a.call.apply(a.bind,arguments)}function p(a,h,f){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,m),a.apply(h,P)}}return function(){return a.apply(h,arguments)}}function g(a,h,f){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,g.apply(null,arguments)}function v(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function S(a,h){function f(){}f.prototype=h.prototype,a.aa=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(m,P,D){for(var Q=Array(arguments.length-2),De=2;De<arguments.length;De++)Q[De-2]=arguments[De];return h.prototype[P].apply(m,Q)}}function C(a){const h=a.length;if(0<h){const f=Array(h);for(let m=0;m<h;m++)f[m]=a[m];return f}return[]}function k(a,h){for(let f=1;f<arguments.length;f++){const m=arguments[f];if(c(m)){const P=a.length||0,D=m.length||0;a.length=P+D;for(let Q=0;Q<D;Q++)a[P+Q]=m[Q]}else a.push(m)}}class N{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function O(a){return/^[\s\xa0]*$/.test(a)}function B(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function G(a){return G[" "](a),a}G[" "]=function(){};var V=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function $(a,h,f){for(const m in a)h.call(f,a[m],m,a)}function T(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function _(a){const h={};for(const f in a)h[f]=a[f];return h}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(a,h){let f,m;for(let P=1;P<arguments.length;P++){m=arguments[P];for(f in m)a[f]=m[f];for(let D=0;D<y.length;D++)f=y[D],Object.prototype.hasOwnProperty.call(m,f)&&(a[f]=m[f])}}function b(a){var h=1;a=a.split(":");const f=[];for(;0<h&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function R(a){l.setTimeout(()=>{throw a},0)}function w(){var a=Ot;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class Qe{constructor(){this.h=this.g=null}add(h,f){const m=ot.get();m.set(h,f),this.h?this.h.next=m:this.g=m,this.h=m}}var ot=new N(()=>new Oe,a=>a.reset());class Oe{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ce,ye=!1,Ot=new Qe,Gt=()=>{const a=l.Promise.resolve(void 0);ce=()=>{a.then(Bt)}};var Bt=()=>{for(var a;a=w();){try{a.h.call(a.g)}catch(f){R(f)}var h=ot;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}ye=!1};function Be(){this.s=this.s,this.C=this.C}Be.prototype.s=!1,Be.prototype.ma=function(){this.s||(this.s=!0,this.N())},Be.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function $e(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}$e.prototype.h=function(){this.defaultPrevented=!0};var Un=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,h),l.removeEventListener("test",f,h)}catch{}return a}();function Vt(a,h){if($e.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(V){e:{try{G(h.nodeName);var P=!0;break e}catch{}P=!1}P||(h=null)}}else f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement);this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Dt[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Vt.aa.h.call(this)}}S(Vt,$e);var Dt={2:"touch",3:"pen",4:"mouse"};Vt.prototype.h=function(){Vt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var L="closure_listenable_"+(1e6*Math.random()|0),ee=0;function Y(a,h,f,m,P){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!m,this.ha=P,this.key=++ee,this.da=this.fa=!1}function re(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function pe(a){this.src=a,this.g={},this.h=0}pe.prototype.add=function(a,h,f,m,P){var D=a.toString();a=this.g[D],a||(a=this.g[D]=[],this.h++);var Q=E(a,h,m,P);return-1<Q?(h=a[Q],f||(h.fa=!1)):(h=new Y(h,this.src,D,!!m,P),h.fa=f,a.push(h)),h};function ke(a,h){var f=h.type;if(f in a.g){var m=a.g[f],P=Array.prototype.indexOf.call(m,h,void 0),D;(D=0<=P)&&Array.prototype.splice.call(m,P,1),D&&(re(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function E(a,h,f,m){for(var P=0;P<a.length;++P){var D=a[P];if(!D.da&&D.listener==h&&D.capture==!!f&&D.ha==m)return P}return-1}var A="closure_lm_"+(1e6*Math.random()|0),x={};function j(a,h,f,m,P){if(m&&m.once)return J(a,h,f,m,P);if(Array.isArray(h)){for(var D=0;D<h.length;D++)j(a,h[D],f,m,P);return null}return f=ae(f),a&&a[L]?a.K(h,f,u(m)?!!m.capture:!!m,P):M(a,h,f,!1,m,P)}function M(a,h,f,m,P,D){if(!h)throw Error("Invalid event type");var Q=u(P)?!!P.capture:!!P,De=X(a);if(De||(a[A]=De=new pe(a)),f=De.add(h,f,m,Q,D),f.proxy)return f;if(m=q(),f.proxy=m,m.src=a,m.listener=f,a.addEventListener)Un||(P=Q),P===void 0&&(P=!1),a.addEventListener(h.toString(),m,P);else if(a.attachEvent)a.attachEvent(H(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function q(){function a(f){return h.call(a.src,a.listener,f)}const h=ie;return a}function J(a,h,f,m,P){if(Array.isArray(h)){for(var D=0;D<h.length;D++)J(a,h[D],f,m,P);return null}return f=ae(f),a&&a[L]?a.L(h,f,u(m)?!!m.capture:!!m,P):M(a,h,f,!0,m,P)}function z(a,h,f,m,P){if(Array.isArray(h))for(var D=0;D<h.length;D++)z(a,h[D],f,m,P);else m=u(m)?!!m.capture:!!m,f=ae(f),a&&a[L]?(a=a.i,h=String(h).toString(),h in a.g&&(D=a.g[h],f=E(D,f,m,P),-1<f&&(re(D[f]),Array.prototype.splice.call(D,f,1),D.length==0&&(delete a.g[h],a.h--)))):a&&(a=X(a))&&(h=a.g[h.toString()],a=-1,h&&(a=E(h,f,m,P)),(f=-1<a?h[a]:null)&&K(f))}function K(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[L])ke(h.i,a);else{var f=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(f,m,a.capture):h.detachEvent?h.detachEvent(H(f),m):h.addListener&&h.removeListener&&h.removeListener(m),(f=X(h))?(ke(f,a),f.h==0&&(f.src=null,h[A]=null)):re(a)}}}function H(a){return a in x?x[a]:x[a]="on"+a}function ie(a,h){if(a.da)a=!0;else{h=new Vt(h,this);var f=a.listener,m=a.ha||a.src;a.fa&&K(a),a=f.call(m,h)}return a}function X(a){return a=a[A],a instanceof pe?a:null}var ne="__closure_events_fn_"+(1e9*Math.random()>>>0);function ae(a){return typeof a=="function"?a:(a[ne]||(a[ne]=function(h){return a.handleEvent(h)}),a[ne])}function oe(){Be.call(this),this.i=new pe(this),this.M=this,this.F=null}S(oe,Be),oe.prototype[L]=!0,oe.prototype.removeEventListener=function(a,h,f,m){z(this,a,h,f,m)};function me(a,h){var f,m=a.F;if(m)for(f=[];m;m=m.F)f.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new $e(h,a);else if(h instanceof $e)h.target=h.target||a;else{var P=h;h=new $e(m,a),I(h,P)}if(P=!0,f)for(var D=f.length-1;0<=D;D--){var Q=h.g=f[D];P=Te(Q,m,!0,h)&&P}if(Q=h.g=a,P=Te(Q,m,!0,h)&&P,P=Te(Q,m,!1,h)&&P,f)for(D=0;D<f.length;D++)Q=h.g=f[D],P=Te(Q,m,!1,h)&&P}oe.prototype.N=function(){if(oe.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var f=a.g[h],m=0;m<f.length;m++)re(f[m]);delete a.g[h],a.h--}}this.F=null},oe.prototype.K=function(a,h,f,m){return this.i.add(String(a),h,!1,f,m)},oe.prototype.L=function(a,h,f,m){return this.i.add(String(a),h,!0,f,m)};function Te(a,h,f,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var P=!0,D=0;D<h.length;++D){var Q=h[D];if(Q&&!Q.da&&Q.capture==f){var De=Q.listener,ct=Q.ha||Q.src;Q.fa&&ke(a.i,Q),P=De.call(ct,m)!==!1&&P}}return P&&!m.defaultPrevented}function at(a,h,f){if(typeof a=="function")f&&(a=g(a,f));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:l.setTimeout(a,h||0)}function Ze(a){a.g=at(()=>{a.g=null,a.i&&(a.i=!1,Ze(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Mt extends Be{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Ze(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function et(a){Be.call(this),this.h=a,this.g={}}S(et,Be);var jn=[];function xs(a){$(a.g,function(h,f){this.g.hasOwnProperty(f)&&K(h)},a),a.g={}}et.prototype.N=function(){et.aa.N.call(this),xs(this)},et.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var lt=l.JSON.stringify,$t=l.JSON.parse,Qi=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Hr(){}Hr.prototype.h=null;function Gu(a){return a.h||(a.h=a.i())}function Ku(){}var ks={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ga(){$e.call(this,"d")}S(Ga,$e);function Ka(){$e.call(this,"c")}S(Ka,$e);var _r={},zu=null;function Ji(){return zu=zu||new oe}_r.La="serverreachability";function Qu(a){$e.call(this,_r.La,a)}S(Qu,$e);function Ds(a){const h=Ji();me(h,new Qu(h))}_r.STAT_EVENT="statevent";function Ju(a,h){$e.call(this,_r.STAT_EVENT,a),this.stat=h}S(Ju,$e);function At(a){const h=Ji();me(h,new Ju(h,a))}_r.Ma="timingevent";function Yu(a,h){$e.call(this,_r.Ma,a),this.size=h}S(Yu,$e);function Ns(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},h)}function Os(){this.g=!0}Os.prototype.xa=function(){this.g=!1};function z_(a,h,f,m,P,D){a.info(function(){if(a.g)if(D)for(var Q="",De=D.split("&"),ct=0;ct<De.length;ct++){var Ie=De[ct].split("=");if(1<Ie.length){var mt=Ie[0];Ie=Ie[1];var gt=mt.split("_");Q=2<=gt.length&&gt[1]=="type"?Q+(mt+"="+Ie+"&"):Q+(mt+"=redacted&")}}else Q=null;else Q=D;return"XMLHTTP REQ ("+m+") [attempt "+P+"]: "+h+`
`+f+`
`+Q})}function Q_(a,h,f,m,P,D,Q){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+P+"]: "+h+`
`+f+`
`+D+" "+Q})}function Wr(a,h,f,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Y_(a,f)+(m?" "+m:"")})}function J_(a,h){a.info(function(){return"TIMEOUT: "+h})}Os.prototype.info=function(){};function Y_(a,h){if(!a.g)return h;if(!h)return null;try{var f=JSON.parse(h);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var m=f[a];if(!(2>m.length)){var P=m[1];if(Array.isArray(P)&&!(1>P.length)){var D=P[0];if(D!="noop"&&D!="stop"&&D!="close")for(var Q=1;Q<P.length;Q++)P[Q]=""}}}}return lt(f)}catch{return h}}var Yi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Xu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},za;function Xi(){}S(Xi,Hr),Xi.prototype.g=function(){return new XMLHttpRequest},Xi.prototype.i=function(){return{}},za=new Xi;function Bn(a,h,f,m){this.j=a,this.i=h,this.l=f,this.R=m||1,this.U=new et(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Zu}function Zu(){this.i=null,this.g="",this.h=!1}var eh={},Qa={};function Ja(a,h,f){a.L=1,a.v=no(fn(h)),a.m=f,a.P=!0,th(a,null)}function th(a,h){a.F=Date.now(),Zi(a),a.A=fn(a.v);var f=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),mh(f.i,"t",m),a.C=0,f=a.j.J,a.h=new Zu,a.g=Nh(a.j,f?h:null,!a.m),0<a.O&&(a.M=new Mt(g(a.Y,a,a.g),a.O)),h=a.U,f=a.g,m=a.ca;var P="readystatechange";Array.isArray(P)||(P&&(jn[0]=P.toString()),P=jn);for(var D=0;D<P.length;D++){var Q=j(f,P[D],m||h.handleEvent,!1,h.h||h);if(!Q)break;h.g[Q.key]=Q}h=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),Ds(),z_(a.i,a.u,a.A,a.l,a.R,a.m)}Bn.prototype.ca=function(a){a=a.target;const h=this.M;h&&pn(a)==3?h.j():this.Y(a)},Bn.prototype.Y=function(a){try{if(a==this.g)e:{const gt=pn(this.g);var h=this.g.Ba();const zr=this.g.Z();if(!(3>gt)&&(gt!=3||this.g&&(this.h.h||this.g.oa()||wh(this.g)))){this.J||gt!=4||h==7||(h==8||0>=zr?Ds(3):Ds(2)),Ya(this);var f=this.g.Z();this.X=f;t:if(nh(this)){var m=wh(this.g);a="";var P=m.length,D=pn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){yr(this),Vs(this);var Q="";break t}this.h.i=new l.TextDecoder}for(h=0;h<P;h++)this.h.h=!0,a+=this.h.i.decode(m[h],{stream:!(D&&h==P-1)});m.length=0,this.h.g+=a,this.C=0,Q=this.h.g}else Q=this.g.oa();if(this.o=f==200,Q_(this.i,this.u,this.A,this.l,this.R,gt,f),this.o){if(this.T&&!this.K){t:{if(this.g){var De,ct=this.g;if((De=ct.g?ct.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!O(De)){var Ie=De;break t}}Ie=null}if(f=Ie)Wr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Xa(this,f);else{this.o=!1,this.s=3,At(12),yr(this),Vs(this);break e}}if(this.P){f=!0;let Kt;for(;!this.J&&this.C<Q.length;)if(Kt=X_(this,Q),Kt==Qa){gt==4&&(this.s=4,At(14),f=!1),Wr(this.i,this.l,null,"[Incomplete Response]");break}else if(Kt==eh){this.s=4,At(15),Wr(this.i,this.l,Q,"[Invalid Chunk]"),f=!1;break}else Wr(this.i,this.l,Kt,null),Xa(this,Kt);if(nh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),gt!=4||Q.length!=0||this.h.h||(this.s=1,At(16),f=!1),this.o=this.o&&f,!f)Wr(this.i,this.l,Q,"[Invalid Chunked Response]"),yr(this),Vs(this);else if(0<Q.length&&!this.W){this.W=!0;var mt=this.j;mt.g==this&&mt.ba&&!mt.M&&(mt.j.info("Great, no buffering proxy detected. Bytes received: "+Q.length),sl(mt),mt.M=!0,At(11))}}else Wr(this.i,this.l,Q,null),Xa(this,Q);gt==4&&yr(this),this.o&&!this.J&&(gt==4?Ch(this.j,this):(this.o=!1,Zi(this)))}else my(this.g),f==400&&0<Q.indexOf("Unknown SID")?(this.s=3,At(12)):(this.s=0,At(13)),yr(this),Vs(this)}}}catch{}finally{}};function nh(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function X_(a,h){var f=a.C,m=h.indexOf(`
`,f);return m==-1?Qa:(f=Number(h.substring(f,m)),isNaN(f)?eh:(m+=1,m+f>h.length?Qa:(h=h.slice(m,m+f),a.C=m+f,h)))}Bn.prototype.cancel=function(){this.J=!0,yr(this)};function Zi(a){a.S=Date.now()+a.I,rh(a,a.I)}function rh(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ns(g(a.ba,a),h)}function Ya(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Bn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(J_(this.i,this.A),this.L!=2&&(Ds(),At(17)),yr(this),this.s=2,Vs(this)):rh(this,this.S-a)};function Vs(a){a.j.G==0||a.J||Ch(a.j,a)}function yr(a){Ya(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,xs(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function Xa(a,h){try{var f=a.j;if(f.G!=0&&(f.g==a||Za(f.h,a))){if(!a.K&&Za(f.h,a)&&f.G==3){try{var m=f.Da.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var P=m;if(P[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)lo(f),oo(f);else break e;rl(f),At(18)}}else f.za=P[1],0<f.za-f.T&&37500>P[2]&&f.F&&f.v==0&&!f.C&&(f.C=Ns(g(f.Za,f),6e3));if(1>=oh(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Er(f,11)}else if((a.K||f.g==a)&&lo(f),!O(h))for(P=f.Da.g.parse(h),h=0;h<P.length;h++){let Ie=P[h];if(f.T=Ie[0],Ie=Ie[1],f.G==2)if(Ie[0]=="c"){f.K=Ie[1],f.ia=Ie[2];const mt=Ie[3];mt!=null&&(f.la=mt,f.j.info("VER="+f.la));const gt=Ie[4];gt!=null&&(f.Aa=gt,f.j.info("SVER="+f.Aa));const zr=Ie[5];zr!=null&&typeof zr=="number"&&0<zr&&(m=1.5*zr,f.L=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const Kt=a.g;if(Kt){const uo=Kt.g?Kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(uo){var D=m.h;D.g||uo.indexOf("spdy")==-1&&uo.indexOf("quic")==-1&&uo.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(el(D,D.h),D.h=null))}if(m.D){const il=Kt.g?Kt.g.getResponseHeader("X-HTTP-Session-Id"):null;il&&(m.ya=il,Le(m.I,m.D,il))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),m=f;var Q=a;if(m.qa=Dh(m,m.J?m.ia:null,m.W),Q.K){ah(m.h,Q);var De=Q,ct=m.L;ct&&(De.I=ct),De.B&&(Ya(De),Zi(De)),m.g=Q}else Sh(m);0<f.i.length&&ao(f)}else Ie[0]!="stop"&&Ie[0]!="close"||Er(f,7);else f.G==3&&(Ie[0]=="stop"||Ie[0]=="close"?Ie[0]=="stop"?Er(f,7):nl(f):Ie[0]!="noop"&&f.l&&f.l.ta(Ie),f.v=0)}}Ds(4)}catch{}}var Z_=class{constructor(a,h){this.g=a,this.map=h}};function sh(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ih(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function oh(a){return a.h?1:a.g?a.g.size:0}function Za(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function el(a,h){a.g?a.g.add(h):a.h=h}function ah(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}sh.prototype.cancel=function(){if(this.i=lh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function lh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.D);return h}return C(a.i)}function ey(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var h=[],f=a.length,m=0;m<f;m++)h.push(a[m]);return h}h=[],f=0;for(m in a)h[f++]=a[m];return h}function ty(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var h=[];a=a.length;for(var f=0;f<a;f++)h.push(f);return h}h=[],f=0;for(const m in a)h[f++]=m;return h}}}function ch(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var f=ty(a),m=ey(a),P=m.length,D=0;D<P;D++)h.call(void 0,m[D],f&&f[D],a)}var uh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ny(a,h){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var m=a[f].indexOf("="),P=null;if(0<=m){var D=a[f].substring(0,m);P=a[f].substring(m+1)}else D=a[f];h(D,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function vr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof vr){this.h=a.h,eo(this,a.j),this.o=a.o,this.g=a.g,to(this,a.s),this.l=a.l;var h=a.i,f=new Fs;f.i=h.i,h.g&&(f.g=new Map(h.g),f.h=h.h),hh(this,f),this.m=a.m}else a&&(h=String(a).match(uh))?(this.h=!1,eo(this,h[1]||"",!0),this.o=Ms(h[2]||""),this.g=Ms(h[3]||"",!0),to(this,h[4]),this.l=Ms(h[5]||"",!0),hh(this,h[6]||"",!0),this.m=Ms(h[7]||"")):(this.h=!1,this.i=new Fs(null,this.h))}vr.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Ls(h,dh,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Ls(h,dh,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Ls(f,f.charAt(0)=="/"?iy:sy,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Ls(f,ay)),a.join("")};function fn(a){return new vr(a)}function eo(a,h,f){a.j=f?Ms(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function to(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function hh(a,h,f){h instanceof Fs?(a.i=h,ly(a.i,a.h)):(f||(h=Ls(h,oy)),a.i=new Fs(h,a.h))}function Le(a,h,f){a.i.set(h,f)}function no(a){return Le(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ms(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ls(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,ry),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function ry(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var dh=/[#\/\?@]/g,sy=/[#\?:]/g,iy=/[#\?]/g,oy=/[#\?@]/g,ay=/#/g;function Fs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function $n(a){a.g||(a.g=new Map,a.h=0,a.i&&ny(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}t=Fs.prototype,t.add=function(a,h){$n(this),this.i=null,a=Gr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function fh(a,h){$n(a),h=Gr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function ph(a,h){return $n(a),h=Gr(a,h),a.g.has(h)}t.forEach=function(a,h){$n(this),this.g.forEach(function(f,m){f.forEach(function(P){a.call(h,P,m,this)},this)},this)},t.na=function(){$n(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),f=[];for(let m=0;m<h.length;m++){const P=a[m];for(let D=0;D<P.length;D++)f.push(h[m])}return f},t.V=function(a){$n(this);let h=[];if(typeof a=="string")ph(this,a)&&(h=h.concat(this.g.get(Gr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)h=h.concat(a[f])}return h},t.set=function(a,h){return $n(this),this.i=null,a=Gr(this,a),ph(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function mh(a,h,f){fh(a,h),0<f.length&&(a.i=null,a.g.set(Gr(a,h),C(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var f=0;f<h.length;f++){var m=h[f];const D=encodeURIComponent(String(m)),Q=this.V(m);for(m=0;m<Q.length;m++){var P=D;Q[m]!==""&&(P+="="+encodeURIComponent(String(Q[m]))),a.push(P)}}return this.i=a.join("&")};function Gr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function ly(a,h){h&&!a.j&&($n(a),a.i=null,a.g.forEach(function(f,m){var P=m.toLowerCase();m!=P&&(fh(this,m),mh(this,P,f))},a)),a.j=h}function cy(a,h){const f=new Os;if(l.Image){const m=new Image;m.onload=v(qn,f,"TestLoadImage: loaded",!0,h,m),m.onerror=v(qn,f,"TestLoadImage: error",!1,h,m),m.onabort=v(qn,f,"TestLoadImage: abort",!1,h,m),m.ontimeout=v(qn,f,"TestLoadImage: timeout",!1,h,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function uy(a,h){const f=new Os,m=new AbortController,P=setTimeout(()=>{m.abort(),qn(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(D=>{clearTimeout(P),D.ok?qn(f,"TestPingServer: ok",!0,h):qn(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(P),qn(f,"TestPingServer: error",!1,h)})}function qn(a,h,f,m,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),m(f)}catch{}}function hy(){this.g=new Qi}function dy(a,h,f){const m=f||"";try{ch(a,function(P,D){let Q=P;u(P)&&(Q=lt(P)),h.push(m+D+"="+encodeURIComponent(Q))})}catch(P){throw h.push(m+"type="+encodeURIComponent("_badmap")),P}}function ro(a){this.l=a.Ub||null,this.j=a.eb||!1}S(ro,Hr),ro.prototype.g=function(){return new so(this.l,this.j)},ro.prototype.i=function(a){return function(){return a}}({});function so(a,h){oe.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(so,oe),t=so.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,js(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||l).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Us(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,js(this)),this.g&&(this.readyState=3,js(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;gh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function gh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Us(this):js(this),this.readyState==3&&gh(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Us(this))},t.Qa=function(a){this.g&&(this.response=a,Us(this))},t.ga=function(){this.g&&Us(this)};function Us(a){a.readyState=4,a.l=null,a.j=null,a.v=null,js(a)}t.setRequestHeader=function(a,h){this.u.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function js(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(so.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function _h(a){let h="";return $(a,function(f,m){h+=m,h+=":",h+=f,h+=`\r
`}),h}function tl(a,h,f){e:{for(m in f){var m=!1;break e}m=!0}m||(f=_h(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Le(a,h,f))}function He(a){oe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(He,oe);var fy=/^https?$/i,py=["POST","PUT"];t=He.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,h,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():za.g(),this.v=this.o?Gu(this.o):Gu(za),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(D){yh(this,D);return}if(a=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var P in m)f.set(P,m[P]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const D of m.keys())f.set(D,m.get(D));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(D=>D.toLowerCase()=="content-type"),P=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(py,h,void 0))||m||P||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,Q]of f)this.g.setRequestHeader(D,Q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Th(this),this.u=!0,this.g.send(a),this.u=!1}catch(D){yh(this,D)}};function yh(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,vh(a),io(a)}function vh(a){a.A||(a.A=!0,me(a,"complete"),me(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,me(this,"complete"),me(this,"abort"),io(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),io(this,!0)),He.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Eh(this):this.bb())},t.bb=function(){Eh(this)};function Eh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||pn(a)!=4||a.Z()!=2)){if(a.u&&pn(a)==4)at(a.Ea,0,a);else if(me(a,"readystatechange"),pn(a)==4){a.h=!1;try{const Q=a.Z();e:switch(Q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var m;if(m=Q===0){var P=String(a.D).match(uh)[1]||null;!P&&l.self&&l.self.location&&(P=l.self.location.protocol.slice(0,-1)),m=!fy.test(P?P.toLowerCase():"")}f=m}if(f)me(a,"complete"),me(a,"success");else{a.m=6;try{var D=2<pn(a)?a.g.statusText:""}catch{D=""}a.l=D+" ["+a.Z()+"]",vh(a)}}finally{io(a)}}}}function io(a,h){if(a.g){Th(a);const f=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||me(a,"ready");try{f.onreadystatechange=m}catch{}}}function Th(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function pn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<pn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),$t(h)}};function wh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function my(a){const h={};a=(a.g&&2<=pn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(O(a[m]))continue;var f=b(a[m]);const P=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const D=h[P]||[];h[P]=D,D.push(f)}T(h,function(m){return m.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Bs(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Ih(a){this.Aa=0,this.i=[],this.j=new Os,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Bs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Bs("baseRetryDelayMs",5e3,a),this.cb=Bs("retryDelaySeedMs",1e4,a),this.Wa=Bs("forwardChannelMaxRetries",2,a),this.wa=Bs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new sh(a&&a.concurrentRequestLimit),this.Da=new hy,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Ih.prototype,t.la=8,t.G=1,t.connect=function(a,h,f,m){At(0),this.W=a,this.H=h||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.I=Dh(this,null,this.W),ao(this)};function nl(a){if(Ah(a),a.G==3){var h=a.U++,f=fn(a.I);if(Le(f,"SID",a.K),Le(f,"RID",h),Le(f,"TYPE","terminate"),$s(a,f),h=new Bn(a,a.j,h),h.L=2,h.v=no(fn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(h.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=h.v,f=!0),f||(h.g=Nh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Zi(h)}kh(a)}function oo(a){a.g&&(sl(a),a.g.cancel(),a.g=null)}function Ah(a){oo(a),a.u&&(l.clearTimeout(a.u),a.u=null),lo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function ao(a){if(!ih(a.h)&&!a.s){a.s=!0;var h=a.Ga;ce||Gt(),ye||(ce(),ye=!0),Ot.add(h,a),a.B=0}}function gy(a,h){return oh(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ns(g(a.Ga,a,h),xh(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const P=new Bn(this,this.j,a);let D=this.o;if(this.S&&(D?(D=_(D),I(D,this.S)):D=this.S),this.m!==null||this.O||(P.H=D,D=null),this.P)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,4096<h){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Rh(this,P,h),f=fn(this.I),Le(f,"RID",a),Le(f,"CVER",22),this.D&&Le(f,"X-HTTP-Session-Id",this.D),$s(this,f),D&&(this.O?h="headers="+encodeURIComponent(String(_h(D)))+"&"+h:this.m&&tl(f,this.m,D)),el(this.h,P),this.Ua&&Le(f,"TYPE","init"),this.P?(Le(f,"$req",h),Le(f,"SID","null"),P.T=!0,Ja(P,f,null)):Ja(P,f,h),this.G=2}}else this.G==3&&(a?bh(this,a):this.i.length==0||ih(this.h)||bh(this))};function bh(a,h){var f;h?f=h.l:f=a.U++;const m=fn(a.I);Le(m,"SID",a.K),Le(m,"RID",f),Le(m,"AID",a.T),$s(a,m),a.m&&a.o&&tl(m,a.m,a.o),f=new Bn(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Rh(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),el(a.h,f),Ja(f,m,h)}function $s(a,h){a.H&&$(a.H,function(f,m){Le(h,m,f)}),a.l&&ch({},function(f,m){Le(h,m,f)})}function Rh(a,h,f){f=Math.min(a.i.length,f);var m=a.l?g(a.l.Na,a.l,a):null;e:{var P=a.i;let D=-1;for(;;){const Q=["count="+f];D==-1?0<f?(D=P[0].g,Q.push("ofs="+D)):D=0:Q.push("ofs="+D);let De=!0;for(let ct=0;ct<f;ct++){let Ie=P[ct].g;const mt=P[ct].map;if(Ie-=D,0>Ie)D=Math.max(0,P[ct].g-100),De=!1;else try{dy(mt,Q,"req"+Ie+"_")}catch{m&&m(mt)}}if(De){m=Q.join("&");break e}}}return a=a.i.splice(0,f),h.D=a,m}function Sh(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;ce||Gt(),ye||(ce(),ye=!0),Ot.add(h,a),a.v=0}}function rl(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ns(g(a.Fa,a),xh(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,Ph(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ns(g(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,At(10),oo(this),Ph(this))};function sl(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function Ph(a){a.g=new Bn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=fn(a.qa);Le(h,"RID","rpc"),Le(h,"SID",a.K),Le(h,"AID",a.T),Le(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&Le(h,"TO",a.ja),Le(h,"TYPE","xmlhttp"),$s(a,h),a.m&&a.o&&tl(h,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=no(fn(h)),f.m=null,f.P=!0,th(f,a)}t.Za=function(){this.C!=null&&(this.C=null,oo(this),rl(this),At(19))};function lo(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Ch(a,h){var f=null;if(a.g==h){lo(a),sl(a),a.g=null;var m=2}else if(Za(a.h,h))f=h.D,ah(a.h,h),m=1;else return;if(a.G!=0){if(h.o)if(m==1){f=h.m?h.m.length:0,h=Date.now()-h.F;var P=a.B;m=Ji(),me(m,new Yu(m,f)),ao(a)}else Sh(a);else if(P=h.s,P==3||P==0&&0<h.X||!(m==1&&gy(a,h)||m==2&&rl(a)))switch(f&&0<f.length&&(h=a.h,h.i=h.i.concat(f)),P){case 1:Er(a,5);break;case 4:Er(a,10);break;case 3:Er(a,6);break;default:Er(a,2)}}}function xh(a,h){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*h}function Er(a,h){if(a.j.info("Error code "+h),h==2){var f=g(a.fb,a),m=a.Xa;const P=!m;m=new vr(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||eo(m,"https"),no(m),P?cy(m.toString(),f):uy(m.toString(),f)}else At(2);a.G=0,a.l&&a.l.sa(h),kh(a),Ah(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),At(2)):(this.j.info("Failed to ping google.com"),At(1))};function kh(a){if(a.G=0,a.ka=[],a.l){const h=lh(a.h);(h.length!=0||a.i.length!=0)&&(k(a.ka,h),k(a.ka,a.i),a.h.i.length=0,C(a.i),a.i.length=0),a.l.ra()}}function Dh(a,h,f){var m=f instanceof vr?fn(f):new vr(f);if(m.g!="")h&&(m.g=h+"."+m.g),to(m,m.s);else{var P=l.location;m=P.protocol,h=h?h+"."+P.hostname:P.hostname,P=+P.port;var D=new vr(null);m&&eo(D,m),h&&(D.g=h),P&&to(D,P),f&&(D.l=f),m=D}return f=a.D,h=a.ya,f&&h&&Le(m,f,h),Le(m,"VER",a.la),$s(a,m),m}function Nh(a,h,f){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new He(new ro({eb:f})):new He(a.pa),h.Ha(a.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Oh(){}t=Oh.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function co(){}co.prototype.g=function(a,h){return new Lt(a,h)};function Lt(a,h){oe.call(this),this.g=new Ih(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!O(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!O(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Kr(this)}S(Lt,oe),Lt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Lt.prototype.close=function(){nl(this.g)},Lt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=lt(a),a=f);h.i.push(new Z_(h.Ya++,a)),h.G==3&&ao(h)},Lt.prototype.N=function(){this.g.l=null,delete this.j,nl(this.g),delete this.g,Lt.aa.N.call(this)};function Vh(a){Ga.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}S(Vh,Ga);function Mh(){Ka.call(this),this.status=1}S(Mh,Ka);function Kr(a){this.g=a}S(Kr,Oh),Kr.prototype.ua=function(){me(this.g,"a")},Kr.prototype.ta=function(a){me(this.g,new Vh(a))},Kr.prototype.sa=function(a){me(this.g,new Mh)},Kr.prototype.ra=function(){me(this.g,"b")},co.prototype.createWebChannel=co.prototype.g,Lt.prototype.send=Lt.prototype.o,Lt.prototype.open=Lt.prototype.m,Lt.prototype.close=Lt.prototype.close,Pg=function(){return new co},Sg=function(){return Ji()},Rg=_r,ac={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Yi.NO_ERROR=0,Yi.TIMEOUT=8,Yi.HTTP_ERROR=6,Do=Yi,Xu.COMPLETE="complete",bg=Xu,Ku.EventType=ks,ks.OPEN="a",ks.CLOSE="b",ks.ERROR="c",ks.MESSAGE="d",oe.prototype.listen=oe.prototype.K,Ys=Ku,He.prototype.listenOnce=He.prototype.L,He.prototype.getLastError=He.prototype.Ka,He.prototype.getLastErrorCode=He.prototype.Ba,He.prototype.getStatus=He.prototype.Z,He.prototype.getResponseJson=He.prototype.Oa,He.prototype.getResponseText=He.prototype.oa,He.prototype.send=He.prototype.ea,He.prototype.setWithCredentials=He.prototype.Ha,Ag=He}).apply(typeof _o<"u"?_o:typeof self<"u"?self:typeof window<"u"?window:{});const uf="@firebase/firestore";/**
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
 */class vt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}vt.UNAUTHENTICATED=new vt(null),vt.GOOGLE_CREDENTIALS=new vt("google-credentials-uid"),vt.FIRST_PARTY=new vt("first-party-uid"),vt.MOCK_USER=new vt("mock-user");/**
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
 */let Rs="10.14.0";/**
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
 */const Mr=new Kc("@firebase/firestore");function Gs(){return Mr.logLevel}function te(t,...e){if(Mr.logLevel<=Ee.DEBUG){const n=e.map(lu);Mr.debug(`Firestore (${Rs}): ${t}`,...n)}}function On(t,...e){if(Mr.logLevel<=Ee.ERROR){const n=e.map(lu);Mr.error(`Firestore (${Rs}): ${t}`,...n)}}function _s(t,...e){if(Mr.logLevel<=Ee.WARN){const n=e.map(lu);Mr.warn(`Firestore (${Rs}): ${t}`,...n)}}function lu(t){if(typeof t=="string")return t;try{/**
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
 */function ue(t="Unexpected state"){const e=`FIRESTORE (${Rs}) INTERNAL ASSERTION FAILED: `+t;throw On(e),new Error(e)}function xe(t,e){t||ue()}function fe(t,e){return t}/**
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
 */const U={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Z extends Fn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class ar{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class Cg{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class GA{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(vt.UNAUTHENTICATED))}shutdown(){}}class KA{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class zA{constructor(e){this.t=e,this.currentUser=vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){xe(this.o===void 0);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new ar;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ar,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{te("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(te("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ar)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(te("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(xe(typeof r.accessToken=="string"),new Cg(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return xe(e===null||typeof e=="string"),new vt(e)}}class QA{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=vt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class JA{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new QA(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(vt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class YA{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class XA{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){xe(this.o===void 0);const r=i=>{i.error!=null&&te("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,te("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{te("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):te("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(xe(typeof n.token=="string"),this.R=n.token,new YA(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function ZA(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class xg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=ZA(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function Re(t,e){return t<e?-1:t>e?1:0}function ys(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
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
 */class nt{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new Z(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new Z(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new Z(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Z(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return nt.fromMillis(Date.now())}static fromDate(e){return nt.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new nt(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Re(this.nanoseconds,e.nanoseconds):Re(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class de{constructor(e){this.timestamp=e}static fromTimestamp(e){return new de(e)}static min(){return new de(new nt(0,0))}static max(){return new de(new nt(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class bi{constructor(e,n,r){n===void 0?n=0:n>e.length&&ue(),r===void 0?r=e.length-n:r>e.length-n&&ue(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return bi.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof bi?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Fe extends bi{construct(e,n,r){return new Fe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new Z(U.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Fe(n)}static emptyPath(){return new Fe([])}}const eb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class dt extends bi{construct(e,n,r){return new dt(e,n,r)}static isValidIdentifier(e){return eb.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),dt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new dt(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new Z(U.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new Z(U.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new Z(U.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new Z(U.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new dt(n)}static emptyPath(){return new dt([])}}/**
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
 */class se{constructor(e){this.path=e}static fromPath(e){return new se(Fe.fromString(e))}static fromName(e){return new se(Fe.fromString(e).popFirst(5))}static empty(){return new se(Fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Fe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new se(new Fe(e.slice()))}}function tb(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=de.fromTimestamp(r===1e9?new nt(n+1,0):new nt(n,r));return new ur(s,se.empty(),e)}function nb(t){return new ur(t.readTime,t.key,-1)}class ur{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new ur(de.min(),se.empty(),-1)}static max(){return new ur(de.max(),se.empty(),-1)}}function rb(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=se.comparator(t.documentKey,e.documentKey),n!==0?n:Re(t.largestBatchId,e.largestBatchId))}/**
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
 */const sb="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ib{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function $i(t){if(t.code!==U.FAILED_PRECONDITION||t.message!==sb)throw t;te("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class W{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ue(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new W((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof W?n:W.resolve(n)}catch(n){return W.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):W.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):W.reject(n)}static resolve(e){return new W((n,r)=>{n(e)})}static reject(e){return new W((n,r)=>{r(e)})}static waitFor(e){return new W((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=W.resolve(!1);for(const r of e)n=n.next(s=>s?W.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new W((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let c=0;c<i;c++){const u=c;n(e[u]).next(d=>{o[u]=d,++l,l===i&&r(o)},d=>s(d))}})}static doWhile(e,n){return new W((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function ob(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function qi(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class cu{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}cu.oe=-1;function Ca(t){return t==null}function Zo(t){return t===0&&1/t==-1/0}function ab(t){return typeof t=="number"&&Number.isInteger(t)&&!Zo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */function hf(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Br(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function kg(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class qe{constructor(e,n){this.comparator=e,this.root=n||ut.EMPTY}insert(e,n){return new qe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(e){return new qe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ut.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new yo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new yo(this.root,e,this.comparator,!1)}getReverseIterator(){return new yo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new yo(this.root,e,this.comparator,!0)}}class yo{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ut{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??ut.RED,this.left=s??ut.EMPTY,this.right=i??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new ut(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return ut.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ue();const e=this.left.check();if(e!==this.right.check())throw ue();return e+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw ue()}get value(){throw ue()}get color(){throw ue()}get left(){throw ue()}get right(){throw ue()}copy(e,n,r,s,i){return this}insert(e,n,r){return new ut(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ft{constructor(e){this.comparator=e,this.data=new qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new df(this.data.getIterator())}getIteratorFrom(e){return new df(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof ft)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ft(this.comparator);return n.data=e,n}}class df{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ut{constructor(e){this.fields=e,e.sort(dt.comparator)}static empty(){return new Ut([])}unionWith(e){let n=new ft(dt.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Ut(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ys(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
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
 */class Dg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class pt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Dg("Invalid base64 string: "+i):i}}(e);return new pt(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new pt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Re(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}pt.EMPTY_BYTE_STRING=new pt("");const lb=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function hr(t){if(xe(!!t),typeof t=="string"){let e=0;const n=lb.exec(t);if(xe(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ke(t.seconds),nanos:Ke(t.nanos)}}function Ke(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Lr(t){return typeof t=="string"?pt.fromBase64String(t):pt.fromUint8Array(t)}/**
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
 */function uu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function hu(t){const e=t.mapValue.fields.__previous_value__;return uu(e)?hu(e):e}function Ri(t){const e=hr(t.mapValue.fields.__local_write_time__.timestampValue);return new nt(e.seconds,e.nanos)}/**
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
 */class cb{constructor(e,n,r,s,i,o,l,c,u){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u}}class Si{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Si("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Si&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const vo={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Fr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?uu(t)?4:hb(t)?9007199254740991:ub(t)?10:11:ue()}function dn(t,e){if(t===e)return!0;const n=Fr(t);if(n!==Fr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ri(t).isEqual(Ri(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=hr(s.timestampValue),l=hr(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return Lr(s.bytesValue).isEqual(Lr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ke(s.geoPointValue.latitude)===Ke(i.geoPointValue.latitude)&&Ke(s.geoPointValue.longitude)===Ke(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ke(s.integerValue)===Ke(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ke(s.doubleValue),l=Ke(i.doubleValue);return o===l?Zo(o)===Zo(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return ys(t.arrayValue.values||[],e.arrayValue.values||[],dn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(hf(o)!==hf(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!dn(o[c],l[c])))return!1;return!0}(t,e);default:return ue()}}function Pi(t,e){return(t.values||[]).find(n=>dn(n,e))!==void 0}function vs(t,e){if(t===e)return 0;const n=Fr(t),r=Fr(e);if(n!==r)return Re(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Re(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Ke(i.integerValue||i.doubleValue),c=Ke(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(t,e);case 3:return ff(t.timestampValue,e.timestampValue);case 4:return ff(Ri(t),Ri(e));case 5:return Re(t.stringValue,e.stringValue);case 6:return function(i,o){const l=Lr(i),c=Lr(o);return l.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),c=o.split("/");for(let u=0;u<l.length&&u<c.length;u++){const d=Re(l[u],c[u]);if(d!==0)return d}return Re(l.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=Re(Ke(i.latitude),Ke(o.latitude));return l!==0?l:Re(Ke(i.longitude),Ke(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return pf(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,c,u,d;const p=i.fields||{},g=o.fields||{},v=(l=p.value)===null||l===void 0?void 0:l.arrayValue,S=(c=g.value)===null||c===void 0?void 0:c.arrayValue,C=Re(((u=v==null?void 0:v.values)===null||u===void 0?void 0:u.length)||0,((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0);return C!==0?C:pf(v,S)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===vo.mapValue&&o===vo.mapValue)return 0;if(i===vo.mapValue)return 1;if(o===vo.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),u=o.fields||{},d=Object.keys(u);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const g=Re(c[p],d[p]);if(g!==0)return g;const v=vs(l[c[p]],u[d[p]]);if(v!==0)return v}return Re(c.length,d.length)}(t.mapValue,e.mapValue);default:throw ue()}}function ff(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Re(t,e);const n=hr(t),r=hr(e),s=Re(n.seconds,r.seconds);return s!==0?s:Re(n.nanos,r.nanos)}function pf(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=vs(n[s],r[s]);if(i)return i}return Re(n.length,r.length)}function Es(t){return lc(t)}function lc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=hr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Lr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return se.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=lc(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${lc(n.fields[o])}`;return s+"}"}(t.mapValue):ue()}function mf(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function cc(t){return!!t&&"integerValue"in t}function du(t){return!!t&&"arrayValue"in t}function gf(t){return!!t&&"nullValue"in t}function _f(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function No(t){return!!t&&"mapValue"in t}function ub(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function hi(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Br(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=hi(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=hi(t.arrayValue.values[n]);return e}return Object.assign({},t)}function hb(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class Nt{constructor(e){this.value=e}static empty(){return new Nt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!No(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=hi(n)}setAll(e){let n=dt.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=hi(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());No(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return dn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];No(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Br(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Nt(hi(this.value))}}function Ng(t){const e=[];return Br(t.fields,(n,r)=>{const s=new dt([n]);if(No(r)){const i=Ng(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Ut(e)}/**
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
 */class Tt{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new Tt(e,0,de.min(),de.min(),de.min(),Nt.empty(),0)}static newFoundDocument(e,n,r,s){return new Tt(e,1,n,de.min(),r,s,0)}static newNoDocument(e,n){return new Tt(e,2,n,de.min(),de.min(),Nt.empty(),0)}static newUnknownDocument(e,n){return new Tt(e,3,n,de.min(),de.min(),Nt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(de.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Nt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Nt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=de.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Tt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Tt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class ea{constructor(e,n){this.position=e,this.inclusive=n}}function yf(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=se.comparator(se.fromName(o.referenceValue),n.key):r=vs(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function vf(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!dn(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class Ci{constructor(e,n="asc"){this.field=e,this.dir=n}}function db(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class Og{}class Ye extends Og{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new pb(e,n,r):n==="array-contains"?new _b(e,r):n==="in"?new yb(e,r):n==="not-in"?new vb(e,r):n==="array-contains-any"?new Eb(e,r):new Ye(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new mb(e,r):new gb(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(vs(n,this.value)):n!==null&&Fr(this.value)===Fr(n)&&this.matchesComparison(vs(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ue()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tn extends Og{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new tn(e,n)}matches(e){return Vg(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Vg(t){return t.op==="and"}function Mg(t){return fb(t)&&Vg(t)}function fb(t){for(const e of t.filters)if(e instanceof tn)return!1;return!0}function uc(t){if(t instanceof Ye)return t.field.canonicalString()+t.op.toString()+Es(t.value);if(Mg(t))return t.filters.map(e=>uc(e)).join(",");{const e=t.filters.map(n=>uc(n)).join(",");return`${t.op}(${e})`}}function Lg(t,e){return t instanceof Ye?function(r,s){return s instanceof Ye&&r.op===s.op&&r.field.isEqual(s.field)&&dn(r.value,s.value)}(t,e):t instanceof tn?function(r,s){return s instanceof tn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&Lg(o,s.filters[l]),!0):!1}(t,e):void ue()}function Fg(t){return t instanceof Ye?function(n){return`${n.field.canonicalString()} ${n.op} ${Es(n.value)}`}(t):t instanceof tn?function(n){return n.op.toString()+" {"+n.getFilters().map(Fg).join(" ,")+"}"}(t):"Filter"}class pb extends Ye{constructor(e,n,r){super(e,n,r),this.key=se.fromName(r.referenceValue)}matches(e){const n=se.comparator(e.key,this.key);return this.matchesComparison(n)}}class mb extends Ye{constructor(e,n){super(e,"in",n),this.keys=Ug("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class gb extends Ye{constructor(e,n){super(e,"not-in",n),this.keys=Ug("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Ug(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>se.fromName(r.referenceValue))}class _b extends Ye{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return du(n)&&Pi(n.arrayValue,this.value)}}class yb extends Ye{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Pi(this.value.arrayValue,n)}}class vb extends Ye{constructor(e,n){super(e,"not-in",n)}matches(e){if(Pi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Pi(this.value.arrayValue,n)}}class Eb extends Ye{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!du(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Pi(this.value.arrayValue,r))}}/**
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
 */class Tb{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function Ef(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Tb(t,e,n,r,s,i,o)}function fu(t){const e=fe(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>uc(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Ca(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Es(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Es(r)).join(",")),e.ue=n}return e.ue}function pu(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!db(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Lg(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!vf(t.startAt,e.startAt)&&vf(t.endAt,e.endAt)}function hc(t){return se.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class Ss{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function wb(t,e,n,r,s,i,o,l){return new Ss(t,e,n,r,s,i,o,l)}function xa(t){return new Ss(t)}function Tf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function jg(t){return t.collectionGroup!==null}function di(t){const e=fe(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new ft(dt.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(u=>{u.isInequality()&&(l=l.add(u.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Ci(i,r))}),n.has(dt.keyField().canonicalString())||e.ce.push(new Ci(dt.keyField(),r))}return e.ce}function ln(t){const e=fe(t);return e.le||(e.le=Ib(e,di(t))),e.le}function Ib(t,e){if(t.limitType==="F")return Ef(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ci(s.field,i)});const n=t.endAt?new ea(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new ea(t.startAt.position,t.startAt.inclusive):null;return Ef(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function dc(t,e){const n=t.filters.concat([e]);return new Ss(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function fc(t,e,n){return new Ss(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ka(t,e){return pu(ln(t),ln(e))&&t.limitType===e.limitType}function Bg(t){return`${fu(ln(t))}|lt:${t.limitType}`}function ts(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>Fg(s)).join(", ")}]`),Ca(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>Es(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>Es(s)).join(",")),`Target(${r})`}(ln(t))}; limitType=${t.limitType})`}function Da(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):se.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of di(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,c){const u=yf(o,l,c);return o.inclusive?u<=0:u<0}(r.startAt,di(r),s)||r.endAt&&!function(o,l,c){const u=yf(o,l,c);return o.inclusive?u>=0:u>0}(r.endAt,di(r),s))}(t,e)}function Ab(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function $g(t){return(e,n)=>{let r=!1;for(const s of di(t)){const i=bb(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function bb(t,e,n){const r=t.field.isKeyField()?se.comparator(e.key,n.key):function(i,o,l){const c=o.data.field(i),u=l.data.field(i);return c!==null&&u!==null?vs(c,u):ue()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ue()}}/**
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
 */class Ps{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Br(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return kg(this.inner)}size(){return this.innerSize}}/**
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
 */const Rb=new qe(se.comparator);function Vn(){return Rb}const qg=new qe(se.comparator);function Xs(...t){let e=qg;for(const n of t)e=e.insert(n.key,n);return e}function Hg(t){let e=qg;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Pr(){return fi()}function Wg(){return fi()}function fi(){return new Ps(t=>t.toString(),(t,e)=>t.isEqual(e))}const Sb=new qe(se.comparator),Pb=new ft(se.comparator);function ve(...t){let e=Pb;for(const n of t)e=e.add(n);return e}const Cb=new ft(Re);function xb(){return Cb}/**
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
 */function mu(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Zo(e)?"-0":e}}function Gg(t){return{integerValue:""+t}}function kb(t,e){return ab(e)?Gg(e):mu(t,e)}/**
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
 */class Na{constructor(){this._=void 0}}function Db(t,e,n){return t instanceof xi?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&uu(i)&&(i=hu(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof ki?zg(t,e):t instanceof Di?Qg(t,e):function(s,i){const o=Kg(s,i),l=wf(o)+wf(s.Pe);return cc(o)&&cc(s.Pe)?Gg(l):mu(s.serializer,l)}(t,e)}function Nb(t,e,n){return t instanceof ki?zg(t,e):t instanceof Di?Qg(t,e):n}function Kg(t,e){return t instanceof ta?function(r){return cc(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class xi extends Na{}class ki extends Na{constructor(e){super(),this.elements=e}}function zg(t,e){const n=Jg(e);for(const r of t.elements)n.some(s=>dn(s,r))||n.push(r);return{arrayValue:{values:n}}}class Di extends Na{constructor(e){super(),this.elements=e}}function Qg(t,e){let n=Jg(e);for(const r of t.elements)n=n.filter(s=>!dn(s,r));return{arrayValue:{values:n}}}class ta extends Na{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function wf(t){return Ke(t.integerValue||t.doubleValue)}function Jg(t){return du(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class Ob{constructor(e,n){this.field=e,this.transform=n}}function Vb(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof ki&&s instanceof ki||r instanceof Di&&s instanceof Di?ys(r.elements,s.elements,dn):r instanceof ta&&s instanceof ta?dn(r.Pe,s.Pe):r instanceof xi&&s instanceof xi}(t.transform,e.transform)}class Mb{constructor(e,n){this.version=e,this.transformResults=n}}class Xt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Xt}static exists(e){return new Xt(void 0,e)}static updateTime(e){return new Xt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Oo(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Oa{}function Yg(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new gu(t.key,Xt.none()):new Hi(t.key,t.data,Xt.none());{const n=t.data,r=Nt.empty();let s=new ft(dt.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new gr(t.key,r,new Ut(s.toArray()),Xt.none())}}function Lb(t,e,n){t instanceof Hi?function(s,i,o){const l=s.value.clone(),c=Af(s.fieldTransforms,i,o.transformResults);l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof gr?function(s,i,o){if(!Oo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Af(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Xg(s)),c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function pi(t,e,n,r){return t instanceof Hi?function(i,o,l,c){if(!Oo(i.precondition,o))return l;const u=i.value.clone(),d=bf(i.fieldTransforms,c,o);return u.setAll(d),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(t,e,n,r):t instanceof gr?function(i,o,l,c){if(!Oo(i.precondition,o))return l;const u=bf(i.fieldTransforms,c,o),d=o.data;return d.setAll(Xg(i)),d.setAll(u),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,o,l){return Oo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function Fb(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Kg(r.transform,s||null);i!=null&&(n===null&&(n=Nt.empty()),n.set(r.field,i))}return n||null}function If(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ys(r,s,(i,o)=>Vb(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Hi extends Oa{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class gr extends Oa{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Xg(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Af(t,e,n){const r=new Map;xe(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,Nb(o,l,n[s]))}return r}function bf(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,Db(i,o,e))}return r}class gu extends Oa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ub extends Oa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class jb{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Lb(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=pi(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=pi(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Wg();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const c=Yg(o,l);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(de.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ve())}isEqual(e){return this.batchId===e.batchId&&ys(this.mutations,e.mutations,(n,r)=>If(n,r))&&ys(this.baseMutations,e.baseMutations,(n,r)=>If(n,r))}}class _u{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){xe(e.mutations.length===r.length);let s=function(){return Sb}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new _u(e,n,r,s)}}/**
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
 */class Bb{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class $b{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var Je,we;function qb(t){switch(t){default:return ue();case U.CANCELLED:case U.UNKNOWN:case U.DEADLINE_EXCEEDED:case U.RESOURCE_EXHAUSTED:case U.INTERNAL:case U.UNAVAILABLE:case U.UNAUTHENTICATED:return!1;case U.INVALID_ARGUMENT:case U.NOT_FOUND:case U.ALREADY_EXISTS:case U.PERMISSION_DENIED:case U.FAILED_PRECONDITION:case U.ABORTED:case U.OUT_OF_RANGE:case U.UNIMPLEMENTED:case U.DATA_LOSS:return!0}}function Zg(t){if(t===void 0)return On("GRPC error has no .code"),U.UNKNOWN;switch(t){case Je.OK:return U.OK;case Je.CANCELLED:return U.CANCELLED;case Je.UNKNOWN:return U.UNKNOWN;case Je.DEADLINE_EXCEEDED:return U.DEADLINE_EXCEEDED;case Je.RESOURCE_EXHAUSTED:return U.RESOURCE_EXHAUSTED;case Je.INTERNAL:return U.INTERNAL;case Je.UNAVAILABLE:return U.UNAVAILABLE;case Je.UNAUTHENTICATED:return U.UNAUTHENTICATED;case Je.INVALID_ARGUMENT:return U.INVALID_ARGUMENT;case Je.NOT_FOUND:return U.NOT_FOUND;case Je.ALREADY_EXISTS:return U.ALREADY_EXISTS;case Je.PERMISSION_DENIED:return U.PERMISSION_DENIED;case Je.FAILED_PRECONDITION:return U.FAILED_PRECONDITION;case Je.ABORTED:return U.ABORTED;case Je.OUT_OF_RANGE:return U.OUT_OF_RANGE;case Je.UNIMPLEMENTED:return U.UNIMPLEMENTED;case Je.DATA_LOSS:return U.DATA_LOSS;default:return ue()}}(we=Je||(Je={}))[we.OK=0]="OK",we[we.CANCELLED=1]="CANCELLED",we[we.UNKNOWN=2]="UNKNOWN",we[we.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",we[we.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",we[we.NOT_FOUND=5]="NOT_FOUND",we[we.ALREADY_EXISTS=6]="ALREADY_EXISTS",we[we.PERMISSION_DENIED=7]="PERMISSION_DENIED",we[we.UNAUTHENTICATED=16]="UNAUTHENTICATED",we[we.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",we[we.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",we[we.ABORTED=10]="ABORTED",we[we.OUT_OF_RANGE=11]="OUT_OF_RANGE",we[we.UNIMPLEMENTED=12]="UNIMPLEMENTED",we[we.INTERNAL=13]="INTERNAL",we[we.UNAVAILABLE=14]="UNAVAILABLE",we[we.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Hb(){return new TextEncoder}/**
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
 */const Wb=new kr([4294967295,4294967295],0);function Rf(t){const e=Hb().encode(t),n=new Ig;return n.update(e),new Uint8Array(n.digest())}function Sf(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new kr([n,r],0),new kr([s,i],0)]}class yu{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Zs(`Invalid padding: ${n}`);if(r<0)throw new Zs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Zs(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Zs(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=kr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(kr.fromNumber(r)));return s.compare(Wb)===1&&(s=new kr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Rf(e),[r,s]=Sf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new yu(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=Rf(e),[r,s]=Sf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Zs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Va{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Wi.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Va(de.min(),s,new qe(Re),Vn(),ve())}}class Wi{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Wi(r,n,ve(),ve(),ve())}}/**
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
 */class Vo{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class e_{constructor(e,n){this.targetId=e,this.me=n}}class t_{constructor(e,n,r=pt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Pf{constructor(){this.fe=0,this.ge=xf(),this.pe=pt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ve(),n=ve(),r=ve();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:ue()}}),new Wi(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=xf()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,xe(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Gb{constructor(e){this.Le=e,this.Be=new Map,this.ke=Vn(),this.qe=Cf(),this.Qe=new qe(Re)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:ue()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(hc(i))if(r===0){const o=new se(i.path);this.Ue(n,o,Tt.newNoDocument(o,de.min()))}else xe(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),c=l?this.Xe(l,e,o):1;if(c!==0){this.je(n);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,u)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=Lr(r).toUint8Array()}catch(c){if(c instanceof Dg)return _s("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new yu(o,s,i)}catch(c){return _s(c instanceof Zs?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&hc(l.target)){const c=new se(l.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,Tt.newNoDocument(c,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=ve();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(c=>{const u=this.Je(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Va(e,n,this.Qe,this.ke,r);return this.ke=Vn(),this.qe=Cf(),this.Qe=new qe(Re),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Pf,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new ft(Re),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||te("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Pf),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function Cf(){return new qe(se.comparator)}function xf(){return new qe(se.comparator)}const Kb=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),zb=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Qb=(()=>({and:"AND",or:"OR"}))();class Jb{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function pc(t,e){return t.useProto3Json||Ca(e)?e:{value:e}}function na(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function n_(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Yb(t,e){return na(t,e.toTimestamp())}function cn(t){return xe(!!t),de.fromTimestamp(function(n){const r=hr(n);return new nt(r.seconds,r.nanos)}(t))}function vu(t,e){return mc(t,e).canonicalString()}function mc(t,e){const n=function(s){return new Fe(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function r_(t){const e=Fe.fromString(t);return xe(l_(e)),e}function gc(t,e){return vu(t.databaseId,e.path)}function xl(t,e){const n=r_(e);if(n.get(1)!==t.databaseId.projectId)throw new Z(U.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Z(U.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new se(i_(n))}function s_(t,e){return vu(t.databaseId,e)}function Xb(t){const e=r_(t);return e.length===4?Fe.emptyPath():i_(e)}function _c(t){return new Fe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function i_(t){return xe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function kf(t,e,n){return{name:gc(t,e),fields:n.value.mapValue.fields}}function Zb(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:ue()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(u,d){return u.useProto3Json?(xe(d===void 0||typeof d=="string"),pt.fromBase64String(d||"")):(xe(d===void 0||d instanceof Buffer||d instanceof Uint8Array),pt.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(u){const d=u.code===void 0?U.UNKNOWN:Zg(u.code);return new Z(d,u.message||"")}(o);n=new t_(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=xl(t,r.document.name),i=cn(r.document.updateTime),o=r.document.createTime?cn(r.document.createTime):de.min(),l=new Nt({mapValue:{fields:r.document.fields}}),c=Tt.newFoundDocument(s,i,o,l),u=r.targetIds||[],d=r.removedTargetIds||[];n=new Vo(u,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=xl(t,r.document),i=r.readTime?cn(r.readTime):de.min(),o=Tt.newNoDocument(s,i),l=r.removedTargetIds||[];n=new Vo([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=xl(t,r.document),i=r.removedTargetIds||[];n=new Vo([],i,s,null)}else{if(!("filter"in e))return ue();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new $b(s,i),l=r.targetId;n=new e_(l,o)}}return n}function eR(t,e){let n;if(e instanceof Hi)n={update:kf(t,e.key,e.value)};else if(e instanceof gu)n={delete:gc(t,e.key)};else if(e instanceof gr)n={update:kf(t,e.key,e.data),updateMask:cR(e.fieldMask)};else{if(!(e instanceof Ub))return ue();n={verify:gc(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof xi)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ki)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Di)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof ta)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw ue()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Yb(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ue()}(t,e.precondition)),n}function tR(t,e){return t&&t.length>0?(xe(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?cn(s.updateTime):cn(i);return o.isEqual(de.min())&&(o=cn(i)),new Mb(o,s.transformResults||[])}(n,e))):[]}function nR(t,e){return{documents:[s_(t,e.path)]}}function rR(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=s_(t,s);const i=function(u){if(u.length!==0)return a_(tn.create(u,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(u){if(u.length!==0)return u.map(d=>function(g){return{field:ns(g.field),direction:oR(g.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=pc(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{_t:n,parent:s}}function sR(t){let e=Xb(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){xe(r===1);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const g=o_(p);return g instanceof tn&&Mg(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(g=>function(S){return new Ci(rs(S.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(p){let g;return g=typeof p=="object"?p.value:p,Ca(g)?null:g}(n.limit));let c=null;n.startAt&&(c=function(p){const g=!!p.before,v=p.values||[];return new ea(v,g)}(n.startAt));let u=null;return n.endAt&&(u=function(p){const g=!p.before,v=p.values||[];return new ea(v,g)}(n.endAt)),wb(e,s,o,i,l,"F",c,u)}function iR(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ue()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function o_(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=rs(n.unaryFilter.field);return Ye.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=rs(n.unaryFilter.field);return Ye.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=rs(n.unaryFilter.field);return Ye.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=rs(n.unaryFilter.field);return Ye.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ue()}}(t):t.fieldFilter!==void 0?function(n){return Ye.create(rs(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ue()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return tn.create(n.compositeFilter.filters.map(r=>o_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ue()}}(n.compositeFilter.op))}(t):ue()}function oR(t){return Kb[t]}function aR(t){return zb[t]}function lR(t){return Qb[t]}function ns(t){return{fieldPath:t.canonicalString()}}function rs(t){return dt.fromServerFormat(t.fieldPath)}function a_(t){return t instanceof Ye?function(n){if(n.op==="=="){if(_f(n.value))return{unaryFilter:{field:ns(n.field),op:"IS_NAN"}};if(gf(n.value))return{unaryFilter:{field:ns(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(_f(n.value))return{unaryFilter:{field:ns(n.field),op:"IS_NOT_NAN"}};if(gf(n.value))return{unaryFilter:{field:ns(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ns(n.field),op:aR(n.op),value:n.value}}}(t):t instanceof tn?function(n){const r=n.getFilters().map(s=>a_(s));return r.length===1?r[0]:{compositeFilter:{op:lR(n.op),filters:r}}}(t):ue()}function cR(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function l_(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class er{constructor(e,n,r,s,i=de.min(),o=de.min(),l=pt.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new er(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new er(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new er(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new er(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class uR{constructor(e){this.ct=e}}function hR(t){const e=sR({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?fc(e,e.limit,"L"):e}/**
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
 */class dR{constructor(){this.un=new fR}addToCollectionParentIndex(e,n){return this.un.add(n),W.resolve()}getCollectionParents(e,n){return W.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return W.resolve()}deleteFieldIndex(e,n){return W.resolve()}deleteAllFieldIndexes(e){return W.resolve()}createTargetIndexes(e,n){return W.resolve()}getDocumentsMatchingTarget(e,n){return W.resolve(null)}getIndexType(e,n){return W.resolve(0)}getFieldIndexes(e,n){return W.resolve([])}getNextCollectionGroupToUpdate(e){return W.resolve(null)}getMinOffset(e,n){return W.resolve(ur.min())}getMinOffsetFromCollectionGroup(e,n){return W.resolve(ur.min())}updateCollectionGroup(e,n,r){return W.resolve()}updateIndexEntries(e,n){return W.resolve()}}class fR{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new ft(Fe.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ft(Fe.comparator)).toArray()}}/**
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
 */class Ts{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ts(0)}static kn(){return new Ts(-1)}}/**
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
 */class pR{constructor(){this.changes=new Ps(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Tt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?W.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class mR{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class gR{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&pi(r.mutation,s,Ut.empty(),nt.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,ve()).next(()=>r))}getLocalViewOfDocuments(e,n,r=ve()){const s=Pr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Xs();return i.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Pr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,ve()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=Vn();const o=fi(),l=function(){return fi()}();return n.forEach((c,u)=>{const d=r.get(u.key);s.has(u.key)&&(d===void 0||d.mutation instanceof gr)?i=i.insert(u.key,u):d!==void 0?(o.set(u.key,d.mutation.getFieldMask()),pi(d.mutation,u,d.mutation.getFieldMask(),nt.now())):o.set(u.key,Ut.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((u,d)=>o.set(u,d)),n.forEach((u,d)=>{var p;return l.set(u,new mR(d,(p=o.get(u))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,n){const r=fi();let s=new qe((o,l)=>o-l),i=ve();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let d=r.get(c)||Ut.empty();d=l.applyToLocalView(u,d),r.set(c,d);const p=(s.get(l.batchId)||ve()).add(c);s=s.insert(l.batchId,p)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,d=c.value,p=Wg();d.forEach(g=>{if(!i.has(g)){const v=Yg(n.get(g),r.get(g));v!==null&&p.set(g,v),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,p))}return W.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return se.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):jg(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):W.resolve(Pr());let l=-1,c=i;return o.next(u=>W.forEach(u,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?W.resolve():this.remoteDocumentCache.getEntry(e,d).next(g=>{c=c.insert(d,g)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,c,u,ve())).next(d=>({batchId:l,changes:Hg(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new se(n)).next(r=>{let s=Xs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=Xs();return this.indexManager.getCollectionParents(e,i).next(l=>W.forEach(l,c=>{const u=function(p,g){return new Ss(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,r,s).next(d=>{d.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((c,u)=>{const d=u.getKey();o.get(d)===null&&(o=o.insert(d,Tt.newInvalidDocument(d)))});let l=Xs();return o.forEach((c,u)=>{const d=i.get(c);d!==void 0&&pi(d.mutation,u,Ut.empty(),nt.now()),Da(n,u)&&(l=l.insert(c,u))}),l})}}/**
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
 */class _R{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return W.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:cn(s.createTime)}}(n)),W.resolve()}getNamedQuery(e,n){return W.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:hR(s.bundledQuery),readTime:cn(s.readTime)}}(n)),W.resolve()}}/**
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
 */class yR{constructor(){this.overlays=new qe(se.comparator),this.Ir=new Map}getOverlay(e,n){return W.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Pr();return W.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),W.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),W.resolve()}getOverlaysForCollection(e,n,r){const s=Pr(),i=n.length+1,o=new se(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return W.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new qe((u,d)=>u-d);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>r){let d=i.get(u.largestBatchId);d===null&&(d=Pr(),i=i.insert(u.largestBatchId,d)),d.set(u.getKey(),u)}}const l=Pr(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,d)=>l.set(u,d)),!(l.size()>=s)););return W.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Bb(n,r));let i=this.Ir.get(n);i===void 0&&(i=ve(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
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
 */class vR{constructor(){this.sessionToken=pt.EMPTY_BYTE_STRING}getSessionToken(e){return W.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,W.resolve()}}/**
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
 */class Eu{constructor(){this.Tr=new ft(st.Er),this.dr=new ft(st.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new st(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new st(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new se(new Fe([])),r=new st(n,e),s=new st(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new se(new Fe([])),r=new st(n,e),s=new st(n,e+1);let i=ve();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new st(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class st{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return se.comparator(e.key,n.key)||Re(e.wr,n.wr)}static Ar(e,n){return Re(e.wr,n.wr)||se.comparator(e.key,n.key)}}/**
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
 */class ER{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new ft(st.Er)}checkEmpty(e){return W.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new jb(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new st(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return W.resolve(o)}lookupMutationBatch(e,n){return W.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return W.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return W.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return W.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new st(n,0),s=new st(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),W.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new ft(Re);return n.forEach(s=>{const i=new st(s,0),o=new st(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),W.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;se.isDocumentKey(i)||(i=i.child(""));const o=new st(new se(i),0);let l=new ft(Re);return this.br.forEachWhile(c=>{const u=c.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(l=l.add(c.wr)),!0)},o),W.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){xe(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return W.forEach(n.mutations,s=>{const i=new st(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new st(n,0),s=this.br.firstAfterOrEqual(r);return W.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,W.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class TR{constructor(e){this.Mr=e,this.docs=function(){return new qe(se.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return W.resolve(r?r.document.mutableCopy():Tt.newInvalidDocument(n))}getEntries(e,n){let r=Vn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Tt.newInvalidDocument(s))}),W.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Vn();const o=n.path,l=new se(o.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:d}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||rb(nb(d),r)<=0||(s.has(d.key)||Da(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return W.resolve(i)}getAllFromCollectionGroup(e,n,r,s){ue()}Or(e,n){return W.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new wR(this)}getSize(e){return W.resolve(this.size)}}class wR extends pR{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),W.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
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
 */class IR{constructor(e){this.persistence=e,this.Nr=new Ps(n=>fu(n),pu),this.lastRemoteSnapshotVersion=de.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Eu,this.targetCount=0,this.kr=Ts.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),W.resolve()}getLastRemoteSnapshotVersion(e){return W.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return W.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),W.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),W.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Ts(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,W.resolve()}updateTargetData(e,n){return this.Kn(n),W.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,W.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),W.waitFor(i).next(()=>s)}getTargetCount(e){return W.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return W.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),W.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),W.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),W.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return W.resolve(r)}containsKey(e,n){return W.resolve(this.Br.containsKey(n))}}/**
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
 */class AR{constructor(e,n){this.qr={},this.overlays={},this.Qr=new cu(0),this.Kr=!1,this.Kr=!0,this.$r=new vR,this.referenceDelegate=e(this),this.Ur=new IR(this),this.indexManager=new dR,this.remoteDocumentCache=function(s){return new TR(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new uR(n),this.Gr=new _R(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new yR,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new ER(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){te("MemoryPersistence","Starting transaction:",e);const s=new bR(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return W.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class bR extends ib{constructor(e){super(),this.currentSequenceNumber=e}}class Tu{constructor(e){this.persistence=e,this.Jr=new Eu,this.Yr=null}static Zr(e){return new Tu(e)}get Xr(){if(this.Yr)return this.Yr;throw ue()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),W.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),W.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),W.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return W.forEach(this.Xr,r=>{const s=se.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,de.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return W.or([()=>W.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
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
 */class wu{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=ve(),s=ve();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new wu(e,n.fromCache,r,s)}}/**
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
 */class RR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class SR{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return pw()?8:ob(It())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new RR;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(Gs()<=Ee.DEBUG&&te("QueryEngine","SDK will not create cache indexes for query:",ts(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),W.resolve()):(Gs()<=Ee.DEBUG&&te("QueryEngine","Query:",ts(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Gs()<=Ee.DEBUG&&te("QueryEngine","The SDK decides to create cache indexes for query:",ts(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ln(n))):W.resolve())}Yi(e,n){if(Tf(n))return W.resolve(null);let r=ln(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=fc(n,null,"F"),r=ln(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=ve(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const u=this.ts(n,l);return this.ns(n,u,o,c.readTime)?this.Yi(e,fc(n,null,"F")):this.rs(e,u,n,c)}))})))}Zi(e,n,r,s){return Tf(n)||s.isEqual(de.min())?W.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?W.resolve(null):(Gs()<=Ee.DEBUG&&te("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ts(n)),this.rs(e,o,n,tb(s,-1)).next(l=>l))})}ts(e,n){let r=new ft($g(e));return n.forEach((s,i)=>{Da(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return Gs()<=Ee.DEBUG&&te("QueryEngine","Using full collection scan to execute query:",ts(n)),this.Ji.getDocumentsMatchingQuery(e,n,ur.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */class PR{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new qe(Re),this._s=new Ps(i=>fu(i),pu),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new gR(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function CR(t,e,n,r){return new PR(t,e,n,r)}async function c_(t,e){const n=fe(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let c=ve();for(const u of s){o.push(u.batchId);for(const d of u.mutations)c=c.add(d.key)}for(const u of i){l.push(u.batchId);for(const d of u.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(r,c).next(u=>({hs:u,removedBatchIds:o,addedBatchIds:l}))})})}function xR(t,e){const n=fe(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,c,u,d){const p=u.batch,g=p.keys();let v=W.resolve();return g.forEach(S=>{v=v.next(()=>d.getEntry(c,S)).next(C=>{const k=u.docVersions.get(S);xe(k!==null),C.version.compareTo(k)<0&&(p.applyToRemoteDocument(C,u),C.isValidDocument()&&(C.setReadTime(u.commitVersion),d.addEntry(C)))})}),v.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let c=ve();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function u_(t){const e=fe(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function kR(t,e){const n=fe(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((d,p)=>{const g=s.get(p);if(!g)return;l.push(n.Ur.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.Ur.addMatchingKeys(i,d.addedDocuments,p)));let v=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?v=v.withResumeToken(pt.EMPTY_BYTE_STRING,de.min()).withLastLimboFreeSnapshotVersion(de.min()):d.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(d.resumeToken,r)),s=s.insert(p,v),function(C,k,N){return C.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-C.snapshotVersion.toMicroseconds()>=3e8?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(g,v,d)&&l.push(n.Ur.updateTargetData(i,v))});let c=Vn(),u=ve();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),l.push(DR(i,o,e.documentUpdates).next(d=>{c=d.Ps,u=d.Is})),!r.isEqual(de.min())){const d=n.Ur.getLastRemoteSnapshotVersion(i).next(p=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(d)}return W.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.os=s,i))}function DR(t,e,n){let r=ve(),s=ve();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Vn();return n.forEach((l,c)=>{const u=i.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(de.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):te("LocalStore","Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)}),{Ps:o,Is:s}})}function NR(t,e){const n=fe(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function OR(t,e){const n=fe(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,W.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new er(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function yc(t,e,n){const r=fe(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!qi(o))throw o;te("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function Df(t,e,n){const r=fe(t);let s=de.min(),i=ve();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,u,d){const p=fe(c),g=p._s.get(d);return g!==void 0?W.resolve(p.os.get(g)):p.Ur.getTargetData(u,d)}(r,o,ln(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(c=>{i=c})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:de.min(),n?i:ve())).next(l=>(VR(r,Ab(e),l),{documents:l,Ts:i})))}function VR(t,e,n){let r=t.us.get(e)||de.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class Nf{constructor(){this.activeTargetIds=xb()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class MR{constructor(){this.so=new Nf,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Nf,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class LR{_o(e){}shutdown(){}}/**
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
 */class Of{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){te("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){te("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Eo=null;function kl(){return Eo===null?Eo=function(){return 268435456+Math.round(2147483648*Math.random())}():Eo++,"0x"+Eo.toString(16)}/**
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
 */const FR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class UR{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const _t="WebChannelConnection";class jR extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=kl(),c=this.xo(n,r.toUriEncodedString());te("RestConnection",`Sending RPC '${n}' ${l}:`,c,s);const u={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(u,i,o),this.No(n,c,u,s).then(d=>(te("RestConnection",`Received RPC '${n}' ${l}: `,d),d),d=>{throw _s("RestConnection",`RPC '${n}' ${l} failed with error: `,d,"url: ",c,"request:",s),d})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Rs}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=FR[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=kl();return new Promise((o,l)=>{const c=new Ag;c.setWithCredentials(!0),c.listenOnce(bg.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Do.NO_ERROR:const d=c.getResponseJson();te(_t,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(d)),o(d);break;case Do.TIMEOUT:te(_t,`RPC '${e}' ${i} timed out`),l(new Z(U.DEADLINE_EXCEEDED,"Request time out"));break;case Do.HTTP_ERROR:const p=c.getStatus();if(te(_t,`RPC '${e}' ${i} failed with status:`,p,"response text:",c.getResponseText()),p>0){let g=c.getResponseJson();Array.isArray(g)&&(g=g[0]);const v=g==null?void 0:g.error;if(v&&v.status&&v.message){const S=function(k){const N=k.toLowerCase().replace(/_/g,"-");return Object.values(U).indexOf(N)>=0?N:U.UNKNOWN}(v.status);l(new Z(S,v.message))}else l(new Z(U.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new Z(U.UNAVAILABLE,"Connection failed."));break;default:ue()}}finally{te(_t,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(s);te(_t,`RPC '${e}' ${i} sending request:`,s),c.send(n,"POST",u,r,15)})}Bo(e,n,r){const s=kl(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Pg(),l=Sg(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const d=i.join("");te(_t,`Creating RPC '${e}' stream ${s}: ${d}`,c);const p=o.createWebChannel(d,c);let g=!1,v=!1;const S=new UR({Io:k=>{v?te(_t,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(g||(te(_t,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),te(_t,`RPC '${e}' stream ${s} sending:`,k),p.send(k))},To:()=>p.close()}),C=(k,N,O)=>{k.listen(N,B=>{try{O(B)}catch(G){setTimeout(()=>{throw G},0)}})};return C(p,Ys.EventType.OPEN,()=>{v||(te(_t,`RPC '${e}' stream ${s} transport opened.`),S.yo())}),C(p,Ys.EventType.CLOSE,()=>{v||(v=!0,te(_t,`RPC '${e}' stream ${s} transport closed`),S.So())}),C(p,Ys.EventType.ERROR,k=>{v||(v=!0,_s(_t,`RPC '${e}' stream ${s} transport errored:`,k),S.So(new Z(U.UNAVAILABLE,"The operation could not be completed")))}),C(p,Ys.EventType.MESSAGE,k=>{var N;if(!v){const O=k.data[0];xe(!!O);const B=O,G=B.error||((N=B[0])===null||N===void 0?void 0:N.error);if(G){te(_t,`RPC '${e}' stream ${s} received error:`,G);const V=G.status;let $=function(y){const I=Je[y];if(I!==void 0)return Zg(I)}(V),T=G.message;$===void 0&&($=U.INTERNAL,T="Unknown error status: "+V+" with message "+G.message),v=!0,S.So(new Z($,T)),p.close()}else te(_t,`RPC '${e}' stream ${s} received:`,O),S.bo(O)}}),C(l,Rg.STAT_EVENT,k=>{k.stat===ac.PROXY?te(_t,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===ac.NOPROXY&&te(_t,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.wo()},0),S}}function Dl(){return typeof document<"u"?document:null}/**
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
 */function Ma(t){return new Jb(t,!0)}/**
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
 */class h_{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&te("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class d_{constructor(e,n,r,s,i,o,l,c){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new h_(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===U.RESOURCE_EXHAUSTED?(On(n.toString()),On("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===U.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new Z(U.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return te("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(te("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class BR extends d_{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=Zb(this.serializer,e),r=function(i){if(!("targetChange"in i))return de.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?de.min():o.readTime?cn(o.readTime):de.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=_c(this.serializer),n.addTarget=function(i,o){let l;const c=o.target;if(l=hc(c)?{documents:nR(i,c)}:{query:rR(i,c)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=n_(i,o.resumeToken);const u=pc(i,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(de.min())>0){l.readTime=na(i,o.snapshotVersion.toTimestamp());const u=pc(i,o.expectedCount);u!==null&&(l.expectedCount=u)}return l}(this.serializer,e);const r=iR(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=_c(this.serializer),n.removeTarget=e,this.a_(n)}}class $R extends d_{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return xe(!!e.streamToken),this.lastStreamToken=e.streamToken,xe(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){xe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=tR(e.writeResults,e.commitTime),r=cn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=_c(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>eR(this.serializer,r))};this.a_(n)}}/**
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
 */class qR extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new Z(U.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,mc(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new Z(U.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,mc(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new Z(U.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class HR{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(On(n),this.D_=!1):te("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class WR{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{$r(this)&&(te("RemoteStore","Restarting streams for network reachability change."),await async function(c){const u=fe(c);u.L_.add(4),await Gi(u),u.q_.set("Unknown"),u.L_.delete(4),await La(u)}(this))})}),this.q_=new HR(r,s)}}async function La(t){if($r(t))for(const e of t.B_)await e(!0)}async function Gi(t){for(const e of t.B_)await e(!1)}function f_(t,e){const n=fe(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Ru(n)?bu(n):Cs(n).r_()&&Au(n,e))}function Iu(t,e){const n=fe(t),r=Cs(n);n.N_.delete(e),r.r_()&&p_(n,e),n.N_.size===0&&(r.r_()?r.o_():$r(n)&&n.q_.set("Unknown"))}function Au(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(de.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Cs(t).A_(e)}function p_(t,e){t.Q_.xe(e),Cs(t).R_(e)}function bu(t){t.Q_=new Gb({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Cs(t).start(),t.q_.v_()}function Ru(t){return $r(t)&&!Cs(t).n_()&&t.N_.size>0}function $r(t){return fe(t).L_.size===0}function m_(t){t.Q_=void 0}async function GR(t){t.q_.set("Online")}async function KR(t){t.N_.forEach((e,n)=>{Au(t,e)})}async function zR(t,e){m_(t),Ru(t)?(t.q_.M_(e),bu(t)):t.q_.set("Unknown")}async function QR(t,e,n){if(t.q_.set("Online"),e instanceof t_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){te("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ra(t,r)}else if(e instanceof Vo?t.Q_.Ke(e):e instanceof e_?t.Q_.He(e):t.Q_.We(e),!n.isEqual(de.min()))try{const r=await u_(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.N_.get(u);d&&i.N_.set(u,d.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,u)=>{const d=i.N_.get(c);if(!d)return;i.N_.set(c,d.withResumeToken(pt.EMPTY_BYTE_STRING,d.snapshotVersion)),p_(i,c);const p=new er(d.target,c,u,d.sequenceNumber);Au(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){te("RemoteStore","Failed to raise snapshot:",r),await ra(t,r)}}async function ra(t,e,n){if(!qi(e))throw e;t.L_.add(1),await Gi(t),t.q_.set("Offline"),n||(n=()=>u_(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{te("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await La(t)})}function g_(t,e){return e().catch(n=>ra(t,n,e))}async function Fa(t){const e=fe(t),n=dr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;JR(e);)try{const s=await NR(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,YR(e,s)}catch(s){await ra(e,s)}__(e)&&y_(e)}function JR(t){return $r(t)&&t.O_.length<10}function YR(t,e){t.O_.push(e);const n=dr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function __(t){return $r(t)&&!dr(t).n_()&&t.O_.length>0}function y_(t){dr(t).start()}async function XR(t){dr(t).p_()}async function ZR(t){const e=dr(t);for(const n of t.O_)e.m_(n.mutations)}async function eS(t,e,n){const r=t.O_.shift(),s=_u.from(r,e,n);await g_(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Fa(t)}async function tS(t,e){e&&dr(t).V_&&await async function(r,s){if(function(o){return qb(o)&&o!==U.ABORTED}(s.code)){const i=r.O_.shift();dr(r).s_(),await g_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Fa(r)}}(t,e),__(t)&&y_(t)}async function Vf(t,e){const n=fe(t);n.asyncQueue.verifyOperationInProgress(),te("RemoteStore","RemoteStore received new credentials");const r=$r(n);n.L_.add(3),await Gi(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await La(n)}async function nS(t,e){const n=fe(t);e?(n.L_.delete(2),await La(n)):e||(n.L_.add(2),await Gi(n),n.q_.set("Unknown"))}function Cs(t){return t.K_||(t.K_=function(n,r,s){const i=fe(n);return i.w_(),new BR(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:GR.bind(null,t),Ro:KR.bind(null,t),mo:zR.bind(null,t),d_:QR.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Ru(t)?bu(t):t.q_.set("Unknown")):(await t.K_.stop(),m_(t))})),t.K_}function dr(t){return t.U_||(t.U_=function(n,r,s){const i=fe(n);return i.w_(),new $R(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:XR.bind(null,t),mo:tS.bind(null,t),f_:ZR.bind(null,t),g_:eS.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await Fa(t)):(await t.U_.stop(),t.O_.length>0&&(te("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
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
 */class Su{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new ar,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new Su(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Z(U.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Pu(t,e){if(On("AsyncQueue",`${e}: ${t}`),qi(t))return new Z(U.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class hs{constructor(e){this.comparator=e?(n,r)=>e(n,r)||se.comparator(n.key,r.key):(n,r)=>se.comparator(n.key,r.key),this.keyedMap=Xs(),this.sortedSet=new qe(this.comparator)}static emptySet(e){return new hs(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof hs)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new hs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class Mf{constructor(){this.W_=new qe(se.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):ue():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class ws{constructor(e,n,r,s,i,o,l,c,u){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new ws(e,n,hs.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ka(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class rS{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class sS{constructor(){this.queries=Lf(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=fe(n),i=s.queries;s.queries=Lf(),i.forEach((o,l)=>{for(const c of l.j_)c.onError(r)})})(this,new Z(U.ABORTED,"Firestore shutting down"))}}function Lf(){return new Ps(t=>Bg(t),ka)}async function v_(t,e){const n=fe(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new rS,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=Pu(o,`Initialization of query '${ts(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&Cu(n)}async function E_(t,e){const n=fe(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function iS(t,e){const n=fe(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&Cu(n)}function oS(t,e,n){const r=fe(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function Cu(t){t.Y_.forEach(e=>{e.next()})}var vc,Ff;(Ff=vc||(vc={})).ea="default",Ff.Cache="cache";class T_{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ws(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=ws.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==vc.Cache}}/**
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
 */class w_{constructor(e){this.key=e}}class I_{constructor(e){this.key=e}}class aS{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ve(),this.mutatedKeys=ve(),this.Aa=$g(e),this.Ra=new hs(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Mf,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,p)=>{const g=s.get(d),v=Da(this.query,p)?p:null,S=!!g&&this.mutatedKeys.has(g.key),C=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let k=!1;g&&v?g.data.isEqual(v.data)?S!==C&&(r.track({type:3,doc:v}),k=!0):this.ga(g,v)||(r.track({type:2,doc:v}),k=!0,(c&&this.Aa(v,c)>0||u&&this.Aa(v,u)<0)&&(l=!0)):!g&&v?(r.track({type:0,doc:v}),k=!0):g&&!v&&(r.track({type:1,doc:g}),k=!0,(c||u)&&(l=!0)),k&&(v?(o=o.add(v),i=C?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((d,p)=>function(v,S){const C=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ue()}};return C(v)-C(S)}(d.type,p.type)||this.Aa(d.doc,p.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,u=c!==this.Ea;return this.Ea=c,o.length!==0||u?{snapshot:new ws(this.query,e.Ra,i,o,e.mutatedKeys,c===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Mf,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ve(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new I_(r))}),this.da.forEach(r=>{e.has(r)||n.push(new w_(r))}),n}ba(e){this.Ta=e.Ts,this.da=ve();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return ws.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class lS{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class cS{constructor(e){this.key=e,this.va=!1}}class uS{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Ps(l=>Bg(l),ka),this.Ma=new Map,this.xa=new Set,this.Oa=new qe(se.comparator),this.Na=new Map,this.La=new Eu,this.Ba={},this.ka=new Map,this.qa=Ts.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function hS(t,e,n=!0){const r=C_(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await A_(r,e,n,!0),s}async function dS(t,e){const n=C_(t);await A_(n,e,!0,!1)}async function A_(t,e,n,r){const s=await OR(t.localStore,ln(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await fS(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&f_(t.remoteStore,s),l}async function fS(t,e,n,r,s){t.Ka=(p,g,v)=>async function(C,k,N,O){let B=k.view.ma(N);B.ns&&(B=await Df(C.localStore,k.query,!1).then(({documents:T})=>k.view.ma(T,B)));const G=O&&O.targetChanges.get(k.targetId),V=O&&O.targetMismatches.get(k.targetId)!=null,$=k.view.applyChanges(B,C.isPrimaryClient,G,V);return jf(C,k.targetId,$.wa),$.snapshot}(t,p,g,v);const i=await Df(t.localStore,e,!0),o=new aS(e,i.Ts),l=o.ma(i.documents),c=Wi.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),u=o.applyChanges(l,t.isPrimaryClient,c);jf(t,n,u.wa);const d=new lS(e,n,o);return t.Fa.set(e,d),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),u.snapshot}async function pS(t,e,n){const r=fe(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!ka(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await yc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Iu(r.remoteStore,s.targetId),Ec(r,s.targetId)}).catch($i)):(Ec(r,s.targetId),await yc(r.localStore,s.targetId,!0))}async function mS(t,e){const n=fe(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Iu(n.remoteStore,r.targetId))}async function gS(t,e,n){const r=IS(t);try{const s=await function(o,l){const c=fe(o),u=nt.now(),d=l.reduce((v,S)=>v.add(S.key),ve());let p,g;return c.persistence.runTransaction("Locally write mutations","readwrite",v=>{let S=Vn(),C=ve();return c.cs.getEntries(v,d).next(k=>{S=k,S.forEach((N,O)=>{O.isValidDocument()||(C=C.add(N))})}).next(()=>c.localDocuments.getOverlayedDocuments(v,S)).next(k=>{p=k;const N=[];for(const O of l){const B=Fb(O,p.get(O.key).overlayedDocument);B!=null&&N.push(new gr(O.key,B,Ng(B.value.mapValue),Xt.exists(!0)))}return c.mutationQueue.addMutationBatch(v,u,N,l)}).next(k=>{g=k;const N=k.applyToLocalDocumentSet(p,C);return c.documentOverlayCache.saveOverlays(v,k.batchId,N)})}).then(()=>({batchId:g.batchId,changes:Hg(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,c){let u=o.Ba[o.currentUser.toKey()];u||(u=new qe(Re)),u=u.insert(l,c),o.Ba[o.currentUser.toKey()]=u}(r,s.batchId,n),await Ki(r,s.changes),await Fa(r.remoteStore)}catch(s){const i=Pu(s,"Failed to persist write");n.reject(i)}}async function b_(t,e){const n=fe(t);try{const r=await kR(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(xe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?xe(o.va):s.removedDocuments.size>0&&(xe(o.va),o.va=!1))}),await Ki(n,r,e)}catch(r){await $i(r)}}function Uf(t,e,n){const r=fe(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const c=fe(o);c.onlineState=l;let u=!1;c.queries.forEach((d,p)=>{for(const g of p.j_)g.Z_(l)&&(u=!0)}),u&&Cu(c)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function _S(t,e,n){const r=fe(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new qe(se.comparator);o=o.insert(i,Tt.newNoDocument(i,de.min()));const l=ve().add(i),c=new Va(de.min(),new Map,new qe(Re),o,l);await b_(r,c),r.Oa=r.Oa.remove(i),r.Na.delete(e),xu(r)}else await yc(r.localStore,e,!1).then(()=>Ec(r,e,n)).catch($i)}async function yS(t,e){const n=fe(t),r=e.batch.batchId;try{const s=await xR(n.localStore,e);S_(n,r,null),R_(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ki(n,s)}catch(s){await $i(s)}}async function vS(t,e,n){const r=fe(t);try{const s=await function(o,l){const c=fe(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let d;return c.mutationQueue.lookupMutationBatch(u,l).next(p=>(xe(p!==null),d=p.keys(),c.mutationQueue.removeMutationBatch(u,p))).next(()=>c.mutationQueue.performConsistencyCheck(u)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(u,d,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d)).next(()=>c.localDocuments.getDocuments(u,d))})}(r.localStore,e);S_(r,e,n),R_(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Ki(r,s)}catch(s){await $i(s)}}function R_(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function S_(t,e,n){const r=fe(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function Ec(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||P_(t,r)})}function P_(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Iu(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),xu(t))}function jf(t,e,n){for(const r of n)r instanceof w_?(t.La.addReference(r.key,e),ES(t,r)):r instanceof I_?(te("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||P_(t,r.key)):ue()}function ES(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(te("SyncEngine","New document in limbo: "+n),t.xa.add(r),xu(t))}function xu(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new se(Fe.fromString(e)),r=t.qa.next();t.Na.set(r,new cS(n)),t.Oa=t.Oa.insert(n,r),f_(t.remoteStore,new er(ln(xa(n.path)),r,"TargetPurposeLimboResolution",cu.oe))}}async function Ki(t,e,n){const r=fe(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,c)=>{o.push(r.Ka(c,e,n).then(u=>{var d;if((u||n)&&r.isPrimaryClient){const p=u?!u.fromCache:(d=n==null?void 0:n.targetChanges.get(c.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(u){s.push(u);const p=wu.Wi(c.targetId,u);i.push(p)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(c,u){const d=fe(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>W.forEach(u,g=>W.forEach(g.$i,v=>d.persistence.referenceDelegate.addReference(p,g.targetId,v)).next(()=>W.forEach(g.Ui,v=>d.persistence.referenceDelegate.removeReference(p,g.targetId,v)))))}catch(p){if(!qi(p))throw p;te("LocalStore","Failed to update sequence numbers: "+p)}for(const p of u){const g=p.targetId;if(!p.fromCache){const v=d.os.get(g),S=v.snapshotVersion,C=v.withLastLimboFreeSnapshotVersion(S);d.os=d.os.insert(g,C)}}}(r.localStore,i))}async function TS(t,e){const n=fe(t);if(!n.currentUser.isEqual(e)){te("SyncEngine","User change. New user:",e.toKey());const r=await c_(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(c=>{c.reject(new Z(U.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ki(n,r.hs)}}function wS(t,e){const n=fe(t),r=n.Na.get(e);if(r&&r.va)return ve().add(r.key);{let s=ve();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function C_(t){const e=fe(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=b_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=wS.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=_S.bind(null,e),e.Ca.d_=iS.bind(null,e.eventManager),e.Ca.$a=oS.bind(null,e.eventManager),e}function IS(t){const e=fe(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=yS.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=vS.bind(null,e),e}class sa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ma(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return CR(this.persistence,new SR,e.initialUser,this.serializer)}Ga(e){return new AR(Tu.Zr,this.serializer)}Wa(e){return new MR}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}sa.provider={build:()=>new sa};class Tc{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Uf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=TS.bind(null,this.syncEngine),await nS(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new sS}()}createDatastore(e){const n=Ma(e.databaseInfo.databaseId),r=function(i){return new jR(i)}(e.databaseInfo);return function(i,o,l,c){return new qR(i,o,l,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new WR(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>Uf(this.syncEngine,n,0),function(){return Of.D()?new Of:new LR}())}createSyncEngine(e,n){return function(s,i,o,l,c,u,d){const p=new uS(s,i,o,l,c,u);return d&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=fe(s);te("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Gi(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Tc.provider={build:()=>new Tc};/**
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
 */class x_{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):On("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class AS{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=vt.UNAUTHENTICATED,this.clientId=xg.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{te("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(te("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ar;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Pu(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Nl(t,e){t.asyncQueue.verifyOperationInProgress(),te("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await c_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Bf(t,e){t.asyncQueue.verifyOperationInProgress();const n=await bS(t);te("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Vf(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Vf(e.remoteStore,s)),t._onlineComponents=e}async function bS(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){te("FirestoreClient","Using user provided OfflineComponentProvider");try{await Nl(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===U.FAILED_PRECONDITION||s.code===U.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;_s("Error using user provided cache. Falling back to memory cache: "+n),await Nl(t,new sa)}}else te("FirestoreClient","Using default OfflineComponentProvider"),await Nl(t,new sa);return t._offlineComponents}async function k_(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(te("FirestoreClient","Using user provided OnlineComponentProvider"),await Bf(t,t._uninitializedComponentsProvider._online)):(te("FirestoreClient","Using default OnlineComponentProvider"),await Bf(t,new Tc))),t._onlineComponents}function RS(t){return k_(t).then(e=>e.syncEngine)}async function wc(t){const e=await k_(t),n=e.eventManager;return n.onListen=hS.bind(null,e.syncEngine),n.onUnlisten=pS.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=dS.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=mS.bind(null,e.syncEngine),n}function SS(t,e,n={}){const r=new ar;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,u){const d=new x_({next:g=>{d.Za(),o.enqueueAndForget(()=>E_(i,p));const v=g.docs.has(l);!v&&g.fromCache?u.reject(new Z(U.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&g.fromCache&&c&&c.source==="server"?u.reject(new Z(U.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(g)},error:g=>u.reject(g)}),p=new T_(xa(l.path),d,{includeMetadataChanges:!0,_a:!0});return v_(i,p)}(await wc(t),t.asyncQueue,e,n,r)),r.promise}/**
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
 */function D_(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const $f=new Map;/**
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
 */function N_(t,e,n){if(!n)throw new Z(U.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function PS(t,e,n,r){if(e===!0&&r===!0)throw new Z(U.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function qf(t){if(!se.isDocumentKey(t))throw new Z(U.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Hf(t){if(se.isDocumentKey(t))throw new Z(U.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Ua(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ue()}function un(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Z(U.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ua(t);throw new Z(U.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class Wf{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new Z(U.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new Z(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}PS("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=D_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new Z(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new Z(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new Z(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ja{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Wf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Z(U.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Z(U.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Wf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new GA;switch(r.type){case"firstParty":return new JA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new Z(U.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=$f.get(n);r&&(te("ComponentProvider","Removing Datastore"),$f.delete(n),r.terminate())}(this),Promise.resolve()}}function CS(t,e,n,r={}){var s;const i=(t=un(t,ja))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&_s("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,c;if(typeof r.mockUserToken=="string")l=r.mockUserToken,c=vt.MOCK_USER;else{l=aw(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const u=r.mockUserToken.sub||r.mockUserToken.user_id;if(!u)throw new Z(U.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new vt(u)}t._authCredentials=new KA(new Cg(l,c))}}/**
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
 */class qr{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new qr(this.firestore,e,this._query)}}class kt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new lr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new kt(this.firestore,e,this._key)}}class lr extends qr{constructor(e,n,r){super(e,n,xa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new kt(this.firestore,null,new se(e))}withConverter(e){return new lr(this.firestore,e,this._path)}}function To(t,e,...n){if(t=rt(t),N_("collection","path",e),t instanceof ja){const r=Fe.fromString(e,...n);return Hf(r),new lr(t,null,r)}{if(!(t instanceof kt||t instanceof lr))throw new Z(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return Hf(r),new lr(t.firestore,null,r)}}function br(t,e,...n){if(t=rt(t),arguments.length===1&&(e=xg.newId()),N_("doc","path",e),t instanceof ja){const r=Fe.fromString(e,...n);return qf(r),new kt(t,null,new se(r))}{if(!(t instanceof kt||t instanceof lr))throw new Z(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return qf(r),new kt(t.firestore,t instanceof lr?t.converter:null,new se(r))}}/**
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
 */class Gf{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new h_(this,"async_queue_retry"),this.Vu=()=>{const r=Dl();r&&te("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=Dl();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=Dl();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new ar;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!qi(e))throw e;te("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw On("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=Su.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&ue()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function Kf(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class Ur extends ja{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Gf,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Gf(e),this._firestoreClient=void 0,await e}}}function xS(t,e){const n=typeof t=="object"?t:Bm(),r=typeof t=="string"?t:e||"(default)",s=Qc(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=iw("firestore");i&&CS(s,...i)}return s}function ku(t){if(t._terminated)throw new Z(U.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||kS(t),t._firestoreClient}function kS(t){var e,n,r;const s=t._freezeSettings(),i=function(l,c,u,d){return new cb(l,c,u,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,D_(d.experimentalLongPollingOptions),d.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new AS(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(t._componentsProvider))}/**
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
 */class Is{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Is(pt.fromBase64String(e))}catch(n){throw new Z(U.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Is(pt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Ba{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new Z(U.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new dt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class $a{constructor(e){this._methodName=e}}/**
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
 */class Du{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new Z(U.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new Z(U.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Re(this._lat,e._lat)||Re(this._long,e._long)}}/**
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
 */class Nu{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
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
 */const DS=/^__.*__$/;class NS{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new gr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Hi(e,this.data,n,this.fieldTransforms)}}class O_{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new gr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function V_(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ue()}}class Ou{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Ou(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return ia(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(V_(this.Cu)&&DS.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class OS{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Ma(e)}Qu(e,n,r,s=!1){return new Ou({Cu:e,methodName:n,qu:r,path:dt.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Vu(t){const e=t._freezeSettings(),n=Ma(t._databaseId);return new OS(t._databaseId,!!e.ignoreUndefinedProperties,n)}function VS(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);Lu("Data must be an object, but it was:",o,r);const l=M_(r,o);let c,u;if(i.merge)c=new Ut(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=Ic(e,p,n);if(!o.contains(g))throw new Z(U.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);F_(d,g)||d.push(g)}c=new Ut(d),u=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,u=o.fieldTransforms;return new NS(new Nt(l),c,u)}class qa extends $a{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof qa}}class Mu extends $a{_toFieldTransform(e){return new Ob(e.path,new xi)}isEqual(e){return e instanceof Mu}}function MS(t,e,n,r){const s=t.Qu(1,e,n);Lu("Data must be an object, but it was:",s,r);const i=[],o=Nt.empty();Br(r,(c,u)=>{const d=Fu(e,c,n);u=rt(u);const p=s.Nu(d);if(u instanceof qa)i.push(d);else{const g=zi(u,p);g!=null&&(i.push(d),o.set(d,g))}});const l=new Ut(i);return new O_(o,l,s.fieldTransforms)}function LS(t,e,n,r,s,i){const o=t.Qu(1,e,n),l=[Ic(e,r,n)],c=[s];if(i.length%2!=0)throw new Z(U.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(Ic(e,i[g])),c.push(i[g+1]);const u=[],d=Nt.empty();for(let g=l.length-1;g>=0;--g)if(!F_(u,l[g])){const v=l[g];let S=c[g];S=rt(S);const C=o.Nu(v);if(S instanceof qa)u.push(v);else{const k=zi(S,C);k!=null&&(u.push(v),d.set(v,k))}}const p=new Ut(u);return new O_(d,p,o.fieldTransforms)}function FS(t,e,n,r=!1){return zi(n,t.Qu(r?4:3,e))}function zi(t,e){if(L_(t=rt(t)))return Lu("Unsupported field value:",e,t),M_(t,e);if(t instanceof $a)return function(r,s){if(!V_(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let c=zi(l,s.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=rt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return kb(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=nt.fromDate(r);return{timestampValue:na(s.serializer,i)}}if(r instanceof nt){const i=new nt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:na(s.serializer,i)}}if(r instanceof Du)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Is)return{bytesValue:n_(s.serializer,r._byteString)};if(r instanceof kt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:vu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Nu)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return mu(l.serializer,c)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${Ua(r)}`)}(t,e)}function M_(t,e){const n={};return kg(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Br(t,(r,s)=>{const i=zi(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function L_(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof nt||t instanceof Du||t instanceof Is||t instanceof kt||t instanceof $a||t instanceof Nu)}function Lu(t,e,n){if(!L_(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=Ua(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Ic(t,e,n){if((e=rt(e))instanceof Ba)return e._internalPath;if(typeof e=="string")return Fu(t,e);throw ia("Field path arguments must be of type string or ",t,!1,void 0,n)}const US=new RegExp("[~\\*/\\[\\]]");function Fu(t,e,n){if(e.search(US)>=0)throw ia(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ba(...e.split("."))._internalPath}catch{throw ia(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function ia(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Z(U.INVALID_ARGUMENT,l+t+c)}function F_(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class U_{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new kt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new jS(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Ha("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class jS extends U_{data(){return super.data()}}function Ha(t,e){return typeof e=="string"?Fu(t,e):e instanceof Ba?e._internalPath:e._delegate._internalPath}/**
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
 */function BS(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new Z(U.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Uu{}class j_ extends Uu{}function zf(t,e,...n){let r=[];e instanceof Uu&&r.push(e),r=r.concat(n),function(i){const o=i.filter(c=>c instanceof ju).length,l=i.filter(c=>c instanceof Wa).length;if(o>1||o>0&&l>0)throw new Z(U.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class Wa extends j_{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Wa(e,n,r)}_apply(e){const n=this._parse(e);return B_(e._query,n),new qr(e.firestore,e.converter,dc(e._query,n))}_parse(e){const n=Vu(e.firestore);return function(i,o,l,c,u,d,p){let g;if(u.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new Z(U.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){Jf(p,d);const v=[];for(const S of p)v.push(Qf(c,i,S));g={arrayValue:{values:v}}}else g=Qf(c,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||Jf(p,d),g=FS(l,o,p,d==="in"||d==="not-in");return Ye.create(u,d,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function $S(t,e,n){const r=e,s=Ha("where",t);return Wa._create(s,r,n)}class ju extends Uu{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new ju(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:tn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const c of l)B_(o,c),o=dc(o,c)}(e._query,n),new qr(e.firestore,e.converter,dc(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Bu extends j_{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Bu(e,n)}_apply(e){const n=function(s,i,o){if(s.startAt!==null)throw new Z(U.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new Z(U.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ci(i,o)}(e._query,this._field,this._direction);return new qr(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Ss(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function qS(t,e="asc"){const n=e,r=Ha("orderBy",t);return Bu._create(r,n)}function Qf(t,e,n){if(typeof(n=rt(n))=="string"){if(n==="")throw new Z(U.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!jg(e)&&n.indexOf("/")!==-1)throw new Z(U.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Fe.fromString(n));if(!se.isDocumentKey(r))throw new Z(U.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return mf(t,new se(r))}if(n instanceof kt)return mf(t,n._key);throw new Z(U.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ua(n)}.`)}function Jf(t,e){if(!Array.isArray(t)||t.length===0)throw new Z(U.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function B_(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new Z(U.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Z(U.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class HS{convertValue(e,n="none"){switch(Fr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ke(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Lr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ue()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Br(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Ke(o.doubleValue));return new Nu(i)}convertGeoPoint(e){return new Du(Ke(e.latitude),Ke(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=hu(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ri(e));default:return null}}convertTimestamp(e){const n=hr(e);return new nt(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Fe.fromString(e);xe(l_(r));const s=new Si(r.get(1),r.get(3)),i=new se(r.popFirst(5));return s.isEqual(n)||On(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function WS(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
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
 */class ei{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class $_ extends U_{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Mo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Ha("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Mo extends $_{data(e={}){return super.data(e)}}class GS{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new ei(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Mo(this._firestore,this._userDataWriter,r.key,r,new ei(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new Z(U.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const c=new Mo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ei(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new Mo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ei(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,d=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),d=o.indexOf(l.doc.key)),{type:KS(l.type),doc:c,oldIndex:u,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function KS(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ue()}}/**
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
 */function zS(t){t=un(t,kt);const e=un(t.firestore,Ur);return SS(ku(e),t._key).then(n=>H_(e,t,n))}class q_ extends HS{constructor(e){super(),this.firestore=e}convertBytes(e){return new Is(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new kt(this.firestore,null,n)}}function Yf(t,e,n,...r){t=un(t,kt);const s=un(t.firestore,Ur),i=Vu(s);let o;return o=typeof(e=rt(e))=="string"||e instanceof Ba?LS(i,"updateDoc",t._key,e,n,r):MS(i,"updateDoc",t._key,e),$u(s,[o.toMutation(t._key,Xt.exists(!0))])}function Xf(t){return $u(un(t.firestore,Ur),[new gu(t._key,Xt.none())])}function Zf(t,e){const n=un(t.firestore,Ur),r=br(t),s=WS(t.converter,e);return $u(n,[VS(Vu(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Xt.exists(!1))]).then(()=>r)}function Ol(t,...e){var n,r,s;t=rt(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Kf(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Kf(e[o])){const p=e[o];e[o]=(n=p.next)===null||n===void 0?void 0:n.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let c,u,d;if(t instanceof kt)u=un(t.firestore,Ur),d=xa(t._key.path),c={next:p=>{e[o]&&e[o](H_(u,t,p))},error:e[o+1],complete:e[o+2]};else{const p=un(t,qr);u=un(p.firestore,Ur),d=p._query;const g=new q_(u);c={next:v=>{e[o]&&e[o](new GS(u,g,p,v))},error:e[o+1],complete:e[o+2]},BS(t._query)}return function(g,v,S,C){const k=new x_(C),N=new T_(v,k,S);return g.asyncQueue.enqueueAndForget(async()=>v_(await wc(g),N)),()=>{k.Za(),g.asyncQueue.enqueueAndForget(async()=>E_(await wc(g),N))}}(ku(u),d,l,c)}function $u(t,e){return function(r,s){const i=new ar;return r.asyncQueue.enqueueAndForget(async()=>gS(await RS(r),s,i)),i.promise}(ku(t),e)}function H_(t,e,n){const r=n.docs.get(e._key),s=new q_(t);return new $_(t,s,e._key,r,new ei(n.hasPendingWrites,n.fromCache),e.converter)}function Yr(){return new Mu("serverTimestamp")}(function(e,n=!0){(function(s){Rs=s})(As),gs(new Nr("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new Ur(new zA(r.getProvider("auth-internal")),new XA(r.getProvider("app-check-internal")),function(u,d){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new Z(U.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Si(u.options.projectId,d)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),or(uf,"4.7.3",e),or(uf,"4.7.3","esm2017")})();const QS={apiKey:"AIzaSyDl_ZotC1HAoXMVnzbiV1ZEJAntZeE5bkA",authDomain:"projectj-manager.firebaseapp.com",projectId:"projectj-manager",storageBucket:"projectj-manager.firebasestorage.app",messagingSenderId:"405863016772",appId:"1:405863016772:web:3b2bdcd3f3cf3674a90f11",measurementId:"G-4MS8Q74NXP"},W_=jm(QS),yn=HA(W_),rn=xS(W_),qu=ym("auth",()=>{const t=Se(yn.currentUser),e=Se(!1);let n=null;return{user:t,init:()=>{e.value||(e.value=!0,n=iu(yn,u=>{t.value=u}))},dispose:()=>{n&&n(),n=null,e.value=!1},login:async(u,d)=>{const p=await x0(yn,u,d);t.value=p.user},register:async(u,d)=>{const p=await C0(yn,u,d);t.value=p.user},loginWithGoogle:async()=>{const u=new Tn,d=await Z0(yn,u);t.value=d.user},logout:async()=>{await N0(yn),t.value=null}}}),Hu=ym("projects",()=>{const t=Se([]),e=Se(null),n=Se([]),r=Se(!1),s=Se(!1),i=Se(""),o=Se("");let l=null,c=null,u=null;const d=je(()=>{const $={todo:[],doing:[],done:[]};for(const T of n.value){const _=T.status||"todo";$[_]||($[_]=[]),$[_].push(T)}return $});return{projects:t,activeProject:e,tasks:n,tasksByStatus:d,loadingProjects:r,loadingTasks:s,projectsError:i,tasksError:o,subscribeProjects:$=>{if(!$)return;l&&l(),r.value=!0,i.value="";const T=zf(To(rn,"projects"),$S("userId","==",$));l=Ol(T,_=>{const y=_.docs.map(I=>({id:I.id,...I.data()}));y.sort((I,b)=>{var Qe,ot;const R=(Qe=I==null?void 0:I.createdAt)!=null&&Qe.toMillis?I.createdAt.toMillis():0;return((ot=b==null?void 0:b.createdAt)!=null&&ot.toMillis?b.createdAt.toMillis():0)-R}),t.value=y,r.value=!1},_=>{i.value=(_==null?void 0:_.message)||"Erreur Firestore (projects)",r.value=!1})},addProject:async({userId:$,name:T,description:_,color:y})=>{if(!$)throw new Error("User not authenticated");await Zf(To(rn,"projects"),{userId:$,name:T,description:_,color:y,createdAt:Yr(),updatedAt:Yr()})},updateProject:async($,T)=>{await Yf(br(rn,"projects",$),{...T,updatedAt:Yr()})},deleteProject:async $=>{await Xf(br(rn,"projects",$))},subscribeProject:$=>{if(!$)return;u&&u();const T=br(rn,"projects",$);u=Ol(T,_=>{_.exists()?e.value={id:_.id,..._.data()}:e.value=null})},subscribeTasks:$=>{if(!$)return;c&&c(),s.value=!0,o.value="";const T=zf(To(rn,"projects",$,"tasks"),qS("createdAt","asc"));c=Ol(T,_=>{n.value=_.docs.map(y=>({id:y.id,...y.data()})),s.value=!1},_=>{o.value=(_==null?void 0:_.message)||"Erreur Firestore (tasks)",s.value=!1})},addTask:async($,{title:T,description:_,dueDate:y,status:I})=>{await Zf(To(rn,"projects",$,"tasks"),{title:T,description:_,dueDate:y||null,status:I||"todo",createdAt:Yr(),updatedAt:Yr()})},updateTask:async($,T,_)=>{await Yf(br(rn,"projects",$,"tasks",T),{..._,updatedAt:Yr()})},deleteTask:async($,T)=>{await Xf(br(rn,"projects",$,"tasks",T))},ensureProjectLoadedOnce:async $=>{const T=t.value.find(I=>I.id===$);if(T)return e.value=T,T;const _=await zS(br(rn,"projects",$));if(!_.exists())return null;const y={id:_.id,..._.data()};return e.value=y,y},unsubscribeAll:()=>{l&&l(),c&&c(),u&&u(),l=null,c=null,u=null,t.value=[],e.value=null,n.value=[],i.value="",o.value=""}}}),JS={class:"border-b bg-white"},YS={class:"mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4"},XS={key:0,class:"flex items-center gap-3"},ZS={class:"hidden text-sm text-slate-500 sm:inline"},eP={key:1},tP={__name:"Navbar",setup(t){const e=qu(),n=Hu(),r=Aa();e.init();const s=je(()=>e.user),i=async()=>{await e.logout(),n.unsubscribeAll(),r.push("/login")};return(o,l)=>(_e(),Ae("header",JS,[F("nav",YS,[F("button",{class:"text-sm font-semibold text-slate-900",onClick:l[0]||(l[0]=c=>qt(r).push(s.value?"/dashboard":"/login"))}," TaskFlow "),s.value?(_e(),Ae("div",XS,[F("button",{class:"rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50",onClick:l[1]||(l[1]=c=>qt(r).push("/dashboard"))}," Dashboard "),F("span",ZS,Me(s.value.email),1),F("button",{class:"rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800",onClick:i}," Déconnexion ")])):(_e(),Ae("div",eP,[F("button",{class:"rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800",onClick:l[2]||(l[2]=c=>qt(r).push("/login"))}," Connexion ")]))])]))}},nP={class:"min-h-screen"},rP={class:"mx-auto w-full max-w-6xl px-4 py-6"},sP={__name:"App",setup(t){return(e,n)=>(_e(),Ae("div",nP,[Xe(tP),F("main",rP,[Xe(qt(km))])]))}},iP={class:"mx-auto mt-10 w-full max-w-md"},oP={class:"rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"},aP={class:"text-lg font-semibold text-slate-900"},lP={type:"submit",class:"w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"},cP={key:0,class:"rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"},uP={class:"mt-5 text-center text-sm text-slate-600"},hP={__name:"LoginView",setup(t){const e=Se(""),n=Se(""),r=Se(""),s=Se("login"),i=qu(),o=Aa(),l=async()=>{try{i.init(),s.value==="register"?await i.register(e.value,n.value):await i.login(e.value,n.value),o.push("/dashboard")}catch(u){r.value=u.message}},c=async()=>{try{r.value="",i.init(),await i.loginWithGoogle(),o.push("/dashboard")}catch(u){r.value=u.message}};return(u,d)=>(_e(),Ae("div",iP,[F("div",oP,[F("h2",aP,Me(s.value==="register"?"Inscription":"Connexion"),1),d[6]||(d[6]=F("p",{class:"mt-1 text-sm text-slate-500"},"Accédez à vos projets et tâches.",-1)),F("form",{class:"mt-6 space-y-4",onSubmit:Hc(l,["prevent"])},[F("div",null,[d[4]||(d[4]=F("label",{class:"mb-1 block text-sm font-medium text-slate-700"},"Email",-1)),nr(F("input",{"onUpdate:modelValue":d[0]||(d[0]=p=>e.value=p),type:"email",placeholder:"vous@exemple.com",class:"w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400",required:""},null,512),[[rr,e.value]])]),F("div",null,[d[5]||(d[5]=F("label",{class:"mb-1 block text-sm font-medium text-slate-700"},"Mot de passe",-1)),nr(F("input",{"onUpdate:modelValue":d[1]||(d[1]=p=>n.value=p),type:"password",placeholder:"••••••••",class:"w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400",required:""},null,512),[[rr,n.value]])]),F("button",lP,Me(s.value==="register"?"Créer un compte":"Se connecter"),1),F("button",{type:"button",class:"w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50",onClick:c}," Continuer avec Google "),r.value?(_e(),Ae("p",cP,Me(r.value),1)):Pt("",!0)],32),F("div",uP,[s.value==="login"?(_e(),Ae("button",{key:0,type:"button",class:"font-medium text-slate-900 hover:underline",onClick:d[2]||(d[2]=p=>s.value="register")}," Créer un compte ")):(_e(),Ae("button",{key:1,type:"button",class:"font-medium text-slate-900 hover:underline",onClick:d[3]||(d[3]=p=>s.value="login")}," J'ai déjà un compte "))])])]))}},dP={key:0,class:"fixed inset-0 z-50"},fP={class:"relative mx-auto mt-24 w-[min(92vw,560px)] rounded-xl bg-white shadow-lg"},pP={class:"flex items-center justify-between border-b px-5 py-4"},mP={class:"text-base font-semibold text-slate-900"},gP={class:"px-5 py-4"},Wu={__name:"Modal",props:{open:{type:Boolean,default:!1},title:{type:String,default:""}},emits:["close"],setup(t,{emit:e}){const n=t,r=e,s=i=>{i.key==="Escape"&&r("close")};return _a(()=>{document.addEventListener("keydown",s)}),Hp(()=>{document.removeEventListener("keydown",s)}),Rn(()=>n.open,i=>{i?document.body.style.overflow="hidden":document.body.style.overflow=""},{immediate:!0}),(i,o)=>(_e(),Dr(dv,{to:"body"},[t.open?(_e(),Ae("div",dP,[F("div",{class:"absolute inset-0 bg-black/40",onClick:o[0]||(o[0]=l=>i.$emit("close"))}),F("div",fP,[F("div",pP,[F("h3",mP,Me(t.title),1),F("button",{class:"rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700",onClick:o[1]||(o[1]=l=>i.$emit("close")),"aria-label":"Fermer"}," ✕ ")]),F("div",gP,[bv(i.$slots,"default")])])])):Pt("",!0)]))}},_P={class:"flex items-center justify-between gap-3"},yP={class:"flex items-center gap-2"},vP={type:"submit",class:"rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"},EP={__name:"ProjectModal",props:{open:{type:Boolean,default:!1},initial:{type:Object,default:null}},emits:["close","save"],setup(t,{emit:e}){const n=t,r=e,s=je(()=>{var u;return!!((u=n.initial)!=null&&u.id)}),i=Se(""),o=Se(""),l=Se("#3b82f6");Rn(()=>[n.open,n.initial],([u])=>{var d,p,g;u&&(i.value=((d=n.initial)==null?void 0:d.name)||"",o.value=((p=n.initial)==null?void 0:p.description)||"",l.value=((g=n.initial)==null?void 0:g.color)||"#3b82f6")},{immediate:!0});const c=()=>{r("save",{name:i.value.trim(),description:o.value.trim(),color:l.value})};return(u,d)=>(_e(),Dr(Wu,{open:t.open,title:s.value?"Modifier le projet":"Nouveau projet",onClose:d[4]||(d[4]=p=>u.$emit("close"))},{default:ma(()=>[F("form",{class:"space-y-4",onSubmit:Hc(c,["prevent"])},[F("div",null,[d[5]||(d[5]=F("label",{class:"mb-1 block text-sm font-medium text-slate-700"},"Nom",-1)),nr(F("input",{"onUpdate:modelValue":d[0]||(d[0]=p=>i.value=p),class:"w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400",placeholder:"Nom du projet",required:""},null,512),[[rr,i.value]])]),F("div",null,[d[6]||(d[6]=F("label",{class:"mb-1 block text-sm font-medium text-slate-700"},"Description",-1)),nr(F("textarea",{"onUpdate:modelValue":d[1]||(d[1]=p=>o.value=p),rows:"3",class:"w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400",placeholder:"Description"},null,512),[[rr,o.value]])]),F("div",_P,[F("div",null,[d[7]||(d[7]=F("label",{class:"mb-1 block text-sm font-medium text-slate-700"},"Couleur",-1)),nr(F("input",{"onUpdate:modelValue":d[2]||(d[2]=p=>l.value=p),type:"color",class:"h-10 w-14 rounded border border-slate-200 bg-white"},null,512),[[rr,l.value]])]),F("div",yP,[F("button",{type:"button",class:"rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50",onClick:d[3]||(d[3]=p=>u.$emit("close"))}," Annuler "),F("button",vP,Me(s.value?"Mettre à jour":"Créer"),1)])])],32)]),_:1},8,["open","title"]))}},TP={class:"space-y-4"},wP={class:"text-sm text-slate-600"},IP={class:"flex items-center justify-end gap-2"},G_={__name:"ConfirmModal",props:{open:{type:Boolean,default:!1},title:{type:String,default:"Confirmer la suppression"},message:{type:String,default:"Cette action est irréversible."},confirmText:{type:String,default:"Supprimer"},cancelText:{type:String,default:"Annuler"}},emits:["close","confirm"],setup(t){return(e,n)=>(_e(),Dr(Wu,{open:t.open,title:t.title,onClose:n[2]||(n[2]=r=>e.$emit("close"))},{default:ma(()=>[F("div",TP,[F("p",wP,Me(t.message),1),F("div",IP,[F("button",{type:"button",class:"rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50",onClick:n[0]||(n[0]=r=>e.$emit("close"))},Me(t.cancelText),1),F("button",{type:"button",class:"rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-500",onClick:n[1]||(n[1]=r=>e.$emit("confirm"))},Me(t.confirmText),1)])])]),_:1},8,["open","title"]))}},AP={key:0,class:"mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"},bP={key:1,class:"mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"},RP={class:"mt-6"},SP={class:"flex items-center justify-between"},PP={key:0,class:"text-sm text-slate-500"},CP={key:0,class:"mt-3 rounded-xl border border-dashed border-slate-200 bg-white p-6"},xP={class:"mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"},kP={class:"flex items-start justify-between gap-3"},DP=["onClick"],NP={class:"flex items-center gap-2"},OP={class:"text-sm font-semibold text-slate-900"},VP={key:0,class:"mt-2 line-clamp-3 text-sm text-slate-600"},MP={class:"flex flex-col items-end gap-2"},LP=["onClick"],FP=["onClick"],UP={__name:"DashboardView",setup(t){const e=Aa(),n=qu(),r=Hu();n.init();const s=je(()=>{var V;return(V=n.user)==null?void 0:V.uid}),i=Se(""),o=Se(!1),l=Se(null),c=Se(!1),u=Se(null),d=je(()=>{const V=u.value;return V!=null&&V.name?`Supprimer le projet "${V.name}" ?`:"Supprimer ce projet ?"}),p=()=>{c.value=!1,u.value=null},g=je(()=>r.projects),v=je(()=>r.loadingProjects),S=je(()=>r.projectsError),C=()=>{i.value="",l.value=null,o.value=!0},k=V=>{i.value="",l.value=V,o.value=!0},N=async V=>{var $,T;i.value="";try{if(!(($=V==null?void 0:V.name)!=null&&$.trim()))return;(T=l.value)!=null&&T.id?await r.updateProject(l.value.id,V):await r.addProject({userId:s.value,...V}),o.value=!1,l.value=null}catch(_){i.value=(_==null?void 0:_.message)||"Erreur lors de l'enregistrement"}},O=V=>{u.value=V,c.value=!0},B=async()=>{const V=u.value;if(p(),!!(V!=null&&V.id)){i.value="";try{await r.deleteProject(V.id)}catch($){i.value=($==null?void 0:$.message)||"Erreur lors de la suppression"}}},G=V=>{e.push(`/projects/${V.id}`)};return Rn(s,V=>{V&&r.subscribeProjects(V)},{immediate:!0}),_a(()=>{s.value&&r.subscribeProjects(s.value)}),(V,$)=>(_e(),Ae("div",null,[F("div",{class:"flex flex-wrap items-center justify-between gap-3"},[$[1]||($[1]=F("div",null,[F("h1",{class:"text-xl font-semibold text-slate-900"},"Tableau de bord"),F("p",{class:"mt-1 text-sm text-slate-500"},"Gérez vos projets.")],-1)),F("button",{class:"rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800",onClick:C}," Nouveau projet ")]),i.value?(_e(),Ae("p",AP,Me(i.value),1)):Pt("",!0),S.value?(_e(),Ae("p",bP,Me(S.value),1)):Pt("",!0),F("div",RP,[F("div",SP,[$[2]||($[2]=F("h3",{class:"text-sm font-semibold text-slate-900"},"Mes projets",-1)),v.value?(_e(),Ae("span",PP,"Chargement...")):Pt("",!0)]),g.value.length===0?(_e(),Ae("div",CP,[...$[3]||($[3]=[F("p",{class:"text-sm text-slate-600"},"Aucun projet pour le moment.",-1)])])):Pt("",!0),F("div",xP,[(_e(!0),Ae(ht,null,bo(g.value,T=>(_e(),Ae("div",{key:T.id,class:"rounded-xl border border-slate-200 bg-white p-4 shadow-sm"},[F("div",kP,[F("button",{class:"text-left",onClick:_=>G(T)},[F("div",NP,[F("span",{class:"h-2.5 w-2.5 rounded-full",style:ha({backgroundColor:T.color||"#3b82f6"})},null,4),F("div",OP,Me(T.name),1)]),T.description?(_e(),Ae("div",VP,Me(T.description),1)):Pt("",!0)],8,DP),F("div",MP,[F("button",{class:"text-sm text-slate-700 hover:underline",onClick:_=>k(T)},"Modifier",8,LP),F("button",{class:"text-sm text-red-600 hover:underline",onClick:_=>O(T)},"Supprimer",8,FP)])])]))),128))])]),Xe(EP,{open:o.value,initial:l.value,onClose:$[0]||($[0]=T=>o.value=!1),onSave:N},null,8,["open","initial"]),Xe(G_,{open:c.value,title:"Supprimer le projet",message:d.value,confirmText:"Supprimer",onClose:p,onConfirm:B},null,8,["open","message"])]))}},jP={class:"flex items-center justify-between gap-3"},BP={class:"flex items-center gap-2"},$P={__name:"TaskModal",props:{open:{type:Boolean,default:!1}},emits:["close","save"],setup(t,{emit:e}){const n=t,r=e,s=Se(""),i=Se(""),o=Se("");Rn(()=>n.open,c=>{c&&(s.value="",i.value="",o.value="")});const l=()=>{r("save",{title:s.value.trim(),description:i.value.trim(),dueDate:o.value||null})};return(c,u)=>(_e(),Dr(Wu,{open:t.open,title:"Nouvelle tâche",onClose:u[4]||(u[4]=d=>c.$emit("close"))},{default:ma(()=>[F("form",{class:"space-y-4",onSubmit:Hc(l,["prevent"])},[F("div",null,[u[5]||(u[5]=F("label",{class:"mb-1 block text-sm font-medium text-slate-700"},"Titre",-1)),nr(F("input",{"onUpdate:modelValue":u[0]||(u[0]=d=>s.value=d),class:"w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400",placeholder:"Titre",required:""},null,512),[[rr,s.value]])]),F("div",null,[u[6]||(u[6]=F("label",{class:"mb-1 block text-sm font-medium text-slate-700"},"Description",-1)),nr(F("textarea",{"onUpdate:modelValue":u[1]||(u[1]=d=>i.value=d),rows:"3",class:"w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400",placeholder:"Description"},null,512),[[rr,i.value]])]),F("div",jP,[F("div",null,[u[7]||(u[7]=F("label",{class:"mb-1 block text-sm font-medium text-slate-700"},"Date limite",-1)),nr(F("input",{"onUpdate:modelValue":u[2]||(u[2]=d=>o.value=d),type:"date",class:"rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"},null,512),[[rr,o.value]])]),F("div",BP,[F("button",{type:"button",class:"rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50",onClick:u[3]||(u[3]=d=>c.$emit("close"))}," Annuler "),u[8]||(u[8]=F("button",{type:"submit",class:"rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"}," Ajouter ",-1))])])],32)]),_:1},8,["open"]))}},qP={class:"flex flex-wrap items-start justify-between gap-3"},HP={class:"text-xl font-semibold text-slate-900"},WP={key:0,class:"mt-1 text-sm text-slate-600"},GP={class:"flex items-center gap-2"},KP={key:0,class:"mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"},zP={class:"mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3"},QP={class:"rounded-xl border border-slate-200 bg-white shadow-sm"},JP={class:"space-y-3 p-4"},YP={class:"text-sm font-semibold text-slate-900"},XP={key:0,class:"mt-1 text-sm text-slate-600"},ZP={key:1,class:"mt-2 text-xs text-slate-500"},eC={class:"mt-3 flex flex-wrap gap-2"},tC=["onClick"],nC=["onClick"],rC={class:"rounded-xl border border-slate-200 bg-white shadow-sm"},sC={class:"space-y-3 p-4"},iC={class:"text-sm font-semibold text-slate-900"},oC={key:0,class:"mt-1 text-sm text-slate-600"},aC={key:1,class:"mt-2 text-xs text-slate-500"},lC={class:"mt-3 flex flex-wrap gap-2"},cC=["onClick"],uC=["onClick"],hC=["onClick"],dC={class:"rounded-xl border border-slate-200 bg-white shadow-sm"},fC={class:"space-y-3 p-4"},pC={class:"text-sm font-semibold text-slate-900"},mC={key:0,class:"mt-1 text-sm text-slate-600"},gC={key:1,class:"mt-2 text-xs text-slate-500"},_C={class:"mt-3 flex flex-wrap gap-2"},yC=["onClick"],vC=["onClick"],EC={__name:"ProjectDetails",setup(t){const e=YT(),n=Aa(),r=Hu(),s=je(()=>e.params.id),i=Se(""),o=Se(!1),l=Se(!1),c=Se(null),u=je(()=>{const N=c.value;return N!=null&&N.title?`Supprimer la tâche "${N.title}" ?`:"Supprimer cette tâche ?"}),d=()=>{l.value=!1,c.value=null},p=je(()=>r.activeProject),g=je(()=>r.tasksByStatus),v=async N=>{var O,B,G;i.value="";try{if(!((O=N==null?void 0:N.title)!=null&&O.trim()))return;await r.addTask(s.value,{title:N.title.trim(),description:((G=(B=N.description)==null?void 0:B.trim)==null?void 0:G.call(B))||"",dueDate:N.dueDate||null,status:"todo"}),o.value=!1}catch(V){i.value=(V==null?void 0:V.message)||"Erreur lors de la création de la tâche"}},S=async(N,O)=>{i.value="";try{await r.updateTask(s.value,N.id,{status:O})}catch(B){i.value=(B==null?void 0:B.message)||"Erreur lors de la mise à jour"}},C=N=>{c.value=N,l.value=!0},k=async()=>{const N=c.value;if(d(),!!(N!=null&&N.id)){i.value="";try{await r.deleteTask(s.value,N.id)}catch(O){i.value=(O==null?void 0:O.message)||"Erreur lors de la suppression"}}};return _a(async()=>{await r.ensureProjectLoadedOnce(s.value),r.subscribeProject(s.value),r.subscribeTasks(s.value)}),(N,O)=>{var B,G;return _e(),Ae("div",null,[F("div",qP,[F("div",null,[F("h1",HP,Me(((B=p.value)==null?void 0:B.name)||"Projet"),1),(G=p.value)!=null&&G.description?(_e(),Ae("p",WP,Me(p.value.description),1)):Pt("",!0)]),F("div",GP,[F("button",{class:"rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50",onClick:O[0]||(O[0]=V=>qt(n).push("/dashboard"))}," Retour "),F("button",{class:"rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800",onClick:O[1]||(O[1]=V=>o.value=!0)}," Ajouter une tâche ")])]),i.value?(_e(),Ae("p",KP,Me(i.value),1)):Pt("",!0),F("div",zP,[F("section",QP,[O[3]||(O[3]=F("div",{class:"border-b px-4 py-3"},[F("h3",{class:"text-sm font-semibold text-slate-900"},"À faire")],-1)),F("div",JP,[(_e(!0),Ae(ht,null,bo(g.value.todo,V=>(_e(),Ae("div",{key:V.id,class:"rounded-lg border border-slate-200 bg-white p-3"},[F("div",YP,Me(V.title),1),V.description?(_e(),Ae("div",XP,Me(V.description),1)):Pt("",!0),V.dueDate?(_e(),Ae("div",ZP,"Date limite: "+Me(V.dueDate),1)):Pt("",!0),F("div",eC,[F("button",{class:"rounded-md bg-slate-900 px-2.5 py-1.5 text-xs text-white hover:bg-slate-800",onClick:$=>S(V,"doing")}," → En cours ",8,tC),F("button",{class:"rounded-md px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50",onClick:$=>C(V)}," Supprimer ",8,nC)])]))),128))])]),F("section",rC,[O[4]||(O[4]=F("div",{class:"border-b px-4 py-3"},[F("h3",{class:"text-sm font-semibold text-slate-900"},"En cours")],-1)),F("div",sC,[(_e(!0),Ae(ht,null,bo(g.value.doing,V=>(_e(),Ae("div",{key:V.id,class:"rounded-lg border border-slate-200 bg-white p-3"},[F("div",iC,Me(V.title),1),V.description?(_e(),Ae("div",oC,Me(V.description),1)):Pt("",!0),V.dueDate?(_e(),Ae("div",aC,"Date limite: "+Me(V.dueDate),1)):Pt("",!0),F("div",lC,[F("button",{class:"rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50",onClick:$=>S(V,"todo")}," ← À faire ",8,cC),F("button",{class:"rounded-md bg-slate-900 px-2.5 py-1.5 text-xs text-white hover:bg-slate-800",onClick:$=>S(V,"done")}," → Terminé ",8,uC),F("button",{class:"rounded-md px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50",onClick:$=>C(V)}," Supprimer ",8,hC)])]))),128))])]),F("section",dC,[O[5]||(O[5]=F("div",{class:"border-b px-4 py-3"},[F("h3",{class:"text-sm font-semibold text-slate-900"},"Terminé")],-1)),F("div",fC,[(_e(!0),Ae(ht,null,bo(g.value.done,V=>(_e(),Ae("div",{key:V.id,class:"rounded-lg border border-slate-200 bg-white p-3"},[F("div",pC,Me(V.title),1),V.description?(_e(),Ae("div",mC,Me(V.description),1)):Pt("",!0),V.dueDate?(_e(),Ae("div",gC,"Date limite: "+Me(V.dueDate),1)):Pt("",!0),F("div",_C,[F("button",{class:"rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50",onClick:$=>S(V,"doing")}," ← En cours ",8,yC),F("button",{class:"rounded-md px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50",onClick:$=>C(V)}," Supprimer ",8,vC)])]))),128))])])]),Xe($P,{open:o.value,onClose:O[2]||(O[2]=V=>o.value=!1),onSave:v},null,8,["open"]),Xe(G_,{open:l.value,title:"Supprimer la tâche",message:u.value,confirmText:"Supprimer",onClose:d,onConfirm:k},null,8,["open","message"])])}}},TC=()=>new Promise(t=>{const e=iu(yn,n=>{e(),t(n)})}),K_=JT({history:CT("/"),routes:[{path:"/",redirect:"/login"},{path:"/login",name:"Login",component:hP},{path:"/dashboard",name:"Dashboard",component:UP,meta:{requiresAuth:!0}},{path:"/projects/:id",name:"ProjectDetails",component:EC,meta:{requiresAuth:!0}}]});K_.beforeEach(async t=>{const e=t.matched.some(r=>r.meta.requiresAuth),n=yn.currentUser||await TC();return e&&!n?"/login":!e&&n&&t.path==="/login"?"/dashboard":!0});let Ks;iu(yn,()=>{Ks||(Ks=ME(sP),Ks.use(jE()),Ks.use(K_),Ks.mount("#app"))});
