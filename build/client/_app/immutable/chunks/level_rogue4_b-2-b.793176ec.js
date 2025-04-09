const e="ro4_b_2_b",n="level_rogue4_b-2-b",t=["rogue_skz"],z=null,I=3,K=10,T=99,R=1,o="ISW-NO",l="奉献",i="友に捧げる",a="Devoted_Warrior",r=`两百年前的敌人并未如约而至。勇士的大剑腾起火焰，这火焰是为了他的朋友而点燃，这火焰不会轻易被扑灭。
<@rolv.rem>场地中有被摧毁时扣除目标生命值的<指挥终端></>`,s=`二百年前の敵は、約束通りに現れはしなかった。勇士の大剣から炎が迸る。この炎は彼の友のために燃えており、容易く鎮められるものではない。
<@rolv.rem>破壊されると耐久値が1減る<コマンドシステム>が出現</>`,c=`The enemy from two centuries ago did not appear as planned. The warrior's sword bursts aflame. It burns for his friends, a fire that refuses to extinguish.
<@rolv.rem><Command Terminals> that will deplete Life Points when destroyed are present on the field</>`,d=["年代之刺：普通1/天灾+2"],C=null,W=null,G=null,M=null,A=null,N=null,V=null,u=[{targets:["trap_008_farm"],mods:{hp:2,special:{sktok_farm:{spData:{spCost:100,initSp:0}}}}}],_=null,p=[{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:6,col:6},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:0},endPosition:{row:6,col:6},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:0},endPosition:{row:6,col:6},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:10},endPosition:{row:5,col:11},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:2,col:10},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:15,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:5,col:11},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:25,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:6,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:10},endPosition:{row:5,col:11},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:2,col:10},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:10},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:10},endPosition:{row:5,col:11},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:2,col:10},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:10},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],y=[3],f=null,m=null,w=[39],v=null,h=[{key:"trap_008_farm",alias:"trap_008_farm#1",pos:{row:2,col:3},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_008_farm",alias:"trap_008_farm#2",pos:{row:2,col:2},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_008_farm",alias:"trap_008_farm#3",pos:{row:3,col:9},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_760_skztzs",alias:"trap_760_skztzs#1",pos:{row:4,col:4},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_764_skzshp",alias:"trap_764_skzshp",pos:{row:5,col:6},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_760_skztzs",alias:"trap_760_skztzs#3",pos:{row:5,col:8},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_760_skztzs",alias:"trap_760_skztzs#2",pos:{row:1,col:8},direction:"UP",level:1,mainSkillLvl:1,hidden:!0}],k=[],x=[{id:"enemy_1071_dftman",prefabKey:"enemy_1071_dftman",level:0,min_count:20,max_count:20,elite_min_count:20,elite_max_count:20,overwrittenData:null},{id:"enemy_2064_skzwdd",prefabKey:"enemy_2064_skzwdd",level:0,min_count:8,max_count:8,elite_min_count:8,elite_max_count:8,overwrittenData:null},{id:"enemy_2075_skgly2",prefabKey:"enemy_2075_skgly2",level:0,min_count:1,max_count:1,elite_min_count:1,elite_max_count:1,overwrittenData:null},{id:"enemy_1317_wdexg",prefabKey:"enemy_1317_wdexg",level:0,min_count:10,max_count:10,elite_min_count:10,elite_max_count:10,overwrittenData:null},{id:"enemy_2065_skzjs",prefabKey:"enemy_2065_skzjs",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2067_skzcy",prefabKey:"enemy_2067_skzcy",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2091_skzgds",prefabKey:"enemy_2091_skzgds",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2070_skzfbx",prefabKey:"enemy_2070_skzfbx",level:1,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null}],D={map:[[72,73,74,75,76,77,78,79,80,81,82,83],[60,61,62,63,64,65,66,67,68,69,70,71],[48,49,50,51,52,53,54,55,56,57,58,59],[36,37,38,39,40,41,42,43,44,45,46,47],[24,25,26,27,28,29,30,31,32,33,34,35],[12,13,14,15,16,17,18,19,20,21,22,23],[0,1,2,3,4,5,6,7,8,9,10,11]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_floor",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_telout",0,0,{colorIndex:0,direction:"up",type:"arrow"},0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_fence_bound",0,1,null,1],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_floor",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_floor",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_telin",0,0,{colorIndex:0,direction:"up",type:"arrow"},0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0]]},P=[],O=null,E={groupKey:null,max_permutations:1,permutations:[{}]},b={groupKey:null,max_permutations:1,permutations:[{}]},S=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"trap_764_skzshp",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"cargo",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:15,preDelay:3,interval:15,routeIndex:1,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:5,preDelay:20,interval:18,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1317_wdexg",count:10,preDelay:60,interval:20,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2064_skzwdd",count:5,preDelay:95,interval:35,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2075_skgly2",count:1,preDelay:100,interval:1,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2064_skzwdd",count:3,preDelay:125,interval:35,routeIndex:2,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_760_skztzs#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"calamity",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_760_skztzs#3",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"calamity",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2067_skzcy",count:1,preDelay:183,interval:1,routeIndex:6,autoPreviewRoute:!0,hiddenGroup:"hidden_door",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2091_skzgds",count:1,preDelay:183,interval:1,routeIndex:6,autoPreviewRoute:!0,hiddenGroup:"hidden_window",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2070_skzfbx",count:1,preDelay:183,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:"box_1",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2070_skzfbx",count:3,preDelay:180,interval:3,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:"box_3",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]}],advancedWaveTag:null}],g=null,L={id:e,levelId:n,tags:t,category:null,characterLimit:3,initialCost:10,maxCost:99,costIncreaseTime:1,code:o,name_zh:l,name_ja:i,name_en:a,description_zh:r,description_ja:s,description_en:c,addInfo_zh:d,addInfo_ja:null,addInfo_en:null,eliteDesc_zh:null,eliteDesc_ja:null,eliteDesc_en:null,n_runes:null,elite_runes:null,n_mods:u,elite_mods:_,routes:p,floors:y,sp_terrain:f,sp_enemy:m,n_count:w,e_count:v,traps:h,token_cards:k,enemies:x,mapData:D,extra_routes:P,branches:O,NORMAL:E,ELITE:b,waves:S,bonus:g};export{b as ELITE,E as NORMAL,W as addInfo_en,C as addInfo_ja,d as addInfo_zh,g as bonus,O as branches,z as category,I as characterLimit,o as code,R as costIncreaseTime,L as default,c as description_en,s as description_ja,r as description_zh,v as e_count,A as eliteDesc_en,M as eliteDesc_ja,G as eliteDesc_zh,_ as elite_mods,V as elite_runes,x as enemies,P as extra_routes,y as floors,e as id,K as initialCost,n as levelId,D as mapData,T as maxCost,w as n_count,u as n_mods,N as n_runes,a as name_en,i as name_ja,l as name_zh,p as routes,m as sp_enemy,f as sp_terrain,t as tags,k as token_cards,h as traps,S as waves};
