<script lang="ts">
	import { defaultConfig } from '$lib/watch';
	import WatchFace from '$lib/components/WatchFace.svelte';
	import CasePanel from '$lib/components/CasePanel.svelte';
	import DialPanel from '$lib/components/DialPanel.svelte';
	import StrapPanel from '$lib/components/StrapPanel.svelte';
	import type { WatchConfig } from '$lib/watch';

	let config: WatchConfig = $state(structuredClone(defaultConfig));

	let watchWrapperEl = $state<HTMLDivElement | null>(null);

	function saveImage() {
		if (!watchWrapperEl) return;
		const svg = watchWrapperEl.querySelector('svg');
		if (!svg) return;
		const svgData = new XMLSerializer().serializeToString(svg);
		const blob = new Blob([svgData], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'my-watch.svg';
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<div class="flex min-h-screen flex-col bg-slate-50">
	<header class="flex items-center justify-between border-b bg-white px-6 py-3">
		<h1 class="text-lg font-semibold tracking-tight">Watch Designer</h1>
	</header>

	<!-- Main 3-column layout -->
	<div class="flex flex-1 flex-col overflow-hidden md:flex-row">
		<!-- Left: Case panel -->
		<div class="w-full shrink-0 border-b bg-white md:w-56 md:border-r md:border-b-0">
			<CasePanel {config} />
		</div>

		<!-- Center: Watch preview -->
		<div class="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-50 p-6">
			<div bind:this={watchWrapperEl}>
				<WatchFace {config} />
			</div>
			<div class="flex gap-3">
				<button
					onclick={saveImage}
					class="rounded-md bg-slate-900 px-4 py-2 text-sm text-white transition-colors hover:bg-slate-700"
				>
					Save image
				</button>
				<button
					disabled
					class="cursor-not-allowed rounded-md bg-slate-100 px-4 py-2 text-sm text-slate-400"
				>
					Order — coming soon
				</button>
			</div>
		</div>

		<!-- Right: Dial panel -->
		<div class="w-full shrink-0 border-t bg-white md:w-56 md:border-t-0 md:border-l">
			<DialPanel {config} />
		</div>
	</div>

	<!-- Bottom: Strap panel -->
	<div class="shrink-0 border-t bg-white">
		<StrapPanel {config} />
	</div>
</div>
