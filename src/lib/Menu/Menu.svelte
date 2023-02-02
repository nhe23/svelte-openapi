<script lang="ts">
	import type { OpenAPI } from 'openapi-types';
	import type { OperationObject } from 'openapi-typescript';
	export let spec: OpenAPI.Document<{}>;

	$: tags = spec.tags ?? [];

	const getActiveTag = () => {
		return window.location.hash.split('/')[1];
	};

	let activeTag = getActiveTag();

	const getPathsForTag = (tag: string) => {
		const tagEndpoints: Array<OperationObject> = [];
		if (spec && spec.paths) {
			const pathKeys = Object.keys(spec.paths);

			for (const pathKey of pathKeys) {
				const path = spec.paths[pathKey];
				if (!path) continue;

				if (path.get?.tags?.find((t) => t === tag)) tagEndpoints.push(path.get as OperationObject);
				if (path.post?.tags?.find((t) => t === tag))
					tagEndpoints.push(path.post as OperationObject);
				if (path.put?.tags?.find((t) => t === tag)) tagEndpoints.push(path.put as OperationObject);
				if (path.delete?.tags?.find((t) => t === tag))
					tagEndpoints.push(path.delete as OperationObject);
				if (path.options?.tags?.find((t) => t === tag))
					tagEndpoints.push(path.options as OperationObject);
				if (path.head?.tags?.find((t) => t === tag))
					tagEndpoints.push(path.head as OperationObject);
			}
		}

		return tagEndpoints;
	};
</script>

<svelte:window
	on:hashchange={() => {
		console.log(window.location.hash);
		if (window.location.hash.startsWith('#tag')) {
			activeTag = getActiveTag();
		}
	}}
/>

{#each tags as tag}
	<div class="collapse collapse-arrow">
		<input type="checkbox" class="peer" checked={activeTag === tag.name} />
		<div class="collapse-title peer-checked:bg-base-200">
			{tag.name}
		</div>

		<div class="collapse-content ">
			{#each getPathsForTag(tag.name) as tagEndpoint}
				<a href={`#tag/${tag.name}/${tagEndpoint.operationId}`}
					><div class="py-2">
						<span> {tagEndpoint.summary}</span>
					</div></a
				>
			{/each}
		</div>
	</div>
{/each}
