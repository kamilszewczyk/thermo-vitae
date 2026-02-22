import { fields } from "@keystatic/core";
import {
    wrapper,
    block,
    repeating,
} from "@keystatic/core/content-components";

const badgePositionOptions = [
    { label: "Top left", value: "top-left" },
    { label: "Top right", value: "top-right" },
    { label: "Bottom left", value: "bottom-left" },
    { label: "Bottom right", value: "bottom-right" },
] as const;

export const contentComponents = {
    // --- Hero ---
    Hero: block({
        label: "Hero",
        schema: {
            subtitle: fields.text({
                label: "Subtitle (above title)",
                validation: { length: { min: 0, max: 80 } },
            }),

            title: fields.text({
                label: "Title (H1)",
                validation: { length: { min: 0, max: 120 } },
            }),

            description: fields.text({
                label: "Description",
                multiline: true,
                validation: { length: { min: 0, max: 300 } },
            }),

            ctas: fields.array(
                fields.object({
                    label: fields.text({ label: "Label" }),
                    href: fields.text({ label: "Link (href)" }),
                    variant: fields.select({
                        label: "Variant",
                        options: [
                            { label: "Primary", value: "primary" },
                            { label: "Secondary", value: "secondary" },
                        ],
                        defaultValue: "primary",
                    }),
                }),
                {
                    label: "CTAs",
                    itemLabel: (item) => item.fields.label.value || "CTA",
                    // optional, cap at 2 like your design:
                    validation: { length: { max: 2 } },
                }
            ),

            trustIndicators: fields.array(
                fields.object({
                    value: fields.text({ label: "Main value (e.g. 15+)" }),
                    label: fields.text({
                        label: "Small label (e.g. Lat doświadczenia)",
                    }),
                }),
                {
                    label: "Trust indicators (max 3)",
                    itemLabel: (item) =>
                        item.fields.value.value || "Indicator",
                    validation: { length: { max: 3 } },
                }
            ),

            image: fields.image({
                label: "Image",
                directory: "src/assets/pages",
                publicPath: "/src/assets/pages/",
            }),

            imageAlt: fields.text({
                label: "Image alt text",
            }),

            imageSide: fields.select({
                label: "Image side",
                options: [
                    { label: "Right", value: "right" },
                    { label: "Left", value: "left" },
                ],
                defaultValue: "right",
            }),

            badgeEnabled: fields.checkbox({
                label: "Show floating badge",
                defaultValue: true,
            }),

            badgeTitle: fields.text({
                label: "Badge title",
            }),

            badgeSubtitle: fields.text({
                label: "Badge subtitle",
            }),

            badgePosition: fields.select({
                label: "Badge position on image",
                options: [...badgePositionOptions],
                defaultValue: "bottom-left",
            }),
        },
    }),
    // --- Features (unified) ---
    Features: block({
        label: "Features",
        schema: {
            subtitle: fields.text({
                label: "Subtitle (above title)",
                validation: { length: { min: 0, max: 80 } },
            }),
            title: fields.text({
                label: "Title (H2)",
                validation: { length: { min: 0, max: 120 } },
            }),
            description: fields.text({
                label: "Description",
                multiline: true,
                validation: { length: { min: 0, max: 300 } },
            }),
            featuresLink: fields.select({
                label: "Features link",
                options: [
                    { label: "None", value: "none" },
                    { label: "Line", value: "line" },
                ],
                defaultValue: "none",
            }),
            features: fields.array(
                fields.object({
                    number: fields.text({ label: "Number" }),
                    icon: fields.text({ label: "Icon (lucide:...)" }),
                    iconBackground: fields.text({
                        label: "Icon background class (e.g. bg-brand-natural-green)",
                    }),
                    iconColor: fields.text({
                        label: "Icon color class (e.g. text-white)",
                    }),
                    title: fields.text({ label: "Title" }),
                    description: fields.text({
                        label: "Description",
                        multiline: true,
                    }),
                }),
                {
                    label: "Features (max 4)",
                    itemLabel: (item) => item.fields.title.value || "Feature",
                    validation: { length: { max: 4 } },
                }
            ),
        },
    }),
};