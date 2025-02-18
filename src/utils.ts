export function getImageTypeFromUrl(url: string): string {
  const urlObj = new URL(url);
  const extension = urlObj.pathname
    .substring(urlObj.pathname.lastIndexOf(".") + 1)
    .toLowerCase();

  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "webp":
      return `image/${extension}`;
    default:
      throw new Error("Invalid image type");
  }
}

export async function isImageSizeUnder5MB(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl, {
      method: "HEAD",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentLength = response.headers.get("content-length");
    if (!contentLength) {
      throw new Error("Content-Length header is missing");
    }

    const sizeInBytes = parseInt(contentLength, 10);
    const sizeInMB = sizeInBytes / (1024 * 1024);

    return sizeInMB <= 5;
  } catch (error) {
    console.error("Error checking image size:", error);
    return false;
  }
}
