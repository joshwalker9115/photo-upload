import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
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