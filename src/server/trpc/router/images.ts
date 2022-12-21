// images router
import { z } from "zod";
import { type Asset } from "contentful";
import { protectedProcedure } from "../trpc";
import { router, publicProcedure } from "../trpc";

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
        if (!ctx.client) {
            throw new Error('No client');
        }

        const entries = await ctx.client.getEntries<{ image: Asset, category: string }>({
            content_type: 'image',
        })
        
        const images = entries.items.map(({ fields }) => ({
            id: fields.image.sys.id,
            url: 'https:' + fields.image.fields.file.url,
            category: fields.category,
            dimensions: {
                width: fields.image.fields.file.details.image?.width ?? 0,
                height: fields.image.fields.file.details.image?.height ?? 0,
            }
        }))
        return images;
    }),
});
