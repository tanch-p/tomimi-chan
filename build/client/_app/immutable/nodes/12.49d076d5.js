import{S as L,i as Q,s as R,k as g,a as C,y as q,M as W,l as _,h as u,c as G,m as V,z as P,n as r,N as X,E as p,b as J,A as j,g as k,d as z,B as H}from"../chunks/index.51467544.js";import{b as Y}from"../chunks/banner_sami_800px.7244ef3b.js";import{t as i}from"../chunks/translations.d23fe762.js";import{T as K}from"../chunks/TogglePanel.5390da2a.js";import{H as Z}from"../chunks/HowToUse.d29aec0c.js";import{S as x}from"../chunks/SamiNavTemp.f2b90bc5.js";const ee=({params:n})=>({language:n.lang}),ce=Object.freeze(Object.defineProperty({__proto__:null,load:ee},Symbol.toStringTag,{value:"Module"}));function te(n){let t,s;return t=new Z({props:{language:n[0],rogueTopic:"rogue_sami"}}),{c(){q(t.$$.fragment)},l(e){P(t.$$.fragment,e)},m(e,l){j(t,e,l),s=!0},p(e,l){const m={};l&1&&(m.language=e[0]),t.$set(m)},i(e){s||(k(t.$$.fragment,e),s=!0)},o(e){z(t.$$.fragment,e),s=!1},d(e){H(t,e)}}}function ae(n){let t,s;return t=new x({props:{language:n[0]}}),{c(){q(t.$$.fragment)},l(e){P(t.$$.fragment,e)},m(e,l){j(t,e,l),s=!0},p(e,l){const m={};l&1&&(m.language=e[0]),t.$set(m)},i(e){s||(k(t.$$.fragment,e),s=!0)},o(e){z(t.$$.fragment,e),s=!1},d(e){H(t,e)}}}function ne(n){let t,s,e,l,m,E,y,T,A,I,b,f,M,$,U,D,N,d,v,B,h,c;return document.title=t=i[n[0]].rogue_sami+" / "+i[n[0]].title_post,v=new K({props:{title:i[n[0]].how_to_use,isOpen:!0,$$slots:{default:[te]},$$scope:{ctx:n}}}),h=new K({props:{title:i[n[0]].stage_nav,isOpen:!0,$$slots:{default:[ae]},$$scope:{ctx:n}}}),{c(){s=g("meta"),l=g("meta"),E=g("meta"),T=g("meta"),I=C(),b=g("div"),f=g("div"),M=g("div"),$=g("img"),N=C(),d=g("div"),q(v.$$.fragment),B=C(),q(h.$$.fragment),this.h()},l(a){const o=W("svelte-akqw7i",document.head);s=_(o,"META",{name:!0,content:!0}),l=_(o,"META",{property:!0,content:!0}),E=_(o,"META",{property:!0,content:!0}),T=_(o,"META",{property:!0,content:!0}),o.forEach(u),I=G(a),b=_(a,"DIV",{class:!0});var S=V(b);f=_(S,"DIV",{class:!0});var w=V(f);M=_(w,"DIV",{class:!0});var F=V(M);$=_(F,"IMG",{class:!0,src:!0,alt:!0}),F.forEach(u),N=G(w),d=_(w,"DIV",{class:!0});var O=V(d);P(v.$$.fragment,O),B=G(O),P(h.$$.fragment,O),O.forEach(u),w.forEach(u),S.forEach(u),this.h()},h(){r(s,"name","description"),r(s,"content",e=i[n[0]].title_post),r(l,"property","og:description"),r(l,"content",m=i[n[0]].title_post),r(E,"property","og:title"),r(E,"content",y=i[n[0]].rogue_sami),r(T,"property","og:url"),r(T,"content",A=`https://tomimi.dev/${n[0]}/sami`),r($,"class","select-none mx-auto py-2"),X($.src,U=Y)||r($,"src",U),r($,"alt",D=i[n[0]].rogue_sami),r(M,"class","py-4"),r(d,"class","space-y-6"),r(f,"class","pb-24 max-w-4xl mx-auto"),r(b,"class","bg-neutral-800 min-h-screen")},m(a,o){p(document.head,s),p(document.head,l),p(document.head,E),p(document.head,T),J(a,I,o),J(a,b,o),p(b,f),p(f,M),p(M,$),p(f,N),p(f,d),j(v,d,null),p(d,B),j(h,d,null),c=!0},p(a,[o]){(!c||o&1)&&t!==(t=i[a[0]].rogue_sami+" / "+i[a[0]].title_post)&&(document.title=t),(!c||o&1&&e!==(e=i[a[0]].title_post))&&r(s,"content",e),(!c||o&1&&m!==(m=i[a[0]].title_post))&&r(l,"content",m),(!c||o&1&&y!==(y=i[a[0]].rogue_sami))&&r(E,"content",y),(!c||o&1&&A!==(A=`https://tomimi.dev/${a[0]}/sami`))&&r(T,"content",A),(!c||o&1&&D!==(D=i[a[0]].rogue_sami))&&r($,"alt",D);const S={};o&1&&(S.title=i[a[0]].how_to_use),o&5&&(S.$$scope={dirty:o,ctx:a}),v.$set(S);const w={};o&1&&(w.title=i[a[0]].stage_nav),o&5&&(w.$$scope={dirty:o,ctx:a}),h.$set(w)},i(a){c||(k(v.$$.fragment,a),k(h.$$.fragment,a),c=!0)},o(a){z(v.$$.fragment,a),z(h.$$.fragment,a),c=!1},d(a){u(s),u(l),u(E),u(T),a&&u(I),a&&u(b),H(v),H(h)}}}function oe(n,t,s){let e,{data:l}=t;return n.$$set=m=>{"data"in m&&s(1,l=m.data)},n.$$.update=()=>{n.$$.dirty&2&&s(0,e=l.language)},[e,l]}class pe extends L{constructor(t){super(),Q(this,t,oe,ne,R,{data:1})}}export{pe as component,ce as universal};
