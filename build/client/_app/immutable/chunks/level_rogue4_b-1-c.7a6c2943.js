const e="ro4_b_1_c",n="level_rogue4_b-1-c",t=["rogue_skz"],b=null,g=6,W=10,T=99,K=1,o="ISW-NO",l="离歌的庭院",a="別れの歌の庭",i="Courtyard_of_Farewells",r=`她也许还想再看这城市一眼——明天，歌声将响起；后天，歌声将响起；大后天，亦然。她将歌唱。
<@rolv.rem>场地中有产生食腐使徒的<汲营枯枝></>`,s=`彼女はおそらく、まだこの都市を見つめていたかったのだろう。明日も明後日も明々後日も、歌声が響き渡る。彼女が歌っているのだ。
<@rolv.rem>ナハツェーラーの使徒を産み出す<渇欲の枯枝>が出現</>`,c=`Perhaps she longs for another glimpse of the city. She will continue to sing tomorrow, the day after, and the days that follow. She will still sing.
<@rolv.rem><Twigs That Crave> that produce Rot Eaters are present on the field</>`,u=["年代之刺：普通0/天灾+1"],R=null,M=null,G=null,I=null,C=null,N=null,A=null,z=null,V=null,d=[{motionMode:"WALK",startPosition:{row:4,col:5},endPosition:{row:7,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:100,position:{row:-1,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!0},{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:7,col:1},endPosition:{row:7,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:7,col:9},endPosition:{row:7,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:7,col:9},endPosition:{row:7,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],_=[3],p=null,y=null,f=[32],m=null,w=[{key:"trap_086_larva",alias:"trap_086_larva#1",pos:{row:6,col:2},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_086_larva",alias:"trap_086_larva#2",pos:{row:6,col:3},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_086_larva",alias:"trap_086_larva#3",pos:{row:6,col:7},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_086_larva",alias:"trap_086_larva#4",pos:{row:6,col:8},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_764_skzshp",alias:"trap_764_skzshp",pos:{row:5,col:2},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_760_skztzs",alias:"trap_760_skztzs#1",pos:{row:2,col:5},direction:"UP",level:1,mainSkillLvl:1,hidden:!0}],v=[],h=[{id:"enemy_2072_skdny2",prefabKey:"enemy_2072_skdny2",level:0,min_count:1,max_count:1,elite_min_count:1,elite_max_count:1,overwrittenData:null},{id:"enemy_2073_skzrck",prefabKey:"enemy_2073_skzrck",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_1229_darmy",prefabKey:"enemy_1229_darmy",level:0,min_count:31,max_count:31,elite_min_count:31,elite_max_count:31,overwrittenData:{def:180}},{id:"enemy_1266_nhapos",prefabKey:"enemy_1266_nhapos",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2065_skzjs",prefabKey:"enemy_2065_skzjs",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2067_skzcy",prefabKey:"enemy_2067_skzcy",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2091_skzgds",prefabKey:"enemy_2091_skzgds",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2070_skzfbx",prefabKey:"enemy_2070_skzfbx",level:1,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null}],k={map:[[77,78,79,80,81,82,83,84,85,86,87],[66,67,68,69,70,71,72,73,74,75,76],[55,56,57,58,59,60,61,62,63,64,65],[44,45,46,47,48,49,50,51,52,53,54],[33,34,35,36,37,38,39,40,41,42,43],[22,23,24,25,26,27,28,29,30,31,32],[11,12,13,14,15,16,17,18,19,20,21],[0,1,2,3,4,5,6,7,8,9,10]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_floor",0,0,null,0],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_fence_bound",0,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_fence_bound",0,1,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_floor",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0]]},x=[{motionMode:"WALK",startPosition:{row:6,col:2},endPosition:{row:7,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:3},endPosition:{row:7,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:7},endPosition:{row:7,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:8},endPosition:{row:7,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],D={route1:{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1266_nhapos",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1}]}]},route2:{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1266_nhapos",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1}]}]},route3:{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1266_nhapos",count:1,preDelay:0,interval:1,routeIndex:2,autoPreviewRoute:!1}]}]},route4:{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1266_nhapos",count:1,preDelay:0,interval:1,routeIndex:3,autoPreviewRoute:!1}]}]}},P={groupKey:null,max_permutations:1,permutations:[{}]},O={groupKey:null,max_permutations:1,permutations:[{}]},E=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:150,fragments:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2072_skdny2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_764_skzshp",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:"cargo",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_760_skztzs#1",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:"calamity",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1229_darmy",count:3,preDelay:3,interval:15,routeIndex:2,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1229_darmy",count:2,preDelay:16,interval:12,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1229_darmy",count:4,preDelay:60,interval:3,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1229_darmy",count:4,preDelay:60,interval:3,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1229_darmy",count:5,preDelay:90,interval:3,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1229_darmy",count:5,preDelay:90,interval:3,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]}],advancedWaveTag:null},{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1229_darmy",count:4,preDelay:3,interval:3,routeIndex:2,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1229_darmy",count:4,preDelay:3,interval:3,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2067_skzcy",count:1,preDelay:10,interval:1,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:"hidden_door",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2091_skzgds",count:1,preDelay:10,interval:1,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:"hidden_window",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2070_skzfbx",count:1,preDelay:15,interval:1,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:"box_1",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2070_skzfbx",count:3,preDelay:15,interval:3,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:"box_3",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]}],advancedWaveTag:null}],S=null,L={id:e,levelId:n,tags:t,category:null,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:o,name_zh:l,name_ja:a,name_en:i,description_zh:r,description_ja:s,description_en:c,addInfo_zh:u,addInfo_ja:null,addInfo_en:null,eliteDesc_zh:null,eliteDesc_ja:null,eliteDesc_en:null,n_runes:null,elite_runes:null,n_mods:null,elite_mods:null,routes:d,floors:_,sp_terrain:p,sp_enemy:y,n_count:f,e_count:m,traps:w,token_cards:v,enemies:h,mapData:k,extra_routes:x,branches:D,NORMAL:P,ELITE:O,waves:E,bonus:S};export{O as ELITE,P as NORMAL,M as addInfo_en,R as addInfo_ja,u as addInfo_zh,S as bonus,D as branches,b as category,g as characterLimit,o as code,K as costIncreaseTime,L as default,c as description_en,s as description_ja,r as description_zh,m as e_count,C as eliteDesc_en,I as eliteDesc_ja,G as eliteDesc_zh,V as elite_mods,A as elite_runes,h as enemies,x as extra_routes,_ as floors,e as id,W as initialCost,n as levelId,k as mapData,T as maxCost,f as n_count,z as n_mods,N as n_runes,i as name_en,a as name_ja,l as name_zh,d as routes,y as sp_enemy,p as sp_terrain,t as tags,v as token_cards,w as traps,E as waves};
