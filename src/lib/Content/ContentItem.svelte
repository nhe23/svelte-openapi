<script lang="ts">
    	interface $$Slots {
		// we don't want to render a default slot
		default: never
		// the named slot exposes no variables (use an empty object)
		left: {}
		// we have to use the `$$Slots` interface if we have two slots with the same name exposing differently typed props
		right: {}
	}
</script>

<div class="w-full flex flex-wrap">
    <div class="w-full md:w-3/5 bg-white">
        <slot name="left"></slot>
    </div>
    <div class="flex-1 text-white bg-slate-800">
        <slot name="right"></slot>
    </div>
</div>