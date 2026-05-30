<script lang="ts">
	import type { WatchConfig } from '$lib/watch';
	import { caseColors, applyAiToCase } from '$lib/watch';
	import AiPromptRow from './AiPromptRow.svelte';

	let { config }: { config: WatchConfig } = $props();

	async function handleAi(desc: string) {
		await new Promise((r) => setTimeout(r, 1000));
		applyAiToCase(config, desc);
	}
</script>

<div class="flex h-full flex-col gap-4 overflow-y-auto border-r bg-white p-4">
	<!-- Shape -->
	<div>
		<p class="mb-1 text-xs tracking-wider text-slate-400 uppercase">Shape</p>
		<div class="flex gap-1">
			{#each ['round', 'square', 'barrel'] as const as shape (shape)}
				<button
					onclick={() => (config.case.shape = shape)}
					class="flex-1 rounded border px-2 py-1.5 text-xs capitalize transition-colors {config.case
						.shape === shape
						? 'border-slate-900 bg-slate-900 text-white'
						: 'border-slate-200 text-slate-600 hover:bg-slate-50'}"
				>
					{shape}
				</button>
			{/each}
		</div>
	</div>

	<!-- Size -->
	<div>
		<p class="mb-1 text-xs tracking-wider text-slate-400 uppercase">Size</p>
		<div class="flex gap-1">
			{#each [['sm', 'S'], ['md', 'M'], ['lg', 'L']] as const as [val, label] (val)}
				<button
					onclick={() => (config.case.size = val)}
					class="flex-1 rounded border px-2 py-1.5 text-xs transition-colors {config.case.size ===
					val
						? 'border-slate-900 bg-slate-900 text-white'
						: 'border-slate-200 text-slate-600 hover:bg-slate-50'}"
				>
					{label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Material -->
	<div>
		<p class="mb-1 text-xs tracking-wider text-slate-400 uppercase">Material</p>
		<div class="flex flex-wrap gap-2">
			{#each caseColors as c (c.value)}
				<button
					onclick={() => (config.case.color = c.value)}
					title={c.label}
					class="h-7 w-7 rounded-full border-2 transition-all {config.case.color === c.value
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
