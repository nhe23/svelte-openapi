<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import SwaggerParser from '@apidevtools/swagger-parser';
	import type { OpenAPI } from 'openapi-types';

	// import openapiTS from "openapi-typescript";
	import type { PageServerData } from './$types';
	import OpenApi from '$lib/OpenApi.svelte';

	export let data: PageServerData;
	let api: OpenAPI.Document<{}> | null = null;

	onMount(async () => {
		// let api = await SwaggerParser.parse('https://petstore.swagger.io/v2/swagger.json');
		api = await SwaggerParser.parse('https://petstore.swagger.io/v2/swagger.json');

		console.log(api);
	});
	console.log(data);
</script>



{#if api}
<OpenApi spec={data.api}/>
{/if}
