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
		<h1
			class="mx-auto flex justify-center p-8 h-auto xs:text-3xl sm:text-6xl md:text-6xl lg:text-8xl"
		>
			Photo Upload Demo
		</h1>
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src={img} alt="Photo + Upload = Smiley" class="rounded pb-36" />
		{#if loggedOut}
			<h2 class="bg-error-500 rounded p-3 m-auto text-center w-80">
				Error: You must login to view Photos
			</h2>
		{/if}
		<button
			class="btn-lg variant-filled rounded flex m-auto w-72 justify-center"
			on:click={() => modalStore.trigger(modal)}>Login</button
		>
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
