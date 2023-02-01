<script lang="ts">
	import type { OpenAPI } from 'openapi-types';
	import Content from './Content/Content.svelte';
	import Menu from './Menu/Menu.svelte';
	export let spec: OpenAPI.Document<{}>;
</script>

<div id="openapi" class="flex w-full h-full">
	<Menu {spec}/>
	<Content {spec} />
</div>
