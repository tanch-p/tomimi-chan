const e="ro2_e_6_1",o="level_rogue2_6-1",n=["rogue_mizuki"],t="combat_ops",b=6,R=10,T=99,I=1,a="ISW-NO",l="水火相容",i="相容れる水と火",r="Water_and_Fire_Union",u=`火山喷发，海洋颤动，沉眠的生物尽皆苏醒。在熔岩与水寒间，生命仍将延续。
<@rolv.rem>场地中有使我方单位防御力减半的<腐蚀地面>。</>`,s=`火山が噴火し、海が揺れ動き、眠っていたあらゆる生物が覚醒する。溶岩と冷水の狭間にて、生命は変わらず生き延び続ける。
<@rolv.rem>戦場に配置したユニットの防御力が半分に低下する<腐食した地面>がある。</>`,c=`Volcanoes erupt, the ocean trembles, and sleeping creatures stir. Between molten lava and icy waters, life will continue to persist. 
<@rolv.rem>This stage has <Corrosive Ground> that halves the DEF of friendly units deployed on it.</>`,A=null,N=null,M=null,p=["所有敌方单位的攻击力+10%，防御力+20%，生命值+30%","所有庞贝的攻击半径扩大至170%"],y=["敵全員の攻撃力+10%、防御力+20%、最大HP+30%","&lt;Pompeii&gt;の攻撃範囲+70%"],d=["All enemy units have +10% ATK, +20% DEF, and +30% Max HP","All &lt;Pompeii&gt; have +70% Attack range"],C=null,B=null,V=null,_=[{targets:["ALL"],mods:{atk:1.1,def:1.2,hp:1.3}},{targets:["UM1"],mods:{range:1.7}}],m=[{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:2},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:2},reachOffset:{x:-.2,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:50,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:2},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:2},reachOffset:{x:.26,y:.05},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:50,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:8},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:50,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:6,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:50,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:6,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:50,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:8},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:50,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:6,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:100,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:10},endPosition:{row:4,col:1},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:10},endPosition:{row:4,col:1},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:3,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:3},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:3,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:6,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:3},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:8},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:10},endPosition:{row:4,col:1},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:4,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:3},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:20,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:3},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:2},reachOffset:{x:-.16,y:.08},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:20,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:3},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:2},reachOffset:{x:.18,y:-.04},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:20,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:8},endPosition:{row:4,col:1},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:6,col:3},endPosition:{row:4,col:1},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:6,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:6,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],f=[6],w=[{tileKey:"tile_defbreak",alias:null,blackboard:{def:.5}}],v={normal:72,elite:null,fixed:!0},h=[71],k=null,P=[{key:"trap_065_normbox",alias:"trap_065_normbox#1",pos:{row:1,col:3},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_066_rarebox",alias:"trap_066_rarebox#1",pos:{row:1,col:3},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_068_badbox",alias:"trap_068_badbox#1",pos:{row:1,col:3},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_065_normbox",alias:"trap_065_normbox#2",pos:{row:5,col:6},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_066_rarebox",alias:"trap_066_rarebox#2",pos:{row:5,col:6},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_068_badbox",alias:"trap_068_badbox#2",pos:{row:5,col:6},direction:"UP",level:3,mainSkillLvl:1,hidden:!0}],x=[],D=[{id:"enemy_2021_syfish",prefabKey:"enemy_2021_syfish",level:0,min_count:12,max_count:12,elite_min_count:12,elite_max_count:12,overwrittenData:null},{id:"enemy_2022_syzeni",prefabKey:"enemy_2022_syzeni",level:0,min_count:9,max_count:9,elite_min_count:9,elite_max_count:9,overwrittenData:null},{id:"enemy_2023_sypult",prefabKey:"enemy_2023_sypult",level:0,min_count:4,max_count:4,elite_min_count:4,elite_max_count:4,overwrittenData:null},{id:"enemy_2024_synut",prefabKey:"enemy_2024_synut",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2034_sythef",prefabKey:"enemy_2034_sythef",level:2,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2001_duckmi",prefabKey:"enemy_2001_duckmi",level:2,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2002_bearmi",prefabKey:"enemy_2002_bearmi",level:2,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_1021_bslime",prefabKey:"enemy_1021_bslime",level:0,min_count:15,max_count:35,elite_min_count:15,elite_max_count:35,overwrittenData:{hp:4e3}},{id:"enemy_1021_bslime_2",prefabKey:"enemy_1021_bslime_2",level:0,min_count:9,max_count:29,elite_min_count:9,elite_max_count:29,overwrittenData:{hp:6e3}},{id:"enemy_1050_lslime",prefabKey:"enemy_1050_lslime",level:1,min_count:2,max_count:2,elite_min_count:2,elite_max_count:2,overwrittenData:{hp:6e4,def:400}},{id:"enemy_2035_sybox",prefabKey:"enemy_2035_sybox",level:2,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2085_skzjxd",prefabKey:"enemy_2085_skzjxd",level:2,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null}],S={map:[[77,78,79,80,81,82,83,84,85,86,87],[66,67,68,69,70,71,72,73,74,75,76],[55,56,57,58,59,60,61,62,63,64,65],[44,45,46,47,48,49,50,51,52,53,54],[33,34,35,36,37,38,39,40,41,42,43],[22,23,24,25,26,27,28,29,30,31,32],[11,12,13,14,15,16,17,18,19,20,21],[0,1,2,3,4,5,6,7,8,9,10]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_defbreak",0,0,{def:.5},1],["tile_defbreak",0,0,{def:.5},1],["tile_defbreak",0,0,{def:.5},1],["tile_defbreak",0,0,{def:.5},1],["tile_defbreak",0,0,{def:.5},1],["tile_defbreak",0,0,{def:.5},1],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_floor",0,0,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_defbreak",0,0,{def:.5},1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_defbreak",0,0,{def:.5},1],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_end",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_floor",0,0,null,0],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_fence",0,1,null,1],["tile_floor",0,0,null,0],["tile_start",0,0,null,0],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0]]},G=[{motionMode:"WALK",startPosition:{row:1,col:3},endPosition:{row:4,col:1},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:6},endPosition:{row:4,col:2},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],O={"trap_068_badbox#1":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2035_sybox",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1}]}]},"trap_068_badbox#2":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2035_sybox",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1}]}]}},E={groupKey:null,max_permutations:512,permutations:[]},W={groupKey:null,max_permutations:512,permutations:[]},g=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:66,fragments:[{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_065_normbox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_066_rarebox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_068_badbox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_065_normbox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_066_rarebox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_068_badbox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1021_bslime",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:1,preDelay:0,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1050_lslime",count:1,preDelay:0,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"PREVIEW_CURSOR",key:"enemy_1050_lslime",count:1,preDelay:0,interval:1,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2021_syfish",count:3,preDelay:3,interval:6,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2021_syfish",count:3,preDelay:30,interval:5,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2022_syzeni",count:1,preDelay:13,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2022_syzeni",count:1,preDelay:28,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_1021_bslime",count:1,preDelay:3,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:2,preDelay:12,interval:6,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:2,preDelay:27,interval:6,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2023_sypult",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:2,preDelay:4,interval:22,routeIndex:11,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1021_bslime",count:2,preDelay:10,interval:23,routeIndex:11,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:2,preDelay:10,interval:23,routeIndex:11,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2021_syfish",count:3,preDelay:3,interval:13,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:3,preDelay:3,interval:4,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:3,preDelay:3,interval:4,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:3,preDelay:5,interval:4,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2021_syfish",count:3,preDelay:5,interval:13,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2023_sypult",count:1,preDelay:16,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:3,preDelay:25,interval:3,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g3",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:3,preDelay:25,interval:3,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g3",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:3,preDelay:27.5,interval:3,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2022_syzeni",count:2,preDelay:3,interval:21,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_1021_bslime",count:3,preDelay:5,interval:3,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:3,preDelay:5,interval:3,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:3,preDelay:7,interval:3,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:3,preDelay:25,interval:3,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:3,preDelay:25,interval:3,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:3,preDelay:27,interval:3,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:3,preDelay:45,interval:2,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g3",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:3,preDelay:45,interval:2,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g3",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:3,preDelay:46.5,interval:2,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2023_sypult",count:2,preDelay:5,interval:28,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2022_syzeni",count:1,preDelay:5,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2022_syzeni",count:2,preDelay:23,interval:2,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2022_syzeni",count:2,preDelay:58,interval:2,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:1,preDelay:53,interval:1,routeIndex:12,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g5",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:1,preDelay:53,interval:1,routeIndex:12,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g5",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:1,preDelay:30,interval:1,routeIndex:11,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g6",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:1,preDelay:30,interval:1,routeIndex:11,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g6",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime",count:1,preDelay:53,interval:1,routeIndex:13,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g7",randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1021_bslime_2",count:1,preDelay:53,interval:1,routeIndex:13,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g7",randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1050_lslime",count:1,preDelay:50,interval:1,routeIndex:14,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]}],advancedWaveTag:null},{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2034_sythef",count:1,preDelay:5,interval:1,routeIndex:15,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2001_duckmi",count:1,preDelay:5,interval:1,routeIndex:15,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2002_bearmi",count:1,preDelay:5,interval:1,routeIndex:15,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2085_skzjxd",count:1,preDelay:5,interval:1,routeIndex:15,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"",count:1,preDelay:0,interval:1,routeIndex:15,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:90,dontBlockWave:!1}]}],advancedWaveTag:null}],K={type:"wave",wave_index:1,frag_index:-1},L={id:e,levelId:o,tags:n,category:t,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:a,name_zh:l,name_ja:i,name_en:r,description_zh:u,description_ja:s,description_en:c,addInfo_zh:null,addInfo_ja:null,addInfo_en:null,eliteDesc_zh:p,eliteDesc_ja:y,eliteDesc_en:d,n_runes:null,elite_runes:null,n_mods:null,elite_mods:_,routes:m,floors:f,sp_terrain:w,sp_enemy:v,n_count:h,e_count:k,traps:P,token_cards:x,enemies:D,mapData:S,extra_routes:G,branches:O,NORMAL:E,ELITE:W,waves:g,bonus:K};export{W as ELITE,E as NORMAL,M as addInfo_en,N as addInfo_ja,A as addInfo_zh,K as bonus,O as branches,t as category,b as characterLimit,a as code,I as costIncreaseTime,L as default,c as description_en,s as description_ja,u as description_zh,k as e_count,d as eliteDesc_en,y as eliteDesc_ja,p as eliteDesc_zh,_ as elite_mods,B as elite_runes,D as enemies,G as extra_routes,f as floors,e as id,R as initialCost,o as levelId,S as mapData,T as maxCost,h as n_count,V as n_mods,C as n_runes,r as name_en,i as name_ja,l as name_zh,m as routes,v as sp_enemy,w as sp_terrain,n as tags,x as token_cards,P as traps,g as waves};
