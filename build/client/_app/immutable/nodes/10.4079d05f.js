import{S as R,i as W,s as X,k as p,a as U,y as H,G as Y,l as $,h as c,c as B,m as I,z as O,n as s,K as Z,H as _,b as J,A as P,g as j,d as y,B as G,q as x,r as ee,u as te}from"../chunks/index.fef03e7a.js";import{M as ae}from"../chunks/MizukiNav.10bf95c1.js";import{b as ne}from"../chunks/banner_mizuki_800px.062a6e81.js";import{t as i}from"../chunks/translations.484a5201.js";import{T as F}from"../chunks/TogglePanel.2e17abfb.js";import{H as le}from"../chunks/HowToUse.329b6897.js";const oe=({params:n})=>({language:n.lang}),de=Object.freeze(Object.defineProperty({__proto__:null,load:oe},Symbol.toStringTag,{value:"Module"}));function se(n){let t,l;return t=new le({props:{language:n[0],rogueTopic:"rogue_mizuki"}}),{c(){H(t.$$.fragment)},l(e){O(t.$$.fragment,e)},m(e,o){P(t,e,o),l=!0},p(e,o){const u={};o&1&&(u.language=e[0]),t.$set(u)},i(e){l||(j(t.$$.fragment,e),l=!0)},o(e){y(t.$$.fragment,e),l=!1},d(e){G(t,e)}}}function re(n){let t,l,e,o=i[n[0]].laoli_title+"",u,g;return{c(){t=p("ul"),l=p("li"),e=p("a"),u=x(o),this.h()},l(f){t=$(f,"UL",{class:!0});var m=I(t);l=$(m,"LI",{class:!0});var T=I(l);e=$(T,"A",{class:!0,href:!0});var M=I(e);u=ee(M,o),M.forEach(c),T.forEach(c),m.forEach(c),this.h()},h(){s(e,"class","text-sky-500 hover:underline"),s(e,"href",g="/"+n[0]+"/laoli"),s(l,"class","list-disc list-inside"),s(t,"class","text-lg pt-2 pb-6")},m(f,m){J(f,t,m),_(t,l),_(l,e),_(e,u)},p(f,m){m&1&&o!==(o=i[f[0]].laoli_title+"")&&te(u,o),m&1&&g!==(g="/"+f[0]+"/laoli")&&s(e,"href",g)},d(f){f&&c(t)}}}function ie(n){let t,l;return t=new ae({props:{language:n[0]}}),{c(){H(t.$$.fragment)},l(e){O(t.$$.fragment,e)},m(e,o){P(t,e,o),l=!0},p(e,o){const u={};o&1&&(u.language=e[0]),t.$set(u)},i(e){l||(j(t.$$.fragment,e),l=!0)},o(e){y(t.$$.fragment,e),l=!1},d(e){G(t,e)}}}function ue(n){let t,l,e,o,u,g,f,m,T,M,A,v,q,k,Q,L,C,d,z,K,w,N,E,h;return document.title=t=i[n[0]].rogue_mizuki+" / "+i[n[0]].title_post,z=new F({props:{title:i[n[0]].how_to_use,$$slots:{default:[se]},$$scope:{ctx:n}}}),w=new F({props:{title:i[n[0]].related_tools,$$slots:{default:[re]},$$scope:{ctx:n}}}),E=new F({props:{title:i[n[0]].stage_nav,isOpen:!0,$$slots:{default:[ie]},$$scope:{ctx:n}}}),{c(){l=p("meta"),o=p("meta"),g=p("meta"),m=p("meta"),M=U(),A=p("div"),v=p("div"),q=p("div"),k=p("img"),C=U(),d=p("div"),H(z.$$.fragment),K=U(),H(w.$$.fragment),N=U(),H(E.$$.fragment),this.h()},l(a){const r=Y("svelte-3wqcx",document.head);l=$(r,"META",{name:!0,content:!0}),o=$(r,"META",{property:!0,content:!0}),g=$(r,"META",{property:!0,content:!0}),m=$(r,"META",{property:!0,content:!0}),r.forEach(c),M=B(a),A=$(a,"DIV",{class:!0});var D=I(A);v=$(D,"DIV",{class:!0});var b=I(v);q=$(b,"DIV",{class:!0});var S=I(q);k=$(S,"IMG",{class:!0,src:!0,alt:!0}),S.forEach(c),C=B(b),d=$(b,"DIV",{class:!0});var V=I(d);O(z.$$.fragment,V),K=B(V),O(w.$$.fragment,V),N=B(V),O(E.$$.fragment,V),V.forEach(c),b.forEach(c),D.forEach(c),this.h()},h(){s(l,"name","description"),s(l,"content",e=i[n[0]].title_post),s(o,"property","og:description"),s(o,"content",u=i[n[0]].title_post),s(g,"property","og:title"),s(g,"content",f=i[n[0]].rogue_mizuki),s(m,"property","og:url"),s(m,"content",T=`https://tomimi.dev/${n[0]}/mizuki`),s(k,"class","select-none mx-auto py-2"),Z(k.src,Q=ne)||s(k,"src",Q),s(k,"alt",L=i[n[0]].rogue_mizuki),s(q,"class","py-4"),s(d,"class","space-y-6"),s(v,"class","pb-24 max-w-4xl mx-auto"),s(A,"class","bg-neutral-800 min-h-screen")},m(a,r){_(document.head,l),_(document.head,o),_(document.head,g),_(document.head,m),J(a,M,r),J(a,A,r),_(A,v),_(v,q),_(q,k),_(v,C),_(v,d),P(z,d,null),_(d,K),P(w,d,null),_(d,N),P(E,d,null),h=!0},p(a,[r]){(!h||r&1)&&t!==(t=i[a[0]].rogue_mizuki+" / "+i[a[0]].title_post)&&(document.title=t),(!h||r&1&&e!==(e=i[a[0]].title_post))&&s(l,"content",e),(!h||r&1&&u!==(u=i[a[0]].title_post))&&s(o,"content",u),(!h||r&1&&f!==(f=i[a[0]].rogue_mizuki))&&s(g,"content",f),(!h||r&1&&T!==(T=`https://tomimi.dev/${a[0]}/mizuki`))&&s(m,"content",T),(!h||r&1&&L!==(L=i[a[0]].rogue_mizuki))&&s(k,"alt",L);const D={};r&1&&(D.title=i[a[0]].how_to_use),r&5&&(D.$$scope={dirty:r,ctx:a}),z.$set(D);const b={};r&1&&(b.title=i[a[0]].related_tools),r&5&&(b.$$scope={dirty:r,ctx:a}),w.$set(b);const S={};r&1&&(S.title=i[a[0]].stage_nav),r&5&&(S.$$scope={dirty:r,ctx:a}),E.$set(S)},i(a){h||(j(z.$$.fragment,a),j(w.$$.fragment,a),j(E.$$.fragment,a),h=!0)},o(a){y(z.$$.fragment,a),y(w.$$.fragment,a),y(E.$$.fragment,a),h=!1},d(a){c(l),c(o),c(g),c(m),a&&c(M),a&&c(A),G(z),G(w),G(E)}}}function me(n,t,l){let e,{data:o}=t;return n.$$set=u=>{"data"in u&&l(1,o=u.data)},n.$$.update=()=>{n.$$.dirty&2&&l(0,e=o.language)},[e,o]}class he extends R{constructor(t){super(),W(this,t,me,ue,X,{data:1})}}export{he as component,de as universal};