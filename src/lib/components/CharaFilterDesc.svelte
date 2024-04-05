<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	export let filterOptions, language: Language;

	const defaultLine = translations[language].chara_filter_start;

	const skillKeys = ['status_ailment'];

	$: line = defaultLine;

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
			if (skillKeys.includes(ele.key)) {
				key = 'skills';
			}
			if (key === 'skills') {
				value =
					translations[language]['chara_filter']['skills_pre'] +
					value +
					translations[language]['chara_filter']['skills_post_e'];
			}
			text = text.replace(`<${key}>`, value);
		}
		if (!(language === 'en' && !text.includes('<profession>'))) {
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
