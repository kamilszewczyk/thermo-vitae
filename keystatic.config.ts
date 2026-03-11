// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';
import { contentComponents } from "./src/lib/content-components";

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: "Thermo Vitae" },
  },
  singletons: {
    navigation: singleton({
      label: "Nawigacja",
      path: "src/content/navigation",
      schema: {
        links: fields.array(
            fields.object({
              label: fields.text({ label: "Tytuł" }),
              href: fields.text({
                label: "Url (optional for dropdown parent)",
              }),
              children: fields.array(
                fields.object({
                  label: fields.text({ label: "Podlink tytul" }),
                  href: fields.text({ label: "Podlink URL" }),
                }),
                {
                  label: "Dropdown items",
                  itemLabel: (props) => props.fields.label.value || "New child link",
                }
              ),
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
          components: contentComponents,
        }),
      },
    }),
    realizacje: collection({
      label: "Realizacje",
      slugField: "slug",
      path: "src/content/realizacje/*",
      format: { contentField: "description" },
      schema: {
        slug: fields.slug({
          name: { label: "Slug" },
        }),
        title: fields.text({ label: "Title" }),
        short_description: fields.text({
          label: "Short description",
          multiline: true,
        }),
        description: fields.markdoc({
          label: "Description",
          options: {
            image: {
              directory: "public/images/realizacje",
              publicPath: "/images/realizacje/",
            },
          },
          components: contentComponents,
        }),
        image: fields.image({
          label: "Main image",
          directory: "src/assets/realizacje",
          publicPath: "/src/assets/realizacje/",
        }),
        gallery: fields.array(
          fields.image({
            label: "Gallery image",
            directory: "src/assets/realizacje",
            publicPath: "/src/assets/realizacje/",
          }),
          {
            label: "Gallery",
            itemLabel: () => "Image",
          }
        ),
        location: fields.text({ label: "Location" }),
        gps_location: fields.text({ label: "GPS location" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "W trakcie", value: "W trakcie" },
            { label: "Zrealizowano", value: "Zrealizowano" },
          ],
          defaultValue: "Zrealizowano",
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Pompy ciepła", value: "Pompy ciepła" },
            { label: "Fotowoltaika", value: "Fotowoltaika" },
            { label: "Chłodzenie", value: "Chłodzenie" },
            { label: "Rekuperacja", value: "Rekuperacja" },
            { label: "Instalacje wewnętrzne", value: "Instalacje wewnętrzne" },
            { label: "Inne", value: "Inne" },
          ],
          defaultValue: "Pompy ciepła",
        }),
      },
    }),
  },
});