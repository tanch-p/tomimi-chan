import{S as L,i as Q,s as R,k as g,a as C,y as H,G as W,l as _,h as u,c as K,m as q,z as O,n as r,K as X,H as p,b as F,A as P,g as j,d as k,B as z}from"../chunks/index.fef03e7a.js";import{b as Y}from"../chunks/banner_sami_800px.7244ef3b.js";import{t as i}from"../chunks/translations.484a5201.js";import{T as J}from"../chunks/TogglePanel.2e17abfb.js";import{H as Z}from"../chunks/HowToUse.329b6897.js";import{S as x}from"../chunks/SamiNavTemp.85b5ade3.js";const ee=({params:n})=>({language:n.lang}),ce=Object.freeze(Object.defineProperty({__proto__:null,load:ee},Symbol.toStringTag,{value:"Module"}));function te(n){let t,s;return t=new Z({props:{language:n[0],rogueTopic:"rogue_sami"}}),{c(){H(t.$$.fragment)},l(e){O(t.$$.fragment,e)},m(e,l){P(t,e,l),s=!0},p(e,l){const m={};l&1&&(m.language=e[0]),t.$set(m)},i(e){s||(j(t.$$.fragment,e),s=!0)},o(e){k(t.$$.fragment,e),s=!1},d(e){z(t,e)}}}function ae(n){let t,s;return t=new x({props:{language:n[0]}}),{c(){H(t.$$.fragment)},l(e){O(t.$$.fragment,e)},m(e,l){P(t,e,l),s=!0},p(e,l){const m={};l&1&&(m.language=e[0]),t.$set(m)},i(e){s||(j(t.$$.fragment,e),s=!0)},o(e){k(t.$$.fragment,e),s=!1},d(e){z(t,e)}}}function ne(n){let t,s,e,l,m,T,y,E,A,I,b,f,M,$,N,D,G,d,v,B,h,c;return document.title=t=i[n[0]].rogue_sami+" / "+i[n[0]].title_post,v=new J({props:{title:i[n[0]].how_to_use,$$slots:{default:[te]},$$scope:{ctx:n}}}),h=new J({props:{title:i[n[0]].stage_nav,isOpen:!0,$$slots:{default:[ae]},$$scope:{ctx:n}}}),{c(){s=g("meta"),l=g("meta"),T=g("meta"),E=g("meta"),I=C(),b=g("div"),f=g("div"),M=g("div"),$=g("img"),G=C(),d=g("div"),H(v.$$.fragment),B=C(),H(h.$$.fragment),this.h()},l(a){const o=W("svelte-akqw7i",document.head);s=_(o,"META",{name:!0,content:!0}),l=_(o,"META",{property:!0,content:!0}),T=_(o,"META",{property:!0,content:!0}),E=_(o,"META",{property:!0,content:!0}),o.forEach(u),I=K(a),b=_(a,"DIV",{class:!0});var S=q(b);f=_(S,"DIV",{class:!0});var w=q(f);M=_(w,"DIV",{class:!0});var U=q(M);$=_(U,"IMG",{class:!0,src:!0,alt:!0}),U.forEach(u),G=K(w),d=_(w,"DIV",{class:!0});var V=q(d);O(v.$$.fragment,V),B=K(V),O(h.$$.fragment,V),V.forEach(u),w.forEach(u),S.forEach(u),this.h()},h(){r(s,"name","description"),r(s,"content",e=i[n[0]].title_post),r(l,"property","og:description"),r(l,"content",m=i[n[0]].title_post),r(T,"property","og:title"),r(T,"content",y=i[n[0]].rogue_sami),r(E,"property","og:url"),r(E,"content",A=`https://tomimi.dev/${n[0]}/sami`),r($,"class","select-none mx-auto py-2"),X($.src,N=Y)||r($,"src",N),r($,"alt",D=i[n[0]].rogue_sami),r(M,"class","py-4"),r(d,"class","space-y-6"),r(f,"class","pb-24 max-w-4xl mx-auto"),r(b,"class","bg-neutral-800 min-h-screen")},m(a,o){p(document.head,s),p(document.head,l),p(document.head,T),p(document.head,E),F(a,I,o),F(a,b,o),p(b,f),p(f,M),p(M,$),p(f,G),p(f,d),P(v,d,null),p(d,B),P(h,d,null),c=!0},p(a,[o]){(!c||o&1)&&t!==(t=i[a[0]].rogue_sami+" / "+i[a[0]].title_post)&&(document.title=t),(!c||o&1&&e!==(e=i[a[0]].title_post))&&r(s,"content",e),(!c||o&1&&m!==(m=i[a[0]].title_post))&&r(l,"content",m),(!c||o&1&&y!==(y=i[a[0]].rogue_sami))&&r(T,"content",y),(!c||o&1&&A!==(A=`https://tomimi.dev/${a[0]}/sami`))&&r(E,"content",A),(!c||o&1&&D!==(D=i[a[0]].rogue_sami))&&r($,"alt",D);const S={};o&1&&(S.title=i[a[0]].how_to_use),o&5&&(S.$$scope={dirty:o,ctx:a}),v.$set(S);const w={};o&1&&(w.title=i[a[0]].stage_nav),o&5&&(w.$$scope={dirty:o,ctx:a}),h.$set(w)},i(a){c||(j(v.$$.fragment,a),j(h.$$.fragment,a),c=!0)},o(a){k(v.$$.fragment,a),k(h.$$.fragment,a),c=!1},d(a){u(s),u(l),u(T),u(E),a&&u(I),a&&u(b),z(v),z(h)}}}function oe(n,t,s){let e,{data:l}=t;return n.$$set=m=>{"data"in m&&s(1,l=m.data)},n.$$.update=()=>{n.$$.dirty&2&&s(0,e=l.language)},[e,l]}class pe extends L{constructor(t){super(),Q(this,t,oe,ne,R,{data:1})}}export{pe as component,ce as universal};
