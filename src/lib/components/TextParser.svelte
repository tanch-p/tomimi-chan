<script lang="ts">
	import { page } from '$app/stores';
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import termDesc from '$lib/data/term_desc.json';

	export let line: string,
		className: string = '';
	let language: Language = 'zh';
	$: language = $page.data.language;
	const tooltipPatterns = [
		'<ba.magicfragile>',
		'<ba.fragile>',
		'<ba.elementfragile>',
		'<ba.camou>',
		'<ba.invisible>',
		'<ba.steal>',
		'<ba.stun>',
		'<ba.sluggish>',
		'<ba.root>',
		'<ba.sleep>',
		'<ba.tremble>',
		'<ba.cold>',
		'<ba.frozen>',
		'<ba.levitate>',
		'<ba.weightless>',
		'<ba.debuff>',
		'<ba.epbarrier>',
		'<ba.protect>',
		'<ba.dying>',
		'<ba.dt.element>',
		'<ba.berserk>',
		'<ba.inspire>',
		'<ba.strong>',
		'<ba.barrier>',
		'<ba.shield>',
		'<ba.buffres>',
		'<ba.physhield>',
		'<ba.charged>',
		'<ba.overdrive>',
		'<ba.dt.apoptosis2>',
		'<ba.dt.burning2>',
		'<ba.weaken>',
		'<ba.binding>',
		'<@ba.dt.element>',
		'<@ba.dt.apoptosis>',
		'<@ba.dt.erosion>',
		'<@ba.dt.neural>',
		'<@ba.dt.burning>'
	];
	const patternsToParse = [
		{ prefix: '<@rolv.rem>', suffix: '</>', style: 'text-[#FF4C22]' },
		{ prefix: '<@ba.talpu>', suffix: '</>', style: 'text-[#0098DC]' },
		{ prefix: '<@ba.vup>', suffix: '</>', style: 'text-[#20a8EC]' },
		{ prefix: '<@ba.vdown>', suffix: '</>', style: 'text-[#FF6237]' },
		{ prefix: '<@ba.rem>', suffix: '</>', style: 'text-[#F49800]' },
		{ prefix: '<@ba.kw>', suffix: '</>', style: 'text-[#00B0FF]' },
		{ prefix: '<@bluehl>', suffix: '</>', style: 'text-[#30c8FC]' },
		{ prefix: '<@enemy>', suffix: '</>', style: 'text-[#FFA5AF]' },
		{ prefix: '<@ally>', suffix: '</>', style: 'text-[#FFC89B]' },
		{ prefix: '<@self>', suffix: '</>', style: 'text-[#C0E6FA]' },
		{ prefix: '<@purple>', suffix: '</>', style: 'text-[#A48CE7]' },
		{ prefix: '<@gold>', suffix: '</>', style: 'text-[#CDB07A]' },
		{ prefix: '<@phys>', suffix: '</>', style: 'text-[#FFB082]' },
		{ prefix: '<@arts>', suffix: '</>', style: 'text-[#A7C2FC]' },
		{ prefix: '<@true>', suffix: '</>', style: 'text-[#FF99CA]' },
		{ prefix: '<@strike>', suffix: '</>', style: 'line-through text-neutral-400' },
		{ prefix: '$', suffix: '$', style: 'text-red-400 font-semibold' }
	];

	function processText(input, pattern) {
		if (pattern.prefix === '$') {
			const regex = /\$(.*?)\$/g;
			return input.replace(regex, (match, content) => {
				return `<span class="${pattern.style}">${content}</span>`;
			});
		} else {
			const regex = new RegExp(`${pattern.prefix}(.*?)${pattern.suffix}`, 'gs');
			return input.replace(regex, (match, content) => {
				return `<span class="${pattern.style}">${content}</span>`;
			});
		}
	}
	function addTooltip(input, depth = 0) {
		if (depth > 1) return input;
		const groupStr = depth === 0 ? `group/zero` : `group/one`;
		const hoverGroupStr = depth === 0 ? `group-hover/zero:block` : `group-hover/one:block`;
		for (const pattern of tooltipPatterns) {
			const key = pattern.replace('<', '').replace('@', '').replace('>', '');
			const regex = new RegExp(`${pattern}(.*?)</>`, 'gs');
			input = input.replace(regex, (match, content) => {
				return `<div class="relative inline-block underline underline-offset-2 decoration-dotted ${groupStr}">${content}<div class="absolute hidden ${hoverGroupStr} left-[50%] -translate-x-[50%] bg-slate-300 text-[#222222] w-[220px] p-1.5 z-[1] rounded-md text-sm shadow-md">${addTooltip(
					termDesc[key][`desc_${language}`],
					depth + 1
				)}</div></div>`;
			});
		}
		return input;
	}

	const parseText = (line: string, language) => {
		line = line.replaceAll('\n', '<br/>');
		line = line.replaceAll('\\n', '<br/>');

		// for {phys}/{arts}/{true} type keys
		const regex = new RegExp(`{(.*?)}`, 'gs');
		const matches = line.match(regex);
		if (matches) {
			for (const match of matches) {
				const key = match.slice(1, -1);
				line = line.replace(
					match,
					`<@${key}>` + translations[language][key.replace('ba.dt.', '')] + '</>'
				);
			}
		}
		line = addTooltip(line);
		for (const pattern of patternsToParse) {
			line = processText(line, pattern);
		}
		return line;
	};
</script>

<div class="relative {className}">
	{@html parseText(line, language)}
</div>
