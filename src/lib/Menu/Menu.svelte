<script lang="ts">
	import type { OpenAPI } from 'openapi-types';
	import type { OperationObject } from 'openapi-typescript';
	export let spec: OpenAPI.Document<{}>;

	$: tags = spec.tags ?? [];

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
			}
		}
		console.log(tagEndpoints);
		return tagEndpoints;
	};
</script>

<div id="menu" class="w-full sm:w-72 h-screen bg-slate-100">
	{#each tags as tag}
		<div class="collapse collapse-arrow">
			<input type="checkbox" class="peer" />
			<div class="collapse-title peer-checked:bg-slate-200">
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
</div>
