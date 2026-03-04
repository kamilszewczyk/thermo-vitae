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

const realizacje = defineCollection({
    loader: glob({ pattern: "**/*.yaml", base: "./src/content/realizacje" }),
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        short_description: z.string(),
        description: z.string(),
        image: z.string(),
        gallery: z.array(z.string()).default([]),
        location: z.string(),
        gps_location: z.string(),
        status: z.enum(["W trakcie", "Zrealizowano"]),
        category: z.enum([
            "Pompy ciepła",
            "Fotowoltaika",
            "Chłodzenie",
            "Rekuperacja",
            "Instalacje wewnętrzne",
            "Inne",
        ]),
    }),
});

export const collections = { pages, realizacje };
