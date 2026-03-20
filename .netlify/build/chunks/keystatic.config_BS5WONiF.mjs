import { fields, config, collection, singleton } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const badgePositionOptions = [
  { label: "Top left", value: "top-left" },
  { label: "Top right", value: "top-right" },
  { label: "Bottom left", value: "bottom-left" },
  { label: "Bottom right", value: "bottom-right" }
];
const contentComponents = {
  // --- Hero ---
  Hero: block({
    label: "Hero",
    schema: {
      subtitle: fields.text({
        label: "Subtitle (above title)",
        validation: { length: { min: 0, max: 80 } }
      }),
      title: fields.text({
        label: "Title (H1)",
        validation: { length: { min: 0, max: 120 } }
      }),
      description: fields.text({
        label: "Description",
        multiline: true,
        validation: { length: { min: 0, max: 300 } }
      }),
      ctas: fields.array(
        fields.object({
          label: fields.text({ label: "Label" }),
          href: fields.text({ label: "Link (href)" }),
          variant: fields.select({
            label: "Variant",
            options: [
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" }
            ],
            defaultValue: "primary"
          })
        }),
        {
          label: "CTAs",
          itemLabel: (item) => item.fields.label.value || "CTA",
          // optional, cap at 2 like your design:
          validation: { length: { max: 2 } }
        }
      ),
      trustIndicators: fields.array(
        fields.object({
          value: fields.text({ label: "Main value (e.g. 15+)" }),
          label: fields.text({
            label: "Small label (e.g. Lat doświadczenia)"
          })
        }),
        {
          label: "Trust indicators (max 3)",
          itemLabel: (item) => item.fields.value.value || "Indicator",
          validation: { length: { max: 3 } }
        }
      ),
      image: fields.image({
        label: "Image",
        directory: "src/assets/pages",
        publicPath: "/src/assets/pages/"
      }),
      imageAlt: fields.text({
        label: "Image alt text"
      }),
      imageSide: fields.select({
        label: "Image side",
        options: [
          { label: "Right", value: "right" },
          { label: "Left", value: "left" }
        ],
        defaultValue: "right"
      }),
      badgeEnabled: fields.checkbox({
        label: "Show floating badge",
        defaultValue: true
      }),
      badgeTitle: fields.text({
        label: "Badge title"
      }),
      badgeSubtitle: fields.text({
        label: "Badge subtitle"
      }),
      badgePosition: fields.select({
        label: "Badge position on image",
        options: [...badgePositionOptions],
        defaultValue: "bottom-left"
      })
    }
  }),
  // --- Features (unified) ---
  Features: block({
    label: "Features",
    schema: {
      subtitle: fields.text({
        label: "Subtitle (above title)",
        validation: { length: { min: 0, max: 80 } }
      }),
      title: fields.text({
        label: "Title (H2)",
        validation: { length: { min: 0, max: 120 } }
      }),
      description: fields.text({
        label: "Description",
        multiline: true,
        validation: { length: { min: 0, max: 300 } }
      }),
      featuresLink: fields.select({
        label: "Features link",
        options: [
          { label: "None", value: "none" },
          { label: "Line", value: "line" }
        ],
        defaultValue: "none"
      }),
      features: fields.array(
        fields.object({
          number: fields.text({ label: "Number" }),
          icon: fields.text({ label: "Icon (lucide:...)" }),
          iconBackground: fields.text({
            label: "Icon background class (e.g. bg-brand-natural-green)"
          }),
          iconColor: fields.text({
            label: "Icon color class (e.g. text-white)"
          }),
          title: fields.text({ label: "Title" }),
          description: fields.text({
            label: "Description",
            multiline: true
          })
        }),
        {
          label: "Features (max 4)",
          itemLabel: (item) => item.fields.title.value || "Feature",
          validation: { length: { max: 4 } }
        }
      )
    }
  }),
  // --- Badge ---
  Badge: block({
    label: "Badge",
    schema: {
      number: fields.text({ label: "Number" }),
      icon: fields.text({ label: "Icon (lucide:...)" }),
      title: fields.text({ label: "Title" }),
      description: fields.text({
        label: "Description"
      })
    }
  }),
  Partners: block({
    label: "Partners",
    schema: {
      subtitle: fields.text({
        label: "Subtitle (above title)",
        validation: { length: { min: 0, max: 80 } }
      }),
      title: fields.text({
        label: "Title (H3)",
        validation: { length: { min: 0, max: 120 } }
      }),
      partners: fields.array(
        fields.object({
          name: fields.text({ label: "Partner name" }),
          image: fields.image({
            label: "Partner logo",
            directory: "src/assets/partners",
            publicPath: "/src/assets/partners/"
          })
        }),
        {
          label: "Partners (max 8)",
          itemLabel: (item) => item.fields.name.value || "Partner",
          validation: { length: { max: 8 } }
        }
      )
    }
  }),
  Callout: block({
    label: "Callout",
    schema: {
      title: fields.text({ label: "Title" }),
      description: fields.text({
        label: "Description",
        multiline: true
      }),
      color: fields.select({
        label: "Color",
        options: [
          { label: "Red", value: "red" },
          { label: "Dark green", value: "dark-green" },
          { label: "Light green", value: "light-green" }
        ],
        defaultValue: "red"
      })
    }
  }),
  Portfolio: block({
    label: "Portfolio",
    schema: {}
  })
};

