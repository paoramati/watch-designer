<script lang="ts">
	let { onApply }: { onApply: (description: string) => Promise<void> } = $props();

	let open = $state(false);
	let description = $state('');
	let loading = $state(false);

	async function handleApply() {
		if (!description.trim()) return;
		loading = true;
		await onApply(description);
		loading = false;
		open = false;
		description = '';
	}
</script>

{#if !open}
	<button
		onclick={() => (open = true)}
		class="text-xs text-slate-500 underline decoration-dotted underline-offset-2 transition-colors hover:text-slate-700"
	>
		✦ Describe instead
	</button>
{:else}
	<div class="flex flex-col gap-2">
		<textarea
			bind:value={description}
			rows="3"
			placeholder="Describe what you want..."
			class="w-full resize-none rounded border border-slate-200 px-2 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none"
		></textarea>
		<div class="flex gap-2">
			<button
				onclick={handleApply}
				disabled={loading}
				class="flex-1 rounded bg-slate-900 px-3 py-1.5 text-xs text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? 'Thinking...' : 'Apply'}
			</button>
			<button
				onclick={() => {
					open = false;
					description = '';
				}}
				class="rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition-colors hover:bg-slate-50"
			>
				Cancel
			</button>
		</div>
	</div>
{/if}
