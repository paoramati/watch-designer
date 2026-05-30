<script lang="ts">
	import type { WatchConfig } from '$lib/watch';
	import { sizeToRadius } from '$lib/watch';

	let { config }: { config: WatchConfig } = $props();

	const r = $derived(sizeToRadius[config.case.size]);

	const strapTopHeight = $derived(210 - r + 12);
	const strapBottomY = $derived(210 + r - 12);
	const strapBottomHeight = $derived(420 - strapBottomY);

	// Case shape paths
	const caseShape = $derived(
		config.case.shape === 'round'
			? { type: 'circle', r }
			: config.case.shape === 'square'
				? { type: 'rect', x: 150 - r, y: 210 - r, w: r * 2, h: r * 2, rx: 8 }
				: { type: 'rect', x: 150 - r * 0.85, y: 210 - r, w: r * 1.7, h: r * 2, rx: r * 0.45 }
	);

	const dialShape = $derived(
		config.case.shape === 'round'
			? { type: 'circle', r: r - 8 }
			: config.case.shape === 'square'
				? {
						type: 'rect',
						x: 150 - (r - 8),
						y: 210 - (r - 8),
						w: (r - 8) * 2,
						h: (r - 8) * 2,
						rx: 4
					}
				: {
						type: 'rect',
						x: 150 - (r - 8) * 0.85,
						y: 210 - (r - 8),
						w: (r - 8) * 1.7,
						h: (r - 8) * 2,
						rx: (r - 8) * 0.45
					}
	);

	// Marker positions
	const markers = $derived(
		Array.from({ length: 12 }, (_, i) => {
			const angleRad = ((i * 30 - 90) * Math.PI) / 180;
			const outerR = r - 8;
			const innerR = r - 22;
			const textR = r - 30;
			return {
				i,
				ox: 150 + outerR * Math.cos(angleRad),
				oy: 210 + outerR * Math.sin(angleRad),
				ix: 150 + innerR * Math.cos(angleRad),
				iy: 210 + innerR * Math.sin(angleRad),
				tx: 150 + textR * Math.cos(angleRad),
				ty: 210 + textR * Math.sin(angleRad)
			};
		})
	);

	const romanNumerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

	// Hand lengths
	const hourLen = $derived(r * 0.52);
	const minLen = $derived(r * 0.72);
	const secLen = $derived(r * 0.82);

	// Sword hand points
	const hourSwordPts = $derived(
		`150,${210 - hourLen} ${150 + 3.5},${210} 150,${210 + 14} ${150 - 3.5},${210}`
	);
	const minSwordPts = $derived(
		`150,${210 - minLen} ${150 + 2.5},${210} 150,${210 + 12} ${150 - 2.5},${210}`
	);

	// Dauphine hand points
	const hourDauphinePts = $derived(
		`150,${210 - hourLen} ${150 + 4},${210 - hourLen * 0.25} 150,${210 + 14} ${150 - 4},${210 - hourLen * 0.25}`
	);
	const minDauphinePts = $derived(
		`150,${210 - minLen} ${150 + 3},${210 - minLen * 0.25} 150,${210 + 12} ${150 - 3},${210 - minLen * 0.25}`
	);

	// Bracelet strap segment count
	const braceletSegments = 7;
</script>

