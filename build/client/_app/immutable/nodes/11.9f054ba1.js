import{S as nt,i as at,s as rt,k as p,q as Ie,l as d,m as $,r as Re,h as _,n as i,b as z,H as h,u as nl,I as Bt,a as D,c as F,K as Pe,g as m,v as ee,f as te,d as E,M as le,e as ne,y as U,z as K,A as Y,B as J,G as al}from"../chunks/index.fef03e7a.js";import{s as rl}from"../chunks/is_stages_list.563af226.js";import{c as ol,b as ul,e as sl,r as qe}from"../chunks/roman_numerals.c2362db7.js";import{t as S}from"../chunks/translations.484a5201.js";import{b as cl}from"../chunks/banner_phantom_800px.6247e1ea.js";import{T as wt}from"../chunks/TogglePanel.2e17abfb.js";import{H as fl}from"../chunks/HowToUse.329b6897.js";const il=({params:u})=>({language:u.lang}),yl=Object.freeze(Object.defineProperty({__proto__:null,load:il},Symbol.toStringTag,{value:"Module"}));function gl(u){let e,l,a=u[1].replaceAll("_"," ")+"",n,r;return{c(){e=p("a"),l=p("div"),n=Ie(a),this.h()},l(t){e=d(t,"A",{"data-sveltekit-preload-code":!0,href:!0});var s=$(e);l=d(s,"DIV",{class:!0});var f=$(l);n=Re(f,a),f.forEach(_),s.forEach(_),this.h()},h(){i(l,"class","hover:text-sky-400 hover:bg-[#343434] py-1.5 px-1 md:h-full hover:cursor-pointer"),i(e,"data-sveltekit-preload-code","eager"),i(e,"href",r=`/${u[0]}/stages/${u[2]}`)},m(t,s){z(t,e,s),h(e,l),h(l,n)},p(t,[s]){s&2&&a!==(a=t[1].replaceAll("_"," ")+"")&&nl(n,a),s&5&&r!==(r=`/${t[0]}/stages/${t[2]}`)&&i(e,"href",r)},i:Bt,o:Bt,d(t){t&&_(e)}}}function hl(u,e,l){let a,n,{stageName:r,language:t}=e;const s=rl.find(f=>f.name_zh===r);if(!s)throw new Error(`${r} is not found!`);return u.$$set=f=>{"stageName"in f&&l(3,r=f.stageName),"language"in f&&l(0,t=f.language)},u.$$.update=()=>{u.$$.dirty&1&&l(1,a=s[`name_${t}`]||s.name_zh),u.$$.dirty&2&&l(2,n=s.code+"_"+a)},[t,a,n,r]}class ae extends nt{constructor(e){super(),at(this,e,hl,gl,rt,{stageName:3,language:0})}}function Dt(u,e,l){const a=u.slice();return a[9]=e[l],a}function Ft(u,e,l){const a=u.slice();return a[9]=e[l],a}function kt(u,e,l){const a=u.slice();return a[9]=e[l],a}function Tt(u,e,l){const a=u.slice();return a[9]=e[l],a}function At(u,e,l){const a=u.slice();return a[9]=e[l],a}function Ct(u,e,l){const a=u.slice();return a[9]=e[l],a}function Nt(u,e,l){const a=u.slice();return a[9]=e[l],a}function Mt(u,e,l){const a=u.slice();a[24]=e[l],a[27]=l;const n=a[24].length<=4?1:2;return a[25]=n,a}function It(u,e,l){const a=u.slice();return a[9]=e[l],a}function Rt(u,e,l){const a=u.slice();return a[9]=e[l],a}function yt(u){const e=u.slice(),l=e[24].slice(4);return e[28]=l,e}function Ht(u,e,l){const a=u.slice();return a[9]=e[l],a}function Vt(u,e,l){const a=u.slice();return a[9]=e[l],a}function _l(u){const e=u.slice(),l=e[24].slice(0,4);return e[33]=l,e}function ml(u){let e,l,a=u[24],n=[];for(let t=0;t<a.length;t+=1)n[t]=zt(Ht(u,a,t));const r=t=>E(n[t],1,1,()=>{n[t]=null});return{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=ne()},l(t){for(let s=0;s<n.length;s+=1)n[s].l(t);e=ne()},m(t,s){for(let f=0;f<n.length;f+=1)n[f]&&n[f].m(t,s);z(t,e,s),l=!0},p(t,s){if(s[0]&3){a=t[24];let f;for(f=0;f<a.length;f+=1){const b=Ht(t,a,f);n[f]?(n[f].p(b,s),m(n[f],1)):(n[f]=zt(b),n[f].c(),m(n[f],1),n[f].m(e.parentNode,e))}for(ee(),f=a.length;f<n.length;f+=1)r(f);te()}},i(t){if(!l){for(let s=0;s<a.length;s+=1)m(n[s]);l=!0}},o(t){n=n.filter(Boolean);for(let s=0;s<n.length;s+=1)E(n[s]);l=!1},d(t){le(n,t),t&&_(e)}}}function pl(u){let e,l,a=u[33],n=[];for(let t=0;t<a.length;t+=1)n[t]=St(Vt(u,a,t));const r=t=>E(n[t],1,1,()=>{n[t]=null});return{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=ne()},l(t){for(let s=0;s<n.length;s+=1)n[s].l(t);e=ne()},m(t,s){for(let f=0;f<n.length;f+=1)n[f]&&n[f].m(t,s);z(t,e,s),l=!0},p(t,s){if(s[0]&3){a=t[33];let f;for(f=0;f<a.length;f+=1){const b=Vt(t,a,f);n[f]?(n[f].p(b,s),m(n[f],1)):(n[f]=St(b),n[f].c(),m(n[f],1),n[f].m(e.parentNode,e))}for(ee(),f=a.length;f<n.length;f+=1)r(f);te()}},i(t){if(!l){for(let s=0;s<a.length;s+=1)m(n[s]);l=!0}},o(t){n=n.filter(Boolean);for(let s=0;s<n.length;s+=1)E(n[s]);l=!1},d(t){le(n,t),t&&_(e)}}}function zt(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[24].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function St(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[33].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function dl(u){let e,l,a,n;const r=[$l,vl],t=[];function s(f,b){return f[28].length>=3?0:1}return e=s(u),l=t[e]=r[e](u),{c(){l.c(),a=ne()},l(f){l.l(f),a=ne()},m(f,b){t[e].m(f,b),z(f,a,b),n=!0},p(f,b){l.p(f,b)},i(f){n||(m(l),n=!0)},o(f){E(l),n=!1},d(f){t[e].d(f),f&&_(a)}}}function vl(u){let e,l,a=u[28],n=[];for(let t=0;t<a.length;t+=1)n[t]=jt(It(u,a,t));const r=t=>E(n[t],1,1,()=>{n[t]=null});return{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=ne()},l(t){for(let s=0;s<n.length;s+=1)n[s].l(t);e=ne()},m(t,s){for(let f=0;f<n.length;f+=1)n[f]&&n[f].m(t,s);z(t,e,s),l=!0},p(t,s){if(s[0]&3){a=t[28];let f;for(f=0;f<a.length;f+=1){const b=It(t,a,f);n[f]?(n[f].p(b,s),m(n[f],1)):(n[f]=jt(b),n[f].c(),m(n[f],1),n[f].m(e.parentNode,e))}for(ee(),f=a.length;f<n.length;f+=1)r(f);te()}},i(t){if(!l){for(let s=0;s<a.length;s+=1)m(n[s]);l=!0}},o(t){n=n.filter(Boolean);for(let s=0;s<n.length;s+=1)E(n[s]);l=!1},d(t){le(n,t),t&&_(e)}}}function $l(u){let e,l,a=u[28],n=[];for(let t=0;t<a.length;t+=1)n[t]=Gt(Rt(u,a,t));const r=t=>E(n[t],1,1,()=>{n[t]=null});return{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=ne()},l(t){for(let s=0;s<n.length;s+=1)n[s].l(t);e=ne()},m(t,s){for(let f=0;f<n.length;f+=1)n[f]&&n[f].m(t,s);z(t,e,s),l=!0},p(t,s){if(s[0]&3){a=t[28];let f;for(f=0;f<a.length;f+=1){const b=Rt(t,a,f);n[f]?(n[f].p(b,s),m(n[f],1)):(n[f]=Gt(b),n[f].c(),m(n[f],1),n[f].m(e.parentNode,e))}for(ee(),f=a.length;f<n.length;f+=1)r(f);te()}},i(t){if(!l){for(let s=0;s<a.length;s+=1)m(n[s]);l=!0}},o(t){n=n.filter(Boolean);for(let s=0;s<n.length;s+=1)E(n[s]);l=!1},d(t){le(n,t),t&&_(e)}}}function jt(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[28].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function Gt(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[28].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function Ot(u){let e,l,a=qe[u[27]]+"",n,r,t,s,f,b,Q;const L=[pl,ml],G=[];function X(w,A){return w[25]===2?0:1}function O(w,A){return A===0?_l(w):w}t=X(u),s=G[t]=L[t](O(u,t));let j=u[25]===2&&dl(yt(u));return{c(){e=p("tr"),l=p("td"),n=Ie(a),r=D(),s.c(),f=D(),j&&j.c(),b=ne(),this.h()},l(w){e=d(w,"TR",{});var A=$(e);l=d(A,"TD",{colspan:!0,rowspan:!0,class:!0});var q=$(l);n=Re(q,a),q.forEach(_),r=F(A),s.l(A),A.forEach(_),f=F(w),j&&j.l(w),b=ne(),this.h()},h(){i(l,"colspan","2"),i(l,"rowspan",u[25]),i(l,"class","svelte-1w4agg")},m(w,A){z(w,e,A),h(e,l),h(l,n),h(e,r),G[t].m(e,null),z(w,f,A),j&&j.m(w,A),z(w,b,A),Q=!0},p(w,A){s.p(O(w,t),A),w[25]===2&&j.p(yt(w),A)},i(w){Q||(m(s),m(j),Q=!0)},o(w){E(s),E(j),Q=!1},d(w){w&&_(e),G[t].d(),w&&_(f),j&&j.d(w),w&&_(b)}}}function Pt(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[2].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function qt(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[3].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function Lt(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[4].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function Ut(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[5].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function Kt(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[6].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function Yt(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[7].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function Jt(u){let e,l,a,n;return l=new ae({props:{stageName:u[9],language:u[0]}}),{c(){e=p("td"),U(l.$$.fragment),a=D(),this.h()},l(r){e=d(r,"TD",{colspan:!0,class:!0});var t=$(e);K(l.$$.fragment,t),a=F(t),t.forEach(_),this.h()},h(){i(e,"colspan",Math.floor(24/u[8].length)),i(e,"class","svelte-1w4agg")},m(r,t){z(r,e,t),Y(l,e,null),h(e,a),n=!0},p(r,t){const s={};t[0]&1&&(s.language=r[0]),l.$set(s)},i(r){n||(m(l.$$.fragment,r),n=!0)},o(r){E(l.$$.fragment,r),n=!1},d(r){r&&_(e),J(l)}}}function El(u){let e,l,a,n,r,t,s,f,b,Q,L,G,X,O,j,w,A,q,P,Fe,Z,W,B,T,oe=qe[2]+"",x,ke,ue,Te,Le,se,ge,ot=qe[4]+"",Ue,Ke,Ye,ce,he,ut=qe[5]+"",Je,Qe,We,_e,Ae,Xe,me,Ce,re,st,ye,Ze,fe,ie,xe,et,tt,Ne,lt,Me,pe,de=u[1],C=[];for(let c=0;c<de.length;c+=1)C[c]=Ot(Mt(u,de,c));const Qt=c=>E(C[c],1,1,()=>{C[c]=null});let ve=u[2],N=[];for(let c=0;c<ve.length;c+=1)N[c]=Pt(Nt(u,ve,c));const Wt=c=>E(N[c],1,1,()=>{N[c]=null});let $e=u[3],M=[];for(let c=0;c<$e.length;c+=1)M[c]=qt(Ct(u,$e,c));const Xt=c=>E(M[c],1,1,()=>{M[c]=null});let Ee=u[4],I=[];for(let c=0;c<Ee.length;c+=1)I[c]=Lt(At(u,Ee,c));const Zt=c=>E(I[c],1,1,()=>{I[c]=null});let be=u[5],R=[];for(let c=0;c<be.length;c+=1)R[c]=Ut(Tt(u,be,c));const xt=c=>E(R[c],1,1,()=>{R[c]=null});let Be=u[6],y=[];for(let c=0;c<Be.length;c+=1)y[c]=Kt(kt(u,Be,c));const el=c=>E(y[c],1,1,()=>{y[c]=null});let we=u[7],H=[];for(let c=0;c<we.length;c+=1)H[c]=Yt(Ft(u,we,c));const tl=c=>E(H[c],1,1,()=>{H[c]=null});let De=u[8],V=[];for(let c=0;c<De.length;c+=1)V[c]=Jt(Dt(u,De,c));const ll=c=>E(V[c],1,1,()=>{V[c]=null});return{c(){e=p("div"),l=p("table"),a=p("tbody"),n=p("tr"),r=p("th"),t=D(),s=p("th"),f=p("div"),b=p("img"),G=D();for(let c=0;c<C.length;c+=1)C[c].c();X=D(),O=p("tr"),j=p("th"),w=D(),A=p("th"),q=p("div"),P=p("img"),W=D(),B=p("tr"),T=p("td"),x=Ie(oe),ke=D();for(let c=0;c<N.length;c+=1)N[c].c();ue=D(),Te=p("tr");for(let c=0;c<M.length;c+=1)M[c].c();Le=D(),se=p("tr"),ge=p("td"),Ue=Ie(ot),Ke=D();for(let c=0;c<I.length;c+=1)I[c].c();Ye=D(),ce=p("tr"),he=p("td"),Je=Ie(ut),Qe=D();for(let c=0;c<R.length;c+=1)R[c].c();We=D(),_e=p("tr"),Ae=p("th"),Xe=D(),me=p("th"),Ce=p("div"),re=p("img"),Ze=D(),fe=p("tr"),ie=p("td"),xe=Ie("?"),et=D();for(let c=0;c<y.length;c+=1)y[c].c();tt=D(),Ne=p("tr");for(let c=0;c<H.length;c+=1)H[c].c();lt=D(),Me=p("tr");for(let c=0;c<V.length;c+=1)V[c].c();this.h()},l(c){e=d(c,"DIV",{class:!0});var g=$(e);l=d(g,"TABLE",{class:!0});var o=$(l);a=d(o,"TBODY",{});var v=$(a);n=d(v,"TR",{});var He=$(n);r=d(He,"TH",{colspan:!0,class:!0}),$(r).forEach(_),t=F(He),s=d(He,"TH",{colspan:!0,class:!0});var ct=$(s);f=d(ct,"DIV",{class:!0});var ft=$(f);b=d(ft,"IMG",{src:!0,alt:!0,width:!0,loading:!0,decoding:!0}),ft.forEach(_),ct.forEach(_),He.forEach(_),G=F(v);for(let k=0;k<C.length;k+=1)C[k].l(v);X=F(v),O=d(v,"TR",{});var Ve=$(O);j=d(Ve,"TH",{colspan:!0,class:!0}),$(j).forEach(_),w=F(Ve),A=d(Ve,"TH",{colspan:!0,class:!0});var it=$(A);q=d(it,"DIV",{class:!0});var gt=$(q);P=d(gt,"IMG",{src:!0,alt:!0,width:!0,loading:!0,decoding:!0}),gt.forEach(_),it.forEach(_),Ve.forEach(_),W=F(v),B=d(v,"TR",{});var ze=$(B);T=d(ze,"TD",{colspan:!0,rowspan:!0,class:!0});var ht=$(T);x=Re(ht,oe),ht.forEach(_),ke=F(ze);for(let k=0;k<N.length;k+=1)N[k].l(ze);ze.forEach(_),ue=F(v),Te=d(v,"TR",{});var _t=$(Te);for(let k=0;k<M.length;k+=1)M[k].l(_t);_t.forEach(_),Le=F(v),se=d(v,"TR",{});var Se=$(se);ge=d(Se,"TD",{colspan:!0,class:!0});var mt=$(ge);Ue=Re(mt,ot),mt.forEach(_),Ke=F(Se);for(let k=0;k<I.length;k+=1)I[k].l(Se);Se.forEach(_),Ye=F(v),ce=d(v,"TR",{});var je=$(ce);he=d(je,"TD",{colspan:!0,class:!0});var pt=$(he);Je=Re(pt,ut),pt.forEach(_),Qe=F(je);for(let k=0;k<R.length;k+=1)R[k].l(je);je.forEach(_),We=F(v),_e=d(v,"TR",{});var Ge=$(_e);Ae=d(Ge,"TH",{colspan:!0,class:!0}),$(Ae).forEach(_),Xe=F(Ge),me=d(Ge,"TH",{colspan:!0,class:!0});var dt=$(me);Ce=d(dt,"DIV",{class:!0});var vt=$(Ce);re=d(vt,"IMG",{src:!0,alt:!0,width:!0,loading:!0,decoding:!0}),vt.forEach(_),dt.forEach(_),Ge.forEach(_),Ze=F(v),fe=d(v,"TR",{});var Oe=$(fe);ie=d(Oe,"TD",{colspan:!0,rowspan:!0,class:!0});var $t=$(ie);xe=Re($t,"?"),$t.forEach(_),et=F(Oe);for(let k=0;k<y.length;k+=1)y[k].l(Oe);Oe.forEach(_),tt=F(v),Ne=d(v,"TR",{});var Et=$(Ne);for(let k=0;k<H.length;k+=1)H[k].l(Et);Et.forEach(_),lt=F(v),Me=d(v,"TR",{});var bt=$(Me);for(let k=0;k<V.length;k+=1)V[k].l(bt);bt.forEach(_),v.forEach(_),o.forEach(_),g.forEach(_),this.h()},h(){i(r,"colspan","2"),i(r,"class","empty svelte-1w4agg"),Pe(b.src,Q=ol)||i(b,"src",Q),i(b,"alt",L=S[u[0]].combat_ops),i(b,"width","100px"),i(b,"loading","lazy"),i(b,"decoding","async"),i(f,"class","flex justify-center items-center"),i(s,"colspan","24"),i(s,"class","svelte-1w4agg"),i(j,"colspan","2"),i(j,"class","empty svelte-1w4agg"),Pe(P.src,Fe=ul)||i(P,"src",Fe),i(P,"alt",Z=S[u[0]].boss),i(P,"width","100px"),i(P,"loading","lazy"),i(P,"decoding","async"),i(q,"class","flex justify-center items-center"),i(A,"colspan","24"),i(A,"class","svelte-1w4agg"),i(T,"colspan","2"),i(T,"rowspan","2"),i(T,"class","svelte-1w4agg"),i(ge,"colspan","2"),i(ge,"class","svelte-1w4agg"),i(he,"colspan","2"),i(he,"class","svelte-1w4agg"),i(Ae,"colspan","2"),i(Ae,"class","empty svelte-1w4agg"),Pe(re.src,st=sl)||i(re,"src",st),i(re,"alt",ye=S[u[0]].boss),i(re,"width","100px"),i(re,"loading","lazy"),i(re,"decoding","async"),i(Ce,"class","flex justify-center items-center"),i(me,"colspan","24"),i(me,"class","svelte-1w4agg"),i(ie,"colspan","2"),i(ie,"rowspan","3"),i(ie,"class","svelte-1w4agg"),i(l,"class","text-xs sm:text-base svelte-1w4agg"),i(e,"class","max-w-6xl mx-auto")},m(c,g){z(c,e,g),h(e,l),h(l,a),h(a,n),h(n,r),h(n,t),h(n,s),h(s,f),h(f,b),h(a,G);for(let o=0;o<C.length;o+=1)C[o]&&C[o].m(a,null);h(a,X),h(a,O),h(O,j),h(O,w),h(O,A),h(A,q),h(q,P),h(a,W),h(a,B),h(B,T),h(T,x),h(B,ke);for(let o=0;o<N.length;o+=1)N[o]&&N[o].m(B,null);h(a,ue),h(a,Te);for(let o=0;o<M.length;o+=1)M[o]&&M[o].m(Te,null);h(a,Le),h(a,se),h(se,ge),h(ge,Ue),h(se,Ke);for(let o=0;o<I.length;o+=1)I[o]&&I[o].m(se,null);h(a,Ye),h(a,ce),h(ce,he),h(he,Je),h(ce,Qe);for(let o=0;o<R.length;o+=1)R[o]&&R[o].m(ce,null);h(a,We),h(a,_e),h(_e,Ae),h(_e,Xe),h(_e,me),h(me,Ce),h(Ce,re),h(a,Ze),h(a,fe),h(fe,ie),h(ie,xe),h(fe,et);for(let o=0;o<y.length;o+=1)y[o]&&y[o].m(fe,null);h(a,tt),h(a,Ne);for(let o=0;o<H.length;o+=1)H[o]&&H[o].m(Ne,null);h(a,lt),h(a,Me);for(let o=0;o<V.length;o+=1)V[o]&&V[o].m(Me,null);pe=!0},p(c,g){if((!pe||g[0]&1&&L!==(L=S[c[0]].combat_ops))&&i(b,"alt",L),g[0]&3){de=c[1];let o;for(o=0;o<de.length;o+=1){const v=Mt(c,de,o);C[o]?(C[o].p(v,g),m(C[o],1)):(C[o]=Ot(v),C[o].c(),m(C[o],1),C[o].m(a,X))}for(ee(),o=de.length;o<C.length;o+=1)Qt(o);te()}if((!pe||g[0]&1&&Z!==(Z=S[c[0]].boss))&&i(P,"alt",Z),g[0]&5){ve=c[2];let o;for(o=0;o<ve.length;o+=1){const v=Nt(c,ve,o);N[o]?(N[o].p(v,g),m(N[o],1)):(N[o]=Pt(v),N[o].c(),m(N[o],1),N[o].m(B,null))}for(ee(),o=ve.length;o<N.length;o+=1)Wt(o);te()}if(g[0]&9){$e=c[3];let o;for(o=0;o<$e.length;o+=1){const v=Ct(c,$e,o);M[o]?(M[o].p(v,g),m(M[o],1)):(M[o]=qt(v),M[o].c(),m(M[o],1),M[o].m(Te,null))}for(ee(),o=$e.length;o<M.length;o+=1)Xt(o);te()}if(g[0]&17){Ee=c[4];let o;for(o=0;o<Ee.length;o+=1){const v=At(c,Ee,o);I[o]?(I[o].p(v,g),m(I[o],1)):(I[o]=Lt(v),I[o].c(),m(I[o],1),I[o].m(se,null))}for(ee(),o=Ee.length;o<I.length;o+=1)Zt(o);te()}if(g[0]&33){be=c[5];let o;for(o=0;o<be.length;o+=1){const v=Tt(c,be,o);R[o]?(R[o].p(v,g),m(R[o],1)):(R[o]=Ut(v),R[o].c(),m(R[o],1),R[o].m(ce,null))}for(ee(),o=be.length;o<R.length;o+=1)xt(o);te()}if((!pe||g[0]&1&&ye!==(ye=S[c[0]].boss))&&i(re,"alt",ye),g[0]&65){Be=c[6];let o;for(o=0;o<Be.length;o+=1){const v=kt(c,Be,o);y[o]?(y[o].p(v,g),m(y[o],1)):(y[o]=Kt(v),y[o].c(),m(y[o],1),y[o].m(fe,null))}for(ee(),o=Be.length;o<y.length;o+=1)el(o);te()}if(g[0]&129){we=c[7];let o;for(o=0;o<we.length;o+=1){const v=Ft(c,we,o);H[o]?(H[o].p(v,g),m(H[o],1)):(H[o]=Yt(v),H[o].c(),m(H[o],1),H[o].m(Ne,null))}for(ee(),o=we.length;o<H.length;o+=1)tl(o);te()}if(g[0]&257){De=c[8];let o;for(o=0;o<De.length;o+=1){const v=Dt(c,De,o);V[o]?(V[o].p(v,g),m(V[o],1)):(V[o]=Jt(v),V[o].c(),m(V[o],1),V[o].m(Me,null))}for(ee(),o=De.length;o<V.length;o+=1)ll(o);te()}},i(c){if(!pe){for(let g=0;g<de.length;g+=1)m(C[g]);for(let g=0;g<ve.length;g+=1)m(N[g]);for(let g=0;g<$e.length;g+=1)m(M[g]);for(let g=0;g<Ee.length;g+=1)m(I[g]);for(let g=0;g<be.length;g+=1)m(R[g]);for(let g=0;g<Be.length;g+=1)m(y[g]);for(let g=0;g<we.length;g+=1)m(H[g]);for(let g=0;g<De.length;g+=1)m(V[g]);pe=!0}},o(c){C=C.filter(Boolean);for(let g=0;g<C.length;g+=1)E(C[g]);N=N.filter(Boolean);for(let g=0;g<N.length;g+=1)E(N[g]);M=M.filter(Boolean);for(let g=0;g<M.length;g+=1)E(M[g]);I=I.filter(Boolean);for(let g=0;g<I.length;g+=1)E(I[g]);R=R.filter(Boolean);for(let g=0;g<R.length;g+=1)E(R[g]);y=y.filter(Boolean);for(let g=0;g<y.length;g+=1)E(y[g]);H=H.filter(Boolean);for(let g=0;g<H.length;g+=1)E(H[g]);V=V.filter(Boolean);for(let g=0;g<V.length;g+=1)E(V[g]);pe=!1},d(c){c&&_(e),le(C,c),le(N,c),le(M,c),le(I,c),le(R,c),le(y,c),le(H,c),le(V,c)}}}function bl(u,e,l){let{language:a}=e,n=[["与虫为伴","驯兽小屋","礼炮小队","意外","死斗"],["压轴登场","巡逻队","落魄骑士","分赃不均","先来后到"],["正义","似曾相识","酒商运输队","从众效应","斗兽笼","首演","感化","雕匠与石像"],["步步紧逼","阴云笼罩","烟花秀","永无尽头","远方来客","共舞","鲍勃酒品","雪山上的来客"],["无人机起降库","红雾弥漫","仪式之夜","彻骨冰寒","危机四伏","惊喜工厂","荒唐把戏","隔岸观火"],["萨卡兹的渴求","乌萨斯的渴求"]],r=["开门请当心","大盗当头","恐怖传说","悦耳杀机"],t=["寒渊惜别"],s=["覆水难收","别无所求"],f=["诸事不顺","再启新篇"],b=["鸭爵的戏剧","鸭爵的宴会","高普尼克之拳","这位乌萨斯人"],Q=["邪异囚笼","无序盛宴","“骑士对决”"],L=["自缚","观察"];return u.$$set=G=>{"language"in G&&l(0,a=G.language)},[a,n,r,t,s,f,b,Q,L]}class Bl extends nt{constructor(e){super(),at(this,e,bl,El,rt,{language:0},null,[-1,-1])}}function wl(u){let e,l;return e=new fl({props:{language:u[0],rogueTopic:"rogue_phantom"}}),{c(){U(e.$$.fragment)},l(a){K(e.$$.fragment,a)},m(a,n){Y(e,a,n),l=!0},p(a,n){const r={};n&1&&(r.language=a[0]),e.$set(r)},i(a){l||(m(e.$$.fragment,a),l=!0)},o(a){E(e.$$.fragment,a),l=!1},d(a){J(e,a)}}}function Dl(u){let e,l;return e=new Bl({props:{language:u[0]}}),{c(){U(e.$$.fragment)},l(a){K(e.$$.fragment,a)},m(a,n){Y(e,a,n),l=!0},p(a,n){const r={};n&1&&(r.language=a[0]),e.$set(r)},i(a){l||(m(e.$$.fragment,a),l=!0)},o(a){E(e.$$.fragment,a),l=!1},d(a){J(e,a)}}}function Fl(u){let e,l,a,n,r,t,s,f,b,Q,L,G,X,O,j,w,A,q,P,Fe,Z,W;return document.title=e=S[u[0]].rogue_phantom+" / "+S[u[0]].title_post,P=new wt({props:{title:S[u[0]].how_to_use,$$slots:{default:[wl]},$$scope:{ctx:u}}}),Z=new wt({props:{title:S[u[0]].stage_nav,isOpen:!0,$$slots:{default:[Dl]},$$scope:{ctx:u}}}),{c(){l=p("meta"),n=p("meta"),t=p("meta"),f=p("meta"),Q=D(),L=p("div"),G=p("div"),X=p("div"),O=p("img"),A=D(),q=p("div"),U(P.$$.fragment),Fe=D(),U(Z.$$.fragment),this.h()},l(B){const T=al("svelte-1v1mwr1",document.head);l=d(T,"META",{name:!0,content:!0}),n=d(T,"META",{property:!0,content:!0}),t=d(T,"META",{property:!0,content:!0}),f=d(T,"META",{property:!0,content:!0}),T.forEach(_),Q=F(B),L=d(B,"DIV",{class:!0});var oe=$(L);G=d(oe,"DIV",{class:!0});var x=$(G);X=d(x,"DIV",{class:!0});var ke=$(X);O=d(ke,"IMG",{class:!0,src:!0,alt:!0}),ke.forEach(_),A=F(x),q=d(x,"DIV",{class:!0});var ue=$(q);K(P.$$.fragment,ue),Fe=F(ue),K(Z.$$.fragment,ue),ue.forEach(_),x.forEach(_),oe.forEach(_),this.h()},h(){i(l,"name","description"),i(l,"content",a=S[u[0]].title_post),i(n,"property","og:description"),i(n,"content",r=S[u[0]].title_post),i(t,"property","og:title"),i(t,"content",s=S[u[0]].rogue_phantom),i(f,"property","og:url"),i(f,"content",b=`https://tomimi.dev/${u[0]}/phantom`),i(O,"class","select-none mx-auto py-2"),Pe(O.src,j=cl)||i(O,"src",j),i(O,"alt",w=S[u[0]].rogue_phantom),i(X,"class","py-4"),i(q,"class","space-y-6"),i(G,"class","pb-24 max-w-6xl mx-auto"),i(L,"class","bg-neutral-800 min-h-screen")},m(B,T){h(document.head,l),h(document.head,n),h(document.head,t),h(document.head,f),z(B,Q,T),z(B,L,T),h(L,G),h(G,X),h(X,O),h(G,A),h(G,q),Y(P,q,null),h(q,Fe),Y(Z,q,null),W=!0},p(B,[T]){(!W||T&1)&&e!==(e=S[B[0]].rogue_phantom+" / "+S[B[0]].title_post)&&(document.title=e),(!W||T&1&&a!==(a=S[B[0]].title_post))&&i(l,"content",a),(!W||T&1&&r!==(r=S[B[0]].title_post))&&i(n,"content",r),(!W||T&1&&s!==(s=S[B[0]].rogue_phantom))&&i(t,"content",s),(!W||T&1&&b!==(b=`https://tomimi.dev/${B[0]}/phantom`))&&i(f,"content",b),(!W||T&1&&w!==(w=S[B[0]].rogue_phantom))&&i(O,"alt",w);const oe={};T&1&&(oe.title=S[B[0]].how_to_use),T&5&&(oe.$$scope={dirty:T,ctx:B}),P.$set(oe);const x={};T&1&&(x.title=S[B[0]].stage_nav),T&5&&(x.$$scope={dirty:T,ctx:B}),Z.$set(x)},i(B){W||(m(P.$$.fragment,B),m(Z.$$.fragment,B),W=!0)},o(B){E(P.$$.fragment,B),E(Z.$$.fragment,B),W=!1},d(B){_(l),_(n),_(t),_(f),B&&_(Q),B&&_(L),J(P),J(Z)}}}function kl(u,e,l){let a,{data:n}=e;return u.$$set=r=>{"data"in r&&l(1,n=r.data)},u.$$.update=()=>{u.$$.dirty&2&&l(0,a=n.language)},[a,n]}class Hl extends nt{constructor(e){super(),at(this,e,kl,Fl,rt,{data:1})}}export{Hl as component,yl as universal};
