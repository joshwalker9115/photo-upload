import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import Facebook from "@auth/core/providers/facebook";
import PrismaAdapter from "$lib/PrismaAdapter";
import { GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import prismaClient from "$lib/db.server";
import dbServer from "$lib/db.server";

export const handleSvelteAuth = (async (...args) => {
  const [{ event }] = args;
  return SvelteKitAuth({
    trustHost: true,
    // fix when https://github.com/nextauthjs/next-auth/issues/6106 is addressed
    // @ts-ignore
    adapter: PrismaAdapter(prismaClient),
    // @ts-ignore
    providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
    events: {
      async createUser(message) {
        await dbServer.userSettings.create({
          data: {
            userId: message.user.id,
          }
        })
      },
      async signOut() {
        throw redirect(303, "/");
      }
    },
    callbacks: {
      async session({ session, user }) {
        session.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          settings: user.settings
        };

        event.locals.session = session;
        return session;
      },
    },
  })(...args)
}) satisfies Handle;

const handleAuthRoutes = (async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/photos")) {
    await event.locals.getSession();
    if (!event.locals.session) throw redirect(303, `/?loggedOut=true`);
  }
  return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleSvelteAuth, handleAuthRoutes);
