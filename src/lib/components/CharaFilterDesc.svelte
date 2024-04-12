<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	export let filterOptions, language: Language;

	const defaultLine = translations[language].chara_filter_start;

	const debuffKeys = ['status_ailment', 'debuffs'];
	const buffKeys = ['buffs'];

	let line = defaultLine;

	const getReplaceOperatorFlag = (language, text) => {
		switch (language) {
			case 'en':
				return text.includes('<profession>') && text.includes('<subProfessionId>');
			case 'zh':
			case 'ja':
				return text.includes('<subProfessionId>');
		}
	};

	filterOptions.subscribe((options) => {
		const activeOptions = options.reduce((acc, curr) => {
			if (curr.options.some((ele) => ele.selected) && !curr.options.every((ele) => ele.selected)) {
				acc.push(curr);
			}
			return acc;
		}, []);
		line = generateDesc(activeOptions);
	});

	function generateDesc(activeOptions) {
		if (activeOptions.length === 0) {
			return defaultLine;
		}
		let text = translations[language].chara_filter_desc;
		//1. replace active keys
		for (const ele of activeOptions) {
			let value = ele.options
				.map(({ value, selected }) => selected && translations[language][value])
				.filter(Boolean)
				.join('/');
			let key = ele.key;
			if (debuffKeys.includes(ele.key)) {
				key = 'skills';
			}
			switch (key) {
				case 'skills':
					value =
						translations[language]['chara_filter']['skills_pre'] +
						value +
						translations[language]['chara_filter']['skills_post_e'];
					break;
				case 'nationId':
					value = translations[language]['chara_filter']['nation_pre'] + value;
					break;
				case 'groupId':
					value = translations[language]['chara_filter']['group_pre'] + value;
					break;
				default:
					break;
			}
			if (key === 'skills') {
			}
			text = text.replace(`<${key}>`, value);
		}
		let replaceOperatorFlag = getReplaceOperatorFlag(language, text);
		if (replaceOperatorFlag) {
			text = text.replace('<operator>', translations[language].operator);
		}
		//2. remove absent keys
		const regex = /<\w+>/g;
		text = text.replaceAll(regex, '');
		return text;
	}
</script>

<div class="fixed bottom-0 text-center w-full md:w- p-4 bg-white text-subheading text-black">
	{line}
</div>
