<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import SwaggerParser from '@apidevtools/swagger-parser';
	import type { OpenAPI } from 'openapi-types';

	// import openapiTS from "openapi-typescript";
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let api: OpenAPI.Document<{}> | null = null;

	onMount(async () => {
		// let api = await SwaggerParser.parse('https://petstore.swagger.io/v2/swagger.json');
		api = await SwaggerParser.parse('https://petstore.swagger.io/v2/swagger.json');

		console.log(api);
	});
	console.log(data);
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button class="btn">Test</button>

{#if api}
 {api.info.title}
{/if}
