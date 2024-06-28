<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { filtersStore, filterModeStore } from './stores';
	import { generateSkillDesc, getDisplayKey } from '$lib/functions/charaHelpers';
	import TextParser from '$lib/components/TextParser.svelte';
	export let language: Language;

	$: defaultLine = translations[language].chara_filter_start;

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
	const getInnerConnectorString = (key) => {
		switch (key) {
			case 'deployable_tile':
				return '/';

			default:
				$filterModeStore === 'OR' ? '/' : translations[language].chara_filter.connector_and;
		}
	};
	filtersStore.subscribe((list) => {
		const activeOptions = list.filter(({ options }) => options.some((val) => val.selected));
		line = generateDesc(activeOptions);
	});

	function generateDesc(activeOptions) {
		if (activeOptions.length === 0) {
			return defaultLine;
		}
		let text = translations[language].chara_filter_desc;
		//1. replace active keys
		const bbTagHolder = [];
		const otherOptions = [];
		for (const ele of activeOptions) {
			if (['tags', 'blackboard', 'blockCnt'].includes(ele.key)) {
				bbTagHolder.push(
					...ele.options
						.map(({ value, selected }) => selected && value)
						.filter((val) => val === 0 || Boolean(val))
				);
			} else {
				otherOptions.push(ele.options);
			}
			// let value = ele.options
			// 	.map(({ value, selected }) => {
			// 		const key = getDisplayKey(value);
			// 		return (
			// 			selected &&
			// 			(translations[language].table_headers[key] ??
			// 				translations[language][key] ??
			// 				translations[language].types[key])
			// 		);
			// 	})
			// 	.filter(Boolean)
			// 	.join(getInnerConnectorString(ele.key));
			// let key = ele.key;
			// console.log(value);
			// switch (key) {
			// 	case 'tags':
			// 	case 'blackboard':
			// 		value =
			// 			translations[language]['chara_filter']['skills_pre'] +
			// 			value +
			// 			translations[language]['chara_filter']['skills_post'];
			// 		break;
			// 	default:
			// 		value =
			// 			(translations[language]['chara_filter']?.[`${key}_pre`] ?? '') +
			// 			'#b' +
			// 			value +
			// 			'b#' +
			// 			(translations[language]['chara_filter']?.[`${key}_post`] ?? '');
			// 		break;
			// }
			// if (key === 'skills') {
			// }
			// text = text.replace(`<${key}>`, value);
		}
		console.log(bbTagHolder);
		const skillDesc = generateSkillDesc(bbTagHolder, language, $filterModeStore);
		console.log(skillDesc);
		text = text.replace(`<skill>`, skillDesc);
		let replaceOperatorFlag = getReplaceOperatorFlag(language, text);
		if (replaceOperatorFlag) {
			text = text.replace('<operator>', translations[language].operator);
		}
		//2. replace connectors
		if (language === 'zh') {
			const nationFlag = activeOptions.find((ele) => ele.key === 'nationId');
			const groupFlag = activeOptions.find((ele) => ele.key === 'group');
			const abilityFlag = activeOptions.find((ele) =>
				['deployable_tile', 'tags', 'blackboard', 'blockCnt'].includes(ele.key)
			);
			if ((groupFlag || nationFlag) && abilityFlag) {
				text = text.replace('<connector_2>', translations[language]['chara_filter'].connector_and);
			}
			if ((groupFlag || nationFlag) && !abilityFlag) {
				text = text.replace('<connector_2>', translations[language]['chara_filter'].connector);
			}
			if (groupFlag && nationFlag) {
				text = text.replace('<connector_1>', translations[language]['chara_filter'].connector_and);
			}
			if (abilityFlag) {
				text = text.replace('<connector>', translations[language]['chara_filter'].connector);
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

<div
	class="fixed z-10 bottom-0 w-full p-4 bg-[#333] text-lg md:text-2xl text-near-white text-center"
>
	<TextParser {line} />
</div>
