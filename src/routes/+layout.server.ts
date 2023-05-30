import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad, LayoutServerLoadEvent } from "./$types";

export const load: LayoutServerLoad = (async (event: LayoutServerLoadEvent) => {
  await event.locals.getSession();
  if (event.url.searchParams.get("loggedOut")) {
    if (event.locals.session?.user) throw redirect(303, "/photos")
  };
  return {
    session: event.locals.session,
  };
});
