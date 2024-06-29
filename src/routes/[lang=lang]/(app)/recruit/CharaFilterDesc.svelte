<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { filterDescStore } from './stores';
	import { getDisplayKey } from '$lib/functions/charaHelpers';
	import TextParser from '$lib/components/TextParser.svelte';
	import { generateSkillDesc } from '$lib/functions/filterDescHelpers';
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
	filterDescStore.subscribe(({ activeOptions, relicActiveOptions, filterMode, rogueTopic }) => {
		line = generateDesc(activeOptions, relicActiveOptions, filterMode, rogueTopic);
	});

	function generateDesc(activeOptions, relicActiveOptions, filterMode, rogueTopic) {
		if (activeOptions.length === 0 && relicActiveOptions.length === 0) {
			return defaultLine;
		}
		let text = translations[language].chara_filter_desc;
		//1. replace active keys
		const bbTagHolder = [];
		for (const ele of activeOptions) {
			if (['tags', 'blackboard', 'blockCnt'].includes(ele.key)) {
				bbTagHolder.push(
					...ele.options
						.map(({ value, selected }) => selected && value)
						.filter((val) => val === 0 || Boolean(val))
				);
			} else {
				let value = ele.options
					.map(({ value, selected }) => {
						const key = getDisplayKey(value);
						return (
							selected &&
							(translations[language].table_headers[key] ??
								translations[language][key] ??
								translations[language].types[key])
						);
					})
					.filter(Boolean)
					.join('/');
				let key = ele.key;
				value =
					(translations[language]['chara_filter']?.[`${key}_pre`] ?? '') +
					'<@bluehl>' +
					value +
					'</>' +
					(translations[language]['chara_filter']?.[`${key}_post`] ?? '');

				text = text.replace(`<${key}>`, value);
			}
		}
		const skillDesc = generateSkillDesc(
			bbTagHolder,
			language,
			filterMode,
			relicActiveOptions,
			rogueTopic
		);
		text = text.replace(`<skill>`, skillDesc);
		let replaceOperatorFlag = getReplaceOperatorFlag(language, text);
		if (replaceOperatorFlag) {
			text = text.replace('<operator>', translations[language].operator);
		}
		//2. replace connectors
		if (language === 'zh') {
			const nationFlag = activeOptions.find((ele) => ele.key === 'nationId');
			const groupFlag = activeOptions.find((ele) => ele.key === 'group');
			const abilityFlag =
				activeOptions.find((ele) =>
					['deployable_tile', 'tags', 'blackboard', 'blockCnt'].includes(ele.key)
				) || relicActiveOptions.length > 0;
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
