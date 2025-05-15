export const getSpineMetaData = (key, skel) => {
	if (!skel) return;

	let width = Math.min(100, skel.data.width * 0.3);
	let height = Math.min(110, skel.data.height * 0.3);
	switch (key) {
		case 'enemy_2068_skzirn':
			height = 65;
			break;
		case 'enemy_2066_skzlcp':
		case 'enemy_2064_skzwdd':
			height = 110;
			break;
		case 'enemy_2089_skzjkl':
			height = 130;
			break;
		
	}
	return { width, height };
};

export function getReviveAnimName(key, skel) {
	if(!skel) return;
	if (skel.state.hasAnimation('Revive')) {
		return 'Revive';
	}
	switch (key) {
		case 'enemy_2025_syufo':
			return 'Default_01';
		case 'enemy_2089_skzjkl':
			return 'C_Revive';
	}
}

export function getDefaultAnimName(key, skel) {
	if (!skel) return;

	if (skel.state.hasAnimation('Default')) {
		return 'Default';
	}
	switch (key) {
		case 'enemy_2025_syufo':
			return 'Default_01';
		case 'enemy_2097_skzfdd':
		case 'enemy_2098_skzftx':
			return 'C1_Default';
	}
}

export function getIdleAnimName(key, skel, state) {
	if (!skel) return;

	if (skel.state.hasAnimation('Idle')) {
		return 'Idle';
	}
	switch (key) {
		case 'enemy_1118_lidbox':
		case 'enemy_1118_lidbox_2':
		case 'enemy_1121_lifbos':
		case 'enemy_1121_lifbos_2':
			return 'Idle_grey';
		case 'enemy_1024_mortar':
		case 'enemy_1024_mortar_2':
		case 'enemy_1082_soticn':
		case 'enemy_1082_soticn_2':
		case 'enemy_1327_cbrokt':
		case 'enemy_1327_cbrokt_2':
		case 'enemy_1412_mmjump':
		case 'enemy_1412_mmjump_2':
		case 'enemy_1425_lrcmra':
		case 'enemy_1425_lrcmra_2':
		case 'enemy_1506_patrt':
		case 'enemy_2013_csbot':
			return 'Idle_1';

		case 'enemy_1158_divman':
		case 'enemy_1158_divman_2':
		case 'enemy_1171_durokt':
		case 'enemy_1171_durokt_2':
		case 'enemy_2014_csicer':
			return 'Idle01';

		case 'enemy_2070_skzfbx':
			return 'Idle1';

		case 'enemy_2025_syufo':
			return 'Idle_01';

		case 'enemy_1143_merrpg':
		case 'enemy_1143_merrpg_2':
		case 'enemy_1271_nhkodo':
		case 'enemy_1271_nhkodo_2':
		case 'enemy_1311_mhkryk':
		case 'enemy_1314_wdnjd':
		case 'enemy_1315_wdyjd':
		case 'enemy_1316_wdpjd':
		case 'trap_086_larva':
			return 'Idle_A';

		case 'enemy_1388_wingnt':
		case 'enemy_2092_skzamy':
			return 'A_Idle';

		case 'enemy_1418_mmkonm':
		case 'enemy_1418_mmkonm_2':
			return 'Idle_b';

		case 'enemy_1311_mhkryk_2':
			return 'Idle_B';

		case 'enemy_1135_redman':
		case 'enemy_1135_redman_2':
		case 'enemy_2089_skzjkl':
			return 'C_Idle';

		case 'enemy_1516_jakill':
		case 'enemy_2037_sygirl':
		case 'enemy_2081_skztxs':
		case 'enemy_2082_skzdd':
		case 'trap_762_skztxy':
			return 'C1_Idle';

		case 'enemy_1384_winfrz':
			return 'C1_Idle';

		case 'enemy_1267_nhpbr':
		case 'enemy_1267_nhpbr_2':
			return 'F_Idle';

		default:
			if (skel.state.hasAnimation('Idile')) {
				return 'Idile';
			}
			return 'Default';
	}
}

export function getMoveAnimName(key, skel, state) {
	if (!skel) return;
	if (skel.state.hasAnimation('Move')) {
		return 'Move';
	}
	switch (key) {
		case 'enemy_1118_lidbox':
		case 'enemy_1118_lidbox_2':
		case 'enemy_1121_lifbos':
		case 'enemy_1121_lifbos_2':
			return 'Move_grey';

		case 'enemy_1002_nsabr':
		case 'enemy_1000_gopro':
		case 'enemy_1000_gopro_2':
		case 'enemy_1000_gopro_3':
		case 'enemy_1029_shdsbr':
		case 'enemy_1064_snsbr':
		case 'enemy_1065_snwolf':
		case 'enemy_1077_sotihd':
		case 'enemy_1077_sotihd_2':
		case 'enemy_1087_ltwolf':
		case 'enemy_1087_ltwolf_2':
		case 'enemy_1165_duhond':
		case 'enemy_1165_duhond_2':
			return 'Run_Loop';

		case 'enemy_1327_cbrokt':
		case 'enemy_1327_cbrokt_2':
		case 'enemy_1412_mmjump':
		case 'enemy_1412_mmjump_2':
		case 'enemy_1425_lrcmra':
		case 'enemy_1425_lrcmra_2':
		case 'enemy_1506_patrt':
			return 'Move_1';

		case 'enemy_1158_divman':
		case 'enemy_1158_divman_2':
		case 'enemy_1171_durokt':
		case 'enemy_1171_durokt_2':
		case 'enemy_2014_csicer':
			return 'Move01';

		case 'enemy_1500_skulsr':
		case 'enemy_2004_balloon':
		case 'enemy_2025_syufo':
			return 'Move_01';

		case 'enemy_2070_skzfbx':
		case 'enemy_2084_skzcan':
			return 'Move1';

		case 'enemy_1388_wingnt':
		case 'enemy_2092_skzamy':
			return 'A_Move';

		case 'enemy_1143_merrpg':
		case 'enemy_1143_merrpg_2':
		case 'enemy_1271_nhkodo':
		case 'enemy_1271_nhkodo_2':
		case 'enemy_2055_smlead':
		case 'enemy_1311_mhkryk':
		case 'enemy_1314_wdnjd':
		case 'enemy_1316_wdpjd':
		case 'enemy_1315_wdyjd':
			return 'Move_A';

		case 'enemy_1418_mmkonm':
		case 'enemy_1418_mmkonm_2':
			return 'Move_b';

		case 'enemy_1311_mhkryk_2':
			return 'Move_B';

		case 'enemy_1135_redman':
		case 'enemy_1135_redman_2':
		case 'enemy_2089_skzjkl':
			return 'C_Move';

		case 'enemy_1516_jakill':
		case 'enemy_2037_sygirl':
		case 'enemy_2081_skztxs':
		case 'enemy_2082_skzdd':
			return 'C1_Move';

		case 'enemy_1384_winfrz':
			return 'C2_Move';

		case 'enemy_1267_nhpbr':
		case 'enemy_1267_nhpbr_2':
			return 'F_Move';

		default:
			return 'Move_Loop';
	}
}
export function getAnimDuration(skel, animName) {
	if(!skel) return;
	return (
		skel.state.data.skeletonData.animations.find((ele) => ele.name === animName)?.duration || 0
	);
}

export function getSkillAnimName(skel, enemyKey, skillKey) {
	if(!skel) return;
	if (skel.state.hasAnimation('Skill_Loop')) {
		return 'Skill_Loop';
	}
	switch (skillKey) {
		case 'mzk_extra_summon':
			return 'Skill_1_Loop';
		default:
			break;
	}
}
