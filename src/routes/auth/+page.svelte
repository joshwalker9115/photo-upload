<script>
	import { modal } from '$lib/modal';
	import { modalStore } from '@skeletonlabs/skeleton';
</script>

<div class="container h-4/5 mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h2 class="text-warning-500">Error: You must login to view Photos</h2>
		<button
			class="btn variant-filled rounded flex m-auto"
			on:click={() => modalStore.trigger(modal)}><a href="/">Login</a></button
		>
	</div>
</div>
