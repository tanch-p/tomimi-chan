<!--@component
Provides a list of svg icons that can be referenced through the `Icon` component
-->
<div style="display: none">
	<!-- wrapper div allows use of innerHTML -->
	<svg>
		<rect id="sq-blue" fill="#27a6f3" width="22" height="22" />
		<rect id="sq-outline" fill="none" stroke="gray" stroke-width="1.5" width="22" height="22" />
		<rect id="sq-white" fill="#f6f6f6" width="10" height="10" />
		<rect
			id="sq-outline-sm"
			fill="none"
			stroke="#acacac"
			stroke-width="1.5"
			width="10"
			height="10"
		/>
		<symbol id="x-mark" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
		</symbol>
		<symbol id="clock-icon" viewBox="0 0 24 24" fill="#bababa">
			<path
				fill-rule="evenodd"
				d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
				clip-rule="evenodd"
			/>
		</symbol>
		<symbol id="trash" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width={2}
				d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
			/>
		</symbol>
		<symbol id="down-arrow" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#F2F2F2">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
			/>
		</symbol>
		<symbol
			id="right-arrow"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
			/>
		</symbol>
		<symbol
			id="down-chevron"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="6 9 12 15 18 9" />
		</symbol>
		<symbol
			id="left-chevron"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="15 18 9 12 15 6" />
		</symbol>
		<symbol
			id="icon-minus"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
		</symbol>
		<symbol id="icon-plus" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</symbol>
		<symbol id="icon-language" viewBox="0 0 20 20">
			<path
				fill="#E2E2E2"
				d="M20 18h-1.44a.61.61 0 0 1-.4-.12.81.81 0 0 1-.23-.31L17 15h-5l-1 2.54a.77.77 0 0 1-.22.3.59.59 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a11.62 11.62 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56-1.58 4.19zm-6.3-1.58a13.43 13.43 0 0 1-2.91-1.41 11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.19 17.19 0 0 1-5 2.1q.56.82.87 1.38a23.28 23.28 0 0 0 5.22-2.51 15.64 15.64 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.11 8.11 0 0 1-2.45 4.45 9.11 9.11 0 0 1-2.46-4.45z"
			/>
		</symbol>
		<symbol id="icon-list2" viewBox="0 0 32 32" fill="#ffffff">
			<path
				d="M12 2h20v4h-20v-4zM12 14h20v4h-20v-4zM12 26h20v4h-20v-4zM0 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM0 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM0 28c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4z"
			/>
		</symbol>
		<symbol id="icon-list" viewBox="0 0 32 32" fill="#ffffff">
			<path
				d="M0 0h8v8h-8zM12 2h20v4h-20zM0 12h8v8h-8zM12 14h20v4h-20zM0 24h8v8h-8zM12 26h20v4h-20z"
			/>
		</symbol>
		<symbol id="grid-view" viewBox="0 0 16 16" fill="#ffffff">
			<rect width="16" height="16" id="icon-bound" fill="none" />
			<path
				d="M1,1h4v4H1V1z M6,1h4v4H6V1z M11,1h4v4h-4V1z M1,6h4v4H1V6z M6,6h4v4H6V6z M11,6h4v4h-4V6z M1,11h4v4H1V11z M6,11h4v4H6V11z M11,11h4v4h-4V11z"
			/>
		</symbol>
		<symbol
			id="layout-view"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
			<line x1="3" y1="9" x2="21" y2="9" />
			<line x1="9" y1="21" x2="9" y2="9" />
		</symbol>
		<symbol id="refresh-icon" fill="#fff" viewBox="0 0 489.645 489.645" xml:space="preserve">
			<g>
				<path
					d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3
		c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5
		c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8
		c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2
		C414.856,432.511,548.256,314.811,460.656,132.911z"
				/>
			</g>
		</symbol>
	</svg>
</div>
