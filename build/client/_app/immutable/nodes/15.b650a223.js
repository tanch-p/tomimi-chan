import{s as ot,u as rt,S as it,a as ct,E as ft,p as ut}from"../chunks/StageHeader.91015f8c.js";import{S as ie,i as ce,s as fe,k as p,a as S,q as J,l as v,m as w,c as P,r as Q,h,K as ke,n as c,b as R,H as d,O as re,u as W,I as se,J as he,M as ue,y as Z,z as ee,A as te,g as q,v as De,f as Ie,d as G,B as le,w as dt,V as gt,W as _t,X as ht,Q as lt,T as be,U as $e,G as mt}from"../chunks/index.fef03e7a.js";import{k as Ve,w as pe}from"../chunks/singletons.1f0531de.js";import{F as pt,E as vt}from"../chunks/FooterBar.e3cba1ee.js";import{t as K}from"../chunks/translations.484a5201.js";import{c as bt}from"../chunks/favicon.fcbdcad2.js";import{r as we,c as $t,b as wt,e as Et}from"../chunks/roman_numerals.c2362db7.js";import{s as kt}from"../chunks/is_stages_list.563af226.js";const yt=async({params:a})=>{const e=a.lang,{mapConfig:l,enemies:t}=await ot(a.name,"rogue_phantom");return{mapConfig:l,enemies:t,language:e}},al=Object.freeze(Object.defineProperty({__proto__:null,load:yt},Symbol.toStringTag,{value:"Module"})),at=pe([]),st=pe(null),Ae=pe(null),me=pe(1),oe=pe([]),nt=Ve([at,Ae,st,oe],([a,e,l,t])=>rt(a.map(s=>s.effects),e?[e.effects]:[e],[l],t.map(s=>s.effects))),Dt=Ve(nt,a=>a.statMods),It=Ve(nt,a=>a.specialMods),Ce=[{id:"rogue_1_relic_c01",name_zh:"乌萨斯弯刀",name_ja:"ウルサスの曲刀",name_en:"Ursus Chachek",img:"乌萨斯弯刀",effects:[{targets:["ALL"],mods:{hp:1.4,atk:1.4,def:1.4}}],tooltip_zh:"所有敌方单位的攻击力、防御力、生命+40%",tooltip_ja:"敵全員の攻撃力、防御力、最大HP+40%",tooltip_en:"All enemy units have +40% ATK, DEF, and Max HP"},{id:"rogue_1_relic_c02",name_zh:"维多利亚王冠",name_ja:"ヴィクトリアのクラウン",name_en:"Victoria Crown",img:"维多利亚王冠",effects:[{targets:["ALL"],mods:{hp:1.3,atk:1.3,def:1.3}},{targets:["PHCS_BOSS"],mods:{hp:1.3,atk:1.15,def:1.15}}],tooltip_zh:"所有敌方单位的攻击力、防御力、生命+30%，且所有领袖单位还会攻击力、防御力+15%，生命+30%",tooltip_ja:"敵全員の攻撃力、防御力、最大HP+30%。BOSS敵の攻撃力、防御力がさらに15%上昇、最大HPがさらに30%上昇",tooltip_en:"All enemy units have +30% ATK, DEF, and Max HP; Boss units gain an additional +15% ATK, +15% DEF, and +30% Max HP"},{id:"rogue_1_relic_c03",name_zh:"莱塔尼亚权杖",name_ja:"リターニアの王笏",name_en:"Leithanien Sceptre",img:"莱塔尼亚权杖",effects:[{targets:["ALL"],mods:{hp:1.3,atk:1.3,def:1.3}}],tooltip_zh:"所有敌方单位的攻击力、防御力、生命+30%，且每进入一个新节点后，失去1目标生命（最多降至1）",tooltip_ja:"敵全員の攻撃力、防御力、最大HP+30%。新たなスポットに入る度に、耐久値-1（最大残り1まで減少）",tooltip_en:"All enemy units have +30% ATK, DEF, and Max HP; Entering a new node decreases Life Point by 1 (cannot be reduced beneath 1 this way)"},{id:"rogue_1_relic_c04",name_zh:"高卢长袍",name_ja:"ガリアのローブ",name_en:"Gaul Mantle",img:"高卢长袍",effects:[{targets:["ALL"],mods:{hp:1.25,atk:1.25,def:1.25}}],tooltip_zh:"所有敌方单位的攻击力、防御力、生命+25%，且招募4星及以上干员时希望消耗+1",tooltip_ja:"敵全員の攻撃力、防御力、最大HP+25%。★4以上のオペレーターを招集する際に消費する希望+1",tooltip_en:"All enemy units have +25% ATK, DEF, and Max HP; 4-star and above Operators cost +1 Hope when recruited"},{id:"rogue_1_relic_c05",name_zh:"半洗孤钻",name_ja:"緋滲む貴石",name_en:"Half-Refined Diamond",img:"半洗孤钻",effects:[{targets:["ALL"],mods:{hp:1.25,atk:1.25,def:1.25}}],tooltip_zh:"所有敌方单位的攻击力、防御力、生命+25%，且战斗获得的指挥经验-50%",tooltip_ja:"敵全員の攻撃力、防御力、最大HP+25%。指揮経験値の獲得量-50%",tooltip_en:"All enemy units have +25% ATK, DEF, and Max HP; Gain -50% Command EXP from battles"},{id:"rogue_1_relic_c06",name_zh:"酒神的印记",name_ja:"酒神のシンボル",name_en:"Sigil of Tragodia",img:"酒神的印记",effects:[{targets:["ALL"],mods:{hp:1.3,atk:1.3,def:1.3}}],tooltip_zh:"所有敌方单位的攻击力、防御力、生命+30%，且可同时部署人数-2",tooltip_ja:"敵全員の攻撃力、防御力、最大HP+30%。同時配置可能人数-2",tooltip_en:"All enemy units have +30% ATK, DEF, and Max HP; Deployment Limit -2"}];function Vt(a){let e,l,t,s,i,r,o,n,f,g,E,u,I,b;return{c(){e=p("div"),l=p("img"),s=S(),i=p("div"),r=p("p"),o=J(a[2]),f=S(),g=p("p"),E=J(a[1]),this.h()},l(m){e=v(m,"DIV",{class:!0});var z=w(e);l=v(z,"IMG",{src:!0,alt:!0,loading:!0,decoding:!0,class:!0}),s=P(z),i=v(z,"DIV",{class:!0});var A=w(i);r=v(A,"P",{class:!0});var j=w(r);o=Q(j,a[2]),j.forEach(h),f=P(A),g=v(A,"P",{class:!0});var M=w(g);E=Q(M,a[1]),M.forEach(h),A.forEach(h),z.forEach(h),this.h()},h(){ke(l.src,t=a[3])||c(l,"src",t),c(l,"alt",a[2]),c(l,"loading","lazy"),c(l,"decoding","async"),c(l,"class","relic"),c(r,"class",n=`relic text-lg sm:text-xl ${a[0]?"text-[#cea658]":"text-gray-400"}`),c(g,"class","relic text-[#c4c4c4]"),c(i,"class","relic px-2"),c(e,"class",u=`relic grid grid-cols-[75px_auto] sm:grid-cols-[95px_auto] gap-x-2 ${a[0]?"bg-neutral-800":"hover:bg-neutral-700"}`)},m(m,z){R(m,e,z),d(e,l),d(e,s),d(e,i),d(i,r),d(r,o),d(i,f),d(i,g),d(g,E),I||(b=re(e,"click",a[4]),I=!0)},p(m,[z]){z&4&&c(l,"alt",m[2]),z&4&&W(o,m[2]),z&1&&n!==(n=`relic text-lg sm:text-xl ${m[0]?"text-[#cea658]":"text-gray-400"}`)&&c(r,"class",n),z&2&&W(E,m[1]),z&1&&u!==(u=`relic grid grid-cols-[75px_auto] sm:grid-cols-[95px_auto] gap-x-2 ${m[0]?"bg-neutral-800":"hover:bg-neutral-700"}`)&&c(e,"class",u)},i:se,o:se,d(m){m&&h(e),I=!1,b()}}}function At(a,e,l){let t,s,{relic:i,language:r,rogueTopic:o,selectedUniqueRelic:n}=e;const f=`https://res.cloudinary.com/dbqz7mebk/image/upload/c_fit,w_100/v1681056192/tomimi.dev/relics/${i.img}.webp`;let g=!1;n.subscribe(u=>{u?l(0,g=u.id===i.id):l(0,g=!1)});function E(){g?n.set(null):n.set(i)}return a.$$set=u=>{"relic"in u&&l(5,i=u.relic),"language"in u&&l(6,r=u.language),"rogueTopic"in u&&l(7,o=u.rogueTopic),"selectedUniqueRelic"in u&&l(8,n=u.selectedUniqueRelic)},a.$$.update=()=>{a.$$.dirty&96&&l(2,t=i[`name_${r}`]||i.name_zh),a.$$.dirty&96&&l(1,s=i[`tooltip_${r}`]||i.tooltip_zh)},[g,s,t,f,E,i,r,o,n]}class jt extends ie{constructor(e){super(),ce(this,e,At,Vt,fe,{relic:5,language:6,rogueTopic:7,selectedUniqueRelic:8})}}const Fe=[{id:"variation_6",outerName_zh:"敏感的",innerName_zh:"敏感",outerName_ja:"敏感な",innerName_ja:"敏感",outerName_en:"Sensitive",innerName_en:"Sensitive",src:null,effects:[{targets:["ALL"],mods:{lifepoint:2}}],tooltip_zh:"在本层失去和获取的目标生命都增加一倍。",tooltip_ja:"このエリアでは耐久値の獲得数および喪失数が2倍になる。",tooltip_en:"On this floor, the amount of Life Points lost and gained are doubled."},{id:"variation_7",outerName_zh:"臆想的",innerName_zh:"臆想",outerName_ja:"恐怖の",innerName_ja:"恐怖",outerName_en:"Imagined",innerName_en:"Imagined",src:null,effects:[{targets:["ALL"],mods:{hp:1.1,atk:1.1,def:1.1}}],tooltip_zh:"本层中所有敌方单位的攻击力、防御力、生命+10%。",tooltip_ja:"このエリアでは敵全員の攻撃力、防御力、最大HP+10%。",tooltip_en:"On this floor, all enemy units have +10% ATK, DEF, and Max HP."},{id:"variation_8",outerName_zh:"生存的",innerName_zh:"生存",outerName_ja:"死力の",innerName_ja:"死力",outerName_en:"Survivalist",innerName_en:"Survivalist",src:null,effects:[{targets:["NOT_PHCS_BOSS"],mods:{atk:1.5,fixed_aspd:50,special:{survivalist:{type:"others",value:100,tooltip:{en:["$Survivalist$ - Receive 100 True Damage/s"],ja:["$死力$→毎秒100確定ダメージを受ける"],zh:["$生存$→每秒受到100真实伤害"]}}}}}],tooltip_zh:"本层中所有我方单位和非领袖敌人每秒分别受到50和100真实伤害，但攻击力+50%，攻击速度+50。",tooltip_ja:"このエリアでは味方全員と非BOSS敵が毎秒それぞれ50と100確定ダメージを受け、攻撃力+50%、攻撃速度+50",tooltip_en:"On this floor, friendly units and non-Boss enemy units will take 50/100 True damage respectively every second but receive +50% ATK, and +50 ASPD."}];function St(a){let e,l,t=a[0][`innerName_${a[1]}`]+"",s,i,r,o,n,f=a[0][`tooltip_${a[1]}`]+"",g,E,u,I;return{c(){e=p("div"),l=p("p"),s=J(t),r=S(),o=p("div"),n=p("p"),g=J(f),this.h()},l(b){e=v(b,"DIV",{class:!0});var m=w(e);l=v(m,"P",{class:!0});var z=w(l);s=Q(z,t),z.forEach(h),r=P(m),o=v(m,"DIV",{class:!0});var A=w(o);n=v(A,"P",{});var j=w(n);g=Q(j,f),j.forEach(h),A.forEach(h),m.forEach(h),this.h()},h(){c(l,"class",i=`text-center ${a[2]?"text-red-400 font-semibold":""}`),c(o,"class","flex flex-col"),c(e,"class",E=`grid ${a[1]==="en"?"grid-cols-[110px_auto]":"grid-cols-[100px_auto]"} hover:cursor-pointer items-center py-1 ${a[2]?"bg-neutral-700":"hover:bg-neutral-700"}`)},m(b,m){R(b,e,m),d(e,l),d(l,s),d(e,r),d(e,o),d(o,n),d(n,g),u||(I=re(e,"click",a[3]),u=!0)},p(b,[m]){m&3&&t!==(t=b[0][`innerName_${b[1]}`]+"")&&W(s,t),m&4&&i!==(i=`text-center ${b[2]?"text-red-400 font-semibold":""}`)&&c(l,"class",i),m&3&&f!==(f=b[0][`tooltip_${b[1]}`]+"")&&W(g,f),m&6&&E!==(E=`grid ${b[1]==="en"?"grid-cols-[110px_auto]":"grid-cols-[100px_auto]"} hover:cursor-pointer items-center py-1 ${b[2]?"bg-neutral-700":"hover:bg-neutral-700"}`)&&c(e,"class",E)},i:se,o:se,d(b){b&&h(e),u=!1,I()}}}function Pt(a,e,l){let t;he(a,oe,n=>l(4,t=n));let{effect:s,language:i}=e,r=!1;oe.subscribe(n=>{l(2,r=!!n.find(f=>f.id===s.id))});function o(){t.find(n=>n.id===s.id)?oe.update(n=>n=n.filter(f=>f.id!==s.id)):oe.update(n=>n.length===2?n=[n[1],s]:n=[...n,s])}return a.$$set=n=>{"effect"in n&&l(0,s=n.effect),"language"in n&&l(1,i=n.language)},[s,i,r,o]}class zt extends ie{constructor(e){super(),ce(this,e,Pt,St,fe,{effect:0,language:1})}}function Oe(a,e,l){const t=a.slice();return t[4]=e[l],t[6]=l,t}function He(a){let e,l=a[6]+1+"",t,s,i,r,o;function n(){return a[3](a[6])}return{c(){e=p("button"),t=J(l),s=S(),this.h()},l(f){e=v(f,"BUTTON",{class:!0,type:!0});var g=w(e);t=Q(g,l),s=P(g),g.forEach(h),this.h()},h(){c(e,"class",i=`py-2 px-2 ${a[0]===a[6]+1?"bg-gray-500":""}`),c(e,"type","button")},m(f,g){R(f,e,g),d(e,t),d(e,s),r||(o=re(e,"click",n),r=!0)},p(f,g){a=f,g&1&&i!==(i=`py-2 px-2 ${a[0]===a[6]+1?"bg-gray-500":""}`)&&c(e,"class",i)},d(f){f&&h(e),r=!1,o()}}}function Mt(a){let e,l,t=a[1],s=[];for(let i=0;i<t.length;i+=1)s[i]=He(Oe(a,t,i));return{c(){e=p("div"),l=p("div");for(let i=0;i<s.length;i+=1)s[i].c();this.h()},l(i){e=v(i,"DIV",{class:!0});var r=w(e);l=v(r,"DIV",{class:!0});var o=w(l);for(let n=0;n<s.length;n+=1)s[n].l(o);o.forEach(h),r.forEach(h),this.h()},h(){c(l,"class","grid grid-cols-6 "),c(e,"class","w-[70%] mx-auto py-3 mt-4")},m(i,r){R(i,e,r),d(e,l);for(let o=0;o<s.length;o+=1)s[o]&&s[o].m(l,null)},p(i,[r]){if(r&1){t=i[1];let o;for(o=0;o<t.length;o+=1){const n=Oe(i,t,o);s[o]?s[o].p(n,r):(s[o]=He(n),s[o].c(),s[o].m(l,null))}for(;o<s.length;o+=1)s[o].d(1);s.length=t.length}},i:se,o:se,d(i){i&&h(e),ue(s,i)}}}function Tt(a,e,l){let t;he(a,me,o=>l(0,t=o));let{language:s}=e,i=new Array(6);const r=o=>me.set(o+1);return a.$$set=o=>{"language"in o&&l(2,s=o.language)},[t,i,s,r]}class Nt extends ie{constructor(e){super(),ce(this,e,Tt,Mt,fe,{language:2})}}function Le(a,e,l){const t=a.slice();return t[2]=e[l],t}function Be(a){let e,l;return e=new zt({props:{effect:a[2],language:a[1]}}),{c(){Z(e.$$.fragment)},l(t){ee(e.$$.fragment,t)},m(t,s){te(e,t,s),l=!0},p(t,s){const i={};s&2&&(i.language=t[1]),e.$set(i)},i(t){l||(q(e.$$.fragment,t),l=!0)},o(t){G(e.$$.fragment,t),l=!1},d(t){le(e,t)}}}function Ct(a){let e,l,t,s,i,r,o,n,f=K[a[1]].phantom_variation_title+"",g,E,u,I,b=K[a[1]].variation_max_2+"",m,z,A,j,M,H;l=new Nt({props:{language:a[1]}});let C=Fe,k=[];for(let V=0;V<C.length;V+=1)k[V]=Be(Le(a,C,V));const Y=V=>G(k[V],1,1,()=>{k[V]=null});return{c(){e=p("div"),Z(l.$$.fragment),t=S(),s=p("div"),i=p("hr"),r=S(),o=p("div"),n=p("p"),g=J(f),E=S(),u=p("p"),I=J("("),m=J(b),z=J(")"),A=S(),j=p("div");for(let V=0;V<k.length;V+=1)k[V].c();this.h()},l(V){e=v(V,"DIV",{class:!0});var $=w(e);ee(l.$$.fragment,$),t=P($),s=v($,"DIV",{class:!0});var y=w(s);i=v(y,"HR",{class:!0}),r=P(y),o=v(y,"DIV",{class:!0});var _=w(o);n=v(_,"P",{class:!0});var D=w(n);g=Q(D,f),D.forEach(h),E=P(_),u=v(_,"P",{class:!0});var F=w(u);I=Q(F,"("),m=Q(F,b),z=Q(F,")"),F.forEach(h),A=P(_),j=v(_,"DIV",{class:!0});var T=w(j);for(let B=0;B<k.length;B+=1)k[B].l(T);T.forEach(h),_.forEach(h),y.forEach(h),$.forEach(h),this.h()},h(){c(i,"class","border-neutral-600"),c(n,"class","mt-4 font-medium text-lg text-red-400 text-center"),c(u,"class","font-normal text-sm text-near-white text-center"),c(j,"class","flex flex-col gap-y-4 mt-3"),c(o,"class","pr-2 md:px-0"),c(s,"class","mx-auto mt-3 md:px-8"),c(e,"class",M=`absolute left-[50%] -translate-x-[50%] mt-2 w-screen md:w-[700px] pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${a[0]?"opacity-90 translate-y-0":"invisible opacity-0 -translate-y-10"}`)},m(V,$){R(V,e,$),te(l,e,null),d(e,t),d(e,s),d(s,i),d(s,r),d(s,o),d(o,n),d(n,g),d(o,E),d(o,u),d(u,I),d(u,m),d(u,z),d(o,A),d(o,j);for(let y=0;y<k.length;y+=1)k[y]&&k[y].m(j,null);H=!0},p(V,[$]){const y={};if($&2&&(y.language=V[1]),l.$set(y),(!H||$&2)&&f!==(f=K[V[1]].phantom_variation_title+"")&&W(g,f),(!H||$&2)&&b!==(b=K[V[1]].variation_max_2+"")&&W(m,b),$&2){C=Fe;let _;for(_=0;_<C.length;_+=1){const D=Le(V,C,_);k[_]?(k[_].p(D,$),q(k[_],1)):(k[_]=Be(D),k[_].c(),q(k[_],1),k[_].m(j,null))}for(De(),_=C.length;_<k.length;_+=1)Y(_);Ie()}(!H||$&1&&M!==(M=`absolute left-[50%] -translate-x-[50%] mt-2 w-screen md:w-[700px] pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${V[0]?"opacity-90 translate-y-0":"invisible opacity-0 -translate-y-10"}`))&&c(e,"class",M)},i(V){if(!H){q(l.$$.fragment,V);for(let $=0;$<C.length;$+=1)q(k[$]);H=!0}},o(V){G(l.$$.fragment,V),k=k.filter(Boolean);for(let $=0;$<k.length;$+=1)G(k[$]);H=!1},d(V){V&&h(e),le(l),ue(k,V)}}}function Ft(a,e,l){let{optionsOpen:t,language:s}=e;return a.$$set=i=>{"optionsOpen"in i&&l(0,t=i.optionsOpen),"language"in i&&l(1,s=i.language)},[t,s]}class Ot extends ie{constructor(e){super(),ce(this,e,Ft,Ct,fe,{optionsOpen:0,language:1})}}function qe(a,e,l){const t=a.slice();return t[9]=e[l],t}function Re(a){let e,l=a[3],t=[];for(let s=0;s<l.length;s+=1)t[s]=Ke(qe(a,l,s));return{c(){e=p("div");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=v(s,"DIV",{class:!0});var i=w(e);for(let r=0;r<t.length;r+=1)t[r].l(i);i.forEach(h),this.h()},h(){c(e,"class","flex gap-x-2.5 my-0.5 justify-center")},m(s,i){R(s,e,i);for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(e,null)},p(s,i){if(i&9){l=s[3];let r;for(r=0;r<l.length;r+=1){const o=qe(s,l,r);t[r]?t[r].p(o,i):(t[r]=Ke(o),t[r].c(),t[r].m(e,null))}for(;r<t.length;r+=1)t[r].d(1);t.length=l.length}},d(s){s&&h(e),ue(t,s)}}}function Ke(a){let e,l,t=a[9][`outerName_${a[0]}`]+"",s,i;return{c(){e=p("div"),l=p("p"),s=J(t),i=S(),this.h()},l(r){e=v(r,"DIV",{class:!0});var o=w(e);l=v(o,"P",{class:!0});var n=w(l);s=Q(n,t),n.forEach(h),i=P(o),o.forEach(h),this.h()},h(){c(l,"class","text-center"),c(e,"class","relative rounded-full bg-[#640c1c] w-20 h-6 overflow-hidden")},m(r,o){R(r,e,o),d(e,l),d(l,s),d(e,i)},p(r,o){o&9&&t!==(t=r[9][`outerName_${r[0]}`]+"")&&W(s,t)},d(r){r&&h(e)}}}function Ht(a){let e,l,t,s,i,r,o=we[a[2]-1]+"",n,f,g,E,u,I,b=K[a[0]].phcs_levels[a[2]-1]+"",m,z,A,j,M,H,C,k=a[3].length>0&&Re(a);function Y($){a[6]($)}let V={language:a[0]};return a[1]!==void 0&&(V.optionsOpen=a[1]),A=new Ot({props:V}),dt.push(()=>gt(A,"optionsOpen",Y)),{c(){e=p("div"),l=p("button"),t=p("div"),s=p("div"),i=S(),r=p("p"),n=J(o),f=S(),g=p("div"),E=S(),k&&k.c(),u=S(),I=p("p"),m=J(b),z=S(),Z(A.$$.fragment),this.h()},l($){e=v($,"DIV",{class:!0});var y=w(e);l=v(y,"BUTTON",{id:!0});var _=w(l);t=v(_,"DIV",{class:!0});var D=w(t);s=v(D,"DIV",{class:!0}),w(s).forEach(h),i=P(D),r=v(D,"P",{class:!0});var F=w(r);n=Q(F,o),F.forEach(h),f=P(D),g=v(D,"DIV",{class:!0}),w(g).forEach(h),D.forEach(h),E=P(_),k&&k.l(_),u=P(_),I=v(_,"P",{class:!0});var T=w(I);m=Q(T,b),T.forEach(h),_.forEach(h),z=P(y),ee(A.$$.fragment,y),y.forEach(h),this.h()},h(){c(s,"class","md:block border-y border-neutral-600 w-[80px] md:w-[104px]"),c(r,"class","text-center text-neutral-300"),c(g,"class","md:block border-y border-neutral-600 w-[80px] md:w-[104px]"),c(t,"class","flex justify-center items-center gap-x-6 md:gap-x-8"),c(I,"class","text-center"),c(l,"id","floor-options"),c(e,"class","mx-auto select-none")},m($,y){R($,e,y),d(e,l),d(l,t),d(t,s),d(t,i),d(t,r),d(r,n),d(t,f),d(t,g),d(l,E),k&&k.m(l,null),d(l,u),d(l,I),d(I,m),d(e,z),te(A,e,null),M=!0,H||(C=[re(l,"click",a[5]),_t(bt.call(null,e)),re(e,"outclick",a[7])],H=!0)},p($,[y]){(!M||y&4)&&o!==(o=we[$[2]-1]+"")&&W(n,o),$[3].length>0?k?k.p($,y):(k=Re($),k.c(),k.m(l,u)):k&&(k.d(1),k=null),(!M||y&5)&&b!==(b=K[$[0]].phcs_levels[$[2]-1]+"")&&W(m,b);const _={};y&1&&(_.language=$[0]),!j&&y&2&&(j=!0,_.optionsOpen=$[1],ht(()=>j=!1)),A.$set(_)},i($){M||(q(A.$$.fragment,$),M=!0)},o($){G(A.$$.fragment,$),M=!1},d($){$&&h(e),k&&k.d(),le(A),H=!1,lt(C)}}}function Lt(a,e,l){let t,s;he(a,me,u=>l(2,t=u)),he(a,oe,u=>l(3,s=u));let{stageFloors:i,language:r}=e,o=!1;function n(u){u.includes(t)||(me.set(Math.min(...i)),oe.set([]))}const f=()=>l(1,o=!o);function g(u){o=u,l(1,o)}const E=()=>l(1,o=!1);return a.$$set=u=>{"stageFloors"in u&&l(4,i=u.stageFloors),"language"in u&&l(0,r=u.language)},a.$$.update=()=>{a.$$.dirty&16&&n(i)},[r,o,t,s,i,f,g,E]}class Bt extends ie{constructor(e){super(),ce(this,e,Lt,Ht,fe,{stageFloors:4,language:0})}}function Ue(a,e,l){const t=a.slice();return t[12]=e[l],t}function Ge(a,e,l){const t=a.slice();return t[12]=e[l],t}function xe(a,e,l){const t=a.slice();return t[12]=e[l],t}function Xe(a){let e,l,t=a[12][`name_${a[0]}`].replaceAll("_"," ")+"",s,i,r,o;return{c(){e=p("a"),l=p("div"),s=J(t),r=S(),this.h()},l(n){e=v(n,"A",{href:!0});var f=w(e);l=v(f,"DIV",{class:!0});var g=w(l);s=Q(g,t),g.forEach(h),r=P(f),f.forEach(h),this.h()},h(){c(l,"class",i=`hover:text-sky-400 py-1.5 px-1 hover:cursor-pointer text-center ${a[5][a[0]]}`),c(e,"href",o=`/${a[0]}/stages/${a[12].code+"_"+a[12][`name_${a[0]}`]}`)},m(n,f){R(n,e,f),d(e,l),d(l,s),d(e,r)},p(n,f){f&5&&t!==(t=n[12][`name_${n[0]}`].replaceAll("_"," ")+"")&&W(s,t),f&1&&i!==(i=`hover:text-sky-400 py-1.5 px-1 hover:cursor-pointer text-center ${n[5][n[0]]}`)&&c(l,"class",i),f&5&&o!==(o=`/${n[0]}/stages/${n[12].code+"_"+n[12][`name_${n[0]}`]}`)&&c(e,"href",o)},d(n){n&&h(e)}}}function Je(a){let e,l,t,s,i,r,o,n=a[4],f=[];for(let g=0;g<n.length;g+=1)f[g]=Qe(Ge(a,n,g));return{c(){e=p("div"),l=p("div"),t=p("img"),r=S(),o=p("div");for(let g=0;g<f.length;g+=1)f[g].c();this.h()},l(g){e=v(g,"DIV",{class:!0});var E=w(e);l=v(E,"DIV",{class:!0});var u=w(l);t=v(u,"IMG",{alt:!0,src:!0,decoding:!0,width:!0,loading:!0}),u.forEach(h),r=P(E),o=v(E,"DIV",{class:!0});var I=w(o);for(let b=0;b<f.length;b+=1)f[b].l(I);I.forEach(h),E.forEach(h),this.h()},h(){c(t,"alt",s=K[a[0]].boss_ops),ke(t.src,i=wt)||c(t,"src",i),c(t,"decoding","async"),c(t,"width","100px"),c(t,"loading","lazy"),c(l,"class","md:h-[68px] pt-4 md:pt-0 flex items-center"),c(o,"class","flex flex-wrap items-center justify-center mb-1"),c(e,"class","flex flex-col md:grid items-center shadow-lg md:grid-cols-[100px_490px]")},m(g,E){R(g,e,E),d(e,l),d(l,t),d(e,r),d(e,o);for(let u=0;u<f.length;u+=1)f[u]&&f[u].m(o,null)},p(g,E){if(E&1&&s!==(s=K[g[0]].boss_ops)&&c(t,"alt",s),E&49){n=g[4];let u;for(u=0;u<n.length;u+=1){const I=Ge(g,n,u);f[u]?f[u].p(I,E):(f[u]=Qe(I),f[u].c(),f[u].m(o,null))}for(;u<f.length;u+=1)f[u].d(1);f.length=n.length}},d(g){g&&h(e),ue(f,g)}}}function Qe(a){let e,l,t=a[12][`name_${a[0]}`].replaceAll("_"," ")+"",s,i,r,o;return{c(){e=p("a"),l=p("div"),s=J(t),r=S(),this.h()},l(n){e=v(n,"A",{href:!0});var f=w(e);l=v(f,"DIV",{class:!0});var g=w(l);s=Q(g,t),g.forEach(h),r=P(f),f.forEach(h),this.h()},h(){c(l,"class",i=`hover:text-sky-400 py-1.5 px-1 hover:cursor-pointer text-center ${a[5][a[0]]}`),c(e,"href",o=`/${a[0]}/stages/${a[12].code+"_"+a[12][`name_${a[0]}`]}`)},m(n,f){R(n,e,f),d(e,l),d(l,s),d(e,r)},p(n,f){f&17&&t!==(t=n[12][`name_${n[0]}`].replaceAll("_"," ")+"")&&W(s,t),f&1&&i!==(i=`hover:text-sky-400 py-1.5 px-1 hover:cursor-pointer text-center ${n[5][n[0]]}`)&&c(l,"class",i),f&17&&o!==(o=`/${n[0]}/stages/${n[12].code+"_"+n[12][`name_${n[0]}`]}`)&&c(e,"href",o)},d(n){n&&h(e)}}}function We(a){let e,l,t,s,i,r,o,n=a[3],f=[];for(let g=0;g<n.length;g+=1)f[g]=Ye(Ue(a,n,g));return{c(){e=p("div"),l=p("div"),t=p("img"),r=S(),o=p("div");for(let g=0;g<f.length;g+=1)f[g].c();this.h()},l(g){e=v(g,"DIV",{class:!0});var E=w(e);l=v(E,"DIV",{class:!0});var u=w(l);t=v(u,"IMG",{alt:!0,src:!0,decoding:!0,loading:!0}),u.forEach(h),r=P(E),o=v(E,"DIV",{class:!0});var I=w(o);for(let b=0;b<f.length;b+=1)f[b].l(I);I.forEach(h),E.forEach(h),this.h()},h(){c(t,"alt",s=K[a[0]].encounter),ke(t.src,i=Et)||c(t,"src",i),c(t,"decoding","async"),c(t,"loading","lazy"),c(l,"class","md:h-[68px] pt-4 md:pt-0 flex items-center"),c(o,"class","flex flex-wrap items-center justify-center mb-1"),c(e,"class","flex flex-col md:grid items-center shadow-lg md:grid-cols-[100px_490px]")},m(g,E){R(g,e,E),d(e,l),d(l,t),d(e,r),d(e,o);for(let u=0;u<f.length;u+=1)f[u]&&f[u].m(o,null)},p(g,E){if(E&1&&s!==(s=K[g[0]].encounter)&&c(t,"alt",s),E&41){n=g[3];let u;for(u=0;u<n.length;u+=1){const I=Ue(g,n,u);f[u]?f[u].p(I,E):(f[u]=Ye(I),f[u].c(),f[u].m(o,null))}for(;u<f.length;u+=1)f[u].d(1);f.length=n.length}},d(g){g&&h(e),ue(f,g)}}}function Ye(a){let e,l,t=a[12][`name_${a[0]}`].replaceAll("_"," ")+"",s,i,r,o;return{c(){e=p("a"),l=p("div"),s=J(t),r=S(),this.h()},l(n){e=v(n,"A",{href:!0});var f=w(e);l=v(f,"DIV",{class:!0});var g=w(l);s=Q(g,t),g.forEach(h),r=P(f),f.forEach(h),this.h()},h(){c(l,"class",i=`hover:text-sky-400 py-1.5 px-1 hover:cursor-pointer text-center ${a[5][a[0]]}`),c(e,"href",o=`/${a[0]}/stages/${a[12].code+"_"+a[12][`name_${a[0]}`]}`)},m(n,f){R(n,e,f),d(e,l),d(l,s),d(e,r)},p(n,f){f&9&&t!==(t=n[12][`name_${n[0]}`].replaceAll("_"," ")+"")&&W(s,t),f&1&&i!==(i=`hover:text-sky-400 py-1.5 px-1 hover:cursor-pointer text-center ${n[5][n[0]]}`)&&c(l,"class",i),f&9&&o!==(o=`/${n[0]}/stages/${n[12].code+"_"+n[12][`name_${n[0]}`]}`)&&c(e,"href",o)},d(n){n&&h(e)}}}function qt(a){let e,l,t,s,i,r,o,n=we[a[1]-1]+"",f,g,E,u,I,b,m,z,A,j,M,H,C,k,Y,V,$,y,_,D,F,T,B,ae,ne,je,de=a[2],U=[];for(let N=0;N<de.length;N+=1)U[N]=Xe(xe(a,de,N));let x=a[4].length>0&&Je(a),X=a[3].length>0&&We(a);return{c(){e=p("div"),l=p("div"),t=S(),s=p("div"),i=p("div"),r=S(),o=p("p"),f=J(n),g=S(),E=p("div"),u=S(),I=p("div"),b=be("svg"),m=be("path"),A=S(),j=p("div"),M=p("div"),H=p("div"),C=p("img"),V=S(),$=p("div");for(let N=0;N<U.length;N+=1)U[N].c();y=S(),x&&x.c(),_=S(),X&&X.c(),D=S(),F=p("div"),T=be("svg"),B=be("path"),this.h()},l(N){e=v(N,"DIV",{class:!0});var O=w(e);l=v(O,"DIV",{}),w(l).forEach(h),t=P(O),s=v(O,"DIV",{class:!0});var L=w(s);i=v(L,"DIV",{}),w(i).forEach(h),r=P(L),o=v(L,"P",{class:!0});var _e=w(o);f=Q(_e,n),_e.forEach(h),L.forEach(h),g=P(O),E=v(O,"DIV",{}),w(E).forEach(h),u=P(O),I=v(O,"DIV",{class:!0});var Se=w(I);b=$e(Se,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0,stroke:!0,"stroke-width":!0});var Pe=w(b);m=$e(Pe,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,d:!0}),w(m).forEach(h),Pe.forEach(h),Se.forEach(h),A=P(O),j=v(O,"DIV",{class:!0});var ge=w(j);M=v(ge,"DIV",{class:!0});var ve=w(M);H=v(ve,"DIV",{class:!0});var ze=w(H);C=v(ze,"IMG",{alt:!0,src:!0,decoding:!0,loading:!0}),ze.forEach(h),V=P(ve),$=v(ve,"DIV",{class:!0});var Me=w($);for(let ye=0;ye<U.length;ye+=1)U[ye].l(Me);Me.forEach(h),ve.forEach(h),y=P(ge),x&&x.l(ge),_=P(ge),X&&X.l(ge),ge.forEach(h),D=P(O),F=v(O,"DIV",{class:!0});var Te=w(F);T=$e(Te,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0,stroke:!0,"stroke-width":!0});var Ne=w(T);B=$e(Ne,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,d:!0}),w(B).forEach(h),Ne.forEach(h),Te.forEach(h),O.forEach(h),this.h()},h(){c(o,"class","text-center text-lg font-medium shadow-lg mb-1 "),c(s,"class","md:grid grid-cols-[100px_auto]"),c(m,"stroke-linecap","round"),c(m,"stroke-linejoin","round"),c(m,"d","M15 19l-7-7 7-7"),c(b,"xmlns","http://www.w3.org/2000/svg"),c(b,"class","h-6 w-6"),c(b,"fill","none"),c(b,"viewBox","0 0 24 24"),c(b,"stroke","currentColor"),c(b,"stroke-width","2"),c(I,"class",z=`${a[1]===1?"brightness-50":"hover:cursor-pointer hover:bg-neutral-700"} w-[35px] h-full flex items-center justify-center shadow-lg`),c(C,"alt",k=K[a[0]].combat_ops),ke(C.src,Y=$t)||c(C,"src",Y),c(C,"decoding","async"),c(C,"loading","lazy"),c(H,"class","md:h-[68px] pt-2 md:pt-0 flex items-center"),c($,"class","flex flex-wrap md:flex-wrap-reverse justify-center items-center mb-1"),c(M,"class","flex flex-col md:grid items-center shadow-lg md:grid-cols-[100px_490px]"),c(j,"class","grid auto-rows-auto"),c(B,"stroke-linecap","round"),c(B,"stroke-linejoin","round"),c(B,"d","M15 19l-7-7 7-7"),c(T,"xmlns","http://www.w3.org/2000/svg"),c(T,"class","h-6 w-6 rotate-180"),c(T,"fill","none"),c(T,"viewBox","0 0 24 24"),c(T,"stroke","currentColor"),c(T,"stroke-width","2"),c(F,"class",ae=`${a[1]===6?"brightness-50":"hover:cursor-pointer hover:bg-neutral-700"} w-[35px] h-full flex items-center justify-center shadow-lg`),c(e,"class","grid grid-cols-[35px_auto_35px] items-center w-[100vw] md:w-max md:-translate-x-[55px] mt-16 mx-auto select-none shadow-lg ")},m(N,O){R(N,e,O),d(e,l),d(e,t),d(e,s),d(s,i),d(s,r),d(s,o),d(o,f),d(e,g),d(e,E),d(e,u),d(e,I),d(I,b),d(b,m),d(e,A),d(e,j),d(j,M),d(M,H),d(H,C),d(M,V),d(M,$);for(let L=0;L<U.length;L+=1)U[L]&&U[L].m($,null);d(j,y),x&&x.m(j,null),d(j,_),X&&X.m(j,null),d(e,D),d(e,F),d(F,T),d(T,B),ne||(je=[re(I,"click",a[6]),re(F,"click",a[7])],ne=!0)},p(N,[O]){if(O&2&&n!==(n=we[N[1]-1]+"")&&W(f,n),O&2&&z!==(z=`${N[1]===1?"brightness-50":"hover:cursor-pointer hover:bg-neutral-700"} w-[35px] h-full flex items-center justify-center shadow-lg`)&&c(I,"class",z),O&1&&k!==(k=K[N[0]].combat_ops)&&c(C,"alt",k),O&37){de=N[2];let L;for(L=0;L<de.length;L+=1){const _e=xe(N,de,L);U[L]?U[L].p(_e,O):(U[L]=Xe(_e),U[L].c(),U[L].m($,null))}for(;L<U.length;L+=1)U[L].d(1);U.length=de.length}N[4].length>0?x?x.p(N,O):(x=Je(N),x.c(),x.m(j,_)):x&&(x.d(1),x=null),N[3].length>0?X?X.p(N,O):(X=We(N),X.c(),X.m(j,null)):X&&(X.d(1),X=null),O&2&&ae!==(ae=`${N[1]===6?"brightness-50":"hover:cursor-pointer hover:bg-neutral-700"} w-[35px] h-full flex items-center justify-center shadow-lg`)&&c(F,"class",ae)},i:se,o:se,d(N){N&&h(e),ue(U,N),x&&x.d(),X&&X.d(),ne=!1,lt(je)}}}function Rt(a,e,l){let t,s,i,{language:r}=e,o=1;me.subscribe(m=>l(1,o=m));const n=kt.filter(m=>m.tags.includes("rogue_phantom")),f=n.filter(m=>m.category==="combat_ops"),g=n.filter(m=>m.category==="encounter"),E=n.filter(m=>m.category==="boss"),u={ja:"py-2 w-[120px]",en:"text-sm w-[100px] py-1",zh:"whitespace-nowrap py-2 w-[120px]"},I=()=>{o>1&&l(1,o=o-1)},b=()=>{o<6&&l(1,o=o+1)};return a.$$set=m=>{"language"in m&&l(0,r=m.language)},a.$$.update=()=>{a.$$.dirty&2&&l(2,t=f.filter(m=>m.floors.includes(o))),a.$$.dirty&2&&l(3,s=g.filter(m=>m.floors.includes(o))),a.$$.dirty&2&&l(4,i=E.filter(m=>m.floors.includes(o))),a.$$.dirty&14&&o===2&&(l(3,s=[...s,...t.filter(m=>m.floors.includes(1))]),l(2,t=t.filter(m=>!m.floors.includes(1))))},[r,o,t,s,i,u,I,b]}class Kt extends ie{constructor(e){super(),ce(this,e,Rt,qt,fe,{language:0})}}function Ze(a,e,l){const t=a.slice();return t[5]=e[l],t}function Ut(a){let e,l;return e=new Bt({props:{slot:"floorTitle",stageFloors:a[0].mapConfig.floors,language:a[1]}}),{c(){Z(e.$$.fragment)},l(t){ee(e.$$.fragment,t)},m(t,s){te(e,t,s),l=!0},p(t,s){const i={};s&1&&(i.stageFloors=t[0].mapConfig.floors),s&2&&(i.language=t[1]),e.$set(i)},i(t){l||(q(e.$$.fragment,t),l=!0)},o(t){G(e.$$.fragment,t),l=!1},d(t){le(e,t)}}}function et(a){let e,l;return e=new vt({props:{mapEliteMods:a[0].mapConfig.elite_mods,eliteMods:st,rogueTopic:Ee}}),{c(){Z(e.$$.fragment)},l(t){ee(e.$$.fragment,t)},m(t,s){te(e,t,s),l=!0},p(t,s){const i={};s&1&&(i.mapEliteMods=t[0].mapConfig.elite_mods),e.$set(i)},i(t){l||(q(e.$$.fragment,t),l=!0)},o(t){G(e.$$.fragment,t),l=!1},d(t){le(e,t)}}}function tt(a){let e,l;return e=new jt({props:{relic:a[5],language:a[1],rogueTopic:Ee,selectedUniqueRelic:Ae}}),{c(){Z(e.$$.fragment)},l(t){ee(e.$$.fragment,t)},m(t,s){te(e,t,s),l=!0},p(t,s){const i={};s&2&&(i.language=t[1]),e.$set(i)},i(t){l||(q(e.$$.fragment,t),l=!0)},o(t){G(e.$$.fragment,t),l=!1},d(t){le(e,t)}}}function Gt(a){let e,l,t=Ce,s=[];for(let r=0;r<t.length;r+=1)s[r]=tt(Ze(a,t,r));const i=r=>G(s[r],1,1,()=>{s[r]=null});return{c(){e=p("div");for(let r=0;r<s.length;r+=1)s[r].c();this.h()},l(r){e=v(r,"DIV",{slot:!0,class:!0});var o=w(e);for(let n=0;n<s.length;n+=1)s[n].l(o);o.forEach(h),this.h()},h(){c(e,"slot","uniqueRelics"),c(e,"class","grid lg:grid-cols-3 gap-x-10 gap-y-8 w-full overflow-x-auto md:overflow-visible my-auto mx-auto px-4 sm:px-24 mt-10")},m(r,o){R(r,e,o);for(let n=0;n<s.length;n+=1)s[n]&&s[n].m(e,null);l=!0},p(r,o){if(o&2){t=Ce;let n;for(n=0;n<t.length;n+=1){const f=Ze(r,t,n);s[n]?(s[n].p(f,o),q(s[n],1)):(s[n]=tt(f),s[n].c(),q(s[n],1),s[n].m(e,null))}for(De(),n=t.length;n<s.length;n+=1)i(n);Ie()}},i(r){if(!l){for(let o=0;o<t.length;o+=1)q(s[o]);l=!0}},o(r){s=s.filter(Boolean);for(let o=0;o<s.length;o+=1)G(s[o]);l=!1},d(r){r&&h(e),ue(s,r)}}}function xt(a){let e,l,t,s,i,r,o,n,f,g,E,u,I,b,m,z,A,j,M,H,C,k,Y,V,$;document.title=e=a[0].mapConfig.code+`\r
		`+a[2].replaceAll("_"," ")+" / "+K[a[1]].title_post,E=new it({props:{language:a[1],$$slots:{floorTitle:[Ut]},$$scope:{ctx:a}}}),m=new ct({props:{mapConfig:a[0].mapConfig,language:a[1],stageName:a[2],rogueTopic:Ee}});let y=a[0].mapConfig.elite_mods&&et(a);return M=new ft({props:{enemies:a[3],language:a[1],specialMods:It}}),k=new Kt({props:{language:a[1]}}),V=new pt({props:{language:a[1],rogueTopic:Ee,selectedRelics:at,selectedUniqueRelic:Ae,$$slots:{uniqueRelics:[Gt]},$$scope:{ctx:a}}}),{c(){l=p("meta"),s=p("meta"),r=p("meta"),n=p("meta"),g=S(),Z(E.$$.fragment),u=S(),I=p("main"),b=p("div"),Z(m.$$.fragment),z=S(),A=p("div"),y&&y.c(),j=S(),Z(M.$$.fragment),H=S(),C=p("div"),Z(k.$$.fragment),Y=S(),Z(V.$$.fragment),this.h()},l(_){const D=mt("svelte-ckxk2f",document.head);l=v(D,"META",{name:!0,content:!0}),s=v(D,"META",{property:!0,content:!0}),r=v(D,"META",{property:!0,content:!0}),n=v(D,"META",{property:!0,content:!0}),D.forEach(h),g=P(_),ee(E.$$.fragment,_),u=P(_),I=v(_,"MAIN",{class:!0});var F=w(I);b=v(F,"DIV",{class:!0});var T=w(b);ee(m.$$.fragment,T),z=P(T),A=v(T,"DIV",{class:!0});var B=w(A);y&&y.l(B),j=P(B),ee(M.$$.fragment,B),B.forEach(h),H=P(T),C=v(T,"DIV",{class:!0});var ae=w(C);ee(k.$$.fragment,ae),ae.forEach(h),T.forEach(h),F.forEach(h),Y=P(_),ee(V.$$.fragment,_),this.h()},h(){c(l,"name","description"),c(l,"content",t=K[a[1]].title_post),c(s,"property","og:description"),c(s,"content",i=K[a[1]].title_post),c(r,"property","og:title"),c(r,"content",o=a[0].mapConfig.code+"_"+a[2]),c(n,"property","og:url"),c(n,"content",f=`https://tomimi.dev/${a[1]}/stages/${a[0].mapConfig.code+"_"+a[2]}`),c(A,"class","mt-8"),c(C,"class","mt-4"),c(b,"class","w-screen sm:w-full max-w-7xl mx-auto"),c(I,"class","bg-neutral-800 text-near-white pb-32 pt-8 sm:pt-16 md:pb-28")},m(_,D){d(document.head,l),d(document.head,s),d(document.head,r),d(document.head,n),R(_,g,D),te(E,_,D),R(_,u,D),R(_,I,D),d(I,b),te(m,b,null),d(b,z),d(b,A),y&&y.m(A,null),d(A,j),te(M,A,null),d(b,H),d(b,C),te(k,C,null),R(_,Y,D),te(V,_,D),$=!0},p(_,[D]){(!$||D&7)&&e!==(e=_[0].mapConfig.code+`\r
		`+_[2].replaceAll("_"," ")+" / "+K[_[1]].title_post)&&(document.title=e),(!$||D&2&&t!==(t=K[_[1]].title_post))&&c(l,"content",t),(!$||D&2&&i!==(i=K[_[1]].title_post))&&c(s,"content",i),(!$||D&5&&o!==(o=_[0].mapConfig.code+"_"+_[2]))&&c(r,"content",o),(!$||D&7&&f!==(f=`https://tomimi.dev/${_[1]}/stages/${_[0].mapConfig.code+"_"+_[2]}`))&&c(n,"content",f);const F={};D&2&&(F.language=_[1]),D&259&&(F.$$scope={dirty:D,ctx:_}),E.$set(F);const T={};D&1&&(T.mapConfig=_[0].mapConfig),D&2&&(T.language=_[1]),D&4&&(T.stageName=_[2]),m.$set(T),_[0].mapConfig.elite_mods?y?(y.p(_,D),D&1&&q(y,1)):(y=et(_),y.c(),q(y,1),y.m(A,j)):y&&(De(),G(y,1,1,()=>{y=null}),Ie());const B={};D&8&&(B.enemies=_[3]),D&2&&(B.language=_[1]),M.$set(B);const ae={};D&2&&(ae.language=_[1]),k.$set(ae);const ne={};D&2&&(ne.language=_[1]),D&258&&(ne.$$scope={dirty:D,ctx:_}),V.$set(ne)},i(_){$||(q(E.$$.fragment,_),q(m.$$.fragment,_),q(y),q(M.$$.fragment,_),q(k.$$.fragment,_),q(V.$$.fragment,_),$=!0)},o(_){G(E.$$.fragment,_),G(m.$$.fragment,_),G(y),G(M.$$.fragment,_),G(k.$$.fragment,_),G(V.$$.fragment,_),$=!1},d(_){h(l),h(s),h(r),h(n),_&&h(g),le(E,_),_&&h(u),_&&h(I),le(m),y&&y.d(),le(M),le(k),_&&h(Y),le(V,_)}}}const Ee="rogue_phantom";function Xt(a,e,l){let t,s,i,r;he(a,Dt,n=>l(4,r=n));let{data:o}=e;return a.$$set=n=>{"data"in n&&l(0,o=n.data)},a.$$.update=()=>{a.$$.dirty&1&&l(1,t=o.language),a.$$.dirty&17&&l(3,s=ut(o.enemies,r)),a.$$.dirty&3&&l(2,i=o.mapConfig[`name_${t}`]||o.mapConfig.name_zh)},[o,t,i,s,r]}class sl extends ie{constructor(e){super(),ce(this,e,Xt,xt,fe,{data:0})}}export{sl as component,al as universal};