function parseGithubRepo(value) {
  if (!value) return void 0;
  const cleaned = value.trim().replace(/\.git$/, "");
  if (cleaned.startsWith("https://") || cleaned.startsWith("http://")) {
    try {
      const url = new URL(cleaned);
      const parts2 = url.pathname.replace(/^\/+/, "").split("/").filter(Boolean);
      if (parts2.length >= 2) {
        return { owner: parts2[0], name: parts2[1] };
      }
    } catch {
      return void 0;
    }
  }
  const parts = cleaned.split("/").filter(Boolean);
  if (parts.length === 2) {
    return { owner: parts[0], name: parts[1] };
  }
  return void 0;
}
const githubStorageRequested = process.env.PUBLIC_KEYSTATIC_STORAGE_KIND === "github";
const githubRepo = parseGithubRepo(process.env.PUBLIC_KEYSTATIC_GITHUB_REPO);
if (githubStorageRequested && !githubRepo) {
  throw new Error("PUBLIC_KEYSTATIC_GITHUB_REPO must be set as owner/repo (or a full GitHub repo URL).");
}
const useGithubStorage = githubStorageRequested && Boolean(githubRepo);
const keystaticConfig = config({
  storage: useGithubStorage ? {
    kind: "github",
    repo: githubRepo
  } : {
    kind: "local"
  },
  ui: {
    brand: { name: "Thermo Vitae" }
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
              label: "Url (optional for dropdown parent)"
            }),
            children: fields.array(
              fields.object({
                label: fields.text({ label: "Podlink tytul" }),
                href: fields.text({ label: "Podlink URL" })
              }),
              {
                label: "Dropdown items",
                itemLabel: (props) => props.fields.label.value || "New child link"
              }
            )
          }),
          {
            label: "Menu Links",
            itemLabel: (props) => props.fields.label.value || "New link"
          }
        )
      }
    }),
    header: singleton({
      label: "Header",
      path: "src/content/header",
      schema: {
        logo: fields.image({
          label: "Logo",
          description: "Brand logo image",
          directory: "src/assets",
          publicPath: "/src/assets/"
        }),
        logoAlt: fields.text({
          label: "Logo alt text",
          defaultValue: "Thermo Vitae"
        }),
        phone: fields.text({
          label: "Phone number",
          defaultValue: "+48 123 456 789"
        })
      }
    }),
    footer: singleton({
      label: "Footer",
      path: "src/content/footer",
      schema: {
        copyright: fields.text({ label: "Copyright text" }),
        address: fields.text({ label: "Address", multiline: true }),
        email: fields.text({ label: "Email" })
      }
    })
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
              publicPath: "/images/pages/"
            }
          },
          components: contentComponents
        })
      }
    }),
    realizacje: collection({
      label: "Realizacje",
      slugField: "slug",
      path: "src/content/realizacje/*",
      format: { contentField: "description" },
      schema: {
        slug: fields.slug({
          name: { label: "Slug" }
        }),
        title: fields.text({ label: "Title" }),
        short_description: fields.text({
          label: "Short description",
          multiline: true
        }),
        description: fields.markdoc({
          label: "Description",
          options: {
            image: {
              directory: "public/images/realizacje",
              publicPath: "/images/realizacje/"
            }
          },
          components: contentComponents
        }),
        image: fields.image({
          label: "Main image",
          directory: "src/assets/realizacje",
          publicPath: "/src/assets/realizacje/"
        }),
        gallery: fields.array(
          fields.image({
            label: "Gallery image",
            directory: "src/assets/realizacje",
            publicPath: "/src/assets/realizacje/"
          }),
          {
            label: "Gallery",
            itemLabel: () => "Image"
          }
        ),
        location: fields.text({ label: "Location" }),
        gps_location: fields.text({ label: "GPS location" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "W trakcie", value: "W trakcie" },
            { label: "Zrealizowano", value: "Zrealizowano" }
          ],
          defaultValue: "Zrealizowano"
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Pompy ciepła", value: "Pompy ciepła" },
            { label: "Fotowoltaika", value: "Fotowoltaika" },
            { label: "Chłodzenie", value: "Chłodzenie" },
            { label: "Rekuperacja", value: "Rekuperacja" },
            { label: "Instalacje wewnętrzne", value: "Instalacje wewnętrzne" },
            { label: "Inne", value: "Inne" }
          ],
          defaultValue: "Pompy ciepła"
        })
      }
    })
  }
});

export { keystaticConfig as k };
