const e="ro2_e_6_2",o="level_rogue2_6-2",n=["rogue_mizuki"],t="combat_ops",O=6,T=10,C=99,A=1,a="ISW-NO",l="深度认知",i="深度認知",r="Deep_Cognition",s=`一些海嗣个体已模拟成人类假想敌加入对外冲突，以它们的学习能力与团结效率，人类所谓的兵种搭配与战术策略很快将变得毫无意义。
<@rolv.rem>提供部署以后可以阻挡敌人的行进路线的<障碍物>。</>`,u=`シーボーンの一部には人類の仮想敵に擬態し、外敵との戦いに加わっている者も存在する。奴らの高い学習能力と団結力の前では、部隊編成や戦術などの策略は瞬く間に対策されてしまうだろう。
<@rolv.rem>配置後、敵の進行ルートを遮ることができる<障害物>がある。</>`,c=`Some Seaborn individuals have mimicked the humans' opposing forces to simulate external conflicts. With their learning ability and cohesive efficiency, the humans' so-called combined arms and tactical strategies will soon become meaningless. 
<@rolv.rem>This stage provides <Roadblocks> that can be deployed to block the enemy's path.</>`,N=null,I=null,M=null,y=["所有敌方单位的攻击力+50%，防御力+20%，生命值+50%"],d=["敵全員の攻撃力+50%、防御力+20%、最大HP+50%"],p=["All enemy units have +50% ATK, +20% DEF, and +50% Max HP"],b=null,B=null,L=null,w=[{targets:["ALL"],mods:{atk:1.5,def:1.2,hp:1.5}}],_=[{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:30,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:30,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:6,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:6,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:6,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:15,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:30,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:15,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:30,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:7,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:8},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:7,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:7,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:20,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:3,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:30,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:9},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:30,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!0},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:20,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:1},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],v=[6],f=null,m={normal:44,elite:null,fixed:!0},h=[43],P=null,k=[{key:"trap_065_normbox",alias:"trap_065_normbox#1",pos:{row:1,col:4},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_066_rarebox",alias:"trap_066_rarebox#1",pos:{row:1,col:4},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_068_badbox",alias:"trap_068_badbox#1",pos:{row:1,col:4},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_065_normbox",alias:"trap_065_normbox#2",pos:{row:5,col:3},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_066_rarebox",alias:"trap_066_rarebox#2",pos:{row:5,col:3},direction:"UP",level:3,mainSkillLvl:1,hidden:!0},{key:"trap_068_badbox",alias:"trap_068_badbox2#",pos:{row:5,col:3},direction:"UP",level:3,mainSkillLvl:1,hidden:!0}],x=[{key:"trap_001_crate",count:10}],D=[{id:"enemy_2021_syfish",prefabKey:"enemy_2021_syfish",level:0,min_count:18,max_count:18,elite_min_count:18,elite_max_count:18,overwrittenData:null},{id:"enemy_2025_syufo",prefabKey:"enemy_2025_syufo",level:0,min_count:8,max_count:8,elite_min_count:8,elite_max_count:8,overwrittenData:null},{id:"enemy_2034_sythef",prefabKey:"enemy_2034_sythef",level:2,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2001_duckmi",prefabKey:"enemy_2001_duckmi",level:2,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2002_bearmi",prefabKey:"enemy_2002_bearmi",level:2,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_1174_duholy_2",prefabKey:"enemy_1174_duholy_2",level:0,min_count:6,max_count:11,elite_min_count:6,elite_max_count:11,overwrittenData:{hp:3e4}},{id:"enemy_1175_dushdo_2",prefabKey:"enemy_1175_dushdo_2",level:0,min_count:6,max_count:11,elite_min_count:6,elite_max_count:11,overwrittenData:{hp:25e3}},{id:"enemy_2035_sybox",prefabKey:"enemy_2035_sybox",level:2,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2085_skzjxd",prefabKey:"enemy_2085_skzjxd",level:2,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null}],S={map:[[60,61,62,63,64,65,66,67,68,69],[50,51,52,53,54,55,56,57,58,59],[40,41,42,43,44,45,46,47,48,49],[30,31,32,33,34,35,36,37,38,39],[20,21,22,23,24,25,26,27,28,29],[10,11,12,13,14,15,16,17,18,19],[0,1,2,3,4,5,6,7,8,9]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_floor",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_floor",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0]]},E=[{motionMode:"WALK",startPosition:{row:1,col:4},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:3},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],W={"trap_068_badbox#1":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2035_sybox",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1}]}]},"trap_068_badbox#2":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2035_sybox",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1}]}]}},G={groupKey:null,max_permutations:96,permutations:[]},g={groupKey:null,max_permutations:96,permutations:[]},R=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:66,fragments:[{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_065_normbox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_066_rarebox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_068_badbox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_065_normbox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_066_rarebox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_068_badbox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:1,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:2,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2021_syfish",count:2,preDelay:3,interval:12,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1}]},{preDelay:25,actions:[{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:1,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:2,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2021_syfish",count:2,preDelay:3,interval:10,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2021_syfish",count:2,preDelay:7,interval:10,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_2025_syufo",count:2,preDelay:3,interval:24,routeIndex:6,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"s1",randomSpawnGroupPackKey:null,weight:33,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2025_syufo",count:2,preDelay:3,interval:24,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"s1",randomSpawnGroupPackKey:null,weight:33,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2025_syufo",count:2,preDelay:3,interval:24,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"s1",randomSpawnGroupPackKey:null,weight:33,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2021_syfish",count:2,preDelay:18,interval:7,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2021_syfish",count:2,preDelay:18,interval:7,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2021_syfish",count:2,preDelay:18,interval:7,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:11,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:12,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:13,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1}]},{preDelay:2,actions:[{actionType:"SPAWN",key:"enemy_2021_syfish",count:3,preDelay:3,interval:2,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2021_syfish",count:3,preDelay:18,interval:2,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2025_syufo",count:1,preDelay:33,interval:10,routeIndex:14,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:40,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2025_syufo",count:1,preDelay:50,interval:10,routeIndex:15,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:40,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2025_syufo",count:1,preDelay:44,interval:10,routeIndex:16,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2025_syufo",count:1,preDelay:60,interval:10,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2025_syufo",count:1,preDelay:55,interval:10,routeIndex:17,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2025_syufo",count:1,preDelay:70,interval:10,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1}]},{preDelay:5,actions:[{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:18,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:19,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:25,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:20,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:21,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:75,dontBlockWave:!1}]},{preDelay:13,actions:[{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:22,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"s1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:22,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"s1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:23,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"s2",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:23,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"s2",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:24,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"s3",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:11,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"s3",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:25,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"s4",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:25,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"s4",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1175_dushdo_2",count:1,preDelay:3,interval:1,routeIndex:13,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"s5",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1174_duholy_2",count:1,preDelay:3,interval:1,routeIndex:13,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"s5",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1}]}],advancedWaveTag:null},{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2034_sythef",count:1,preDelay:3,interval:1,routeIndex:26,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2001_duckmi",count:1,preDelay:3,interval:1,routeIndex:27,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2002_bearmi",count:1,preDelay:3,interval:1,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2085_skzjxd",count:1,preDelay:3,interval:1,routeIndex:9,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"",count:1,preDelay:0,interval:1,routeIndex:28,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:85,dontBlockWave:!1}]}],advancedWaveTag:null}],K={type:"wave",wave_index:1,frag_index:-1},F={id:e,levelId:o,tags:n,category:t,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:a,name_zh:l,name_ja:i,name_en:r,description_zh:s,description_ja:u,description_en:c,addInfo_zh:null,addInfo_ja:null,addInfo_en:null,eliteDesc_zh:y,eliteDesc_ja:d,eliteDesc_en:p,n_runes:null,elite_runes:null,n_mods:null,elite_mods:w,routes:_,floors:v,sp_terrain:f,sp_enemy:m,n_count:h,e_count:P,traps:k,token_cards:x,enemies:D,mapData:S,extra_routes:E,branches:W,NORMAL:G,ELITE:g,waves:R,bonus:K};export{g as ELITE,G as NORMAL,M as addInfo_en,I as addInfo_ja,N as addInfo_zh,K as bonus,W as branches,t as category,O as characterLimit,a as code,A as costIncreaseTime,F as default,c as description_en,u as description_ja,s as description_zh,P as e_count,p as eliteDesc_en,d as eliteDesc_ja,y as eliteDesc_zh,w as elite_mods,B as elite_runes,D as enemies,E as extra_routes,v as floors,e as id,T as initialCost,o as levelId,S as mapData,C as maxCost,h as n_count,L as n_mods,b as n_runes,r as name_en,i as name_ja,l as name_zh,_ as routes,m as sp_enemy,f as sp_terrain,n as tags,x as token_cards,k as traps,R as waves};
