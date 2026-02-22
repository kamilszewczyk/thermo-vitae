import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
    // Match the .mdoc files Keystatic creates
    loader: glob({ pattern: "**/*.mdoc", base: "./src/content/pages" }),
    schema: z.object({
        title: z.string(),
        coverImage: z.string().optional(),
        coverImageAlt: z.string().optional(),
    }),
});

export const collections = { pages };