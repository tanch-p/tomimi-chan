function E(){}const mt=t=>t;function pt(t,e){for(const n in e)t[n]=e[n];return t}function yt(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function nt(t){return t()}function Z(){return Object.create(null)}function N(t){t.forEach(nt)}function F(t){return typeof t=="function"}function Kt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let q;function Qt(t,e){return q||(q=document.createElement("a")),q.href=e,t===q.href}function gt(t){return Object.keys(t).length===0}function bt(t,...e){if(t==null)return E;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Ut(t,e,n){t.$$.on_destroy.push(bt(e,n))}function Vt(t,e,n,r){if(t){const i=rt(t,e,n,r);return t[0](i)}}function rt(t,e,n,r){return t[1]&&r?pt(n.ctx.slice(),t[1](r(e))):n.ctx}function Xt(t,e,n,r){if(t[2]&&r){const i=t[2](r(n));if(e.dirty===void 0)return i;if(typeof i=="object"){const o=[],s=Math.max(e.dirty.length,i.length);for(let c=0;c<s;c+=1)o[c]=e.dirty[c]|i[c];return o}return e.dirty|i}return e.dirty}function Yt(t,e,n,r,i,o){if(i){const s=rt(e,n,r,o);t.p(s,i)}}function Zt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function te(t){return t??""}function ee(t){return t&&F(t.destroy)?t.destroy:E}const it=typeof window<"u";let wt=it?()=>window.performance.now():()=>Date.now(),U=it?t=>requestAnimationFrame(t):E;const M=new Set;function st(t){M.forEach(e=>{e.c(t)||(M.delete(e),e.f())}),M.size!==0&&U(st)}function $t(t){let e;return M.size===0&&U(st),{promise:new Promise(n=>{M.add(e={c:t,f:n})}),abort(){M.delete(e)}}}const ne=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;let W=!1;function xt(){W=!0}function vt(){W=!1}function kt(t,e,n,r){for(;t<e;){const i=t+(e-t>>1);n(i)<=r?t=i+1:e=i}return t}function Et(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const d=e[u];d.claim_order!==void 0&&l.push(d)}e=l}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let i=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,d=(i>0&&e[n[i]].claim_order<=u?i+1:kt(1,i,_=>e[n[_]].claim_order,u))-1;r[l]=n[d]+1;const f=d+1;n[f]=l,i=Math.max(f,i)}const o=[],s=[];let c=e.length-1;for(let l=n[i]+1;l!=0;l=r[l-1]){for(o.push(e[l-1]);c>=l;c--)s.push(e[c]);c--}for(;c>=0;c--)s.push(e[c]);o.reverse(),s.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<s.length;l++){for(;u<o.length&&s[l].claim_order>=o[u].claim_order;)u++;const d=u<o.length?o[u]:null;t.insertBefore(s[l],d)}}function Nt(t,e){t.appendChild(e)}function ct(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function At(t){const e=ot("style");return St(ct(t),e),e.sheet}function St(t,e){return Nt(t.head||t,e),e.sheet}function Ct(t,e){if(W){for(Et(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function re(t,e,n){W&&!n?Ct(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function lt(t){t.parentNode&&t.parentNode.removeChild(t)}function ie(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ot(t){return document.createElement(t)}function Mt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function V(t){return document.createTextNode(t)}function se(){return V(" ")}function ce(){return V("")}function le(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function oe(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ue(t,e,n){t.setAttributeNS("http://www.w3.org/1999/xlink",e,n)}function ae(t){return t===""?null:+t}function jt(t){return Array.from(t.childNodes)}function Dt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ut(t,e,n,r,i=!1){Dt(t);const o=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const c=t[s];if(e(c)){const l=n(c);return l===void 0?t.splice(s,1):t[s]=l,i||(t.claim_info.last_index=s),c}}for(let s=t.claim_info.last_index-1;s>=0;s--){const c=t[s];if(e(c)){const l=n(c);return l===void 0?t.splice(s,1):t[s]=l,i?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,c}}return r()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function at(t,e,n,r){return ut(t,i=>i.nodeName===e,i=>{const o=[];for(let s=0;s<i.attributes.length;s++){const c=i.attributes[s];n[c.name]||o.push(c.name)}o.forEach(s=>i.removeAttribute(s))},()=>r(e))}function fe(t,e,n){return at(t,e,n,ot)}function de(t,e,n){return at(t,e,n,Mt)}function Tt(t,e){return ut(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>V(e),!0)}function _e(t){return Tt(t," ")}function he(t,e){e=""+e,t.data!==e&&(t.data=e)}function me(t,e){t.value=e??""}function pe(t,e,n,r){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function ye(t,e,n){t.classList[n?"add":"remove"](e)}function ft(t,e,{bubbles:n=!1,cancelable:r=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n,r,e),i}function ge(t,e){const n=[];let r=0;for(const i of e.childNodes)if(i.nodeType===8){const o=i.textContent.trim();o===`HEAD_${t}_END`?(r-=1,n.push(i)):o===`HEAD_${t}_START`&&(r+=1,n.push(i))}else r>0&&n.push(i);return n}function be(t,e){return new t(e)}const z=new Map;let B=0;function Ot(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Pt(t,e){const n={stylesheet:At(e),rules:{}};return z.set(t,n),n}function tt(t,e,n,r,i,o,s,c=0){const l=16.666/r;let u=`{
`;for(let y=0;y<=1;y+=l){const g=e+(n-e)*o(y);u+=y*100+`%{${s(g,1-g)}}
`}const d=u+`100% {${s(n,1-n)}}
}`,f=`__svelte_${Ot(d)}_${c}`,_=ct(t),{stylesheet:a,rules:h}=z.get(_)||Pt(_,t);h[f]||(h[f]=!0,a.insertRule(`@keyframes ${f} ${d}`,a.cssRules.length));const p=t.style.animation||"";return t.style.animation=`${p?`${p}, `:""}${f} ${r}ms linear ${i}ms 1 both`,B+=1,f}function Rt(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),i=n.length-r.length;i&&(t.style.animation=r.join(", "),B-=i,B||qt())}function qt(){U(()=>{B||(z.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&lt(e)}),z.clear())})}let T;function $(t){T=t}function O(){if(!T)throw new Error("Function called outside component initialization");return T}function we(t){O().$$.on_mount.push(t)}function $e(t){O().$$.after_update.push(t)}function xe(t){O().$$.on_destroy.push(t)}function ve(){const t=O();return(e,n,{cancelable:r=!1}={})=>{const i=t.$$.callbacks[e];if(i){const o=ft(e,n,{cancelable:r});return i.slice().forEach(s=>{s.call(t,o)}),!o.defaultPrevented}return!0}}const C=[],et=[];let j=[];const K=[],dt=Promise.resolve();let Q=!1;function _t(){Q||(Q=!0,dt.then(X))}function ke(){return _t(),dt}function H(t){j.push(t)}function Ee(t){K.push(t)}const I=new Set;let S=0;function X(){if(S!==0)return;const t=T;do{try{for(;S<C.length;){const e=C[S];S++,$(e),Lt(e.$$)}}catch(e){throw C.length=0,S=0,e}for($(null),C.length=0,S=0;et.length;)et.pop()();for(let e=0;e<j.length;e+=1){const n=j[e];I.has(n)||(I.add(n),n())}j.length=0}while(C.length);for(;K.length;)K.pop()();Q=!1,I.clear(),$(t)}function Lt(t){if(t.fragment!==null){t.update(),N(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}function zt(t){const e=[],n=[];j.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),j=e}let D;function Bt(){return D||(D=Promise.resolve(),D.then(()=>{D=null})),D}function J(t,e,n){t.dispatchEvent(ft(`${e?"intro":"outro"}${n}`))}const L=new Set;let x;function Ht(){x={r:0,c:[],p:x}}function Ft(){x.r||N(x.c),x=x.p}function Y(t,e){t&&t.i&&(L.delete(t),t.i(e))}function ht(t,e,n,r){if(t&&t.o){if(L.has(t))return;L.add(t),x.c.push(()=>{L.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}const Wt={duration:0};function Ne(t,e,n,r){const i={direction:"both"};let o=e(t,n,i),s=r?0:1,c=null,l=null,u=null;function d(){u&&Rt(t,u)}function f(a,h){const p=a.b-s;return h*=Math.abs(p),{a:s,b:a.b,d:p,duration:h,start:a.start,end:a.start+h,group:a.group}}function _(a){const{delay:h=0,duration:p=300,easing:y=mt,tick:g=E,css:v}=o||Wt,A={start:wt()+h,b:a};a||(A.group=x,x.r+=1),c||l?l=A:(v&&(d(),u=tt(t,s,a,p,h,y,v)),a&&g(0,1),c=f(A,p),H(()=>J(t,a,"start")),$t(k=>{if(l&&k>l.start&&(c=f(l,p),l=null,J(t,c.b,"start"),v&&(d(),u=tt(t,s,c.b,c.duration,0,y,o.css))),c){if(k>=c.end)g(s=c.b,1-s),J(t,c.b,"end"),l||(c.b?d():--c.group.r||N(c.group.c)),c=null;else if(k>=c.start){const P=k-c.start;s=c.a+c.d*y(P/c.duration),g(s,1-s)}}return!!(c||l)}))}return{run(a){F(o)?Bt().then(()=>{o=o(i),_(a)}):_(a)},end(){d(),c=l=null}}}function Ae(t,e){const n=e.token={};function r(i,o,s,c){if(e.token!==n)return;e.resolved=c;let l=e.ctx;s!==void 0&&(l=l.slice(),l[s]=c);const u=i&&(e.current=i)(l);let d=!1;e.block&&(e.blocks?e.blocks.forEach((f,_)=>{_!==o&&f&&(Ht(),ht(f,1,1,()=>{e.blocks[_]===f&&(e.blocks[_]=null)}),Ft())}):e.block.d(1),u.c(),Y(u,1),u.m(e.mount(),e.anchor),d=!0),e.block=u,e.blocks&&(e.blocks[o]=u),d&&X()}if(yt(t)){const i=O();if(t.then(o=>{$(i),r(e.then,1,e.value,o),$(null)},o=>{if($(i),r(e.catch,2,e.error,o),$(null),!e.hasCatch)throw o}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved=t}}function Se(t,e,n){const r=e.slice(),{resolved:i}=t;t.current===t.then&&(r[t.value]=i),t.current===t.catch&&(r[t.error]=i),t.block.p(r,n)}function Ce(t,e){ht(t,1,1,()=>{e.delete(t.key)})}function Me(t,e,n,r,i,o,s,c,l,u,d,f){let _=t.length,a=o.length,h=_;const p={};for(;h--;)p[t[h].key]=h;const y=[],g=new Map,v=new Map,A=[];for(h=a;h--;){const m=f(i,o,h),b=n(m);let w=s.get(b);w?r&&A.push(()=>w.p(m,e)):(w=u(b,m),w.c()),g.set(b,y[h]=w),b in p&&v.set(b,Math.abs(h-p[b]))}const k=new Set,P=new Set;function G(m){Y(m,1),m.m(c,d),s.set(m.key,m),d=m.first,a--}for(;_&&a;){const m=y[a-1],b=t[_-1],w=m.key,R=b.key;m===b?(d=m.first,_--,a--):g.has(R)?!s.has(w)||k.has(w)?G(m):P.has(R)?_--:v.get(w)>v.get(R)?(P.add(w),G(m)):(k.add(R),_--):(l(b,s),_--)}for(;_--;){const m=t[_];g.has(m.key)||l(m,s)}for(;a;)G(y[a-1]);return N(A),y}function je(t,e,n){const r=t.$$.props[e];r!==void 0&&(t.$$.bound[r]=n,n(t.$$.ctx[r]))}function De(t){t&&t.c()}function Te(t,e){t&&t.l(e)}function Gt(t,e,n,r){const{fragment:i,after_update:o}=t.$$;i&&i.m(e,n),r||H(()=>{const s=t.$$.on_mount.map(nt).filter(F);t.$$.on_destroy?t.$$.on_destroy.push(...s):N(s),t.$$.on_mount=[]}),o.forEach(H)}function It(t,e){const n=t.$$;n.fragment!==null&&(zt(n.after_update),N(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Jt(t,e){t.$$.dirty[0]===-1&&(C.push(t),_t(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Oe(t,e,n,r,i,o,s,c=[-1]){const l=T;$(t);const u=t.$$={fragment:null,ctx:[],props:o,update:E,not_equal:i,bound:Z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:Z(),dirty:c,skip_bound:!1,root:e.target||l.$$.root};s&&s(u.root);let d=!1;if(u.ctx=n?n(t,e.props||{},(f,_,...a)=>{const h=a.length?a[0]:_;return u.ctx&&i(u.ctx[f],u.ctx[f]=h)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](h),d&&Jt(t,f)),_}):[],u.update(),d=!0,N(u.before_update),u.fragment=r?r(u.ctx):!1,e.target){if(e.hydrate){xt();const f=jt(e.target);u.fragment&&u.fragment.l(f),f.forEach(lt)}else u.fragment&&u.fragment.c();e.intro&&Y(t.$$.fragment),Gt(t,e.target,e.anchor,e.customElement),vt(),X()}$(l)}class Pe{$destroy(){It(this,1),this.$destroy=E}$on(e,n){if(!F(n))return E;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(e){this.$$set&&!gt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Se as $,Gt as A,It as B,Mt as C,de as D,Ct as E,E as F,le as G,Vt as H,Yt as I,Zt as J,Xt as K,Ut as L,ge as M,Qt as N,te as O,ie as P,me as Q,ae as R,Pe as S,N as T,ye as U,Me as V,Ce as W,H as X,Ne as Y,ee as Z,Ae as _,se as a,je as a0,Ee as a1,ne as a2,bt as a3,wt as a4,$t as a5,ve as a6,xe as a7,ue as a8,F as a9,re as b,_e as c,ht as d,ce as e,Ft as f,Y as g,lt as h,Oe as i,$e as j,ot as k,fe as l,jt as m,oe as n,we as o,pe as p,V as q,Tt as r,Kt as s,ke as t,he as u,Ht as v,et as w,be as x,De as y,Te as z};
