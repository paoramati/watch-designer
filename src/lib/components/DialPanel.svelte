<script lang="ts">
	import type { WatchConfig } from '$lib/watch';
	import { dialColors, caseColors, applyAiToDial } from '$lib/watch';
	import AiPromptRow from './AiPromptRow.svelte';

	let { config }: { config: WatchConfig } = $props();

	async function handleAi(desc: string) {
		await new Promise((r) => setTimeout(r, 1000));
		applyAiToDial(config, desc);
	}

	const markerOptions = [
		{ val: 'indices', label: 'Indices' },
		{ val: 'arabic', label: 'Arabic' },
		{ val: 'roman', label: 'Roman' },
		{ val: 'dots', label: 'Dots' },
		{ val: 'none', label: 'None' }
	] as const;

	const handOptions = [
		{ val: 'sword', label: 'Sword' },
		{ val: 'dauphine', label: 'Dauphine' },
		{ val: 'baton', label: 'Baton' }
	] as const;
</script>

<div class="flex h-full flex-col gap-4 overflow-y-auto border-l bg-white p-4">
	<!-- Colour -->
	<div>
		<p class="mb-1 text-xs tracking-wider text-slate-400 uppercase">Colour</p>
		<div class="flex flex-wrap gap-2">
			{#each dialColors as c (c.value)}
				<button
					onclick={() => (config.dial.color = c.value)}
					title={c.label}
					class="h-7 w-7 rounded-full border-2 transition-all {config.dial.color === c.value
						? 'border-slate-900 ring-2 ring-slate-900 ring-offset-1'
						: 'border-slate-200 hover:scale-110'}"
					style="background-color: {c.value}"
				></button>
			{/each}
		</div>
	</div>

	<!-- Markers -->
	<div>
		<p class="mb-1 text-xs tracking-wider text-slate-400 uppercase">Markers</p>
		<div class="flex flex-wrap gap-1">
			{#each markerOptions as opt (opt.val)}
				<button
					onclick={() => (config.dial.markers = opt.val)}
					class="rounded border px-2 py-1.5 text-xs transition-colors {config.dial.markers ===
					opt.val
						? 'border-slate-900 bg-slate-900 text-white'
						: 'border-slate-200 text-slate-600 hover:bg-slate-50'}"
				>
					{opt.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Hands -->
	<div>
		<p class="mb-1 text-xs tracking-wider text-slate-400 uppercase">Hands</p>
		<div class="flex gap-1">
			{#each handOptions as opt (opt.val)}
				<button
					onclick={() => (config.dial.hands = opt.val)}
					class="flex-1 rounded border px-2 py-1.5 text-xs transition-colors {config.dial.hands ===
					opt.val
						? 'border-slate-900 bg-slate-900 text-white'
						: 'border-slate-200 text-slate-600 hover:bg-slate-50'}"
				>
					{opt.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Hand colour -->
	<div>
		<p class="mb-1 text-xs tracking-wider text-slate-400 uppercase">Hand colour</p>
		<div class="flex flex-wrap gap-2">
			{#each caseColors as c (c.value)}
				<button
					onclick={() => (config.dial.handsColor = c.value)}
					title={c.label}
					class="h-7 w-7 rounded-full border-2 transition-all {config.dial.handsColor === c.value
						? 'border-slate-900 ring-2 ring-slate-900 ring-offset-1'
						: 'border-transparent hover:scale-110'}"
					style="background-color: {c.value}"
				></button>
			{/each}
		</div>
	</div>

	<!-- AI -->
	<div>
		<AiPromptRow onApply={handleAi} />
	</div>
</div>
