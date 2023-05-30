<script lang="ts">
	import MasonryGallery from '$lib/scripts/Gallery/Masonry-Gallery.svelte';
	import { FileButton, FileDropzone } from '@skeletonlabs/skeleton';
	import * as A from 'fp-ts/Array';
	import * as O from 'fp-ts/Option';
	import { pipe } from 'fp-ts/lib/function';
	import { enhance } from '$app/forms';
	import UploadIcon from '$lib/uploadIcon.svelte';
	let files: FileList;
	let pictures: string[];
	let images: HTMLImageElement[] = [];
	$: pictures = [];

	const imageFromEvent = () => {
		return pipe(
			O.fromNullable(files),
			O.map((fileList) => {
				// TODO separate this logic into it's own function for readability
				Object.keys(fileList).forEach((_, i: number) => {
					const image = new Image();
					image.onload = () => {
						images = [...images, image];
					};
					const file = fileList[i];
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = (e) => {
						if (e && e.target && e.target.result) {
							pictures = [...pictures, e.target.result.toString()];
							image.src = e.target.result.toString();
						}
					};
				});
			})
		);
	};
	// TODO add error message when uploading non-accepted file type
</script>

<div id="app">
	<form method="post" action="?/upload" use:enhance>
		<FileDropzone
			name="file-upload"
			multiple
			class="my-4 w-80 sm:w-96"
			enctype="multipart/form-data"
			on:change={() => imageFromEvent()}
			bind:files
			accept="image/*"
			required
		>
			<svelte:fragment slot="lead"><UploadIcon /></svelte:fragment>
			<svelte:fragment slot="meta">PNG, JPG, and GIF allowed.</svelte:fragment>
		</FileDropzone>
		<button class="justify-center flex m-auto mt-4 variant-filled rounded w-24" type="submit"
			>Upload</button
		>
	</form>

	<!-- this logic gets separated into it's own uploadpreview file -->
	{#if images.length > 0}
		<div class="img-container placeholder">
			{#each images as pic, index}
				<img src={pic.src} alt="your upload, # {index + 1}" />
			{/each}
		</div>
	{/if}
</div>

<style>
	#app {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}
	.img-container {
		align-items: center;
		flex-flow: column;
		justify-content: center;
	}
	img {
		margin-top: 1rem;
		justify-self: center;
		max-width: 250px;
		max-height: 100px;
		width: auto;
		height: auto;

		@media (width <= 480px) {
			max-width: 400px;
			max-height: 225px;
		}
		@media (width > 480px) and (width <= 768px) {
			max-width: 525px;
			max-height: 375px;
		}
		@media (width > 768px) and (width <= 1024px) {
			max-width: 700px;
			max-height: 450px;
		}
		@media (width > 1024px) {
			max-width: 900px;
			max-height: 575px;
		}
	}
</style>
