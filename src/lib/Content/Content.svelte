<script lang="ts">
	import type { TagWithEndpoints } from '$lib/utils/specTransformer';
	import { marked } from 'marked';
	import type { OpenAPI } from 'openapi-types';
	import ContentItem from './ContentItem.svelte';
	export let spec: OpenAPI.Document<{}>;
	export let tagsWithEndpoints: TagWithEndpoints[];
</script>

<div id="content" class="w-full  min-h-screen relative">
	<ContentItem>
		<div slot="left">
			<h1 class="text-4xl mb-2">
				{spec.info.title} ({spec.info.version})
			</h1>
			<div>{spec.info.license}</div>
			<div>{@html marked.parse(spec?.info?.description ?? '')}</div>
		</div>
		<div slot="right" class="relative z-10 p-8">Try it</div>
	</ContentItem>
	{#each tagsWithEndpoints as tagWithEndpoints}
		<ContentItem><div slot="left" id={`tag/${tagWithEndpoints.tag.name}`}>
			<h2 class="text-3xl">{tagWithEndpoints.tag.name}</h2>
			<div>{tagWithEndpoints.tag.description}</div>
			</div>
		</ContentItem>
		{#each tagWithEndpoints.endpoints as endpoint}
			<ContentItem>
				<div slot="left" id={`tag/${tagWithEndpoints.tag.name}/operation/${endpoint.operationId}`}>
					<h3 class="text-2xl" >{endpoint.summary}</h3>
				</div>
			</ContentItem>
		{/each}
	{/each}
	<div
		class="invisible md:visible absolute top-0 right-0 bg-slate-800 rightColumnBackground h-screen"
	/>
</div>

<style lang="postcss">
	.rightColumnBackground {
		width: calc(40%);
	}
</style>
