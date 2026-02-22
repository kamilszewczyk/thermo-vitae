import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
    tags: {
        Hero: {
            render: component('./src/components/Hero.astro'),
            attributes: {
                title: { type: String },
                subtitle: { type: String },
                description: { type: String },
                image: { type: String },
                imageAlt: { type: String },
                imageSide: { type: String },
                badgeEnabled: { type: Boolean },
                badgeTitle: { type: String },
                badgeSubtitle: { type: String },
                badgePosition: { type: String },
                // For arrays/objects, Markdoc uses 'Object' or 'Array'
                ctas: { type: Array },
                trustIndicators: { type: Array },
            },
        },
    },
});