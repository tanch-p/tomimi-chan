/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'hallu-red': '#4b0505',
				'ph-bg': '#131313',
				'phys-hl': '#f56a14',
				'arts-hl': '#2467ed',
				'true-hl': '#9b23db'
			}
		}
	},
	plugins: []
};
