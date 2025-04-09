const e="ro2_e_2_2",o="level_rogue2_2-2",t=["rogue_mizuki"],n="combat_ops",M=6,W=10,R=99,I=1,a="ISW-NO",i="海神的信者",l="海神の信者",r="Leviathan's_Followers",s=`一些深海教徒听闻有位海神如同海上漂移的冰山，便自然而然地将之作为冰雪的象征顶礼膜拜。但他们从未见过，自然也不明白所谓“冰雪”的真正含义。
<@rolv.rem>场地中有持续施加【寒冷】效果的源石冰晶。</>`,c=`まるで氷山のように海の上を漂流する海神がいることを知った一部の深海教徒たちは、それを氷雪の象徴として崇め奉るようになった。しかし「氷雪」を見たことのない彼らは、当然その本当の意味を知ることもない。
<@rolv.rem>周囲を持続的に【寒冷】状態にする源石氷晶がある。</>`,p=`Some Church of the Deep cultists have heard of a Leviathan that floats on the surface of the ocean like an iceberg, so naturally they worship it as an avatar of ice and snow. But naturally, they have no idea what 'ice and snow' truly are, considering they've never seen it before. 
<@rolv.rem>This stage has <Originium Ice Crystals> that periodically apply the Cold status in an area around them.</>`,b=null,A=null,C=null,u=["所有敌方单位的攻击力，防御力+20%，生命值+40%","同时激活两处源石冰晶"],y=["敵全員の攻撃力、防御力+20%、最大HP+40%","両方の源石氷晶が起動される"],d=["All enemy units have +20% ATK, +20% DEF, and +40% Max HP","Both Originium Ice Crystals are activated"],V=null,N=null,B=null,f=[{targets:["ALL"],mods:{atk:1.2,def:1.2,hp:1.4}}],_=[{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:2},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:140,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:6},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:150,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:4},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:150,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:4},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:4},reachOffset:{x:.16,y:-.07},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:180,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:4},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:4},reachOffset:{x:-.02,y:-.41},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:180,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:3,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:8},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:2,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:25,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:8,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:8},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:2,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:20,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:0},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],m=[2],w=[{tileKey:"tile_hole",alias:null,blackboard:null}],h={normal:28,elite:null,fixed:!0},v=[27],x=[27],D=[{key:"trap_010_frosts",alias:"trap_010_frosts#1",pos:{row:3,col:6},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_010_frosts",alias:"trap_010_frosts#2",pos:{row:3,col:3},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_010_frosts",alias:"trap_010_frosts#3",pos:{row:3,col:3},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_010_frosts",alias:"trap_010_frosts#4",pos:{row:3,col:6},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_065_normbox",alias:"trap_065_normbox#1",pos:{row:2,col:2},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_066_rarebox",alias:"trap_066_rarebox#1",pos:{row:2,col:2},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_068_badbox",alias:"trap_068_badbox#1",pos:{row:2,col:2},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_065_normbox",alias:"trap_065_normbox#2",pos:{row:2,col:6},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_066_rarebox",alias:"trap_066_rarebox#2",pos:{row:2,col:6},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_068_badbox",alias:"trap_068_badbox#2",pos:{row:2,col:6},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_079_allydonq",alias:null,pos:{row:5,col:7},direction:"DOWN",level:1,mainSkillLvl:1,hidden:!0}],k=[],O=[{id:"enemy_1187_krghd",prefabKey:"enemy_1187_krghd",level:0,min_count:10,max_count:10,elite_min_count:10,elite_max_count:10,overwrittenData:null},{id:"enemy_1068_snmage",prefabKey:"enemy_1068_snmage",level:0,min_count:2,max_count:2,elite_min_count:2,elite_max_count:2,overwrittenData:null},{id:"enemy_1067_snslime",prefabKey:"enemy_1067_snslime",level:0,min_count:5,max_count:5,elite_min_count:5,elite_max_count:5,overwrittenData:null},{id:"enemy_1190_krgbow",prefabKey:"enemy_1190_krgbow",level:0,min_count:1,max_count:1,elite_min_count:1,elite_max_count:1,overwrittenData:{atk:220}},{id:"enemy_1064_snsbr",prefabKey:"enemy_1064_snsbr",level:0,min_count:9,max_count:9,elite_min_count:9,elite_max_count:9,overwrittenData:null},{id:"enemy_2001_duckmi",prefabKey:"enemy_2001_duckmi",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2002_bearmi",prefabKey:"enemy_2002_bearmi",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2034_sythef",prefabKey:"enemy_2034_sythef",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2035_sybox",prefabKey:"enemy_2035_sybox",level:1,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2085_skzjxd",prefabKey:"enemy_2085_skzjxd",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null}],E={map:[[54,55,56,57,58,59,60,61,62],[45,46,47,48,49,50,51,52,53],[36,37,38,39,40,41,42,43,44],[27,28,29,30,31,32,33,34,35],[18,19,20,21,22,23,24,25,26],[9,10,11,12,13,14,15,16,17],[0,1,2,3,4,5,6,7,8]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_hole",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_hole",0,0,null,0],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_hole",0,0,null,0],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_hole",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_hole",0,0,null,0],["tile_hole",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0]]},P=[{motionMode:"WALK",startPosition:{row:2,col:2},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:6},endPosition:{row:6,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],S={"trap_068_badbox#1":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2035_sybox",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1}]}]},"trap_068_badbox#2":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2035_sybox",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1}]}]}},g={groupKey:"normal",max_permutations:1,permutations:[{}]},G={groupKey:"raid",max_permutations:1,permutations:[{}]},K=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:50,fragments:[{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_065_normbox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_066_rarebox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_068_badbox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_065_normbox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_066_rarebox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_068_badbox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_079_allydonq",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"allydonq",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"trap_010_frosts#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_010_frosts#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"trap_010_frosts#3",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_010_frosts#4",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1068_snmage",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1068_snmage",count:1,preDelay:0,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1190_krgbow",count:1,preDelay:0,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1067_snslime",count:1,preDelay:0,interval:1,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1067_snslime",count:1,preDelay:0,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1187_krghd",count:1,preDelay:3,interval:1,routeIndex:6,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1187_krghd",count:1,preDelay:15,interval:1,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1187_krghd",count:1,preDelay:20,interval:1,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1067_snslime",count:1,preDelay:20,interval:1,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1064_snsbr",count:1,preDelay:23,interval:1,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:5,actions:[{actionType:"SPAWN",key:"enemy_1064_snsbr",count:1,preDelay:15,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1187_krghd",count:2,preDelay:30,interval:2,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1064_snsbr",count:2,preDelay:35,interval:2,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1067_snslime",count:1,preDelay:38,interval:1,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1187_krghd",count:1,preDelay:55,interval:1,routeIndex:11,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1064_snsbr",count:1,preDelay:56,interval:1,routeIndex:12,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:20,actions:[{actionType:"SPAWN",key:"enemy_1067_snslime",count:1,preDelay:3,interval:1,routeIndex:13,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1187_krghd",count:2,preDelay:10,interval:3,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1187_krghd",count:2,preDelay:20,interval:3,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1064_snsbr",count:1,preDelay:40,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1064_snsbr",count:1,preDelay:55,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1064_snsbr",count:1,preDelay:60,interval:1,routeIndex:14,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1064_snsbr",count:1,preDelay:62,interval:1,routeIndex:12,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]}],advancedWaveTag:null},{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"SPAWN",key:"",count:1,preDelay:0,interval:1,routeIndex:15,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:85,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2034_sythef",count:1,preDelay:3,interval:1,routeIndex:15,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2001_duckmi",count:1,preDelay:3,interval:1,routeIndex:15,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2002_bearmi",count:1,preDelay:3,interval:1,routeIndex:15,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2085_skzjxd",count:1,preDelay:3,interval:1,routeIndex:15,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1}]}],advancedWaveTag:null}],T={type:"wave",wave_index:1,frag_index:-1},L={id:e,levelId:o,tags:t,category:n,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:a,name_zh:i,name_ja:l,name_en:r,description_zh:s,description_ja:c,description_en:p,addInfo_zh:null,addInfo_ja:null,addInfo_en:null,eliteDesc_zh:u,eliteDesc_ja:y,eliteDesc_en:d,n_runes:null,elite_runes:null,n_mods:null,elite_mods:f,routes:_,floors:m,sp_terrain:w,sp_enemy:h,n_count:v,e_count:x,traps:D,token_cards:k,enemies:O,mapData:E,extra_routes:P,branches:S,NORMAL:g,ELITE:G,waves:K,bonus:T};export{G as ELITE,g as NORMAL,C as addInfo_en,A as addInfo_ja,b as addInfo_zh,T as bonus,S as branches,n as category,M as characterLimit,a as code,I as costIncreaseTime,L as default,p as description_en,c as description_ja,s as description_zh,x as e_count,d as eliteDesc_en,y as eliteDesc_ja,u as eliteDesc_zh,f as elite_mods,N as elite_runes,O as enemies,P as extra_routes,m as floors,e as id,W as initialCost,o as levelId,E as mapData,R as maxCost,v as n_count,B as n_mods,V as n_runes,r as name_en,l as name_ja,i as name_zh,_ as routes,h as sp_enemy,w as sp_terrain,t as tags,k as token_cards,D as traps,K as waves};
