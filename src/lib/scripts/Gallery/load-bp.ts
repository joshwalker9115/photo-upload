import type { BiggerPictureInstance } from "bigger-picture";
import 'bigger-picture/css';

let bp: BiggerPictureInstance;

export async function loadBp(target?: HTMLElement) {
  const BiggerPicture = (await import('bigger-picture/svelte')).default;
  if (target) {
    return BiggerPicture({ target });
  }
  if (!bp) {
    bp = BiggerPicture({
      target: document.body,
    });
  }
  return bp;
}