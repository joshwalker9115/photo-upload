<script>
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { modal } from './modal';
</script>

{#if $page.data.session}
	{#if $page.data.session.user?.image}
		<img src={$page.data.session.user.image} alt="User" referrerpolicy="no-referrer" class="w-12" />
	{/if}
	<span class="signedInText">
		<small>Signed in as</small><br />
		<strong>{$page.data.session.user?.name ?? 'User'}</strong>
	</span>
	<button on:click={() => signOut({ callbackUrl: '/', redirect: true })} class="button"
		>Sign out</button
	>
{:else}
	<button on:click={() => modalStore.trigger(modal)}>Login</button>
{/if}
