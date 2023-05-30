import dbServer from "$lib/db.server";
import { _putS3Image } from "$lib/scripts/s3/photoBucket";
import { json, type Actions, fail } from "@sveltejs/kit";

// TODO update to TE
export const actions = {
  upload: async ({ request, locals }) => {
    const data = await request.formData();
    const files = data.getAll('file-upload');
    // TODO accept and check if HEIC/HEIF, if so need to convert first
    const sess = await locals.getSession();
    if (sess?.user) {

      const user = sess.user.name;
      try {
        if (files.length === 0) return json({ success: false, message: 'No file data' })
        files.forEach(async (_, i) => {
          if (_ instanceof File && _.size) {
            const buffer = await new Response(_).arrayBuffer().then(ab => Buffer.from(ab))
            await _putS3Image({
              key: user + _.name,
              file: buffer
            });
            await dbServer.image.create({
              data: {
                fileType: _.name.substring(_.name.indexOf(".") + 1),
                pathKey: user + _.name,
                createdAt: new Date(Date.now()),
                user: {
                  connect: {
                    id: sess.user?.id
                  }
                }
              }
            })
          };
          return { success: true, message: 'File uploaded successfully' };
        });
        fail(401, { message: "failed to upload" });
      } catch (error) {
        console.log(`Error in Submit: ${error}`);
      }
      return { success: true }
    }
  }

} satisfies Actions