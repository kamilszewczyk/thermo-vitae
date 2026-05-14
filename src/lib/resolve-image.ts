const allImages = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/**/*.{png,jpg,jpeg,svg,webp,avif}"
);

function normalizeAssetPath(path: string): string {
    const noHash = path.split("#")[0]?.split("?")[0] ?? path;
    const withLeadingSlash = noHash.startsWith("/") ? noHash : `/${noHash}`;

    try {
        return decodeURIComponent(withLeadingSlash);
    } catch {
        return withLeadingSlash;
    }
}

export async function resolveImage(
    path: string | null | undefined
): Promise<ImageMetadata | null> {
    if (!path) return null;

    const normalizedPath = normalizeAssetPath(path);
    const imageImporter = allImages[normalizedPath];
    if (!imageImporter) return null;

    const mod = await imageImporter();
    return mod.default;
}