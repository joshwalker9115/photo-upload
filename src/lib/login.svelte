<script lang="ts">
	import img from './assets/login/btn_google_signin_light_normal_web.png';
	import { signIn } from '@auth/sveltekit/client';
	import { type ModalSettings, type ModalComponent, modalStore } from '@skeletonlabs/skeleton';
	import Login from '$lib/login.svelte';

	const modalComponent: ModalComponent = {
		ref: Login,
		slot: '<div />'
	};
	export const modal: ModalSettings = {
		type: 'component',
		title: 'Login',
		component: modalComponent
	};
</script>

<div>
	<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		<div
			class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
		>
			<div class="bg-secondary-400 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
				<div class="sm:flex sm:items-start">
					<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
						<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Login</h3>
						<slot />
						<div class="mt-2">
							<button class="mt-16 rounded" on:click={() => signIn('google')}>
								<img src={img} alt="sign in with google" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
				<button
					class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
					type="button"
					on:click={() => modalStore.close()}>Cancel</button
				>
			</div>
		</div>
	</div>
</div>
