const allImages = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/**/*.{png,jpg,jpeg,svg,webp,avif}"
);

export async function resolveImage(
    path: string | null | undefined
): Promise<ImageMetadata | null> {
    if (!path || !allImages[path]) return null;
    const mod = await allImages[path]();
    return mod.default;
}