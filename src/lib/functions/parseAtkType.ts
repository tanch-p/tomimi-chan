export const getAtkType = (enemy, format, row) => {
	switch (format) {
		case "prisoner":
			return row === 0 ? enemy.normal_attack : enemy.released.normal_attack;
		case "multiform":
			return enemy.normal_attack[row];
		default:
			return enemy.normal_attack;
	}
};

export const parseAtkType = (normal_attack, language, langPack) => {
	const { atk_type, hits } = normal_attack;
	if (atk_type[0] === "raw") {
		return "";
	}
	const numHits = hits === 1 ? "" : ` x ${hits}`;
	const atkType = "(".concat(
		atk_type
			.map((ele, index) => {
				const separator = language === "en" ? "/" : "・";
				return (index !== 0 ? separator : "") + langPack[ele];
			})
			.join(""),
		")"
	);
	return numHits.concat(" ", atkType);
};