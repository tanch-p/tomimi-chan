import{S as V,i as Y,s as C,a as F,k as m,q as h,M as N,h as d,c as L,l as p,m as w,r as _,n as b,b as v,E as n,F as M,L as P,o as G}from"../chunks/index.de62ce89.js";import{g as H}from"../chunks/navigation.b5cde2a2.js";import{p as J}from"../chunks/stores.62cdf5e6.js";function K(l){let r,t,a;return{c(){r=h("An unexpected error occured while loading the page. "),t=m("br"),a=h(`
				If this error persists, please kindly inform me on discord xiiao#0613`)},l(e){r=_(e,"An unexpected error occured while loading the page. "),t=p(e,"BR",{}),a=_(e,`
				If this error persists, please kindly inform me on discord xiiao#0613`)},m(e,s){v(e,r,s),v(e,t,s),v(e,a,s)},d(e){e&&d(r),e&&d(t),e&&d(a)}}}function O(l){let r;return{c(){r=h("The page you requested could not be found")},l(t){r=_(t,"The page you requested could not be found")},m(t,a){v(t,r,a)},d(t){t&&d(r)}}}function Q(l){let r,t,a,e,s,y,i,E,I,q,B,R,u,T,k;function j(o,g){return o[1]==="Not Found"?O:K}let x=j(l),f=x(l);return{c(){r=F(),t=m("div"),a=m("div"),e=m("p"),f.c(),s=F(),y=m("br"),i=m("br"),E=h(`
			You will be redirected to the homepage in `),I=h(l[2]),q=h(" seconds..."),B=m("br"),R=h(`
			If you are not redirected please click
			`),u=m("a"),T=h("here"),this.h()},l(o){N("svelte-3d09l3",document.head).forEach(d),r=L(o),t=p(o,"DIV",{class:!0});var A=w(t);a=p(A,"DIV",{class:!0});var z=w(a);e=p(z,"P",{class:!0});var c=w(e);f.l(c),s=L(c),y=p(c,"BR",{}),i=p(c,"BR",{}),E=_(c,`
			You will be redirected to the homepage in `),I=_(c,l[2]),q=_(c," seconds..."),B=p(c,"BR",{}),R=_(c,`
			If you are not redirected please click
			`),u=p(c,"A",{"data-sveltekit-reload":!0,class:!0,href:!0});var D=w(u);T=_(D,"here"),D.forEach(d),c.forEach(d),z.forEach(d),A.forEach(d),this.h()},h(){document.title="404 / tomimi.dev",b(u,"data-sveltekit-reload",""),b(u,"class","text-blue-500"),b(u,"href",k=`/${l[0]}`),b(e,"class","text-center text-near-white"),b(a,"class","max-w-7xl mx-auto"),b(t,"class","bg-neutral-800 min-h-screen flex items-center")},m(o,g){v(o,r,g),v(o,t,g),n(t,a),n(a,e),f.m(e,null),n(e,s),n(e,y),n(e,i),n(e,E),n(e,I),n(e,q),n(e,B),n(e,R),n(e,u),n(u,T)},p(o,[g]){x!==(x=j(o))&&(f.d(1),f=x(o),f&&(f.c(),f.m(e,s))),g&1&&k!==(k=`/${o[0]}`)&&b(u,"href",k)},i:M,o:M,d(o){o&&d(r),o&&d(t),f.d()}}}let S=1e4;function U(l,r,t){let a,e;P(l,J,i=>t(3,e=i));let s="en",y=S/1e3;return G(()=>{{const i=window.navigator.language;i.match(/ja|ja/i)?t(0,s="ja"):i.includes("zh")&&t(0,s="zh"),setTimeout(async()=>{await H(`/${s}`)},S)}}),l.$$.update=()=>{var i;l.$$.dirty&8&&t(1,a=(i=e.error)==null?void 0:i.message)},[s,a,y,e]}class $ extends V{constructor(r){super(),Y(this,r,U,Q,C,{})}}export{$ as component};
