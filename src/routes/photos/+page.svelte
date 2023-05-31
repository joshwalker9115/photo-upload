<script lang="ts">
	import MasonryGallery from '$lib/scripts/Gallery/Masonry-Gallery.svelte';
	import type { PageData } from '../photos/$types.d.ts';

	const title: string = 'Uploaded Photos'; // come back to this, programmatically upate with session/class

	export let data: PageData;
	$: images = data.images;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<div class="grid grid-rows-auto grid-flow-row gap-4 sm:grid-cols-auto sm:grid-flow-col m-8 mr-20">
	<h1 class="grid text-4xl">{title}</h1>
	<a class="grid" href="/photos/upload">
		<img
			class="upload"
			src="https://static.thenounproject.com/png/625182-200.png"
			alt="link to upload page"
		/>
		<button class="variant-filled rounded w-4/5 flex justify-center m-auto mt-2 btn mw11"
			>UPLOAD IMAGES</button
		>
	</a>
</div>
{#if images.length > 0}
	<MasonryGallery items={images} />
{:else}
	<div />
{/if}

<style>
	.mw11 {
		max-width: 11rem;
	}
	.upload {
		display: flex;
		justify-self: center;
		height: 50px;
		width: 50px;
		cursor: pointer;
	}
</style>
