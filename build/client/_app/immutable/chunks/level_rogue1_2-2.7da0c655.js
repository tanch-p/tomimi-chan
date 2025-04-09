const e="ro1_e_2_2",n="level_rogue1_2-2",o=["rogue_phantom"],t="combat_ops",W=6,I=10,R=99,T=1,a="ISW-NO",l="巡逻队",r="巡視隊",i="Patrol_Squad",u="一队雇佣兵正在庭院中巡视。猎犬嗅到陌生人的气味，顿时嚎叫起来，整支队伍迅速向你靠近。",c="傭兵隊が庭を巡回警備している。猟犬が見知らぬ者の匂いを嗅ぎつけ、激しく吠え出した。傭兵たちは素早くあなたに近づいて来る。",p="A team of mercenaries are patrolling in the courtyard. Their hounds pick up the scent of strangers and start barking immediately, sending the entire squad your way.",N=null,b=null,M=null,s=["所有敌方单位的攻击力，防御力+30%，生命值+60%","所有提亚卡乌勇士和寻仇者的攻击力额外再提升100%"],w=["敵全員の攻撃力、防御力+30%、最大HP+60%","&lt;リベンジャー&gt;と&lt;ティアカウ勇士&gt;の攻撃力がさらに40%上昇"],f=["All enemy units have +30% ATK, +30% DEF, and +60% Max HP","All &lt;Avenger&gt; and &lt;Tiacauh Brave&gt; additionally gain +40% ATK"],B=null,C=null,V=null,d=[{targets:["ALL"],mods:{atk:1.3,def:1.3,hp:1.6}},{targets:["T11","14"],mods:{atk:1.4}}],y=[{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:1},endPosition:{row:4,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:45,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:3,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:4,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:3,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:4,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:20,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:3,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:4,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:3,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:4,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:3,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],g=[2],_=null,m={normal:35,elite:null,fixed:!1},h=[33,34],v=null,P=[{key:"trap_051_vultres",alias:"trap_051_vultres#1",pos:{row:2,col:4},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_051_vultres",alias:"trap_051_vultres#2",pos:{row:1,col:7},direction:"UP",level:1,mainSkillLvl:1,hidden:!0}],k=[],S=[{id:"enemy_1025_reveng",prefabKey:"enemy_1025_reveng",level:0,min_count:0,max_count:4,elite_min_count:0,elite_max_count:4,overwrittenData:{hp:12e3,atk:400,talentBlackboard:[{key:"avenger",atk:{multiplier:1.5,type:"initial"}}]}},{id:"enemy_1098_cchmpn",prefabKey:"enemy_1098_cchmpn",level:0,min_count:0,max_count:4,elite_min_count:0,elite_max_count:4,overwrittenData:null},{id:"enemy_1002_nsabr",prefabKey:"enemy_1002_nsabr",level:1,min_count:14,max_count:14,elite_min_count:14,elite_max_count:14,overwrittenData:{hp:2550,atk:250}},{id:"enemy_1000_gopro_2",prefabKey:"enemy_1000_gopro_2",level:0,min_count:8,max_count:8,elite_min_count:8,elite_max_count:8,overwrittenData:null},{id:"enemy_1015_litamr",prefabKey:"enemy_1015_litamr",level:0,min_count:8,max_count:8,elite_min_count:8,elite_max_count:8,overwrittenData:null},{id:"enemy_2001_duckmi",prefabKey:"enemy_2001_duckmi",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2002_bearmi",prefabKey:"enemy_2002_bearmi",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null}],D={map:[[45,46,47,48,49,50,51,52,53],[36,37,38,39,40,41,42,43,44],[27,28,29,30,31,32,33,34,35],[18,19,20,21,22,23,24,25,26],[9,10,11,12,13,14,15,16,17],[0,1,2,3,4,5,6,7,8]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_telin",0,0,{colorIndex:0,direction:"right",type:"arrow"},0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_telout",0,0,{colorIndex:0,direction:"right",type:"arrow"},0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0]]},x=[],G=null,O={groupKey:null,max_permutations:24,permutations:[{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:0,g1:0}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:0,g1:1}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:1,g1:0}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:1,g1:1}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:2,g1:0}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:2,g1:1}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:0,g1:0}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:0,g1:1}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:1,g1:0}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:1,g1:1}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:2,g1:0}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:2,g1:1}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:0,g1:0}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:0,g1:1}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:1,g1:0}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:1,g1:1}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:2,g1:0}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:2,g1:1}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:0,g1:0}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:0,g1:1}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:1,g1:0}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:1,g1:1}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:2,g1:0}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:2,g1:1}}]},K={groupKey:null,max_permutations:24,permutations:[{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:0,g1:0}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:0,g1:1}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:1,g1:0}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:1,g1:1}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:2,g1:0}},{w0f1:{g1:0},w0f3:{g1:0},w0f4:{g2:2,g1:1}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:0,g1:0}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:0,g1:1}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:1,g1:0}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:1,g1:1}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:2,g1:0}},{w0f1:{g1:0},w0f3:{g1:1},w0f4:{g2:2,g1:1}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:0,g1:0}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:0,g1:1}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:1,g1:0}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:1,g1:1}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:2,g1:0}},{w0f1:{g1:1},w0f3:{g1:0},w0f4:{g2:2,g1:1}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:0,g1:0}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:0,g1:1}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:1,g1:0}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:1,g1:1}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:2,g1:0}},{w0f1:{g1:1},w0f3:{g1:1},w0f4:{g2:2,g1:1}}]},A=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:70,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:70,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"PREVIEW_CURSOR",key:"enemy_1025_reveng",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1025_reveng",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1098_cchmpn",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1002_nsabr",count:1,preDelay:3,interval:1,routeIndex:2,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1002_nsabr",count:2,preDelay:12,interval:3,routeIndex:2,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1015_litamr",count:1,preDelay:23,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:2,preDelay:31,interval:4,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1002_nsabr",count:1,preDelay:38,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1002_nsabr",count:1,preDelay:33,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:2,preDelay:6,interval:3,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1015_litamr",count:2,preDelay:13,interval:5,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1002_nsabr",count:2,preDelay:25,interval:5,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1015_litamr",count:2,preDelay:35,interval:6,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:2,preDelay:38,interval:4,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1098_cchmpn",count:1,preDelay:26,interval:1,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1025_reveng",count:1,preDelay:26,interval:1,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"",count:1,preDelay:71,interval:1,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1025_reveng",count:1,preDelay:71,interval:1,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1098_cchmpn",count:1,preDelay:26,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1098_cchmpn",count:1,preDelay:71,interval:1,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1025_reveng",count:1,preDelay:26,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1002_nsabr",count:2,preDelay:6,interval:3,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1015_litamr",count:1,preDelay:16,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1002_nsabr",count:1,preDelay:25,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1002_nsabr",count:2,preDelay:31,interval:4,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1000_gopro_2",count:2,preDelay:39,interval:5,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1015_litamr",count:1,preDelay:46,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1002_nsabr",count:2,preDelay:50,interval:6,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1015_litamr",count:1,preDelay:61,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:90,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2001_duckmi",count:1,preDelay:23,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2002_bearmi",count:1,preDelay:23,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1}]}],advancedWaveTag:null}],E={type:"fragment",wave_index:0,frag_index:5},L={id:e,levelId:n,tags:o,category:t,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:a,name_zh:l,name_ja:r,name_en:i,description_zh:u,description_ja:c,description_en:p,addInfo_zh:null,addInfo_ja:null,addInfo_en:null,eliteDesc_zh:s,eliteDesc_ja:w,eliteDesc_en:f,n_runes:null,elite_runes:null,n_mods:null,elite_mods:d,routes:y,floors:g,sp_terrain:_,sp_enemy:m,n_count:h,e_count:v,traps:P,token_cards:k,enemies:S,mapData:D,extra_routes:x,branches:G,NORMAL:O,ELITE:K,waves:A,bonus:E};export{K as ELITE,O as NORMAL,M as addInfo_en,b as addInfo_ja,N as addInfo_zh,E as bonus,G as branches,t as category,W as characterLimit,a as code,T as costIncreaseTime,L as default,p as description_en,c as description_ja,u as description_zh,v as e_count,f as eliteDesc_en,w as eliteDesc_ja,s as eliteDesc_zh,d as elite_mods,C as elite_runes,S as enemies,x as extra_routes,g as floors,e as id,I as initialCost,n as levelId,D as mapData,R as maxCost,h as n_count,V as n_mods,B as n_runes,i as name_en,r as name_ja,l as name_zh,y as routes,m as sp_enemy,_ as sp_terrain,o as tags,k as token_cards,P as traps,A as waves};
