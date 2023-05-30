import { _getS3Image } from '$lib/scripts/s3/photoBucket';
import type { PageServerLoad } from './$types';
import dbServer from '../../lib/db.server';
import * as A from 'fp-ts/lib/Array.js';
import * as E from 'fp-ts/lib/Either.js';
import * as TE from 'fp-ts/lib/TaskEither.js';
import { pipe } from 'fp-ts/lib/function';
import type { Image, PrismaPromise } from '@prisma/client';

export type Img = {
  img: string,
  alt: string
};
const imgArr: Img[] = [];
const addImage = (img: Img) => imgArr.push(img);

const s3Images: () => Promise<E.Either<unknown, Image[]>> = async () => {
  const images = await TE.tryCatch<unknown, Image[]>(
    async () => await dbServer.image.findMany(),
    (err) => new Error(`${err}`)
  )();
  return images;
};

s3Images().then(E.fold(
  (err) => {
    throw new Error(`${err}`)
  },
  (img: Image[]) => A.mapWithIndex(async (index: number, _: Image) =>
    addImage({
      img: await _getS3Image(_.pathKey),
      alt: `User upload # ${index}`
    })
  )(img)
));

export const load = (async ({ params }) => ({ images: imgArr })) satisfies PageServerLoad<{ images: Img[] }>;