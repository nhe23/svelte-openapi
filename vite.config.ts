import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const config: UserConfig = {
	plugins: [
		nodePolyfills({
			// Whether to polyfill `node:` protocol imports.
			protocolImports: true
		}),
		sveltekit()
	]
};

export default config;
