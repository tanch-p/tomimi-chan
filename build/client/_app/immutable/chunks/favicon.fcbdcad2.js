import{S as J,i as M,s as x,k as b,T as j,q as D,a as I,l as w,m as v,U as q,r as H,h as p,c as V,n as h,b as U,H as o,O as S,W as P,u as Q,I as B,Q as R,J as W}from"./index.fef03e7a.js";import{p as Z}from"./stores.a32293e5.js";function C(s){const a=e=>{s.contains(e.target)||s.dispatchEvent(new CustomEvent("outclick"))};return document.addEventListener("click",a,!0),{destroy(){document.removeEventListener("click",a,!0)}}}function T(s){let a,e,t,c,_,f,i,g,m,u,d,E,y,r;return{c(){a=b("div"),e=b("a"),t=b("div"),c=D("English"),_=I(),f=b("a"),i=b("div"),g=D("日本語"),m=I(),u=b("a"),d=b("div"),E=D("中文"),this.h()},l(n){a=w(n,"DIV",{class:!0});var l=v(a);e=w(l,"A",{href:!0});var L=v(e);t=w(L,"DIV",{class:!0});var k=v(t);c=H(k,"English"),k.forEach(p),L.forEach(p),_=V(l),f=w(l,"A",{href:!0});var z=v(f);i=w(z,"DIV",{class:!0});var A=v(i);g=H(A,"日本語"),A.forEach(p),z.forEach(p),m=V(l),u=w(l,"A",{href:!0});var N=v(u);d=w(N,"DIV",{class:!0});var O=v(d);E=H(O,"中文"),O.forEach(p),N.forEach(p),l.forEach(p),this.h()},h(){h(t,"class","px-2 my-0.5 hover:bg-gray-600"),h(e,"href",s[2]),h(i,"class","px-2 my-0.5 hover:bg-gray-600"),h(f,"href",s[3]),h(d,"class","px-2 my-0.5 hover:bg-gray-600"),h(u,"href",s[4]),h(a,"class","absolute w-max mt-1 py-0.5 bg-neutral-900 select-none")},m(n,l){U(n,a,l),o(a,e),o(e,t),o(t,c),o(a,_),o(a,f),o(f,i),o(i,g),o(a,m),o(a,u),o(u,d),o(d,E),y||(r=S(a,"click",s[14]),y=!0)},p(n,l){l&4&&h(e,"href",n[2]),l&8&&h(f,"href",n[3]),l&16&&h(u,"href",n[4])},d(n){n&&p(a),y=!1,r()}}}function F(s){let a,e,t,c,_,f,i,g,m=s[5][s[0]]+"",u,d,E,y,r=s[1]&&T(s);return{c(){a=b("div"),e=b("button"),t=b("span"),c=j("svg"),_=j("title"),f=D("language "),i=j("path"),g=I(),u=D(m),d=I(),r&&r.c(),this.h()},l(n){a=w(n,"DIV",{class:!0});var l=v(a);e=w(l,"BUTTON",{class:!0});var L=v(e);t=w(L,"SPAN",{class:!0});var k=v(t);c=q(k,"svg",{xmlns:!0,width:!0,height:!0,viewBox:!0,class:!0});var z=v(c);_=q(z,"title",{});var A=v(_);f=H(A,"language "),A.forEach(p),i=q(z,"path",{fill:!0,d:!0}),v(i).forEach(p),z.forEach(p),g=V(k),u=H(k,m),k.forEach(p),L.forEach(p),d=V(l),r&&r.l(l),l.forEach(p),this.h()},h(){h(i,"fill","#E2E2E2"),h(i,"d","M20 18h-1.44a.61.61 0 0 1-.4-.12.81.81 0 0 1-.23-.31L17 15h-5l-1 2.54a.77.77 0 0 1-.22.3.59.59 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a11.62 11.62 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56-1.58 4.19zm-6.3-1.58a13.43 13.43 0 0 1-2.91-1.41 11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.19 17.19 0 0 1-5 2.1q.56.82.87 1.38a23.28 23.28 0 0 0 5.22-2.51 15.64 15.64 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.11 8.11 0 0 1-2.45 4.45 9.11 9.11 0 0 1-2.46-4.45z"),h(c,"xmlns","http://www.w3.org/2000/svg"),h(c,"width","20"),h(c,"height","20"),h(c,"viewBox","0 0 20 20"),h(c,"class","mb-0.5"),h(t,"class","flex gap-x-1.5 svelte-t8499q"),h(e,"class","sm:py-1 px-2 hover:underline h-full"),h(a,"class","relative")},m(n,l){U(n,a,l),o(a,e),o(e,t),o(t,c),o(c,_),o(_,f),o(c,i),o(t,g),o(t,u),o(a,d),r&&r.m(a,null),E||(y=[S(e,"click",s[13]),P(C.call(null,a)),S(a,"outclick",s[15])],E=!0)},p(n,[l]){l&1&&m!==(m=n[5][n[0]]+"")&&Q(u,m),n[1]?r?r.p(n,l):(r=T(n),r.c(),r.m(a,null)):r&&(r.d(1),r=null)},i:B,o:B,d(n){n&&p(a),r&&r.d(),E=!1,R(y)}}}function G(s,a,e){let t,c,_,f,i,g,m,u;W(s,Z,z=>e(12,u=z));let d=!1,E,y,r;const n={en:"EN",ja:"日本語",zh:"中文"},l=()=>e(1,d=!d),L=()=>e(1,d=!1),k=()=>e(1,d=!1);return s.$$.update=()=>{s.$$.dirty&4096&&e(11,t=u.data.mapConfig),s.$$.dirty&4096&&e(0,c=u.data.language),s.$$.dirty&4096&&e(6,_=u.url.pathname),s.$$.dirty&2048&&e(8,f=t==null?void 0:t.code),s.$$.dirty&2048&&e(7,i=t==null?void 0:t.name_zh),s.$$.dirty&2048&&e(9,g=t==null?void 0:t.name_ja),s.$$.dirty&2048&&e(10,m=t==null?void 0:t.name_en),s.$$.dirty&4033&&(t&&!t.contracts?(e(2,E=`/en/stages/${f}_${m||i}`),e(3,y=`/ja/stages/${f}_${g||i}`),e(4,r=`/zh/stages/${f}_${i}`)):(e(2,E=_.replace(c,"en")),e(3,y=_.replace(c,"ja")),e(4,r=_.replace(c,"zh"))))},[c,d,E,y,r,n,_,i,f,g,m,t,u,l,L,k]}class Y extends J{constructor(a){super(),M(this,a,G,F,x,{})}}const $=""+new URL("../assets/favicon.e511bc87.webp",import.meta.url).href;export{Y as L,C as c,$ as f};