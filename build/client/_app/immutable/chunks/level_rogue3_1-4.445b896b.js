const e="ro3_e_1_4",o="level_rogue3_1-4",n=["rogue_sami"],I=null,O=6,A=10,N=99,M=1,a="ISW-NO",t="待宰的兽群",l="死を待つ獣の群れ",r="Beasts_Awaiting_Slaughter",i="不知何时，兽群的首领被替换成了怪异的人类，野兽们害怕得瑟瑟发抖，但仍对领头人的命令言听计从。",s="いつの間にやら群れのリーダーが奇妙な人間に入れ替わられ、獣たちは恐怖に震えながらもその命令に従っている。",u="At some point, the leader of the beast pack was replaced by a monster of a human. The beasts tremble with fear, but still they obey the boss's orders.",p=["【路网】效果: 额外出现1个岩冠兽"],c=["「導きの網織」: 追加で&lt;イワカムリ&gt;1体が出現する"],d=["Routeweave Net: Additional 1 &lt;Basorobeast&gt; appear"],y=["所有敌方单位的攻击力+50%，防御力+20%，生命值+40%","出现更多的角兽"],m=["敵全員の攻撃力+50%、防御力+20%、最大HP+40%","追加で4体の&lt;ツノシゲミ&gt;が出現する"],_=["All enemy units have +50% ATK, +20% DEF, and +40% Max HP","Additional 4 &lt;Hornbeast&gt; appears"],C=null,B=null,V=null,w=[{targets:["ALL"],mods:{atk:1.5,def:1.2,hp:1.4}}],v=[{motionMode:"E_NUM",startPosition:{row:0,col:0},endPosition:{row:0,col:0},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:null,allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:1},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:1},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:2},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:3},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:2},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:1,col:2},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:4},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:5},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"FLY",startPosition:{row:2,col:2},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"WAIT_FOR_SECONDS",time:80,position:{row:0,col:0},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:3},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:3,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:5},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:2},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:2},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:0},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:2,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:5},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:2,col:0},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:5,col:2},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[{type:"MOVE",time:0,position:{row:4,col:2},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:1,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:1},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:4,col:6},reachOffset:{x:0,y:0},reachDistance:0},{type:"MOVE",time:0,position:{row:2,col:6},reachOffset:{x:0,y:0},reachDistance:0}],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],h=[1,2],f=[{tileKey:"tile_hole",alias:null,blackboard:null}],k={normal:22,elite:26,fixed:!0},P=[21],x=[25],D=[{key:"trap_108_smbox",alias:"trap_108_smbox#1",pos:{row:1,col:5},direction:"RIGHT",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_109_smrbox",alias:"trap_109_smrbox#1",pos:{row:1,col:5},direction:"RIGHT",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_110_smbbox",alias:"trap_110_smbbox#1",pos:{row:1,col:5},direction:"RIGHT",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_108_smbox",alias:"trap_108_smbox#2",pos:{row:4,col:1},direction:"RIGHT",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_109_smrbox",alias:"trap_109_smrbox#2",pos:{row:4,col:1},direction:"RIGHT",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_110_smbbox",alias:"trap_110_smbbox#2",pos:{row:4,col:1},direction:"RIGHT",level:1,mainSkillLvl:1,hidden:!0},{key:"trap_024_npcsld",alias:"trap_024_npcsld#1",pos:{row:2,col:6},direction:"LEFT",level:1,mainSkillLvl:1,hidden:!0}],S=[],G=[{id:"enemy_2001_duckmi",prefabKey:"enemy_2001_duckmi",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2002_bearmi",prefabKey:"enemy_2002_bearmi",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2034_sythef",prefabKey:"enemy_2034_sythef",level:0,min_count:0,max_count:1,elite_min_count:0,elite_max_count:1,overwrittenData:null},{id:"enemy_2059_smbox",prefabKey:"enemy_2059_smbox",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:null},{id:"enemy_2043_smsbr",prefabKey:"enemy_2043_smsbr",level:0,min_count:6,max_count:6,elite_min_count:6,elite_max_count:6,overwrittenData:null},{id:"enemy_1307_mhrhcr",prefabKey:"enemy_1307_mhrhcr",level:0,min_count:1,max_count:1,elite_min_count:1,elite_max_count:1,overwrittenData:null},{id:"enemy_1303_mhshep",prefabKey:"enemy_1303_mhshep",level:0,min_count:4,max_count:4,elite_min_count:8,elite_max_count:8,overwrittenData:{hp:4e3}},{id:"enemy_1303_mhshep_b",prefabKey:"enemy_1303_mhshep",level:0,min_count:10,max_count:10,elite_min_count:10,elite_max_count:10,overwrittenData:{hp:4e3,atk:250,def:0,res:0,ms:.8,attackSpeed:100,aspd:2.3,weight:1,silenceImmune:!0,range:-1,talentBlackboard:[{key:"standby",standby:0}]}},{id:"enemy_1106_byokai_b",prefabKey:"enemy_1106_byokai",level:0,min_count:0,max_count:0,elite_min_count:0,elite_max_count:0,overwrittenData:{hp:5e3,atk:0,def:150,res:20,ms:1,attackSpeed:100,aspd:1,hpRecoveryPerSec:0,spRecoveryPerSec:1,weight:0,tauntLevel:0,epDamageResistance:0,epResistance:0,stunImmune:!1,silenceImmune:!0,sleepImmune:!1,frozenImmune:!1,levitateImmune:!1,lifepoint:0,range:-1,levelType:"NORMAL",talentBlackboard:[{key:"byokai_buff",duration:60}]}}],g={map:[[40,41,42,43,44,45,46,47],[32,33,34,35,36,37,38,39],[24,25,26,27,28,29,30,31],[16,17,18,19,20,21,22,23],[8,9,10,11,12,13,14,15],[0,1,2,3,4,5,6,7]],tiles:[["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_hole",0,0,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_end",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_wall",1,1,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_road",0,0,null,1],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_start",0,0,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0],["tile_forbidden",1,1,null,0]]},E=[{motionMode:"WALK",startPosition:{row:1,col:5},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1},{motionMode:"WALK",startPosition:{row:4,col:1},endPosition:{row:2,col:7},spawnRandomRange:{x:0,y:0},spawnOffset:{x:0,y:0},checkpoints:[],allowDiagonalMove:!0,visitEveryTileCenter:!1,visitEveryNodeCenter:!1,visitEveryCheckPoint:!1}],K={"trap_110_smbbox#1":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2059_smbox",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1}]}]},"trap_110_smbbox#2":{phases:[{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_2059_smbox",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1}]}]}},b={groupKey:"normal",max_permutations:4,permutations:[{w0f1:{g1:0,g2:0}},{w0f1:{g1:0,g2:1}},{w0f1:{g1:1,g2:0}},{w0f1:{g1:1,g2:1}}]},W={groupKey:"raid",max_permutations:1,permutations:[{}]},R=[{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:60,fragments:[{preDelay:0,actions:[{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_108_smbox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_109_smrbox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_110_smbbox#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:850,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_108_smbox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:105,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_109_smrbox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:30,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_110_smbbox#2",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1},{actionType:"ACTIVATE_PREDEFINED",key:"trap_024_npcsld#1",count:1,preDelay:0,interval:1,routeIndex:0,autoPreviewRoute:!1,hiddenGroup:"totem2",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:15,dontBlockWave:!1}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:"s1",weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:null,randomSpawnGroupPackKey:"s1",weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:"s2",weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:null,randomSpawnGroupPackKey:"s2",weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:"s3",weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:null,randomSpawnGroupPackKey:"s3",weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:"g2",randomSpawnGroupPackKey:"s4",weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:"normal",randomSpawnGroupKey:null,randomSpawnGroupPackKey:"s4",weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1106_byokai_b",count:1,preDelay:0,interval:1,routeIndex:9,autoPreviewRoute:!1,hiddenGroup:"totem1",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!0}]},{preDelay:0,actions:[{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:1,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:2,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:3,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:4,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:5,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:6,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:7,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:50,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep",count:1,preDelay:0,interval:1,routeIndex:8,autoPreviewRoute:!1,hiddenGroup:"raid",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:2,actions:[{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_2043_smsbr",count:1,preDelay:3,interval:1,routeIndex:11,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:10,actions:[{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:15,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_2043_smsbr",count:1,preDelay:0,interval:1,routeIndex:11,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:12,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_1307_mhrhcr",count:1,preDelay:3,interval:1,routeIndex:12,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_2043_smsbr",count:1,preDelay:0,interval:1,routeIndex:11,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:10,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:12,actions:[{actionType:"SPAWN",key:"enemy_2043_smsbr",count:1,preDelay:0,interval:1,routeIndex:11,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:16,actions:[{actionType:"SPAWN",key:"enemy_2043_smsbr",count:2,preDelay:0,interval:10,routeIndex:11,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:3,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_1303_mhshep_b",count:1,preDelay:10,interval:1,routeIndex:10,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]},{preDelay:5,actions:[{actionType:"SPAWN",key:"enemy_1307_mhrhcr",count:1,preDelay:3,interval:1,routeIndex:12,autoPreviewRoute:!0,hiddenGroup:"bossrelic",randomSpawnGroupKey:null,randomSpawnGroupPackKey:null,weight:0,dontBlockWave:!1}]}],advancedWaveTag:null},{preDelay:0,postDelay:0,maxTimeWaitingForNextWave:-1,fragments:[{preDelay:0,actions:[{actionType:"SPAWN",key:"",count:1,preDelay:0,interval:1,routeIndex:13,autoPreviewRoute:!1,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:85,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2001_duckmi",count:1,preDelay:3,interval:1,routeIndex:14,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2002_bearmi",count:1,preDelay:3,interval:1,routeIndex:14,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1},{actionType:"SPAWN",key:"enemy_2034_sythef",count:1,preDelay:3,interval:1,routeIndex:14,autoPreviewRoute:!0,hiddenGroup:null,randomSpawnGroupKey:"g1",randomSpawnGroupPackKey:null,weight:5,dontBlockWave:!1}]}],advancedWaveTag:null}],T={type:"wave",wave_index:1,frag_index:-1},L={id:e,levelId:o,tags:n,category:null,characterLimit:6,initialCost:10,maxCost:99,costIncreaseTime:1,code:a,name_zh:t,name_ja:l,name_en:r,description_zh:i,description_ja:s,description_en:u,addInfo_zh:p,addInfo_ja:c,addInfo_en:d,eliteDesc_zh:y,eliteDesc_ja:m,eliteDesc_en:_,n_runes:null,elite_runes:null,n_mods:null,elite_mods:w,routes:v,floors:h,sp_terrain:f,sp_enemy:k,n_count:P,e_count:x,traps:D,token_cards:S,enemies:G,mapData:g,extra_routes:E,branches:K,NORMAL:b,ELITE:W,waves:R,bonus:T};export{W as ELITE,b as NORMAL,d as addInfo_en,c as addInfo_ja,p as addInfo_zh,T as bonus,K as branches,I as category,O as characterLimit,a as code,M as costIncreaseTime,L as default,u as description_en,s as description_ja,i as description_zh,x as e_count,_ as eliteDesc_en,m as eliteDesc_ja,y as eliteDesc_zh,w as elite_mods,B as elite_runes,G as enemies,E as extra_routes,h as floors,e as id,A as initialCost,o as levelId,g as mapData,N as maxCost,P as n_count,V as n_mods,C as n_runes,r as name_en,l as name_ja,t as name_zh,v as routes,k as sp_enemy,f as sp_terrain,n as tags,S as token_cards,D as traps,R as waves};
