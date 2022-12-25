// images router
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";
import { router, publicProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";
import type { SysLink, AssetFileProp } from "contentful-management";
import { FILE } from "dns";

export type Image = {
    id: string;
    url: string;
    category: string;
    dimensions: {
        width: number;
        height: number;
    };
};

export const imagesRouter = router({
    // protectedProcedure to mutate contentful with new image
    uploadImage: protectedProcedure
        .input(z.object({
            file: z.instanceof(Uint8Array),
            category: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            console.log('uploadImage mutation');
            
            const { contentful } = ctx;
            if (!contentful) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Contentful client not initialized' });
            }

            const { file, category } = input;
        }),

    // publicProcedure to get all images from contentful
    getImages: publicProcedure
        .output(z.array(z.object({
            id: z.string(),
            url: z.string(),
            category: z.string(),
            dimensions: z.object({
                width: z.number(),
                height: z.number()
            })
        })))
        .query(async ({ ctx }) => {
            console.log('getImages query');
            
            const { contentful } = ctx;
            if (!contentful) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Contentful client not initialized' });
            }

            const entries = await contentful.getEntries({
                content_type: 'image',
            });
                
            const images: Image[] = [];
            for(const { fields } of entries.items) {
                if(!fields['image'] || !fields['category']) {
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'No image or category' });
                }
                const image = fields['image']['en-US'] as SysLink;
                const category = fields['category']['en-US'] as string;

                // get asset from image asset id
                const asset = await contentful.getAsset(image.sys.id);
                console.log('asset query triggered');

                const file = asset.fields.file['en-US'];
                if(!file || !file.url) {
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'No file' });
                }
                
                images.push({
                    id: asset.sys.id,
                    url: 'https:' + file.url,
                    category,
                    dimensions: {
                        width: file.details?.image.width || 300,
                        height: file.details?.image.height || 300,
                    }
                })
            }

            return images;
        }),
});
