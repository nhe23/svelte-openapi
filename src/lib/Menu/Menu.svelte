<script lang="ts">
	import type { TagWithEndpoints } from '$lib/utils/specTransformer';
	import type { OpenAPI } from 'openapi-types';
	export let spec: OpenAPI.Document<{}>;
	export let tagsWithEndpoints: Array<TagWithEndpoints>;

	const getActiveTag = () => {
		return window.location.hash.split('/')[1];
	};

	let activeTag = getActiveTag();
</script>

<svelte:window
	on:hashchange={() => {
		console.log(window.location.hash);
		if (window.location.hash.startsWith('#tag')) {
			activeTag = getActiveTag();
		}
	}}
/>

{#each tagsWithEndpoints as tagWithEndpoints}
	<div class="collapse collapse-arrow">
		<input type="checkbox" class="peer" checked={activeTag === tagWithEndpoints.tag.name} />
		<div class="collapse-title peer-checked:bg-base-200">
			{tagWithEndpoints.tag.name}
		</div>

		<div class="collapse-content ">
			{#each tagWithEndpoints.endpoints as tagEndpoint}
				<a href={`#tag/${tagWithEndpoints.tag.name}/operation/${tagEndpoint.operationId}`}
					><div class="py-2">
						<span> {tagEndpoint.summary}</span>
					</div></a
				>
			{/each}
		</div>
	</div>
{/each}