<svg viewBox="0 0 300 420" width="300" height="420" xmlns="http://www.w3.org/2000/svg">
	<!-- Strap top -->
	{#if config.strap.style === 'nato'}
		<rect x="118" y="0" width="64" height={strapTopHeight} rx="6" fill={config.strap.color} />
		<!-- NATO horizontal band -->
		<rect
			x="110"
			y={strapTopHeight - 18}
			width="80"
			height="10"
			rx="3"
			fill={config.strap.color}
			opacity="0.7"
		/>
	{:else if config.strap.style === 'bracelet'}
		{#each Array.from({ length: braceletSegments }) as _, si (si)}
			{@const segH = strapTopHeight / braceletSegments}
			<rect
				x="118"
				y={si * segH}
				width="64"
				height={segH - 1}
				rx="3"
				fill={si % 2 === 0 ? config.strap.color : config.strap.color + 'cc'}
			/>
		{/each}
	{:else}
		<rect x="118" y="0" width="64" height={strapTopHeight} rx="6" fill={config.strap.color} />
	{/if}

	<!-- Strap bottom -->
	{#if config.strap.style === 'nato'}
		<rect
			x="118"
			y={strapBottomY}
			width="64"
			height={strapBottomHeight}
			rx="6"
			fill={config.strap.color}
		/>
		<!-- NATO horizontal band bottom -->
		<rect
			x="110"
			y={strapBottomY + 8}
			width="80"
			height="10"
			rx="3"
			fill={config.strap.color}
			opacity="0.7"
		/>
	{:else if config.strap.style === 'bracelet'}
		{#each Array.from({ length: braceletSegments }) as _, si (si)}
			{@const segH = strapBottomHeight / braceletSegments}
			<rect
				x="118"
				y={strapBottomY + si * segH}
				width="64"
				height={segH - 1}
				rx="3"
				fill={si % 2 === 0 ? config.strap.color : config.strap.color + 'cc'}
			/>
		{/each}
	{:else}
		<rect
			x="118"
			y={strapBottomY}
			width="64"
			height={strapBottomHeight}
			rx="6"
			fill={config.strap.color}
		/>
	{/if}

	<!-- Case -->
	{#if caseShape.type === 'circle'}
		<circle
			cx="150"
			cy="210"
			r={caseShape.r}
			fill={config.case.color}
			stroke={config.case.color}
			stroke-width="6"
		/>
	{:else}
		<rect
			x={caseShape.x}
			y={caseShape.y}
			width={caseShape.w}
			height={caseShape.h}
			rx={caseShape.rx}
			fill={config.case.color}
			stroke={config.case.color}
			stroke-width="6"
		/>
	{/if}

	<!-- Dial -->
	{#if dialShape.type === 'circle'}
		<circle cx="150" cy="210" r={dialShape.r} fill={config.dial.color} />
	{:else}
		<rect
			x={dialShape.x}
			y={dialShape.y}
			width={dialShape.w}
			height={dialShape.h}
			rx={dialShape.rx}
			fill={config.dial.color}
		/>
	{/if}

	<!-- Markers -->
	{#if config.dial.markers !== 'none'}
		{#each markers as m (m.i)}
			{#if config.dial.markers === 'indices'}
				<line
					x1={m.ox}
					y1={m.oy}
					x2={m.ix}
					y2={m.iy}
					stroke={config.dial.handsColor}
					stroke-width={m.i % 3 === 0 ? 2.5 : 1.5}
				/>
			{:else if config.dial.markers === 'dots'}
				<circle cx={m.ix} cy={m.iy} r={m.i % 3 === 0 ? 4 : 2.5} fill={config.dial.handsColor} />
			{:else if config.dial.markers === 'arabic'}
				<text
					x={m.tx}
					y={m.ty}
					text-anchor="middle"
					dominant-baseline="central"
					font-size="11"
					font-family="serif"
					fill={config.dial.handsColor}>{m.i === 0 ? 12 : m.i}</text
				>
			{:else if config.dial.markers === 'roman'}
				<text
					x={m.tx}
					y={m.ty}
					text-anchor="middle"
					dominant-baseline="central"
					font-size="9"
					font-family="serif"
					fill={config.dial.handsColor}>{romanNumerals[m.i]}</text
				>
			{/if}
		{/each}
	{/if}

	<!-- Hands -->
	{#if config.dial.hands === 'sword'}
		<!-- Hour -->
		<polygon
			points={hourSwordPts}
			fill={config.dial.handsColor}
			transform="rotate(305, 150, 210)"
		/>
		<!-- Minute -->
		<polygon points={minSwordPts} fill={config.dial.handsColor} transform="rotate(60, 150, 210)" />
	{:else if config.dial.hands === 'dauphine'}
		<!-- Hour -->
		<polygon
			points={hourDauphinePts}
			fill={config.dial.handsColor}
			transform="rotate(305, 150, 210)"
		/>
		<!-- Minute -->
		<polygon
			points={minDauphinePts}
			fill={config.dial.handsColor}
			transform="rotate(60, 150, 210)"
		/>
	{:else if config.dial.hands === 'baton'}
		<!-- Hour -->
		<line
			x1="150"
			y1={210 + 12}
			x2="150"
			y2={210 - hourLen}
			stroke={config.dial.handsColor}
			stroke-width="5"
			stroke-linecap="round"
			transform="rotate(305, 150, 210)"
		/>
		<!-- Minute -->
		<line
			x1="150"
			y1={210 + 10}
			x2="150"
			y2={210 - minLen}
			stroke={config.dial.handsColor}
			stroke-width="3.5"
			stroke-linecap="round"
			transform="rotate(60, 150, 210)"
		/>
	{/if}

	<!-- Second hand -->
	<line
		x1="150"
		y1={210 + 20}
		x2="150"
		y2={210 - secLen}
		stroke="#CC2200"
		stroke-width="1.5"
		stroke-linecap="round"
		transform="rotate(180, 150, 210)"
	/>

	<!-- Center cap -->
	<circle cx="150" cy="210" r="5" fill={config.dial.handsColor} />
	<circle cx="150" cy="210" r="2.5" fill="white" />
</svg>
