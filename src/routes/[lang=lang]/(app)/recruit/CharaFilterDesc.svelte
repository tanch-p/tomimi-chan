<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { filtersStore } from './stores';
	export let language: Language;

	$: defaultLine = translations[language].chara_filter_start;

	const debuffKeys = ['status_ailment', 'debuff'];
	const buffKeys = ['buff'];

	$: line = defaultLine;

	const getReplaceOperatorFlag = (language, text) => {
		switch (language) {
			case 'en':
				return text.includes('<profession>') && text.includes('<subProfessionId>');
			case 'zh':
			case 'ja':
				return text.includes('<subProfessionId>');
		}
	};

	filtersStore.subscribe((options) => {
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
						translations[language]['chara_filter']['skills_post'];
					break;
				case 'nationId':
					value =
						translations[language]['chara_filter']['nation_pre'] +
						value +
						translations[language]['chara_filter']['nation_post'];
					break;
				case 'group':
					value =
						translations[language]['chara_filter']['group_pre'] +
						value +
						translations[language]['chara_filter']['group_post'];
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
		//2. replace connectors
		if (language === 'zh') {
			const nationFlag = activeOptions.find((ele) => ele.key === 'nationId');
			const groupFlag = activeOptions.find((ele) => ele.key === 'group');
			const skillFlag = activeOptions.find((ele) => debuffKeys.includes(ele.key));
			if ((groupFlag || nationFlag) && skillFlag) {
				text = text.replace('<connector_2>', translations[language]['chara_filter'].connector_and);
			}
			if ((groupFlag || nationFlag) && !skillFlag) {
				text = text.replace('<connector_2>', translations[language]['chara_filter'].connector);
			}
			if (groupFlag && nationFlag) {
				text = text.replace('<connector_1>', translations[language]['chara_filter'].connector_and);
			}
			if (skillFlag) {
				text = text.replace('<connector_skill>', translations[language]['chara_filter'].connector);
			}
		} else if (language === 'ja') {
			const nationFlag = activeOptions.find((ele) => ele.key === 'nationId');
			const groupFlag = activeOptions.find((ele) => ele.key === 'group');
			if (groupFlag && nationFlag) {
				text = text.replace('<connector_1>', translations[language]['chara_filter'].connector_and);
			}
			if (groupFlag || nationFlag) {
				text = text.replace('<connector_2>', translations[language]['chara_filter'].connector);
			}
		}

		//3. remove absent keys
		const regex = /<\w+>/g;
		text = text.replaceAll(regex, '');
		return text;
	}
</script>

<div class="fixed bottom-0 w-full md:w- p-4 bg-[#333] text-lg md:text-2xl text-near-white text-center">
	{line}
</div>
