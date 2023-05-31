<script lang="ts">
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import { modal } from '../lib/modal';
	import { page } from '$app/stores';
	import img from '../lib/assets/headerImageT.png';

	let loggedOut: boolean;
	$: loggedOut = Boolean($page.url.searchParams.get('loggedOut')) ?? false;
</script>

<div class="container h-4/5 mx-auto flex justify-center items-start">
	<div class="space-y-5">
		<Modal />
		<h1 class="mx-auto flex justify-center p-8 h-auto sm:text-6xl md:text-6xl lg:text-8xl">
			Photo Upload Demo
		</h1>
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src={img} alt="Photo + Upload = Smiley" class="rounded md:pb-14" />
		<h2 class="text-center p-8 sm:text-2xl md:text-3xl lg:text-4xl">
			A simple demo web app for uploading public photos behind a Google authenticated login.
		</h2>
		{#if loggedOut}
			<h2 class="bg-error-500 rounded p-3 m-auto text-center w-80">
				Error: You must login to view Photos
			</h2>
		{/if}
		{#if $page.data.session?.user}
			<a href="/photos">
				<button class="btn-lg variant-filled rounded flex m-auto w-72 justify-center">
					Check out the Photos!
				</button>
			</a>
		{:else}
			<button
				class="btn-lg variant-filled rounded flex m-auto w-72 justify-center"
				on:click={() => modalStore.trigger(modal)}
			>
				Login
			</button>
		{/if}
	</div>
</div>

<style>
	@media (width < 480px) {
		h1 {
			font-size: 2rem;
		}
	}
	@media (width > 480px) and (width < 640px) {
		h1 {
			font-size: 3rem;
		}
	}
</style>
