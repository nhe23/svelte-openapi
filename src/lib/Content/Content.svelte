<script lang="ts">
	import { marked } from 'marked';
	import type { OpenAPI } from 'openapi-types';
	import ContentItem from './ContentItem.svelte';
	export let spec: OpenAPI.Document<{}>;
</script>

<div id="content" class="w-full  min-h-screen relative">
	<ContentItem>
		<div slot="left" class="p-8">
			<h1 class="text-4xl mb-2">
				{spec.info.title} ({spec.info.version})
			</h1>
			<div>{spec.info.license}</div>
			<div>{@html marked.parse(spec?.info?.description ?? '')}</div>
		</div>
		<div slot="right" class="relative z-10 p-8">Try it</div>
	</ContentItem>
	<div
		class="invisible md:visible absolute top-0 right-0 bg-slate-800 rightColumnBackground h-screen"
	/>
</div>

<style lang="postcss">
	.rightColumnBackground {
		width: calc(40%);
	}
</style>
