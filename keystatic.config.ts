// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';
import { contentComponents } from "./src/lib/content-components";

function parseGithubRepo(value: string | undefined) {
  if (!value) return undefined;

  const [owner, name] = value.split('/');
  if (!owner || !name) return undefined;

  return { owner, name };
}

const githubRepo = parseGithubRepo(import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO);
const useGithubStorage = import.meta.env.PUBLIC_KEYSTATIC_STORAGE_KIND === 'github' && Boolean(githubRepo);

export default config({
  storage: useGithubStorage
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  cloud: {
    project: 'thermo-vitae/thermo-vitae',
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
      },
    }),
    footer: singleton({
      label: "Footer",
      path: "src/content/footer",
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
        footer_copy: fields.text({
          label: "Footer copy",
          multiline: true,
        }),
        second_column: fields.object(
          {
            title: fields.text({ label: "Second column title" }),
            links: fields.array(
              fields.object({
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Link (href)" }),
              }),
              {
                label: "Second column links",
                itemLabel: (item) => item.fields.label.value || "Link",
              }
            ),
          },
          {
            label: "Second column",
          }
        ),
        third_column: fields.object(
          {
            title: fields.text({ label: "Third column title" }),
            links: fields.array(
              fields.object({
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Link (href)" }),
              }),
              {
                label: "Third column links",
                itemLabel: (item) => item.fields.label.value || "Link",
              }
            ),
          },
          {
            label: "Third column",
          }
        ),
        bottom_links: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "Link (href)" }),
          }),
          {
            label: "Bottom links",
            itemLabel: (item) => item.fields.label.value || "Link",
          }
        ),
        copyright: fields.text({ label: "Copyright text" }),
      },
    }),
    information: singleton({
      label: "Information",
      path: "src/content/information",
      schema: {
        phone: fields.text({
          label: "Phone number",
          defaultValue: "+48 123 456 789",
        }),
        address: fields.text({ label: "Address", multiline: true }),
        email: fields.text({ label: "Email" }),
        opening_hours: fields.text({ label: "Opening hours", multiline: true }),
        social: fields.array(
            fields.object({
              label: fields.text({ label: "Label" }),
              href: fields.text({ label: "Link (href)" }),
              icon: fields.text({ label: "Icon (lucide:)" }),
            }),
            {
              label: "Socials",
              itemLabel: (item) => item.fields.label.value || "Social"
            }
        ),
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
        title: fields.text({
          label: "Internal title (used for file name)",
        }),
        slug: fields.text({
          label: "Slug / path",
          description: "Public URL path, e.g. uslugi/pompy-ciepla",
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              // Inline content images go to public/ (no optimization,
              // but they just work as plain <img> tags)
              directory: "src/assets/pages",
              publicPath: "/src/assets/pages/",
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
        show_full_page: fields.checkbox({
          label: "Show as full page",
          description: "Enable for realizacje entries that should appear on the full realizacje page.",
          defaultValue: true,
        }),
        short_description: fields.text({
          label: "Short description",
          multiline: true,
        }),
        description: fields.markdoc({
          label: "Description",
          options: {
            image: {
              directory: "src/assets/realizacje",
              publicPath: "/src/assets/realizacje/",
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
        gps_latitude: fields.text({ label: "GPS latitude" }),
        gps_longitude: fields.text({ label: "GPS longitude" }),
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