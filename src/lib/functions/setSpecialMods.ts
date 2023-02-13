export const setOtherMods = (other_mods, obj) => {
	for (const key of Object.keys(obj)) {
		if (key !== "tooltip") {
			if (typeof obj[key] !== "object") {
				other_mods[key] = obj[key];
			} else {
				if (!other_mods[key]) {
					other_mods[key] = {};
				}
				setOtherMods(other_mods[key], obj[key]);
			}
		} else {
			other_mods.tooltip = obj.tooltip;
		}
	}
};