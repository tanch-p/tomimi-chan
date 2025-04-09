const e="ro1_e_5_3",n="level_rogue1_5-3",o=["rogue_phantom"],l="combat_ops",E=6,R=10,A=99,N=1,a="ISW-NO",t="仪式之夜",r="儀式の夜",i="The_Night_of_Ritual",u="神秘的仪式经由红月将为这些萨卡兹带来无与伦比的力量，在仪式进行到最后一刻时，你打翻了祭坛上的蜡烛。",d="サルカズたちが赤い月より比類なき力を得るために、神秘的な儀式を執り行っている。しかし儀式が終わる直前に、あなたは祭壇の蝋燭をひっくり返した。",p="The mysterious ceremony has given these Sarkaz soldiers unprecedented strength by harnessing the red moon's power. At the very last moment of the ceremony, you knock over a candle on the altar.",b=null,O=null,B=null,s=["所有敌方单位的攻击力+20%，生命值+40%"],c=["敵全員の攻撃力+20%、最大HP+40%"],y=["All enemy units have +20% ATK and +40% Max HP"],C=null,M=null,L=null,_=[{targets:["ALL"],mods:{atk:1.2,hp:1.4}}],m=[{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:5},endPosition:{row:1,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:5},endPosition:{row:4,col:10},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:7},endPosition:{row:1,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:3},endPosition:{row:4,col:10},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:4,col:10},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:10},endPosition:{row:1,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:10},endPosition:{row:1,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:2,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:4,col:10},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:4,col:10},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:9},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],w=[5],v=null,f={normal:47,elite:null,fixed:!0},k=[46],h=null,P=[{key:"trap_051_vultres",alias:"trap_051_vultres#1",pos:{row:4,col:6},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_051_vultres",alias:"trap_051_vultres#2",pos:{row:5,col:4},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_051_vultres",alias:"trap_051_vultres#3",pos:{row:2,col:5},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_051_vultres",alias:"trap_051_vultres#4",pos:{row:1,col:7},direction:"UP",level:1,mainSkillLvl:1,hidden:!0}],S=[],G=[{id:"enemy_1071_dftman",prefabKey:"enemy_1071_dftman",level:0,min_count:23,max_count:23,elite_min_count:23,elite_max_count:23,overwrittenData:{hp:3500}},{id:"enemy_1071_dftman_2",prefabKey:"enemy_1071_dftman_2",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_1010_demon",prefabKey:"enemy_1010_demon",level:0,min_count:12,max_count:12,elite_min_count:12,elite_max_count:12,overwrittenData:{hp:15e3,atk:670}},{id:"enemy_1074_dbskar",prefabKey:"enemy_1074_dbskar",level:0,min_count:3,max_count:3,elite_min_count:3,elite_max_count:3,overwrittenData:{talentBlackboard:[{key:"sarkaz_standby",standby:130}]}},{id:"enemy_1075_dmgswd",prefabKey:"enemy_1075_dmgswd",level:0,min_count:6,max_count:6,elite_min_count:6,elite_max_count:6,overwrittenData:{hp:12e3,talentBlackboard:[]}},{id:"enemy_1022_dmage",prefabKey:"enemy_1022_dmage",level:0,min_count:2,max_count:2,elite_min_count:2,elite_max_count:2,overwrittenData:null},{id:"enemy_2001_duckmi",prefabKey:"enemy_2001_duckmi",level:2,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2002_bearmi",prefabKey:"enemy_2002_bearmi",level:2,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null}],g={map:[[66,67,68,69,70,71,72,73,74,75,76],[55,56,57,58,59,60,61,62,63,64,65],[44,45,46,47,48,49,50,51,52,53,54],[33,34,35,36,37,38,39,40,41,42,43],[22,23,24,25,26,27,28,29,30,31,32],[11,12,13,14,15,16,17,18,19,20,21],[0,1,2,3,4,5,6,7,8,9,10]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_end",0,0,null,0],["tile_start",0,0,null,0],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0]]},D=[],x=null,K={groupKey:null,max_permutations:2,permutations:[{w0f1:{g1:0}},{w0f1:{g1:1}}]},W={groupKey:null,max_permutations:2,permutations:[{w0f1:{g1:0}},{w0f1:{g1:1}}]},T=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:70,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:70,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#3",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#4",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"DISPLAY_ENEMY_INFO",key:"enemy_1074_dbskar",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1074_dbskar",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1074_dbskar",count:1,preDelay:0,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1074_dbskar",count:1,preDelay:0,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1074_dbskar",count:1,preDelay:0,interval:1,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1}]},{preDelay:3,actions:[{actionType:"SPAWN",key:"enemy_1071_dftman",count:1,preDelay:3,interval:1,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:1,preDelay:13,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:2,preDelay:23,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1071_dftman",count:1,preDelay:3,interval:1,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:1,preDelay:8,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:3,preDelay:18,interval:13,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:3,preDelay:19,interval:13,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:35,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1071_dftman",count:4,preDelay:3,interval:12,routeIndex:6,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:2,preDelay:18,interval:12,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:35,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:5,preDelay:3,interval:9,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:2,preDelay:14,interval:20,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:16,actions:[{actionType:"SPAWN",key:"enemy_1075_dmgswd",count:1,preDelay:3,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:5,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:20,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1075_dmgswd",count:1,preDelay:21,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:33,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1022_dmage",count:1,preDelay:45,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1075_dmgswd",count:1,preDelay:46,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:47,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1075_dmgswd",count:1,preDelay:3,interval:1,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:5,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:20,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1075_dmgswd",count:1,preDelay:21,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:33,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1022_dmage",count:1,preDelay:45,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1075_dmgswd",count:1,preDelay:46,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:47,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:90,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2001_duckmi",count:1,preDelay:28,interval:1,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2002_bearmi",count:1,preDelay:28,interval:1,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1}]}],advancedWaveTag:null}],I={type:"fragment",wave_index:0,frag_index:6},V={id:e,levelId:n,tags:o,category:l,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:a,name_zh:t,name_ja:r,name_en:i,description_zh:u,description_ja:d,description_en:p,addInfo_zh:null,addInfo_ja:null,addInfo_en:null,eliteDesc_zh:s,eliteDesc_ja:c,eliteDesc_en:y,n_runes:null,elite_runes:null,n_mods:null,elite_mods:_,routes:m,floors:w,sp_terrain:v,sp_enemy:f,n_count:k,e_count:h,traps:P,token_cards:S,enemies:G,mapData:g,extra_routes:D,branches:x,NORMAL:K,ELITE:W,waves:T,bonus:I};export{W as ELITE,K as NORMAL,B as addInfo_en,O as addInfo_ja,b as addInfo_zh,I as bonus,x as branches,l as category,E as characterLimit,a as code,N as costIncreaseTime,V as default,p as description_en,d as description_ja,u as description_zh,h as e_count,y as eliteDesc_en,c as eliteDesc_ja,s as eliteDesc_zh,_ as elite_mods,M as elite_runes,G as enemies,D as extra_routes,w as floors,e as id,R as initialCost,n as levelId,g as mapData,A as maxCost,k as n_count,L as n_mods,C as n_runes,i as name_en,r as name_ja,t as name_zh,m as routes,f as sp_enemy,v as sp_terrain,o as tags,S as token_cards,P as traps,T as waves};
