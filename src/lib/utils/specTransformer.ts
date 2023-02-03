import type { OpenAPI, OpenAPIV2, OpenAPIV3 } from 'openapi-types';

export interface TagWithEndpoints {
	tag: OpenAPIV2.TagObject | OpenAPIV3.TagObject;
	endpoints: Array<OpenAPI.Operation>;
}

export const getTagsWithPathes = (spec: OpenAPI.Document<{}>): Array<TagWithEndpoints> => {
	const tagsWithPathes: Array<TagWithEndpoints> = [];
	if (!spec.tags) return tagsWithPathes;
	for (const tag of spec.tags) {
		const tagEndpoints: Array<OpenAPI.Operation> = [];
		if (spec && spec.paths) {
			const pathKeys = Object.keys(spec.paths);

			for (const pathKey of pathKeys) {
				const path = spec.paths[pathKey];
				if (!path) continue;

				if (path.get?.tags?.find((t) => t === tag.name)) tagEndpoints.push(path.get);
				if (path.post?.tags?.find((t) => t === tag.name)) tagEndpoints.push(path.post);
				if (path.put?.tags?.find((t) => t === tag.name)) tagEndpoints.push(path.put);
				if (path.delete?.tags?.find((t) => t === tag.name)) tagEndpoints.push(path.delete);
				if (path.options?.tags?.find((t) => t === tag.name)) tagEndpoints.push(path.options);
				if (path.head?.tags?.find((t) => t === tag.name)) tagEndpoints.push(path.head);
			}
		}
		tagsWithPathes.push({ tag, endpoints: tagEndpoints });
	}
	return tagsWithPathes;
};
