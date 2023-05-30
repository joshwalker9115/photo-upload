<script lang="ts">
	import type { BiggerPictureInstance } from 'bigger-picture';
	import { masonry } from './masonry';
	import { onMount } from 'svelte';

	// import style
	import { loadBp } from './load-bp';

	// image data
	export let items: any[] = [];

	// initializes in onMount so it runs only in browser
	let bp: BiggerPictureInstance;

	/** click handler */
	function openBiggerPicture(e: Event) {
		e.preventDefault();
		const target = e.currentTarget as HTMLAnchorElement;
		bp.open({
			items: target.parentElement!.children,
			el: target
		});
	}

	onMount(async () => {
		// use onMount to define variable so it runs only in the browser
		bp = await loadBp();
	});

	// TODO - fix aspect ratio of bp view
</script>

<section use:masonry>
	{#each items as item}
		<a
			on:click={(e) => openBiggerPicture(e)}
			href={item.img}
			data-img={item.img}
			data-thumb={item.thumb}
			data-height={item.height}
			data-width={item.width}
			data-alt={item.alt}
		>
			<img src={item.thumb ?? item.img} alt={item.alt} />
		</a>
	{/each}
</section>

<style>
	a {
		display: block;
		padding: 8px;
	}
	img {
		max-width: 100%;
		vertical-align: bottom;
	}
	section {
		margin: 25px 0 35px;
	}
</style>
