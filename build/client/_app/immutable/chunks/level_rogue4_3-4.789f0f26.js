const e="ro4_e_3_4",t="level_rogue4_3-4",o=["rogue_skz"],G=null,W=6,K=10,N=99,M=1,n="ISW-NO",a="劳作的清晨",i="労働の朝",r="Morning_Labor",l=`城市里，晶簇生长不停，收割晶体就成了萨卡兹们每天早上的习惯。有早点吃的就吃完早点去，没早点吃的醒了就去。
<@rolv.rem>场地中有可以阻挡敌人行进路线的<碎石></>`,c=`街の中には、絶えず結晶が生えてくる。そのため、結晶刈りがサルカズたちの毎朝の日課となっていた。朝食が出る日は朝食を平らげてから取り掛かり、出ない日は起きてすぐに取り掛かるのだ。
<@rolv.rem>敵の進攻ルートを遮る<礫岩>が出現</>`,s=`In the city, crystal clusters grow nonstop, making morning harvesting a daily habit for the Sarkaz. Those who can afford breakfast harvest after eating; those who can't, go straight away.
<@rolv.rem><Rubble> that can change the enemy's route is present on the field</>`,p=["年代之刺：普通1/天灾+1"],C=null,b=null,y=["所有敌方单位的攻击力+30%，生命值，移动速度+50%","碎石的生命值-50%"],u=["敵全員の攻撃力+30%、最大HP+50%、移動速度+50%","「礫岩」の最大HP-50%"],_=["All enemy units have +40% ATK, +20% DEF and +50% Max HP","All &lt;Rubble&gt; have -50% Max HP"],z=null,V=null,d=[{targets:["trap_027_stone"],mods:{hp:1.5}}],f=[{targets:["ALL"],mods:{atk:1.3,hp:1.5,ms:1.5}},{targets:["trap_027_stone"],mods:{hp:.75}}],m=[{motionMode:"WALK",startPosition:{row:3,col:1},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:20,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:9},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!0},{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:10},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:3,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:2,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:1,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:8},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!0},{motionMode:"WALK",startPosition:{row:3,col:10},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:3,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:3,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:2,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:1,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!0},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:3,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:2,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:1,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:7},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!0},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:3,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:2,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:1,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!0},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:3,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:2,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:1,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"DISAPPEAR",time:0,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"APPEAR_AT_POS",time:0,position:{row:4,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:9},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:7},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!0}],h=[4],w=null,P={normal:"25",elite:null,fixed:!0},D=[24],x=null,O=[{key:"trap_027_stone",alias:"trap_027_stone#1",pos:{row:5,col:6},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_027_stone",alias:"trap_027_stone#2",pos:{row:5,col:7},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_027_stone",alias:"trap_027_stone#3",pos:{row:5,col:5},direction:"UP",level:1,mainSkillLvl:1,hidden:!1},{key:"trap_757_skzbox",alias:"trap_757_skzbox#1",pos:{row:4,col:1},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_758_skzmbx",alias:"trap_758_skzmbx#1",pos:{row:1,col:5},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_759_skzwyx",alias:"trap_759_skzwyx#1",pos:{row:3,col:4},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_757_skzbox",alias:"trap_757_skzbox#2",pos:{row:1,col:7},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_758_skzmbx",alias:"trap_758_skzmbx#2",pos:{row:1,col:8},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_759_skzwyx",alias:"trap_759_skzwyx#2",pos:{row:2,col:7},direction:"UP",level:2,mainSkillLvl:1,hidden:!0},{key:"trap_764_skzshp",alias:"trap_764_skzshp",pos:{row:5,col:4},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_760_skztzs",alias:"trap_760_skztzs#1",pos:{row:2,col:1},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_760_skztzs",alias:"trap_760_skztzs#2",pos:{row:4,col:7},direction:"UP",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_760_skztzs",alias:"trap_760_skztzs#3",pos:{row:3,col:8},direction:"UP",level:1,mainSkillLvl:1,hidden:!0}],v=[],k=[{id:"enemy_2001_duckmi",prefabKey:"enemy_2001_duckmi",level:1,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2002_bearmi",prefabKey:"enemy_2002_bearmi",level:1,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2034_sythef",prefabKey:"enemy_2034_sythef",level:1,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2085_skzjxd",prefabKey:"enemy_2085_skzjxd",level:1,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_1072_dlancer",prefabKey:"enemy_1072_dlancer",level:0,min_count:9,max_count:9,elite_min_count:9,elite_max_count:9,overwrittenData:null},{id:"enemy_2065_skzjs",prefabKey:"enemy_2065_skzjs",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_1009_lurker",prefabKey:"enemy_1009_lurker",level:0,min_count:6,max_count:7,elite_min_count:6,elite_max_count:7,overwrittenData:null},{id:"enemy_1071_dftman",prefabKey:"enemy_1071_dftman",level:0,min_count:7,max_count:7,elite_min_count:7,elite_max_count:7,overwrittenData:null},{id:"enemy_1010_demon",prefabKey:"enemy_1010_demon",level:0,min_count:1,max_count:2,elite_min_count:1,elite_max_count:2,overwrittenData:null},{id:"enemy_2069_skzbox",prefabKey:"enemy_2069_skzbox",level:1,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2067_skzcy",prefabKey:"enemy_2067_skzcy",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2091_skzgds",prefabKey:"enemy_2091_skzgds",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2070_skzfbx",prefabKey:"enemy_2070_skzfbx",level:1,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2093_skzams",prefabKey:"enemy_2093_skzams",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null}],S={map:[[66,67,68,69,70,71,72,73,74,75,76],[55,56,57,58,59,60,61,62,63,64,65],[44,45,46,47,48,49,50,51,52,53,54],[33,34,35,36,37,38,39,40,41,42,43],[22,23,24,25,26,27,28,29,30,31,32],[11,12,13,14,15,16,17,18,19,20,21],[0,1,2,3,4,5,6,7,8,9,10]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_telout",0,0,{colorIndex:2,direction:"left",type:"arrow"},0],["tile_floor",0,0,null,0],["tile_telin",0,0,{colorIndex:3,direction:"right",type:"arrow"},0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_start",0,0,null,0],["tile_telout",0,0,{colorIndex:1,direction:"left",type:"arrow"},0],["tile_floor",0,0,null,0],["tile_telin",0,0,{colorIndex:2,direction:"right",type:"arrow"},0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_telout",0,0,{colorIndex:-1,direction:"left",type:"arrow"},0],["tile_floor",0,0,null,0],["tile_telin",0,0,{colorIndex:1,direction:"right",type:"arrow"},0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_floor",0,0,null,0],["tile_start",0,0,null,0],["tile_telout",0,0,{colorIndex:0,direction:"left",type:"arrow"},0],["tile_floor",0,0,null,0],["tile_telin",0,0,{colorIndex:-1,direction:"right",type:"arrow"},0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_floor",0,0,null,0],["tile_wall",1,1,null,1],["tile_telout",0,0,{colorIndex:3,direction:"down",type:"arrow"},0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_floor",0,0,null,0],["tile_telin",0,0,{colorIndex:0,direction:"right",type:"arrow"},0],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0]]},A=[{motionMode:"WALK",startPosition:{row:1,col:5},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:8},endPosition:{row:6,col:4},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],E={"trap_758_skzmbx#1":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2069_skzbox",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1}]}]},"trap_758_skzmbx#2":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2069_skzbox",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1}]}]}},R={groupKey:null,max_permutations:2,permutations:[{w0f4:{g1:0}},{w0f4:{g1:1}}]},I={groupKey:null,max_permutations:2,permutations:[{w0f4:{g1:0}},{w0f4:{g1:1}}]},T=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2093_skzams",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"shadow",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_757_skzbox#1",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_758_skzmbx#1",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_759_skzwyx#1",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_757_skzbox#2",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_758_skzmbx#2",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_759_skzwyx#2",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_764_skzshp",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:"cargo",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_760_skztzs#2",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:"calamity",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_760_skztzs#1",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g3",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_760_skztzs#3",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g3",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1}]},{preDelay:3,actions:[{actionType:"SPAWN",key:"enemy_1071_dftman",count:1,preDelay:3,interval:1,routeIndex:2,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:1,preDelay:15,interval:3,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:2,preDelay:25,interval:3,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1072_dlancer",count:1,preDelay:50,interval:1,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1072_dlancer",count:1,preDelay:5,interval:1,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:20,dontBlockWave:!1}]},{preDelay:15,actions:[{actionType:"SPAWN",key:"enemy_1009_lurker",count:1,preDelay:3,interval:3,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1009_lurker",count:1,preDelay:12,interval:3,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1009_lurker",count:1,preDelay:25,interval:3,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1072_dlancer",count:2,preDelay:20,interval:5,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1009_lurker",count:1,preDelay:3,interval:3,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:1,preDelay:3,interval:3,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:15,interval:3,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1009_lurker",count:2,preDelay:25,interval:5,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1072_dlancer",count:3,preDelay:20,interval:10,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1072_dlancer",count:2,preDelay:3,interval:5,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1009_lurker",count:1,preDelay:6,interval:3,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1010_demon",count:1,preDelay:6,interval:3,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1071_dftman",count:2,preDelay:15,interval:10,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2067_skzcy",count:1,preDelay:25,interval:1,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:"hidden_door",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2091_skzgds",count:1,preDelay:20,interval:1,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:"hidden_window",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2070_skzfbx",count:1,preDelay:15,interval:1,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:"box_1",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2070_skzfbx",count:3,preDelay:12,interval:3,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:"box_3",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1}]}],advancedWaveTag:null},{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"SPAWN",key:"",count:1,preDelay:3,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g999",randomSpawnGroupPackKey:null,weight:85,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2034_sythef",count:1,preDelay:6,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g999",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2085_skzjxd",count:1,preDelay:6,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g999",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2002_bearmi",count:1,preDelay:6,interval:1,routeIndex:6,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g999",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2001_duckmi",count:1,preDelay:6,interval:1,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g999",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1}]}],advancedWaveTag:null}],g={type:"wave",wave_index:1,frag_index:-1},F={id:e,levelId:t,tags:o,category:null,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:n,name_zh:a,name_ja:i,name_en:r,description_zh:l,description_ja:c,description_en:s,addInfo_zh:p,addInfo_ja:null,addInfo_en:null,eliteDesc_zh:y,eliteDesc_ja:u,eliteDesc_en:_,n_runes:null,elite_runes:null,n_mods:d,elite_mods:f,routes:m,floors:h,sp_terrain:w,sp_enemy:P,n_count:D,e_count:x,traps:O,token_cards:v,enemies:k,mapData:S,extra_routes:A,branches:E,NORMAL:R,ELITE:I,waves:T,bonus:g};export{I as ELITE,R as NORMAL,b as addInfo_en,C as addInfo_ja,p as addInfo_zh,g as bonus,E as branches,G as category,W as characterLimit,n as code,M as costIncreaseTime,F as default,s as description_en,c as description_ja,l as description_zh,x as e_count,_ as eliteDesc_en,u as eliteDesc_ja,y as eliteDesc_zh,f as elite_mods,V as elite_runes,k as enemies,A as extra_routes,h as floors,e as id,K as initialCost,t as levelId,S as mapData,N as maxCost,D as n_count,d as n_mods,z as n_runes,r as name_en,i as name_ja,a as name_zh,m as routes,P as sp_enemy,w as sp_terrain,o as tags,v as token_cards,O as traps,T as waves};
