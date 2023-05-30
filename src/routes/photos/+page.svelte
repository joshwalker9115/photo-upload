<script lang="ts">
	import { page } from '$app/stores';
	import * as A from 'fp-ts/Array';
	import InlineGallery from '$lib/scripts/Gallery/Inline-Gallery.svelte';
	import BiggerPicture from 'bigger-picture/svelte';
	import MasonryGallery from '$lib/scripts/Gallery/Masonry-Gallery.svelte';
	import type { PageData } from '../photos/$types.d.ts';
	import type { RouteParams } from './$types';
	import type { Img } from './+page.server';

	const title: string = 'Uploaded Photos'; // come back to this, programmatically upate with session/class

	export let data: PageData;
	$: images = data.images;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<div class="flex justify-between m-8">
	<h1 class="flex-1 text-4xl">{title}</h1>
	<a class="grid" href="/photos/upload">
		<img
			class="upload"
			src="https://static.thenounproject.com/png/625182-200.png"
			alt="link to upload page"
		/>
		<div>UPLOAD IMAGES</div>
	</a>
</div>
{#if images.length > 0}
	<MasonryGallery items={images} />
{:else}
	<div />
{/if}

<style>
	.upload {
		display: flex;
		justify-self: center;
		height: 50px;
		width: 50px;
		cursor: pointer;
	}
</style>
