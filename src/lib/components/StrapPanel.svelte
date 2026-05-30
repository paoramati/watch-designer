<script lang="ts">
	import type { WatchConfig } from '$lib/watch';
	import { strapColors, applyAiToStrap } from '$lib/watch';
	import AiPromptRow from './AiPromptRow.svelte';

	let { config }: { config: WatchConfig } = $props();

	async function handleAi(desc: string) {
		await new Promise((r) => setTimeout(r, 1000));
		applyAiToStrap(config, desc);
	}

	const styleOptions = [
		{ val: 'leather', label: 'Leather' },
		{ val: 'rubber', label: 'Rubber' },
		{ val: 'nato', label: 'NATO' },
		{ val: 'bracelet', label: 'Bracelet' }
	] as const;
</script>

<div class="flex flex-row flex-wrap gap-8 border-t bg-white p-4">
	<!-- Style -->
	<div>
		<p class="mb-1 text-xs tracking-wider text-slate-400 uppercase">Style</p>
		<div class="flex gap-1">
			{#each styleOptions as opt (opt.val)}
				<button
					onclick={() => (config.strap.style = opt.val)}
					class="rounded border px-2 py-1.5 text-xs transition-colors {config.strap.style ===
					opt.val
						? 'border-slate-900 bg-slate-900 text-white'
						: 'border-slate-200 text-slate-600 hover:bg-slate-50'}"
				>
					{opt.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Colour -->
	<div>
		<p class="mb-1 text-xs tracking-wider text-slate-400 uppercase">Colour</p>
		<div class="flex flex-wrap gap-2">
			{#each strapColors as c (c.value)}
				<button
					onclick={() => (config.strap.color = c.value)}
					title={c.label}
					class="h-7 w-7 rounded-full border-2 transition-all {config.strap.color === c.value
						? 'border-slate-900 ring-2 ring-slate-900 ring-offset-1'
						: 'border-transparent hover:scale-110'}"
					style="background-color: {c.value}"
				></button>
			{/each}
		</div>
	</div>

	<!-- AI -->
	<div class="flex items-end">
		<AiPromptRow onApply={handleAi} />
	</div>
</div>
