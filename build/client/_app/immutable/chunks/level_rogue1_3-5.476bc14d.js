const e="ro1_e_3_5",o="level_rogue1_3-5",n=["rogue_phantom"],t="combat_ops",A=6,N=10,M=99,b=1,a="ISW-NO",l="斗兽笼",r="闘獣の檻",i="Beast_Fighting",u=`这里原本的用途是观看猎犬互相厮杀，但现在......
<@rolv.rem>干员部署后会立即损失一定百分比生命。</>`,p=`ここは元々、猟犬の殺し合いを鑑賞するための場所だった。だが今は……
<@rolv.rem>オペレーターが配置された直後、一定割合のHPを失う。</>`,c=`This place is originally meant for watching hounds fight each other, but now...
<@rolv.rem>Operators will lose a certain percentage of HP when they are initially deployed</>`,s=["所有友方单位部署后流失50%最大生命值"],d=["味方ユニットが配置された直後、50%のHPを失う"],y=["Allied units lose 50% HP upon deployment"],_=["所有敌方单位的攻击力+5%，生命值+30%","所有友方单位部署后流失70%最大生命值"],w=["敵全員の攻撃力+5%、最大HP+30%","配置直後のHP減少が70%に上昇"],m=["All enemy units have +5% ATK, and +30% Max HP","HP loss upon deployment increased to 70%"],C=null,B=null,V=null,f=[{targets:["ALL"],mods:{atk:1.05,hp:1.3}}],v=[{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:1},endPosition:{row:6,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_CURRENT_FRAGMENT_TIME",time:120,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:2},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:9},endPosition:{row:0,col:8},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_CURRENT_FRAGMENT_TIME",time:120,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:2},endPosition:{row:6,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_CURRENT_FRAGMENT_TIME",time:120,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:8},endPosition:{row:6,col:8},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_CURRENT_FRAGMENT_TIME",time:120,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:8},endPosition:{row:0,col:8},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_CURRENT_FRAGMENT_TIME",time:120,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:2},endPosition:{row:0,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_CURRENT_FRAGMENT_TIME",time:120,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:0},endPosition:{row:3,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:5},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:10},endPosition:{row:3,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:5},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:5},endPosition:{row:3,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:0,col:5},endPosition:{row:3,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:2,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:7,col:2},endPosition:{row:1,col:8},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:0},endPosition:{row:3,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],h=[3],g=null,P={normal:56,elite:null,fixed:!0},k=[55],G=null,x=[{key:"trap_051_vultres",alias:"trap_051_vultres#1",pos:{row:2,col:4},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_051_vultres",alias:"trap_051_vultres#2",pos:{row:4,col:6},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_051_vultres",alias:"trap_051_vultres#3",pos:{row:4,col:4},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_051_vultres",alias:"trap_051_vultres#4",pos:{row:2,col:6},direction:"UP",level:1,mainSkillLvl:1,hidden:!0}],S=[],D=[{id:"enemy_1000_gopro",prefabKey:"enemy_1000_gopro",level:0,min_count:9,max_count:9,elite_min_count:9,elite_max_count:9,overwrittenData:{hp:1e3}},{id:"enemy_1000_gopro_2",prefabKey:"enemy_1000_gopro_2",level:0,min_count:14,max_count:14,elite_min_count:14,elite_max_count:14,overwrittenData:{hp:2e3}},{id:"enemy_1000_gopro_3",prefabKey:"enemy_1000_gopro_3",level:0,min_count:25,max_count:25,elite_min_count:25,elite_max_count:25,overwrittenData:{hp:3700}},{id:"enemy_1024_mortar",prefabKey:"enemy_1024_mortar",level:0,min_count:1,max_count:1,elite_min_count:1,elite_max_count:1,overwrittenData:null},{id:"enemy_1003_ncbow_2",prefabKey:"enemy_1003_ncbow_2",level:0,min_count:4,max_count:4,elite_min_count:4,elite_max_count:4,overwrittenData:null},{id:"enemy_1033_handax_2",prefabKey:"enemy_1033_handax_2",level:0,min_count:0,max_count:2,elite_min_count:0,elite_max_count:2,overwrittenData:{hp:16e3}},{id:"enemy_1026_aghost",prefabKey:"enemy_1026_aghost",level:0,min_count:0,max_count:2,elite_min_count:0,elite_max_count:2,overwrittenData:null},{id:"enemy_2001_duckmi",prefabKey:"enemy_2001_duckmi",level:1,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2002_bearmi",prefabKey:"enemy_2002_bearmi",level:1,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null}],K={map:[[66,67,68,69,70,71,72,73,74,75,76],[55,56,57,58,59,60,61,62,63,64,65],[44,45,46,47,48,49,50,51,52,53,54],[33,34,35,36,37,38,39,40,41,42,43],[22,23,24,25,26,27,28,29,30,31,32],[11,12,13,14,15,16,17,18,19,20,21],[0,1,2,3,4,5,6,7,8,9,10]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_end",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0]]},E=[],W=null,T={groupKey:null,max_permutations:8,permutations:[{w0f1:{g1:0},w0f6:{g1:0,g2:0}},{w0f1:{g1:0},w0f6:{g1:0,g2:1}},{w0f1:{g1:0},w0f6:{g1:1,g2:0}},{w0f1:{g1:0},w0f6:{g1:1,g2:1}},{w0f1:{g1:1},w0f6:{g1:0,g2:0}},{w0f1:{g1:1},w0f6:{g1:0,g2:1}},{w0f1:{g1:1},w0f6:{g1:1,g2:0}},{w0f1:{g1:1},w0f6:{g1:1,g2:1}}]},R={groupKey:null,max_permutations:8,permutations:[{w0f1:{g1:0},w0f6:{g1:0,g2:0}},{w0f1:{g1:0},w0f6:{g1:0,g2:1}},{w0f1:{g1:0},w0f6:{g1:1,g2:0}},{w0f1:{g1:0},w0f6:{g1:1,g2:1}},{w0f1:{g1:1},w0f6:{g1:0,g2:0}},{w0f1:{g1:1},w0f6:{g1:0,g2:1}},{w0f1:{g1:1},w0f6:{g1:1,g2:0}},{w0f1:{g1:1},w0f6:{g1:1,g2:1}}]},I=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:70,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:70,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#3",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#4",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1024_mortar",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1024_mortar",count:1,preDelay:0,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1003_ncbow_2",count:1,preDelay:0,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1003_ncbow_2",count:1,preDelay:0,interval:1,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1003_ncbow_2",count:1,preDelay:0,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1003_ncbow_2",count:1,preDelay:0,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:5,actions:[{actionType:"SPAWN",key:"enemy_1000_gopro",count:1,preDelay:3,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro",count:1,preDelay:8,interval:1,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro",count:1,preDelay:12,interval:1,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1000_gopro",count:1,preDelay:3,interval:1,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro",count:1,preDelay:10,interval:1,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro",count:1,preDelay:18,interval:1,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro",count:1,preDelay:3,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro",count:1,preDelay:12,interval:1,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro",count:1,preDelay:20,interval:1,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:1,preDelay:3,interval:1,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:2,preDelay:10,interval:10,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:1,preDelay:3,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:2,preDelay:10,interval:10,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:2,preDelay:22,interval:10,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:1,preDelay:3,interval:1,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:3,preDelay:10,interval:9,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:1,preDelay:3,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:3,preDelay:10,interval:9,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:1,preDelay:3,interval:1,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:3,preDelay:10,interval:9,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:3,preDelay:10,interval:9,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:1,preDelay:3,interval:1,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:4,preDelay:10,interval:9,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:1,preDelay:3,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:4,preDelay:10,interval:9,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1033_handax_2",count:1,preDelay:3,interval:1,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1026_aghost",count:1,preDelay:3,interval:1,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1033_handax_2",count:1,preDelay:20,interval:1,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1026_aghost",count:1,preDelay:20,interval:1,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_3",count:4,preDelay:10,interval:9,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"",count:1,preDelay:0,interval:1,routeIndex:11,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:90,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2001_duckmi",count:1,preDelay:20,interval:1,routeIndex:12,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2002_bearmi",count:1,preDelay:20,interval:1,routeIndex:12,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1}]}],advancedWaveTag:null}],O={type:"fragment",wave_index:0,frag_index:7},L={id:e,levelId:o,tags:n,category:t,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:a,name_zh:l,name_ja:r,name_en:i,description_zh:u,description_ja:p,description_en:c,addInfo_zh:s,addInfo_ja:d,addInfo_en:y,eliteDesc_zh:_,eliteDesc_ja:w,eliteDesc_en:m,n_runes:null,elite_runes:null,n_mods:null,elite_mods:f,routes:v,floors:h,sp_terrain:g,sp_enemy:P,n_count:k,e_count:G,traps:x,token_cards:S,enemies:D,mapData:K,extra_routes:E,branches:W,NORMAL:T,ELITE:R,waves:I,bonus:O};export{R as ELITE,T as NORMAL,y as addInfo_en,d as addInfo_ja,s as addInfo_zh,O as bonus,W as branches,t as category,A as characterLimit,a as code,b as costIncreaseTime,L as default,c as description_en,p as description_ja,u as description_zh,G as e_count,m as eliteDesc_en,w as eliteDesc_ja,_ as eliteDesc_zh,f as elite_mods,B as elite_runes,D as enemies,E as extra_routes,h as floors,e as id,N as initialCost,o as levelId,K as mapData,M as maxCost,k as n_count,V as n_mods,C as n_runes,i as name_en,r as name_ja,l as name_zh,v as routes,P as sp_enemy,g as sp_terrain,n as tags,S as token_cards,x as traps,I as waves};
