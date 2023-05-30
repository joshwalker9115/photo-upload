<script lang="ts">
	// import style
	import { loadBp } from './load-bp';

	// image data
	export let items: any[] = [];

	// we can use directly in a use action
	function makeInlineGallery(target: HTMLElement) {
		(async () => {
			const bp = await loadBp(target);
			bp.open({
				items,
				inline: true,
				noClose: true,
				scale: 1,
				intro: 'fadeup'
			});
		})();
	}
</script>

<div use:makeInlineGallery />

<style>
	div {
		position: relative;
		background: #444444;
		aspect-ratio: 3/2;
	}
</style>
