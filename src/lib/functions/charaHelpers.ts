//goes through talent and skills blackboard and gets maximum value of key
export const getMaxValue = (chara, key) =>
	Math.max(
		chara.skills.reduce((acc, curr) => {
			const value = curr.blackboard.find((ele) => ele.key === key)?.value ?? 0;
			return (acc = Math.max(acc, value));
		}, 0),
		chara.talents.reduce((acc, curr) => {
			const value = curr.blackboard.find((ele) => ele.key === key)?.value ?? 0;
			return (acc = Math.max(acc, value));
		}, 0),
		chara.uniequip
			.filter((equip) => equip.combatData)
			.reduce((acc, curr) => {
				const value = curr.combatData.blackboard.find((ele) => ele.key === key)?.value ?? 0;
				return (acc = Math.max(acc, value));
			}, 0)
	);
