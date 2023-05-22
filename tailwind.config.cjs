/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'hallu-red': '#4b0505',
				'ph-bg': '#131313',
				'phys-hl': '#FFB082',
				'arts-hl': '#A7C2FC',
				'true-hl': '#FF99CA',
				'heal-hl': '#A4F9A4',
				'near-white': '#F2F2F2'
			},
			fontSize: { subheading: '1.375rem' }
		}
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.no-scrollbar::-webkit-scrollbar': {
					display: 'none'
				},
				'.no-scrollbar': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none'
				}
			});
		})
	]
};
