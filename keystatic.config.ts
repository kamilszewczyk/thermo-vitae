// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: "Thermo Vitae" },
  },
  singletons: {
    navigation: singleton({
      label: "Navigation",
      path: "src/content/navigation",
      schema: {
        links: fields.array(
            fields.object({
              label: fields.text({ label: "Label" }),
              href: fields.text({ label: "Link (e.g. #uslugi or /about)" }),
            }),
            {
              label: "Menu Links",
              itemLabel: (props) => props.fields.label.value || "New link",
            }
        ),
      },
    }),
    header: singleton({
      label: "Header",
      path: "src/content/header",
      schema: {
        logo: fields.image({
          label: "Logo",
          description: "Brand logo image",
          directory: "src/assets",
          publicPath: "/src/assets/",
        }),
        logoAlt: fields.text({
          label: "Logo alt text",
          defaultValue: "Thermo Vitae",
        }),
        phone: fields.text({
          label: "Phone number",
          defaultValue: "+48 123 456 789",
        }),
      },
    }),
    footer: singleton({
      label: "Footer",
      path: "src/content/footer",
      schema: {
        copyright: fields.text({ label: "Copyright text" }),
        address: fields.text({ label: "Address", multiline: true }),
        email: fields.text({ label: "Email" }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: "Pages",
      slugField: "title",
      path: "src/content/pages/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        // Optimized cover image (optional, for hero/thumbnail use)
        coverImage: fields.image({
          label: "Cover Image",
          description: "Optional hero/cover image for the page",
          directory: "src/assets/pages",
          publicPath: "/src/assets/pages/",
        }),
        coverImageAlt: fields.text({
          label: "Cover image alt text",
          defaultValue: "",
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              // Inline content images go to public/ (no optimization,
              // but they just work as plain <img> tags)
              directory: "public/images/pages",
              publicPath: "/images/pages/",
            },
          },
        }),
      },
    }),
  },
});