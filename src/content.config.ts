import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
    // Match the .mdoc files Keystatic creates
    loader: glob({ pattern: "**/*.mdoc", base: "./src/content/pages" }),
    schema: z.object({
        title: z.string(),
        slug: z.string().optional(),
        coverImage: z.string().optional(),
        coverImageAlt: z.string().optional(),
    }),
});

const realizacje = defineCollection({
    // Keystatic uses .mdoc when `format.contentField` is set.
    loader: glob({ pattern: "**/*.mdoc", base: "./src/content/realizacje" }),
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        short_description: z.string(),
        // Description is now the Markdoc body (contentField), not frontmatter.
        image: z.string().nullable().optional(),
        gallery: z.array(z.string().nullable()).default([]),
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

const header = defineCollection({
    loader: glob({ pattern: "header.yaml", base: "./src/content" }),
    schema: z.object({
        logo: z.string().optional(),
        logoAlt: z.string().optional(),
    }),
});

const navigation = defineCollection({
    loader: glob({ pattern: "navigation.yaml", base: "./src/content" }),
    schema: z.object({
        links: z
            .array(
                z.object({
                    label: z.string(),
                    href: z.string().optional(),
                    children: z
                        .array(
                            z.object({
                                label: z.string(),
                                href: z.string(),
                            })
                        )
                        .default([]),
                })
            )
            .default([]),
    }),
});

const footer = defineCollection({
    loader: glob({ pattern: "footer.yaml", base: "./src/content" }),
    schema: z.object({
        copyright: z.string().optional(),
        logo: z.string().optional(),
        logoAlt: z.string().optional(),
        footer_copy: z.string().optional(),
        second_column: z
            .object({
                title: z.string(),
                links: z
                    .array(
                        z.object({
                            label: z.string(),
                            href: z.string(),
                        })
                    )
                    .default([]),
            })
            .optional(),
        third_column: z
            .object({
                title: z.string(),
                links: z
                    .array(
                        z.object({
                            label: z.string(),
                            href: z.string(),
                        })
                    )
                    .default([]),
            })
            .optional(),
        bottom_links: z
            .array(
                z.object({
                    label: z.string(),
                    href: z.string(),
                })
            )
            .default([]),
    }),
});

const information = defineCollection({
    loader: glob({ pattern: "information.yaml", base: "./src/content" }),
    schema: z.object({
        phone: z.string().optional(),
        address: z.string().optional(),
        email: z.string().optional(),
        opening_hours: z.string().optional(),
        social: z
            .array(
                z.object({
                    label: z.string(),
                    href: z.string(),
                    icon: z.string(),
                })
            )
            .default([]),
    }),
});

export const collections = { pages, realizacje, information, header, navigation, footer };
