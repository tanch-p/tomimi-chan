import{S as aa,i as na,s as ra,k as i,l as f,m as h,h as c,n as l,b as pe,I as pl,M as _l,q as E,a as d,r as k,c as v,H as e,u as L,y as Ma,G as an,z as Oa,N as U,A as Ra,O as S,P as H,g as qa,d as Ha,B as Ga,Q as nn}from"../chunks/index.fef03e7a.js";import{t as w}from"../chunks/translations.484a5201.js";const rn=({params:t})=>({language:t.lang}),En=Object.freeze(Object.defineProperty({__proto__:null,load:rn},Symbol.toStringTag,{value:"Module"}));function Qa(t,a,s){const r=t.slice();return r[3]=a[s].key,r[4]=a[s].value,r[5]=a[s].counter,r[7]=s,r}function Ja(t){let a,s=t[5]+t[1]+"",r;return{c(){a=i("p"),r=E(s),this.h()},l(o){a=f(o,"P",{class:!0});var _=h(a);r=k(_,s),_.forEach(c),this.h()},h(){l(a,"class","text-right")},m(o,_){pe(o,a,_),e(a,r)},p(o,_){_&6&&s!==(s=o[5]+o[1]+"")&&L(r,s)},d(o){o&&c(a)}}}function Ka(t){let a,s,r=t[4]+"",o,_,u,y,P,m=t[3]==="frz"&&Ja(t);return{c(){a=i("div"),s=i("div"),o=E(r),y=d(),m&&m.c(),P=d(),this.h()},l(g){a=f(g,"DIV",{class:!0});var b=h(a);s=f(b,"DIV",{class:!0,style:!0});var A=h(s);o=k(A,r),A.forEach(c),y=v(b),m&&m.l(b),P=v(b),b.forEach(c),this.h()},h(){l(s,"class",_=`flex items-center justify-center h-[24px] border-r border-black text-sm font-bold ${t[3]==="frz"?"bg-[#34c2e6]":t[3]==="f0"?"bg-[#fdfc01]":t[3]==="f1"?"bg-[#f8cc47]":"bg-[#f28b00] "}`),l(s,"style",u=`width: ${t[4]*t[0]}px;`),l(a,"class","flex flex-col")},m(g,b){pe(g,a,b),e(a,s),e(s,o),e(a,y),m&&m.m(a,null),e(a,P)},p(g,b){b&4&&r!==(r=g[4]+"")&&L(o,r),b&4&&_!==(_=`flex items-center justify-center h-[24px] border-r border-black text-sm font-bold ${g[3]==="frz"?"bg-[#34c2e6]":g[3]==="f0"?"bg-[#fdfc01]":g[3]==="f1"?"bg-[#f8cc47]":"bg-[#f28b00] "}`)&&l(s,"class",_),b&5&&u!==(u=`width: ${g[4]*g[0]}px;`)&&l(s,"style",u),g[3]==="frz"?m?m.p(g,b):(m=Ja(g),m.c(),m.m(a,P)):m&&(m.d(1),m=null)},d(g){g&&c(a),m&&m.d()}}}function un(t){let a,s=t[2],r=[];for(let o=0;o<s.length;o+=1)r[o]=Ka(Qa(t,s,o));return{c(){a=i("div");for(let o=0;o<r.length;o+=1)r[o].c();this.h()},l(o){a=f(o,"DIV",{class:!0});var _=h(a);for(let u=0;u<r.length;u+=1)r[u].l(_);_.forEach(c),this.h()},h(){l(a,"class","flex w-max")},m(o,_){pe(o,a,_);for(let u=0;u<r.length;u+=1)r[u]&&r[u].m(a,null)},p(o,[_]){if(_&7){s=o[2];let u;for(u=0;u<s.length;u+=1){const y=Qa(o,s,u);r[u]?r[u].p(y,_):(r[u]=Ka(y),r[u].c(),r[u].m(a,null))}for(;u<r.length;u+=1)r[u].d(1);r.length=s.length}},i:pl,o:pl,d(o){o&&c(a),_l(r,o)}}}function on(t,a,s){let{resolution:r,freezeDuration:o,fValues:_}=a;return t.$$set=u=>{"resolution"in u&&s(0,r=u.resolution),"freezeDuration"in u&&s(1,o=u.freezeDuration),"fValues"in u&&s(2,_=u.fValues)},[r,o,_]}class fn extends aa{constructor(a){super(),na(this,a,on,un,ra,{resolution:0,freezeDuration:1,fValues:2})}}function Wa(t,a,s){const r=t.slice();return r[6]=a[s].key,r[7]=a[s].value,r}function Xa(t){let a,s,r=t[7]+"",o,_,u,y;return{c(){a=i("div"),s=i("div"),o=E(r),y=d(),this.h()},l(P){a=f(P,"DIV",{class:!0});var m=h(a);s=f(m,"DIV",{class:!0,style:!0});var g=h(s);o=k(g,r),g.forEach(c),y=v(m),m.forEach(c),this.h()},h(){l(s,"class",_=`flex items-center justify-center h-[24px] border-black text-sm font-bold ${t[6]==="blank"?"":"bg-[#8d2828] border-r text-near-white"}`),l(s,"style",u=`width: ${t[7]*t[0]}px;`),l(a,"class","flex flex-col")},m(P,m){pe(P,a,m),e(a,s),e(s,o),e(a,y)},p(P,m){m&2&&r!==(r=P[7]+"")&&L(o,r),m&2&&_!==(_=`flex items-center justify-center h-[24px] border-black text-sm font-bold ${P[6]==="blank"?"":"bg-[#8d2828] border-r text-near-white"}`)&&l(s,"class",_),m&3&&u!==(u=`width: ${P[7]*P[0]}px;`)&&l(s,"style",u)},d(P){P&&c(a)}}}function cn(t){let a,s=t[1],r=[];for(let o=0;o<s.length;o+=1)r[o]=Xa(Wa(t,s,o));return{c(){a=i("div");for(let o=0;o<r.length;o+=1)r[o].c();this.h()},l(o){a=f(o,"DIV",{class:!0});var _=h(a);for(let u=0;u<r.length;u+=1)r[u].l(_);_.forEach(c),this.h()},h(){l(a,"class","flex w-max")},m(o,_){pe(o,a,_);for(let u=0;u<r.length;u+=1)r[u]&&r[u].m(a,null)},p(o,[_]){if(_&3){s=o[1];let u;for(u=0;u<s.length;u+=1){const y=Wa(o,s,u);r[u]?r[u].p(y,_):(r[u]=Xa(y),r[u].c(),r[u].m(a,null))}for(;u<r.length;u+=1)r[u].d(1);r.length=s.length}},i:pl,o:pl,d(o){o&&c(a),_l(r,o)}}}function ot(t,a){return t+a.value}function hn(t,a,s){let r,o,{resolution:_,fValues:u,moduleLevel:y}=a;function P(m,g){let b=[],A=0,F=0,D=0,V=0;for(let T=0;T<m.length-2;T++)m[T+2].key==="frz"?F!==A&&(D=T,A===0?(b.push({key:"blank",value:m.slice(A,F).reduce(ot,0)}),b.push({key:"stun",value:m.slice(F,D).reduce(ot,0)+g})):V>g?(b.push({key:"blank",value:V-g}),b.push({key:"stun",value:m.slice(F,D).reduce(ot,0)+g})):b.push({key:"stun",value:m.slice(F,D).reduce(ot,0)+g}),F=T+3,A=T+3):m[T+2].key==="f2"&&F===A&&(F=T+2,V=m.slice(D,F).reduce(ot,0),A!==0&&V<g&&b.push({key:"minus",value:g-V}));for(let T=0;T<b.length;T++)b[T].key==="minus"&&(b[T-1].value-=b[T].value);b=b.filter(T=>T.key!=="minus");let O=[],B=-1;for(let T=0;T<b.length;T++)b[T].key==="blank"?(B!==-1&&O.push({key:"stun",value:b.slice(B,T).reduce(ot,0)}),O.push(b[T]),B=-1):B===-1&&(B=T);return B!==-1&&O.push({key:"stun",value:b.slice(B,b.length).reduce(ot,0)}),O}return t.$$set=m=>{"resolution"in m&&s(0,_=m.resolution),"fValues"in m&&s(2,u=m.fValues),"moduleLevel"in m&&s(3,y=m.moduleLevel)},t.$$.update=()=>{t.$$.dirty&8&&s(4,r=y>=2?4*30:3*30),t.$$.dirty&20&&s(1,o=P(u,r))},[_,o,u,y,r]}class _n extends aa{constructor(a){super(),na(this,a,hn,cn,ra,{resolution:0,fValues:2,moduleLevel:3})}}function Ya(t,a,s){const r=t.slice();return r[47]=a[s],r}function Za(t,a,s){const r=t.slice();return r[50]=a[s],r[52]=s,r}function xa(t,a,s){const r=t.slice();return r[53]=a[s],r[55]=s,r}function pn(t){let a;return{c(){a=E(",")},l(s){a=k(s,",")},m(s,r){pe(s,a,r)},d(s){s&&c(a)}}}function $a(t){let a,s=t[53]+"",r,o=t[55]>0&&pn();return{c(){o&&o.c(),a=d(),r=E(s)},l(_){o&&o.l(_),a=v(_),r=k(_,s)},m(_,u){o&&o.m(_,u),pe(_,a,u),pe(_,r,u)},p(_,u){u[0]&2048&&s!==(s=_[53]+"")&&L(r,s)},d(_){o&&o.d(_),_&&c(a),_&&c(r)}}}function en(t){let a,s,r=t[52]+1+"",o,_,u,y,P;return{c(){a=i("div"),s=i("p"),o=E(r),_=d(),u=i("div"),P=d(),this.h()},l(m){a=f(m,"DIV",{class:!0});var g=h(a);s=f(g,"P",{class:!0});var b=h(s);o=k(b,r),b.forEach(c),_=v(g),u=f(g,"DIV",{class:!0,style:!0}),h(u).forEach(c),P=v(g),g.forEach(c),this.h()},h(){l(s,"class","text-lg font-bold"),l(u,"class",`h-[24px] border-r border-black ${t[52]%2===0?"bg-neutral-900":"bg-gray-600"}`),l(u,"style",y=`width:${90*t[9]}px`),l(a,"class","flex flex-col items-center")},m(m,g){pe(m,a,g),e(a,s),e(s,o),e(a,_),e(a,u),e(a,P)},p(m,g){g[0]&512&&y!==(y=`width:${90*m[9]}px`)&&l(u,"style",y)},d(m){m&&c(a)}}}function tn(t){let a,s,r=t[47].name+"",o,_;return{c(){a=i("li"),s=i("a"),o=E(r),_=d(),this.h()},l(u){a=f(u,"LI",{});var y=h(a);s=f(y,"A",{class:!0,href:!0,target:!0});var P=h(s);o=k(P,r),P.forEach(c),_=v(y),y.forEach(c),this.h()},h(){l(s,"class","text-sky-500 hover:underline"),l(s,"href",`https://space.bilibili.com/${t[47].href}`),l(s,"target","_blank")},m(u,y){pe(u,a,y),e(a,s),e(s,o),e(a,_)},p:pl,d(u){u&&c(a)}}}function dn(t){let a,s,r,o,_,u,y,P,m,g,b,A,F,D=w[t[14]].laoli_title+"",V,O,B,T,R,X,te,de,tt,lt=w[t[14]].laoli_f_explain+"",it,St,j,K,Ce,st=w[t[14]].laoli_zoom+"",ft,Dt,Y,Bt,ze,jt,Lt,le,Ct,Ue,zt,Ut,W,Fe,at=w[t[14]].laoli_rounds+"",ct,Ft,Z,q,Me,Mt,Oe,ve,Gl,ht,Ql,Jl,se,_t,Ot=w[t[14]].laoli_module_lvl+"",dl,Kl,Ne,Wl,vl,Xl,ae,Yl,Ve,Zl,ml,xl,x,pt,Rt=w[t[14]].laoli_talent_adjust+"",bl,$l,ne,es,dt,ts,ls,me,ss,vt,as,ns,$,mt,qt=w[t[14]].laoli_aspd+"",gl,rs,re,us,bt,os,is,be,fs,gt,cs,hs,ue,nt,Ht=w[t[14]].laoli_f0+"",El,_s,ps,Se,ds,kl,vs,oe,ms,De,bs,wl,gs,Be,Es,Al,ks,Il,ws,ie,rt,Gt=w[t[14]].laoli_fCold+"",Pl,As,Is,fe,Ps,yl,ys,ce,Ts,he,Ns,Tl,Vs,Re,Et,Qt=w[t[14]].laoli_initial_talent_on+"",Nl,Ss,qe,Ds,He,kt,Jt=w[t[14]].laoli_doq_hp50+"",Vl,Bs,Ge,js,Qe,Ls,Cs,Ee,Je,zs,je,Sl,Us,Ke,Fs,wt,Kt=w[t[14]].legend+"",Dl,Ms,ee,We,Wt,Os,Xt,Yt=w[t[14]].laoli_f0+"",Bl,Rs,ke,Zt,qs,xt,Hs,$t,el=w[t[14]].laoli_fCold+"",jl,Gs,Xe,tl,Qs,ll,sl=w[t[14]].laoli_freeze_duration+"",Ll,Js,we,al,Ks,nl,Ws,rl,ul=w[t[14]].laoli_talent+"",Cl,Xs,Ye,ol,Ys,il,fl=w[t[14]].laoli_stun_duration+"",zl,Zs,Ze,At,cl=w[t[14]].laoli_credits+"",Ul,xs,ut,N,$s,ua;document.title=a=w[t[14]].laoli_title+" / "+w[t[14]].title_post;let It=t[11],G=[];for(let n=0;n<It.length;n+=1)G[n]=$a(xa(t,It,n));Je=new _n({props:{resolution:t[9],fValues:t[12],moduleLevel:t[5]}});let Pt=Array(t[1]),Q=[];for(let n=0;n<Pt.length;n+=1)Q[n]=en(Za(t,Pt,n));Ke=new fn({props:{resolution:t[9],fValues:t[12],freezeDuration:t[7]}});let yt=t[15],J=[];for(let n=0;n<yt.length;n+=1)J[n]=tn(Ya(t,yt,n));return{c(){s=i("meta"),o=i("meta"),u=i("meta"),P=i("meta"),g=d(),b=i("div"),A=i("div"),F=i("h1"),V=E(D),O=d(),B=i("p"),T=E(`原理解析：\r
			`),R=i("a"),X=E("bilibili"),te=d(),de=i("p"),tt=E("※"),it=E(lt),St=d(),j=i("div"),K=i("label"),Ce=i("span"),ft=E(st),Dt=d(),Y=i("input"),Bt=d(),ze=i("span"),jt=E("1"),Lt=d(),le=i("input"),Ct=d(),Ue=i("span"),zt=E("10"),Ut=d(),W=i("label"),Fe=i("span"),ct=E(at),Ft=d(),Z=i("input"),q=d(),Me=i("span"),Mt=E("20"),Oe=d(),ve=i("input"),Gl=d(),ht=i("span"),Ql=E("100"),Jl=d(),se=i("label"),_t=i("span"),dl=E(Ot),Kl=d(),Ne=i("button"),Wl=E("－"),Xl=d(),ae=i("input"),Yl=d(),Ve=i("button"),Zl=E("＋"),xl=d(),x=i("label"),pt=i("span"),bl=E(Rt),$l=d(),ne=i("input"),es=d(),dt=i("span"),ts=E("0"),ls=d(),me=i("input"),ss=d(),vt=i("span"),as=E("90"),ns=d(),$=i("label"),mt=i("span"),gl=E(qt),rs=d(),re=i("input"),us=d(),bt=i("span"),os=E("0"),is=d(),be=i("input"),fs=d(),gt=i("span"),cs=E("300"),hs=d(),ue=i("label"),nt=i("span"),El=E(Ht),_s=E("(F0)"),ps=d(),Se=i("button"),ds=E("－"),vs=d(),oe=i("input"),ms=d(),De=i("button"),bs=E("＋"),gs=d(),Be=i("p"),Es=E("Fnormal: "),Al=E(t[13]),ks=E("    Fcold: "),Il=E(t[6]),ws=d(),ie=i("div"),rt=i("span"),Pl=E(Gt),As=E("(F1,F2)"),Is=d(),fe=i("button"),Ps=E("－"),ys=d(),ce=i("input"),Ts=d(),he=i("button"),Ns=E("＋"),Vs=d(),Re=i("label"),Et=i("span"),Nl=E(Qt),Ss=d(),qe=i("input"),Ds=d(),He=i("label"),kt=i("span"),Vl=E(Jt),Bs=d(),Ge=i("input"),js=d(),Qe=i("p"),Ls=E(`COST/min:\r
			`);for(let n=0;n<G.length;n+=1)G[n].c();Cs=d(),Ee=i("div"),Ma(Je.$$.fragment),zs=d(),je=i("div");for(let n=0;n<Q.length;n+=1)Q[n].c();Us=d(),Ma(Ke.$$.fragment),Fs=d(),wt=i("p"),Dl=E(Kt),Ms=d(),ee=i("div"),We=i("div"),Wt=i("div"),Os=d(),Xt=i("span"),Bl=E(Yt),Rs=d(),ke=i("div"),Zt=i("div"),qs=d(),xt=i("div"),Hs=d(),$t=i("span"),jl=E(el),Gs=d(),Xe=i("div"),tl=i("div"),Qs=d(),ll=i("span"),Ll=E(sl),Js=d(),we=i("div"),al=i("div"),Ks=d(),nl=i("div"),Ws=d(),rl=i("span"),Cl=E(ul),Xs=d(),Ye=i("div"),ol=i("div"),Ys=d(),il=i("span"),zl=E(fl),Zs=d(),Ze=i("div"),At=i("p"),Ul=E(cl),xs=d(),ut=i("ul");for(let n=0;n<J.length;n+=1)J[n].c();this.h()},l(n){const p=an("svelte-l0emk3",document.head);s=f(p,"META",{name:!0,content:!0}),o=f(p,"META",{property:!0,content:!0}),u=f(p,"META",{property:!0,content:!0}),P=f(p,"META",{property:!0,content:!0}),p.forEach(c),g=v(n),b=f(n,"DIV",{class:!0});var z=h(b);A=f(z,"DIV",{class:!0});var C=h(A);F=f(C,"H1",{class:!0});var I=h(F);V=k(I,D),I.forEach(c),O=v(C),B=f(C,"P",{class:!0});var _e=h(B);T=k(_e,`原理解析：\r
			`),R=f(_e,"A",{class:!0,href:!0,target:!0});var oa=h(R);X=k(oa,"bilibili"),oa.forEach(c),_e.forEach(c),te=v(C),de=f(C,"P",{class:!0});var ea=h(de);tt=k(ea,"※"),it=k(ea,lt),ea.forEach(c),St=v(C),j=f(C,"DIV",{class:!0});var M=h(j);K=f(M,"LABEL",{class:!0});var Ae=h(K);Ce=f(Ae,"SPAN",{class:!0});var ia=h(Ce);ft=k(ia,st),ia.forEach(c),Dt=v(Ae),Y=f(Ae,"INPUT",{type:!0,min:!0,max:!0,step:!0,class:!0}),Bt=v(Ae),ze=f(Ae,"SPAN",{class:!0});var fa=h(ze);jt=k(fa,"1"),fa.forEach(c),Lt=v(Ae),le=f(Ae,"INPUT",{type:!0,min:!0,max:!0,step:!0}),Ct=v(Ae),Ue=f(Ae,"SPAN",{class:!0});var ca=h(Ue);zt=k(ca,"10"),ca.forEach(c),Ae.forEach(c),Ut=v(M),W=f(M,"LABEL",{class:!0});var Ie=h(W);Fe=f(Ie,"SPAN",{class:!0});var ha=h(Fe);ct=k(ha,at),ha.forEach(c),Ft=v(Ie),Z=f(Ie,"INPUT",{type:!0,min:!0,max:!0,step:!0,class:!0}),q=v(Ie),Me=f(Ie,"SPAN",{class:!0});var _a=h(Me);Mt=k(_a,"20"),_a.forEach(c),Oe=v(Ie),ve=f(Ie,"INPUT",{type:!0,min:!0,max:!0,step:!0}),Gl=v(Ie),ht=f(Ie,"SPAN",{class:!0});var pa=h(ht);Ql=k(pa,"100"),pa.forEach(c),Ie.forEach(c),Jl=v(M),se=f(M,"LABEL",{class:!0});var xe=h(se);_t=f(xe,"SPAN",{class:!0});var da=h(_t);dl=k(da,Ot),da.forEach(c),Kl=v(xe),Ne=f(xe,"BUTTON",{class:!0});var va=h(Ne);Wl=k(va,"－"),va.forEach(c),Xl=v(xe),ae=f(xe,"INPUT",{class:!0,type:!0,min:!0,max:!0,step:!0}),Yl=v(xe),Ve=f(xe,"BUTTON",{class:!0});var ma=h(Ve);Zl=k(ma,"＋"),ma.forEach(c),xe.forEach(c),xl=v(M),x=f(M,"LABEL",{class:!0});var Pe=h(x);pt=f(Pe,"SPAN",{class:!0});var ba=h(pt);bl=k(ba,Rt),ba.forEach(c),$l=v(Pe),ne=f(Pe,"INPUT",{type:!0,min:!0,max:!0,step:!0,class:!0}),es=v(Pe),dt=f(Pe,"SPAN",{class:!0});var ga=h(dt);ts=k(ga,"0"),ga.forEach(c),ls=v(Pe),me=f(Pe,"INPUT",{type:!0,min:!0,max:!0,step:!0}),ss=v(Pe),vt=f(Pe,"SPAN",{class:!0});var Ea=h(vt);as=k(Ea,"90"),Ea.forEach(c),Pe.forEach(c),ns=v(M),$=f(M,"LABEL",{class:!0});var ye=h($);mt=f(ye,"SPAN",{class:!0});var ka=h(mt);gl=k(ka,qt),ka.forEach(c),rs=v(ye),re=f(ye,"INPUT",{type:!0,min:!0,max:!0,step:!0,class:!0}),us=v(ye),bt=f(ye,"SPAN",{class:!0});var wa=h(bt);os=k(wa,"0"),wa.forEach(c),is=v(ye),be=f(ye,"INPUT",{type:!0,min:!0,max:!0,step:!0}),fs=v(ye),gt=f(ye,"SPAN",{class:!0});var Aa=h(gt);cs=k(Aa,"300"),Aa.forEach(c),ye.forEach(c),hs=v(M),ue=f(M,"LABEL",{class:!0});var $e=h(ue);nt=f($e,"SPAN",{class:!0});var ta=h(nt);El=k(ta,Ht),_s=k(ta,"(F0)"),ta.forEach(c),ps=v($e),Se=f($e,"BUTTON",{class:!0});var Ia=h(Se);ds=k(Ia,"－"),Ia.forEach(c),vs=v($e),oe=f($e,"INPUT",{class:!0,type:!0,min:!0,max:!0,step:!0}),ms=v($e),De=f($e,"BUTTON",{class:!0});var Pa=h(De);bs=k(Pa,"＋"),Pa.forEach(c),$e.forEach(c),gs=v(M),Be=f(M,"P",{class:!0});var hl=h(Be);Es=k(hl,"Fnormal: "),Al=k(hl,t[13]),ks=k(hl,"    Fcold: "),Il=k(hl,t[6]),hl.forEach(c),ws=v(M),ie=f(M,"DIV",{class:!0});var et=h(ie);rt=f(et,"SPAN",{class:!0});var la=h(rt);Pl=k(la,Gt),As=k(la,"(F1,F2)"),la.forEach(c),Is=v(et),fe=f(et,"BUTTON",{class:!0});var ya=h(fe);Ps=k(ya,"－"),ya.forEach(c),ys=v(et),ce=f(et,"INPUT",{class:!0,type:!0,min:!0,max:!0,step:!0}),Ts=v(et),he=f(et,"BUTTON",{class:!0});var Ta=h(he);Ns=k(Ta,"＋"),Ta.forEach(c),et.forEach(c),Vs=v(M),Re=f(M,"LABEL",{class:!0});var Fl=h(Re);Et=f(Fl,"SPAN",{class:!0});var Na=h(Et);Nl=k(Na,Qt),Na.forEach(c),Ss=v(Fl),qe=f(Fl,"INPUT",{class:!0,type:!0}),Fl.forEach(c),Ds=v(M),He=f(M,"LABEL",{class:!0});var Ml=h(He);kt=f(Ml,"SPAN",{class:!0});var Va=h(kt);Vl=k(Va,Jt),Va.forEach(c),Bs=v(Ml),Ge=f(Ml,"INPUT",{class:!0,type:!0}),Ml.forEach(c),M.forEach(c),js=v(C),Qe=f(C,"P",{class:!0});var sa=h(Qe);Ls=k(sa,`COST/min:\r
			`);for(let ge=0;ge<G.length;ge+=1)G[ge].l(sa);sa.forEach(c),Cs=v(C),Ee=f(C,"DIV",{class:!0});var Tt=h(Ee);Oa(Je.$$.fragment,Tt),zs=v(Tt),je=f(Tt,"DIV",{class:!0,style:!0});var Sa=h(je);for(let ge=0;ge<Q.length;ge+=1)Q[ge].l(Sa);Sa.forEach(c),Us=v(Tt),Oa(Ke.$$.fragment,Tt),Tt.forEach(c),Fs=v(C),wt=f(C,"P",{class:!0});var Da=h(wt);Dl=k(Da,Kt),Da.forEach(c),Ms=v(C),ee=f(C,"DIV",{class:!0});var Te=h(ee);We=f(Te,"DIV",{class:!0});var Ol=h(We);Wt=f(Ol,"DIV",{class:!0}),h(Wt).forEach(c),Os=v(Ol),Xt=f(Ol,"SPAN",{});var Ba=h(Xt);Bl=k(Ba,Yt),Ba.forEach(c),Ol.forEach(c),Rs=v(Te),ke=f(Te,"DIV",{class:!0});var Nt=h(ke);Zt=f(Nt,"DIV",{class:!0}),h(Zt).forEach(c),qs=v(Nt),xt=f(Nt,"DIV",{class:!0}),h(xt).forEach(c),Hs=v(Nt),$t=f(Nt,"SPAN",{});var ja=h($t);jl=k(ja,el),ja.forEach(c),Nt.forEach(c),Gs=v(Te),Xe=f(Te,"DIV",{class:!0});var Rl=h(Xe);tl=f(Rl,"DIV",{class:!0}),h(tl).forEach(c),Qs=v(Rl),ll=f(Rl,"SPAN",{});var La=h(ll);Ll=k(La,sl),La.forEach(c),Rl.forEach(c),Js=v(Te),we=f(Te,"DIV",{class:!0});var Vt=h(we);al=f(Vt,"DIV",{class:!0}),h(al).forEach(c),Ks=v(Vt),nl=f(Vt,"DIV",{class:!0}),h(nl).forEach(c),Ws=v(Vt),rl=f(Vt,"SPAN",{});var Ca=h(rl);Cl=k(Ca,ul),Ca.forEach(c),Vt.forEach(c),Xs=v(Te),Ye=f(Te,"DIV",{class:!0});var ql=h(Ye);ol=f(ql,"DIV",{class:!0}),h(ol).forEach(c),Ys=v(ql),il=f(ql,"SPAN",{});var za=h(il);zl=k(za,fl),za.forEach(c),ql.forEach(c),Te.forEach(c),Zs=v(C),Ze=f(C,"DIV",{class:!0});var Hl=h(Ze);At=f(Hl,"P",{class:!0});var Ua=h(At);Ul=k(Ua,cl),Ua.forEach(c),xs=v(Hl),ut=f(Hl,"UL",{class:!0});var Fa=h(ut);for(let ge=0;ge<J.length;ge+=1)J[ge].l(Fa);Fa.forEach(c),Hl.forEach(c),C.forEach(c),z.forEach(c),this.h()},h(){l(s,"name","description"),l(s,"content",r=w[t[14]].title_post),l(o,"property","og:description"),l(o,"content",_=w[t[14]].title_post),l(u,"property","og:title"),l(u,"content",y=w[t[14]].laoli_title),l(P,"property","og:url"),l(P,"content",m=`https://tomimi.dev/${t[14]}/laoli`),l(F,"class","text-center text-2xl font-bold mb-10"),l(R,"class","text-sky-500 hover:underline"),l(R,"href","https://www.bilibili.com/video/BV1BF411R7Bx/"),l(R,"target","_blank"),l(B,"class","text-lg font-bold"),l(de,"class","my-4"),l(Ce,"class","text-right pr-2"),l(Y,"type","number"),l(Y,"min","1"),l(Y,"max","10"),l(Y,"step","1"),l(Y,"class","svelte-i4jw25"),l(ze,"class","text-right px-2"),l(le,"type","range"),l(le,"min","1"),l(le,"max","10"),l(le,"step","1"),l(Ue,"class","text-left px-2"),l(K,"class","svelte-i4jw25"),l(Fe,"class","text-right pr-2"),l(Z,"type","number"),l(Z,"min","20"),l(Z,"max","100"),l(Z,"step","1"),l(Z,"class","svelte-i4jw25"),l(Me,"class","text-right px-2"),l(ve,"type","range"),l(ve,"min","20"),l(ve,"max","100"),l(ve,"step","5"),l(ht,"class","text-left px-2"),l(W,"class","svelte-i4jw25"),l(_t,"class","text-right pr-2"),l(Ne,"class","border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"),Ne.disabled=vl=t[5]<=0,l(ae,"class","text-center svelte-i4jw25"),l(ae,"type","number"),l(ae,"min","0"),l(ae,"max","3"),l(ae,"step","1"),l(Ve,"class","border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"),Ve.disabled=ml=t[5]>=3,l(se,"class","mb-3 svelte-i4jw25"),l(pt,"class","text-right pr-2"),l(ne,"type","number"),l(ne,"min","0"),l(ne,"max","90"),l(ne,"step","1"),l(ne,"class","svelte-i4jw25"),l(dt,"class","text-right px-2"),l(me,"type","range"),l(me,"min","0"),l(me,"max","90"),l(me,"step","5"),l(vt,"class","text-left px-2"),l(x,"class","svelte-i4jw25"),l(mt,"class","text-right pr-2"),l(re,"type","number"),l(re,"min","0"),l(re,"max","300"),l(re,"step","1"),l(re,"class","svelte-i4jw25"),l(bt,"class","text-right px-2"),l(be,"type","range"),l(be,"min","0"),l(be,"max","300"),l(be,"step","1"),l(gt,"class","text-left px-2"),l($,"class","svelte-i4jw25"),l(nt,"class","text-right pr-2"),l(Se,"class","border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"),Se.disabled=kl=t[8]<=0,l(oe,"class","text-center svelte-i4jw25"),l(oe,"type","number"),l(oe,"min","0"),l(oe,"max","14"),l(oe,"step","1"),l(De,"class","border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"),De.disabled=wl=t[8]>=18,l(ue,"class","svelte-i4jw25"),l(Be,"class","pl-[68px]"),l(rt,"class","text-right pr-2"),l(fe,"class","border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"),fe.disabled=yl=t[6]<=1,l(ce,"class","text-center svelte-i4jw25"),l(ce,"type","number"),l(ce,"min","0"),l(ce,"max","60"),l(ce,"step","1"),l(he,"class","border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"),he.disabled=Tl=t[6]>=80,l(ie,"class","grid grid-cols-[140px_auto_auto_auto] w-max"),l(Et,"class","text-right pr-2"),l(qe,"class","justify-self-start"),l(qe,"type","checkbox"),l(Re,"class","mt-3 svelte-i4jw25"),l(kt,"class","text-right pr-2"),l(Ge,"class","justify-self-start"),l(Ge,"type","checkbox"),l(He,"class","svelte-i4jw25"),l(j,"class","flex flex-col gap-y-2"),l(Qe,"class","text-lg font-bold text-center mt-3 mb-2"),l(je,"class","flex w-max"),l(je,"style",Sl=`margin-left:${t[2]*t[9]}px`),l(Ee,"class","flex flex-col overflow-auto px-1.5 md:px-0"),l(wt,"class","text-lg font-bold text-center mt-2"),l(Wt,"class","h-4 w-4 bg-[#fdfc01]"),l(We,"class","flex items-center gap-x-2"),l(Zt,"class","h-4 w-4 bg-[#f8cc47]"),l(xt,"class","h-4 w-4 bg-[#f28b00]"),l(ke,"class","flex items-center gap-x-2"),l(tl,"class","h-4 w-4 bg-[#34c2e6]"),l(Xe,"class","flex items-center gap-x-2"),l(al,"class","h-4 w-4 bg-neutral-900"),l(nl,"class","h-4 w-4 bg-gray-600"),l(we,"class","flex items-center gap-x-2"),l(ol,"class","h-4 w-4 bg-[#8d2828]"),l(Ye,"class","flex items-center gap-x-2"),l(ee,"class","flex flex-col md:flex-row md:flex-wrap justify-evenly gap-y-2.5 rounded border bg-slate-200 py-2.5 px-3 md:px-0"),l(At,"class","text-lg font-bold mt-8"),l(ut,"class","flex flex-col gap-y-2"),l(Ze,"class","pl-3 md:pl-0"),l(A,"class","max-w-7xl mx-auto py-16 md:px-4"),l(b,"class","min-w-screen min-h-screen bg-[#f2f2f2] text-[#222222]")},m(n,p){e(document.head,s),e(document.head,o),e(document.head,u),e(document.head,P),pe(n,g,p),pe(n,b,p),e(b,A),e(A,F),e(F,V),e(A,O),e(A,B),e(B,T),e(B,R),e(R,X),e(A,te),e(A,de),e(de,tt),e(de,it),e(A,St),e(A,j),e(j,K),e(K,Ce),e(Ce,ft),e(K,Dt),e(K,Y),U(Y,t[9]),e(K,Bt),e(K,ze),e(ze,jt),e(K,Lt),e(K,le),U(le,t[9]),e(K,Ct),e(K,Ue),e(Ue,zt),e(j,Ut),e(j,W),e(W,Fe),e(Fe,ct),e(W,Ft),e(W,Z),U(Z,t[1]),e(W,q),e(W,Me),e(Me,Mt),e(W,Oe),e(W,ve),U(ve,t[1]),e(W,Gl),e(W,ht),e(ht,Ql),e(j,Jl),e(j,se),e(se,_t),e(_t,dl),e(se,Kl),e(se,Ne),e(Ne,Wl),e(se,Xl),e(se,ae),U(ae,t[5]),e(se,Yl),e(se,Ve),e(Ve,Zl),e(j,xl),e(j,x),e(x,pt),e(pt,bl),e(x,$l),e(x,ne),U(ne,t[2]),e(x,es),e(x,dt),e(dt,ts),e(x,ls),e(x,me),U(me,t[2]),e(x,ss),e(x,vt),e(vt,as),e(j,ns),e(j,$),e($,mt),e(mt,gl),e($,rs),e($,re),U(re,t[0]),e($,us),e($,bt),e(bt,os),e($,is),e($,be),U(be,t[0]),e($,fs),e($,gt),e(gt,cs),e(j,hs),e(j,ue),e(ue,nt),e(nt,El),e(nt,_s),e(ue,ps),e(ue,Se),e(Se,ds),e(ue,vs),e(ue,oe),U(oe,t[8]),e(ue,ms),e(ue,De),e(De,bs),e(j,gs),e(j,Be),e(Be,Es),e(Be,Al),e(Be,ks),e(Be,Il),e(j,ws),e(j,ie),e(ie,rt),e(rt,Pl),e(rt,As),e(ie,Is),e(ie,fe),e(fe,Ps),e(ie,ys),e(ie,ce),U(ce,t[6]),e(ie,Ts),e(ie,he),e(he,Ns),e(j,Vs),e(j,Re),e(Re,Et),e(Et,Nl),e(Re,Ss),e(Re,qe),qe.checked=t[3],e(j,Ds),e(j,He),e(He,kt),e(kt,Vl),e(He,Bs),e(He,Ge),Ge.checked=t[4],e(A,js),e(A,Qe),e(Qe,Ls);for(let z=0;z<G.length;z+=1)G[z]&&G[z].m(Qe,null);e(A,Cs),e(A,Ee),Ra(Je,Ee,null),e(Ee,zs),e(Ee,je);for(let z=0;z<Q.length;z+=1)Q[z]&&Q[z].m(je,null);e(Ee,Us),Ra(Ke,Ee,null),e(A,Fs),e(A,wt),e(wt,Dl),e(A,Ms),e(A,ee),e(ee,We),e(We,Wt),e(We,Os),e(We,Xt),e(Xt,Bl),e(ee,Rs),e(ee,ke),e(ke,Zt),e(ke,qs),e(ke,xt),e(ke,Hs),e(ke,$t),e($t,jl),e(ee,Gs),e(ee,Xe),e(Xe,tl),e(Xe,Qs),e(Xe,ll),e(ll,Ll),e(ee,Js),e(ee,we),e(we,al),e(we,Ks),e(we,nl),e(we,Ws),e(we,rl),e(rl,Cl),e(ee,Xs),e(ee,Ye),e(Ye,ol),e(Ye,Ys),e(Ye,il),e(il,zl),e(A,Zs),e(A,Ze),e(Ze,At),e(At,Ul),e(Ze,xs),e(Ze,ut);for(let z=0;z<J.length;z+=1)J[z]&&J[z].m(ut,null);N=!0,$s||(ua=[S(Y,"input",t[21]),S(le,"change",t[22]),S(le,"input",t[22]),S(Z,"input",t[23]),S(ve,"change",t[24]),S(ve,"input",t[24]),S(Ne,"click",t[25]),S(ae,"input",t[26]),S(Ve,"click",t[27]),S(ne,"input",t[28]),S(me,"change",t[29]),S(me,"input",t[29]),S(re,"input",t[30]),S(be,"change",t[31]),S(be,"input",t[31]),S(Se,"click",t[32]),S(oe,"input",t[33]),S(De,"click",t[34]),S(fe,"mousedown",t[35]),S(fe,"mouseup",t[36]),S(fe,"mouseleave",t[37]),S(fe,"click",t[38]),S(ce,"input",t[39]),S(he,"mousedown",t[40]),S(he,"mouseup",t[41]),S(he,"mouseleave",t[42]),S(he,"click",t[43]),S(qe,"change",t[44]),S(Ge,"change",t[45])],$s=!0)},p(n,p){if((!N||p[0]&16384)&&a!==(a=w[n[14]].laoli_title+" / "+w[n[14]].title_post)&&(document.title=a),(!N||p[0]&16384&&r!==(r=w[n[14]].title_post))&&l(s,"content",r),(!N||p[0]&16384&&_!==(_=w[n[14]].title_post))&&l(o,"content",_),(!N||p[0]&16384&&y!==(y=w[n[14]].laoli_title))&&l(u,"content",y),(!N||p[0]&16384&&m!==(m=`https://tomimi.dev/${n[14]}/laoli`))&&l(P,"content",m),(!N||p[0]&16384)&&D!==(D=w[n[14]].laoli_title+"")&&L(V,D),(!N||p[0]&16384)&&lt!==(lt=w[n[14]].laoli_f_explain+"")&&L(it,lt),(!N||p[0]&16384)&&st!==(st=w[n[14]].laoli_zoom+"")&&L(ft,st),p[0]&512&&H(Y.value)!==n[9]&&U(Y,n[9]),p[0]&512&&U(le,n[9]),(!N||p[0]&16384)&&at!==(at=w[n[14]].laoli_rounds+"")&&L(ct,at),p[0]&2&&H(Z.value)!==n[1]&&U(Z,n[1]),p[0]&2&&U(ve,n[1]),(!N||p[0]&16384)&&Ot!==(Ot=w[n[14]].laoli_module_lvl+"")&&L(dl,Ot),(!N||p[0]&32&&vl!==(vl=n[5]<=0))&&(Ne.disabled=vl),p[0]&32&&H(ae.value)!==n[5]&&U(ae,n[5]),(!N||p[0]&32&&ml!==(ml=n[5]>=3))&&(Ve.disabled=ml),(!N||p[0]&16384)&&Rt!==(Rt=w[n[14]].laoli_talent_adjust+"")&&L(bl,Rt),p[0]&4&&H(ne.value)!==n[2]&&U(ne,n[2]),p[0]&4&&U(me,n[2]),(!N||p[0]&16384)&&qt!==(qt=w[n[14]].laoli_aspd+"")&&L(gl,qt),p[0]&1&&H(re.value)!==n[0]&&U(re,n[0]),p[0]&1&&U(be,n[0]),(!N||p[0]&16384)&&Ht!==(Ht=w[n[14]].laoli_f0+"")&&L(El,Ht),(!N||p[0]&256&&kl!==(kl=n[8]<=0))&&(Se.disabled=kl),p[0]&256&&H(oe.value)!==n[8]&&U(oe,n[8]),(!N||p[0]&256&&wl!==(wl=n[8]>=18))&&(De.disabled=wl),(!N||p[0]&8192)&&L(Al,n[13]),(!N||p[0]&64)&&L(Il,n[6]),(!N||p[0]&16384)&&Gt!==(Gt=w[n[14]].laoli_fCold+"")&&L(Pl,Gt),(!N||p[0]&64&&yl!==(yl=n[6]<=1))&&(fe.disabled=yl),p[0]&64&&H(ce.value)!==n[6]&&U(ce,n[6]),(!N||p[0]&64&&Tl!==(Tl=n[6]>=80))&&(he.disabled=Tl),(!N||p[0]&16384)&&Qt!==(Qt=w[n[14]].laoli_initial_talent_on+"")&&L(Nl,Qt),p[0]&8&&(qe.checked=n[3]),(!N||p[0]&16384)&&Jt!==(Jt=w[n[14]].laoli_doq_hp50+"")&&L(Vl,Jt),p[0]&16&&(Ge.checked=n[4]),p[0]&2048){It=n[11];let I;for(I=0;I<It.length;I+=1){const _e=xa(n,It,I);G[I]?G[I].p(_e,p):(G[I]=$a(_e),G[I].c(),G[I].m(Qe,null))}for(;I<G.length;I+=1)G[I].d(1);G.length=It.length}const z={};if(p[0]&512&&(z.resolution=n[9]),p[0]&4096&&(z.fValues=n[12]),p[0]&32&&(z.moduleLevel=n[5]),Je.$set(z),p[0]&514){Pt=Array(n[1]);let I;for(I=0;I<Pt.length;I+=1){const _e=Za(n,Pt,I);Q[I]?Q[I].p(_e,p):(Q[I]=en(_e),Q[I].c(),Q[I].m(je,null))}for(;I<Q.length;I+=1)Q[I].d(1);Q.length=Pt.length}(!N||p[0]&516&&Sl!==(Sl=`margin-left:${n[2]*n[9]}px`))&&l(je,"style",Sl);const C={};if(p[0]&512&&(C.resolution=n[9]),p[0]&4096&&(C.fValues=n[12]),p[0]&128&&(C.freezeDuration=n[7]),Ke.$set(C),(!N||p[0]&16384)&&Kt!==(Kt=w[n[14]].legend+"")&&L(Dl,Kt),(!N||p[0]&16384)&&Yt!==(Yt=w[n[14]].laoli_f0+"")&&L(Bl,Yt),(!N||p[0]&16384)&&el!==(el=w[n[14]].laoli_fCold+"")&&L(jl,el),(!N||p[0]&16384)&&sl!==(sl=w[n[14]].laoli_freeze_duration+"")&&L(Ll,sl),(!N||p[0]&16384)&&ul!==(ul=w[n[14]].laoli_talent+"")&&L(Cl,ul),(!N||p[0]&16384)&&fl!==(fl=w[n[14]].laoli_stun_duration+"")&&L(zl,fl),(!N||p[0]&16384)&&cl!==(cl=w[n[14]].laoli_credits+"")&&L(Ul,cl),p[0]&32768){yt=n[15];let I;for(I=0;I<yt.length;I+=1){const _e=Ya(n,yt,I);J[I]?J[I].p(_e,p):(J[I]=tn(_e),J[I].c(),J[I].m(ut,null))}for(;I<J.length;I+=1)J[I].d(1);J.length=yt.length}},i(n){N||(qa(Je.$$.fragment,n),qa(Ke.$$.fragment,n),N=!0)},o(n){Ha(Je.$$.fragment,n),Ha(Ke.$$.fragment,n),N=!1},d(n){c(s),c(o),c(u),c(P),n&&c(g),n&&c(b),_l(G,n),Ga(Je),_l(Q,n),Ga(Ke),_l(J,n),$s=!1,nn(ua)}}}let ln=300,sn=50;function Le(){return Math.floor(Math.random()*3)}function vn(t,a,s,r,o,_,u){const y=u===0?3:2,P=u===3?4:5;let m=o,g=a-Le(),b=s-Le(),A=s-Le(),F=[],D=!1,V=1,O=[],B=[],T=1,R=0;for(let X=1;X<t*90;X++){if(V>0&&(!D&&V===g+b?(B.push({key:"f0",value:g},{key:"f1",value:b}),R=g+b,m?D=!0:(O.push({index:0,counter:V}),B.push({key:"frz",value:r,counter:V}),D=!1,V=-r),m=!1,g=a-Le(),b=s-Le(),A=s-Le()):D&&V-R>0&&(V-R)%(b+A)===0&&(B.push({key:"f2",value:A},{key:"f1",value:b}),R+=b+A,m||(B.push({key:"frz",value:r,counter:V}),O.push({index:T,counter:V}),D=!1,V=-r,T=0,R=0),m=!1,T+=1,g=a-Le(),b=s-Le(),A=s-Le())),X-_>0&&(X-_)%90===0){const te=y+(m?0:P);F.push(te),m=!0}V+=1}return{freezeIndexes:O,costContainer:F,fValues:B}}function mn(t,a,s){let r,o,_,u,y,P,m,g,b,{data:A}=a;const F=[{name:"@Sino_P",href:"12732821"},{name:"@我长颈鹿懂了",href:"25389972"},{name:"@里雪りあ_Official",href:"1684845011"},{name:"@塔塔酱AT4",href:"42504309"},{name:"@蓝色失智魔方Eke",href:"174802196"},{name:"@阿芙朵嘉の打字机",href:"176551416"},{name:"@天降光玉",href:"475608177"},{name:"@空気力学少女丶",href:"194571734"},{name:"@巴别塔攻略组",href:"21342479"}];let D=0,V=20,O=0,B=2,T=!0,R=!1,X=3,te;function de(q){u>1&&s(10,te=setTimeout(function(){s(6,u-=1),de(Math.max(q-100,sn))},q))}function tt(q){u<80&&s(10,te=setTimeout(function(){s(6,u+=1),tt(Math.max(q-100,sn))},q))}function lt(){B=H(this.value),s(9,B)}function it(){B=H(this.value),s(9,B)}function St(){V=H(this.value),s(1,V)}function j(){V=H(this.value),s(1,V)}const K=()=>s(5,X-=1);function Ce(){X=H(this.value),s(5,X)}const st=()=>s(5,X+=1);function ft(){O=H(this.value),s(2,O)}function Dt(){O=H(this.value),s(2,O)}function Y(){D=H(this.value),s(0,D)}function Bt(){D=H(this.value),s(0,D)}const ze=()=>s(8,o-=1);function jt(){o=H(this.value),s(8,o),s(0,D)}const Lt=()=>s(8,o+=1),le=()=>de(ln),Ct=()=>clearTimeout(te),Ue=()=>clearTimeout(te),zt=()=>s(6,u-=1);function Ut(){u=H(this.value),s(6,u),s(0,D)}const W=()=>tt(ln),Fe=()=>clearTimeout(te),at=()=>clearTimeout(te),ct=()=>s(6,u+=1);function Ft(){T=this.checked,s(3,T)}function Z(){R=this.checked,s(4,R)}return t.$$set=q=>{"data"in q&&s(18,A=q.data)},t.$$.update=()=>{t.$$.dirty[0]&262144&&s(14,r=A.language),t.$$.dirty[0]&1&&s(8,o=Math.round(1/((100+D)/100)*14)),t.$$.dirty[0]&1&&s(13,_=Math.round(1/((100+D)/100)*30)),t.$$.dirty[0]&1&&s(6,u=Math.round(1/((100-30+D)/100)*30)),t.$$.dirty[0]&16&&s(7,y=R?120:60),t.$$.dirty[0]&494&&s(20,P=vn(V,o,u,y,T,O,X)),t.$$.dirty[0]&1048576&&P.freezeIndexes,t.$$.dirty[0]&1048576&&s(12,m=P.fValues),t.$$.dirty[0]&1048576&&s(19,g=P.costContainer),t.$$.dirty[0]&524288&&s(11,b=g.reduce((q,Me,Mt)=>{const Oe=Math.floor(Mt/20);return q[Oe]||(q[Oe]=0),q[Oe]=q[Oe]+Me,q},[0]))},[D,V,O,T,R,X,u,y,o,B,te,b,m,_,r,F,de,tt,A,g,P,lt,it,St,j,K,Ce,st,ft,Dt,Y,Bt,ze,jt,Lt,le,Ct,Ue,zt,Ut,W,Fe,at,ct,Ft,Z]}class kn extends aa{constructor(a){super(),na(this,a,mn,dn,ra,{data:18},null,[-1,-1])}}export{kn as component,En as universal};
