import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
    nodes: {
        image: {
            render: component('./src/components/markdoc/InlineImage.astro'),
            attributes: {
                src: { type: String },
                alt: { type: String },
                title: { type: String },
            },
        },
        table: {
            render: component('./src/components/markdoc/GridTable.astro'),
            attributes: {
                kind: { type: String, default: 'table' },
            },
        },
        thead: {
            render: component('./src/components/markdoc/GridTable.astro'),
            attributes: {
                kind: { type: String, default: 'thead' },
            },
        },
        tbody: {
            render: component('./src/components/markdoc/GridTable.astro'),
            attributes: {
                kind: { type: String, default: 'tbody' },
            },
        },
        tr: {
            render: component('./src/components/markdoc/GridTable.astro'),
            attributes: {
                kind: { type: String, default: 'tr' },
            },
        },
        th: {
            render: component('./src/components/markdoc/GridTable.astro'),
            attributes: {
                kind: { type: String, default: 'th' },
                align: { type: String },
                colspan: { type: Number },
                rowspan: { type: Number },
            },
        },
        td: {
            render: component('./src/components/markdoc/GridTable.astro'),
            attributes: {
                kind: { type: String, default: 'td' },
                align: { type: String },
                colspan: { type: Number },
                rowspan: { type: Number },
            },
        },
    },
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
        Features: {
            render: component('./src/components/Features.astro'),
            attributes: {
                title: { type: String },
                subtitle: { type: String },
                description: { type: String },
                featuresLink: { type: String },
                features: { type: Array },
            },
        },
        Badge: {
            render: component('./src/components/Badge.astro'),
            attributes: {
                number: {type: String},
                icon: {type: String},
                title: {type: String},
                description: {type: String},
            },
        },
        Partners: {
            render: component('./src/components/Partners.astro'),
            attributes: {
                title: { type: String },
                subtitle: { type: String },
                partners: { type: Array },
            },
        },
        Callout: {
            render: component('./src/components/Callout.astro'),
            attributes: {
                title: { type: String },
                description: { type: String },
                color: { type: String },
            },
        },
        FeaturedReview: {
            render: component('./src/components/FeaturedReview.astro'),
            attributes: {},
        },
        Portfolio: {
            render: component('./src/components/Portfolio.astro'),
            attributes: {
                categories: { type: Array },
                category: { type: String },
            },
        },
        YouTube: {
            render: component('./src/components/YouTube.astro'),
            attributes: {
                url: { type: String },
                title: { type: String },
            },
        }
    },
});