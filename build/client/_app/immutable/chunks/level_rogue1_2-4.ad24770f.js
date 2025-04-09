const e="ro1_e_2_4",n="level_rogue1_2-4",o=["rogue_phantom"],t="combat_ops",T=6,I=10,A=99,C=1,a="ISW-NO",l="分赃不均",i="分け前のもつれ",r="Unequal_Split",u="窃贼与术师在无主的财富的分配上起了争执，当双方准备大打出手时，你的出现改变了他们的想法。",s="盗賊と術師が、主無き財宝の取り分でもめている。双方が暴力を持って問題を解決しようとしたその時、あなたが現れたことで、彼らの考えは変わった。",c="The bandits and casters are having an argument over the unowned treasure. Just as they are about to come to blows, your entrance gives them a different idea.",N=null,M=null,B=null,d=["所有敌方单位的攻击力+30%，防御力+20%，生命值+40%","高阶术师被替换为护盾高阶术师，特战术师被替换为特战术师组长"],p=["敵全員の攻撃力+30%、防御力+20%、最大HP+40%","&lt;上級術師&gt;が&lt;上級バリア術師&gt;に替わる","&lt;特戦術師&gt;が&lt;特戦術師隊長&gt;に替わる"],y=["All enemy units have +30% ATK, +20% DEF, and +40% Max HP","All &lt;Senior Caster&gt; are replaced by &lt;Shielded Senior Caster&gt;","All &lt;Spec Ops Caster&gt; are replaced by &lt;Spec Ops Caster Leader&gt;"],V=null,f={enemy_replace:{enemy_1018_aoemag:"enemy_1036_amraoe",enemy_1038_lunmag:"enemy_1038_lunmag_2"}},w=null,_=[{targets:["ALL"],mods:{atk:1.3,def:1.2,hp:1.4}}],m=[{motionMode:"WALK",startPosition:{row:2,col:4},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:55,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:4},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:55,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:5,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:5},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:15,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:1},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:5},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:20,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:2},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:1,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:3,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:5,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:4},reachOffset:{x:0,y:0},reachDistance:0},{type:"WAIT_FOR_SECONDS",time:10,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:4},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:0},endPosition:{row:1,col:5},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],g=[2],v=[{tileKey:"tile_hole",alias:null,blackboard:null}],h={normal:27,elite:null,fixed:!1},k=[26],P=[26],x=[{key:"trap_051_vultres",alias:"trap_051_vultres#1",pos:{row:3,col:5},direction:"UP",level:1,mainSkillLvl:1,hidden:!0}],D=[],S=[{id:"enemy_1039_breakr",prefabKey:"enemy_1039_breakr",level:0,min_count:12,max_count:12,elite_min_count:12,elite_max_count:12,overwrittenData:null},{id:"enemy_1502_crowns",prefabKey:"enemy_1502_crowns",level:1,min_count:1,max_count:1,elite_min_count:1,elite_max_count:1,overwrittenData:{atk:700,res:25}},{id:"enemy_1018_aoemag",prefabKey:"enemy_1018_aoemag",level:0,min_count:0,max_count:4,elite_min_count:0,elite_max_count:0,overwrittenData:{atk:300}},{id:"enemy_1038_lunmag",prefabKey:"enemy_1038_lunmag",level:0,min_count:0,max_count:4,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_1029_shdsbr",prefabKey:"enemy_1029_shdsbr",level:0,min_count:9,max_count:9,elite_min_count:9,elite_max_count:9,overwrittenData:null},{id:"enemy_2001_duckmi",prefabKey:"enemy_2001_duckmi",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2002_bearmi",prefabKey:"enemy_2002_bearmi",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_1038_lunmag_2",prefabKey:"enemy_1038_lunmag_2",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:4,overwrittenData:{def:250}},{id:"enemy_1036_amraoe",prefabKey:"enemy_1036_amraoe",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:4,overwrittenData:null}],O={map:[[54,55,56,57,58,59,60,61,62],[45,46,47,48,49,50,51,52,53],[36,37,38,39,40,41,42,43,44],[27,28,29,30,31,32,33,34,35],[18,19,20,21,22,23,24,25,26],[9,10,11,12,13,14,15,16,17],[0,1,2,3,4,5,6,7,8]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_floor",0,0,null,0],["tile_start",0,0,null,0],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_hole",0,0,null,0],["tile_hole",0,0,null,0],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_end",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_floor",0,0,null,0],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0]]},G=[],K=null,b={groupKey:null,max_permutations:16,permutations:[{w0f0:{g1:0},w0f2:{g1:0},w0f3:{g1:0,g2:0}},{w0f0:{g1:0},w0f2:{g1:0},w0f3:{g1:0,g2:1}},{w0f0:{g1:0},w0f2:{g1:0},w0f3:{g1:1,g2:0}},{w0f0:{g1:0},w0f2:{g1:0},w0f3:{g1:1,g2:1}},{w0f0:{g1:0},w0f2:{g1:1},w0f3:{g1:0,g2:0}},{w0f0:{g1:0},w0f2:{g1:1},w0f3:{g1:0,g2:1}},{w0f0:{g1:0},w0f2:{g1:1},w0f3:{g1:1,g2:0}},{w0f0:{g1:0},w0f2:{g1:1},w0f3:{g1:1,g2:1}},{w0f0:{g1:1},w0f2:{g1:0},w0f3:{g1:0,g2:0}},{w0f0:{g1:1},w0f2:{g1:0},w0f3:{g1:0,g2:1}},{w0f0:{g1:1},w0f2:{g1:0},w0f3:{g1:1,g2:0}},{w0f0:{g1:1},w0f2:{g1:0},w0f3:{g1:1,g2:1}},{w0f0:{g1:1},w0f2:{g1:1},w0f3:{g1:0,g2:0}},{w0f0:{g1:1},w0f2:{g1:1},w0f3:{g1:0,g2:1}},{w0f0:{g1:1},w0f2:{g1:1},w0f3:{g1:1,g2:0}},{w0f0:{g1:1},w0f2:{g1:1},w0f3:{g1:1,g2:1}}]},E={groupKey:null,max_permutations:16,permutations:[{w0f0:{g1:0},w0f2:{g1:0},w0f3:{g1:0,g2:0}},{w0f0:{g1:0},w0f2:{g1:0},w0f3:{g1:0,g2:1}},{w0f0:{g1:0},w0f2:{g1:0},w0f3:{g1:1,g2:0}},{w0f0:{g1:0},w0f2:{g1:0},w0f3:{g1:1,g2:1}},{w0f0:{g1:0},w0f2:{g1:1},w0f3:{g1:0,g2:0}},{w0f0:{g1:0},w0f2:{g1:1},w0f3:{g1:0,g2:1}},{w0f0:{g1:0},w0f2:{g1:1},w0f3:{g1:1,g2:0}},{w0f0:{g1:0},w0f2:{g1:1},w0f3:{g1:1,g2:1}},{w0f0:{g1:1},w0f2:{g1:0},w0f3:{g1:0,g2:0}},{w0f0:{g1:1},w0f2:{g1:0},w0f3:{g1:0,g2:1}},{w0f0:{g1:1},w0f2:{g1:0},w0f3:{g1:1,g2:0}},{w0f0:{g1:1},w0f2:{g1:0},w0f3:{g1:1,g2:1}},{w0f0:{g1:1},w0f2:{g1:1},w0f3:{g1:0,g2:0}},{w0f0:{g1:1},w0f2:{g1:1},w0f3:{g1:0,g2:1}},{w0f0:{g1:1},w0f2:{g1:1},w0f3:{g1:1,g2:0}},{w0f0:{g1:1},w0f2:{g1:1},w0f3:{g1:1,g2:1}}]},W=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1018_aoemag",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1038_lunmag",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_051_vultres#1",count:1,preDelay:0,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:100,dontBlockWave:!1}]},{preDelay:8,actions:[{actionType:"SPAWN",key:"enemy_1029_shdsbr",count:1,preDelay:3,interval:1,routeIndex:3,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1029_shdsbr",count:1,preDelay:9,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1029_shdsbr",count:1,preDelay:16,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1029_shdsbr",count:1,preDelay:19,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:13,actions:[{actionType:"SPAWN",key:"enemy_1039_breakr",count:1,preDelay:9,interval:1,routeIndex:4,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1039_breakr",count:2,preDelay:29,interval:2,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1039_breakr",count:2,preDelay:46,interval:2,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1029_shdsbr",count:2,preDelay:18,interval:16,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1018_aoemag",count:1,preDelay:36,interval:1,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1038_lunmag",count:1,preDelay:36,interval:1,routeIndex:5,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1}]},{preDelay:17,actions:[{actionType:"SPAWN",key:"enemy_1018_aoemag",count:1,preDelay:14,interval:1,routeIndex:6,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1038_lunmag",count:1,preDelay:14,interval:1,routeIndex:6,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1018_aoemag",count:1,preDelay:44,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1038_lunmag",count:1,preDelay:44,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1039_breakr",count:1,preDelay:4,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1039_breakr",count:2,preDelay:9,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1029_shdsbr",count:3,preDelay:3,interval:12,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1039_breakr",count:2,preDelay:23,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1039_breakr",count:2,preDelay:35,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1502_crowns",count:1,preDelay:45,interval:1,routeIndex:7,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2001_duckmi",count:1,preDelay:33,interval:1,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2002_bearmi",count:1,preDelay:33,interval:1,routeIndex:8,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"",count:1,preDelay:0,interval:1,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:90,dontBlockWave:!1}]}],advancedWaveTag:null}],R={type:"fragment",wave_index:0,frag_index:4},L={id:e,levelId:n,tags:o,category:t,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:a,name_zh:l,name_ja:i,name_en:r,description_zh:u,description_ja:s,description_en:c,addInfo_zh:null,addInfo_ja:null,addInfo_en:null,eliteDesc_zh:d,eliteDesc_ja:p,eliteDesc_en:y,n_runes:null,elite_runes:f,n_mods:w,elite_mods:_,routes:m,floors:g,sp_terrain:v,sp_enemy:h,n_count:k,e_count:P,traps:x,token_cards:D,enemies:S,mapData:O,extra_routes:G,branches:K,NORMAL:b,ELITE:E,waves:W,bonus:R};export{E as ELITE,b as NORMAL,B as addInfo_en,M as addInfo_ja,N as addInfo_zh,R as bonus,K as branches,t as category,T as characterLimit,a as code,C as costIncreaseTime,L as default,c as description_en,s as description_ja,u as description_zh,P as e_count,y as eliteDesc_en,p as eliteDesc_ja,d as eliteDesc_zh,_ as elite_mods,f as elite_runes,S as enemies,G as extra_routes,g as floors,e as id,I as initialCost,n as levelId,O as mapData,A as maxCost,k as n_count,w as n_mods,V as n_runes,r as name_en,i as name_ja,l as name_zh,m as routes,h as sp_enemy,v as sp_terrain,o as tags,D as token_cards,x as traps,W as waves};
