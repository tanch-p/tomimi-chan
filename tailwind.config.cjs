/** @type {import('tailwindcss').Config} */
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
				'near-white': "#F2F2F2"
			}
		}
	},
	plugins: []
};
