<script lang="ts">
	import type { OpenAPI } from 'openapi-types';
	import Content from './Content/Content.svelte';
	import Menu from './Menu/Menu.svelte';
	import { getTagsWithPathes } from './utils/specTransformer';
	export let spec: OpenAPI.Document<{}>;

	let showMenu = false;

	$: tagsWithEndpoints = getTagsWithPathes(spec) 
</script>

<div id="openapi" class="drawer drawer-mobile">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked={showMenu} />
	<div class="drawer-content flex flex-col">
		<button
			class="btn btn-circle lg:hidden  absolute bottom-4 left-4 z-10"
			on:click={() => {
				showMenu = true;
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/></svg
			>
		</button>

		<Content {spec} {tagsWithEndpoints}/>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay" />
		<div class="menu w-80 bg-base-300">
			<!-- Sidebar content here -->
			<Menu {spec} {tagsWithEndpoints}/>
		</div>
	</div>
</div>
